/* Roteiro do encontro de líderes — 2 horas */
const path = require("path");
const I = require("./ipe");
const { A4, helpers, capa, colofao, build, NAVY, GOLDDK,
        Paragraph, TextRun, AlignmentType, LineRuleType, DISPLAY } = I;

const h = helpers(A4.cw);
const { gap, body, bodyRuns, r, blockHeader, pergunte, nota, destaque,
        aterrissar, biblia, subhead, ornament, item, tabela } = h;

/** Fala modelo do facilitador — caixa dourada clara, em itálico display */
function fala(linhas) {
  return aterrissar(linhas.map(l => [new TextRun({ text: l, font: DISPLAY, size: 24, italics: true, color: NAVY })]), "Você diz");
}

const C = [];

// ---------------- CAPA ----------------
C.push(...capa(h, {
  titulo: "Do púlpito ao coração",
  subtitulo: "Roteiro do encontro de líderes",
  tipo: "Guia do facilitador",
  linhaExtra: ["Capacitação de líderes de Pequeno Grupo", "Duração: 2 horas"]
}));

// ---------------- ANTES DE COMEÇAR ----------------
C.push(...blockHeader("Orientação", "Antes de começar", null));
C.push(
  subhead("Mapa do tempo", { before: 0 }),
  tabela(["Bloco", "Título", "Tempo"], [
    ["Abertura", "Comece pedindo oração", "12 min"],
    ["1", "Quatro reuniões que não são um PG", "15 min"],
    ["2", "Por que você está qualificado", "13 min"],
    ["3", "O mapa do coração", "25 min"],
    ["4", "Os seis movimentos", "22 min"],
    ["5", "Laboratório", "23 min"],
    ["6", "Salvaguarda, envio e oração", "10 min"]
  ], [18, 62, 20]),
  gap(260),

  subhead("Objetivo do encontro, em uma frase"),
  body("Que cada líder saia sabendo perguntar em vez de explicar — e com a ficha da próxima semana já preenchida."),

  subhead("O princípio que governa este roteiro"),
  body("Não dê uma palestra sobre como não dar palestras. O encontro precisa ser conduzido do jeito que você quer que eles conduzam: você pergunta mais do que fala, escuta antes de ensinar, e se expõe primeiro. Se você falar mais de metade do tempo hoje, eles vão liderar exatamente assim na terça."),
  destaque("Meta de fala do facilitador: 45% do tempo. Não mais."),

  subhead("Preparação e materiais", { before: 300 }),
  item("Manual do líder", " impresso — um por líder (entregue no início do Bloco 4)"),
  item("Ficha semanal", " — três cópias por líder, em branco"),
  item("Ficha modelo", " de Lucas 15.1-10 preenchida — um por líder (entregue só no FIM do Bloco 5)"),
  item("Cartão de bolso", " — um por líder (entregue no Bloco 6)"),
  item("Cópias do texto", " pregado no domingo passado"),
  item("Quadro ou flipchart"),
  item("Cadeiras em círculo.", " Não em fileiras, e não com você atrás de uma mesa."),
);

// ---------------- ABERTURA ----------------
C.push(...blockHeader("Abertura", "Comece pedindo oração", "12 min"));
C.push(
  nota([
    "Welch abre o livro com humildade, e dá a ela uma forma concreta — peça que alguém ore por você (Lição 1). Se você começar a capacitação ensinando, você já ensinou a coisa errada. Comece precisando."
  ], "Por que este bloco existe"),
  gap(180),

  subhead("1 · Você se expõe primeiro (3 min)", { before: 0 }),
  body("Sem introdução sobre o encontro. Sente, e conte uma dificuldade real e presente do seu ministério ou da sua casa — não uma já resolvida, com moral da história."),
  fala(["“Eu queria que alguém aqui orasse por mim nisso. Agora.”"]),
  gap(140),
  body("Deixe alguém orar. Não ore você."),

  subhead("2 · A rodada (7 min)"),
  body("Pergunte a cada líder, um por um:"),
  pergunte([
    "Qual foi o melhor momento da sua semana?",
    "E o que foi especialmente difícil?"
  ]),
  gap(140),
  body("Escute. Não resolva nada. Não comente teologicamente. Diga “sinto muito” ou “que bom” e passe adiante. Anote os nomes e o que apareceu — você vai usar no Bloco 6."),

  subhead("3 · Nomeie o que acabou de acontecer (2 min)"),
  fala([
    "“Vocês acabaram de fazer os dois primeiros movimentos de um PG. Levou doze minutos, eu não expliquei nada, e a gente já sabe mais uns dos outros do que em muitos encontros inteiros. É sobre isso que nós vamos conversar hoje.”"
  ]),
  gap(160),
  nota([
    "Se alguém trouxer algo pesado demais, acolha e diga que vocês conversam a sós depois. Não transforme a abertura em aconselhamento de uma pessoa só — e ao fazer isso você já modelou a regra que o Bloco 6 ensina."
  ])
);

