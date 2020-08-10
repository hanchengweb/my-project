<template>
	<a-modal
		:title="title"
		:visible="visible"
		:destroyOnClose="true"
		:footer="null"
		:style="style"
		ref="modalForShow"
		@cancel="onCancel"
		:width="modalWidth"
		class="selfModalShow"
	>
		<!-- <a-icon :type="!isFullScreen?'fullscreen':'fullscreen-exit'" class="fullScreenIcon" @click="toFullScreen"/> -->
		<div class="fullScreenIcon" @click="toFullScreen">
			<img src="/static/img/analysis/menu/maximize.png" v-if="!isFullScreen" alt="">
			<img src="/static/img/analysis/menu/minimize.png" v-else alt="">
		</div>
		<formSelf v-if="type=='form'" :json="data"></formSelf>
		<tableSelf v-else-if="type=='table'" :tableJson="data"></tableSelf>
		<a-row :gutter="32" class="footer" v-if="!hideFooter">
			<a-col :span="24" style="text-align: center">
				<a-button type="primary" @click="onCancel">关闭</a-button>
			</a-col>
		</a-row>
	</a-modal>
</template>
<script>
import formSelf from '../form'
import tableSelf from '../table'

export default {
  components: {
    formSelf,
    tableSelf
  },
  data () {
    return {
      title: '详情',
      visible: false,
      type: 'form', // form ---表单,table---表格
      data: {},
      baseScroll: 400,
      modalWidth: '800px',
      hideFooter: false,
      isFullScreen: false,
      style: 'top: 20px'
    }
  },
  created () {
    this.modalWidth = document.getElementById('app').clientWidth * 0.8 + 'px'
    this.scroll = this.data && this.data.scroll || 400
    this.deleteHtmlModal(document.getElementsByClassName('ant-modal-mask'), document.getElementsByClassName('ant-modal-mask').length)
  },
  mounted () {
  },
  updated () {

  },
  methods: {
    onCancel () {
      this.visible = false
    },
    toFullScreen () {
      this.isFullScreen = !this.isFullScreen
    },
    deleteHtmlModal (html, len) {
      if (!len) return false
      for (let i = 0; i < len; i++) {
        document.getElementsByTagName('body')[0].removeChild(html[i].parentNode.parentNode)
      }
    },
    changeScrollHeight () {
      setTimeout(() => {
        const body = document.getElementsByClassName('ant-modal-body')[0]
        this.data.scroll.y = body.clientHeight - 96
      }, 0)
    }

  },
  watch: {
    isFullScreen (val) {
      this.modalWidth = val ? document.getElementById('app').clientWidth : document.getElementById('app').clientWidth * 0.8
      this.style = val ? `top:0;height:${document.getElementById('app').clientHeight}px` : 'top: 20px'
      val && document.getElementsByClassName('ant-modal-body').length && this.changeScrollHeight()
      if (!val) {
        this.data.scroll.y = this.baseScroll
      }
    }
  }

}
</script>
<style lang="less">
	.selfModalShow {
		padding-bottom: 0;
		.footer {
			margin-top: 20px;
			position: absolute;
			bottom: 10px;
			width: 100%;

		}
		.ant-modal-close-x {
			color: #fff;
			height: 38px;
			line-height: 38px;
			width: 38px;
			&:hover {
				background-color: rgba(0, 0, 0, .1);
			}
		}
		.fullScreenIcon {
			position: absolute;
			color: #fff;
			top: -38px;
			height: 38px;
			right: 38px;
			font-size: 16px;
			padding: 11px;
			cursor: pointer;
			&:hover {
				background-color: rgba(0, 0, 0, .1);
			}
		}

		.ant-modal-close {
			height: 38px;
			width: 38px;
			i {
				text-align: center;
			}
		}
		.ant-modal-content {
			overflow: hidden;
			height: 100%;
		}
		.ant-modal-body {
			height: calc(100% - 38px);
			position: relative;
			padding-bottom: 60px;
		}
		.ant-modal-header {
			background: #0ACAC7;
			border-bottom-width: 0;
			padding: 8px 24px;
			overflow: hidden;
			.ant-modal-title {
				color: #fff;

			}
		}
	}
</style>
