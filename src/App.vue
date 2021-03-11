<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
import Timer from './utils/time';

export default {
  data() {
    return {
      timer: null,
    };
  },
  computed: {
    isLogin() {
      return this.$store.getters.isLogin;
    },
  },
  watch: {
    isLogin(newVal) {
      if (newVal === true) {
        console.log(newVal);
        this.timer = new Timer(this.loginOut, 5000);
        this.timer.start();
        ['click', 'mousedown', 'mousemove', 'mouseup'].forEach((i) => {
          // 绑定在timer
          window.addEventListener(i, this.timer.reStart);
        });
      }
    },
  },
  methods: {
    loginOut() {
      this.timer.stop();
      this.$store.commit('loginOut');
      this.$router.push('/login');
      ['click', 'mousedown', 'mousemove', 'mouseup'].forEach((i) => {
        window.removeEventListener(i, this.timer.reStart);
      });
    },
  },
};
</script>
<style lang="less">
#app {
  width: 100%;
  height: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
