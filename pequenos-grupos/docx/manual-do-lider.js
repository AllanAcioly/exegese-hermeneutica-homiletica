/* Manual do líder de PG — "Do púlpito ao coração" */
const path = require("path");
const I = require("./ipe");
const { A4, helpers, capa, colofao, build, NAVY, GOLDDK, INK, BODY, DISPLAY,
        Paragraph, TextRun, AlignmentType, BorderStyle, LineRuleType } = I;

const h = helpers(A4.cw);
const { gap, body, bodyRuns, r, blockHeader, pergunte, nota, destaque,
        aterrissar, biblia, subhead, ornament, item, tabela } = h;

const C = [];

// ---------------- CAPA ----------------
C.push(...capa(h, {
  titulo: "Do púlpito ao coração",
  subtitulo: "Manual do líder de Pequeno Grupo",
  tipo: "Capacitação de líderes",
  linhaExtra: [
    "Base: Edward T. Welch, Aconselhando uns aos outros"
  ]
}));

// ---------------- ABERTURA ----------------
C.push(...blockHeader("Abertura", "O trabalho que é seu", null));
C.push(
  biblia("Provérbios 20.5", [
    "“Como águas profundas, são os propósitos do coração do homem, mas o homem de inteligência sabe descobri-los.”"
  ]),
  gap(160),
  body("Repare no que o texto chama de inteligência. Não é ter a resposta. É saber tirar de dentro. Esse é o trabalho de um líder de Pequeno Grupo, e este manual existe para treiná-lo."),
  body("A base metodológica é o livro de Edward T. Welch, Aconselhando uns aos outros (Ministério Fiel) — oito lições sobre o cuidado mútuo da alma. As lições citadas ao longo do manual remetem a ele."),
  ornament()
);

// ---------------- PARTE 1 ----------------
C.push(...blockHeader("Parte 1", "Por que o Pequeno Grupo existe"));
C.push(
  body("Três frases definem o PG, e uma delas é uma negativa necessária:"),
  item("O culto de domingo é onde a Palavra é pregada."),
  item("O Pequeno Grupo é onde a Palavra é perseguida até o coração de cada um."),
  item("O Pequeno Grupo não é ", "a repetição do culto em escala menor."),
  gap(80),
  body("A pregação fala a muitos ao mesmo tempo. O PG fala a um de cada vez, pelo nome. São trabalhos diferentes, e é Paulo quem os separa:"),
  biblia("Efésios 4.11-12", [
    "“E ele mesmo concedeu uns para apóstolos, outros para profetas, outros para evangelistas e outros para pastores e mestres, com vistas ao aperfeiçoamento dos santos para o desempenho do seu serviço, para a edificação do corpo de Cristo.”"
  ]),
  gap(140),
  body("Pastores e mestres desempenham o serviço deles — e treinam os santos para desempenharem o seu. O trabalho pesado do cuidado pastoral, no plano de Deus, é feito por gente comum. Welch abre o livro exatamente aí: se você confia em Jesus e não em si mesmo, e se sente fraco e desqualificado, então você está qualificado."),
  subhead("Duas vocações que não competem"),
  bodyRuns([
    r("Comunhão. ", { bold: true, color: NAVY }),
    r("Um grupo em que se pode falar da própria dor e alguém responde com compaixão e oração; em que se pode pedir ajuda contra o pecado e alguém fica do seu lado até a batalha virar. Não é utopia — é o que Welch descreve na Lição 1 e o que Efésios 4 promete.")
  ]),
  bodyRuns([
    r("Missão. ", { bold: true, color: NAVY }),
    r("O grupo aberto a quem ainda não crê e a quem se perdeu no caminho. A Parte 5 trata disso em detalhe.")
  ]),
  gap(100),
  destaque("No domingo, o texto foi pregado ao grupo. No PG, o texto é aplicado à vida de cada um — por meio de perguntas. O sermão entrega o alvo; o PG descobre onde o alvo acertou.", "A tese que governa tudo")
);

// ---------------- PARTE 2 ----------------
C.push(...blockHeader("Parte 2", "Quatro reuniões que não são um PG"));
C.push(
  body("Nenhuma das quatro é má-fé. Todas são fugas honestas de uma tarefa difícil. Vale reconhecer a sua antes de seguir."),
  gap(60)
);

