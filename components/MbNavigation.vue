<!--
 * @Author      : YaleXin
 * @Email       : me@yalexin.top
 * @LastEditors : YaleXin
-->
<template>
  <div class="mb-navigation">
    <div class="nvg-top">
      <el-row type="flex" justify="center">
        <el-col :span="2">
          <div class="icon-div">
            <font-awesome-icon
              @click="showNvg = true"
              size="lg"
              :icon="['fa', 'bars']"
            />
          </div>
        </el-col>
        <el-col class="motto-wrapper" :span="22">
          <div class="motto">要么改变世界，要么适应世界</div>
        </el-col>
      </el-row>
    </div>

    <el-drawer :visible.sync="showNvg" direction="ltr" size="70%">
      <el-row type="flex" justify="center">
        <el-col :span="10">
          <img
            class="site-author-image"
            src="//cdn.yalexin.top/favicon.png"
            width="90px"
            height="90px"
            style="border-radius: 50%"
            alt=""
          />
        </el-col>
      </el-row>

      <el-row :span="10">
        <el-col>
          <el-menu
            :router="true"
            :default-active="activeIndex"
            @select="handleSelect"
          >
            <el-menu-item index="/home">
              <template slot="title">
                <i class="el-icon-s-home"></i>
                <span>首页</span>
              </template>
            </el-menu-item>

            <el-menu-item index="/category/-1">
              <template slot="title">
                <i class="el-icon-collection-tag"></i>
                <span>分类</span>
              </template>
            </el-menu-item>

            <el-menu-item index="/tag/-1">
              <template slot="title">
                <i class="el-icon-price-tag"></i>
                <span>标签</span>
              </template>
            </el-menu-item>

            <el-menu-item index="/link">
              <template slot="title">
                <i class="el-icon-link"></i>
                <span>友链</span>
              </template>
            </el-menu-item>

            <el-menu-item index="/talk">
              <template slot="title">
                <i class="el-icon-mic"></i>
                <span>留言</span>
              </template>
            </el-menu-item>

            <el-menu-item index="/archive">
              <template slot="title">
                <i class="el-icon-data-line"></i>
                <span>归档</span>
              </template>
            </el-menu-item>

            <el-menu-item index="/search">
              <template slot="title">
                <i class="el-icon-search"></i>
                <span>搜索</span>
              </template>
            </el-menu-item>
          </el-menu>
        </el-col>
      </el-row>
    </el-drawer>
  </div>
</template>

<script>
import { EventBus } from "../eventBus/index.js";
export default {
  name: "MbNavigation",
  components: {},
  data() {
    return {
      showNvg: false,
      searchForm: {
        content: "",
      },
    };
  },
  computed: {
    activeIndex: function () {
      const routePath = this.$route.path;
      let activeIndex = "/home";
      if (routePath.indexOf("/category/") > -1) {
        activeIndex = "/category/-1";
      } else if (routePath.indexOf("/tag/") > -1) {
        activeIndex = "/tag/-1";
      } else {
        activeIndex = routePath;
      }
      return activeIndex;
    },
  },
  methods: {
    handleSelect(key, keyPath) {
      if (key !== "/search") this.showNvg = false;
      // this.$emit("mbClick", key);
    },
  },
};
</script>

<style scoped>
.nvg-top {
  background-color: #555;
  width: 100% !important;
  height: 50px;
}
.icon-div {
  padding-top: 50%;
  padding-bottom: 50%;
  padding-left: 5px;
  color: white;
}
.motto-wrapper {
  color: white;
  height: 50px;
  line-height: 50px;
  text-align: center;
}
.site-author-image {
  border: 1px solid #eee;
  display: block;
  margin: 0 auto;
  max-width: 120px;
  padding: 2px;
  border-radius: 50%;
}
.site-author-image {
  transition: transform 1s cubic-bezier(0.96, -0.61, 0.58, 1);
}
.site-author-image:hover {
  transform: rotateZ(360deg);
}
</style>
<style scoped lang="scss">
@import "~/assets/scss/common/common.scss";
.mb-navigation {
  ::v-deep .el-drawer,
  ::v-deep .el-menu {
    @include background_color("bold_white_tini_black_color");
    @include font_color("text-color");
  }

  ::v-deep .el-menu-item:not(.is-active){
    @include font_color("text-color");
  }

  ::v-deep .el-input__inner{
    @include background_color("bold_white_color");
  }

}
</style>