// ---------------- BLOCO 1 ----------------
C.push(...blockHeader("Bloco 1", "Quatro reuniões que não são um PG", "15 min"));
C.push(
  nota(["Que cada líder reconheça a própria fuga — sem ser acusado."], "Objetivo"),
  gap(180),

  subhead("Pergunte primeiro (4 min)", { before: 0 }),
  pergunte(["Descreva pra mim, em uma frase, o que aconteceu no seu PG na semana passada."]),
  gap(140),
  body("Ouça três ou quatro. Não corrija nenhuma resposta. Você está coletando material, e eles estão se ouvindo."),

  subhead("Apresente as quatro (8 min)"),
  body("Escreva os quatro nomes no quadro e descreva cada uma em duas ou três frases. Sem nomes de pessoas, sem indiretas.", { after: 180 }),
  tabela(["", "O líder", "O sintoma"], [
    ["A sala de aula", "o professor", "o grupo aprende e o grupo se cala"],
    ["O segundo culto", "o repetidor", "a reunião funcionaria com as cadeiras vazias"],
    ["O consultório", "o conselheiro", "as pessoas param de trazer o que é difícil"],
    ["O churrasco", "o anfitrião", "todo mundo sai feliz e ninguém sai mudado"]
  ], [26, 20, 54]),
  gap(220),
  body("Diga o diagnóstico de coração de cada uma — é isso que impede que a lista vire vergonha:"),
  item("O professor não é orgulhoso;", " ele tem medo de não valer nada se não souber. Ensinar é onde ele se sente competente. Perguntar é onde ele fica exposto."),
  item("O repetidor não é preguiçoso;", " ele tem medo do silêncio e do inesperado. Repetir o sermão é seguro — ninguém chora, ninguém confessa, nada foge do controle."),
  item("O conselheiro não é insensível;", " ele tem pressa de resolver. Resolver é mais rápido que carregar."),
  item("O anfitrião não é superficial;", " ele tem medo de constranger, e acha que profundidade afasta."),
  gap(80),
  fala([
    "“Duas dessas fogem pela cabeça. Duas fogem pelo alívio. Nenhuma das quatro chega ao coração. E reparem: a cura de uma nunca é a dose da outra. Quem descobre que virou professor não se corrige virando anfitrião.”"
  ]),

  subhead("A pergunta desconfortável (3 min)", { before: 300 }),
  destaque("Qual dessas quatro é a sua?"),
  gap(160),
  body("Não peça resposta em voz alta. Trinta segundos de silêncio. Depois:"),
  fala([
    "“Não precisa dizer. Mas vocês sabem. E daqui pra frente, tudo o que a gente vai fazer é a alternativa a essas quatro.”"
  ])
);

