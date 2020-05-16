<template>
  <el-card class="box-card">
    <el-form :model="form" :rules="rules" ref="Form" label-width="100px">
      <row-col>
        <el-form-item label="会员编号" prop="userMember">
          <el-input v-model="form.userMember"></el-input>
        </el-form-item>
        <el-form-item label="金额" prop="price">
          <el-input-number
              v-model="form.price"
              controls-position="right"
              :precision="2"
              :min="0"/>
        </el-form-item>
        <el-form-item>
          <submit-button ref="SubmitButton" @submit="submitForm" text="兑换"/>
        </el-form-item>
      </row-col>
    </el-form>
  </el-card>
</template>

<script>
  import {exchangeApi} from '@/api/system'

  export default {
    name: "PointConversion",
    data() {
      return {
        form: {
          userMember: '',
          price: 0
        },
        rules: {
          userMember: {required: true, message: '请输入会员编号', trigger: 'blur'},
          price: {required: true, message: '请输入金额', trigger: 'change'}
        }
      }
    },
    methods: {
      submitForm() {
        this.$refs['Form'].validate((valid) => {
          if (valid) {
            let data = {...this.form};
            this.$refs.SubmitButton.start();
            exchangeApi(data).then(() => {
              this.$refs.SubmitButton.stop();
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
