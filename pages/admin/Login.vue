<!--
 * @Author      : YaleXin
 * @Email       : me@yalexin.top
 * @LastEditors : YaleXin
-->
<template>
  <login/>
</template>

<script>

import Login from "~/components/admin/Login.vue";


export default {
  name: "AdminLogin",
  components: {
    Login
  },
  

  asyncData(context) {
    console.log('login asyncData ');
  },
  data() {
    return {};
  },
  methods: {},
  mounted() {
    console.log('admin---index---mouted');
    this.$message({
					showClose: true,
					message: '少侠，报上名来！',
					type: "error"
				});
  },
  created(){
  },
};
</script>
<style scoped>

</style>