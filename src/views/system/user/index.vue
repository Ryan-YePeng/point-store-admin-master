<template>
  <el-row>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-input placeholder="输入用户名搜索" v-model="searchUsername" clearable class="w-200"
                  @keyup.enter.native="searchUserList"/>
        <el-button type="success" class="el-icon-search ml-5" @click="searchUserList">搜索</el-button>
        <el-button class="float-right" type="primary" icon="el-icon-plus" @click="add">新增</el-button>
      </div>
      <el-table v-loading="isTableLoading" :data="formData">
        <el-table-column prop="username" label="用户名"></el-table-column>
        <el-table-column prop="nickName" label="昵称"></el-table-column>
        <el-table-column prop="sex" label="性别"></el-table-column>
        <el-table-column prop="phone" label="电话"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-tag type="info" v-if="scope.row.enabled">正常</el-tag>
            <el-tag type="danger" v-else>禁用</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="创建时间">
          <template slot-scope="scope">
            <span>{{scope.row.createTime | formatDateTime}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" align="center" width="150">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" @click.stop="edit(scope.row)"></el-button>
            <delete-button
                :ref="scope.row.id"
                :id="scope.row.id"
                @start="deleteUser"/>
          </template>
        </el-table-column>
      </el-table>
      <pagination ref="Pagination" @getNewData="getUserList"></pagination>
    </el-card>
    <add-user ref="AddUser" @update="getUserList" :roleList="roleList"></add-user>
    <edit-user ref="EditUser" @update="getUserList" :roleList="roleList"></edit-user>
  </el-row>
</template>

<script>
  import {getUserListApi, deleteUserApi} from '@/api/user'
  import {getRoleListApi} from '@/api/role'
  import AddUser from './add'
  import EditUser from './edit'
  import {objectEvaluate, objectExchange} from "@/utils/common";

  export default {
    name: "User",
    components: {AddUser, EditUser},
    data() {
      return {
        searchUsername: '',
        searchDeptId: '',
        formData: [],
        isTableLoading: false,
        dept: [],
        deptTree: [],
        searchDeptName: '',
        roleList: [],
        treeProps: {
          label: 'name'
        }
      }
    },
    mounted() {
      this.getUserList();
      this.getRoleList()
    },
    methods: {
      getRoleList() {
        getRoleListApi({roleName: ''}).then(result => {
          this.roleList = result.resultParam.roleList;
        })
      },
      searchUserList() {
        this.searchDeptId = "";
        this.getUserList();
      },
      getUserList() {
        this.isTableLoading = true;
        let pagination = this.$refs.Pagination;
        let param = {
          current: pagination.current,
          size: pagination.size,
          deptId: this.searchDeptId,
          username: this.searchUsername,
          state: 1
        };
        getUserListApi(param).then(result => {
          this.isTableLoading = false;
          let response = result.resultParam.userDtoList;
          this.formData = response.list;
          pagination.total = response.total;
        })
      },
      add() {
        let _this = this.$refs.AddUser;
        _this.visible = true
      },
      edit(obj) {
        let _this = this.$refs.EditUser;
        delete obj.jobId;
        obj.rolesId = obj.roles.map(item => item.id);
        objectEvaluate(_this.form, obj);
        objectExchange(_this.FORM, _this.form);
        _this.initDept(obj.deptId);
        _this.visible = true
      },
      deleteUser(id) {
        deleteUserApi({ids: id})
          .then(() => {
            this.getUserList();
            this.$refs[id].close()
          })
          .catch(() => {
            this.$refs[id].stop();
          })
      }
    }
  }
</script>


