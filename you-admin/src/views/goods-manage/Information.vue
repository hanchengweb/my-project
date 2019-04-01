<template>
   <div>
      <bread-crumb :bt="bt"></bread-crumb> 
      <el-form class="query-con">
          <div class="lf">
            <el-form-item class="item-bottom" label="商品名称" prop="proName">
              <el-input class="proName"></el-input>
            </el-form-item>
          </div>
          <div class="mid">
            <el-form-item class="item-bottom" label="类别">
              <el-radio-group v-model="radio2">
              <el-radio :label="0">全部</el-radio>
              <el-radio :label="1">主食</el-radio>
              <el-radio :label="2">蔬菜</el-radio>
              <el-radio :label="3">肉类</el-radio>
            </el-radio-group>
            </el-form-item>
          </div>
          <div class="rt">
            <el-button class="query-btn" type="primary">查询</el-button>
          </div>
      </el-form>
      <el-table :data="tableData">
        <el-table-column align="center" prop="number" label="序号" width="100"></el-table-column>
        <el-table-column align="center" prop="name" label="名称" width="120"></el-table-column>
        <el-table-column align="center" prop="cate" label="类别" width="180"></el-table-column>
        <el-table-column align="center" prop="pic" label="图片" width="180"></el-table-column>
        <el-table-column align="center" prop="date" label="时间" width="180"></el-table-column>
        <el-table-column align="center" prop="price" label="价格" width="180"></el-table-column>
        <el-table-column align="center" prop="oper" label="操作" width="300">
          <template slot-scope="scope">
            <el-button @click='handleClick(scope.row)' type='text' size="small">详情</el-button>
            <el-button type='text' size="small">上架</el-button>
            <el-button type='text' size="small">下架</el-button>
            <el-button type='text' size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
   </div>
</template>

<style>
   .query-con{
     display: flex;
     flex-direction: row;
     /* width: 100%; */
     padding:0.1rem  0.4rem  0  0.4rem;
     border-bottom:1px solid #E6E6E6;
     box-sizing:border-box;
   }

   .lf,.mid,.rt{
     flex:1;
   }

   .proName{
     width:4rem;
   }

   .proName .el-input__inner{
     height:0.45rem;
     background:#fff;
   }

   .el-form-item__label{
     font-size:0.18rem;
     color:#4D4D4D;
   }

   .lf .item-bottom,.mid .item-bottom,.rt .item-bottom{
     margin-bottom: 0.1rem;
   }




</style>

<script>
import BreadCrumb from '@/components/Breadcrumb.vue';
// import {searchGoodsList,deleteGoods,queryGoodsInfo,updateIsSale} from '@/api/good.js';
export default{
  data(){
    return {
      bt:{
        name:"添加商品",
        link:'/goods/add'
      },
      radio2:0,
      tableData: [{
        number:1,
        name: '王小虎',
        cate:1,
        pic:"",
        date: '2016-05-03',
        price:12.00
      }, {
        number:1,
        name: '王小虎',
        cate:1,
        pic:"",
        date: '2016-05-03',
        price:12.00
      }, {
       number:1,
        name: '王小虎',
        cate:1,
        pic:"",
        date: '2016-05-03',
        price:12.00
      }, {
       number:1,
        name: '王小虎',
        cate:1,
        pic:"",
        date: '2016-05-03',
        price:12.00
      }]
    }
  },
  components:{
    BreadCrumb
  }
}
  // export default{
  //   data(){
  //     return {
  //       radio2:0,
  //       tableData: [{
  //         number:1,
  //         name: '王小虎',
  //         cate:1,
  //         pic:"",
  //         date: '2016-05-03',
  //         price:12.00
  //       }, {
  //         number:1,
  //         name: '王小虎',
  //         cate:1,
  //         pic:"",
  //         date: '2016-05-03',
  //         price:12.00
  //       }, {
  //        number:1,
  //         name: '王小虎',
  //         cate:1,
  //         pic:"",
  //         date: '2016-05-03',
  //         price:12.00
  //       }, {
  //        number:1,
  //         name: '王小虎',
  //         cate:1,
  //         pic:"",
  //         date: '2016-05-03',
  //         price:12.00
  //       }]
  //     };
  //   },
  //   methods:{
  //     handleClick(row){
  //       console.log(row);
  //     },
  //     // querygoods(){
  //     //   console.log();
  //     // }
  //   } 
  // }
</script>

