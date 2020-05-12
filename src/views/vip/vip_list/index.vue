<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <el-input placeholder="输入编号搜索" v-model="searchUserNumber" clearable class="w-200"
                @keyup.enter.native="searchDept"/>
      <el-button type="success" class="el-icon-search ml-5" @click="searchDept">搜索</el-button>
      <el-button class="float-right" type="primary" icon="el-icon-plus" @click="add">新增</el-button>
    </div>
    <element-table ref="ElementTable" :data="formData">
      <el-table-column prop="name" label="部门名称"></el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-tag type="success" v-if="scope.row.enabled">启用</el-tag>
          <el-tag type="info" v-else>停用</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" align="center" width="150">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" @click.stop="edit(scope.row)"></el-button>
          <delete-button
              :ref="scope.row.id"
              :id="scope.row.id"
              @start="deleteDept"/>
        </template>
      </el-table-column>
    </element-table>
    <pagination ref="Pagination" @getNewData="pageFeedBack"/>
  </el-card>
</template>

<script>
  import {listMemberLevelApi} from '@/api/level'

  export default {
    name: "VipList",
    data() {
      return {
        formData: [],
        searchUserNumber: ''
      }
    },
    mounted() {
      this.listMemberLevel()
    },
    methods: {
      listMemberLevel() {
        listMemberLevelApi().then(result => {
          console.log(result)
        })
      }
    }
  }
</script>




