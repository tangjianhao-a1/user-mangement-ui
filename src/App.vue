<template>
  <div>
    <div class="centent">
      <h1>人员名单</h1>
      <div class="centent_input">
        <input
          type="text"
          placeholder="请输入用户名"
          v-model="addObj.addName"
        />
        <input type="text" placeholder="请输入备注" v-model="addObj.addNotes" />
        <button @click="add">增加</button>
        <input type="text" placeholder="请输入查找名称" v-model="queryName" />
        <button @click="search">搜索</button>
      </div>
      <table sellspacing="0">
        <thead>
          <tr>
            <th>id</th>
            <th>名称</th>
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
              <button @click="del(item.id)" class="delete">删除</button>
              <button class="edit" @click="edit(item)">修改</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 遮挡层 -->
    <div class="layer" v-if="layer">
      <div class="layer_body">
        <!-- 弹出框头部部分 -->
        <div class="layer_body_title">
          修改用户信息
          <span
            ><a href="javascript:;" style="color: red" @click="layer = false"
              >X</a
            ></span
          >
        </div>

        <!-- 弹出输入框部分 -->
        <div class="layer_body_content">
          <div class="layer_body_input">
            <label>用户名：</label>
            <input
              type="text"
              placeholder="请输入姓名"
              class="list-input"
              v-model="editObj.useName"
            />
          </div>

          <!-- 弹出下输入框部分 -->
          <div class="layer_body_input">
            <label>用户备注:</label>
            <input
              type="text"
              placeholder="请输入备注"
              class="list-input"
              v-model="editObj.useNotes"
            />
          </div>
        </div>

        <!-- 按钮操作部分 -->
        <div class="layer_body_button">
          <a href="javascript:;" @click="joinus">确认</a>
          <a href="javascript:;" @click="layer = false">取消</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      layer: false,
      userList: [],
      queryName: "",

      addObj: {
        addName: "",
        addNotes: "",
      },

      editObj: {
        id: "",
        useName: "",
        useNotes: "",
      },
    };
  },

  mounted: function () {
    this.queryData();
  },

  methods: {
    async queryData() {
      let res = await axios.get("http://81.68.177.149:8080/userInfo/query");
      this.userList = res.data;
    },
    async search() {
      //查询数据
      let list = await axios.get("http://81.68.177.149:8080/userInfo/query");
      let ret = list.data;
      let a = ret.filter((value) => {
        if (this.queryName == null || this.queryName == "") {
          return true;
        }
        return value.username.includes(this.queryName);
      });
      this.userList = a;
    },

    async add() {
      if (this.addObj.addName == "" || this.addObj.addName == null) return;
      if (this.addObj.addNotes == "" || this.addObj.addNotes == null) return;
      await axios.post("http://81.68.177.149:8080/userInfo/add", {
        username: this.addObj.addName,
        noteInfo: this.addObj.addNotes,
      });
      this.queryData();
    },

    async del(id) {
      if (!confirm("确定要删除吗")) {
        return;
      }
      await axios.delete("http://81.68.177.149:8080/userInfo/delete?id=" + id);
      this.queryData();
    },

    edit(item) {
      this.layer = true;
      this.editObj = {
        id: item.id,
        useName: item.username,
        useNotes: item.noteInfo,
      };
    },

    async joinus() {
      await axios.put("http://81.68.177.149:8080/userInfo/update", {
        id: this.editObj.id,
        username: this.editObj.useName,
        noteInfo: this.editObj.useNotes,
      });
      this.layer = false;
      this.queryData();
    },
  },
};
</script>

<style>
* {
  text-shadow: 5px 5px 10px #ddd;
  color: #7c7cad;
}

a {
  text-decoration: none;
  color: #000000;
}

a:hover {
  color: #66b1ff;
}
button {
  background: #66b1ff;
  text-align: center;
  width: 50px;
  color: #ffffff;
}

button:hover {
  background-color: #7c7cad;
  color: #ebebeb;
}

input,
button {
  outline: none;
  cursor: pointer;
  border: #ebebeb 1px solid;
  height: 35px;
  border-radius: 7px;
}
.centent {
  width: 700px;
  margin: 50px auto;
  border: 2px solid #ffeebc;
}

h1 {
  width: 200px;
  height: 50px;
  margin-bottom: 6px;
  margin-left: 250px;
}

table,
tr,
td {
  border-collapse: collapse;
  width: 50px;
  text-align: center;
  border: 1px solid #ffeebc;
  height: 40px;
}

table {
  width: 700px;
}

.delete {
  width: 41px;
  height: 40px;
  margin-right: 20px;
  background-color: #e6a23c;
  color: #ffffff;
  border-radius: 20px;
}

.edit {
  width: 41px;
  height: 40px;
  margin-right: 20px;
  background-color: #67c23a;
  color: #ffffff;
  border-radius: 20px;
}

input {
  margin: 10px 20px 5px 8px;
}

.layer {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.3);
}

.layer_body {
  position: fixed;
  top: 50%;
  left: 50%;
  width: 512px;
  height: 290px;
  transform: translate(-50%, -50%);
  background: #ffff;
  border: 1px solid #ddd;
  box-shadow: 0px 0px 15px #ddd;
}

.layer_body_title {
  position: relative;
  width: 100%;
  margin-top: 27px;
  font-size: 25px;
  height: 40px;
  line-height: 40px;
  text-align: center;
}

.layer_body_title span {
  position: absolute;
  right: 0px;
  top: -28px;
  background-color: #ffffff;
  border: 1px solid #ebebeb;
  width: 30px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  color: red;
  font-size: 20px;
}

.layer_body_title span:hover {
  background: #c8c9cc;
}

.layer_body_input label {
  float: left;
  width: 90px;
  padding-right: 10px;
  text-align: right;
  height: 35px;
  line-height: 100px;
}

.layer_body_input input.list-input {
  float: left;
  margin-top: 30px;
  line-height: 35px;
  width: 350px;
  height: 35px;
  border: 1px solid #ebebeb;
  text-indent: 5px;
}

.layer_body_button {
  position: absolute;
  width: 30%;
  margin: 170px 0px 0px 320px;
  line-height: 35px;
}

.layer_body_button a {
  display: inline-block;
  border: 1px solid #ebebeb;
  border-radius: 5px;
  width: 60px;
  height: 35px;
  margin-right: 10px;
  text-align: center;
}
</style>
