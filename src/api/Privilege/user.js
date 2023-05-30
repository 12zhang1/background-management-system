//引入axios对axios进行二次封装
import request from '@/utils/request'

//对外暴露登录接口函数
export function login(data) {
    return request({
        url: '/admin/acl/index/login',
        method: 'post',
        data
    })
}

//对外暴露获取用户信息函数
export function getInfo(token) {
    return request({
        url: '/admin/acl/index/info',
        method: 'get',
        params: { token }
    })
}

//对外暴露退出登录函数
export function logout() {
    return request({
        url: '/admin/acl/index/logout',
        method: 'post'
    })
}


//获取后台用户分页列表(带搜索)
export const resUserList = (page, limit, searchObj) => {
    return request({
        url: `/admin/acl/user/${page}/${limit}`,
        method: 'get',
        params: searchObj
    })
}

//批量删除多个用户
export const reqRemoveUser = (ids) => {
    return request({
        url: '/admin/acl/user/batchRemove',
        method: 'delete',
        data: ids
    })
}

//保存一个新的后台用户
export const reqAddOrUpdateUser = (user) => {
    if (user.id) {
        return request({
            url: '/admin/acl/user/update',
            method: 'put',
            data: user
        })
    }
    return request({
        url: '/admin/acl/user/save',
        method: 'post',
        data: user
    })
}

//获取某个用户的所有角色
export const reqRoles = (userId) => {
    return request({
        url: `/admin/acl/user/toAssign/${userId}`,
        method: 'get'
    })
}

//给某个用户分配角色
// roleId的结构: 字符串, 'rId1,rId2,rId3'
export const assignRoles = (userId, roleId) => {
    return request({
        url: '/admin/acl/user/doAssign',
        method: "post",
        params: {
            userId,
            roleId
        }
    })
}

//删除某个用户
export const reqRemoveById = (id) => {
    return request({
        url: `/admin/acl/user/remove/${id}`,
        method: 'delete'
    })
}
