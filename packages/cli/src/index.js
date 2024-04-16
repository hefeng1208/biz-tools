
const { Command } = require('commander');
const chalk = require('chalk');
const inquirer = require('inquirer');
const program = new Command();
const { getConfig } = require("../lib/getConfig");
const TYPE_ENUM = {
  EGG: 'egg-console',
  SKELETON: 'skeleton-barracks'
}

program
  .version(`biz-tools/cli ${require('../package.json').version}`)
  .name("biz")
  .usage(` <command> [options]`)
  .description(`Garbage disposal tools for api`)

program
  .command(`scan`)
  .description(`扫描指定目录下的js文件,根据不同的框架类型进行处理，收集api信息，返回json文件`)
  .option(`-d, --dir <dir-path>`, `指定扫描文件目录`)
  .action(async (_, options) => {
    const { type } = await inquirer.prompt([
      {
        type: 'list',
        name: 'type',
        message: '请选择框架类型:',
        choices: ['egg-console', 'skeleton-barracks'], // 替换为你的框架类型
      },
    ]);

    const finalConfig = await getConfig(options.opts() || {})
    switch (type) {
      case TYPE_ENUM.EGG:
        return await require('../lib/egg')(finalConfig)
      case TYPE_ENUM.SKELETON:
        return await require('../lib/skeleton')(finalConfig)
      default:
        throw new Error(`Unknown parser type: ${type}`)
    }
  })

program.on('--help', () => {
  console.log()
  console.log(`  Run ${chalk.cyan(`biz <command> --help`)} for detailed usage of given command.`)
  console.log()
})

program.commands.forEach(c => c.on('--help', () => console.log()))
program.parse(process.argv)
