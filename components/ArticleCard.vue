<!--
 * @Author      : YaleXin
 * @Email       : me@yalexin.top
 * @LastEditors : YaleXin
-->
<template>
  <div>
    <el-card>
      <div class="article-title-wrapper" style="text-align: center;">
        <div class="card-header" v-if="article.top">
          <div class="top-label">
            <font-awesome-icon :icon="['fas', 'thumbtack']" />
            <span>置顶</span>
            </div>
        </div>
        <h1 class="article-title">
          <nuxt-link  class="article-title-link" :to="{path: '/blog/' + article.id}">{{article.name}}</nuxt-link>
        </h1>
        <div class="article-detail">
          <font-awesome-icon :icon="['far', 'calendar']"/>
          <span style="margin-left:2px;">{{article.createTime.split('T')[0]}}</span>
          <el-divider direction="vertical"></el-divider>
          <font-awesome-icon :icon="['fas', 'eye']"/>
          <span style="margin-left:2px;">{{article.views}}</span>
          <el-divider direction="vertical"></el-divider>
          <font-awesome-icon :icon="['fas', 'bookmark']"/>
          <span style="margin-left:2px;">{{article.category.name}}</span>
        </div>
      </div>
      <div class="article-dscr">
        <p>{{article.description}} ...</p>
      </div>
      <div class="readMore">
        <nuxt-link  class="readMore-btn" :to="{path: '/blog/' + article.id}">阅读全文 »</nuxt-link>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "ArticleCard",
  components: {},
  methods: {
    applicationPre() {
      // return process.env.NODE_ENV === "production" ? "/blog" : "";
      return "/blog";
    }
  },
  props: {
    article: {
      type: Object,
      default: () => {
        return {
          id: 0,
          name: "题目",
          description: "描述",
          createTime: "2021-02-09T08:57:19.000+00:00",
          views: 12,
          category: {
            name: "分类",
            id: 1
          },
          tags: [
            {
              id: 1,
              name : "tag-name"
            }
          ]
        };
      }
    }
  }
};
</script>

<style scoped>
.card-header {
  position: relative;
}

.top-label {
  position: absolute;
  margin-top: -25px;
  left: 5px;
  background-color: #f00; 
  color: #fff; 
  padding: 5px;
  border-radius: 4px;
  font-size: 50%;
}
.article-title {
  font-size: 1.3em;
  font-weight: 400;
}
.article-dscr{
  text-align: justify;
}
.article-title-link {
  font-size: 1.2em;
  position: relative;
  /* text-align: center; */
}

.article-title-link:hover::after {
  left: 0%;
  width: 100%;
}

.readMore {
  margin-top: 40px;
  text-align: center;
}
.article-card-item{
  transition: all 100ms ease-in-out;
  
}
.article-card-item:hover{
	transform: scale(1.1);
	transition: all 100ms ease-in-out;
}
</style>
<style scoped lang="scss">
@import '~/assets/scss/common/common.scss';
 
.el-card{
  @include background_color("bold_white_tini_tini_black_color");
  @include font_color("text-color");
}
a,
a:link,
a:visited,
a:focus {
  text-decoration: none;
  @include font_color("small_black_color");
}
// 文章下划线
.article-title-link::after {
  content: "";
  width: 0;
  height: 3px;
  @include background_color("bold_black_color");
  position: absolute;
  top: 100%;
  left: 50%;
  transition: all 0.5s;
}
// 阅读全文按钮
.readMore-btn {
    @include background_color("bold_white_tini_tini_black_color");
    @include readMore_btn_text_color("read_more_text_color");
    border-radius: 2px;
    display: inline-block;
    line-height: 2;
    padding: 0 20px;
    text-decoration: none;
    transition-property: background-color;
    transition-delay: 0s;
    transition-duration: 0.2s;
    transition-timing-function: ease-in-out;
    font-size: 0.975em;
}
.readMore-btn:hover {
    @include readMore_btn_hover_bg("bold_black_color");
    @include readMore_btn_hover_color("bold_white_color");
}

// 文章小的细节信息
.article-detail {
  padding: 5px;
  @include font_color("normal_transparent_black_color");
  font-size: 0.7em;
}
.article-dscr {
  @include font_color("tag_color");

}
</style>
