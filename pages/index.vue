<!--
 * @Author      : YaleXin
 * @Email       : me@yalexin.top
 * @LastEditors : YaleXin
-->
<script>
export default {
  middleware({ store, route, redirect, params, query, req, res }) {
    redirect('/home') // 默认跳转页面的路由
  },
}
</script>
