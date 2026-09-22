/* =====================================================================
 *  INFRAESTRUTURA VISUAL IPE — módulo compartilhado
 *  ---------------------------------------------------------------------
 *  Paleta, fontes, helpers e montagem de Document com a identidade da
 *  Igreja Presbiteriana Esperança. Derivado do build_template.js da skill
 *  aula-indutiva-ipe, generalizado para aceitar tamanho de página variável
 *  (A4 para os guias, A5 para o cartão de bolso).
 *
 *  Não altere este arquivo ao editar conteúdo — edite os módulos de
 *  conteúdo que o consomem.
 * ===================================================================== */

const fs = require("fs");
const path = require("path");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  ImageRun, Header, Footer, AlignmentType, LevelFormat, BorderStyle,
  WidthType, ShadingType, PageNumber, TabStopType, LineRuleType
} = require("docx");

// ---------- Paleta IPE ----------
const NAVY = "252544";
const GOLD = "C8955B";
const GOLDDK = "9C6F3D";
const PARCH = "F4F1EA";
const PALEGOLD = "FBF4E9";
const SUBT = "E6DFD2";
const INK = "2B2B33";

const DISPLAY = "Constantia";
const BODY = "Cambria";

// ---------- Formatos de página ----------
// A4: 11906 x 16838 DXA, margens 1440/1620 → conteúdo 8666
// A5: 8391 x 11906 DXA, margens 900/900 → conteúdo 6591
const A4 = {
  size: { width: 11906, height: 16838 },
  margin: { top: 1440, bottom: 1440, left: 1620, right: 1620, header: 720, footer: 600 },
  cw: 8666
};
const A5 = {
  size: { width: 8391, height: 11906 },
  margin: { top: 900, bottom: 900, left: 900, right: 900, header: 440, footer: 400 },
  cw: 6591
};

const FAROL = path.join(__dirname, "farol.png");

/**
 * Cria o conjunto de helpers amarrado a uma largura de conteúdo (cw).
 * Assim o mesmo vocabulário visual serve A4 e A5.
 */
