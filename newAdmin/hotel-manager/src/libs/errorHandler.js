/**
 * 运行时捕捉 js 脚本错误
 * 线上的 js 脚本都是压缩过的，需要用 sourcemap 文件与 source-map 查看原始的报错堆栈信息。
 */
export default {
    install: (Vue, options = {}) => {
        Vue.config.errorHandler = function (err, vm, info) {
            console.log(err);
            console.log(info);
        }
    }
}
