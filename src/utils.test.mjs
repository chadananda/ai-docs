// src/utils.test.mjs

import assert from 'assert';
import {
    summarizeWithGPT4,
    summarizeReadme,
    saveSummary,
    saveIndex
} from './utils.mjs';
import fs from 'fs';

// Mock data
const mockReadmeContent = "This is a sample README for a test library.";

// Mock saving functions to avoid real filesystem writes
fs.writeFileSync = (path, data) => {};

// Test for summarizeWithGPT4
async function testSummarizeWithGPT4() {
    const summary = await summarizeWithGPT4(mockReadmeContent);

    assert(typeof summary === 'string', 'Expected a string summary.');
    assert(summary.length > 0, 'Expected non-empty summary.');
    console.log('summarizeWithGPT4 test passed!');
}

// Test for summarizeReadme
async function testSummarizeReadme() {
    const summary = await summarizeReadme(mockReadmeContent);

    assert(typeof summary === 'string', 'Expected a string summary.');
    assert(summary.length > 0, 'Expected non-empty summary.');
    console.log('summarizeReadme test passed!');
}

// Test for saveSummary
function testSaveSummary() {
    // This mainly tests if the function runs without error
    saveSummary('test-library', { summary: 'test summary' });
    console.log('saveSummary test passed!');
}

// Test for saveIndex
function testSaveIndex() {
    // This mainly tests if the function runs without error
    saveIndex('test-library', { functions: [] });
    console.log('saveIndex test passed!');
}

// Run tests
(async () => {
    await testSummarizeWithGPT4();
    await testSummarizeReadme();
    testSaveSummary();
    testSaveIndex();

    console.log('All utils tests passed!');
})();
