<!--
 * @Author      : YaleXin
 * @Email       : me@yalexin.top
 * @LastEditors : YaleXin
-->
<template>
  <div   >
    <article-card class="article-card-item" v-for="article in articleList" :key="article.id" :article="article"></article-card>
  </div>
</template>

<script>
import ArticleCard from "./ArticleCard.vue";
export default {
  name: "ArticleList",
  components: {
    ArticleCard
  },
  props: {
    articleList: {
      type: Array,
      default: () => {
        return [{ id: 0, name: "题目", description: "描述" }];
      }
    }
  },
  methods: {
    
  }
};
</script>
<style scoped>
.article-card-item{
  padding-top: 5px;
  padding-bottom: 5px;
}

</style>
