<!--
 * @Author      : YaleXin
 * @Email       : me@yalexin.top
 * @LastEditors : YaleXin
-->
<template>
  <div>
    <!-- <span  v-html="poetryContent">
    </span> -->
    <span id="jinrishici-sentence">正在加载今日诗词....</span>
    <script src="https://sdk.jinrishici.com/v2/browser/jinrishici.js" charset="utf-8"></script>
  </div>
</template>

<script>

import jinriHttp from "~/network/jinriHttp.js";
export default {
  name: "Poetry",
  components: {},
  data() {
    return {
      poetryContent: "&nbsp;"
    };
  },
  created() {
    // jinriHttp({
    //   url: "/all.json"
    // })
    //   .then(rep => {
    //     this.poetryContent = rep.data.content
    //   })
    //   .catch(e => {});
  }
};
</script>

<style scoped>
</style>
