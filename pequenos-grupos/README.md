# Pequenos Grupos — "Do púlpito ao coração"

Material de capacitação para líderes de Pequeno Grupo da Igreja Presbiteriana
Esperança. O PG "reverbera" o sermão de domingo: relembra os pontos centrais,
tira dúvidas e trabalha aplicação existencial e prática — em um grupo que é ao
mesmo tempo **comunhão** e **missão** (com não cristãos e cristãos perdidos
reunidos em torno da Palavra).

O problema que o material resolve: a maioria dos líderes trabalha a **mente**
(vira aula de teologia) ou repete o **sermão** (vira segundo culto). Poucos
trabalham o **coração**. O material dá a eles o método e as ferramentas para
isso.

## Base metodológica

**Edward T. Welch, *Aconselhando uns aos outros*** (Ministério Fiel) — oito
lições sobre o cuidado mútuo da alma. É a peça que faltava no repertório do
projeto: os três pilares do `CLAUDE.md` (Simeon Trust, Adams, Keller) governam
o **púlpito**; Welch governa a **conversa uns aos outros** durante a semana.

Os pontos de Welch que estruturam o material:

| Lição | O que entra no material |
|---|---|
| 1 · Com toda a humildade | o líder pede oração antes de liderar; o método de ligar problema concreto a texto bíblico |
| 2 · Aproxime-se das pessoas | movimento 1 (Acolher); "silenciar é o mesmo que virar as costas"; a lógica da graça aplicada à missão |
| 3 · Conheça o coração | as cinco perguntas que abrem o coração; as três camadas dos desejos |
| 4 · Conheça as influências | o mapa do coração (diagrama); compaixão antes de explicação |
| 5 · Seja pessoal e ore | "guarde seu conselho para si"; movimento 6 (Orar) |
| 6 · Converse sobre sofrimento | a história do deserto como história-mestra |
| 7 · Converse sobre pecado | ordem (bom antes do mau); mais "nós" que "você"; mais perguntas que exortações; terminar com "obrigado" |
| 8 · Lembre-se e reflita | as duas mentiras (legalismo e acomodação); buscar auxílio não é fracasso |

Onde Welch encontra os pilares do projeto:

- As **duas mentiras** da Lição 8 são o *combate duplo* de Keller/Ferguson
  (legalismo e antinomismo como gêmeos do mesmo ventre).
- A **aplicação existencial antes da prática** é Adams: Deus já aplicou sua
  Palavra; buscar a constante por trás da circunstância, e o "como fazer"
  depois.
- A **regra das duas portas** é Keller pregando à cultura, reduzida a uma
  ferramenta que o líder usa toda semana.

## Peças

| Arquivo | Para quem | O que é |
|---|---|---|
| `roteiro-encontro-lideres.docx` | o pastor | roteiro de 2h para conduzir a capacitação: minutagem, falas modelo, dinâmicas, laboratório prático |
| `manual-do-lider.docx` | cada líder | o método completo, para consulta permanente |
| `ficha-semanal.docx` | cada líder | uma folha para preencher toda segunda ou terça a partir do sermão de domingo |
| `cartao-de-bolso.docx` | cada líder | A5 frente e verso, para plastificar e levar ao encontro |
| `ficha-modelo-lucas-15.docx` | cada líder | a mesma ficha **preenchida** a partir de Lucas 15.1-10, com uma página explicando por que cada campo foi preenchido assim |

Cada `.docx` tem um `.md` correspondente com o mesmo conteúdo, para leitura e
edição rápida no repositório.

## Os seis movimentos (90 min)

| # | Movimento | A pergunta | Tempo |
|---|---|---|---|
| 1 | Acolher | Quem está aqui? | 15 min |
| 2 | Abrir | Como vai você? | 15 min |
| 3 | Relembrar | O que o texto disse? | 15 min |
| 4 | Descer | O que o texto encontra em nós? | 25 min |
| 5 | Andar | O que faremos? | 10 min |
| 6 | Orar | Vamos falar com Deus sobre isso | 10 min |

A ordem dentro do movimento 4 é a doutrina: **existencial → evangelho →
prática**. Invertida, o PG vira lista de tarefas para conquistar a Deus.

## Gerar os DOCX

```bash
cd pequenos-grupos/docx
npm install
node manual-do-lider.js
node roteiro-encontro-lideres.js
node ficha-semanal.js
node cartao-de-bolso.js
node ficha-modelo-lucas-15.js
```

`ficha-base.js` concentra o vocabulário visual da ficha, compartilhado entre a
versão em branco e as versões modelo — é isso que faz as duas serem idênticas
em estrutura, e é essa identidade que faz o modelo ensinar.

`ipe.js` concentra paleta, fontes, helpers e a montagem do `Document` com a
identidade IPE (marinho, dourado, farol, Salmo 119.105), em A4 e A5. Editar
conteúdo significa editar os módulos que o consomem, não `ipe.js`.

Dois detalhes de renderização já resolvidos em `ipe.js`, que valem para
qualquer documento novo:

- **Linhas pautadas** usam tabulação com *leader* underscore, não bordas
  inferiores. Word e LibreOffice fundem parágrafos vizinhos com bordas
  idênticas num único bloco, e `n` linhas virariam uma só.
- **Tabelas** levam `keepNext` em todas as linhas menos a última, para migrar
  inteiras de página em vez de deixar linha órfã.

## Ligação com o workflow de estudo

A **Fase 7** (entrega) do `context/workflow-estudo-biblico.md` pode alimentar
a ficha semanal: o telos da Fase 2, o ídolo da Fase 3/4 e o cumprimento em
Cristo da Fase 5 são exatamente os três campos que travam o preparo do líder.

A ficha modelo de Lucas 15.1-10 é exatamente essa ligação feita uma vez: telos
da Fase 2, ídolo da Fase 3/4 e cumprimento em Cristo da Fase 5, transpostos
para os campos da ficha. Ela se entrega **ao final** do Bloco 5 do encontro,
nunca antes — senão os líderes copiam em vez de pensar.

O roteiro sugere, no apêndice, que o pastor envie aos líderes até a
segunda-feira três linhas sobre o sermão — **telos, ídolo, Cristo**. Três
linhas por semana economizam horas de preparo errado e mantêm todos os PGs
apontando para o mesmo alvo.
