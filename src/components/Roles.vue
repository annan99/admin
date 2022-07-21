<template>
    <div>
     <el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>活动管理</el-breadcrumb-item>
  <el-breadcrumb-item>活动列表</el-breadcrumb-item>
  <el-breadcrumb-item>活动详情</el-breadcrumb-item>
</el-breadcrumb>

<el-card>
<el-button type="primary">添加角色</el-button>
<!-- 表格 -->
  <el-table
    :data="rolesList"
    style="width: 100%;margin-top:10px;" border>
    <el-table-column type="expand">
      <template>
        <el-form label-position="left" inline class="demo-table-expand">
         
        </el-form>
      </template>
    </el-table-column>
    <el-table-column
      label="#"
      type="index" width="50px">
    </el-table-column>
    <el-table-column
      label="角色名称"
      prop="roleName">
    </el-table-column>
    <el-table-column
      label="角色描述"
      prop="roleDesc">
    </el-table-column>
    <el-table-column
      label="操作"
      prop="desc">
     <template>
            <el-button type="primary" icon="el-icon-edit">编辑</el-button>
            <el-button type="danger" icon="el-icon-delete">删除</el-button>
            <el-button type="warning" icon="el-icon-setting">分配权限</el-button>
          </template>
    </el-table-column>
  </el-table>
  </el-card>
    </div>
</template>

<script>
import {getRoles} from '@/api/roles'
    export default {
        created(){
          this.getRoles()
        },
        data(){
            return{
                rolesList:[]
            }
        },
        methods:{
        async getRoles(){
            const res=await getRoles()
            // console.log(res);
            this.rolesList=res.data.data
          }
        }
    }
</script>

<style lang="less" scoped>
 .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
  .el-card{
    margin-top: 15px;
  }
</style>