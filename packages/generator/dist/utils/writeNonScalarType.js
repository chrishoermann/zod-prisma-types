"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeNonScalarType = void 0;
const writeNonScalarType = (writer, { inputType, isOptional, isNullable, writeLazy = true, writeComma = true }) => {
    const nonScalarType = inputType.getZodNonScalarType();
    if (!nonScalarType)
        return;
    return writer
        .conditionalWrite(writeLazy, `z.lazy(() => ${nonScalarType}Schema)`)
        .conditionalWrite(!writeLazy, `${nonScalarType}Schema`)
        .conditionalWrite(inputType.isList, `.array()`)
        .conditionalWrite(isOptional, `.optional()`)
        .conditionalWrite(isNullable, `.nullable()`)
        .conditionalWrite(writeComma, `,`);
};
exports.writeNonScalarType = writeNonScalarType;
//# sourceMappingURL=writeNonScalarType.js.map