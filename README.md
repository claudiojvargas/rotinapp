# Nossa Rotina

Mini aplicação PWA, mobile-first, para visualizar e editar as rotinas diárias de Claudio e Malu. Os dados ficam somente no `localStorage` do aparelho.

## Executar localmente

```bash
npm install
npm run dev
```

Abra o endereço exibido pelo Vite. Para conferir a versão de produção:

```bash
npm run build
npm run preview
```

## Testar como PWA

O service worker é gerado no build de produção. Execute `npm run build` e `npm run preview`, abra o endereço em um navegador compatível e use **Instalar app** (ou **Adicionar à tela inicial** no Android). Depois do primeiro carregamento, ative o modo avião e reabra o app para confirmar que a interface básica continua disponível.

Em outro celular da rede local, use `npm run preview -- --host`; recursos de PWA exigem contexto seguro, portanto prefira HTTPS ou teste no próprio computador via `localhost`.
