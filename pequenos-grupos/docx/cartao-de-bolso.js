/* Cartão de bolso do líder de PG — A5, frente e verso */
const path = require("path");
const I = require("./ipe");
const { A5, helpers, build, NAVY, GOLD, GOLDDK, INK, SUBT, PARCH, PALEGOLD,
        BODY, DISPLAY, Paragraph, TextRun, Table, TableRow, TableCell,
        AlignmentType, BorderStyle, WidthType, ShadingType, LineRuleType } = I;

const h = helpers(A5.cw);
const { gap } = h;
const CW = A5.cw;

function titulo(texto, sub) {
  const out = [new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 20 },
    children: [new TextRun({ text: texto, font: DISPLAY, size: 30, bold: true, color: NAVY })]
  })];
  if (sub) {
    out.push(new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 60 },
      children: [new TextRun({ text: sub.toUpperCase(), font: DISPLAY, size: 13, bold: true, color: GOLDDK, characterSpacing: 80 })]
    }));
  }
  out.push(new Paragraph({
    spacing: { after: 130 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 10, color: GOLD, space: 4 } },
    children: []
  }));
  return out;
}

function sec(texto) {
  return new Paragraph({
    spacing: { before: 120, after: 60 },
    children: [new TextRun({ text: texto.toUpperCase(), font: DISPLAY, size: 14, bold: true, color: GOLDDK, characterSpacing: 60 })]
  });
}

function linha(runs, opts = {}) {
  return new Paragraph({
    spacing: { after: opts.after ?? 60, line: 252, lineRule: LineRuleType.AUTO },
    indent: opts.indent,
    children: runs
  });
}

function t(text, o = {}) {
  return new TextRun({
    text, font: o.font ?? BODY, size: o.size ?? 18,
    color: o.color ?? INK, bold: !!o.bold, italics: !!o.italics
  });
}

/** Faixa marinho estreita */
function faixa(texto, opts = {}) {
  return new Table({
    width: { size: CW, type: WidthType.DXA },
    columnWidths: [CW],
    rows: [new TableRow({ children: [new TableCell({
      width: { size: CW, type: WidthType.DXA },
      shading: { fill: opts.fill ?? NAVY, type: ShadingType.CLEAR },
      margins: { top: 100, bottom: 100, left: 170, right: 170 },
      borders: {
        top: { style: BorderStyle.NONE, size: 0, color: opts.fill ?? NAVY },
        bottom: { style: BorderStyle.NONE, size: 0, color: opts.fill ?? NAVY },
        right: { style: BorderStyle.NONE, size: 0, color: opts.fill ?? NAVY },
        left: { style: BorderStyle.SINGLE, size: 20, color: GOLD }
      },
      children: [new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 0 },
        children: [new TextRun({
          text: texto, font: DISPLAY, size: opts.size ?? 22, bold: !!opts.bold,
          italics: opts.italics !== false, color: opts.color ?? "FFFFFF"
        })]
      })]
    })] })]
  });
}

/** Tabela compacta para o cartão */
function grade(rows, widths, opts = {}) {
  const total = widths.reduce((a, b) => a + b, 0);
  const cols = widths.map(w => Math.round((w / total) * CW));
  return new Table({
    width: { size: CW, type: WidthType.DXA },
    columnWidths: cols,
    rows: rows.map((cells, ri) => new TableRow({
      children: cells.map((c, i) => new TableCell({
        width: { size: cols[i], type: WidthType.DXA },
        shading: { fill: ri % 2 ? PARCH : "FFFFFF", type: ShadingType.CLEAR },
        margins: { top: 70, bottom: 70, left: 120, right: 120 },
        borders: {
          top: { style: BorderStyle.SINGLE, size: 2, color: SUBT },
          bottom: { style: BorderStyle.SINGLE, size: 2, color: SUBT },
          left: { style: BorderStyle.SINGLE, size: 2, color: SUBT },
          right: { style: BorderStyle.SINGLE, size: 2, color: SUBT }
        },
        children: [new Paragraph({
          spacing: { after: 0, line: 240, lineRule: LineRuleType.AUTO },
          children: [new TextRun({
            text: c, font: BODY, size: opts.size ?? 17,
            color: i === 0 ? NAVY : INK, bold: i === 0 && !opts.noBold
          })]
        })]
      }))
    }))
  });
}

const C = [];

// =========================== FRENTE ===========================
C.push(...titulo("Do púlpito ao coração", "Cartão do líder de PG"));

C.push(sec("Os seis movimentos · 90 min"));
C.push(grade([
  ["1 · Acolher", "Quem está aqui?", "15"],
  ["2 · Abrir", "Como vai você?", "15"],
  ["3 · Relembrar", "O que o texto disse?", "15"],
  ["4 · Descer", "O que o texto encontra em nós?", "25"],
  ["5 · Andar", "O que faremos?", "10"],
  ["6 · Orar", "Vamos falar com Deus sobre isso", "10"]
], [26, 60, 14]));

C.push(gap(110));
C.push(faixa("existencial → evangelho → prática", { size: 24, bold: true, italics: false }));
C.push(linha([t("Se inverter, vira lista de tarefas para conquistar a Deus.", { italics: true, size: 16, color: GOLDDK })], { after: 20 }));

