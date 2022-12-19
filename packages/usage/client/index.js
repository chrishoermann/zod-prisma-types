
Object.defineProperty(exports, "__esModule", { value: true });

const {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
  NotFoundError,
  decompressFromBase64,
  getPrismaClient,
  sqltag,
  empty,
  join,
  raw,
  Decimal,
  Debug,
  objectEnumValues,
  makeStrictEnum,
  Extensions
} = require('./runtime/index')


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

Prisma.PrismaClientKnownRequestError = PrismaClientKnownRequestError;
Prisma.PrismaClientUnknownRequestError = PrismaClientUnknownRequestError
Prisma.PrismaClientRustPanicError = PrismaClientRustPanicError
Prisma.PrismaClientInitializationError = PrismaClientInitializationError
Prisma.PrismaClientValidationError = PrismaClientValidationError
Prisma.NotFoundError = NotFoundError
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = sqltag
Prisma.empty = empty
Prisma.join = join
Prisma.raw = raw
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


  const path = require('path')

const { findSync } = require('./runtime')
const fs = require('fs')

// some frameworks or bundlers replace or totally remove __dirname
const hasDirname = typeof __dirname !== 'undefined' && __dirname !== '/'

// will work in most cases, ie. if the client has not been bundled
const regularDirname = hasDirname && fs.existsSync(path.join(__dirname, 'schema.prisma')) && __dirname

// if the client has been bundled, we need to look for the folders
const foundDirname = !regularDirname && findSync(process.cwd(), [
    "client",
    
], ['d'], ['d'], 1)[0]

const dirname = regularDirname || foundDirname || __dirname

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

