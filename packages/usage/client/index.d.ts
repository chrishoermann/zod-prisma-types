
/**
 * Client
**/

import * as runtime from './runtime/index';
declare const prisma: unique symbol
export type PrismaPromise<A> = Promise<A> & {[prisma]: true}
type UnwrapPromise<P extends any> = P extends Promise<infer R> ? R : P
type UnwrapTuple<Tuple extends readonly unknown[]> = {
  [K in keyof Tuple]: K extends `${number}` ? Tuple[K] extends PrismaPromise<infer X> ? X : UnwrapPromise<Tuple[K]> : UnwrapPromise<Tuple[K]>
};


/**
 * Model MyModel
 * comment line one
 * comment line two
 */
export type MyModel = {
  id: number
  /**
   * comment before validator @zod.string.min(4).max(10) 
   * comment after validator
   */
  string: string | null
  /**
   * @zod.custom.omit([model, input])
   */
  omitField: string | null
  /**
   * @zod.custom.omit([model, input])
   */
  omitRequired: string
}

/**
 * Model MODELWithUpperCase
 * 
 */
export type MODELWithUpperCase = {
  id: number
  STRING: string
  MYValue: MYValue
}

/**
 * Model JsonModel
 * 
 */
export type JsonModel = {
  id: number
  json: Prisma.JsonValue
  jsonOpt: Prisma.JsonValue | null
}

/**
 * Model Test
 * 
 */
export type Test = {
  /**
   * @zod.string({ invalid_type_error: "some error with special chars: some + -*#'substring[]*#!§$%&/{}[]", required_error: "some other", description: "some description" }).cuid()
   */
  id: string
  /**
   * some comment @zod.string({ required_error: "error", invalid_type_error: "error"})
   */
  name: string | null
  value: MYValue
  /**
   * @zod.custom.use(z.string().refine((val) => validator.isBIC(val), { message: 'BIC is not valid' }))
   */
  bic: string | null
  intTwo: number
  int: number | null
  floatOpt: number | null
  float: number
  decimal: Prisma.Decimal
  decimalOpt: Prisma.Decimal | null
  date: Date
  /**
   * @zod.date({ invalid_type_error: "wrong date type" })
   */
  dateOpt: Date | null
  /**
   * @zod.bigint({ invalid_type_error: "error" })
   */
  bigInt: bigint
  bigIntOpt: bigint | null
  json: Prisma.JsonValue
  jsonOpt: Prisma.JsonValue | null
  /**
   * @zod.custom.use(z.instanceof(Buffer).refine((val) => val ? true : false, { message: 'Value is not valid' }))
   */
  bytes: Buffer
  bytesOpt: Buffer | null
}

/**
 * Model MyPrismaScalarsType
 * 
 */
export type MyPrismaScalarsType = {
  /**
   * @zod.string({ invalid_type_error: "invalid type error" }).cuid()
   */
  id: string
  /**
   * Some comment about string @zod.string.min(3, { message: "min error" }).max(10, { message: "max error" })
   */
  string: string | null
  /**
   * @zod.custom.use(z.string().refine((val) => validator.isBIC(val), { message: 'BIC is not valid' }))
   */
  bic: string | null
  /**
   * @zod.number.lt(10, { message: "lt error" }).gt(5, { message: "gt error" })
   */
  float: number
  decimal: Prisma.Decimal
  /**
   * @zod.date.min(new Date('2020-01-01')).max(new Date('2020-12-31'))
   */
  date: Date | null
  bigInt: bigint
  /**
   * @zod.custom.use(z.lazy(() => InputJsonValue).refine((val) => myFunction(val), { message: 'Is not valid' }))
   */
  json: Prisma.JsonValue
  bytes: Buffer
  /**
   * @zod.custom.use(z.string().refine((val) => myFunction(val), { message: 'Is not valid' }))
   */
  custom: string | null
  /**
   * @zod.custom.omit(["model", "input"])
   */
  exclude: string | null
}

/**
 * Model User
 * 
 */
export type User = {
  /**
   * @zod.string.cuid()
   */
  id: string
  /**
   * @zod.string.email({ message: "Invalid email address" })
   */
  email: string
  /**
   * some other comment 
   * @zod.string.min(1).max(100) some message after
   */
  name: string | null
  role: Role[]
  enum: AnotherEnum
  scalarList: string[]
  lat: number
  lng: number
}

/**
 * Model Post
 * 
 */
export type Post = {
  id: number
  title: string
  content: string | null
  published: boolean
  authorId: string
  anotherEnum: AnotherEnum[]
}

/**
 * Model Profile
 * 
 */
export type Profile = {
  id: number
  bio: string
  userId: string
  role: Role[]
  second: SecondEnum
}

/**
 * Model Location
 * 
 */
export type Location = {
  lat: number
  lng: number
}


/**
 * Enums
 */

// Based on
// https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

export const AnotherEnum: {
  ONE: 'ONE',
  TWO: 'TWO'
};

export type AnotherEnum = (typeof AnotherEnum)[keyof typeof AnotherEnum]


export const MYValue: {
  A: 'A',
  B: 'B',
  C: 'C'
};

export type MYValue = (typeof MYValue)[keyof typeof MYValue]


export const Role: {
  USER: 'USER',
  ADMIN: 'ADMIN'
};

export type Role = (typeof Role)[keyof typeof Role]


export const SecondEnum: {
  ONE: 'ONE',
  TWO: 'TWO'
};

export type SecondEnum = (typeof SecondEnum)[keyof typeof SecondEnum]


