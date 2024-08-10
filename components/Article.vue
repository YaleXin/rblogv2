<!--
 * @Author      : YaleXin
 * @Email       : me@yalexin.top
 * @LastEditors : YaleXin
-->
<template>
  <div id="#article-content">
    <el-card>
      <div class="article-title-wrapper" style="text-align: center">
        <h1 class="article-title">{{ article.name }}</h1>
        <div class="article-detail">
          <i class="fa fa-calendar"></i>
          <font-awesome-icon :icon="['fa', 'calendar']" />
          <span style="margin-left: 2px; font-size: 14px">{{
            article.createTime
          }}</span>
          <el-divider direction="vertical"></el-divider>
          <font-awesome-icon :icon="['fa', 'eye']" />
          <span style="margin-left: 2px; font-size: 14px"><count-to :startVal='0' :endVal='article.views' :duration='3000'></count-to></span>
          <el-divider direction="vertical"></el-divider>
          <font-awesome-icon :icon="['fa', 'bookmark']" />
          <nuxt-link
            class="article-category-a"
            :to="{ path: '/category/' + article.category.id }"
          >
            <span style="margin-left: 2px; font-size: 14px">{{
              article.category.name
            }}</span>
          </nuxt-link>
        </div>
      </div>
      <el-divider></el-divider>
      <!-- 目录div -->
      <el-popover placement="right" trigger="hover" popper-class="toc-popper">
        <div class="toc-container"></div>
        <div
          slot="reference"
          class="toc-wrapper animate__animated animate__backInLeft"
        >
          目录
        </div>
      </el-popover>

      <div
        id="articleContent"
        class="article-content typo"
        v-html="article.content"
      ></div>
      <el-divider></el-divider>
      <div class="tag-group">
        <el-tag v-for="tag in article.tags" :key="tag.id">
          <nuxt-link :to="{ path: '/tag/' + tag.id }">
            <font-awesome-icon :icon="['fa', 'tag']" />
            <span>{{ tag.name }}</span>
          </nuxt-link>
        </el-tag>
      </div>
      <div class="appreciate-wrapper">
        <appreciate></appreciate>
      </div>
      <div class="copyright-wrapper">
        <copy-right-article></copy-right-article>
      </div>
      <!-- 评论 -->
      <!-- <blog-comment 
    class="middle-box-card"
    :commentList="commentList"
    :blogId="article.id"
    /> -->

      <blog-talk-content
        :commentList="blogCommentList"
        :blogId="article.id"
        :textUp="'历史评论'"
        :textDown="'开始评论'"
      />
    </el-card>
  </div>
</template>

