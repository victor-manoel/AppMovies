module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['@testing-library/react-native/cleanup-after-each'],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native-community|@react-navigation)/)',
  ],
};
