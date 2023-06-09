<template>
    <div>
        <el-form inline style="margin-top:10px;height: 55px;">
            <el-form-item>
                <el-input v-model="tempSearchObj.username" placeholder="用户名" style="width:200px"></el-input>
            </el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="search">查询</el-button>
            <el-button @click="resetSearch">清空</el-button>
        </el-form>
        <div style="margin-bottom:15px">
            <el-button type="primary" icon="el-icon-plus" @click="showAddUser">添加</el-button>
            <el-button type="danger" @click="revomveUsers" :disabled="selectedIds.length === 0">批量删除</el-button>
        </div>
        <!-- 表格  -->
        <el-table v-loading="listLoading" @selection-change="handleSelectionChange" style="width: 100%" :data="users"
            border>
            <el-table-column type="selection" width="60" align="center">
            </el-table-column>
            <el-table-column type="index" label="序号" width="60" align="center">
            </el-table-column>
            <el-table-column prop="username" label="用户名">
            </el-table-column>
            <el-table-column prop="nickName" label="用户昵称">
            </el-table-column>
            <el-table-column prop="roleName" label="权限列表">
            </el-table-column>
            <el-table-column prop="gmtCreate" label="创建时间">
            </el-table-column>
            <el-table-column prop="gmtModified" label="更新时间">
            </el-table-column>
            <el-table-column label="操作" show-overflow-tooltip>
                <template slot-scope="{row}">
                    <el-button type="info" size="mini" icon="el-icon-s-custom" title="分配角色"
                        @click="showAssignRole(row)"></el-button>
                    <el-button type="primary" size="mini" icon="el-icon-edit" title="修改用户"
                        @click="showUpdateUser(row)"></el-button>
                    <el-popconfirm :title="`确定删除 ${row.username} 吗?`" @onConfirm="removeUser(row.id)">
                        <HintButton style="margin-left:10px" slot="reference" type="danger" size="mini"
                            icon="el-icon-delete" title="删除用户" />
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination style="float:right;margin-top:10px" @current-change="getUsers" background layout="prev, pager, next"
            :total="total">
        </el-pagination>

        <!-- 对话框的结构 -->
        <el-dialog :title="user.id ? '修改用户' : '添加用户'" :visible.sync="dialogUserVisible">
            <el-form ref="userForm" :model="user" :rules="userRules" label-width="120px">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="user.username" />
                </el-form-item>
                <el-form-item label="用户昵称">
                    <el-input v-model="user.nickName" />
                </el-form-item>
                <el-form-item v-if="!user.id" label="用户密码" prop="password">
                    <el-input v-model="user.password" />
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button :loading="loading" type="primary" @click="addOrUpdate">确 定</el-button>
            </div>
        </el-dialog>
        <!-- :before-close="resetRoleData" -->
        <el-dialog title="设置角色" :visible.sync="dialogRoleVisible">
            <el-form label-width="80px">
                <el-form-item label="用户名">
                    <el-input disabled :value="user.username"></el-input>
                </el-form-item>
                <el-form-item label="角色列表">
                    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll"
                        @change="handleCheckAllChange">全选</el-checkbox>
                    <div style="margin: 15px 0;"></div>
                    <el-checkbox-group v-model="userRoleIds" @change="handleCheckedChange">
                        <el-checkbox v-for="role in allRoles" :key="role.id" :label="role.id">{{ role.roleName
                        }}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
            </el-form>

            <div slot="footer">
                <el-button :loading="loading" type="primary" @click="assignRole">保存</el-button>
                <el-button @click="resetRoleData">取消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep'