// ---------------- BLOCO 2 ----------------
C.push(...blockHeader("Bloco 2", "Por que você está qualificado", "13 min"));
C.push(
  nota(["Tirar o peso errado e pôr o peso certo. O líder de PG não é um pastor amador nem um professor de teologia — e não precisa ser."], "Objetivo"),
  gap(180),
  subhead("O texto (5 min)", { before: 0 }),
  body("Peça que um líder leia em voz alta."),
  biblia("Efésios 4.11-13", [
    "“E ele mesmo concedeu uns para apóstolos, outros para profetas, outros para evangelistas e outros para pastores e mestres, com vistas ao aperfeiçoamento dos santos para o desempenho do seu serviço, para a edificação do corpo de Cristo...”"
  ]),
  gap(160),
  pergunte(["Quem faz o trabalho de edificar o corpo nesse texto?"]),
  gap(140),
  body("Deixe o grupo chegar sozinho: os santos. Os pastores e mestres equipam; o trabalho de cuidado acontece nas mãos de gente comum."),

  subhead("Diga (5 min)"),
  item("O culto e o PG são trabalhos diferentes.", " No domingo a Palavra é pregada a muitos ao mesmo tempo. No PG ela é perseguida até o coração de um de cada vez, pelo nome. O sermão entrega o alvo; o PG descobre onde o alvo acertou.", "num"),
  item("Por isso o PG não é a repetição do culto em escala menor.", " E há um detalhe prático: o sermão já foi pregado uma vez, com preparo e com unção. A segunda vez, resumida de memória numa terça-feira, é sempre pior. Você está competindo com você mesmo e perdendo.", "num"),
  item("Vocês não precisam saber mais. Precisam perguntar melhor.", " Welch começa o livro assim: se você confia em Jesus e não em si mesmo, e se sente fraco e desqualificado, então você está qualificado. Então você foi chamado.", "num"),

  subhead("Feche com Provérbios 20.5 (3 min)", { before: 300 }),
  biblia("Provérbios 20.5", [
    "“Como águas profundas, são os propósitos do coração do homem, mas o homem de inteligência sabe descobri-los.”"
  ]),
  gap(160),
  fala([
    "“Reparem no que o texto chama de inteligência. Não é ter a resposta. É saber tirar de dentro. Esse é o trabalho de vocês, e é o que a gente vai treinar agora.”"
  ])
);

// ---------------- BLOCO 3 ----------------
C.push(...blockHeader("Bloco 3", "O mapa do coração", "25 min"));
C.push(
  nota(["Entregar a ferramenta principal. Este é o bloco central do encontro. Se faltar tempo em algum lugar, não pode ser aqui."], "Objetivo"),
  gap(180),

  subhead("(a) O diagrama — 6 min", { before: 0 }),
  body("Desenhe no quadro: um círculo pequeno no centro, o coração. Em volta, o corpo. Em volta dos dois, círculos maiores: pessoas, trabalho, saúde, dinheiro, cultura, história, poderes espirituais. Uma seta de mão dupla atravessando tudo."),
  fala([
    "“A vida afeta o coração. E o coração interpreta a vida. É por isso que duas pessoas passam pela mesma demissão e saem em direções opostas.”",
    "“O PG precisa se instalar exatamente aqui — no ponto onde o mundo e o coração da pessoa se encontram. Nem só nas circunstâncias, nem direto no pecado.”"
  ]),

  subhead("(b) As três camadas — 5 min", { before: 300 }),
  item("Desejos naturais", " — descanso, saúde, trabalho que faça sentido, o bem dos filhos, paz, amor. Não são pecado; são do coração e importam a Deus (Sl 62.8)."),
  item("Desejos morais", " — a direção que esses desejos imprimem à vida (Lc 6.45)."),
  item("Desejos por Deus", " — “no fundo, a pergunta não é tanto o que a gente ama, mas quem a gente ama”."),

  subhead("(c) As cinco perguntas — 7 min", { before: 300 }),
  body("Escreva no quadro:", { after: 180 }),
  tabela(["Pergunta", "O que revela"], [
    ["O que você ama?", "os objetos do desejo"],
    ["O que te faz feliz?", "desejos satisfeitos"],
    ["O que te deixa triste?", "desejos frustrados"],
    ["O que te deixa irritado?", "desejos frustrados"],
    ["O que você teme?", "desejos em risco"]
  ], [40, 60]),
  gap(220),
  fala([
    "“As duas últimas são as mais confiáveis. Ninguém finge irritação e ninguém escolhe o que teme. É por isso que a raiva e o medo entregam o coração mais rápido do que qualquer autoanálise — eles apontam pro que a pessoa está tratando como essencial pra vida dela.”"
  ]),
  gap(160),
  nota([
    "Exercício em duplas (3 dos 7 minutos): cada um responde ao outro — “o que te deixou irritado nesta semana?”. O outro pergunta uma única vez: “e o que você queria que tivesse acontecido?”.",
    "Depois pergunte à sala o que apareceu debaixo da irritação. Sempre aparece um desejo bom que foi frustrado."
  ], "Exercício"),
  gap(160),
  destaque("Siga o rastro da emoção. Onde a voz muda, onde os olhos enchem, onde a pessoa ri sem graça e muda de assunto — ali tem coração. Volte ali."),

  subhead("(d) A regra das duas portas — 7 min", { before: 300 }),
  fala(["“Nossos PGs têm — ou vão ter — gente que ainda não crê e gente que se perdeu no caminho. Isso muda o jeito de perguntar.”"]),
  gap(180),
  body("Escreva as duas colunas no quadro:", { after: 180 }),
  tabela(["Uma porta só", "Duas portas"], [
    ["“Como você tem descansado na graça nisso?”", "“Quando essa área da sua vida desanda, pra onde você corre primeiro?”"],
    ["“Que pecado você precisa confessar aqui?”", "“O que você mais teme perder?”"],
    ["“Como está sua vida devocional?”", "“Onde você busca força quando a semana aperta?”"],
    ["“O que o Espírito falou com você nesse texto?”", "“O que nesse texto te incomodou?”"]
  ], [46, 54]),
  gap(220),
  pergunte(["A coluna da direita é mais rasa que a da esquerda?"]),
  gap(140),
  body("Deixe-os concluir: é mais funda. E é honesta com quem está começando."),
  aterrissar(["Toda semana, pelo menos uma pergunta de duas portas. É o compromisso mínimo de missão do nosso PG."]),
  gap(160),
  nota(["Se sobrar tempo, peça que convertam uma pergunta da esquerda em pergunta de duas portas ali mesmo. É o melhor uso possível de dois minutos extras."])
);

