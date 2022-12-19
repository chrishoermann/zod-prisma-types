
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum
} = require('./runtime/index-browser')


const Prisma = {}

exports.Prisma = Prisma

/**
 * Prisma Client JS version: 4.7.1
 * Query Engine version: 272861e07ab64f234d3ffc4094e32bd61775599c
 */
Prisma.prismaVersion = {
  client: "4.7.1",
  engine: "272861e07ab64f234d3ffc4094e32bd61775599c"
}

Prisma.PrismaClientKnownRequestError = () => {
  throw new Error(`PrismaClientKnownRequestError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  throw new Error(`PrismaClientUnknownRequestError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.PrismaClientRustPanicError = () => {
  throw new Error(`PrismaClientRustPanicError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.PrismaClientInitializationError = () => {
  throw new Error(`PrismaClientInitializationError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.PrismaClientValidationError = () => {
  throw new Error(`PrismaClientValidationError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.NotFoundError = () => {
  throw new Error(`NotFoundError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  throw new Error(`sqltag is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.empty = () => {
  throw new Error(`empty is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.join = () => {
  throw new Error(`join is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.raw = () => {
  throw new Error(`raw is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.validator = () => (val) => val


/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}

/**
 * Enums
 */
// Based on
// https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275
function makeEnum(x) { return x; }

exports.Prisma.JsonModelScalarFieldEnum = makeEnum({
  id: 'id',
  json: 'json',
  jsonOpt: 'jsonOpt'
});

exports.Prisma.JsonNullValueFilter = makeEnum({
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull,
  AnyNull: Prisma.AnyNull
});

exports.Prisma.JsonNullValueInput = makeEnum({
  JsonNull: Prisma.JsonNull
});

exports.Prisma.LocationScalarFieldEnum = makeEnum({
  lat: 'lat',
  lng: 'lng'
});

exports.Prisma.MODELWithUpperCaseScalarFieldEnum = makeEnum({
  id: 'id',
  STRING: 'STRING',
  MYValue: 'MYValue'
});

exports.Prisma.MyModelScalarFieldEnum = makeEnum({
  id: 'id',
  string: 'string',
  omitField: 'omitField',
  omitRequired: 'omitRequired'
});

exports.Prisma.MyPrismaScalarsTypeScalarFieldEnum = makeEnum({
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
});

exports.Prisma.NullableJsonNullValueInput = makeEnum({
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull
});

exports.Prisma.PostScalarFieldEnum = makeEnum({
  id: 'id',
  title: 'title',
  content: 'content',
  published: 'published',
  authorId: 'authorId',
  anotherEnum: 'anotherEnum'
});

exports.Prisma.ProfileScalarFieldEnum = makeEnum({
  id: 'id',
  bio: 'bio',
  userId: 'userId',
  role: 'role',
  second: 'second'
});

exports.Prisma.QueryMode = makeEnum({
  default: 'default',
  insensitive: 'insensitive'
});

exports.Prisma.SortOrder = makeEnum({
  asc: 'asc',
  desc: 'desc'
});

exports.Prisma.TestScalarFieldEnum = makeEnum({
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
});

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.UserScalarFieldEnum = makeEnum({
  id: 'id',
  email: 'email',
  name: 'name',
  role: 'role',
  enum: 'enum',
  scalarList: 'scalarList',
  lat: 'lat',
  lng: 'lng'
});
exports.AnotherEnum = makeEnum({
  ONE: 'ONE',
  TWO: 'TWO'
});

exports.MYValue = makeEnum({
  A: 'A',
  B: 'B',
  C: 'C'
});

exports.Role = makeEnum({
  USER: 'USER',
  ADMIN: 'ADMIN'
});

exports.SecondEnum = makeEnum({
  ONE: 'ONE',
  TWO: 'TWO'
});

exports.Prisma.ModelName = makeEnum({
  MyModel: 'MyModel',
  MODELWithUpperCase: 'MODELWithUpperCase',
  JsonModel: 'JsonModel',
  Test: 'Test',
  MyPrismaScalarsType: 'MyPrismaScalarsType',
  User: 'User',
  Post: 'Post',
  Profile: 'Profile',
  Location: 'Location'
});

/**
 * Create the Client
 */
class PrismaClient {
  constructor() {
    throw new Error(
      `PrismaClient is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
    )
  }
}
exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
