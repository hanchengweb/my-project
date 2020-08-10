export const fullScreen = {
  data () {
    return {
      modalWidth: '1000px',
      modalHeight: '1000',
      modalStyle: '',
      isFullScreen: false,
      modalWidthMater: '1000px',
      modalHeightMater: '1000',
      modalStyleMater: '',
      isFullScreenMater: false

    }
  },
  watch: {
    isFullScreen (val) {
      this.modalWidth = val ? document.getElementById('app').clientWidth : document.getElementById('app').clientWidth * 0.9
      this.modalHeight = val ? (document.getElementById('app').clientHeight - 38) : document.getElementById('app').clientHeight * 0.8
      this.modalStyle = val ? `top:0;height:${document.getElementById('app').clientHeight}px` : ''
      this.$store.commit('setOnresize', Math.random())
    },
    isFullScreenMater (val) {
      this.modalWidthMater = val ? document.getElementById('app').clientWidth : document.getElementById('app').clientWidth * 0.9
      this.modalHeightMater = val ? (document.getElementById('app').clientHeight - 38) : document.getElementById('app').clientHeight * 0.8
      this.modalStyleMater = val ? `top:0;height:${document.getElementById('app').clientHeight}px` : ''
      this.$store.commit('setOnresize', Math.random())
    }
  },
  methods: {
    toFullScreen () {
      this.isFullScreen = !this.isFullScreen
    },

    toFullScreenMater () {
      this.isFullScreenMater = !this.isFullScreenMater
    }
  },
  mounted () {
    this.modalWidth = document.getElementById('app').clientWidth * 0.9
    this.modalHeight = document.getElementById('app').clientHeight * 0.8
    this.isFullScreenMater = !this.isFullScreenMater
  }
}
