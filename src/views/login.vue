<template>
  <div class="login-container">
    <LoginCard />
  </div>
</template>

<script>
import LoginCard from '../components/LoginCard.vue';

export default {
  data() {
    return {
      type: '登录',
    };
  },
  components: {
    LoginCard,
  },
  methods: {},
};
</script>

<style>
.login-container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  bottom: 20%;
}
</style>
