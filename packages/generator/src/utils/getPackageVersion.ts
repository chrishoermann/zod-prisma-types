import { z } from 'zod';

import fs from 'fs';
import path from 'path';

export const VersionSchema = z.object({
  major: z.number(),
  minor: z.number(),
  patch: z.number(),
});

export type Version = z.infer<typeof VersionSchema>;

type Options = {
  fallbackVersion?: Version;
};

export const getPackageVersion = (packageName: string, options?: Options) => {
  try {
    const rawData = fs.readFileSync(
      path.join(process.cwd(), 'package.json'),
      'utf-8',
    );

    const parsedJsonData = z
      .object({ dependencies: z.record(z.string(), z.string()) })
      .parse(JSON.parse(rawData));

    let version = parsedJsonData.dependencies[packageName];

    // if version is not found, fall back to provided default version or throw an error
    // this happens if the package is installed as a devDependency
    // as we currently only look under dependencies to determine the version
    if (!version) {
      if (options?.fallbackVersion) {
        console.log(
          '\x1b[33m',
          `[WARNING] Falling back to default ${options.fallbackVersion.major}.${options.fallbackVersion.minor}.${options.fallbackVersion.patch} because the version of the package ${packageName} could not be determined - make sure it is installed as a dependency and not a devDependency`,
          '\x1b[37m',
        );
        return options.fallbackVersion;
      }

      throw new Error(
        `The version of the package ${packageName} could not be determined - make sure it is installed as a dependency and not a devDependency`,
      );
    }

    version = version.replace(/^[\^=~<>*]/, '');
    const [major, minor, patch] = version.split('.').map(Number);
    const parsedVersion = VersionSchema.safeParse({ major, minor, patch });

    if (!parsedVersion.success) {
      if (options?.fallbackVersion) {
        console.log(
          '\x1b[33m',
          `[WARNING] Falling back to default ${options.fallbackVersion.major}.${options.fallbackVersion.minor}.${options.fallbackVersion.patch} because of invalid/unknown version of the package "${packageName}" in package.json`,
          '\x1b[37m',
        );
        return options.fallbackVersion;
      }

      throw new Error(
        `The version of the package ${packageName} is invalid/unknown in package.json`,
      );
    }

    return parsedVersion.data;
  } catch (error) {
    if (error instanceof Error) {
      console.log(
        '\x1b[33m',
        'Error reading package.json:',
        error.message,
        '\x1b[33m',
      );
    }
    console.log('\x1b[33m', 'Error reading package.json', '\x1b[37m');

    return undefined;
  }
};
