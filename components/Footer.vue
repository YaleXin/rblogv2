<!--
 * @Author      : YaleXin
 * @Email       : me@yalexin.top
 * @LastEditors : YaleXin
-->
<template>
  <div class="footer">
    <el-divider></el-divider>
    <poetry></poetry>
    <time-info></time-info>
    <copy-right></copy-right>
    <icp></icp>
  </div>
</template>

<script>
import Poetry from '~/components/Poetry.vue';
import TimeInfo from "~/components/TimeInfo.vue";
import Icp from "~/components/Icp.vue";
import CopyRight from "~/components/CopyRight.vue";
export default {
  name: "Footer",
  components: {
    Poetry,
    Icp,
    TimeInfo,
    CopyRight
  },
  created() {}
};
</script>

<style scoped>
.footer {
  text-align: center;
  
}
</style>

