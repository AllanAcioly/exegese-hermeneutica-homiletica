---
name: polir-sermao
description: Revisa e polir textos de sermão, palestra ou estudo bíblico do Rev. Allan Acioly (pastor reformado brasileiro) — remove gordura retórica, muletas, meta-comentários, autoimplicações escritas e marcas de oralidade, e opcionalmente reforça argumentos frágeis com textos bíblicos óbvios — sem enfraquecer a fidelidade bíblica nem a força pastoral. Ative SEMPRE que o usuário pedir revisão/polimento de um texto homilético existente em português, mesmo sem usar palavras exatas — gatilhos incluem "revise este sermão", "polir este esboço", "refina o texto", "limpe as muletas", "melhora este sermão", "revisa aqui", "ajusta esse estudo", "corta o excesso", "/polir-sermao". Também para palestras pastorais, devocionais e estudos bíblicos. NÃO use para escrever sermões novos (use allan-acioly-homiletica), para remover sinais de escrita AI (use humanizer), para textos não-pastorais, ou para textos de corpus histórico já pregados onde o usuário quer preservar a forma exata.
---

# Polir Sermão

Skill de revisão homilético-retórica. Recebe texto pastoral existente (sermão, palestra ou estudo bíblico), devolve versão revisada + log de mudanças + notas de preservação + recomendações.

## Filosofia (leia antes de tudo)

Todo texto pastoral tem dois clientes: **a verdade do texto bíblico** e **as pessoas que vão ouvir**. Uma revisão apenas "estética" — que só corta com base em métricas de clareza — corre dois riscos opostos e igualmente graves: (1) achatar a voz pastoral do autor, apagando marcas de peso e diagnóstico afiado como se fossem "excesso"; ou (2) preservar tudo por medo de mexer, entregando um texto flácido e prolixo que perde a força.

O caminho é diferente. Antes de cortar, entender o que serve ao **telos** do texto (Adams: o propósito do Espírito Santo naquela passagem) e o que apenas o enfraquece. Antes de reescrever, entender o que serve ao **coração do ouvinte** (Keller: afeições verdadeiras, imagens que "tornam sensível a ideia") e o que apenas ocupa espaço. A cirurgia é possível porque o telos é a bússola — o que serve fica, o que rouba clareza sai.

**Regra geral**: cortar quando o corte deixa o texto **mais claro e mais fundo ao mesmo tempo**. Se um corte deixa mais claro mas mais raso, não é ganho — é perda disfarçada.

## Antes de começar — Identificar o tipo do texto

Cada tipo pastoral tem rota diferente:

| Tipo | Prioridade | Regras específicas |
|------|------------|--------------------|
| **Sermão** | Oralidade primeiro | Frases curtas, ritmo respirável, evitar construções que soam empoladas ao falar |
| **Palestra** | Misto | Estrutura argumentativa clara + para ser falada; algumas transições verbais podem ficar |
| **Estudo bíblico** | Escrito primeiro | Prosa densa aceita, notas explicativas ok, sem marcas de oralidade |

Se o pedido do usuário não deixa claro qual é, PERGUNTE antes de começar. Não adivinhe — o tipo determina metade das decisões seguintes.

## Passe 0 — Preparação

1. **Identificar o tipo** (sermão / palestra / estudo). Se ambíguo, perguntar.
2. **Extrair o telos aparente** do texto, em uma frase, sem inventar. Esse telos serve como bússola para o Passe 4 (coerência final). Se o texto vem com telos declarado (ex.: rascunho da Fase 6b do workflow do projeto), usar esse. Se não é possível extrair sem forçar, seguir mesmo assim — o Passe 4 vai checar o resultado contra o que ficou.
3. **Ler os documentos de contexto do projeto quando disponíveis** — se estiver em `C:\Users\Allan\Documents\Claude_Code`, consultar via Read (só quando necessário para calibrar salvaguardas):
   - `context/adams-hermeneutica-telica.md` — telos, aplicação, implementação prática
   - `context/keller-evangelho-ao-coracao.md` — combate duplo, ídolos, seis elementos de pregar ao coração
   - `context/simeon-trust-metodologia.md` — permanecer na linha

