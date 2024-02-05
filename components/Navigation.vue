<!--
 * @Author      : YaleXin
 * @Email       : me@yalexin.top
 * @LastEditors : YaleXin
-->
<template>
  <div>
    <mb-navigation  v-if="isMobie"></mb-navigation>
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
    
  }
};
</script>

<style scoped>
</style>
