<!--
 * @Author      : YaleXin
 * @Email       : me@yalexin.top
 * @LastEditors : YaleXin
-->
# rblogv2
为了优化SEO，使用Nuxt改造之前的前端，由于修改过多，因此新建了仓库，原先仓库地址[在这里](https://github.com/YaleXin/rblog)

[预览地址](https://www.yalexin.top/blog/home)

## 有什么不一样

之前是`SPA`应用，对于搜索引擎的爬虫来说，爬到的都是一堆`js`文件，这样子非常不利于搜索引擎收录，这样子博客就很少人知道，写博客的初衷不就是为了大家一起分享知识，探讨知识吗，因此萌发了使用服务器渲染的框架进行改造，还好`nuxt`改起来并不是那么地困难，我要用的很多依赖也都有对应的`nuxt`版本。改造以后，客户端请求到的就是实实在在的`html`，搜索引擎也可以轻松获得到源码了，这里要吐槽一下百度，百度的爬虫似乎很懒惰，必应都是今天更新，过几天它的爬虫就爬好了。

还有之前使用的后台`markdown`编辑器似乎不兼容`nuxt`，使用过程中一直失败，然后我就换用了[mavon-editor](https://github.com/hinesboy/mavonEditor)

然后还增加了验证码登录的功能（算是完善吧，之前的不用验证码，输入正确的账户和密码就可以登录~~~）

## Build Setup

```bash
# install dependencies
# 安装依赖
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out the [documentation](https://nuxtjs.org).

## Special Directories

You can create the following extra directories, some of which have special behaviors. Only `pages` is required; you can delete them if you don't want to use their functionality.

### `assets`

The assets directory contains your uncompiled assets such as Stylus or Sass files, images, or fonts.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/assets).

### `components`

The components directory contains your Vue.js components. Components make up the different parts of your page and can be reused and imported into your pages, layouts and even other components.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/components).

### `layouts`

Layouts are a great help when you want to change the look and feel of your Nuxt app, whether you want to include a sidebar or have distinct layouts for mobile and desktop.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/layouts).


### `pages`

This directory contains your application views and routes. Nuxt will read all the `*.vue` files inside this directory and setup Vue Router automatically.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/get-started/routing).

### `plugins`

The plugins directory contains JavaScript plugins that you want to run before instantiating the root Vue.js Application. This is the place to add Vue plugins and to inject functions or constants. Every time you need to use `Vue.use()`, you should create a file in `plugins/` and add its path to plugins in `nuxt.config.js`.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/plugins).

### `static`

This directory contains your static files. Each file inside this directory is mapped to `/`.

Example: `/static/robots.txt` is mapped as `/robots.txt`.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/static).

### `store`

This directory contains your Vuex store files. Creating a file in this directory automatically activates Vuex.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/store).
