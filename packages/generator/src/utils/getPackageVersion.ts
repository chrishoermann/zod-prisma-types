import { z } from 'zod';

import fs from 'fs';
import path from 'path';

export const VersionSchema = z.object({
  major: z.number(),
  minor: z.number(),
  patch: z.number(),
});

export type Version = z.infer<typeof VersionSchema>;

export const getPackageVersion = (packageName: string) => {
  try {
    const rawData = fs.readFileSync(
      path.join(process.cwd(), 'package.json'),
      'utf-8',
    );

    const jsonData = z
      .object({ dependencies: z.record(z.string(), z.string()) })
      .parse(JSON.parse(rawData));

    let version = jsonData.dependencies[packageName];
    version = version.replace(/^[\^=~<>*]/, '');

    const [major, minor, patch] = version.split('.').map(Number);

    const parsedVersion = VersionSchema.safeParse({ major, minor, patch });

    // HACKY !!!
    // default to v4.0.0 because every new project should use zod v4 now bc. I sayyyyy soooooooo!!!
    // currently a workaround to support projects like pnpm monorepos
    // that use 'catalog:' for zod where the version can not be determined via package.json
    if (!parsedVersion.success) {
      console.log(
        '\x1b[33m',
        '[WARNING] Falling back to default zod version 4.0.0 because of invalid/unknown version in package.json',
        '\x1b[37m',
      );

      return { major: 4, minor: 0, patch: 0 };
    }

    return parsedVersion.data;
  } catch (error) {
    console.error('Error reading package.json:', error);
    return undefined;
  }
};
