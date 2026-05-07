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
          <navigation v-show="showNavigation"></navigation>
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
import { EventBus } from '@/eventBus/index.js';

import BlogFooter from "~/components/footer/Footer.vue";

export default {
  name: "AdminIndex",
  components: {
    Navigation,
    BlogFooter
  },
  mounted() {
    EventBus.$on('loginSuccess', (data) => {
      this.showNavigation = true;
    });

    EventBus.$on('logoutSuccess', (data) => {
      this.showNavigation = false;
    });
  },
  beforeDestroy() {
    EventBus.$off('loginSuccess'); // 移除监听，避免内存泄漏
    EventBus.$off('logoutSuccess');
  },
  asyncData(context) {
    
  },
  data() {
    return {
      showNavigation: false
    };
  },
  methods: {},
  created() {
    console.log('当前路径:', this.$route.path); 
    if(this.$route.path!='/admin/login'){
        // 请求后端session
      this.$axios.get("/admin/user/info")
          .then(res => {
            this.showNavigation = true;
          })
          .catch(e => {

          });
    }
      
  }
};
</script>
<style scoped>
.admin-right-content{
    margin-top: 20px;
}
#admin-div{
  margin-bottom: 80px;
  min-height: 300px;
}
</style>