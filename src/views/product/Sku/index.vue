<template>
    <div>
        <!-- 表格 -->
        <el-table border :data="records" style="width: 100%;margin-top: 20px;">
            <el-table-column type="index" label="序号" align="center" width="80"></el-table-column>
            <el-table-column prop="skuName" label="名称"></el-table-column>
            <el-table-column prop="skuDesc" label="描述"></el-table-column>
            <el-table-column label="默认图片" width="120" align="center">
                <template slot-scope="{row}">
                    <img :src="row.skuDefaultImg" alt="" style="wigth:80px;height:80px">
                </template>
            </el-table-column>
            <el-table-column prop="weight" label="重量(KG)" width="120" align="center"></el-table-column>
            <el-table-column prop="price" label="价格(元)" width="120" align="center"></el-table-column>
            <el-table-column label="操作" width="240">
                <template slot-scope="{row}">
                    <el-button type="success" size="mini" icon="el-icon-bottom" v-if="row.isSale == 0"
                        @click="sale(row)"></el-button>
                    <el-button type="info" size="mini" icon="el-icon-top" v-else @click="cancel(row)"></el-button>
                    <el-button type="primary" size="mini" icon="el-icon-edit" @click="edit"></el-button>
                    <el-button type="info" size="mini" icon="el-icon-info" @click="getSkuInfo(row)"></el-button>
                    <el-popconfirm :title="`确定删除${row.skuName}信息吗？`" @onConfirm="deleteSku(row)">
                        <el-button type="danger" size="mini" icon="el-icon-delete" slot="reference"
                            style="margin-left:10px"></el-button>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页器   -->
        <el-pagination :current-page="page" :page-sizes="[3, 5, 10]" :page-size="limit" style="text-align:center;"
            layout="prev, pager, next, jumper,->,total, sizes" :total="total" @size-change="handleSizeChange"
            @current-change="getSkuList">
        </el-pagination>
        <!-- 抽屉效果 -->
        <el-drawer :visible.sync="show" :show-close="false" size="40%">
            <el-row>
                <el-col :span="5">名称</el-col>
                <el-col :span="16">{{ skuInfo.skuName }}</el-col>
            </el-row>
            <el-row>
                <el-col :span="5">描述</el-col>
                <el-col :span="16">{{ skuInfo.skuDesc }}</el-col>
            </el-row>
            <el-row>
                <el-col :span="5">价格</el-col>
                <el-col :span="16">{{ skuInfo.price }}元</el-col>
            </el-row>
            <el-row>
                <el-col :span="5">平台属性</el-col>
                <el-col :span="16">
                    <template>
                        <el-tag type="success" v-for="item in skuInfo.skuAttrValueList" :key="item.id" style="margin:5px">{{
                            item.attrId }}-{{ item.valueId }}</el-tag>
                    </template>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="5">商品图片</el-col>
                <el-col :span="16">
                    <template>
                        <div class="block">
                            <el-carousel height="250px">
                                <el-carousel-item v-for="item in skuInfo.skuImageList" :key="item.id">
                                    <img :src="item.imgUrl" alt="" style="width:100%;height:100%">
                                </el-carousel-item>
                            </el-carousel>
                        </div>
                    </template>
                </el-col>
            </el-row>
        </el-drawer>
    </div>
</template>

<script>
export default {
    name: 'Sku',
    data() {
        return {
            page: 1,//当前第几页
            limit: 10,//当前页展示多少条数据
            total: 0,//一共多少条数据
            records: [], //sku列表的数据
            skuInfo: {},//存储sku详情信息
            show: false,//控制抽屉的显示与隐藏
        }
    },
    mounted() {
        this.getSkuList()
    },
    methods: {
        //获取sku列表数据
        async getSkuList(pages = 1) {
            this.page = pages
            //解构出参数
            const { page, limit } = this
            const result = await this.$API.sku.reqSkuList(page, limit)
            if (result.code == 200) {
                this.total = result.data.total
                this.records = result.data.records
            }
        },
        //分页器事件
        handleSizeChange(limit) {
            this.limit = limit
            this.getSkuList()
        },
        //上架
        async sale(row) {
            const result = await this.$API.sku.reqSale(row.id)
            if (result.code == 200) {
                row.isSale = 1
                this.$message({ type: 'success', message: '上架成功' })
                this.getSkuList()
            }
        },
        //下架
        async cancel(row) {
            const result = await this.$API.sku.reqCancel(row.id)
            if (result.code == 200) {
                row.isSale = 0
                this.$message({ type: 'success', message: '下架成功' })
                this.getSkuList()
            }
        },
        //修改
        edit() {
            this.$message("正在开发中...")
        },
        //获取sku详情页数据
        async getSkuInfo(spu) {
            //显示抽屉效果
            this.show = true
            //发请求获取数据
            const result = await this.$API.sku.reqSkuById(spu.id)
            if (result.code == 200) {
                this.skuInfo = result.data
            }
        },
        //删除sku
        async deleteSku(spu) {
            const result = await this.$API.sku.reqDeleteSku(spu.id)
            if (result.code == 200) {
                this.$message({ type: 'success', message: '删除成功' })
                this.getSkuList()
            }
        }
    },
}
</script>

<style>
.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
}
.el-carousel__button {
    width: 10px;
    height: 10px;
    background: #409EFF;
    border-radius: 50%;
}
</style>
<style  scoped>
.el-row .el-col-5 {
    text-align: right;
    font-size: 18px;
}

.el-col {
    margin: 10px;
}

</style>