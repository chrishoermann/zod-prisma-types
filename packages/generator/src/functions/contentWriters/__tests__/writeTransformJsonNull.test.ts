import { afterEach, describe, it, expect } from 'vitest';

import { writeTransformJsonNull } from '../writeTransformJsonNull';
import { FileWriter } from '../../../classes';
import { globalConfig } from '../../../config';
import type { GeneratorConfig } from '../../../schemas';
import { DEFAULT_GENERATOR_CONFIG } from '../../../__tests__/setup';

const writeContent = (config: Partial<GeneratorConfig>) => {
  globalConfig.initializeWithConfig({
    ...DEFAULT_GENERATOR_CONFIG,
    isPrismaClientGenerator: true,
    ...config,
  });

  const fileWriter = new FileWriter();

  writeTransformJsonNull({
    fileWriter: {
      writer: fileWriter.writer,
      writeImport: fileWriter.writeImport.bind(fileWriter),
      writeImportSet: fileWriter.writeImportSet.bind(fileWriter),
      writeExport: fileWriter.writeExport.bind(fileWriter),
      writeImports: fileWriter.writeImports.bind(fileWriter),
      writeHeading: fileWriter.writeHeading.bind(fileWriter),
      writeJSDoc: fileWriter.writeJSDoc.bind(fileWriter),
    },
  });

  return fileWriter.writer.toString();
};

afterEach(() => {
  globalConfig.reset();
});

describe('writeTransformJsonNull with the prisma-client generator', () => {
  it('should use the Prisma namespace null values on prisma 7', () => {
    const content = writeContent({
      prismaVersion: { major: 7, minor: 3, patch: 0 },
    });

    expect(content).not.toContain('objectEnumValues');
    expect(content).toContain(
      `export type NullableJsonInput = Prisma.JsonValue | null | 'JsonNull' | 'DbNull' | typeof Prisma.DbNull | typeof Prisma.JsonNull;`,
    );
    expect(content).toContain(
      `if (!v || v === 'DbNull') return Prisma.DbNull;`,
    );
    expect(content).toContain(`if (v === 'JsonNull') return Prisma.JsonNull;`);
  });

  it('should import Prisma as a value in its own file on prisma 7', () => {
    const content = writeContent({
      prismaVersion: { major: 7, minor: 3, patch: 0 },
      useMultipleFiles: true,
      prismaClientPath: '../../client/client',
    });

    expect(content).toContain(`import { Prisma } from '../../client/client';`);
  });

  it('should keep the runtime null types on prisma 6', () => {
    const content = writeContent({
      prismaVersion: { major: 6, minor: 19, patch: 0 },
    });

    expect(content).toContain(
      `export type NullableJsonInput = JsonValue | null | 'JsonNull' | 'DbNull' | typeof objectEnumValues.instances.DbNull | typeof objectEnumValues.instances.JsonNull;`,
    );
  });
});
