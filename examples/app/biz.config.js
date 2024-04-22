module.exports = {
  scan: {
    path: './src',
    prefix: 'PREFIX',
    outputFileName: 'ak串',
    targetFnName: 'openApi',
    scanExtNames: ['.js'],
  },
  // 收集egg-console 的process.env的变量
  gen: {
    // 指定需要收集的egg-console的环境变量分支
    branch: 'next',
    // 指定需要收集的环境变量前缀
    envPrefix: ['JDCLOUD', 'UAS', 'SERVER_HA', 'SUB_PATH']
  }
}