function helpers(cw) {
  function gap(size = 120) {
    return new Paragraph({ spacing: { after: size }, children: [] });
  }

  function r(text, o = {}) {
    return new TextRun({
      text,
      font: o.font ?? BODY,
      size: o.size ?? 23,
      color: o.color ?? INK,
      bold: !!o.bold,
      italics: !!o.italics
    });
  }

  function body(text, opts = {}) {
    return new Paragraph({
      spacing: { after: opts.after ?? 150, line: opts.line ?? 300, lineRule: LineRuleType.AUTO },
      alignment: opts.align ?? AlignmentType.LEFT,
      indent: opts.indent,
      children: [r(text, opts)]
    });
  }

  function bodyRuns(runs, opts = {}) {
    return new Paragraph({
      spacing: { after: opts.after ?? 150, line: opts.line ?? 300, lineRule: LineRuleType.AUTO },
      alignment: opts.align ?? AlignmentType.LEFT,
      indent: opts.indent,
      children: runs
    });
  }

  function label(text, color, size = 17) {
    return new Paragraph({
      spacing: { after: 70 },
      children: [new TextRun({
        text: text.toUpperCase(), font: DISPLAY, size, bold: true, color, characterSpacing: 40
      })]
    });
  }

  /** Cabeçalho de bloco: rótulo dourado + título marinho + tempo à direita */
  function blockHeader(kicker, title, time, opts = {}) {
    return [
      new Paragraph({
        pageBreakBefore: opts.samePage !== true,
        spacing: { after: 0 },
        border: { bottom: { style: BorderStyle.SINGLE, size: 14, color: GOLD, space: 6 } },
        children: [new TextRun({
          text: kicker.toUpperCase(), font: DISPLAY, size: 18, bold: true,
          color: GOLDDK, characterSpacing: 60
        })]
      }),
      new Paragraph({
        spacing: { before: 120, after: 60 },
        tabStops: [{ type: TabStopType.RIGHT, position: cw }],
        children: [
          new TextRun({ text: title, font: DISPLAY, size: opts.titleSize ?? 34, bold: true, color: NAVY }),
          ...(time ? [new TextRun({ text: `\t${time}`, font: BODY, size: 19, italics: true, color: GOLDDK })] : [])
        ]
      }),
      gap(120)
    ];
  }

  function boxCell(children, fill, leftBorderColor, leftBorderSize, subtleFrame) {
    const frame = subtleFrame
      ? { style: BorderStyle.SINGLE, size: 4, color: SUBT }
      : { style: BorderStyle.NONE, size: 0, color: "FFFFFF" };
    return new Table({
      width: { size: cw, type: WidthType.DXA },
      columnWidths: [cw],
      rows: [new TableRow({ cantSplit: true, children: [new TableCell({
        width: { size: cw, type: WidthType.DXA },
        shading: { fill, type: ShadingType.CLEAR },
        margins: { top: 150, bottom: 150, left: 230, right: 230 },
        borders: {
          top: subtleFrame ? frame : { style: BorderStyle.NONE, size: 0, color: fill },
          bottom: subtleFrame ? frame : { style: BorderStyle.NONE, size: 0, color: fill },
          right: subtleFrame ? frame : { style: BorderStyle.NONE, size: 0, color: fill },
          left: { style: BorderStyle.SINGLE, size: leftBorderSize, color: leftBorderColor }
        },
        children
      })] })]
    });
  }

  /** PERGUNTE — perguntas para o líder ler em voz alta (barra dourada) */
  function pergunte(questions, labelText = "Pergunte") {
    const kids = [label(labelText, GOLDDK)];
    questions.forEach((q, i) => {
      kids.push(new Paragraph({
        spacing: { after: i === questions.length - 1 ? 0 : 120, line: 288, lineRule: LineRuleType.AUTO },
        indent: { left: 40 },
        children: [new TextRun({ text: q, font: DISPLAY, size: 25, color: NAVY })]
      }));
    });
    return new Table({
      width: { size: cw, type: WidthType.DXA },
      columnWidths: [cw],
      rows: [new TableRow({ cantSplit: true, children: [new TableCell({
        width: { size: cw, type: WidthType.DXA },
        shading: { fill: "FFFFFF", type: ShadingType.CLEAR },
        margins: { top: 60, bottom: 60, left: 230, right: 120 },
        borders: {
          top: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
          bottom: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
          right: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
          left: { style: BorderStyle.SINGLE, size: 26, color: GOLD }
        },
        children: kids
      })] })]
    });
  }

  /** NOTA — orientação reservada a quem conduz (pergaminho, barra marinho) */
  function nota(paragraphs, labelText = "Nota do facilitador") {
    const kids = [label(labelText, GOLDDK)];
    paragraphs.forEach((p, i) => {
      kids.push(new Paragraph({
        spacing: { after: i === paragraphs.length - 1 ? 0 : 120, line: 288, lineRule: LineRuleType.AUTO },
        children: Array.isArray(p) ? p : [new TextRun({ text: p, font: BODY, size: 22, color: NAVY })]
      }));
    });
    return boxCell(kids, PARCH, NAVY, 28, true);
  }

  /** DESTAQUE MARINHO — a frase que não pode ser perdida */
  function destaque(text, labelText = "Regra de ouro") {
    const kids = [
      new Paragraph({
        spacing: { after: 70 },
        children: [new TextRun({
          text: labelText.toUpperCase(), font: DISPLAY, size: 17, bold: true,
          color: GOLD, characterSpacing: 60
        })]
      }),
      new Paragraph({
        spacing: { after: 0, line: 300, lineRule: LineRuleType.AUTO },
        children: [new TextRun({ text, font: DISPLAY, size: 25, color: "FFFFFF", italics: true })]
      })
    ];
    return new Table({
      width: { size: cw, type: WidthType.DXA },
      columnWidths: [cw],
      rows: [new TableRow({ cantSplit: true, children: [new TableCell({
        width: { size: cw, type: WidthType.DXA },
        shading: { fill: NAVY, type: ShadingType.CLEAR },
        margins: { top: 170, bottom: 170, left: 230, right: 230 },
        borders: {
          top: { style: BorderStyle.NONE, size: 0, color: NAVY },
          bottom: { style: BorderStyle.NONE, size: 0, color: NAVY },
          right: { style: BorderStyle.NONE, size: 0, color: NAVY },
          left: { style: BorderStyle.SINGLE, size: 28, color: GOLD }
        },
        children: kids
      })] })]
    });
  }

  /** ATERRISSAR — síntese, dourado claro */
  function aterrissar(paragraphs, labelText = "Onde aterrissar") {
    const kids = [label(labelText, NAVY)];
    paragraphs.forEach((p, i) => {
      kids.push(new Paragraph({
        spacing: { after: i === paragraphs.length - 1 ? 0 : 110, line: 288, lineRule: LineRuleType.AUTO },
        children: Array.isArray(p) ? p : [new TextRun({ text: p, font: BODY, size: 22, color: NAVY })]
      }));
    });
    return boxCell(kids, PALEGOLD, GOLD, 26, true);
  }

  /** Texto bíblico (barra dourada fina + itálico) */
  function biblia(ref, lines) {
    const kids = [new Paragraph({
      spacing: { after: 60 },
      children: [new TextRun({
        text: ref.toUpperCase(), font: DISPLAY, size: 17, bold: true, color: GOLDDK, characterSpacing: 30
      })]
    })];
    lines.forEach((ln, i) => {
      kids.push(new Paragraph({
        spacing: { after: i === lines.length - 1 ? 0 : 70, line: 276, lineRule: LineRuleType.AUTO },
        children: [new TextRun({ text: ln, font: BODY, size: 22, italics: true, color: NAVY })]
      }));
    });
    return new Table({
      width: { size: cw, type: WidthType.DXA },
      columnWidths: [cw],
      rows: [new TableRow({ cantSplit: true, children: [new TableCell({
        width: { size: cw, type: WidthType.DXA },
        shading: { fill: "FFFFFF", type: ShadingType.CLEAR },
        margins: { top: 40, bottom: 40, left: 230, right: 120 },
        borders: {
          top: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
          bottom: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
          right: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
          left: { style: BorderStyle.SINGLE, size: 12, color: GOLD }
        },
        children: kids
      })] })]
    });
  }

  function subhead(text, opts = {}) {
    return new Paragraph({
      spacing: { before: opts.before ?? 200, after: opts.after ?? 110 },
      keepNext: true,
      children: [new TextRun({ text, font: DISPLAY, size: opts.size ?? 26, bold: true, color: NAVY })]
    });
  }

  function ornament() {
    return new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 160, after: 160 },
      children: [new TextRun({ text: "✦", font: BODY, size: 22, color: GOLD })]
    });
  }

  /** Item de lista com rótulo em negrito + texto corrido */
  function item(boldPart, rest, ref = "bul") {
    return new Paragraph({
      numbering: { reference: ref, level: 0 },
      spacing: { after: 120, line: 288, lineRule: LineRuleType.AUTO },
      children: [
        new TextRun({ text: boldPart, font: BODY, size: 23, bold: true, color: NAVY }),
        ...(rest ? [new TextRun({ text: rest, font: BODY, size: 23, color: INK })] : [])
      ]
    });
  }

  /** Tabela de duas colunas com cabeçalho marinho */
  function tabela(headers, rows, widths) {
    const total = widths.reduce((a, b) => a + b, 0);
    const cols = widths.map(w => Math.round((w / total) * cw));
    const headerRow = new TableRow({
      tableHeader: true,
      cantSplit: true,
      children: headers.map((h, i) => new TableCell({
        width: { size: cols[i], type: WidthType.DXA },
        shading: { fill: NAVY, type: ShadingType.CLEAR },
        margins: { top: 100, bottom: 100, left: 150, right: 150 },
        borders: allBorders(NAVY),
        children: [new Paragraph({
          spacing: { after: 0 },
          keepNext: true,
          children: [new TextRun({
            text: h.toUpperCase(), font: DISPLAY, size: 16, bold: true, color: "FFFFFF", characterSpacing: 40
          })]
        })]
      }))
    });
    const bodyRows = rows.map((cells, ri) => new TableRow({
      cantSplit: true,
      children: cells.map((c, i) => new TableCell({
        width: { size: cols[i], type: WidthType.DXA },
        shading: { fill: ri % 2 ? PARCH : "FFFFFF", type: ShadingType.CLEAR },
        margins: { top: 110, bottom: 110, left: 150, right: 150 },
        borders: allBorders(SUBT),
        children: (Array.isArray(c) ? c : [c]).map((txt, k) => new Paragraph({
          spacing: { after: 0, line: 264, lineRule: LineRuleType.AUTO },
          // keepNext em tudo menos na última linha faz a tabela migrar
          // inteira para a página seguinte em vez de deixar linha órfã
          keepNext: ri < rows.length - 1,
          children: [new TextRun({
            text: txt, font: BODY, size: 21,
            color: i === 0 ? NAVY : INK, bold: i === 0 && k === 0
          })]
        }))
      }))
    }));
    return new Table({
      width: { size: cw, type: WidthType.DXA },
      columnWidths: cols,
      rows: [headerRow, ...bodyRows]
    });
  }

  function allBorders(color) {
    const b = { style: BorderStyle.SINGLE, size: 4, color };
    return { top: b, bottom: b, left: b, right: b };
  }

  /** Linhas pautadas para preenchimento à mão.
   *  Word e LibreOffice fundem parágrafos vizinhos com bordas idênticas num
   *  único bloco — n parágrafos com borda inferior virariam uma linha só.
   *  Por isso a pauta é desenhada com tabulação de preenchimento
   *  (leader underscore), que nunca se funde. */
  function linhas(n, opts = {}) {
    const largura = opts.width ?? cw;
    const out = [];
    for (let i = 0; i < n; i++) {
      out.push(new Paragraph({
        spacing: { before: opts.before ?? 0, after: opts.after ?? 200, line: 240, lineRule: LineRuleType.AUTO },
        tabStops: [{ type: TabStopType.RIGHT, position: largura, leader: "underscore" }],
        indent: opts.indent,
        children: [new TextRun({ text: "\t", font: BODY, size: 22, color: opts.color ?? SUBT })]
      }));
    }
    return out;
  }

  /** Campo de formulário: rótulo dourado + linhas pautadas */
  function campo(labelText, n = 1, opts = {}) {
    return [
      label(labelText, GOLDDK, opts.labelSize ?? 16),
      ...linhas(n, { ...opts, after: opts.after ?? 260 })
    ];
  }

  return {
    gap, r, body, bodyRuns, label, blockHeader, boxCell, pergunte, nota,
    destaque, aterrissar, biblia, subhead, ornament, item, tabela, linhas, campo, cw
  };
}

