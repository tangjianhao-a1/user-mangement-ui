<template>
  <div>
    <div>
      <h2 class="table-head">用户管理</h2>
      <div class="table-input">
        <input
          type="text"
          class="search"
          placeholder="搜索用户"
          v-model="searchInput"
        />
        <button class="add" @click="addUserShow">增加</button>
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
          <tr :key="item.id" v-for="item in searchCenter">
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
    <Dialog v-model="addDialogIsFlag"></Dialog>
  </div>
</template>

<script>
import requestPath from "@/netwock/requestPath";
import stringVerify from "@/verification/stringVerify";
import Dialog from "@/components/Dialog";

export default {
  name: "home",
  data() {
    return {
      /* 输入框 */
      searchInput: "",

      /* 用户列表 */
      userList: [],

      /* 是否展示增加框 */
      addDialogIsFlag: false,

      /* 是否展示编辑框 */
      editDialogIsFlag: false,  

     
    };
  },

  components: {
    Dialog,
  },

  computed: {

    /* 查询用户 */
    searchCenter() {
      if (stringVerify.isEmpty(this.searchInput)) {
        return this.userList;
      }
      return this.userList.filter(({ id, username, noteInfo }) => {
        if (id != null && (id + "").includes(this.searchInput)) {
          return true;
        }

        if (username != null && (username + "").includes(this.searchInput)) {
          return true;
        }

        if (noteInfo != null && (noteInfo + "").includes(this.searchInput)) {
          return true;
        }
      });
    },
  },
  

  async created() {
    this.userList = await requestPath.getAllUser();
  },

  methods: {
   addUserShow() {
     this.addDialogIsFlag = true;
   }
  },
};
</script>

<style>
table,
tr,
td {
  border-collapse: collapse;
  border: 1px solid #ebeb;
  width: 45px;
  height: 50px;
}

table {
  width: 800px;
  margin: -1px auto;
  text-align: center;
  box-sizing: border-box;
}

th {
  height: 50px;
}

.table-input {
  height: 40px;
  width: 798px;
  border: 1px solid #ebeb;
  margin: 0 auto;
}

.table-head {
  height: 40px;
  width: 798px;
  border: 1px solid #ebeb;
  margin: -1px auto;
  margin-top: 100px;
  text-align: center;
  line-height: 40px;
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