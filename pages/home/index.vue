<!--
 * @Author      : YaleXin
 * @Email       : me@yalexin.top
 * @LastEditors : YaleXin
-->
<template>
  <div class="my-blog">
    <to-top></to-top>
    <navigation></navigation>
    <middle-content
      @childPageChange="currentChange"
      :page="info"
      :topBlog="top"
      class="mainBody middle-box-card"
    />


    <!-- <div>{{blogList}}</div> -->
    <blog-footer></blog-footer>
  </div>
</template>

<script>
import Navigation from "~/components/Navigation.vue";

import BlogFooter from "~/components/Footer.vue";
import ToTop from "~/components/ToTop.vue";
import MiddleContent from "~/components/MiddleContent.vue";
export default {
  name: "Blog",
  components: {
    Navigation,
    BlogFooter,
    ToTop,
    MiddleContent,
  },
  mounted() {},
  head() {
    return {
      title: "首页-黄阿信的博客",
    };
  },
  async asyncData(context) {
    const { query } = context;
    // 获取pageNum参数，注意这里需要处理pageNum不存在的情况，以防报错
    const pageNum = query.pageNum ? parseInt(query.pageNum, 10) : 1;
    console.log("pageNum=", pageNum);

    // 定义获取博客页面数据的Promise
    const blogPagePromise = context.$axios.get("/blog/blogPage", {
      params: {
        pageNum: pageNum,
        pageSize: 5,
      },
    });

    let topDataPromise;
    if (pageNum !== 1) {
      // 如果是第一页，直接使用一个立即resolve的Promise，返回空数组
      topDataPromise = Promise.resolve([]);
    } else {
      // 否则，发起请求获取顶部博客数据
      topDataPromise = context.$axios.get("/blog/top");
    }

    // 使用 Promise.all 并行处理两个Promise
    const [blogPageData, topData] = await Promise.all([blogPagePromise, topDataPromise]);

    // 返回数据，将其映射到组件的数据属性中
    return {
      info: blogPageData.page,
      top: Array.isArray(topData) ? topData : topData.topBlogs,
    };
  },
  data() {
    return {
      info: {
        pageNum: 1,
        pageSize: 5,
        totalSize: 10,
        totalPages: 0,
        content: [
          {
            id: 1,
            name: "",
            content: "",
            description: "",
            createTime: "2021-02-09T08:57:19.000+00:00",
            updateTime: "2021-02-09T08:57:19.000+00:00",
            category: {
              id: 1,
              name: "category-name",
            },
            tags: [
              {
                id: 1,
                name: "tags-name",
              },
            ],
          },
        ],
      },
      top: [
        {
          id: 1,
          name: "",
          content: "",
          description: "",
          createTime: "2021-02-09T08:57:19.000+00:00",
          updateTime: "2021-02-09T08:57:19.000+00:00",
          category: {
            id: 1,
            name: "category-name",
          },
          tags: [
            {
              id: 1,
              name: "tag-name",
            },
          ],
        },
      ],
    };
  },
  methods: {
    currentChange(newIndex) {
      console.log(newIndex);
      // 使用编程式导航来更改URL中的pageNum查询参数
      this.$router.push({
        path: "/home",
        query: {
          pageNum: newIndex,
        },
      });
    },
    fetchBlogPageData(pageNum) {
      this.$axios
        .get("/blog/blogPage", {
          params: {
            pageNum: pageNum,
            pageSize: this.info.pageSize,
          },
        })
        .then((res) => {
          this.info = res.page;
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  watch: {
    // 监听$route的变化，一旦检测到pageNum变化，则获取数据
    "$route.query.pageNum": {
      handler(newVal) {
        if (newVal) {
          const pageNum = parseInt(newVal, 10);
          this.fetchBlogPageData(pageNum);
        }
      },
      immediate: false, // 初次加载不会执行
    },
  },
  created() {},
};
</script>
