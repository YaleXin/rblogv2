<!--
 * @Author      : YaleXin
 * @Email       : me@yalexin.top
 * @LastEditors : YaleXin
-->
<template>
  <div>
    <font-awesome-icon :icon="['far', 'copyright']"/>
    <span>2020 -</span>
    <span v-text="nowYear">2020</span>
    <span>
       by Yalexin
    </span>
  </div>
</template>

<script>
export default {
  name: "CopyRight",
  components: {},
  data() {
    return {
      nowYear: 2020
    };
  },
  created() {
    const now = new Date();
    this.nowYear = now.getFullYear();
  }
};
</script>

<style scoped>
</style>
