/* Ficha semanal PREENCHIDA — modelo a partir de Lucas 15.1-10
 * Mesma estrutura da ficha em branco (ficha-base.js): é isso que faz o
 * modelo ensinar. A última página traz as notas de condução, que existem
 * só nesta versão. */
const path = require("path");
const I = require("./ipe");
const { A4, helpers, build, NAVY, GOLDDK, DISPLAY, BODY,
        Paragraph, TextRun, AlignmentType, LineRuleType } = I;
const { base } = require("./ficha-base");

const h = helpers(A4.cw);
const b = base(A4.cw);
const { gap, body, bodyRuns, r, subhead, item, destaque, nota } = h;
const { topo, faixaModelo, campoInline, secao, dica, resposta, respostaNum,
        subcampo, check, tabelaOracao, salvaguarda, fecho } = b;

const C = [];

// ---------- PÁGINA 1 ----------
C.push(...topo(
  "Ficha semanal do Pequeno Grupo",
  "Preencha na segunda ou na terça, em trinta minutos, com a passagem aberta — não com as anotações do sermão."
));
C.push(
  faixaModelo("FICHA MODELO — preenchida a partir do sermão de domingo, 20/09. Os campos deixados em branco são os de pessoas: esses são de cada líder. O que está preenchido é o trabalho do texto, e vale para todos os PGs."),
  gap(180),
  campoInline([["PG", 34], ["Data", 22, "23 / 09 / 2026"], ["Texto-base", 44, "Lucas 15.1-10"]]),
  gap(200),
  campoInline([["Título do sermão", 100, "O Rei Busca Seus Perdidos"]]),
  gap(200),

  secao("1", "O telos, em uma frase"),
  dica("Por que o Espírito Santo pôs este texto na Escritura? Se não cabe em uma frase, você ainda não sabe — pergunte ao pastor antes de terça."),
  resposta("Murmurar contra a recepção de pecadores é opor-se ao coração de Deus — porque Deus busca ativamente os perdidos, se alegra com o arrependimento deles, e exige que seu povo compartilhe dessa alegria."),
  gap(140),

  secao("2", "Relembrar — três perguntas, só", "movimento 3 · 15 min"),
  dica("Você fala no máximo um quarto deste bloco."),
  respostaNum(1, "Versos 1 e 2: dois grupos estão diante de Jesus e reagem de formas opostas. Quem são, e o que cada um faz?"),
  respostaNum(2, "O que o pastor mostrou no domingo que você não tinha visto antes nesse texto?"),
  respostaNum(3, "Ficou alguma dúvida do domingo?"),
  gap(140),

  secao("3", "Existencial — a pergunta de duas portas", "movimento 4a · 25 min"),
  dica("Uma pergunta que o cristão e quem ainda não crê conseguem responder com honestidade. Sem jargão. Sem resposta certa."),
  resposta("“Quem é a pessoa cuja boa notícia é mais difícil de você comemorar de verdade?”", { after: 110 }),
  resposta("E o rastro, quando alguém responder: “o que essa pessoa teria que fazer para você achar que ela merece?”", { italics: true, size: 21 }),
  gap(120),
  subcampo("Quem é a pessoa que o texto confronta ou consola?"),
  resposta("Confronta o religioso de casa cheia — quem está há anos na igreja e faz a contabilidade da graça alheia (vv. 1-2). Consola quem se acha longe demais para ser procurado: a ovelha no deserto e, pior, a moeda do v. 8, que nem consegue se procurar."),
  gap(60),
  subcampo("O ídolo / salvador funcional que o texto expõe"),
  resposta("Autojustiça — a própria performance moral e religiosa como base de identidade, valor e segurança. A mentira do ídolo: “minha obediência me torna aceitável e superior; Deus é devedor de quem cumpre.”")
);

// ---------- SEÇÃO 4 ----------
C.push(
  gap(180),
  secao("4", "Evangelho — antes de qualquer passo prático", "movimento 4b"),
  dica("Toda semana. Com ou sem visitante."),
  subcampo("O que este texto exige que nenhum de nós cumpriu?"),
  resposta("Ter o coração de Deus pelos perdidos: alegrar-se de verdade quando a graça alcança quem a gente julgou indigno. Dá para forçar a hospitalidade; não dá para fabricar a alegria."),
  gap(60),
  subcampo("Onde Jesus cumpriu isso em nosso lugar?"),
  resposta("Ele é o único ser humano que de fato cabe na categoria do v. 7 — “justo que não necessita de arrependimento”. E usa essa justiça não para se afastar dos pecadores, mas para comer com eles e morrer por eles. É o Pastor de Ezequiel 34.11 (“eu mesmo buscarei as minhas ovelhas”) que dá a vida pela ovelha (Jo 10.11). Nenhum de nós se apresentou: fomos carregados nos ombros."),
  gap(160),

  secao("5", "Andar — um passo concreto", "movimento 5 · 10 min"),
  dica("Quem, quando, onde. “Vou ser mais paciente” não é passo."),
  resposta("Escreva o nome de uma pessoa que se afastou — da igreja, de Deus ou de você. Mande uma mensagem a ela antes de domingo. Não um sermão nem um convite: “lembrei de você essa semana. Como você está de verdade?”", { after: 110 }),
  resposta("Feche perguntando a cada um: “quem aqui você quer que te pergunte sobre isso no domingo?”", { italics: true, size: 21 }),
  gap(160),

  secao("6", "Orar — pelo nome", "movimento 6 · 10 min"),
  dica("O banco de textos se prepara em casa. A tabela se preenche durante o encontro, com o que cada um disse."),
  nota([
    "quem não consegue comemorar a graça alheia  ·  Rm 3.23-24",
    "quem veio com vergonha, achando que é tarde  ·  Lc 15.5  ·  Ez 34.11-12",
    "quem se sente não procurado por ninguém  ·  Lc 15.8  ·  Sl 139.1-3",
    "quem perdeu a alegria pelo caminho  ·  Sl 51.10-12",
    "pela pessoa que cada um vai procurar esta semana  ·  Lc 15.4"
  ], "Banco de textos preparado em casa"),
  gap(140),
  tabelaOracao([], 5)
);

