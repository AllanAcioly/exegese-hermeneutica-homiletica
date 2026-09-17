# Identidade Visual — Igreja Presbiteriana Esperança (IPE)

Referência para geração de documentos DOCX/PDF com branding IPE.

## Cores

| Nome | Hex | Uso |
|------|-----|-----|
| Marinho | `#252544` | Títulos, barras, elementos de destaque |
| Dourado | `#C8955B` | Acentos, ornamentos, linhas decorativas |
| Dourado escuro | `#9C6F3D` | Texto dourado (melhor legibilidade) |
| Pergaminho | `#F4F1EA` | Fundo de caixas de nota |
| Dourado pálido | `#FBF4E9` | Fundo de caixas de destaque leve |
| Tinta | `#2B2B33` | Texto corpo principal |

## Tipografia

| Elemento | Fonte | Notas |
|----------|-------|-------|
| Corpo | **Cambria** | Nativa do MS Office — sem risco de substituição |
| Títulos e rótulos | **Constantia** | Nativa do MS Office |

Alternativa (quando pedido pelo usuário para combinar com ebooks):
Cormorant Garamond — requer embedding no DOCX.

## Símbolo

- **Farol** com cruz e água: `assets/farol.png` (ou `farol.svg`)
- **Versículo-guia**: Salmo 119.105 — "Lâmpada para os meus pés é a tua
  palavra e luz para os meus caminhos."
- **Selo de fechamento**: *Soli Deo Gloria*

## Layout de página

- **Formato**: A4 (11906 × 16838 DXA)
- **Margens**: top/bottom 1440, left/right 1620 (largura de conteúdo 8666)
- **Cabeçalho/rodapé**: só a partir da página 2 (`titlePage: true`)

## Capa para sermões (simplificada)

- Título do sermão (Constantia, marinho)
- Subtítulo com texto-base / referência bíblica
- Data
- Sem farol/branding pesado
- Linha decorativa dourada opcional como separador

## Geração de DOCX

Usar `docx` (npm). Base técnica no `build_template.js` da skill
`aula-indutiva-ipe`, adaptando a infraestrutura (paleta, fontes, helpers,
Document) para o tipo de documento desejado.
