"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeSpecialType = void 0;
const writeSpecialType = (writer, { inputType, isOptional, isNullable, writeComma = true, zodCustomErrors }) => {
    if (!inputType.isSpecialType())
        return;
    if (inputType.isDecimalType) {
        return writer
            .write(`z.number(`)
            .conditionalWrite(!!zodCustomErrors, zodCustomErrors)
            .write(`).refine((v) => Decimal.isDecimal(v),`)
            .write(` { message: 'Must be a Decimal' })`)
            .conditionalWrite(inputType.isList, `.array()`)
            .conditionalWrite(isOptional, `.optional()`)
            .conditionalWrite(isNullable, `.nullable()`)
            .conditionalWrite(writeComma, `,`);
    }
    if (inputType.isJsonType) {
        return writer
            .write(`InputJsonValue`)
            .conditionalWrite(inputType.isList, `.array()`)
            .conditionalWrite(isOptional, `.optional()`)
            .conditionalWrite(isNullable, `.nullable()`)
            .conditionalWrite(writeComma, `,`);
    }
    if (inputType.isBytesType) {
        return writer
            .write(`z.instanceof(Buffer)`)
            .conditionalWrite(inputType.isList, `.array()`)
            .conditionalWrite(isOptional, `.optional()`)
            .conditionalWrite(isNullable, `.nullable()`)
            .conditionalWrite(writeComma, `,`);
    }
    return writer
        .write(`z.null(),`)
        .conditionalWrite(!isOptional, `.optional()`)
        .conditionalWrite(isNullable, `.nullable()`)
        .conditionalWrite(writeComma, `,`);
};
exports.writeSpecialType = writeSpecialType;
//# sourceMappingURL=writeSpecialType.js.map