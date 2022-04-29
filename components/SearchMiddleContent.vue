<!--
 * @Author      : YaleXin
 * @Email       : me@yalexin.top
 * @LastEditors : YaleXin
-->
<template>
  <div>
    <el-divider content-position="center">
      搜索结果：共
      <span style="color: #35b8ff">{{page.totalSize}}</span>条
    </el-divider>
    <article-list :articleList="page.content"></article-list>
    <!-- 分页 -->
    <div style="text-align: center">
      <el-pagination
        background
        :current-page="page.pageNum"
        :pager-count="5"
        @current-change="currentChange"
        :hide-on-single-page="true"
        layout="prev, pager, next"
        :total="page.totalSize"
        :page-size="page.pageSize"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import ArticleList from "~/components/ArticleList.vue";
export default {
  name: "SearchMiddleContent",
  components: {
    ArticleList
  },
  props: {
    page: {
      type: Object,
      default: () => {
        return {
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
        };
      }
    }
  },
  data() {
    return {};
  },
  mounted() {
    console.log("midleContent mounted()");
  },
  methods: {
    currentChange(newIndex) {
      console.log(newIndex);
      this.page.pageNum = newIndex;
      // 通知父组件修改数据
      this.$emit('childPageChange',newIndex);
    }
  },
  created() {
    console.log("midleContent created()");
  },
  activated() {
    document.title = "黄阿信的博客";
  }
};
</script>

<style scoped>
.el-pagination {
  margin-top: 20px;
}
</style>