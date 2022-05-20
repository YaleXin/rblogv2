import axios from "axios";
const sitemap = {
    path: '/sitemap.xml', // sitemap path，不用改
    hostname: 'https://www.yalexin.top/', // sitemap网址的前缀
    cacheTime: 60 * 60 * 6, //  更新频率，只在 generate: false有用
    gzip: true, // 生成 .xml.gz 压缩的 sitemap
    generate: false, // 允许使用 nuxt generate 生成
    // 排除不要页面
    exclude: [
        '/search',
        '/admin/*',
        '/admin'
    ],
    // // 页面路由
    // routes: async () => {
    //     let productList = await axios.get('https://www.yalexin.top/api/archive')
    //         .then(res => {
    //             let siteArray = [];
    //             console.log('res.data=', res.data);
    //             let yearMonthBlog = res.data.blogs;
    //             yearMonthBlog.forEach(yearMonthBlog => {
    //                 yearMonthBlog.content.forEach(blog => {
    //                     let siteObject = {
    //                         url: `/blog/${blog.id}`,
    //                         changefred: 'daily',
    //                         lastmod: new Date()
    //                     }
    //                     siteArray.push(siteObject);
    //                 })
    //             });
    //             return siteArray;
    //         });
    //     return productList;
    // }
    // 页面路由
    routes(callback) {
        axios.all([
            // 文章分类
            axios.get('https://www.yalexin.top/api/category/all'),
            // 文章标签
            axios.get('https://www.yalexin.top/api/tag/all'),
            // 所有文章
            axios.get('https://www.yalexin.top/api/archive')

        ]).then(axios.spread(function (categories, tags, blogs) {

            let now = new Date();
            now.setHours(now.getHours(), now.getMinutes() - now.getTimezoneOffset());

            let indexRoutes = [
                {
                    url: '/',
                    changefreq: 'daily',
                    priority: 1,
                    lastmodISO: now.toISOString()
                }
            ]
            // 首页
            let homeRoutes = [
                {
                    url: '/home',
                    changefreq: 'daily',
                    priority: 1,
                    lastmodISO: now.toISOString()
                }
            ];
            // 分类
            let categoryRoutes = categories.data.categories.map((data) => {
                return {
                    url: '/category/' + data.id,
                    changefreq: 'daily',
                    lastmodISO: now.toISOString()
                }
            });
            // 标签
            let tagRoutes = tags.data.tags.map((data) => {
                return {
                    url: '/tag/' + data.id,
                    changefreq: 'daily',
                    lastmodISO: now.toISOString()
                }
            });
            // 友链
            let linkRoutes = [
                {
                    url: '/link',
                    changefreq: 'daily',
                    priority: 1,
                    lastmodISO: now.toISOString()
                }
            ];
            // 留言
            let talkRoutes = [
                {
                    url: '/talk',
                    changefreq: 'daily',
                    priority: 1,
                    lastmodISO: now.toISOString()
                }
            ];
            // 归档
            let archiveRoutes = [
                {
                    url: '/archive',
                    changefreq: 'daily',
                    priority: 1,
                    lastmodISO: now.toISOString()
                }
            ];
            // 文章
            let blogList = [];
            blogs.data.blogs.forEach((yearMonths) => {
                yearMonths.content.forEach((blog) => {
                    blogList.push({
                        id: blog.id
                    })
                })
            })
            let blogRoutes = blogList.map((blog) => {
                return {
                    url: '/blog/' + blog.id,
                    changefreq: 'daily',
                    lastmodISO: now.toISOString()
                }
            });
            //  用concat进行数据合并
            callback(null, indexRoutes.concat(homeRoutes, categoryRoutes, tagRoutes, linkRoutes, talkRoutes, archiveRoutes, blogRoutes));
        }), function (err) {
            throw (err);
        });
    }
}
export default sitemap;

