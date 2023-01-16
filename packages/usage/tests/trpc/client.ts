import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import crossFetch from 'cross-fetch';
import type { AppRouter } from './server';

export const client = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:2022',
      fetch: crossFetch,
    }),
  ],
});
