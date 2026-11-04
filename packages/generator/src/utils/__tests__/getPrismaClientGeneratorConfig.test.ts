import type { GeneratorOptions } from '@prisma/generator-helper';
import { describe, it, expect } from 'vitest';

import { getPrismaClientGeneratorConfig } from '../getPrismaClientGeneratorConfig';
import type { Version } from '../getPackageVersion';

const PRISMA_6: Version = { major: 6, minor: 19, patch: 0 };
const PRISMA_7: Version = { major: 7, minor: 3, patch: 0 };

const getOptions = ({
  zodConfig = {},
  previewFeatures = [],
  isCustomOutput = true,
}: {
  zodConfig?: Record<string, string>;
  previewFeatures?: string[];
  isCustomOutput?: boolean;
} = {}) =>
  ({
    generator: {
      output: { value: '/project/prisma/generated/zod' },
      config: zodConfig,
    },
    otherGenerators: [
      {
        provider: { value: 'prisma-client' },
        output: { value: '/project/prisma/generated/client' },
        isCustomOutput,
        previewFeatures,
      },
    ],
  }) as unknown as GeneratorOptions;

describe('getPrismaClientGeneratorConfig', () => {
  describe('prisma 7', () => {
    it('should use runtime/client without a custom output', () => {
      const config = getPrismaClientGeneratorConfig(
        getOptions({ isCustomOutput: false }),
        PRISMA_7,
      );

      expect(config.prismaLibraryPath).toBe('@prisma/client/runtime/client');
    });

    it('should use runtime/client for a single file with a custom output', () => {
      const config = getPrismaClientGeneratorConfig(getOptions(), PRISMA_7);

      expect(config.prismaClientPath).toBe('../client/client');
      expect(config.prismaLibraryPath).toBe('@prisma/client/runtime/client');
    });

    it('should use runtime/client with a configured prismaClientPath', () => {
      const config = getPrismaClientGeneratorConfig(
        getOptions({ zodConfig: { prismaClientPath: '../client' } }),
        PRISMA_7,
      );

      expect(config.prismaClientPath).toBe('../client/client');
      expect(config.prismaLibraryPath).toBe('@prisma/client/runtime/client');
    });

    it('should resolve paths from the subfolders when useMultipleFiles is "true"', () => {
      const config = getPrismaClientGeneratorConfig(
        getOptions({ zodConfig: { useMultipleFiles: 'true' } }),
        PRISMA_7,
      );

      expect(config.prismaClientPath).toBe('../../client/client');
      expect(config.prismaLibraryPath).toBe(
        '../../client/internal/prismaNamespace',
      );
    });

    it('should treat useMultipleFiles "false" as a single file', () => {
      const config = getPrismaClientGeneratorConfig(
        getOptions({ zodConfig: { useMultipleFiles: 'false' } }),
        PRISMA_7,
      );

      expect(config.prismaClientPath).toBe('../client/client');
      expect(config.prismaLibraryPath).toBe('@prisma/client/runtime/client');
    });
  });

  describe('prisma 6', () => {
    it('should use runtime/library by default', () => {
      const config = getPrismaClientGeneratorConfig(getOptions(), PRISMA_6);

      expect(config.prismaLibraryPath).toBe('@prisma/client/runtime/library');
    });

    it('should use runtime/client with the queryCompiler preview feature', () => {
      const config = getPrismaClientGeneratorConfig(
        getOptions({ previewFeatures: ['queryCompiler'] }),
        PRISMA_6,
      );

      expect(config.prismaLibraryPath).toBe('@prisma/client/runtime/client');
    });
  });
});
