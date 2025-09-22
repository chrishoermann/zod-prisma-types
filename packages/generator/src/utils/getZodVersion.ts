import { z } from 'zod';

import fs from 'fs';
import path from 'path';

export const ZodVersionSchema = z.object({
  major: z.number(),
  minor: z.number(),
  patch: z.number(),
});

export const getZodVersion = () => {
  try {
    // Read package.json file
    const rawData = fs.readFileSync(
      path.join(process.cwd(), 'package.json'),
      'utf-8',
    );
    const jsonData = z
      .object({
        dependencies: z.record(z.string(), z.string()),
      })
      .parse(JSON.parse(rawData));

    // Extract @prisma/client version
    let zodVersion = jsonData['dependencies']['zod'];
    zodVersion = zodVersion.replace(/^[\^=~<>*]/, '');

    // Remove semver characters
    zodVersion = zodVersion.replace(/^[\^=~<>*]/, '');

    // Split version into parts
    const [major, minor, patch] = zodVersion.split('.').map(Number);

    // Validate and transform version string into object
    const version = ZodVersionSchema.parse({ major, minor, patch });

    return version;
  } catch (error) {
    console.error('Error reading package.json:', error);
    return undefined;
  }
};
