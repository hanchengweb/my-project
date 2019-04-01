<template>
  <div>
    <bread-crumb></bread-crumb>
    <el-form class="form-box" label-width="100px" label-position="top" :model="categorys">
        <el-form-item label="权值" prop="weight">
          <el-input class="weight" placeholder="请输入权值" v-model="categorys.weight"></el-input>
        </el-form-item>
        <el-form-item label="分类名称" prop="cateName">
          <el-input class="weight" placeholder="请输入权值" v-model="categorys.cateName"></el-input>
        </el-form-item>
        <el-form-item label="图标" prop="file">
          <el-upload class="pic" action="" drag accept="/image/*" :http-request="picUpload">
              <i class="el-icon-upload"></i>
              <div class="el-upload-text">将图片拖到此处,或<em>点击上传</em></div>
              <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
        <el-button @click="handleAddCate" type="primary">确定</el-button>
    </el-form>
  </div>
</template>
<script>
  import BreadCrumb from '@/components/Breadcrumb.vue'
  import {addCategory} from '@/api/good.js'

  export default{
    data(){
      return{
        categorys:{
          weight:'',
          cateName:''
        },
        pic:null
      }
    },
    components:{
      BreadCrumb
    },
    methods:{
      handleAddCate(){
        const that = this
        let formData = new FormData();
        formData.append('weight',that.categorys.weight)
        formData.append('category',that.categorys.cateName)
        formData.append('file',that.pic)
        addCategory(formData).then(data=>{
          this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
          console.log(data.data);
        }).catch(err=>{
          console.log(err);
        })
      },
      picUpload(item){
        this.pic = item.file
      }
    }
  }
</script>

<style>
   .form-box{
     position: absolute;
     padding:0.2rem 1.9rem;
     box-sizing: border-box;
   }

   .weight,.pic{
     width:12rem;
   }
</style>
