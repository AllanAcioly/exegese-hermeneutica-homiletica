#!/usr/bin/env node
/* Gerador de DOCX no layout IPE (Igreja Presbiteriana Esperança) a partir
 * dos markdowns do projeto: sermão final, esboço de púlpito e documento de
 * estudo. Converte notas [^id] em notas de rodapé reais do Word.
 *
 * Uso (na raiz do repositório):
 *   node ferramentas/gerar-docx-ipe.js <sermao|pulpito|estudo> <entrada.md> <saida.docx> \
 *     --titulo "Recompensas nos Moldes do Reino" --referencia "Mateus 20.1-16" \
 *     [--serie "Série Parábolas do Reino · Sermão 9 · “O Coração do Rei”"] \
 *     [--data "Outubro de 2026"] [--duracao "≈ 43 min"] [--ate "## Fase 6b"]
 *
 * Ver ferramentas/README.md. Infraestrutura (paleta, fontes, página,
 * cabeçalho/rodapé) adaptada do build_template.js da skill aula-indutiva-ipe;
 * especificações em assets/identidade-visual-ipe.md. */
const fs = require('fs');
const path = require('path');
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, Header, Footer,
  AlignmentType, LevelFormat, BorderStyle, WidthType, ShadingType, PageNumber,
  TabStopType, LineRuleType, FootnoteReferenceRun
} = require('docx');

const NAVY = "252544", GOLD = "C8955B", GOLDDK = "9C6F3D", PARCH = "F4F1EA",
  PALEGOLD = "FBF4E9", SUBT = "E6DFD2", INK = "2B2B33";
const DISPLAY = "Constantia", BODY = "Cambria";

// ---------------- notas de rodapé ----------------
// Markdown: marcador [^id] no texto; definições "[^id]: texto" (continuação
// indentada) numa seção final "## Notas", que vira notas reais do Word.
let FN = null;
function extractNotes(md) {
  const cut = md.search(/\n(?:---\s*\n\s*)?## Notas\s*\n/);
  if (cut < 0) return { md, defs: {} };
  const tail = md.slice(cut).split('\n');
  const defs = {}; let cur = null;
  for (const ln of tail) {
    const m = ln.match(/^\[\^([^\]]+)\]:\s?(.*)$/);
    if (m) { cur = m[1]; defs[cur] = m[2].trim(); }
    else if (cur && /^\s+\S/.test(ln)) defs[cur] += ' ' + ln.trim();
    else if (!ln.trim()) cur = null;
  }
  return { md: md.slice(0, cut) + '\n', defs };
}
function noteRef(id) {
  if (!FN || !(id in FN.defs)) throw new Error('nota sem definição: ' + id);
  if (!FN.num[id]) { FN.num[id] = ++FN.n; FN.order.push(id); }
  return new FootnoteReferenceRun(FN.num[id]);
}
function footnotesObj() {
  if (!FN) return undefined;
  const o = {};
  for (const id of FN.order) o[FN.num[id]] = { children: [new Paragraph({
    spacing: { after: 40, line: 240, lineRule: LineRuleType.AUTO }, alignment: AlignmentType.JUSTIFIED,
    children: [new TextRun({ text: ' ', size: 17 }), ...inline(FN.defs[id], { font: BODY, size: 17, color: INK })] })] };
  return o;
}

// ---------------- inline markdown ----------------
function inline(text, base) {
  const runs = [];
  const re = /(\[\^[^\]]+\]|\*\*\*[^*]+\*\*\*|\*\*(?:[^*]|\*(?!\*)[^*]*\*)+?\*\*|\*[^*\s][^*]*\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g;
  let last = 0, m;
  const push = (t, o = {}) => { if (t) runs.push(new TextRun({ text: t, font: base.font, size: base.size, color: base.color, bold: o.bold ?? base.bold, italics: o.italics ?? base.italics })); };
  while ((m = re.exec(text))) {
    push(text.slice(last, m.index));
    const tok = m[0];
    if (tok.startsWith('[^')) runs.push(noteRef(tok.slice(2, -1)));
    else if (tok.startsWith('***')) push(tok.slice(3, -3), { bold: true, italics: true });
    else if (tok.startsWith('**')) runs.push(...inline(tok.slice(2, -2), { ...base, bold: true }));
    else if (tok.startsWith('*')) push(tok.slice(1, -1), { italics: true });
    else if (tok.startsWith('`')) push(tok.slice(1, -1));
    else push(tok.replace(/^\[([^\]]+)\]\([^)]+\)$/, '$1'));
    last = m.index + tok.length;
  }
  push(text.slice(last));
  return runs;
}

