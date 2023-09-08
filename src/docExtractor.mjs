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
import { summarizeReadme } from './utils.mjs';

/**
 * Detects the presence of a README file in a given directory.
 *
 * @param {string} dir - Directory to search for a README.
 * @returns {string|null} - Path to the README file or null if not found.
 */
function findReadme(dir) {
    const readmeFiles = ['README.md', 'readme.md', 'Readme.md'];

    for (const file of readmeFiles) {
        const fullPath = path.join(dir, file);
        if (fs.existsSync(fullPath)) {
            return fullPath;
        }
    }

    return null;
}

/**
 * Gets the main entry file of a module from its package.json.
 *
 * @param {string} modulePath - Path to the npm module.
 * @returns {string} - Path to the main entry file of the module.
 */
function getMainEntry(modulePath) {
    const packageJsonPath = path.join(modulePath, 'package.json');
    let mainEntry = 'index.js';
    if (fs.existsSync(packageJsonPath)) {
        const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
        mainEntry = packageJson.main || mainEntry;
    }
    return path.join(modulePath, mainEntry);
}

/**
 * Parses a JavaScript file and extracts function details.
 *
 * @param {string} filePath - Path to the JavaScript file.
 * @returns {Array} - List of functions extracted from the file.
 */
function extractFunctions(filePath) {
    let functions = [];
    if (fs.existsSync(filePath)) {
        const code = fs.readFileSync(filePath, 'utf-8');
        const parsedCode = esprima.parseModule(code, { comment: true });

        for (const node of parsedCode.body) {
            if (node.type === 'FunctionDeclaration') {
                functions.push({
                    name: node.id.name,
                    params: node.params.map(param => param.name),
                    // You can add more details if needed
                });
            }
        }
    }

    return functions;
}

/**
 * Extracts documentation from a local npm module.
 *
 * @param {string} moduleName - Name of the npm module.
 * @returns {Object} - Extracted documentation data.
 */
function extractModuleDocumentation(moduleName) {
    const docs = extractDocs(moduleName);
    const functionDetails = extractFunctions(docs.rawCode);
    return {
        readme: docs.rawReadme,
        functions: functionDetails
    };
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
