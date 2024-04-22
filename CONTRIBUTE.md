# CONTRIBUTING

## 创建你的开发分支
```bash
git checkout -b feature/your_branck
pnpm install
```

## 提交MR
开发完成前，你需要创建一个 `changeset` 来描述的你开发的内容
```bash
pnpm changeset # 描述你要做的变更
```

之后联系管理员新建prerelease分支，提交MR到该分支

## 提交MR，发布beta版
由有权限的同学合并MR后，进行prerelease预发布
```bash
pnpm changeset pre enter beta
pnpm changeset version
pnpm run -r build
git add .
git commit -m "Enter prerelease mode and version packages"
pnpm changeset publish
git push --follow-tags
```

## 发布正式版本
```bash
# 在 prerelease 分支，退出 prerelease 模式
pnpm changeset
pnpm changeset version
pnpm run -r build
git add .
git commit -m "publish version ..."
pnpm changeset publish
git push --follow-tags
```
之后提交到 master 分支的 MR。