<script>
import CountTo from 'vue-count-to';
import Appreciate from "~/components/Appreciate.vue";
import CopyRightArticle from "~/components/CopyRightArticle.vue";
import Prism from "prismjs";
import tocbot from "tocbot";
import BlogTalkContent from "~/components/Talk.vue";
export default {
  head() {
    return {
      link: [
        { rel: "stylesheet", href: require("~/assets/css/blog.css") },
        { rel: "stylesheet", href: require("~/assets/css/typo.css") },
        { rel: "stylesheet", href: require("~/assets/css/prism-dark.css") },
        {
          rel: "stylesheet",
          href: require("~/assets/css/highlight-keyword.css"),
        },
      ],
      //  script: [
      //   {
      //   src: 'https://cdn.bootcdn.net/ajax/libs/jquery/3.3.1/jquery.min.js'
      //   },

      // ]
    };
  },
  name: "Article",
  components: {
    Appreciate,
    BlogTalkContent,
    CopyRightArticle,
    CountTo
  },
  activated() {
    document.title = this.article.name;
  },

  mounted() {
    this.$axios
      .get("/comment/" + this.article.id)
      .then((res) => {
        this.blogCommentList = res.comments;
      })
      .catch((e) => {});

    // 加载 fancy-box 插件
    $(document).ready(function () {
      $('[data-fancybox="gallery"]').fancybox({
        buttons: ["share", "close", "download", "zoom", "fullScreen", "thumbs"],
        hash: false,
      });
    });
    Prism.highlightAll();
    document.title = this.article.name;
    this.setTable();
    this.setFancyBox();
    this.initTocbot();
    // 加载 latex
    var script = document.createElement("script");
    script.src =
      "https://cdn.staticfile.org/mathjax/3.2.0/es5/tex-chtml.min.js";
    // script.src = 'https://cdn.bootcdn.net/ajax/libs/mathjax/3.2.0/es5/tex-chtml.min.js';
    script.async = true;
    document.head.appendChild(script);
    window.MathJax = {
      tex: {
        inlineMath: [
          ["$", "$"],
          ["\\(", "\\)"],
        ],
      },
      chtml: {
        scale: 0.8,
      },
    };
  },
  created() {},

  methods: {
    initTocbot() {
      tocbot.init({
        //要把目录添加元素位置，支持选择器
        tocSelector: ".toc-container",
        //获取html的元素
        contentSelector: "#articleContent",
        //要显示的id的目录
        headingSelector: "h1, h2, h3",
        hasInnerContainers: true,
        scrollSmooth: true,
        scrollSmoothDuration: 420,
        activeLinkClass: "toc-active-item",
        basePath: window.location.href,
        scrollSmooth: true,
        // Smooth scroll duration.
        scrollSmoothDuration: 420,
      });
    },
    applicationPre() {
      // return process.env.NODE_ENV === "production" ? "/blog" : "";
      return "/blog";
    },
    // 为每个table套一个div
    setTable() {
      let tables = [].slice.apply(document.getElementsByTagName("table"));
      while (tables.length > 0) {
        let tableWrapper = document.createElement("div");
        tableWrapper.setAttribute("style", "width: 100%; overflow-x: auto;");
        let parentElement = tables[0].parentElement;
        parentElement.insertBefore(tableWrapper, tables[0]);
        let table = tables[0].cloneNode(true);
        parentElement.removeChild(tables[0]);
        tables.shift();
        tableWrapper.appendChild(table);
      }
    },
    // 为每个图片设置环境 使之能够满足fancyBox插件的要求
    setFancyBox() {
      let imgNodeArray = document.querySelectorAll(".fancy-box-img");
      imgNodeArray.forEach((imgNode) => {
        let aNode = document.createElement("a");
        aNode.classList.add("fancybox-a-wrapper");
        aNode.href = imgNode.getAttribute("src");
        aNode.setAttribute("data-transition-effect", "zoom-in-out");
        aNode.setAttribute("data-animation-effect", "slide");
        aNode.setAttribute("data-fancybox", "gallery");
        aNode.setAttribute("data-capion", "这是一张图片");
        aNode.name = "img-div-fancybox";
        imgNode.parentNode.appendChild(aNode);
        aNode.appendChild(imgNode);
        aNode.style.border = "none";
      });
    },
  },
  data() {
    return {
      blogCommentList: [],
      commentFinished: false,
      replyId: -1,
      atNickname: "请输入内容",
    };
  },
  props: {
    article: {
      type: Object,
      default: () => {
        return {
          id: -1,
          name: "",
          createTime: "2021-02-09T08:57:19.000+00:00",
          category: {
            //  id: 1, name: "分类一"
          },
          views: 0,
          content: "",
          tags: [
            // { id: 1, name: "" }
          ],
        };
      },
    },
  },
};
</script>

<style scoped>
/* @import '~/assets/cssblog.css';
 @import '~/assets/css/typo.css';
 @import '~/assets/css/prism-dark.css';
 @import '~/assets/css/highlight-keyword.css'; */

.article-content >>> table {
  overflow-x: auto;
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
}

/*鼠标悬停在表格上时，表格的背景和鼠标的形状*/
.article-content >>> table tr:hover {
  background-color: #66d9ef !important;
  cursor: pointer;
}

/*表格头部*/
.article-content >>> table thead {
  font-weight: bolder;
  background-color: #a2a5a7;
}
/*even为偶数行 odd为奇数行
    设置表格的主体部分偶数行的样式
  */
.article-content >>> table tbody tr:nth-child(even) {
  background-color: rgb(241, 241, 241);
}
.article-content >>> img.rounded {
  border-radius: 10px;
}
.article-content >>> ul {
  margin-left: 0;
  padding: 5px;
}

.article-content >>> ol {
  margin-left: 0;
  padding: 8px;
}
.article-content >>> li {
  margin-left: 0;
}

.comment-card {
  margin-top: 10px;
}
.el-tag {
  margin: 2px;
  font-size: 0.8em;
}
.el-tag > a {
  text-decoration: none;
  color: #000;
}
.appreciate-wrapper {
  text-align: center;
}
.copyright-wrapper {
  padding: 14px;
  border-left: 6px solid #ccc !important;
  border-color: #2196f3 !important;
}
.article-category-a {
  text-decoration: none;
}
</style>
<style scoped lang="scss">
@import "~/assets/scss/common/common.scss";

.el-card {
  @include background_color("bold_white_tini_tini_black_color");
  @include font_color("text-color");
}
.el-tag--light {
  @include background_color("tini_gray_color");
}
.el-tag > a {
  text-decoration: none;
  @include font_color("tag_color");
}
</style>