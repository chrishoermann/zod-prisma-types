import { z } from 'zod';

/////////////////////////////////////////////////
// SCHEMAS
/////////////////////////////////////////////////

export const processSchema = z.object({
  env: z.object({
    SKIP_ZOD_PRISMA: z
      .string()
      .optional()
      .transform((val) => val === 'true'),
  }),
});

/////////////////////////////////////////////////
// FUNCTIONS
/////////////////////////////////////////////////

export const skipGenerator = (): boolean => {
  const skipGenerator = processSchema.parse(process).env.SKIP_ZOD_PRISMA;

  if (skipGenerator) {
    console.log(
      '\x1b[33m',
      '!!!! Generation of zod schemas skipped! Generator is disabled via "SKIP_ZOD_PRISMA" environment variable !!!!',
      '\x1b[37m',
    );

    return true;
  }

  return false;
};