const quatro = [
  ["A sala de aula", "O líder-professor",
   "Ele fala mais da metade do tempo. Corrige a resposta errada na hora em que ela sai. Cita comentaristas. Faz perguntas que têm resposta certa — e todos percebem quando ela não veio.",
   "O grupo aprende, e o grupo se cala.",
   "Ensinar é onde ele se sente competente; perguntar é onde ele fica exposto. O medo de não ter valor se não souber é o que segura o microfone na mão dele. Welch é direto: conselho é o que nós faríamos no lugar do outro, e quase sempre soa professoral e demonstra falta de compaixão. Raramente é pessoal (Lição 5)."],
  ["O segundo culto", "O líder-repetidor",
   "Quarenta minutos resumindo o sermão de domingo para que quem faltou “se atualize”. Ninguém precisa abrir a boca.",
   "A reunião poderia acontecer com as cadeiras vazias.",
   "Parece fidelidade, é fuga. Repetir o sermão é seguro — ninguém chora, ninguém confessa, ninguém discorda. O medo do silêncio é o que enche o tempo com conteúdo. E há um detalhe prático: o sermão já foi pregado uma vez, com preparo e com unção. A segunda vez, resumida de memória, é sempre pior. Você está competindo com você mesmo e perdendo."],
  ["O consultório", "O líder-conselheiro",
   "Alguém abre uma dor e em trinta segundos já existe uma solução na mesa. As frases começam com “o que você tem que fazer é”.",
   "As pessoas param de trazer o que é difícil de verdade.",
   "A pressa de resolver. Resolver é mais rápido que carregar. A regra de Welch: guarde seu conselho para si, a menos que lhe seja solicitado (Lição 5). E há uma variação disso que parece bondade — responder a dor do outro com a sua história. A intenção é abrir espaço; o efeito é mudar o assunto do coração dele para o seu."],
  ["O churrasco", "O líder-anfitrião",
   "Setenta minutos de conversa boa, quinze de devocional apressado, oração pela lista de enfermos.",
   "Todo mundo sai feliz e ninguém sai mudado.",
   "O medo de constranger, e a suspeita de que profundidade afasta as pessoas. É o contrário: superficialidade é que cansa. Ninguém atravessa a cidade numa terça-feira à noite por um lanche."]
];

quatro.forEach(([titulo, quem, desc, sintoma, diag]) => {
  C.push(
    subhead(titulo),
    bodyRuns([r(quem + ". ", { bold: true, color: GOLDDK }), r(desc)]),
    bodyRuns([r("Sintoma: ", { bold: true, color: NAVY }), r(sintoma, { italics: true })]),
    nota([diag], "Diagnóstico do coração"),
    gap(140)
  );
});

C.push(
  aterrissar([
    "Duas dessas fogem pela cabeça: a sala de aula e o segundo culto. Duas fogem pelo alívio: o consultório e o churrasco. Nenhuma das quatro chega ao coração.",
    "E a cura de uma nunca é a dose da outra. Quem percebe que virou professor não se corrige virando anfitrião."
  ])
);