C.push(sec("As cinco perguntas do coração"));
[
  ["O que você ", "ama", "? → os objetos do desejo"],
  ["O que te faz ", "feliz", "? → desejos satisfeitos"],
  ["O que te deixa ", "triste", "? → desejos frustrados"],
  ["O que te deixa ", "irritado", "? → desejos frustrados"],
  ["O que você ", "teme", "? → desejos em risco"]
].forEach(([a, b, c]) => C.push(linha([
  t("— ", { color: GOLD }), t(a), t(b, { bold: true, color: NAVY }), t(c)
], { after: 40 })));

C.push(linha([t("As duas últimas são as mais confiáveis: ninguém finge irritação e ninguém escolhe o que teme.", { italics: true, size: 16, color: GOLDDK })], { after: 70 }));

C.push(faixa("Siga o rastro da emoção. Onde a voz muda, onde os olhos enchem — ali tem coração. Volte ali.", { size: 19 }));

C.push(sec("O evangelho, toda semana"));
C.push(linha([t("“O que este texto exige que nenhum de nós cumpriu?”", { font: DISPLAY, size: 20, color: NAVY })], { after: 40 }));
C.push(linha([t("“Onde Jesus cumpriu isso em nosso lugar?”", { font: DISPLAY, size: 20, color: NAVY })], { after: 40 }));

C.push(sec("A pergunta de duas portas — uma por encontro"));
C.push(grade([
  ["Uma porta só", "Duas portas"],
  ["“Como você tem descansado na graça?”", "“Quando essa área desanda, pra onde você corre primeiro?”"],
  ["“Que pecado você precisa confessar?”", "“O que você mais teme perder?”"]
], [44, 56], { noBold: true, size: 16 }));

// =========================== VERSO ===========================
C.push(new Paragraph({ pageBreakBefore: true, spacing: { after: 0 }, children: [] }));
C.push(...titulo("As armadilhas", "Verso"));

C.push(sec("Quatro reuniões que não são um PG"));
C.push(grade([
  ["A sala de aula", "você fala mais da metade do tempo"],
  ["O segundo culto", "você resume o sermão"],
  ["O consultório", "você resolve a dor do outro"],
  ["O churrasco", "conversa boa, ninguém muda"]
], [34, 66]));
C.push(linha([t("Duas fogem pela cabeça, duas pelo alívio. Nenhuma chega ao coração.", { italics: true, size: 16, color: GOLDDK })], { after: 40 }));

C.push(sec("Com visitante na sala"));
[
  ["Não pressuponha", " — jargão: explique ou corte"],
  ["Não force", " — ninguém é obrigado a ler nem a orar"],
  ["Não exponha", " — ele nunca é o exemplo negativo"],
  ["Não debata", " — você tem meses; não precisa vencer hoje"],
  ["Não esconda o evangelho", " — toda semana, com ou sem visitante"]
].forEach(([a, b]) => C.push(linha([
  t("— ", { color: GOLD }), t(a, { bold: true, color: NAVY }), t(b)
], { after: 30 })));

C.push(sec("Se travar"));
[
  ["Ninguém fala", " → conte até dez. Exponha-se você primeiro."],
  ["Um domina", " → “ótimo. E os outros? Fulano, como é aí na sua casa?”"],
  ["Vira debate abstrato", " → “onde isso apareceu na sua semana?”"],
  ["Resposta pronta", " → “e como tem sido fazer isso nessa situação?”"],
  ["Alguém chora", " → silêncio, gratidão pela confiança, oração ali."],
  ["Fofoca como pedido de oração", " → “vamos orar por ele. E como você está com isso?”"]
].forEach(([a, b]) => C.push(linha([
  t("— ", { color: GOLD }), t(a, { bold: true, color: NAVY }), t(b)
], { after: 40 })));

C.push(sec("Sobe ao pastor hoje"));
C.push(linha([t("violência · abuso sexual · menção a querer morrer · adultério ou separação · vício sem controle · crime", { size: 17 })], { after: 80 }));
C.push(faixa("“Eu vou te ouvir e não vou contar por aí. Se for algo que precisa de mais ajuda do que eu posso dar, eu te ajudo a levar isso ao pastor — mas não vou fazer isso pelas suas costas.”", { size: 18 }));
C.push(linha([t("Nunca prometa sigilo absoluto antes de ouvir.", { bold: true, size: 17, color: NAVY })], { after: 60 }));

C.push(
  gap(40),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 20 },
    border: { top: { style: BorderStyle.SINGLE, size: 6, color: GOLD, space: 6 } },
    children: []
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 40, after: 20 },
    children: [new TextRun({
      text: "“Como águas profundas, são os propósitos do coração do homem, mas o homem de inteligência sabe descobri-los.” — Pv 20.5",
      font: BODY, size: 15, italics: true, color: NAVY
    })]
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 0 },
    children: [new TextRun({ text: "IPE · Soli Deo Gloria", font: DISPLAY, size: 14, italics: true, color: GOLDDK })]
  })
);

build({
  children: C,
  titulo: "Cartão de bolso do líder de PG",
  cabecalho: "Cartão do líder de PG",
  pagina: A5,
  rodape: false,
  out: path.join(__dirname, "..", "cartao-de-bolso.docx")
});
