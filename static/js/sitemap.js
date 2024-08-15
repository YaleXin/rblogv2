import axios from "axios";
const sitemap = {
    path: '/sitemap.xml', // sitemap path，不用改
    hostname: 'https://www.yalexin.top', // sitemap网址的前缀
    cacheTime: 60 * 60 * 6, //  更新频率，只在 generate: false有用
    gzip: true, // 生成 .xml.gz 压缩的 sitemap
    generate: false, // 允许使用 nuxt generate 生成
    // 排除不要页面
    exclude: [
        '/search',
        '/admin/*',
        '/admin'
    ],
    // 页面路由
    routes(callback) {
        // axios.get('https://www.yalexin.top/api/category/all').then(res=>{
        //     console.log(res.data);
        // }).catch(e=>{
        //     console.log(e);
        // })
        axios.all([
            // 文章分类
            axios.get('https://www.yalexin.top/api/category/all'),
            // 文章标签
            axios.get('https://www.yalexin.top/api/tag/all'),
            // 所有文章
            axios.post('https://www.yalexin.top/api/archive', {
                data: 2020,
            }),
            axios.post('https://www.yalexin.top/api/archive', {
                data: 2021,
            }),
            axios.post('https://www.yalexin.top/api/archive', {
                data: 2022,
            }),
            axios.post('https://www.yalexin.top/api/archive', {
                data: 2023,
            }),
            axios.post('https://www.yalexin.top/api/archive', {
                data: 2024,
            })

        ]).then(axios.spread(function (categories, tags, blogs2020, blogs2021, blogs2022, blogs2023, blogs2024) {

            let now = new Date();
            now.setHours(now.getHours(), now.getMinutes() - now.getTimezoneOffset());

            let indexRoutes = [
                {
                    url: '/blog/',
                    changefreq: 'daily',
                    priority: 1,
                    lastmodISO: now.toISOString()
                }
            ]
            // 首页
            let homeRoutes = [
                {
                    url: '/blog/home',
                    changefreq: 'daily',
                    priority: 1,
                    lastmodISO: now.toISOString()
                }
            ];
            // 分类
            let categoryRoutes = categories.data.categories.map((data) => {
                return {
                    url: '/blog/category/' + data.id,
                    changefreq: 'daily',
                    lastmodISO: now.toISOString()
                }
            });
            // 标签
            let tagRoutes = tags.data.tags.map((data) => {
                return {
                    url: '/blog/tag/' + data.id,
                    changefreq: 'daily',
                    lastmodISO: now.toISOString()
                }
            });
            // 友链
            let linkRoutes = [
                {
                    url: '/blog/link',
                    changefreq: 'daily',
                    priority: 1,
                    lastmodISO: now.toISOString()
                }
            ];
            // 留言
            let talkRoutes = [
                {
                    url: '/blog/talk',
                    changefreq: 'daily',
                    priority: 1,
                    lastmodISO: now.toISOString()
                }
            ];
            // 归档
            let archiveRoutes = [
                {
                    url: '/blog/archive',
                    changefreq: 'daily',
                    priority: 1,
                    lastmodISO: now.toISOString()
                }
            ];
            // 文章
            let blogList = [];
            let blogListByYears = [blogs2020, blogs2021, blogs2022, blogs2023, blogs2024];
            blogListByYears.forEach((blogListByYear) => {
                blogListByYear.data.blogs.forEach((yearMonths) => {
                    yearMonths.content.forEach((blog) => {
                        blogList.push({
                            id: blog.id
                        })
                    })
                })
            })

            let blogRoutes = blogList.map((blog) => {
                return {
                    url: '/blog/blog/' + blog.id,
                    changefreq: 'daily',
                    lastmodISO: now.toISOString()
                }
            });
            //  用concat进行数据合并
            callback(null, indexRoutes.concat(homeRoutes, categoryRoutes, tagRoutes, linkRoutes, talkRoutes, archiveRoutes, blogRoutes));
        }), function (err) {
            throw (err);
        }).catch(e=>{
            console.log('axios.all err:', e);
        });
    }
}
export default sitemap;

