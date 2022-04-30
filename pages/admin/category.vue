<!--
 * @Author      : YaleXin
 * @Email       : me@yalexin.top
 * @LastEditors : YaleXin
-->
<template>
<!-- <div></div> -->
  <admin-category/>
</template>

<script>

import AdminCategory from "~/components/admin/Category.vue";


export default {
  name: "AdminAllCategory",
  components: {
    AdminCategory
  },
  

  asyncData(context) {
    
  },
  data() {
    return {};
  },
  methods: {},
  mounted() {
  },
  created(){
  },
};
</script>
<style scoped>

</style>