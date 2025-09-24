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

    return VersionSchema.parse({ major, minor, patch });
  } catch (error) {
    console.error('Error reading package.json:', error);
    return undefined;
  }
};
