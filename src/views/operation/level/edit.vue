<template>
  <el-dialog
      title="编辑等级"
      width="500px"
      @close="cancel"
      :close-on-click-modal="false"
      :visible.sync="visible">
    <el-form :model="form" :rules="rules" ref="Form" label-width="80px">
      <el-form-item label="名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="编号" prop="number">
        <el-input v-model="form.number"></el-input>
      </el-form-item>
      <el-form-item label="积分下限" prop="scoreFloor">
        <el-input-number
            v-model="form.scoreFloor"
            controls-position="right"
            :precision="0"
            :min="0">
        </el-input-number>
      </el-form-item>
      <el-form-item label="积分上限" prop="scoreCeil">
        <el-input-number
            v-model="form.scoreCeil"
            controls-position="right"
            :precision="0"
            :min="0">
        </el-input-number>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <submit-button ref="SubmitButton" @submit="submitForm"/>
    </div>
  </el-dialog>
</template>

<script>
  import {editMemberLevelApi} from '@/api/level'

  export default {
    name: "EditLevel",
    data() {
      return {
        visible: false,
        form: {
          id: null,
          name: '',
          number: '',
          scoreFloor: 0,
          scoreCeil: 0
        },
        rules: {
          name: {required: true, message: '请输入名称', trigger: 'blur'},
          number: {required: true, message: '请输入编号', trigger: 'blur'},
          scoreFloor: {required: true, message: '请输入积分下限', trigger: 'change'},
          scoreCeil: {required: true, message: '请输入积分上限', trigger: 'change'}
        }
      }
    },
    methods: {
      submitForm() {
        this.$refs['Form'].validate((valid) => {
          if (valid) {
            let data = {...this.form};
            this.$refs.SubmitButton.start();
            editMemberLevelApi(data).then(() => {
              this.$refs.SubmitButton.stop();
              this.$emit('update');
              this.cancel()
            }).catch(() => {
              this.$refs.SubmitButton.stop();
            })
          } else {
            return false;
          }
        });
      },
      cancel() {
        this.visible = false;
        Object.assign(this.$data.form, this.$options.data().form);
        this.$refs['Form'].resetFields()
      }
    }
  }
</script>
