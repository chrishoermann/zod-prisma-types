"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DirectoryHelper = void 0;
const fs_1 = __importDefault(require("fs"));
class DirectoryHelper {
    static pathExistsElseCreate(path) {
        return this.pathOrDirExists(path) || this.createDir(path);
    }
    static createDir(path, options) {
        fs_1.default.mkdirSync(path, options || { recursive: true });
        return this.pathOrDirExists(path);
    }
    static pathOrDirExists(path) {
        return fs_1.default.existsSync(path);
    }
}
exports.DirectoryHelper = DirectoryHelper;
//# sourceMappingURL=directoryHelper.js.map