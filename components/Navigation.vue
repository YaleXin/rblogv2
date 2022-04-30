<!--
 * @Author      : YaleXin
 * @Email       : me@yalexin.top
 * @LastEditors : YaleXin
-->
<template>
  <div>
    <mb-navigation @mbClick="choose" v-if="isMobie"></mb-navigation>
    <pc-navigation  v-else></pc-navigation>
  </div>
</template>

<script>
import MbNavigation from "~/components/MbNavigation.vue";
import PcNavigation from "~/components/PcNavigation.vue";

export default {
  components: {
    MbNavigation,
    PcNavigation
  },
  data() {
    return {
      isMobie: true
    };
  },
  mounted() {
      const wd = document.body.clientWidth;
      console.log('wd = ', wd);
      if (wd >= 700) this.isMobie = false;
  },
  methods: {
    choose(index) {
      this.navigationClick(index);
    },
    navigationClick(index) {
      switch (index) {
        case "1":
          if (this.$route.path == "/home") break;
          this.$router.replace("/home").catch(e => {});
          break;
        case "2":
          if (this.$route.path == "/category") break;
          this.$router.replace("/category/-1").catch(e => {});
          break;
        case "3":
          if (this.$route.path == "/tag") break;
          this.$router.replace("/tag/-1").catch(e => {});
          break;
        case "4":
          if (this.$route.path == "/link") break;
          this.$router.replace("/link").catch(e => {});
          break;
        case "5":
          if (this.$route.path == "/talk") break;
          this.$router.replace("/talk").catch(e => {});
          break;
        case "6":
          if (this.$route.path == "/archive") break;
          this.$router.replace("/archive").catch(e => {});
          break;
        case "7":
          if (this.$route.path == "/search") break;
          this.$router.replace("/search").catch(e => {});
          break;
        default:
          if (this.$route.path == "/home") break;
          this.$router.replace("/home").catch(e => {});
      }
    }
  }
};
</script>

<style scoped>
</style>
