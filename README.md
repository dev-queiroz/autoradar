This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Provedores externos e configuração

Para que a aplicação entregue anúncios reais e dados externos substituindo os mocks, configure as variáveis de ambiente listadas em `.env.example`:

* GECKO_BASE - Base URL do agregador Gecko/Webmotors (se aplicável)
* GECKO_API_KEY - Chave de API para o agregador
* INVERTEXTO_TOKEN - Token para a API Invertexto (usada para FIPE avançado quando disponível)

Sem essas variáveis a rota `/api/vehicles/search` retorna 503 indicando que nenhum provedor está configurado. Após configurar as variáveis, reinicie a aplicação e a pesquisa usará os provedores reais configurados.

Para deploy profissional, recomendo usar Vercel e definir as variáveis de ambiente no painel do projeto. Opcionalmente, configure um cache CDN para as respostas das rotas de FIPE para reduzir latência e evitar rate limits.