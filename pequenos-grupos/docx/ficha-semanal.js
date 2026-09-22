/* Ficha semanal do PG — folha em branco, para preencher à mão */
const path = require("path");
const I = require("./ipe");
const { A4, helpers, build, Paragraph } = I;
const { base } = require("./ficha-base");

const h = helpers(A4.cw);
const b = base(A4.cw);
const { gap, campo, linhas } = h;
const { topo, campoInline, secao, dica, subcampo, check, tabelaOracao, salvaguarda, fecho } = b;

const C = [];

// ---------- PÁGINA 1 ----------
C.push(...topo(
  "Ficha semanal do Pequeno Grupo",
  "Preencha na segunda ou na terça, em trinta minutos, com a passagem aberta — não com as anotações do sermão."
));
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
  gap(60),
  tabelaOracao([], 7)
);

// ---------- PÁGINA 3 ----------
C.push(new Paragraph({ pageBreakBefore: true, spacing: { after: 0 }, children: [] }));
C.push(
  secao("✓", "Antes de sair de casa"),
  gap(140),
  check("Quem eu vou buscar hoje? _______________________________________"),
  check("Quem faltou na semana passada? _________________________________"),
  check("Há visitante esperado? Avisar, em voz alta, que ninguém é obrigado a ler ou orar."),
  check("Orei pelos nomes do meu grupo, um por um."),
  gap(240),

  secao("✓", "Depois do encontro"),
  gap(140),
  ...campo("Dúvida para levar ao pastor", 2),
  gap(120),
  ...campo("Alguém que preciso procurar durante a semana", 2),
  gap(200),
  salvaguarda(),
  ...fecho()
);

build({
  children: C,
  titulo: "Ficha semanal do Pequeno Grupo",
  cabecalho: "Ficha semanal do Pequeno Grupo",
  pagina: A4,
  out: path.join(__dirname, "..", "ficha-semanal.docx")
});
