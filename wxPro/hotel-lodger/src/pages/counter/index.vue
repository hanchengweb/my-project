<template>
  <div class="counter-warp">
    <p>Vuex counter：{{ count }}</p>
    <p>
      <button @click="increment">+</button>
      <button @click="decrement">-</button>
    </p>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    // count () {
    //   return this.$store.state.crement.count
    // }
    ...mapState({
      'count': state => state.crement.count
    })
  },
  methods: {
    increment () {
      this.$store.commit('increment')
    },
    decrement () {
      this.$store.commit('decrement')
    }
  },
  onShow (options) {
    // console.log(options)
  },
  mounted () {
    // console.log(this.$root.$mp)
    // console.log(this.$store.state.crement.count)
    // console.log(this.$root.$mp.query)
  }
}
</script>

<style>
.counter-warp {
  text-align: center;
  margin-top: 100px;
}
.home {
  display: inline-block;
  margin: 100px auto;
  padding: 5px 10px;
  color: blue;
  border: 1px solid blue;
}
</style>
