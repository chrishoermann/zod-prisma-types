"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeHeading = void 0;
const writeHeading = (headerString, type = 'SLIM') => type === 'SLIM'
    ? (writer) => {
        writer
            .newLine()
            .writeLine(`// ${headerString}`)
            .writeLine('//------------------------------------------------------');
    }
    : (writer) => {
        writer
            .newLine()
            .writeLine('/////////////////////////////////////////')
            .writeLine(`// ${headerString}`)
            .writeLine('/////////////////////////////////////////');
    };
exports.writeHeading = writeHeading;
//# sourceMappingURL=writeHeading.js.map