const dmmfString = "{\"datamodel\":{\"enums\":[{\"name\":\"MYValue\",\"values\":[{\"name\":\"A\",\"dbName\":null},{\"name\":\"B\",\"dbName\":null},{\"name\":\"C\",\"dbName\":null}],\"dbName\":null},{\"name\":\"Role\",\"values\":[{\"name\":\"USER\",\"dbName\":null},{\"name\":\"ADMIN\",\"dbName\":null}],\"dbName\":null},{\"name\":\"SecondEnum\",\"values\":[{\"name\":\"ONE\",\"dbName\":null},{\"name\":\"TWO\",\"dbName\":null}],\"dbName\":null},{\"name\":\"AnotherEnum\",\"values\":[{\"name\":\"ONE\",\"dbName\":null},{\"name\":\"TWO\",\"dbName\":null}],\"dbName\":null}],\"models\":[{\"name\":\"MyModel\",\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"string\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"comment before validator @zod.string.min(4).max(10) \\\\ncomment after validator\"},{\"name\":\"omitField\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"@zod.custom.omit([model, input])\"},{\"name\":\"omitRequired\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"@zod.custom.omit([model, input])\"}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false,\"documentation\":\"comment line one\\\\ncomment line two\"},{\"name\":\"MODELWithUpperCase\",\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"STRING\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"MYValue\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"MYValue\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},{\"name\":\"JsonModel\",\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"json\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Json\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"jsonOpt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Json\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},{\"name\":\"Test\",\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"cuid\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"@zod.string({ invalid_type_error: \\\"some error with special chars: some + -*#'substring[]*#!§$%&/{}[]\\\", required_error: \\\"some other\\\", description: \\\"some description\\\" }).cuid()\"},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"some comment @zod.string({ required_error: \\\"error\\\", invalid_type_error: \\\"error\\\"})\"},{\"name\":\"value\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"MYValue\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"bic\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"@zod.custom.use(z.string().refine((val) => validator.isBIC(val), { message: 'BIC is not valid' }))\"},{\"name\":\"intTwo\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"int\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"floatOpt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Float\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"float\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Float\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"decimal\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Decimal\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"decimalOpt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Decimal\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"date\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"dateOpt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"@zod.date({ invalid_type_error: \\\"wrong date type\\\" })\"},{\"name\":\"bigInt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"BigInt\",\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"@zod.bigint({ invalid_type_error: \\\"error\\\" })\"},{\"name\":\"bigIntOpt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"BigInt\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"json\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Json\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"jsonOpt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Json\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"bytes\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Bytes\",\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"@zod.custom.use(z.instanceof(Buffer).refine((val) => val ? true : false, { message: 'Value is not valid' }))\"},{\"name\":\"bytesOpt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Bytes\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},{\"name\":\"MyPrismaScalarsType\",\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"cuid\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"@zod.string({ invalid_type_error: \\\"invalid type error\\\" }).cuid()\"},{\"name\":\"string\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"Some comment about string @zod.string.min(3, { message: \\\"min error\\\" }).max(10, { message: \\\"max error\\\" })\"},{\"name\":\"bic\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"@zod.custom.use(z.string().refine((val) => validator.isBIC(val), { message: 'BIC is not valid' }))\"},{\"name\":\"float\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Float\",\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"@zod.number.lt(10, { message: \\\"lt error\\\" }).gt(5, { message: \\\"gt error\\\" })\"},{\"name\":\"decimal\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Decimal\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"date\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"@zod.date.min(new Date('2020-01-01')).max(new Date('2020-12-31'))\"},{\"name\":\"bigInt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"BigInt\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"json\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Json\",\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"@zod.custom.use(z.lazy(() => InputJsonValue).refine((val) => myFunction(val), { message: 'Is not valid' }))\"},{\"name\":\"bytes\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Bytes\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"custom\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"@zod.custom.use(z.string().refine((val) => myFunction(val), { message: 'Is not valid' }))\"},{\"name\":\"exclude\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"@zod.custom.omit([\\\"model\\\", \\\"input\\\"])\"}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},{\"name\":\"User\",\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"cuid\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"@zod.string.cuid()\"},{\"name\":\"email\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"@zod.string.email({ message: \\\"Invalid email address\\\" })\"},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false,\"documentation\":\"some other comment \\\\n@zod.string.min(1).max(100) some message after\"},{\"name\":\"posts\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Post\",\"relationName\":\"PostToUser\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"profile\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Profile\",\"relationName\":\"ProfileToUser\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"role\",\"kind\":\"enum\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Role\",\"default\":[\"USER\",\"ADMIN\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"enum\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"AnotherEnum\",\"default\":\"ONE\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"scalarList\",\"kind\":\"scalar\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"lat\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Float\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"lng\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Float\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"location\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Location\",\"relationName\":\"LocationToUser\",\"relationFromFields\":[\"lat\",\"lng\"],\"relationToFields\":[\"lat\",\"lng\"],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},{\"name\":\"Post\",\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"title\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"content\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"published\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"author\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"User\",\"relationName\":\"PostToUser\",\"relationFromFields\":[\"authorId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"authorId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"anotherEnum\",\"kind\":\"enum\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"AnotherEnum\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},{\"name\":\"Profile\",\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"bio\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"user\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"User\",\"relationName\":\"ProfileToUser\",\"relationFromFields\":[\"userId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"userId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"role\",\"kind\":\"enum\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Role\",\"default\":[\"USER\",\"ADMIN\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"second\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"SecondEnum\",\"default\":\"ONE\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},{\"name\":\"Location\",\"dbName\":null,\"fields\":[{\"name\":\"lat\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Float\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"lng\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Float\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"User\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"User\",\"relationName\":\"LocationToUser\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":{\"name\":null,\"fields\":[\"lat\",\"lng\"]},\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false}],\"types\":[]},\"mappings\":{\"modelOperations\":[{\"model\":\"MyModel\",\"plural\":\"myModels\",\"findUnique\":\"findUniqueMyModel\",\"findUniqueOrThrow\":\"findUniqueMyModelOrThrow\",\"findFirst\":\"findFirstMyModel\",\"findFirstOrThrow\":\"findFirstMyModelOrThrow\",\"findMany\":\"findManyMyModel\",\"create\":\"createOneMyModel\",\"createMany\":\"createManyMyModel\",\"delete\":\"deleteOneMyModel\",\"update\":\"updateOneMyModel\",\"deleteMany\":\"deleteManyMyModel\",\"updateMany\":\"updateManyMyModel\",\"upsert\":\"upsertOneMyModel\",\"aggregate\":\"aggregateMyModel\",\"groupBy\":\"groupByMyModel\"},{\"model\":\"MODELWithUpperCase\",\"plural\":\"mODELWithUpperCases\",\"findUnique\":\"findUniqueMODELWithUpperCase\",\"findUniqueOrThrow\":\"findUniqueMODELWithUpperCaseOrThrow\",\"findFirst\":\"findFirstMODELWithUpperCase\",\"findFirstOrThrow\":\"findFirstMODELWithUpperCaseOrThrow\",\"findMany\":\"findManyMODELWithUpperCase\",\"create\":\"createOneMODELWithUpperCase\",\"createMany\":\"createManyMODELWithUpperCase\",\"delete\":\"deleteOneMODELWithUpperCase\",\"update\":\"updateOneMODELWithUpperCase\",\"deleteMany\":\"deleteManyMODELWithUpperCase\",\"updateMany\":\"updateManyMODELWithUpperCase\",\"upsert\":\"upsertOneMODELWithUpperCase\",\"aggregate\":\"aggregateMODELWithUpperCase\",\"groupBy\":\"groupByMODELWithUpperCase\"},{\"model\":\"JsonModel\",\"plural\":\"jsonModels\",\"findUnique\":\"findUniqueJsonModel\",\"findUniqueOrThrow\":\"findUniqueJsonModelOrThrow\",\"findFirst\":\"findFirstJsonModel\",\"findFirstOrThrow\":\"findFirstJsonModelOrThrow\",\"findMany\":\"findManyJsonModel\",\"create\":\"createOneJsonModel\",\"createMany\":\"createManyJsonModel\",\"delete\":\"deleteOneJsonModel\",\"update\":\"updateOneJsonModel\",\"deleteMany\":\"deleteManyJsonModel\",\"updateMany\":\"updateManyJsonModel\",\"upsert\":\"upsertOneJsonModel\",\"aggregate\":\"aggregateJsonModel\",\"groupBy\":\"groupByJsonModel\"},{\"model\":\"Test\",\"plural\":\"tests\",\"findUnique\":\"findUniqueTest\",\"findUniqueOrThrow\":\"findUniqueTestOrThrow\",\"findFirst\":\"findFirstTest\",\"findFirstOrThrow\":\"findFirstTestOrThrow\",\"findMany\":\"findManyTest\",\"create\":\"createOneTest\",\"createMany\":\"createManyTest\",\"delete\":\"deleteOneTest\",\"update\":\"updateOneTest\",\"deleteMany\":\"deleteManyTest\",\"updateMany\":\"updateManyTest\",\"upsert\":\"upsertOneTest\",\"aggregate\":\"aggregateTest\",\"groupBy\":\"groupByTest\"},{\"model\":\"MyPrismaScalarsType\",\"plural\":\"myPrismaScalarsTypes\",\"findUnique\":\"findUniqueMyPrismaScalarsType\",\"findUniqueOrThrow\":\"findUniqueMyPrismaScalarsTypeOrThrow\",\"findFirst\":\"findFirstMyPrismaScalarsType\",\"findFirstOrThrow\":\"findFirstMyPrismaScalarsTypeOrThrow\",\"findMany\":\"findManyMyPrismaScalarsType\",\"create\":\"createOneMyPrismaScalarsType\",\"createMany\":\"createManyMyPrismaScalarsType\",\"delete\":\"deleteOneMyPrismaScalarsType\",\"update\":\"updateOneMyPrismaScalarsType\",\"deleteMany\":\"deleteManyMyPrismaScalarsType\",\"updateMany\":\"updateManyMyPrismaScalarsType\",\"upsert\":\"upsertOneMyPrismaScalarsType\",\"aggregate\":\"aggregateMyPrismaScalarsType\",\"groupBy\":\"groupByMyPrismaScalarsType\"},{\"model\":\"User\",\"plural\":\"users\",\"findUnique\":\"findUniqueUser\",\"findUniqueOrThrow\":\"findUniqueUserOrThrow\",\"findFirst\":\"findFirstUser\",\"findFirstOrThrow\":\"findFirstUserOrThrow\",\"findMany\":\"findManyUser\",\"create\":\"createOneUser\",\"createMany\":\"createManyUser\",\"delete\":\"deleteOneUser\",\"update\":\"updateOneUser\",\"deleteMany\":\"deleteManyUser\",\"updateMany\":\"updateManyUser\",\"upsert\":\"upsertOneUser\",\"aggregate\":\"aggregateUser\",\"groupBy\":\"groupByUser\"},{\"model\":\"Post\",\"plural\":\"posts\",\"findUnique\":\"findUniquePost\",\"findUniqueOrThrow\":\"findUniquePostOrThrow\",\"findFirst\":\"findFirstPost\",\"findFirstOrThrow\":\"findFirstPostOrThrow\",\"findMany\":\"findManyPost\",\"create\":\"createOnePost\",\"createMany\":\"createManyPost\",\"delete\":\"deleteOnePost\",\"update\":\"updateOnePost\",\"deleteMany\":\"deleteManyPost\",\"updateMany\":\"updateManyPost\",\"upsert\":\"upsertOnePost\",\"aggregate\":\"aggregatePost\",\"groupBy\":\"groupByPost\"},{\"model\":\"Profile\",\"plural\":\"profiles\",\"findUnique\":\"findUniqueProfile\",\"findUniqueOrThrow\":\"findUniqueProfileOrThrow\",\"findFirst\":\"findFirstProfile\",\"findFirstOrThrow\":\"findFirstProfileOrThrow\",\"findMany\":\"findManyProfile\",\"create\":\"createOneProfile\",\"createMany\":\"createManyProfile\",\"delete\":\"deleteOneProfile\",\"update\":\"updateOneProfile\",\"deleteMany\":\"deleteManyProfile\",\"updateMany\":\"updateManyProfile\",\"upsert\":\"upsertOneProfile\",\"aggregate\":\"aggregateProfile\",\"groupBy\":\"groupByProfile\"},{\"model\":\"Location\",\"plural\":\"locations\",\"findUnique\":\"findUniqueLocation\",\"findUniqueOrThrow\":\"findUniqueLocationOrThrow\",\"findFirst\":\"findFirstLocation\",\"findFirstOrThrow\":\"findFirstLocationOrThrow\",\"findMany\":\"findManyLocation\",\"create\":\"createOneLocation\",\"createMany\":\"createManyLocation\",\"delete\":\"deleteOneLocation\",\"update\":\"updateOneLocation\",\"deleteMany\":\"deleteManyLocation\",\"updateMany\":\"updateManyLocation\",\"upsert\":\"upsertOneLocation\",\"aggregate\":\"aggregateLocation\",\"groupBy\":\"groupByLocation\"}],\"otherOperations\":{\"read\":[],\"write\":[\"executeRaw\",\"queryRaw\"]}}}"
const dmmf = JSON.parse(dmmfString)
exports.Prisma.dmmf = JSON.parse(dmmfString)

/**
 * Create the Client
 */
const config = {
  "generator": {
    "name": "client",
    "provider": {
      "fromEnvVar": null,
      "value": "prisma-client-js"
    },
    "output": {
      "value": "D:\\_Coding\\zod-prisma-types\\packages\\usage\\client",
      "fromEnvVar": null
    },
    "config": {
      "engineType": "library"
    },
    "binaryTargets": [],
    "previewFeatures": [],
    "isCustomOutput": true
  },
  "relativeEnvPaths": {
    "rootEnvPath": "..\\.env",
    "schemaEnvPath": "..\\.env"
  },
  "relativePath": "..\\prisma",
  "clientVersion": "4.7.1",
  "engineVersion": "272861e07ab64f234d3ffc4094e32bd61775599c",
  "datasourceNames": [
    "db"
  ],
  "activeProvider": "postgresql",
  "dataProxy": false
}
config.document = dmmf
config.dirname = dirname




const { warnEnvConflicts } = require('./runtime/index')

warnEnvConflicts({
    rootEnvPath: config.relativeEnvPaths.rootEnvPath && path.resolve(dirname, config.relativeEnvPaths.rootEnvPath),
    schemaEnvPath: config.relativeEnvPaths.schemaEnvPath && path.resolve(dirname, config.relativeEnvPaths.schemaEnvPath)
})

const PrismaClient = getPrismaClient(config)
exports.PrismaClient = PrismaClient
Object.assign(exports, Prisma)

path.join(__dirname, "query_engine-windows.dll.node");
path.join(process.cwd(), "client\\query_engine-windows.dll.node")
path.join(__dirname, "schema.prisma");
path.join(process.cwd(), "client\\schema.prisma")
