<template>
    <div>
        <el-card style="margin-bottom:20px;">
            <!-- 三级联动组件 -->
            <CategorySelect @getCaregoryId="getCaregoryId" :isShow="scene != 0" />
        </el-card>
        <el-card>
            <!-- 将来这里是三部分进行切换 -->
            <div v-show="scene == 0">
                <!-- 展示spu列表的结构 -->
                <el-button type="primary" icon="el-icon-plus" @click="addSpu" :disabled="!category3Id">添加SPU</el-button>
                <!-- 表格 -->
                <el-table :data="records" border style="width: 100%;margin-top: 10px;">
                    <el-table-column type="index" label="序号" width="80" align="center">
                    </el-table-column>
                    <el-table-column prop="spuName" label="SPU名称">
                    </el-table-column>
                    <el-table-column prop="description" label="SPU描述">
                    </el-table-column>
                    <el-table-column prop="address" label="操作">
                        <template slot-scope="{row}">
                            <hint-button type="primary" icon="el-icon-plus" size="mini" title="添加sku"
                                @click="addSku(row)"></hint-button>
                            <hint-button type="warning" icon="el-icon-edit" size="mini" title="修改spu"
                                @click="updateSpu(row)"></hint-button>
                            <hint-button type="info" icon="el-icon-warning-outline" size="mini" title="查看spu全部sku列表"
                                @click="handler(row)"></hint-button>

                            <el-popconfirm title="这是一段内容确定删除吗？" @onConfirm="deleteSpu(row)">
                                <hint-button type="danger" icon="el-icon-delete" size="mini" title="删除spu"
                                    slot="reference"></hint-button>
                            </el-popconfirm>

                        </template>
                    </el-table-column>
                </el-table>
                <!-- 分页器 -->
                <el-pagination @size-change="handleCurrentChange" @current-change="getSpuList" :current-page="page"
                    :page-sizes="[3, 5, 10]" :page-size="limit" layout="prev, pager, next, jumper,->,sizes,total"
                    :total="total" style="margin-top:10px;textAlign: center;">
                </el-pagination>
            </div>
            <!-- 添加|修改spu -->
            <SpuForm v-show="scene == 1" @changeScene="changeScene" ref="spu" />
            <!-- 添加sku -->
            <SkuForm v-show="scene == 2" ref="sku" @changeScenes="changeScenes" />
            <!-- 弹出框 -->
            <el-dialog :title="`${spu.spuName}的sku列表`" :visible.sync="dialogTableVisible" :before-close="close">
                <el-table :data="skuList" style="width: 100%" border v-loading="loading">
                    <el-table-column prop="skuName" label="名称">
                    </el-table-column>
                    <el-table-column prop="price" label="价格">
                    </el-table-column>
                    <el-table-column prop="weight" label="重量">
                    </el-table-column>
                    <el-table-column prop="" label="默认图片">
                        <template slot-scope="{row}">
                            <img :src="row.skuDefaultImg" alt="" style="width:80px;height:80px;">
                        </template>
                    </el-table-column>
                </el-table>
            </el-dialog>
        </el-card>
    </div>
</template>

<script>
import SkuForm from "./SkuForm"
import SpuForm from "./SpuForm"
export default {
    name: 'Spu',
    components: {
        SkuForm,
        SpuForm
    },
    data() {
        return {
            category1Id: '',
            category2Id: '',
            category3Id: '',
            page: 1,//当前第几页
            limit: 5,//一页展示多少条数据
            total: 0,//一共多少条数据
            records: [], //spu列表的数据
            scene: 0,//控制三个添加修改组件的显示与隐藏
            dialogTableVisible: false,//控制弹出框的显示与隐藏
            spu: {},
            skuList: [],//存储的是sku列表的数据
            loading: true, //加载动画
        }
    },
    methods: {
        //自定义事件的回调，获取相应的id
        getCaregoryId({ categoryId, level }) {
            if (level == 1) {
                this.category1Id = categoryId
                this.category2Id = ''
                this.category3Id = ''
            } else if (level == 2) {
                this.category2Id = categoryId
                this.category3Id = ''
            } else {
                this.category3Id = categoryId
                //发请求获取spu列表数据
                this.getSpuList()
            }
        },
        //获取列表数据
        async getSpuList(pages = 1) {
            this.page = pages
            //解构参数
            const { page, limit, category3Id } = this
            const result = await this.$API.spu.reqSpuList(page, limit, category3Id)
            if (result.code == 200) {
                this.total = result.data.total
                this.records = result.data.records
            }
        },
        //修改当前展示多少条数据
        handleCurrentChange(limit) {
            this.limit = limit
            this.getSpuList()
        },
        //添加spu的回调
        addSpu() {
            this.scene = 1
            this.$refs.spu.addSpuData(this.category3Id)
        },
        //修改spu的回调
        updateSpu(row) {
            this.scene = 1
            //父组件调用子组件的方法，让子组件发请求
            this.$refs.spu.initSpuData(row)
        },
        //添加sku的回调
        addSku(row) {
            this.scene = 2
            //父组件调用子组件的方法，让子组件发请求
            const { category1Id, category2Id } = this
            this.$refs.sku.getData(category1Id, category2Id, row)
        },
        //自定义事件的回调
        changeScene({ scene, flag }) {
            this.scene = scene
            if (flag == '修改') {
                this.getSpuList(this.page)
            } else {
                this.getSpuList()
            }
        },
        //删除按钮
        async deleteSpu(row) {
            const result = await this.$API.spu.reqDeleteSpu(row.id)
            if (result.code == 200) {
                this.$message({ type: 'success', message: '删除成功' })
                this.getSpuList(this.records.length > 1 ? this.page : this.page - 1)
            }
        },
        //sku的自定义事件
        changeScenes(scene) {
            this.scene = scene
        },
        //查看spu全部sku列表的回调
        async handler(spu) {
            //点击找个按钮让对话框可见
            this.dialogTableVisible = true
            //保存spu信息
            this.spu = spu
            //获取sku列表的数据进行展示
            const result = await this.$API.spu.reqSkuList(spu.id)
            if (result.code == 200) {
                this.skuList = result.data
                this.loading = false
            }
        },
        //关闭弹出框的回调
        close(done) {
            //loading属性再次变为真
            this.loading = true
            //清除sku列表数据
            this.skuList = []
            //管理对话框
            done()
        }
    }
}
</script>

<style></style>