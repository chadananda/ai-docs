// src/docGenerator.mjs

/**
 * @file docGenerator.mjs
 * A module dedicated to the generation of structured documentation files from processed data.
 * This module provides functions to create both summary and detailed index files for each library.
 * These documentation files aid in the AI's understanding and navigation of the libraries.
 *
 * @module docGenerator
 *
 * @description
 * Primary responsibilities include:
 * - Generating a summarized version of the library's documentation for quick AI look-up.
 * - Creating a detailed index that includes function details and code examples.
 * The module assumes processed data is provided and focuses on structuring that data for AI consumption.
 */

import { saveSummary, saveIndex } from './utils.mjs';

/**
 * Generate a summarized version of the library's documentation.
 * This includes basic library details and a list of functions with their parameter information.
 * This function is essential for creating a quick reference for the AI.
 *
 * @function
 * @param {Object} libraryData - The processed documentation data for a library.
 * @param {string} libraryData.name - The name of the library.
 * @param {string} libraryData.version - The version of the library.
 * @param {string} libraryData.summary - A brief overview or description of the library.
 * @param {Array} libraryData.functions - A list of functions available in the library.
 * @returns {Object} - A structured summary suitable for quick AI look-up.
 */
function generateLibrarySummary(libraryData) {
    const { name, version, summary, functions } = libraryData;

    return {
        name,
        version,
        summary,
        functions: functions.map(func => ({
            name: func.name,
            params: func.params,
            start: func.start,
            end: func.end
        }))
    };
}

/**
 * Generate a detailed index of the library's documentation.
 * This includes comprehensive function details, code examples, and possible options or configurations.
 * The index serves as an in-depth guide for the AI, providing it with rich context on each function's usage.
 *
 * @function
 * @param {Object} libraryData - The processed documentation data for a library.
 * @param {Array} libraryData.functions - A list of functions available in the library.
 * @returns {Object} - A structured and detailed index of the library's documentation.
 */
function generateLibraryIndex(libraryData) {
    const { functions } = libraryData;

    return {
        functions: functions.map(func => ({
            name: func.name,
            params: func.params,
            description: func.description,
            codeExample: func.codeExample
            // You can expand this with more details as needed
        }))
    };
}

/**
 * Orchestrates the generation of both summary and index files for a specific library.
 * This function leverages the previously defined functions to produce structured documentation files
 * and then saves them using utility functions.
 *
 * @function
 * @param {Object} libraryData - The processed documentation data for a library.
 * @param {string} libraryData.name - The name of the library.
 * @param {string} libraryData.version - The version of the library.
 */
export function generateDocumentationFiles(libraryData) {
    const summary = generateLibrarySummary(libraryData);
    saveSummary(libraryData.name, summary);

    const index = generateLibraryIndex(libraryData);
    saveIndex(libraryData.name, index);

    console.log(`Documentation files generated for ${libraryData.name}@${libraryData.version}.`);
}
