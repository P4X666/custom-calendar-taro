module.exports = {
  verbose: true,
  moduleNameMapper: {
    '@tarojs/components': '@tarojs/components/dist-h5/react',
    '^.+\\.(css|scss|less)$': '<rootDir>/tests/style-mock.ts',
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest',
    '^.+\\.esm.js?$': 'ts-jest',
  },
  rootDir: __dirname,
  setupFiles: ['<rootDir>/tests/setupTests.ts'],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json'],
  transformIgnorePatterns: ['<rootDir>/node_modules/(?!@taro)', '^.+\\.(css|sass|scss|less)$'],
};
