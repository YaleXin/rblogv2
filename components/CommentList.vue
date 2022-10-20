<!--
 * @Author      : YaleXin
 * @Email       : me@yalexin.top
 * @LastEditors : YaleXin
-->
<template>
  <div>
    <div v-for="topCmt in comments" :key="topCmt.id" class="comment-reply-item">
      <!-- 顶楼贴 -->
      <el-row>
        <table class="comment-table">
          <tr>
            <td rowspan="2">
              <img class="commment-gravater" :src="gravaterImg(topCmt.email)" />
            </td>
            <td>
              <span v-if="topCmt.adminComment" class="comment-author-tag">
                <font-awesome-icon :icon="['fa', 'flag']" />
                <span>博主</span>
              </span>
              <b class="comment-author">{{topCmt.nickname}}</b>
            </td>
          </tr>
          <tr>
            <td>
              <span class="comment-info">
                <span>{{topCmt.createTime}}</span>

                <span>{{topCmt.os}}</span>
                <span>{{topCmt.browser}}</span>
              </span>
            </td>
          </tr>
          <tr>
            <td colspan="2">
              <b>{{topCmt.content}}</b>
              <p  class="reply-wrapper" @click="replyClick(topCmt.id, topCmt.nickname)">
                <span>回复</span>
              </p>
            </td>
          </tr>
          <!-- 回复贴 -->
          <tr class="reply-box" v-for="replyCmt in topCmt.replyComments" :key="replyCmt.id">
            <td></td>
            <td>
              <el-divider></el-divider>
              <table>
                <tr>
                  <td rowspan="2">
                    <img class="commment-gravater" :src="gravaterImg(replyCmt.email)" />
                  </td>
                  <td>
                    <span v-if="replyCmt.adminComment" class="comment-author-tag">
                      <font-awesome-icon :icon="['fa', 'flag']" />
                      <span>博主</span>
                    </span>
                    <b class="comment-author">{{replyCmt.nickname}}</b>
                  
                  </td>
                </tr>
                <tr>
                  <td>
                    <span class="comment-info">
                      <span>{{replyCmt.createTime}}</span>

                      <span>{{replyCmt.os}}</span>
                      <span>{{replyCmt.browser}}</span>
                    </span>
                  </td>
                </tr>
                <tr>
                  <td colspan="2">
                    <span>@</span>
                    <span style="color:  #35b8ff">{{replyCmt.replyNickname}}</span>
                    <span>:</span>
                    <b>{{replyCmt.content}}</b>
                    <p  class="reply-wrapper" @click="replyClick(replyCmt.id, replyCmt.nickname)">
                      <span>回复</span>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </el-row>
      <el-divider></el-divider>
    </div>
  </div>
</template>

<script>
import md5 from "js-md5";
// import { EventBus } from "../eventBus/index.js";
export default {
  name: "CommentList",
  components: {},
  data() {
    return {};
  },
  props: {
    comments: {
      type: Array,
      default: () => {
        return [
          {
            id: 0,
            nickname: "",
            email: "",
            content: "",
            createTime: "2021-02-13 23:11:51",
            os: "",
            browser: "",
            replyComments: [
              {
                id: 1,
                nickname: "",
                email: "",
                content: "",
                createTime: "2021-02-13 23:11:51",
                replyNickname: "",
                content: "",
                os: "",
                browser: ""
              }
            ]
          }
        ];
      }
    }
  },
  created() {},
  methods: {
    replyClick(id, atNickname) {
      this.$emit("reply-click", id, atNickname);
      document.getElementById("input-textarea").scrollIntoView();
      console.log("try reply id = ", id);
    },
    gravaterImg(email) {
      const types = ["identicon", "monsterid", "wavatar", "retro"];
      const type = types[email.length % 4];
      // https://www.gravatar.com/avatar/5ca4962228b25bb180ed14794013c4bc?d=monsterid
      return (
        "https://avatar.sourcegcdn.com/avatar/" + md5(email.trim()) + "?d=" + type
      );
    }
  }
};
</script>

<style scoped>
.reply-wrapper{
  text-align:right;
}
.comment-info > span {
  font-size: 0.6em;
  padding-left: 5px;
}
.comment-reply-item {
  margin-top: 20px;
}
.commment-gravater {
  border-radius: 10px;
  width: 50px;
}
.comment-author {
  padding-top: 0px;
  color: coral;
}
.comment-author-tag {
  font-size: 0.5em;
  color: red;
}
table.comment-table {
  border-spacing: 0;
}
.reply-btn{
  width: 60px;
  padding: 5px;
}
</style>
<style scoped lang="scss">
@import "~/assets/scss/common/common.scss";
.reply-box {
  @include background_color("reply_box_color");
  
}
</style>
