## Table of content

* [About](#about)
* [Installation](#installation)
* [Usage](#usage)
  - [Generator options](#generator-options)


## About

`zod-prisma-types` is a generator for `prisma` that tries to mirror the type structure of the generated prisma types as closly as possible with `zod schemas`. It also provides the option to write advanced zod validators directly in the prisma schema comments.

## Installation

## Usage

To use the generator add the following code to your prisma.schema file:

```prisma
generator zod {
  provider = "zod-prisma-types"
  output   = "./zod" // optional custom output path - defaults to ./prisma/generated/zod
  // useValidatorJs = true // optional: default is false
  // useDecimalJs   = false // optional: default is true
}
```

This generator only creates a single `index.ts` file in the specified output folder. This file contains all the created schemas - similar to `prisma-client` `index.d.ts`

This design decesion was made because in ts-morph it is more efficient to create a single file and write a bunch of statements at once than creating multiple files where only a few statements are added. This can be beneficial for generating big prisma schemas. Another point is that it makes the codebase of the generator more managable (...no need to create imports, simpler structure of the files) and it makes it simpler to reexport all the types at once e.g. for use in the frontend (react-hook-form validation, ...).

## Generator options

### `useDecimalJs`

> default: `true`

This option lets you specify if the [decimal.js](https://mikemcl.github.io/decimal.js/) library is used to validate the `Prisma.Decimal` type. In Prisma decimal fields are represented by the decimal.js library (see [prisma docs](https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields#working-with-decimal)). 

```ts
// If true the generator imports the `Decimal` class and generates the following output:
decimalValue: z.number().refine((v) => Decimal.isDecimal(v), { message: 'Must be a Decimal' }),

// If `false` no additional library is importet and the generator creates the following output:
decimalValue: z.number()
```

### `useValidateJs`

> default: `false`

This option lets you specify if the [validator.js](https://github.com/validatorjs/validator.js) library can be used in custom refine functions on string types by importing it into the created file.



## Naming of zod schemas

The zod types are named after the generated prisma types so you just need to hover over a prisma function and you know which type to import. The result would look something like this for trpc v.10:

```ts
import {
  UserFindFirstArgs,
  UserFindManyArgs,
  UserFindUniqueArgs,
} from './prisma/generated/zod';

const appRouter = t.router({
  findManyUser: t.procedure.input(UserFindManyArgs).query(({ input }) => {
    return prisma.user.findMany(input);
  }),
  findUniqueUser: t.procedure.input(UserFindUniqueArgs).query(({ input }) => {
    return prisma.user.findUnique(input);
  }),
  findFirstUser: t.procedure.input(UserFindFirstArgs).query(({ input }) => {
    return prisma.user.findFirst(input);
  }),
  // rest of implementation ...
});
```
