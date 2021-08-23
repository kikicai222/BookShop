<template>
  <div class="login">
    <div class="login_box">

      <div class="box_img">
        <img src="../../assets/logo.png" alt="" />
      </div>

      <el-form label-width="80px" 
               class="login_form" 
               :model="loginForm"
               :rules="loginFormRules"
               ref="loginFormRef">
        
        <el-form-item label="用户名" prop="username">
          <el-input v-model="loginForm.username"></el-input>
        </el-form-item>
        
        <el-form-item label="密码" prop="password">
          <el-input v-model="loginForm.password" type="password"></el-input>
        </el-form-item>

        <el-form-item class="btn">
          <el-button type="primary" 
          @click="submitForm()">登录</el-button>

          <el-button @click="resetForm()">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      loginFormRules: {    //添加验证规则
        username: [
          {required: true, message: "请输入用户名", trigger: "blur"},
          {min: 3, max: 14, message: "长度在3到14个字符之间", trigger: "blur"}
        ],
        password: [
          {required: true, message: "请输入密码", trigger: "blur"},
          {min: 6, max: 15, message: "长度在6到15个字符之间", trigger: "blur"}
        ],
      }
    }
  },
  methods: {
    resetForm() {   //点击重置方法
      //console.log(this);
      this.$refs.loginFormRef.resetFields();
    },
    submitForm() {   //登录前的预验证
      this.$refs.loginFormRef.validate( async valid => {
        //console.log(valid);
        if (!valid) return;
        const { data: res } = await this.$http.post('login', this.loginForm)
        //console.log(res);
        if (res.meta.status !== 200) return this.$message.error('登录失败');
        this.$message({
          message: '登录成功',
          type: 'success'
        });

        //1、将登录成功后的token,保存到客户端的sessionStorage中
           // 1.1、项目中除了登录以外的其他api接口，必须在登录之后才能访问，所以保存token
           // 1.2、token只应在当前网站打开期间生效，所以将token保存在sessionStorage中
        window.sessionStorage.setItem("token", res.data.token);
        //2、通过路由跳转到后台主页
        this.$router.push('/home');
      })
    },

  }
};
</script>
<style scoped>
.login {
  background-color: aqua;
  height: 100%;
}
.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
  .box_img {
  height: 120px;
  width: 120px;
  border: 1 solid #eee;
  border-radius: 50%;
  padding: 10px;
  box-shadow: 0 0 10px #ddd;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
}
  .box_img img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #eee;
}
.login_form {
  position: absolute;
  bottom: 0;
  width: 80%;
  padding: 0 20px;

}
.btn {
  display: flex;
  justify-content: center;
}
</style>