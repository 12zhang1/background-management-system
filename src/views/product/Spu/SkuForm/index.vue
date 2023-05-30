<template>
    <div>
        <el-form ref="form" label-width="80px">
            <el-form-item label="SPU名称">
                {{ spu.spuName }}
            </el-form-item>
            <el-form-item label="SKU名称">
                <el-input placeholder="SKU名称" v-model="skuInfo.skuName"></el-input>
            </el-form-item>
            <el-form-item label="价格(元)">
                <el-input placeholder="价格(元)" type="number" v-model="skuInfo.price"></el-input>
            </el-form-item>
            <el-form-item label="重量(千克)">
                <el-input placeholder="重量(千克)" v-model="skuInfo.weight"></el-input>
            </el-form-item>
            <el-form-item label="规格描述">
                <el-input type="textarea" rows="4" placeholder="规格描述" v-model="skuInfo.skuDesc"></el-input>
            </el-form-item>
            <el-form-item label="平台属性">
                <el-form :inline="true" class="demo-form-inline">
                    <el-form-item :label="attr.attrName" v-for="attr in attrInfoList" :key="attr.id"
                        style="margin-bottom:10px;">
                        <el-select placeholder="请选择" v-model="attr.attrIdAndValueId">
                            <el-option :label="attrValue.valueName" :value="`${attr.id}:${attrValue.id}`"
                                v-for="attrValue in attr.attrValueList" :key="attrValue.id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </el-form-item>
            <el-form-item label="销售属性">
                <el-form :inline="true" class="demo-form-inline">
                    <el-form-item :label="saleAttr.saleAttrName" v-for="saleAttr in spuSaleAttrList" :key="saleAttr.id">
                        <el-select placeholder="请选择" v-model="saleAttr.attrIdAndValueId">
                            <el-option :label="saleAttrValue.saleAttrValueName"
                                :value="`${saleAttr.id}:${saleAttrValue.id}`"
                                v-for="saleAttrValue in saleAttr.spuSaleAttrValueList" :key="saleAttrValue.id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </el-form-item>
            <el-form-item label="图片列表">
                <el-table ref="multipleTable" tooltip-effect="dark" :data="spuImageList"
                    @selection-change="handleSelectionChange" style="width: 100%" border>
                    <el-table-column type="selection" width="80" align="center">
                    </el-table-column>
                    <el-table-column label="图片" width="180">
                        <template slot-scope="{row}">
                            <img :src="row.imgUrl" alt="" style="width:80px;height: 80px;">
                        </template>
                    </el-table-column>
                    <el-table-column prop="imgName" label="名称">
                    </el-table-column>
                    <el-table-column prop="address" label="操作" width="180">
                        <template slot-scope="{row}">
                            <el-button type="primary" size="mini" v-if="row.isDefault == 0"
                                @click="changeDefault(row)">设置默认</el-button>
                            <el-button size="mini" v-else>默认</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="save">保存</el-button>
                <el-button @click="cancel">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    name: 'SkuForm',
    data() {
        return {
            spuImageList: [],  //图片的数据
            spuSaleAttrList: [], //销售属性的数据
            attrInfoList: {},
            spu: {},
            //收集sku数据的字段
            skuInfo: {
                //第一类收集的数据:父组件给的
                category3Id: 0,
                spuId: 0,
                tmId: 0,
                //第二类：需要通过数据双向绑定v-model收集
                skuName: "",
                price: 0,
                weight: "",
                skuDesc: "",

                //第三类：需要自己书写代码
                //收集图片
                skuImageList: [
                    // {
                    //     imgName: "string",
                    //     imgUrl: "string",
                    //     isDefault: "string",
                    //     spuImgId: 0
                    // }
                ],
                skuDefaultImg: "",
                //平台属性
                skuAttrValueList: [
                    // {
                    //     attrId: 0,
                    //     valueId: 0,
                    // }
                ],
                //销售属性
                skuSaleAttrValueList: [
                    // {
                    //     id: 0,
                    //     saleAttrId: 0,
                    //     saleAttrName: "string",
                    //     saleAttrValueId: 0,
                    //     saleAttrValueName: "string",
                    //     skuId: 0,
                    //     spuId: 0
                    // }
                ],
            },
            //收集图片的数据字段：但是需要注意，收集的数据目前缺少isDefault字段，将来提交给服务器数据的时候，需要整理参数
            imageList: [],
        }
    },
    methods: {
        //父组件调用子组件的回调
        async getData(category1Id, category2Id, spu) {
            this.spu = spu
            //获取图片的数据
            const result1 = await this.$API.spu.reqSpuImageLists(spu.id)
            if (result1.code == 200) {
                let list = result1.data
                list.forEach(item => {
                    item.isDefault = 0
                });
                this.spuImageList = list
            }
            //获取销售属性的数据
            const result2 = await this.$API.spu.reqSpuSaleAttrList(spu.id)
            if (result2.code == 200) {
                this.spuSaleAttrList = result2.data
            }
            //获取平台属性的数据
            const result3 = await this.$API.spu.reqAttrInfoList(category1Id, category2Id, spu.category3Id)
            if (result3.code == 200) {
                this.attrInfoList = result3.data
            }
        },
        //table表格复选框按钮的事件
        handleSelectionChange(params) {
            //获取到用户选中图片的信息数据，但是需要注意，当前收集的数据当中，缺少isDefault字段
            this.imageList = params
        },
        //排他操作
        changeDefault(row) {
            //将图片列表数据的isDefault字段设置为0
            this.spuImageList.forEach(item => {
                item.isDefault = 0
            })
            //点击那个图片的isDefault变为1
            row.isDefault = 1
            //收集默认图片的地址
            this.skuInfo.skuDefaultImg = row.imgUrl
        },
        //取消按钮的回调
        cancel() {
            this.$emit('changeScenes', 0)
            //清除数据
            Object.assign(this._data, this.$options.data())
        },
        //保存按钮的回调
        async save() {
            //解构参数
            const { spuSaleAttrList, attrInfoList, skuInfo, imageList } = this
            //整理平台属性参数
            let arrAttr = []
            attrInfoList.forEach(item => {
                //当前平台属性用户进行选择
                if (item.attrIdAndValueId) {
                    const [attrId, valueId] = item.attrIdAndValueId.split(":")
                    let obj = { attrId, valueId }
                    arrAttr.push(obj)
                }
            })
            skuInfo.skuAttrValueList = arrAttr

            //整理销售属性
            let arrSale = []
            spuSaleAttrList.forEach(item => {
                if (item.attrIdAndValueId) {
                    const [attrId, valueId] = item.attrIdAndValueId.split(":")
                    let obj = { attrId, valueId }
                    arrSale.push(obj)
                }
            })
            skuInfo.skuSaleAttrValueList = arrSale

            //整理图片的数据
            skuInfo.skuImageList = imageList.map(item => {
                return {
                    imgName: item.imgName,
                    imgUrl: item.imgUrl,
                    isDefault: item.isDefault,
                    spuImgId: item.id
                }
            })

            //发请求
            const result = await this.$API.spu.reqAddSku(skuInfo)
            if (result.code == 200) {
                this.$emit('changeScenes', 0)
                this.$message({ type: 'success', message: '保存sku成功' })
            }
        },
    }
}
</script>

<style></style>