## Passe 1 — Diagnóstico (só identifica, ainda não corta)

Percorrer o texto listando candidatos a corte/reescrita. Para cada candidato, registrar: **trecho**, **razão** e **nível de confiança** (obviamente gordura / provavelmente gordura / duvidoso).

### Alvos de corte/reescrita

**Redundância e prolixismo**
- Redundâncias diretas (mesma ideia dita duas vezes)
- Sinônimos justapostos ("clara e evidente", "puro e simples")
- Prolixismos (frases longas que valem menos que a versão curta)

**Amortecedores e muletas**
- Adjetivos amortecedores ("meio", "um pouco", "de certa forma", "em alguma medida")
- Muletas de linguagem ("olha só", "veja", "então", "assim", "certo?")
- Anáforas *sem* função retórica (repetição por hábito, não por ênfase deliberada)
- Transições vazias ("mas ainda mais", "e outra coisa", "além disso")
- Qualificadores supérfluos ("é importante notar que", "vale ressaltar", "cabe destacar", "vale mencionar")

**Meta-camadas e distrações**
- Meta-comentários sobre o próprio sermão ("vou pregar sobre X hoje", "meu ponto agora é")
- Jargões teológicos sem explicação ao ouvinte
- Pensamentos rasos ou irrelevantes ao ouvinte (curiosidades acadêmicas sem função)

**Autoimplicações escritas — SEMPRE CORTAR**
Trechos do tipo "Eu vou pregar para mim mesmo agora, tá?", "Eu vivo isso também, irmãos", "Eu conheço essa voz porque ela mora dentro de mim". Autoimplicação é recurso **oral**, do momento do púlpito, do discernimento pastoral no instante — não deve estar no manuscrito escrito. Deixar espaço para o Espírito guiar isso ao vivo.

**Marcas de oralidade escrita — SEMPRE CORTAR**
Vocativos ("Irmãos", "meus irmãos"), fáticas ("tá?", "tá bom?", "certo?", "entendeu?"), didáticas de púlpito ("olha comigo", "veja o texto", "presta atenção agora"). Todas são preciosas na fala, poluentes no papel.

**Fecho-assinatura oral — SEMPRE CORTAR quando encontrar no corpo do texto**
"Que a palavra do Senhor faça morada em vocês" e variantes são de encerramento oral. Se aparecerem no manuscrito, sair. (Se o texto tem uma seção explícita "conclusão oral" ou "para a benção", checar com o usuário.)

### Distinção crítica: repetição enfática × anáfora ociosa

Nem toda repetição é gordura. **Manter** a repetição quando ela carrega peso retórico deliberado ("Alegria. Alegria." fechando um ponto; "Ele veio. Ele veio até nós. Ele veio até nós na cruz.") — isso é o pilar retórico do sermão. **Cortar** a repetição quando é hábito de escrita ("é importante isso, é fundamental isso, é essencial isso" — três adjetivos para uma ideia).

O teste: a repetição estaria fisicamente pronunciada com ritmo/pausa deliberada, ou é só linguagem redundante? Se a primeira, fica.

## Passe 2 — Salvaguardas teológicas

Antes de aplicar qualquer corte do Passe 1, checar se ele enfraquece alguma destas salvaguardas. Se enfraquece, o corte é revogado ou substituído por reescrita que preserva o conteúdo essencial.

### O que precisa sobreviver à revisão

