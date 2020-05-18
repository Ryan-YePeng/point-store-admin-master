<template>
  <el-dialog
      title="新增积分"
      width="500px"
      @close="cancel"
      :close-on-click-modal="false"
      :visible.sync="visible">
    <el-form :model="form" :rules="rules" ref="Form" label-width="100px">
      <el-form-item label="消费金额" prop="price">
        <el-input-number
            v-model="form.price"
            controls-position="right"
            :precision="2"
            :min="0">
        </el-input-number>
      </el-form-item>
      <el-form-item label="兑换积分" prop="score">
        <el-input-number
            v-model="form.score"
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
  import {editScoreApi} from '@/api/point'

  export default {
    name: "EditPoint",
    data() {
      return {
        visible: false,
        form: {
          id: null,
          price: '', // 金额
          score: '', // 积分
        },
        rules: {
          price: {required: true, message: '请输入价格', trigger: 'change'},
          score: {required: true, message: '请输入积分', trigger: 'change'}
        }
      }
    },
    methods: {
      submitForm() {
        this.$refs['Form'].validate((valid) => {
          if (valid) {
            let data = {...this.form};
            this.$refs.SubmitButton.start();
            editScoreApi(data).then(() => {
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
