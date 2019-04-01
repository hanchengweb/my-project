<template>
	<div id="outcontainer">
		<div style="width: 100%;overflow: hidden;">
			<div class="right-font">
			<span style="display: inline-block;">商户管理</span>				
			</div>
      <div class="left-font">
      <a style="display: inline-block;" @click="routerLink">添加商户</a>     	
      </div>
      <div class="line-z">
			<div class="right-input">
				  <label for="user" class="user-label">商户名称/账号</label>
					<input type="text" id="user" v-model="formInline.keyword" value="" class="user-input" />
			</div>
      <div class="left-botton">
   	      <input type="button" name="user-search" id="user-search" value="查询" @click="queryMerchant" />
      </div>
      </div>
      <div class="header-user">
      	
      </div>
         <el-table
				 :data = "list"
      style="width: 100%" max-height="400">
      <el-table-column
        prop="adminAccount"
        label="账号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="adminName"
        label="名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="adminShopPlace"
        label="地址">
      </el-table-column>
            <el-table-column
        prop="adminTelephone"
        label="电话">
      </el-table-column>
                  <el-table-column
        prop="adminPassword"
        label="密码">
      </el-table-column>
       <el-table-column
        prop="adminFrozen"
        label="状态">
      </el-table-column>
        <el-table-column
        prop="option"
        label="操作">
       <template slot-scope="scope">
        <el-button type="text" size="small" @click="updateMerchant(scope.row)">修改</el-button>
        <el-button type="text" size="small" @click="frozenMerchant(scope.row)">{{scope.row.adminFrozen===0?recover:message}}</el-button>
        <!-- <el-button type="text" size="small" @click="deleteMerchant(scope.$index, scope.row,list)">删除</el-button> -->
      </template>
      </el-table-column>
    </el-table>
    <!--<div class="form-search">-->
      <!--<el-form :inline="true" :model="formInline" class="demo-form-inline">
		<el-form-item label="商户名称/账号">
			<el-input v-model="formInline.user" placeholder="审批人"></el-input>
		</el-form-item>
		<el-form-item>
			<el-button type="primary" @click="onSubmit">查询</el-button>
		</el-form-item>
		</el-form>-->
      <!--</div>-->
              								<!--分页部分-->
              								<div id="pageLay" style="width: 10%;
              overflow: hidden;
              float: right;
              position: relative;
              top: 0.1rem;
              left: -1rem;">
              									<div class="allPage">
              										共<span>{{allPage}}</span>页
              									</div>
              									<div class="page-a">
              										<a class="prev" @click="prev"><</a>
              										<span class="middle">{{formInline.page}}</span>
              										<a class="next" @click="next">></a>
              									</div>
              								</div>
      </div>
		</div>
	</div>
</template>

<script>
	import {queryMerchant,frozenMerchant,updateMerchant,deleteMerchant,obtainMerchant,queryAdminByKeyword} from '@/api/addMerchant.js'
	import {update} from '@/components/Breadcrumb.vue'
   export default {
   	data() {
   		return {
   			formInline: {
         adminName:"",
         adminAccount:"",
         adminPassword:"",
         telephone:"",
         shopName:'',
         shopPlace:'',
         perssion:"",
         frozen:"",
				 keyword:"",
					page:1,
					size:5					
				},
				list:[],
				message:"冻结",
				recover:"正常",
				allPage:5
   		}
   	},
		components: {
			update,
		},
		created(){
			queryMerchant(this.formInline).then((data)=>{
				
				console.log(data.data);
				this.list=data.data.obj
				console.log(this.list)
			});
		},
		methods:{
			queryMerchant(){
				
				if(this.formInline.keyword===""){
					queryMerchant(this.formInline).then((data)=>{
						
						console.log(data.data);
						this.list=data.data.obj
						console.log(this.list)
					});	
				}else{
					queryAdminByKeyword(this.formInline).then((data)=>{
						
						console.log(data.data);
						this.list=data.data.obj
						console.log(this.list)
					})
				}	
			},
			frozenMerchant(frozenrow){
				console.log(frozenrow)
        this.formInline.adminAccount=frozenrow.adminAccount
				if(frozenrow.adminFrozen===0){
					this.formInline.frozen = frozenrow.adminFrozen = 1
					console.log(this.formInline.frozen,frozenrow.adminFrozen)
					frozenMerchant(this.formInline).then((data)=>{
						let bindData = data.data
						console.log("冻结",bindData.code)
					})
				}else if(frozenrow.adminFrozen===1){
					this.formInline.frozen = frozenrow.adminFrozen = 0
					console.log(this.formInline.frozen,frozenrow.adminFrozen)
					frozenMerchant(this.formInline).then((data)=>{
						let bindData = data.data
						console.log("恢复",bindData.code)
					})
				}		
			},

// 			deleteMerchant(index,dlerow,rows){
// 				console.log(index,dlerow)
// 				this.formInline.adminAccount = dlerow.adminAccount
// 				deleteMerchant(this.formInline).then((data)=>{
// 					if (data.data.code===1) {
// 						this.$confirm('确认删除?', '提示', {
// 									confirmButtonText: '确定',
// 									cancelButtonText: '取消',
// 									type: 'warning'
// 								}).then(() => {
// 									rows.splice(index,1);
// 									this.$message({
// 										type: 'success',
// 										message: '删除成功!'
// 									});
// 								}).catch(() => {
// 									this.$message({
// 										type: 'info',
// 										message: '已取消删除'
// 									});          
// 								});
// 					}
// 				})
// 			},
      prev(){
				if(this.formInline.page>1){
					this.formInline.page--
				}			
				if(this.formInline.keyword===""&&this.formInline.page>=0){
					queryMerchant(this.formInline).then((data)=>{
						
						console.log(data.data);
						this.list=data.data.obj
						console.log(this.list)
					});	
				}else{
					queryAdminByKeyword(this.formInline).then((data)=>{
						
						console.log(data.data);
						this.list=data.data.obj
						console.log(this.list)
					})
				}
			},
			next(){
				if(this.formInline.page<this.allPage){
				this.formInline.page++
				}
				if(this.formInline.keyword===""){
					queryMerchant(this.formInline).then((data)=>{
						
						console.log(data.data);
						this.list=data.data.obj
						console.log(this.list)
					});	
				}else{
					queryAdminByKeyword(this.formInline).then((data)=>{
						
						console.log(data.data);
						this.list=data.data.obj
						console.log(this.list)
					})
				}
			},			
			updateMerchant(updaterow){
				this.formInline.adminAccount = updaterow.adminAccount
				this.$router.push({path:'/merchant/editMerchant',query:{adminAccount:this.formInline.adminAccount}})			
			
		},		
		routerLink(){
			this.$router.push({path:"/merchant/addMerchant"})
		}
		},

   }
