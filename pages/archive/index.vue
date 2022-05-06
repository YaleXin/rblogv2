<!--
 * @Author      : YaleXin
 * @Email       : me@yalexin.top
 * @LastEditors : YaleXin
-->
<template>
  <div class="my-blog">
    <to-top></to-top>
    <navigation ></navigation>
    <archive :blogList="blogList" class="middle-box-card"/>
    <blog-footer></blog-footer>
  </div>
</template>

<script>
import Navigation from "~/components/Navigation.vue";
import Archive from "~/components/Archive.vue";
import BlogFooter from "~/components/Footer.vue";
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
    return context.$axios
      .get("/archive")
      .then(res => {
        console.log(res);
          return {
          blogList: res.blogs
        };
      })
      .catch(e => {});
  },
  data() {
    return {
      blogList: []
    };
  },

  methods: {
  },
  created() {}
};
</script>