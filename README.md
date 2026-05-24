# radio.lucafchala.com

Portal comunitário dedicado ao radioamadorismo, APRS, RF, modos digitais, experimentação e infraestrutura de comunicação resiliente.

> **Live:** [radio.lucafchala.com](https://radio.lucafchala.com)

---

## Estrutura

```
/                   → portal principal
/pu2xik/            → Luca F. Chala (PU2XIK)
/pu5oef/            → Edivaldo Filho (PU5OEF)
/pu2xyz/            → página exemplo de operador
/doacoes/           → página de apoio financeiro ao portal
/style.css          → estilos globais compartilhados
/wrangler.jsonc     → configuração Cloudflare Workers (proxy APRS)
```

---

## Funcionalidades

- **Páginas pessoais de operadores** — HTML estático, tema próprio por operador
- **APRS tracking ao vivo** — via proxy Cloudflare Worker que consome a API da [aprs.fi](https://aprs.fi), com mapa Leaflet interativo
- **Logbook QRZ** — iframe do diário de bordo de cada operador, integrado visualmente à página
- **OG tags completas** — Open Graph e Twitter Card para prévia em redes sociais
- **Schema.org** — marcação estruturada para SEO

---

## Infraestrutura

| Componente | Solução |
|---|---|
| Hospedagem | Cloudflare Pages |
| CDN + DDoS | Cloudflare |
| HTTPS | Automático via Cloudflare |
| Deploy | GitHub → Cloudflare Pages (push automático) |
| Proxy APRS | Cloudflare Workers |
| Frontend | HTML / CSS / JS puro |

Sem frameworks, sem backend, sem banco de dados.

---

## Deploy

```
git push → Cloudflare Pages build automático
```

Cada push na branch `main` gera um novo deploy em produção.

---

## Adicionar um operador

1. Criar pasta `/indicativo/` com um `index.html`
2. Seguir o padrão das páginas existentes (`pu5oef` é a mais completa)
3. Fazer push — o portal entra no ar automaticamente

---

## Desenvolvimento local

Recomendado:

- VSCode + Live Server
- GitHub Desktop ou CLI

---

## Contato

| | |
|---|---|
| Website | [lucafchala.com](https://lucafchala.com) |
| QRZ | [qrz.com/db/PU2XIK](https://www.qrz.com/db/PU2XIK) |
| Portal | [radio.lucafchala.com](https://radio.lucafchala.com) |
| Email | pagina.radio@lucafchala.com |

---

## Licença

Conteúdo pertencente aos respectivos autores e operadores.
