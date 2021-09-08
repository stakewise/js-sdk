module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testRegex: "/*.spec.(js|ts)$",
  testPathIgnorePatterns: [
    "<rootDir>/node_modules/",
    "<rootDir>/packages/.*/dist/",
  ],
  modulePathIgnorePatterns: ["<rootDir>/packages/.*/dist/"],
  cacheDirectory: ".jest/cache",
  coverageDirectory: ".jest/coverage",
  collectCoverageFrom: ["packages/**/src/**/*.{ts,js}"],
};
