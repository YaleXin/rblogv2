<!--
 * @Author      : YaleXin
 * @Email       : me@yalexin.top
 * @LastEditors : YaleXin
-->
<template>
  <div>
    <el-card>
      <el-popover
        popper-class="my_popover"
        v-for="tag in tagList"
        :key="tag.id"
        placement="top-start"
        width="100"
        trigger="hover"
        :close-delay="100"
        :content="`${tag.name}:共 ${tag.blogsCnt} 篇`"
      >
        <el-tag
          slot="reference"
          :class="{ activeTag: activedId == tag.id }"
          v-bind:style="{
            fontSize:
              10 + tag.blogsCnt * 2 <= 20
                ? 10 + tag.blogsCnt * 3 + 'px'
                : '20px',
            fontWeight:
              300 + tag.blogsCnt * 100 <= 1000
                ? 300 + tag.blogsCnt * 100
                : 1000,
          }"
        >
          <nuxt-link :to="{ path: '/tag/' + tag.id }">
            <i class="fa fa-tag" aria-hidden="true"></i>
            <span v-bind:style="{color: getColor(tag.name)}">{{ tag.name }}</span>
          </nuxt-link>
        </el-tag>
      </el-popover>
    </el-card>
    <el-divider content-position="center">该标签下的文章</el-divider>
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
import md5 from "js-md5";
import ArticleList from "~/components/ArticleList.vue";
export default {
  name: "Tag",
  components: {
    ArticleList,
  },
  data() {
    return {};
  },
  created() {
    this.getColor("qq");
    this.getColor("qq1");
  },
  activated() {
    document.title = "标签";
  },
  computed: {},
  props: {
    tagList: {
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
  methods: {
    applicationPre() {
      // console.log(process.env.NODE_ENV);
      // return process.env.NODE_ENV === "production" ? "/blog" : "";
      // return "/blog";
      return "";
    },
    currentChange(newIndex) {
      console.log(newIndex);
      this.page.pageNum = newIndex;
      // 通知父组件修改数据
      this.$emit("childPageChange", newIndex);
    },
    getColor(tagName) {
      const md5Str = md5(tagName);
      console.log("md5=", md5Str);
      // 16进制颜色表示法中颜色使用三个字节，即6个字符
      const colorStr = md5Str.slice(-6);
      console.log("color=", colorStr);
      return "#" + colorStr;
    },
  },
};
</script>

<style scoped>
.el-tag {
  margin: 2px;
  border: none;
  border-color: transparent;
  background: transparent;
}
.el-pagination {
  margin-top: 20px;
}
.el-tag.el-tag--info {
  border: none;
}
</style>
<style scoped lang="scss">
@import "~/assets/scss/common/common.scss";

.el-card {
  @include background_color("bold_white_tini_tini_black_color");
  @include font_color("text-color");
}
.tag_item {
  margin-right: 10px;
}
.el-badge {
  /deep/.el-badge__content {
    font-size: 10px;
  }
}
</style>
<style lang="scss">
@import "~/assets/scss/common/common.scss";
.my_popover {
  min-width: 0px !important;
}
.el-tag > a,
.el-tag > a:link,
.el-tag > a:visited,
.el-tag > a:focus {
  text-decoration: none;
  @include font_color("small_black_color");
}
.el-tag.activeTag > a {
  @include font_color("small_black_color");
   border: 2px dashed ;
   border-radius: 10px;
    padding: 2px 2px;
    text-decoration: none;

    display: inline-block;
}
</style>