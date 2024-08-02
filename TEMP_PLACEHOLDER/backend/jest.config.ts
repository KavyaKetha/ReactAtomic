module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    testMatch: ["**/**/*.spec.ts"],
    verbose: true,
    forceExit: true,
    coveragePathIgnorePatterns: [
        "node_modules/",
      ],
      clearMocks: true,
      collectCoverage: true,
      collectCoverageFrom: [
      '<rootDir>/src/app.ts',
      '<rootDir>/src/services/**/*.ts',
      '<rootDir>/src/controllers/**/*.ts',
      '<rootDir>/src/middlwares/**/*.ts',
      '<rootDir>/src/utils/**/*.ts'
      ],
      coverageDirectory: "coverage",
      coverageProvider: "v8",
};