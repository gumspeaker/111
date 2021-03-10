<template>
  <div class="login-card">
    <div class="header">
      <span class="title">{{ type }}</span>
    </div>
    <a-form-model :model="form">
      <a-form-model-item style="form-style">
        <a-input v-model="form.username"
                 placeholder="Username">
          <a-icon slot="prefix"
                  type="user"
                  style="color:rgba(0,0,0,.25)" />
        </a-input>
      </a-form-model-item>
      <a-form-model-item>
        <a-input v-model="form.password"
                 type="password"
                 placeholder="Password">
          <a-icon slot="prefix"
                  type="lock"
                  style="color:rgba(0,0,0,.25)" />
        </a-input>
      </a-form-model-item>
      <a-form-model-item>
        <a-button type="primary"
                  @click="login"
                  :disabled="form.username === '' || form.password === ''">
          登录
        </a-button>
        <a-button :disabled="form.username === '' || form.password === ''"
                  @click="Register">
          注册
        </a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
import { userLogin, userRegister } from '../apis/userApi';

export default {
  data() {
    return {
      type: '登录',
      form: {
        username: '',
        password: '',
      },
    };
  },
  methods: {
    async login() {
      // eslint-disable-next-line no-unused-vars
      const { code, data, message } = await userLogin(this.form);
      if (data !== '登录账号密码错误') {
        this.$store.commit('changeStateToLogin', data);
        this.$router.push('/home');
      } else {
        this.$message.info(data);
      }
    },
    async Register() {
      const data = await userRegister(this.form);
      console.log(data);
    },
  },
};
</script>

<style lang="less"  scoped>
.title {
  font-size: 30px;
}
.login-card {
  position: absolute;
  top: 55%;
  left: 50%;
  margin: -160px 0 0 -160px;
  width: 320px;
  height: 320px;
  padding: 36px;
  box-shadow: 0 0 100px rgba(0, 0, 0, 0.08);
}
.form-style {
  width: 80%;
}
button {
  width: 100%;
}
</style>
