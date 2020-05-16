<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <el-input placeholder="输入商品编号搜索" v-model="searchNumber" clearable class="w-200"
                @keyup.enter.native="pageGoods"/>
      <el-button type="success" class="el-icon-search ml-5" @click="pageGoods">搜索</el-button>
    </div>
    <element-table ref="ElementTable" :data="formData">
      <el-table-column prop="number" label="编号"></el-table-column>
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column label="展示图片">
        <template slot-scope="scope">
          <el-avatar shape="square" :size="44" :src="baseUrl + scope.row.picture">
            <img src="../../../assets/notFound.png" alt="展示图片"/>
          </el-avatar>
        </template>
      </el-table-column>
      <el-table-column prop="price" label="商品价格"></el-table-column>
      <el-table-column prop="score" label="兑换积分"></el-table-column>
      <el-table-column label="操作" fixed="right" align="center" width="150">
        <template slot-scope="scope">
          <el-button type="primary" @click.stop="conversion(scope.row)">兑换</el-button>
        </template>
      </el-table-column>
    </element-table>
    <pagination ref="Pagination" @getNewData="pageGoods"/>
    <el-dialog
        title="兑换商品"
        width="400px"
        @close="cancel"
        :close-on-click-modal="false"
        :visible.sync="visible">
      <el-form :model="form" :rules="rules" ref="Form" label-width="100px">
        <el-form-item label="会员编号" prop="userNumber">
          <el-input v-model="form.userNumber"></el-input>
        </el-form-item>
        <el-form-item label="商品数量" prop="count">
          <el-input-number
              v-model="form.count"
              controls-position="right"
              :precision="0"
              :min="0"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="visible = false">取 消</el-button>
        <submit-button ref="SubmitButton" @submit="submitForm"/>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
  import {pageGoodsApi, exchangeGoodsApi} from '@/api/goods'

  export default {
    name: "GoodsConversion",
    data() {
      return {
        formData: [],
        searchNumber: '',
        visible: false,
        form: {
          count: 1,
          goodsId: null,
          userNumber: ''
        },
        rules: {
          userNumber: {required: true, message: '请输入会员编号', trigger: 'blur'},
          count: {required: true, message: '请输入商品数量', trigger: 'change'}
        }
      }
    },
    computed: {
      baseUrl() {
        return process.env.VUE_APP_BASE_API
      }
    },
    mounted() {
      this.pageGoods()
    },
    methods: {
      conversion(obj) {
        this.form.goodsId = obj.id;
        this.visible = true
      },
      submitForm() {
        this.$refs['Form'].validate((valid) => {
          if (valid) {
            let data = {...this.form};
            this.$refs.SubmitButton.start();
            exchangeGoodsApi(data).then(() => {
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
      },
      pageGoods() {
        let pagination = this.$refs.Pagination;
        let param = {
          current: pagination.current,
          size: pagination.size,
          number: this.searchNumber
        };
        this.$refs.ElementTable.start();
        pageGoodsApi(param).then(result => {
          this.$refs.ElementTable.stop();
          let response = result.resultParam.goodsPage;
          this.formData = response.records;
          pagination.total = response.total
        })
      }
    }
  }
</script>