// ---------------- BLOCO 4 ----------------
C.push(...blockHeader("Bloco 4", "Os seis movimentos", "22 min"));
C.push(
  destaque("Entregue o Manual do líder agora. Peça que abram na Parte 4 e acompanhem.", "Material"),
  gap(200),
  subhead("Apresente a tabela — 4 min", { before: 0 }),
  tabela(["Movimento", "A pergunta", "Tempo"], [
    ["1 · Acolher", "Quem está aqui?", "15 min"],
    ["2 · Abrir", "Como vai você?", "15 min"],
    ["3 · Relembrar", "O que o texto disse?", "15 min"],
    ["4 · Descer", "O que o texto encontra em nós?", "25 min"],
    ["5 · Andar", "O que faremos?", "10 min"],
    ["6 · Orar", "Vamos falar com Deus sobre isso", "10 min"]
  ], [28, 52, 20]),
  gap(220),
  fala([
    "“Vocês já viveram os movimentos 1 e 2 hoje, nos primeiros doze minutos. Eu vou passar rápido por esses e gastar o tempo no movimento 4, que é onde quase todo PG se perde.”"
  ]),

  subhead("Movimentos 1 e 2 — 4 min", { before: 300 }),
  item("Decida antes quem você vai buscar hoje.", " O calado, o novo, o que faltou. Welch conta de um homem que disse num pequeno grupo que aquele tinha sido o ano mais difícil da vida dele; ninguém respondeu, ninguém procurou, e ele guardou tudo por dez anos. “Silenciar é o mesmo que virar as costas.”"),
  item("Escute antes de abrir o texto, não depois.", " Se você lê o texto primeiro, todo mundo responde o que o texto pede. Se você escuta primeiro, o texto encontra gente real — e você já sabe onde ele vai doer."),

  subhead("Movimento 3 — os dois tetos — 3 min", { before: 300 }),
  fala([
    "“Quinze minutos, e você fala no máximo um quarto disso. Se falou mais, virou aula. Este bloco é o mais curto de propósito: ele existe pra pôr o texto na mesa, não pra ensinar de novo.”",
    "“O que você não souber, anote e me pergunte. Traga a resposta na semana seguinte. ‘Não sei, vou perguntar e te trago’ edifica mais que um palpite bem-intencionado.”"
  ]),

  subhead("Movimento 4 — o bloco — 8 min", { before: 300 }),
  body("A ordem é a doutrina. Escreva no quadro:"),
  destaque("existencial → evangelho → prática", "A ordem"),
  gap(200),
  item("Existencial:", " quem é a pessoa que esse texto confronta ou consola? Onde eu sou essa pessoa? Deus já aplicou a Palavra dele quando a deu; nosso trabalho não é inventar aplicação nova, é descobrir a que ele já fez — procurando a constante por trás da circunstância, não a semelhança superficial."),
  item("Evangelho:", " duas perguntas, toda semana. “O que esse texto exige que nenhum de nós cumpriu?” e “Onde Jesus cumpriu isso no nosso lugar?”"),
  item("Prática:", " só depois."),
  gap(100),
  body("Ensine as duas mentiras (Welch, Lição 8) — escreva as duas no quadro:"),
  biblia("A primeira", ["“Você não é bom o bastante. Se esforce mais, creia mais.”"]),
  gap(100),
  biblia("A segunda", ["“Você é bom o bastante. Creia em si mesmo — Jesus vai te dar o que você quer.”"]),
  gap(160),
  fala([
    "“A primeira é legalismo. A segunda é acomodação. As duas nascem da mesma mentira antiga, a de que Deus não é bom. E a cura de uma não é a dose da outra. A cura das duas é Cristo.”"
  ]),
  gap(180),
  destaque("Existencial antes de prática. Evangelho antes de dever. Se você inverter, o PG vira lista de tarefas pra conquistar a Deus — e você acabou de pregar legalismo com a Bíblia aberta.", "Regra de ouro do bloco"),

  subhead("Movimentos 5 e 6 — 3 min", { before: 300 }),
  item("Andar:", " um passo, por pessoa, com quem, quando e onde. “Vou ser mais paciente” não é passo; “vou pedir perdão ao meu filho na quinta, depois do jantar” é. E feche: “quem aqui você quer que te pergunte sobre isso no domingo?”"),
  item("Orar:", " ore o que foi dito, pelo nome, ligando a uma promessa da Escritura. Nunca a lista genérica. E se houver visitante, diga em voz alta, antes, que ninguém é obrigado a orar — senão ele passa dez minutos com medo da vez dele e não ouve nada.")
);

