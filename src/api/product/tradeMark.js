//品牌管理相关的API请求
//引入axios对axios进行二次封装
import request from '@/utils/request-trade'

//获取品牌列表数据
//url /admin/product/baseTrademark/{page}/{limit}  method:get
export const reqTradeMarkList = (page, limit) => {
    return request({
        url: `/admin/product/baseTrademark/${page}/${limit}`,
        method: 'get'
    })
}

//添加品牌信息
//url /admin/product/baseTrademark/save   method:post  两个参数：品牌名称、品牌logo
//修改品牌信息
//url /admin/product/baseTrademark/update  method:put  三个参数：id、品牌名称、品牌logo
export const reqAddOrUpdateTradeMark = (tradeMark) => {
    //根据携带参数是否有id来进行判断是修改还是添加
    if (tradeMark.id) {
        //修改
        return request({
            url: '/admin/product/baseTrademark/update',
            method: "put",
            data: tradeMark
        })
    } else {
        //添加
        return request({
            url: '/admin/product/baseTrademark/save',
            method: 'post',
            data: tradeMark
        })
    }
}

//删除品牌
//url  /admin/product/baseTrademark/remove/{id}  method:delete
export const reqDeleteTradeMark = (id) => {
    return request({
        url: `/admin/product/baseTrademark/remove/${id}`,
        method:'delete'
    })
}