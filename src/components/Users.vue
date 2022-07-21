<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片 -->
    <el-card class="box-card" style="margin-top: 15px">
      <div slot="header" class="clearfix">
        <div style="margin-top: 15px; float: left">
          <el-input
            placeholder="请输入内容"
            v-model="users.query"
            class="input-with-select"
            clearable
          >
            <el-button slot="append" icon="el-icon-search" @click="getUsers"></el-button>
          </el-input>
        </div>
        <el-button type="primary" @click="dialogFormVisible = true"
          >添加用户</el-button
        >
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
            <el-button type="primary" icon="el-icon-edit" @click="editDialog(scope.row)"></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              @click="del(scope.row.id)"
            ></el-button>
            <el-button type="warning" icon="el-icon-setting" @click="Jurisdiction(scope.row)"></el-button>
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
    <el-dialog title="添加用户对话框" :visible.sync="dialogFormVisible" @close="resetForm">
      <el-form label-width="100px" :model="dataObj" :rules="rules" ref="formRef">
        <el-form-item label="用户名" prop="username">
          <el-input style="width: 90%" v-model="dataObj.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input style="width: 90%" v-model="dataObj.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input style="width: 90%" v-model="dataObj.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input style="width: 90%" v-model="dataObj.mobile"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑 -->
    <el-dialog title="编辑用户" :visible.sync="editDialogVisible">
      <el-form label-width="100px" :model="editObj" :rules="rules">
        <el-form-item label="用户名">
          <el-input v-model="editObj.username" style="width:90%" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editObj.email" style="width:90%"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="editObj.mobile" style="width:90%"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="btn">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 分配权限 -->
    <el-dialog title="分配角色" :visible.sync="dialogJurisdiction">
     <div>
      <p>当前的用户：{{roles.username}}</p>
      <p>当前的角色：{{roles.role_name}}</p>
      <p>分配新角色：
        <el-select v-model="roleId" placeholder="请选择">
          <el-option v-for="item in rolesList" :key="item.id" :label="item.roleName" :value="item.id">
        </el-option>
  </el-select>
      </p>
     </div>
  <div slot="footer">
    <el-button @click="dialogJurisdiction = false">取 消</el-button>
    <el-button type="primary" @click="button">确 定</el-button>
  </div>
</el-dialog>
  </div>
</template>

<script>
import { getUsers, delUser, updateState, addUsers, editUsers,getRoles,putRoles} from "@/api/users";

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
      dialogFormVisible: false,
      dataObj: {
        username: "",
        password: "",
        email: "",
        mobile: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        email: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
        mobile: [{ required: true, message: "请输入手机号", trigger: "blur" }],
      },
      editDialogVisible:false,
      editObj:{
        id:'',
        email:'',
        mobile:'',
      },
      dialogJurisdiction:false,
      roles:{},
      rolesList:[],
      roleId:'',
  
        id:'',
        rid:'',
      
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
    async onSubmit() {
      try {
        await addUsers(this.dataObj);
        this.getUsers();
        this.dialogFormVisible = false;
        this.$message.success('添加成功')
      } catch (err) {
        console.log(err);
      }
      },
    resetForm(){
      this.$refs.formRef.resetFields()
    },
    editDialog(row){
      this.editObj = { ...row }
      this.editDialogVisible=true
    },
    async btn(){
       await editUsers(this.editObj)
        this.getUsers();
       this.editDialogVisible = false
    },
    async  Jurisdiction(row){
      this.roles={...row}
      const res=await getRoles()
      // console.log(res);
      this.rolesList=res.data.data
      this.dialogJurisdiction=true
    },
    async button(){
      try{
       const res5=await putRoles({id:this.roles.id,rid:this.roleId})
       console.log(res5);
      //  this.getUsers()
      //  this.dialogJurisdiction=false
      }catch(err){
        console.log(err);
      }
      
    }
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
  // float: left;
  margin-top: 15px;
  margin-left: 20px;
}
.el-table {
  margin-bottom: 20px;
}
.el-dialog {
  padding: 0;
}
</style>