// ---------------- BLOCO 5 ----------------
C.push(...blockHeader("Bloco 5", "Laboratório", "23 min"));
C.push(
  destaque("Este bloco não pode ser cortado. Sem ele, os líderes saem com teoria e lideram igual na terça.", "Atenção"),
  gap(200),
  subhead("Preparação — 2 min", { before: 0 }),
  body("Distribua a ficha semanal (três cópias por líder) e o texto pregado no domingo passado. Formem trios."),
  fala([
    "“Vocês vão preparar, agora, o PG da próxima terça. Não é exercício; é a preparação de vocês. Quando sair daqui, está pronto.”"
  ]),

  subhead("Trabalho em trios — 12 min", { before: 300 }),
  body("Cada trio preenche uma ficha para o texto de domingo:"),
  item("O telos em uma frase", " — por que o Espírito pôs esse texto na Escritura?", "num4"),
  item("Três perguntas de relembrança", " (movimento 3)", "num4"),
  item("Uma pergunta de duas portas", " (movimento 4a)", "num4"),
  item("O ídolo / salvador funcional", " que o texto expõe", "num4"),
  item("Onde Cristo cumpre", " o que o texto exige", "num4"),
  item("Um passo prático concreto", " (quem, quando, onde)", "num4"),
  gap(100),
  nota([
    "Circule entre os trios. O erro mais comum vai ser o campo 3: eles vão escrever uma pergunta de uma porta só, ou uma pergunta com resposta certa. Corrija ali, um trio de cada vez, sem parar a sala."
  ]),

  subhead("Devolutiva — 9 min", { before: 300 }),
  body("Peça que dois trios leiam só a pergunta de duas portas. Depois de cada uma, pergunte à sala:"),
  pergunte([
    "Um vizinho seu que nunca entrou numa igreja conseguiria responder isso com honestidade?",
    "E essa pergunta tem uma resposta certa que todo mundo aqui já sabe?"
  ]),
  gap(140),
  body("Se a resposta à segunda for sim, a pergunta ainda não está pronta. Refaçam juntos, no quadro."),
  aterrissar(["Uma pergunta consertada ao vivo ensina mais que dez explicadas."]),
  gap(180),
  nota([
    "Só agora entregue a FICHA MODELO de Lucas 15.1-10, já preenchida. Se entregar antes dos doze minutos, eles copiam em vez de pensar — e o laboratório vira ditado.",
    "A última página dela explica por que cada campo foi preenchido daquele jeito. Peça que leiam em casa, não aqui."
  ], "Ficha modelo — entregar ao final do bloco")
);

