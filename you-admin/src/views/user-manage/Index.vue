<template>
	<div id="outcontainer">
		<div style="width: 100%;overflow: hidden;">
			<div class="right-font">
			<span style="display: inline-block;">用户管理</span>				
			</div>
      <div class="left-font">
      <!--<a style="display: inline-block;">添加商户</a>     	-->
      </div>
      <div class="line-z">
			<div class="right-input">
				  <label for="user" class="user-label">会员信息</label>
					<input type="text" id="user" v-model="formInline.keyword" value="" class="user-input" />
			</div>
      <div class="left-botton">
   	      <input type="button" name="user-search" id="user-search" value="查询" @click="searchUser()" />
      </div>
      </div>
      <div class="header-user">
      	
      </div>
         <el-table
				 :data = "userList"
      style="width: 100%"
			
			>
      <el-table-column
        prop="tenantId"
        label="序号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="nickName"
        label="用户昵称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="phone"
        label="电话">
      </el-table-column>
            <el-table-column
        prop="openId"
        label="微信号">
      </el-table-column>

       <el-table-column
        prop="bonusPoint"
        label="积分">
      </el-table-column>
     <el-table-column
        prop="option"
        label="扣除积分"
				>
       <template slot-scope="scope">
        <el-input class="inputstyle" v-model="formInline.count" placeholder="扣除的积分"></el-input>
        <el-button type="text" size="small" @click="usePoint(scope.row)">扣除</el-button>
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
	import {queryUser,queryUserByKeyword,usePoint} from '@/api/userManage.js'
   export default {
   	data() {
   		return {
   			formInline: {
					userSerizId:"",
					 keyword:"",
					 userName:"",
					 phone:"",
					 openid:"",
					 count:'',
					page:1,
					size:5					
				},
				userList:[],
				allPage:5,
   		}
   	},
	created(){
		queryUser(this.formInline).then((response)=>{
			console.log(response.data.obj)
			this.userList = response.data.obj
		})
	},
    methods:{
		searchUser(){
			if(this.formInline.keyword===""){
				queryUser(this.formInline).then((response)=>{
					console.log(response.data.obj)
					this.userList = response.data.obj
				})
			}else{
				queryUserByKeyword(this.formInline).then((response)=>{
					this.userList = response.data.obj
					console.log(response.data.obj)
				})
			}
		},
		usePoint(row){
			console.log(row)
			this.formInline.openid = row.openId
			if(this.formInline.count!=""){
														this.$confirm('确认扣除?', '提示', {
																	confirmButtonText: '确定',
																	cancelButtonText: '取消',
																	type: 'warning'
																}).then(() => {
																	usePoint(this.formInline).then((res)=>{
																		if (res.data.code===1) {
																			this.$message({
																				type: 'success',
																				message: '扣除成功!'
																			});
																		}else if(res.data.code===0){
																			 this.$message({
																			 	type: 'info',
																			 	message: '扣除失败!'
																			 });
																		}
																	})
				
																}).catch(() => {
																	this.$message({
																		type: 'info',
																		message: '已取消删除'
																	});          
																});
			}else{
           this.$message.error('输入积分为空');
			}

			
	},
      prev(){
				if(this.formInline.page>1){
					this.formInline.page--
				}			
				if(this.formInline.keyword===""&&this.formInline.page>=0){
					queryUser(this.formInline).then((data)=>{
						
						console.log(data.data);
						this.list=data.data.obj
						console.log(this.list)
					});	
				}else{
					queryUserByKeyword(this.formInline).then((data)=>{
						
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
					queryUser(this.formInline).then((data)=>{
						
						console.log(data.data);
						this.list=data.data.obj
						console.log(this.list)
					});	
				}else{
					queryUserByKeyword(this.formInline).then((data)=>{
						
						console.log(data.data);
						this.list=data.data.obj
						console.log(this.list)
					})
				}
			},	
	}
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
.inputstyle{
    width: 66%;
    display: inline-block;
    font-size: 10px;
    /* margin-right: 0px; */
    position: relative;
    left: -10px;
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
}
</style>