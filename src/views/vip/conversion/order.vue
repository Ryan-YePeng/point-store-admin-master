<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <el-input
        placeholder="输入编号搜索"
        v-model="searchNumber"
        clearable
        class="w-200"
        @keyup.enter.native="pageOrders"
      />
      <el-button type="success" class="el-icon-search ml-5" @click="pageOrders"
        >搜索</el-button
      >
    </div>
    <element-table ref="ElementTable" :data="formData">
      <el-table-column prop="number" label="兑换编号"></el-table-column>
      <el-table-column prop="userNumber" label="会员编号"></el-table-column>
      <el-table-column prop="userPhone" label="会员电话"></el-table-column>
      <el-table-column prop="goodsName" label="兑换商品"></el-table-column>
      <el-table-column prop="goodsScore" label="商品所需积分"></el-table-column>
      <el-table-column prop="count" label="兑换数量"></el-table-column>
      <el-table-column label="消耗积分">
        <template slot-scope="scope">
          <span>{{ scope.row.goodsScore * scope.row.count }}</span>
        </template>
      </el-table-column>
      <el-table-column label="兑换时间">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime | formatDateTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" align="center" width="100">
        <template slot-scope="scope">
          <el-button type="success" @click.stop="sure(scope.row.id)"
            >交易确认</el-button
          >
        </template>
      </el-table-column>
    </element-table>
    <pagination ref="Pagination" @getNewData="pageOrders" />
  </el-card>
</template>

<script>
import { pageOrdersApi, successExchangeApi } from "@/api/goods";

export default {
  name: "OrderList",
  data() {
    return {
      formData: [],
      searchNumber: ""
    };
  },
  mounted() {
    this.pageOrders();
  },
  methods: {
    sure(id) {
      this.$msgBox("确认交易完成？").then(() => {
        successExchangeApi({ id }).then(() => {
          this.pageOrders();
        });
      });
    },
    pageOrders() {
      let pagination = this.$refs.Pagination;
      let param = {
        current: pagination.current,
        size: pagination.size,
        number: this.searchNumber,
        state: 1
      };
      this.$refs.ElementTable.start();
      pageOrdersApi(param).then(result => {
        this.$refs.ElementTable.stop();
        let response = result.resultParam.ordersPage;
        this.formData = response.records;
        pagination.total = response.total;
      });
    }
  }
};
</script>
