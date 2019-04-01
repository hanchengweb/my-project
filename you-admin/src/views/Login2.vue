<template>
  <div class="login-wrapper">
    <h2 class="title">后台管理系统</h2>
    <div class="form">
      <label class="userName_text" for="userName">用户账号</label>
      <input v-model="userName" id="userName" type="text">
      <label class="pwd_text" for="pwd">登录密码</label>
      <input v-model="pwd" id="pwd" type="password">
      <button class="submit-bt" @click="submit">登录</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userName: '',
      pwd: ''
    }
  },
  methods: {
    submit() {
      if (this.userName && this.pwd) {
        this.$store.dispatch("login", {
          userName: this.userName,
          pwd: this.pwd
        }).then(data => {
          switch (data.code) {
            case 1:
              this.$router.push('/')
              break;
            case 0:
              this.$message.error('参数错误');
              break;
            case -2:
              this.$message.error('用户不存在');
              break;
            case -3:
              this.$message.error('密码错误');
              break;
            case -5:
              this.$message.error('用户已被冻结')
            default:
              break;
          }
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
  height: 100%;
  background: url(../assets/bg.png) no-repeat;
  background-size: cover;
  overflow: hidden;

  h2 {
    margin-top: 1.89rem;
    line-height: 1;
    text-align: center;
    font-size: .43rem;
    font-family: PingFangSC-Medium;
    color: #4DC4FF;
  }

  .form {
    width: 5.6rem;
    height: 4rem;
    margin: 0 auto;
    padding-top: 1rem;
    font-size: .16rem;
    overflow: hidden;
    
    .userName_text, .pwd_text {
      display: block;
      margin-left: .31rem;
      margin-bottom: .16rem;
      font-size: .24rem;
      font-family: PingFangSC-Regular;
      color: #CCC;
    }

    .pwd_text {
      margin-top: .36rem;
    }

    #userName, #pwd {
      box-sizing: border-box;
      width: 100%;
      height: .62rem;
      padding: 0 .31rem;
      border: none;
      outline: none;
      border-radius: .31rem;
      background-color: #FAFAFA;
      font-size: .24rem;
      font-family: PingFangSC-Regular;
      color: #333;
    }

    .submit-bt {
      box-sizing: border-box;
      width: 100%;
      height: .62rem;
      margin-top: .55rem;
      border: none;
      outline: none;
      border-radius: .31rem;
      background-color: #4DC4FF;
      font-size: .24rem;
      color: #fff;
    }
  }

}
</style>
