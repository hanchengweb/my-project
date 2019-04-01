<template>
   <div>
      <bread-crumb></bread-crumb>
      <el-form class="con" :model="formInline" label-position="left">
        <div class="left">
					<el-form-item label="券名称" prop="name">
							<el-input class="input-width" v-model="formInline.name" placeholder="请输入名称"></el-input>
					</el-form-item>
          <el-form-item label="满金额" prop="minPrice">
              <el-input class="input-width" v-model="formInline.minPrice" placeholder="请输入金额"></el-input>
          </el-form-item>
          <el-form-item label="开始时间" prop="startDate">
    <el-date-picker style="width: 5.8rem;"
      v-model="formInline.startDate"
      type="datetime"
      placeholder="选择日期时间"
      value-format="yyyy-MM-dd hh:mm:ss"
			>
    </el-date-picker>
          </el-form-item>
          <el-form-item label="图片" prop="file">
            <el-upload class="upload-demo" drag accept="image/*" action=''
				list-type="picture"
				:http-request = "handlefile"
						>
              <i class="el-icon-upload"></i>
              <div class="el-upload-text">将文件拖到此处,或<em>点击上传</em></div>
              <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </el-form-item>
        </div>
        <div class="right">
         <div style="overflow: hidden;visibility: hidden;">
					 <el-form-item label="价格" >
					 	<el-input class="input-width" placeholder="请输入价格"></el-input>
					 </el-form-item>
				 </div>
          <el-form-item label="减金额" prop="reducePrice">
            <el-input class="input-width" v-model="formInline.reducePrice" placeholder="请输入数量"></el-input>
          </el-form-item>
          <el-form-item label="结束时间" prop="endDate">
	    <el-date-picker style="width: 5.8rem;"
      v-model="formInline.endDate"
      type="datetime"
      placeholder="选择日期时间"
      value-format="yyyy-MM-dd hh:mm:ss"
			>
    </el-date-picker>
          </el-form-item>
        </div>
      </el-form>
      <el-col :span="6" :offset="18">
        <el-button @click="cancel">取消</el-button>
        <el-button class="btn-color" type="primary" @click="mode==='addcoupon'?insertCoupon():updateCoupon()">确定</el-button>
      </el-col>
   </div>
</template>

<script>
import BreadCrumb from '@/components/Breadcrumb.vue'
import {insertMerchantCoupon,obtainMerchantcoupon,updateMerchantCoupon} from '@/api/merchantCoupon.js'
// import {addGoods} from '@/api/good.js'
export default {
  data() {
    return {
 			formInline: {
				 id:"",
         name:"",
         startDate:"",
         endDate:"",
         type:0,
         minPrice:'',
         reducePrice:'',
         out:"",
				 file:"",
					page:1,
					size:5					
				},
      pic: null,
			mode:"addcoupon"
    }
  },
  components: {
    BreadCrumb
  },
 mounted() {
 	if (this.$route.path==="/marketing/couponedit") {
 		this.mode="editcoupon"
 		console.log(this.$route.query)
 		this.formInline.id = this.$route.query.id
		let start = "";
		let end = "";
		
 		obtainMerchantcoupon(this.formInline).then((response)=>{
 			console.log(response.data.obj)
 			this.formInline = response.data.obj
			start = new Date(this.formInline.startDate);
			

			end = new Date(this.formInline.endDate);
			this.formInline.startDate = start.toLocaleDateString().replace(/\//g, "-") + " " + start.toTimeString().substr(0, 8)
			this.formInline.endDate =  end.toLocaleDateString().replace(/\//g, "-") + " " + end.toTimeString().substr(0, 8)
			
 		})
 	}
 },
 methods:{
	 handlefile(response){
		 
		 this.pic=response.file
		 console.log(this.pic)
	 },
	 updateCoupon(){
		 console.log(this.formInline.startDate,this.formInline.endDate)
		 const that = this
		 let formData = new FormData()
		 formData.append("couponName",that.formInline.name)
		 formData.append("startDate",that.formInline.startDate)

		 formData.append("endDate",that.formInline.endDate)

		 formData.append("type",that.formInline.type)

		 formData.append("file",that.pic)

		 formData.append("out",that.formInline.out)

		 formData.append("minPrice",that.formInline.minPrice)
     formData.append("reducePrice",that.formInline.reducePrice)
		 updateMerchantCoupon(formData).then((res)=>{
			 if(res.data.code===1){
				 this.$message({
				 type: 'success',
				 message: '更新成功!'
				 });
			 }
		 }).catch(err=>{
      this.$message.error('修改失败');
		 })
	 },
	 insertCoupon(){
		 console.log(this.formInline.startDate,this.formInline.endDate)

		 		 const that = this
		 		 let formData = new FormData()
		 		 formData.append("couponName",that.formInline.name)
		 		 formData.append("startDate",that.formInline.startDate)
		 
		 		 formData.append("endDate",that.formInline.endDate)
		 
		 		 formData.append("type",that.formInline.type)
		 
		 		 formData.append("file",that.pic)
		 
		 		 formData.append("out",that.formInline.out)
		 
		 		 formData.append("minPrice",that.formInline.minPrice)
		      formData.append("reducePrice",that.formInline.reducePrice)
		 		 insertMerchantCoupon(formData).then((res)=>{
					 if(res.data.code===1){
					 	this.$message({
					 	type: 'success',
					 	message: '添加成功!'
					 	});
					 }
		 		 }).catch(err=>{
						this.$message.error('添加失败');
		 		 })
	 },
	 cancel(){
		 this.$router.push({path:"/marketing/coupon"})
	 }
 }
}
// import {addGoods} from '@/api/goods'

// export default {
//   name:'addGoods',
//   data() {
//     return{
//       goodsName:'',
//       goodsDesc:'',
//       price:0,
//       categoryId:0,
//       stock:0,
//       rules:{
        
//       }
//     }
//   },
//   methods: {
//     add() {
//       addGood().then().catch()
//     }
//   }
// }
</script>

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

  .el-form-item{
    width:7.44rem;
    margin-bottom:0.5rem;
  } 

  .input-width{
    width: 6rem;
    height:0.5rem;
    line-height: 0.5rem;
  }

  .el-input__inner{
    background: #FAFAFA;
    height: 0.5rem;
  }

  .el-input__icon{
    height:0.5rem;
    line-height: 0.5rem;
  }

  .el-form-item__label,.el-input__inner,
  .el-upload-text{
    font-size:.18rem;
    color:#1A1A1A;
  }

  .el-upload{
    width:6.6rem;
  }

  .el-upload-dragger,.el-textarea{
    width:6.6rem;
    height:3.17rem;
    background: #FAFAFA;
  }

  .el-textarea__inner{
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