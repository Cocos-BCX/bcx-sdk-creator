[English](https://github.com/Cocos-BCX/bcx-sdk-creator/blob/master/readme.md "English")

# Cocos-BCX For Cocos Creator

## 简介

1. [Cocos-BCX](https://www.cocosbcx.io/)：下一代游戏数字经济平台，以下简称 BCX。
2. [Cocos Creator](https://cocos2d-x.org/creator)：以内容创作为核心的一体化游戏开发工具。

本工程提供给用户可使用的 BCX For Cocos Creator 插件, 以及一个在 Cocos Creator 上联接 BCX 的 Sample 工程.

## 工程结构

`bcx` : 这是 BCX For Cocos Creator 的插件包.  (可以直接把这个文件夹安装到工程中的 packages 中, 即可使用)

![](./document/imgs/bcx_package.png)


`sample` : 这是 Sample 工程, 里面有调用 BCX 的基本方式.

## BCX For Cocos Creator 配置要求

CocosCreator 2.0+

## BCX For Cocos Creator 插件的使用

* 将 `bcx` 文件夹放在 Creator 工程的 packages 目录下
* 安装好后, 在 Creator 的菜单中, 可以找到如下菜单

![](./document/imgs/bcx_menu.png)

* 点击菜单 `Install`, 就会在 assets 目录下生成一个文件夹 `bcx`
* 关闭并重新打开工程，`bcx` 文件夹出现在 `assets` 下

![x](./document/imgs/bcx_assets.png)

* 现在就可以在自己的代码中调用 bcx 相关的接口了.

## 本工程中 sample 的说明

* 如果你是 Mac 系统, 可以用 CocosCreator 2.0+ 直接打开 `sample/bcx-creator`, 运行此示例工程
* 如果你是 Win 系统, 请将 `sample/bcx-creator/packages/bcx` 删除, 然后再把工程根目录下的 `bcx` 文件夹拷到 `sample/bcx-creator/packages/` 即可, 然后用 CocosCreator 2.0+ 打开,  运行.

## 版本对应

| BCX For Creator | BCX JS SDK |
| --------------- | ---------- |
| 0.0.1           | 1.3.0.2    |

如上第一行说明, BCX For Creator 0.0.1 是基于 BCX JS SDK 1.3.0.2 而生成的.
