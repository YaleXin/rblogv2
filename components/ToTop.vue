<!--
 * @Author      : YaleXin
 * @Email       : me@yalexin.top
 * @LastEditors : YaleXin
-->
<template>
  <el-backtop
    :bottom="60"
    :right="20"
    class="animate__animated animate__backInRight "
  >
  <font-awesome-icon :icon="['fas', 'sort-up']"/>
    <i class="fa fa-angle-double-up"></i>
  </el-backtop>
</template>

<script>
export default {
  name: "ToTop",
  components: {},
  mounted() {
    
  },
};
</script>

<style scoped>
</style>
