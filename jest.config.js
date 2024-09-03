export default {
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom",
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "^easymde$": "<rootDir>/src/__mocks__/easymde.js",
    "^@/(.*)$": "<rootDir>/src/$1",
    "^react-simplemde-editor$": "<rootDir>/src/__mocks__/react-simplemde-editor.js",
  },
  transformIgnorePatterns: ["/node_modules/(?!@babel/runtime).+\\.js$"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
};
