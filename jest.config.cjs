const { defaults } = require("jest-config");

module.exports = {
  moduleNameMapper: {
    "\\.(gif|png|jpg|jpeg|svg)$": "<rootDir>/__mocks__/fileMock.js",
  },
  testEnvironment: "jest-environment-jsdom", // Usa el entorno de prueba jsdom
};
