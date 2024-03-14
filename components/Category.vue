<!--
 * @Author      : YaleXin
 * @Email       : me@yalexin.top
 * @LastEditors : YaleXin
-->
<template>
  <div>
    <el-card>
      <el-badge
        v-for="ctgr in categoryList"
        :key="ctgr.id"
        :value="ctgr.blogsCnt"
        class="ctgr_item"
        :type="activedId == ctgr.id ? 'primary' : 'info'"
      >
        <el-tag :type="activedId == ctgr.id ? '' : 'info'">
          <nuxt-link :to="{ path: '/category/' + ctgr.id }">
            <i class="fa fa-bookmark-o" aria-hidden="true"></i>
            <span>{{ ctgr.name }}</span>
          </nuxt-link>
        </el-tag>
      </el-badge>
    </el-card>
    <el-divider content-position="center">该分类下的文章</el-divider>
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
// import innerHttp from "../network/innerHttp.js";
import ArticleList from "~/components/ArticleList.vue";
export default {
  name: "Category",
  components: {
    ArticleList,
  },
  data() {
    return {};
  },
  props: {
    categoryList: {
      type: Array,
      default: () => {
        return [];
      },
    },
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
                name: "",
              },
              tags: [
                {
                  id: 1,
                  name: "",
                },
              ],
            },
          ],
        };
      },
    },
    activedId: 0,
  },
  created() {},
  activated() {
    document.title = "分类";
  },
  computed: {},
  methods: {
    applicationPre() {
      // console.log(process.env.NODE_ENV);
      // return process.env.NODE_ENV === "production" ? "/blog" : "";
      // return "/blog";
      return "";
    },
    setActivedId() {
      let id = parseInt(this.$route.params.id);

      if (id === -1 && this.categoryList.length > 0) {
        id = this.categoryList[0].id;
      } else if (id !== NaN) {
        let exist = false;
        for (let i = 0; i < this.categoryList.length; i++) {
          // 检查分类id是否合法
          if (id === this.categoryList[i].id) {
            exist = true;
            break;
          }
        }
        if (!exist) {
          id = -1;
        }
      }
      this.activedId = id;
    },
    currentChange(newIndex) {
      console.log(newIndex);
      this.page.pageNum = newIndex;
      // 通知父组件修改数据
      this.$emit("childPageChange", newIndex);
    },
  },
};
</script>

<style scoped>
.el-tag {
  margin: 2px;
}
.el-pagination {
  margin-top: 20px;
}
</style>
<style scoped lang="scss">
@import "~/assets/scss/common/common.scss";

.el-card {
  @include background_color("bold_white_tini_tini_black_color");
  @include font_color("text-color");
}
.el-tag > a {
  text-decoration: none;
  @include font_color("tag_color");
}
.el-tag {
  @include background_color("special_blue_color");
}
.el-tag--info {
  @include background_color("tini_gray_color");
}
.ctgr_item {
  margin-right: 10px;
}
.el-badge {
  /deep/.el-badge__content {
    font-size: 10px;
  }
}
</style>