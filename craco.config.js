const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    configure: (webpackConfig) => {
      // Babel loader를 통해 ESM 모듈을 변환하는 설정 추가
      webpackConfig.module.rules.push({
        test: /\.js$/,
        include: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-transform-runtime'],
          },
        },
        exclude: /node_modules\/(?!strip-ansi)/, // 특정 모듈만 포함시키기
      });

      return webpackConfig;
    },
  },
};
