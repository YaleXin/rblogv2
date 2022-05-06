<!--
 * @Author      : YaleXin
 * @Email       : me@yalexin.top
 * @LastEditors : YaleXin
-->
<template>
  <div class="my-blog">
    <to-top></to-top>
    <navigation ></navigation>
    <middle-link :linkList="linkList" class="middle-box-card" />
    <blog-footer></blog-footer>
  </div>
</template>

<script>
import Navigation from "~/components/Navigation.vue";
import BlogFooter from "~/components/Footer.vue";
import ToTop from "~/components/ToTop.vue";
import MiddleLink from "~/components/Link.vue"; 

export default {
  name: "Blog",
  components: {
    Navigation,
    BlogFooter,
    ToTop,
    MiddleLink
  },
  mounted() {
  },
head() {
    return {
      title: '友链-黄阿信的博客'
    }
  },
  asyncData(context) {
    return context.$axios
      .get("/link")
      .then(res => {
        return {
          linkList: res.links
        };
      });
  },
  data() {
    return {
      linkList: [
        {
          id: 1,
          type: "博客链接",
          content: [
            {
              id: 1,
              name: "黄阿信的博客",
              description: "要么改变世界，要么适应世界",
              url: "www.yalexin.com",
              avatar: "https://www.yalexin.top/images/cat_mouse.jpg"
            },
            {
              id: 2,
              name: "黄阿信的hexo博客",
              description: "要么改变世界，要么适应世界",
              url: "https://yalexin.gitee.io/",
              avatar: "https://qiniu.yalexin.top/home.png"
            }
          ]
        }
      ]
    };
  },

  methods: {
  },
  created() {}
};
</script>