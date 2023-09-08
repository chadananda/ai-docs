// src/configReader.mjs
/**
 * @file
 * Provides utilities to interpret the ai-docs configuration.
 *
 * This module is responsible for extracting user-specified settings, including preferences, custom library configurations,
 * and other potential settings from the `ai-docs_config.json` file. It also handles the case where API keys might
 * be stored in environment variables.
 *
 * @module configReader
 *
 * @description
 * Main function `readConfig` retrieves and parses the configuration, ensuring any API keys stored as environment variables are resolved.
 */

import fs from 'fs';
import path from 'path';

/**
 * Reads and interprets the ai-docs_config.json file.
 *
 * This function loads the configuration for the AI-docs tool. It first attempts to locate and read the `ai-docs_config.json`
 * file in the project's root directory. If the file exists, the function parses its content and validates the structure.
 * If the config contains an API key stored as an environment variable (indicated by a string that starts with 'process.env.'),
 * this function will retrieve its actual value from the environment.
 *
 * @function
 * @name readConfig
 * @returns {object} - Parsed configuration from ai-docs_config.json, with resolved environment variables.
 */
export function readConfig() {
    const configPath = path.join(process.cwd(), 'ai-docs_config.json');

    if (!fs.existsSync(configPath)) {
        return {};
    }

    const configData = fs.readFileSync(configPath, 'utf-8');
    const config = JSON.parse(configData);

    // If the API key is stored in an environment variable, retrieve it
    if (config.apiKey && config.apiKey.startsWith('process.env.')) {
        const envVar = config.apiKey.split('.')[2];
        config.apiKey = process.env[envVar];
    }

    return config;
}
