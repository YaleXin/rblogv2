<!--
 * @Author      : YaleXin
 * @Email       : me@yalexin.top
 * @LastEditors : YaleXin
-->
<template>
  <div class="my-blog">
    <to-top></to-top>
    <navigation ></navigation>
    <talk-content 
    class="middle-box-card"
    :commentList="commentList"
    :blogId="0"
    :textUp="'历史留言'"
    :textDown="'开始留言'"
    />
    <blog-footer></blog-footer>
  </div>
</template>

<script>
import Navigation from "~/components/Navigation.vue";
import TalkContent from "~/components/Talk.vue";
import BlogFooter from "~/components/Footer.vue";
import ToTop from "~/components/ToTop.vue";
export default {
  name: "Talk",
  components: {
    Navigation,
    BlogFooter,
    ToTop,
    TalkContent
  },
  mounted() {
  },
  head() {
    return {
      title: '留言-黄阿信的博客'
    }
  },
  asyncData(context) {
    return context.$axios
      .get("/comment/0")
      .then(res => {
        return {
          commentList: res.comments
        };
      });
  },
  data() {
    return {
      commentList: []
    }
  },
  methods: {
    
  },
  created() {}
};
</script>