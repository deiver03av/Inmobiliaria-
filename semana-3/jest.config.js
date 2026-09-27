module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",

  roots: ["<rootDir>/__tests__"],

  testMatch: ["**/*.test.ts"],

  setupFilesAfterEnv: ["<rootDir>/__tests__/setup.ts"],

  testTimeout: 15000,

  maxWorkers: 1,

  collectCoverage: true,

  coverageDirectory: "coverage",

  collectCoverageFrom: [
    "src/**/*.ts",
    "!src/server.ts",
    "!src/generated/**"
  ]
};