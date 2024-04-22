const terser = require('@rollup/plugin-terser'); // 引入 terser 插件

module.exports =  {
  input: './src/index.js',
  output: {
    file: 'dist/index.js',
    format: 'cjs',
  },
  plugins: [
    terser(), // 添加 terser 插件来压缩代码
  ],
};
