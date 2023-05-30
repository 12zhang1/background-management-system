//引入axios对axios进行二次封装
import request from '@/utils/request'

//获取角色分页列表带搜索
export const reqRoleList = (page, limit, searchObj) => {
    return request({
        url: `/admin/acl/role/${page}/${limit}`,
        method: 'get',
        params: 'searchObj'
    })
}

//保存一个新角色
export const save = (role) => {
    return request({
        url: '/admin/acl/role/save',
        method: 'post',
        data: role
    })
}

//批量删除角色
export const reqRemoveRole = (ids) => {
    return request({
        url: '/admin/acl/role/batchRemove',
        method: 'delete',
        data: ids
    })
}

//修改角色的所以权限列表
export const reqUpdateRole = (role) => {
    return request({
        url: '/admin/acl/role/update',
        method: 'put',
        data: role
    })
}

//删除某个角色
export const reqRemove = (id) => {
    return request({
        url: `/admin/acl/role/remove/${id}`,
        method: 'delete'
    })
}