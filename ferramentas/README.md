# Ferramentas

## `gerar-docx-ipe.js` — DOCX no layout IPE

Gera os documentos da Fase 7 a partir dos markdowns do projeto, com o
layout IPE (A4, Cambria/Constantia, marinho e dourado, cabeçalho e rodapé,
*Soli Deo Gloria*; ver `assets/identidade-visual-ipe.md`). Os marcadores
`[^id]` viram **notas de rodapé reais do Word** (padrão obrigatório; ver
"Notas de rodapé" em `context/workflow-estudo-biblico.md`).

### Requisito

Node.js com o pacote `docx` (versão 9). Se ele não estiver disponível no
ambiente:

```bash
cd ferramentas && npm install && cd ..
```

### Uso (na raiz do repositório)

```bash
node ferramentas/gerar-docx-ipe.js <tipo> <entrada.md> <saida.docx> \
  --titulo "Título do sermão" --referencia "Livro cap.vv" \
  [--serie "Série · Sermão N · “Bloco”"] [--data "Mês de AAAA"] \
  [--duracao "≈ 43 min"] [--ate "## Fase 6b"]
```

| Tipo | Entrada | Resultado |
|---|---|---|
| `sermao` | manuscrito final (ex.: `<cap>-<vv>-sermao-revisado.md`) | capa simplificada, citações em caixas, notas de rodapé |
| `pulpito` | esboço de púlpito (`<cap>-<vv>-pulpito.md`) | sem capa, margem direita ampla para anotações; `--duracao` entra na linha de abertura |
| `estudo` | estudo completo (`<cap>-<vv>.md`) | capa "Estudo Exegético-Hermenêutico", cada seção `##` em nova página; vai até `--ate` (padrão: `## Fase 6b`) |

`--data` tem como padrão o mês e o ano correntes. `--titulo` e
`--referencia` são obrigatórios.

Exemplo (Mt 20.1-16):

```bash
node ferramentas/gerar-docx-ipe.js sermao estudos/mateus/20-1-16-sermao-revisado.md \
  estudos/mateus/20-1-16-sermao.docx --titulo "Recompensas nos Moldes do Reino" \
  --referencia "Mateus 20.1-16" --serie "Série Parábolas do Reino · Sermão 9 · “O Coração do Rei”" \
  --data "Outubro de 2026"
```

O script informa quantas notas de rodapé gerou e acusa notas definidas e
não usadas. Um marcador `[^id]` sem definição interrompe a geração com erro.

### Markdown reconhecido

- `# Título` (ignorado; o título vem de `--titulo`), `## Seção`,
  `### Subseção`, `#### RÓTULO`
- Linhas `***Referência***` e `*Série…*` no topo do sermão/púlpito são
  puladas (já estão na capa ou na linha de abertura)
- `> citação` → caixa em pergaminho com barra dourada; `> **Ideia central…**`
  → caixa marinho
- Tabelas `| … |`, listas `-` (até 3 níveis, por indentação) e `1.`
  (a numeração recomeça a cada `1.`)
- `---` → ornamento ✦
- Parágrafo que começa com `[` ou `**[` → direção de cena (itálico dourado)
- `**negrito**`, `*itálico*`, `***ambos***`; negrito com itálico dentro
- **Notas de rodapé**: `[^id]` no texto, logo depois do trecho anotado; as
  definições `[^id]: texto` (continuação indentada) ficam numa seção final
  `## Notas`, que não aparece no corpo do documento. Cada nota começa com o
  rótulo do tipo em negrito: `**Grego.**`, `**Hebraico.**`,
  `**Aprofundamento.**` ou `**Fonte.**`

### Validação

Depois de gerar, validar com o script da skill `docx`
(`scripts/office/validate.py <arquivo.docx>`; requer
`pip install defusedxml lxml`).
