<!--
 * @Author      : YaleXin
 * @Email       : me@yalexin.top
 * @LastEditors : YaleXin
-->
<template>
  <div class="my-blog">
    <to-top></to-top>
    <navigation ></navigation>
    <no-ssr>
      <mavon-editor :toolbars="markdownOption" v-model="handbook"/>
    </no-ssr>
    <el-button @click="clk"></el-button>
    <blog-footer></blog-footer>
  </div>
</template>

<script>
import Navigation from "~/components/Navigation.vue";
// import Markdown from "vue-meditor";
import BlogFooter from "~/components/Footer.vue";
import ToTop from "~/components/ToTop.vue";
export default {
  name: "Talk",
  components: {
    Navigation,
    BlogFooter,
    ToTop,
    // Markdown
  },
  mounted() {
  },
  head() {
    return {
      title: '留言-黄阿信的博客'
    }
  },
  asyncData(context) {
    
  },
  data() {
    return {
      markdownOption: {
      },
      handbook: "#### how to use mavonEditor in nuxt.js"
    }
  },
  methods: {
    clk(){
      console.log(this.handbook);
    }
  },
  created() {}
};
</script>