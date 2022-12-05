
# zod-prisma-types

`zod-prisma-types` is a generator for [prisma](www.prisma.io) that mirrors the prisma type structure as closly as possible using [zod](https://github.com/colinhacks/zod). It also provides options to write advanced zod validators directly in the prisma schema comments.

# Table of content

* [Installation](#installation)
* [Usage](#usage)
  - [output](#output)
  - [useDecimalJs](#usedecimaljs)
  - [useValidatorJs](#usevalidatorjs)
  - [imports](#imports)
* [Field validators](#field-validators)
* [Naming of zod schemas](#naming-of-zod-schemas)




# Installation

# Usage

Just add the following code to your `prisma.schema` file to create a single `index.ts` file in the `./generated/zod` output folder containing all the zod prisma schemas.

```prisma
generator zod {
  provider       = "zod-prisma-types"
}
```
If you want to customize the behaviour of the generator you can use the following options: 

```prisma
generator zod {
  provider       = "zod-prisma-types"
  output         = "./zod" // optional - default is ./generated/zod
  useValidatorJs = true // optional - default is false
  useDecimalJs   = false // optional - default is true
  imports        = "import(import { myFunction } from 'mypackage').import(import { custom } from './myfolder')" // optional
}
```
> As mentinned above this generator only creates a single `index.ts` file in the specified output folder containing all the zod prisma schemas. I decided to only create a single file because in [`ts-morph`](https://ts-morph.com/manipulation/performance) it is more efficient to write a bunch of statements to a single file at once than creating multiple files where only a few statements are added. This can be beneficial for generating zod schemas for big prisma schemas. Another point is that it makes the codebase of the generator more managable (...no need to create imports, simpler structure of the files) and it's easier to use custom imports (see below).
> 

## `output`

> default: `./generated/zod`

Provide an alternative output path.

## `useDecimalJs`

> default: `true`

By default the [decimal.js](https://mikemcl.github.io/decimal.js/) library is used to validate the `Prisma.Decimal` type. In Prisma `Decimal` fields are represented by the [decimal.js](https://mikemcl.github.io/decimal.js/) library as stated in the [prisma docs](https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields#working-with-decimal). If you use the `Decimal` type somewhere in your `prisma.schema` and want to use the default implementation you need to install [decimal.js](https://mikemcl.github.io/decimal.js/) to your dependencies manually.

```prisma
model MyModel {
  id         Int      @id @default(autoincrement())
  decimal    Decimal
  decimalOpt Decimal?
}
```
By default the above model generates the following output:
```ts
// import added 
import { Decimal } from "decimal.js";

// generated zod schema
export const MyModel = z.object({
  id: z.number(),
  decimal: z
    .number()
    .refine((v) => Decimal.isDecimal(v), {
      message: 'Field "decimal" must be a Decimal',
      path: ['Models', 'MyModel'],
    }),
  decimalOpt: z
    .number()
    .refine((v) => Decimal.isDecimal(v), {
      message: 'Field "decimalOpt" must be a Decimal',
      path: ['Models', 'MyModel'],
    })
    .nullable(),
});
```
If you opt out of validating the `Decimal` type with `decimal.js` the generated output would look like this

```ts
// no import added

// generated zod schema
export const MyModel = z.object({
  id: z.number(),
  decimal: z.number(),
  decimalOpt: z.number().nullable(),
});
```

## `useValidatorJs`

> default: `false`

If `true` the [validator.js](https://github.com/validatorjs/validator.js) library is imported and can be used in custom zod validator functions for `String` types. If you want to use this option you need to install [validator.js](https://github.com/validatorjs/validator.js) to your dependencies.

```ts
// adds import
import validator from 'validator';

// 'validator' can now be used in every zod.string validator
```

## `imports`

You can specify custom imports that are then added to the `index.ts` file. Since prisma only lets us specify `string` options in the `prisma.schema` generator config the syntax of the imports is a bit clumsy:

```prisma
generator zod {
  // ...other config options
  imports        = "import(import { myFunction } from 'mypackage').import(import { custom } from './myfolder')"
}
```
> The function-like syntax is used to easily split the string into an array and remove the unnecessary stuff 

This config adds the following imports to the file:

```ts
// ...standard imports

// your custom imports
import { myFunction } from 'mypackage'
import { custom } from './myfolder'
```

# Field validators
It is possible to add zod validators in the comments of the `prisma.schema` file with the following syntax (use `///` instead of `//`).

```prisma
myField [prisma-scalar-type] /// @zod.[zod-type with optional[(zod-error-messages)]].[zod validators for scalar]
```

This maybe looks a bit cryptc. To make it easier to undestand here is an example:

```prisma
generator zod {
  provider       = "zod-prisma-types"
  output         = "./zod" 
  useDecimalJs   = true 
  imports        = "import(import { myFunction } from 'mypackage')"
}

model MyPrismaScalarsType {
  /// @zod.string({ invalid_type_error: "invalid type error" }).cuid()
  id      String    @id @default(cuid())
  /// Some comment about string @zod.string.min(3, { message: "min error" }).max(10, { message: "max error" })
  string  String?
  /// @zod.custom.use(z.string().refine((val) => validator.isBIC(val), { message: 'BIC is not valid' }))
  bic     String?
  /// @zod.number({ error: "error", some_key: "error", wrong_type_error: "error" })
  float   Float
  decimal Decimal
  date    DateTime? /// @zod.date.min(new Date('2020-01-01'))
  bigInt  BigInt
  json    Json
  bytes   Bytes
  /// @zod.custom.use(z.string().refine((val) => myFunction.validate(val), { message: 'Is not valid' }))
  custom  String?
}
```
This example generates a zod schema in `prisma/zod/index.ts` that looks like this:

```ts
import { z } from 'zod';
import * as Prisma from '@prisma/client';
import { Decimal } from 'decimal.js';
import validator from 'validator';
import { myFunction } from 'mypackage';

export const JsonValue: z.ZodType<Prisma.Prisma.JsonValue> = z
  .union([
    z.string(),
    z.number(),
    z.boolean(),
    z.lazy(() => z.array(JsonValue)),
    z.lazy(() => z.record(JsonValue)),
  ])
  .nullable();

export const MyPrismaScalarsType = z.object({
  id: z.string({ invalid_type_error: 'invalid type error' }).cuid(),
  /**
   * Some comment about string
   */
  string: z
    .string()
    .min(3, { message: 'min error' })
    .max(10, { message: 'max error' })
    .nullable(),
  bic: z
    .string()
    .refine((val) => validator.isBIC(val), { message: 'BIC is not valid' })
    .nullable(),
  float: z.number(),
  decimal: z
    .number()
    .refine((v) => Decimal.isDecimal(v), {
      message: 'Field "decimal" must be a Decimal',
      path: ['Models', 'MyPrismaScalarsType'],
    }),
  date: z.date().min(new Date('2020-01-01')).nullable(),
  bigInt: z.bigint(),
  json: JsonValue,
  bytes: z.instanceof(Buffer),
  custom: z
    .string()
    .refine((val) => myFunction.validate(val), { message: 'Is not valid' })
    .nullable(),
});

```
Additionally all the prisma input-, enum-, filter-, orderby-, select-, include and all other necessary types are generated ready to be used in e.g. `trpc` inputs.

# Naming of zod schemas

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


#### `prisma-scalar-type`
Any prisma scalar type as mentioned in the [prisma docs](https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference#model-field-scalar-types). The customized validation oly works on prisma scalars.

#### `zod-type`
The [zod primitive types](https://github.com/colinhacks/zod#primitives) `string`, `number` and `date` and a `custom` key to add a completly custom validation logic.

#### `zod-error-messages`
Any object that adheres to the `RawCreateParams` type. A

```ts
type RawCreateParams = {
  invalid_type_error?: string;
  required_error?: string;
  description?: string;
} | undefined
```
Any key that does not match the keys of `RawCreateParams` is filterd out and will not be printed in the generated zod schema

### String

e.g. if the zod scalar is `string` and you want to use `.min(3)` and `.max(10)` on a string field you can add the following to your prisma.schema


