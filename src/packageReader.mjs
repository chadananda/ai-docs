// packageReader.mjs


/**
 * @file
 * Provides functionality to identify libraries from the project's `package.json` that need documentation updates.
 *
 * @module packageReader
 *
 * @description
 * This module offers functions to inspect the `package.json` file, primarily targeting the `dependencies`
 * and `devDependencies` sections. It then checks the `_ai-docs` directory to determine if documentation
 * exists for each library and whether it matches the version listed in the `package.json`.
 */


import fs from 'fs';
import path from 'path';




/**
 * Identifies libraries from the project's `package.json` that require documentation updates.
 *
 * This function examines the `package.json` for `dependencies` and `devDependencies`. It checks the `_ai-docs`
 * directory for existing documentation and validates if the version matches the one in the `package.json`.
 * Libraries missing documentation or with outdated versions are flagged for an update.
 *
 * @function
 * @name getRequiredUpdates
 * @returns {Array<object>} - Libraries needing documentation updates, each object detailing the library's
 * name and the version.
 */
export function getRequiredUpdates() {
    const packagePath = path.join(process.cwd(), 'package.json');

    if (!fs.existsSync(packagePath)) {
        console.error("Error: package.json not found in the current directory.");
        return [];
    }

    const packageData = JSON.parse(fs.readFileSync(packagePath, 'utf-8'));
    const libraries = { ...packageData.dependencies, ...packageData.devDependencies };

    const librariesToUpdate = [];

    for (const [name, version] of Object.entries(libraries)) {
        const summaryFilePath = path.join(process.cwd(), `/_ai-docs/${name}_summary.json`);

        // Check if summary file exists for the library
        if (!fs.existsSync(summaryFilePath)) {
            librariesToUpdate.push({ name, version });
            continue;
        }

        // If summary exists, compare versions
        let summaryData;
        try {
            summaryData = JSON.parse(fs.readFileSync(summaryFilePath, 'utf-8'));
        } catch (e) {
            console.error(`Error reading summary for ${name}: ${e.message}`);
            continue; // If there's an error reading the summary, skip to the next library
        }

        if (summaryData.version !== version) {
            librariesToUpdate.push({ name, version });
        }
    }

    return librariesToUpdate;
}
