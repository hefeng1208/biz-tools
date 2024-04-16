
const JoyCon =require('joycon')
const fs = require('fs-extra')
const { resolve } = require('path')

const joycon = new JoyCon({
  packageKey: 'biz'
})
joycon.addLoader({
  test: /\.bizrc$/,
  async load(filePath) {
    const source = await fs.readFile(filePath, 'utf-8')
    return JSON.parse(source)
  }
})
const getConfig = async (cliOptions = {}) => {

  const { path, data } = await joycon.load([
    'biz.config.js',
    '.bizrc',
    'package.json'
  ])

  const config = {
    // 如果不配置默认扫描src/api目录
    dir: {
      path: resolve(process.cwd(), './src/api'),
      prefix: '',
      outputFileName: 'output',
      targetFnName: 'openApi',
      scanExtNames: ['.js']
    }
  }

  if (path) Object.assign(config, data, cliOptions)
  Object.assign(config, cliOptions || {})
  return config
}
module.exports = {
  getConfig
}