// ---------------- builder ----------------
function build(md, P) {
  const CW = 11906 - P.marginL - P.marginR;
  const S = P.size;                         // tamanho do corpo (meios-pontos)
  const out = [];
  let numInstance = 0;
  const lines = md.split('\n');

  const para = (text, o = {}) => new Paragraph({
    spacing: { before: o.before ?? 0, after: o.after ?? Math.round(S * 6.5), line: o.line ?? 300, lineRule: LineRuleType.AUTO },
    alignment: o.align ?? AlignmentType.LEFT,
    indent: o.indent, numbering: o.numbering, border: o.border, pageBreakBefore: o.pageBreakBefore,
    keepNext: o.keepNext,
    children: inline(text, { font: o.font ?? BODY, size: o.size ?? S, color: o.color ?? INK, bold: o.bold, italics: o.italics })
  });

  function box(paras, kind) {
    const navy = kind === 'navy';
    const fill = navy ? NAVY : (kind === 'pale' ? PALEGOLD : PARCH);
    const kids = paras.map((t, i) => para(t, {
      color: navy ? "FFFFFF" : NAVY, size: navy ? S + 2 : S - 1,
      font: navy ? DISPLAY : BODY, after: i === paras.length - 1 ? 0 : 100, line: 288
    }));
    const frame = navy ? { style: BorderStyle.NONE, size: 0, color: NAVY } : { style: BorderStyle.SINGLE, size: 4, color: SUBT };
    return [new Table({
      width: { size: CW, type: WidthType.DXA }, columnWidths: [CW],
      rows: [new TableRow({ cantSplit: paras.join(' ').length < 900, children: [new TableCell({
        width: { size: CW, type: WidthType.DXA },
        shading: { fill, type: ShadingType.CLEAR },
        margins: { top: 140, bottom: 140, left: 230, right: 230 },
        borders: { top: frame, bottom: frame, right: frame, left: { style: BorderStyle.SINGLE, size: 26, color: GOLD } },
        children: kids
      })] })]
    }), new Paragraph({ spacing: { after: 120 }, children: [] })];
  }

  function table(rows) {
    const cells = rows.map(r => r.replace(/^\||\|$/g, '').split('|').map(c => c.trim()));
    const header = cells[0], body = cells.slice(2);
    const n = header.length;
    const lens = header.map((_, j) => Math.max(...cells.filter((_, i) => i !== 1).map(r => (r[j] || '').length)));
    let w = lens.map(l => Math.max(900, Math.min(l, 60)));
    const tot = w.reduce((a, b) => a + b, 0);
    w = w.map(x => Math.floor(x / tot * CW));
    w[n - 1] += CW - w.reduce((a, b) => a + b, 0);
    const mk = (t, j, head) => new TableCell({
      width: { size: w[j], type: WidthType.DXA },
      shading: { fill: head ? NAVY : "FFFFFF", type: ShadingType.CLEAR },
      margins: { top: 70, bottom: 70, left: 110, right: 110 },
      borders: { top: { style: BorderStyle.SINGLE, size: 2, color: SUBT }, bottom: { style: BorderStyle.SINGLE, size: 2, color: SUBT }, left: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" }, right: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" } },
      children: [para(t || '', { font: head ? DISPLAY : BODY, size: head ? S - 3 : S - 3, bold: head, color: head ? "FFFFFF" : INK, after: 0, line: 260 })]
    });
    return [new Table({
      width: { size: CW, type: WidthType.DXA }, columnWidths: w,
      rows: [new TableRow({ tableHeader: true, children: header.map((t, j) => mk(t, j, true)) }),
        ...body.map(r => new TableRow({ children: header.map((_, j) => mk(r[j], j, false)) }))]
    }), new Paragraph({ spacing: { after: 160 }, children: [] })];
  }

  const ornament = () => new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 140, after: 140 }, children: [new TextRun({ text: "✦", font: BODY, size: 22, color: GOLD })] });

  let i = 0;
  let firstH2 = true;
  while (i < lines.length) {
    let ln = lines[i];
    if (P.skip && P.skip(ln, i)) { i++; continue; }
    if (!ln.trim()) { i++; continue; }
    if (/^---\s*$/.test(ln)) { out.push(ornament()); i++; continue; }
    if (ln.startsWith('#### ')) { out.push(para(ln.slice(5).toUpperCase(), { font: DISPLAY, size: S - 4, bold: true, color: GOLDDK, before: 120, after: 60, keepNext: true })); i++; continue; }
    if (ln.startsWith('### ')) { out.push(para(ln.slice(4), { font: DISPLAY, size: S + 3, bold: true, color: NAVY, before: 200, after: 90, keepNext: true })); i++; continue; }
    if (ln.startsWith('## ')) {
      const brk = P.breakH2 && !firstH2;
      firstH2 = false;
      out.push(para(ln.slice(3), { font: DISPLAY, size: S + 9, bold: true, color: NAVY, before: brk ? 0 : 280, after: 140, pageBreakBefore: brk, keepNext: true,
        border: { bottom: { style: BorderStyle.SINGLE, size: 10, color: GOLD, space: 6 } } }));
      i++; continue;
    }
    if (ln.startsWith('# ')) { i++; continue; }
    if (ln.startsWith('>')) {
      const ps = []; let cur = [];
      while (i < lines.length && lines[i].startsWith('>')) {
        const t = lines[i].replace(/^>\s?/, '');
        if (!t.trim()) { if (cur.length) ps.push(cur.join(' ')); cur = []; } else cur.push(t.trim());
        i++;
      }
      if (cur.length) ps.push(cur.join(' '));
      out.push(...box(ps, /^\*\*Ideia central/.test(ps[0]) ? 'navy' : 'parch'));
      continue;
    }
    if (ln.trim().startsWith('|')) {
      const rows = [];
      while (i < lines.length && lines[i].trim().startsWith('|')) rows.push(lines[i].trim()), i++;
      out.push(...table(rows));
      continue;
    }
    const lm = ln.match(/^(\s*)([-*]|\d+\.)\s+(.*)$/);
    if (lm) {
      let started = false;
      while (i < lines.length) {
        const m2 = lines[i].match(/^(\s*)([-*]|\d+\.)\s+(.*)$/);
        if (!m2) {
          // continuação do item (linha indentada sem marcador)
          if (lines[i].trim() && /^\s{2,}/.test(lines[i]) && !lines[i].trim().startsWith('>') && !lines[i].trim().startsWith('|')) {
            const prev = out.pop();
            out.push(prev); // mantém; texto de continuação vira parágrafo indentado
            out.push(para(lines[i].trim(), { indent: { left: 900 }, after: 60 }));
            i++; continue;
          }
          break;
        }
        const level = Math.min(2, Math.floor(m2[1].length / 2) > 0 ? (m2[1].length >= 5 ? 2 : 1) : 0);
        let text = m2[3];
        const isNum = /\d+\./.test(m2[2]);
        // junta linhas de continuação imediatas
        i++;
        while (i < lines.length && lines[i].trim() && !/^(\s*)([-*]|\d+\.)\s+/.test(lines[i]) && /^\s+/.test(lines[i]) && !lines[i].trim().startsWith('>') && !lines[i].trim().startsWith('|')) {
          text += ' ' + lines[i].trim(); i++;
        }
        if (isNum && /^\s*1\./.test(m2[0])) numInstance++;
        started = true;
        out.push(para(text, {
          numbering: isNum ? { reference: "num", level: 0, instance: numInstance } : { reference: "bul", level },
          after: 70, line: 288
        }));
      }
      continue;
    }
    // parágrafo comum (junta linhas)
    let text = ln.trim(); i++;
    while (i < lines.length && lines[i].trim() && !/^(#|>|\||---|\s*[-*]\s|\s*\d+\.\s)/.test(lines[i])) { text += ' ' + lines[i].trim(); i++; }
    const stage = /^\*?\*?\[/.test(text);
    out.push(para(text, stage ? { color: GOLDDK, italics: true, size: S - 1 } : {}));
  }
  return out;
}

function cover(P) {
  const c = (t, o) => new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: o.after ?? 60 }, border: o.border,
    children: t ? [new TextRun({ text: t, font: o.font ?? BODY, size: o.size, bold: o.bold, italics: o.italics, color: o.color ?? INK, characterSpacing: o.cs })] : [] });
  return [
    new Paragraph({ spacing: { after: 2400 }, children: [] }),
    c("IGREJA PRESBITERIANA ESPERANÇA", { font: DISPLAY, size: 19, bold: true, color: GOLDDK, cs: 90, after: 900 }),
    ...(P.kicker ? [c(P.kicker, { font: DISPLAY, size: 20, bold: true, color: NAVY, cs: 80, after: 240 })] : []),
    c(P.title, { font: DISPLAY, size: 56, bold: true, color: NAVY, after: 120 }),
    c("", { after: 160, border: { bottom: { style: BorderStyle.SINGLE, size: 12, color: GOLD, space: 10 } } }),
    c(P.subtitle, { font: DISPLAY, size: 30, italics: true, color: GOLDDK, after: 120 }),
    c(P.series, { size: 21, color: INK, after: 60 }),
    c(P.date, { size: 21, italics: true, color: INK, after: 0 }),
  ];
}

