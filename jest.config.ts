export default {
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
    "^.+\\.m?js$": "ts-jest",
  },
  transformIgnorePatterns: ["node_modules/(?!(three-spritetext))"],
  moduleNameMapper: {
    "^@src/(.*)$": "<rootDir>/src/$1",
  },
  rootDir: ".",
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
};
