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
			<input type="file" :accept="accept" style="display: none;" @change="onChange($event,1)" ref="uploadBtn">
			<span role="button" tabindex="0" class="ant-upload ant-upload-btn">
				<a-icon type="plus" style="font-size:32px;color:#999"/>
				<div class="ant-upload-text" style="margin-top: 8px;color: #666;">上传</div>
			</span>
		</div>

		<a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel" class="uploadImageModal">
			<img alt="example" style="width: 100%" :src="previewImage"/>
		</a-modal>

    <div class="vueCropperOuter" v-if="cropper">
      <div class="vueCropperModal">
          <div class="info-item">
            <!-- <label class="btn btn-orange" for="uploads" style="display:inline-block;width: 70px;padding: 0;text-align: center;line-height: 28px;">选择图片</label>
            <input type="file" id="uploads" :value="imgFile" style="position:absolute; clip:rect(0 0 0 0);" accept="image/png, image/jpeg, image/gif, image/jpg" @change="uploadImg($event, 1)"> -->
            <input type="button" class="oper cropperDo" value="+" title="放大" @click="changeScale(1)">
            <input type="button" class="oper cropperDo" value="-" title="缩小" @click="changeScale(-1)">
            <input type="button" class="oper cropperDo" value="↺" title="左旋转" @click="rotateLeft">
            <input type="button" class="oper cropperDo" value="↻" title="右旋转" @click="rotateRight">
            <input type="button" class="oper cropperDo" value="↓" title="下载" @click="down('blob')">
            <div class="line">
              <div class="cropper-content">
                <div class="cropper" :style="{'width':cropperWidth+'px','height':cropperHeight+'px'}">
                  <vueCropper
                    ref="cropper"
                    :img="option.img"
                    :outputSize="option.size"
                    :outputType="option.outputType"
                    :info="true"
                    :full="option.full"
                    :canMove="option.canMove"
                    :canMoveBox="option.canMoveBox"
                    :original="option.original"
                    :autoCrop="option.autoCrop"
                    :autoCropWidth="option.autoCropWidth"
                    :autoCropHeight="option.autoCropHeight"
                    :fixedBox="option.fixedBox"
                    @realTime="realTime"
                    @imgLoad="imgLoad"
                  ></vueCropper>
                </div>
                <div style="margin-left:20px;">
                  <div class="show-preview" :style="{'width': previewWidth+'px', 'height':previewHeight+'px',  'overflow': 'hidden', 'margin': '5px'}">
                    <div :style="previews.div" class="preview">
                      <img :src="previews.url" :style="previews.img">
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="cropperBthlist">
              <button type="button" class="ant-btn ant-btn-default" @click="cancelCropper">取 消</button>
              <button type="button" class="ant-btn ant-btn-primary" @click="finish('blob')">确 定</button>
            </div>
          </div>
      </div>
    </div>
	</div>
