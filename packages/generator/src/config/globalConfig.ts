import type { GeneratorOptions } from '@prisma/generator-helper';
import { parseGeneratorConfig } from '../utils';
import type { GeneratorConfig } from '../schemas';

/////////////////////////////////////////////////
// CLASS
/////////////////////////////////////////////////

/**
 * Global config store that can be accessed anywhere in the generator
 * by using the getConfig() function.
 *
 * The config is initialized with the config passed to the generator
 * in the `generatorHandler` function.
 *
 * @class GlobalConfigStore
 * @method initialize
 * @method getConfig
 * @method isInitialized
 * @method reset
 */
class GlobalConfigStore {
  private config: GeneratorConfig | null = null;

  /**
   * Initialize the config with the parsed generator config from the schema.prisma file.
   * This is mainly used for testing purposes.
   * @param config
   */
  initializeWithConfig(config: GeneratorConfig) {
    if (this.isInitialized()) {
      throw new Error('Global config has already been initialized');
    }
    this.config = config;
    return this.config;
  }

  /**
   * Initialize the config with the raw generator options from the generatorHandler
   * `onGenerate` function provided by the prisma generator helper library
   * @param options
   */
  initialize(options: GeneratorOptions) {
    if (this.isInitialized()) {
      throw new Error('Global config has already been initialized');
    }
    this.config = parseGeneratorConfig(options);
    return this.config;
  }

  getConfig(): GeneratorConfig {
    if (!this.config) {
      throw new Error('Global config has not been initialized.');
    }
    return this.config;
  }

  isInitialized(): boolean {
    return this.config !== null;
  }

  /**
   * Reset the config (mainly for testing)
   */
  reset(): void {
    this.config = null;
  }
}

// Singleton instance
export const globalConfig = new GlobalConfigStore();

// Convenience function for accessing config
export const getConfig = () => globalConfig.getConfig();
