[![NPM version](https://img.shields.io/npm/v/zod-prisma-types?style=for-the-badge)](https://www.npmjs.com/package/zod-prisma-types)
[![Stars](https://img.shields.io/github/stars/chrishoermann/zod-prisma-types?style=for-the-badge)](https://github.com/chrishoermann/zod-prisma-types/stargazers)
[![Contirbutors](https://img.shields.io/github/contributors/chrishoermann/zod-prisma-types?style=for-the-badge)](https://github.com/chrishoermann/zod-prisma-types/graphs/contributors)
[![License](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)](https://github.com/chrishoermann/zod-prisma-types/blob/master/LICENSE)
[![Issues](https://img.shields.io/github/issues/chrishoermann/zod-prisma-types?style=for-the-badge)](https://github.com/chrishoermann/zod-prisma-types/issues)

# zod-prisma-types

`zod-prisma-types` is a generator for [prisma](www.prisma.io) that generates [zod](https://github.com/colinhacks/zod) schemas from your prisma models. This includes schemas of models, enums, inputTypes, argTypes, filters and so on. It also provides options to write advanced zod validators directly in the prisma schema comments.

[!["Buy Me A Coffee"](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/chrishoermann)

## Table of contents

- [About this project](#about-this-project)
  - [Why zod?](#why-zod)
  - [Why not multiple files?](#why-not-multiple-files)
  - [IDE performance problems](#ide-performance-problems)
- [Installation](#installation)
- [Usage](#usage)
  - [`output`](#output)
  - [`useInstanceOfForDecimal`](#useinstanceoffordecimal)
  - [`createInputTypes`](#createinputtypes)
  - [`createModelTypes`](#createmodeltypes)
  - [`addInputTypeValidation`](#addinputtypevalidation)
  - [`useDefaultValidators`](#usedefaultvalidators)
  - [`createOptionalDefaultValuesTypes`](#createoptionaldefaultvaluestypes)
  - [`imports`](#imports)
  - [`tsConfigFilePath`](#tsconfigfilepath)
- [Json null values](#json-null-values)
- [Decimal](#handling-of-decimal)
- [Skip schema generation](#skip-schema-generation)
- [Field validators](#field-validators)
  - [Custom type error messages](#custom-type-error-messages)
  - [String validators](#string-validators)
  - [Number validators](#number-validators)
  - [BigInt validators](#bigint-validators)
  - [Date validators](#date-validators)
  - [Custom validators](#custom-validators)
  - [Omit fields](#omit-fields)
  - [Validation errors](#validation-errors)
- [Naming of zod schemas](#naming-of-zod-schemas)
- [Adding comments](#adding-comments)

## About this project

For one of my projects I was in need of a generator that combines the possibility of adding `zod valdiators` directly in `prisma schema's` [rich-comments](https://www.prisma.io/docs/concepts/components/prisma-schema#comments) with the generation of `zod` schemas for all the prisma models, enums, inputTypes, argTypes, filters and so on. I also wanted to import these schemas for validation use in the frontend (e.g. form validation). Furthermore I wanted to make the generator as flexible as possbile so it covers a large range of use cases. I looked around and found a few packages that generate `zod` schemas from prisma models but none of them met my requirements or they weren't activly maintained anymore. So I decided to write `zod-prisma-type`.

### Why zod?

I decided to use `zod` because it is a very powerful and flexible library that allows you to write complex validators in a simple way and it is I to my knowledge the only validation library that really parses the data that comes in and does not simply validate (please correct me if I'm wrong). It also was the first library I stumbled upon when I started to use [trpc](https://trpc.io/docs/) so I went with it.

### Why not multiple files?

By design the generator only creates a single `index.ts` file in the specified output folder that contains all the `zod`schemas. I decided against a multiple file approach because it makes the handling of custom imports much easier and from a code prespective the generator itself is simpler (no imports from related models, enums, inputTypes and so on need to be handled, no index files need to be created, ...). Also in [`ts-morph`](https://ts-morph.com/manipulation/performance) it is more efficient to write a bunch of statements to a single file at once than creating multiple files where only a few statements are added. This can be beneficial for generating zod schemas for big prisma schemas.

### IDE performance problems

Some people reported that IDE performance is very slow after running the generator. If you encounter similar issues please check out [this issue](https://github.com/chrishoermann/zod-prisma-types/issues/48) and comment if you have any insights.

## Installation

via npm:

```bash
npm install zod-prisma-types
```

via yarn:

```bash
yarn add zod-prisma-types
```

via pnpm:

```bash
pnpm add zod-prisma-types
```

## Usage

> Supports prisma 4.x

Just add the following code to your `prisma.schema` file to create a single `index.ts` file in the `./generated/zod` output folder containing all the zod prisma schemas.

```prisma
generator zod {
  provider       = "zod-prisma-types"
}
```

If you want to customize the behaviour of the generator you can use the following options:

```prisma
generator zod {
  provider                         = "zod-prisma-types"
  output                           = "./zod" // default is ./generated/zod
  useInstanceOfForDecimal          = true // default is false
  createInputTypes                 = false // default is true
  createModelTypes                 = false // default is true
  addInputTypeValidation           = false // default is true
  useDefaultValidators             = false // default is true
  createOptionalDefaultValuesTypes = true // default is false
  imports                          = "import(import { myFunction } from '../../utils/myFunction';).import(import validator from 'validator';)" // optional
  tsConfigFilePath                 = "tsconfig.json" // optional
}
```

> As mentioned above this generator only creates a single `index.ts` file in the specified output folder containing all the zod prisma schemas. I decided to only create a single file because in [`ts-morph`](https://ts-morph.com/manipulation/performance) it is more efficient to write a bunch of statements to a single file at once than creating multiple files where only a few statements are added. This can be beneficial for generating zod schemas for big prisma schemas. Another point is that it makes the codebase of the generator more managable (...no need to create imports, simpler structure of the files) and it's easier to use custom imports (see below).

### `output`

> default: `./generated/zod`

Provide an alternative output path.

### `useInstanceOfForDecimal`

> default: `false`

In Prisma `Decimal` fields are represented by the [decimal.js](https://mikemcl.github.io/decimal.js/) library as stated in the [prisma docs](https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields#working-with-decimal). By default the `Prisma.Decimal` type is used to validate `Decimal` fields by using the built in typeguard `isDecimal(value)` with a custom transform to check if the field value is a `Decimal`.

```prisma
model MyModel {
  id         Int      @id @default(autoincrement())
  decimal    Decimal
  decimalOpt Decimal?
}
```

By default The above model would generate the following output:

```ts
export const MyModel = z.object({
  id: z.number().int(),
  decimal: z
    .any()
    .transform((v) =>
      isValidDecimalInput(v) ? new PrismaClient.Prisma.Decimal(v) : v,
    )
    .refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), {
      message: 'Field "decimal" must be a Decimal',
      path: ['Models', 'DecimalModel'],
    }),
  decimalOpt: z
    .any()
    .transform((v) =>
      isValidDecimalInput(v) ? new PrismaClient.Prisma.Decimal(v) : v,
    )
    .refine((v) => PrismaClient.Prisma.Decimal.isDecimal(v), {
      message: 'Field "decimalOpt" must be a Decimal',
      path: ['Models', 'DecimalModel'],
    })
    .nullish(),
});
```

If you want to validate `Decimal` with `z.instanceof(PrismaClient.Prisma.Decimal)` you can pass the following config option:

```prisma
generator zod {
  // ...rest of config
  useInstanceOfForDecimal = true
}
```

The generated output would look like this:

```ts
export const MyModel = z.object({
  id: z.number(),
  decimal: z.instanceof(PrismaClient.Prisma.Decimal),
  decimalOpt: z.instanceof(PrismaClient.Prisma.Decimal).nullable(),
});
```

### `createInputTypes`

> default: `true`

If you just want to create zod schemas for your models and enums you can disable the creation of the corresponding input types. This may be useful if you just want to use the zod schemas of your models for validating input types in `react-hook-form` or some similar use cases.

```prisma
generator zod {
  // ...rest of config
  createInputTypes = false
}
```

### `createModelTypes`

> default: `true`

If you just want to create zod schemas for your input types you can disable the creation of the corresponding model schemas. This may be useful if you just want to use the zod input schemas for autocompletion in your trpc queries or similar use cases.

```prisma
generator zod {
  // ...rest of config
  createModelTypes = false
}
```

### `addInputTypeValidation`

> default: `true`

If you don't want to use your custom validation logic on your input types like `UserCreateInput`, `UserUpdateManyInput` and so on you can disable this feature.

```prisma
generator zod {
  // ...rest of config
  addInputTypeValidation = false
}
```

### `createOptionalDefaultValuesTypes`

> default: `false`

If you need an additional model schema where fields with default values are marked as `.optional()` you can pass the following config option:

```prisma
generator zod {
  // ...rest of config
  createOptionalDefaultValuesTypes = true
}

model ModelWithDefaultValues {
  id          Int      @id @default(autoincrement())
  string      String   @default("default")
  otherString String
  int         Int      @default(1)
  otherInt    Int
  float       Float    @default(1.1)
  otherFloat  Float
  boolean     Boolean  @default(true)
  otherBool   Boolean
  date        DateTime @default(now())
  otherDate   DateTime
}
```

The above model would generate the following model schemas:

```ts
export const ModelWithDefaultValuesSchema = z.object({
  id: z.number(),
  string: z.string(),
  otherString: z.string(),
  int: z.number(),
  otherInt: z.number(),
  float: z.number(),
  otherFloat: z.number(),
  boolean: z.boolean(),
  otherBool: z.boolean(),
  date: z.date(),
  otherDate: z.date(),
});

export const ModelWithDefaultValuesOptionalDefaultsSchema =
  ModelWithDefaultValuesSchema.merge(
    z.object({
      id: z.number().optional(),
      string: z.string().optional(),
      int: z.number().optional(),
      float: z.number().optional(),
      boolean: z.boolean().optional(),
      date: z.date().optional(),
    }),
  );
```

### `useDefaultValidators`

> default: `true`

The generator adds default validators in certain use cases:

```prisma
model WithDefaultValidators {
  id      String @id @default(cuid())
  idTwo   String @default(uuid())
  integer Int
}
```

```ts
export const WithDefaultValidatorsSchema = z.object({
  id: z.string().cuid(),
  idTwo: z.string().uuid(),
  integer: z.number().int(),
});
```

These defaults are overwritten when using a custom validator (see: [Field Validators](#field-validators))
or when you opt out of using a default validator on a specific field:

```prisma
model WithDefaultValidators {
  id      String @id @default(cuid()) /// @zod.string.noDefault()
  idTwo   String @default(uuid()) /// @zod.string.noDefault()
  integer Int    /// @zod.number.noDefault()
}
```

```ts
export const WithDefaultValidatorsSchema = z.object({
  id: z.string(),
  idTwo: z.string(),
  integer: z.number(),
});
```

You can opt out of this feature completly by passing false to the config option.

```prisma
generator zod {
  // ...rest of config
  useDefaultValidators = false
}
```

> If you have some further ideas for default validators feel free to open an issue.

### `imports`

You can specify custom imports that are then added to the `index.ts` file. Since prisma only lets us specify `string` options in the `prisma.schema` generator config the syntax of the imports is a bit clumsy:

```prisma
generator zod {
  // ...other config options
  imports        = "import(import { myFunction } from 'mypackage').import(import { custom } from './myfolder')"
}
```

> The function-like syntax is used to easily split the string into an array and remove the unnecessary stuff. To add multiple imports just chain the commands.

```prisma
generator zod {
  provider = "zod-prisma-types"
  imports  = "import(import { myFunction } from '../../myFunction';)" // optional
}

model MyModel {
  id     Int     @id @default(autoincrement())
  /// @zod.custom.use(z.string().refine((val) => myFunction(val), { message: 'Is not valid' }))
  custom String?
}
```

The above schema would add the following imports to the file:

```ts
// ...standard imports

// your custom imports
import { myFunction } from '../../myFunction';

// imports are used in your custom validator
export const MyModelSchema = z.object({
  id: z.number(),
  custom: z
    .string()
    .refine((val) => myFunction(val), { message: 'Is not valid' })
    .nullish(),
});
```

### `tsConfigFilePath`

If your `tsconfig.json` file resides in another folder than your root (where the `node_modules` folder is located) you can specify a custom path. This path is then consumed by the generator and passed on to the `ts-morph` `Project` instance that is used to create the file. Usually you don't have to provide this option because it defaults in ts-morph to the base directory.

> Don't add `./` or `/` at the beginning of the path!

```prisma
generator zod {
  // ...rest of config
  tsConfigFilePath = "config/tsconfig.json"
}
```

## Json null values

When using json null values prisma has a unique way of handling Database `NULL` and JSON `null` as stated [in the Docs](https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#using-null-values).

To adhere to this concept you can pass `"DbNull"` or `"JsonNull"` as string to a nullable Json field. When the schema gets validated these strings are transformed to `Prisma.DbNull` or `Prisma.JsonNull` to satisfy the `prisma.[myModel].create() | .update() | ...` functions.

## Decimal

When using Decimal a `transform` and a `refine` method are used to validate the input in a way that the prisma input union `string | number | Decimal | DecimalJsLike` can be used via the generated schema. If you provide a decimal as `string` it is checked against a basic regex that matches the syntax shown in the [decimal.js docs](https://mikemcl.github.io/decimal.js/#decimal) to see if it is a valid decimal value.

```prisma
model MyModel {
  id      Int     @id @default(autoincrement())
  decimal Decimal
}
```

The above model would generate the following schema:

```ts
// DECIMAL HELPERS
//------------------------------------------------------

export interface DecimalJsLike {
  d: number[];
  e: number;
  s: number;
}

export const DECIMAL_STRING_REGEX = /^[0-9.,e+-bxffo_cp]+$|Infinity|NaN/;

export const DecimalJSLikeSchema = z.object({
  d: z.array(z.number()),
  e: z.number(),
  s: z.number(),
});

export const isValidDecimalInput = (
  v: string | number | PrismaClient.Prisma.Decimal | DecimalJsLike,
): v is number | string =>
  typeof v === 'number' ||
  (typeof v === 'string' && DECIMAL_STRING_REGEX.test(v));

export const isValidDecimalListInput = (
  v: string[] | number[] | PrismaClient.Prisma.Decimal[] | DecimalJsLike[],
): v is number[] | string[] =>
  (v as number[]).every((v) => typeof v === 'number') ||
  (v as string[]).every(
    (v) => typeof v === 'string' && DECIMAL_STRING_REGEX.test(v),
  );

export const isDecimalJsLike = (v: unknown): v is DecimalJsLike =>
  !!v && typeof v === 'object' && 'd' in v && 'e' in v && 's' in v;

// SCHEMA
//------------------------------------------------------

export const MyModelSchema = z.object({
  id: z.number(),
  decimal: z
    .union([
      z.number(),
      z.string(),
      z.instanceof(PrismaClient.Prisma.Decimal),
      DecimalJSLikeSchema,
    ])
    .transform((v) =>
      isValidDecimalInput(v) ? new PrismaClient.Prisma.Decimal(v) : v,
    )
    .refine(
      (v) => PrismaClient.Prisma.Decimal.isDecimal(v) || isDecimalJsLike(v),
      {
        message: 'Field "decimal" must be a Decimal',
        path: ['Models', 'DecimalModel'],
      },
    ),
});
```

## Skip schema generation

You can skip schema generation based on e.g. the environment you are currently working. For example you can only generate the schemas when you're in `development` but not when you run generation in `production` (because in `production` the schemas would already hav been created and pushed to the server via source code of git repo).

Since Prisma only lets us define `strings` in the generator config we cannot use the `env(MY_ENV_VARIABLE)` method that is used when e.g. the `url` under `datasource db` is loaded:

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

To still be able to load environment variables into the generator, just create a `zodGenConfig.js` in your root directory (where the `node_modules` folder is located) and add the following code:

```ts
module.exports = {
  skipGenerator: process.env['SKIP_ZOD_PRISMA'],
};
```

Then add

```js
SKIP_ZOD_PRISMA = 'true';
```

or

```js
SKIP_ZOD_PRISMA = 'false';
```

to your respective `.env` file. This will load the `SKIP_ZOD_PRISMA` environment variable on the `skipGenerator` prop that will then be consumed by the generator.

> You can choose to name your environment variable whatever you want - just make shure to load the right variable in `zodGenConfig.js`.

## Field validators

It is possible to add zod validators in the comments of the `prisma.schema` file with the following syntax (use [rich-comments](https://www.prisma.io/docs/concepts/components/prisma-schema#comments) `///` instead of `//`).

```prisma
myField [prisma-scalar-type] /// @zod.[zod-type + optional[(zod-error-messages)]].[zod validators for scalar-type]
```

This may look a bit cryptc so here is an example:

```prisma
generator zod {
  provider       = "zod-prisma-types"
  output         = "./zod"
  imports        = "import(import { myFunction } from 'mypackage')"
}

model MyPrismaScalarsType {
  /// @zod.string({ invalid_type_error: "some error with special chars: some + -*#'substring[]*#!§$%&/{}[]", required_error: "some other", description: "some description" }).cuid()
  id         String    @id @default(cuid())
  /// Some comment about string @zod.string.min(3, { message: "min error" }).max(10, { message: "max error" })
  string     String?
  /// @zod.custom.use(z.string().refine((val) => validator.isBIC(val), { message: 'BIC is not valid' }))
  bic        String?
  /// @zod.number.lt(10, { message: "lt error" }).gt(5, { message: "gt error" })
  float      Float
  floatOpt   Float?
  /// @zod.number.int({ message: "error" }).gt(5, { message: "gt error" })
  int        Int
  intOpt     Int?
  decimal    Decimal
  decimalOpt Decimal?
  date       DateTime  @default(now())
  dateOpt    DateTime? /// @zod.date({ invalid_type_error: "wrong date type" })  bigInt     BigInt /// @zod.bigint({ invalid_type_error: "error" })
  bigIntOpt  BigInt?
  /// @zod.custom.use(z.lazy(() => InputJsonValue).refine((val) => myFunction(val), { message: 'Is not valid' }))
  json       Json
  jsonOpt    Json?
  bytes      Bytes /// @zod.custom.use(z.instanceof(Buffer).refine((val) => val ? true : false, { message: 'Value is not valid' }))
  bytesOpt   Bytes?
  /// @zod.custom.use(z.string().refine((val) => myFunction(val), { message: 'Is not valid' }))
  custom     String?
  exclude    String? /// @zod.custom.omit(["model", "input"])

  updatedAt DateTime @updatedAt
}
```

This example generates the following zod schema for the model in `prisma/zod/index.ts`:

```ts
import { z } from 'zod';
import * as PrismaClient from '@prisma/client';
import validator from 'validator';
import { myFunction } from 'mypackage';

export const MyPrismaScalarsTypeSchema = z.object({
  id: z
    .string({
      invalid_type_error:
        "some error with special chars: some + -*#'substring[]*#!§$%&/{}[]",
      required_error: 'some other',
      description: 'some description',
    })
    .cuid(),
  /**
   * Some comment about string
   */
  string: z
    .string()
    .min(3, { message: 'min error' })
    .max(10, { message: 'max error' })
    .nullish(),
  bic: z
    .string()
    .refine((val) => validator.isBIC(val), { message: 'BIC is not valid' })
    .nullish(),
  float: z
    .number()
    .lt(10, { message: 'lt error' })
    .gt(5, { message: 'gt error' }),
  floatOpt: z.number().nullish(),
  int: z.number().int({ message: 'error' }).gt(5, { message: 'gt error' }),
  intOpt: z.number().int().nullish(),
  decimal: z
    .union([
      z.number(),
      z.string(),
      z.instanceof(PrismaClient.Prisma.Decimal),
      DecimalJSLikeSchema,
    ])
    .transform((v) =>
      isValidDecimalInput(v) ? new PrismaClient.Prisma.Decimal(v) : v,
    )
    .refine(
      (v) => PrismaClient.Prisma.Decimal.isDecimal(v) || isDecimalJsLike(v),
      {
        message: 'Field "decimal" must be a Decimal',
        path: ['Models', 'MyPrismaScalarsType'],
      },
    ),
  decimalOpt: z
    .union([
      z.number(),
      z.string(),
      z.instanceof(PrismaClient.Prisma.Decimal),
      DecimalJSLikeSchema,
    ])
    .transform((v) =>
      isValidDecimalInput(v) ? new PrismaClient.Prisma.Decimal(v) : v,
    )
    .refine(
      (v) => PrismaClient.Prisma.Decimal.isDecimal(v) || isDecimalJsLike(v),
      {
        message: 'Field "decimalOpt" must be a Decimal',
        path: ['Models', 'MyPrismaScalarsType'],
      },
    )
    .nullish(),
  date: z.date(),
  dateOpt: z.date({ invalid_type_error: 'wrong date type' }).nullish(),
  bigIntOpt: z.bigint().nullish(),
  json: z
    .lazy(() => InputJsonValue)
    .refine((val) => myFunction(val), { message: 'Is not valid' }),
  jsonOpt: NullableJsonValue.optional(),
  bytes: z
    .instanceof(Buffer)
    .refine((val) => (val ? true : false), { message: 'Value is not valid' }),
  bytesOpt: z.instanceof(Buffer).nullish(),
  custom: z
    .string()
    .refine((val) => myFunction(val), { message: 'Is not valid' })
    .nullish(),
  // omitted: exclude: z.string().nullish(),
  updatedAt: z.date(),
});

export const MyPrismaScalarsTypeOptionalDefaultsSchema =
  MyPrismaScalarsTypeSchema.merge(
    z.object({
      id: z
        .string({
          invalid_type_error:
            "some error with special chars: some + -*#'substring[]*#!§$%&/{}[]",
          required_error: 'some other',
          description: 'some description',
        })
        .cuid()
        .optional(),
      date: z.date().optional(),
      updatedAt: z.date().optional(),
    }),
  );
```

> Additionally all the zod schemas for the prisma input-, enum-, filter-, orderby-, select-, include and other necessary types are generated ready to be used in e.g. `trpc` inputs.

## Custom type error messages

To add custom zod-type error messages to your validator you can add them via `@zod.[key]({ ...customTypeErrorMessages }).[validator key]`. The custom error messages must adhere to the following type:

```ts
type RawCreateParams =
  | {
      invalid_type_error?: string;
      required_error?: string;
      description?: string;
    }
  | undefined;
```

For example:

```prisma
model MyModel {
  myField String /// @zod.string({ invalid_type_error: "invalid type error", required_error: "is required", description: "describe the error" })
}
```

This would result in an output like:

```ts
 string: z.string({
    invalid_type_error: 'invalid type error',
    required_error: 'is required',
    description: 'describe the error',
  }),
```

If you use a wrong key or have a typo the generator would throw an error:

```prisma
model MyModel {
  myField String  /// @zod.string({ required_error: "error", invalid_type_errrrrror: "error"})
}
```

```bash
[@zod generator error]: Custom error key 'invalid_type_errrrrror' is not valid. Please check for typos! [Error Location]: Model: 'Test', Field: 'myField'.
```

## String validators

To add custom validators to the prisma `String` field you can use the `@zod.string` key. On this key you can use all string-specific validators that are mentioned in the [`zod-docs`](https://github.com/colinhacks/zod#strings). You can also add a custom error message to each validator as stated in the docs.

```prisma
model MyModel {
  myField String /// @zod.string.min(3, { message: "min error" }).max(10, { message: "max error" }).[...chain more validators]
}
```

## Number validators

To add custom validators to the prisma `Int` or `Float` field you can use the `@zod.number` key. On this key you can use all number-specific validators that are mentioned in the [`zod-docs`](https://github.com/colinhacks/zod#numbers). You can also add a custom error message to each validator as stated in the docs.

```prisma
model MyModel {
  myField Int
/// @zod.number.lt(10, { message: "lt error" }).gt(5, { message: "gt error" }).[...chain more validators]
}
```

## BigInt validators

To add custom validators to the prisma `BigInt` field you can use the `@zod.bigint` key. Due to the fact that there are no custom validators provided by `zod` on `z.bigint()` you can only add customized type errors to the field.

```prisma
model MyModel {
  myField BigInt /// @zod.bigint({ invalid_type_error: "error", ... })
}
```

## Date validators

To add custom validators to the prisma `DateTime` field you can use the `@zod.date` key. On this key you can use all date-specific validators that are mentioned in the [`zod-docs`](https://github.com/colinhacks/zod#dates). You can also add a custom error message to each validator as stated in the docs.

```prisma
model MyModel {
  myField DateTime ///  @zod.date.min(new Date('2020-01-01')).max(new Date('2020-12-31'))
}
```

## Custom validators

To add custom validators to any [`Prisma Scalar`](https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference#model-field-scalar-types) field you can use the `@zod.custom.use()` key. This key has only the `.use(...your custom code here)` validator. This code overwrites all other standard implementations so you have to exactly specify the `zod type` how it should be written by the generator. Only `.optional()` and `.nullable()` are added automatically based on your prisma schema type definition. This field is inteded to provide validators like zod `.refine` or `.transform` on your fields.

```prisma
model MyModel {
  id     Int     @id @default(autoincrement())
  custom String? /// @zod.custom.use(z.string().refine(val => validator.isBIC(val)).transform(val => val.toUpperCase()))
}
```

The above model schema would generate the following zod schema:

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

## Omit Fields

It is possible to omit fields in the generated zod schemas by using `@zod.custom.omit(["model", "input"])`. When passing both keys `"model"` and `"input"` the field is omitted in both, the generated model schema and the generated input types (see example below). If you just want to omit the field in one of the schemas just provide the matching key. You can also write the keys without `"` or `'`.

```prisma
model MyModel {
  id           Int     @id @default(autoincrement())
  string       String? /// @zod.string.min(4).max(10)
  omitField    String? /// @zod.custom.omit([model, input])
  omitRequired String /// @zod.custom.omit([model, input])
}
```

The above model would generate the following zod schemas (the omitted keys are left in the model but are commented out so you see at a glance which fields are omitted when looking on the zod schema):

```ts
// MODEL TYPES
// ---------------------------------------

export const MyModelSchema = z.object({
  id: z.number(),
  string: z.string().min(4).max(10).nullish(),
  // omitted: omitField: z.string().nullish(),
  // omitted: omitRequired: z.string(),
});

// INPUT TYPES
// ---------------------------------------

export const MyModelCreateInputSchema: z.ZodType<
  Omit<PrismaClient.Prisma.MyModelCreateInput, 'omitField' | 'omitRequired'>
> = z
  .object({
    string: z.string().min(4).max(10).optional().nullable(),
    // omitted: omitField: z.string().optional().nullable(),
    // omitted: omitRequired: z.string(),
  })
  .strict();

export const MyModelUncheckedCreateInputSchema: z.ZodType<
  Omit<
    PrismaClient.Prisma.MyModelUncheckedCreateInput,
    'omitField' | 'omitRequired'
  >
> = z
  .object({
    id: z.number().optional(),
    string: z.string().min(4).max(10).optional().nullable(),
    // omitted: omitField: z.string().optional().nullable(),
    // omitted: omitRequired: z.string(),
  })
  .strict();

export const MyModelUpdateInputSchema: z.ZodType<
  Omit<PrismaClient.Prisma.MyModelUpdateInput, 'omitField' | 'omitRequired'>
> = z
  .object({
    string: z
      .union([
        z.string().min(4).max(10),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    // omitted: omitField: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
    // omitted: omitRequired: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  })
  .strict();

// AND SO ON...

// ARG TYPES
// ---------------------------------------

// To be compatible with the inputTypes the type of the `ArgSchema` is updated accordingly
export const MyModelCreateArgsSchema: z.ZodType<
  Omit<PrismaClient.Prisma.MyModelCreateArgs, 'data'> & {
    data:
      | z.infer<typeof MyModelCreateInputSchema>
      | z.infer<typeof MyModelUncheckedCreateInputSchema>;
  }
> = z
  .object({
    select: MyModelSelectSchema.optional(),
    data: z.union([
      MyModelCreateInputSchema,
      MyModelUncheckedCreateInputSchema,
    ]),
  })
  .strict();
```

> When a `required` field is omitted the field needs to be added manually in the respective prisma function like `create`, `update`, `createMany` and so on. Otherwise Typescript would complain.

```ts
const appRouter = t.router({
  createMyModel: t.procedure
    .input(MyModelCreateArgsSchema) // field `omitRequired` is not included in `data`
    .query(({ input }) => {
      return prisma.myModel.create({
        ...input,
        data: {
          ...input.data,
          omitRequired: 'foo', // field needs to be added manually
        },
      });
    }),
});
```

## Validation errors

To ease the developer experience the generator checks if the provided `@zod.[key]` can be used on the respective type of the model field. It also checks if the `@zod.[key].[validator]` can be used on the specified `@zod.[key]`

### `Wrong zod type`

The generator throws an error if you use a validator key like `@zod.string` on the wrong prisma type.

```prisma
model MyModel {
  string String /// @zod.string.min(3) -> valid - `string` can be used on `String`
  number Number /// @zod.string.min(3) -> invalid - `string` can not be used on `Number`
}
```

For the above example the Error message would look like this:

```bash
[@zod generator error]: Validator 'string' is not valid for type 'Int'. [Error Location]: Model: 'MyModel', Field: 'number'
```

The generator provides the exact location, what went wrong and where the error happend. In big prisma schemas with hundreds of models and hundreds of custom validation strings this can come in handy.

### `Wrong validator`

The generator throws an error if you use a validator `.min` on the wrong validator key.

```prisma
model MyModel {
  number Int /// @zod.number.min(3) -> invalid - `min` can not be used on `number`
}
```

The above example would throw the following error:

```bash
[@zod generator error]: Validator 'min' is not valid for type 'Int'. [Error Location]: Model: 'MyModel', Field: 'number'.
```

### `Typo Errors`

If you have typos in your validator strings like

```prisma
model MyModel {
  string String /// @zod.string.min(3, { mussage: 'Must be at least 3 characters' })
}
```

that the generator would throw the following error:

```bash
[@zod generator error]: Could not match validator 'min' with validatorPattern
'.min(3, { mussage: 'Must be at least 3 characters' })'. Please check for typos! [Error Location]: Model: 'MyModel', Field: 'string'.
```

## Naming of zod schemas

The zod types are named after the generated prisma types with an appended `"Schema"` string. You just need to hover over a prisma function and you know which type to import. This would look something like this for trpc v.10:

```ts
import {
  UserFindFirstArgsSchema,
  UserFindManyArgsSchema,
  UserFindUniqueArgsSchema,
} from './prisma/zod';

const appRouter = t.router({
  findManyUser: t.procedure.input(UserFindManyArgsSchema).query(({ input }) => {
    return prisma.user.findMany(input);
  }),
  findUniqueUser: t.procedure
    .input(UserFindUniqueArgsSchema)
    .query(({ input }) => {
      return prisma.user.findUnique(input);
    }),

  findFirstUser: t.procedure
    .input(UserFindFirstArgsSchema)
    .query(({ input }) => {
      return prisma.user.findFirst(input);
    }),
});
```

## Adding comments

You can add [rich-comments](https://www.prisma.io/docs/concepts/components/prisma-schema#comments) to your models and fields that are then printed as jsDoc in your generated zod schema.

```prisma
/// comment line one
/// comment line two
model MyModel {
  id     Int     @id @default(autoincrement())
  /// comment before validator @zod.string.min(4).max(10)
  /// comment after validator
  string String?
}
```

The above model would generate the following output where the validator is extracted from the rich-comments and added to the string field:

```ts
/**
 * comment line one
 * comment line two
 */
export const MyModelSchema = z.object({
  id: z.number(),
  /**
   * comment before validator
   * comment after validator
   */
  string: z.string().min(4).max(10).nullish(),
});
```

The validator is extracted from the comments and added to the string
