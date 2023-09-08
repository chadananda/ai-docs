// src/docExtractor.mjs

/**
 * @file
 * Extracts and processes documentation from local npm modules.
 * This module reads the README, summarizes it, and then uses Esprima
 * to parse the code, extracting function details for our lookup.
 *
 * @module docExtractor
 *
 * @description
 * Provides functions to extract, process, and generate concise machine-readable
 * documentation from local npm modules.
 */

import fs from 'fs';
import path from 'path';
import esprima from 'esprima';
import { summarizeReadme } from './utils.mjs';  // Using your utility function for summarizing the README

/**
 * Detects the presence of a README file in a given directory.
 */
function findReadme(dir) {
    // ... (Your existing logic)
}

/**
 * Gets the main entry file of a module from its package.json.
 */
function getMainEntry(modulePath) {
    // ... (Your existing logic)
}

/**
 * Parses a JavaScript file and extracts function details.
 */
function extractFunctions(filePath) {
    // ... (Your existing logic)
}

/**
 * Extracts documentation from a local npm module.
 *
 * @param {string} moduleName - Name of the npm module.
 * @returns {Object} - Extracted documentation data.
 */
function extractModuleDocumentation(moduleName) {
    // ... (Your existing logic)
}

/**
 * Extracts raw documentation and code from the specified library in the node_modules directory.
 *
 * @param {string} libraryName - The name of the library to extract documentation from.
 * @returns {object} - An object containing the raw README and code from the specified library.
 */
async function extractDocs(libraryName) {
    const modulePath = path.join(process.cwd(), 'node_modules', libraryName);

    // Extracting README
    const readmePath = findReadme(modulePath);
    let rawReadme = "";
    if (readmePath) {
        rawReadme = fs.readFileSync(readmePath, 'utf-8');
    }

    // Extracting main entry file code
    const mainEntryPath = getMainEntry(modulePath);
    let rawCode = "";
    if (fs.existsSync(mainEntryPath)) {
        rawCode = fs.readFileSync(mainEntryPath, 'utf-8');
    }

    return { rawReadme, rawCode };
}

export { extractDocs, extractModuleDocumentation };
