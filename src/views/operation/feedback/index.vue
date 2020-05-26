<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <el-input
        placeholder="输入编号搜索"
        v-model="searchUserNumber"
        clearable
        class="w-200"
        @keyup.enter.native="pageFeedBack"
      />
      <el-button
        type="success"
        class="el-icon-search ml-5"
        @click="pageFeedBack"
        >搜索</el-button
      >
    </div>
    <element-table ref="ElementTable" :data="formData">
      <el-table-column prop="userNumber" label="顾客编号"></el-table-column>
      <el-table-column prop="userNickName" label="姓名"></el-table-column>
      <el-table-column prop="userPhone" label="联系方式"></el-table-column>
      <el-table-column prop="content" label="反馈内容"></el-table-column>
      <el-table-column label="提交时间">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime | formatDateTime }}</span>
        </template>
      </el-table-column>
    </element-table>
    <pagination ref="Pagination" @getNewData="pageFeedBack" />
  </el-card>
</template>

<script>
import { pageFeedBackApi } from "@/api/feedBack";

export default {
  name: "FeedBack",
  data() {
    return {
      formData: [],
      searchUserNumber: ""
    };
  },
  mounted() {
    this.pageFeedBack();
  },
  methods: {
    pageFeedBack() {
      let pagination = this.$refs.Pagination;
      let param = {
        current: pagination.current,
        size: pagination.size,
        userNumber: this.searchUserNumber
      };
      this.$refs.ElementTable.start();
      pageFeedBackApi(param).then(result => {
        this.$refs.ElementTable.stop();
        let response = result.resultParam.feedBackPage;
        this.formData = response.records;
        pagination.total = response.total;
      });
    }
  }
};
</script>
