<style lang="less">
@import "./login.less";
</style>

<template>
  <div class="login">
    <div class="login-con">
      <Card icon="log-in" title="欢迎登录" :bordered="false">
        <div class="form-con">
          <login-form @on-success-valid="handleSubmit"></login-form>
          <!--<p class="login-tip">输入任意用户名和密码即可</p>-->
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import LoginForm from "_c/login-form";
import { mapActions } from "vuex";
export default {
  components: {
    LoginForm
  },
  methods: {
    ...mapActions(["handleLogin", "getUserInfo"]),
    handleSubmit({ userName, pwd, msg }) {
      if (msg != "login success") {
        this.$Message.error("登录失败");
        return;
      }
      this.handleLogin({ userName, pwd, oneTimePwd: "" })
        .then(res => {
          this.$Message.success("登录成功");
          setTimeout(() => {
            this.$router.push({
              name: this.$config.homeName
            });
          }, 1000);

          // this.getUserInfo().then(res => {
          //   this.$Message.success("登录成功");
          //   setTimeout(() => {
          //     this.$router.push({
          //       name: this.$config.homeName
          //     });
          //   }, 1000);
          // });
        })
        .catch(err => {
          this.$Message.error("登录失败");
          return;
        });
    }
  }
};
</script>

<style>
.slide-verify-slider {
  width: 260px;
}
</style>
