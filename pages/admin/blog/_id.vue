<!--
 * @Author      : YaleXin
 * @Email       : me@yalexin.top
 * @LastEditors : YaleXin
-->
<!--
 * @Author      : YaleXin
 * @Email       : me@yalexin.top
 * @LastEditors : YaleXin
-->
<template>
<!-- <div>dd</div> -->
  <admin-article/>
</template>

<script>
import AdminArticle from "~/components/admin/AdminArticle.vue";


export default {
  name: "AdminBlogInput",
  components: {
    AdminArticle
  },
  

  asyncData(context) {
  },
  data() {
    return {};
  },
  validate({ params }) {
    // 必须是number类型
    return /^\d+$/.test(params.id) || params.id == "-1";
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