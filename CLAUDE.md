# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Sobre este projeto

**Exegese, Hermenêutica e Homilética Bíblica** — projeto pessoal de estudo e
interpretação bíblica do Rev. Allan Acioly, cobrindo qualquer gênero literário
das Escrituras (narrativa, discurso/epístola, poesia, profecia, parábola,
lei, sabedoria, apocalíptica). Não é um repositório de código — não existem
comandos de build, lint ou teste.

## Metodologia de interpretação

Todo estudo segue a hermenêutica **Reformada**, integrando três pilares
metodológicos:

### 1. Charles Simeon Trust — Pathway Exegético

A base exegética vem do Simeon Trust (ver `context/simeon-trust-metodologia.md`
para a referência completa). O caminho de preparação:

1. **Estrutura** — como o autor organizou a passagem; identificar ênfase
2. **Contexto** — literário, histórico, cultural, bíblico (só os relevantes)
3. **Argumento do autor** — uma frase curta: o que ele está persuadindo o
   público original
4. **Conexão com o Evangelho** — seis estratégias (referência explícita,
   cumprimento profético, trajetória histórica, tipologia, temas teológicos
   bíblicos, ensino baseado no evangelho) + faceta do evangelho em vista
5. **Argumento do pregador + aplicações** — a passagem aplicada a nós/agora,
   diferenciando crentes e incrédulos
6. **Título e esboço homilético**

Princípio-mestre: **Permanecer na Linha** — não acrescentar nem subtrair do
que o texto diz. O texto governa os pressupostos.

### 2. Jay Adams — Hermenêutica Télica

Ver `context/adams-hermeneutica-telica.md` para a referência completa. O
conceito central é o **telos**: o propósito que o Espírito Santo tinha ao
incluir aquela passagem na Escritura — "consiga o telos; de tudo o que
adquirir, adquira o propósito."

- Nunca pregar sem ter certeza do *porquê* da passagem existir; nunca impor
  o próprio propósito à passagem — a maioria dos sermões, quando têm
  propósito perceptível, expressa o do pregador, não o do Espírito
