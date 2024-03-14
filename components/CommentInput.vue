<!--
 * @Author      : YaleXin
 * @Email       : me@yalexin.top
 * @LastEditors : YaleXin
-->
<template>
  <div class="comment-input-div">
    <el-form ref="form" :model="form" :rules="rules" :inline-message="true">
      <el-form-item prop="nickname">
        <el-input
          class="comment-form-item"
          placeholder="昵称"
          :maxlength="8"
          prefix-icon="el-icon-user"
          v-model="form.nickname"
        ></el-input>
      </el-form-item>
      <el-form-item prop="email">
        <el-input
          class="comment-form-item"
          placeholder="邮箱"
          :maxlength="30"
          prefix-icon="el-icon-message"
          v-model="form.email"
        ></el-input>
      </el-form-item>
      <el-form-item prop="content">
        <el-input
          id="input-textarea"
          class="comment-form-item"
          type="textarea"
          :autosize="{ minRows: 5, maxRows: 10 }"
          :placeholder="atNickname"
          v-model="form.content"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button plain type="primary" @click="submitForm('ruleForm')"
          >立即评论</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// import { EventBus } from "~/eventBus/index.js";
import CommentUtils from "~/assets/js/CommentUtils.js";
export default {
  name: "CommentInput",
  components: {},
  data() {
    return {
      form: {
        nickname: "",
        email: "",
        content: "",
        createTime: "",
        browser: "",
        OS: "",
        blogId: -1,
        parentCommentId: -1,
      },
      rules: {
        nickname: [{ required: true, message: "请输入昵称", trigger: "blur" }],
        email: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"],
          },
        ],
        content: [
          { required: true, message: "请输入回复内容", trigger: "blur" },
        ],
      },
      // atNickname: "请输入内容"
    };
  },
  props: {
    atNickname: {
      type: String,
      default: () => {
        return "请输入内容";
      },
    },
    parentCommentId: {
      type: Number,
      default: () => {
        return 0;
      },
    },
  },
  mounted() {
    this.form.OS = CommentUtils.getOS();
    this.form.browser = CommentUtils.getBrowser();
  },
  created() {
    // EventBus.$on("replyClick", (id, nickname) => {
    //   console.log("id=" + id);
    //   this.form.parentCommentId = id;
    //   this.form.content = "";
    //   this.atNickname = "@" + nickname;
    // });
  },
  methods: {
    submitForm() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          this.form.createTime = new Date();
          this.form.parentCommentId = this.parentCommentId;
          this.$emit("comment-submit", this.form);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style scoped lang="scss">
@import "~/assets/scss/common/common.scss";
.comment-input-div {
  ::v-deep .el-input__inner,
  ::v-deep .el-textarea__inner {
    @include background_color("bold_white_tini_tini_black_color");
  }
}
</style>
