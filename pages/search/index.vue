<!--
 * @Author      : YaleXin
 * @Email       : me@yalexin.top
 * @LastEditors : YaleXin
-->
<template>
  <div class="my-blog">
    <to-top></to-top>
    <navigation ></navigation>
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
    EventBus.$on("searchSubmit", this.receiveParam);
    document.title = "搜索";
  },
  head() {
    return {
      title: '查找-黄阿信的博客'
    }
  },
  asyncData(context) {
    // return context.$axios
    //   .get("/blog/search", {
    //     params: {
    //       pageNum: 1,
    //       pageSize: 5,
    //       nameOrcontent: ""
    //     }
    //   })
    //   .then(res => {
    //     console.log(res);
    //     return {
    //       page: res.page
    //     };
    //   });
  },
  data() {
    return {
      page: {
          pageNum: 1,
          pageSize: 5,
          totalSize: 1,
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
        nameOrContent: "",
    };
  },
  methods: {
    currentChange(newIndex) {
      console.log(newIndex);
        
        this.$axios
          .get("/blog/search", {
            params: {
              pageNum: this.page.pageNum,
              pageSize: this.page.pageSize,
              nameOrcontent: this.nameOrContent
            }
          })
          .then(res => {
            this.page = res.page;
          })
          .catch(e => {
            console.log(e);
          });
    },
    receiveParam(param) {
      this.nameOrContent = param;
      this.currentChange(this.page.pageNum);
    //   this.pageNum = 1;
    },
  },
  created() {}
};
</script>