/** Capa padrão IPE */
function capa(h, { titulo, subtitulo, tipo, linhaExtra, data, farol = true, tituloSize = 52 }) {
  const { gap } = h;
  const out = [
    gap(360),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 60 }, children: [new TextRun({ text: "IGREJA PRESBITERIANA ESPERANÇA", font: DISPLAY, size: 19, bold: true, color: GOLDDK, characterSpacing: 90 })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 200 }, children: [new TextRun({ text: "Nova Iguaçu · Rio de Janeiro", font: BODY, size: 18, italics: true, color: INK })] })
  ];
  if (farol) {
    out.push(new Paragraph({
      alignment: AlignmentType.CENTER, spacing: { after: 200 },
      children: [new ImageRun({
        type: "png", data: fs.readFileSync(FAROL),
        transformation: { width: 132, height: 182 },
        altText: { title: "Farol", description: "Símbolo da Igreja Presbiteriana Esperança", name: "Farol IPE" }
      })]
    }));
  }
  out.push(
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 30 }, children: [new TextRun({ text: titulo, font: DISPLAY, size: tituloSize, bold: true, color: NAVY })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 120 }, border: { bottom: { style: BorderStyle.SINGLE, size: 12, color: GOLD, space: 10 } }, children: [] })
  );
  if (subtitulo) {
    out.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 120, after: 40 }, children: [new TextRun({ text: subtitulo, font: DISPLAY, size: 30, italics: true, color: GOLDDK })] }));
  }
  out.push(gap(220));
  if (tipo) {
    out.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 40 }, children: [new TextRun({ text: tipo.toUpperCase(), font: DISPLAY, size: 20, bold: true, color: NAVY, characterSpacing: 80 })] }));
  }
  (linhaExtra || []).forEach(l => {
    out.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 36 }, children: [new TextRun({ text: l, font: BODY, size: 21, italics: true, color: INK })] }));
  });
  if (data) {
    out.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 60, after: 30 }, children: [new TextRun({ text: data, font: BODY, size: 21, color: INK })] }));
  }
  out.push(
    gap(400),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 20 }, children: [new TextRun({ text: "“Lâmpada para os meus pés é a tua palavra", font: BODY, size: 20, italics: true, color: NAVY })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 50 }, children: [new TextRun({ text: "e luz para os meus caminhos.”", font: BODY, size: 20, italics: true, color: NAVY })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 0 }, children: [new TextRun({ text: "SALMO 119.105", font: DISPLAY, size: 15, bold: true, color: GOLDDK, characterSpacing: 60 })] })
  );
  return out;
}

