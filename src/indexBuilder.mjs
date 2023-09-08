// src/indexBuilder.mjs

/**
 * @file
 * A module focused on constructing an AI-friendly consolidated index from individual library summaries and detailed indices.
 * This index provides a quick lookup for the AI when it needs to understand or navigate various libraries.
 *
 * @module indexBuilder
 *
 * @description
 * The primary objective is to:
 * - Load the summary and index files of each library.
 * - Construct a consolidated data structure that the AI can quickly reference.
 * - Ensure the index is always up-to-date and representative of the current libraries.
 */

import fs from 'fs';
import path from 'path';

/**
 * Loads a library's summary and index files from the disk.
 *
 * @function
 * @param {string} libraryName - The name of the library.
 * @returns {Object} - The combined data of the library's summary and detailed index.
 */
function loadLibraryFiles(libraryName) {
    const basePath = path.join(process.cwd(), 'ai_docs'); // Assuming "ai_docs" is where summaries and indices are stored.

    const summaryPath = path.join(basePath, `${libraryName}_summary.json`);
    const indexPath = path.join(basePath, `${libraryName}_index.json`);

    const summaryContent = fs.existsSync(summaryPath) ? JSON.parse(fs.readFileSync(summaryPath, 'utf-8')) : {};
    const indexContent = fs.existsSync(indexPath) ? JSON.parse(fs.readFileSync(indexPath, 'utf-8')) : {};

    return {
        ...summaryContent,
        ...indexContent
    };
}

/**
 * Builds the consolidated index using the loaded library files.
 * This index provides a fast, unified data structure that can be used for AI lookups.
 *
 * @function
 * @returns {Object} - The consolidated index of all libraries.
 */
function buildConsolidatedIndex() {
    const basePath = path.join(process.cwd(), 'ai_docs');
    const libraries = fs.readdirSync(basePath).filter(file => file.endsWith('_summary.json')).map(file => file.replace('_summary.json', ''));

    const consolidatedIndex = {};

    for (const library of libraries) {
        consolidatedIndex[library] = loadLibraryFiles(library);
    }

    return consolidatedIndex;
}

/**
 * Orchestrates the entire process of loading individual library files and constructing the consolidated index.
 * This function also saves the consolidated index back to disk for future AI lookups.
 *
 * @function
 * @returns {void}
 */
export function constructAIIndex() {
    const consolidatedIndex = buildConsolidatedIndex();

    const outputPath = path.join(process.cwd(), 'ai_docs', 'consolidated_index.json');
    fs.writeFileSync(outputPath, JSON.stringify(consolidatedIndex, null, 4));

    console.log("Consolidated AI index has been built and saved.");
}
