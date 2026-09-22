/* Ficha semanal do PG — uma folha A4 para preencher à mão */
const path = require("path");
const I = require("./ipe");
const { A4, helpers, build, NAVY, GOLD, GOLDDK, INK, SUBT, PARCH, BODY, DISPLAY,
        Paragraph, TextRun, Table, TableRow, TableCell, AlignmentType,
        BorderStyle, WidthType, ShadingType, LineRuleType } = I;

const h = helpers(A4.cw);
const { gap, body, r, subhead, campo, linhas, label } = h;
const CW = A4.cw;

/** Cabeçalho da ficha */
function topo() {
  return [
    new Paragraph({
      spacing: { after: 40 },
      children: [new TextRun({ text: "IGREJA PRESBITERIANA ESPERANÇA", font: DISPLAY, size: 16, bold: true, color: GOLDDK, characterSpacing: 80 })]
    }),
    new Paragraph({
      spacing: { after: 20 },
      border: { bottom: { style: BorderStyle.SINGLE, size: 12, color: GOLD, space: 6 } },
      children: [new TextRun({ text: "Ficha semanal do Pequeno Grupo", font: DISPLAY, size: 38, bold: true, color: NAVY })]
    }),
    new Paragraph({
      spacing: { before: 120, after: 180 },
      children: [new TextRun({
        text: "Preencha na segunda ou na terça, em trinta minutos, com a passagem aberta — não com as anotações do sermão.",
        font: BODY, size: 20, italics: true, color: INK
      })]
    })
  ];
}

/** Linha de campos curtos lado a lado, com pauta */
function campoInline(pares) {
  const total = pares.reduce((a, p) => a + p[1], 0);
  return new Table({
    width: { size: CW, type: WidthType.DXA },
    columnWidths: pares.map(p => Math.round((p[1] / total) * CW)),
    rows: [new TableRow({
      children: pares.map((p, i) => new TableCell({
        width: { size: Math.round((p[1] / total) * CW), type: WidthType.DXA },
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
          // espaço em branco para escrever à mão
          new Paragraph({ spacing: { after: 220 }, children: [] })
        ]
      }))
    })]
  });
}

