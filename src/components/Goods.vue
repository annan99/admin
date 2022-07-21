<template>
    <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>活动管理</el-breadcrumb-item>
  <el-breadcrumb-item>活动列表</el-breadcrumb-item>
  <el-breadcrumb-item>活动详情</el-breadcrumb-item>
</el-breadcrumb>

<el-card>
    <div slot="header" class="clearfix">
        <div style="margin-top: 15px; float: left">
          <el-input
          v-model="value"
            placeholder="请输入内容"
            class="input-with-select"
            clearable
          >
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </div>
        <el-button type="primary"
          >添加用户</el-button
        >
      </div>
      <!-- 表格 -->
      <el-table
    :data="goodsList"
    border
    style="width: 100%">
    <el-table-column
      type="index"
      label="#"
      width="50px"
      height="20px">
    </el-table-column>
    <el-table-column
      prop="goods_name"
      label="商品名称"
      width="600px">
    </el-table-column>
    <el-table-column
      prop="goods_price"
      label="商品价格(元)">
    </el-table-column>
      <el-table-column
      prop="goods_weight"
      label="商品重量">
    </el-table-column>
      <el-table-column
      prop="add_time"
      label="创建时间">
    </el-table-column>
      <el-table-column
      prop="address"
      label="操作"
      width="250px">
        <el-button type="primary" icon="el-icon-edit" mini>编辑</el-button>
        <el-button type="danger" icon="el-icon-delete" mini>删除</el-button>
    </el-table-column>
  </el-table>
</el-card>
    </div>
</template>

<script>
import {getGoods} from '@/api/goods'
    export default {
        created(){
            this.getGoods()
        },
        data(){
            return{
                value:'',
                goodsList:[],
                goodsObj:{
                    query:'',
                    pagenum:1,
                    pagesize:6,
                }
            }
        },
        methods:{
            async getGoods(){
               try{
                 const res=await getGoods(this.goodsObj)
                console.log(res);
                this.goodsList=res.data.data.goods
               }catch(err){
                console.log(err);
               }
            }
        }
    }
</script>

<style lang="less" scoped>
.el-input {
  width: 25vw;
}
.el-button {
  // float: left;
  margin-top: 15px;
  margin-left: 20px;
}
</style>