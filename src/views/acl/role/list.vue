<template>
    <div>
        <el-form inline style="margin-top:10px;height: 55px;">
            <el-form-item>
                <el-input v-model="tempSearchObj.roleName" placeholder="角色名称" />
            </el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="search">查询</el-button>
            <el-button @click="resetSearch">清空</el-button>
        </el-form>
        <div style="margin-bottom: 20px">
            <el-button type="primary" @click="addRole">添加</el-button>
            <el-button type="danger" @click="removeRoles()" :disabled="selectedRoles == 0">批量删除</el-button>
        </div>
        <!-- 表格  -->
        <el-table v-loading="listLoading" :data="roles" @selection-change="handleSelectionChange" style="width: 100%"
            border>
            <el-table-column type="selection" width="60" align="center">
            </el-table-column>
            <el-table-column type="index" label="序号" width="60" align="center">
            </el-table-column>
            <el-table-column label="角色名称">
                <template slot-scope="{row}">
                    <template v-if="row.edit">
                        <el-input v-model="row.roleName" class="edit-input" size="small"
                            style="width:600px;margin-right:20px" />
                        <el-button class="cancel-btn" size="small" icon="el-icon-refresh" type="warning"
                            @click="cancelEdit(row)">
                            取消
                        </el-button>
                    </template>
                    <span v-else>{{ row.roleName }}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" show-overflow-tooltip width="300">
                <template slot-scope="{row}">
                    <el-button type="info" size="mini" icon="el-icon-info" title="分配权限"
                        @click="$router.push(`/acl/role/auth/${row.id}?roleName=${row.roleName}`)"></el-button>
                    <el-button size="mini" type="primary" icon="el-icon-check" title="确定" @click="updateRole(row)"
                        v-if="row.edit" />
                    <el-button size="mini" type="primary" icon="el-icon-edit" title="修改角色" @click="row.edit = true"
                        v-if="!row.edit" />
                    <el-popconfirm :title="`确定删除 ${row.roleName} 吗?`" @onConfirm="removeUser(row.id)">
                        <el-button style="margin-left:10px" slot="reference" type="danger" size="mini" icon="el-icon-delete"
                            title="删除角色"></el-button>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination style="float:right;margin-top:10px" @current-change="getRoleList" background
            layout="prev, pager, next" :total="total">
        </el-pagination>
    </div>
</template>

<script>
export default {
    name: 'role',
    data() {
        return {
            listLoading: false,//加载效果
            page: 1,//分页当前第几页
            limit: 5,//一页展示多少条数据
            total: 0,//总共多少条数据
            tempSearchObj: {
                roleName: '' //收集input的数据
            },
            searchObj: { // 发送请求的条件参数数据
                roleName: '',
            },
            roles: [],//角色列表
            selectedRoles: [] // 所有选中的角色列表
        }
    },
    mounted() {
        this.getRoleList()
    },
    methods: {
        //发请求获取角色信息
        async getRoleList(page = 1) {
            this.page = page
            const { limit, searchObj } = this
            this.listLoading = true
            const result = await this.$API.role.reqRoleList(page, limit, searchObj)
            if (result.code = 20000) {
                const { items, total } = result.data
                this.roles = items.map(item => {
                    item.edit = false // 用于标识是否显示编辑输入框的属性
                    item.originRoleName = item.roleName // 缓存角色名称, 用于取消
                    return item
                })
                this.total = total
                this.listLoading = false
            }
        },
        //搜索
        search() {
            if (this.tempSearchObj.roleName.trim() == '') {
                this.$message.error('请输入要搜索的角色名或关键字!')
                return
            }
            this.searchObj = { ...this.tempSearchObj }
            this.getRoleList()
        },
        //清空input搜索框内容
        resetSearch() {
            this.tempSearchObj = {
                roleName: ''
            }
            this.searchObj = {
                roleName: ''
            }
            this.getRoles()
        },
        //添加角色
        addRole() {
            // 显示添加界面
            this.$prompt('请输入新名称', '添加角色', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
            }).then(({ value }) => {
                this.$API.role.save({ roleName: value }).then(result => {
                    this.getRoleList()
                    this.$message.success('添加角色成功')
                })
            }).catch(() => {
                this.$message.warning('取消添加')
            })
        },
        //当表格复选框发生变化的时候会触发
        handleSelectionChange(selection) {
            this.selectedRoles = selection
        },
        //批量删除
        removeRoles() {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                //拿到选中的角色id
                const ids = this.selectedRoles.map(role => role.id)
                const result = await this.$API.role.reqRemoveRole(ids)
                if (result.code == 20000) {
                    this.$message.scuess('删除成功!')
                    this.getRoleList()
                }
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });

        },
        //取消修改
        cancelEdit(role) {
            role.roleName = role.originRoleName
            role.edit = false
            this.$message.warning('取消角色修改!')
        },
        //确定修改
        async updateRole(role) {
            const result = await this.$API.role.reqUpdateRole({ id: role.id, roleName: role.roleName })
            console.log(result);
            if (result.code == 20000) {
                this.$message.success("修改成功!")
                this.getRoleList()
            }
        },
        //删除一个用户
        async removeUser(roleId) {
            const result = await this.$API.role.reqRemove(roleId)
            if (result.code === 20000) {
                this.$message.success('删除成功!')
                this.getRoleList(this.roles.length === 1 ? this.page - 1 : this.page)
            }
        }
    }
}
</script>

<style></style>