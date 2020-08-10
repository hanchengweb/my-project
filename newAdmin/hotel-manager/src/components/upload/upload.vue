<template>
	<div class="components-upload">
		<div class="ant-upload-list ant-upload-list-picture-card" v-if="imageUrl">
			<div class="ant-upload-list-item ant-upload-list-item-done">
				<div class="ant-upload-list-item-info">
					<span>
						<img style="width: 100%" :src="imageUrl" alt="">
					</span>
				</div>
			</div>
		</div>
		<a-upload
			action="//jsonplaceholder.typicode.com/posts/"
			listType="picture-card"
			:fileList="fileList"
			:showUploadList="!uploadItem.hideUploadList"
			@change="onChange"
			@preview="handlePreview"
			:beforeUpload="beforeUpload"
			:accept="accept"
			class="upload-list-inline">
			<div v-if="fileList.length < uploadItem.max">
				<a-icon type="plus"/>
				<div class="ant-upload-text">上传</div>
			</div>
		</a-upload>
		<a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
			<img alt="example" style="width: 100%" :src="previewImage"/>
		</a-modal>
	</div>
</template>
<script>
	function getBase64 (img, callback) {
		const reader = new FileReader()
		reader.addEventListener('load', () => callback(reader.result))
		reader.readAsDataURL(img)
	}

	export default {
		data () {
			return {
				fileList: [],
				imageUrl: '',
				accept: '',
				item: {},
				previewVisible: false,
				previewImage: '',
				showUploadList: false
			}
		},
		props: {
			uploadItem: {}
		},
		created () {
		},
		methods: {
			handlePreview (file) {
				this.previewImage = file.url || file.thumbUrl
				this.previewVisible = true
			},
			handleCancel () {
				this.previewVisible = false
			},
			onChange ({file, fileList, event}) {
				this.fileList = fileList
				/*getBase64(file.originFileObj, (imageUrl) => {
					this.imageUrl = imageUrl
				})*/

			},
			beforeUpload (file, fileList) {
				this.fileList = [...this.fileList, file]
				return false

			}
		}
	}
</script>
