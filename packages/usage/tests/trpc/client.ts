import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import crossFetch from 'cross-fetch';
import type { AppRouter } from './server';
import superjson from 'superjson';

export const client = createTRPCProxyClient<AppRouter>({
  transformer: superjson,
  links: [
    httpBatchLink({
      url: 'http://localhost:2022',
      fetch: crossFetch,
    }),
  ],
});
