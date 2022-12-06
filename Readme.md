
# zod-prisma-types

`zod-prisma-types` is a generator for [prisma](www.prisma.io) that generates [zod](https://github.com/colinhacks/zod) schemas from your prisma models. This includes schemas of model, enums, inputTypes, argTypes, filters and so on. It also provides options to write advanced zod validators directly in the prisma schema comments.

# Table of content

* [Installation](#installation)
* [Usage](#usage)
  - [output](#output)
  - [useDecimalJs](#usedecimaljs)
  - [useValidatorJs](#usevalidatorjs)
  - [imports](#imports)
* [Field validators](#field-validators)
  - [Custom type error messages](#custom-type-error-messages)
  - [String validators](#string-validators)
  - [Number validators](#number-validators)
  - [Date validators](#date-validators)
  - [Custom validators](#custom-validators)
  - [Validation errors](#validation-errors)
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
  /// comment about string @zod.string.min(3, { message: "min error" }).max(10, { message: "max error" })
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
   * comment about string
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

## Custom type error messages

To add custom zod type error messages to your validator you can add them via `@zod.[key]({ ...custom type error messages }).[validators]`. The custom error messages must adhere to the following type: 

```ts
type RawCreateParams = {
  invalid_type_error?: string;
  required_error?: string;
  description?: string;
} | undefined
```

So they should look like this:

```prisma
/// @zod.string({ invalid_type_error: "invalid type error", required_error: "is required", description: "describe the error" })
```

This would result in an output like:

```ts
 string: z.string({
    invalid_type_error: 'invalid type error',
    required_error: 'is required',
    description: 'describe the error',
  }),
```

All keys that do not match keys of the `RawCreateParams` type will be filterd out and are not written to the zod type. Currently no error is thrown when an invalid key is used but I intend to implement this behaviour in a future release. So if you have a typo or an invalid key in your custom type error string

```prisma
/// @zod.string({ invalid_type_error: "invalid type error", my_invalid_key: "is required", description: "describe the error" })
```

the result would look like this (`my_invalid_key` got filtered out):

```ts
 string: z.string({
    invalid_type_error: 'invalid type error',
    description: 'describe the error',
  }),
```


## String validators

To add custom validators to the prisma `String` field you should use the `@zod.string` key. On this key you can use all string-specific validators that are mentioned in the [`zod-docs`](https://github.com/colinhacks/zod#strings). You can also add a custom error message to each validator as stated in the docs.

```prisma
/// @zod.string.min(3, { message: "min error" }).max(10, { message: "max error" }).[...chain more validators]
```

## Number validators

To add custom validators to the prisma `Int` or `Float` field you should use the `@zod.number` key. On this key you can use all number-specific validators that are mentioned in the [`zod-docs`](https://github.com/colinhacks/zod#numbers). You can also add a custom error message to each validator as stated in the docs.

```prisma
/// @zod.number.lt(10, { message: "lt error" }).gt(5, { message: "gt error" }).[...chain more validators]
```

## Date validators

To add custom validators to the prisma `DateTime` field you should use the `@zod.date` key. On this key you can use all date-specific validators that are mentioned in the [`zod-docs`](https://github.com/colinhacks/zod#dates). You can also add a custom error message to each validator as stated in the docs.

```prisma
///  @zod.date.min(new Date('2020-01-01')).max(new Date('2020-12-31'))
```

## Custom validators

To add custom validators to any [`Prisma Scalar`](https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference#model-field-scalar-types) field you can use the `@zod.custom.use()` key. This key allows only the `use(...your custom code here)` validator. This code overwrites all other standard implementations so you have to specify the `zod type` exectly how it should be written by the generator. Only  `.optional()` and `.nullable()` are added automatically based on your schema type. This field is inteded to writethings like zod `.refine` or `.transform` validators on your fields.

```prisma
model MyModel {
  id     Int     @id @default(autoincrement())
  custom String? /// @zod.custom.use(z.string().refine(val => validator.isBIC(val)).transform(val => val.toUpperCase()))
}
```

This would generate

```ts
export const MyModel = z.object({
  id: z.number(),
  custom: z
    .string()
    .refine((val) => validator.isBIC(val))
    .transform((val) => val.toUpperCase())
    .nullable(),
});
```

## Validation errors

To ease the developer experience the generator checks if the provided `@zod.[key]` can be used on the respective type of the model field 
It also checks if the `@zod.[key].[validator]` can be used on the `@zod.[key]` 

#### `Wrong zod type`
The generator throws an error if you use a validator key like `@zod.string` on the wrong prisma type.

```prisma
model MyModel {
  string String /// @zod.string.min(3) -> valid - `string` can be used on `String`
  number Number /// @zod.string.min(3) -> invalid - `string` can not be used on `Number`
}
```

For the above example the Error message would look like this:

```
[@zod validator error]: Validator 'string' is not valid for type 'Int'. [Error Location]: Model: 'MyModel', Field: 'number'
```
As you can see the generator gives you the exact location, what went wrong and where the error happend. In big prisma schemas with hundreds of models and hundreds of custom validation strings this can be a very helpful information.

#### `Wrong validator`

The generator throws an error if you use a validator  `.min` on the wrong validator key.

```prisma
model MyModel {
  number Int /// @zod.number.min(3) -> invalid - `min` can not be used on `number`
}
```

The above example would throw the following error:

```
[@zod generator error]: Validator 'min' is not valid for type 'Int'. [Error Location]: Model: 'MyModel', Field: 'number'.
```

#### `Typo Errors`

If you have typos in your validator strings like

```prisma
model MyModel {
  string String /// @zod.string.min(3, { mussage: 'Must be at least 3 characters' })
}
```

that  the generator would throw the following error:

```
[@zod generator error]: Could not match validator 'min' with validatorPattern 
.min(3, { mussage: 'Must be at least 3 characters' }). Please check for typos! [Error Location]: Model: 'MyModel', Field: 'string'.
```


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

