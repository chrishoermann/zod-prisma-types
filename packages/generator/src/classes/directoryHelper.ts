import fs from 'fs';

/////////////////////////////////////////
//  INTERFACE
/////////////////////////////////////////

export type CreateDirOptions = fs.MakeDirectoryOptions & {
  recursive: true;
};

/////////////////////////////////////////
//  CLASS
/////////////////////////////////////////

export class DirectoryHelper {
  /**
   * Checks if a directory already exists. If not, directory is created
   * @param path string to path that should be checked/created
   * @returns "true" if created or exists - "false" if path was not created
   */
  static pathExistsElseCreate(path: string): boolean {
    return this.pathOrDirExists(path) || this.createDir(path);
  }

  /**
   * Creates a new directory at the defined path
   * @param path string to path that should be created
   * @returns "true" if path was created successfully - otherwise "false"
   */
  static createDir(path: string, options?: CreateDirOptions): boolean {
    fs.mkdirSync(path, options || { recursive: true });
    return this.pathOrDirExists(path);
  }

  /**
   * Checks if a path to file or directory exists
   * @param path string to path that should be checked
   * @returns "true" if path exists - otherwise "false"
   */
  static pathOrDirExists(path: string): boolean {
    return fs.existsSync(path);
  }
}
