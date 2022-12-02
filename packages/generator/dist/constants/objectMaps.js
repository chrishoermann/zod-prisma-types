"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PRISMA_ACTION_ARRAY = exports.PRISMA_ACTION_ARG_MAP = exports.DATE_VALIDATOR_REGEX_MAP = exports.NUMBER_VALIDATOR_REGEX_MAP = exports.STRING_VALIDATOR_REGEX_MAP = exports.PRISMA_TYPE_MAP = exports.VALIDATOR_TYPE_MAP = void 0;
const formattedNames_1 = require("../classes/formattedNames");
const regex_1 = require("./regex");
exports.VALIDATOR_TYPE_MAP = {
    string: ['String'],
    number: ['Float', 'Int', 'Decimal'],
    date: ['DateTime'],
};
exports.PRISMA_TYPE_MAP = {
    String: 'string',
    Boolean: 'boolean',
    DateTime: 'date',
    Int: 'number',
    BigInt: 'bigint',
    Float: 'number',
};
exports.STRING_VALIDATOR_REGEX_MAP = {
    min: regex_1.STRING_VALIDATOR_NUMBER_AND_MESSAGE_REGEX,
    max: regex_1.STRING_VALIDATOR_NUMBER_AND_MESSAGE_REGEX,
    length: regex_1.STRING_VALIDATOR_NUMBER_AND_MESSAGE_REGEX,
    email: regex_1.STRING_VALIDATOR_MESSAGE_REGEX,
    url: regex_1.STRING_VALIDATOR_MESSAGE_REGEX,
    uuid: regex_1.STRING_VALIDATOR_MESSAGE_REGEX,
    cuid: regex_1.STRING_VALIDATOR_MESSAGE_REGEX,
    trim: regex_1.STRING_VALIDATOR_MESSAGE_REGEX,
    datetime: regex_1.STRING_VALIDATOR_MESSAGE_REGEX,
    regex: regex_1.STRING_VALIDATOR_REGEX,
    startsWith: regex_1.STRING_VALIDATOR_STRING_AND_MESSAGE_REGEX,
    endsWith: regex_1.STRING_VALIDATOR_STRING_AND_MESSAGE_REGEX,
};
exports.NUMBER_VALIDATOR_REGEX_MAP = {
    gt: regex_1.NUMBER_VALIDATOR_NUMBER_AND_MESSAGE_REGEX,
    gte: regex_1.NUMBER_VALIDATOR_NUMBER_AND_MESSAGE_REGEX,
    lt: regex_1.NUMBER_VALIDATOR_NUMBER_AND_MESSAGE_REGEX,
    lte: regex_1.NUMBER_VALIDATOR_NUMBER_AND_MESSAGE_REGEX,
    multipleOf: regex_1.NUMBER_VALIDATOR_NUMBER_AND_MESSAGE_REGEX,
    int: regex_1.NUMBER_VALIDATOR_MESSAGE_REGEX,
    positive: regex_1.NUMBER_VALIDATOR_MESSAGE_REGEX,
    nonpositive: regex_1.NUMBER_VALIDATOR_MESSAGE_REGEX,
    negative: regex_1.NUMBER_VALIDATOR_MESSAGE_REGEX,
    nonnegative: regex_1.NUMBER_VALIDATOR_MESSAGE_REGEX,
    finite: regex_1.NUMBER_VALIDATOR_MESSAGE_REGEX,
};
exports.DATE_VALIDATOR_REGEX_MAP = {
    min: regex_1.DATE_VALIDATOR_NUMBER_AND_MESSAGE_REGEX,
    max: regex_1.DATE_VALIDATOR_NUMBER_AND_MESSAGE_REGEX,
};
exports.PRISMA_ACTION_ARG_MAP = {
    findUnique: new formattedNames_1.FormattedNames('findUnique'),
    findMany: new formattedNames_1.FormattedNames('findMany'),
    findFirst: new formattedNames_1.FormattedNames('findFirst'),
    createOne: new formattedNames_1.FormattedNames('create'),
    createMany: new formattedNames_1.FormattedNames('createMany'),
    updateOne: new formattedNames_1.FormattedNames('update'),
    updateMany: new formattedNames_1.FormattedNames('updateMany'),
    upsertOne: new formattedNames_1.FormattedNames('upsert'),
    deleteOne: new formattedNames_1.FormattedNames('delete'),
    deleteMany: new formattedNames_1.FormattedNames('deleteMany'),
    aggregate: new formattedNames_1.FormattedNames('aggregate'),
    groupBy: new formattedNames_1.FormattedNames('groupBy'),
};
exports.PRISMA_ACTION_ARRAY = [
    'findUnique',
    'findMany',
    'findFirst',
    'createOne',
    'createMany',
    'updateOne',
    'updateMany',
    'upsertOne',
    'deleteOne',
    'deleteMany',
    'aggregate',
    'groupBy',
];
//# sourceMappingURL=objectMaps.js.map