// ---------- FECHAMENTO ----------
C.push(
  gap(180),
  secao("✓", "Antes de sair de casa"),
  gap(110),
  check("Quem eu vou buscar hoje? _______________________________________"),
  check("Quem faltou na semana passada? _________________________________"),
  check("Há visitante esperado? Avisar, em voz alta, que ninguém é obrigado a ler ou orar."),
  check("Orei pelos nomes do meu grupo, um por um."),
  gap(170),

  secao("✓", "Depois do encontro"),
  gap(110),
  subcampo("Dúvida para levar ao pastor"),
  resposta("Se “não há justo, nem um sequer” (Rm 3.10), em que sentido Jesus fala de “noventa e nove justos que não necessitam de arrependimento” (v. 7)?", { after: 110 }),
  subcampo("Alguém que preciso procurar durante a semana"),
  gap(120),
  salvaguarda()
);

// ---------- NOTAS (só no modelo) ----------
C.push(
  gap(320),
  ...h.blockHeader("Só nesta ficha modelo", "Por que ela foi preenchida assim", null, { samePage: true })
);

[
  ["O telos veio do estudo, não do sermão.",
   " Está na Fase 2 do estudo de Lucas 15.1-10. O líder que tenta extrair o telos das próprias anotações de domingo costuma pegar o ponto que mais o impressionou — que quase nunca é o propósito do texto."],
  ["As três perguntas do bloco 2 são de memória e observação.",
   " Nenhuma exige seminário. A primeira pede o que o texto diz; a segunda abre espaço para o que o sermão acrescentou; a terceira é a que o líder mais esquece, e é a que impede o grupo de sair com dúvida engasgada."],
  ["A pergunta de duas portas não tem uma palavra de igreja.",
   " Teste aplicado: um vizinho que nunca entrou numa igreja responde “quem é a pessoa cuja boa notícia é mais difícil de comemorar?” sem precisar de tradução. E responde com honestidade, porque não existe resposta certa — a resposta certa, aqui, seria mentira."],
  ["O campo 4 vem antes do campo 5 de propósito.",
   " Se o líder preenche o passo prático primeiro e o evangelho depois, o evangelho vira apêndice. E um PG que manda “vá procurar alguém” sem antes dizer que fomos procurados está pedindo que a ovelha faça o trabalho do Pastor."],
  ["O passo prático é o que o sermão já mandou fazer.",
   " O PG não inventa tarefa nova — persegue a que já foi dada, e acrescenta o que o púlpito não pode dar: nome, prazo e alguém para cobrar."],
  ["Os campos em branco são os de pessoas.",
   " Quem buscar, quem procurar na semana, quem faltou — isso é de cada líder e do grupo dele. O que está preenchido é o trabalho do texto, e esse é igual para todos os PGs."]
].forEach(([b1, t]) => C.push(item(b1, t)));

C.push(
  subhead("A armadilha específica deste texto", { before: 300 }),
  body("Lucas 15 é o texto perfeito para o líder-professor se perder: o verbo da murmuração ecoando o deserto de Êxodo, o pastor desprezado do primeiro século, a dracma do dote, o advérbio que só aparece uma vez em todo o Novo Testamento. Tudo isso é verdadeiro. E tudo isso é do bloco 3 — com teto de quinze minutos."),
  destaque("O coração deste texto não está no costume do primeiro século. Está na pergunta de quem é a alegria que você não consegue sentir."),
  gap(200),
  nota([
    "No Bloco 5 do encontro de líderes, distribua primeiro a ficha EM BRANCO e deixe os trios trabalharem os doze minutos inteiros. Só depois entregue este modelo.",
    "Se entregar antes, eles copiam em vez de pensar — e o laboratório vira ditado."
  ], "Como usar este modelo no encontro"),
  ...fecho()
);

build({
  children: C,
  titulo: "Ficha semanal preenchida — Lucas 15.1-10",
  cabecalho: "Ficha modelo · Lucas 15.1-10",
  pagina: A4,
  out: path.join(__dirname, "..", "ficha-modelo-lucas-15.docx")
});
