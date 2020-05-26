<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <el-input
        placeholder="输入编号搜索"
        v-model="searchNumber"
        clearable
        class="w-200"
        @keyup.enter.native="pageScoreOrders"
      />
      <el-button
        type="success"
        class="el-icon-search ml-5"
        @click="pageScoreOrders"
        >搜索</el-button
      >
    </div>
    <element-table ref="ElementTable" :data="formData">
      <el-table-column prop="number" label="兑换编号"></el-table-column>
      <el-table-column prop="userNumber" label="会员编号"></el-table-column>
      <el-table-column prop="userName" label="会员昵称"></el-table-column>
      <el-table-column prop="userPhone" label="电话"></el-table-column>
      <el-table-column prop="tellerNumber" label="柜员编号"></el-table-column>
      <el-table-column prop="price" label="兑换金额"></el-table-column>
      <el-table-column prop="score" label="兑换积分"></el-table-column>
      <el-table-column label="兑换时间">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime | formatDateTime }}</span>
        </template>
      </el-table-column>
    </element-table>
    <pagination ref="Pagination" @getNewData="pageScoreOrders" />
  </el-card>
</template>

<script>
import { pageScoreOrdersApi } from "@/api/system";

export default {
  name: "PointRecord",
  data() {
    return {
      formData: [],
      searchNumber: ""
    };
  },
  mounted() {
    this.pageScoreOrders();
  },
  methods: {
    pageScoreOrders() {
      let pagination = this.$refs.Pagination;
      let param = {
        current: pagination.current,
        size: pagination.size,
        number: this.searchNumber
      };
      this.$refs.ElementTable.start();
      pageScoreOrdersApi(param).then(result => {
        this.$refs.ElementTable.stop();
        let response = result.resultParam.scoreOrdersPage;
        this.formData = response.records;
        pagination.total = response.total;
      });
    }
  }
};
</script>
