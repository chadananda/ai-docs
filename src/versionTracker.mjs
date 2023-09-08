// src/versionTracker.mjs
/**
 * @file
 * A module dedicated to tracking the versions of documented libraries.
 * It compares current versions in `package.json` to those in `_ai-docs` to determine if updates are needed.
 *
 * @module versionTracker
 *
 * @description
 * The primary function `compareVersions` helps in identifying modules with outdated or missing documentation.
 */


import fs from 'fs';
import path from 'path';

/**
 * Compares the versions of libraries in package.json and _ai-docs.
 * @param {Object} dependencies - The dependencies from package.json.
 * @returns {Object} Libraries that have versions different from those in _ai-docs.
 */
export function getOutdatedLibraries(dependencies) {
    const aiDocsPath = path.join(process.cwd(), '_ai-docs');
    const outdated = {};

    for (const [lib, version] of Object.entries(dependencies)) {
        const docVersionPath = path.join(aiDocsPath, lib, 'version.txt');

        if (!fs.existsSync(docVersionPath) || fs.readFileSync(docVersionPath, 'utf-8') !== version) {
            outdated[lib] = version;
        }
    }
    return outdated;
}
