# Metodologia do Banco de Ilustrações

## Princípio central

Uma ilustração não se desgasta pelo uso — desgasta-se pelo uso **descolado
do seu propósito**. Toda boa ilustração tem um **fim homilético próprio**:
ela existe para tornar tangível uma verdade teológica específica, através
de uma lógica de analogia específica. Duas perguntas governam este banco:

1. **Qual é o fim homilético desta ilustração?** — não "sobre o que ela é",
   mas o que ela *prova* ou *torna sentido* teologicamente
2. **Este fim bate com o que o ponto do sermão atual precisa?** — se sim,
   reutilizar é fidelidade à ilustração, não preguiça. Se não bate, mesmo
   sendo uma ótima ilustração, não deve ser forçada no texto

Nenhuma boa ilustração deve ser desperdiçada — mas nenhuma deve ser usada
fora do seu propósito só por conveniência.

## Onde fica o banco

`ilustracoes/banco-ilustracoes.md` — arquivo único crescente, organizado
por tags para busca (não por pastas temáticas separadas). Justificativa:
os três documentos de pilares já crescem como arquivos únicos grandes
(~40KB) sem prejuízo de uso; tags resolvem a navegação sem exigir decidir
categorias fixas de antemão, que tendem a não se sustentar conforme o
acervo cresce. Se o arquivo ficar difícil de navegar, revisitar a divisão
por tema então — não antes.

## Template de entrada

```markdown
## [ID] Título curto da ilustração

- **Fonte**: Própria (Allan) | Pregador: [nome] | Filme: [título] |
  Música: [artista — faixa] | Notícia atual | Evento histórico |
  Varredura mensal
- **Origem específica**: sermão/livro/cena/evento e onde encontrar
  (referência checável — não precisa ser link, mas deve ser rastreável)
- **Tags**: ídolos, temas teológicos, gêneros bíblicos aplicáveis
  (ex: `#ídolo-aprovação` `#graça` `#sofrimento` `#narrativa`)
- **Descrição**: resumo da cena/ideia central — paráfrase, nunca
  reprodução extensa (ver regra de direitos autorais abaixo)
- **Fim homilético**: a verdade teológica específica que ilustra e a
  lógica exata da analogia (o "porquê" ela funciona, não só o "o quê")
- **Adicionada em**: AAAA-MM-DD

### Usos

| Data | Sermão/Perícope | Conexão específica que justificou o reuso |
|------|------------------|---------------------------------------------|
| —    | —                | —                                            |
```

A tabela de **Usos** é obrigatória a cada reaproveitamento — não basta
registrar que foi usada de novo, é preciso registrar **por que o fim
homilético bateu** com o novo sermão. Isso é o que impede o uso por
conveniência.

## Regra de direitos autorais

O banco **nunca reproduz** letras de música na íntegra, diálogos extensos
de roteiro, ou trechos longos de sermões de terceiros. Cada entrada
descreve a cena, o evento ou a ideia central em paráfrase — o suficiente
para o Allan lembrar e recriar a ilustração com suas próprias palavras no
púlpito. Citações diretas, quando necessárias, seguem a regra geral: no
máximo uma citação por entrada, abaixo de 15 palavras, entre aspas, com
atribuição clara.

## Fontes de alimentação

### 1. Criação própria (Allan)

Toda ilustração nova criada durante a Fase 6 (Construção Homilética) do
workflow de estudo é automaticamente registrada no banco como
`Fonte: Própria (Allan)`, com o próprio sermão já lançado na tabela de
Usos. Nenhuma ilustração boa se perde depois de pregada uma vez.

### 2. Varredura mensal automatizada

Um agente executa mensalmente uma busca por ilustrações de:

**Pregadores e pensadores reformados — internacionais**: Charles Spurgeon,
Martyn Lloyd-Jones, R.C. Sproul, John Piper, Matt Chandler, Alistair Begg,
Tim Keller, Voddie Baucham, D.A. Carson, Sinclair Ferguson, Kevin DeYoung,
Ligon Duncan, Ray Ortlund, Kevin Vanhoozer, Michael Horton, Jay Adams,
Francis Schaeffer, os Puritanos (categoria — Owen, Baxter, Bunyan, Watson
et al.)

**Vozes cristãs mais amplas** (não estritamente reformadas, mas de peso
apologético/cultural): C.S. Lewis, G.K. Chesterton, James K. A. Smith

**Pregadores brasileiros**: Emílio Garófalo Neto (Igreja Presbiteriana
Semear, Brasília), Guilherme de Carvalho (Igreja Esperança, Belo
Horizonte), Igor Miguel (auxiliar de Guilherme de Carvalho na Igreja
Esperança, Belo Horizonte), Jonas Madureira, Franklin Ferreira

Lista-base, ampliável — Allan pode adicionar ou remover nomes a qualquer
momento pedindo diretamente.

Além dos pregadores, a varredura também busca:
- **Eventos históricos e notícias atuais** com ressonância teológica
- **Cenas de filmes** (qualquer origem, desde que a ilustração sirva a um
  ponto teológico claro)
- **Trechos musicais**, cristãos ou seculares (tema/narrativa da música,
  nunca a letra reproduzida)

As ilustrações encontradas entram **diretamente no banco**, marcadas
`Fonte: Varredura mensal`, seguindo o template acima — **só adicionando**,
nunca apagando ou alterando entradas existentes. A curadoria (descartar o
que for fraco) é sempre manual, feita pelo Allan quando for usar.

### Checklist antes de adicionar (própria ou por varredura)

- [ ] O fim homilético está formulado como verdade teológica específica
      (não como tema genérico)?
- [ ] A descrição é paráfrase, sem reprodução extensa de material
      protegido?
- [ ] As tags permitem que a ilustração seja encontrada por busca de
      texto no arquivo?
- [ ] A origem é rastreável (dá para checar/confirmar depois)?
