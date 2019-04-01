<template>
  <div class="app-breadcrumb">
  <el-breadcrumb separator=" | " class="breadcrumb">
    <el-breadcrumb-item class="breadcrumb-item" v-for="(item, index) in levelList" :key="item.path" v-if="item.meta.title">
      <span v-if='index==levelList.length-1' class="text">{{item.meta.title}}</span>
      <router-link v-else :to="item.redirect||item.path" class="text">{{item.meta.title}}</router-link>
    </el-breadcrumb-item>
  </el-breadcrumb>
  <router-link v-if="bt && bt.name" :to="bt.link" class="bt-link">{{bt.name}}</router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      levelList: []
    }
  },
  props: {
    bt: {
      name: String,
      link: String
    }
  },
  watch: {
    $route() {
      this.getBreadcrumb()
    }
  },
  methods: {
    getBreadcrumb() {
      this.levelList = this.$route.matched.filter(item => item.name)
    }
  },
  created() {
    this.getBreadcrumb()
  }
}
</script>

<style scoped>
.app-breadcrumb {
  box-sizing: border-box;
  width: 100%;
  height: .6rem;
  padding-left: .4rem;
  line-height: .6rem;
  border-bottom: 1px solid #E6E6E6;
}
.breadcrumb {
  float: left;
  height: .6rem;
  line-height: .6rem;
}
.text {
  font-size: .18rem;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: #1A1A1A;
}
.bt-link {
  float: right;
  margin-right: 1.1rem;
  font-size: .18rem;
  font-family: PingFangSC-Regular;
  color: #4DC4FF;
  text-decoration: none;
}
</style>
