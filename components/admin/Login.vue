<!--
 * @Author      : YaleXin
 * @Email       : me@yalexin.top
 * @LastEditors : YaleXin
-->
<template>
  <div>
    <el-card class="login-card-box">
      <div slot="header" style="text-align: center" class="clearfix">
        <span style="font-size: 20px; font-weight: bolder">请登录</span>
      </div>
      <el-form :model="loginForm" :rules="rules" ref="loginForm">
        <el-form-item prop="username">
          <el-input
            prefix-icon="el-icon-user"
            placeholder="请输入用户名"
            type="text"
            v-model="loginForm.username"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item prop="rawPassword">
          <el-input
            prefix-icon="el-icon-lock"
            placeholder="请输入密码"
            show-password
            type="password"
            v-model="loginForm.rawPassword"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item prop="code">
          <!-- <img :src="this.codeImg" @click="changeCodeImg" /> -->
          <!-- <el-input
            prefix-icon="el-icon-user"
            placeholder="请输入验证码，不区分大小写"
            type="text"
            v-model="loginForm.code"
            autocomplete="off"
            @keydown.enter.native="onSubmit"
          ></el-input> -->
        </el-form-item>
        <!-- <el-form-item>
          <el-checkbox v-model="loginForm.rememberMe">记住我</el-checkbox>
        </el-form-item> -->
        <el-form-item class="login-btn">
          <el-button
            plain
            type="primary"
            ref="loginBtn"
            :loading="powLoading"
            @click="onSubmit"
            >{{ loginBtnText }}</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script type="module">
import md5 from "js-md5";
const Captcha = require("@yalexin/pow-captcha");
// import { Captcha } from "../../static/js/pow-captcha-js.js";

export default {
  name: "Login",
  components: {},
  activated() {
    console.log("activated");
  },
  mounted() {
    // this.changeCodeImg();
    this.pow();
  },
  data() {
    let validateCode = (rule, value, callback) => {
      let md5code = md5(value.toLocaleLowerCase());
      if (value == "") {
        callback(new Error("请输入验证码"));
      } else if (this.code != md5code) {
        callback(new Error("验证码错误!"));
      } else {
        callback();
      }
    };
    return {
      code: "",
      loginBtnText: "PoW ing",
      powLoading: true,
      codeImg: "",
      loginForm: {
        username: "",
        rawPassword: "",
        rememberMe: false,
        code: "",
      },
      rules: {
        username: { required: true, message: "请输入用户名", trigger: "blur" },
        rawPassword: { required: true, message: "请输入密码", trigger: "blur" },
        // code: { validator: validateCode, trigger: "blur" },
      },
    };
  },
  methods: {
    pow() {
      
      Captcha.getPoWWithAxios("/admin/powConfig", this.$axios)
        .then((config) => {
          Captcha.tryPoWWithAxios("/admin/powVerify", config, this.$axios)
            .then((verifyResult) => {
              // 修改按钮样式
              this.powLoading = false;
              this.loginBtnText = "登录";
              console.log("resObj ==> ", verifyResult);
            })
            .catch((e) => {
              console.log("pow error =>", e);
            });
        })
        .catch((e) => {
          console.log("pow error =>", e);
        });
    },
    changeCodeImg() {
      this.$axios
        .get("/admin/verifyCode")
        .then((res) => {
          this.codeImg = decodeURI(res.img);
          this.code = res.code;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    onSubmit() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.login();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    loginSuccess(user) {
      this.$message({
        showClose: true,
        message: "登录成功",
        type: "success",
      });
      this.$store.commit("user/saveUser", user);
      this.$router.replace("/admin").catch((e) => {});
    },
    login() {
      const code =
        "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
      let len = parseInt(Math.random() * 100 + 1);
      let str = "";
      for (let i = 0; i < len; i++) {
        str += code[parseInt(Math.random() * 62)];
      }
      let md5Str = md5(str);
      let codeStr = md5(md5(this.loginForm.code.toLocaleLowerCase()));
      let user = {
        username: this.loginForm.username,
        password: md5(md5(md5(this.loginForm.rawPassword)) + md5Str),
      };
      console.log("code = ", codeStr);
      this.$axios
        .post("/admin/login", {
          data: {
            user: user,
            salt: md5Str,
            code: codeStr,
          },
        })
        .then((res) => {
          this.loginSuccess(res.user);
        })
        .catch((e) => {});
    },
  },
};
</script>

<style scoped>
.login-card-box {
  width: 300px;
  position: absolute;
  left: 39%;

  transition: (-50%, -50%);
}
.el-form-item {
  margin-bottom: 5px;
}
.login-btn {
  text-align: center;
}
</style>
