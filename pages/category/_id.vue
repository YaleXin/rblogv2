<!--
 * @Author      : YaleXin
 * @Email       : me@yalexin.top
 * @LastEditors : YaleXin
-->
<template>
  <div class="my-blog">
    <to-top></to-top>
    <navigation></navigation>
    <category-content 
    :page="page"  
    :categoryList="categoryList"
    :activedId="activedId"
    @childPageChange="currentChange"
     class="middle-box-card" />
    <blog-footer></blog-footer>
  </div>
</template>

<script>
import Navigation from "~/components/Navigation.vue";
import BlogFooter from "~/components/Footer.vue";
import ToTop from "~/components/ToTop.vue";
import CategoryContent from "~/components/Category.vue";

export default {
  name: "Blog",
  components: {
    Navigation,
    BlogFooter,
    ToTop,
    CategoryContent
  },
  mounted() {
  },
  head() {
    return {
      title: '分类-黄阿信的博客'
    }
  },
  validate({ params }) {
    // 必须是number类型
    console.log("params.id---->", params.id);
    return /^\d+$/.test(params.id) || params.id == "-1";
  },
  async asyncData(context) {

    const { query } = context;
    // 获取pageNum参数，注意这里需要处理pageNum不存在的情况，以防报错
    const pageNum = query.pageNum ? parseInt(query.pageNum, 10) : 1;
    console.log("pageNum=", pageNum);
    
    // 输入 -1 则先查找所有分类，再获取第一个分类下的文章
    if (context.params.id == "-1" || context.params.id === -1) {
      // 先请求所有分类
      let [res1] = await Promise.all([context.$axios.get("/category/all")]);
      let categoryList = res1.categories;

      let [res2] = await Promise.all([
        context.$axios
            .get("/category/" + categoryList[0].id, {
              params: {
                pageNum: pageNum,
                pageSize: 5
              }
            })
      ]);

      return{
        page: res2.page,
        categoryList: categoryList,
        activedId: categoryList[0].id
      }
    } else if (/^\d+$/.test(context.params.id)) {
      // 如果 id 是数字，即输入正确
      // 同时查找所有分类和该分类下的文章
      let [res1, res2] = await Promise.all([
        context.$axios.get("/category/all"),
        context.$axios
            .get("/category/" + context.params.id, {
              params: {
                pageNum: pageNum,
                pageSize: 5
              }
            })
      ]);
      return{
        page: res2.page,
        categoryList: res1.categories,
        activedId: context.params.id
      }
    }
  },
  data() {
    return {
      activedId: -1,
      activedCategoryExist: false,
      categoryList: [],
      page: {
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
              name: ""
            },
            tags: [
              {
                id: 1,
                name: ""
              }
            ]
          }
        ]
      },
    };
  },

  methods: {
    currentChange(newIndex) {
      console.log('newIndex=',newIndex);
      this.page.pageNum = newIndex;
      if (this.activedId > 0) {
        console.log('this.$route.path=',this.$route.path);
        this.$axios
          .get("/category/" + this.activedId, {
            params: {
              pageNum: this.page.pageNum,
              pageSize: this.page.pageSize
            }
          })
          .then(res => {
            this.$router.push({
            path: this.$route.path, 
            query: {
              pageNum: newIndex,
            },
            });
            console.log('res.page=',res.page);
            this.page = res.page;
          })
          .catch(e => {
            console.log(e);
          });

      }
    }
  },
  created() {}
};
</script>