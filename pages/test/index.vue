<template>
  <div id="DarkModelPage">
    <div>
      <h1 class="title">天小天个人网</h1>
      <a class="btn" @click="modelBrn">模式切换</a>
    </div>
  </div>
</template>
 
<script>
export default {
  name: "DarkModelPage",
  data(){
    return {
     dark:false,
    }
  },
  methods:{
    modelBrn(){
      this.dark = !this.dark;
      if(this.dark){
        window.document.documentElement.setAttribute( "data-theme", 'dark' );
      }else{
         window.document.documentElement.setAttribute( "data-theme", 'light' );
      }
    },
  },
  mounted() {
    window.document.documentElement.setAttribute( "data-theme", 'light' );
  },
}
</script>
 
<style scoped lang="scss">
@import '~/assets/scss/common/common.scss';
 
#DarkModelPage{

  @include background_color("background_color");

  @include font_color("text-color");
 
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content:center;
  align-items: center;
  transition: background 1s , color 0.6s;
  .title{
    margin-bottom: 20px;
  }
  .btn{
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100px;
    height: 40px;
    margin: 0 auto;
  }
}
</style>