// ---------------- PARTE 3 ----------------
C.push(...blockHeader("Parte 3", "O mapa do coração"));
C.push(
  body("Welch trabalha com uma imagem simples (Lições 3 e 4). No centro, o coração. Em volta dele, o corpo. Em volta dos dois, círculos de influência: as pessoas, o trabalho, a saúde, o dinheiro, a cultura, a história de cada um, os poderes espirituais. Os círculos mais próximos são os que se enxergam; os mais distantes agem sem ser vistos."),
  body("A seta corre nos dois sentidos: a vida afeta o coração, e o coração interpreta a vida. É por isso que duas pessoas passam pela mesma demissão e saem dela em direções opostas."),
  nota([
    "Consequência prática: o PG precisa se instalar exatamente no ponto onde o mundo e o coração da pessoa se encontram. Nem só nas circunstâncias (“como foi a semana?”), nem direto no coração (“que pecado há nisso?”). Na junção."
  ]),
  subhead("As três camadas do coração"),
  bodyRuns([r("Desejos naturais. ", { bold: true, color: NAVY }), r("Descanso, saúde, trabalho que faça sentido, o bem dos filhos, proteção, paz, amor. Não são pecado. São do coração e importam a Deus, que nos convida a derramar o coração diante dele (Sl 62.8).")]),
  bodyRuns([r("Desejos morais. ", { bold: true, color: NAVY }), r("A direção que esses desejos imprimem à vida. “Porque a boca fala do que está cheio o coração” (Lc 6.45). É aqui que se pergunta como está seu coração — e não apenas como vai você.")]),
  bodyRuns([r("Desejos por Deus. ", { bold: true, color: NAVY }), r("No fundo de tudo, Welch resume assim: a questão importante não é tanto o que amamos, mas quem amamos (Lição 3). Ou confiamos nele, ou confiamos em nós e nos objetos da nossa afeição.")]),
  subhead("As cinco perguntas que abrem o coração"),
  body("Esta é a ferramenta mais útil deste manual. Decore.", { after: 180 }),
  tabela(["Pergunta", "O que ela revela"], [
    ["O que você ama?", "os objetos do desejo"],
    ["O que te faz feliz?", "desejos satisfeitos"],
    ["O que te deixa triste?", "desejos adiados ou frustrados"],
    ["O que te deixa irritado?", "desejos frustrados"],
    ["O que você teme?", "desejos em risco"]
  ], [40, 60]),
  gap(200),
  body("As duas últimas são as mais confiáveis. Ninguém finge irritação e ninguém escolhe o que teme. É por isso que a raiva e o medo entregam o coração mais depressa que qualquer autoanálise: eles apontam para aquilo que a pessoa está tratando como essencial à vida — o salvador funcional dela."),
  gap(60),
  destaque("Siga o rastro da emoção. Onde a voz muda, onde os olhos enchem, onde a pessoa ri sem graça e muda de assunto — ali tem coração. Volte ali.")
);

// ---------------- PARTE 4 ----------------
C.push(...blockHeader("Parte 4", "Os seis movimentos"));
C.push(
  body("Um encontro de noventa minutos, com oito a doze pessoas.", { after: 180 }),
  tabela(["Movimento", "A pergunta", "Tempo"], [
    ["1 · Acolher", "Quem está aqui?", "15 min"],
    ["2 · Abrir", "Como vai você?", "15 min"],
    ["3 · Relembrar", "O que o texto disse?", "15 min"],
    ["4 · Descer", "O que o texto encontra em nós?", "25 min"],
    ["5 · Andar", "O que faremos?", "10 min"],
    ["6 · Orar", "Vamos falar com Deus sobre isso", "10 min"]
  ], [28, 52, 20]),
  gap(220)
);

// Movimento 1
C.push(
  subhead("1 · Acolher — “Quem está aqui?” (15 min)"),
  body("Não é o café. É trabalho, e começa antes de a primeira pessoa chegar."),
  body("Welch funda isso em Ezequiel 34: Deus diz que ele mesmo procurará as suas ovelhas. A graça é Deus se aproximando primeiro, de quem não o convidou e não tinha intenção de se render (Lição 2). Nós nos aproximamos porque ele se aproximou. E há um custo: quem toma a iniciativa, quem ama mais, é quem se arrisca a ser humilhado. Por isso a aproximação nunca acontece por acaso."),
  pergunte(["Antes do encontro: quem eu vou buscar hoje?"], "Decida"),
  gap(120),
  body("O calado, o novo, o que faltou semana passada. Aprenda o nome e use o nome. Pergunte os detalhes — onde mora, com quem mora, o que faz, há quanto tempo está aqui. A maioria das pessoas não ouve essas perguntas."),
  nota([
    "Welch conta o caso de um homem que disse num pequeno grupo que aquele tinha sido o ano mais difícil da vida dele. Ninguém respondeu. Ninguém procurou. Ele guardou tudo para si pelos dez anos seguintes.",
    "A frase que fecha o caso é a frase para levar: silenciar é o mesmo que virar as costas (Lição 2)."
  ])
);

