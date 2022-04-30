<!--
 * @Author      : YaleXin
 * @Email       : me@yalexin.top
 * @LastEditors : YaleXin
-->
<template>
  <div class="my-blog">
    <div id="admin-div">
      <el-row :gutter="20">
        <el-col :span="3">
          <navigation></navigation>
        </el-col>
        <el-col :span="21" class="content">
          <div class="admin-right-content">
            <nuxt-child/>
          </div>
        </el-col>
      </el-row>
    </div>

    <blog-footer></blog-footer>
  </div>
</template>

<script>
import Navigation from "~/components/admin/AdminNavigation.vue";

import BlogFooter from "~/components/Footer.vue";

export default {
  name: "AdminIndex",
  components: {
    Navigation,
    BlogFooter
  },
  mounted() {},

  asyncData(context) {
    
  },
  data() {
    return {};
  },
  methods: {},
  created() {}
};
</script>
<style scoped>
.admin-right-content{
    margin-top: 20px;
}
</style>