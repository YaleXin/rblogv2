<!--
 * @Author      : YaleXin
 * @Email       : me@yalexin.top
 * @LastEditors : YaleXin
-->
<template>
  <div>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      background-color="#545c64"
      active-text-color="#ffd04b"
      text-color="#fff"
      :router="true"
    >
      <el-menu-item index="/home">
        <nuxt-link class="navigation-item-a" :to="{path: '/home'}">
          <i class="el-icon-home"></i>首页
        </nuxt-link>
      </el-menu-item>
      <el-menu-item index="/category/-1">
        <nuxt-link class="navigation-item-a" :to="{path: '/category/-1'}">
          <i class="el-icon-collection-tag"></i>分类
        </nuxt-link>
      </el-menu-item>
      <el-menu-item index="/tag/-1">
        <nuxt-link class="navigation-item-a" :to="{path: '/tag/-1'}">
          <i class="el-icon-price-tag"></i>标签
        </nuxt-link>
      </el-menu-item>
      <el-menu-item index="/link">
        <nuxt-link class="navigation-item-a" :to="{path: '/link'}">
          <i class="el-icon-link"></i>友链
        </nuxt-link>
      </el-menu-item>
      <el-menu-item index="/talk">
        <nuxt-link class="navigation-item-a" :to="{path: '/talk'}">
          <i class="el-icon-mic"></i>最近的吐槽
        </nuxt-link>
      </el-menu-item>

      <el-menu-item index="/archive">
        <nuxt-link class="navigation-item-a" :to="{path: '/archive'}">
          <i class="el-icon-data-line"></i>归档
        </nuxt-link>
        
      </el-menu-item>

      <el-menu-item index="/search">
        <div>
          <el-form :inline="true" :model="searchForm">
            <el-input
              placeholder="搜一搜？按下回车即可搜索"
              prefix-icon="el-icon-search"
              @keyup.native.enter="onSubmit"
              v-model="searchForm.content"
            ></el-input>
          </el-form>
        </div>
      </el-menu-item>
      <el-menu-item index="/home">要么改变世界，要么适应世界</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import { EventBus } from "~/eventBus/index.js";
export default {
  name: "PcNavigation",
  components: {},
  data() {
    return {
      searchForm: {
        content: ""
      }
    };
  },
  methods: {
    onSubmit() {
      EventBus.$emit("searchSubmit", this.searchForm.content);
    },
    getRout() {
      const routePath = this.$route.path;
      console.log(routePath);
    }
  },
  created() {},
  mounted() {},
  computed: {
    activeIndex: function() {
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
    }
  }
};
</script>

<style scoped>
.navigation-item-a{
  text-decoration:none
}
.el-menu-item{
  font-size: 16px;
}
</style>
