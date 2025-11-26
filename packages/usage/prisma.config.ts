import { defineConfig } from 'prisma/config';

export default defineConfig({
  schema: './prisma/schema.prisma',
  datasource: {
    url: 'postgresql://username :password%40123@localhost:5432/db_name?schema=public',
  },
});
