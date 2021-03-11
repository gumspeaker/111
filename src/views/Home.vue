<template>
  <div class="home">
    <Permission :code="'100'">
      <a-button @click="hadleGetFlow">查询顶峰流量</a-button>
    </Permission>
    <span>顶峰流量时间:{{flowData.TopTime}}，顶峰流量：{{flowData.TopFlow}}</span>
    <UserTable>
    </UserTable>
  </div>
</template>

<script>
import Permission from '../components/Permission.vue';
import UserTable from '../components/UserTable.vue';
import { FindUserByName } from '../apis/userApi';
import { getTopFlow } from '../apis/flow';
// @ is an alias to /src

export default {
  name: 'Home',
  data() {
    return {
      userList: [],
      searchUserName: '',
      flowData: {
        TopTime: '',
        TopFlow: 0,
      },
    };
  },
  components: {
    Permission,
    UserTable,
  },
  methods: {
    async hadleGetFlow() {
      const { data } = await getTopFlow();
      this.flowData = data;
    },
    async handleFindUserByName() {
      const userMessage = await FindUserByName(this.searchUserName);
      if (!userMessage) {
        this.$message.info('查无此人');
      }
    },
  },
};
</script>
