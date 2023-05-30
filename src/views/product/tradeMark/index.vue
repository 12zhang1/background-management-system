<template>
    <div>
        <!-- 添加 -->
        <el-button type="primary" icon="el-icon-plus" style="margin-bottom:10px;margin-top: 10px;" @click="showDialog">添加</el-button>

        <!-- 
            表格组件
            data：表格组件将来要展示的数据----数组
            border：表格边框
            label：显示标题
            width：对应列的宽度
            align:表格的对齐方式
            prop:对应列内容的字段名
            注意1：elmentUI当中的table组件，展示的数据是一列一列进行展示数据
        -->
        <el-table border stripe :data="list">
            <el-table-column type="index" label="序号" width="80" align="center">
            </el-table-column>
            <el-table-column prop="tmName" label="品牌名称" width="width">
            </el-table-column>
            <el-table-column prop="logoUrl" label="品牌LOGO" width="width">
                <!-- 作用域插槽 -->
                <template slot-scope="{row}">
                    <img :src="row.logoUrl" alt="" style="width:60px;height:60px">
                </template>
            </el-table-column>
            <el-table-column prop="prop" label="操作" width="width">
                <template slot-scope="{row}">
                    <el-button type="warning" icon="el-icon-edit" size="mini" @click="updateTradeMark(row)">修改</el-button>
                    <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteTradeMark(row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 分页器 -->
        <!-- 
            current-page:代表的是当前第几页
            total:代表分页器一共需要展示数据的总条数
            page-size:代表的是每一页需要展示多少条数据
            page-sizes:代表可以设置每一页展示多少条数据
            layout:可以实现分页器的布局
            pager-count:按钮的数量
        -->
        <!-- @size-change="handleSizeChange" @current-change="handleCurrentChange"  -->
        <el-pagination :current-page="page" :page-sizes="[3, 5, 10]" :page-size="limit"
            @current-change="getPageList" @size-change="handleSizeChange"
            layout="prev, pager, next, jumper,->,sizes,total" :total="total" style="margin-top:10px;textAlign: center;">
        </el-pagination>

        <!-- 对话框 -->
        <el-dialog :title="this.tmform.id ? '修改品牌' : '添加品牌'" :visible.sync="dialogFormVisible">
            <!-- v-model:收集表单数据 -->
            <el-form style="width:80%" :model="tmform" :rules="rules" ref="ruleForm">
                <el-form-item label="品牌名称" label-width="100px" prop="tmName">
                    <el-input autocomplete="off" v-model="tmform.tmName"></el-input>
                </el-form-item>
                <el-form-item label="品牌LOGO" label-width="100px" prop="logoUrl">
                    <!-- 
                        这里收集数据不能使用v-model，因为他不是表单元素
                        action：设置图片的上传地址
                        on-success：可以检测图片上传成功，当图片上床成功会执行一次
                        before-upload：可以在上传图片之前，执行一次
                    -->
                    <el-upload class="avatar-uploader" action="trade-api/admin/product/fileUpload" :show-file-list="false"
                        :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                        <img v-if="tmform.logoUrl" :src="tmform.logoUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addOrUpdateTradeMark">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>

export default {
    name: 'tradeMark',
    data() {
        return {
            //初始页
            page: 1,
            //当前分页展示多少条数据
            limit: 5,
            //数据总条数
            total: 0,
            //列表展示的数据
            list: [],
            //控制对话框显示与隐藏
            dialogFormVisible: false,
            //收集表单数据，属性key不能瞎写要看api文档
            tmform: {
                logoUrl: '',
                tmName: ''
            },
            //表单验证规则
            rules: {
                //required:必须要效验字段  message 提示信息  trigger:用户行为设置
                tmName: [
                    { required: true, message: '请输入产品名称', trigger: 'blur' },
                    { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'change' }
                ],
                logoUrl: [
                    { required: true, message: '请选择品牌图片' }
                ],
            },
        }
    },
    mounted() {
        //调用获取品牌列表数据的方法
        this.getPageList()
    },
    methods: {
        //获取品牌列表的数据
        async getPageList(pager = 1) {
            this.page = pager
            //解构出参数
            const { page, limit } = this
            const result = await this.$API.trademark.reqTradeMarkList(page, limit)
            if (result.code == 200) {
                this.total = result.data.total
                this.list = result.data.records
            }
        },
        //当分页器某一页需要展示数据发生变化的时候会触发
        handleSizeChange(limit) {
            this.limit = limit
            this.getPageList()
        },
        //点击添加按钮显示对话框
        showDialog() {
            this.dialogFormVisible = true
            //清空数据
            this.tmform = {
                logoUrl: '',
                tmName: ''
            }
        },
        //修改某个品牌
        updateTradeMark(row) {
            //row当前用户点击的那个品牌信息
            //显示对话框
            this.dialogFormVisible = true
            //浅拷贝
            this.tmform = {...row }
            console.log(row);
        },
        //上传图片相关的回调，图片上传成功
        handleAvatarSuccess(res, file) {
            //res:上传成功之后返回前端数据
            //file:上传成功之后服务器返回前端数据
            //存储品牌图片数据，将来需要带给服务器
            this.tmform.logoUrl = res.data
        },
        //点击修改按钮显示对话框，图片上传之前
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        },
        //添加按钮(添加品牌)
        addOrUpdateTradeMark() {
            //当全部验证字段通过，再去书写业务逻辑
            this.$refs.ruleForm.validate(async (success) => {
                // console.log(success);
                //如果全部字段符合条件
                if (success) {
                    this.dialogFormVisible = false
                    //发请求添加|修改品牌信息
                    const result = await this.$API.trademark.reqAddOrUpdateTradeMark(this.tmform)
                    if (result.code == 200) {
                        //弹出提示框：添加|修改成功
                        this.$message({
                            message: this.tmform.id ? "修改品牌成功" : "添加品牌成功",
                            type: 'success'
                        });
                        //添加或者修改成功后需要再次发起请求获取品牌列表数据进行展示
                        //如果添加品牌：停留在第一页，修改品牌应该留在当前页面
                        this.getPageList(this.tmform.id ? this.page : 1)
                    }
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        //删除品牌的操作
        deleteTradeMark(row) {
            this.$confirm(`确定要删除${row.tmName}吗?`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                //当用户点击确定按钮的时候触发
                const result = await this.$API.trademark.reqDeleteTradeMark(row.id)
                if (result.code == 200) {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    this.getPageList(this.list.length > 1 ? this.page : this.page - 1)
                }
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        }
    }
}
</script>


<style>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
}

.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}

.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>