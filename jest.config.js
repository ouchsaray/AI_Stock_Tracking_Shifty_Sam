export default {
    testEnvironment: 'node',
    transform: {},
    moduleFileExtensions: ['js'],
    testMatch: ['**/tests/**/*.test.js'],
    verbose: true,
    collectCoverage: true,
    coverageDirectory: 'coverage',
    coverageReporters: ['text', 'lcov'],
    coveragePathIgnorePatterns: [
        '/node_modules/',
        '/tests/'
    ]
};