export default {
    name: 'user',
    data() {
        return {
            loading: false, // 是否正在提交请求中
            listLoading: false,//加载效果
            page: 1,
            limit: 5,
            searchObj: { // 包含请求搜索条件数据的对象
                username: ''
            },
            tempSearchObj: { // 收集搜索条件输入的对象
                username: ''
            },
            users: [],//当前页的用户列表
            total: 0,
            dialogUserVisible: false,//否显示用户添加/修改的dialog
            user: {},
            selectedIds: [], // 所有选择的user的id的数组
            userRules: { // 用户添加/修改表单的校验规则
                username: [
                    { required: true, message: '用户名必须输入' },
                    { min: 2, message: '用户名不能小于2位' }
                ],
                password: [
                    { required: true, validator: this.validatePassword }
                ]
            },
            dialogRoleVisible: false, // 是否显示角色Dialog
            allRoles: [], // 所有角色列表
            userRoleIds: [], // 用户的角色ID的列表
            isIndeterminate: false, // 是否是不确定的
            checkAll: false, // 是否全选
        }
    },
    mounted() {
        this.getUsers()
    },
    methods: {
        //获取用户列表
        async getUsers(page = 1) {
            this.page = page
            this.listLoading = true
            const { limit, searchObj } = this
            const result = await this.$API.user.resUserList(page, limit, searchObj)
            if (result.code == 20000) {
                this.listLoading = false
                const { items, total } = result.data
                this.users = items.filter(item => item.username !== "admin")
                this.total = total - 1
            }
        },
        // 自定义密码校验
        validatePassword(rule, value, callback) {
            if (!value) {
                callback('密码必须输入')
            } else if (!value || value.length < 6) {
                callback('密码不能小于6位')
            } else {
                callback()
            }
        },
        //根据输入的数据进行搜索
        search() {
            if (this.tempSearchObj.username.trim() == '') {
                this.$message.error('请输入要查找的用户名或关键字')
                return
            }
            this.searchObj = { ...this.tempSearchObj }
            this.getUsers()
        },
        //清除搜索框内容
        resetSearch() {
            this.searchObj = {
                username: ''
            }
            this.tempSearchObj = {
                username: ''
            }
            this.getUsers()
        },
        //添加按钮回调
        showAddUser() {
            this.user = {}
            this.dialogUserVisible = true
            this.$nextTick(() => this.$refs.userForm.clearValidate())
        },
        // 显示更新用户的界面
        showUpdateUser(user) {
            this.user = cloneDeep(user)
            this.dialogUserVisible = true
        },
        //取消按钮的回调
        cancel() {
            this.dialogUserVisible = false
            this.user = {}
        },
        //确定按钮的回调
        addOrUpdate() {
            //验证表单信息是否合格
            this.$refs.userForm.validate(async (valid) => {
                if (valid) {
                    const { user } = this
                    this.loading = true
                    const result = await this.$API.user.reqAddOrUpdateUser(user)
                    if (result.code == 20000) {
                        this.loading = false
                        this.$message.success('保存成功!')
                        this.getUsers(user.id ? this.page : 1)
                        this.user = {}
                        this.dialogUserVisible = false
                    }
                }
            })
        },
        //列表复选框状态发生改变的监听回调
        handleSelectionChange(selection) {
            this.selectedIds = selection.map(item => item.id)
        },
        //批量删除的回调
        revomveUsers() {
            this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                const { selectedIds } = this
                const result = await this.$API.user.reqRemoveUser(selectedIds)
                if (result.code == 20000) {
                    this.$message({ type: "success", message: '删除成功' })
                    this.getUsers()
                }
            }).catch(() => {
                this.$message.info('取消删除')
            })
        },
        //分配角色的回调
        showAssignRole(user) {
            this.user = user
            this.dialogRoleVisible = true
            this.getRoles()
        },
        //获取用户角色列表
        async getRoles() {
            const result = await this.$API.user.reqRoles(this.user.id)
            if (result.code == 20000) {
                const { allRolesList, assignRoles } = result.data
                this.allRoles = allRolesList
                this.userRoleIds = assignRoles.map(item => item.id)

                this.checkAll = allRolesList.length === assignRoles.length
                this.isIndeterminate = assignRoles.length > 0 && assignRoles.length < allRolesList.length
            }
        },
        //全选勾选状态发生改变的监听
        handleCheckAllChange(value) {
            // value 当前勾选状态true/false
            // 如果当前全选, userRoleIds就是所有角色id的数组, 否则是空数组
            this.userRoleIds = value ? this.allRoles.map(item => item.id) : []
            // 如果当前不是全选也不全不选时, 指定为false
            this.isIndeterminate = false
        },
        //角色列表选中项发生改变的监听
        handleCheckedChange(value) {
            const { userRoleIds, allRoles } = this
            this.checkAll = userRoleIds.length === allRoles.length && allRoles.length > 0
            this.isIndeterminate = userRoleIds.length > 0 && userRoleIds.length < allRoles.length
        },
        //请求给用户进行角色授权
        async assignRole() {
            const userId = this.user.id
            const roleIds = this.userRoleIds.join(',')
            this.loading = true
            const result = await this.$API.user.assignRoles(userId, roleIds)
            if (result.code == 20000) {
                this.loading = false
                this.$message.success('分配角色成功')
                this.resetRoleData()
                this.getUsers()
            }
        },
        //重置用户角色的数据
        resetRoleData() {
            this.dialogRoleVisible = false
            this.allRoles = []
            this.userRoleIds = []
            this.isIndeterminate = false
            this.checkAll = false
        },
        //删除一个用户的回调
        async removeUser(userId) {
            const result = await this.$API.user.reqRemoveById(userId)
            if (result.code == 20000) {
                this.$message.success('删除成功!')
                this.getUsers()
            }
        }
    }
}
</script>

<style></style>