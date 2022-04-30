<!--
 * @Author      : YaleXin
 * @Email       : me@yalexin.top
 * @LastEditors : YaleXin
-->
<template>
  <user/>
</template>

<script>

import User from "~/components/admin/User.vue";


export default {
  name: "AdminLogin",
  components: {
    User
  },
  

  asyncData(context) {
  },
  data() {
    return {};
  },
  methods: {},
  mounted() {
    if (this.$store.state.user.user.id <= 0){
      // 本地没有登录信息
        // 请求后端session
      this.$axios.get("/admin/user/info")
        .then(res => {
          console.log('User.vue res = ', res);
        })
        .catch(e => {

        });
    }
    console.log('已登陆');
    
  },
  created(){
  },
};
</script>
<style scoped>

</style>