// Movimento 2
C.push(
  subhead("2 · Abrir — “Como vai você?” (15 min)"),
  body("Uma rodada. Todos falam, nem que seja uma frase."),
  pergunte([
    "Qual foi o melhor momento da sua semana?",
    "O que foi especialmente difícil?"
  ]),
  gap(140),
  item("Ninguém resolve nada aqui.", " Este bloco é de escuta. Se alguém trouxer algo pesado, acolha (“sinto muito”; “me conta um pouco mais”) e siga. A resposta vem no movimento 6."),
  item("O líder anota.", " Mentalmente ou no papel. Esses nomes e essas dores voltam na oração e, muitas vezes, no movimento 4."),
  item("O líder responde primeiro, e responde de verdade.", " Vulnerabilidade gera vulnerabilidade. Welch põe a humildade antes de tudo e dá a ela uma forma concreta: peça oração por você (Lição 1). Um líder que nunca precisa de nada ensina o grupo a não precisar de nada."),
  gap(80),
  aterrissar([
    "Por que isto vem antes do texto e não depois? Porque o que sai aqui é o material com que o texto vai trabalhar. Se você lê o texto primeiro, todo mundo responde o que o texto pede. Se você escuta primeiro, o texto encontra gente real — e você já sabe onde ele vai doer."
  ])
);

// Movimento 3
C.push(
  subhead("3 · Relembrar — “O que o texto disse?” (15 min)"),
  body("Abra a Bíblia, não o caderno de anotações do sermão. Peça que outra pessoa leia a passagem em voz alta."),
  pergunte([
    "O que esse texto diz? Conte com suas palavras.",
    "O que o pastor mostrou no domingo que você não tinha visto antes?",
    "Ficou alguma dúvida?"
  ]),
  gap(140),
  item("Teto de tempo:", " quinze minutos. Este é o bloco mais curto de propósito. Ele existe para pôr o texto na mesa, não para ensiná-lo de novo."),
  item("Teto de fala:", " você fala no máximo um quarto do bloco. Se falou mais, virou aula."),
  gap(80),
  nota([
    "Sobre as dúvidas: responda a que você sabe, com humildade. A que você não sabe, anote e leve ao pastor — e traga a resposta na semana seguinte. “Não sei, vou perguntar e te trago” edifica mais que um palpite bem-intencionado, e ensina o grupo a respeitar a Escritura."
  ])
);

// Movimento 4
C.push(
  subhead("4 · Descer — “O que o texto encontra em nós?” (25 min)"),
  body("O bloco mais longo, porque é o bloco. Dois passos, nesta ordem."),
  bodyRuns([r("(a) Aplicação existencial. ", { bold: true, color: NAVY }), r("O que este texto revela sobre o que meu coração ama, teme e em que confia.")]),
  pergunte([
    "Quem é a pessoa que este texto está confrontando, ou consolando?",
    "Onde eu sou essa pessoa?"
  ]),
  gap(140),
  body("Deus já aplicou a sua Palavra quando a deu. A tarefa não é inventar uma aplicação nova, mas descobrir a que ele já fez — procurando a constante por trás da circunstância original, e não semelhanças superficiais. Se o texto expõe a murmuração de Israel no deserto, a constante não é “não reclame da comida”; é a desconfiança de que Deus não é bom."),
  body("Aqui entram as cinco perguntas da Parte 3, e aqui entra a regra das duas portas (Parte 5)."),
  gap(60),
  bodyRuns([r("(b) Aplicação cristológica. ", { bold: true, color: NAVY }), r("Antes de qualquer passo prático, o evangelho. Toda semana.")]),
  body("Welch fecha o livro nomeando duas mensagens que cercam o cristão o tempo todo — e elas são exatamente as duas mentiras que o PG precisa combater (Lição 8):"),
  biblia("A primeira mentira", ["“Você não é bom o bastante. Não é de surpreender que enfrente tantas aflições na vida. Você deveria crer mais. Você precisa se esforçar mais.”"]),
  gap(100),
  biblia("A segunda mentira", ["“Você é bom o bastante. Apenas creia em si mesmo. Jesus lhe dará as coisas que você deseja.”"]),
  gap(140),
  body("A primeira é o legalismo. A segunda é a acomodação. As duas nascem da mesma mentira antiga — a de que Deus não é bom. E a cura de uma não é a dose da outra. A cura das duas é Cristo."),
  pergunte([
    "O que este texto exige que nenhum de nós cumpriu?",
    "Onde Jesus cumpriu isso em nosso lugar?"
  ]),
  gap(160),
  destaque("Existencial antes de prática, evangelho antes de dever. Se você inverte, o PG vira uma lista de tarefas para conquistar a Deus — e você acabou de pregar o legalismo com a Bíblia aberta.", "Regra de ouro do bloco")
);

