<template>
    <div>
        <!-- 面包屑 -->
     <el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>用户管理</el-breadcrumb-item>
  <el-breadcrumb-item>用户列表</el-breadcrumb-item>
     </el-breadcrumb>

       <!-- 卡片 -->
     <el-card class="box-card">
  <div slot="header" class="clearfix">
    <div style="margin-top: 15px;float:left;">
  <el-input placeholder="请输入内容" v-model="input" class="input-with-select">
    <el-button slot="append" icon="el-icon-search"></el-button>
  </el-input>
</div>
    <el-button type="primary">主要按钮</el-button>
  </div>

  <div v-for="o in 4" :key="o" class="text item">
    {{'列表内容 ' + o }}
  </div>
</el-card>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                 input: '',
            }
        },
    }
</script>

<style lang="less" scoped>
 .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 480px;
  }
   .el-select .el-input {
    width: 130px;
  }
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
  .box-card{
    width: 100%;
  }
  .el-input {
    width: 25vw;
  }
  .el-button{
    float: left;
    margin-top: 15px;
    margin-left: 20px;
  }
</style>