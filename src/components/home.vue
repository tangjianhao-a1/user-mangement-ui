<template>
  <div>
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
        <tr>
          <td>1</td>
          <td>李二猫</td>
          <td>人不好</td>
          <td>
            <button>删除</button>  
            <button>修改</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>  
import requestPath from '@/netwock/requestPath'
export default {
  name: "home", 
  data() {
    return {
      userlist: [],
    }
  },   
async created() {
    this.userlist = await requestPath.getAllUser()
  }
};
</script>

<style>
table,
tr,
td {
  border-collapse: collapse;
  border: 1px solid red;
}
</style>