<template>
  <div>
    <div class="container">
      <div class="login-container">
        <div class="top">
          <div class="header">
            <span class="title">{{ title }}</span>
          </div>
        </div>
        <a-form id="components-form-demo-normal-login"
                :form="form"
                class="login-form"
                @submit="handleSubmit">
          <a-form-item>
            <a-input v-decorator="[
              'username',
              {
                rules: [{ required: true, message: '请输入您的用户名!' }]
              }
            ]"
                     placeholder="Username">
              <a-icon slot="prefix"
                      type="user"
                      style="color: rgba(0,0,0,.25)" />
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-input v-decorator="[
              'password',
              {
                rules: [{ required: true, message: '请输入您的密码!' }]
              }
            ]"
                     type="password"
                     placeholder="Password">
              <a-icon slot="prefix"
                      type="lock"
                      style="color: rgba(0,0,0,.25)" />
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-checkbox v-decorator="[
              'remember',
              {
                valuePropName: 'checked',
                initialValue: true
              }
            ]">
              记住我
            </a-checkbox>
            <a-button type="primary"
                      html-type="submit"
                      class="login-form-button">
              登陆
            </a-button>
          </a-form-item>
        </a-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>
