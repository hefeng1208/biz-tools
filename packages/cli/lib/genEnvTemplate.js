const git = require('simple-git');
const fs = require('fs-extra');
const path = require('path');
const os = require('os');
const Log = require("log-horizon");

const logger = new Log({ scope: 'gen-env' })

// 创建临时目录
const tmpDir = os.tmpdir();
const prefix = path.join(tmpDir, `egg-console-env-temp-`);

function getJavaScriptFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      if (file.includes('/test/')) return;
      // 如果是目录，则递归调用
      results = results.concat(getJavaScriptFiles(file));
    } else if (path.extname(file) === '.js') {
      // 如果是.js文件，则添加到结果数组中
      results.push(file);
    }
  });
  return results;
}

module.exports = async (config) => {
  const tempDir = await fs.mkdtemp(prefix);
  // 克隆远程仓库
  try {
    if (tempDir) {
      const { branch, envPrefix, gitRepoUrl } = config;
      await git().clone(gitRepoUrl, tempDir, ['--branch', branch, '--single-branch']);
      const jsFiles = getJavaScriptFiles(tempDir)
      const envVars = {};

      // 在每个.js文件中查找环境变量
      for (const file of jsFiles) {
        const content = await fs.readFile(file, 'utf-8');
        const matches = content.match(/process\.env\.(\w+)|const\s+\{([^}]+)\}\s+=\s+process\.env/g);
        if (matches) {
          matches.forEach(env => {
            const regex = new RegExp(`\\b(${envPrefix.join('|')})\\w*\\b`, 'g')
            const ms = env.match(regex)
            if (ms) {
              ms.forEach(env => {
                envVars[env] = ''
              })
            }
          });
        }
      }
      // 将环境变量写入.env文件
      const envContent = Object.entries(envVars).map(([key, value]) => `${key}=${value}`).join('\n');
      fs.writeFile(path.join(process.cwd(), `template.env`), envContent);
    }
  } catch (e) {
    logger.error(e)
  } finally {
    await fs.rm(tempDir, { recursive: true });
  }
}
