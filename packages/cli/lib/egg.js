const { parse } = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const fs = require("fs-extra");
const path = require('path')
const Log = require('log-horizon')
const parseAst = require('./parseEggAst')

const logger = new Log({ scope: 'egg-console-parser' })
module.exports = async (config) => {
  try {
    const { dir: dirPath, outputFileName, targetFnName, scanExtNames } = config
    const outputFilePath = path.resolve(process.cwd(), `${dirPath}/${outputFileName}.json`)
    const results = []
    async function traverseFolder(folderPath) {
      const fileNames = fs.readdirSync(folderPath);

      for (const fileName of fileNames) {
        const filePath = path.join(folderPath, fileName);
        const stats = fs.statSync(filePath);

        if (stats.isFile() && scanExtNames.includes(path.extname(filePath))) {
          const output = await processFile(filePath);
          results.push(output)
        } else if (stats.isDirectory()) {
          await traverseFolder(filePath);
        }
      }
    }
    await traverseFolder(dirPath)

    async function processFile(filePath) {
      const result = {};
      const varToValue = {}
      const code = await fs.readFileSync(filePath, "utf8");
      const ast = parse(code, {
        sourceType: "module",
        plugins: ["jsx"],
      });
      traverse(ast, {
        VariableDeclarator(path){
          const { id, init } = path.node;
          if (id.type === 'Identifier' && init?.type === 'StringLiteral') {
            const value = init.value.replace(/\//g, '');
            varToValue[id.name] = value;
          }
        },
        CallExpression(path) {
          if (path.node.callee.name === targetFnName) {
            const firstArg = path.node.arguments[0];
            if (firstArg.type === "StringLiteral") {
              const [moduleName, ...methods] = firstArg.value.split("/").filter(Boolean);
              if (!result[moduleName]) {
                result[moduleName] = [];
              }
              result[moduleName].push(methods.join("/"));
            }
          }
        },
        ObjectMethod(innerPath) {
          const { key, body } = innerPath.node;
          if (key.type === 'Identifier' && body.type === 'BlockStatement') {
            body.body.forEach(statement => {
              const parseResult = parseAst(statement, targetFnName, varToValue)
              Object.entries(parseResult).forEach(([key, value]) => {
                if (!result[key]) {
                  result[key] = [];
                }
                result[key].push(...value);
              })
            });
          }
        },
        ExportNamedDeclaration(innerPath) {
          const { declaration } = innerPath.node;
          if (declaration.type === 'FunctionDeclaration' && declaration.body.type === 'BlockStatement') {
            declaration.body.body.forEach(statement => {
              const parseResult = parseAst(statement, targetFnName, varToValue)
              Object.entries(parseResult).forEach(([key, value]) => {
                if (!result[key]) {
                  result[key] = [];
                }
                result[key].push(...value);
              })
            });
          }
        }
      });
      return result;
    }
    // 清空或创建输出文件
    fs.writeFileSync(outputFilePath, '');
    if (results.length) {
      const result = results.filter(item => Reflect.ownKeys(item).length > 0)
      // 将结果写入JSON文件
      fs.appendFileSync(outputFilePath, JSON.stringify(result,null,2) + '\n');
    }
    logger.success(`处理完成！\n 生成文件路径为:${outputFilePath}`);
  } catch (error) {
    logger.error("Error processing files:", error);
  }
}
