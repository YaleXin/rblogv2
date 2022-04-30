<!--
 * @Author      : YaleXin
 * @Email       : me@yalexin.top
 * @LastEditors : YaleXin
-->
<template>
  <div >
    <span>
      {{nickname}}少侠，别来无恙！
    </span>
  </div>
</template>

<script>


export default {
  name: "AdminIndex",
  components: {
    
  },
  asyncData(context) {

  },
  data() {
    return {
    };
  },
  mounted(){
    // 请求后端session
    this.$axios.get("/admin/user/info")
        .then(res => {
          console.log('userres');
        })
        .catch(e => {

        });
  },
  computed: {
    nickname() {
      // return ''
      return this.$store.state.user.user.nickname; 
    }
  },
  methods: {},
  created() {}
};
</script>
<style scoped>

</style>