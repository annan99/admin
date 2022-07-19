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
        <div style="margin-top: 15px; float: left">
          <el-input
            placeholder="请输入内容"
            v-model="input"
            class="input-with-select"
          >
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </div>
        <el-button type="primary">主要按钮</el-button>
      </div>

      <!-- table表格 -->
      <el-table :data="usersList" border>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="username" label="姓名"></el-table-column>
        <el-table-column prop="mobile" label="电话"></el-table-column>
        <el-table-column prop="role_name" label="角色"></el-table-column>
        <el-table-column label="状态">
          <template v-slot="scope">
            <el-switch
              v-model="scope.row.mg_state"
              active-color="#13ce66"
              inactive-color="#eee"
              @change="updateState(scope.row)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template v-slot="scope">
            <el-button type="primary" icon="el-icon-edit"></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              @click="del(scope.row.id)"
            ></el-button>
            <el-button type="warning" icon="el-icon-setting"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="users.pagenum"
        :page-sizes="[1, 2, 3, 4, 5, 6]"
        :page-size="users.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import { getUsers, delUser, updateState } from "@/api/users";

export default {
  created() {
    this.getUsers();
  },
  data() {
    return {
      input: "",
      users: {
        query: "",
        pagenum: 1,
        pagesize: 6,
      },
      usersList: [],
      total: null,
      uId: 0,
      type: false,
    };
  },
  methods: {
    async getUsers() {
      try {
        const res = await getUsers(this.users);
        //  console.log(res);
        this.usersList = res.data.data.users;
        this.total = res.data.data.total;
      } catch (err) {
        console.log(err);
      }
    },
    handleCurrentChange(pagenum) {
      this.users.pagenum = pagenum;
      this.getUsers();
    },
    handleSizeChange(pagesize) {
      this.users.pagesize = pagesize;
      this.getUsers();
    },
    async del(id) {
      try {
        await this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
          confirmButtonText: "ok",
          cancelButtonText: "cancel",
          type: "warning",
        });
        if (this.usersList.length === 1 && this.users.pagenum > 1) {
          this.users.pagenum--;
        }
        await delUser(id);
        this.$message.success("删除成功");
        this.getUsers();
      } catch (error) {
        this.$message("已取消删除");
      }
    },
    async updateState(row) {
      const uId = row.id;
      const type = row.mg_state;
      try {
        const res2 = await updateState({ uId, type });
        console.log(res2);
      } catch (err) {
        console.log(err);
      }
    },
  },
};
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
  clear: both;
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
.box-card {
  width: 100%;
}
.el-input {
  width: 25vw;
}
.el-button {
  float: left;
  margin-top: 15px;
  margin-left: 20px;
}
.el-table {
  margin-bottom: 20px;
}
</style>
