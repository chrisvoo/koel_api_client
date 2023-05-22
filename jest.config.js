/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  errorOnDeprecated: true,
  rootDir: './',
  roots: ["<rootDir>/src/", "<rootDir>/tests/"],
  moduleDirectories: ['node_modules', 'src'],
  setupFiles: ["<rootDir>/tests/envVars.js"]
};