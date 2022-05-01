<!--
 * @Author      : YaleXin
 * @Email       : me@yalexin.top
 * @LastEditors : YaleXin
-->
<template>
  <div id="#article-content">
    <el-card>
      <div class="article-title-wrapper" style="text-align: center;">
        <h1 class="article-title">{{article.name}}</h1>
        <div class="article-detail">
          <i class="fa fa-calendar"></i>
          <font-awesome-icon :icon="['fa', 'calendar']" />
          <span style="margin-left:2px; font-size: 14px;">{{article.createTime}}</span>
          <el-divider direction="vertical"></el-divider>
          <font-awesome-icon :icon="['fa', 'eye']" />
          <span style="margin-left:2px; font-size: 14px;">{{article.views}}</span>
          <el-divider direction="vertical"></el-divider>
          <font-awesome-icon :icon="['fa', 'bookmark']" />
          <nuxt-link class="article-category-a" :to="{path: '/category/' + article.category.id}">
            <span style="margin-left:2px; font-size: 14px;">{{article.category.name}}</span>
          </nuxt-link>
        </div>
      </div>
      <el-divider></el-divider>
      <!-- 目录div -->
      <el-popover placement="right" trigger="hover" popper-class="toc-popper">
        <div class="toc-container"></div>
        <div slot="reference" class="toc-wrapper animate__animated animate__backInLeft">目录</div>
      </el-popover>

      <div id="articleContent" class="article-content typo" v-html="article.content">
        <!-- v-html="article.content" -->
      </div>
      <el-divider></el-divider>
      <div class="tag-group">
        <el-tag v-for="tag in article.tags" :key="tag.id">
          <nuxt-link :to="{path: '/tag/' + tag.id}">
            <font-awesome-icon :icon="['fa', 'tag']" />
            <span>{{tag.name}}</span>
          </nuxt-link>
        </el-tag>
      </div>
      <div class="appreciate-wrapper">
        <appreciate></appreciate>
      </div>
      <!-- 评论 -->
      <!-- <el-divider>下面是评论</el-divider>
      <comment 
    class="middle-box-card"
    :commentList="commentList"
    /> -->
    </el-card>
  </div>
</template>

<script>

import Appreciate from "~/components/Appreciate.vue";
import Prism from "prismjs";
import tocbot from "tocbot";
import Comment from "~/components/Comment.vue";
export default {
  head() {
    return {
      link: [
     ],
    };
  },
  name: "Article",
  components: {
    // Comment,
    Appreciate,
    Comment
  },
  activated() {
    document.title = this.article.name;
  },

  mounted() {
    // 加载 fancy-box 插件
    // $(document).ready(function() {
      // $('[data-fancybox="gallery"]').fancybox({
      //   buttons: ["share", "close", "download", "zoom",'fullScreen','thumbs'],
      //   hash: false
      // });
    // });
    Prism.highlightAll();
    document.title = this.article.name;
    this.setTable();
    this.setFancyBox();
    this.initTocbot();
          $('[data-fancybox="gallery"]').fancybox({
        buttons: ["share", "close", "download", "zoom",'fullScreen','thumbs'],
        hash: false
      });
      tocbot.refresh();
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
        activeLinkClass: "toc-active-item"
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
      imgNodeArray.forEach(imgNode => {
        let aNode = document.createElement("a");
        aNode.href = imgNode.getAttribute("src");
        aNode.setAttribute("data-transition-effect", "zoom-in-out");
        aNode.setAttribute("data-animation-effect", "slide");
        aNode.setAttribute("data-fancybox", "gallery");
        aNode.setAttribute("data-capion", "这是一张图片");
        aNode.name = 'img-div-fancybox';
        imgNode.parentNode.appendChild(aNode);
        aNode.appendChild(imgNode);
        aNode.style.border = "none";
      });
    },
    
  },
  data() {
    return {
      commentFinished: false,
      replyId: -1,
      atNickname: "请输入内容"
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
          ]
        };
      }
    },
    commentList: {
      type: Array,
      default: () => {
        return [];
      }
    }
  }
};
</script>

<style scoped>
 @import '~/assets/css/blog.css';
 @import '~/assets/css/typo.css';
 @import '~/assets/css/prism-dark.css';
 @import '~/assets/css/highlight-keyword.css';

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
.article-category-a{
  text-decoration:none
}
</style>
