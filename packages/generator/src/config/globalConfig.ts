import type { GeneratorConfig } from '../schemas';

/**
 * Global config store - similar to React Context but simpler
 * This allows config to be accessed anywhere without prop drilling
 */
class GlobalConfigStore {
  private config: GeneratorConfig | null = null;
  private initialized = false;

  /**
   * Initialize the global config (should only be called once)
   */
  initialize(config: GeneratorConfig): void {
    if (this.initialized) {
      throw new Error('Global config has already been initialized');
    }
    this.config = config;
    this.initialized = true;
  }

  /**
   * Get the current config
   */
  getConfig(): GeneratorConfig {
    if (!this.initialized || !this.config) {
      throw new Error(
        'Global config has not been initialized. Call initialize() first.',
      );
    }
    return this.config;
  }

  /**
   * Check if config is initialized
   */
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

// Export singleton instance
export const globalConfig = new GlobalConfigStore();

// Convenience function for accessing config
export const getConfig = (): GeneratorConfig => globalConfig.getConfig();
