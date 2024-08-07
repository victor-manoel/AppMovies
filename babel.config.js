module.exports = {
  presets: [
    'module:metro-react-native-babel-preset', // Preset para React Native
  ],
  plugins: [
    ['@babel/plugin-transform-private-methods', { loose: false }],
    ['@babel/plugin-proposal-decorators', { 
      legacy: true,
    }],
    '@babel/plugin-proposal-class-properties',
    'module:react-native-dotenv', // Para variáveis de ambiente
  ],
};



// module.exports = {
//   "presets": [
//       "@babel/preset-env"
//   ],
//   plugins: [
//     ["@babel/plugin-proposal-decorators", { "legacy": true }]
//   ],
//   assumptions: {
//       setPublicClassFields: true
//   }
// };
