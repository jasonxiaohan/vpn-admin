<template>
  <Form ref="loginForm" :model="form" :rules="rules" @keydown.enter.native="handleSubmit">
    <FormItem prop="username">
      <Input v-model="form.username" placeholder="请输入用户名">
        <span slot="prepend">
          <Icon :size="16" type="ios-person"></Icon>
        </span>
      </Input>
    </FormItem>
    <FormItem prop="password">
      <Input type="password" v-model="form.password" placeholder="请输入密码">
        <span slot="prepend">
          <Icon :size="14" type="md-lock"></Icon>
        </span>
      </Input>
    </FormItem>
    <FormItem>
      <slide-verify
        :l="30"
        :r="10"
        :w="310"
        :h="155"
        @success="onSuccess"
        @fail="onFail"
        @refresh="onRefresh"
        :slider-text="text"
      ></slide-verify>
    </FormItem>
    <FormItem>
      <Button @click="handleSubmit" type="primary" long>登录</Button>
    </FormItem>
  </Form>
</template>
<script>
export default {
  name: "LoginForm",
  props: {
    userNameRules: {
      type: Array,
      default: () => {
        return [{ required: true, message: "账号不能为空", trigger: "blur" }];
      }
    },
    passwordRules: {
      type: Array,
      default: () => {
        return [{ required: true, message: "密码不能为空", trigger: "blur" }];
      }
    }
  },
  data() {
    return {
      form: {
        username: "",
        password: ""
      },
      msg: "",
      text: "向右滑"
    };
  },
  computed: {
    rules() {
      return {
        username: this.userNameRules,
        password: this.passwordRules
      };
    }
  },
  methods: {
    handleSubmit() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.$emit("on-success-valid", {
            username: this.form.username,
            password: this.form.password,
            msg: this.msg
          });
        }
      });
    },
    onSuccess() {
      this.msg = "login success";
    },
    onFail() {
      this.msg = "";
    },
    onRefresh() {
      this.msg = "";
    }
  }
};
</script>
<style>
.slide-verify-slider  {
  width: 260px;
}
</style>