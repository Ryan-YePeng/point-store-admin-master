<template>
  <el-dialog
    title="新增角色"
    width="600px"
    @close="cancel"
    :close-on-click-modal="false"
    :visible.sync="visible"
  >
    <el-form :model="form" :rules="rules" ref="Form" label-width="120px">
      <row-col>
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item slot="r" label="角色权限" prop="permission">
          <el-input v-model="form.permission"></el-input>
        </el-form-item>
      </row-col>
      <el-form-item label="数据权限" v-if="form.dataScope === '自定义'">
        <tree-select
          v-model="form.deptIds"
          :options="dept"
          :normalizer="normalizer"
          multiple
          :flat="true"
          :default-expand-level="1"
          sort-value-by="INDEX"
          placeholder=""
        />
      </el-form-item>
      <el-form-item label="描述">
        <el-input type="textarea" v-model="form.remark"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <submit-button ref="SubmitButton" @submit="submitForm" />
    </div>
  </el-dialog>
</template>

<script>
import TreeSelect from "@riophae/vue-treeselect";
import { addRoleApi } from "@/api/role";

export default {
  name: "AddRole",
  components: { TreeSelect },
  props: {
    dept: {
      type: Array,
      default: () => []
    },
    level: {
      type: Number
    }
  },
  data() {
    return {
      normalizer(node) {
        return {
          label: node.name
        };
      },
      visible: false,
      form: {
        nameZh: "",
        name: "",
        dataScope: "本级",
        level: 1,
        permission: "",
        deptIds: [],
        remark: ""
      },
      rules: {
        name: { required: true, message: "请输入名称", trigger: "blur" },
        permission: {
          required: true,
          message: "请输入角色权限",
          trigger: "blur"
        },
        level: { required: true, message: "请输入角色级别", trigger: "blur" }
      }
    };
  },
  methods: {
    submitForm() {
      this.$refs["Form"].validate(valid => {
        if (valid) {
          let data = { ...this.form };
          this.$refs.SubmitButton.start();
          addRoleApi(data)
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

<style lang="scss">
.el-textarea__inner {
  height: 120px;
}
</style>
