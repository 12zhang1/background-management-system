//引入axios对axios进行二次封装
import request from '@/utils/request'

//查看某个角色的权限列表
export const reqToAssign = (roleId) => {
    return request({
        url: `/admin/acl/permission/toAssign/${roleId}`,
        method: 'get'
    })
}


//给某个角色授权
export const reqDoAssign = (roleId, permissionId) => {
    return request({
        url: '/admin/acl/permission/doAssign',
        method: "post",
        params: { roleId, permissionId }
    })
}

//获取菜单
export const reqPermissionList = () => request({ url: '/admin/acl/permission', method: 'get' })

//删除一个权限项
export const removePermission = (id) => {
    return request({
        url: `/admin/acl/permission/remove/${id}`,
        method: 'delete'
    })
}

//添加修改一个权限
export const addOrUpdatePermission = (permission) => {
    if (permission.id) {
        //修改
        return request({
            url: '/admin/acl/permission/update',
            method: 'put',
            data: permission
        })
    } else {
        //添加
        return request({
            url: '/admin/acl/permission/save',
            method: 'post',
            data: permission
        })
    }
}