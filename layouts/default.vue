<!--
 * @Author      : YaleXin
 * @Email       : me@yalexin.top
 * @LastEditors : YaleXin
-->
<template>
  <div id="DarkModelPage">
    <div hidden>
      <ul>
        <li><a href="home">首页</a></li>
        <li><a href="category/-1">分类</a></li>
        <li><a href="tag/-1">标签</a></li>
        <li><a href="talk">吐槽</a></li>
        <li><a href="link">友链</a></li>
        <li><a href="archive">归档</a></li>
      </ul>
    </div>
    <div class="theme-change" @click="modelBrn">
      <font-awesome-icon :icon="icon" />
    </div>
    <!-- Nuxt app 正文 -->
    <nuxt />
  </div>
</template>
<script>
export default {
  data() {
    return {
      icon: ["fa", "moon"],
      dark: false,
    };
  },
  mounted() {
    if (sessionStorage.getItem("theme") === null) {
      let themeName = this.getNowTheme();
      this.icon = ["fa", themeName == "light" ? "moon" : "sun"];
      sessionStorage.setItem("theme", themeName);
      window.document.documentElement.setAttribute("data-theme", themeName);
    } else {
      let themeName = sessionStorage.getItem("theme");
      this.icon = ["fa", themeName == "light" ? "moon" : "sun"];
      window.document.documentElement.setAttribute("data-theme", themeName);
    }
  },
  methods: {
    getNowTheme() {
      let nowdate = new Date();
      let h = nowdate.getHours();
      if (h >= 7 && h < 18) return "light";
      else return "dark";
    },
    modelBrn() {
      if (this.icon[1] == "sun") {
        this.icon = ["fa", "moon"];
      } else {
        this.icon = ["fa", "sun"];
      }
      if (this.icon[1] == "sun") {
        console.log("change to dark");
        sessionStorage.setItem("theme", "dark");
        window.document.documentElement.setAttribute("data-theme", "dark");
      } else {
        console.log("change to light");
        sessionStorage.setItem("theme", "light");
        window.document.documentElement.setAttribute("data-theme", "light");
      }
    },
  },
};
</script>
<style >
body {
  margin: 0px;
}
.mainBody {
  min-height: 300px;
  /* overflow: auto; */
}
.middle-box-card {
  max-width: 85%;
  margin: 0 auto;
  padding-top: 10px;
}
.theme-change {
  left: 20px;
  bottom: 30px;
  align-items: center;
  position: fixed;
  color: #409eff;
  width: auto;
  height: auto;
  border-radius: 50%;
  display: flex;
  font-size: 20px;
  box-shadow: 0 0 6px rgb(0 0 0 / 12%);
  cursor: pointer;
  z-index: 5;
}
</style>
<style scoped lang="scss">
@import "~/assets/scss/common/common.scss";

#DarkModelPage {
  @include background_color("bold_white_tini_black_color");
  @include font_color("text-color");
  transition: background 1s, color 0.6s;
}

</style>
<style  lang="scss">
@import "~/assets/scss/common/common.scss";
// 所有的分页组件 颜色设置
.el-pagination.is-background>button{
  @include background_color("tini_gray_color")
}
.el-pagination.is-background .el-pager li{
  @include background_color("tini_gray_color")
}
.el-pagination.is-background .el-pager li:not(.disabled).active {
  @include background_color("special_blue_color")
}

// 所有分割线文字背景
.el-divider__text {
  @include background_color("bold_white_tini_black_color");
  @include font_color("text-color");
}
</style>
