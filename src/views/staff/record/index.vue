<template>
  <div id="record">
    <el-tabs type="border-card" v-model="active">
      <el-tab-pane label="商品兑换记录" name="商品兑换记录">
        <goods-record />
      </el-tab-pane>
      <el-tab-pane label="积分兑换记录" name="积分兑换记录">
        <point-record />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import PointRecord from "./point";
import GoodsRecord from "./goods";

export default {
  name: "Record",
  components: { PointRecord, GoodsRecord },
  data() {
    return {
      active: "商品兑换记录"
    };
  }
};
</script>

<style lang="scss">
#record {
  .el-tabs__content {
    padding: 0;
  }
}
</style>
