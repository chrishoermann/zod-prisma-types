"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtendedDMMFMappings = void 0;
class ExtendedDMMFMappings {
    constructor(mappings) {
        Object.defineProperty(this, "modelOperations", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "otherOperations", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.modelOperations = mappings.modelOperations;
        this.otherOperations = mappings.otherOperations;
    }
}
exports.ExtendedDMMFMappings = ExtendedDMMFMappings;
//# sourceMappingURL=extendedDMMFMappings.js.map