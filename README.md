# Rotinapp

Aplicação Next.js para gerenciamento compartilhado de rotinas diárias.

## Desenvolvimento

1. Instale as dependências com `npm install`.
2. Copie `.env.example` para `.env.local` e ajuste os valores.
3. Inicie a aplicação com `npm run dev`.

## Comandos

- `npm run dev`: inicia o servidor de desenvolvimento.
- `npm run lint`: verifica o código com ESLint.
- `npm run typecheck`: verifica os tipos sem gerar arquivos.
- `npm run build`: gera o build de produção.

## Deploy

O projeto utiliza apenas os recursos padrão do Next.js suportados pelo Netlify. As
variáveis de ambiente, incluindo `DATABASE_URL` e `APP_TIME_ZONE`, devem ser
configuradas no ambiente do site e não versionadas no repositório.
