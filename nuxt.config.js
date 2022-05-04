/*
 * @Author      : YaleXin
 * @Email       : me@yalexin.top
 * @LastEditors : YaleXin
 */
let turePlugins =       [
  [
    'component',
    {
      libraryName: 'element-ui',
      styleLibraryName: 'theme-chalk'
    }
  ],
  [
    'prismjs',
    {
        languages: [
            'html',
            'css',
            'javascript',
            'php',
            'dart',
            'bash',
            'nginx',
            'sql',
            'c',
            'cpp',
            'python',
            'go',
            'java',
            'clike',
            'matlab',
            'bash',
            'shell',
            'plsql',
            'sql',
            'json'

        ],
        plugins: [
            'line-numbers',
            'show-language',
            'copy-to-clipboard'
        ],
        theme: 'dark',
        css: true
    }
],
]
if (process.env.NODE_ENV === 'production') {
  turePlugins.push("transform-remove-console")
}

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'server',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: '黄阿信的个人博客',
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
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      // { rel: 'stylesheet', href: 'https://cdn.bootcdn.net/ajax/libs/fancybox/3.5.7/jquery.fancybox.min.css' }
    ],
    script: [
      {
      src: 'https://cdn.bootcdn.net/ajax/libs/jquery/3.3.1/jquery.min.js'
      },
      
      {
      src: 'https://cdn.bootcdn.net/ajax/libs/fancybox/3.5.7/jquery.fancybox.min.js'
      },
      
      ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    
    '~/assets/css/main.css'
  
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
    '~/plugins/font-awesome',
    { src: '@/plugins/localStorage', ssr: false }
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
    duration: 3000
  },
  loading: {
    color: '#00c9c3'
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
  router:{
    base: process.env.NODE_ENV === 'production' ? '/blog/' : '',
    resourceHints: false,
    prefetchLinks: false  // 解决首屏加载全部js
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
      plugins: turePlugins,
      // [
      //   [
      //     'component',
      //     {
      //       libraryName: 'element-ui',
      //       styleLibraryName: 'theme-chalk'
      //     }
      //   ],
      //   [
      //     'prismjs',
      //     {
      //         languages: [
      //             'html',
      //             'css',
      //             'javascript',
      //             'php',
      //             'dart',
      //             'bash',
      //             'nginx',
      //             'sql',
      //             'c',
      //             'cpp',
      //             'python',
      //             'go',
      //             'java'
      //         ],
      //         plugins: [
      //             'line-numbers',
      //             'show-language',
      //             'copy-to-clipboard'
      //         ],
      //         theme: 'okaidia',
      //         css: true
      //     }
      // ],
      // 'transform-remove-console'
      // ],
      comments: true
    },
  }
}
