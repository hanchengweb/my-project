import request from '@/utils/request'

//添加商品
export function addGoods(data) {
    return request({
        url: '/admin/addGoods',
        method: 'post',
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        data: data
    })
}

//查看类目
export function listCategory(){
    return request({
        url:'/admin/listCategory',
        method:'get'
    })
}

//添加类目
export function addCategory(data){
    return request({
        url:'/admin/addCategory',
        method:'post',
        headers:{
            'Content-Type':'multipart/form-data'
        },
        data:data
    })
}

//删除类目
export function deleteCategory(data){
    return request({
        url:'/admin/deleteCategory',
        method:'get',
        data:data
    })
}



//查找商品
export function searchGoodsList(query) {
    return request({
        url: '/admin/searchGoodsList',
        method: 'get',
        params:query
    })
}

export function deleteGoods(data) {
    return request({
        url: '/admin/deleteGoods',
        method: 'get',
        data
    })
}

export function queryGoodsInfo(goodsId){
    return request({
        url:'/admin/queryGoodsInfo',
        method:'get',
        params:{goodsId}
    })
}

export function updateIsSale(data){
    return request({
        url:'/admin/queryGoodsInfo',
        method:'get',
        data
    })
}

