<template>
  <el-dialog
    title="编辑会员"
    width="600px"
    @close="cancel"
    :close-on-click-modal="false"
    :visible.sync="visible"
  >
    <el-form :model="form" :rules="rules" ref="Form" label-width="100px">
      <el-form-item label="会员账号">
        <el-input v-model="form.username" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="会员昵称" prop="nickName">
        <el-input v-model="form.nickName"></el-input>
      </el-form-item>
      <el-form-item label="会员电话" prop="phone">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="form.sex">
          <el-radio label="男"></el-radio>
          <el-radio label="女"></el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <submit-button ref="SubmitButton" @submit="submitForm" />
    </div>
  </el-dialog>
</template>

<script>
import { editUserApi } from "@/api/user";
import { validatePhone } from "@/utils/validate";

export default {
  name: "EditVip",
  data() {
    return {
      normalizer(node) {
        return {
          label: node.name
        };
      },
      visible: false,
      form: {
        id: null,
        username: "",
        number: "",
        nickName: "",
        sex: "男",
        phone: "",
        enabled: true,
        rolesId: [3]
      },
      options: [],
      rules: {
        phone: [
          { required: true, message: "请输入会员电话", trigger: "blur" },
          { validator: validatePhone, trigger: "blur" }
        ],
        nickName: { required: true, message: "请输入会员昵称", trigger: "blur" }
      }
    };
  },
  methods: {
    submitForm() {
      this.$refs["Form"].validate(valid => {
        if (valid) {
          let data = { ...this.form };
          delete data.username;
          this.$refs.SubmitButton.start();
          editUserApi(data)
            .then(() => {
              this.$refs.SubmitButton.stop();
              this.$emit("update");
              this.cancel();
            })
            .catch(() => {
              this.$refs.SubmitButton.stop();
            });
        } else {
          return false;
        }
      });
    },
    cancel() {
      this.visible = false;
      Object.assign(this.$data.form, this.$options.data().form);
      this.$refs["Form"].resetFields();
    }
  }
};
</script>
