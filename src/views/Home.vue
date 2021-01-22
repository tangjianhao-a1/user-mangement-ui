<template>
  <div class="home">
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
              <button class="delete" @click="deleteUserShow(item.id)">
                删除
              </button>
              <button class="edit" @click="editUsershow(item)">修改</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <Dialog v-model="addDialogIsFlag" title="增加用户">
      <div class="layer-body-input">
        <label>用户名：</label>
        <input
          type="text"
          placeholder="请输入姓名(必填)"
          class="list-input"
          v-model="addUserFrom.username"
        />
      </div>

      <!-- 弹出下输入框部分 -->
      <div class="layer-body-input">
        <label>用户备注:</label>
        <input
          type="text"
          placeholder="请输入备注"
          class="list-input"
          v-model="addUserFrom.noteInfo"
        />
      </div>
      <!-- 按钮操作部分 -->
      <div class="layer-body-button">
        <button @click="submitAdd">确定</button>
        <button @click="addDialogIsFlag = false">取消</button>
      </div>
    </Dialog>

    <Dialog v-model="editDialogIsFlag" title="修改用户">
      <div class="layer-body-input">
        <label>用户名：</label>
        <input
          type="text"
          placeholder="请输入姓名(必填)"
          class="list-input"
          v-model="editUserFrom.username"
        />
      </div>

      <!-- 弹出下输入框部分 -->
      <div class="layer-body-input">
        <label>用户备注:</label>
        <input
          type="text"
          placeholder="请输入备注"
          class="list-input"
          v-model="editUserFrom.noteInfo"
        />
      </div>
      <!-- 按钮操作部分 -->
      <div class="layer-body-button">
        <button @click="submitEdit">确定</button>
        <button @click="editDialogIsFlag = false">取消</button>
      </div>
    </Dialog>
  </div>
</template>

<script>
import requestPath from "@/netwock/requestPath";
import stringVerify from "@/verification/stringVerify";
import Dialog from "@/views/Dialog";
export default {
  name: "Home",
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

      /* 增加用户输入框 */
      addUserFrom: {
        username: "",
        noteInfo: "",
      },

      /* 编辑用户输入框 */
      editUserFrom: {
        id: null,
        username: "",
        noteInfo: "",
      },
    };
  },
  /* 注册组件 */
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
  /* 页面打开刷新数据 */
  async created() {
    this.userList = await requestPath.getAllUser();
  },

  methods: {
    /* 刷新数据函数 */
    async allData() {
      this.userList = await requestPath.getAllUser();
    },
    /* 展示增加栏 */
    addUserShow() {
      this.addDialogIsFlag = true;
      this.addUserFrom = {
        username: "",
        noteInfo: "",
      };
    },

    /* 展示编辑框 */
    editUsershow({ id, username, noteInfo }) {
      this.editDialogIsFlag = true;
      this.editUserFrom = {
        id,
        username,
        noteInfo,
      };
    },

    /* 提交增加项 */
    async submitAdd() {
      /* 解构赋值获取变量 */
      let { username, noteInfo } = this.addUserFrom;

      /* 验证用户名是否为空 */
      if (stringVerify.isEmpty(username)) {
        alert("请输入名字");
        return;
      }
      /* 向后台提交数据 */
      await requestPath.addUser({ username, noteInfo });

      /* 关闭界面 */
      this.addDialogIsFlag = false;

      /* 刷新用户列表 */
      this.allData();
    },

    async deleteUserShow(id) {
      if (!confirm("确定要删除吗")) {
        return;
      }
      await requestPath.deleteById(id);
      this.allData();
    },

    async submitEdit() {
      let { id, username, noteInfo } = this.editUserFrom;
      if (stringVerify.isEmpty(username)) {
        alert("请输入用户名");
        return;
      }
      await requestPath.updateById({ id, username, noteInfo });
      this.editDialogIsFlag = false;
      this.allData();
    },
  },
};
</script>

<style>
button:hover {
  background-color: #2eaed4;
}
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