// Sofrimento e pecado
C.push(
  subhead("Duas conversas que vão aparecer aqui", { before: 300 }),
  bodyRuns([r("Sofrimento", { bold: true, color: NAVY }), r(" (Lição 6). Welch oferece uma história-mestra: o deserto. Israel saiu do Egito e entrou num deserto mais longo e mais duro do que o previsto. Ali há privação e ameaça — e ali também a água sai da rocha e o maná aparece toda manhã. Ali Deus prova o coração do seu povo. E ali Jesus foi antes de nós (Mt 4.1-11): onde Israel falhou, o Rei venceu, sustentado só pela palavra do Pai.")]),
  body("A força dessa história é que não é preciso conhecer a causa do sofrimento para habitar nela. Ela cabe no luto, na depressão, no trauma, na doença crônica, no vício, na injustiça no trabalho."),
  nota([
    "Diante do sofrimento: compaixão primeiro. Explicação, quase nunca. Welch é categórico — você não começaria uma conversa com Jó perguntando como ele tem respondido ao Senhor diante da morte dos filhos (Lição 4). A pergunta é verdadeira e é cruel na hora errada."
  ]),
  gap(180),
  bodyRuns([r("Pecado", { bold: true, color: NAVY }), r(" (Lição 7). Três posturas, e uma regra de ordem.")]),
  item("A regra de ordem:", " primeiro as coisas boas e as difíceis, depois as más. Paulo escreveu a Corinto sobre pecados graves e começou dando graças pela graça dada a eles (1Co 1.4-7). Ele identifica o irmão primeiro como santo."),
  item("Mais “nós” do que “você”.", " Welch conta de um homem cuja luta contra as drogas virou quando a esposa, ao descobrir a recaída, perguntou: “o que nós vamos fazer agora?”. Qualquer pecado que você vê no outro, uma investigação breve revela que você é vulnerável a alguma variação dele."),
  item("Mais perguntas do que exortações.", " Ao falar com quem foi surpreendido em pecado, Jesus geralmente pergunta. O pecado tende a parecer menos atraente quando é examinado de perto — e a pergunta convida à conversa, enquanto a exortação encerra."),
  item("Termine a confissão com “obrigado”.", " O instinto depois de confessar é se exilar e se reformar até merecer voltar. O Pai é simplesmente inclinado a perdoar (Lc 15.11-24). Quando o grupo responde a uma confissão com gratidão a Deus, em vez de silêncio constrangido, ele desmente a mentira de que a graça é para os outros.")
);

// Movimentos 5 e 6
C.push(
  subhead("5 · Andar — “O que faremos?” (10 min)", { before: 300 }),
  body("Não basta dizer o quê. É preciso ensinar o como. O Sermão do Monte é o modelo: cada mandamento vem com o modo de obedecer e o modo de não obedecer."),
  body("Um passo, por pessoa, para esta semana. Concreto: quem, quando, onde."),
  item("“Vou ser mais paciente”", " não é um passo. É uma intenção."),
  item("“Vou pedir perdão ao meu filho na quinta, depois do jantar”", " é um passo."),
  gap(60),
  pergunte(["Quem aqui você quer que te pergunte sobre isso no domingo?"]),
  gap(200),

  subhead("6 · Orar — “Vamos falar com Deus sobre isso” (10 min)"),
  body("“Uma maneira segura de ser pessoal é orar. Isso demonstra que alguém está em nosso coração” (Lição 5)."),
  body("Não é a lista genérica de enfermos. Ore o que foi dito esta noite, pelo nome, ligando cada pedido a uma promessa ou mandamento da Escritura. Welch ensina esse método na Lição 1, e ele é simples: identifique o problema concreto, e ligue-o a uma palavra de Deus."),
  biblia("Exemplo", [
    "“Estou doente há um tempo e me desanimo com facilidade. Você pode orar para que eu corra para Jesus toda vez que eu desanimar?” (2Co 4.16-18)"
  ]),
  gap(160),
  nota([
    "Se há visitante: diga em voz alta, antes de começar, que ninguém é obrigado a orar. Sem isso, ele passa os dez minutos com medo da vez dele e não ouve nada.",
    "Termine você, orando pelo grupo — e ore por você na frente deles."
  ])
);

