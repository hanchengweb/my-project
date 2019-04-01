<template>
   <div>
      <bread-crumb></bread-crumb>
      <el-form class="con" :model="goods" label-position="left">
        <div class="left">
          <el-form-item class="form-item" label="名称" prop="goodsName">
              <el-input class="input-width" v-model="goods.goodsName" placeholder="请输入名称"></el-input>
          </el-form-item>
          <el-form-item class="form-item" label="类别" prop="categoryId">
            <el-select class="input-width"  placeholder="请选择类别" v-model="goods.categoryId"  @cate-change="cateChange">
              <el-option  v-for="item in categoryList" :label="item.categoryName" :value="item.categoryId" :key="item.categoryId"></el-option>
              <!-- <el-option  label="类别1"></el-option> -->
            </el-select>
          </el-form-item>
          <el-form-item class="form-item" label="图片" prop="file">
            <el-upload class="upload-demo" action='' drag accept="image/*" :http-request="picUpload">
              <i class="el-icon-upload"></i>
              <div class="el-upload-text">将图片拖到此处,或<em>点击上传</em></div>
              <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </el-form-item>
        </div>
        <div class="right">
          <el-form-item class="form-item" label="价格" prop="price">
            <el-input class="input-width" v-model="goods.price" placeholder="请输入价格"></el-input>
          </el-form-item>
          <el-form-item class="form-item" label="数量" prop="stock">
            <el-input class="input-width" v-model="goods.stock" placeholder="请输入数量"></el-input>
          </el-form-item>
          <el-form-item class="form-item" label="描述" prop="goodsDesc">
            <el-input class="input-width" v-model="goods.goodsDesc" type="textarea" style="min-height:3.17rem;"></el-input>
          </el-form-item>
        </div>
      </el-form>
      <el-col :span="6" :offset="18">
        <el-button @click="handleCancel">取消</el-button>
        <el-button class="btn-color" @click="handleAddGoods" type="primary">确定</el-button>
      </el-col>
   </div>
</template>

<style>
   .con{
     display: flex;
     flex-direction: row;
     width: 100%;
     padding:0.52rem  0.4rem  0  0.79rem;
     box-sizing:border-box;
   }

   .left,.right{
     flex:1;
     width:47%;
   }

  .form-item{
    width:7.44rem;
    margin-bottom:0.5rem;
  } 

  .input-width{
    width: 6.6rem;
    height:0.5rem;
    line-height: 0.5rem;
  }

  .form-item .el-input__inner{
    background: #FAFAFA;
    height: 0.5rem;
  }

  .form-item .el-input__icon{
    height:0.5rem;
    line-height: 0.5rem;
  }

  .form-item .el-form-item__label,.form-item .el-input__inner,
  .el-upload-text{
    font-size:.18rem;
    color:#1A1A1A;
  }

  .el-upload{
    width:6.6rem;
  }

  .form-item .el-upload-dragger,.form-item .el-textarea{
    width:6.6rem;
    height:3.17rem;
    background: #FAFAFA;
  }

  .form-item .el-textarea__inner{
    height:3.17rem;
    min-height: 3.17rem;
    background: #FAFAFA;
  }

  .el-upload__tip{
    width: 6.6rem;
    text-align: right;
  }

  .btn-color{
    width:1.49rem;
    border-radius:2rem;
    background: #4DC4FF;
  }
</style>

<script>
import BreadCrumb from '@/components/Breadcrumb.vue'
import {addGoods,listCategory} from '@/api/good.js'

export default {
  data() {
    return {
      goods: {
        goodsName:'',
        goodsDesc:'',
        price:'',
        categoryId:'',
        stock:'',
      },
      pic: null,
      categoryList:[]
    }
  },
  components: {
    BreadCrumb
  },
  mounted(){
    this.cateChange();
  },
  methods:{
    handleAddGoods(){
      const that = this
      let formData = new FormData()
      formData.append('goodsName', that.goods.goodsName)
      formData.append('goodsDesc', that.goods.goodsDesc)
      formData.append('price', that.goods.price)
      formData.append('categoryId', that.goods.categoryId)
      formData.append('stock', that.goods.stock)
      formData.append('file', that.pic)
      addGoods(formData).then(() => {

      }).catch(err => {

      })
    },
    handleCancel() {
      this.$router.push({path:'/goods/index'})
    },
    picUpload(item) {
      this.pic = item.file
    },
    cateChange(){
      const that = this
      listCategory().then(data => {
        that.categoryList = data.data.obj;
      })
    }
  }
}
</script>