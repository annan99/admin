<template>
    <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>活动管理</el-breadcrumb-item>
  <el-breadcrumb-item>活动列表</el-breadcrumb-item>
  <el-breadcrumb-item>活动详情</el-breadcrumb-item>
</el-breadcrumb>

<el-card>
     <el-table
      :data="rightsList"
      style="width: 100%" border>
      <el-table-column
        label="#"
        type="index"
        width="50px">
      </el-table-column>
      <el-table-column
        prop="authName"
        label="权限名称"
        width="400px">
      </el-table-column>
      <el-table-column
        prop="path"
        label="路径">
      </el-table-column>
       <el-table-column
        prop="level"
        label="权限等级">
        <template v-slot="scope">
            <el-tag v-if="scope.row.level==='0'">等级一</el-tag>
            <el-tag type="success" v-else-if="scope.row.level==='1'">等级二</el-tag>
            <el-tag type="warning" v-else>等级三</el-tag>
        </template>
      </el-table-column>
    </el-table>
</el-card>
    </div>
</template>

<script>
import {getRights} from '@/api/rights'
    export default {
        created(){
            this.getRights()
        },
        data(){
            return{
                type:'',
                rightsList:[],
            }
        },
        methods:{
            async getRights(){
                const res=await getRights(this.type)
                // console.log(res);
                this.rightsList=res.data.data
            }
        }
    }
</script>

<style lang="less" scoped>

</style>