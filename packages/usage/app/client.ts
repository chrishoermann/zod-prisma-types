// @filename: client.ts
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from './server.js';

// Notice the <AppRouter> generic here.
const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:3000/trpc',
    }),
  ],
});

const main = () => {
  const user = trpc.createJson
    .mutate({
      data: {
        json: {
          foo: 'bar',
        },
      },
    })
    .then((res) => {
      console.log(res);
    });

  console.log(user);
};

main();
