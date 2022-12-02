"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WriteBaseFilterTypes = void 0;
const formattedNames_1 = require("./formattedNames");
const DEFAULT_BASE_FILTER_OPTIONS = {
    nullable: false,
    aggregates: false,
};
const FILTER_CALLER_MAP = {
    standard: {
        base: DEFAULT_BASE_FILTER_OPTIONS,
        nested: DEFAULT_BASE_FILTER_OPTIONS,
        aggregates: { ...DEFAULT_BASE_FILTER_OPTIONS, aggregates: true },
        nestedAggregates: {
            ...DEFAULT_BASE_FILTER_OPTIONS,
            aggregates: true,
        },
    },
    nullable: {
        base: { ...DEFAULT_BASE_FILTER_OPTIONS, nullable: true },
        nested: { ...DEFAULT_BASE_FILTER_OPTIONS, nullable: true },
        aggregates: {
            ...DEFAULT_BASE_FILTER_OPTIONS,
            nullable: true,
            aggregates: true,
        },
        nestedAggregates: {
            ...DEFAULT_BASE_FILTER_OPTIONS,
            nullable: true,
            aggregates: true,
        },
    },
};
class WriteBaseFilterTypes extends formattedNames_1.FormattedNames {
    constructor(options) {
        super(options.typeKey);
    }
    getFilterTypes() {
        return this.options.filterTypesFunction();
    }
}
exports.WriteBaseFilterTypes = WriteBaseFilterTypes;
//# sourceMappingURL=writeFilterTypes.js.map