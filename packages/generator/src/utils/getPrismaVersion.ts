import fs from 'fs';
import path from 'path';

import { z } from 'zod';

export const PrismaVersionSchema = z.object({
  major: z.number(),
  minor: z.number(),
  patch: z.number(),
});

export type PrismaVersion = z.infer<typeof PrismaVersionSchema>;

export const getPrismaVersion = () => {
  try {
    // Read package.json file
    const rawData = fs.readFileSync(
      path.join(process.cwd(), 'package.json'),
      'utf-8',
    );
    const jsonData = JSON.parse(rawData);

    // Extract @prisma/client version
    let prismaVersion = jsonData['dependencies']['@prisma/client'];

    // Remove semver characters
    prismaVersion = prismaVersion.replace(/^[\^=~<>*]/, '');

    // Split version into parts
    const [major, minor, patch] = prismaVersion.split('.').map(Number);

    // Validate and transform version string into object
    const version = PrismaVersionSchema.parse({ major, minor, patch });

    return version;
  } catch (error) {
    console.error(`Error reading package.json: ${error}`);
    return undefined;
  }
};
