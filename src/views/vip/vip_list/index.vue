<template>
  <el-row>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-input
          placeholder="输入会员编号搜索"
          v-model="searchUsername"
          clearable
          class="w-200"
          @keyup.enter.native="searchUserList"
        />
        <el-button
          type="success"
          class="el-icon-search ml-5"
          @click="searchUserList"
          >搜索</el-button
        >
        <el-button
          class="float-right"
          type="primary"
          icon="el-icon-plus"
          @click="add"
          >新增</el-button
        >
      </div>
      <el-table v-loading="isTableLoading" :data="formData">
        <el-table-column prop="number" label="会员编号"></el-table-column>
        <el-table-column prop="username" label="会员账号"></el-table-column>
        <el-table-column prop="nickName" label="会员昵称"></el-table-column>
        <el-table-column prop="sex" label="性别"></el-table-column>
        <el-table-column prop="phone" label="电话"></el-table-column>
        <el-table-column prop="score" label="当前积分"></el-table-column>
        <el-table-column prop="allScore" label="总积分"></el-table-column>
        <el-table-column prop="memberLevelName" label="等级"></el-table-column>
        <el-table-column label="创建时间">
          <template slot-scope="scope">
            <span>{{ scope.row.createTime | formatDateTime }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" align="center" width="150">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              @click.stop="edit(scope.row)"
            ></el-button>
            <delete-button
              :ref="scope.row.id"
              :id="scope.row.id"
              @start="deleteUser"
            />
          </template>
        </el-table-column>
      </el-table>
      <pagination ref="Pagination" @getNewData="getUserList"></pagination>
    </el-card>
    <add-vip ref="AddVip" @update="getUserList"></add-vip>
    <edit-vip ref="EditVip" @update="getUserList"></edit-vip>
  </el-row>
</template>

<script>
import { getUserListApi, deleteUserApi } from "@/api/user";
import AddVip from "./add";
import EditVip from "./edit";
import { objectEvaluate } from "@/utils/common";

export default {
  name: "VipList",
  components: { AddVip, EditVip },
  data() {
    return {
      searchUsername: "",
      searchDeptId: "",
      formData: [],
      isTableLoading: false,
      dept: [],
      deptTree: [],
      searchDeptName: ""
    };
  },
  mounted() {
    this.getUserList();
  },
  methods: {
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
        state: 0
      };
      getUserListApi(param).then(result => {
        this.isTableLoading = false;
        let response = result.resultParam.userDtoList;
        this.formData = response.list;
        pagination.total = response.total;
      });
    },
    add() {
      let _this = this.$refs.AddVip;
      _this.visible = true;
    },
    edit(obj) {
      let _this = this.$refs.EditVip;
      delete obj.jobId;
      obj.rolesId = obj.roles.map(item => item.id);
      objectEvaluate(_this.form, obj);
      _this.visible = true;
    },
    deleteUser(id) {
      deleteUserApi({ ids: id })
        .then(() => {
          this.getUserList();
          this.$refs[id].close();
        })
        .catch(() => {
          this.$refs[id].stop();
        });
    }
  }
};
</script>