function seal() {
  return [new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 300, after: 0 },
    children: [new TextRun({ text: "Soli Deo Gloria", font: DISPLAY, size: 24, italics: true, color: GOLDDK })] })];
}

function makeDoc(P, children) {
  const CW = 11906 - P.marginL - P.marginR;
  const hdr = new Header({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, spacing: { after: 0 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: SUBT, space: 4 } },
    children: [new TextRun({ text: P.header, font: DISPLAY, size: 14, color: GOLDDK, characterSpacing: 30 })] })] });
  const ftr = new Footer({ children: [new Paragraph({ border: { top: { style: BorderStyle.SINGLE, size: 4, color: SUBT, space: 4 } },
    tabStops: [{ type: TabStopType.CENTER, position: Math.round(CW / 2) }, { type: TabStopType.RIGHT, position: CW }],
    children: [new TextRun({ text: "Igreja Presbiteriana Esperança", font: BODY, size: 16, color: INK }),
      new TextRun({ text: "\tSoli Deo Gloria\t", font: DISPLAY, size: 15, italics: true, color: GOLDDK }),
      new TextRun({ children: [PageNumber.CURRENT], font: BODY, size: 16, color: INK })] })] });
  const empty = () => new Header({ children: [new Paragraph({ children: [] })] });
  return new Document({
    footnotes: footnotesObj(),
    creator: "Rev. Allan Acioly — Igreja Presbiteriana Esperança",
    title: P.docTitle,
    styles: { default: { document: { run: { font: BODY, size: P.size, color: INK } } } },
    numbering: { config: [
      { reference: "num", levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT, style: { run: { color: GOLDDK, bold: true }, paragraph: { indent: { left: 460, hanging: 320 } } } }] },
      { reference: "bul", levels: [
        { level: 0, format: LevelFormat.BULLET, text: "—", alignment: AlignmentType.LEFT, style: { run: { color: GOLD }, paragraph: { indent: { left: 460, hanging: 280 } } } },
        { level: 1, format: LevelFormat.BULLET, text: "·", alignment: AlignmentType.LEFT, style: { run: { color: GOLD }, paragraph: { indent: { left: 900, hanging: 280 } } } },
        { level: 2, format: LevelFormat.BULLET, text: "·", alignment: AlignmentType.LEFT, style: { run: { color: GOLD }, paragraph: { indent: { left: 1300, hanging: 280 } } } }] }
    ] },
    sections: [{
      properties: { page: { size: { width: 11906, height: 16838 }, margin: { top: 1440, bottom: 1440, left: P.marginL, right: P.marginR, header: 720, footer: 600 } }, titlePage: !!P.cover },
      headers: P.cover ? { first: empty(), default: hdr } : { default: hdr },
      footers: P.cover ? { first: new Footer({ children: [new Paragraph({ children: [] })] }), default: ftr } : { default: ftr },
      children
    }]
  });
}

