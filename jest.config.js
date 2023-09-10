module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1', // Customize this to match your project's src directory structure
  },
  // Other Jest configurations...
};
