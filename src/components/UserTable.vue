<template>
  <div>
    <Permission :code="'100'">
      <a-button @click="handleFindNormalUser">获取普通用户列表</a-button>
    </Permission>
    <Permission :code="'101'">
      <a-button @click="handleFindAllUser">获取所有用户列表</a-button>
    </Permission>
    <Permission :code="'300'">
      <a-form-model layout="inline"
                    :model="formData">
        <a-form-model-item>
          <a-input v-model="formData.username"
                   placeholder="username" />
        </a-form-model-item>
        <a-form-model-item>
          <a-input v-model="formData.password"
                   placeholder="password" />
        </a-form-model-item>
        <a-button @click="handleAddUser">添加用户</a-button>
      </a-form-model>
    </Permission>
    <a-table :columns="columns"
             :data-source="data"
             :rowKey="(record,index)=>{return index}"
             bordered>
      <template slot="name"
                slot-scope="text, record">
        <editable-cell :text="text"
                       @change="onCellChange(record.key, 'name', $event)" />
      </template>
      <!-- <template v-for="col in [ 'role', 'address']"
                :slot="col"
                slot-scope="text, record, ">
        <div :key="col">
          <a-input v-if="record.editable"
                   style="margin: -5px 0"
                   :value="text"
                   @change="e => handleChange(e.target.value, record.key, col)" />
          <template v-else>
            {{ text }}
          </template> -->
      <!-- </div>
      </template> -->
      <template slot="operation"
                v-if="record.role === 'user'"
                slot-scope="text, record">
        <a-popconfirm v-if="data.length"
                      title="Sure to delete?"
                      @confirm="() => onDelete(record)">
          <a href="javascript:;">Delete</a>
        </a-popconfirm>
      </template>
    </a-table>
  </div>
</template>
<script>
import Permission from './Permission.vue';
import EditableCell from './EditableCell.vue';
import { FindAllUserByRole, addUser, deleteUser } from '../apis/userApi';

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
  {
    title: 'operation',
    dataIndex: 'operation',
    scopedSlots: { customRender: 'operation' },
  },
];
export default {
  // props: {
  //   userList: { type: Array, default: () => [] },
  // },
  data() {
    // this.cacheData = data.map((item) => ({ ...item }));
    return {
      formData: {
        username: '',
        password: '',
      },
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
    EditableCell,
  },
  methods: {
    async handleAddUser() {
      const { data } = await addUser(this.formData);
      console.log(data);
      if (data) {
        this.$message.info(data);
        this.formData = { username: '', password: '' };
      }
    },
    async handleFindAllUser() {
      const role = this.$store.getters.userRole;
      const { data } = await FindAllUserByRole({ role });
      this.data = data;
    },
    async handleFindNormalUser() {
      const { data } = await FindAllUserByRole({ role: 'user' });
      this.data = data;
    },
    async onDelete(key) {
      const dataSource = [...this.data];
      const deleteData = dataSource.find((item) => item.name !== key);
      const { data } = await deleteUser(deleteData);
      if (data) {
        this.$message.info('删除成功');
      } else {
        this.$message.info('删除失败');
      }
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
