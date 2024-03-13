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
        width="50"
        trigger="hover"
        :close-delay="100"
        :content="`共${tag.blogsCnt}篇`"
      >
        <el-tag
          effect="plain"
          slot="reference"
          :type="activedId == tag.id ? '' : 'info'"
          v-bind:style="{
            fontSize:
              10 + tag.blogsCnt * 2 <= 20
                ? 10 + tag.blogsCnt * 3 + 'px'
                : '20px',
          }"
        >
          <nuxt-link :to="{ path: '/tag/' + tag.id }">
            <i class="fa fa-tag" aria-hidden="true"></i>
            <span>{{ tag.name }}</span>
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
import ArticleList from "~/components/ArticleList.vue";
export default {
  name: "Tag",
  components: {
    ArticleList,
  },
  data() {
    return {};
  },
  created() {},
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
  },
};
</script>

<style scoped>
.el-tag > a {
  text-decoration: none;
}
.el-tag {
  margin: 2px;
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
  @include background_color("bold_white_tini_black_color");
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
.my_popover {
  min-width: 0px !important;
}
</style>