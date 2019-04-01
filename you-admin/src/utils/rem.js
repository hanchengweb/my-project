const baseSize = 100

function setRem() {
  const cWidth = document.documentElement.clientWidth;
  if (cWidth > 1205) {
    document.getElementsByTagName('html')[0].style.fontSize = (cWidth / 1920 * baseSize) + "px"
  } else {
    document.getElementsByTagName('html')[0].style.fontSize = (1205 / 1920 * baseSize) + "px"
  }
}

setRem()

window.onresize = function() {
  setRem()
}