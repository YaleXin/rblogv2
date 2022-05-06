<!--
 * @Author      : YaleXin
 * @Email       : me@yalexin.top
 * @LastEditors : YaleXin
-->
<template>
  <div class="my-blog">
    <to-top></to-top>
    <navigation></navigation>
    <article-content 
     :commentList="commentsData"
    :article="article" class="middle-box-card" />
    <blog-footer></blog-footer>
  </div>
</template>

<script>
import Navigation from "~/components/Navigation.vue";
import BlogFooter from "~/components/Footer.vue";
import ToTop from "~/components/ToTop.vue";
import ArticleContent from "~/components/Article.vue";
export default {
  name: "Article",
  components: {
    Navigation,
    BlogFooter,
    ToTop,
    ArticleContent
  },
  //   head() {
  //   return {
  //     link: [
  //       { rel: 'stylesheet', href: 'https://cdn.bootcdn.net/ajax/libs/fancybox/3.5.7/jquery.fancybox.min.css' },
  //     ],
  //     script: [
  //       {
  //       src: 'https://cdn.bootcdn.net/ajax/libs/jquery/3.3.1/jquery.min.js'
  //       },
        
  //       {
  //       src: 'https://cdn.bootcdn.net/ajax/libs/fancybox/3.5.7/jquery.fancybox.min.js'
  //       },
        
  //       ]
  //   };
  // },
  mounted() {
    document.title = this.article.name;
  },
    validate({ params }) {
      // 必须是number类型
      console.log("params.id---->", params.id);
      return /^\d+$/.test(params.id) && parseInt(params.id) > 0;
    },
  async asyncData(context) {
    console.log('--asyncData--');
    // 同时请求文章以及评论
    if (/^\d+$/.test(context.params.id)) {
      let [res1, res2] = await Promise.all([
        context.$axios.get("/blog/" + context.params.id),
        context.$axios.get("/comment/" + context.params.id)
      ]);
      // 防止查不到博客时前端报 undefined 错误
      let blog = {
          id: -1,
          name: "葵花宝典",
          createTime: "1970-01-01T00:00:00.000+00:00",
          category: {
            //  id: 1, name: "分类一"
          },
          views: 0,
          content: 
                      `<p>
                    <b>欲练此功，必先自宫！</b>
                </p> 
                <p>
                    <b>若然自宫，未必成功！</b>
                </p>
                <p>
                    <b>若不自宫，也能成功！</b>
                </p>
                <p>
                    <b style="color:red">少侠，你来错地方啦！这里没有你想要的武林秘籍，换个id试试看</b>
                </p>`
          ,
          tags: [
            // { id: 1, name: "" }
          ]
        }
      
      if(res1.blog != null){
          blog = res1.blog
      }
      return {
        article: blog,
        commentsData: res2.comments
      };
    }
  },
  data() {
    return {
    };
  },
};
</script>