//将四个模块的请求接口函数统一对外暴露
import * as trademark from "./product/tradeMark"
import * as attr from "./product/attr"
import * as sku from "./product/sku"
import * as spu from "./product/spu"
//权限管理模块
import * as user from "./Privilege/user"
import * as role from "./Privilege/role"
import * as permission from "./Privilege/permission"


//对外暴露
export default {
    trademark,
    attr,
    sku,
    spu,
    user,
    role,
    permission
}