- **Telos** — o propósito do Espírito Santo naquele texto ainda "canta" no manuscrito? (Adams: o telos governa tudo. Se um corte deixa o telos menos audível, o corte foi ruim.)
- **Combate duplo** (Ferguson via Keller) — o texto ainda confronta **moralismo** (obedecer para ser aceito) *e* **antinomismo** (aceitar sem transformação)? Se um dos dois inimigos ficou sem confronto, reforçar em vez de cortar.
- **Cristologia específica** — Cristo está pregado como resposta **específica** ao problema deste texto (não Cristo genérico "que nos ama"). Cortes que genericizam a cristologia são proibidos.
- **Implementação prática** (Adams: o "como") — o texto ainda diz *como* fazer, não só *o quê*? Se o "como" some, isso vai em Recomendações como problema aberto.
- **Aplicação diferenciada** — quando o texto trata crentes e incrédulos separadamente, essa distinção fica.
- **Textos-âncora** — versículos que sustentam a exegese ficam intocados.
- **Diagnóstico cultural específico** — se o texto identifica um ídolo/BCN concreto (ex.: "o ídolo da aprovação profissional"), preservar. Se era genérico ("nossa cultura moderna"), corte ok.
- **Imagens concretas e analogias** — se ajudam a "tornar sensível a ideia" (Keller/Edwards: afeições verdadeiras exigem percepção sensível), preservar. Cortar analogia é raro e deve ter justificativa forte.
- **Diagnóstico afiado do coração** — nunca suavizar afirmações duras com "talvez", "de certa forma", "em alguma medida". Se o texto dizia "isso é idolatria", não vira "isso pode ter traços de idolatria".

### Como aplicar a salvaguarda

Para cada candidato do Passe 1, perguntar: **este corte enfraquece alguma salvaguarda acima?**
- Se **não** → prossegue no Passe 3.
- Se **sim** → mudar de "cortar" para "reescrever preservando o essencial", ou marcar como "não cortar" com registro nas Notas de Preservação.

## Passe 3 — Aplicar revisão

Aplicar as decisões dos Passes 1 e 2, com uma regra de segurança por confiança:

- **Obviamente gordura** → cortar/reescrever direto, registrar no log.
- **Provavelmente gordura** → cortar/reescrever direto, registrar no log com nota "confiança média".
- **Duvidoso** → **PAUSAR**. Mostrar o trecho ao usuário, dizer se parece marca de voz pastoral ou gordura, e perguntar. Só aplicar depois da resposta.

### Adicionar textos bíblicos (quando óbvio)

Quando o argumento do texto está frágil e existe um versículo-âncora **claramente pertinente** — paralelo direto, texto-chave amplamente reconhecido para aquela verdade — inserir e registrar em Adições Bíblicas. Exemplos de "óbvio":
- Argumento sobre a raiz idolátrica do pecado → Rm 1.21-25 é âncora óbvia.
- Argumento sobre justiça imputada → 2Co 5.21 é âncora óbvia.
- Argumento sobre o "já e ainda não" → Rm 8.23-25 é âncora óbvia.

Quando **não é óbvio** qual versículo usar (várias opções razoáveis, ou risco de forçar o texto para um lugar que ele não vai), NÃO inserir — registrar em Recomendações como "argumento carece de texto-âncora; sugerir X ou Y".

**Versão bíblica**: identificar do próprio texto qual versão o autor está usando (NAA / NVT / ARA / ARC / NVI). Se identificável, citar novos versículos na mesma versão. Se não identificável, usar NAA (padrão do projeto do Allan) e sinalizar.

### Regras por tipo de texto

- **Sermão** → oralidade primeiro; frases curtas; ritmo respirável; se uma frase revisada não pode ser dita em uma respiração, quebrar.
- **Palestra** → equilíbrio; estrutura argumentativa clara; conectivos lógicos ("porque", "portanto") podem ficar; alguns retóricos ("olha", "veja") saem.
- **Estudo** → escrito primeiro; prosa densa ok; parágrafos podem ser longos; notas explicativas de vocabulário grego/hebraico permanecem; nenhuma marca de oralidade.

## Passe 4 — Coerência final

Reler o texto revisado como se fosse um texto novo, sem lembrar do que foi cortado. Checar seis pontos:

1. **Clareza sem raso** — ganhou clareza sem perder profundidade?
2. **Telos audível** — o telos identificado no Passe 0 ainda "canta" no texto revisado?
3. **Combate duplo vivo** — moralismo e antinomismo ainda são confrontados?
4. **Cristo específico** — Cristo ainda aparece como resposta específica, não genérica?
5. **Implementação concreta** — o texto diz *como* fazer, não só *o quê*?
6. **Ritmo do tipo** — se sermão, texto respira quando lido em voz alta? Se estudo, argumento flui em prosa densa sem quebrar?