// ---------------- PARTE 5 ----------------
C.push(...blockHeader("Parte 5", "O PG é missão: a regra das duas portas"));
C.push(
  body("O grupo existe também para quem ainda não crê e para quem se perdeu no caminho. Isso não é um acréscimo simpático; é a lógica da graça aplicada à sala. Welch, na Lição 2: Deus veio a nós não porque o convidamos adequadamente, mas porque estávamos enfermos — pior, éramos inimigos sem intenção de nos render."),
  destaque("Um PG que espera o visitante estar pronto não entendeu a graça que o trouxe para dentro."),
  subhead("A pergunta de duas portas", { before: 300 }),
  body("Uma pergunta de duas portas é aquela que o cristão e quem ainda não crê conseguem responder com honestidade. Ela chega ao coração sem exigir vocabulário de igreja.", { after: 180 }),
  tabela(["Uma porta só", "Duas portas"], [
    ["“Como você tem descansado na graça nessa área?”", "“Quando essa área da sua vida desanda, para onde você corre primeiro?”"],
    ["“Que pecado você precisa confessar aqui?”", "“O que você mais teme perder?”"],
    ["“Como está sua vida devocional?”", "“Onde você busca força quando a semana aperta?”"],
    ["“O que o Espírito falou com você nesse texto?”", "“O que nesse texto te incomodou?”"],
    ["“Você tem descansado na soberania de Deus?”", "“O que precisa dar certo para você se sentir em paz?”"]
  ], [48, 52]),
  gap(220),
  body("Repare que a coluna da direita não é mais rasa. É mais funda — e é honesta com quem está começando."),
  aterrissar(["Toda semana, leve ao menos uma pergunta de duas portas para o movimento 4."]),
  subhead("Cinco regras missionárias", { before: 300 }),
  item("Não pressuponha.", " Todo jargão é explicado ou cortado. “Santificação”, “mundano”, “estar em oração”, “o irmão é congregado?” — explique ou troque."),
  item("Não force.", " Ninguém é obrigado a ler, orar em voz alta ou responder. Diga isso no começo, para todos, não olhando para o visitante."),
  item("Não exponha.", " O visitante nunca é o exemplo negativo, nem o alvo da pergunta difícil, nem “o nosso amigo que ainda não conhece o Senhor”."),
  item("Não debata.", " Se ele discordar do texto, não ganhe a discussão. Agradeça, devolva uma pergunta, convide-o a voltar. Você tem meses pela frente; não precisa vencer hoje."),
  item("Não esconda o evangelho.", " Ele aparece toda semana — não porque há visitante, mas porque o crente precisa dele toda semana. Se você só prega o evangelho quando há alguém de fora, os seus membros estão sendo alimentados de moralismo no resto do ano.")
);

// ---------------- PARTE 6 ----------------
C.push(...blockHeader("Parte 6", "Quando travar"));
[
  ["Ninguém fala.", " Não preencha o silêncio. Conte até dez. Reformule a pergunta com um exemplo concreto. Se ainda travar, exponha-se você primeiro."],
  ["Um domina.", " Agradeça e redirecione sem constranger: “ótimo — e os outros? Fulano, como isso é aí na sua casa?”"],
  ["Vira debate teológico abstrato.", " É a fuga mais elegante do coração. Traga de volta ao concreto: “deixa eu perguntar diferente — onde isso apareceu na sua semana?”"],
  ["Resposta de escola dominical", " (“é só orar e ler a Bíblia”). Não corrija; aprofunde: “e como tem sido fazer isso nessa situação específica?” A resposta pronta desmonta sozinha quando encontra o detalhe."],
  ["Alguém chora.", " Não conserte. Não cite versículo imediatamente. Fique em silêncio, agradeça a confiança, pergunte se pode orar por ela ali mesmo."],
  ["Fofoca disfarçada de pedido de oração.", " Corte com gentileza e sem sermão: “vamos orar por ele. E como você está com isso?”"],
  ["O visitante discorda do texto.", " Agradeça a franqueza, diga que é uma boa pergunta, devolva: “o que te faz pensar assim?” E convide-o a voltar."]
].forEach(([b, t]) => C.push(item(b, t, "bul2")));

