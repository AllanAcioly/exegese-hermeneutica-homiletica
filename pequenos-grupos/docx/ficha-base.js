/* =====================================================================
 *  BASE VISUAL DA FICHA SEMANAL
 *  ---------------------------------------------------------------------
 *  Vocabulário compartilhado entre a ficha em branco (ficha-semanal.js) e
 *  as fichas modelo já preenchidas (ficha-modelo-*.js), para que as duas
 *  sejam idênticas em estrutura — é isso que faz o modelo ensinar.
 * ===================================================================== */

const I = require("./ipe");
const {
  NAVY, GOLD, GOLDDK, INK, SUBT, PARCH, BODY, DISPLAY,
  Paragraph, TextRun, Table, TableRow, TableCell,
  AlignmentType, BorderStyle, WidthType, ShadingType, LineRuleType, TabStopType
} = I;

function base(cw) {
  /** Cabeçalho da ficha */
  function topo(titulo, subtitulo) {
    return [
      new Paragraph({
        spacing: { after: 40 },
        children: [new TextRun({ text: "IGREJA PRESBITERIANA ESPERANÇA", font: DISPLAY, size: 16, bold: true, color: GOLDDK, characterSpacing: 80 })]
      }),
      new Paragraph({
        spacing: { after: 20 },
        border: { bottom: { style: BorderStyle.SINGLE, size: 12, color: GOLD, space: 6 } },
        children: [new TextRun({ text: titulo, font: DISPLAY, size: 38, bold: true, color: NAVY })]
      }),
      new Paragraph({
        spacing: { before: 120, after: 180 },
        children: [new TextRun({ text: subtitulo, font: BODY, size: 20, italics: true, color: INK })]
      })
    ];
  }

  /** Faixa de aviso — usada só nas fichas modelo */
  function faixaModelo(texto) {
    return new Table({
      width: { size: cw, type: WidthType.DXA },
      columnWidths: [cw],
      rows: [new TableRow({ cantSplit: true, children: [new TableCell({
        width: { size: cw, type: WidthType.DXA },
        shading: { fill: GOLD, type: ShadingType.CLEAR },
        margins: { top: 110, bottom: 110, left: 200, right: 200 },
        borders: {
          top: { style: BorderStyle.NONE, size: 0, color: GOLD },
          bottom: { style: BorderStyle.NONE, size: 0, color: GOLD },
          right: { style: BorderStyle.NONE, size: 0, color: GOLD },
          left: { style: BorderStyle.SINGLE, size: 22, color: NAVY }
        },
        children: [new Paragraph({
          spacing: { after: 0, line: 276, lineRule: LineRuleType.AUTO },
          children: [new TextRun({ text: texto, font: DISPLAY, size: 21, bold: true, color: NAVY })]
        })]
      })] })]
    });
  }

  /** Campos curtos lado a lado. Cada par é [rótulo, peso, valor?].
   *  Sem valor, sai em branco para preencher à mão. */
  function campoInline(pares) {
    const total = pares.reduce((a, p) => a + p[1], 0);
    const cols = pares.map(p => Math.round((p[1] / total) * cw));
    return new Table({
      width: { size: cw, type: WidthType.DXA },
      columnWidths: cols,
      rows: [new TableRow({
        cantSplit: true,
        children: pares.map((p, i) => new TableCell({
          width: { size: cols[i], type: WidthType.DXA },
          margins: { top: 40, bottom: 40, left: i === 0 ? 0 : 160, right: 160 },
          borders: {
            top: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
            left: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
            right: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
            bottom: { style: BorderStyle.SINGLE, size: 6, color: SUBT }
          },
          children: [
            new Paragraph({
              spacing: { after: 60 },
              children: [new TextRun({ text: p[0].toUpperCase(), font: DISPLAY, size: 15, bold: true, color: GOLDDK, characterSpacing: 40 })]
            }),
            new Paragraph({
              spacing: { after: p[2] ? 90 : 220 },
              children: p[2] ? [new TextRun({ text: p[2], font: BODY, size: 21, color: NAVY })] : []
            })
          ]
        }))
      })]
    });
  }

  /** Faixa marinho numerada que abre cada seção */
  function secao(num, titulo, tempo) {
    return new Table({
      width: { size: cw, type: WidthType.DXA },
      columnWidths: [cw],
      rows: [new TableRow({ cantSplit: true, children: [new TableCell({
        width: { size: cw, type: WidthType.DXA },
        shading: { fill: NAVY, type: ShadingType.CLEAR },
        margins: { top: 90, bottom: 90, left: 180, right: 180 },
        borders: {
          top: { style: BorderStyle.NONE, size: 0, color: NAVY },
          bottom: { style: BorderStyle.NONE, size: 0, color: NAVY },
          right: { style: BorderStyle.NONE, size: 0, color: NAVY },
          left: { style: BorderStyle.SINGLE, size: 22, color: GOLD }
        },
        children: [new Paragraph({
          spacing: { after: 0 },
          keepNext: true,
          tabStops: [{ type: TabStopType.RIGHT, position: cw - 360 }],
          children: [
            new TextRun({ text: `${num}  `, font: DISPLAY, size: 22, bold: true, color: GOLD }),
            new TextRun({ text: titulo, font: DISPLAY, size: 22, bold: true, color: "FFFFFF" }),
            ...(tempo ? [new TextRun({ text: `\t${tempo}`, font: BODY, size: 17, italics: true, color: GOLD })] : [])
          ]
        })]
      })] })]
    });
  }

  /** Instrução em itálico sob o título da seção */
  function dica(texto) {
    return new Paragraph({
      spacing: { before: 110, after: 130 },
      keepNext: true,
      children: [new TextRun({ text: texto, font: BODY, size: 19, italics: true, color: GOLDDK })]
    });
  }

  /** Resposta preenchida (fichas modelo) */
  function resposta(texto, opts = {}) {
    return new Paragraph({
      spacing: { after: opts.after ?? 160, line: 288, lineRule: LineRuleType.AUTO },
      indent: { left: 120 },
      children: [new TextRun({ text: texto, font: BODY, size: opts.size ?? 22, color: NAVY, italics: !!opts.italics })]
    });
  }

  /** Resposta numerada (fichas modelo) */
  function respostaNum(n, texto) {
    return new Paragraph({
      spacing: { after: 140, line: 288, lineRule: LineRuleType.AUTO },
      indent: { left: 420, hanging: 300 },
      children: [
        new TextRun({ text: `${n}.  `, font: DISPLAY, size: 22, bold: true, color: GOLDDK }),
        new TextRun({ text: texto, font: BODY, size: 22, color: NAVY })
      ]
    });
  }

  /** Rótulo de subcampo dourado */
  function subcampo(texto) {
    return new Paragraph({
      spacing: { before: 60, after: 80 },
      keepNext: true,
      children: [new TextRun({ text: texto.toUpperCase(), font: DISPLAY, size: 16, bold: true, color: GOLDDK, characterSpacing: 40 })]
    });
  }

  /** Item de checklist */
  function check(texto) {
    return new Paragraph({
      spacing: { after: 130, line: 276, lineRule: LineRuleType.AUTO },
      children: [
        new TextRun({ text: "☐  ", font: BODY, size: 24, color: GOLD }),
        new TextRun({ text: texto, font: BODY, size: 21, color: INK })
      ]
    });
  }

  /** Tabela de oração. `linhas` preenchidas + `vazias` em branco. */
  function tabelaOracao(linhas = [], vazias = 6) {
    const cols = [Math.round(cw * 0.26), Math.round(cw * 0.44), Math.round(cw * 0.30)];
    const borda = c => ({
      top: { style: BorderStyle.SINGLE, size: 4, color: SUBT },
      bottom: { style: BorderStyle.SINGLE, size: c ? 8 : 4, color: c ? GOLD : SUBT },
      left: { style: BorderStyle.SINGLE, size: 4, color: SUBT },
      right: { style: BorderStyle.SINGLE, size: 4, color: SUBT }
    });
    const header = new TableRow({
      tableHeader: true,
      cantSplit: true,
      children: ["Nome", "O que ouvi", "Texto para orar"].map((t, i) => new TableCell({
        width: { size: cols[i], type: WidthType.DXA },
        shading: { fill: PARCH, type: ShadingType.CLEAR },
        margins: { top: 80, bottom: 80, left: 140, right: 140 },
        borders: borda(true),
        children: [new Paragraph({
          spacing: { after: 0 },
          keepNext: true,
          children: [new TextRun({ text: t.toUpperCase(), font: DISPLAY, size: 15, bold: true, color: GOLDDK, characterSpacing: 40 })]
        })]
      }))
    });
    const cheias = linhas.map(cells => new TableRow({
      cantSplit: true,
      height: { value: 460, rule: "atLeast" },
      children: cells.map((c, i) => new TableCell({
        width: { size: cols[i], type: WidthType.DXA },
        margins: { top: 80, bottom: 80, left: 140, right: 140 },
        borders: borda(false),
        children: [new Paragraph({
          spacing: { after: 0, line: 252, lineRule: LineRuleType.AUTO },
          children: [new TextRun({ text: c, font: BODY, size: 19, color: c ? NAVY : INK, italics: i === 1 })]
        })]
      }))
    }));
    const brancas = [];
    for (let i = 0; i < vazias; i++) {
      brancas.push(new TableRow({
        cantSplit: true,
        height: { value: 460, rule: "atLeast" },
        children: cols.map(w => new TableCell({
          width: { size: w, type: WidthType.DXA },
          margins: { top: 80, bottom: 80, left: 140, right: 140 },
          borders: borda(false),
          children: [new Paragraph({ spacing: { after: 0 }, children: [] })]
        }))
      }));
    }
    return new Table({ width: { size: cw, type: WidthType.DXA }, columnWidths: cols, rows: [header, ...cheias, ...brancas] });
  }

  /** Caixa marinho de salvaguarda, comum às duas fichas */
  function salvaguarda() {
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
        children: [
          new Paragraph({
            spacing: { after: 90 },
            children: [new TextRun({ text: "SOBE AO PASTOR HOJE?", font: DISPLAY, size: 18, bold: true, color: GOLD, characterSpacing: 60 })]
          }),
          new Paragraph({
            spacing: { after: 110, line: 288, lineRule: LineRuleType.AUTO },
            children: [new TextRun({
              text: "violência doméstica · abuso sexual · menção a querer morrer · adultério ou separação em curso · vício sem controle · envolvimento com crime",
              font: BODY, size: 20, color: "FFFFFF"
            })]
          }),
          new Paragraph({
            spacing: { after: 110 },
            children: [new TextRun({ text: "☐  Não          ☐  Sim — avisar hoje", font: BODY, size: 22, color: "FFFFFF" })]
          }),
          new Paragraph({
            spacing: { after: 0, line: 288, lineRule: LineRuleType.AUTO },
            children: [new TextRun({
              text: "“Eu vou te ouvir e não vou contar por aí. Se for algo que precisa de mais ajuda do que eu posso dar, eu te ajudo a levar isso ao pastor — mas eu não vou fazer isso pelas suas costas.”",
              font: DISPLAY, size: 21, italics: true, color: "FFFFFF"
            })]
          })
        ]
      })] })]
    });
  }

  /** Fecho da ficha */
  function fecho() {
    return [
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 300, after: 30 },
        border: { top: { style: BorderStyle.SINGLE, size: 8, color: GOLD, space: 10 } },
        children: []
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 80, after: 0 },
        children: [new TextRun({ text: "Igreja Presbiteriana Esperança · Soli Deo Gloria", font: DISPLAY, size: 18, italics: true, color: GOLDDK })]
      })
    ];
  }

  return {
    topo, faixaModelo, campoInline, secao, dica, resposta, respostaNum,
    subcampo, check, tabelaOracao, salvaguarda, fecho
  };
}

module.exports = { base };
