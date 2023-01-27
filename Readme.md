[![NPM version](https://img.shields.io/npm/v/zod-prisma-types?style=for-the-badge)](https://www.npmjs.com/package/zod-prisma-types)
[![Stars](https://img.shields.io/github/stars/chrishoermann/zod-prisma-types?style=for-the-badge)](https://github.com/chrishoermann/zod-prisma-types/stargazers)
[![Contirbutors](https://img.shields.io/github/contributors/chrishoermann/zod-prisma-types?style=for-the-badge)](https://github.com/chrishoermann/zod-prisma-types/graphs/contributors)
[![License](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)](https://github.com/chrishoermann/zod-prisma-types/blob/master/LICENSE)
[![Issues](https://img.shields.io/github/issues/chrishoermann/zod-prisma-types?style=for-the-badge)](https://github.com/chrishoermann/zod-prisma-types/issues)

# zod-prisma-types

`zod-prisma-types` is a generator for [prisma](www.prisma.io) that generates [zod](https://github.com/colinhacks/zod) schemas from your prisma models. This includes schemas of models, enums, inputTypes, argTypes, filters and so on. It also provides options to write advanced zod validators directly in the prisma schema comments.

Since I'm maintaining the generator in my spare time consider buying me a coffee if you like the project. Thanks!

[!["Buy Me A Coffee"](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/chrishoermann)

## Breaking changes in v2.x.x

Be aware that a few generator options have been removed and the behaviour of custom imports has changed in v2.0.0.

## Table of contents

- [About this project](#about-this-project)
- [Installation](#installation)
- [Usage](#usage)
  - [`output`](#output)
  - [`useMultipleFiles`](#usemultiplefiles)
  - [`createInputTypes`](#createinputtypes)
  - [`createModelTypes`](#createmodeltypes)
  - [`addInputTypeValidation`](#addinputtypevalidation)
  - [`createOptionalDefaultValuesTypes`](#createoptionaldefaultvaluestypes)
  - [`createRelationValuesTypes`](#createrelationvaluestypes)
  - [`useDefaultValidators`](#usedefaultvalidators)
  - [`coerceDate`](#coercedate)
  - [`prismaClientPath`](#prismaclientpath)
- [Skip schema generation](#skip-schema-generation)
- [Custom Enums](#custom-enums)
- [Json null values](#json-null-values)
- [Decimal](#decimal)
- [Field validators](#field-validators)
  - [Custom imports](#custom-imports)
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
- [Migration from `zod-prisma`](#migration-from-zod-prisma)
  - [Generator options](#generator-options)
  - [Extending zod fields](#extending-zod-fields)
  - [Importing helpers](#importing-helpers)

## About this project

For one of my projects I was in need of a generator that has the possibility of adding `zod valdiators` directly in `prisma schema's` [rich-comments](https://www.prisma.io/docs/concepts/components/prisma-schema#comments) and generates `zod` schemas for all prisma models, enums, inputTypes, argTypes, filters and so on. I also wanted to be able to import these schemas in the frontend e.g. for form validation and make the generator as flexible as possbile so it covers a large range of use cases. Since there where no generators out there that my requirements or they weren't activly maintained anymore I decided to write `zod-prisma-type`.

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
  provider                         = "ts-node-dev ../generator/src/bin.ts"
  output                           = "./generated/zod" // default is ./generated/zod
  useMultipleFiles                 = true // default is false
  createInputTypes                 = false // default is true
  createModelTypes                 = false // default is true
  addInputTypeValidation           = false // default is true
  createOptionalDefaultValuesTypes = true // default is false
  createRelationValuesType         = true // default is false
  useDefaultValidators             = false // default is true
  coerceDate                       = false // default is true
  prismaClientPath                 = "./path/to/prisma/client" // default is client output path
}
```

### `useMultipleFiles`

> default: `true`

If you want to create multiple files instead of a single `index.ts` file you can set this option to `true`. This will create a file for each model, enum, inputType, argType, filter and so on. The files will be created in the specified output folder.

```prisma
generator zod {
  // ...rest of config
  useMultipleFiles = false
}
```

### `output`

> default: `./generated/zod`

Provide an alternative output path.

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

### `createRelationValuesTypes`

> default: `false`

If you pass the following config option the generator will create a separate model type that includes all the relation fields. Due do the type annotation, that is needed to have recursive types, this model has some limitations since `z.ZodType<myType>` does not allow some object methods like `.merge()` or `.omit()`.

```prisma
generator zod {
  // ...rest of config
  createRelationValuesTypes = true
}

model User {
  id         String      @id @default(cuid())
  email      String      @unique
  name       String?
  posts      Post[]
  profile    Profile?
  role       Role[]      @default([USER, ADMIN])
  enum       AnotherEnum @default(ONE)
  scalarList String[]

  lat Float
  lng Float

  location Location? @relation(fields: [lat, lng], references: [lat, lng])
}
```

The above model would generate the following model schemas:

```ts
export const UserSchema = z.object({
  role: RoleSchema.array(),
  enum: AnotherEnumSchema,
  id: z.string().cuid(),
  email: z.string(),
  name: z.string(),
  scalarList: z.string().array(),
  lat: z.number(),
  lng: z.number(),
});

export type UserWithRelations = z.infer<typeof UserSchema> & {
  posts: PostWithRelations[];
  profile?: ProfileWithRelations | null;
  location?: LocationWithRelations | null;
};

export const UserWithRelationsSchema: z.ZodType<UserWithRelations> =
  UserSchema.merge(
    z.object({
      posts: z.lazy(() => PostWithRelationsSchema).array(),
      profile: z.lazy(() => ProfileWithRelationsSchema).nullish(),
      location: z.lazy(() => LocationWithRelationsSchema).nullish(),
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

### `coerceDate`

> default: true

Per default `DateTime` values are coerced to `Date` objects as long as you pass in a valid ISO string or an instance of Date. You can change this behavior to generate a simple `z.date()` by passing the following option to the generator config:

```prisma
generator zod {
  // ...rest of config
  coerceDate = false
}
```

### `prismaClientPath`

> default: `infereed from prisma schema`

By default the prisma client path is taken from the `output` path provided in the `prisma.schema` file under `generator client`. If you still need to use a custom path you can pass it to the generator config via this option. A custom path takes precedence over the prisma client output path.

```prisma
generator zod {
  // ...rest of config
  prismaClientPath = "./path/to/prisma/client"
}
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

## Custom Enums

For custom enums a separate type is generated that represents the enum values as a union. Since in typescript unions are more useful than enums this can come in handy.

```prisma
enum MyEnum {
  A
  B
  C
}
```

This will generate the following output:

```ts
export const MyEnumSchema = z.nativeEnum(PrismaClient.MyEnum);

export type MyEnumType = `${z.infer<typeof MyEnumSchema>}`; // union of "A" | "B" | "C"
```

## Json null values

When using json null values prisma has a unique way of handling Database `NULL` and JSON `null` as stated [in the Docs](https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#using-null-values).

To adhere to this concept you can pass `"DbNull"` or `"JsonNull"` as string to a nullable Json field. When the schema gets validated these strings are transformed to `Prisma.DbNull` or `Prisma.JsonNull` to satisfy the `prisma.[myModel].create() | .update() | ...` functions.

## Decimal

When using Decimal a `refine` method is used to validate if the input adheres to the prisma input union `string | number | Decimal | DecimalJsLike`.

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

export const DecimalJSLikeSchema = z.object({
  d: z.array(z.number()),
  e: z.number(),
  s: z.number(),
});

export const DECIMAL_STRING_REGEX = /^[0-9.,e+-bxffo_cp]+$|Infinity|NaN/;

export const isValidDecimalInput = (
  v?: null | string | number | PrismaClient.Prisma.Decimal | DecimalJsLike,
) => {
  if (!v) return false;
  return (
    (typeof v === 'object' && PrismaClient.Prisma.Decimal.isDecimal(v)) ||
    (typeof v === 'object' && 'd' in v && 'e' in v && 's' in v) ||
    (typeof v === 'string' && DECIMAL_STRING_REGEX.test(v)) ||
    typeof v === 'number'
  );
};

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
    .refine((v) => isValidDecimalInput(v), {
      message: 'Field "decimal" must be a Decimal',
      path: ['Models', 'DecimalModel'],
    }),
});
```

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
}

/// @zod.import(["import { myFunction } from 'mypackage';"])
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
  date: z.coerce.date(),
  dateOpt: z.coerce.date({ invalid_type_error: 'wrong date type' }).nullish(),
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

## Custom imports

To add custom imports to your validator you can add them via `@zod.custom.imports([...myCustom imports as strings])` in prismas rich comments of the model definition.

For example:

```prisma
/// @zod.custom.imports(["import { myFunction } from 'mypackage'"])
model MyModel {
  myField String /// @zod.string().refine((val) => myFunction(val), { message: 'Is not valid' })
}
```

This would result in an output like:

```ts
import { myFunction } from 'mypackage';

export const MyModelSchema = z.object({
  myField: z
    .string()
    .refine((val) => myFunction(val), { message: 'Is not valid' }),
});
```

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

## Migration from `zod-prisma`

There are a few differences between `zod-prisma` and `zod-prisma-types`.
The following sections should help you migrate from `zod-prisma` to `zod-prisma-types`.

### Generator options

The following generator options from `zod-prisma` are not supported or implemented differently by `zod-prisma-types`:

#### `relationModel`

You can generate a schema that contains all relations of a model by passing the following option to the generator:

```prisma
generator zod {
  // ... other options
  createRelationValuesTypes = true
}
```

See [`createRelationValuesTypes`](#createrelationvaluestypes) for more information.

#### `modelCase`

The casing of the model is fixed to the casing used in the `prisma schema` and can not be changed. This way model names with mixed casing like `MYModel` will work as expected when generating `inputTypes`, `enums`, `argTypes`, etc.

#### `modelSuffix`

The model suffix in `zod-prisma-types` is fixed to `Schema` and can not be changed.

#### `useDecimalJs`

`zod-prisma-types` does not support `decimal.js` but uses the decimal implementation provided by prisma to validate Decimal types. See [Decimal](#decimal) for more information.

#### `imports`

As of version `2.0.0` imports in `zod-prisma-types` are handled with rich-comments on the model definition. See [Custom imports](#custom-imports) for more information.

#### `prismaJsonNullability`

The nullablility in `zod-prisma-types` is handled differently. See [Json null values](#json-null-values) for more information.

### Extending zod fields

`zod-prisma` allows you to extend the zod fields with custom validators. This is also possible with `zod-prisma-types` and the `@zod.[key].[validator]` syntax. The different syntax is used to check if a validator can be used on a specific prisma type. See [Field validators](#field-validators) for more information.

```prisma

// zod-prisma
model MyModel {
  string String /// @zod.min(3) -> valid - `string` can be used on `String`
  number Number /// @zod.min(3) -> valid - throws error only at runtime
}

//zod-prisma-types
model MyModel {
  string String /// @zod.string.min(3) -> valid - `string` can be used on `String`
  number Number /// @zod.string.min(3) -> invalid - throws error during generation
}
```

### Importing helpers

You can import custom helpers in the generator. Please refer to the section about [custom imports](#custom-imports) for more information.
