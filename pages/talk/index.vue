<!--
 * @Author      : YaleXin
 * @Email       : me@yalexin.top
 * @LastEditors : YaleXin
-->
<template>
  <div class="my-blog">
    <to-top></to-top>
    <navigation ></navigation>
    <talk-content 
    class="middle-box-card"
    :commentList="commentList"
    />
    <blog-footer></blog-footer>
  </div>
</template>

<script>
import axios from "axios";
import Navigation from "~/components/Navigation.vue";
import TalkContent from "~/components/Talk.vue";
import BlogFooter from "~/components/Footer.vue";
import ToTop from "~/components/ToTop.vue";
export default {
  name: "Talk",
  components: {
    Navigation,
    BlogFooter,
    ToTop,
    TalkContent
  },
  mounted() {
  },

  asyncData(context) {
    return context.$axios
      .get("/comment/0")
      .then(res => {
        return {
          commentList: res.comments
        };
      });
  },
  data() {
    return {
      commentList: []
    }
  },
  methods: {
    
  },
  created() {}
};
</script>