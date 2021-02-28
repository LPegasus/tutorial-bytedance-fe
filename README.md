# 使用说明

## Step 1 安装 rush 工具

```shell
npm i @microsoft/rush -g --registry=http://registry.npm.taobao.org
```

## Step 2 安装依赖

```shell
rush install --to @sjtu-fe/toutiao-lite-web
```

## Step 3 运行 demo

```shell
cd apps/toutiao-lite-web && rushx dev
```

## Step 4 安装 vscode 插件

打开 vscode 根据右下角提示安装插件

# 开发注意事项

## eslint-config 配置

项目所有 eslint 配置统一通过 `package.json` 中的 `eslintConfig` 字段配置。统一继承 `@sjtu-fe/eslint-config` 包的配置。

需要在 `package.json` 中 `devDependencies` 字段声明 `@sjtu-fe/eslint-config` 的依赖。

```json
// 某个包的 package.json 文件
"devDependencies": {
  "@sjtu-fe/eslint-plugin": "workspace:*"
}
```
