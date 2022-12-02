"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeNullType = void 0;
const writeNullType = (writer, { inputType, isOptional: isRequired, isNullable, writeComma = true }) => {
    const nullType = inputType.getZodNullType();
    if (!nullType)
        return;
    return writer
        .write(`z.${nullType}(),`)
        .conditionalWrite(!isRequired, `.optional()`)
        .conditionalWrite(isNullable, `.nullable()`)
        .conditionalWrite(writeComma, `,`);
};
exports.writeNullType = writeNullType;
//# sourceMappingURL=writeNullType.js.map