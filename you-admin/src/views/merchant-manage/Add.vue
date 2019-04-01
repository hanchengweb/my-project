<template>
<div class="container" style="height: 100%;">
<bread-crumb></bread-crumb>
<div style="height: 100%;">
	<div v-model="formInline" class="inline-form" style="width: 100%;">
		<div class="r-inp" style="width: 50%;display: inline-block;">
			<label style="display: inline-block;">账号</label>
			<input type="text" id="account" v-model="formInline.adminAccount" value="" name="adminAccount" />
		</div>
		<div class="l-inp" style="width: 50%;display: inline-block;">
			<label style="display: inline-block;">名称</label>
			<input type="text" id="account" v-model="formInline.adminName" value="" name="adminName" />
		</div>
	</div>
		<div class="inline-form" style="width: 100%;">
		<div class="r-inp" style="width: 50%;display: inline-block;">
			<label style="display: inline-block;">密码</label>
			<input type="text" id="account" v-model="formInline.adminPassword" value="" name="adminPassword" />
		</div>
		<div class="l-inp" style="width: 50%;display: inline-block;">
			<label style="display: inline-block;">电话</label>
			<input type="text" id="account" v-model="formInline.adminTelephone" value="" name="telephone" />
		</div>
	</div>
		<div class="inline-form" style="width: 100%;">
		<div class="r-inp" style="width: 50%;display: inline-block;">
			<label style="display: inline-block;">状态</label>
			<select name="frozen" v-model="formInline.adminFrozen" id="select-state">
				<option value="1">冻结</option>
				<option value="0">正常</option>
			</select>
		</div>
		<div class="l-inp" style="width: 50%;display: inline-block;">

		</div>
	</div>
		<div class="inline-form" style="width: 100%;">
		<div class="r-inp" style="width: 50%;display: inline-block;">
<!-- 			<div style="display: inline-block;width: 6.6rem;">
			  <select name="shopPlace" style="display: inline-block;">
		      	<option value="">选择省</option>
		      </select>
		      <select name="province" style="display: inline-block;">
		      	<option value="city">选择市</option>
		      </select>
		      <select name="district" style="display: inline-block;">
		      	<option value="">选择区</option>
		      </select>
			</div> -->
	
		</div>
		<div class="l-inp" style="width: 50%;display: inline-block;">
   
		</div>
	</div>
			<div class="inline-form" style="width: 100%;">
		<div class="r-inp" style="width: 50%;display: inline-block;">
			<label style="display: inline-block;
    position: relative;
    top: -1rem;">地址</label>
	   <textarea v-model="formInline.adminShopPlace" name="shopPlace" rows="" cols="" placeholder="详细地址"></textarea>
		</div>
		<div class="l-inp" style="width: 50%;display: inline-block;">

		</div>
	</div>
	<input type="button" id="cancel" value="取消" @click="cancel" />
	<input type="submit" id="do" value="确定" @click="insertOrUpdateMerchant()"/>
</div>
</div>
</template>
<script>
import {addMerchant,obtainMerchant,updateMerchant} from '@/api/addMerchant.js'
import BreadCrumb from '@/components/Breadcrumb.vue'
 export default{
 	    data() {
      return {
        formInline: {
         adminName:"",
         adminAccount:"",
         adminPassword:"",
         adminTelephone:"",
         shopName:'',
         adminShopPlace:'',
         permission:0,
         adminFrozen:""
        },
				bt: {
				name: '添加商品',
				link: '/goods/add'
				},
				mode:"add",	
      }
			
    },
		components: {
		BreadCrumb
		},
		mounted() {
      if (this.$route.path==="/merchant/editMerchant") {
      	this.mode="edit"
				console.log(this.$route.query)
         this.formInline.adminAccount = this.$route.query.adminAccount
				obtainMerchant(this.formInline).then((response)=>{
					console.log(response.data.obj)
					this.formInline = response.data.obj
				})
      }
		},

    methods: {
      insertOrUpdateMerchant() {
				console.log("添加商户");
				if(this.mode==="add"){
					addMerchant(this.formInline).then((data)=>{				
						if(data.data.code===1){
							 this.$message({
								message: '恭喜你，添加管理员成功',
								type: 'success'
							});
						}else{
							this.$message.error('抱歉,添加失败');
						}
					});	
				}else if(this.mode==="edit"){
					updateMerchant(this.formInline).then((data)=>{				
						if(data.data.code===1){
							 this.$message({
								message: '恭喜你，修改管理员成功',
								type: 'success'
							});
						}else{
							this.$message.error('抱歉,修改失败');
						}
					});
				}       		
      },
			cancel(){
				this.$router.push({path:"/merchant/index"})
			}
    }
 }
</script>
<style scoped="scoped">
.container	input{
background:rgba(250,250,250,1);
border-radius:10px;
border: hidden;
	}
	.inline-form{
		text-align: center;
         margin-top: 0.2rem;
         margin-bottom: 0.2rem;
	}
	.container label{
		width: 1rem;
    height: 0.3rem;
    font-size: 0.18rem;
    font-family: PingFangSC-Regular;
    color: rgba(26,26,26,1);
	}
	.container select{
		border: hidden;
		width:1.1rem;
height:0.55rem;
font-size:0.18rem;
font-family:PingFangSC-Regular;
color:rgba(77,77,77,1);
line-height:0.44rem;
margin-left: 0.3rem;
margin-right: 0.3rem;
	}
	.container textarea{
    width: 6.6rem;
    height: 1.11rem;
    background: rgba(250,250,250,1);
    border-radius: 0.1rem;
    border: hidden;
	}
	#cancel{
width: 1.49rem;
    height: 0.45rem;
    background: rgba(179,179,179,1);
    border-radius: 23px;
    font-size: 0.18rem;
    font-family: PingFangSC-Regular;
    color: rgba(255,255,255,1);
    line-height: 0px;
    position: relative;
    left: 2rem;
	}
	#do{
		width:1.49rem;
height:0.45rem;
background:rgba(77,196,255,1);
border-radius:0.23rem;
font-size:0.18rem;
font-family:PingFangSC-Regular;
color:rgba(255,255,255,1);
line-height:0px;
    position: relative;
    left: 3rem;
	}
	#account{
		height: 0.5rem;
		width: 6.6rem;
	}
	#select-state{
		    width: 6.6rem;
    margin: 0;
		height: 0.5rem;
		background:rgba(250,250,250,1);
border-radius:10px;
border: hidden;
	}
</style>
