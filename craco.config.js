const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.REACT_APP_API': JSON.stringify(process.env.REACT_APP_API),
        'process.env.REACT_APP_PUBLIC_URL': JSON.stringify(process.env.REACT_APP_PUBLIC_URL),
      }),
    ],
  },
  jest: {
    configure: {
      moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
      },
    },
  },
};