/** Seção numerada com faixa marinho */
function secao(num, titulo, tempo) {
  return new Table({
    width: { size: CW, type: WidthType.DXA },
    columnWidths: [CW],
    rows: [new TableRow({ children: [new TableCell({
      width: { size: CW, type: WidthType.DXA },
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
        tabStops: [{ type: I.TabStopType.RIGHT, position: CW - 360 }],
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
    children: [new TextRun({ text: texto, font: BODY, size: 19, italics: true, color: GOLDDK })]
  });
}

/** Caixa de checklist */
function check(texto) {
  return new Paragraph({
    spacing: { after: 130, line: 276, lineRule: LineRuleType.AUTO },
    children: [
      new TextRun({ text: "☐  ", font: BODY, size: 24, color: GOLD }),
      new TextRun({ text: texto, font: BODY, size: 21, color: INK })
    ]
  });
}

const C = [];

// ---------- PÁGINA 1 ----------
C.push(...topo());
C.push(
  campoInline([["PG", 34], ["Data", 22], ["Texto-base", 44]]),
  gap(200),
  campoInline([["Título do sermão", 100]]),
  gap(260),

  secao("1", "O telos, em uma frase"),
  dica("Por que o Espírito Santo pôs este texto na Escritura? Se não cabe em uma frase, você ainda não sabe — pergunte ao pastor antes de terça."),
  ...linhas(2),
  gap(160),

  secao("2", "Relembrar — três perguntas, só", "movimento 3 · 15 min"),
  dica("Você fala no máximo um quarto deste bloco."),
  ...linhas(3),
  gap(160),

  secao("3", "Existencial — a pergunta de duas portas", "movimento 4a · 25 min"),
  dica("Uma pergunta que o cristão e quem ainda não crê conseguem responder com honestidade. Sem jargão. Sem resposta certa."),
  ...linhas(2),
  gap(120),
  ...campo("Quem é a pessoa que o texto confronta ou consola?", 1),
  gap(100),
  ...campo("O ídolo / salvador funcional que o texto expõe", 1)
);

// ---------- PÁGINA 2 ----------
C.push(new Paragraph({ pageBreakBefore: true, spacing: { after: 0 }, children: [] }));
C.push(
  secao("4", "Evangelho — antes de qualquer passo prático", "movimento 4b"),
  dica("Toda semana. Com ou sem visitante."),
  ...campo("O que este texto exige que nenhum de nós cumpriu?", 2),
  gap(100),
  ...campo("Onde Jesus cumpriu isso em nosso lugar?", 2),
  gap(180),

  secao("5", "Andar — um passo concreto", "movimento 5 · 10 min"),
  dica("Quem, quando, onde. “Vou ser mais paciente” não é passo."),
  ...linhas(2),
  gap(180),

  secao("6", "Orar — pelo nome", "movimento 6 · 10 min"),
  dica("Ligue cada pedido a uma promessa ou mandamento da Escritura."),
  gap(60)
);

// Tabela de oração
const cols = [Math.round(CW * 0.26), Math.round(CW * 0.44), Math.round(CW * 0.30)];
const header = new TableRow({
  tableHeader: true,
  children: ["Nome", "O que ouvi", "Texto para orar"].map((t, i) => new TableCell({
    width: { size: cols[i], type: WidthType.DXA },
    shading: { fill: PARCH, type: ShadingType.CLEAR },
    margins: { top: 80, bottom: 80, left: 140, right: 140 },
    borders: {
      top: { style: BorderStyle.SINGLE, size: 4, color: SUBT },
      bottom: { style: BorderStyle.SINGLE, size: 8, color: GOLD },
      left: { style: BorderStyle.SINGLE, size: 4, color: SUBT },
      right: { style: BorderStyle.SINGLE, size: 4, color: SUBT }
    },
    children: [new Paragraph({
      spacing: { after: 0 },
      children: [new TextRun({ text: t.toUpperCase(), font: DISPLAY, size: 15, bold: true, color: GOLDDK, characterSpacing: 40 })]
    })]
  }))
});
const vazias = [];
for (let i = 0; i < 7; i++) {
  vazias.push(new TableRow({
    height: { value: 460, rule: "atLeast" },
    children: cols.map(w => new TableCell({
      width: { size: w, type: WidthType.DXA },
      margins: { top: 80, bottom: 80, left: 140, right: 140 },
      borders: {
        top: { style: BorderStyle.SINGLE, size: 4, color: SUBT },
        bottom: { style: BorderStyle.SINGLE, size: 4, color: SUBT },
        left: { style: BorderStyle.SINGLE, size: 4, color: SUBT },
        right: { style: BorderStyle.SINGLE, size: 4, color: SUBT }
      },
      children: [new Paragraph({ spacing: { after: 0 }, children: [] })]
    }))
  }));
}
C.push(new Table({ width: { size: CW, type: WidthType.DXA }, columnWidths: cols, rows: [header, ...vazias] }));

// ---------- PÁGINA 3 ----------
C.push(new Paragraph({ pageBreakBefore: true, spacing: { after: 0 }, children: [] }));
C.push(
  secao("✓", "Antes de sair de casa"),
  gap(140),
  check("Quem eu vou buscar hoje? ______________________________________"),
  check("Quem faltou na semana passada? ________________________________"),
  check("Há visitante esperado? Avisar, em voz alta, que ninguém é obrigado a ler ou orar."),
  check("Orei pelos nomes do meu grupo, um por um."),
  gap(240),

  secao("✓", "Depois do encontro"),
  gap(140),
  ...campo("Dúvida para levar ao pastor", 2),
  gap(120),
  ...campo("Alguém que preciso procurar durante a semana", 2),
  gap(200)
);

// Caixa de salvaguarda
C.push(new Table({
  width: { size: CW, type: WidthType.DXA },
  columnWidths: [CW],
  rows: [new TableRow({ children: [new TableCell({
    width: { size: CW, type: WidthType.DXA },
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
}));

C.push(
  gap(300),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 30 },
    border: { top: { style: BorderStyle.SINGLE, size: 8, color: GOLD, space: 10 } },
    children: []
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 80, after: 0 },
    children: [new TextRun({ text: "Igreja Presbiteriana Esperança · Soli Deo Gloria", font: DISPLAY, size: 18, italics: true, color: GOLDDK })]
  })
);

build({
  children: C,
  titulo: "Ficha semanal do Pequeno Grupo",
  cabecalho: "Ficha semanal do Pequeno Grupo",
  pagina: A4,
  out: path.join(__dirname, "..", "ficha-semanal.docx")
});
