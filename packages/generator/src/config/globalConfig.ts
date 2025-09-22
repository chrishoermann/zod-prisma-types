import type { GeneratorConfig } from '../schemas';

/**
 * Global config store
 */
class GlobalConfigStore {
  private config: GeneratorConfig | null = null;
  private initialized = false;

  initialize(config: GeneratorConfig) {
    if (this.initialized) {
      throw new Error('Global config has already been initialized');
    }
    this.config = config;
    this.initialized = true;

    return this.config;
  }

  getConfig(): GeneratorConfig {
    if (!this.initialized || !this.config) {
      throw new Error(
        'Global config has not been initialized. Call initialize() first.',
      );
    }
    return this.config;
  }

  isInitialized(): boolean {
    return this.initialized;
  }

  /**
   * Reset the config (mainly for testing)
   */
  reset(): void {
    this.config = null;
    this.initialized = false;
  }
}

// Singleton instance
export const globalConfig = new GlobalConfigStore();

// Convenience function for accessing config
export const getConfig = () => globalConfig.getConfig();