</script>

<style>
	#outcontainer{
		height: 100%;
	}
#header-user{
	width: 100%;
	border-bottom: 1px solid rgba(230,230,230,1);
}
.right-font{
	width: 50%;text-align: left;float: left;
}
.left-font{
	width: 50%;text-align: right;float: left;
}
.right-font span{
    width: 3rem;
    /* height: 0.3rem; */
    font-size: 0.18rem;
    font-family: PingFangSC-Regular;
    color: rgba(26,26,26,1);
    text-align: center;
    line-height: 1rem;
}
.left-font a{
    width: 3rem;
    font-size: 0.2rem;
    font-family: PingFangSC-Regular;
    color: rgba(77,196,255,1);
    line-height: 1rem;
    text-align: center;
}
.form-search{
	width: 100%;
	height: 3rem;
}
.right-input{
	width: 70%;
	height: 100%;
	float: left;
		text-align: left;
		
}
.left-botton{
	width: 30%;
font-size:0.18rem;
font-family:PingFangSC-Regular;
color:rgba(255,254,254,1);
line-height: 1rem;
float: left;
text-align: center;
}
.user-label{
display: inline-block;
    width: 2rem;
    font-size: 0.2rem;
    font-family: PingFangSC-Regular;
    color: rgba(77,77,77,1);
    line-height: 1rem;
    position: relative;
    left: 1rem;
}
.user-input{
    width: 3.5rem;
    height: 0.5rem;
    background: #ffffff;
    border-radius: 10px;
    border: 1px solid rgba(230, 230, 230, 1);
    position: relative;
    left: 1rem;
}
#user-search{
width:1.61rem;
height:0.48rem;
background:rgba(77,196,255,1);
border-radius:0.24rem;
border: hidden;
color: white;
}
.line-z{
	clear: both; width: 100%;overflow: hidden;
	border-bottom:1px solid rgba(230,230,230,1); 
	border-top:1px solid rgba(230,230,230,1);
}
.allPage{
width: 35%;
    height: 0.5rem;
    font-size: 0.2rem;
    font-family: PingFangSC-Regular;
    color: rgba(77,196,255,1);
    float: left;
    text-align: center;
    position: relative;
    top: 0.2rem;
    line-height: 0rem;
}
.page-a{
    width: 60%;
    height: 0.3rem;
    float: left;
    text-align: center;
    border: #CCCCCC solid 1px;
    border-radius: 0.2rem;
		overflow: hidden;
}
.middle{
border-left: #CCCCCC solid 0.01rem;
border-right: #CCCCCC solid 0.01rem;
}
.prev,.next,.middle{
    display: inline-block;
    width: 30%;
    height: 0.3rem;
    text-align: center;
    float: left;
    line-height: 0.3rem;
    cursor: pointer;
}
</style>