// src/index.mjs

/**
 * @file src/index.mjs
 * The orchestration module for the AI documentation tool, governing the sequential flow from reading configurations to
 * storing the processed data. The main activities encompassed within are configuration loading, library update determination,
 * raw documentation extraction, documentation processing, and storage of the refined output.
 *
 * @module main
 *
 * @description
 * The main function is the heart of the tool. The operational steps, in sequence, are:
 * - Loading the configuration to understand user-specific preferences.
 * - Determining if any libraries (either due to absence or version changes) need their documentation updated.
 * - If updates are needed, the tool extracts raw documentation and relevant code snippets from node_modules.
 * - The raw materials undergo processing, leading to AI-friendly summaries and detailed function-level indices.
 * - The polished data is then stored in a designated directory for easy future access by AI tools.
 */

import fs from 'fs';
import path from 'path';
import { extractDocs } from './docExtractor.mjs';
import { readConfig } from './configReader.mjs';
import getRequiredUpdates from './packageReader.mjs';
import dotenv from 'dotenv';
import { generateSummary, generateIndex } from './docGenerator.mjs';
import { saveSummary, saveIndex } from './utils.mjs';

dotenv.config();

/**
 * The primary executor for the AI documentation tool. Orchestrates all steps in a logical sequence to ensure
 * libraries' documentations are AI-ready. If any library's documentation is either absent or outdated,
 * this function facilitates its extraction, processing, and subsequent storage.
 *
 * @async
 * @function
 * @returns {void}
 */
async function main() {
    const projectPath = process.cwd();
    const packagePath = path.join(projectPath, 'package.json');

    // Validates the existence of a package.json in the project directory.
    if (!fs.existsSync(packagePath)) {
        console.error("Error: package.json not found in the current directory.");
        return;
    }

    // Lists libraries from package.json needing documentation updates or not yet documented.
    const librariesToUpdate = getRequiredUpdates();

    // Fetches configurations that may include user-defined libraries for documentation.
    const config = readConfig();
    const additionalLibraries = config.additionalLibraries || [];

    const allLibrariesToUpdate = [...librariesToUpdate, ...additionalLibraries];

    for (const library of allLibrariesToUpdate) {
        console.log(`Processing documentation for ${library.name}@${library.version}...`);

        // Retrieves raw READMEs and code files from node_modules for the identified library.
        const { rawReadme, rawCode } = await extractDocs(library.name);

        // Converts raw data into AI-optimized formats by generating summaries and indices.
        const summaryData = await generateSummary(library.name, library.version, rawReadme, rawCode);
        const indexData = generateIndex(rawCode);

        // Stores processed documentation data for rapid future retrievals.
        saveSummary(library.name, summaryData);
        saveIndex(library.name, indexData);
    }

    console.log("Documentation processing completed.");
}

main();
