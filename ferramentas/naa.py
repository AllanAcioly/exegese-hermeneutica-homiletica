#!/usr/bin/env python3
"""Busca o texto da NAA (Nova Almeida Atualizada) em bibliaonline.com.br.

Uso (na raiz do repositório):
    python3 ferramentas/naa.py <livro> <capítulo> [versículos]

    python3 ferramentas/naa.py mt 20 1-16
    python3 ferramentas/naa.py gn 15 1
    python3 ferramentas/naa.py sl 73 25-26

<livro> é a abreviação usada pelo site (gn, ex, 1sm, sl, pv, jn, mt, mc, lc,
jo, rm, 1co, 2co, ...). Sem [versículos], imprime o capítulo inteiro.

Requer acesso de rede a www.bibliaonline.com.br (no ambiente de nuvem, o
domínio precisa estar em "Allowed domains"). Ver "Versão bíblica" em
context/workflow-estudo-biblico.md.
"""
import html
import re
import sys
import urllib.request


def capitulo(livro, cap):
    url = f"https://www.bibliaonline.com.br/naa/{livro}/{cap}"
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, timeout=30) as r:
        x = r.read().decode("utf-8")
    # Títulos de seção (h1-h6) não fazem parte do texto bíblico.
    x = re.sub(r"<h([1-6])[ >].*?</h\1>", " ", x, flags=re.S)
    marcas = [(m.start(), int(m.group(1)))
              for m in re.finditer(r'data-vn="" data-v="\.(\d+)\."', x)]
    if not marcas:
        raise SystemExit(f"texto não encontrado em {url}")
    vs = {}
    for k, (pos, n) in enumerate(marcas):
        if k + 1 < len(marcas):
            fim = marcas[k + 1][0]
        else:  # último versículo: até o fim do último trecho marcado com ele
            ult = x.rfind(f'data-v=".{n}."')
            fim = x.find("</span></span>", ult) + len("</span></span>")
        seg = re.sub(r"<[^>]*$", "", x[pos:fim])  # corta a tag do próximo versículo
        seg = re.sub(r"^[^>]*>\s*\d+(?:<!-- -->)?\s*</span>", "", seg)  # número do versículo
        seg = re.sub(r"<(?:sup|button)[ >].*?</(?:sup|button)>", "", seg, flags=re.S)  # chamadas de nota
        txt = html.unescape(re.sub(r"<[^>]+>", "", seg))
        vs[n] = re.sub(r"\s+", " ", txt).strip()
    return vs


def main():
    if len(sys.argv) < 3:
        print(__doc__)
        sys.exit(1)
    livro, cap = sys.argv[1], sys.argv[2]
    vs = capitulo(livro, cap)
    if len(sys.argv) > 3:
        a, _, z = sys.argv[3].partition("-")
        a, z = int(a), int(z or a)
    else:
        a, z = min(vs), max(vs)
    for n in range(a, z + 1):
        print(f"{cap}.{n} {vs.get(n, '(versículo não encontrado)')}")


if __name__ == "__main__":
    main()