/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more MyModels
 * const myModels = await prisma.myModel.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  T extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof T ? T['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<T['log']> : never : never,
  GlobalReject extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined = 'rejectOnNotFound' extends keyof T
    ? T['rejectOnNotFound']
    : false
      > {
    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more MyModels
   * const myModels = await prisma.myModel.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<T, Prisma.PrismaClientOptions>);
  $on<V extends (U | 'beforeExit')>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : V extends 'beforeExit' ? () => Promise<void> : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): Promise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): Promise<void>;

  /**
   * Add a middleware
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): PrismaPromise<T>;

  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): Promise<UnwrapTuple<P>>;

  $transaction<R>(fn: (prisma: Prisma.TransactionClient) => Promise<R>, options?: {maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel}): Promise<R>;

      /**
   * `prisma.myModel`: Exposes CRUD operations for the **MyModel** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MyModels
    * const myModels = await prisma.myModel.findMany()
    * ```
    */
  get myModel(): Prisma.MyModelDelegate<GlobalReject>;

  /**
   * `prisma.mODELWithUpperCase`: Exposes CRUD operations for the **MODELWithUpperCase** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MODELWithUpperCases
    * const mODELWithUpperCases = await prisma.mODELWithUpperCase.findMany()
    * ```
    */
  get mODELWithUpperCase(): Prisma.MODELWithUpperCaseDelegate<GlobalReject>;

  /**
   * `prisma.jsonModel`: Exposes CRUD operations for the **JsonModel** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more JsonModels
    * const jsonModels = await prisma.jsonModel.findMany()
    * ```
    */
  get jsonModel(): Prisma.JsonModelDelegate<GlobalReject>;

  /**
   * `prisma.test`: Exposes CRUD operations for the **Test** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tests
    * const tests = await prisma.test.findMany()
    * ```
    */
  get test(): Prisma.TestDelegate<GlobalReject>;

  /**
   * `prisma.myPrismaScalarsType`: Exposes CRUD operations for the **MyPrismaScalarsType** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MyPrismaScalarsTypes
    * const myPrismaScalarsTypes = await prisma.myPrismaScalarsType.findMany()
    * ```
    */
  get myPrismaScalarsType(): Prisma.MyPrismaScalarsTypeDelegate<GlobalReject>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<GlobalReject>;

  /**
   * `prisma.post`: Exposes CRUD operations for the **Post** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Posts
    * const posts = await prisma.post.findMany()
    * ```
    */
  get post(): Prisma.PostDelegate<GlobalReject>;

  /**
   * `prisma.profile`: Exposes CRUD operations for the **Profile** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Profiles
    * const profiles = await prisma.profile.findMany()
    * ```
    */
  get profile(): Prisma.ProfileDelegate<GlobalReject>;

  /**
   * `prisma.location`: Exposes CRUD operations for the **Location** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Locations
    * const locations = await prisma.location.findMany()
    * ```
    */
  get location(): Prisma.LocationDelegate<GlobalReject>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql

  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket


  /**
   * Prisma Client JS version: 4.7.1
   * Query Engine version: 272861e07ab64f234d3ffc4094e32bd61775599c
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON object.
   * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from. 
   */
  export type JsonObject = {[Key in string]?: JsonValue}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON array.
   */
  export interface JsonArray extends Array<JsonValue> {}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches any valid JSON value.
   */
  export type JsonValue = string | number | boolean | JsonObject | JsonArray | null

  /**
   * Matches a JSON object.
   * Unlike `JsonObject`, this type allows undefined and read-only properties.
   */
  export type InputJsonObject = {readonly [Key in string]?: InputJsonValue | null}

  /**
   * Matches a JSON array.
   * Unlike `JsonArray`, readonly arrays are assignable to this type.
   */
  export interface InputJsonArray extends ReadonlyArray<InputJsonValue | null> {}

  /**
   * Matches any valid value that can be used as an input for operations like
   * create and update as the value of a JSON field. Unlike `JsonValue`, this
   * type allows read-only arrays and read-only object properties and disallows
   * `null` at the top level.
   *
   * `null` cannot be used as the value of a JSON field because its meaning
   * would be ambiguous. Use `Prisma.JsonNull` to store the JSON null value or
   * `Prisma.DbNull` to clear the JSON value and set the field to the database
   * NULL value instead.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-by-null-values
   */
  export type InputJsonValue = string | number | boolean | InputJsonObject | InputJsonArray

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }
  type HasSelect = {
    select: any
  }
  type HasInclude = {
    include: any
  }
  type CheckSelect<T, S, U> = T extends SelectAndInclude
    ? 'Please either choose `select` or `include`'
    : T extends HasSelect
    ? U
    : T extends HasInclude
    ? U
    : S

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => Promise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Exact<A, W = unknown> = 
  W extends unknown ? A extends Narrowable ? Cast<A, W> : Cast<
  {[K in keyof A]: K extends keyof W ? Exact<A[K], W[K]> : never},
  {[K in keyof W]: K extends keyof A ? Exact<A[K], W[K]> : W[K]}>
  : never;

  type Narrowable = string | number | boolean | bigint;

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;

  export function validator<V>(): <S>(select: Exact<S, V>) => S;

  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but with an array
   */
  type PickArray<T, K extends Array<keyof T>> = Prisma__Pick<T, TupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>

  class PrismaClientFetcher {
    private readonly prisma;
    private readonly debug;
    private readonly hooks?;
    constructor(prisma: PrismaClient<any, any>, debug?: boolean, hooks?: Hooks | undefined);
    request<T>(document: any, dataPath?: string[], rootField?: string, typeName?: string, isList?: boolean, callsite?: string): Promise<T>;
    sanitizeMessage(message: string): string;
    protected unpack(document: any, data: any, path: string[], rootField?: string, isList?: boolean): any;
  }

  export const ModelName: {
    MyModel: 'MyModel',
    MODELWithUpperCase: 'MODELWithUpperCase',
    JsonModel: 'JsonModel',
    Test: 'Test',
    MyPrismaScalarsType: 'MyPrismaScalarsType',
    User: 'User',
    Post: 'Post',
    Profile: 'Profile',
    Location: 'Location'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  export type RejectOnNotFound = boolean | ((error: Error) => Error)
  export type RejectPerModel = { [P in ModelName]?: RejectOnNotFound }
  export type RejectPerOperation =  { [P in "findUnique" | "findFirst"]?: RejectPerModel | RejectOnNotFound } 
  type IsReject<T> = T extends true ? True : T extends (err: Error) => Error ? True : False
  export type HasReject<
    GlobalRejectSettings extends Prisma.PrismaClientOptions['rejectOnNotFound'],
    LocalRejectSettings,
    Action extends PrismaAction,
    Model extends ModelName
  > = LocalRejectSettings extends RejectOnNotFound
    ? IsReject<LocalRejectSettings>
    : GlobalRejectSettings extends RejectPerOperation
    ? Action extends keyof GlobalRejectSettings
      ? GlobalRejectSettings[Action] extends RejectOnNotFound
        ? IsReject<GlobalRejectSettings[Action]>
        : GlobalRejectSettings[Action] extends RejectPerModel
        ? Model extends keyof GlobalRejectSettings[Action]
          ? IsReject<GlobalRejectSettings[Action][Model]>
          : False
        : False
      : False
    : IsReject<GlobalRejectSettings>
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'

  export interface PrismaClientOptions {
    /**
     * Configure findUnique/findFirst to throw an error if the query returns null. 
     * @deprecated since 4.0.0. Use `findUniqueOrThrow`/`findFirstOrThrow` methods instead.
     * @example
     * ```
     * // Reject on both findUnique/findFirst
     * rejectOnNotFound: true
     * // Reject only on findFirst with a custom error
     * rejectOnNotFound: { findFirst: (err) => new Error("Custom Error")}
     * // Reject on user.findUnique with a custom error
     * rejectOnNotFound: { findUnique: {User: (err) => new Error("User not found")}}
     * ```
     */
    rejectOnNotFound?: RejectOnNotFound | RejectPerOperation
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources

    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat

    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: Array<LogLevel | LogDefinition>
  }

  export type Hooks = {
    beforeRequest?: (options: { query: string, path: string[], rootField?: string, typeName?: string, document: any }) => any
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findMany'
    | 'findFirst'
    | 'create'
    | 'createMany'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => Promise<T>,
  ) => Promise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<PrismaClient, '$connect' | '$disconnect' | '$on' | '$transaction' | '$use'>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */


  export type UserCountOutputType = {
    posts: number
  }

  export type UserCountOutputTypeSelect = {
    posts?: boolean
  }

  export type UserCountOutputTypeGetPayload<S extends boolean | null | undefined | UserCountOutputTypeArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? UserCountOutputType :
    S extends undefined ? never :
    S extends { include: any } & (UserCountOutputTypeArgs)
    ? UserCountOutputType 
    : S extends { select: any } & (UserCountOutputTypeArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
    P extends keyof UserCountOutputType ? UserCountOutputType[P] : never
  } 
      : UserCountOutputType




  // Custom InputTypes

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     * 
    **/
    select?: UserCountOutputTypeSelect | null
  }



  /**
   * Count Type LocationCountOutputType
   */


  export type LocationCountOutputType = {
    User: number
  }

  export type LocationCountOutputTypeSelect = {
    User?: boolean
  }

  export type LocationCountOutputTypeGetPayload<S extends boolean | null | undefined | LocationCountOutputTypeArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? LocationCountOutputType :
    S extends undefined ? never :
    S extends { include: any } & (LocationCountOutputTypeArgs)
    ? LocationCountOutputType 
    : S extends { select: any } & (LocationCountOutputTypeArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
    P extends keyof LocationCountOutputType ? LocationCountOutputType[P] : never
  } 
      : LocationCountOutputType




  // Custom InputTypes

  /**
   * LocationCountOutputType without action
   */
  export type LocationCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the LocationCountOutputType
     * 
    **/
    select?: LocationCountOutputTypeSelect | null
  }



  /**
   * Models
   */

  /**
   * Model MyModel
   */


  export type AggregateMyModel = {
    _count: MyModelCountAggregateOutputType | null
    _avg: MyModelAvgAggregateOutputType | null
    _sum: MyModelSumAggregateOutputType | null
    _min: MyModelMinAggregateOutputType | null
    _max: MyModelMaxAggregateOutputType | null
  }

  export type MyModelAvgAggregateOutputType = {
    id: number | null
  }

  export type MyModelSumAggregateOutputType = {
    id: number | null
  }

  export type MyModelMinAggregateOutputType = {
    id: number | null
    string: string | null
    omitField: string | null
    omitRequired: string | null
  }

  export type MyModelMaxAggregateOutputType = {
    id: number | null
    string: string | null
    omitField: string | null
    omitRequired: string | null
  }

  export type MyModelCountAggregateOutputType = {
    id: number
    string: number
    omitField: number
    omitRequired: number
    _all: number
  }


  export type MyModelAvgAggregateInputType = {
    id?: true
  }

  export type MyModelSumAggregateInputType = {
    id?: true
  }

  export type MyModelMinAggregateInputType = {
    id?: true
    string?: true
    omitField?: true
    omitRequired?: true
  }

  export type MyModelMaxAggregateInputType = {
    id?: true
    string?: true
    omitField?: true
    omitRequired?: true
  }

  export type MyModelCountAggregateInputType = {
    id?: true
    string?: true
    omitField?: true
    omitRequired?: true
    _all?: true
  }

  export type MyModelAggregateArgs = {
    /**
     * Filter which MyModel to aggregate.
     * 
    **/
    where?: MyModelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MyModels to fetch.
     * 
    **/
    orderBy?: Enumerable<MyModelOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: MyModelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MyModels from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MyModels.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MyModels
    **/
    _count?: true | MyModelCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MyModelAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MyModelSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MyModelMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MyModelMaxAggregateInputType
  }

  export type GetMyModelAggregateType<T extends MyModelAggregateArgs> = {
        [P in keyof T & keyof AggregateMyModel]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMyModel[P]>
      : GetScalarType<T[P], AggregateMyModel[P]>
  }




  export type MyModelGroupByArgs = {
    where?: MyModelWhereInput
    orderBy?: Enumerable<MyModelOrderByWithAggregationInput>
    by: Array<MyModelScalarFieldEnum>
    having?: MyModelScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MyModelCountAggregateInputType | true
    _avg?: MyModelAvgAggregateInputType
    _sum?: MyModelSumAggregateInputType
    _min?: MyModelMinAggregateInputType
    _max?: MyModelMaxAggregateInputType
  }


  export type MyModelGroupByOutputType = {
    id: number
    string: string | null
    omitField: string | null
    omitRequired: string
    _count: MyModelCountAggregateOutputType | null
    _avg: MyModelAvgAggregateOutputType | null
    _sum: MyModelSumAggregateOutputType | null
    _min: MyModelMinAggregateOutputType | null
    _max: MyModelMaxAggregateOutputType | null
  }

  type GetMyModelGroupByPayload<T extends MyModelGroupByArgs> = PrismaPromise<
    Array<
      PickArray<MyModelGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MyModelGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MyModelGroupByOutputType[P]>
            : GetScalarType<T[P], MyModelGroupByOutputType[P]>
        }
      >
    >


  export type MyModelSelect = {
    id?: boolean
    string?: boolean
    omitField?: boolean
    omitRequired?: boolean
  }


  export type MyModelGetPayload<S extends boolean | null | undefined | MyModelArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? MyModel :
    S extends undefined ? never :
    S extends { include: any } & (MyModelArgs | MyModelFindManyArgs)
    ? MyModel 
    : S extends { select: any } & (MyModelArgs | MyModelFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
    P extends keyof MyModel ? MyModel[P] : never
  } 
      : MyModel


  type MyModelCountArgs = Merge<
    Omit<MyModelFindManyArgs, 'select' | 'include'> & {
      select?: MyModelCountAggregateInputType | true
    }
  >

  export interface MyModelDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one MyModel that matches the filter.
     * @param {MyModelFindUniqueArgs} args - Arguments to find a MyModel
     * @example
     * // Get one MyModel
     * const myModel = await prisma.myModel.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends MyModelFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, MyModelFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'MyModel'> extends True ? Prisma__MyModelClient<MyModelGetPayload<T>> : Prisma__MyModelClient<MyModelGetPayload<T> | null, null>

    /**
     * Find one MyModel that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {MyModelFindUniqueOrThrowArgs} args - Arguments to find a MyModel
     * @example
     * // Get one MyModel
     * const myModel = await prisma.myModel.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends MyModelFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, MyModelFindUniqueOrThrowArgs>
    ): Prisma__MyModelClient<MyModelGetPayload<T>>

    /**
     * Find the first MyModel that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MyModelFindFirstArgs} args - Arguments to find a MyModel
     * @example
     * // Get one MyModel
     * const myModel = await prisma.myModel.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends MyModelFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, MyModelFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'MyModel'> extends True ? Prisma__MyModelClient<MyModelGetPayload<T>> : Prisma__MyModelClient<MyModelGetPayload<T> | null, null>

    /**
     * Find the first MyModel that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MyModelFindFirstOrThrowArgs} args - Arguments to find a MyModel
     * @example
     * // Get one MyModel
     * const myModel = await prisma.myModel.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends MyModelFindFirstOrThrowArgs>(
      args?: SelectSubset<T, MyModelFindFirstOrThrowArgs>
    ): Prisma__MyModelClient<MyModelGetPayload<T>>

    /**
     * Find zero or more MyModels that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MyModelFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MyModels
     * const myModels = await prisma.myModel.findMany()
     * 
     * // Get first 10 MyModels
     * const myModels = await prisma.myModel.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const myModelWithIdOnly = await prisma.myModel.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends MyModelFindManyArgs>(
      args?: SelectSubset<T, MyModelFindManyArgs>
    ): PrismaPromise<Array<MyModelGetPayload<T>>>

    /**
     * Create a MyModel.
     * @param {MyModelCreateArgs} args - Arguments to create a MyModel.
     * @example
     * // Create one MyModel
     * const MyModel = await prisma.myModel.create({
     *   data: {
     *     // ... data to create a MyModel
     *   }
     * })
     * 
    **/
    create<T extends MyModelCreateArgs>(
      args: SelectSubset<T, MyModelCreateArgs>
    ): Prisma__MyModelClient<MyModelGetPayload<T>>

    /**
     * Create many MyModels.
     *     @param {MyModelCreateManyArgs} args - Arguments to create many MyModels.
     *     @example
     *     // Create many MyModels
     *     const myModel = await prisma.myModel.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends MyModelCreateManyArgs>(
      args?: SelectSubset<T, MyModelCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a MyModel.
     * @param {MyModelDeleteArgs} args - Arguments to delete one MyModel.
     * @example
     * // Delete one MyModel
     * const MyModel = await prisma.myModel.delete({
     *   where: {
     *     // ... filter to delete one MyModel
     *   }
     * })
     * 
    **/
    delete<T extends MyModelDeleteArgs>(
      args: SelectSubset<T, MyModelDeleteArgs>
    ): Prisma__MyModelClient<MyModelGetPayload<T>>

    /**
     * Update one MyModel.
     * @param {MyModelUpdateArgs} args - Arguments to update one MyModel.
     * @example
     * // Update one MyModel
     * const myModel = await prisma.myModel.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends MyModelUpdateArgs>(
      args: SelectSubset<T, MyModelUpdateArgs>
    ): Prisma__MyModelClient<MyModelGetPayload<T>>

    /**
     * Delete zero or more MyModels.
     * @param {MyModelDeleteManyArgs} args - Arguments to filter MyModels to delete.
     * @example
     * // Delete a few MyModels
     * const { count } = await prisma.myModel.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends MyModelDeleteManyArgs>(
      args?: SelectSubset<T, MyModelDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more MyModels.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MyModelUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MyModels
     * const myModel = await prisma.myModel.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends MyModelUpdateManyArgs>(
      args: SelectSubset<T, MyModelUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one MyModel.
     * @param {MyModelUpsertArgs} args - Arguments to update or create a MyModel.
     * @example
     * // Update or create a MyModel
     * const myModel = await prisma.myModel.upsert({
     *   create: {
     *     // ... data to create a MyModel
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MyModel we want to update
     *   }
     * })
    **/
    upsert<T extends MyModelUpsertArgs>(
      args: SelectSubset<T, MyModelUpsertArgs>
    ): Prisma__MyModelClient<MyModelGetPayload<T>>

    /**
     * Count the number of MyModels.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MyModelCountArgs} args - Arguments to filter MyModels to count.
     * @example
     * // Count the number of MyModels
     * const count = await prisma.myModel.count({
     *   where: {
     *     // ... the filter for the MyModels we want to count
     *   }
     * })
    **/
    count<T extends MyModelCountArgs>(
      args?: Subset<T, MyModelCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MyModelCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MyModel.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MyModelAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MyModelAggregateArgs>(args: Subset<T, MyModelAggregateArgs>): PrismaPromise<GetMyModelAggregateType<T>>

    /**
     * Group by MyModel.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MyModelGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MyModelGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MyModelGroupByArgs['orderBy'] }
        : { orderBy?: MyModelGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MyModelGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMyModelGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for MyModel.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__MyModelClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';


    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * MyModel base type for findUnique actions
   */
  export type MyModelFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the MyModel
     * 
    **/
    select?: MyModelSelect | null
    /**
     * Filter, which MyModel to fetch.
     * 
    **/
    where: MyModelWhereUniqueInput
  }

  /**
   * MyModel: findUnique
   */
  export interface MyModelFindUniqueArgs extends MyModelFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * MyModel findUniqueOrThrow
   */
  export type MyModelFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the MyModel
     * 
    **/
    select?: MyModelSelect | null
    /**
     * Filter, which MyModel to fetch.
     * 
    **/
    where: MyModelWhereUniqueInput
  }


  /**
   * MyModel base type for findFirst actions
   */
  export type MyModelFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the MyModel
     * 
    **/
    select?: MyModelSelect | null
    /**
     * Filter, which MyModel to fetch.
     * 
    **/
    where?: MyModelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MyModels to fetch.
     * 
    **/
    orderBy?: Enumerable<MyModelOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MyModels.
     * 
    **/
    cursor?: MyModelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MyModels from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MyModels.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MyModels.
     * 
    **/
    distinct?: Enumerable<MyModelScalarFieldEnum>
  }

  /**
   * MyModel: findFirst
   */
  export interface MyModelFindFirstArgs extends MyModelFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * MyModel findFirstOrThrow
   */
  export type MyModelFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the MyModel
     * 
    **/
    select?: MyModelSelect | null
    /**
     * Filter, which MyModel to fetch.
     * 
    **/
    where?: MyModelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MyModels to fetch.
     * 
    **/
    orderBy?: Enumerable<MyModelOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MyModels.
     * 
    **/
    cursor?: MyModelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MyModels from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MyModels.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MyModels.
     * 
    **/
    distinct?: Enumerable<MyModelScalarFieldEnum>
  }


  /**
   * MyModel findMany
   */
  export type MyModelFindManyArgs = {
    /**
     * Select specific fields to fetch from the MyModel
     * 
    **/
    select?: MyModelSelect | null
    /**
     * Filter, which MyModels to fetch.
     * 
    **/
    where?: MyModelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MyModels to fetch.
     * 
    **/
    orderBy?: Enumerable<MyModelOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MyModels.
     * 
    **/
    cursor?: MyModelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MyModels from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MyModels.
     * 
    **/
    skip?: number
    distinct?: Enumerable<MyModelScalarFieldEnum>
  }


  /**
   * MyModel create
   */
  export type MyModelCreateArgs = {
    /**
     * Select specific fields to fetch from the MyModel
     * 
    **/
    select?: MyModelSelect | null
    /**
     * The data needed to create a MyModel.
     * 
    **/
    data: XOR<MyModelCreateInput, MyModelUncheckedCreateInput>
  }


  /**
   * MyModel createMany
   */
  export type MyModelCreateManyArgs = {
    /**
     * The data used to create many MyModels.
     * 
    **/
    data: Enumerable<MyModelCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * MyModel update
   */
  export type MyModelUpdateArgs = {
    /**
     * Select specific fields to fetch from the MyModel
     * 
    **/
    select?: MyModelSelect | null
    /**
     * The data needed to update a MyModel.
     * 
    **/
    data: XOR<MyModelUpdateInput, MyModelUncheckedUpdateInput>
    /**
     * Choose, which MyModel to update.
     * 
    **/
    where: MyModelWhereUniqueInput
  }


  /**
   * MyModel updateMany
   */
  export type MyModelUpdateManyArgs = {
    /**
     * The data used to update MyModels.
     * 
    **/
    data: XOR<MyModelUpdateManyMutationInput, MyModelUncheckedUpdateManyInput>
    /**
     * Filter which MyModels to update
     * 
    **/
    where?: MyModelWhereInput
  }


  /**
   * MyModel upsert
   */
  export type MyModelUpsertArgs = {
    /**
     * Select specific fields to fetch from the MyModel
     * 
    **/
    select?: MyModelSelect | null
    /**
     * The filter to search for the MyModel to update in case it exists.
     * 
    **/
    where: MyModelWhereUniqueInput
    /**
     * In case the MyModel found by the `where` argument doesn't exist, create a new MyModel with this data.
     * 
    **/
    create: XOR<MyModelCreateInput, MyModelUncheckedCreateInput>
    /**
     * In case the MyModel was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<MyModelUpdateInput, MyModelUncheckedUpdateInput>
  }


  /**
   * MyModel delete
   */
  export type MyModelDeleteArgs = {
    /**
     * Select specific fields to fetch from the MyModel
     * 
    **/
    select?: MyModelSelect | null
    /**
     * Filter which MyModel to delete.
     * 
    **/
    where: MyModelWhereUniqueInput
  }


  /**
   * MyModel deleteMany
   */
  export type MyModelDeleteManyArgs = {
    /**
     * Filter which MyModels to delete
     * 
    **/
    where?: MyModelWhereInput
  }


  /**
   * MyModel without action
   */
  export type MyModelArgs = {
    /**
     * Select specific fields to fetch from the MyModel
     * 
    **/
    select?: MyModelSelect | null
  }



  /**
   * Model MODELWithUpperCase
   */


  export type AggregateMODELWithUpperCase = {
    _count: MODELWithUpperCaseCountAggregateOutputType | null
    _avg: MODELWithUpperCaseAvgAggregateOutputType | null
    _sum: MODELWithUpperCaseSumAggregateOutputType | null
    _min: MODELWithUpperCaseMinAggregateOutputType | null
    _max: MODELWithUpperCaseMaxAggregateOutputType | null
  }

  export type MODELWithUpperCaseAvgAggregateOutputType = {
    id: number | null
  }

  export type MODELWithUpperCaseSumAggregateOutputType = {
    id: number | null
  }

  export type MODELWithUpperCaseMinAggregateOutputType = {
    id: number | null
    STRING: string | null
    MYValue: MYValue | null
  }

  export type MODELWithUpperCaseMaxAggregateOutputType = {
    id: number | null
    STRING: string | null
    MYValue: MYValue | null
  }

  export type MODELWithUpperCaseCountAggregateOutputType = {
    id: number
    STRING: number
    MYValue: number
    _all: number
  }


  export type MODELWithUpperCaseAvgAggregateInputType = {
    id?: true
  }

  export type MODELWithUpperCaseSumAggregateInputType = {
    id?: true
  }

  export type MODELWithUpperCaseMinAggregateInputType = {
    id?: true
    STRING?: true
    MYValue?: true
  }

  export type MODELWithUpperCaseMaxAggregateInputType = {
    id?: true
    STRING?: true
    MYValue?: true
  }

  export type MODELWithUpperCaseCountAggregateInputType = {
    id?: true
    STRING?: true
    MYValue?: true
    _all?: true
  }

  export type MODELWithUpperCaseAggregateArgs = {
    /**
     * Filter which MODELWithUpperCase to aggregate.
     * 
    **/
    where?: MODELWithUpperCaseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MODELWithUpperCases to fetch.
     * 
    **/
    orderBy?: Enumerable<MODELWithUpperCaseOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: MODELWithUpperCaseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MODELWithUpperCases from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MODELWithUpperCases.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MODELWithUpperCases
    **/
    _count?: true | MODELWithUpperCaseCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MODELWithUpperCaseAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MODELWithUpperCaseSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MODELWithUpperCaseMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MODELWithUpperCaseMaxAggregateInputType
  }

  export type GetMODELWithUpperCaseAggregateType<T extends MODELWithUpperCaseAggregateArgs> = {
        [P in keyof T & keyof AggregateMODELWithUpperCase]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMODELWithUpperCase[P]>
      : GetScalarType<T[P], AggregateMODELWithUpperCase[P]>
  }




  export type MODELWithUpperCaseGroupByArgs = {
    where?: MODELWithUpperCaseWhereInput
    orderBy?: Enumerable<MODELWithUpperCaseOrderByWithAggregationInput>
    by: Array<MODELWithUpperCaseScalarFieldEnum>
    having?: MODELWithUpperCaseScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MODELWithUpperCaseCountAggregateInputType | true
    _avg?: MODELWithUpperCaseAvgAggregateInputType
    _sum?: MODELWithUpperCaseSumAggregateInputType
    _min?: MODELWithUpperCaseMinAggregateInputType
    _max?: MODELWithUpperCaseMaxAggregateInputType
  }


  export type MODELWithUpperCaseGroupByOutputType = {
    id: number
    STRING: string
    MYValue: MYValue
    _count: MODELWithUpperCaseCountAggregateOutputType | null
    _avg: MODELWithUpperCaseAvgAggregateOutputType | null
    _sum: MODELWithUpperCaseSumAggregateOutputType | null
    _min: MODELWithUpperCaseMinAggregateOutputType | null
    _max: MODELWithUpperCaseMaxAggregateOutputType | null
  }

  type GetMODELWithUpperCaseGroupByPayload<T extends MODELWithUpperCaseGroupByArgs> = PrismaPromise<
    Array<
      PickArray<MODELWithUpperCaseGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MODELWithUpperCaseGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MODELWithUpperCaseGroupByOutputType[P]>
            : GetScalarType<T[P], MODELWithUpperCaseGroupByOutputType[P]>
        }
      >
    >


  export type MODELWithUpperCaseSelect = {
    id?: boolean
    STRING?: boolean
    MYValue?: boolean
  }


  export type MODELWithUpperCaseGetPayload<S extends boolean | null | undefined | MODELWithUpperCaseArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? MODELWithUpperCase :
    S extends undefined ? never :
    S extends { include: any } & (MODELWithUpperCaseArgs | MODELWithUpperCaseFindManyArgs)
    ? MODELWithUpperCase 
    : S extends { select: any } & (MODELWithUpperCaseArgs | MODELWithUpperCaseFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
    P extends keyof MODELWithUpperCase ? MODELWithUpperCase[P] : never
  } 
      : MODELWithUpperCase


  type MODELWithUpperCaseCountArgs = Merge<
    Omit<MODELWithUpperCaseFindManyArgs, 'select' | 'include'> & {
      select?: MODELWithUpperCaseCountAggregateInputType | true
    }
  >

  export interface MODELWithUpperCaseDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one MODELWithUpperCase that matches the filter.
     * @param {MODELWithUpperCaseFindUniqueArgs} args - Arguments to find a MODELWithUpperCase
     * @example
     * // Get one MODELWithUpperCase
     * const mODELWithUpperCase = await prisma.mODELWithUpperCase.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends MODELWithUpperCaseFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, MODELWithUpperCaseFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'MODELWithUpperCase'> extends True ? Prisma__MODELWithUpperCaseClient<MODELWithUpperCaseGetPayload<T>> : Prisma__MODELWithUpperCaseClient<MODELWithUpperCaseGetPayload<T> | null, null>

    /**
     * Find one MODELWithUpperCase that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {MODELWithUpperCaseFindUniqueOrThrowArgs} args - Arguments to find a MODELWithUpperCase
     * @example
     * // Get one MODELWithUpperCase
     * const mODELWithUpperCase = await prisma.mODELWithUpperCase.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends MODELWithUpperCaseFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, MODELWithUpperCaseFindUniqueOrThrowArgs>
    ): Prisma__MODELWithUpperCaseClient<MODELWithUpperCaseGetPayload<T>>

    /**
     * Find the first MODELWithUpperCase that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MODELWithUpperCaseFindFirstArgs} args - Arguments to find a MODELWithUpperCase
     * @example
     * // Get one MODELWithUpperCase
     * const mODELWithUpperCase = await prisma.mODELWithUpperCase.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends MODELWithUpperCaseFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, MODELWithUpperCaseFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'MODELWithUpperCase'> extends True ? Prisma__MODELWithUpperCaseClient<MODELWithUpperCaseGetPayload<T>> : Prisma__MODELWithUpperCaseClient<MODELWithUpperCaseGetPayload<T> | null, null>

    /**
     * Find the first MODELWithUpperCase that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MODELWithUpperCaseFindFirstOrThrowArgs} args - Arguments to find a MODELWithUpperCase
     * @example
     * // Get one MODELWithUpperCase
     * const mODELWithUpperCase = await prisma.mODELWithUpperCase.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends MODELWithUpperCaseFindFirstOrThrowArgs>(
      args?: SelectSubset<T, MODELWithUpperCaseFindFirstOrThrowArgs>
    ): Prisma__MODELWithUpperCaseClient<MODELWithUpperCaseGetPayload<T>>

    /**
     * Find zero or more MODELWithUpperCases that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MODELWithUpperCaseFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MODELWithUpperCases
     * const mODELWithUpperCases = await prisma.mODELWithUpperCase.findMany()
     * 
     * // Get first 10 MODELWithUpperCases
     * const mODELWithUpperCases = await prisma.mODELWithUpperCase.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const mODELWithUpperCaseWithIdOnly = await prisma.mODELWithUpperCase.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends MODELWithUpperCaseFindManyArgs>(
      args?: SelectSubset<T, MODELWithUpperCaseFindManyArgs>
    ): PrismaPromise<Array<MODELWithUpperCaseGetPayload<T>>>

    /**
     * Create a MODELWithUpperCase.
     * @param {MODELWithUpperCaseCreateArgs} args - Arguments to create a MODELWithUpperCase.
     * @example
     * // Create one MODELWithUpperCase
     * const MODELWithUpperCase = await prisma.mODELWithUpperCase.create({
     *   data: {
     *     // ... data to create a MODELWithUpperCase
     *   }
     * })
     * 
    **/
    create<T extends MODELWithUpperCaseCreateArgs>(
      args: SelectSubset<T, MODELWithUpperCaseCreateArgs>
    ): Prisma__MODELWithUpperCaseClient<MODELWithUpperCaseGetPayload<T>>

    /**
     * Create many MODELWithUpperCases.
     *     @param {MODELWithUpperCaseCreateManyArgs} args - Arguments to create many MODELWithUpperCases.
     *     @example
     *     // Create many MODELWithUpperCases
     *     const mODELWithUpperCase = await prisma.mODELWithUpperCase.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends MODELWithUpperCaseCreateManyArgs>(
      args?: SelectSubset<T, MODELWithUpperCaseCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a MODELWithUpperCase.
     * @param {MODELWithUpperCaseDeleteArgs} args - Arguments to delete one MODELWithUpperCase.
     * @example
     * // Delete one MODELWithUpperCase
     * const MODELWithUpperCase = await prisma.mODELWithUpperCase.delete({
     *   where: {
     *     // ... filter to delete one MODELWithUpperCase
     *   }
     * })
     * 
    **/
    delete<T extends MODELWithUpperCaseDeleteArgs>(
      args: SelectSubset<T, MODELWithUpperCaseDeleteArgs>
    ): Prisma__MODELWithUpperCaseClient<MODELWithUpperCaseGetPayload<T>>

    /**
     * Update one MODELWithUpperCase.
     * @param {MODELWithUpperCaseUpdateArgs} args - Arguments to update one MODELWithUpperCase.
     * @example
     * // Update one MODELWithUpperCase
     * const mODELWithUpperCase = await prisma.mODELWithUpperCase.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends MODELWithUpperCaseUpdateArgs>(
      args: SelectSubset<T, MODELWithUpperCaseUpdateArgs>
    ): Prisma__MODELWithUpperCaseClient<MODELWithUpperCaseGetPayload<T>>

    /**
     * Delete zero or more MODELWithUpperCases.
     * @param {MODELWithUpperCaseDeleteManyArgs} args - Arguments to filter MODELWithUpperCases to delete.
     * @example
     * // Delete a few MODELWithUpperCases
     * const { count } = await prisma.mODELWithUpperCase.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends MODELWithUpperCaseDeleteManyArgs>(
      args?: SelectSubset<T, MODELWithUpperCaseDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more MODELWithUpperCases.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MODELWithUpperCaseUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MODELWithUpperCases
     * const mODELWithUpperCase = await prisma.mODELWithUpperCase.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends MODELWithUpperCaseUpdateManyArgs>(
      args: SelectSubset<T, MODELWithUpperCaseUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one MODELWithUpperCase.
     * @param {MODELWithUpperCaseUpsertArgs} args - Arguments to update or create a MODELWithUpperCase.
     * @example
     * // Update or create a MODELWithUpperCase
     * const mODELWithUpperCase = await prisma.mODELWithUpperCase.upsert({
     *   create: {
     *     // ... data to create a MODELWithUpperCase
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MODELWithUpperCase we want to update
     *   }
     * })
    **/
    upsert<T extends MODELWithUpperCaseUpsertArgs>(
      args: SelectSubset<T, MODELWithUpperCaseUpsertArgs>
    ): Prisma__MODELWithUpperCaseClient<MODELWithUpperCaseGetPayload<T>>

    /**
     * Count the number of MODELWithUpperCases.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MODELWithUpperCaseCountArgs} args - Arguments to filter MODELWithUpperCases to count.
     * @example
     * // Count the number of MODELWithUpperCases
     * const count = await prisma.mODELWithUpperCase.count({
     *   where: {
     *     // ... the filter for the MODELWithUpperCases we want to count
     *   }
     * })
    **/
    count<T extends MODELWithUpperCaseCountArgs>(
      args?: Subset<T, MODELWithUpperCaseCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MODELWithUpperCaseCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MODELWithUpperCase.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MODELWithUpperCaseAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MODELWithUpperCaseAggregateArgs>(args: Subset<T, MODELWithUpperCaseAggregateArgs>): PrismaPromise<GetMODELWithUpperCaseAggregateType<T>>

    /**
     * Group by MODELWithUpperCase.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MODELWithUpperCaseGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MODELWithUpperCaseGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MODELWithUpperCaseGroupByArgs['orderBy'] }
        : { orderBy?: MODELWithUpperCaseGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MODELWithUpperCaseGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMODELWithUpperCaseGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for MODELWithUpperCase.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__MODELWithUpperCaseClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';


    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * MODELWithUpperCase base type for findUnique actions
   */
  export type MODELWithUpperCaseFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the MODELWithUpperCase
     * 
    **/
    select?: MODELWithUpperCaseSelect | null
    /**
     * Filter, which MODELWithUpperCase to fetch.
     * 
    **/
    where: MODELWithUpperCaseWhereUniqueInput
  }

  /**
   * MODELWithUpperCase: findUnique
   */
  export interface MODELWithUpperCaseFindUniqueArgs extends MODELWithUpperCaseFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * MODELWithUpperCase findUniqueOrThrow
   */
  export type MODELWithUpperCaseFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the MODELWithUpperCase
     * 
    **/
    select?: MODELWithUpperCaseSelect | null
    /**
     * Filter, which MODELWithUpperCase to fetch.
     * 
    **/
    where: MODELWithUpperCaseWhereUniqueInput
  }


  /**
   * MODELWithUpperCase base type for findFirst actions
   */
  export type MODELWithUpperCaseFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the MODELWithUpperCase
     * 
    **/
    select?: MODELWithUpperCaseSelect | null
    /**
     * Filter, which MODELWithUpperCase to fetch.
     * 
    **/
    where?: MODELWithUpperCaseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MODELWithUpperCases to fetch.
     * 
    **/
    orderBy?: Enumerable<MODELWithUpperCaseOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MODELWithUpperCases.
     * 
    **/
    cursor?: MODELWithUpperCaseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MODELWithUpperCases from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MODELWithUpperCases.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MODELWithUpperCases.
     * 
    **/
    distinct?: Enumerable<MODELWithUpperCaseScalarFieldEnum>
  }

  /**
   * MODELWithUpperCase: findFirst
   */
  export interface MODELWithUpperCaseFindFirstArgs extends MODELWithUpperCaseFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * MODELWithUpperCase findFirstOrThrow
   */
  export type MODELWithUpperCaseFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the MODELWithUpperCase
     * 
    **/
    select?: MODELWithUpperCaseSelect | null
    /**
     * Filter, which MODELWithUpperCase to fetch.
     * 
    **/
    where?: MODELWithUpperCaseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MODELWithUpperCases to fetch.
     * 
    **/
    orderBy?: Enumerable<MODELWithUpperCaseOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MODELWithUpperCases.
     * 
    **/
    cursor?: MODELWithUpperCaseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MODELWithUpperCases from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MODELWithUpperCases.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MODELWithUpperCases.
     * 
    **/
    distinct?: Enumerable<MODELWithUpperCaseScalarFieldEnum>
  }


  /**
   * MODELWithUpperCase findMany
   */
  export type MODELWithUpperCaseFindManyArgs = {
    /**
     * Select specific fields to fetch from the MODELWithUpperCase
     * 
    **/
    select?: MODELWithUpperCaseSelect | null
    /**
     * Filter, which MODELWithUpperCases to fetch.
     * 
    **/
    where?: MODELWithUpperCaseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MODELWithUpperCases to fetch.
     * 
    **/
    orderBy?: Enumerable<MODELWithUpperCaseOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MODELWithUpperCases.
     * 
    **/
    cursor?: MODELWithUpperCaseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MODELWithUpperCases from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MODELWithUpperCases.
     * 
    **/
    skip?: number
    distinct?: Enumerable<MODELWithUpperCaseScalarFieldEnum>
  }


  /**
   * MODELWithUpperCase create
   */
  export type MODELWithUpperCaseCreateArgs = {
    /**
     * Select specific fields to fetch from the MODELWithUpperCase
     * 
    **/
    select?: MODELWithUpperCaseSelect | null
    /**
     * The data needed to create a MODELWithUpperCase.
     * 
    **/
    data: XOR<MODELWithUpperCaseCreateInput, MODELWithUpperCaseUncheckedCreateInput>
  }


  /**
   * MODELWithUpperCase createMany
   */
  export type MODELWithUpperCaseCreateManyArgs = {
    /**
     * The data used to create many MODELWithUpperCases.
     * 
    **/
    data: Enumerable<MODELWithUpperCaseCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * MODELWithUpperCase update
   */
  export type MODELWithUpperCaseUpdateArgs = {
    /**
     * Select specific fields to fetch from the MODELWithUpperCase
     * 
    **/
    select?: MODELWithUpperCaseSelect | null
    /**
     * The data needed to update a MODELWithUpperCase.
     * 
    **/
    data: XOR<MODELWithUpperCaseUpdateInput, MODELWithUpperCaseUncheckedUpdateInput>
    /**
     * Choose, which MODELWithUpperCase to update.
     * 
    **/
    where: MODELWithUpperCaseWhereUniqueInput
  }


  /**
   * MODELWithUpperCase updateMany
   */
  export type MODELWithUpperCaseUpdateManyArgs = {
    /**
     * The data used to update MODELWithUpperCases.
     * 
    **/
    data: XOR<MODELWithUpperCaseUpdateManyMutationInput, MODELWithUpperCaseUncheckedUpdateManyInput>
    /**
     * Filter which MODELWithUpperCases to update
     * 
    **/
    where?: MODELWithUpperCaseWhereInput
  }


  /**
   * MODELWithUpperCase upsert
   */
  export type MODELWithUpperCaseUpsertArgs = {
    /**
     * Select specific fields to fetch from the MODELWithUpperCase
     * 
    **/
    select?: MODELWithUpperCaseSelect | null
    /**
     * The filter to search for the MODELWithUpperCase to update in case it exists.
     * 
    **/
    where: MODELWithUpperCaseWhereUniqueInput
    /**
     * In case the MODELWithUpperCase found by the `where` argument doesn't exist, create a new MODELWithUpperCase with this data.
     * 
    **/
    create: XOR<MODELWithUpperCaseCreateInput, MODELWithUpperCaseUncheckedCreateInput>
    /**
     * In case the MODELWithUpperCase was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<MODELWithUpperCaseUpdateInput, MODELWithUpperCaseUncheckedUpdateInput>
  }


  /**
   * MODELWithUpperCase delete
   */
  export type MODELWithUpperCaseDeleteArgs = {
    /**
     * Select specific fields to fetch from the MODELWithUpperCase
     * 
    **/
    select?: MODELWithUpperCaseSelect | null
    /**
     * Filter which MODELWithUpperCase to delete.
     * 
    **/
    where: MODELWithUpperCaseWhereUniqueInput
  }


  /**
   * MODELWithUpperCase deleteMany
   */
  export type MODELWithUpperCaseDeleteManyArgs = {
    /**
     * Filter which MODELWithUpperCases to delete
     * 
    **/
    where?: MODELWithUpperCaseWhereInput
  }


  /**
   * MODELWithUpperCase without action
   */
  export type MODELWithUpperCaseArgs = {
    /**
     * Select specific fields to fetch from the MODELWithUpperCase
     * 
    **/
    select?: MODELWithUpperCaseSelect | null
  }



  /**
   * Model JsonModel
   */


  export type AggregateJsonModel = {
    _count: JsonModelCountAggregateOutputType | null
    _avg: JsonModelAvgAggregateOutputType | null
    _sum: JsonModelSumAggregateOutputType | null
    _min: JsonModelMinAggregateOutputType | null
    _max: JsonModelMaxAggregateOutputType | null
  }

  export type JsonModelAvgAggregateOutputType = {
    id: number | null
  }

  export type JsonModelSumAggregateOutputType = {
    id: number | null
  }

  export type JsonModelMinAggregateOutputType = {
    id: number | null
  }

  export type JsonModelMaxAggregateOutputType = {
    id: number | null
  }

  export type JsonModelCountAggregateOutputType = {
    id: number
    json: number
    jsonOpt: number
    _all: number
  }


  export type JsonModelAvgAggregateInputType = {
    id?: true
  }

  export type JsonModelSumAggregateInputType = {
    id?: true
  }

  export type JsonModelMinAggregateInputType = {
    id?: true
  }

  export type JsonModelMaxAggregateInputType = {
    id?: true
  }

  export type JsonModelCountAggregateInputType = {
    id?: true
    json?: true
    jsonOpt?: true
    _all?: true
  }

  export type JsonModelAggregateArgs = {
    /**
     * Filter which JsonModel to aggregate.
     * 
    **/
    where?: JsonModelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JsonModels to fetch.
     * 
    **/
    orderBy?: Enumerable<JsonModelOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: JsonModelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JsonModels from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JsonModels.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned JsonModels
    **/
    _count?: true | JsonModelCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: JsonModelAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: JsonModelSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: JsonModelMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: JsonModelMaxAggregateInputType
  }

  export type GetJsonModelAggregateType<T extends JsonModelAggregateArgs> = {
        [P in keyof T & keyof AggregateJsonModel]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateJsonModel[P]>
      : GetScalarType<T[P], AggregateJsonModel[P]>
  }




  export type JsonModelGroupByArgs = {
    where?: JsonModelWhereInput
    orderBy?: Enumerable<JsonModelOrderByWithAggregationInput>
    by: Array<JsonModelScalarFieldEnum>
    having?: JsonModelScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: JsonModelCountAggregateInputType | true
    _avg?: JsonModelAvgAggregateInputType
    _sum?: JsonModelSumAggregateInputType
    _min?: JsonModelMinAggregateInputType
    _max?: JsonModelMaxAggregateInputType
  }


  export type JsonModelGroupByOutputType = {
    id: number
    json: JsonValue
    jsonOpt: JsonValue | null
    _count: JsonModelCountAggregateOutputType | null
    _avg: JsonModelAvgAggregateOutputType | null
    _sum: JsonModelSumAggregateOutputType | null
    _min: JsonModelMinAggregateOutputType | null
    _max: JsonModelMaxAggregateOutputType | null
  }

  type GetJsonModelGroupByPayload<T extends JsonModelGroupByArgs> = PrismaPromise<
    Array<
      PickArray<JsonModelGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof JsonModelGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], JsonModelGroupByOutputType[P]>
            : GetScalarType<T[P], JsonModelGroupByOutputType[P]>
        }
      >
    >


  export type JsonModelSelect = {
    id?: boolean
    json?: boolean
    jsonOpt?: boolean
  }


  export type JsonModelGetPayload<S extends boolean | null | undefined | JsonModelArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? JsonModel :
    S extends undefined ? never :
    S extends { include: any } & (JsonModelArgs | JsonModelFindManyArgs)
    ? JsonModel 
    : S extends { select: any } & (JsonModelArgs | JsonModelFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
    P extends keyof JsonModel ? JsonModel[P] : never
  } 
      : JsonModel


  type JsonModelCountArgs = Merge<
    Omit<JsonModelFindManyArgs, 'select' | 'include'> & {
      select?: JsonModelCountAggregateInputType | true
    }
  >

  export interface JsonModelDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one JsonModel that matches the filter.
     * @param {JsonModelFindUniqueArgs} args - Arguments to find a JsonModel
     * @example
     * // Get one JsonModel
     * const jsonModel = await prisma.jsonModel.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends JsonModelFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, JsonModelFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'JsonModel'> extends True ? Prisma__JsonModelClient<JsonModelGetPayload<T>> : Prisma__JsonModelClient<JsonModelGetPayload<T> | null, null>

    /**
     * Find one JsonModel that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {JsonModelFindUniqueOrThrowArgs} args - Arguments to find a JsonModel
     * @example
     * // Get one JsonModel
     * const jsonModel = await prisma.jsonModel.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends JsonModelFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, JsonModelFindUniqueOrThrowArgs>
    ): Prisma__JsonModelClient<JsonModelGetPayload<T>>

    /**
     * Find the first JsonModel that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JsonModelFindFirstArgs} args - Arguments to find a JsonModel
     * @example
     * // Get one JsonModel
     * const jsonModel = await prisma.jsonModel.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends JsonModelFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, JsonModelFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'JsonModel'> extends True ? Prisma__JsonModelClient<JsonModelGetPayload<T>> : Prisma__JsonModelClient<JsonModelGetPayload<T> | null, null>

    /**
     * Find the first JsonModel that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JsonModelFindFirstOrThrowArgs} args - Arguments to find a JsonModel
     * @example
     * // Get one JsonModel
     * const jsonModel = await prisma.jsonModel.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends JsonModelFindFirstOrThrowArgs>(
      args?: SelectSubset<T, JsonModelFindFirstOrThrowArgs>
    ): Prisma__JsonModelClient<JsonModelGetPayload<T>>

    /**
     * Find zero or more JsonModels that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JsonModelFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all JsonModels
     * const jsonModels = await prisma.jsonModel.findMany()
     * 
     * // Get first 10 JsonModels
     * const jsonModels = await prisma.jsonModel.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const jsonModelWithIdOnly = await prisma.jsonModel.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends JsonModelFindManyArgs>(
      args?: SelectSubset<T, JsonModelFindManyArgs>
    ): PrismaPromise<Array<JsonModelGetPayload<T>>>

    /**
     * Create a JsonModel.
     * @param {JsonModelCreateArgs} args - Arguments to create a JsonModel.
     * @example
     * // Create one JsonModel
     * const JsonModel = await prisma.jsonModel.create({
     *   data: {
     *     // ... data to create a JsonModel
     *   }
     * })
     * 
    **/
    create<T extends JsonModelCreateArgs>(
      args: SelectSubset<T, JsonModelCreateArgs>
    ): Prisma__JsonModelClient<JsonModelGetPayload<T>>

    /**
     * Create many JsonModels.
     *     @param {JsonModelCreateManyArgs} args - Arguments to create many JsonModels.
     *     @example
     *     // Create many JsonModels
     *     const jsonModel = await prisma.jsonModel.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends JsonModelCreateManyArgs>(
      args?: SelectSubset<T, JsonModelCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a JsonModel.
     * @param {JsonModelDeleteArgs} args - Arguments to delete one JsonModel.
     * @example
     * // Delete one JsonModel
     * const JsonModel = await prisma.jsonModel.delete({
     *   where: {
     *     // ... filter to delete one JsonModel
     *   }
     * })
     * 
    **/
    delete<T extends JsonModelDeleteArgs>(
      args: SelectSubset<T, JsonModelDeleteArgs>
    ): Prisma__JsonModelClient<JsonModelGetPayload<T>>

    /**
     * Update one JsonModel.
     * @param {JsonModelUpdateArgs} args - Arguments to update one JsonModel.
     * @example
     * // Update one JsonModel
     * const jsonModel = await prisma.jsonModel.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends JsonModelUpdateArgs>(
      args: SelectSubset<T, JsonModelUpdateArgs>
    ): Prisma__JsonModelClient<JsonModelGetPayload<T>>

    /**
     * Delete zero or more JsonModels.
     * @param {JsonModelDeleteManyArgs} args - Arguments to filter JsonModels to delete.
     * @example
     * // Delete a few JsonModels
     * const { count } = await prisma.jsonModel.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends JsonModelDeleteManyArgs>(
      args?: SelectSubset<T, JsonModelDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more JsonModels.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JsonModelUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many JsonModels
     * const jsonModel = await prisma.jsonModel.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends JsonModelUpdateManyArgs>(
      args: SelectSubset<T, JsonModelUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one JsonModel.
     * @param {JsonModelUpsertArgs} args - Arguments to update or create a JsonModel.
     * @example
     * // Update or create a JsonModel
     * const jsonModel = await prisma.jsonModel.upsert({
     *   create: {
     *     // ... data to create a JsonModel
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the JsonModel we want to update
     *   }
     * })
    **/
    upsert<T extends JsonModelUpsertArgs>(
      args: SelectSubset<T, JsonModelUpsertArgs>
    ): Prisma__JsonModelClient<JsonModelGetPayload<T>>

    /**
     * Count the number of JsonModels.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JsonModelCountArgs} args - Arguments to filter JsonModels to count.
     * @example
     * // Count the number of JsonModels
     * const count = await prisma.jsonModel.count({
     *   where: {
     *     // ... the filter for the JsonModels we want to count
     *   }
     * })
    **/
    count<T extends JsonModelCountArgs>(
      args?: Subset<T, JsonModelCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], JsonModelCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a JsonModel.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JsonModelAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends JsonModelAggregateArgs>(args: Subset<T, JsonModelAggregateArgs>): PrismaPromise<GetJsonModelAggregateType<T>>

    /**
     * Group by JsonModel.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JsonModelGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends JsonModelGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: JsonModelGroupByArgs['orderBy'] }
        : { orderBy?: JsonModelGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, JsonModelGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetJsonModelGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for JsonModel.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__JsonModelClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';


    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * JsonModel base type for findUnique actions
   */
  export type JsonModelFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the JsonModel
     * 
    **/
    select?: JsonModelSelect | null
    /**
     * Filter, which JsonModel to fetch.
     * 
    **/
    where: JsonModelWhereUniqueInput
  }

  /**
   * JsonModel: findUnique
   */
  export interface JsonModelFindUniqueArgs extends JsonModelFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * JsonModel findUniqueOrThrow
   */
  export type JsonModelFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the JsonModel
     * 
    **/
    select?: JsonModelSelect | null
    /**
     * Filter, which JsonModel to fetch.
     * 
    **/
    where: JsonModelWhereUniqueInput
  }


  /**
   * JsonModel base type for findFirst actions
   */
  export type JsonModelFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the JsonModel
     * 
    **/
    select?: JsonModelSelect | null
    /**
     * Filter, which JsonModel to fetch.
     * 
    **/
    where?: JsonModelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JsonModels to fetch.
     * 
    **/
    orderBy?: Enumerable<JsonModelOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for JsonModels.
     * 
    **/
    cursor?: JsonModelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JsonModels from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JsonModels.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of JsonModels.
     * 
    **/
    distinct?: Enumerable<JsonModelScalarFieldEnum>
  }

  /**
   * JsonModel: findFirst
   */
  export interface JsonModelFindFirstArgs extends JsonModelFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * JsonModel findFirstOrThrow
   */
  export type JsonModelFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the JsonModel
     * 
    **/
    select?: JsonModelSelect | null
    /**
     * Filter, which JsonModel to fetch.
     * 
    **/
    where?: JsonModelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JsonModels to fetch.
     * 
    **/
    orderBy?: Enumerable<JsonModelOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for JsonModels.
     * 
    **/
    cursor?: JsonModelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JsonModels from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JsonModels.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of JsonModels.
     * 
    **/
    distinct?: Enumerable<JsonModelScalarFieldEnum>
  }


  /**
   * JsonModel findMany
   */
  export type JsonModelFindManyArgs = {
    /**
     * Select specific fields to fetch from the JsonModel
     * 
    **/
    select?: JsonModelSelect | null
    /**
     * Filter, which JsonModels to fetch.
     * 
    **/
    where?: JsonModelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JsonModels to fetch.
     * 
    **/
    orderBy?: Enumerable<JsonModelOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing JsonModels.
     * 
    **/
    cursor?: JsonModelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JsonModels from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JsonModels.
     * 
    **/
    skip?: number
    distinct?: Enumerable<JsonModelScalarFieldEnum>
  }


  /**
   * JsonModel create
   */
  export type JsonModelCreateArgs = {
    /**
     * Select specific fields to fetch from the JsonModel
     * 
    **/
    select?: JsonModelSelect | null
    /**
     * The data needed to create a JsonModel.
     * 
    **/
    data: XOR<JsonModelCreateInput, JsonModelUncheckedCreateInput>
  }


  /**
   * JsonModel createMany
   */
  export type JsonModelCreateManyArgs = {
    /**
     * The data used to create many JsonModels.
     * 
    **/
    data: Enumerable<JsonModelCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * JsonModel update
   */
  export type JsonModelUpdateArgs = {
    /**
     * Select specific fields to fetch from the JsonModel
     * 
    **/
    select?: JsonModelSelect | null
    /**
     * The data needed to update a JsonModel.
     * 
    **/
    data: XOR<JsonModelUpdateInput, JsonModelUncheckedUpdateInput>
    /**
     * Choose, which JsonModel to update.
     * 
    **/
    where: JsonModelWhereUniqueInput
  }


  /**
   * JsonModel updateMany
   */
  export type JsonModelUpdateManyArgs = {
    /**
     * The data used to update JsonModels.
     * 
    **/
    data: XOR<JsonModelUpdateManyMutationInput, JsonModelUncheckedUpdateManyInput>
    /**
     * Filter which JsonModels to update
     * 
    **/
    where?: JsonModelWhereInput
  }


  /**
   * JsonModel upsert
   */
  export type JsonModelUpsertArgs = {
    /**
     * Select specific fields to fetch from the JsonModel
     * 
    **/
    select?: JsonModelSelect | null
    /**
     * The filter to search for the JsonModel to update in case it exists.
     * 
    **/
    where: JsonModelWhereUniqueInput
    /**
     * In case the JsonModel found by the `where` argument doesn't exist, create a new JsonModel with this data.
     * 
    **/
    create: XOR<JsonModelCreateInput, JsonModelUncheckedCreateInput>
    /**
     * In case the JsonModel was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<JsonModelUpdateInput, JsonModelUncheckedUpdateInput>
  }


  /**
   * JsonModel delete
   */
  export type JsonModelDeleteArgs = {
    /**
     * Select specific fields to fetch from the JsonModel
     * 
    **/
    select?: JsonModelSelect | null
    /**
     * Filter which JsonModel to delete.
     * 
    **/
    where: JsonModelWhereUniqueInput
  }


  /**
   * JsonModel deleteMany
   */
  export type JsonModelDeleteManyArgs = {
    /**
     * Filter which JsonModels to delete
     * 
    **/
    where?: JsonModelWhereInput
  }


  /**
   * JsonModel without action
   */
  export type JsonModelArgs = {
    /**
     * Select specific fields to fetch from the JsonModel
     * 
    **/
    select?: JsonModelSelect | null
  }



  /**
   * Model Test
   */


  export type AggregateTest = {
    _count: TestCountAggregateOutputType | null
    _avg: TestAvgAggregateOutputType | null
    _sum: TestSumAggregateOutputType | null
    _min: TestMinAggregateOutputType | null
    _max: TestMaxAggregateOutputType | null
  }

  export type TestAvgAggregateOutputType = {
    intTwo: number | null
    int: number | null
    floatOpt: number | null
    float: number | null
    decimal: Decimal | null
    decimalOpt: Decimal | null
    bigInt: number | null
    bigIntOpt: number | null
  }

  export type TestSumAggregateOutputType = {
    intTwo: number | null
    int: number | null
    floatOpt: number | null
    float: number | null
    decimal: Decimal | null
    decimalOpt: Decimal | null
    bigInt: bigint | null
    bigIntOpt: bigint | null
  }

  export type TestMinAggregateOutputType = {
    id: string | null
    name: string | null
    value: MYValue | null
    bic: string | null
    intTwo: number | null
    int: number | null
    floatOpt: number | null
    float: number | null
    decimal: Decimal | null
    decimalOpt: Decimal | null
    date: Date | null
    dateOpt: Date | null
    bigInt: bigint | null
    bigIntOpt: bigint | null
    bytes: Buffer | null
    bytesOpt: Buffer | null
  }

  export type TestMaxAggregateOutputType = {
    id: string | null
    name: string | null
    value: MYValue | null
    bic: string | null
    intTwo: number | null
    int: number | null
    floatOpt: number | null
    float: number | null
    decimal: Decimal | null
    decimalOpt: Decimal | null
    date: Date | null
    dateOpt: Date | null
    bigInt: bigint | null
    bigIntOpt: bigint | null
    bytes: Buffer | null
    bytesOpt: Buffer | null
  }

  export type TestCountAggregateOutputType = {
    id: number
    name: number
    value: number
    bic: number
    intTwo: number
    int: number
    floatOpt: number
    float: number
    decimal: number
    decimalOpt: number
    date: number
    dateOpt: number
    bigInt: number
    bigIntOpt: number
    json: number
    jsonOpt: number
    bytes: number
    bytesOpt: number
    _all: number
  }


  export type TestAvgAggregateInputType = {
    intTwo?: true
    int?: true
    floatOpt?: true
    float?: true
    decimal?: true
    decimalOpt?: true
    bigInt?: true
    bigIntOpt?: true
  }

  export type TestSumAggregateInputType = {
    intTwo?: true
    int?: true
    floatOpt?: true
    float?: true
    decimal?: true
    decimalOpt?: true
    bigInt?: true
    bigIntOpt?: true
  }

  export type TestMinAggregateInputType = {
    id?: true
    name?: true
    value?: true
    bic?: true
    intTwo?: true
    int?: true
    floatOpt?: true
    float?: true
    decimal?: true
    decimalOpt?: true
    date?: true
    dateOpt?: true
    bigInt?: true
    bigIntOpt?: true
    bytes?: true
    bytesOpt?: true
  }

  export type TestMaxAggregateInputType = {
    id?: true
    name?: true
    value?: true
    bic?: true
    intTwo?: true
    int?: true
    floatOpt?: true
    float?: true
    decimal?: true
    decimalOpt?: true
    date?: true
    dateOpt?: true
    bigInt?: true
    bigIntOpt?: true
    bytes?: true
    bytesOpt?: true
  }

  export type TestCountAggregateInputType = {
    id?: true
    name?: true
    value?: true
    bic?: true
    intTwo?: true
    int?: true
    floatOpt?: true
    float?: true
    decimal?: true
    decimalOpt?: true
    date?: true
    dateOpt?: true
    bigInt?: true
    bigIntOpt?: true
    json?: true
    jsonOpt?: true
    bytes?: true
    bytesOpt?: true
    _all?: true
  }

  export type TestAggregateArgs = {
    /**
     * Filter which Test to aggregate.
     * 
    **/
    where?: TestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tests to fetch.
     * 
    **/
    orderBy?: Enumerable<TestOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: TestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tests from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tests.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Tests
    **/
    _count?: true | TestCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TestAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TestSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TestMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TestMaxAggregateInputType
  }

  export type GetTestAggregateType<T extends TestAggregateArgs> = {
        [P in keyof T & keyof AggregateTest]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTest[P]>
      : GetScalarType<T[P], AggregateTest[P]>
  }




  export type TestGroupByArgs = {
    where?: TestWhereInput
    orderBy?: Enumerable<TestOrderByWithAggregationInput>
    by: Array<TestScalarFieldEnum>
    having?: TestScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TestCountAggregateInputType | true
    _avg?: TestAvgAggregateInputType
    _sum?: TestSumAggregateInputType
    _min?: TestMinAggregateInputType
    _max?: TestMaxAggregateInputType
  }


  export type TestGroupByOutputType = {
    id: string
    name: string | null
    value: MYValue
    bic: string | null
    intTwo: number
    int: number | null
    floatOpt: number | null
    float: number
    decimal: Decimal
    decimalOpt: Decimal | null
    date: Date
    dateOpt: Date | null
    bigInt: bigint
    bigIntOpt: bigint | null
    json: JsonValue
    jsonOpt: JsonValue | null
    bytes: Buffer
    bytesOpt: Buffer | null
    _count: TestCountAggregateOutputType | null
    _avg: TestAvgAggregateOutputType | null
    _sum: TestSumAggregateOutputType | null
    _min: TestMinAggregateOutputType | null
    _max: TestMaxAggregateOutputType | null
  }

  type GetTestGroupByPayload<T extends TestGroupByArgs> = PrismaPromise<
    Array<
      PickArray<TestGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TestGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TestGroupByOutputType[P]>
            : GetScalarType<T[P], TestGroupByOutputType[P]>
        }
      >
    >


  export type TestSelect = {
    id?: boolean
    name?: boolean
    value?: boolean
    bic?: boolean
    intTwo?: boolean
    int?: boolean
    floatOpt?: boolean
    float?: boolean
    decimal?: boolean
    decimalOpt?: boolean
    date?: boolean
    dateOpt?: boolean
    bigInt?: boolean
    bigIntOpt?: boolean
    json?: boolean
    jsonOpt?: boolean
    bytes?: boolean
    bytesOpt?: boolean
  }


  export type TestGetPayload<S extends boolean | null | undefined | TestArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? Test :
    S extends undefined ? never :
    S extends { include: any } & (TestArgs | TestFindManyArgs)
    ? Test 
    : S extends { select: any } & (TestArgs | TestFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
    P extends keyof Test ? Test[P] : never
  } 
      : Test


  type TestCountArgs = Merge<
    Omit<TestFindManyArgs, 'select' | 'include'> & {
      select?: TestCountAggregateInputType | true
    }
  >

  export interface TestDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one Test that matches the filter.
     * @param {TestFindUniqueArgs} args - Arguments to find a Test
     * @example
     * // Get one Test
     * const test = await prisma.test.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends TestFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, TestFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Test'> extends True ? Prisma__TestClient<TestGetPayload<T>> : Prisma__TestClient<TestGetPayload<T> | null, null>

    /**
     * Find one Test that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {TestFindUniqueOrThrowArgs} args - Arguments to find a Test
     * @example
     * // Get one Test
     * const test = await prisma.test.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends TestFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, TestFindUniqueOrThrowArgs>
    ): Prisma__TestClient<TestGetPayload<T>>

    /**
     * Find the first Test that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestFindFirstArgs} args - Arguments to find a Test
     * @example
     * // Get one Test
     * const test = await prisma.test.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends TestFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, TestFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Test'> extends True ? Prisma__TestClient<TestGetPayload<T>> : Prisma__TestClient<TestGetPayload<T> | null, null>

    /**
     * Find the first Test that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestFindFirstOrThrowArgs} args - Arguments to find a Test
     * @example
     * // Get one Test
     * const test = await prisma.test.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends TestFindFirstOrThrowArgs>(
      args?: SelectSubset<T, TestFindFirstOrThrowArgs>
    ): Prisma__TestClient<TestGetPayload<T>>

    /**
     * Find zero or more Tests that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tests
     * const tests = await prisma.test.findMany()
     * 
     * // Get first 10 Tests
     * const tests = await prisma.test.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const testWithIdOnly = await prisma.test.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends TestFindManyArgs>(
      args?: SelectSubset<T, TestFindManyArgs>
    ): PrismaPromise<Array<TestGetPayload<T>>>

    /**
     * Create a Test.
     * @param {TestCreateArgs} args - Arguments to create a Test.
     * @example
     * // Create one Test
     * const Test = await prisma.test.create({
     *   data: {
     *     // ... data to create a Test
     *   }
     * })
     * 
    **/
    create<T extends TestCreateArgs>(
      args: SelectSubset<T, TestCreateArgs>
    ): Prisma__TestClient<TestGetPayload<T>>

    /**
     * Create many Tests.
     *     @param {TestCreateManyArgs} args - Arguments to create many Tests.
     *     @example
     *     // Create many Tests
     *     const test = await prisma.test.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends TestCreateManyArgs>(
      args?: SelectSubset<T, TestCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Test.
     * @param {TestDeleteArgs} args - Arguments to delete one Test.
     * @example
     * // Delete one Test
     * const Test = await prisma.test.delete({
     *   where: {
     *     // ... filter to delete one Test
     *   }
     * })
     * 
    **/
    delete<T extends TestDeleteArgs>(
      args: SelectSubset<T, TestDeleteArgs>
    ): Prisma__TestClient<TestGetPayload<T>>

    /**
     * Update one Test.
     * @param {TestUpdateArgs} args - Arguments to update one Test.
     * @example
     * // Update one Test
     * const test = await prisma.test.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends TestUpdateArgs>(
      args: SelectSubset<T, TestUpdateArgs>
    ): Prisma__TestClient<TestGetPayload<T>>

    /**
     * Delete zero or more Tests.
     * @param {TestDeleteManyArgs} args - Arguments to filter Tests to delete.
     * @example
     * // Delete a few Tests
     * const { count } = await prisma.test.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends TestDeleteManyArgs>(
      args?: SelectSubset<T, TestDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tests
     * const test = await prisma.test.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends TestUpdateManyArgs>(
      args: SelectSubset<T, TestUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Test.
     * @param {TestUpsertArgs} args - Arguments to update or create a Test.
     * @example
     * // Update or create a Test
     * const test = await prisma.test.upsert({
     *   create: {
     *     // ... data to create a Test
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Test we want to update
     *   }
     * })
    **/
    upsert<T extends TestUpsertArgs>(
      args: SelectSubset<T, TestUpsertArgs>
    ): Prisma__TestClient<TestGetPayload<T>>

    /**
     * Count the number of Tests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestCountArgs} args - Arguments to filter Tests to count.
     * @example
     * // Count the number of Tests
     * const count = await prisma.test.count({
     *   where: {
     *     // ... the filter for the Tests we want to count
     *   }
     * })
    **/
    count<T extends TestCountArgs>(
      args?: Subset<T, TestCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TestCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Test.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TestAggregateArgs>(args: Subset<T, TestAggregateArgs>): PrismaPromise<GetTestAggregateType<T>>

    /**
     * Group by Test.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TestGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TestGroupByArgs['orderBy'] }
        : { orderBy?: TestGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TestGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTestGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for Test.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__TestClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';


    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * Test base type for findUnique actions
   */
  export type TestFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the Test
     * 
    **/
    select?: TestSelect | null
    /**
     * Filter, which Test to fetch.
     * 
    **/
    where: TestWhereUniqueInput
  }

  /**
   * Test: findUnique
   */
  export interface TestFindUniqueArgs extends TestFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Test findUniqueOrThrow
   */
  export type TestFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Test
     * 
    **/
    select?: TestSelect | null
    /**
     * Filter, which Test to fetch.
     * 
    **/
    where: TestWhereUniqueInput
  }


  /**
   * Test base type for findFirst actions
   */
  export type TestFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the Test
     * 
    **/
    select?: TestSelect | null
    /**
     * Filter, which Test to fetch.
     * 
    **/
    where?: TestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tests to fetch.
     * 
    **/
    orderBy?: Enumerable<TestOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tests.
     * 
    **/
    cursor?: TestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tests from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tests.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tests.
     * 
    **/
    distinct?: Enumerable<TestScalarFieldEnum>
  }

  /**
   * Test: findFirst
   */
  export interface TestFindFirstArgs extends TestFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Test findFirstOrThrow
   */
  export type TestFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Test
     * 
    **/
    select?: TestSelect | null
    /**
     * Filter, which Test to fetch.
     * 
    **/
    where?: TestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tests to fetch.
     * 
    **/
    orderBy?: Enumerable<TestOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tests.
     * 
    **/
    cursor?: TestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tests from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tests.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tests.
     * 
    **/
    distinct?: Enumerable<TestScalarFieldEnum>
  }


  /**
   * Test findMany
   */
  export type TestFindManyArgs = {
    /**
     * Select specific fields to fetch from the Test
     * 
    **/
    select?: TestSelect | null
    /**
     * Filter, which Tests to fetch.
     * 
    **/
    where?: TestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tests to fetch.
     * 
    **/
    orderBy?: Enumerable<TestOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Tests.
     * 
    **/
    cursor?: TestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tests from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tests.
     * 
    **/
    skip?: number
    distinct?: Enumerable<TestScalarFieldEnum>
  }


  /**
   * Test create
   */
  export type TestCreateArgs = {
    /**
     * Select specific fields to fetch from the Test
     * 
    **/
    select?: TestSelect | null
    /**
     * The data needed to create a Test.
     * 
    **/
    data: XOR<TestCreateInput, TestUncheckedCreateInput>
  }


  /**
   * Test createMany
   */
  export type TestCreateManyArgs = {
    /**
     * The data used to create many Tests.
     * 
    **/
    data: Enumerable<TestCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Test update
   */
  export type TestUpdateArgs = {
    /**
     * Select specific fields to fetch from the Test
     * 
    **/
    select?: TestSelect | null
    /**
     * The data needed to update a Test.
     * 
    **/
    data: XOR<TestUpdateInput, TestUncheckedUpdateInput>
    /**
     * Choose, which Test to update.
     * 
    **/
    where: TestWhereUniqueInput
  }


  /**
   * Test updateMany
   */
  export type TestUpdateManyArgs = {
    /**
     * The data used to update Tests.
     * 
    **/
    data: XOR<TestUpdateManyMutationInput, TestUncheckedUpdateManyInput>
    /**
     * Filter which Tests to update
     * 
    **/
    where?: TestWhereInput
  }


  /**
   * Test upsert
   */
  export type TestUpsertArgs = {
    /**
     * Select specific fields to fetch from the Test
     * 
    **/
    select?: TestSelect | null
    /**
     * The filter to search for the Test to update in case it exists.
     * 
    **/
    where: TestWhereUniqueInput
    /**
     * In case the Test found by the `where` argument doesn't exist, create a new Test with this data.
     * 
    **/
    create: XOR<TestCreateInput, TestUncheckedCreateInput>
    /**
     * In case the Test was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<TestUpdateInput, TestUncheckedUpdateInput>
  }


  /**
   * Test delete
   */
  export type TestDeleteArgs = {
    /**
     * Select specific fields to fetch from the Test
     * 
    **/
    select?: TestSelect | null
    /**
     * Filter which Test to delete.
     * 
    **/
    where: TestWhereUniqueInput
  }


  /**
   * Test deleteMany
   */
  export type TestDeleteManyArgs = {
    /**
     * Filter which Tests to delete
     * 
    **/
    where?: TestWhereInput
  }


  /**
   * Test without action
   */
  export type TestArgs = {
    /**
     * Select specific fields to fetch from the Test
     * 
    **/
    select?: TestSelect | null
  }



  /**
   * Model MyPrismaScalarsType
   */


  export type AggregateMyPrismaScalarsType = {
    _count: MyPrismaScalarsTypeCountAggregateOutputType | null
    _avg: MyPrismaScalarsTypeAvgAggregateOutputType | null
    _sum: MyPrismaScalarsTypeSumAggregateOutputType | null
    _min: MyPrismaScalarsTypeMinAggregateOutputType | null
    _max: MyPrismaScalarsTypeMaxAggregateOutputType | null
  }

  export type MyPrismaScalarsTypeAvgAggregateOutputType = {
    float: number | null
    decimal: Decimal | null
    bigInt: number | null
  }

  export type MyPrismaScalarsTypeSumAggregateOutputType = {
    float: number | null
    decimal: Decimal | null
    bigInt: bigint | null
  }

  export type MyPrismaScalarsTypeMinAggregateOutputType = {
    id: string | null
    string: string | null
    bic: string | null
    float: number | null
    decimal: Decimal | null
    date: Date | null
    bigInt: bigint | null
    bytes: Buffer | null
    custom: string | null
    exclude: string | null
  }

  export type MyPrismaScalarsTypeMaxAggregateOutputType = {
    id: string | null
    string: string | null
    bic: string | null
    float: number | null
    decimal: Decimal | null
    date: Date | null
    bigInt: bigint | null
    bytes: Buffer | null
    custom: string | null
    exclude: string | null
  }

  export type MyPrismaScalarsTypeCountAggregateOutputType = {
    id: number
    string: number
    bic: number
    float: number
    decimal: number
    date: number
    bigInt: number
    json: number
    bytes: number
    custom: number
    exclude: number
    _all: number
  }


  export type MyPrismaScalarsTypeAvgAggregateInputType = {
    float?: true
    decimal?: true
    bigInt?: true
  }

  export type MyPrismaScalarsTypeSumAggregateInputType = {
    float?: true
    decimal?: true
    bigInt?: true
  }

  export type MyPrismaScalarsTypeMinAggregateInputType = {
    id?: true
    string?: true
    bic?: true
    float?: true
    decimal?: true
    date?: true
    bigInt?: true
    bytes?: true
    custom?: true
    exclude?: true
  }

  export type MyPrismaScalarsTypeMaxAggregateInputType = {
    id?: true
    string?: true
    bic?: true
    float?: true
    decimal?: true
    date?: true
    bigInt?: true
    bytes?: true
    custom?: true
    exclude?: true
  }

  export type MyPrismaScalarsTypeCountAggregateInputType = {
    id?: true
    string?: true
    bic?: true
    float?: true
    decimal?: true
    date?: true
    bigInt?: true
    json?: true
    bytes?: true
    custom?: true
    exclude?: true
    _all?: true
  }

  export type MyPrismaScalarsTypeAggregateArgs = {
    /**
     * Filter which MyPrismaScalarsType to aggregate.
     * 
    **/
    where?: MyPrismaScalarsTypeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MyPrismaScalarsTypes to fetch.
     * 
    **/
    orderBy?: Enumerable<MyPrismaScalarsTypeOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: MyPrismaScalarsTypeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MyPrismaScalarsTypes from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MyPrismaScalarsTypes.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MyPrismaScalarsTypes
    **/
    _count?: true | MyPrismaScalarsTypeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MyPrismaScalarsTypeAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MyPrismaScalarsTypeSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MyPrismaScalarsTypeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MyPrismaScalarsTypeMaxAggregateInputType
  }

  export type GetMyPrismaScalarsTypeAggregateType<T extends MyPrismaScalarsTypeAggregateArgs> = {
        [P in keyof T & keyof AggregateMyPrismaScalarsType]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMyPrismaScalarsType[P]>
      : GetScalarType<T[P], AggregateMyPrismaScalarsType[P]>
  }




  export type MyPrismaScalarsTypeGroupByArgs = {
    where?: MyPrismaScalarsTypeWhereInput
    orderBy?: Enumerable<MyPrismaScalarsTypeOrderByWithAggregationInput>
    by: Array<MyPrismaScalarsTypeScalarFieldEnum>
    having?: MyPrismaScalarsTypeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MyPrismaScalarsTypeCountAggregateInputType | true
    _avg?: MyPrismaScalarsTypeAvgAggregateInputType
    _sum?: MyPrismaScalarsTypeSumAggregateInputType
    _min?: MyPrismaScalarsTypeMinAggregateInputType
    _max?: MyPrismaScalarsTypeMaxAggregateInputType
  }


  export type MyPrismaScalarsTypeGroupByOutputType = {
    id: string
    string: string | null
    bic: string | null
    float: number
    decimal: Decimal
    date: Date | null
    bigInt: bigint
    json: JsonValue
    bytes: Buffer
    custom: string | null
    exclude: string | null
    _count: MyPrismaScalarsTypeCountAggregateOutputType | null
    _avg: MyPrismaScalarsTypeAvgAggregateOutputType | null
    _sum: MyPrismaScalarsTypeSumAggregateOutputType | null
    _min: MyPrismaScalarsTypeMinAggregateOutputType | null
    _max: MyPrismaScalarsTypeMaxAggregateOutputType | null
  }

  type GetMyPrismaScalarsTypeGroupByPayload<T extends MyPrismaScalarsTypeGroupByArgs> = PrismaPromise<
    Array<
      PickArray<MyPrismaScalarsTypeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MyPrismaScalarsTypeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MyPrismaScalarsTypeGroupByOutputType[P]>
            : GetScalarType<T[P], MyPrismaScalarsTypeGroupByOutputType[P]>
        }
      >
    >


  export type MyPrismaScalarsTypeSelect = {
    id?: boolean
    string?: boolean
    bic?: boolean
    float?: boolean
    decimal?: boolean
    date?: boolean
    bigInt?: boolean
    json?: boolean
    bytes?: boolean
    custom?: boolean
    exclude?: boolean
  }


  export type MyPrismaScalarsTypeGetPayload<S extends boolean | null | undefined | MyPrismaScalarsTypeArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? MyPrismaScalarsType :
    S extends undefined ? never :
    S extends { include: any } & (MyPrismaScalarsTypeArgs | MyPrismaScalarsTypeFindManyArgs)
    ? MyPrismaScalarsType 
    : S extends { select: any } & (MyPrismaScalarsTypeArgs | MyPrismaScalarsTypeFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
    P extends keyof MyPrismaScalarsType ? MyPrismaScalarsType[P] : never
  } 
      : MyPrismaScalarsType


  type MyPrismaScalarsTypeCountArgs = Merge<
    Omit<MyPrismaScalarsTypeFindManyArgs, 'select' | 'include'> & {
      select?: MyPrismaScalarsTypeCountAggregateInputType | true
    }
  >

  export interface MyPrismaScalarsTypeDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one MyPrismaScalarsType that matches the filter.
     * @param {MyPrismaScalarsTypeFindUniqueArgs} args - Arguments to find a MyPrismaScalarsType
     * @example
     * // Get one MyPrismaScalarsType
     * const myPrismaScalarsType = await prisma.myPrismaScalarsType.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends MyPrismaScalarsTypeFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, MyPrismaScalarsTypeFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'MyPrismaScalarsType'> extends True ? Prisma__MyPrismaScalarsTypeClient<MyPrismaScalarsTypeGetPayload<T>> : Prisma__MyPrismaScalarsTypeClient<MyPrismaScalarsTypeGetPayload<T> | null, null>

    /**
     * Find one MyPrismaScalarsType that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {MyPrismaScalarsTypeFindUniqueOrThrowArgs} args - Arguments to find a MyPrismaScalarsType
     * @example
     * // Get one MyPrismaScalarsType
     * const myPrismaScalarsType = await prisma.myPrismaScalarsType.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends MyPrismaScalarsTypeFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, MyPrismaScalarsTypeFindUniqueOrThrowArgs>
    ): Prisma__MyPrismaScalarsTypeClient<MyPrismaScalarsTypeGetPayload<T>>

    /**
     * Find the first MyPrismaScalarsType that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MyPrismaScalarsTypeFindFirstArgs} args - Arguments to find a MyPrismaScalarsType
     * @example
     * // Get one MyPrismaScalarsType
     * const myPrismaScalarsType = await prisma.myPrismaScalarsType.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends MyPrismaScalarsTypeFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, MyPrismaScalarsTypeFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'MyPrismaScalarsType'> extends True ? Prisma__MyPrismaScalarsTypeClient<MyPrismaScalarsTypeGetPayload<T>> : Prisma__MyPrismaScalarsTypeClient<MyPrismaScalarsTypeGetPayload<T> | null, null>

    /**
     * Find the first MyPrismaScalarsType that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MyPrismaScalarsTypeFindFirstOrThrowArgs} args - Arguments to find a MyPrismaScalarsType
     * @example
     * // Get one MyPrismaScalarsType
     * const myPrismaScalarsType = await prisma.myPrismaScalarsType.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends MyPrismaScalarsTypeFindFirstOrThrowArgs>(
      args?: SelectSubset<T, MyPrismaScalarsTypeFindFirstOrThrowArgs>
    ): Prisma__MyPrismaScalarsTypeClient<MyPrismaScalarsTypeGetPayload<T>>

    /**
     * Find zero or more MyPrismaScalarsTypes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MyPrismaScalarsTypeFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MyPrismaScalarsTypes
     * const myPrismaScalarsTypes = await prisma.myPrismaScalarsType.findMany()
     * 
     * // Get first 10 MyPrismaScalarsTypes
     * const myPrismaScalarsTypes = await prisma.myPrismaScalarsType.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const myPrismaScalarsTypeWithIdOnly = await prisma.myPrismaScalarsType.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends MyPrismaScalarsTypeFindManyArgs>(
      args?: SelectSubset<T, MyPrismaScalarsTypeFindManyArgs>
    ): PrismaPromise<Array<MyPrismaScalarsTypeGetPayload<T>>>

    /**
     * Create a MyPrismaScalarsType.
     * @param {MyPrismaScalarsTypeCreateArgs} args - Arguments to create a MyPrismaScalarsType.
     * @example
     * // Create one MyPrismaScalarsType
     * const MyPrismaScalarsType = await prisma.myPrismaScalarsType.create({
     *   data: {
     *     // ... data to create a MyPrismaScalarsType
     *   }
     * })
     * 
    **/
    create<T extends MyPrismaScalarsTypeCreateArgs>(
      args: SelectSubset<T, MyPrismaScalarsTypeCreateArgs>
    ): Prisma__MyPrismaScalarsTypeClient<MyPrismaScalarsTypeGetPayload<T>>

    /**
     * Create many MyPrismaScalarsTypes.
     *     @param {MyPrismaScalarsTypeCreateManyArgs} args - Arguments to create many MyPrismaScalarsTypes.
     *     @example
     *     // Create many MyPrismaScalarsTypes
     *     const myPrismaScalarsType = await prisma.myPrismaScalarsType.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends MyPrismaScalarsTypeCreateManyArgs>(
      args?: SelectSubset<T, MyPrismaScalarsTypeCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a MyPrismaScalarsType.
     * @param {MyPrismaScalarsTypeDeleteArgs} args - Arguments to delete one MyPrismaScalarsType.
     * @example
     * // Delete one MyPrismaScalarsType
     * const MyPrismaScalarsType = await prisma.myPrismaScalarsType.delete({
     *   where: {
     *     // ... filter to delete one MyPrismaScalarsType
     *   }
     * })
     * 
    **/
    delete<T extends MyPrismaScalarsTypeDeleteArgs>(
      args: SelectSubset<T, MyPrismaScalarsTypeDeleteArgs>
    ): Prisma__MyPrismaScalarsTypeClient<MyPrismaScalarsTypeGetPayload<T>>

    /**
     * Update one MyPrismaScalarsType.
     * @param {MyPrismaScalarsTypeUpdateArgs} args - Arguments to update one MyPrismaScalarsType.
     * @example
     * // Update one MyPrismaScalarsType
     * const myPrismaScalarsType = await prisma.myPrismaScalarsType.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends MyPrismaScalarsTypeUpdateArgs>(
      args: SelectSubset<T, MyPrismaScalarsTypeUpdateArgs>
    ): Prisma__MyPrismaScalarsTypeClient<MyPrismaScalarsTypeGetPayload<T>>

    /**
     * Delete zero or more MyPrismaScalarsTypes.
     * @param {MyPrismaScalarsTypeDeleteManyArgs} args - Arguments to filter MyPrismaScalarsTypes to delete.
     * @example
     * // Delete a few MyPrismaScalarsTypes
     * const { count } = await prisma.myPrismaScalarsType.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends MyPrismaScalarsTypeDeleteManyArgs>(
      args?: SelectSubset<T, MyPrismaScalarsTypeDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more MyPrismaScalarsTypes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MyPrismaScalarsTypeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MyPrismaScalarsTypes
     * const myPrismaScalarsType = await prisma.myPrismaScalarsType.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends MyPrismaScalarsTypeUpdateManyArgs>(
      args: SelectSubset<T, MyPrismaScalarsTypeUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one MyPrismaScalarsType.
     * @param {MyPrismaScalarsTypeUpsertArgs} args - Arguments to update or create a MyPrismaScalarsType.
     * @example
     * // Update or create a MyPrismaScalarsType
     * const myPrismaScalarsType = await prisma.myPrismaScalarsType.upsert({
     *   create: {
     *     // ... data to create a MyPrismaScalarsType
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MyPrismaScalarsType we want to update
     *   }
     * })
    **/
    upsert<T extends MyPrismaScalarsTypeUpsertArgs>(
      args: SelectSubset<T, MyPrismaScalarsTypeUpsertArgs>
    ): Prisma__MyPrismaScalarsTypeClient<MyPrismaScalarsTypeGetPayload<T>>

    /**
     * Count the number of MyPrismaScalarsTypes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MyPrismaScalarsTypeCountArgs} args - Arguments to filter MyPrismaScalarsTypes to count.
     * @example
     * // Count the number of MyPrismaScalarsTypes
     * const count = await prisma.myPrismaScalarsType.count({
     *   where: {
     *     // ... the filter for the MyPrismaScalarsTypes we want to count
     *   }
     * })
    **/
    count<T extends MyPrismaScalarsTypeCountArgs>(
      args?: Subset<T, MyPrismaScalarsTypeCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MyPrismaScalarsTypeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MyPrismaScalarsType.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MyPrismaScalarsTypeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MyPrismaScalarsTypeAggregateArgs>(args: Subset<T, MyPrismaScalarsTypeAggregateArgs>): PrismaPromise<GetMyPrismaScalarsTypeAggregateType<T>>

    /**
     * Group by MyPrismaScalarsType.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MyPrismaScalarsTypeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MyPrismaScalarsTypeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MyPrismaScalarsTypeGroupByArgs['orderBy'] }
        : { orderBy?: MyPrismaScalarsTypeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MyPrismaScalarsTypeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMyPrismaScalarsTypeGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for MyPrismaScalarsType.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__MyPrismaScalarsTypeClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';


    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * MyPrismaScalarsType base type for findUnique actions
   */
  export type MyPrismaScalarsTypeFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the MyPrismaScalarsType
     * 
    **/
    select?: MyPrismaScalarsTypeSelect | null
    /**
     * Filter, which MyPrismaScalarsType to fetch.
     * 
    **/
    where: MyPrismaScalarsTypeWhereUniqueInput
  }

  /**
   * MyPrismaScalarsType: findUnique
   */
  export interface MyPrismaScalarsTypeFindUniqueArgs extends MyPrismaScalarsTypeFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * MyPrismaScalarsType findUniqueOrThrow
   */
  export type MyPrismaScalarsTypeFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the MyPrismaScalarsType
     * 
    **/
    select?: MyPrismaScalarsTypeSelect | null
    /**
     * Filter, which MyPrismaScalarsType to fetch.
     * 
    **/
    where: MyPrismaScalarsTypeWhereUniqueInput
  }


  /**
   * MyPrismaScalarsType base type for findFirst actions
   */
  export type MyPrismaScalarsTypeFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the MyPrismaScalarsType
     * 
    **/
    select?: MyPrismaScalarsTypeSelect | null
    /**
     * Filter, which MyPrismaScalarsType to fetch.
     * 
    **/
    where?: MyPrismaScalarsTypeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MyPrismaScalarsTypes to fetch.
     * 
    **/
    orderBy?: Enumerable<MyPrismaScalarsTypeOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MyPrismaScalarsTypes.
     * 
    **/
    cursor?: MyPrismaScalarsTypeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MyPrismaScalarsTypes from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MyPrismaScalarsTypes.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MyPrismaScalarsTypes.
     * 
    **/
    distinct?: Enumerable<MyPrismaScalarsTypeScalarFieldEnum>
  }

  /**
   * MyPrismaScalarsType: findFirst
   */
  export interface MyPrismaScalarsTypeFindFirstArgs extends MyPrismaScalarsTypeFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * MyPrismaScalarsType findFirstOrThrow
   */
  export type MyPrismaScalarsTypeFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the MyPrismaScalarsType
     * 
    **/
    select?: MyPrismaScalarsTypeSelect | null
    /**
     * Filter, which MyPrismaScalarsType to fetch.
     * 
    **/
    where?: MyPrismaScalarsTypeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MyPrismaScalarsTypes to fetch.
     * 
    **/
    orderBy?: Enumerable<MyPrismaScalarsTypeOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MyPrismaScalarsTypes.
     * 
    **/
    cursor?: MyPrismaScalarsTypeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MyPrismaScalarsTypes from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MyPrismaScalarsTypes.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MyPrismaScalarsTypes.
     * 
    **/
    distinct?: Enumerable<MyPrismaScalarsTypeScalarFieldEnum>
  }


  /**
   * MyPrismaScalarsType findMany
   */
  export type MyPrismaScalarsTypeFindManyArgs = {
    /**
     * Select specific fields to fetch from the MyPrismaScalarsType
     * 
    **/
    select?: MyPrismaScalarsTypeSelect | null
    /**
     * Filter, which MyPrismaScalarsTypes to fetch.
     * 
    **/
    where?: MyPrismaScalarsTypeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MyPrismaScalarsTypes to fetch.
     * 
    **/
    orderBy?: Enumerable<MyPrismaScalarsTypeOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MyPrismaScalarsTypes.
     * 
    **/
    cursor?: MyPrismaScalarsTypeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MyPrismaScalarsTypes from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MyPrismaScalarsTypes.
     * 
    **/
    skip?: number
    distinct?: Enumerable<MyPrismaScalarsTypeScalarFieldEnum>
  }


  /**
   * MyPrismaScalarsType create
   */
  export type MyPrismaScalarsTypeCreateArgs = {
    /**
     * Select specific fields to fetch from the MyPrismaScalarsType
     * 
    **/
    select?: MyPrismaScalarsTypeSelect | null
    /**
     * The data needed to create a MyPrismaScalarsType.
     * 
    **/
    data: XOR<MyPrismaScalarsTypeCreateInput, MyPrismaScalarsTypeUncheckedCreateInput>
  }


  /**
   * MyPrismaScalarsType createMany
   */
  export type MyPrismaScalarsTypeCreateManyArgs = {
    /**
     * The data used to create many MyPrismaScalarsTypes.
     * 
    **/
    data: Enumerable<MyPrismaScalarsTypeCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * MyPrismaScalarsType update
   */
  export type MyPrismaScalarsTypeUpdateArgs = {
    /**
     * Select specific fields to fetch from the MyPrismaScalarsType
     * 
    **/
    select?: MyPrismaScalarsTypeSelect | null
    /**
     * The data needed to update a MyPrismaScalarsType.
     * 
    **/
    data: XOR<MyPrismaScalarsTypeUpdateInput, MyPrismaScalarsTypeUncheckedUpdateInput>
    /**
     * Choose, which MyPrismaScalarsType to update.
     * 
    **/
    where: MyPrismaScalarsTypeWhereUniqueInput
  }


  /**
   * MyPrismaScalarsType updateMany
   */
  export type MyPrismaScalarsTypeUpdateManyArgs = {
    /**
     * The data used to update MyPrismaScalarsTypes.
     * 
    **/
    data: XOR<MyPrismaScalarsTypeUpdateManyMutationInput, MyPrismaScalarsTypeUncheckedUpdateManyInput>
    /**
     * Filter which MyPrismaScalarsTypes to update
     * 
    **/
    where?: MyPrismaScalarsTypeWhereInput
  }


  /**
   * MyPrismaScalarsType upsert
   */
  export type MyPrismaScalarsTypeUpsertArgs = {
    /**
     * Select specific fields to fetch from the MyPrismaScalarsType
     * 
    **/
    select?: MyPrismaScalarsTypeSelect | null
    /**
     * The filter to search for the MyPrismaScalarsType to update in case it exists.
     * 
    **/
    where: MyPrismaScalarsTypeWhereUniqueInput
    /**
     * In case the MyPrismaScalarsType found by the `where` argument doesn't exist, create a new MyPrismaScalarsType with this data.
     * 
    **/
    create: XOR<MyPrismaScalarsTypeCreateInput, MyPrismaScalarsTypeUncheckedCreateInput>
    /**
     * In case the MyPrismaScalarsType was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<MyPrismaScalarsTypeUpdateInput, MyPrismaScalarsTypeUncheckedUpdateInput>
  }


  /**
   * MyPrismaScalarsType delete
   */
  export type MyPrismaScalarsTypeDeleteArgs = {
    /**
     * Select specific fields to fetch from the MyPrismaScalarsType
     * 
    **/
    select?: MyPrismaScalarsTypeSelect | null
    /**
     * Filter which MyPrismaScalarsType to delete.
     * 
    **/
    where: MyPrismaScalarsTypeWhereUniqueInput
  }


  /**
   * MyPrismaScalarsType deleteMany
   */
  export type MyPrismaScalarsTypeDeleteManyArgs = {
    /**
     * Filter which MyPrismaScalarsTypes to delete
     * 
    **/
    where?: MyPrismaScalarsTypeWhereInput
  }


  /**
   * MyPrismaScalarsType without action
   */
  export type MyPrismaScalarsTypeArgs = {
    /**
     * Select specific fields to fetch from the MyPrismaScalarsType
     * 
    **/
    select?: MyPrismaScalarsTypeSelect | null
  }



  /**
   * Model User
   */


  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    lat: number | null
    lng: number | null
  }

  export type UserSumAggregateOutputType = {
    lat: number | null
    lng: number | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    enum: AnotherEnum | null
    lat: number | null
    lng: number | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    enum: AnotherEnum | null
    lat: number | null
    lng: number | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    name: number
    role: number
    enum: number
    scalarList: number
    lat: number
    lng: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    lat?: true
    lng?: true
  }

  export type UserSumAggregateInputType = {
    lat?: true
    lng?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    name?: true
    enum?: true
    lat?: true
    lng?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    name?: true
    enum?: true
    lat?: true
    lng?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    name?: true
    role?: true
    enum?: true
    scalarList?: true
    lat?: true
    lng?: true
    _all?: true
  }

  export type UserAggregateArgs = {
    /**
     * Filter which User to aggregate.
     * 
    **/
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     * 
    **/
    orderBy?: Enumerable<UserOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs = {
    where?: UserWhereInput
    orderBy?: Enumerable<UserOrderByWithAggregationInput>
    by: Array<UserScalarFieldEnum>
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }


  export type UserGroupByOutputType = {
    id: string
    email: string
    name: string | null
    role: Role[]
    enum: AnotherEnum
    scalarList: string[]
    lat: number
    lng: number
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = PrismaPromise<
    Array<
      PickArray<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect = {
    id?: boolean
    email?: boolean
    name?: boolean
    posts?: boolean | PostFindManyArgs
    profile?: boolean | ProfileArgs
    role?: boolean
    enum?: boolean
    scalarList?: boolean
    lat?: boolean
    lng?: boolean
    location?: boolean | LocationArgs
    _count?: boolean | UserCountOutputTypeArgs
  }


  export type UserInclude = {
    posts?: boolean | PostFindManyArgs
    profile?: boolean | ProfileArgs
    location?: boolean | LocationArgs
    _count?: boolean | UserCountOutputTypeArgs
  } 

  export type UserGetPayload<S extends boolean | null | undefined | UserArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? User :
    S extends undefined ? never :
    S extends { include: any } & (UserArgs | UserFindManyArgs)
    ? User  & {
    [P in TruthyKeys<S['include']>]:
        P extends 'posts' ? Array < PostGetPayload<S['include'][P]>>  :
        P extends 'profile' ? ProfileGetPayload<S['include'][P]> | null :
        P extends 'location' ? LocationGetPayload<S['include'][P]> | null :
        P extends '_count' ? UserCountOutputTypeGetPayload<S['include'][P]> :  never
  } 
    : S extends { select: any } & (UserArgs | UserFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
        P extends 'posts' ? Array < PostGetPayload<S['select'][P]>>  :
        P extends 'profile' ? ProfileGetPayload<S['select'][P]> | null :
        P extends 'location' ? LocationGetPayload<S['select'][P]> | null :
        P extends '_count' ? UserCountOutputTypeGetPayload<S['select'][P]> :  P extends keyof User ? User[P] : never
  } 
      : User


  type UserCountArgs = Merge<
    Omit<UserFindManyArgs, 'select' | 'include'> & {
      select?: UserCountAggregateInputType | true
    }
  >

  export interface UserDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends UserFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, UserFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'User'> extends True ? Prisma__UserClient<UserGetPayload<T>> : Prisma__UserClient<UserGetPayload<T> | null, null>

    /**
     * Find one User that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, UserFindUniqueOrThrowArgs>
    ): Prisma__UserClient<UserGetPayload<T>>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends UserFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, UserFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'User'> extends True ? Prisma__UserClient<UserGetPayload<T>> : Prisma__UserClient<UserGetPayload<T> | null, null>

    /**
     * Find the first User that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(
      args?: SelectSubset<T, UserFindFirstOrThrowArgs>
    ): Prisma__UserClient<UserGetPayload<T>>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends UserFindManyArgs>(
      args?: SelectSubset<T, UserFindManyArgs>
    ): PrismaPromise<Array<UserGetPayload<T>>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
    **/
    create<T extends UserCreateArgs>(
      args: SelectSubset<T, UserCreateArgs>
    ): Prisma__UserClient<UserGetPayload<T>>

    /**
     * Create many Users.
     *     @param {UserCreateManyArgs} args - Arguments to create many Users.
     *     @example
     *     // Create many Users
     *     const user = await prisma.user.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends UserCreateManyArgs>(
      args?: SelectSubset<T, UserCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
    **/
    delete<T extends UserDeleteArgs>(
      args: SelectSubset<T, UserDeleteArgs>
    ): Prisma__UserClient<UserGetPayload<T>>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends UserUpdateArgs>(
      args: SelectSubset<T, UserUpdateArgs>
    ): Prisma__UserClient<UserGetPayload<T>>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends UserDeleteManyArgs>(
      args?: SelectSubset<T, UserDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends UserUpdateManyArgs>(
      args: SelectSubset<T, UserUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
    **/
    upsert<T extends UserUpsertArgs>(
      args: SelectSubset<T, UserUpsertArgs>
    ): Prisma__UserClient<UserGetPayload<T>>

    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__UserClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    posts<T extends PostFindManyArgs= {}>(args?: Subset<T, PostFindManyArgs>): PrismaPromise<Array<PostGetPayload<T>>| Null>;

    profile<T extends ProfileArgs= {}>(args?: Subset<T, ProfileArgs>): Prisma__ProfileClient<ProfileGetPayload<T> | Null>;

    location<T extends LocationArgs= {}>(args?: Subset<T, LocationArgs>): Prisma__LocationClient<LocationGetPayload<T> | Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * User base type for findUnique actions
   */
  export type UserFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * Filter, which User to fetch.
     * 
    **/
    where: UserWhereUniqueInput
  }

  /**
   * User: findUnique
   */
  export interface UserFindUniqueArgs extends UserFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * Filter, which User to fetch.
     * 
    **/
    where: UserWhereUniqueInput
  }


  /**
   * User base type for findFirst actions
   */
  export type UserFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * Filter, which User to fetch.
     * 
    **/
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     * 
    **/
    orderBy?: Enumerable<UserOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     * 
    **/
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     * 
    **/
    distinct?: Enumerable<UserScalarFieldEnum>
  }

  /**
   * User: findFirst
   */
  export interface UserFindFirstArgs extends UserFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * Filter, which User to fetch.
     * 
    **/
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     * 
    **/
    orderBy?: Enumerable<UserOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     * 
    **/
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     * 
    **/
    distinct?: Enumerable<UserScalarFieldEnum>
  }


  /**
   * User findMany
   */
  export type UserFindManyArgs = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * Filter, which Users to fetch.
     * 
    **/
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     * 
    **/
    orderBy?: Enumerable<UserOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     * 
    **/
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     * 
    **/
    skip?: number
    distinct?: Enumerable<UserScalarFieldEnum>
  }


  /**
   * User create
   */
  export type UserCreateArgs = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * The data needed to create a User.
     * 
    **/
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }


  /**
   * User createMany
   */
  export type UserCreateManyArgs = {
    /**
     * The data used to create many Users.
     * 
    **/
    data: Enumerable<UserCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * User update
   */
  export type UserUpdateArgs = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * The data needed to update a User.
     * 
    **/
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     * 
    **/
    where: UserWhereUniqueInput
  }


  /**
   * User updateMany
   */
  export type UserUpdateManyArgs = {
    /**
     * The data used to update Users.
     * 
    **/
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     * 
    **/
    where?: UserWhereInput
  }


  /**
   * User upsert
   */
  export type UserUpsertArgs = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * The filter to search for the User to update in case it exists.
     * 
    **/
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     * 
    **/
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }


  /**
   * User delete
   */
  export type UserDeleteArgs = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * Filter which User to delete.
     * 
    **/
    where: UserWhereUniqueInput
  }


  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs = {
    /**
     * Filter which Users to delete
     * 
    **/
    where?: UserWhereInput
  }


  /**
   * User without action
   */
  export type UserArgs = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
  }



  /**
   * Model Post
   */


  export type AggregatePost = {
    _count: PostCountAggregateOutputType | null
    _avg: PostAvgAggregateOutputType | null
    _sum: PostSumAggregateOutputType | null
    _min: PostMinAggregateOutputType | null
    _max: PostMaxAggregateOutputType | null
  }

  export type PostAvgAggregateOutputType = {
    id: number | null
  }

  export type PostSumAggregateOutputType = {
    id: number | null
  }

  export type PostMinAggregateOutputType = {
    id: number | null
    title: string | null
    content: string | null
    published: boolean | null
    authorId: string | null
  }

  export type PostMaxAggregateOutputType = {
    id: number | null
    title: string | null
    content: string | null
    published: boolean | null
    authorId: string | null
  }

  export type PostCountAggregateOutputType = {
    id: number
    title: number
    content: number
    published: number
    authorId: number
    anotherEnum: number
    _all: number
  }


  export type PostAvgAggregateInputType = {
    id?: true
  }

  export type PostSumAggregateInputType = {
    id?: true
  }

  export type PostMinAggregateInputType = {
    id?: true
    title?: true
    content?: true
    published?: true
    authorId?: true
  }

  export type PostMaxAggregateInputType = {
    id?: true
    title?: true
    content?: true
    published?: true
    authorId?: true
  }

  export type PostCountAggregateInputType = {
    id?: true
    title?: true
    content?: true
    published?: true
    authorId?: true
    anotherEnum?: true
    _all?: true
  }

  export type PostAggregateArgs = {
    /**
     * Filter which Post to aggregate.
     * 
    **/
    where?: PostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Posts to fetch.
     * 
    **/
    orderBy?: Enumerable<PostOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: PostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Posts from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Posts.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Posts
    **/
    _count?: true | PostCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PostAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PostSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PostMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PostMaxAggregateInputType
  }

  export type GetPostAggregateType<T extends PostAggregateArgs> = {
        [P in keyof T & keyof AggregatePost]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePost[P]>
      : GetScalarType<T[P], AggregatePost[P]>
  }




  export type PostGroupByArgs = {
    where?: PostWhereInput
    orderBy?: Enumerable<PostOrderByWithAggregationInput>
    by: Array<PostScalarFieldEnum>
    having?: PostScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PostCountAggregateInputType | true
    _avg?: PostAvgAggregateInputType
    _sum?: PostSumAggregateInputType
    _min?: PostMinAggregateInputType
    _max?: PostMaxAggregateInputType
  }


  export type PostGroupByOutputType = {
    id: number
    title: string
    content: string | null
    published: boolean
    authorId: string
    anotherEnum: AnotherEnum[]
    _count: PostCountAggregateOutputType | null
    _avg: PostAvgAggregateOutputType | null
    _sum: PostSumAggregateOutputType | null
    _min: PostMinAggregateOutputType | null
    _max: PostMaxAggregateOutputType | null
  }

  type GetPostGroupByPayload<T extends PostGroupByArgs> = PrismaPromise<
    Array<
      PickArray<PostGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PostGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PostGroupByOutputType[P]>
            : GetScalarType<T[P], PostGroupByOutputType[P]>
        }
      >
    >


  export type PostSelect = {
    id?: boolean
    title?: boolean
    content?: boolean
    published?: boolean
    author?: boolean | UserArgs
    authorId?: boolean
    anotherEnum?: boolean
  }


  export type PostInclude = {
    author?: boolean | UserArgs
  } 

  export type PostGetPayload<S extends boolean | null | undefined | PostArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? Post :
    S extends undefined ? never :
    S extends { include: any } & (PostArgs | PostFindManyArgs)
    ? Post  & {
    [P in TruthyKeys<S['include']>]:
        P extends 'author' ? UserGetPayload<S['include'][P]> :  never
  } 
    : S extends { select: any } & (PostArgs | PostFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
        P extends 'author' ? UserGetPayload<S['select'][P]> :  P extends keyof Post ? Post[P] : never
  } 
      : Post


  type PostCountArgs = Merge<
    Omit<PostFindManyArgs, 'select' | 'include'> & {
      select?: PostCountAggregateInputType | true
    }
  >

  export interface PostDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one Post that matches the filter.
     * @param {PostFindUniqueArgs} args - Arguments to find a Post
     * @example
     * // Get one Post
     * const post = await prisma.post.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends PostFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, PostFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Post'> extends True ? Prisma__PostClient<PostGetPayload<T>> : Prisma__PostClient<PostGetPayload<T> | null, null>

    /**
     * Find one Post that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {PostFindUniqueOrThrowArgs} args - Arguments to find a Post
     * @example
     * // Get one Post
     * const post = await prisma.post.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends PostFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, PostFindUniqueOrThrowArgs>
    ): Prisma__PostClient<PostGetPayload<T>>

    /**
     * Find the first Post that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostFindFirstArgs} args - Arguments to find a Post
     * @example
     * // Get one Post
     * const post = await prisma.post.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends PostFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, PostFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Post'> extends True ? Prisma__PostClient<PostGetPayload<T>> : Prisma__PostClient<PostGetPayload<T> | null, null>

    /**
     * Find the first Post that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostFindFirstOrThrowArgs} args - Arguments to find a Post
     * @example
     * // Get one Post
     * const post = await prisma.post.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends PostFindFirstOrThrowArgs>(
      args?: SelectSubset<T, PostFindFirstOrThrowArgs>
    ): Prisma__PostClient<PostGetPayload<T>>

    /**
     * Find zero or more Posts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Posts
     * const posts = await prisma.post.findMany()
     * 
     * // Get first 10 Posts
     * const posts = await prisma.post.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const postWithIdOnly = await prisma.post.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends PostFindManyArgs>(
      args?: SelectSubset<T, PostFindManyArgs>
    ): PrismaPromise<Array<PostGetPayload<T>>>

    /**
     * Create a Post.
     * @param {PostCreateArgs} args - Arguments to create a Post.
     * @example
     * // Create one Post
     * const Post = await prisma.post.create({
     *   data: {
     *     // ... data to create a Post
     *   }
     * })
     * 
    **/
    create<T extends PostCreateArgs>(
      args: SelectSubset<T, PostCreateArgs>
    ): Prisma__PostClient<PostGetPayload<T>>

    /**
     * Create many Posts.
     *     @param {PostCreateManyArgs} args - Arguments to create many Posts.
     *     @example
     *     // Create many Posts
     *     const post = await prisma.post.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends PostCreateManyArgs>(
      args?: SelectSubset<T, PostCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Post.
     * @param {PostDeleteArgs} args - Arguments to delete one Post.
     * @example
     * // Delete one Post
     * const Post = await prisma.post.delete({
     *   where: {
     *     // ... filter to delete one Post
     *   }
     * })
     * 
    **/
    delete<T extends PostDeleteArgs>(
      args: SelectSubset<T, PostDeleteArgs>
    ): Prisma__PostClient<PostGetPayload<T>>

    /**
     * Update one Post.
     * @param {PostUpdateArgs} args - Arguments to update one Post.
     * @example
     * // Update one Post
     * const post = await prisma.post.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends PostUpdateArgs>(
      args: SelectSubset<T, PostUpdateArgs>
    ): Prisma__PostClient<PostGetPayload<T>>

    /**
     * Delete zero or more Posts.
     * @param {PostDeleteManyArgs} args - Arguments to filter Posts to delete.
     * @example
     * // Delete a few Posts
     * const { count } = await prisma.post.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends PostDeleteManyArgs>(
      args?: SelectSubset<T, PostDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Posts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Posts
     * const post = await prisma.post.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends PostUpdateManyArgs>(
      args: SelectSubset<T, PostUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Post.
     * @param {PostUpsertArgs} args - Arguments to update or create a Post.
     * @example
     * // Update or create a Post
     * const post = await prisma.post.upsert({
     *   create: {
     *     // ... data to create a Post
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Post we want to update
     *   }
     * })
    **/
    upsert<T extends PostUpsertArgs>(
      args: SelectSubset<T, PostUpsertArgs>
    ): Prisma__PostClient<PostGetPayload<T>>

    /**
     * Count the number of Posts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostCountArgs} args - Arguments to filter Posts to count.
     * @example
     * // Count the number of Posts
     * const count = await prisma.post.count({
     *   where: {
     *     // ... the filter for the Posts we want to count
     *   }
     * })
    **/
    count<T extends PostCountArgs>(
      args?: Subset<T, PostCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PostCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Post.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PostAggregateArgs>(args: Subset<T, PostAggregateArgs>): PrismaPromise<GetPostAggregateType<T>>

    /**
     * Group by Post.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PostGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PostGroupByArgs['orderBy'] }
        : { orderBy?: PostGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PostGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPostGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for Post.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__PostClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    author<T extends UserArgs= {}>(args?: Subset<T, UserArgs>): Prisma__UserClient<UserGetPayload<T> | Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * Post base type for findUnique actions
   */
  export type PostFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the Post
     * 
    **/
    select?: PostSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PostInclude | null
    /**
     * Filter, which Post to fetch.
     * 
    **/
    where: PostWhereUniqueInput
  }

  /**
   * Post: findUnique
   */
  export interface PostFindUniqueArgs extends PostFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Post findUniqueOrThrow
   */
  export type PostFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Post
     * 
    **/
    select?: PostSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PostInclude | null
    /**
     * Filter, which Post to fetch.
     * 
    **/
    where: PostWhereUniqueInput
  }


  /**
   * Post base type for findFirst actions
   */
  export type PostFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the Post
     * 
    **/
    select?: PostSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PostInclude | null
    /**
     * Filter, which Post to fetch.
     * 
    **/
    where?: PostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Posts to fetch.
     * 
    **/
    orderBy?: Enumerable<PostOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Posts.
     * 
    **/
    cursor?: PostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Posts from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Posts.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Posts.
     * 
    **/
    distinct?: Enumerable<PostScalarFieldEnum>
  }

  /**
   * Post: findFirst
   */
  export interface PostFindFirstArgs extends PostFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Post findFirstOrThrow
   */
  export type PostFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Post
     * 
    **/
    select?: PostSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PostInclude | null
    /**
     * Filter, which Post to fetch.
     * 
    **/
    where?: PostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Posts to fetch.
     * 
    **/
    orderBy?: Enumerable<PostOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Posts.
     * 
    **/
    cursor?: PostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Posts from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Posts.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Posts.
     * 
    **/
    distinct?: Enumerable<PostScalarFieldEnum>
  }


  /**
   * Post findMany
   */
  export type PostFindManyArgs = {
    /**
     * Select specific fields to fetch from the Post
     * 
    **/
    select?: PostSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PostInclude | null
    /**
     * Filter, which Posts to fetch.
     * 
    **/
    where?: PostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Posts to fetch.
     * 
    **/
    orderBy?: Enumerable<PostOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Posts.
     * 
    **/
    cursor?: PostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Posts from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Posts.
     * 
    **/
    skip?: number
    distinct?: Enumerable<PostScalarFieldEnum>
  }


  /**
   * Post create
   */
  export type PostCreateArgs = {
    /**
     * Select specific fields to fetch from the Post
     * 
    **/
    select?: PostSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PostInclude | null
    /**
     * The data needed to create a Post.
     * 
    **/
    data: XOR<PostCreateInput, PostUncheckedCreateInput>
  }


  /**
   * Post createMany
   */
  export type PostCreateManyArgs = {
    /**
     * The data used to create many Posts.
     * 
    **/
    data: Enumerable<PostCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Post update
   */
  export type PostUpdateArgs = {
    /**
     * Select specific fields to fetch from the Post
     * 
    **/
    select?: PostSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PostInclude | null
    /**
     * The data needed to update a Post.
     * 
    **/
    data: XOR<PostUpdateInput, PostUncheckedUpdateInput>
    /**
     * Choose, which Post to update.
     * 
    **/
    where: PostWhereUniqueInput
  }


  /**
   * Post updateMany
   */
  export type PostUpdateManyArgs = {
    /**
     * The data used to update Posts.
     * 
    **/
    data: XOR<PostUpdateManyMutationInput, PostUncheckedUpdateManyInput>
    /**
     * Filter which Posts to update
     * 
    **/
    where?: PostWhereInput
  }


  /**
   * Post upsert
   */
  export type PostUpsertArgs = {
    /**
     * Select specific fields to fetch from the Post
     * 
    **/
    select?: PostSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PostInclude | null
    /**
     * The filter to search for the Post to update in case it exists.
     * 
    **/
    where: PostWhereUniqueInput
    /**
     * In case the Post found by the `where` argument doesn't exist, create a new Post with this data.
     * 
    **/
    create: XOR<PostCreateInput, PostUncheckedCreateInput>
    /**
     * In case the Post was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<PostUpdateInput, PostUncheckedUpdateInput>
  }


  /**
   * Post delete
   */
  export type PostDeleteArgs = {
    /**
     * Select specific fields to fetch from the Post
     * 
    **/
    select?: PostSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PostInclude | null
    /**
     * Filter which Post to delete.
     * 
    **/
    where: PostWhereUniqueInput
  }


  /**
   * Post deleteMany
   */
  export type PostDeleteManyArgs = {
    /**
     * Filter which Posts to delete
     * 
    **/
    where?: PostWhereInput
  }


  /**
   * Post without action
   */
  export type PostArgs = {
    /**
     * Select specific fields to fetch from the Post
     * 
    **/
    select?: PostSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PostInclude | null
  }



  /**
   * Model Profile
   */


  export type AggregateProfile = {
    _count: ProfileCountAggregateOutputType | null
    _avg: ProfileAvgAggregateOutputType | null
    _sum: ProfileSumAggregateOutputType | null
    _min: ProfileMinAggregateOutputType | null
    _max: ProfileMaxAggregateOutputType | null
  }

  export type ProfileAvgAggregateOutputType = {
    id: number | null
  }

  export type ProfileSumAggregateOutputType = {
    id: number | null
  }

  export type ProfileMinAggregateOutputType = {
    id: number | null
    bio: string | null
    userId: string | null
    second: SecondEnum | null
  }

  export type ProfileMaxAggregateOutputType = {
    id: number | null
    bio: string | null
    userId: string | null
    second: SecondEnum | null
  }

  export type ProfileCountAggregateOutputType = {
    id: number
    bio: number
    userId: number
    role: number
    second: number
    _all: number
  }


  export type ProfileAvgAggregateInputType = {
    id?: true
  }

  export type ProfileSumAggregateInputType = {
    id?: true
  }

  export type ProfileMinAggregateInputType = {
    id?: true
    bio?: true
    userId?: true
    second?: true
  }

  export type ProfileMaxAggregateInputType = {
    id?: true
    bio?: true
    userId?: true
    second?: true
  }

  export type ProfileCountAggregateInputType = {
    id?: true
    bio?: true
    userId?: true
    role?: true
    second?: true
    _all?: true
  }

  export type ProfileAggregateArgs = {
    /**
     * Filter which Profile to aggregate.
     * 
    **/
    where?: ProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Profiles to fetch.
     * 
    **/
    orderBy?: Enumerable<ProfileOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: ProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Profiles from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Profiles.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Profiles
    **/
    _count?: true | ProfileCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProfileAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProfileSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProfileMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProfileMaxAggregateInputType
  }

  export type GetProfileAggregateType<T extends ProfileAggregateArgs> = {
        [P in keyof T & keyof AggregateProfile]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProfile[P]>
      : GetScalarType<T[P], AggregateProfile[P]>
  }




  export type ProfileGroupByArgs = {
    where?: ProfileWhereInput
    orderBy?: Enumerable<ProfileOrderByWithAggregationInput>
    by: Array<ProfileScalarFieldEnum>
    having?: ProfileScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProfileCountAggregateInputType | true
    _avg?: ProfileAvgAggregateInputType
    _sum?: ProfileSumAggregateInputType
    _min?: ProfileMinAggregateInputType
    _max?: ProfileMaxAggregateInputType
  }


  export type ProfileGroupByOutputType = {
    id: number
    bio: string
    userId: string
    role: Role[]
    second: SecondEnum
    _count: ProfileCountAggregateOutputType | null
    _avg: ProfileAvgAggregateOutputType | null
    _sum: ProfileSumAggregateOutputType | null
    _min: ProfileMinAggregateOutputType | null
    _max: ProfileMaxAggregateOutputType | null
  }

  type GetProfileGroupByPayload<T extends ProfileGroupByArgs> = PrismaPromise<
    Array<
      PickArray<ProfileGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProfileGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProfileGroupByOutputType[P]>
            : GetScalarType<T[P], ProfileGroupByOutputType[P]>
        }
      >
    >


  export type ProfileSelect = {
    id?: boolean
    bio?: boolean
    user?: boolean | UserArgs
    userId?: boolean
    role?: boolean
    second?: boolean
  }


  export type ProfileInclude = {
    user?: boolean | UserArgs
  } 

  export type ProfileGetPayload<S extends boolean | null | undefined | ProfileArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? Profile :
    S extends undefined ? never :
    S extends { include: any } & (ProfileArgs | ProfileFindManyArgs)
    ? Profile  & {
    [P in TruthyKeys<S['include']>]:
        P extends 'user' ? UserGetPayload<S['include'][P]> :  never
  } 
    : S extends { select: any } & (ProfileArgs | ProfileFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
        P extends 'user' ? UserGetPayload<S['select'][P]> :  P extends keyof Profile ? Profile[P] : never
  } 
      : Profile


  type ProfileCountArgs = Merge<
    Omit<ProfileFindManyArgs, 'select' | 'include'> & {
      select?: ProfileCountAggregateInputType | true
    }
  >

  export interface ProfileDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one Profile that matches the filter.
     * @param {ProfileFindUniqueArgs} args - Arguments to find a Profile
     * @example
     * // Get one Profile
     * const profile = await prisma.profile.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends ProfileFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, ProfileFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Profile'> extends True ? Prisma__ProfileClient<ProfileGetPayload<T>> : Prisma__ProfileClient<ProfileGetPayload<T> | null, null>

    /**
     * Find one Profile that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {ProfileFindUniqueOrThrowArgs} args - Arguments to find a Profile
     * @example
     * // Get one Profile
     * const profile = await prisma.profile.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends ProfileFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, ProfileFindUniqueOrThrowArgs>
    ): Prisma__ProfileClient<ProfileGetPayload<T>>

    /**
     * Find the first Profile that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileFindFirstArgs} args - Arguments to find a Profile
     * @example
     * // Get one Profile
     * const profile = await prisma.profile.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends ProfileFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, ProfileFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Profile'> extends True ? Prisma__ProfileClient<ProfileGetPayload<T>> : Prisma__ProfileClient<ProfileGetPayload<T> | null, null>

    /**
     * Find the first Profile that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileFindFirstOrThrowArgs} args - Arguments to find a Profile
     * @example
     * // Get one Profile
     * const profile = await prisma.profile.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends ProfileFindFirstOrThrowArgs>(
      args?: SelectSubset<T, ProfileFindFirstOrThrowArgs>
    ): Prisma__ProfileClient<ProfileGetPayload<T>>

    /**
     * Find zero or more Profiles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Profiles
     * const profiles = await prisma.profile.findMany()
     * 
     * // Get first 10 Profiles
     * const profiles = await prisma.profile.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const profileWithIdOnly = await prisma.profile.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends ProfileFindManyArgs>(
      args?: SelectSubset<T, ProfileFindManyArgs>
    ): PrismaPromise<Array<ProfileGetPayload<T>>>

    /**
     * Create a Profile.
     * @param {ProfileCreateArgs} args - Arguments to create a Profile.
     * @example
     * // Create one Profile
     * const Profile = await prisma.profile.create({
     *   data: {
     *     // ... data to create a Profile
     *   }
     * })
     * 
    **/
    create<T extends ProfileCreateArgs>(
      args: SelectSubset<T, ProfileCreateArgs>
    ): Prisma__ProfileClient<ProfileGetPayload<T>>

    /**
     * Create many Profiles.
     *     @param {ProfileCreateManyArgs} args - Arguments to create many Profiles.
     *     @example
     *     // Create many Profiles
     *     const profile = await prisma.profile.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends ProfileCreateManyArgs>(
      args?: SelectSubset<T, ProfileCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Profile.
     * @param {ProfileDeleteArgs} args - Arguments to delete one Profile.
     * @example
     * // Delete one Profile
     * const Profile = await prisma.profile.delete({
     *   where: {
     *     // ... filter to delete one Profile
     *   }
     * })
     * 
    **/
    delete<T extends ProfileDeleteArgs>(
      args: SelectSubset<T, ProfileDeleteArgs>
    ): Prisma__ProfileClient<ProfileGetPayload<T>>

    /**
     * Update one Profile.
     * @param {ProfileUpdateArgs} args - Arguments to update one Profile.
     * @example
     * // Update one Profile
     * const profile = await prisma.profile.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends ProfileUpdateArgs>(
      args: SelectSubset<T, ProfileUpdateArgs>
    ): Prisma__ProfileClient<ProfileGetPayload<T>>

    /**
     * Delete zero or more Profiles.
     * @param {ProfileDeleteManyArgs} args - Arguments to filter Profiles to delete.
     * @example
     * // Delete a few Profiles
     * const { count } = await prisma.profile.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends ProfileDeleteManyArgs>(
      args?: SelectSubset<T, ProfileDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Profiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Profiles
     * const profile = await prisma.profile.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends ProfileUpdateManyArgs>(
      args: SelectSubset<T, ProfileUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Profile.
     * @param {ProfileUpsertArgs} args - Arguments to update or create a Profile.
     * @example
     * // Update or create a Profile
     * const profile = await prisma.profile.upsert({
     *   create: {
     *     // ... data to create a Profile
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Profile we want to update
     *   }
     * })
    **/
    upsert<T extends ProfileUpsertArgs>(
      args: SelectSubset<T, ProfileUpsertArgs>
    ): Prisma__ProfileClient<ProfileGetPayload<T>>

    /**
     * Count the number of Profiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileCountArgs} args - Arguments to filter Profiles to count.
     * @example
     * // Count the number of Profiles
     * const count = await prisma.profile.count({
     *   where: {
     *     // ... the filter for the Profiles we want to count
     *   }
     * })
    **/
    count<T extends ProfileCountArgs>(
      args?: Subset<T, ProfileCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProfileCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Profile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProfileAggregateArgs>(args: Subset<T, ProfileAggregateArgs>): PrismaPromise<GetProfileAggregateType<T>>

    /**
     * Group by Profile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfileGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProfileGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProfileGroupByArgs['orderBy'] }
        : { orderBy?: ProfileGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProfileGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProfileGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for Profile.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__ProfileClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    user<T extends UserArgs= {}>(args?: Subset<T, UserArgs>): Prisma__UserClient<UserGetPayload<T> | Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * Profile base type for findUnique actions
   */
  export type ProfileFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the Profile
     * 
    **/
    select?: ProfileSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ProfileInclude | null
    /**
     * Filter, which Profile to fetch.
     * 
    **/
    where: ProfileWhereUniqueInput
  }

  /**
   * Profile: findUnique
   */
  export interface ProfileFindUniqueArgs extends ProfileFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Profile findUniqueOrThrow
   */
  export type ProfileFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Profile
     * 
    **/
    select?: ProfileSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ProfileInclude | null
    /**
     * Filter, which Profile to fetch.
     * 
    **/
    where: ProfileWhereUniqueInput
  }


  /**
   * Profile base type for findFirst actions
   */
  export type ProfileFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the Profile
     * 
    **/
    select?: ProfileSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ProfileInclude | null
    /**
     * Filter, which Profile to fetch.
     * 
    **/
    where?: ProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Profiles to fetch.
     * 
    **/
    orderBy?: Enumerable<ProfileOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Profiles.
     * 
    **/
    cursor?: ProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Profiles from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Profiles.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Profiles.
     * 
    **/
    distinct?: Enumerable<ProfileScalarFieldEnum>
  }

  /**
   * Profile: findFirst
   */
  export interface ProfileFindFirstArgs extends ProfileFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Profile findFirstOrThrow
   */
  export type ProfileFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Profile
     * 
    **/
    select?: ProfileSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ProfileInclude | null
    /**
     * Filter, which Profile to fetch.
     * 
    **/
    where?: ProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Profiles to fetch.
     * 
    **/
    orderBy?: Enumerable<ProfileOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Profiles.
     * 
    **/
    cursor?: ProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Profiles from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Profiles.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Profiles.
     * 
    **/
    distinct?: Enumerable<ProfileScalarFieldEnum>
  }


  /**
   * Profile findMany
   */
  export type ProfileFindManyArgs = {
    /**
     * Select specific fields to fetch from the Profile
     * 
    **/
    select?: ProfileSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ProfileInclude | null
    /**
     * Filter, which Profiles to fetch.
     * 
    **/
    where?: ProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Profiles to fetch.
     * 
    **/
    orderBy?: Enumerable<ProfileOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Profiles.
     * 
    **/
    cursor?: ProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Profiles from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Profiles.
     * 
    **/
    skip?: number
    distinct?: Enumerable<ProfileScalarFieldEnum>
  }


  /**
   * Profile create
   */
  export type ProfileCreateArgs = {
    /**
     * Select specific fields to fetch from the Profile
     * 
    **/
    select?: ProfileSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ProfileInclude | null
    /**
     * The data needed to create a Profile.
     * 
    **/
    data: XOR<ProfileCreateInput, ProfileUncheckedCreateInput>
  }


  /**
   * Profile createMany
   */
  export type ProfileCreateManyArgs = {
    /**
     * The data used to create many Profiles.
     * 
    **/
    data: Enumerable<ProfileCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Profile update
   */
  export type ProfileUpdateArgs = {
    /**
     * Select specific fields to fetch from the Profile
     * 
    **/
    select?: ProfileSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ProfileInclude | null
    /**
     * The data needed to update a Profile.
     * 
    **/
    data: XOR<ProfileUpdateInput, ProfileUncheckedUpdateInput>
    /**
     * Choose, which Profile to update.
     * 
    **/
    where: ProfileWhereUniqueInput
  }


  /**
   * Profile updateMany
   */
  export type ProfileUpdateManyArgs = {
    /**
     * The data used to update Profiles.
     * 
    **/
    data: XOR<ProfileUpdateManyMutationInput, ProfileUncheckedUpdateManyInput>
    /**
     * Filter which Profiles to update
     * 
    **/
    where?: ProfileWhereInput
  }


  /**
   * Profile upsert
   */
  export type ProfileUpsertArgs = {
    /**
     * Select specific fields to fetch from the Profile
     * 
    **/
    select?: ProfileSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ProfileInclude | null
    /**
     * The filter to search for the Profile to update in case it exists.
     * 
    **/
    where: ProfileWhereUniqueInput
    /**
     * In case the Profile found by the `where` argument doesn't exist, create a new Profile with this data.
     * 
    **/
    create: XOR<ProfileCreateInput, ProfileUncheckedCreateInput>
    /**
     * In case the Profile was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<ProfileUpdateInput, ProfileUncheckedUpdateInput>
  }


  /**
   * Profile delete
   */
  export type ProfileDeleteArgs = {
    /**
     * Select specific fields to fetch from the Profile
     * 
    **/
    select?: ProfileSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ProfileInclude | null
    /**
     * Filter which Profile to delete.
     * 
    **/
    where: ProfileWhereUniqueInput
  }


  /**
   * Profile deleteMany
   */
  export type ProfileDeleteManyArgs = {
    /**
     * Filter which Profiles to delete
     * 
    **/
    where?: ProfileWhereInput
  }


  /**
   * Profile without action
   */
  export type ProfileArgs = {
    /**
     * Select specific fields to fetch from the Profile
     * 
    **/
    select?: ProfileSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ProfileInclude | null
  }



  /**
   * Model Location
   */


  export type AggregateLocation = {
    _count: LocationCountAggregateOutputType | null
    _avg: LocationAvgAggregateOutputType | null
    _sum: LocationSumAggregateOutputType | null
    _min: LocationMinAggregateOutputType | null
    _max: LocationMaxAggregateOutputType | null
  }

  export type LocationAvgAggregateOutputType = {
    lat: number | null
    lng: number | null
  }

  export type LocationSumAggregateOutputType = {
    lat: number | null
    lng: number | null
  }

  export type LocationMinAggregateOutputType = {
    lat: number | null
    lng: number | null
  }

  export type LocationMaxAggregateOutputType = {
    lat: number | null
    lng: number | null
  }

  export type LocationCountAggregateOutputType = {
    lat: number
    lng: number
    _all: number
  }


  export type LocationAvgAggregateInputType = {
    lat?: true
    lng?: true
  }

  export type LocationSumAggregateInputType = {
    lat?: true
    lng?: true
  }

  export type LocationMinAggregateInputType = {
    lat?: true
    lng?: true
  }

  export type LocationMaxAggregateInputType = {
    lat?: true
    lng?: true
  }

  export type LocationCountAggregateInputType = {
    lat?: true
    lng?: true
    _all?: true
  }

  export type LocationAggregateArgs = {
    /**
     * Filter which Location to aggregate.
     * 
    **/
    where?: LocationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Locations to fetch.
     * 
    **/
    orderBy?: Enumerable<LocationOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: LocationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Locations from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Locations.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Locations
    **/
    _count?: true | LocationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: LocationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: LocationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LocationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LocationMaxAggregateInputType
  }

  export type GetLocationAggregateType<T extends LocationAggregateArgs> = {
        [P in keyof T & keyof AggregateLocation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLocation[P]>
      : GetScalarType<T[P], AggregateLocation[P]>
  }




  export type LocationGroupByArgs = {
    where?: LocationWhereInput
    orderBy?: Enumerable<LocationOrderByWithAggregationInput>
    by: Array<LocationScalarFieldEnum>
    having?: LocationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LocationCountAggregateInputType | true
    _avg?: LocationAvgAggregateInputType
    _sum?: LocationSumAggregateInputType
    _min?: LocationMinAggregateInputType
    _max?: LocationMaxAggregateInputType
  }


  export type LocationGroupByOutputType = {
    lat: number
    lng: number
    _count: LocationCountAggregateOutputType | null
    _avg: LocationAvgAggregateOutputType | null
    _sum: LocationSumAggregateOutputType | null
    _min: LocationMinAggregateOutputType | null
    _max: LocationMaxAggregateOutputType | null
  }

  type GetLocationGroupByPayload<T extends LocationGroupByArgs> = PrismaPromise<
    Array<
      PickArray<LocationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LocationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LocationGroupByOutputType[P]>
            : GetScalarType<T[P], LocationGroupByOutputType[P]>
        }
      >
    >


  export type LocationSelect = {
    lat?: boolean
    lng?: boolean
    User?: boolean | UserFindManyArgs
    _count?: boolean | LocationCountOutputTypeArgs
  }


  export type LocationInclude = {
    User?: boolean | UserFindManyArgs
    _count?: boolean | LocationCountOutputTypeArgs
  } 

  export type LocationGetPayload<S extends boolean | null | undefined | LocationArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? Location :
    S extends undefined ? never :
    S extends { include: any } & (LocationArgs | LocationFindManyArgs)
    ? Location  & {
    [P in TruthyKeys<S['include']>]:
        P extends 'User' ? Array < UserGetPayload<S['include'][P]>>  :
        P extends '_count' ? LocationCountOutputTypeGetPayload<S['include'][P]> :  never
  } 
    : S extends { select: any } & (LocationArgs | LocationFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
        P extends 'User' ? Array < UserGetPayload<S['select'][P]>>  :
        P extends '_count' ? LocationCountOutputTypeGetPayload<S['select'][P]> :  P extends keyof Location ? Location[P] : never
  } 
      : Location


  type LocationCountArgs = Merge<
    Omit<LocationFindManyArgs, 'select' | 'include'> & {
      select?: LocationCountAggregateInputType | true
    }
  >

  export interface LocationDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one Location that matches the filter.
     * @param {LocationFindUniqueArgs} args - Arguments to find a Location
     * @example
     * // Get one Location
     * const location = await prisma.location.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends LocationFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, LocationFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Location'> extends True ? Prisma__LocationClient<LocationGetPayload<T>> : Prisma__LocationClient<LocationGetPayload<T> | null, null>

    /**
     * Find one Location that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {LocationFindUniqueOrThrowArgs} args - Arguments to find a Location
     * @example
     * // Get one Location
     * const location = await prisma.location.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends LocationFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, LocationFindUniqueOrThrowArgs>
    ): Prisma__LocationClient<LocationGetPayload<T>>

    /**
     * Find the first Location that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocationFindFirstArgs} args - Arguments to find a Location
     * @example
     * // Get one Location
     * const location = await prisma.location.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends LocationFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, LocationFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Location'> extends True ? Prisma__LocationClient<LocationGetPayload<T>> : Prisma__LocationClient<LocationGetPayload<T> | null, null>

    /**
     * Find the first Location that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocationFindFirstOrThrowArgs} args - Arguments to find a Location
     * @example
     * // Get one Location
     * const location = await prisma.location.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends LocationFindFirstOrThrowArgs>(
      args?: SelectSubset<T, LocationFindFirstOrThrowArgs>
    ): Prisma__LocationClient<LocationGetPayload<T>>

    /**
     * Find zero or more Locations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocationFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Locations
     * const locations = await prisma.location.findMany()
     * 
     * // Get first 10 Locations
     * const locations = await prisma.location.findMany({ take: 10 })
     * 
     * // Only select the `lat`
     * const locationWithLatOnly = await prisma.location.findMany({ select: { lat: true } })
     * 
    **/
    findMany<T extends LocationFindManyArgs>(
      args?: SelectSubset<T, LocationFindManyArgs>
    ): PrismaPromise<Array<LocationGetPayload<T>>>

    /**
     * Create a Location.
     * @param {LocationCreateArgs} args - Arguments to create a Location.
     * @example
     * // Create one Location
     * const Location = await prisma.location.create({
     *   data: {
     *     // ... data to create a Location
     *   }
     * })
     * 
    **/
    create<T extends LocationCreateArgs>(
      args: SelectSubset<T, LocationCreateArgs>
    ): Prisma__LocationClient<LocationGetPayload<T>>

    /**
     * Create many Locations.
     *     @param {LocationCreateManyArgs} args - Arguments to create many Locations.
     *     @example
     *     // Create many Locations
     *     const location = await prisma.location.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends LocationCreateManyArgs>(
      args?: SelectSubset<T, LocationCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Location.
     * @param {LocationDeleteArgs} args - Arguments to delete one Location.
     * @example
     * // Delete one Location
     * const Location = await prisma.location.delete({
     *   where: {
     *     // ... filter to delete one Location
     *   }
     * })
     * 
    **/
    delete<T extends LocationDeleteArgs>(
      args: SelectSubset<T, LocationDeleteArgs>
    ): Prisma__LocationClient<LocationGetPayload<T>>

    /**
     * Update one Location.
     * @param {LocationUpdateArgs} args - Arguments to update one Location.
     * @example
     * // Update one Location
     * const location = await prisma.location.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends LocationUpdateArgs>(
      args: SelectSubset<T, LocationUpdateArgs>
    ): Prisma__LocationClient<LocationGetPayload<T>>

    /**
     * Delete zero or more Locations.
     * @param {LocationDeleteManyArgs} args - Arguments to filter Locations to delete.
     * @example
     * // Delete a few Locations
     * const { count } = await prisma.location.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends LocationDeleteManyArgs>(
      args?: SelectSubset<T, LocationDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Locations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Locations
     * const location = await prisma.location.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends LocationUpdateManyArgs>(
      args: SelectSubset<T, LocationUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Location.
     * @param {LocationUpsertArgs} args - Arguments to update or create a Location.
     * @example
     * // Update or create a Location
     * const location = await prisma.location.upsert({
     *   create: {
     *     // ... data to create a Location
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Location we want to update
     *   }
     * })
    **/
    upsert<T extends LocationUpsertArgs>(
      args: SelectSubset<T, LocationUpsertArgs>
    ): Prisma__LocationClient<LocationGetPayload<T>>

    /**
     * Count the number of Locations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocationCountArgs} args - Arguments to filter Locations to count.
     * @example
     * // Count the number of Locations
     * const count = await prisma.location.count({
     *   where: {
     *     // ... the filter for the Locations we want to count
     *   }
     * })
    **/
    count<T extends LocationCountArgs>(
      args?: Subset<T, LocationCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LocationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Location.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LocationAggregateArgs>(args: Subset<T, LocationAggregateArgs>): PrismaPromise<GetLocationAggregateType<T>>

    /**
     * Group by Location.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LocationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LocationGroupByArgs['orderBy'] }
        : { orderBy?: LocationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LocationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLocationGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for Location.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__LocationClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    User<T extends UserFindManyArgs= {}>(args?: Subset<T, UserFindManyArgs>): PrismaPromise<Array<UserGetPayload<T>>| Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * Location base type for findUnique actions
   */
  export type LocationFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the Location
     * 
    **/
    select?: LocationSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: LocationInclude | null
    /**
     * Filter, which Location to fetch.
     * 
    **/
    where: LocationWhereUniqueInput
  }

  /**
   * Location: findUnique
   */
  export interface LocationFindUniqueArgs extends LocationFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Location findUniqueOrThrow
   */
  export type LocationFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Location
     * 
    **/
    select?: LocationSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: LocationInclude | null
    /**
     * Filter, which Location to fetch.
     * 
    **/
    where: LocationWhereUniqueInput
  }


  /**
   * Location base type for findFirst actions
   */
  export type LocationFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the Location
     * 
    **/
    select?: LocationSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: LocationInclude | null
    /**
     * Filter, which Location to fetch.
     * 
    **/
    where?: LocationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Locations to fetch.
     * 
    **/
    orderBy?: Enumerable<LocationOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Locations.
     * 
    **/
    cursor?: LocationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Locations from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Locations.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Locations.
     * 
    **/
    distinct?: Enumerable<LocationScalarFieldEnum>
  }

  /**
   * Location: findFirst
   */
  export interface LocationFindFirstArgs extends LocationFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Location findFirstOrThrow
   */
  export type LocationFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Location
     * 
    **/
    select?: LocationSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: LocationInclude | null
    /**
     * Filter, which Location to fetch.
     * 
    **/
    where?: LocationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Locations to fetch.
     * 
    **/
    orderBy?: Enumerable<LocationOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Locations.
     * 
    **/
    cursor?: LocationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Locations from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Locations.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Locations.
     * 
    **/
    distinct?: Enumerable<LocationScalarFieldEnum>
  }


  /**
   * Location findMany
   */
  export type LocationFindManyArgs = {
    /**
     * Select specific fields to fetch from the Location
     * 
    **/
    select?: LocationSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: LocationInclude | null
    /**
     * Filter, which Locations to fetch.
     * 
    **/
    where?: LocationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Locations to fetch.
     * 
    **/
    orderBy?: Enumerable<LocationOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Locations.
     * 
    **/
    cursor?: LocationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Locations from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Locations.
     * 
    **/
    skip?: number
    distinct?: Enumerable<LocationScalarFieldEnum>
  }


  /**
   * Location create
   */
  export type LocationCreateArgs = {
    /**
     * Select specific fields to fetch from the Location
     * 
    **/
    select?: LocationSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: LocationInclude | null
    /**
     * The data needed to create a Location.
     * 
    **/
    data: XOR<LocationCreateInput, LocationUncheckedCreateInput>
  }


  /**
   * Location createMany
   */
  export type LocationCreateManyArgs = {
    /**
     * The data used to create many Locations.
     * 
    **/
    data: Enumerable<LocationCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Location update
   */
  export type LocationUpdateArgs = {
    /**
     * Select specific fields to fetch from the Location
     * 
    **/
    select?: LocationSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: LocationInclude | null
    /**
     * The data needed to update a Location.
     * 
    **/
    data: XOR<LocationUpdateInput, LocationUncheckedUpdateInput>
    /**
     * Choose, which Location to update.
     * 
    **/
    where: LocationWhereUniqueInput
  }


  /**
   * Location updateMany
   */
  export type LocationUpdateManyArgs = {
    /**
     * The data used to update Locations.
     * 
    **/
    data: XOR<LocationUpdateManyMutationInput, LocationUncheckedUpdateManyInput>
    /**
     * Filter which Locations to update
     * 
    **/
    where?: LocationWhereInput
  }


  /**
   * Location upsert
   */
  export type LocationUpsertArgs = {
    /**
     * Select specific fields to fetch from the Location
     * 
    **/
    select?: LocationSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: LocationInclude | null
    /**
     * The filter to search for the Location to update in case it exists.
     * 
    **/
    where: LocationWhereUniqueInput
    /**
     * In case the Location found by the `where` argument doesn't exist, create a new Location with this data.
     * 
    **/
    create: XOR<LocationCreateInput, LocationUncheckedCreateInput>
    /**
     * In case the Location was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<LocationUpdateInput, LocationUncheckedUpdateInput>
  }


  /**
   * Location delete
   */
  export type LocationDeleteArgs = {
    /**
     * Select specific fields to fetch from the Location
     * 
    **/
    select?: LocationSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: LocationInclude | null
    /**
     * Filter which Location to delete.
     * 
    **/
    where: LocationWhereUniqueInput
  }


  /**
   * Location deleteMany
   */
  export type LocationDeleteManyArgs = {
    /**
     * Filter which Locations to delete
     * 
    **/
    where?: LocationWhereInput
  }


  /**
   * Location without action
   */
  export type LocationArgs = {
    /**
     * Select specific fields to fetch from the Location
     * 
    **/
    select?: LocationSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: LocationInclude | null
  }



  /**
   * Enums
   */

  // Based on
  // https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

  export const JsonModelScalarFieldEnum: {
    id: 'id',
    json: 'json',
    jsonOpt: 'jsonOpt'
  };

  export type JsonModelScalarFieldEnum = (typeof JsonModelScalarFieldEnum)[keyof typeof JsonModelScalarFieldEnum]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const LocationScalarFieldEnum: {
    lat: 'lat',
    lng: 'lng'
  };

  export type LocationScalarFieldEnum = (typeof LocationScalarFieldEnum)[keyof typeof LocationScalarFieldEnum]


  export const MODELWithUpperCaseScalarFieldEnum: {
    id: 'id',
    STRING: 'STRING',
    MYValue: 'MYValue'
  };

  export type MODELWithUpperCaseScalarFieldEnum = (typeof MODELWithUpperCaseScalarFieldEnum)[keyof typeof MODELWithUpperCaseScalarFieldEnum]


  export const MyModelScalarFieldEnum: {
    id: 'id',
    string: 'string',
    omitField: 'omitField',
    omitRequired: 'omitRequired'
  };

  export type MyModelScalarFieldEnum = (typeof MyModelScalarFieldEnum)[keyof typeof MyModelScalarFieldEnum]


  export const MyPrismaScalarsTypeScalarFieldEnum: {
    id: 'id',
    string: 'string',
    bic: 'bic',
    float: 'float',
    decimal: 'decimal',
    date: 'date',
    bigInt: 'bigInt',
    json: 'json',
    bytes: 'bytes',
    custom: 'custom',
    exclude: 'exclude'
  };

  export type MyPrismaScalarsTypeScalarFieldEnum = (typeof MyPrismaScalarsTypeScalarFieldEnum)[keyof typeof MyPrismaScalarsTypeScalarFieldEnum]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const PostScalarFieldEnum: {
    id: 'id',
    title: 'title',
    content: 'content',
    published: 'published',
    authorId: 'authorId',
    anotherEnum: 'anotherEnum'
  };

  export type PostScalarFieldEnum = (typeof PostScalarFieldEnum)[keyof typeof PostScalarFieldEnum]


  export const ProfileScalarFieldEnum: {
    id: 'id',
    bio: 'bio',
    userId: 'userId',
    role: 'role',
    second: 'second'
  };

  export type ProfileScalarFieldEnum = (typeof ProfileScalarFieldEnum)[keyof typeof ProfileScalarFieldEnum]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const TestScalarFieldEnum: {
    id: 'id',
    name: 'name',
    value: 'value',
    bic: 'bic',
    intTwo: 'intTwo',
    int: 'int',
    floatOpt: 'floatOpt',
    float: 'float',
    decimal: 'decimal',
    decimalOpt: 'decimalOpt',
    date: 'date',
    dateOpt: 'dateOpt',
    bigInt: 'bigInt',
    bigIntOpt: 'bigIntOpt',
    json: 'json',
    jsonOpt: 'jsonOpt',
    bytes: 'bytes',
    bytesOpt: 'bytesOpt'
  };

  export type TestScalarFieldEnum = (typeof TestScalarFieldEnum)[keyof typeof TestScalarFieldEnum]


  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    name: 'name',
    role: 'role',
    enum: 'enum',
    scalarList: 'scalarList',
    lat: 'lat',
    lng: 'lng'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  /**
   * Deep Input Types
   */


  export type MyModelWhereInput = {
    AND?: Enumerable<MyModelWhereInput>
    OR?: Enumerable<MyModelWhereInput>
    NOT?: Enumerable<MyModelWhereInput>
    id?: IntFilter | number
    string?: StringNullableFilter | string | null
    omitField?: StringNullableFilter | string | null
    omitRequired?: StringFilter | string
  }

  export type MyModelOrderByWithRelationInput = {
    id?: SortOrder
    string?: SortOrder
    omitField?: SortOrder
    omitRequired?: SortOrder
  }

  export type MyModelWhereUniqueInput = {
    id?: number
  }

  export type MyModelOrderByWithAggregationInput = {
    id?: SortOrder
    string?: SortOrder
    omitField?: SortOrder
    omitRequired?: SortOrder
    _count?: MyModelCountOrderByAggregateInput
    _avg?: MyModelAvgOrderByAggregateInput
    _max?: MyModelMaxOrderByAggregateInput
    _min?: MyModelMinOrderByAggregateInput
    _sum?: MyModelSumOrderByAggregateInput
  }

  export type MyModelScalarWhereWithAggregatesInput = {
    AND?: Enumerable<MyModelScalarWhereWithAggregatesInput>
    OR?: Enumerable<MyModelScalarWhereWithAggregatesInput>
    NOT?: Enumerable<MyModelScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    string?: StringNullableWithAggregatesFilter | string | null
    omitField?: StringNullableWithAggregatesFilter | string | null
    omitRequired?: StringWithAggregatesFilter | string
  }

  export type MODELWithUpperCaseWhereInput = {
    AND?: Enumerable<MODELWithUpperCaseWhereInput>
    OR?: Enumerable<MODELWithUpperCaseWhereInput>
    NOT?: Enumerable<MODELWithUpperCaseWhereInput>
    id?: IntFilter | number
    STRING?: StringFilter | string
    MYValue?: EnumMYValueFilter | MYValue
  }

  export type MODELWithUpperCaseOrderByWithRelationInput = {
    id?: SortOrder
    STRING?: SortOrder
    MYValue?: SortOrder
  }

  export type MODELWithUpperCaseWhereUniqueInput = {
    id?: number
  }

  export type MODELWithUpperCaseOrderByWithAggregationInput = {
    id?: SortOrder
    STRING?: SortOrder
    MYValue?: SortOrder
    _count?: MODELWithUpperCaseCountOrderByAggregateInput
    _avg?: MODELWithUpperCaseAvgOrderByAggregateInput
    _max?: MODELWithUpperCaseMaxOrderByAggregateInput
    _min?: MODELWithUpperCaseMinOrderByAggregateInput
    _sum?: MODELWithUpperCaseSumOrderByAggregateInput
  }

  export type MODELWithUpperCaseScalarWhereWithAggregatesInput = {
    AND?: Enumerable<MODELWithUpperCaseScalarWhereWithAggregatesInput>
    OR?: Enumerable<MODELWithUpperCaseScalarWhereWithAggregatesInput>
    NOT?: Enumerable<MODELWithUpperCaseScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    STRING?: StringWithAggregatesFilter | string
    MYValue?: EnumMYValueWithAggregatesFilter | MYValue
  }

  export type JsonModelWhereInput = {
    AND?: Enumerable<JsonModelWhereInput>
    OR?: Enumerable<JsonModelWhereInput>
    NOT?: Enumerable<JsonModelWhereInput>
    id?: IntFilter | number
    json?: JsonFilter
    jsonOpt?: JsonNullableFilter
  }

  export type JsonModelOrderByWithRelationInput = {
    id?: SortOrder
    json?: SortOrder
    jsonOpt?: SortOrder
  }

  export type JsonModelWhereUniqueInput = {
    id?: number
  }

  export type JsonModelOrderByWithAggregationInput = {
    id?: SortOrder
    json?: SortOrder
    jsonOpt?: SortOrder
    _count?: JsonModelCountOrderByAggregateInput
    _avg?: JsonModelAvgOrderByAggregateInput
    _max?: JsonModelMaxOrderByAggregateInput
    _min?: JsonModelMinOrderByAggregateInput
    _sum?: JsonModelSumOrderByAggregateInput
  }

  export type JsonModelScalarWhereWithAggregatesInput = {
    AND?: Enumerable<JsonModelScalarWhereWithAggregatesInput>
    OR?: Enumerable<JsonModelScalarWhereWithAggregatesInput>
    NOT?: Enumerable<JsonModelScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    json?: JsonWithAggregatesFilter
    jsonOpt?: JsonNullableWithAggregatesFilter
  }

  export type TestWhereInput = {
    AND?: Enumerable<TestWhereInput>
    OR?: Enumerable<TestWhereInput>
    NOT?: Enumerable<TestWhereInput>
    id?: StringFilter | string
    name?: StringNullableFilter | string | null
    value?: EnumMYValueFilter | MYValue
    bic?: StringNullableFilter | string | null
    intTwo?: IntFilter | number
    int?: IntNullableFilter | number | null
    floatOpt?: FloatNullableFilter | number | null
    float?: FloatFilter | number
    decimal?: DecimalFilter | Decimal | DecimalJsLike | number | string
    decimalOpt?: DecimalNullableFilter | Decimal | DecimalJsLike | number | string | null
    date?: DateTimeFilter | Date | string
    dateOpt?: DateTimeNullableFilter | Date | string | null
    bigInt?: BigIntFilter | bigint | number
    bigIntOpt?: BigIntNullableFilter | bigint | number | null
    json?: JsonFilter
    jsonOpt?: JsonNullableFilter
    bytes?: BytesFilter | Buffer
    bytesOpt?: BytesNullableFilter | Buffer | null
  }

  export type TestOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    value?: SortOrder
    bic?: SortOrder
    intTwo?: SortOrder
    int?: SortOrder
    floatOpt?: SortOrder
    float?: SortOrder
    decimal?: SortOrder
    decimalOpt?: SortOrder
    date?: SortOrder
    dateOpt?: SortOrder
    bigInt?: SortOrder
    bigIntOpt?: SortOrder
    json?: SortOrder
    jsonOpt?: SortOrder
    bytes?: SortOrder
    bytesOpt?: SortOrder
  }

  export type TestWhereUniqueInput = {
    id?: string
  }

  export type TestOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    value?: SortOrder
    bic?: SortOrder
    intTwo?: SortOrder
    int?: SortOrder
    floatOpt?: SortOrder
    float?: SortOrder
    decimal?: SortOrder
    decimalOpt?: SortOrder
    date?: SortOrder
    dateOpt?: SortOrder
    bigInt?: SortOrder
    bigIntOpt?: SortOrder
    json?: SortOrder
    jsonOpt?: SortOrder
    bytes?: SortOrder
    bytesOpt?: SortOrder
    _count?: TestCountOrderByAggregateInput
    _avg?: TestAvgOrderByAggregateInput
    _max?: TestMaxOrderByAggregateInput
    _min?: TestMinOrderByAggregateInput
    _sum?: TestSumOrderByAggregateInput
  }

  export type TestScalarWhereWithAggregatesInput = {
    AND?: Enumerable<TestScalarWhereWithAggregatesInput>
    OR?: Enumerable<TestScalarWhereWithAggregatesInput>
    NOT?: Enumerable<TestScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    name?: StringNullableWithAggregatesFilter | string | null
    value?: EnumMYValueWithAggregatesFilter | MYValue
    bic?: StringNullableWithAggregatesFilter | string | null
    intTwo?: IntWithAggregatesFilter | number
    int?: IntNullableWithAggregatesFilter | number | null
    floatOpt?: FloatNullableWithAggregatesFilter | number | null
    float?: FloatWithAggregatesFilter | number
    decimal?: DecimalWithAggregatesFilter | Decimal | DecimalJsLike | number | string
    decimalOpt?: DecimalNullableWithAggregatesFilter | Decimal | DecimalJsLike | number | string | null
    date?: DateTimeWithAggregatesFilter | Date | string
    dateOpt?: DateTimeNullableWithAggregatesFilter | Date | string | null
    bigInt?: BigIntWithAggregatesFilter | bigint | number
    bigIntOpt?: BigIntNullableWithAggregatesFilter | bigint | number | null
    json?: JsonWithAggregatesFilter
    jsonOpt?: JsonNullableWithAggregatesFilter
    bytes?: BytesWithAggregatesFilter | Buffer
    bytesOpt?: BytesNullableWithAggregatesFilter | Buffer | null
  }

  export type MyPrismaScalarsTypeWhereInput = {
    AND?: Enumerable<MyPrismaScalarsTypeWhereInput>
    OR?: Enumerable<MyPrismaScalarsTypeWhereInput>
    NOT?: Enumerable<MyPrismaScalarsTypeWhereInput>
    id?: StringFilter | string
    string?: StringNullableFilter | string | null
    bic?: StringNullableFilter | string | null
    float?: FloatFilter | number
    decimal?: DecimalFilter | Decimal | DecimalJsLike | number | string
    date?: DateTimeNullableFilter | Date | string | null
    bigInt?: BigIntFilter | bigint | number
    json?: JsonFilter
    bytes?: BytesFilter | Buffer
    custom?: StringNullableFilter | string | null
    exclude?: StringNullableFilter | string | null
  }

  export type MyPrismaScalarsTypeOrderByWithRelationInput = {
    id?: SortOrder
    string?: SortOrder
    bic?: SortOrder
    float?: SortOrder
    decimal?: SortOrder
    date?: SortOrder
    bigInt?: SortOrder
    json?: SortOrder
    bytes?: SortOrder
    custom?: SortOrder
    exclude?: SortOrder
  }

  export type MyPrismaScalarsTypeWhereUniqueInput = {
    id?: string
  }

  export type MyPrismaScalarsTypeOrderByWithAggregationInput = {
    id?: SortOrder
    string?: SortOrder
    bic?: SortOrder
    float?: SortOrder
    decimal?: SortOrder
    date?: SortOrder
    bigInt?: SortOrder
    json?: SortOrder
    bytes?: SortOrder
    custom?: SortOrder
    exclude?: SortOrder
    _count?: MyPrismaScalarsTypeCountOrderByAggregateInput
    _avg?: MyPrismaScalarsTypeAvgOrderByAggregateInput
    _max?: MyPrismaScalarsTypeMaxOrderByAggregateInput
    _min?: MyPrismaScalarsTypeMinOrderByAggregateInput
    _sum?: MyPrismaScalarsTypeSumOrderByAggregateInput
  }

  export type MyPrismaScalarsTypeScalarWhereWithAggregatesInput = {
    AND?: Enumerable<MyPrismaScalarsTypeScalarWhereWithAggregatesInput>
    OR?: Enumerable<MyPrismaScalarsTypeScalarWhereWithAggregatesInput>
    NOT?: Enumerable<MyPrismaScalarsTypeScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    string?: StringNullableWithAggregatesFilter | string | null
    bic?: StringNullableWithAggregatesFilter | string | null
    float?: FloatWithAggregatesFilter | number
    decimal?: DecimalWithAggregatesFilter | Decimal | DecimalJsLike | number | string
    date?: DateTimeNullableWithAggregatesFilter | Date | string | null
    bigInt?: BigIntWithAggregatesFilter | bigint | number
    json?: JsonWithAggregatesFilter
    bytes?: BytesWithAggregatesFilter | Buffer
    custom?: StringNullableWithAggregatesFilter | string | null
    exclude?: StringNullableWithAggregatesFilter | string | null
  }

  export type UserWhereInput = {
    AND?: Enumerable<UserWhereInput>
    OR?: Enumerable<UserWhereInput>
    NOT?: Enumerable<UserWhereInput>
    id?: StringFilter | string
    email?: StringFilter | string
    name?: StringNullableFilter | string | null
    posts?: PostListRelationFilter
    profile?: XOR<ProfileRelationFilter, ProfileWhereInput> | null
    role?: EnumRoleNullableListFilter
    enum?: EnumAnotherEnumFilter | AnotherEnum
    scalarList?: StringNullableListFilter
    lat?: FloatFilter | number
    lng?: FloatFilter | number
    location?: XOR<LocationRelationFilter, LocationWhereInput> | null
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    posts?: PostOrderByRelationAggregateInput
    profile?: ProfileOrderByWithRelationInput
    role?: SortOrder
    enum?: SortOrder
    scalarList?: SortOrder
    lat?: SortOrder
    lng?: SortOrder
    location?: LocationOrderByWithRelationInput
  }

  export type UserWhereUniqueInput = {
    id?: string
    email?: string
  }

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    role?: SortOrder
    enum?: SortOrder
    scalarList?: SortOrder
    lat?: SortOrder
    lng?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: Enumerable<UserScalarWhereWithAggregatesInput>
    OR?: Enumerable<UserScalarWhereWithAggregatesInput>
    NOT?: Enumerable<UserScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    email?: StringWithAggregatesFilter | string
    name?: StringNullableWithAggregatesFilter | string | null
    role?: EnumRoleNullableListFilter
    enum?: EnumAnotherEnumWithAggregatesFilter | AnotherEnum
    scalarList?: StringNullableListFilter
    lat?: FloatWithAggregatesFilter | number
    lng?: FloatWithAggregatesFilter | number
  }

  export type PostWhereInput = {
    AND?: Enumerable<PostWhereInput>
    OR?: Enumerable<PostWhereInput>
    NOT?: Enumerable<PostWhereInput>
    id?: IntFilter | number
    title?: StringFilter | string
    content?: StringNullableFilter | string | null
    published?: BoolFilter | boolean
    author?: XOR<UserRelationFilter, UserWhereInput>
    authorId?: StringFilter | string
    anotherEnum?: EnumAnotherEnumNullableListFilter
  }

  export type PostOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    published?: SortOrder
    author?: UserOrderByWithRelationInput
    authorId?: SortOrder
    anotherEnum?: SortOrder
  }

  export type PostWhereUniqueInput = {
    id?: number
  }

  export type PostOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    published?: SortOrder
    authorId?: SortOrder
    anotherEnum?: SortOrder
    _count?: PostCountOrderByAggregateInput
    _avg?: PostAvgOrderByAggregateInput
    _max?: PostMaxOrderByAggregateInput
    _min?: PostMinOrderByAggregateInput
    _sum?: PostSumOrderByAggregateInput
  }

  export type PostScalarWhereWithAggregatesInput = {
    AND?: Enumerable<PostScalarWhereWithAggregatesInput>
    OR?: Enumerable<PostScalarWhereWithAggregatesInput>
    NOT?: Enumerable<PostScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    title?: StringWithAggregatesFilter | string
    content?: StringNullableWithAggregatesFilter | string | null
    published?: BoolWithAggregatesFilter | boolean
    authorId?: StringWithAggregatesFilter | string
    anotherEnum?: EnumAnotherEnumNullableListFilter
  }

  export type ProfileWhereInput = {
    AND?: Enumerable<ProfileWhereInput>
    OR?: Enumerable<ProfileWhereInput>
    NOT?: Enumerable<ProfileWhereInput>
    id?: IntFilter | number
    bio?: StringFilter | string
    user?: XOR<UserRelationFilter, UserWhereInput>
    userId?: StringFilter | string
    role?: EnumRoleNullableListFilter
    second?: EnumSecondEnumFilter | SecondEnum
  }

  export type ProfileOrderByWithRelationInput = {
    id?: SortOrder
    bio?: SortOrder
    user?: UserOrderByWithRelationInput
    userId?: SortOrder
    role?: SortOrder
    second?: SortOrder
  }

  export type ProfileWhereUniqueInput = {
    id?: number
    userId?: string
  }

  export type ProfileOrderByWithAggregationInput = {
    id?: SortOrder
    bio?: SortOrder
    userId?: SortOrder
    role?: SortOrder
    second?: SortOrder
    _count?: ProfileCountOrderByAggregateInput
    _avg?: ProfileAvgOrderByAggregateInput
    _max?: ProfileMaxOrderByAggregateInput
    _min?: ProfileMinOrderByAggregateInput
    _sum?: ProfileSumOrderByAggregateInput
  }

  export type ProfileScalarWhereWithAggregatesInput = {
    AND?: Enumerable<ProfileScalarWhereWithAggregatesInput>
    OR?: Enumerable<ProfileScalarWhereWithAggregatesInput>
    NOT?: Enumerable<ProfileScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    bio?: StringWithAggregatesFilter | string
    userId?: StringWithAggregatesFilter | string
    role?: EnumRoleNullableListFilter
    second?: EnumSecondEnumWithAggregatesFilter | SecondEnum
  }

  export type LocationWhereInput = {
    AND?: Enumerable<LocationWhereInput>
    OR?: Enumerable<LocationWhereInput>
    NOT?: Enumerable<LocationWhereInput>
    lat?: FloatFilter | number
    lng?: FloatFilter | number
    User?: UserListRelationFilter
  }

  export type LocationOrderByWithRelationInput = {
    lat?: SortOrder
    lng?: SortOrder
    User?: UserOrderByRelationAggregateInput
  }

  export type LocationWhereUniqueInput = {
    lat_lng?: LocationLatLngCompoundUniqueInput
  }

  export type LocationOrderByWithAggregationInput = {
    lat?: SortOrder
    lng?: SortOrder
    _count?: LocationCountOrderByAggregateInput
    _avg?: LocationAvgOrderByAggregateInput
    _max?: LocationMaxOrderByAggregateInput
    _min?: LocationMinOrderByAggregateInput
    _sum?: LocationSumOrderByAggregateInput
  }

  export type LocationScalarWhereWithAggregatesInput = {
    AND?: Enumerable<LocationScalarWhereWithAggregatesInput>
    OR?: Enumerable<LocationScalarWhereWithAggregatesInput>
    NOT?: Enumerable<LocationScalarWhereWithAggregatesInput>
    lat?: FloatWithAggregatesFilter | number
    lng?: FloatWithAggregatesFilter | number
  }

  export type MyModelCreateInput = {
    string?: string | null
    omitField?: string | null
    omitRequired: string
  }

  export type MyModelUncheckedCreateInput = {
    id?: number
    string?: string | null
    omitField?: string | null
    omitRequired: string
  }

  export type MyModelUpdateInput = {
    string?: NullableStringFieldUpdateOperationsInput | string | null
    omitField?: NullableStringFieldUpdateOperationsInput | string | null
    omitRequired?: StringFieldUpdateOperationsInput | string
  }

  export type MyModelUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    string?: NullableStringFieldUpdateOperationsInput | string | null
    omitField?: NullableStringFieldUpdateOperationsInput | string | null
    omitRequired?: StringFieldUpdateOperationsInput | string
  }

  export type MyModelCreateManyInput = {
    id?: number
    string?: string | null
    omitField?: string | null
    omitRequired: string
  }

  export type MyModelUpdateManyMutationInput = {
    string?: NullableStringFieldUpdateOperationsInput | string | null
    omitField?: NullableStringFieldUpdateOperationsInput | string | null
    omitRequired?: StringFieldUpdateOperationsInput | string
  }

  export type MyModelUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    string?: NullableStringFieldUpdateOperationsInput | string | null
    omitField?: NullableStringFieldUpdateOperationsInput | string | null
    omitRequired?: StringFieldUpdateOperationsInput | string
  }

  export type MODELWithUpperCaseCreateInput = {
    STRING: string
    MYValue: MYValue
  }

  export type MODELWithUpperCaseUncheckedCreateInput = {
    id?: number
    STRING: string
    MYValue: MYValue
  }

  export type MODELWithUpperCaseUpdateInput = {
    STRING?: StringFieldUpdateOperationsInput | string
    MYValue?: EnumMYValueFieldUpdateOperationsInput | MYValue
  }

  export type MODELWithUpperCaseUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    STRING?: StringFieldUpdateOperationsInput | string
    MYValue?: EnumMYValueFieldUpdateOperationsInput | MYValue
  }

  export type MODELWithUpperCaseCreateManyInput = {
    id?: number
    STRING: string
    MYValue: MYValue
  }

  export type MODELWithUpperCaseUpdateManyMutationInput = {
    STRING?: StringFieldUpdateOperationsInput | string
    MYValue?: EnumMYValueFieldUpdateOperationsInput | MYValue
  }

  export type MODELWithUpperCaseUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    STRING?: StringFieldUpdateOperationsInput | string
    MYValue?: EnumMYValueFieldUpdateOperationsInput | MYValue
  }

  export type JsonModelCreateInput = {
    json: JsonNullValueInput | InputJsonValue
    jsonOpt?: NullableJsonNullValueInput | InputJsonValue
  }

  export type JsonModelUncheckedCreateInput = {
    id?: number
    json: JsonNullValueInput | InputJsonValue
    jsonOpt?: NullableJsonNullValueInput | InputJsonValue
  }

  export type JsonModelUpdateInput = {
    json?: JsonNullValueInput | InputJsonValue
    jsonOpt?: NullableJsonNullValueInput | InputJsonValue
  }

  export type JsonModelUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    json?: JsonNullValueInput | InputJsonValue
    jsonOpt?: NullableJsonNullValueInput | InputJsonValue
  }

  export type JsonModelCreateManyInput = {
    id?: number
    json: JsonNullValueInput | InputJsonValue
    jsonOpt?: NullableJsonNullValueInput | InputJsonValue
  }

  export type JsonModelUpdateManyMutationInput = {
    json?: JsonNullValueInput | InputJsonValue
    jsonOpt?: NullableJsonNullValueInput | InputJsonValue
  }

  export type JsonModelUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    json?: JsonNullValueInput | InputJsonValue
    jsonOpt?: NullableJsonNullValueInput | InputJsonValue
  }

  export type TestCreateInput = {
    id?: string
    name?: string | null
    value: MYValue
    bic?: string | null
    intTwo: number
    int?: number | null
    floatOpt?: number | null
    float: number
    decimal: Decimal | DecimalJsLike | number | string
    decimalOpt?: Decimal | DecimalJsLike | number | string | null
    date?: Date | string
    dateOpt?: Date | string | null
    bigInt: bigint | number
    bigIntOpt?: bigint | number | null
    json: JsonNullValueInput | InputJsonValue
    jsonOpt?: NullableJsonNullValueInput | InputJsonValue
    bytes: Buffer
    bytesOpt?: Buffer | null
  }

  export type TestUncheckedCreateInput = {
    id?: string
    name?: string | null
    value: MYValue
    bic?: string | null
    intTwo: number
    int?: number | null
    floatOpt?: number | null
    float: number
    decimal: Decimal | DecimalJsLike | number | string
    decimalOpt?: Decimal | DecimalJsLike | number | string | null
    date?: Date | string
    dateOpt?: Date | string | null
    bigInt: bigint | number
    bigIntOpt?: bigint | number | null
    json: JsonNullValueInput | InputJsonValue
    jsonOpt?: NullableJsonNullValueInput | InputJsonValue
    bytes: Buffer
    bytesOpt?: Buffer | null
  }

  export type TestUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    value?: EnumMYValueFieldUpdateOperationsInput | MYValue
    bic?: NullableStringFieldUpdateOperationsInput | string | null
    intTwo?: IntFieldUpdateOperationsInput | number
    int?: NullableIntFieldUpdateOperationsInput | number | null
    floatOpt?: NullableFloatFieldUpdateOperationsInput | number | null
    float?: FloatFieldUpdateOperationsInput | number
    decimal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    decimalOpt?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    dateOpt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    bigInt?: BigIntFieldUpdateOperationsInput | bigint | number
    bigIntOpt?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    json?: JsonNullValueInput | InputJsonValue
    jsonOpt?: NullableJsonNullValueInput | InputJsonValue
    bytes?: BytesFieldUpdateOperationsInput | Buffer
    bytesOpt?: NullableBytesFieldUpdateOperationsInput | Buffer | null
  }

  export type TestUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    value?: EnumMYValueFieldUpdateOperationsInput | MYValue
    bic?: NullableStringFieldUpdateOperationsInput | string | null
    intTwo?: IntFieldUpdateOperationsInput | number
    int?: NullableIntFieldUpdateOperationsInput | number | null
    floatOpt?: NullableFloatFieldUpdateOperationsInput | number | null
    float?: FloatFieldUpdateOperationsInput | number
    decimal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    decimalOpt?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    dateOpt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    bigInt?: BigIntFieldUpdateOperationsInput | bigint | number
    bigIntOpt?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    json?: JsonNullValueInput | InputJsonValue
    jsonOpt?: NullableJsonNullValueInput | InputJsonValue
    bytes?: BytesFieldUpdateOperationsInput | Buffer
    bytesOpt?: NullableBytesFieldUpdateOperationsInput | Buffer | null
  }

  export type TestCreateManyInput = {
    id?: string
    name?: string | null
    value: MYValue
    bic?: string | null
    intTwo: number
    int?: number | null
    floatOpt?: number | null
    float: number
    decimal: Decimal | DecimalJsLike | number | string
    decimalOpt?: Decimal | DecimalJsLike | number | string | null
    date?: Date | string
    dateOpt?: Date | string | null
    bigInt: bigint | number
    bigIntOpt?: bigint | number | null
    json: JsonNullValueInput | InputJsonValue
    jsonOpt?: NullableJsonNullValueInput | InputJsonValue
    bytes: Buffer
    bytesOpt?: Buffer | null
  }

  export type TestUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    value?: EnumMYValueFieldUpdateOperationsInput | MYValue
    bic?: NullableStringFieldUpdateOperationsInput | string | null
    intTwo?: IntFieldUpdateOperationsInput | number
    int?: NullableIntFieldUpdateOperationsInput | number | null
    floatOpt?: NullableFloatFieldUpdateOperationsInput | number | null
    float?: FloatFieldUpdateOperationsInput | number
    decimal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    decimalOpt?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    dateOpt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    bigInt?: BigIntFieldUpdateOperationsInput | bigint | number
    bigIntOpt?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    json?: JsonNullValueInput | InputJsonValue
    jsonOpt?: NullableJsonNullValueInput | InputJsonValue
    bytes?: BytesFieldUpdateOperationsInput | Buffer
    bytesOpt?: NullableBytesFieldUpdateOperationsInput | Buffer | null
  }

  export type TestUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    value?: EnumMYValueFieldUpdateOperationsInput | MYValue
    bic?: NullableStringFieldUpdateOperationsInput | string | null
    intTwo?: IntFieldUpdateOperationsInput | number
    int?: NullableIntFieldUpdateOperationsInput | number | null
    floatOpt?: NullableFloatFieldUpdateOperationsInput | number | null
    float?: FloatFieldUpdateOperationsInput | number
    decimal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    decimalOpt?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    dateOpt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    bigInt?: BigIntFieldUpdateOperationsInput | bigint | number
    bigIntOpt?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    json?: JsonNullValueInput | InputJsonValue
    jsonOpt?: NullableJsonNullValueInput | InputJsonValue
    bytes?: BytesFieldUpdateOperationsInput | Buffer
    bytesOpt?: NullableBytesFieldUpdateOperationsInput | Buffer | null
  }

  export type MyPrismaScalarsTypeCreateInput = {
    id?: string
    string?: string | null
    bic?: string | null
    float: number
    decimal: Decimal | DecimalJsLike | number | string
    date?: Date | string | null
    bigInt: bigint | number
    json: JsonNullValueInput | InputJsonValue
    bytes: Buffer
    custom?: string | null
    exclude?: string | null
  }

  export type MyPrismaScalarsTypeUncheckedCreateInput = {
    id?: string
    string?: string | null
    bic?: string | null
    float: number
    decimal: Decimal | DecimalJsLike | number | string
    date?: Date | string | null
    bigInt: bigint | number
    json: JsonNullValueInput | InputJsonValue
    bytes: Buffer
    custom?: string | null
    exclude?: string | null
  }

  export type MyPrismaScalarsTypeUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    string?: NullableStringFieldUpdateOperationsInput | string | null
    bic?: NullableStringFieldUpdateOperationsInput | string | null
    float?: FloatFieldUpdateOperationsInput | number
    decimal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    bigInt?: BigIntFieldUpdateOperationsInput | bigint | number
    json?: JsonNullValueInput | InputJsonValue
    bytes?: BytesFieldUpdateOperationsInput | Buffer
    custom?: NullableStringFieldUpdateOperationsInput | string | null
    exclude?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type MyPrismaScalarsTypeUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    string?: NullableStringFieldUpdateOperationsInput | string | null
    bic?: NullableStringFieldUpdateOperationsInput | string | null
    float?: FloatFieldUpdateOperationsInput | number
    decimal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    bigInt?: BigIntFieldUpdateOperationsInput | bigint | number
    json?: JsonNullValueInput | InputJsonValue
    bytes?: BytesFieldUpdateOperationsInput | Buffer
    custom?: NullableStringFieldUpdateOperationsInput | string | null
    exclude?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type MyPrismaScalarsTypeCreateManyInput = {
    id?: string
    string?: string | null
    bic?: string | null
    float: number
    decimal: Decimal | DecimalJsLike | number | string
    date?: Date | string | null
    bigInt: bigint | number
    json: JsonNullValueInput | InputJsonValue
    bytes: Buffer
    custom?: string | null
    exclude?: string | null
  }

  export type MyPrismaScalarsTypeUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    string?: NullableStringFieldUpdateOperationsInput | string | null
    bic?: NullableStringFieldUpdateOperationsInput | string | null
    float?: FloatFieldUpdateOperationsInput | number
    decimal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    bigInt?: BigIntFieldUpdateOperationsInput | bigint | number
    json?: JsonNullValueInput | InputJsonValue
    bytes?: BytesFieldUpdateOperationsInput | Buffer
    custom?: NullableStringFieldUpdateOperationsInput | string | null
    exclude?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type MyPrismaScalarsTypeUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    string?: NullableStringFieldUpdateOperationsInput | string | null
    bic?: NullableStringFieldUpdateOperationsInput | string | null
    float?: FloatFieldUpdateOperationsInput | number
    decimal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    bigInt?: BigIntFieldUpdateOperationsInput | bigint | number
    json?: JsonNullValueInput | InputJsonValue
    bytes?: BytesFieldUpdateOperationsInput | Buffer
    custom?: NullableStringFieldUpdateOperationsInput | string | null
    exclude?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserCreateInput = {
    id?: string
    email: string
    name?: string | null
    posts?: PostCreateNestedManyWithoutAuthorInput
    profile?: ProfileCreateNestedOneWithoutUserInput
    role?: UserCreateroleInput | Enumerable<Role>
    enum?: AnotherEnum
    scalarList?: UserCreatescalarListInput | Enumerable<string>
    location?: LocationCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    name?: string | null
    posts?: PostUncheckedCreateNestedManyWithoutAuthorInput
    profile?: ProfileUncheckedCreateNestedOneWithoutUserInput
    role?: UserCreateroleInput | Enumerable<Role>
    enum?: AnotherEnum
    scalarList?: UserCreatescalarListInput | Enumerable<string>
    lat: number
    lng: number
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    posts?: PostUpdateManyWithoutAuthorNestedInput
    profile?: ProfileUpdateOneWithoutUserNestedInput
    role?: UserUpdateroleInput | Enumerable<Role>
    enum?: EnumAnotherEnumFieldUpdateOperationsInput | AnotherEnum
    scalarList?: UserUpdatescalarListInput | Enumerable<string>
    location?: LocationUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    posts?: PostUncheckedUpdateManyWithoutAuthorNestedInput
    profile?: ProfileUncheckedUpdateOneWithoutUserNestedInput
    role?: UserUpdateroleInput | Enumerable<Role>
    enum?: EnumAnotherEnumFieldUpdateOperationsInput | AnotherEnum
    scalarList?: UserUpdatescalarListInput | Enumerable<string>
    lat?: FloatFieldUpdateOperationsInput | number
    lng?: FloatFieldUpdateOperationsInput | number
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    name?: string | null
    role?: UserCreateroleInput | Enumerable<Role>
    enum?: AnotherEnum
    scalarList?: UserCreatescalarListInput | Enumerable<string>
    lat: number
    lng: number
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: UserUpdateroleInput | Enumerable<Role>
    enum?: EnumAnotherEnumFieldUpdateOperationsInput | AnotherEnum
    scalarList?: UserUpdatescalarListInput | Enumerable<string>
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: UserUpdateroleInput | Enumerable<Role>
    enum?: EnumAnotherEnumFieldUpdateOperationsInput | AnotherEnum
    scalarList?: UserUpdatescalarListInput | Enumerable<string>
    lat?: FloatFieldUpdateOperationsInput | number
    lng?: FloatFieldUpdateOperationsInput | number
  }

  export type PostCreateInput = {
    title: string
    content?: string | null
    published?: boolean
    author: UserCreateNestedOneWithoutPostsInput
    anotherEnum?: PostCreateanotherEnumInput | Enumerable<AnotherEnum>
  }

  export type PostUncheckedCreateInput = {
    id?: number
    title: string
    content?: string | null
    published?: boolean
    authorId: string
    anotherEnum?: PostCreateanotherEnumInput | Enumerable<AnotherEnum>
  }

  export type PostUpdateInput = {
    title?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    published?: BoolFieldUpdateOperationsInput | boolean
    author?: UserUpdateOneRequiredWithoutPostsNestedInput
    anotherEnum?: PostUpdateanotherEnumInput | Enumerable<AnotherEnum>
  }

  export type PostUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    published?: BoolFieldUpdateOperationsInput | boolean
    authorId?: StringFieldUpdateOperationsInput | string
    anotherEnum?: PostUpdateanotherEnumInput | Enumerable<AnotherEnum>
  }

  export type PostCreateManyInput = {
    id?: number
    title: string
    content?: string | null
    published?: boolean
    authorId: string
    anotherEnum?: PostCreateanotherEnumInput | Enumerable<AnotherEnum>
  }

  export type PostUpdateManyMutationInput = {
    title?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    published?: BoolFieldUpdateOperationsInput | boolean
    anotherEnum?: PostUpdateanotherEnumInput | Enumerable<AnotherEnum>
  }

  export type PostUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    published?: BoolFieldUpdateOperationsInput | boolean
    authorId?: StringFieldUpdateOperationsInput | string
    anotherEnum?: PostUpdateanotherEnumInput | Enumerable<AnotherEnum>
  }

  export type ProfileCreateInput = {
    bio: string
    user: UserCreateNestedOneWithoutProfileInput
    role?: ProfileCreateroleInput | Enumerable<Role>
    second?: SecondEnum
  }

  export type ProfileUncheckedCreateInput = {
    id?: number
    bio: string
    userId: string
    role?: ProfileCreateroleInput | Enumerable<Role>
    second?: SecondEnum
  }

  export type ProfileUpdateInput = {
    bio?: StringFieldUpdateOperationsInput | string
    user?: UserUpdateOneRequiredWithoutProfileNestedInput
    role?: ProfileUpdateroleInput | Enumerable<Role>
    second?: EnumSecondEnumFieldUpdateOperationsInput | SecondEnum
  }

  export type ProfileUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    bio?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    role?: ProfileUpdateroleInput | Enumerable<Role>
    second?: EnumSecondEnumFieldUpdateOperationsInput | SecondEnum
  }

  export type ProfileCreateManyInput = {
    id?: number
    bio: string
    userId: string
    role?: ProfileCreateroleInput | Enumerable<Role>
    second?: SecondEnum
  }

  export type ProfileUpdateManyMutationInput = {
    bio?: StringFieldUpdateOperationsInput | string
    role?: ProfileUpdateroleInput | Enumerable<Role>
    second?: EnumSecondEnumFieldUpdateOperationsInput | SecondEnum
  }

  export type ProfileUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    bio?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    role?: ProfileUpdateroleInput | Enumerable<Role>
    second?: EnumSecondEnumFieldUpdateOperationsInput | SecondEnum
  }

  export type LocationCreateInput = {
    lat: number
    lng: number
    User?: UserCreateNestedManyWithoutLocationInput
  }

  export type LocationUncheckedCreateInput = {
    lat: number
    lng: number
    User?: UserUncheckedCreateNestedManyWithoutLocationInput
  }

  export type LocationUpdateInput = {
    lat?: FloatFieldUpdateOperationsInput | number
    lng?: FloatFieldUpdateOperationsInput | number
    User?: UserUpdateManyWithoutLocationNestedInput
  }

  export type LocationUncheckedUpdateInput = {
    lat?: FloatFieldUpdateOperationsInput | number
    lng?: FloatFieldUpdateOperationsInput | number
    User?: UserUncheckedUpdateManyWithoutLocationNestedInput
  }

  export type LocationCreateManyInput = {
    lat: number
    lng: number
  }

  export type LocationUpdateManyMutationInput = {
    lat?: FloatFieldUpdateOperationsInput | number
    lng?: FloatFieldUpdateOperationsInput | number
  }

  export type LocationUncheckedUpdateManyInput = {
    lat?: FloatFieldUpdateOperationsInput | number
    lng?: FloatFieldUpdateOperationsInput | number
  }

  export type IntFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntFilter | number
  }

  export type StringNullableFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringNullableFilter | string | null
  }

  export type StringFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringFilter | string
  }

  export type MyModelCountOrderByAggregateInput = {
    id?: SortOrder
    string?: SortOrder
    omitField?: SortOrder
    omitRequired?: SortOrder
  }

  export type MyModelAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type MyModelMaxOrderByAggregateInput = {
    id?: SortOrder
    string?: SortOrder
    omitField?: SortOrder
    omitRequired?: SortOrder
  }

  export type MyModelMinOrderByAggregateInput = {
    id?: SortOrder
    string?: SortOrder
    omitField?: SortOrder
    omitRequired?: SortOrder
  }

  export type MyModelSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntWithAggregatesFilter | number
    _count?: NestedIntFilter
    _avg?: NestedFloatFilter
    _sum?: NestedIntFilter
    _min?: NestedIntFilter
    _max?: NestedIntFilter
  }

  export type StringNullableWithAggregatesFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedStringNullableFilter
    _max?: NestedStringNullableFilter
  }

  export type StringWithAggregatesFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter | string
    _count?: NestedIntFilter
    _min?: NestedStringFilter
    _max?: NestedStringFilter
  }

  export type EnumMYValueFilter = {
    equals?: MYValue
    in?: Enumerable<MYValue>
    notIn?: Enumerable<MYValue>
    not?: NestedEnumMYValueFilter | MYValue
  }

  export type MODELWithUpperCaseCountOrderByAggregateInput = {
    id?: SortOrder
    STRING?: SortOrder
    MYValue?: SortOrder
  }

  export type MODELWithUpperCaseAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type MODELWithUpperCaseMaxOrderByAggregateInput = {
    id?: SortOrder
    STRING?: SortOrder
    MYValue?: SortOrder
  }

  export type MODELWithUpperCaseMinOrderByAggregateInput = {
    id?: SortOrder
    STRING?: SortOrder
    MYValue?: SortOrder
  }

  export type MODELWithUpperCaseSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type EnumMYValueWithAggregatesFilter = {
    equals?: MYValue
    in?: Enumerable<MYValue>
    notIn?: Enumerable<MYValue>
    not?: NestedEnumMYValueWithAggregatesFilter | MYValue
    _count?: NestedIntFilter
    _min?: NestedEnumMYValueFilter
    _max?: NestedEnumMYValueFilter
  }
  export type JsonFilter = 
    | PatchUndefined<
        Either<Required<JsonFilterBase>, Exclude<keyof Required<JsonFilterBase>, 'path'>>,
        Required<JsonFilterBase>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase>, 'path'>>

  export type JsonFilterBase = {
    equals?: InputJsonValue | JsonNullValueFilter
    path?: Array<string>
    string_contains?: string
    string_starts_with?: string
    string_ends_with?: string
    array_contains?: InputJsonValue | null
    array_starts_with?: InputJsonValue | null
    array_ends_with?: InputJsonValue | null
    lt?: InputJsonValue
    lte?: InputJsonValue
    gt?: InputJsonValue
    gte?: InputJsonValue
    not?: InputJsonValue | JsonNullValueFilter
  }
  export type JsonNullableFilter = 
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase>, Exclude<keyof Required<JsonNullableFilterBase>, 'path'>>,
        Required<JsonNullableFilterBase>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase>, 'path'>>

  export type JsonNullableFilterBase = {
    equals?: InputJsonValue | JsonNullValueFilter
    path?: Array<string>
    string_contains?: string
    string_starts_with?: string
    string_ends_with?: string
    array_contains?: InputJsonValue | null
    array_starts_with?: InputJsonValue | null
    array_ends_with?: InputJsonValue | null
    lt?: InputJsonValue
    lte?: InputJsonValue
    gt?: InputJsonValue
    gte?: InputJsonValue
    not?: InputJsonValue | JsonNullValueFilter
  }

  export type JsonModelCountOrderByAggregateInput = {
    id?: SortOrder
    json?: SortOrder
    jsonOpt?: SortOrder
  }

  export type JsonModelAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type JsonModelMaxOrderByAggregateInput = {
    id?: SortOrder
  }

  export type JsonModelMinOrderByAggregateInput = {
    id?: SortOrder
  }

  export type JsonModelSumOrderByAggregateInput = {
    id?: SortOrder
  }
  export type JsonWithAggregatesFilter = 
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase>, Exclude<keyof Required<JsonWithAggregatesFilterBase>, 'path'>>,
        Required<JsonWithAggregatesFilterBase>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase>, 'path'>>

  export type JsonWithAggregatesFilterBase = {
    equals?: InputJsonValue | JsonNullValueFilter
    path?: Array<string>
    string_contains?: string
    string_starts_with?: string
    string_ends_with?: string
    array_contains?: InputJsonValue | null
    array_starts_with?: InputJsonValue | null
    array_ends_with?: InputJsonValue | null
    lt?: InputJsonValue
    lte?: InputJsonValue
    gt?: InputJsonValue
    gte?: InputJsonValue
    not?: InputJsonValue | JsonNullValueFilter
    _count?: NestedIntFilter
    _min?: NestedJsonFilter
    _max?: NestedJsonFilter
  }
  export type JsonNullableWithAggregatesFilter = 
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase = {
    equals?: InputJsonValue | JsonNullValueFilter
    path?: Array<string>
    string_contains?: string
    string_starts_with?: string
    string_ends_with?: string
    array_contains?: InputJsonValue | null
    array_starts_with?: InputJsonValue | null
    array_ends_with?: InputJsonValue | null
    lt?: InputJsonValue
    lte?: InputJsonValue
    gt?: InputJsonValue
    gte?: InputJsonValue
    not?: InputJsonValue | JsonNullValueFilter
    _count?: NestedIntNullableFilter
    _min?: NestedJsonNullableFilter
    _max?: NestedJsonNullableFilter
  }

  export type IntNullableFilter = {
    equals?: number | null
    in?: Enumerable<number> | null
    notIn?: Enumerable<number> | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntNullableFilter | number | null
  }

  export type FloatNullableFilter = {
    equals?: number | null
    in?: Enumerable<number> | null
    notIn?: Enumerable<number> | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedFloatNullableFilter | number | null
  }

  export type FloatFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedFloatFilter | number
  }

  export type DecimalFilter = {
    equals?: Decimal | DecimalJsLike | number | string
    in?: Enumerable<Decimal> | Enumerable<DecimalJsLike> | Enumerable<number> | Enumerable<string>
    notIn?: Enumerable<Decimal> | Enumerable<DecimalJsLike> | Enumerable<number> | Enumerable<string>
    lt?: Decimal | DecimalJsLike | number | string
    lte?: Decimal | DecimalJsLike | number | string
    gt?: Decimal | DecimalJsLike | number | string
    gte?: Decimal | DecimalJsLike | number | string
    not?: NestedDecimalFilter | Decimal | DecimalJsLike | number | string
  }

  export type DecimalNullableFilter = {
    equals?: Decimal | DecimalJsLike | number | string | null
    in?: Enumerable<Decimal> | Enumerable<DecimalJsLike> | Enumerable<number> | Enumerable<string> | null
    notIn?: Enumerable<Decimal> | Enumerable<DecimalJsLike> | Enumerable<number> | Enumerable<string> | null
    lt?: Decimal | DecimalJsLike | number | string
    lte?: Decimal | DecimalJsLike | number | string
    gt?: Decimal | DecimalJsLike | number | string
    gte?: Decimal | DecimalJsLike | number | string
    not?: NestedDecimalNullableFilter | Decimal | DecimalJsLike | number | string | null
  }

  export type DateTimeFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeFilter | Date | string
  }

  export type DateTimeNullableFilter = {
    equals?: Date | string | null
    in?: Enumerable<Date> | Enumerable<string> | null
    notIn?: Enumerable<Date> | Enumerable<string> | null
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeNullableFilter | Date | string | null
  }

  export type BigIntFilter = {
    equals?: bigint | number
    in?: Enumerable<bigint> | Enumerable<number>
    notIn?: Enumerable<bigint> | Enumerable<number>
    lt?: bigint | number
    lte?: bigint | number
    gt?: bigint | number
    gte?: bigint | number
    not?: NestedBigIntFilter | bigint | number
  }

  export type BigIntNullableFilter = {
    equals?: bigint | number | null
    in?: Enumerable<bigint> | Enumerable<number> | null
    notIn?: Enumerable<bigint> | Enumerable<number> | null
    lt?: bigint | number
    lte?: bigint | number
    gt?: bigint | number
    gte?: bigint | number
    not?: NestedBigIntNullableFilter | bigint | number | null
  }

  export type BytesFilter = {
    equals?: Buffer
    in?: Enumerable<Buffer>
    notIn?: Enumerable<Buffer>
    not?: NestedBytesFilter | Buffer
  }

  export type BytesNullableFilter = {
    equals?: Buffer | null
    in?: Enumerable<Buffer> | null
    notIn?: Enumerable<Buffer> | null
    not?: NestedBytesNullableFilter | Buffer | null
  }

  export type TestCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    value?: SortOrder
    bic?: SortOrder
    intTwo?: SortOrder
    int?: SortOrder
    floatOpt?: SortOrder
    float?: SortOrder
    decimal?: SortOrder
    decimalOpt?: SortOrder
    date?: SortOrder
    dateOpt?: SortOrder
    bigInt?: SortOrder
    bigIntOpt?: SortOrder
    json?: SortOrder
    jsonOpt?: SortOrder
    bytes?: SortOrder
    bytesOpt?: SortOrder
  }

  export type TestAvgOrderByAggregateInput = {
    intTwo?: SortOrder
    int?: SortOrder
    floatOpt?: SortOrder
    float?: SortOrder
    decimal?: SortOrder
    decimalOpt?: SortOrder
    bigInt?: SortOrder
    bigIntOpt?: SortOrder
  }

  export type TestMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    value?: SortOrder
    bic?: SortOrder
    intTwo?: SortOrder
    int?: SortOrder
    floatOpt?: SortOrder
    float?: SortOrder
    decimal?: SortOrder
    decimalOpt?: SortOrder
    date?: SortOrder
    dateOpt?: SortOrder
    bigInt?: SortOrder
    bigIntOpt?: SortOrder
    bytes?: SortOrder
    bytesOpt?: SortOrder
  }

  export type TestMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    value?: SortOrder
    bic?: SortOrder
    intTwo?: SortOrder
    int?: SortOrder
    floatOpt?: SortOrder
    float?: SortOrder
    decimal?: SortOrder
    decimalOpt?: SortOrder
    date?: SortOrder
    dateOpt?: SortOrder
    bigInt?: SortOrder
    bigIntOpt?: SortOrder
    bytes?: SortOrder
    bytesOpt?: SortOrder
  }

  export type TestSumOrderByAggregateInput = {
    intTwo?: SortOrder
    int?: SortOrder
    floatOpt?: SortOrder
    float?: SortOrder
    decimal?: SortOrder
    decimalOpt?: SortOrder
    bigInt?: SortOrder
    bigIntOpt?: SortOrder
  }

  export type IntNullableWithAggregatesFilter = {
    equals?: number | null
    in?: Enumerable<number> | null
    notIn?: Enumerable<number> | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntNullableWithAggregatesFilter | number | null
    _count?: NestedIntNullableFilter
    _avg?: NestedFloatNullableFilter
    _sum?: NestedIntNullableFilter
    _min?: NestedIntNullableFilter
    _max?: NestedIntNullableFilter
  }

  export type FloatNullableWithAggregatesFilter = {
    equals?: number | null
    in?: Enumerable<number> | null
    notIn?: Enumerable<number> | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedFloatNullableWithAggregatesFilter | number | null
    _count?: NestedIntNullableFilter
    _avg?: NestedFloatNullableFilter
    _sum?: NestedFloatNullableFilter
    _min?: NestedFloatNullableFilter
    _max?: NestedFloatNullableFilter
  }

  export type FloatWithAggregatesFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedFloatWithAggregatesFilter | number
    _count?: NestedIntFilter
    _avg?: NestedFloatFilter
    _sum?: NestedFloatFilter
    _min?: NestedFloatFilter
    _max?: NestedFloatFilter
  }

  export type DecimalWithAggregatesFilter = {
    equals?: Decimal | DecimalJsLike | number | string
    in?: Enumerable<Decimal> | Enumerable<DecimalJsLike> | Enumerable<number> | Enumerable<string>
    notIn?: Enumerable<Decimal> | Enumerable<DecimalJsLike> | Enumerable<number> | Enumerable<string>
    lt?: Decimal | DecimalJsLike | number | string
    lte?: Decimal | DecimalJsLike | number | string
    gt?: Decimal | DecimalJsLike | number | string
    gte?: Decimal | DecimalJsLike | number | string
    not?: NestedDecimalWithAggregatesFilter | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter
    _avg?: NestedDecimalFilter
    _sum?: NestedDecimalFilter
    _min?: NestedDecimalFilter
    _max?: NestedDecimalFilter
  }

  export type DecimalNullableWithAggregatesFilter = {
    equals?: Decimal | DecimalJsLike | number | string | null
    in?: Enumerable<Decimal> | Enumerable<DecimalJsLike> | Enumerable<number> | Enumerable<string> | null
    notIn?: Enumerable<Decimal> | Enumerable<DecimalJsLike> | Enumerable<number> | Enumerable<string> | null
    lt?: Decimal | DecimalJsLike | number | string
    lte?: Decimal | DecimalJsLike | number | string
    gt?: Decimal | DecimalJsLike | number | string
    gte?: Decimal | DecimalJsLike | number | string
    not?: NestedDecimalNullableWithAggregatesFilter | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter
    _avg?: NestedDecimalNullableFilter
    _sum?: NestedDecimalNullableFilter
    _min?: NestedDecimalNullableFilter
    _max?: NestedDecimalNullableFilter
  }

  export type DateTimeWithAggregatesFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeWithAggregatesFilter | Date | string
    _count?: NestedIntFilter
    _min?: NestedDateTimeFilter
    _max?: NestedDateTimeFilter
  }

  export type DateTimeNullableWithAggregatesFilter = {
    equals?: Date | string | null
    in?: Enumerable<Date> | Enumerable<string> | null
    notIn?: Enumerable<Date> | Enumerable<string> | null
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeNullableWithAggregatesFilter | Date | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedDateTimeNullableFilter
    _max?: NestedDateTimeNullableFilter
  }

  export type BigIntWithAggregatesFilter = {
    equals?: bigint | number
    in?: Enumerable<bigint> | Enumerable<number>
    notIn?: Enumerable<bigint> | Enumerable<number>
    lt?: bigint | number
    lte?: bigint | number
    gt?: bigint | number
    gte?: bigint | number
    not?: NestedBigIntWithAggregatesFilter | bigint | number
    _count?: NestedIntFilter
    _avg?: NestedFloatFilter
    _sum?: NestedBigIntFilter
    _min?: NestedBigIntFilter
    _max?: NestedBigIntFilter
  }

  export type BigIntNullableWithAggregatesFilter = {
    equals?: bigint | number | null
    in?: Enumerable<bigint> | Enumerable<number> | null
    notIn?: Enumerable<bigint> | Enumerable<number> | null
    lt?: bigint | number
    lte?: bigint | number
    gt?: bigint | number
    gte?: bigint | number
    not?: NestedBigIntNullableWithAggregatesFilter | bigint | number | null
    _count?: NestedIntNullableFilter
    _avg?: NestedFloatNullableFilter
    _sum?: NestedBigIntNullableFilter
    _min?: NestedBigIntNullableFilter
    _max?: NestedBigIntNullableFilter
  }

  export type BytesWithAggregatesFilter = {
    equals?: Buffer
    in?: Enumerable<Buffer>
    notIn?: Enumerable<Buffer>
    not?: NestedBytesWithAggregatesFilter | Buffer
    _count?: NestedIntFilter
    _min?: NestedBytesFilter
    _max?: NestedBytesFilter
  }

  export type BytesNullableWithAggregatesFilter = {
    equals?: Buffer | null
    in?: Enumerable<Buffer> | null
    notIn?: Enumerable<Buffer> | null
    not?: NestedBytesNullableWithAggregatesFilter | Buffer | null
    _count?: NestedIntNullableFilter
    _min?: NestedBytesNullableFilter
    _max?: NestedBytesNullableFilter
  }

  export type MyPrismaScalarsTypeCountOrderByAggregateInput = {
    id?: SortOrder
    string?: SortOrder
    bic?: SortOrder
    float?: SortOrder
    decimal?: SortOrder
    date?: SortOrder
    bigInt?: SortOrder
    json?: SortOrder
    bytes?: SortOrder
    custom?: SortOrder
    exclude?: SortOrder
  }

  export type MyPrismaScalarsTypeAvgOrderByAggregateInput = {
    float?: SortOrder
    decimal?: SortOrder
    bigInt?: SortOrder
  }

  export type MyPrismaScalarsTypeMaxOrderByAggregateInput = {
    id?: SortOrder
    string?: SortOrder
    bic?: SortOrder
    float?: SortOrder
    decimal?: SortOrder
    date?: SortOrder
    bigInt?: SortOrder
    bytes?: SortOrder
    custom?: SortOrder
    exclude?: SortOrder
  }

  export type MyPrismaScalarsTypeMinOrderByAggregateInput = {
    id?: SortOrder
    string?: SortOrder
    bic?: SortOrder
    float?: SortOrder
    decimal?: SortOrder
    date?: SortOrder
    bigInt?: SortOrder
    bytes?: SortOrder
    custom?: SortOrder
    exclude?: SortOrder
  }

  export type MyPrismaScalarsTypeSumOrderByAggregateInput = {
    float?: SortOrder
    decimal?: SortOrder
    bigInt?: SortOrder
  }

  export type PostListRelationFilter = {
    every?: PostWhereInput
    some?: PostWhereInput
    none?: PostWhereInput
  }

  export type ProfileRelationFilter = {
    is?: ProfileWhereInput | null
    isNot?: ProfileWhereInput | null
  }

  export type EnumRoleNullableListFilter = {
    equals?: Enumerable<Role> | null
    has?: Role | null
    hasEvery?: Enumerable<Role>
    hasSome?: Enumerable<Role>
    isEmpty?: boolean
  }

  export type EnumAnotherEnumFilter = {
    equals?: AnotherEnum
    in?: Enumerable<AnotherEnum>
    notIn?: Enumerable<AnotherEnum>
    not?: NestedEnumAnotherEnumFilter | AnotherEnum
  }

  export type StringNullableListFilter = {
    equals?: Enumerable<string> | null
    has?: string | null
    hasEvery?: Enumerable<string>
    hasSome?: Enumerable<string>
    isEmpty?: boolean
  }

  export type LocationRelationFilter = {
    is?: LocationWhereInput | null
    isNot?: LocationWhereInput | null
  }

  export type PostOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    role?: SortOrder
    enum?: SortOrder
    scalarList?: SortOrder
    lat?: SortOrder
    lng?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    lat?: SortOrder
    lng?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    enum?: SortOrder
    lat?: SortOrder
    lng?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    enum?: SortOrder
    lat?: SortOrder
    lng?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    lat?: SortOrder
    lng?: SortOrder
  }

  export type EnumAnotherEnumWithAggregatesFilter = {
    equals?: AnotherEnum
    in?: Enumerable<AnotherEnum>
    notIn?: Enumerable<AnotherEnum>
    not?: NestedEnumAnotherEnumWithAggregatesFilter | AnotherEnum
    _count?: NestedIntFilter
    _min?: NestedEnumAnotherEnumFilter
    _max?: NestedEnumAnotherEnumFilter
  }

  export type BoolFilter = {
    equals?: boolean
    not?: NestedBoolFilter | boolean
  }

  export type UserRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type EnumAnotherEnumNullableListFilter = {
    equals?: Enumerable<AnotherEnum> | null
    has?: AnotherEnum | null
    hasEvery?: Enumerable<AnotherEnum>
    hasSome?: Enumerable<AnotherEnum>
    isEmpty?: boolean
  }

  export type PostCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    published?: SortOrder
    authorId?: SortOrder
    anotherEnum?: SortOrder
  }

  export type PostAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type PostMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    published?: SortOrder
    authorId?: SortOrder
  }

  export type PostMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    published?: SortOrder
    authorId?: SortOrder
  }

  export type PostSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type BoolWithAggregatesFilter = {
    equals?: boolean
    not?: NestedBoolWithAggregatesFilter | boolean
    _count?: NestedIntFilter
    _min?: NestedBoolFilter
    _max?: NestedBoolFilter
  }

  export type EnumSecondEnumFilter = {
    equals?: SecondEnum
    in?: Enumerable<SecondEnum>
    notIn?: Enumerable<SecondEnum>
    not?: NestedEnumSecondEnumFilter | SecondEnum
  }

  export type ProfileCountOrderByAggregateInput = {
    id?: SortOrder
    bio?: SortOrder
    userId?: SortOrder
    role?: SortOrder
    second?: SortOrder
  }

  export type ProfileAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type ProfileMaxOrderByAggregateInput = {
    id?: SortOrder
    bio?: SortOrder
    userId?: SortOrder
    second?: SortOrder
  }

  export type ProfileMinOrderByAggregateInput = {
    id?: SortOrder
    bio?: SortOrder
    userId?: SortOrder
    second?: SortOrder
  }

  export type ProfileSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type EnumSecondEnumWithAggregatesFilter = {
    equals?: SecondEnum
    in?: Enumerable<SecondEnum>
    notIn?: Enumerable<SecondEnum>
    not?: NestedEnumSecondEnumWithAggregatesFilter | SecondEnum
    _count?: NestedIntFilter
    _min?: NestedEnumSecondEnumFilter
    _max?: NestedEnumSecondEnumFilter
  }

  export type UserListRelationFilter = {
    every?: UserWhereInput
    some?: UserWhereInput
    none?: UserWhereInput
  }

  export type UserOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type LocationLatLngCompoundUniqueInput = {
    lat: number
    lng: number
  }

  export type LocationCountOrderByAggregateInput = {
    lat?: SortOrder
    lng?: SortOrder
  }

  export type LocationAvgOrderByAggregateInput = {
    lat?: SortOrder
    lng?: SortOrder
  }

  export type LocationMaxOrderByAggregateInput = {
    lat?: SortOrder
    lng?: SortOrder
  }

  export type LocationMinOrderByAggregateInput = {
    lat?: SortOrder
    lng?: SortOrder
  }

  export type LocationSumOrderByAggregateInput = {
    lat?: SortOrder
    lng?: SortOrder
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EnumMYValueFieldUpdateOperationsInput = {
    set?: MYValue
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type NullableDecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string | null
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type BigIntFieldUpdateOperationsInput = {
    set?: bigint | number
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
  }

  export type NullableBigIntFieldUpdateOperationsInput = {
    set?: bigint | number | null
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
  }

  export type BytesFieldUpdateOperationsInput = {
    set?: Buffer
  }

  export type NullableBytesFieldUpdateOperationsInput = {
    set?: Buffer | null
  }

  export type PostCreateNestedManyWithoutAuthorInput = {
    create?: XOR<Enumerable<PostCreateWithoutAuthorInput>, Enumerable<PostUncheckedCreateWithoutAuthorInput>>
    connectOrCreate?: Enumerable<PostCreateOrConnectWithoutAuthorInput>
    createMany?: PostCreateManyAuthorInputEnvelope
    connect?: Enumerable<PostWhereUniqueInput>
  }

  export type ProfileCreateNestedOneWithoutUserInput = {
    create?: XOR<ProfileCreateWithoutUserInput, ProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutUserInput
    connect?: ProfileWhereUniqueInput
  }

  export type UserCreateroleInput = {
    set: Enumerable<Role>
  }

  export type UserCreatescalarListInput = {
    set: Enumerable<string>
  }

  export type LocationCreateNestedOneWithoutUserInput = {
    create?: XOR<LocationCreateWithoutUserInput, LocationUncheckedCreateWithoutUserInput>
    connectOrCreate?: LocationCreateOrConnectWithoutUserInput
    connect?: LocationWhereUniqueInput
  }

  export type PostUncheckedCreateNestedManyWithoutAuthorInput = {
    create?: XOR<Enumerable<PostCreateWithoutAuthorInput>, Enumerable<PostUncheckedCreateWithoutAuthorInput>>
    connectOrCreate?: Enumerable<PostCreateOrConnectWithoutAuthorInput>
    createMany?: PostCreateManyAuthorInputEnvelope
    connect?: Enumerable<PostWhereUniqueInput>
  }

  export type ProfileUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<ProfileCreateWithoutUserInput, ProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutUserInput
    connect?: ProfileWhereUniqueInput
  }

  export type PostUpdateManyWithoutAuthorNestedInput = {
    create?: XOR<Enumerable<PostCreateWithoutAuthorInput>, Enumerable<PostUncheckedCreateWithoutAuthorInput>>
    connectOrCreate?: Enumerable<PostCreateOrConnectWithoutAuthorInput>
    upsert?: Enumerable<PostUpsertWithWhereUniqueWithoutAuthorInput>
    createMany?: PostCreateManyAuthorInputEnvelope
    set?: Enumerable<PostWhereUniqueInput>
    disconnect?: Enumerable<PostWhereUniqueInput>
    delete?: Enumerable<PostWhereUniqueInput>
    connect?: Enumerable<PostWhereUniqueInput>
    update?: Enumerable<PostUpdateWithWhereUniqueWithoutAuthorInput>
    updateMany?: Enumerable<PostUpdateManyWithWhereWithoutAuthorInput>
    deleteMany?: Enumerable<PostScalarWhereInput>
  }

  export type ProfileUpdateOneWithoutUserNestedInput = {
    create?: XOR<ProfileCreateWithoutUserInput, ProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutUserInput
    upsert?: ProfileUpsertWithoutUserInput
    disconnect?: boolean
    delete?: boolean
    connect?: ProfileWhereUniqueInput
    update?: XOR<ProfileUpdateWithoutUserInput, ProfileUncheckedUpdateWithoutUserInput>
  }

  export type UserUpdateroleInput = {
    set?: Enumerable<Role>
    push?: Enumerable<Role>
  }

  export type EnumAnotherEnumFieldUpdateOperationsInput = {
    set?: AnotherEnum
  }

  export type UserUpdatescalarListInput = {
    set?: Enumerable<string>
    push?: string | Enumerable<string>
  }

  export type LocationUpdateOneWithoutUserNestedInput = {
    create?: XOR<LocationCreateWithoutUserInput, LocationUncheckedCreateWithoutUserInput>
    connectOrCreate?: LocationCreateOrConnectWithoutUserInput
    upsert?: LocationUpsertWithoutUserInput
    disconnect?: boolean
    delete?: boolean
    connect?: LocationWhereUniqueInput
    update?: XOR<LocationUpdateWithoutUserInput, LocationUncheckedUpdateWithoutUserInput>
  }

  export type PostUncheckedUpdateManyWithoutAuthorNestedInput = {
    create?: XOR<Enumerable<PostCreateWithoutAuthorInput>, Enumerable<PostUncheckedCreateWithoutAuthorInput>>
    connectOrCreate?: Enumerable<PostCreateOrConnectWithoutAuthorInput>
    upsert?: Enumerable<PostUpsertWithWhereUniqueWithoutAuthorInput>
    createMany?: PostCreateManyAuthorInputEnvelope
    set?: Enumerable<PostWhereUniqueInput>
    disconnect?: Enumerable<PostWhereUniqueInput>
    delete?: Enumerable<PostWhereUniqueInput>
    connect?: Enumerable<PostWhereUniqueInput>
    update?: Enumerable<PostUpdateWithWhereUniqueWithoutAuthorInput>
    updateMany?: Enumerable<PostUpdateManyWithWhereWithoutAuthorInput>
    deleteMany?: Enumerable<PostScalarWhereInput>
  }

  export type ProfileUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<ProfileCreateWithoutUserInput, ProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: ProfileCreateOrConnectWithoutUserInput
    upsert?: ProfileUpsertWithoutUserInput
    disconnect?: boolean
    delete?: boolean
    connect?: ProfileWhereUniqueInput
    update?: XOR<ProfileUpdateWithoutUserInput, ProfileUncheckedUpdateWithoutUserInput>
  }

  export type UserCreateNestedOneWithoutPostsInput = {
    create?: XOR<UserCreateWithoutPostsInput, UserUncheckedCreateWithoutPostsInput>
    connectOrCreate?: UserCreateOrConnectWithoutPostsInput
    connect?: UserWhereUniqueInput
  }

  export type PostCreateanotherEnumInput = {
    set: Enumerable<AnotherEnum>
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type UserUpdateOneRequiredWithoutPostsNestedInput = {
    create?: XOR<UserCreateWithoutPostsInput, UserUncheckedCreateWithoutPostsInput>
    connectOrCreate?: UserCreateOrConnectWithoutPostsInput
    upsert?: UserUpsertWithoutPostsInput
    connect?: UserWhereUniqueInput
    update?: XOR<UserUpdateWithoutPostsInput, UserUncheckedUpdateWithoutPostsInput>
  }

  export type PostUpdateanotherEnumInput = {
    set?: Enumerable<AnotherEnum>
    push?: Enumerable<AnotherEnum>
  }

  export type UserCreateNestedOneWithoutProfileInput = {
    create?: XOR<UserCreateWithoutProfileInput, UserUncheckedCreateWithoutProfileInput>
    connectOrCreate?: UserCreateOrConnectWithoutProfileInput
    connect?: UserWhereUniqueInput
  }

  export type ProfileCreateroleInput = {
    set: Enumerable<Role>
  }

  export type UserUpdateOneRequiredWithoutProfileNestedInput = {
    create?: XOR<UserCreateWithoutProfileInput, UserUncheckedCreateWithoutProfileInput>
    connectOrCreate?: UserCreateOrConnectWithoutProfileInput
    upsert?: UserUpsertWithoutProfileInput
    connect?: UserWhereUniqueInput
    update?: XOR<UserUpdateWithoutProfileInput, UserUncheckedUpdateWithoutProfileInput>
  }

  export type ProfileUpdateroleInput = {
    set?: Enumerable<Role>
    push?: Enumerable<Role>
  }

  export type EnumSecondEnumFieldUpdateOperationsInput = {
    set?: SecondEnum
  }

  export type UserCreateNestedManyWithoutLocationInput = {
    create?: XOR<Enumerable<UserCreateWithoutLocationInput>, Enumerable<UserUncheckedCreateWithoutLocationInput>>
    connectOrCreate?: Enumerable<UserCreateOrConnectWithoutLocationInput>
    createMany?: UserCreateManyLocationInputEnvelope
    connect?: Enumerable<UserWhereUniqueInput>
  }

  export type UserUncheckedCreateNestedManyWithoutLocationInput = {
    create?: XOR<Enumerable<UserCreateWithoutLocationInput>, Enumerable<UserUncheckedCreateWithoutLocationInput>>
    connectOrCreate?: Enumerable<UserCreateOrConnectWithoutLocationInput>
    createMany?: UserCreateManyLocationInputEnvelope
    connect?: Enumerable<UserWhereUniqueInput>
  }

  export type UserUpdateManyWithoutLocationNestedInput = {
    create?: XOR<Enumerable<UserCreateWithoutLocationInput>, Enumerable<UserUncheckedCreateWithoutLocationInput>>
    connectOrCreate?: Enumerable<UserCreateOrConnectWithoutLocationInput>
    upsert?: Enumerable<UserUpsertWithWhereUniqueWithoutLocationInput>
    createMany?: UserCreateManyLocationInputEnvelope
    set?: Enumerable<UserWhereUniqueInput>
    disconnect?: Enumerable<UserWhereUniqueInput>
    delete?: Enumerable<UserWhereUniqueInput>
    connect?: Enumerable<UserWhereUniqueInput>
    update?: Enumerable<UserUpdateWithWhereUniqueWithoutLocationInput>
    updateMany?: Enumerable<UserUpdateManyWithWhereWithoutLocationInput>
    deleteMany?: Enumerable<UserScalarWhereInput>
  }

  export type UserUncheckedUpdateManyWithoutLocationNestedInput = {
    create?: XOR<Enumerable<UserCreateWithoutLocationInput>, Enumerable<UserUncheckedCreateWithoutLocationInput>>
    connectOrCreate?: Enumerable<UserCreateOrConnectWithoutLocationInput>
    upsert?: Enumerable<UserUpsertWithWhereUniqueWithoutLocationInput>
    createMany?: UserCreateManyLocationInputEnvelope
    set?: Enumerable<UserWhereUniqueInput>
    disconnect?: Enumerable<UserWhereUniqueInput>
    delete?: Enumerable<UserWhereUniqueInput>
    connect?: Enumerable<UserWhereUniqueInput>
    update?: Enumerable<UserUpdateWithWhereUniqueWithoutLocationInput>
    updateMany?: Enumerable<UserUpdateManyWithWhereWithoutLocationInput>
    deleteMany?: Enumerable<UserScalarWhereInput>
  }

  export type NestedIntFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntFilter | number
  }

  export type NestedStringNullableFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringNullableFilter | string | null
  }

  export type NestedStringFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringFilter | string
  }

  export type NestedIntWithAggregatesFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntWithAggregatesFilter | number
    _count?: NestedIntFilter
    _avg?: NestedFloatFilter
    _sum?: NestedIntFilter
    _min?: NestedIntFilter
    _max?: NestedIntFilter
  }

  export type NestedFloatFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedFloatFilter | number
  }

  export type NestedStringNullableWithAggregatesFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringNullableWithAggregatesFilter | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedStringNullableFilter
    _max?: NestedStringNullableFilter
  }

  export type NestedIntNullableFilter = {
    equals?: number | null
    in?: Enumerable<number> | null
    notIn?: Enumerable<number> | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntNullableFilter | number | null
  }

  export type NestedStringWithAggregatesFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringWithAggregatesFilter | string
    _count?: NestedIntFilter
    _min?: NestedStringFilter
    _max?: NestedStringFilter
  }

  export type NestedEnumMYValueFilter = {
    equals?: MYValue
    in?: Enumerable<MYValue>
    notIn?: Enumerable<MYValue>
    not?: NestedEnumMYValueFilter | MYValue
  }

  export type NestedEnumMYValueWithAggregatesFilter = {
    equals?: MYValue
    in?: Enumerable<MYValue>
    notIn?: Enumerable<MYValue>
    not?: NestedEnumMYValueWithAggregatesFilter | MYValue
    _count?: NestedIntFilter
    _min?: NestedEnumMYValueFilter
    _max?: NestedEnumMYValueFilter
  }
  export type NestedJsonFilter = 
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase>, Exclude<keyof Required<NestedJsonFilterBase>, 'path'>>,
        Required<NestedJsonFilterBase>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase>, 'path'>>

  export type NestedJsonFilterBase = {
    equals?: InputJsonValue | JsonNullValueFilter
    path?: Array<string>
    string_contains?: string
    string_starts_with?: string
    string_ends_with?: string
    array_contains?: InputJsonValue | null
    array_starts_with?: InputJsonValue | null
    array_ends_with?: InputJsonValue | null
    lt?: InputJsonValue
    lte?: InputJsonValue
    gt?: InputJsonValue
    gte?: InputJsonValue
    not?: InputJsonValue | JsonNullValueFilter
  }
  export type NestedJsonNullableFilter = 
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase>, Exclude<keyof Required<NestedJsonNullableFilterBase>, 'path'>>,
        Required<NestedJsonNullableFilterBase>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase>, 'path'>>

  export type NestedJsonNullableFilterBase = {
    equals?: InputJsonValue | JsonNullValueFilter
    path?: Array<string>
    string_contains?: string
    string_starts_with?: string
    string_ends_with?: string
    array_contains?: InputJsonValue | null
    array_starts_with?: InputJsonValue | null
    array_ends_with?: InputJsonValue | null
    lt?: InputJsonValue
    lte?: InputJsonValue
    gt?: InputJsonValue
    gte?: InputJsonValue
    not?: InputJsonValue | JsonNullValueFilter
  }

  export type NestedFloatNullableFilter = {
    equals?: number | null
    in?: Enumerable<number> | null
    notIn?: Enumerable<number> | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedFloatNullableFilter | number | null
  }

  export type NestedDecimalFilter = {
    equals?: Decimal | DecimalJsLike | number | string
    in?: Enumerable<Decimal> | Enumerable<DecimalJsLike> | Enumerable<number> | Enumerable<string>
    notIn?: Enumerable<Decimal> | Enumerable<DecimalJsLike> | Enumerable<number> | Enumerable<string>
    lt?: Decimal | DecimalJsLike | number | string
    lte?: Decimal | DecimalJsLike | number | string
    gt?: Decimal | DecimalJsLike | number | string
    gte?: Decimal | DecimalJsLike | number | string
    not?: NestedDecimalFilter | Decimal | DecimalJsLike | number | string
  }

  export type NestedDecimalNullableFilter = {
    equals?: Decimal | DecimalJsLike | number | string | null
    in?: Enumerable<Decimal> | Enumerable<DecimalJsLike> | Enumerable<number> | Enumerable<string> | null
    notIn?: Enumerable<Decimal> | Enumerable<DecimalJsLike> | Enumerable<number> | Enumerable<string> | null
    lt?: Decimal | DecimalJsLike | number | string
    lte?: Decimal | DecimalJsLike | number | string
    gt?: Decimal | DecimalJsLike | number | string
    gte?: Decimal | DecimalJsLike | number | string
    not?: NestedDecimalNullableFilter | Decimal | DecimalJsLike | number | string | null
  }

  export type NestedDateTimeFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeFilter | Date | string
  }

  export type NestedDateTimeNullableFilter = {
    equals?: Date | string | null
    in?: Enumerable<Date> | Enumerable<string> | null
    notIn?: Enumerable<Date> | Enumerable<string> | null
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeNullableFilter | Date | string | null
  }

  export type NestedBigIntFilter = {
    equals?: bigint | number
    in?: Enumerable<bigint> | Enumerable<number>
    notIn?: Enumerable<bigint> | Enumerable<number>
    lt?: bigint | number
    lte?: bigint | number
    gt?: bigint | number
    gte?: bigint | number
    not?: NestedBigIntFilter | bigint | number
  }

  export type NestedBigIntNullableFilter = {
    equals?: bigint | number | null
    in?: Enumerable<bigint> | Enumerable<number> | null
    notIn?: Enumerable<bigint> | Enumerable<number> | null
    lt?: bigint | number
    lte?: bigint | number
    gt?: bigint | number
    gte?: bigint | number
    not?: NestedBigIntNullableFilter | bigint | number | null
  }

  export type NestedBytesFilter = {
    equals?: Buffer
    in?: Enumerable<Buffer>
    notIn?: Enumerable<Buffer>
    not?: NestedBytesFilter | Buffer
  }

  export type NestedBytesNullableFilter = {
    equals?: Buffer | null
    in?: Enumerable<Buffer> | null
    notIn?: Enumerable<Buffer> | null
    not?: NestedBytesNullableFilter | Buffer | null
  }

  export type NestedIntNullableWithAggregatesFilter = {
    equals?: number | null
    in?: Enumerable<number> | null
    notIn?: Enumerable<number> | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntNullableWithAggregatesFilter | number | null
    _count?: NestedIntNullableFilter
    _avg?: NestedFloatNullableFilter
    _sum?: NestedIntNullableFilter
    _min?: NestedIntNullableFilter
    _max?: NestedIntNullableFilter
  }

  export type NestedFloatNullableWithAggregatesFilter = {
    equals?: number | null
    in?: Enumerable<number> | null
    notIn?: Enumerable<number> | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedFloatNullableWithAggregatesFilter | number | null
    _count?: NestedIntNullableFilter
    _avg?: NestedFloatNullableFilter
    _sum?: NestedFloatNullableFilter
    _min?: NestedFloatNullableFilter
    _max?: NestedFloatNullableFilter
  }

  export type NestedFloatWithAggregatesFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedFloatWithAggregatesFilter | number
    _count?: NestedIntFilter
    _avg?: NestedFloatFilter
    _sum?: NestedFloatFilter
    _min?: NestedFloatFilter
    _max?: NestedFloatFilter
  }

  export type NestedDecimalWithAggregatesFilter = {
    equals?: Decimal | DecimalJsLike | number | string
    in?: Enumerable<Decimal> | Enumerable<DecimalJsLike> | Enumerable<number> | Enumerable<string>
    notIn?: Enumerable<Decimal> | Enumerable<DecimalJsLike> | Enumerable<number> | Enumerable<string>
    lt?: Decimal | DecimalJsLike | number | string
    lte?: Decimal | DecimalJsLike | number | string
    gt?: Decimal | DecimalJsLike | number | string
    gte?: Decimal | DecimalJsLike | number | string
    not?: NestedDecimalWithAggregatesFilter | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter
    _avg?: NestedDecimalFilter
    _sum?: NestedDecimalFilter
    _min?: NestedDecimalFilter
    _max?: NestedDecimalFilter
  }

  export type NestedDecimalNullableWithAggregatesFilter = {
    equals?: Decimal | DecimalJsLike | number | string | null
    in?: Enumerable<Decimal> | Enumerable<DecimalJsLike> | Enumerable<number> | Enumerable<string> | null
    notIn?: Enumerable<Decimal> | Enumerable<DecimalJsLike> | Enumerable<number> | Enumerable<string> | null
    lt?: Decimal | DecimalJsLike | number | string
    lte?: Decimal | DecimalJsLike | number | string
    gt?: Decimal | DecimalJsLike | number | string
    gte?: Decimal | DecimalJsLike | number | string
    not?: NestedDecimalNullableWithAggregatesFilter | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter
    _avg?: NestedDecimalNullableFilter
    _sum?: NestedDecimalNullableFilter
    _min?: NestedDecimalNullableFilter
    _max?: NestedDecimalNullableFilter
  }

  export type NestedDateTimeWithAggregatesFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeWithAggregatesFilter | Date | string
    _count?: NestedIntFilter
    _min?: NestedDateTimeFilter
    _max?: NestedDateTimeFilter
  }

  export type NestedDateTimeNullableWithAggregatesFilter = {
    equals?: Date | string | null
    in?: Enumerable<Date> | Enumerable<string> | null
    notIn?: Enumerable<Date> | Enumerable<string> | null
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeNullableWithAggregatesFilter | Date | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedDateTimeNullableFilter
    _max?: NestedDateTimeNullableFilter
  }

  export type NestedBigIntWithAggregatesFilter = {
    equals?: bigint | number
    in?: Enumerable<bigint> | Enumerable<number>
    notIn?: Enumerable<bigint> | Enumerable<number>
    lt?: bigint | number
    lte?: bigint | number
    gt?: bigint | number
    gte?: bigint | number
    not?: NestedBigIntWithAggregatesFilter | bigint | number
    _count?: NestedIntFilter
    _avg?: NestedFloatFilter
    _sum?: NestedBigIntFilter
    _min?: NestedBigIntFilter
    _max?: NestedBigIntFilter
  }

  export type NestedBigIntNullableWithAggregatesFilter = {
    equals?: bigint | number | null
    in?: Enumerable<bigint> | Enumerable<number> | null
    notIn?: Enumerable<bigint> | Enumerable<number> | null
    lt?: bigint | number
    lte?: bigint | number
    gt?: bigint | number
    gte?: bigint | number
    not?: NestedBigIntNullableWithAggregatesFilter | bigint | number | null
    _count?: NestedIntNullableFilter
    _avg?: NestedFloatNullableFilter
    _sum?: NestedBigIntNullableFilter
    _min?: NestedBigIntNullableFilter
    _max?: NestedBigIntNullableFilter
  }

  export type NestedBytesWithAggregatesFilter = {
    equals?: Buffer
    in?: Enumerable<Buffer>
    notIn?: Enumerable<Buffer>
    not?: NestedBytesWithAggregatesFilter | Buffer
    _count?: NestedIntFilter
    _min?: NestedBytesFilter
    _max?: NestedBytesFilter
  }

  export type NestedBytesNullableWithAggregatesFilter = {
    equals?: Buffer | null
    in?: Enumerable<Buffer> | null
    notIn?: Enumerable<Buffer> | null
    not?: NestedBytesNullableWithAggregatesFilter | Buffer | null
    _count?: NestedIntNullableFilter
    _min?: NestedBytesNullableFilter
    _max?: NestedBytesNullableFilter
  }

  export type NestedEnumAnotherEnumFilter = {
    equals?: AnotherEnum
    in?: Enumerable<AnotherEnum>
    notIn?: Enumerable<AnotherEnum>
    not?: NestedEnumAnotherEnumFilter | AnotherEnum
  }

  export type NestedEnumAnotherEnumWithAggregatesFilter = {
    equals?: AnotherEnum
    in?: Enumerable<AnotherEnum>
    notIn?: Enumerable<AnotherEnum>
    not?: NestedEnumAnotherEnumWithAggregatesFilter | AnotherEnum
    _count?: NestedIntFilter
    _min?: NestedEnumAnotherEnumFilter
    _max?: NestedEnumAnotherEnumFilter
  }

  export type NestedBoolFilter = {
    equals?: boolean
    not?: NestedBoolFilter | boolean
  }

  export type NestedBoolWithAggregatesFilter = {
    equals?: boolean
    not?: NestedBoolWithAggregatesFilter | boolean
    _count?: NestedIntFilter
    _min?: NestedBoolFilter
    _max?: NestedBoolFilter
  }

  export type NestedEnumSecondEnumFilter = {
    equals?: SecondEnum
    in?: Enumerable<SecondEnum>
    notIn?: Enumerable<SecondEnum>
    not?: NestedEnumSecondEnumFilter | SecondEnum
  }

  export type NestedEnumSecondEnumWithAggregatesFilter = {
    equals?: SecondEnum
    in?: Enumerable<SecondEnum>
    notIn?: Enumerable<SecondEnum>
    not?: NestedEnumSecondEnumWithAggregatesFilter | SecondEnum
    _count?: NestedIntFilter
    _min?: NestedEnumSecondEnumFilter
    _max?: NestedEnumSecondEnumFilter
  }

  export type PostCreateWithoutAuthorInput = {
    title: string
    content?: string | null
    published?: boolean
    anotherEnum?: PostCreateanotherEnumInput | Enumerable<AnotherEnum>
  }

  export type PostUncheckedCreateWithoutAuthorInput = {
    id?: number
    title: string
    content?: string | null
    published?: boolean
    anotherEnum?: PostCreateanotherEnumInput | Enumerable<AnotherEnum>
  }

  export type PostCreateOrConnectWithoutAuthorInput = {
    where: PostWhereUniqueInput
    create: XOR<PostCreateWithoutAuthorInput, PostUncheckedCreateWithoutAuthorInput>
  }

  export type PostCreateManyAuthorInputEnvelope = {
    data: Enumerable<PostCreateManyAuthorInput>
    skipDuplicates?: boolean
  }

  export type ProfileCreateWithoutUserInput = {
    bio: string
    role?: ProfileCreateroleInput | Enumerable<Role>
    second?: SecondEnum
  }

  export type ProfileUncheckedCreateWithoutUserInput = {
    id?: number
    bio: string
    role?: ProfileCreateroleInput | Enumerable<Role>
    second?: SecondEnum
  }

  export type ProfileCreateOrConnectWithoutUserInput = {
    where: ProfileWhereUniqueInput
    create: XOR<ProfileCreateWithoutUserInput, ProfileUncheckedCreateWithoutUserInput>
  }

  export type LocationCreateWithoutUserInput = {
    lat: number
    lng: number
  }

  export type LocationUncheckedCreateWithoutUserInput = {
    lat: number
    lng: number
  }

  export type LocationCreateOrConnectWithoutUserInput = {
    where: LocationWhereUniqueInput
    create: XOR<LocationCreateWithoutUserInput, LocationUncheckedCreateWithoutUserInput>
  }

  export type PostUpsertWithWhereUniqueWithoutAuthorInput = {
    where: PostWhereUniqueInput
    update: XOR<PostUpdateWithoutAuthorInput, PostUncheckedUpdateWithoutAuthorInput>
    create: XOR<PostCreateWithoutAuthorInput, PostUncheckedCreateWithoutAuthorInput>
  }

  export type PostUpdateWithWhereUniqueWithoutAuthorInput = {
    where: PostWhereUniqueInput
    data: XOR<PostUpdateWithoutAuthorInput, PostUncheckedUpdateWithoutAuthorInput>
  }

  export type PostUpdateManyWithWhereWithoutAuthorInput = {
    where: PostScalarWhereInput
    data: XOR<PostUpdateManyMutationInput, PostUncheckedUpdateManyWithoutPostsInput>
  }

  export type PostScalarWhereInput = {
    AND?: Enumerable<PostScalarWhereInput>
    OR?: Enumerable<PostScalarWhereInput>
    NOT?: Enumerable<PostScalarWhereInput>
    id?: IntFilter | number
    title?: StringFilter | string
    content?: StringNullableFilter | string | null
    published?: BoolFilter | boolean
    authorId?: StringFilter | string
    anotherEnum?: EnumAnotherEnumNullableListFilter
  }

  export type ProfileUpsertWithoutUserInput = {
    update: XOR<ProfileUpdateWithoutUserInput, ProfileUncheckedUpdateWithoutUserInput>
    create: XOR<ProfileCreateWithoutUserInput, ProfileUncheckedCreateWithoutUserInput>
  }

  export type ProfileUpdateWithoutUserInput = {
    bio?: StringFieldUpdateOperationsInput | string
    role?: ProfileUpdateroleInput | Enumerable<Role>
    second?: EnumSecondEnumFieldUpdateOperationsInput | SecondEnum
  }

  export type ProfileUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    bio?: StringFieldUpdateOperationsInput | string
    role?: ProfileUpdateroleInput | Enumerable<Role>
    second?: EnumSecondEnumFieldUpdateOperationsInput | SecondEnum
  }

  export type LocationUpsertWithoutUserInput = {
    update: XOR<LocationUpdateWithoutUserInput, LocationUncheckedUpdateWithoutUserInput>
    create: XOR<LocationCreateWithoutUserInput, LocationUncheckedCreateWithoutUserInput>
  }

  export type LocationUpdateWithoutUserInput = {
    lat?: FloatFieldUpdateOperationsInput | number
    lng?: FloatFieldUpdateOperationsInput | number
  }

  export type LocationUncheckedUpdateWithoutUserInput = {
    lat?: FloatFieldUpdateOperationsInput | number
    lng?: FloatFieldUpdateOperationsInput | number
  }

  export type UserCreateWithoutPostsInput = {
    id?: string
    email: string
    name?: string | null
    profile?: ProfileCreateNestedOneWithoutUserInput
    role?: UserCreateroleInput | Enumerable<Role>
    enum?: AnotherEnum
    scalarList?: UserCreatescalarListInput | Enumerable<string>
    location?: LocationCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateWithoutPostsInput = {
    id?: string
    email: string
    name?: string | null
    profile?: ProfileUncheckedCreateNestedOneWithoutUserInput
    role?: UserCreateroleInput | Enumerable<Role>
    enum?: AnotherEnum
    scalarList?: UserCreatescalarListInput | Enumerable<string>
    lat: number
    lng: number
  }

  export type UserCreateOrConnectWithoutPostsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutPostsInput, UserUncheckedCreateWithoutPostsInput>
  }

  export type UserUpsertWithoutPostsInput = {
    update: XOR<UserUpdateWithoutPostsInput, UserUncheckedUpdateWithoutPostsInput>
    create: XOR<UserCreateWithoutPostsInput, UserUncheckedCreateWithoutPostsInput>
  }

  export type UserUpdateWithoutPostsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    profile?: ProfileUpdateOneWithoutUserNestedInput
    role?: UserUpdateroleInput | Enumerable<Role>
    enum?: EnumAnotherEnumFieldUpdateOperationsInput | AnotherEnum
    scalarList?: UserUpdatescalarListInput | Enumerable<string>
    location?: LocationUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutPostsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    profile?: ProfileUncheckedUpdateOneWithoutUserNestedInput
    role?: UserUpdateroleInput | Enumerable<Role>
    enum?: EnumAnotherEnumFieldUpdateOperationsInput | AnotherEnum
    scalarList?: UserUpdatescalarListInput | Enumerable<string>
    lat?: FloatFieldUpdateOperationsInput | number
    lng?: FloatFieldUpdateOperationsInput | number
  }

  export type UserCreateWithoutProfileInput = {
    id?: string
    email: string
    name?: string | null
    posts?: PostCreateNestedManyWithoutAuthorInput
    role?: UserCreateroleInput | Enumerable<Role>
    enum?: AnotherEnum
    scalarList?: UserCreatescalarListInput | Enumerable<string>
    location?: LocationCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateWithoutProfileInput = {
    id?: string
    email: string
    name?: string | null
    posts?: PostUncheckedCreateNestedManyWithoutAuthorInput
    role?: UserCreateroleInput | Enumerable<Role>
    enum?: AnotherEnum
    scalarList?: UserCreatescalarListInput | Enumerable<string>
    lat: number
    lng: number
  }

  export type UserCreateOrConnectWithoutProfileInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutProfileInput, UserUncheckedCreateWithoutProfileInput>
  }

  export type UserUpsertWithoutProfileInput = {
    update: XOR<UserUpdateWithoutProfileInput, UserUncheckedUpdateWithoutProfileInput>
    create: XOR<UserCreateWithoutProfileInput, UserUncheckedCreateWithoutProfileInput>
  }

  export type UserUpdateWithoutProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    posts?: PostUpdateManyWithoutAuthorNestedInput
    role?: UserUpdateroleInput | Enumerable<Role>
    enum?: EnumAnotherEnumFieldUpdateOperationsInput | AnotherEnum
    scalarList?: UserUpdatescalarListInput | Enumerable<string>
    location?: LocationUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    posts?: PostUncheckedUpdateManyWithoutAuthorNestedInput
    role?: UserUpdateroleInput | Enumerable<Role>
    enum?: EnumAnotherEnumFieldUpdateOperationsInput | AnotherEnum
    scalarList?: UserUpdatescalarListInput | Enumerable<string>
    lat?: FloatFieldUpdateOperationsInput | number
    lng?: FloatFieldUpdateOperationsInput | number
  }

  export type UserCreateWithoutLocationInput = {
    id?: string
    email: string
    name?: string | null
    posts?: PostCreateNestedManyWithoutAuthorInput
    profile?: ProfileCreateNestedOneWithoutUserInput
    role?: UserCreateroleInput | Enumerable<Role>
    enum?: AnotherEnum
    scalarList?: UserCreatescalarListInput | Enumerable<string>
  }

  export type UserUncheckedCreateWithoutLocationInput = {
    id?: string
    email: string
    name?: string | null
    posts?: PostUncheckedCreateNestedManyWithoutAuthorInput
    profile?: ProfileUncheckedCreateNestedOneWithoutUserInput
    role?: UserCreateroleInput | Enumerable<Role>
    enum?: AnotherEnum
    scalarList?: UserCreatescalarListInput | Enumerable<string>
  }

  export type UserCreateOrConnectWithoutLocationInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutLocationInput, UserUncheckedCreateWithoutLocationInput>
  }

  export type UserCreateManyLocationInputEnvelope = {
    data: Enumerable<UserCreateManyLocationInput>
    skipDuplicates?: boolean
  }

  export type UserUpsertWithWhereUniqueWithoutLocationInput = {
    where: UserWhereUniqueInput
    update: XOR<UserUpdateWithoutLocationInput, UserUncheckedUpdateWithoutLocationInput>
    create: XOR<UserCreateWithoutLocationInput, UserUncheckedCreateWithoutLocationInput>
  }

  export type UserUpdateWithWhereUniqueWithoutLocationInput = {
    where: UserWhereUniqueInput
    data: XOR<UserUpdateWithoutLocationInput, UserUncheckedUpdateWithoutLocationInput>
  }

  export type UserUpdateManyWithWhereWithoutLocationInput = {
    where: UserScalarWhereInput
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyWithoutUserInput>
  }

  export type UserScalarWhereInput = {
    AND?: Enumerable<UserScalarWhereInput>
    OR?: Enumerable<UserScalarWhereInput>
    NOT?: Enumerable<UserScalarWhereInput>
    id?: StringFilter | string
    email?: StringFilter | string
    name?: StringNullableFilter | string | null
    role?: EnumRoleNullableListFilter
    enum?: EnumAnotherEnumFilter | AnotherEnum
    scalarList?: StringNullableListFilter
    lat?: FloatFilter | number
    lng?: FloatFilter | number
  }

  export type PostCreateManyAuthorInput = {
    id?: number
    title: string
    content?: string | null
    published?: boolean
    anotherEnum?: PostCreateanotherEnumInput | Enumerable<AnotherEnum>
  }

  export type PostUpdateWithoutAuthorInput = {
    title?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    published?: BoolFieldUpdateOperationsInput | boolean
    anotherEnum?: PostUpdateanotherEnumInput | Enumerable<AnotherEnum>
  }

  export type PostUncheckedUpdateWithoutAuthorInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    published?: BoolFieldUpdateOperationsInput | boolean
    anotherEnum?: PostUpdateanotherEnumInput | Enumerable<AnotherEnum>
  }

  export type PostUncheckedUpdateManyWithoutPostsInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    published?: BoolFieldUpdateOperationsInput | boolean
    anotherEnum?: PostUpdateanotherEnumInput | Enumerable<AnotherEnum>
  }

  export type UserCreateManyLocationInput = {
    id?: string
    email: string
    name?: string | null
    role?: UserCreateroleInput | Enumerable<Role>
    enum?: AnotherEnum
    scalarList?: UserCreatescalarListInput | Enumerable<string>
  }

  export type UserUpdateWithoutLocationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    posts?: PostUpdateManyWithoutAuthorNestedInput
    profile?: ProfileUpdateOneWithoutUserNestedInput
    role?: UserUpdateroleInput | Enumerable<Role>
    enum?: EnumAnotherEnumFieldUpdateOperationsInput | AnotherEnum
    scalarList?: UserUpdatescalarListInput | Enumerable<string>
  }

  export type UserUncheckedUpdateWithoutLocationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    posts?: PostUncheckedUpdateManyWithoutAuthorNestedInput
    profile?: ProfileUncheckedUpdateOneWithoutUserNestedInput
    role?: UserUpdateroleInput | Enumerable<Role>
    enum?: EnumAnotherEnumFieldUpdateOperationsInput | AnotherEnum
    scalarList?: UserUpdatescalarListInput | Enumerable<string>
  }

  export type UserUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: UserUpdateroleInput | Enumerable<Role>
    enum?: EnumAnotherEnumFieldUpdateOperationsInput | AnotherEnum
    scalarList?: UserUpdatescalarListInput | Enumerable<string>
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}