/** Colofão padrão */
function colofao(h, descricao) {
  const { gap } = h;
  return [
    gap(280),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 50 }, border: { top: { style: BorderStyle.SINGLE, size: 8, color: GOLD, space: 10 } }, children: [] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 60, after: 30 }, children: [new TextRun({ text: "IGREJA PRESBITERIANA ESPERANÇA", font: DISPLAY, size: 16, bold: true, color: NAVY, characterSpacing: 70 })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 30 }, children: [new TextRun({ text: "Nova Iguaçu · Rio de Janeiro", font: BODY, size: 18, italics: true, color: INK })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 60 }, children: [new TextRun({ text: descricao, font: BODY, size: 18, color: INK })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 0 }, children: [new TextRun({ text: "Soli Deo Gloria", font: DISPLAY, size: 18, italics: true, color: GOLDDK })] })
  ];
}

/** Monta e grava o documento */
function build({ children, titulo, cabecalho, pagina = A4, out, rodape = true }) {
  const doc = new Document({
    creator: "Igreja Presbiteriana Esperança",
    title: titulo,
    styles: { default: { document: { run: { font: BODY, size: 23, color: INK } } } },
    numbering: {
      config: ["bul", "bul2", "bul3"].map(ref => ({
        reference: ref,
        levels: [{
          level: 0, format: LevelFormat.BULLET, text: "—", alignment: AlignmentType.LEFT,
          style: { run: { color: GOLD }, paragraph: { indent: { left: 460, hanging: 280 } } }
        }]
      })).concat(["num", "num2", "num3"].map(ref => ({
        reference: ref,
        levels: [{
          level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT,
          style: { run: { color: GOLDDK, bold: true }, paragraph: { indent: { left: 460, hanging: 320 } } }
        }]
      })))
    },
    sections: [{
      properties: { page: { size: pagina.size, margin: pagina.margin }, titlePage: true },
      headers: {
        first: new Header({ children: [new Paragraph({ children: [] })] }),
        default: new Header({ children: [new Paragraph({
          alignment: AlignmentType.RIGHT,
          spacing: { after: 0 },
          border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: SUBT, space: 4 } },
          children: [new TextRun({ text: cabecalho.toUpperCase(), font: DISPLAY, size: 14, color: GOLDDK, characterSpacing: 30 })]
        })] })
      },
      footers: {
        first: new Footer({ children: [new Paragraph({ children: [] })] }),
        default: new Footer({ children: [rodape ? new Paragraph({
          spacing: { before: 0 },
          border: { top: { style: BorderStyle.SINGLE, size: 4, color: SUBT, space: 4 } },
          tabStops: [
            { type: TabStopType.CENTER, position: pagina.cw / 2 },
            { type: TabStopType.RIGHT, position: pagina.cw }
          ],
          children: [
            new TextRun({ text: "Igreja Presbiteriana Esperança", font: BODY, size: 16, color: INK }),
            new TextRun({ text: "\tSoli Deo Gloria\t", font: DISPLAY, size: 15, italics: true, color: GOLDDK }),
            new TextRun({ children: [PageNumber.CURRENT], font: BODY, size: 16, color: INK })
          ]
        }) : new Paragraph({ children: [] })] })
      },
      children
    }]
  });

  return Packer.toBuffer(doc).then(buffer => {
    fs.writeFileSync(out, buffer);
    console.log(`${path.basename(out)} — ${buffer.length} bytes`);
  });
}

module.exports = {
  NAVY, GOLD, GOLDDK, PARCH, PALEGOLD, SUBT, INK, DISPLAY, BODY,
  A4, A5, helpers, capa, colofao, build,
  Paragraph, TextRun, Table, TableRow, TableCell, AlignmentType,
  BorderStyle, WidthType, ShadingType, LineRuleType, TabStopType, PageBreak: require("docx").PageBreak
};
