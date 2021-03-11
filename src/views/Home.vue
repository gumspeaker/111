<template>
  <div class="home">
    <Permission :code="'300'">
      <a-button>获取用户列表</a-button>
      <!-- <a-button slot="forbidden">forbidden</a-button> -->
    </Permission>
  </div>
</template>

<script>
import Permission from '../components/Permission.vue';
import { FindUserByName } from '../apis/userApi';
// @ is an alias to /src

export default {
  name: 'Home',
  data() {
    return {
      userList: [],
      searchUserName: '',
    };
  },
  components: {
    Permission,
  },
  methods: {
    async handleFindUserByName() {
      const userMessage = await FindUserByName(this.searchUserName);
      if (!userMessage) {
        this.$message.info('查无此人');
      }
    },
  },
};
</script>
