<template>
  <div class="content">
    <div>{{html}}</div>
  </div>
</template>

<script>
import { readRules } from '@/api/user'
import { getToken, getClientId } from '@/utils/user'
export default {
  data () {
    return {
      html: ''
    }
  },
  onShow () {
    readRules({clientid: getClientId(), token: getToken(), code: 'SYSTEM_RULE'}).then(res => {
      this.html = res.rule
    })
  },
  methods: {
  }
}
</script>
<style scope lang="less">
  .content{
    margin:40rpx;
  }
</style>
