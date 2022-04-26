<!--
 * @Author      : YaleXin
 * @Email       : me@yalexin.top
 * @LastEditors : YaleXin
-->
<template>
  <div class="my-blog">
    <to-top></to-top>
    <navigation @childClick="navigationClick"></navigation>
     <!--<main-content class="mainBody"></main-content>
 -->
    <blog-footer></blog-footer>
  </div>
</template>

<script>
import axios from 'axios'
import Navigation from "~/components/Navigation.vue";
// import MainContent from "./Main.vue";
import BlogFooter from "~/components/Footer.vue";
import ToTop from "~/components/ToTop.vue";
export default {
  name: "Blog",
  components: {
    Navigation,
    // MainContent,
    BlogFooter,
    ToTop
  },
  
  // mounted(){
  //   let innerHttp = axios;
  //   innerHttp
  //       .get("http://localhost:8080/api/blog/blogPage", {
  //         params: {
  //           pageNum: 1,
  //           pageSize: 5
  //         }
  //       })
  //       .then(res => {
  //         console.log(res.data);
  //         this.page = res.data.page;
  //       })
  //       .catch(e => {
  //         console.log(e);
  //       });
  // } ,
  // async  asyncData (ctx) {//请求
  // console.log('asyncData-----');
  // let innerHttp = ctx.$axios;
	// return  innerHttp
  //       .get("/blog/blogPage22", {
  //         params: {
  //           pageNum: 1,
  //           pageSize: 5
  //         }
  //       })
  //       .then(res => {
  //         console.log(res.data);
  //         this.page = res.data.page;
  //       })
  //       .catch(e => {
  //         console.log(e);
  //       });
  //   },

  methods: {
    navigationClick(index) {
      switch (index) {
        case "1":
          if (this.$route.path == '/home')break;
          this.$router.push("/home").catch(e => {});
          break;
        case "2":
          if (this.$route.path == '/category')break;
          this.$router.push("/category/-1").catch(e => {});
          break;
        case "3":
          if (this.$route.path == '/tag')break;
          this.$router.push("/tag/-1").catch(e => {});
          break;
        case "4":
          if (this.$route.path == '/link')break;
          this.$router.push("/link").catch(e => {});
          break;
        case "5":
          if (this.$route.path == '/talk')break;
          this.$router.push("/talk").catch(e => {});
          break;
        case "6":
          if (this.$route.path == '/archive')break;
          this.$router.push("/archive").catch(e => {});
          break;
        case "7":
          if (this.$route.path == '/search')break;
          this.$router.push("/search").catch(e => {});
          break;
        default:
          if (this.$route.path == '/home')break;
          this.$router.push("/home").catch(e => {});
      }
    },
    toHome() {},
    toCategory() {},
    toTag() {},
    toLink() {},
    toTalk() {}
  },
  created() {}
};
</script>

<style scoped>
.mainBody {
  min-height: 300px;
  overflow: auto;
}
</style>
