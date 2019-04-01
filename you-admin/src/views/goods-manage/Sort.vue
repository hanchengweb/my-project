<template>
  <div>
    <bread-crumb :bt="bt"></bread-crumb>
    <el-table :data="tableData">
      <el-table-column class="list" align="center" label="权值" prop="weight" min-width="80"></el-table-column>
      <el-table-column class="list" align="center" label="图标" min-width="100">
        <template slot-scope="scope">
          <img :src="scope.row.picurl" width="96" height="96">
        </template>
      </el-table-column>
      <el-table-column class="list" align="center" label="分类名称" prop="categoryName" min-width="100"></el-table-column>
      <el-table-column class="list" align="center" label="操作" min-width="100">
        <template slot-scope='scope'>
          <el-button type="text" size="small" style="color:#EC5F00" @click="goEdit(scope.row.categoryId)">修改</el-button>
          <el-button type="text" size="small" style="color:#EC5F00" @click="goDelte(scope.row.categoryId)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- <div class="sort-box">
      <p class="sort-title">
        <span>权值</span>
        <span>图标</span>
        <span>分类名称</span>
        <span>操作</span>
      </p>
      <p>
        <span>1</span>
        <span>
          <image src="" />
        </span>
        <span>早餐</span>
        <span>
          <span>修改</span>
          <span>删除</span>
        </span>
      </p>
    </div> -->
  </div>
</template>

<script>
   import BreadCrumb from '@/components/Breadcrumb.vue'
   import {listCategory,deleteCategory} from '@/api/good.js'

   export default{
    data(){
      return {
        bt:{
          name:"添加类目",
          link:'/goods/addSort'
        },
        tableData:[]
      }
    },
    components:{
      BreadCrumb
    },
    mounted(){
      this.viewListCategory()
    },
    methods:{
      viewListCategory(){
        const that = this
        listCategory().then(data=>{
          that.tableData = data.data.obj
        })
      },
      goEdit(id) {
        this.$route.push({path: '/goods/editSort', query: {id:id}})
      },
      goDelte(id){
        console.log("dfdgg"+id);
        const that = this
        deleteCategory(id).then(data => {
          this.$notify({
            title:'成功',
            message:'删除成功',
            type:'success',
            duration:2000
          })
          const index = this.tableData.indexOf(id)
          this.tableData.splice(index,1)
        })
      }
    }
  }
</script>

<style>
   .list{
     color:#4D4D4D;
     font-size:.18rem;
   }
</style>

