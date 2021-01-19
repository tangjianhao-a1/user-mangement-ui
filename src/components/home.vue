<template>
  <div>
    <div class="table-head">
      <input
        type="text"
        class="search"
        placeholder="搜索用户"
        v-model="search"
      />
      <button class="add">增加</button>
    </div>
    <table sellspacing="0">
      <thead>
        <tr>
          <th>id</th>
          <th>姓名</th>
          <th>备注</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr :key="item.id" v-for="item in userList">
          <td>{{ item.id }}</td>
          <td>{{ item.username }}</td>
          <td>{{ item.noteInfo }}</td>
          <td>
            <button class="delete">删除</button>
            <button class="edit">修改</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import requestPath from "@/netwock/requestPath";
export default {
  name: "home",
  data() {
    return {
      search: "",
      userList: [],
    };
  },

  computed: {  
    
  },

  async created() {
    this.userList = this.Data()
  },

  methods: {
   async Data() {
     this.userList = await requestPath.getAllUser();
    }
  }
};
</script>

<style>
table,
tr,
td {
  border-collapse: collapse;
  border: 1px solid #ebeb;
  width: 50px;
}

table {
  width: 800px;
  height: 500px;
  margin: -1px auto;
  text-align: center;
  box-sizing: border-box;
}

th {
  height: 40px;
}

.table-head {
  height: 40px;
  width: 798px;
  border: 1px solid #ebeb;
  margin: 0 auto;
  margin-top: 100px;
}

.edit {
  margin-left: 20px;
}

.search {
  margin-left: 2px;
  width: 590px;
  height: 36px;
}

.add {
  width: 60px;
  height: 39px;
  margin-left: 65px;
}
</style>