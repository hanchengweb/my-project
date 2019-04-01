<template>
  <div class="login-wrapper">
    <el-form class="login-form">
      <h2>请使用账号登录</h2>
      <el-form-item>
        <el-input v-model="userName" placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="pwd" placeholder="密码" type="password"></el-input>
      </el-form-item>
      <!-- <el-radio v-model="role" label="商户"></el-radio><el-radio v-model="role" label="管理员"></el-radio> -->
      <el-form-item>
        <el-button class="login-bt" type="primary" @click="submit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userName: '',
      pwd: '',
      // role: ''
    }
  },
  methods: {
    submit() {
      if (this.userName && this.pwd) {
        this.$store.dispatch("login", {
          userName: this.userName,
          pwd: this.pwd
        }).then(() => {
          this.$router.push('/')
        }).catch(err => this.$message.error(err))
      } else {
        this.$message.warning('用户名或密码不能为空')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.login-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background: linear-gradient(to bottom right, #4BD28B, #AEC9F4)
}
.login-form {
  box-sizing: border-box;
  width: 400px;
  // height: 250px;
  padding: 20px;
  border-radius: 10px;
  background-color: #fff;
  overflow: hidden;

  h2 {
    font-size: 18px;
    margin-bottom: 20px;
  }

  .login-bt {
    width: 100%;
  }
}
</style>
