<template>
  <div class="login-container">
    <div class="form-box">
      <el-form :model="loginForm" :rules="rules" ref="loginFormRef">
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            prefix-icon="el-icon-user-solid"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            prefix-icon="el-icon-lock"
          ></el-input>
        </el-form-item>
        <el-form-item class="btn-item">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { login } from "@/api/user";
export default {
  created() {
    // this.login()
  },
  data() {
    return {
      loginForm: {
        username: "admin",
        password: "123456",
      },
      rules: {
        username: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
          { min: 3, max: 8, message: "长度3到8之间", trigger: "blur" },
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 3, max: 8, message: "长度3到8之间", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    reset() {
      this.$refs.loginFormRef.resetFields();
    },
    async login() {
      try {
        await this.$refs.loginFormRef.validate();
        console.log("校验成功");
        try {
          const res = await login(this.loginForm);
          // console.log(res);   
          this.$store.commit("user/setUser", res.data.data.token);
          //  todo 把token存到vuex中并且持久化localStorage
          this.$router.push("/home").catch(()=>{});
          this.$message.success("登录成功");
        } catch (err) {
          console.log(err);
        }
      } catch (err) {
        this.$message.error("登陆失败");
      }
    },
    // async login(){
    //     try{
    //         const res=await login(this.loginForm)
    //         console.log(res);
    //     }catch(err){
    //         console.log(err);
    //     }
    // }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {},
};
</script>

<style scoped lang="less">
.login-container {
  width: 100vw;
  height: 100vh;
  background: url("@/assets/login-laopo.png") no-repeat center;
  background-size: cover;
  // background-color: #2b4b6b;
  display: flex;
  justify-content: center;
  align-items: center;
  .form-box {
    width: 450px;
    height: 240px;
    background-color: #fff;
    padding: 30px 15px;
    box-sizing: border-box;
    .btn-item {
      text-align: right;
    }
  }
}
</style>
