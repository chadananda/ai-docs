// src/docProcessor.mjs

/**
 * @file
 * A module to process raw documentation into a format that's ideal for AI comprehension.
 * This involves parsing, summarizing, and converting documentations to a unified structure.
 *
 * @module docProcessor
 *
 * @description
 * Functions such as `processDoc` help in refining and structuring raw documentations.
 */

import esprima from 'esprima';
import { fetchSummaryFromOpenAI } from './utils.mjs';

/**
 * Parse the provided code to extract functions and their details.
 *
 * @param {string} code - The raw JavaScript code.
 * @returns {Array<Object>} - An array of function details.
 */
function parseCodeForFunctions(code) {
    const ast = esprima.parseScript(code, { comment: true });
    let functions = [];

    // A simple traversal to fetch function declarations. Can be expanded for more detail.
    for (const node of ast.body) {
        if (node.type === 'FunctionDeclaration') {
            functions.push({
                name: node.id.name,
                params: node.params.map(param => param.name),
                // Adding start and end positions for quick reference later
                start: node.range[0],
                end: node.range[1],
                // JSDoc comments can be extracted here if available.
            });
        }
    }

    return functions;
}

/**
 * Processes the raw documentation of a given library.
 *
 * @param {Object} library - Library details.
 * @param {string} apiKey - OpenAI API Key.
 * @returns {Promise<Object>} - Processed documentation details.
 */
export async function processLibraryDocumentation(library, apiKey) {
    console.log(`Fetching documentation for ${library.name}@${library.version}...`);

    // Here we assume `fetchDocsForLibrary` returns { readme: "...", code: "..." }
    const { readme, code } = await fetchDocsForLibrary(library, apiKey);

    // Summarize README
    const summary = await fetchSummaryFromOpenAI(readme, apiKey);

    // Parse code for functions and their details
    const functions = parseCodeForFunctions(code);

    // Return the structured documentation for further processing or saving.
    return {
        name: library.name,
        version: library.version,
        summary,
        functions
    };
}
