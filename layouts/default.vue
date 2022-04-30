<!--
 * @Author      : YaleXin
 * @Email       : me@yalexin.top
 * @LastEditors : YaleXin
-->
<template>
    <div>
      <!-- 给搜索引擎看的 -->
        <div hidden>
          <ui>
            <li><a href="home">首页</a></li>
            <li><a href="category/-1">分类</a></li>
            <li><a href="tag/-1">标签</a></li>
            <li><a href="talk">吐槽</a></li>
            <li><a href="link">友链</a></li>
            <li><a href="archive">归档</a></li>
          </ui>
        </div>
        <!-- Nuxt app 正文 -->
        <nuxt/>
    </div>
</template>

<style >
body{
    margin: 0px;
}
.mainBody {
  min-height: 300px;
  /* overflow: auto; */
}
.middle-box-card {
  max-width: 85%;
  margin: 0 auto;
  padding-top: 10px;
}
</style>