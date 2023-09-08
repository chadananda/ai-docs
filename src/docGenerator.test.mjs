// src/docGenerator.test.mjs

import assert from 'assert';
import {
    generateDocumentationFiles
} from './docGenerator.mjs';

// Sample data for testing
const mockLibraryData = {
    name: 'sample-library',
    version: '1.0.0',
    summary: 'This is a sample library.',
    functions: [
        {
            name: 'testFunc',
            params: ['param1', 'param2'],
            description: 'A test function.',
            codeExample: 'testFunc("value1", "value2");',
            start: 10,
            end: 20
        }
    ]
};

// Test for generateDocumentationFiles
function testGenerateDocumentationFiles() {
    // Here we're mostly testing if the function runs without throwing an error
    // Adjust as per your needs
    try {
        generateDocumentationFiles(mockLibraryData);
        console.log('generateDocumentationFiles test passed!');
    } catch (error) {
        console.error('Error in generateDocumentationFiles test:', error);
        throw error;
    }
}

// Run tests
testGenerateDocumentationFiles();

console.log('All docGenerator tests passed!');
