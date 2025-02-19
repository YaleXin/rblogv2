<!--
 * @Author      : YaleXin
 * @Email       : me@yalexin.top
 * @LastEditors : YaleXin
-->
<template>
  <div class="my-blog">
    <to-top></to-top>
    <navigation ></navigation>
    <div class="middle-box-card search-input-div" >
      <el-input
      placeholder="请输入内容，以查找标题或者内容"
      prefix-icon="el-icon-search"
      v-model="nameOrContent"
      @keyup.native.enter="inputSubmit">
      </el-input>
    </div>
    <search-middle-content  @childPageChange="currentChange" :page="page" class="mainBody middle-box-card" />
    <!-- <div>{{blogList}}</div> -->
    <blog-footer></blog-footer>
  </div>
</template>

<script>
import { EventBus } from "~/eventBus/index.js";
import Navigation from "~/components/Navigation.vue";

import BlogFooter from "~/components/Footer.vue";
import ToTop from "~/components/ToTop.vue";
import SearchMiddleContent from "~/components/SearchMiddleContent.vue";
export default {
  name: "Blog",
  components: {
    Navigation,
    BlogFooter,
    ToTop,
    SearchMiddleContent
  },

  mounted() {
    document.title = "搜索";
  },
  head() {
    return {
      title: '查找-黄阿信的博客'
    }
  },
  asyncData(context) {
    const { query } = context;
    const pageNum = query.pageNum ? parseInt(query.pageNum, 10) : 1;
    const keyword = query.keyword ?? "";
    if(keyword != ""){
      return context.$axios
            .get("/blog/search", {
            params: {
              pageNum: pageNum,
              pageSize: 5,
              nameOrContent: keyword
            }
          }).then(res=>{
              return {
                page: res.page,
                nameOrContent: keyword,
              };
            }).catch(e=>{

            })
    }
  },
  data() {
    return {
      page: {
          pageNum: 1,
          pageSize: 5,
          totalSize: 0,
          totalPages: 0,
          content: [
            //            {
            //   id: 1,
            //   name: "",
            //   content: "",
            //   description: "",
            //   createTime: "2021-02-09T08:57:19.000+00:00",
            //   updateTime: "2021-02-09T08:57:19.000+00:00",
            //   category: {
            //     id: 1,
            //     name: ""
            //   },
            //   tags: [
            //     {
            //       id: 1,
            //       name: ""
            //     }
            //   ]
            // }
          ]
        },
        nameOrContent: "",
    };
  },
  methods: {
    inputSubmit(){
      if(this.nameOrContent == ""){
        this.$message({
          showClose: true,
          message: '少侠为何不言，支支吾吾？',
          type: 'warning'
        });
      }else{
        this.currentChange(this.page.pageNum);
      }
    },
    currentChange(newIndex) {
      console.log(newIndex);

        this.$axios
          .get("/blog/search", {
            params: {
              pageNum: this.page.pageNum,
              pageSize: this.page.pageSize,
              nameOrContent: this.nameOrContent
            }
          })
          .then(res => {
            this.$router.push({
            path: this.$route.path, 
            query: {
              pageNum: newIndex,
              keyword: this.nameOrContent
            },
            });
            this.page = res.page;
          })
          .catch(e => {
            console.log(e);
          });
    },
  },
  created() {}
};
</script>


<style scoped lang="scss">
@import "~/assets/scss/common/common.scss";
.search-input-div {
  ::v-deep .el-input__inner,
  ::v-deep .el-textarea__inner {
    @include background_color("bold_white_tini_tini_black_color");
  }
  margin-top: 20px;
}
</style>