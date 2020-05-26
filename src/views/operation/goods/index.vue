<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <el-input
        placeholder="输入商品编号搜索"
        v-model="searchNumber"
        clearable
        class="w-200"
        @keyup.enter.native="pageGoods"
      />
      <el-button type="success" class="el-icon-search ml-5" @click="pageGoods"
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
    <element-table ref="ElementTable" :data="formData">
      <el-table-column prop="number" label="编号"></el-table-column>
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column label="展示图片">
        <template slot-scope="scope">
          <el-avatar
            shape="square"
            :size="44"
            :src="baseUrl + scope.row.picture"
          >
            <img src="../../../assets/notFound.png" alt="展示图片" />
          </el-avatar>
        </template>
      </el-table-column>
      <el-table-column prop="price" label="商品价格"></el-table-column>
      <el-table-column prop="score" label="兑换积分"></el-table-column>
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
            @start="delGoods"
          />
        </template>
      </el-table-column>
    </element-table>
    <pagination ref="Pagination" @getNewData="pageGoods" />
    <add-goods ref="AddGoods" @update="pageGoods" />
    <edit-goods ref="EditGoods" @update="pageGoods" />
  </el-card>
</template>

<script>
import { pageGoodsApi, delGoodsApi } from "@/api/goods";
import AddGoods from "./add";
import EditGoods from "./edit";
import { objectEvaluate } from "@/utils/common";

export default {
  name: "Goods",
  components: { AddGoods, EditGoods },
  data() {
    return {
      formData: [],
      searchNumber: ""
    };
  },
  computed: {
    baseUrl() {
      return process.env.VUE_APP_BASE_API;
    }
  },
  mounted() {
    this.pageGoods();
  },
  methods: {
    pageGoods() {
      let pagination = this.$refs.Pagination;
      let param = {
        current: pagination.current,
        size: pagination.size,
        number: this.searchNumber
      };
      this.$refs.ElementTable.start();
      pageGoodsApi(param).then(result => {
        this.$refs.ElementTable.stop();
        let response = result.resultParam.goodsPage;
        this.formData = response.records;
        pagination.total = response.total;
      });
    },
    add() {
      this.$refs.AddGoods.visible = true;
    },
    edit(obj) {
      let _this = this.$refs.EditGoods;
      objectEvaluate(_this.form, obj);
      _this.visible = true;
    },
    delGoods(id) {
      delGoodsApi({ id: id })
        .then(() => {
          this.pageGoods();
          this.$refs[id].close();
        })
        .catch(() => {
          this.$refs[id].stop();
        });
    }
  }
};
</script>
