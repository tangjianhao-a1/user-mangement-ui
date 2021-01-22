<template>
  <div class="login">
    <h2>我是登录界面</h2>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="用户名" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>

      <el-form-item label="密码" prop="passworld">
        <el-input type="password" v-model="ruleForm.password"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm()"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "login",

  data() {
    return {
      ruleForm: {
        name: "",
        passworld: "",
      },
      rules: {
        name: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 18, message: "长度在 3 到 18 个字符", trigger: "blur" },
        ],
         passworld: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 18, message: "长度在 6 到 18 个字符", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    submitForm() {
      let {name,passworld} = this.ruleForm;  
      if(name =='admin' && passworld == 'passworld') {
        this.$router.push('/home')
      }else {
        alert('用户名密码不匹配')
      }
    }
  },
};
</script>

<style>
</style>