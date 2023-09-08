// src/docExtractor.test.mjs

import assert from 'assert';
import {
    extractDocs,
    extractModuleDocumentation
} from './docExtractor.mjs';

// Test for extractDocs
function testExtractDocs() {
    // This test assumes you have a node_module named 'sample-library'
    // Adjust this based on your setup
    const result = extractDocs('sample-library');

    assert(result, 'Expected result to be defined.');
    assert(typeof result.rawReadme === 'string', 'Expected rawReadme to be a string.');
    assert(typeof result.rawCode === 'string', 'Expected rawCode to be a string.');
}

// Test for extractModuleDocumentation
function testExtractModuleDocumentation() {
    // This test assumes you have a module named 'sample-library'
    // Adjust this based on your setup
    const result = extractModuleDocumentation('sample-library');

    assert(result, 'Expected result to be defined.');
    // Add more assertions here based on the structure of your result
}

// Run tests
testExtractDocs();
testExtractModuleDocumentation();

console.log('All docExtractor tests passed!');
