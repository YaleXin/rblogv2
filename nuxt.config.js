/*
 * @Author      : YaleXin
 * @Email       : me@yalexin.top
 * @LastEditors : YaleXin
 */
export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'rblogv2',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    
    
  
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {
      src: '~/plugins/axios',
      'ssr': true // 服务端渲染
   },
    // '~/plugins/element-ui',
    {
      src: '~/plugins/element-ui',
      ssr: true
    },
    '~/plugins/font-awesome'
,  
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/axios',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    '@nuxtjs/toast',
    'nuxt-fontawesome'
  ],
  toast: {
    position: 'top-center',
    duration: 2000
  },
  fontawesome: {
    // See https://github.com/vaso2/nuxt-fontawesome
    // 这里设置了组建的标签为fa
    // 如果不设置，则默认为在font-awesome.js中，生成的：font-awesome-icon
    component: 'fa',
    imports: [
      {
        set: '@fortawesome/free-solid-svg-icons',
        icons: ['fas']
      },
      {
        set: '@fortawesome/free-regular-svg-icons',
        icons: ['far']
      },
      {
        set: '@fortawesome/free-brands-svg-icons',
        icons: ['fab']
      }
    ]
  },
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    proxy: true, // 开启跨域行为
    prefix: '/api', // 配置基本得url地址
    credentials: true
  },
  proxy: {
    '/api': {
        target: 'http://localhost:8080/api/',
        ws: false,
        changeOrigin: true,
        pathRewrite: {
            '^/api': '',
        }
    },
    '/jinri': {
        target: 'http://v1.jinrishici.com/',
        ws: false,
        changeOrigin: true,
        pathRewrite: {
            '^/jinri': '',
        }
    },
},
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    vendor: ['element-ui'],
    babel: {
      plugins: [
        [
          'component',
          {
            libraryName: 'element-ui',
            styleLibraryName: 'theme-chalk'
          }
        ]
      ],
      comments: true
    },
  }
}