C.push(
  subhead("O que sobe ao pastor, no mesmo dia", { before: 300 }),
  body("Você é a porta de entrada do cuidado da igreja, não o último recurso da pessoa. Estas situações você acolhe e encaminha — sempre:"),
  ...[
    "violência doméstica ou qualquer agressão física",
    "abuso sexual, contra adulto ou contra criança",
    "qualquer menção a querer morrer ou tirar a própria vida",
    "adultério ou separação em curso",
    "vício com perda de controle (álcool, drogas, jogo, pornografia)",
    "envolvimento com crime"
  ].map(t => item(t, "", "bul3")),
  gap(80),
  destaque("Nunca prometa sigilo absoluto antes de ouvir. A frase honesta é: “eu vou te ouvir, e não vou contar por aí. Se for algo que precisa de mais ajuda do que eu posso dar, eu te ajudo a levar isso ao pastor — mas eu não vou fazer isso pelas suas costas.”"),
  gap(160),
  nota([
    "Welch fecha o livro exatamente aqui: sabedoria, humildade e amor buscam o auxílio de quem tem mais experiência — pastores, amigos que passaram por coisa semelhante, auxiliadores profissionais.",
    "Isso não é falha do líder. Isso é a igreja funcionando junta (Lição 8)."
  ])
);

// ---------------- PARTE 7 ----------------
C.push(...blockHeader("Parte 7", "A preparação da semana"));
C.push(
  body("Trinta minutos, na segunda ou na terça. Quatro passos:"),
  item("Releia a passagem", " — a passagem, não as anotações do sermão. Duas vezes.", "num"),
  item("Escreva o telos em uma frase", ": por que o Espírito Santo pôs este texto na Escritura? Se você não consegue dizer em uma frase, você ainda não sabe.", "num"),
  item("Preencha a ficha semanal", ": as três perguntas de relembrança, a pergunta de duas portas, o ídolo em jogo, onde Cristo cumpre, o passo prático.", "num"),
  item("Ore pelos nomes", " do seu grupo, um por um, com o que você ouviu na semana passada.", "num"),
  gap(100),
  aterrissar([
    "Se o telos não estiver claro para você, pergunte ao pastor antes de terça. Perguntar é barato; conduzir doze pessoas para o lugar errado, não."
  ]),

  subhead("Palavra final", { before: 400 }),
  body("Tudo neste manual é ordinário. Não há técnica nova aqui — há a decisão de perguntar em vez de explicar, de escutar em vez de resolver, e de levar o evangelho ao coração em vez de deixar a informação na cabeça."),
  body("Welch termina o livro assim, e é assim que se começa a liderar um PG: tudo começa com pequenos passos na direção dos outros. Tudo começa com viver juntos uns dos outros."),
  ornament(),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 0, line: 320, lineRule: LineRuleType.AUTO },
    children: [new TextRun({
      text: "Se você se sente fraco e desqualificado para isso, e a sua confiança está em Jesus e não em si mesmo, então você está qualificado. Então você foi chamado.",
      font: DISPLAY, size: 26, italics: true, color: NAVY
    })]
  })
);

C.push(...colofao(h, "Manual do líder de Pequeno Grupo — “Do púlpito ao coração”"));

build({
  children: C,
  titulo: "Do púlpito ao coração — Manual do líder de Pequeno Grupo",
  cabecalho: "Do púlpito ao coração · Manual do líder",
  pagina: A4,
  out: path.join(__dirname, "..", "manual-do-lider.docx")
});