// ---------------- BLOCO 6 ----------------
C.push(...blockHeader("Bloco 6", "Salvaguarda, envio e oração", "10 min"));
C.push(
  subhead("(a) O que sobe ao pastor, no mesmo dia — 4 min", { before: 0 }),
  body("Esta parte é firme e não é negociável. Leia a lista:"),
  ...[
    "violência doméstica ou qualquer agressão física",
    "abuso sexual, contra adulto ou contra criança",
    "qualquer menção a querer morrer ou tirar a própria vida",
    "adultério ou separação em curso",
    "vício com perda de controle",
    "envolvimento com crime"
  ].map(t => item(t, "", "bul2")),
  gap(100),
  fala([
    "“Vocês são a porta de entrada do cuidado da igreja, não o último recurso da pessoa. Vocês acolhem, não expõem, e não resolvem sozinhos.”"
  ]),
  gap(180),
  body("E ensine a frase exata. Nunca prometa sigilo absoluto antes de ouvir:"),
  destaque("“Eu vou te ouvir e não vou contar por aí. Se for algo que precisa de mais ajuda do que eu posso dar, eu te ajudo a levar isso ao pastor — mas eu não vou fazer isso pelas suas costas.”", "A frase"),
  gap(180),
  fala(["“Buscar ajuda não é fracasso do líder. É a igreja funcionando junta.”"]),

  subhead("(b) Envio — 2 min", { before: 300 }),
  body("Entregue o cartão de bolso."),
  fala([
    "“Não é pra decorar o manual. É pra levar o cartão. Seis perguntas de um lado, as armadilhas do outro.”"
  ]),
  gap(180),
  body("Três compromissos, ditos em voz alta:"),
  item("Trinta minutos de preparo", ", na segunda ou na terça, com a ficha preenchida.", "num2"),
  item("Pelo menos uma pergunta de duas portas", " por encontro.", "num2"),
  item("Toda semana, o evangelho explícito", " — antes do passo prático.", "num2"),

  subhead("(c) Oração em duplas — 4 min", { before: 300 }),
  body("Não ore você pelo grupo. Formem duplas, e:"),
  fala([
    "“Peça ao seu parceiro que ore por você — por algo real do seu PG ou da sua casa. Não por uma necessidade genérica. Do mesmo jeito que eu fiz com vocês quando a gente começou.”"
  ]),
  gap(180),
  body("Feche com uma oração curta em voz alta, autoimplicado, orando pelos nomes e pelas situações que apareceram na abertura.")
);

// ---------------- APÊNDICES ----------------
C.push(...blockHeader("Apêndice", "Se o encontro travar", null));
[
  ["Ninguém fala na abertura.", " Você não se expôs o bastante. Conte mais, e conte algo que ainda dói."],
  ["Alguém se defende nas quatro reuniões", " (“mas ensinar também é importante”). Concorde de verdade, e devolva: “é. E onde é que o ensino acontece no domingo, e onde é que o coração acontece na terça?”"],
  ["O grupo quer discutir formato", " (dia, local, lanche, agenda). Anote no quadro numa coluna chamada “operacional” e prometa outra conversa. Não deixe o operacional comer o Bloco 3."],
  ["Falta tempo.", " Encurte o Bloco 2 para 8 minutos e o Bloco 1 para 12. Nunca corte o Bloco 3 nem o Bloco 5. Sem o mapa do coração eles não têm ferramenta; sem o laboratório eles não têm prática."]
].forEach(([b, t]) => C.push(item(b, t, "bul3")));

C.push(
  subhead("Uma sugestão para o pastor", { before: 400 }),
  body("O gargalo semanal do líder não é vontade; é o telos. Se ele errar o propósito do texto, os noventa minutos inteiros vão para o lugar errado."),
  body("Considere enviar ao grupo de líderes, até a segunda-feira, três linhas sobre o sermão do domingo:"),
  item("Telos", " — por que o Espírito pôs esse texto na Escritura, em uma frase.", "num3"),
  item("Ídolo", " — o salvador funcional que o texto expõe.", "num3"),
  item("Cristo", " — onde ele cumpre o que o texto exige.", "num3"),
  gap(100),
  aterrissar(["Três linhas por semana do pastor economizam horas de preparo errado dos líderes, e mantêm todos os PGs apontando para o mesmo alvo."])
);

C.push(...colofao(h, "Roteiro do encontro de líderes — “Do púlpito ao coração”"));

build({
  children: C,
  titulo: "Do púlpito ao coração — Roteiro do encontro de líderes",
  cabecalho: "Do púlpito ao coração · Roteiro do encontro",
  pagina: A4,
  out: path.join(__dirname, "..", "roteiro-encontro-lideres.docx")
});
