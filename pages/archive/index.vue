<!--
 * @Author      : YaleXin
 * @Email       : me@yalexin.top
 * @LastEditors : YaleXin
-->
<template>
  <div class="my-blog">
    <to-top></to-top>
    <navigation ></navigation>
    <archive :initBlogList="initBlogList" class="middle-box-card"/>
    <blog-footer></blog-footer>
  </div>
</template>

<script>
import Navigation from "~/components/navigation/Navigation.vue";
import Archive from "~/components/archive/Archive.vue";
import BlogFooter from "~/components/footer/Footer.vue";
import ToTop from "~/components/ToTop.vue";

export default {
  name: "Blog",
  components: {
    Navigation,
    BlogFooter,
    ToTop,
    Archive
  },
  mounted() {
  },
  head() {
    return {
      title: '归档-黄阿信的博客'
    }
  },
  asyncData(context) {
    // 当前年份
    let year = new Date().getFullYear();  
    return context.$axios
      .post("/archive", {
        data: year
      })
      .then(res => {
        console.log(res);
          return {
          initBlogList: res.blogs
        };
      })
      .catch(e => {});
  },
  data() {
    return {
      initBlogList: []
    };
  },

  methods: {
  },
  created() {}
};
</script>