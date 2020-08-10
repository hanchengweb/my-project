export function getDay (time) {
  var date = new Date(time)
  var Y = date.getFullYear()
  var M, D, H, S, Se
  if (date.getMonth() + 1 < 10) {
    M = '0' + (date.getMonth() + 1)
  } else {
    M = (date.getMonth() + 1)
  }
  if (date.getDate() < 10) {
    D = '0' + date.getDate()
  } else {
    D = date.getDate()
  }
  if (date.getHours() < 10) {
    H = '0' + date.getHours()
  } else {
    H = date.getHours()
  }
  if (date.getMinutes() < 10) {
    S = '0' + date.getMinutes()
  } else {
    S = date.getMinutes()
  }
  if (date.getSeconds() < 10) {
    Se = '0' + date.getSeconds()
  } else {
    Se = date.getSeconds()
  }
  return Y + '-' + M + '-' + D + ' ' + H + ':' + S + ':' + Se
}
export function getDate (time) {
  var date = new Date(time)
  var Y = date.getFullYear()
  var M, D, H, S, Se
  if (date.getMonth() + 1 < 10) {
    M = '0' + (date.getMonth() + 1)
  } else {
    M = (date.getMonth() + 1)
  }
  if (date.getDate() < 10) {
    D = '0' + date.getDate()
  } else {
    D = date.getDate()
  }
  if (date.getHours() < 10) {
    H = '0' + date.getHours()
  } else {
    H = date.getHours()
  }
  if (date.getMinutes() < 10) {
    S = '0' + date.getMinutes()
  } else {
    S = date.getMinutes()
  }
  if (date.getSeconds() < 10) {
    Se = '0' + date.getSeconds()
  } else {
    Se = date.getSeconds()
  }
  return Y + '-' + M + '-' + D
}
