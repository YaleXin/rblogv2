<!--
 * @Author      : YaleXin
 * @Email       : me@yalexin.top
 * @LastEditors : YaleXin
-->
<template>
  <div class="my-blog">
    <to-top></to-top>
    <navigation ></navigation>

    <blog-footer></blog-footer>
  </div>
</template>

<script>
import Navigation from "~/components/Navigation.vue";
import BlogFooter from "~/components/Footer.vue";
import ToTop from "~/components/ToTop.vue";

export default {
  name: "Blog",
  components: {
    Navigation,
    BlogFooter,
    ToTop,
    
  },
  mounted() {
  },

  asyncData(context) {
   
  },
  data() {
    return {
      
    };
  },

  methods: {
  },
  created() {}
};
</script>