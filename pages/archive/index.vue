<!--
 * @Author      : YaleXin
 * @Email       : me@yalexin.top
 * @LastEditors : YaleXin
-->
<template>
  <div class="my-blog">
    <to-top></to-top>
    <navigation ></navigation>
    <archive :blogList="blogList"/>
    <blog-footer></blog-footer>
  </div>
</template>

<script>
import axios from "axios";
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