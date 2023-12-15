<!--
 * @Author      : YaleXin
 * @Email       : me@yalexin.top
 * @LastEditors : YaleXin
-->
<template>
  <div>
    <article-card
      class="article-card-item"
      v-for="article in articleList"
      :key="article.id"
      :article="article"
    ></article-card>
  </div>
</template>

<script>
import ArticleCard from "./ArticleCard.vue";
export default {
  name: "ArticleList",
  components: {
    ArticleCard,
  },
  props: {
    articleList: {
      type: Array,
      default: () => {
        return [
          {
            id: 0,
            name: "题目",
            description: "描述",
            createTime: "2021-02-09T08:57:19.000+00:00",
            updateTime: "2021-02-09T08:57:19.000+00:00",
            category: {
              id: 1,
              name: "category-name",
            },
            tags: [
              {
                id: 1,
                name: "tag-name",
              },
            ],
          },
        ];
      },
    },
  },
  methods: {},
};
</script>
<style scoped>
.article-card-item {
  padding-top: 5px;
  padding-bottom: 5px;
}
</style>