- Identificar **pistas télicas** (declarações do autor, "portanto"/"para
  que", marcadores de propósito) — ex: Lc 15 não é primariamente
  evangelística, mas expõe o pecado dos fariseus que murmuravam (vv. 1-3)
- Reduzir o telos a **uma frase nítida** (o "teste das 4 da manhã")
- Três propósitos gerais: informar, persuadir, motivar
- **Deus já aplicou Sua Palavra** — a tarefa do pregador não é inventar uma
  aplicação nova, mas descobrir a que Deus já fez (Rm 15.4; 1Co 10.6,11);
  buscar as *constantes* por trás da circunstância original, não
  semelhanças superficiais
- O **"como fazer"** (implementação) é distinto da aplicação — não basta
  dizer o quê, é preciso ensinar como (modelo: o Sermão do Monte, onde cada
  mandamento vem com como obedecer e como não obedecer)
- **Pregar ao coração = pregar telicamente** — são o mesmo projeto: só se
  atinge o coração humano pregando o que está no coração de Deus (o telos)
- Postura de **pregador** (fala *a partir de* Escritura sobre a congregação,
  tempo presente), não de palestrante — marcada por **ousadia** (parresia)
  como contraponto ao tom mais cordial-cultural de Keller

### 3. Timothy Keller — Evangelho ao Coração

Ver `context/keller-evangelho-ao-coracao.md` para a referência completa. Síntese:

- **Duas responsabilidades do pregador**: com a verdade do texto e com as
  pessoas específicas. **Servir a Palavra** (pregar o texto → pregar o
  evangelho sempre → pregar Cristo em toda a Escritura) + **Alcançar as
  pessoas** (pregar à cultura → pregar ao coração) + **em demonstração do
  Espírito**
- **Legalismo e antinomismo são "gêmeos não idênticos do mesmo ventre"**
  (Sinclair Ferguson) — ambos enraizados na mentira da serpente de que Deus
  não é bom. Não se cura um com dose do outro; a única cura é a beleza da
  graça gratuita em Cristo (união com Cristo)
- **Seis formas de pregar Cristo em toda a Escritura**: por gênero, por tema
  bíblico, por personagem, por imagem, por enredo de libertação, pelo
  instinto — introduzidas seguindo o fio, saltando ao cumprimento, ou via
  tensão da narrativa
- **Diagnóstico do salvador funcional / ídolo do coração**: a raiz de todo
  fracasso moral é a incredulidade — confiar em ídolos (salvadores
  funcionais) para segurança e felicidade última, em vez de repousar na
  graça. Tema recorrente: "o Deus verdadeiro contra os ídolos"
- **Seis elementos de pregar ao coração**: afeições verdadeiras, imaginativa,
  maravilhada, memorável, cristocêntrica, prática (aplicação diferenciada)
- **Teste do terceiro texto**: todo sermão tem um subtexto — reforço,
  desempenho, treinamento ou adoração (o único alvo legítimo)

## Workflow: Do Texto ao Sermão

Quando o usuário apresentar uma perícope bíblica para estudo (referência
bíblica, "estude este texto", "prepare um estudo sobre", "vamos estudar"),
seguir o workflow completo de 6 fases definido em
`context/workflow-estudo-biblico.md`.

### Resumo das fases (cada fase pausa para validação do usuário)

| Fase | O que faz | Pilar |
|------|-----------|-------|
| 1. Exegese | Histórico-gramatical: gênero, estrutura, contexto, argumento do autor | Simeon Trust |
| 2. Telos | Consulta `estudos/indice.md` (coerência) → propósito do Espírito Santo nesta passagem, em uma frase | Adams |
| 3. Diagnóstico | Qual o problema/ídolo? Como Deus resolveu lá? A história e a lição | Adams + Keller |
| 4. Exegese cultural | Manifestação contemporânea: ídolos atuais, desdobramentos, BCNs | Keller |
| 5. Aplicação cristológica | O que é exigido e não cumprimos? Como Jesus cumpre? Implementação | Adams + Keller + Simeon Trust |
| 6. Construção homilética | 6a: esboço estruturado → validação → 6b: rascunho na voz pastoral | Os três + skill de voz |
| 7. Entrega | Formato (DOCX/PDF) para sermão/esboço/estudo + registra linha em `estudos/indice.md` | Layout IPE |

### Saída

- Estudo em markdown: `estudos/<livro>/<capítulo>-<versículos>.md`
- Documentos formatados (DOCX/PDF) com layout IPE (capa simplificada)
  salvos na mesma pasta, entregues via SendUserFile

### Regra fundamental

O telos é sempre da **perícope selecionada**, independentemente da série de
sermões. Cada fase deve servir ao telos — se se desviou, corrigir antes de
avançar.

## Princípios hermenêuticos não-negociáveis

- **Escritura interpreta Escritura** — paralelos e esclarecimentos em outras
  passagens antes de fontes externas
- **Método histórico-gramatical** — gênero literário, contexto histórico-cultural
  do primeiro século, intenção do autor/falante
- **Leitura cristocêntrica e redentivo-histórica** — criação → queda → redenção
  → consumação; evitar moralizações
- **Sola Scriptura** como princípio de autoridade final
- **Permanecer na Linha** (Simeon Trust) — não ir além nem aquém do texto

## Estrutura do projeto

```
context/                            — documentos de referência metodológica
  simeon-trust-metodologia.md       — pathway exegético completo (Simeon Trust +
                                      Cavar e Descobrir)
  keller-evangelho-ao-coracao.md    — evangelho sempre, pregar Cristo em toda a
                                      Escritura, pregar à cultura e ao coração,
                                      com seção "Riscos e cuidados"
  adams-hermeneutica-telica.md      — telos, aplicação, "como fazer", pregar ao
                                      coração, pregar segundo o Espírito
  workflow-estudo-biblico.md        — workflow completo de 7 fases: do texto ao
                                      sermão, com entrega formatada
  ilustracoes-metodologia.md        — princípio de reuso (fim homilético, não
                                      conveniência), template, regra de direitos
                                      autorais, fontes de alimentação do banco

assets/                             — identidade visual e recursos gráficos
  identidade-visual-ipe.md          — especificações de cores, fontes, layout IPE
  farol.png / farol.svg             — logo da IP Esperança

ilustracoes/                        — banco vivo de ilustrações de pregação
  banco-ilustracoes.md              — acervo com fonte, tags, fim homilético e
                                      histórico de usos por entrada; alimentado
                                      manualmente (Fase 6a) e por rotina mensal
                                      automatizada (append-only, nunca remove)

estudos/                            — estudos bíblicos completos (saída do workflow)
  indice.md                         — tabela mestra: perícope, gênero, telos,
                                      ídolo/tema, data, link — consultada na
                                      Fase 2 (coerência) e atualizada na Fase 7
  <livro>/                          — organizado por livro bíblico
    <capítulo>-<versículos>.md      — estudo completo (markdown)
    <capítulo>-<versículos>.docx    — sermão ou estudo formatado
    <capítulo>-<versículos>-pulpito.docx — esboço de púlpito (se solicitado)
```

Os três pilares metodológicos (Simeon Trust, Adams, Keller) estão
documentados na íntegra desde 2026-09-16. O workflow de estudo integra os
três pilares em um processo de 6 fases com validação interativa.

Projeto versionado em `https://github.com/AllanAcioly/exegese-hermeneutica-homiletica`
(privado). Rotina mensal na nuvem (`trig_017L6avuABu35xSx1cEE39z5`, dia 1 de
cada mês, 08h São Paulo) faz varredura de ilustrações de pregação e
commit/push direto em `main` — só adiciona, nunca remove.

## Skills disponíveis

- `allan-acioly-homiletica` — perfil de voz pastoral completo (99 peças de
  corpus); usar para produção de sermões e esboços
- `aula-indutiva-ipe` — formato indutivo/socrático para grupos; usar para
  transformar estudos em aulas de descoberta guiada
- `polir-sermao` — revisão homilético-retórica em 4 passes (diagnóstico,
  salvaguardas teológicas, revisão, coerência final); corta autoimplicações
  escritas + marcas de oralidade + gordura retórica; preserva telos, combate
  duplo, cristologia específica e implementação prática. Ver
  `skills/polir-sermao/SKILL.md` (fonte no projeto, `.skill` empacotado
  disponível em `skills/polir-sermao.skill`)

## Nota histórica

O projeto começou com foco exclusivo em parábolas e foi ampliado em 2026-09-16
para cobrir qualquer gênero literário bíblico. A metodologia e o fluxo de
estudo não mudaram — apenas o escopo do corpus de textos trabalhados.
