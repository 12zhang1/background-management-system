//spu相关的API请求
//引入axios对axios进行二次封装
import request from '@/utils/request-trade'

//获取spu列表数据
//url /admin/product/{page}/{limit}
export const reqSpuList = (page, limit, category3Id) => {
    return request({
        url: `/admin/product/${page}/${limit}`,
        method: 'get',
        params: { category3Id }
    })
}

//获取spu信息
//url /admin/product/getSpuById/{spuId}  method:get
export const reqSpu = (spuId) => request({ url: `/admin/product/getSpuById/${spuId}`, method: 'get' })

//获取品牌信息
//url /admin/product/baseTrademark/getTrademarkList method:get
export const reqTrademarkList = () => request({ url: '/admin/product/baseTrademark/getTrademarkList', method: 'get' })

//获取spu图片的接口
//url /admin/product/spuImageList/{spuId}  method:get
export const reqSpuImageList = (spuId) => request({ url: `/admin/product/spuImageList/${spuId}`, method: 'get' })

//获取平台全部销售属性----整个平台销售属性一共三个
//url /admin/product/baseSaleAttrList
export const reqBaseSaleAttrList = () => request({ url: '/admin/product/baseSaleAttrList', method: 'get' })

//修改SPU||添加SPU：对于修改或者添加，携带给服务器参数都大致一样的，唯一的区别就是携带的参数是否带有id
//url  /admin/product/updateSpuInfo  修改
//url /admin/product/saveSpuInfo    添加
export const reqAddOrUpdateSpu = (skuInfo) => {
    if (skuInfo.id) {
        //修改
        return request({
            url: '/admin/product/updateSpuInfo',
            method: 'post',
            data: skuInfo
        })
    } else {
        return request({
            url: '/admin/product/saveSpuInfo',
            method: 'post',
            data: skuInfo
        })
    }
}

//删除spu
//url  /admin/product/deleteSpu/{spuId}  method：delete
export const reqDeleteSpu = (spuId) => {
    return request({
        url: `/admin/product/deleteSpu/${spuId}`,
        method: "delete"
    })
}

//获取图片的数据
//URL /admin/product/spuImageList/{spuId}  get
export const reqSpuImageLists = (spuId) => {
    return request({
        url: `/admin/product/spuImageList/${spuId}`,
        method: 'get'
    })
}

//获取销售属性的数据
//url /admin/product/spuSaleAttrList/{spuId}  get
export const reqSpuSaleAttrList = (spuId) => {
    return request({
        url: `/admin/product/spuSaleAttrList/${spuId}`,
        method: 'get'
    })
}

//获取平台属性的数据
//url  /admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id}  GET
export const reqAttrInfoList = (category1Id, category2Id, category3Id) => {
    return request({
        url: `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,
        method: 'get'
    })
}

//保存sku
//url  /admin/product/saveSkuInfo post
export const reqAddSku = (skuInfo) => request({ url: '/admin/product/saveSkuInfo', method: 'post', data: skuInfo })

//获取sku列表数据
//url  /admin/product/findBySpuId/{spuId}  get
export const reqSkuList=(spuId)=>request({url:`/admin/product/findBySpuId/${spuId}`,method:'get'})