// ---------------- linha de comando ----------------
const MESES = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

function args() {
  const a = process.argv.slice(2), pos = [], opt = {};
  for (let i = 0; i < a.length; i++) {
    if (a[i].startsWith('--')) { opt[a[i].slice(2)] = a[i + 1]; i++; }
    else pos.push(a[i]);
  }
  const [tipo, entrada, saida] = pos;
  if (!['sermao', 'pulpito', 'estudo'].includes(tipo) || !entrada || !saida || !opt.titulo || !opt.referencia) {
    console.error('Uso: node ferramentas/gerar-docx-ipe.js <sermao|pulpito|estudo> <entrada.md> <saida.docx> ' +
      '--titulo "..." --referencia "..." [--serie "..."] [--data "..."] [--duracao "..."] [--ate "## Fase 6b"]');
    process.exit(1);
  }
  const hoje = new Date();
  return { tipo, entrada, saida, titulo: opt.titulo, ref: opt.referencia, serie: opt.serie || '',
    data: opt.data || `${MESES[hoje.getMonth()]} de ${hoje.getFullYear()}`, duracao: opt.duracao, ate: opt.ate };
}

async function main() {
  const A = args();
  const { md: corpo, defs } = extractNotes(fs.readFileSync(A.entrada, 'utf8'));
  FN = { defs, num: {}, order: [], n: 0 };
  const sobre = A.titulo + ' · ' + A.ref;
  let doc;

  if (A.tipo === 'sermao') {
    // Capa simplificada; as linhas de referência/série do topo do markdown já estão na capa.
    const P = { size: 23, marginL: 1620, marginR: 1620, cover: true, breakH2: false,
      title: A.titulo, subtitle: A.ref, series: A.serie, date: A.data,
      header: sobre.toUpperCase(), docTitle: A.titulo + ' — ' + A.ref,
      skip: (ln, i) => i < 6 && (/^\*\*\*/.test(ln) || /^\*Série/.test(ln)) };
    doc = makeDoc(P, [...cover(P), new Paragraph({ pageBreakBefore: true, children: [] }), ...build(corpo, P), ...seal()]);
  } else if (A.tipo === 'pulpito') {
    // Sem capa, margem direita ampla para anotações à mão.
    const P = { size: 23, marginL: 1100, marginR: 2100, cover: false, breakH2: false,
      header: ('Esboço de púlpito · ' + A.ref).toUpperCase(), docTitle: 'Esboço de púlpito — ' + A.titulo,
      skip: (ln, i) => i < 4 && /^\*\*\*/.test(ln) };
    const linha = [A.ref, A.serie, A.duracao].filter(Boolean).join(' · ');
    const head = [
      new Paragraph({ spacing: { after: 40 }, children: [new TextRun({ text: "ESBOÇO DE PÚLPITO", font: DISPLAY, size: 18, bold: true, color: GOLDDK, characterSpacing: 60 })] }),
      new Paragraph({ spacing: { after: 40 }, children: [new TextRun({ text: A.titulo, font: DISPLAY, size: 40, bold: true, color: NAVY })] }),
      new Paragraph({ spacing: { after: 200 }, border: { bottom: { style: BorderStyle.SINGLE, size: 12, color: GOLD, space: 8 } },
        children: [new TextRun({ text: linha, font: BODY, size: 21, italics: true, color: GOLDDK })] })
    ];
    doc = makeDoc(P, [...head, ...build(corpo, P)]);
  } else {
    // Estudo: cada seção ## em nova página; por padrão vai até a Fase 6a.
    const ate = A.ate || '## Fase 6b';
    const md = corpo.split('\n' + ate)[0];
    const P = { size: 21, marginL: 1620, marginR: 1620, cover: true, breakH2: true, kicker: "ESTUDO EXEGÉTICO-HERMENÊUTICO",
      title: A.titulo, subtitle: A.ref, series: A.serie, date: A.data,
      header: ('Estudo exegético-hermenêutico · ' + A.ref).toUpperCase(), docTitle: 'Estudo Exegético-Hermenêutico — ' + A.ref };
    doc = makeDoc(P, [...cover(P), new Paragraph({ pageBreakBefore: true, children: [] }), ...build(md, P), ...seal()]);
  }

  fs.writeFileSync(A.saida, await Packer.toBuffer(doc));
  const sobra = Object.keys(defs).filter(k => !FN.num[k]);
  console.log(`${A.saida}: ${FN.n} nota(s) de rodapé` + (sobra.length ? ` — definidas e não usadas: ${sobra.join(', ')}` : ''));
}

main().catch(e => { console.error(e.message || e); process.exit(1); });
