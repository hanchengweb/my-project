export function getDay () {
  var date = new Date()
  var Y = date.getFullYear()
  var M = date.getMonth() + 1
  var D = date.getDate()
  if (M < 10) {
    M = '0' + M
  }
  if (D < 10) {
    D = '0' + D
  }
  return Y + '-' + M + '-' + D
}
export function getDay2 (timedap) {
  var date = new Date(timedap)
  var Y = date.getFullYear()
  var M = date.getMonth() + 1
  var D = date.getDate()
  if (M < 10) {
    M = '0' + M
  }
  if (D < 10) {
    D = '0' + D
  }
  return Y + '-' + M + '-' + D
}
export function getSixmoun () {
  var date = new Date()
  var Y = date.getFullYear()
  var M = date.getMonth() + 1
  var D = date.getDate()
  if (M < 10) {
    M = '0' + M
  }
  if (D < 10) {
    D = '0' + D
  }
  var tom = Y + '-' + M + '-' + D
  var M2, Y2, D2
  if (M < 7) {
    M2 = Number(M - 6) + 12
    Y2 = Y - 1
  } else {
    M2 = Number(M) - 6
    Y2 = Y
  }
  if (D < 28) {
    D2 = D
  } else {
    if (
      M2 === 1 ||
      M2 === 3 ||
      M2 === 5 ||
      M2 === 7 ||
      M2 === 8 ||
      M2 === 10 ||
      M2 === 12
    ) {
      D2 = 31
    } else {
      D2 = 30
    }
    if (M2 === 2) {
      var cond1 = Y2 % 4 === 0 // 条件1：年份必须要能被4整除
      var cond2 = Y2 % 100 !== 0 // 条件2：年份不能是整百数
      var cond3 = Y2 % 400 === 0 // 条件3：年份是400的倍数
      var cond = (cond1 && cond2) || cond3
      if (cond) {
        // 是闰年
        D2 = 29
      } else {
        D2 = 28
      }
    } else {
      D2 = D
    }
  }
  if (M2 < 10) {
    M2 = '0' + M2
  }
  // if (D2 < 10) {
  //   D2 = '0' + D2
  // }
  var ago = Y2 + '-' + M2 + '-' + D2
  return [tom, ago]
}
