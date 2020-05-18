<template>
  <el-dialog
      title="新增商品"
      width="600px"
      @close="cancel"
      :close-on-click-modal="false"
      :visible.sync="visible">
    <el-form :model="form" :rules="rules" ref="Form" label-width="100px">
      <row-col>
        <el-form-item label="商品名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
      </row-col>
      <row-col>
        <el-form-item label="商品价格" prop="price">
          <el-input-number
              v-model="form.price"
              controls-position="right"
              :precision="2"
              :min="0">
          </el-input-number>
        </el-form-item>
        <el-form-item slot="r" label="商品积分" prop="score">
          <el-input-number
              v-model="form.score"
              controls-position="right"
              :precision="0"
              :min="0">
          </el-input-number>
        </el-form-item>
      </row-col>
      <el-form-item label="商品图片" prop="picture">
        <image-uploader-plus ref="ImageUploaderPlus" :image-url="form.picture" @getImage="getImage"/>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <submit-button ref="SubmitButton" @submit="submitForm"/>
    </div>
  </el-dialog>
</template>

<script>
  import {addGoodsApi} from '@/api/goods'
  import ImageUploaderPlus from './ImageUploaderPlus'

  export default {
    name: "AddGoods",
    components: {ImageUploaderPlus},
    data() {
      return {
        visible: false,
        form: {
          name: '', // 名称
          picture: '', // 图片
          price: 0, // 价格
          score: 0, // 积分
        },
        rules: {
          name: {required: true, message: '请输入名称', trigger: 'blur'},
          picture: {required: true, message: '请上传图片', trigger: 'change'},
          price: {required: true, message: '请输入价格', trigger: 'blur'},
          score: {required: true, message: '请输入积分', trigger: 'blur'}
        }
      }
    },
    methods: {
      getImage(value) {
        this.form.picture = value;
        this.$refs['Form'].validateField('picture')
      },
      submitForm() {
        this.$refs['Form'].validate((valid) => {
          if (valid) {
            let data = {...this.form};
            this.$refs.SubmitButton.start();
            addGoodsApi(data).then(() => {
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
        this.$refs['Form'].resetFields();
        this.$refs['ImageUploaderPlus'].clearFiles();
      }
    }
  }
</script>
