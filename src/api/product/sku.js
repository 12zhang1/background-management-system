//sku相关的API请求
import request from '@/utils/request-trade'

//获取sku列表数据
//url /admin/product/list/{page}/{limit}  get
export const reqSkuList = (page, limit) => {
    return request({
        url: `/admin/product/list/${page}/${limit}`,
        method: 'get'
    })
}

//上架
//url /admin/product/onSale/{skuId}  get
export const reqSale = (skuId) => request({ url: `/admin/product/onSale/${skuId}`, method: 'get' })

//下架
//url  /admin/product/cancelSale/{skuId}  get
export const reqCancel = (skuId) => request({ url: `/admin/product/cancelSale/${skuId}`, method: 'get' })

//获取sku详情页数据
//url /admin/product/getSkuById/{skuId}  get
export const reqSkuById = (skuId) => request({ url: `/admin/product/getSkuById/${skuId}`, method: 'get' })

//删除sku信息
//url  /admin/product/deleteSku/{skuId} delete
export const reqDeleteSku = (skuId) => request({ url: `/admin/product/deleteSku/${skuId}`, method: 'delete' })