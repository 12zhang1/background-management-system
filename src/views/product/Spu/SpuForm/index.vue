<template>
    <div>
        <el-form label-width="80px" :model="spu">
            <el-form-item label="SPU名称">
                <el-input placeholder="SPU名称" v-model="spu.spuName"></el-input>
            </el-form-item>
            <el-form-item label="品牌">
                <el-select placeholder="请选择品牌" v-model="spu.tmId">
                    <el-option :label="tm.tmName" :value="tm.id" v-for="tm in trademarkList" :key="tm.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="SPU描述">
                <el-input type="textarea" rows="4" placeholder="描述" v-model="spu.description"></el-input>
            </el-form-item>
            <el-form-item label="SPU图片">
                <!-- 
                    action:图片的上传地址
                    list-type:文件列表的类型
                    on-preview:图片预览的时候会触发
                    on-remove:当删除图片的时候会触发
                    file-list:上传的文件列表
                -->
                <el-upload action="/trade-api/admin/product/fileUpload" list-type="picture-card" :file-list="spuImageList"
                    :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :on-success="handlerSuccess">
                    <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
            </el-form-item>
            <el-form-item label="销售属性">
                <el-select :placeholder="`还有${unSelectSaleAttr.length}个未选择`" v-model="attrIdAndAttrName">
                    <el-option :label="unSelectSale.name" :value="`${unSelectSale.id}:${unSelectSale.name}`"
                        v-for="unSelectSale in unSelectSaleAttr" :key="unSelectSale.id"></el-option>
                </el-select>
                <el-button type="primary" icon="el-icon-plus" style="margin-left:10px" :disabled="!attrIdAndAttrName"
                    @click="addSaleAttr">添加销售属性</el-button>
                <el-table border style="width: 100%;margin-top: 5px;" :data="spu.spuSaleAttrList">
                    <el-table-column type="index" label="序号" align="center" width="80">
                    </el-table-column>
                    <el-table-column prop="saleAttrName" label="属性名" width="180px">
                    </el-table-column>
                    <el-table-column prop="address" label="属性值名称列表">
                        <template slot-scope="{row}">
                            <el-tag :key="tag.id" v-for="(tag, index) in row.spuSaleAttrValueList" closable
                                :disable-transitions="true" @close="row.spuSaleAttrValueList.splice(index, 1)">
                                {{ tag.saleAttrValueName }}
                            </el-tag>
                            <el-input class="input-new-tag" v-if="row.inputVisible" v-model="row.inputValue"
                                ref="saveTagInput" size="small" @keyup.enter.native="handleInputConfirm(row)"
                                @blur="handleInputConfirm(row)">
                            </el-input>
                            <el-button v-else class="button-new-tag" size="small" @click="showInput(row)">添加</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column prop="address" label="操作" width="180px">
                        <template slot-scope="{$index}">
                            <el-button type="danger" icon="el-icon-delete" size="mini"
                                @click="deleteSaltAttr($index)"></el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="addOrUpdateSpu">保存</el-button>
                <el-button @click="cancel">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    name: 'SpuForm',
    data() {
        return {
            dialogImageUrl: '',
            dialogVisible: false,
            //spu属性初始化的时候是一个空对象，在修改spu的时候，胡向服务器发请求，返回spu信息(对象)，在修改的时候可以利用服务器返回的这个对象收集最新的数据提交给服务器
            //添加spu,如果是添加spu的时候并没有向服务器发请求，
            spu: {
                //三级分类的id
                category3Id: 0,
                //描述
                description: "",
                //spu名称
                spuName: "",
                //平台的id
                tmId: "",
                //收集SPU图片的信息
                spuImageList: [
                    // {
                    //     id: 0,
                    //     imgName: "",
                    //     imgUrl: "",
                    //     spuId: 0
                    // }
                ],
                //平台属性与属性值收集
                spuSaleAttrList: [
                    // {
                    //     baseSaleAttrId: 0,
                    //     id: 0,
                    //     saleAttrName: "",
                    //     spuId: 0,
                    //     spuSaleAttrValueList: [
                    //         // {
                    //         //     baseSaleAttrId: 0,
                    //         //     id: 0,
                    //         //     isChecked: "",
                    //         //     saleAttrName: "",
                    //         //     saleAttrValueName: "",
                    //         //     spuId: 0
                    //         // }
                    //     ]
                    // }
                ],
            },
            trademarkList: [],//存储品牌信息
            spuImageList: [], //存储图片信息
            baseSaleAttrList: [],//存储平台销售属性
            attrIdAndAttrName: '',//收集未选择的销售属性的id
        };
    },
    methods: {
        //点击删除图标的时候会调用
        handleRemove(file, fileList) {
            //file参数：代表的是删除的那张图片
            //fileList：照片墙删除某一张图片以后，剩余的其他的图片
            //对已有的图片[照片墙中显示的图片进行收集]
            this.spuImageList = fileList
        },
        //照片墙预览的回调
        handlePictureCardPreview(file) {
            console.log(123);
            //将图片地址赋值给这个属性
            this.dialogImageUrl = file.url;
            //对话框显示
            this.dialogVisible = true;
        },
        //图片上传成功的回调
        handlerSuccess(response, file, fileList) {
            //response:成功的回调
            //fileList:图片的信息
            this.spuImageList = fileList
        },
        //发请求获取初始数据
        async initSpuData(spu) {
            //获取spu信息
            const spuInfo = await this.$API.spu.reqSpu(spu.id)
            if (spuInfo.code == 200) {
                this.spu = spuInfo.data
            }
            //获取品牌信息
            const trademarResult = await this.$API.spu.reqTrademarkList()
            if (trademarResult.code == 200) {
                this.trademarkList = trademarResult.data
            }
            //获取spu图片的数据
            const spuImageResult = await this.$API.spu.reqSpuImageList(spu.id)
            if (spuImageResult.code == 200) {
                //要修改数据内的格式例如: [{name: 'food.jpg', url: 'https://xxx.cdn.com/xxx.jpg'}]
                this.spuImageList = spuImageResult.data
                this.spuImageList.forEach(item => {
                    item.name = item.imgName
                    item.url = item.imgUrl
                })
            }
            //获取平台销售属性
            const baseSaleAttrResult = await this.$API.spu.reqBaseSaleAttrList()
            if (baseSaleAttrResult.code == 200) {
                this.baseSaleAttrList = baseSaleAttrResult.data
            }
        },
        //添加销售属性
        addSaleAttr() {
            const arr = this.attrIdAndAttrName.split(":")
            const baseSaleAttrId = arr[0]
            const saleAttrName = arr[1]
            //向spu对象的spuSaleAttrList属性里面添加新的销售属性
            const newSaleAttr = { baseSaleAttrId, saleAttrName, spuSaleAttrValueList: [] }
            this.spu.spuSaleAttrList.push(newSaleAttr)
            this.attrIdAndAttrName = ''
        },
        //添加按钮的回调
        showInput(row) {
            //点击销售属性值当中添加按钮的时候，需要有button变为input，通过当前销售属性的inputVisible控制
            //挂载在销售属性身上的响应式数据inputVisible，控制button与input切换
            this.$set(row, 'inputVisible', true)
            //通过响应式数据inputValue收集销售属性值
            this.$set(row, 'inputValue', '')
        },
        //el-input失去焦点的回调
        handleInputConfirm(row) {
            //解构出销售属性当中收集数据
            const { baseSaleAttrId, inputValue } = row
            //属性值不能为空
            if (inputValue.trim() == '') {
                this.$message.error('属性值不能为空')
                return
            }

            //属性值不能重复
            const result = row.spuSaleAttrValueList.some(item => item.saleAttrValueName == inputValue)
            console.log(result);
            if (result) {
                return
            }

            //新增的属性值
            const newSaleAttrValue = { baseSaleAttrId, saleAttrValueName: inputValue }
            //向spuSaleAttrValueList数组里面追加数据
            row.spuSaleAttrValueList.push(newSaleAttrValue)
            //修改inputVisible显示button
            row.inputVisible = false
        },
        //删除属性
        deleteSaltAttr(index) {
            this.spu.spuSaleAttrList.splice(index, 1)
            this.$message({
                message: '删除成功',
                type: 'success'
            })
        },
        //保存修改按钮
        async addOrUpdateSpu() {
            //整理参数：需要整理照片墙的数据
            //携带参数：对于图片，需要携带imageName与imageUrl字段
            this.spu.spuImageList = this.spuImageList.map(item => {
                return {
                    iamgeName: item.name,
                    imageUrl: (item.response && item.response.data) || item.url
                }
            })
            //发请求
            const result = await this.$API.spu.reqAddOrUpdateSpu(this.spu)
            if (result.code == 200) {
                this.$message({
                    message: '保存spu成功',
                    type: 'success'
                })
                this.$emit('changeScene', { scene: 0, flag: this.spu.id ? '修改' : '删除' })
            }
            //清除数据
            Object.assign(this._data, this.$options.data())
        },
        //点击添加spu的时候发请求
        async addSpuData(category3Id) {
            //添加spu的时候收集三级分类的id
            this.spu.category3Id = category3Id
            //获取品牌信息
            const trademarResult = await this.$API.spu.reqTrademarkList()
            if (trademarResult.code == 200) {
                this.trademarkList = trademarResult.data
            }
            //获取平台销售属性
            const baseSaleAttrResult = await this.$API.spu.reqBaseSaleAttrList()
            if (baseSaleAttrResult.code == 200) {
                this.baseSaleAttrList = baseSaleAttrResult.data
            }
        },
        //取消按钮
        cancel() {
            this.$emit('changeScene', { scene: 0, flag: '' })
            //清理数据
            //Object.assign:es6中新增的方法可以合并对象
            //组件实例this._data可以操作data当中响应式数据
            //this.$options可以获取配置对象，配置对象的data函数执行，返回的响应式数据为空
            Object.assign(this._data, this.$options.data())
        }
    },
    computed: {
        //计算出还未选择的销售属性
        unSelectSaleAttr() {
            //整个平台的销售属性一共三个：尺寸、颜色、版本----baseSaleAttrList
            //当前spu拥有的属于自己的销售属性spu.spuSaleAttrList
            //数组的过滤方法，可以从已有的数组当中过滤出用户需要的元素，并返回一个新的数据
            const result = this.baseSaleAttrList.filter(item => {
                //every数组的方法，会返回一个布尔值
                return this.spu.spuSaleAttrList.every((item1) => {
                    return item.name != item1.saleAttrName
                })
            })
            return result
        }
    }
}
</script>

<style>
.el-tag+.el-tag {
    margin-left: 10px;
}

.button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
}

.input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
}
</style>