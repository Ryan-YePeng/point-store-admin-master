<template>
  <div id="conversion">
    <el-tabs type="border-card" v-model="active">
      <el-tab-pane label="商品兑换" name="商品兑换">
        <goods-conversion/>
      </el-tab-pane>
      <el-tab-pane label="积分兑换" name="积分兑换">
        <point-conversion/>
      </el-tab-pane>
      <el-tab-pane label="订单列表" name="订单列表">
        <order-list/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import GoodsConversion from './goods'
  import OrderList from './order'
  import PointConversion from './point'

  export default {
    name: "Conversion",
    components: {GoodsConversion, PointConversion, OrderList},
    data() {
      return {
        active: '订单列表'
      }
    }
  }
</script>

<style lang="scss">
  #conversion {
    .el-tabs__content {
      padding: 0;
    }
  }
</style>
