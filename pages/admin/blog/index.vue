<!--
 * @Author      : YaleXin
 * @Email       : me@yalexin.top
 * @LastEditors : YaleXin
-->
<template>
  <blog-list/>
</template>

<script>
import BlogList from "~/components/admin/BlogList.vue";


export default {
  name: "AdminBlog",
  components: {
    BlogList
  },
  

  asyncData(context) {
  },
  data() {
    return {};
  },
  methods: {},
  mounted() {
    // if (this.$store.state.user.user.id <= 0){
    //   // 本地没有登录信息
    //     // 请求后端session
    //   this.$axios.get("/admin/user/info")
    //     .then(res => {
    //       console.log('User.vue res = ', res);
    //     })
    //     .catch(e => {

    //     });
    // }
    
  },
  created(){
  },
};
</script>
<style scoped>

</style>