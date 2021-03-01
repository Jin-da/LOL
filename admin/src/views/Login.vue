<template>
  <div class="login-container">
    <el-card header="请先登录" class="login-card">
      <el-form @submit.native.prevent="login"
        ><!--点击登录监听原生表单的submit 阻止表单的默认提交跳转-->
        <el-form-item label="用户名">
          <el-input v-model="model.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="model.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" native-type="submit">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      model: {},
    };
  },
  methods: {
    async login() {
      const res = await this.$http.post('login', this.model)
      sessionStorage.token = res.data.token//关闭后删除
      // localStorage.token = res.data.token 保留
      this.$router.push('/')
      this.$message({
        type: 'success',
        message: `欢迎用户 ${res.data.username}`
      })
    },
  },
};
</script>

<style>
.login-card {
  width: 30rem;
  margin: 10rem auto;
}
</style>
