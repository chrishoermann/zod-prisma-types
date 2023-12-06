[![NPM version](https://img.shields.io/npm/v/zod-prisma-types?style=for-the-badge)](https://www.npmjs.com/package/zod-prisma-types)
[![Stars](https://img.shields.io/github/stars/chrishoermann/zod-prisma-types?style=for-the-badge)](https://github.com/chrishoermann/zod-prisma-types/stargazers)
[![Contirbutors](https://img.shields.io/github/contributors/chrishoermann/zod-prisma-types?style=for-the-badge)](https://github.com/chrishoermann/zod-prisma-types/graphs/contributors)
[![License](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)](https://github.com/chrishoermann/zod-prisma-types/blob/master/LICENSE)
[![Issues](https://img.shields.io/github/issues/chrishoermann/zod-prisma-types?style=for-the-badge)](https://github.com/chrishoermann/zod-prisma-types/issues)

# zod-prisma-types <!-- omit from toc -->

`zod-prisma-types` is a generator for [prisma](www.prisma.io) that generates [zod](https://github.com/colinhacks/zod) schemas from your prisma models. This includes schemas of models, enums, inputTypes, argTypes, filters and so on. It also provides options to write advanced zod validators directly in the Prisma schema comments.

Since I'm maintaining the generator in my spare time consider buying me a coffee or sponsoring me if you like the project. Thanks!

[!["Buy Me A Coffee"](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/chrishoermann)

## Breaking changes in v2.x.x<!-- omit from toc -->

Be aware that some generator options have been removed, a few new ones have been added, the behavior of custom imports has changed and ts-morph is no longer needed to generate files in v2.0.0.

## Breaking changes in v3.x.x<!-- omit from toc -->

- If you have used decimal or Json values you might encounter changed behavior in v3.x.x. Please read the [decimal](#decimal) and [json](#json-null-values) sections for more information. If not you can safely upgrade to v3.x.x.
- Imports are now generally handled at field level except for model validators. This enables the generator to add the custom validation logic on input type level like `whereUnique` inputs. If you have used custom imports in v2.x.x you should change the syntax to the new one. Please read the [custom imports](#custom-imports) section for more information.
- `validateWhereUniqueInputs` is now `true` by default

## Known issues and Limitations<!-- omit from toc -->

> - Since `zod version 3.21.2` some schemas throw a typescript error. Please use `zod version 3.21.1` until this issue is resolved. Feel free to also add some weight to the [zod issue on github](https://github.com/colinhacks/zod/issues/2184). Since `zod-prisma-type version 3.1.0` you can also use `useTypeAssertions = true` in the generator config to override the type system. Use this option at your own risk. See [useTypeAssertions](#usetypeassertions) for more information.
> - Lowercase model names will result in Errors and duplicate schema names in the generated schemas. Please use uppercase model names and prismas `@@map()` directive when using lowercase table names in the datebase to avoid this issue.
> - The `satisfies` operator: As some people have pointed out the `input` and `output` schemas and some of the `relation` schemas are typed as `z.ZodType<myType>`. This is required by zod for recursice types to work properly as [stated in the docs](https://zod.dev/?id=recursive-types). This has the downside that some zod methods like `.merge()`, `.omit()`, etc. are not available on these types.

## Table of contents<!-- omit from toc -->

- [About this project](#about-this-project)
- [Installation](#installation)
- [`tsconfig.json`](#tsconfigjson)
- [Usage](#usage)
  - [`useMultipleFiles`](#usemultiplefiles)
  - [`output`](#output)
  - [`writeBarrelFiles`](#writebarrelfiles)
  - [`createInputTypes`](#createinputtypes)
  - [`createModelTypes`](#createmodeltypes)
  - [`addInputTypeValidation`](#addinputtypevalidation)
  - [`addIncludeType`](#addincludetype)
  - [`addSelectType`](#addselecttype)
  - [`validateWhereUniqueInput`](#validatewhereuniqueinput)
  - [`createOptionalDefaultValuesTypes`](#createoptionaldefaultvaluestypes)
  - [`createRelationValuesTypes`](#createrelationvaluestypes)
  - [`createPartialTypes`](#createpartialtypes)
  - [`useDefaultValidators`](#usedefaultvalidators)
  - [`coerceDate`](#coercedate)
  - [`writeNullishInModelTypes`](#writenullishinmodeltypes)
  - [`useTypeAssertions`](#usetypeassertions)
  - [`prismaClientPath`](#prismaclientpath)
- [Skip schema generation](#skip-schema-generation)
- [Custom Enums](#custom-enums)
- [Json null values](#json-null-values)
- [Decimal](#decimal)
- [Field validators](#field-validators)
- [Custom type error messages](#custom-type-error-messages)
- [String validators](#string-validators)
- [Number validators](#number-validators)
- [BigInt validators](#bigint-validators)
- [Date validators](#date-validators)
- [Custom validators](#custom-validators)
- [Array validators](#array-validators)
- [Omit Fields](#omit-fields)
- [Validation errors](#validation-errors)
  - [`Wrong zod type`](#wrong-zod-type)
  - [`Wrong validator`](#wrong-validator)
  - [`Typo Errors`](#typo-errors)
- [Model validators](#model-validators)
- [Custom imports](#custom-imports)
- [Custom model error messages](#custom-model-error-messages)
- [Custom model validators](#custom-model-validators)
- [Naming of zod schemas](#naming-of-zod-schemas)
- [Adding comments](#adding-comments)
- [Migration from `zod-prisma`](#migration-from-zod-prisma)
  - [Generator options](#generator-options)
    - [`relationModel`](#relationmodel)
    - [`modelCase`](#modelcase)
    - [`modelSuffix`](#modelsuffix)
    - [`useDecimalJs`](#usedecimaljs)
    - [`imports`](#imports)
    - [`prismaJsonNullability`](#prismajsonnullability)
  - [Extending zod fields](#extending-zod-fields)
  - [Importing helpers](#importing-helpers)

## About this project

For one of my projects I was in need of a generator that offers the possibility of adding `zod validators` directly in `prisma schema's` [rich-comments](https://www.prisma.io/docs/concepts/components/prisma-schema#comments) and generates `zod` schemas for all prisma models, enums, inputTypes, argTypes, filters and so on. I also wanted to be able to import these schemas in the frontend e.g. for form validation and make the generator as flexible as possible so it covers a large range of use cases. Since there were no generators out there that met my requirements or they weren't actively maintained anymore I decided to write `zod-prisma-type`.

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

## `tsconfig.json`

For the generator to work properly you have to set the following options in your `tsconfg.json`:

```json
strict: true,
strictNullChecks: true,
```

## Usage

> Supports prisma 4.x - 5.x

Just add the following code to your `prisma.schema` file to create a single `index.ts` file in the `./generated/zod` output folder containing all the zod prisma schemas.

```prisma
generator zod {
  provider       = "zod-prisma-types"
}
```

Then import the schema's into your file:

```ts
import { mySchema } from '/prisma/generated/zod'; // All schemas are here by default, use the 'output' option to change it
```

> If you encounter errors like the following `/bin/sh: zod-prisma-types: command not found` please try to use the `npx` command with the `zod-prisma-types` command.

```prisma
generator zod {
  provider       = "npx zod-prisma-types"
}
```

If you want to customize the behavior of the generator you can use the following options:

```prisma
generator zod {
  provider                         = "ts-node-dev ../generator/src/bin.ts"
  output                           = "./generated/zod" // default is ./generated/zod
  useMultipleFiles                 = true // default is false
  writeBarrelFiles                 = false // default is true
  createInputTypes                 = false // default is true
  createModelTypes                 = false // default is true
  addInputTypeValidation           = false // default is true
  addIncludeType                   = false // default is true
  addSelectType                    = false // default is true
  validateWhereUniqueInput         = false // default is true
  createOptionalDefaultValuesTypes = true // default is false
  createRelationValuesTypes        = true // default is false
  createPartialTypes               = true // default is false
  useDefaultValidators             = false // default is true
  coerceDate                       = false // default is true
  writeNullishInModelTypes         = true // default is false
  prismaClientPath                 = "./path/to/prisma/client" // default is client output path
}
```

### `useMultipleFiles`

> default: `false`

If you want to create multiple files instead of a single `index.ts` file you can set this option to `true`. This will create a file for each model, enum, inputType, argType, filter, etc. The files will be created in sub folders in the specified output folder and a barrel file will be added at the root of the output folder.

```prisma
generator zod {
  // ...rest of config
  useMultipleFiles = false
}
```

### `output`

> default: `./generated/zod`

Provide an alternative output path.

### `writeBarrelFiles`

> default: `true`

If you use `useMultipleFiles` and do not want to create a barrel file for each sub folder you can set this option to `false`. This will create an `index.ts` file in each sub folder that exports all the files in the folder. This option may be beneficial for typescript performance on big schemas.

```prisma
generator zod {
  // ...rest of config
  writeBarrelFiles = false
}
```

### `createInputTypes`

> default: `true`

If you just want to create zod schemas for your models and enums you can disable the creation of the corresponding input types. This may be useful if you just want to use zod schemas of your models for validating input types in `react-hook-form` or some similar use cases.

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

If you want to use your custom zod validators that you added via rich-comments only on your generated model schemas but not on your created input type schemas (`UserCreateInput`, `UserUpdateManyInput`, etc.) you can disable this feature.

```prisma
generator zod {
  // ...rest of config
  addInputTypeValidation = false
}
```

### `addIncludeType`

> default: `true`

By default the include type is added to the `[Model]ArgTypeSchema`. If you don't want to add a zod schema for the `include` type you can set this option to `false`.

```prisma
generator zod {
  // ...rest of config
  addIncludeType = false
}
```

### `addSelectType`

> default: `true`

By default the select type is added to the `[Model]ArgTypeSchema`. If you don't want to add a zod schema for the `select` type you can set this option to `false`.

```prisma
generator zod {
  // ...rest of config
  addSelectType = false
}
```

### `validateWhereUniqueInput`

> default: `false`

By default the generator will not validate the `whereUnique` input types in multifile mode since a bunch of unused imports will often be generated. If you want to validate the `whereUnique` input types you can set this option to `true`.

> Be aware that this can lead to eslint errors if you use the `no-unused-vars` rule which you need to resolve manually.

```prisma
generator zod {
  // ...rest of config
  validateWhereUniqueInput = true
}
```

### `createOptionalDefaultValuesTypes`

> default: `false`

If you want to have a schema of your model where fields with default values are marked as `.optional()` you can pass the following config option:

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

The above model would then generate the following model schemas:

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

If you need a separate model type that includes all the relation fields you can pass the following option. Due to the type annotation, that is needed to have recursive types, this model has some limitations since `z.ZodType<myType>` does not allow some object methods like `.merge()`, `.omit()`, etc.

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
  name: z.string().optional(),
  scalarList: z.string().array(),
  lat: z.number(),
  lng: z.number(),
});

export type UserRelations = {
  posts: PostWithRelations[];
  profile?: ProfileWithRelations | null;
  location?: LocationWithRelations | null;
};
export type UserWithRelations = z.infer<typeof UserSchema> & UserRelations;

export const UserWithRelationsSchema: z.ZodType<UserWithRelations> =
  UserSchema.merge(
    z.object({
      posts: z.lazy(() => PostWithRelationsSchema).array(),
      profile: z.lazy(() => ProfileWithRelationsSchema).nullish(),
      location: z.lazy(() => LocationWithRelationsSchema).nullish(),
    }),
  );
```

If the option is combined with `createOptionalDefaultValuesTypes` additionally the following model schemas are generated:

```ts
export type UserOptionalDefaultsWithRelations = z.infer<
  typeof UserOptionalDefaultsSchema
> &
  UserRelations;

export const UserOptionalDefaultsWithRelationsSchema: z.ZodType<UserOptionalDefaultsWithRelations> =
  UserOptionalDefaultsSchema.merge(
    z.object({
      posts: z.lazy(() => PostWithRelationsSchema).array(),
      profile: z.lazy(() => ProfileWithRelationsSchema).nullable(),
      location: z.lazy(() => LocationWithRelationsSchema).nullable(),
      target: z.lazy(() => LocationWithRelationsSchema).nullable(),
    }),
  );
```

### `createPartialTypes`

> default: `false`

If you need a separate model type that includes all the fields as optional you can pass the following option.

```prisma
generator zod {
  // ...rest of config
  createPartialTypes = true
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
export const UserPartialSchema = z
  .object({
    role: RoleSchema.array(),
    enum: AnotherEnumSchema,
    id: z.string().cuid(),
    email: z.string().email({ message: 'Invalid email address' }),
    name: z.string().min(1).max(100).nullable(),
    scalarList: z.string().array(),
    lat: z.number(),
    lng: z.number(),
  })
  .partial();
```

When using this option in combination with `createRelationValuesTypes` the following model schemas are also generated. Due do the type annotation, that is needed to have recursive types, this model has some limitations since `z.ZodType<myType>` does not allow some object methods like `.merge()`, `.omit()`, etc.

```ts
export type UserPartialRelations = {
  posts?: PostPartialWithRelations[];
  profile?: ProfilePartialWithRelations | null;
  location?: LocationPartialWithRelations | null;
};

export type UserPartialWithRelations = z.infer<typeof UserPartialSchema> &
  UserPartialRelations;

export const UserPartialWithRelationsSchema: z.ZodType<UserPartialWithRelations> =
  UserPartialSchema.merge(
    z.object({
      posts: z.lazy(() => PostPartialWithRelationsSchema).array(),
      profile: z.lazy(() => ProfilePartialWithRelationsSchema).nullable(),
      location: z.lazy(() => LocationPartialWithRelationsSchema).nullable(),
    }),
  ).partial();

export type UserPartial = z.infer<typeof UserPartialSchema>;
```

### `useDefaultValidators`

> default: `true`

In certain use cases the generator adds default validators:

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

> More default validators are planned in future releases (by checking the @db. fields in the schema). If you have some ideas for default validators feel free to open an issue.

### `coerceDate`

> default: true

Per default `DateTime` values are coerced to `Date` objects as long as you pass in a `valid ISO string` or an `instance of Date`. You can change this behavior to generate a simple `z.date()` by passing the following option to the generator config:

```prisma
generator zod {
  // ...rest of config
  coerceDate = false
}
```

### `writeNullishInModelTypes`

> default: false

By default the generator just writes `.nullable()` in the modelTypes when a field in the Prisma type is nullable. If you want these fields to accept `null | undefined`, which would be represented by `.nullish()` in the schema, you can pass the following option to the generator config:

```prisma
generator zod {
  // ...rest of config
  writeNullishInModelTypes = true
}
```

### `useTypeAssertions`

> default: false

Since there is a known typscript error when using `zod` greater than `3.21.1` you can now use type assertions to circumvent the error and use the latest version of `zod`.

> A WORD OF WARNING: Use this solution at your own risk! Because type assertions are circumventing the type system this can lead to unexpected behavior and runtime errors.
> But since the types worked in `zod` version `3.21.1` and the error is a known issue in `zod` version `3.21.2` I think it might be a valid solution until the issue is resolved.

```prisma
generator zod {
  // ...rest of config
  useTypeAssertions = true
}
```

### `prismaClientPath`

> default: `inferred from prisma schema path`

By default the prisma client path is inferred from the `output` path provided in the `prisma.schema` file under `generator client`. If you still need to use a custom path you can pass it to the generator config via this option. A custom path takes precedence over the inferred prisma client output path.

```prisma
generator zod {
  // ...rest of config
  prismaClientPath = "./path/to/prisma/client"
}
```

## Skip schema generation

You can skip schema generation based on e.g. the environment you are currently working in. For example you can only generate the schemas when you're in `development` but not when you run generation in `production` (because in `production` the schemas would already have been created and pushed to the server via your git repo). To skip generation in an environment just add the following `environment variable` to your respective `.env` files:

```js
SKIP_ZOD_PRISMA = 'true';
```

## Custom Enums

For custom enums a separate type is generated that represents the enum values as a union. Since in typescript unions are more useful than enums this can come in handy.

```prisma
enum MyEnum {
  A
  B
  C
}
```

```ts
export const MyEnumSchema = z.nativeEnum(PrismaClient.MyEnum);

export type MyEnumType = `${z.infer<typeof MyEnumSchema>}`; // union of "A" | "B" | "C"
```

## Json null values

When using json null values prisma has a unique way of handling Database `NULL` and JSON `null` as stated [in the Docs](https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#using-null-values).

To adhere to this concept you can pass `"DbNull"` or `"JsonNull"` as string to a nullable Json field. When the schema gets validated these strings are transformed to `Prisma.DbNull` or `Prisma.JsonNull` to satisfy the `prisma.[myModel].create() | .update() | ...` functions.

> This transformation is only applicable for input schemas like `[myModel]CreateInputSchema, [myModel]UpdateInputSchema, ...`. Since the model schemas represent the return value from the database - they can have `null` values - they are not affected by this transformation.

```ts
const parsedJsonSchema = myJsonSchema.parse({
  myJsonField: 'DbNull', // or "JsonNull"
});

// will be transformed to:

const parsedJsonSchema = {
  myJsonField: Prisma.DbNull, // or Prisma.JsonNull
};
```

## Decimal

Decimals are a special case since they are not supported by `zod` out of the box. Therefore the generator utilizes the `Prisma.Decimal` class and the `DecimalJsLike` type from the `@prisma/client` package and - if installed - the `decimal.js` package.

> A downside of this approach is that `Prisma` can't be simply imported as a type anymore because it is used to determine if an instance of `Prisma.Decimal` is passed in.

When using Decimal a `refine` method is used to validate if the input adheres to the prisma input union `string | number | Decimal | DecimalJsLike`.

```prisma
model MyModel {
  id      Int     @id @default(autoincrement())
  decimal Decimal
}
```

The above model would generate the following helper schemas that are used to validate the input in the `create` and `update` methods:

```ts
// DECIMAL HELPERS
//------------------------------------------------------

export const DecimalJSLikeSchema: z.ZodType<Prisma.DecimalJsLike> = z.object({
  d: z.array(z.number()),
  e: z.number(),
  s: z.number(),
  toFixed: z.function(z.tuple([]), z.string()),
});

export const DECIMAL_STRING_REGEX = /^[0-9.,e+-bxffo_cp]+$|Infinity|NaN/;

export const isValidDecimalInput = (
  v?: null | string | number | Prisma.DecimalJsLike,
): v is string | number | Prisma.DecimalJsLike => {
  if (v === undefined || v === null) return false;
  return (
    (typeof v === 'object' &&
      'd' in v &&
      'e' in v &&
      's' in v &&
      'toFixed' in v) ||
    (typeof v === 'string' && DECIMAL_STRING_REGEX.test(v)) ||
    typeof v === 'number'
  );
};
```

The input schemas reflect the types that are passed to prismas `create` and `update` methods.
These schemas further validate the input and throw an error if the input is not valid. A downside of this approach is that Prisma can't be simply imported as a type anymore because it is used to determine if an instance of `Prisma.Decimal` is passed in.

> If `decimal.js` is installed the schema also validates if the input is a valid `decimal.js` instance.

```ts
// INPUT TYPES
//------------------------------------------------------

import { Prisma } from '@prisma/client'; // can't be imported as type because of "instance of Prisma.Decimal" check
import Decimal from 'decimal.js'; // gets added if installed
import { z } from 'zod';
import { isValidDecimalInput } from './isValidDecimalInput';
import { DecimalJSLikeSchema } from './DecimalJsLikeSchema';

export const DecimalModelCreateInputSchema: z.ZodType<Prisma.DecimalModelCreateInput> =
  z
    .object({
      decimal: z
        .union([
          z.number(),
          z.string(),
          z.instanceof(Decimal),
          z.instanceof(Prisma.Decimal),
          DecimalJSLikeSchema,
        ])
        .refine((v) => isValidDecimalInput(v), {
          message: 'Must be a Decimal',
        }),
      decimalOpt: z
        .union([
          z.number(),
          z.string(),
          z.instanceof(Decimal),
          z.instanceof(Prisma.Decimal),
          DecimalJSLikeSchema,
        ])
        .refine((v) => isValidDecimalInput(v), { message: 'Must be a Decimal' })
        .optional()
        .nullable(),
    })
    .strict();
```

The model schema only reflects the type of the result of a database query. Therefor this type lacks all the further validation that is used in the `create` and `update` methods. So if you want to validate the input in the `create` and `update` methods you should use the input schemas instead of the model schemas or build your own custom schema using the helpers from above.

```ts
// SCHEMA
//------------------------------------------------------

import { Prisma } from '@prisma/client';

export const DecimalModelSchema = z.object({
  id: z.number().int(),
  decimal: z.instanceof(Prisma.Decimal, {
    message:
      "Field 'decimal' must be a Decimal. Location: ['Models', 'DecimalModel']",
  }),
  decimalOpt: z
    .instanceof(Prisma.Decimal, {
      message:
        "Field 'decimalOpt' must be a Decimal. Location: ['Models', 'DecimalModel']",
    })
    .nullable(),
});

// this schema reflects the following prisma type generated in prisma version 5.4.2:

export type DecimalModel =
  $Result.DefaultSelection<Prisma.$DecimalModelPayload>;

export type $DecimalModelPayload<
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
> = {
  name: 'DecimalModel';
  objects: {};
  scalars: $Extensions.GetPayloadResult<
    // this part of the type is reflected in the model schema
    {
      id: number;
      decimal: Prisma.Decimal;
      decimalOpt: Prisma.Decimal | null;
    },
    ExtArgs['result']['decimalModel']
  >;
  composites: {};
};
```

## Field validators

It is possible to add zod validators in the comments of the `prisma.schema` file with the following syntax (use [rich-comments](https://www.prisma.io/docs/concepts/components/prisma-schema#comments) `///` instead of `//`).

```prisma
myField [prisma-scalar-type] /// @zod.[zod-type + optional[(zod-error-messages)]].[zod validators for scalar-type]
```

This may look a bit cryptic so here is an example:

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
    .refine((v) => isValidDecimalInput(v), {
      message: 'Field "decimal" must be a Decimal',
      path: ['Models', 'MyPrismaScalarsType'],
    }),
  decimalOpt: z
    .union([
      z.number(),
      z.string(),
      z.instanceof(PrismaClient.Prisma.Decimal),
      DecimalJSLikeSchema,
    ])
    .refine((v) => isValidDecimalInput(v), {
      message: 'Field "decimalOpt" must be a Decimal',
      path: ['Models', 'MyPrismaScalarsType'],
    })
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

export type MyPrismaScalarsType = z.infer<typeof MyPrismaScalarsTypeSchema>;

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

> Additionally all the zod schemas for the prisma input-, enum-, filter-, orderBy-, select-, include and other necessary types are generated ready to be used in e.g. `trpc` inputs.

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

This would result in an output like this:

```ts
 string: z.string({
    invalid_type_error: 'invalid type error',
    required_error: 'is required',
    description: 'describe the error',
  }),
```

If you use the wrong key or have a typo the generator will throw an error:

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

To add custom validators to the prisma `BigInt` field you can use the `@zod.bigint` key. On this key you can use all string-specific validators that are mentioned in the [`zod-docs`](https://github.com/colinhacks/zod#bigints). You can also add a custom error message to each validator as stated in the docs.

```prisma
model MyModel {
  myField BigInt /// @zod.bigint.lt(5n, { message: "lt error" }).gt(6n, { message: "gt error" })({ invalid_type_error: "error", ... }).[...chain more validators]
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

To add custom validators to any [`Prisma Scalar`](https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference#model-field-scalar-types) field you can use the `@zod.custom.use()` key. This key has only the `.use(...your custom code here)` validator. This code overwrites all other standard implementations so you have to specify the `zod type` and how it should be written by the generator. Only `.optional()` and `.nullable()` are added automatically based on your prisma schema type definition. This field is intended to provide validators like zod `.refine` or `.transform` on your fields.

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

## Array validators

To add custom validators to list fields you can use the `z.[key].array(.length(2).min(1).max(2).nonempty())` validator. You can use this validator on `@zod.string`, `@zod.number`, `@zod.bigint`, `@zod.date` and `@zod.custom`. Furthermore, you can use it on enums with the `@zod.enum.array(...)` key and on relations with the `@zod.object.array(...)` key. You can also add a custom error message to each validator as stated in the docs.

```prisma
model MyModel {
  id     Int     @id @default(autoincrement())
  string String[] /// @zod.string.array(.length(2, { message: "my message" }).min(1, { message: "my message" }).max(2, { message: "my message" }).nonempty({ message: "my message" }))
  number Int[] /// @zod.number.array(.length(2).min(1).max(2).nonempty())
  bigint BigInt[] /// @zod.bigint.array(.length(2).min(1).max(2).nonempty())
  date   DateTime[] /// @zod.date.array(.length(2).min(1).max(2).nonempty())
  custom String[] /// @zod.custom.use(z.string().refine(val => validator.isBIC(val)).transform(val => val.toUpperCase())).array(.length(2).min(1).max(2).nonempty())
  enum   MyEnum[] /// @zod.enum.array(.length(2).min(1).max(2).nonempty())
  object MyObject[] /// @zod.object.array(.length(2).min(1).max(2).nonempty())
}
```

The above model schema would generate the following zod schema:

```ts
export const MyModel = z.object({
  id: z.number(),
  string: z
    .string()
    .array()
    .length(2, { message: 'my message' })
    .min(1, { message: 'my message' })
    .max(2, { message: 'my message' })
    .nonempty({ message: 'my message' }),
  number: z.number().array().length(2).min(1).max(2).nonempty(),
  bigint: z.bigint().array().length(2).min(1).max(2).nonempty(),
  date: z.date().array().length(2).min(1).max(2).nonempty(),
  custom: z
    .string()
    .refine((val) => validator.isBIC(val))
    .transform((val) => val.toUpperCase())
    .array()
    .length(2)
    .min(1)
    .max(2)
    .nonempty(),
  enum: MyEnumSchema.array().length(2).min(1).max(2).nonempty(),
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

> When a `required` field is omitted the field needs to be added manually in the respective prisma function like `create`, `update`, `createMany` and so on. Otherwise, Typescript would complain.

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

The generator provides the exact location, what went wrong and where the error happened. In big prisma schemas with hundreds of models and hundreds of custom validation strings this can come in handy.

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
  string String /// @zod.string.min(3, { message: 'Must be at least 3 characters' })
}
```

that the generator would throw the following error:

```bash
[@zod generator error]: Could not match validator 'min' with validatorPattern
'.min(3, { mussage: 'Must be at least 3 characters' })'. Please check for typos! [Error Location]: Model: 'MyModel', Field: 'string'.
```

## Model validators

To add custom validators to the prisma `model` you can use the `@zod.` key on the model. On this key you can use all [`object`](https://zod.dev/?id=objects) and [`schema`](https://zod.dev/?id=schema-methods) validators that are mentioned in the [`zod-docs`](https://zod.dev/?id=schema-methods).
You can also add custom error messages to the object and add custom imports.

```prisma
/// @zod.import(["import { myFunction } from "../../../../utils/myFunction";"]).error({ required_error: "error", invalid_type_error: "error" , description: "error"}).refine((data) => { return true }, { message: "error" }).strict()
model ModelWithOptions {
  id     Int    @id @default(autoincrement())
  string String
}
```

The above model would generate the following zod schema:

```ts
/////////////////////////////////////////
// MODEL WITH OPTIONS SCHEMA
/////////////////////////////////////////

export const ModelWithOptionsSchema = z.object(
  {
    id: z.number().int(),
    string: z.string(),
  },
  {
    required_error: 'error',
    invalid_type_error: 'error',
    description: 'error',
  },
);

export type ModelWithOptions = z.infer<typeof ModelWithOptionsSchema>;

/////////////////////////////////////////
// MODEL WITH OPTIONS CUSTOM VALIDATORS SCHEMA
/////////////////////////////////////////

export const ModelWithOptionsCustomValidatorsSchema =
  ModelWithOptionsSchema.strict().refine(
    (data) => {
      return true;
    },
    { message: 'error' },
  );

export type ModelWithOptionsCustomValidators = z.infer<
  typeof ModelWithOptionsCustomValidatorsSchema
>;
```

## Custom imports

To add custom imports to your validator you can add them via `@zod.import([...myCustom imports as strings])` in Prismas rich comments on the model or the field definition.

For example custom imports on the model level would look like this:

```prisma
/// @zod.import(["import { myFunction } from 'mypackage'"]).refine((val) => myFunction(val), { message: 'Is not valid' })
model MyModel {
  myField String /// @zod.string()
}
```

This would result in an output like this:

```ts
import { myFunction } from 'mypackage';

export const MyModelSchema = z
  .object({
    myField: z.string(),
  })
  .refine((val) => myFunction(val), { message: 'Is not valid' });
```

These custom imports are only used on the generated model schemas and not on the input type schemas.
If you want to add custom imports to the generated input type schemas too you can add them to the field definition like this:

```prisma
model ModelWithFieldLevelImport {
  myField String ///@zod.import(["import { myFunction } from 'mypackage'"]).custom.use(z.string().refine((val) => myFunction(val), { message: 'Is not valid' }))
}
```

This would result in an output like this:

```ts
import { myFunction } from 'mypackage';

// MODEL SCHEMA
// ---------------------------------------

export const ModelWithFieldLevelImportSchema = z.object({
  myField: z
    .string()
    .refine((val) => myFunction(val), { message: 'Is not valid' })
    .optional()
    .nullable(),
});

// INPUT SCHEMA

import { myFunction } from '../../../../utils/myFunction';

export const ModelWithFieldLevelImportCreateInputSchema: z.ZodType<Prisma.ModelWithFieldLevelImportCreateInput> =
  z
    .object({
      myField: z
        .string()
        .refine((val) => myFunction(val), { message: 'Is not valid' }),
    })
    .strict();
```

With this approach you can use

The downside of this approach is that

> Please be aware that you have to add an additional level to relative imports if you use the `useMultipleFiles` option.

## Custom model error messages

To add custom zod-type error messages to your model schema you can add them via `@zod.error({ ...customTypeErrorMessages })`. The custom error messages must adhere to the following type:

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
/// @zod.error({ required_error: "error", invalid_type_error: "error" , description: "error"})
model MyModel {
  myField String
}
```

This would result in an output like this:

```ts
export const MyModelSchema = z.object(
  {
    myField: z.string(),
  },
  {
    required_error: 'error',
    invalid_type_error: 'error',
    description: 'error',
  },
);
```

## Custom model validators

To add custom validators to the prisma `model` you can use the `@zod.` key on the model. On this key you can use all [`object`](https://zod.dev/?id=objects) and [`schema`](https://zod.dev/?id=schema-methods) validators that are mentioned in the [`zod-docs`](https://zod.dev/?id=schema-methods).

```prisma
/// @zod.refine((data) => { return true }, { message: "error" }).strict()
model ModelWithOptions {
  id     Int    @id @default(autoincrement())
  string String
}
```

The above model would generate the following zod schema:

```ts
/////////////////////////////////////////
// MODEL WITH OPTIONS SCHEMA
/////////////////////////////////////////

export const ModelWithOptionsSchema = z.object({
  id: z.number().int(),
  string: z.string(),
});

export type ModelWithOptions = z.infer<typeof ModelWithOptionsSchema>;

/////////////////////////////////////////
// MODEL WITH OPTIONS CUSTOM VALIDATORS SCHEMA
/////////////////////////////////////////

export const ModelWithOptionsCustomValidatorsSchema =
  ModelWithOptionsSchema.strict().refine(
    (data) => {
      return true;
    },
    { message: 'error' },
  );

export type ModelWithOptionsCustomValidators = z.infer<
  typeof ModelWithOptionsCustomValidatorsSchema
>;
```

> If strict is passed in it is always added to the model schema at the first position. All other validators are added in the order they appear in the rich comments.

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

The above model would generate the following output where the validator is extracted from the rich comments and added to the string field:

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
