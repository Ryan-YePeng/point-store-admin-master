<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>会员等级列表</span>
      <el-button class="float-right" type="primary" icon="el-icon-plus" @click="add">新增</el-button>
    </div>
    <element-table ref="ElementTable" :data="formData">
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column prop="number" label="编号"></el-table-column>
      <el-table-column prop="scoreFloor" label="积分下限"></el-table-column>
      <el-table-column prop="scoreCeil" label="积分上限"></el-table-column>
      <el-table-column label="操作" fixed="right" align="center" width="150">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" @click.stop="edit(scope.row)"></el-button>
          <delete-button
              :ref="scope.row.id"
              :id="scope.row.id"
              @start="deleteLevel"/>
        </template>
      </el-table-column>
    </element-table>
    <add-level ref="AddLevel" @update="listMemberLevel"/>
    <edit-level ref="EditLevel" @update="listMemberLevel"/>
  </el-card>
</template>

<script>
  import {listMemberLevelApi, delMemberLevelApi} from '@/api/level'
  import AddLevel from './add'
  import EditLevel from './edit'
  import {objectEvaluate} from "@/utils/common";

  export default {
    name: "Level",
    components: {AddLevel, EditLevel},
    data() {
      return {
        formData: []
      }
    },
    mounted() {
      this.listMemberLevel()
    },
    methods: {
      listMemberLevel() {
        this.$refs.ElementTable.start();
        listMemberLevelApi().then(result => {
          this.$refs.ElementTable.stop();
          this.formData = result.resultParam.memberLevelList
        })
      },
      add() {
        this.$refs.AddLevel.visible = true
      },
      edit(obj) {
        let _this = this.$refs.EditLevel;
        objectEvaluate(_this.form, obj);
        _this.visible = true
      },
      deleteLevel(id) {
        delMemberLevelApi({id: id})
          .then(() => {
            this.listMemberLevel();
            this.$refs[id].close()
          })
          .catch(() => {
            this.$refs[id].stop();
          })
      }
    }
  }
</script>




