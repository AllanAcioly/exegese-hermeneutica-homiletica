# Metodologia do Banco de Citações

## Princípio central

Uma boa citação não decora o sermão — ela **empresta força argumentativa
ou densidade** ao ponto que o pregador está fazendo, dizendo em uma frase
o que levaria um parágrafo para dizer. Diferente da ilustração, que serve
para *tornar sensível uma ideia*, a citação serve para **ancorá-la numa
tradição de pensamento** e sustentá-la com peso de autoridade histórica
ou intelectual.

Duas perguntas governam este banco:

1. **Qual é o fim argumentativo desta citação?** — não "sobre o que ela
   é", mas o que ela *prova*, *ilumina* ou *torna inegável* no argumento
   do sermão.
2. **Este fim bate com o que o ponto do sermão atual precisa?** — se sim,
   a citação sustenta e amplia; se não bate, mesmo sendo brilhante, não
   deve ser forçada apenas por ser boa.

## Escopo dos autores

**Amplo e sem exclusivismo confessional**: cristãos e não-cristãos, clássicos
e contemporâneos. Prioriza-se a *força do argumento* sobre a filiação
teológica do autor. Isso inclui, sem limite:

- **Pais da Igreja**: Agostinho, Crisóstomo, Atanásio, Basílio, Gregório
  de Nissa, Ambrósio…
- **Medievais e reforma**: Anselmo, Tomás de Aquino (quando relevante),
  Lutero, Calvino, Bucer, Cranmer…
- **Puritanos e pós-reforma**: John Owen, Thomas Watson, Richard Sibbes,
  Jonathan Edwards, William Perkins, Richard Baxter…
- **Reformados modernos e contemporâneos**: Warfield, Bavinck, Kuyper,
  Machen, Lloyd-Jones, Sproul, Ferguson, Keller, Carson, Piper, Vanhoozer,
  Horton, DeYoung, Ortlund, Chandler, Begg, Voddie Baucham…
- **Vozes cristãs mais amplas**: C.S. Lewis, G.K. Chesterton, Dorothy
  Sayers, T.S. Eliot, Malcolm Muggeridge, Flannery O'Connor, N.T. Wright,
  Dallas Willard, Eugene Peterson, James K. A. Smith, Dietrich Bonhoeffer
  (obras-chave: *Discipulado* — "graça barata × graça preciosa" —, *Vida
  em Comunhão*, *Ética*, *Cartas e Papéis do Cárcere*)…
- **Pensadores brasileiros**: Emílio Garófalo Neto, Guilherme de Carvalho,
  Igor Miguel, Jonas Madureira, Franklin Ferreira, Antonio Renato Gusso,
  Augustus Nicodemus…
- **Filósofos, poetas e literatos**: Pascal, Kierkegaard, Dostoiévski,
  Tolstói, Simone Weil, Charles Taylor, Roger Scruton, Iain McGilchrist —
  e outros pensadores seculares *quando* a observação ilumina de verdade a
  condição humana ou o problema teológico que o sermão trata

Autor secular usar sim, mas com discernimento: a citação precisa ilustrar
uma verdade que a Escritura ensina, não substituí-la, nem contradizê-la.

## Regra de direitos autorais

- **Citação direta até ~80 palavras**: transcrita na íntegra, entre aspas,
  com atribuição completa (autor, obra, capítulo/seção quando possível).
  Serve bem para pensadores cuja força está na sintaxe (Pascal, Chesterton,
  Kierkegaard, Owen).
- **Acima de ~80 palavras**: paráfrase fiel com atribuição — reproduz o
  argumento sem plagiar a forma. Pode incluir uma citação curta interna
  (uma frase-chave) como âncora.
- **Nunca inventar citação** — se não houver evidência sólida de que o
  autor disse aquilo, marcar como "atribuído a" com nota de cautela, ou
  descartar.

## Onde fica o banco

`citacoes/banco-citacoes.md` — arquivo único crescente, organizado por
tags para busca. Cresce com todos os sermões preparados; nunca é limpo
por rotina automática (só o próprio Allan tira ou edita, como no banco de
ilustrações).

## Template de entrada

```markdown
## [CT-NNN] Título curto — tema/argumento central

- **Autor**: nome + contexto histórico (século, filiação/campo)
- **Origem**: obra, capítulo/seção, ano; link se possível
- **Tags**: `#tema1` `#tema2` `#doutrina-x` `#idolo-y` `#genero-textual`
- **Texto** (≤ ~80 palavras — na íntegra entre aspas):
  > "…"
- OU **Paráfrase** (se > 80 palavras): resumo fiel do argumento
- **Contexto**: 1-2 linhas — quando/por que o autor disse, o que estava
  respondendo
- **Fim argumentativo**: a verdade específica que a citação sustenta ou
  ilumina — o "porquê" ela funciona no argumento do sermão
- **Adicionada em**: AAAA-MM-DD

### Usos

| Data | Sermão/Perícope | Onde entrou | Conexão que justificou |
|------|------------------|-------------|-----------------------|
| —    | —                | —           | —                     |
```

## Ativação — Fase 6b do workflow

A pesquisa e adição rodam **automaticamente** durante a construção do
sermão, entre as fases 6a (esboço) e 6c (rascunho completo). Ver
`context/workflow-estudo-biblico.md` para o passo-a-passo.

### Passos da pesquisa

1. **Consultar o banco existente primeiro** (`citacoes/banco-citacoes.md`)
   por tags relacionadas ao telos, ao(s) ídolo(s) diagnosticado(s) e ao
   argumento cristológico do sermão em construção. Se encontrar candidatas
   já registradas, listá-las para reuso (respeitando o fim argumentativo).
2. **Rodar WebSearch** por citações novas relevantes, priorizando os
   grupos de autores listados acima, buscando pelas ideias-chave do
   sermão (não pelo texto bíblico apenas).
3. **Selecionar 5-8 candidatas de qualidade** — cada uma com fim
   argumentativo claro e específico ao que o sermão precisa. Descartar
   candidatas vagas ou apenas "bonitas".
4. **Adicionar todas ao banco** como novas entradas (append-only),
   preservando tudo que já está lá.
5. **Propor 2-3 melhores para uso imediato** no sermão da Fase 6c,
   sugerindo posição (introdução, ponto X, aplicação, conclusão).
6. **Pausa para validação**: usuário escolhe quais aceitar e quais
   descartar do sermão atual (as descartadas permanecem no banco para
   uso futuro).

### Checklist antes de adicionar cada entrada

- [ ] O fim argumentativo está formulado como verdade específica (não
      tema genérico)?
- [ ] A atribuição é rastreável (autor + obra + seção quando possível)?
- [ ] A citação está dentro do limite de direitos autorais (≤ 80 palavras
      na íntegra; acima disso, paráfrase)?
- [ ] Se autor secular ou não-reformado, a citação ilumina uma verdade
      que a Escritura já ensina, sem substituir ou contradizer?
- [ ] As tags permitem encontrar a citação por busca de texto no arquivo?

## Diferenças em relação ao banco de ilustrações

| | Ilustrações | Citações |
|---|-----------|----------|
| Cadência | Rotina mensal na nuvem + criação em Fase 6a | Just-in-time na Fase 6b |
| Função homilética | Tornar sensível uma ideia | Ancorar/sustentar um argumento |
| Origem | Cenas, filmes, notícias, música, eventos | Livros, ensaios, sermões, discursos |
| Reprodução | Sempre paráfrase (evita direito autoral) | Direta até ~80 palavras |
| Uso do banco | Consulta antes de criar nova ilustração | Consulta antes de rodar web search |
