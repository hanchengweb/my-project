export const sortOwner = {
  data () {
    return {
      ownerData: {},
      valToSeq: {},
      seqToVal: {}
    }
  },
  watch: {
    sortOwner (val) {
    }
  },
  methods: {
    sequence (a, b) {
      return a - b
    },
    sortOwnerSeq (data) {
      data && data.length && data.forEach(item => {
        this.valToSeq[item.value] = item.seqno
        this.seqToVal[item.seqno] = item.value
      })
    },
    sortReturnOwnerData (values, data, key) {
      this.sortOwnerSeq(data)
      let owner = key ? values[key] : values.owner
      let arr = [], newArr = []
      owner && owner.length && owner.forEach(item => {
        arr.push(this.valToSeq[item])
      })
      arr = arr.sort(this.sequence)
      arr.forEach(item => {
        newArr.push(this.seqToVal[item])
      })
      values[key || 'owner'] = newArr
      return values
    }
  }

}