Se alguma falha aparece aqui, **voltar** e reforçar/reverter — o texto revisado sai só quando os seis pontos passam.

## Saída obrigatória

Entregar sempre nesta ordem:

### 1. Texto revisado

Versão final, limpa, para uso.

### 2. Log de mudanças

Tabela markdown com todas as alterações aplicadas. Colunas:

| # | Trecho original | Alteração | Tipo | Razão |
|---|-----------------|-----------|------|-------|

- **Tipo** = uma das categorias do Passe 1 (redundância, muleta, autoimplicação, marca de oralidade, prolixismo, meta-comentário, adjetivo amortecedor, transição vazia, qualificador supérfluo, jargão etc.).
- **Razão** = uma frase curta explicando por que serviu ao telos/coração cortar.

Se o log tem mais de 30 linhas, agrupar por Tipo para não ficar ilegível.

### 3. Notas de preservação

Só aparece se houve preservação deliberada apesar de parecer gordura. Formato:

> **"[trecho preservado]"** — mantido porque [salvaguarda teológica em jogo].

Exemplo:
> **"Alegria. Alegria."** — mantido porque é repetição enfática deliberada, não anáfora ociosa. Cortar apagaria a força retórica que serve ao telos (a alegria como acusação).

### 4. Adições bíblicas

Só aparece se houve inserção de versículos. Formato:

> **[Referência] (versão)** — "[texto do versículo]" — inserido em [lugar do texto] para [reforçar qual argumento].

### 5. Recomendações

Trechos onde a skill sozinha não pôde melhorar. Formato:

> **[Trecho ou seção]** — [problema identificado] — sugestão: [caminho possível, mas exige intervenção do autor].

Exemplo:
> **Segundo ponto, aplicação** — o texto exorta ao arrependimento sem dizer *como* (falta o "como" de Adams: passo concreto do dia seguinte). Sugestão: acrescentar uma pergunta diagnóstica específica ou um "primeiro passo" que o ouvinte possa dar antes de dormir hoje.

## Anti-padrões (a skill NUNCA faz)

- Substituir "irmãos" por "queridos ouvintes" ou qualquer formalização — se sai, sai (é marca de oralidade); se fica, fica como está.
- Inserir construções acadêmicas ("É importante notar", "Cabe destacar", "Vale mencionar") — são exatamente o que a skill *remove*, não pode reintroduzir.
- Suavizar diagnóstico afiado com "talvez", "de certa forma", "em alguma medida", "pode ser que" — todo texto pastoral sério corta na carne; a skill não anestesia.
- Genericizar cristologia — substituir uma formulação específica de Cristo por "Jesus nos ama" é regressão, não polimento.
- Cortar a implementação prática (o "como" de Adams) — se estava só o "quê", isso vai para Recomendações, não é escondido.
- Reproduzir letra de música na íntegra ou trecho longo de roteiro protegido — regra dos direitos autorais do projeto. Se aparece no texto original em quantidade excessiva, parafrasear e sinalizar em Recomendações.
- Escrever novas autoimplicações — a skill *remove*, não gera. Autoimplicação é oral.
- Reintroduzir marcas de oralidade que foram cortadas em outro ponto — decisão de corte é global no texto.

## Distinção de skills adjacentes

Para não confundir:

- **allan-acioly-homiletica** → *escreve* sermões novos na voz do Allan. Esta skill (`polir-sermao`) *revisa* textos existentes.
- **humanizer** → remove sinais de texto AI. Não é o mesmo problema — texto do Allan pode ser humano e ainda ter gordura homilética.
- **aula-indutiva-ipe** → transforma sermão pronto em aula indutiva com marcadores próprios. Não revisa.

## Se algo estiver ambíguo

Perguntar ao usuário antes de aplicar. É melhor pausar 30 segundos do que devolver um texto que apagou uma marca deliberada. A pergunta certa é: **"Esse trecho é marca de voz sua ou é gordura? Se marca, mantenho; se gordura, corto."**
