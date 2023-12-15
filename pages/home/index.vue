<!--
 * @Author      : YaleXin
 * @Email       : me@yalexin.top
 * @LastEditors : YaleXin
-->
<template>
  <div class="my-blog">
    <to-top></to-top>
    <navigation ></navigation>
    <middle-content  @childPageChange="currentChange" :page="info" :topBlog="top" class="mainBody middle-box-card" />
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
    MiddleContent
  },
  mounted() {
  },
head() {
    return {
      title: '首页-黄阿信的博客'
    }
  },
  async asyncData(context) {

    // 使用 Promise.all 并行发送两个请求
      const [blogPageData, topData] = await Promise.all([
        context.$axios.get("/blog/blogPage", {
        params: {
          pageNum: 1,
          pageSize: 5
        }
      }),
        context.$axios.get('/blog/top'),
      ]);
      
      // 返回数据，将其映射到组件的数据属性中
      return {
        info: blogPageData.page,
        top: topData.topBlogs,
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
                name: "category-name"
              },
              tags: [
                {
                  id: 1,
                  name: "tags-name"
                }
              ]
            }
          ]
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
                  name: "category-name"
                },
                tags: [
                  {
                    id: 1,
                    name: "tag-name"
                  }
                ]
            }
          ]
    };
  },
  methods: {
    currentChange(newIndex) {
      console.log(newIndex);
        
        this.$axios
          .get("/blog/blogPage", {
            params: {
              pageNum: newIndex,
              pageSize: this.info.pageSize
            }
          })
          .then(res => {
            this.info = res.page;
          })
          .catch(e => {
            console.log(e);
          });
    },
  },
  created() {}
};
</script>