/// <reference types="node" />
import fs from 'fs';
export type CreateDirOptions = fs.MakeDirectoryOptions & {
  recursive: true;
};
export declare class DirectoryHelper {
  static pathExistsElseCreate(path: string): boolean;
  static createDir(path: string, options?: CreateDirOptions): boolean;
  static pathOrDirExists(path: string): boolean;
}
//# sourceMappingURL=directoryHelper.d.ts.map
