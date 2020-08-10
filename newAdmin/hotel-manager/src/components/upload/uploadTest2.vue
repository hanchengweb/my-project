<template>
	<div class="uploadTest">
		<div class="ant-upload-list ant-upload-list-picture-card" v-if="imgList.length">
			<div class="ant-upload-list-item ant-upload-list-item-done" v-for="(item,i) in imgList"
				 style="cursor: pointer">
				<div class="ant-upload-list-item-info">
					<img :src="item.src" v-if="item.src &&uploadItem.fileType==='image' " style="width: 100%"
						 :alt="item.name"/>
					<a-icon type="file"
							style="text-align: center;font-size: 32px;color: #999;display: block;margin-top: 27px;"
							v-else>
					</a-icon>
					<p class="ant-upload-list-item-name">{{item.name}}</p>
				</div>
				<div class="ant-upload-list-item-actions">
					<a-icon type="eye-o" v-if="uploadItem.fileType==='image'" @click="showModal(item)"/>
					<a-icon
						type="download-o"
						class="anticon-delete"
						@click="downloadedFile(item)"/>
					<a-icon type="delete" @click="deleteFile(i)"/>
				</div>
			</div>
		</div>
		<div class="ant-upload ant-upload-select ant-upload-select-picture-card" @click="choseFile"
			 v-show="imgList.length < uploadItem.max">
			<input type="file" :accept="accept" style="display: none;" @change="onChange" ref="uploadBtn">
			<span role="button" tabindex="0" class="ant-upload ant-upload-btn">
				<a-icon type="plus" style="font-size:32px;color:#999"/>
				<div class="ant-upload-text" style="margin-top: 8px;color: #666;">上传</div>
			</span>
		</div>

		<a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel" class="uploadImageModal">
			<img alt="example" style="width: 100%" :src="previewImage"/>
		</a-modal>
	</div>
</template>
<script>
import {isEmptyObject, isString, isArray} from '../../libs/tool'

export default {
  props: {
    uploadItem: {},
    data: {},
    keyCode: '',
    uploadPlus: {},
    titleName: ''
  },
  data () {
    return {
      fileList: [],
      imgList: [],
      previewVisible: false,
      previewImage: '',
      acceptJson: {
        image: 'image/*',
        apk: ''
      },
      accept: ''
    }
  },
  created () {
    this.accept = this.acceptJson[this.uploadItem.fileType] || ''
    this.titleName != 'add' && !isEmptyObject(this.data) && this.uploadPlus && !isEmptyObject(this.uploadPlus) && this.uploadPlus.imgList && this.getDefaultImgList()
  },
  watch: {
    fileList (val) {
      this.$emit('change', {value: this.fileList})
    },
    imgList (val) {
      if (this.imgList.length < this.uploadItem.min) {
        this.$emit('change', {value: {msg: `请至少选择${this.uploadItem.min}个文件`, status: false}})
      } else {
        !this.fileList.length && this.$emit('change', {value: {msg: ``, status: true}})
      }
    }
  },
  methods: {

    downloadedFile (item) {
      let url = item.src, a = document.createElement('a')
      a.setAttribute('href', url)
      a.setAttribute('target', '_blank')
      a.setAttribute('id', 'camnpr')
      document.body.appendChild(a)
      a.click()
      a.parentNode.removeChild(a)
    },
    getDefaultImgList () {
      let imgList = this.uploadPlus.imgList
      if (!imgList) return false
      /* this.imgList = typeof imgList == 'string' ? [{
					src: this.uploadPlus.imgList,
					default: true
				}] : JSON.parse(JSON.stringify(imgList)) */
      if (isArray(imgList)) {
        imgList.length && imgList.forEach(item => {
          this.imgList.push({src: item, default: true})
        })
      } else if (isString(imgList)) {
        this.imgList = [{
          src: this.uploadPlus.imgList,
          default: true
        }]
      }
    },
    deleteFile (i) {
      this.fileList.splice(i, 1)
      this.imgList.splice(i, 1)
    },
    handleCancel () {
      this.previewVisible = false
    },
    showModal (item) {
      this.previewImage = item.src
      this.previewVisible = true
    },
    choseFile () {
      this.$refs.uploadBtn && this.$refs.uploadBtn.click && this.$refs.uploadBtn.click()
    },
    endPush (file, type, freader) {

    },
    onChange (event) {
      let file = event.target.files[0], freader = new FileReader(), fileType = this.uploadItem.fileType
      if (fileType === 'image') {
        freader.readAsDataURL(file)// 读取照片
        freader.onload = (e) => { // 读取成功
          this.uploadPlus && this.uploadPlus.sortReturnUploadFile && this.uploadPlus.sortReturnUploadFile(file)
          this.imgList.push({src: freader.result, name: file.name})
          this.fileList.push(file)
        }
      } else if (fileType === 'apk') {
        if (file.name.substring(file.name.lastIndexOf('.') + 1) !== fileType) {
          this.$message.info('请选择正确格式的文件')
          return false
        }
        this.uploadPlus && this.uploadPlus.sortReturnUploadFile && this.uploadPlus.sortReturnUploadFile(file)
        this.imgList.push({name: file.name})
        this.fileList.push(file)
      } else {
        this.uploadPlus && this.uploadPlus.sortReturnUploadFile && this.uploadPlus.sortReturnUploadFile(file)
        this.imgList.push({name: file.name})
        this.fileList.push(file)
      }
    }
  }
}
</script>
<style lang="less">
	.uploadImageModal {
		.ant-modal-close-x {
			width: 30px;
			height: 30px;
			line-height: 30px;
		}
	}
</style>
