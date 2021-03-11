<template>
  <div>
    <Permission :code="'100'">
      <a-button @click="handleFindNormalUser">获取所有用户列表</a-button>
    </Permission>
    <Permission :code="'300'">
      <a-button @click="handleFindAllUser">获取所有用户列表</a-button>
    </Permission>
    <a-table :columns="columns"
             :data-source="data"
             bordered>
      <template v-for="col in ['name', 'role', 'address']"
                :slot="col"
                slot-scope="text, record, ">
        <div :key="col">
          <a-input v-if="record.editable"
                   style="margin: -5px 0"
                   :value="text"
                   @change="e => handleChange(e.target.value, record.key, col)" />
          <template v-else>
            {{ text }}
          </template>
        </div>
      </template>
      <!-- <template slot="operation"
                slot-scope="text, record, ">
        <Permission :any="['300','301','302','303']">
          <div class="editable-row-operations">

            <span v-if="record.editable">
              <a @click="() => save(record.key)">Save</a>
              <a-popconfirm title="Sure to cancel?"
                            @confirm="() => cancel(record.key)">
                <a>Cancel</a>
              </a-popconfirm>
            </span>
            <span v-else>
              <a :disabled="editingKey !== ''"
                 @click="() => edit(record.key)">Edit</a>
            </span>
          </div>
        </Permission>
      </template> -->
    </a-table>
  </div>
</template>
<script>
import Permission from './Permission.vue';
import { FindAllUserByRole } from '../apis/userApi';

const columns = [
  {
    title: 'username',
    dataIndex: 'username',
    width: '25%',
    scopedSlots: { customRender: 'usernname' },
  },
  {
    title: 'role',
    dataIndex: 'role',
    width: '25%',
    scopedSlots: { customRender: 'role' },
  },
  // {
  //   title: 'operation',
  //   dataIndex: 'operation',
  //   scopedSlots: { customRender: 'operation' },
  // },
];
export default {
  // props: {
  //   userList: { type: Array, default: () => [] },
  // },
  data() {
    // this.cacheData = data.map((item) => ({ ...item }));
    return {
      data: [],
      columns,
      cacheData: [],
      editingKey: '',
    };
  },
  watch: {
    data(newVal, oldVal) {
      this.cacheData = oldVal;
    },
  },
  components: {
    Permission,
  },
  methods: {
    async handleFindAllUser() {
      const role = this.$store.getters.userRole;
      const { data } = await FindAllUserByRole({ role });
      this.data = data;
    },
    async handleFindNormalUser() {
      const { data } = await FindAllUserByRole({ role: 'user' });
      this.data = data;
    },
    // handleChange(value, key, column) {
    //   const newData = [...this.data];
    //   const target = newData.filter((item) => key === item.key)[0];
    //   if (target) {
    //     target[column] = value;
    //     this.data = newData;
    //   }
    // },
    // edit(key) {
    //   const newData = [...this.data];
    //   const target = newData.filter((item) => key === item.key)[0];
    //   this.editingKey = key;
    //   if (target) {
    //     target.editable = true;
    //     this.data = newData;
    //   }
    // },
    // save(key) {
    //   const newData = [...this.data];
    //   const newCacheData = [...this.cacheData];
    //   const target = newData.filter((item) => key === item.key)[0];
    //   const targetCache = newCacheData.filter((item) => key === item.key)[0];
    //   if (target && targetCache) {
    //     delete target.editable;
    //     this.data = newData;
    //     Object.assign(targetCache, target);
    //     this.cacheData = newCacheData;
    //   }
    //   this.editingKey = '';
    // },
    // cancel(key) {
    //   const newData = [...this.data];
    //   const target = newData.filter((item) => key === item.key)[0];
    //   this.editingKey = '';
    //   if (target) {
    //     Object.assign(target, this.cacheData.filter((item) => key === item.key)[0]);
    //     delete target.editable;
    //     this.data = newData;
    //   }
    // },
  },
};
</script>
<style scoped>
.editable-row-operations a {
  margin-right: 8px;
}
</style>
