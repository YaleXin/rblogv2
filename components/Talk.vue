<!--
 * @Author      : YaleXin
 * @Email       : me@yalexin.top
 * @LastEditors : YaleXin
-->
<template>
  <div>
    <el-divider content-position="center">
      历史留言
      <i class="el-icon-s-comment"></i>
    </el-divider>
    <comment-list :comments="commentList" @reply-click="commentReplyClick"></comment-list>
    <el-divider content-position="center">
      开始留言
      <i class="el-icon-edit"></i>
    </el-divider>
    <comment-input 
    v-if="!commentFinished" 
    @comment-submit="submitComment"
    :atNickname="atNicknameComputed"
    :parentCommentId="replyIdComputed"
    ></comment-input>
  </div>
</template>

<script>
// import innerHttp from "../network/innerHttp.js";
import CommentInput from "~/components/CommentInput.vue";
import CommentList from "~/components/CommentList.vue";
export default {
  name: "Talk",
  components: {
    // CommentInput,
    CommentList,
    CommentInput
  },
  data() {
    return {
      // commentList: [],
      commentFinished: false,
      replyId: -1,
      atNickname: "请输入内容"
    };
  },
  computed:{
    atNicknameComputed(){
      return "@" + this.atNickname
    },
    replyIdComputed(){
      return this.replyId
    }
  },
  activated() {
    document.title = "留言";
  },
  props:{
    commentList:{
      type: Array,
      default: () =>{
        return []
      }
    }
  },
  methods: {
    commentReplyClick(id, atNickname){
      this.replyId = id;
      this.atNickname = atNickname;
    },
    submitCommentSuccess() {
      this.$message({
        showClose: true,
        message: "评论成功，请耐心等待管理员审核",
        type: "success"
      });
      this.commentFinished = true;
    },
    submitCommentFail(reason) {
      this.$message({
        showClose: true,
        message: "评论失败，原因：" + reason,
        type: "error"
      });
    },
    submitComment(comment) {
      comment.blogId = 0;
      console.log('comment=', comment);
      this.$axios
        .put("/comment/add", {
          data: JSON.stringify(comment)
        })
        .then(res => {
          let result = res.result;
          if (result == 0) {
            this.submitCommentFail("不明");
          } else if (result == 1) {
            this.submitCommentSuccess();
          } else if (result == 2) {
            this.submitCommentFail("过于频繁，请一分钟后尝试");
          }
        })
        .catch(e => {});
    }
  }
};
</script>

<style scoped>
</style>
