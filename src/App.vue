<template>
  <div class="centent">
    <h1>人员名单</h1>
    <div class="centent_input">
      <input type="text" placeholder="请输入用户名" v-model="userObj.addName" />
      <input type="text" placeholder="请输入备注" v-model="userObj.addNotes" />
      <button @click="add">增加</button>
      <input
        type="text"
        placeholder="请输入用户名"
        v-model="userObj.queryName"
      />
      <button @click="search">搜索</button>
    </div>
    <table>
      <thead>
        <tr>
          <th>id</th>
          <th>名称</th>
          <th>备注</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr :key="item.id" v-for="item in user">
          <td>{{ item.id }}</td>
          <td>{{ item.username }}</td>
          <td>{{ item.noteInfo }}</td>
          <td>
            <button @click="del(item.id)">删除</button>
            <button>修改</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      user: [],
      userObj: {
        addName: "",
        addNotes: "",
        queryName: "",
      },
    };
  },

  mounted: function () {
    this.queryData();
  },

  methods: {
    queryData() {
      axios.get("http://81.68.177.149:8080/userInfo/query").then((value) => {
        console.log(value.data);
        this.user = value.data;
      });
    },
    search() {
      //查询数据
      axios.get("http://81.68.177.149:8080/userInfo/query").then((value) => {
        let list = value.data;
        let a = list.filter((value) => {
          if (this.userObj.queryName == null || this.userObj.queryName == "") {
            return true;
          }
          return value.username.includes(this.userObj.queryName);
        });
        this.user = a;
      });
    },

    add() {
      if (this.userObj.addName == "" || this.userObj.addName == null) return;
      if (this.userObj.addNotes == "" || this.userObj.addNotes == null) return;
      axios
        .post("http://81.68.177.149:8080/userInfo/add", {
          username: this.userObj.addName,
          noteInfo: this.userObj.addNotes,
        })
        .then(() => {
          this.queryData();
        });
    },

    del(id) {
      if (!confirm("确定要删除吗")) {
        return;
      }
      axios
        .delete("http://81.68.177.149:8080/userInfo/delete?id=" + id)
        .then(() => {
          this.queryData();
        })
    },
  },
};
</script>

<style>
.centent {
  width: 1024px;
  margin: 100px auto;
}

h1 {
  width: 200px;
  height: 50px;
  margin-bottom: 6px;
  margin-left: 250px;
}
</style>
