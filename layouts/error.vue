<!--
 * @Author      : YaleXin
 * @Email       : me@yalexin.top
 * @LastEditors : YaleXin
-->
<template>
  <div class="my-blog">
    <to-top></to-top>
    <navigation></navigation>
    <el-card class="mainBody middle-box-card">
      <div class="not-found">这里没有你想要的武林秘籍！</div>
      <div class="nvgt">
          <p>请选择：</p>
        <nuxt-link :to="{name: 'home'}">首页</nuxt-link>
        <nuxt-link :to="{path: '/category/-1'}">分类</nuxt-link>
        <nuxt-link :to="{path: '/tag/-1'}">标签</nuxt-link>
        <nuxt-link :to="{name: 'link'}">友链</nuxt-link>
        <nuxt-link :to="{name: 'talk'}">最近的吐槽</nuxt-link>
        <nuxt-link :to="{name: 'archive'}">归档</nuxt-link>
      </div>
    </el-card>
    <blog-footer></blog-footer>
  </div>
</template>

<script>
import Navigation from "~/components/Navigation.vue";
import BlogFooter from "~/components/Footer.vue";
import ToTop from "~/components/ToTop.vue";

export default {
  name: "Blog",
  components: {
    Navigation,
    BlogFooter,
    ToTop
  },
  mounted() {
    this.$toast.error("少侠，你来错地方了！");
  },

  data() {
    return {};
  },

  methods: {},
  created() {}
};
</script>
<style scoped>
.not-found {
  text-align: center;
  font-size: 2em;
  color: red;
}
.nvgt{
    text-align: center
}
</style>
<style scoped lang="scss">
@import '~/assets/scss/common/common.scss';

.el-card{
  @include background_color("bold_white_tini_tini_black_color");
  @include font_color("text-color");
}
</style>