</template>
<script>
import {isEmptyObject, isString, isArray} from '../../libs/tool'
import { VueCropper } from 'vue-cropper'
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
      accept: '',

      headImg: '',
      // 剪切图片上传
      crap: false,
      previews: {},
      option: {
        img: '',
        outputSize: 1, // 剪切后的图片质量（0.1-1）
        full: false, // 输出原图比例截图 props名full
        outputType: 'png',
        canMove: true,
        original: false,
        canMoveBox: true,
        autoCrop: true,
        autoCropWidth: 200,
        autoCropHeight: 150,
        fixedBox: true
      },
      fileName: '', // 本机文件地址
      downImg: '#',
      imgFile: '',
      uploadImgRelaPath: '', // 上传后的图片的地址（不带服务器域名）
      cropper: false,
      previewWidth: 250,
      previewHeight: 250,
      cropperWidth: 350,
      cropperHeight: 350
    }
  },
  components: {
    VueCropper
  },
  created () {
    this.accept = this.acceptJson[this.uploadItem.fileType] || ''
    this.titleName != 'add' && !isEmptyObject(this.data) && this.uploadPlus && !isEmptyObject(this.uploadPlus) && this.uploadPlus.imgList && this.getDefaultImgList()
    if (this.uploadPlus.imageScale) {
      this.previewHeight = this.previewWidth / this.uploadPlus.imageScale
      this.cropperHeight = this.cropperWidth / this.uploadPlus.imageScale
      this.option.autoCropHeight = this.option.autoCropWidth / this.uploadPlus.imageScale
      this.$forceUpdate()
    }
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
    onChange (event, num) {
      let file = event.target.files[0], freader = new FileReader(), fileType = this.uploadItem.fileType
      console.log(fileType)
      console.log(this.uploadPlus)
      if (fileType === 'image') {
        if (this.uploadPlus.imageScale) { // 裁剪
          this.cropper = true
          var _this = this
          // 上传图片
          _this.fileName = file.name
          if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(event.target.value)) {
            alert('图片类型必须是.gif,jpeg,jpg,png,bmp中的一种')
            return false
          }
          freader.onload = (event) => {
            let data = ''
            if (typeof event.target.result === 'object') {
              // 把Array Buffer转化为blob 如果是base64不需要
              data = window.URL.createObjectURL(new Blob([event.target.result]))
            } else {
              data = event.target.result
            }
            if (num === 1) {
              _this.option.img = data
            } else if (num === 2) {
              _this.example2.img = data
            }
          }
          freader.readAsArrayBuffer(file)
        } else {
          freader.readAsDataURL(file)// 读取照片
          freader.onload = (event) => { // 读取成功
            this.uploadPlus && this.uploadPlus.sortReturnUploadFile && this.uploadPlus.sortReturnUploadFile(file)
            this.imgList.push({src: freader.result, name: file.name})
            this.fileList.push(file)
          }
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
    },

    // 放大/缩小
    changeScale (num) {
      console.log('changeScale')
      num = num || 1
      this.$refs.cropper.changeScale(num)
    },
    // 左旋转
    rotateLeft () {
      console.log('rotateLeft')
      this.$refs.cropper.rotateLeft()
    },
    // 右旋转
    rotateRight () {
      console.log('rotateRight')
      this.$refs.cropper.rotateRight()
    },
    // 确定
    finish (type) {
      let _this = this
      let formData = new FormData()
      // 输出
      if (type === 'blob') {
        this.$refs.cropper.getCropBlob((data) => {
          let img = window.URL.createObjectURL(data)
          this.model = true
          this.modelSrc = img
          data.name = this.fileName
          let files = new window.File([data], data.name, {type: data.type, size: data.size})
          formData.append('file', data, this.fileName)
          this.uploadPlus && this.uploadPlus.sortReturnUploadFile && this.uploadPlus.sortReturnUploadFile(files)
          this.imgList.push({src: img, name: this.fileName})
          this.fileList.push(files)
          this.cropper = false
        })
      } else {
        this.$refs.cropper.getCropData((data) => {
          this.model = true
          this.modelSrc = data
        })
      }
      this.$refs.uploadBtn.value = ''
    },
    // 取消
    cancelCropper () {
      this.cropper = false
      this.$refs.uploadBtn.value = ''
    },
    // 实时预览函数
    realTime (data) {
      this.previews = data
    },
    // 下载图片
    down (type) {
      var aLink = document.createElement('a')
      aLink.download = 'author-img'
      if (type === 'blob') {
        this.$refs.cropper.getCropBlob((data) => {
          this.downImg = window.URL.createObjectURL(data)
          aLink.href = window.URL.createObjectURL(data)
          aLink.click()
        })
      } else {
        this.$refs.cropper.getCropData((data) => {
          this.downImg = data
          aLink.href = data
          aLink.click()
        })
      }
    },
    // 选择本地图片
    uploadImg (e, num) {
      var _this = this
      // 上传图片
      var file = e.target.files[0]
      _this.fileName = file.name
      if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
        alert('图片类型必须是.gif,jpeg,jpg,png,bmp中的一种')
        return false
      }
      var reader = new FileReader()
      reader.onload = (e) => {
        let data
        if (typeof e.target.result === 'object') {
          // 把Array Buffer转化为blob 如果是base64不需要
          data = window.URL.createObjectURL(new Blob([e.target.result]))
        } else {
          data = e.target.result
        }
        if (num === 1) {
          _this.option.img = data
        } else if (num === 2) {
          _this.example2.img = data
        }
      }
      // 转化为base64
      // reader.readAsDataURL(file)
      // 转化为blob
      reader.readAsArrayBuffer(file)
    },
    imgLoad (msg) {
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
  .vueCropperOuter{
    background-color: rgba(0, 0, 0, 0.65);
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    height: 100%;
    z-index: 30000;
  }
  .vueCropperModal{
    background:#fff;
    width:1000px;
    border-radius:10px;
    position: fixed;
    top: 50%;
    left: 50%;
    margin-top:-250px;
    margin-left: -500px;
    padding:20px;
  }
  .cropperBthlist{
    text-align:center;
    button{
      margin:0 10px;
      width:100px;
    }
  }
  .cropperDo{
    width: 36px;
    font-size: 18px;
    background-color: #0ACAC7;
    color: #fff;
    height: 36px;
  }
  .info {
    width: 720px;
    margin: 0 auto;
    .oper-dv {
      height:20px;
      text-align:right;
      margin-right:100px;
      a {
        font-weight: 500;
        &:last-child {
          margin-left: 30px;
        }
      }
    }
    .info-item {
      margin-top: 15px;
      label {
        display: inline-block;
        width: 100px;
        text-align: right;
      }
      .sel-img-dv {
        position: relative;
        .sel-file {
          position: absolute;
          width: 90px;
          height: 30px;
          opacity: 0;
          cursor: pointer;
          z-index: 2;
        }
        .sel-btn {
          position: absolute;
          cursor: pointer;
          z-index: 1;
        }
      }
    }
  }

  .cropper-content{
    display: flex;
    display: -webkit-flex;
    justify-content: flex-start;
    -webkit-justify-content: flex-start;
    margin:30px 100px;
    .cropper{
      width: 260px;
      height: 260px;
    }
    .show-preview{
      flex: 1;
      -webkit-flex: 1;
      display: flex;
      display: -webkit-flex;
      justify-content: center;
      -webkit-justify-content: center;
      .preview{
        overflow: hidden;
        border:1px solid #cccccc;
        background: #cccccc;
        margin-left: 40px;
      }
    }
  }
  .cropper-content .show-preview .preview {margin-left: 0;}

</style>
