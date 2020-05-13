<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>积分列表</span>
      <el-button class="float-right" type="primary" icon="el-icon-plus" @click="add">新增</el-button>
    </div>
    <element-table ref="ElementTable" :data="formData">
      <el-table-column prop="number" label="积分编号"></el-table-column>
      <el-table-column prop="price" label="兑换金额"></el-table-column>
      <el-table-column prop="score" label="兑换积分"></el-table-column>
      <el-table-column prop="enable" label="状态">
        <template slot-scope="scope">
          <el-switch
              v-model="scope.row.enable"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="changeEnable(scope.row)"/>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" align="center" width="150">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" @click.stop="edit(scope.row)"></el-button>
          <delete-button
              :ref="scope.row.id"
              :id="scope.row.id"
              @start="delScore"/>
        </template>
      </el-table-column>
    </element-table>
    <add-point ref="AddPoint" @update="listScore"/>
    <edit-point ref="EditPoint" @update="listScore"/>
  </el-card>
</template>

<script>
  import {listScoreApi, delScoreApi, enableScoreApi, disableScoreApi} from '@/api/point'
  import AddPoint from './add'
  import EditPoint from './edit'
  import {objectEvaluate} from "@/utils/common";

  export default {
    name: "Point",
    components: {AddPoint, EditPoint},
    data() {
      return {
        formData: [],
        searchNumber: ''
      }
    },
    computed: {
      baseUrl() {
        return process.env.VUE_APP_BASE_API
      }
    },
    mounted() {
      this.listScore()
    },
    methods: {
      listScore() {
        this.$refs.ElementTable.start();
        listScoreApi().then(result => {
          this.$refs.ElementTable.stop();
          this.formData = result.resultParam.scoreList
        })
      },
      changeEnable(obj) { // 改变状态
        if (obj.enable) {
          enableScoreApi({id: obj.id}).then(result => {
            if (result.status !== 200) obj.enable = !obj.enable
          })
        } else {
          disableScoreApi({id: obj.id}).then(result => {
            if (result.status !== 200) obj.enable = !obj.enable
          })
        }
      },
      add() {
        this.$refs.AddPoint.visible = true
      },
      edit(obj) {
        let _this = this.$refs.EditPoint;
        objectEvaluate(_this.form, obj);
        _this.visible = true
      },
      delScore(id) {
        delScoreApi({id: id})
          .then(() => {
            this.listScore();
            this.$refs[id].close()
          })
          .catch(() => {
            this.$refs[id].stop();
          })
      }
    }
  }
</script>
