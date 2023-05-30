//平台属性相关的API请求
//引入axios对axios进行二次封装
import request from '@/utils/request-trade'

//获取一级分类数据
//url  /admin/product/getCategory1  method：get
export const reqCategory1List = () => request({ url: '/admin/product/getCategory1', method: 'get' })

//获取二级分类数据
//url  /admin/product/getCategory2/{category1Id}  method：get
export const reqCategory2List = (category1Id) => request({ url: `/admin/product/getCategory2/${category1Id}`, method: 'get' })

//获取三级分类数据的接口
//url  /admin/product/getCategory3/{category2Id}  method：GET 
export const reqCategory3List = (category2Id) => request({ url: `/admin/product/getCategory3/${category2Id}`, method: 'get' })

//获取商品属性的接口
//url  /admin/product/attrInfoList/{category1Id}/{category1Id}/{category3Id}  method:get  需要携带一级、二级、三级菜单的id
export const reqAttrList = (category1Id, category2Id, category3Id) => {
    return request({
        url: `/admin/product/attrInfoList/${category1Id}/${category1Id}/${category3Id}`,
        method: 'get'
    })
}

//添加属性与属性值接口
//url /admin/product/saveAttrInfo methnod post
export const reqAddOrUpdateAttr = (data) => {
    return request({
        url: '/admin/product/saveAttrInfo',
        method: 'post',
        data
    })
}
//接口参数
/**
{
    "attrName": "string",  属性名
    "attrValueList": [     属性名中属性值：因为属性值可以是很多个，因此需要的是数组
        {
            "attrId": 0,   属性的id
            "valueName": "string"  属性值
        }
    ],
    "categoryId": 0,      category3Id
    "categoryLevel": 0,
}
 */

//删除属性接口
//url /admin/product/deleteAttr/{attrId}  method：delete   参数id
export const reqDeleteAttr = (attrId) => request({ url: `/admin/product/deleteAttr/${attrId}`, method: 'delete' })