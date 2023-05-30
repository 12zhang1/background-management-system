<template>
    <div>
        <el-card style="margin-bottom:20px;">
            <!-- 三级联动组件 -->
            <CategorySelect @getCaregoryId="getCaregoryId" :isShow="!isShowTable" />
        </el-card>
        <el-card>
            <div v-show="isShowTable">
                <el-button type="primary" icon="el-icon-plus" :disabled="!category3Id" @click="addAttr">添加属性</el-button>
                <el-table border style="width: 100%;margin-top: 10px;" :data="list">
                    <el-table-column type="index" align="center" label="序号" width="80">
                    </el-table-column>
                    <el-table-column prop="attrName" label="属性名称" width="150">
                    </el-table-column>
                    <el-table-column prop="address" label="属性值列表">
                        <template slot-scope="{row}">
                            <el-tag type="success" v-for="attrValue in row.attrValueList" :key="attrValue.id"
                                style="margin-left:10px;">{{ attrValue.valueName }}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column prop="address" label="操作" width="120">
                        <template slot-scope="{row}">
                            <el-button type="warning" icon="el-icon-edit" size="mini" @click="upadteAttr(row)"></el-button>
                            <el-popconfirm :title="`确定删除${row.attrName}吗？`" @onConfirm="deleteAttr(row)">
                                <el-button slot="reference" type="danger" icon="el-icon-delete" size="mini"
                                    @click="deleteShow = true" style="margin-left:10px;"></el-button>
                            </el-popconfirm>
                        </template>
                    </el-table-column>
                </el-table>
            </div>

            <!-- 添加修改属性的结构 -->
            <div v-show="!isShowTable">
                <el-form :inline="true" class="demo-form-inline" :model="attrInfo">
                    <el-form-item label="属性名">
                        <el-input placeholder="请输入属性名" v-model="attrInfo.attrName"></el-input>
                    </el-form-item>
                </el-form>
                <el-button type="primary" size="default" icon="el-icon-plus" :disabled="!attrInfo.attrName"
                    @click="addAttrList">添加属性</el-button>
                <el-button @click="isShowTable = true">取消</el-button>
                <el-table border style="width: 100%;margin:10px 0;" :data="attrInfo.attrValueList">
                    <el-table-column type="index" align="center" label="序号" width="80">
                    </el-table-column>
                    <el-table-column prop="name" label="属性值名称" width="width">
                        <!-- input与span显示与隐藏 -->
                        <template slot-scope="{row,$index}">
                            <el-input placeholder="请输入内容" v-model="row.valueName" size="mini" v-if="row.flag"
                                @blur="toLook(row)" @keyup.native.enter="toLook(row)" :ref="$index" clearable>
                            </el-input>
                            <span v-else @click="toEdit(row, $index)">{{ row.valueName }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="address" label="操作" width="width">
                        <template slot-scope="{row,$index}">
                            <el-popconfirm :title="`确定删除${row.valueName}吗？`" @onConfirm="deleteAttrValue($index)">
                                <el-button slot="reference" type="danger" icon="el-icon-delete" size="mini"></el-button>
                            </el-popconfirm>
                        </template>
                    </el-table-column>
                </el-table>
                <el-button type="primary" size="default" @click="addOrUpdateAttr"
                    :disabled="attrInfo.attrValueList.length < 1">保存</el-button>
                <el-button @click="isShowTable = true">取消</el-button>
            </div>


        </el-card>
    </div>
</template>

<script>
//按需引入lodash当中的深拷贝
import cloneDeep from "lodash/cloneDeep"
export default {
    name: 'Attr',
    data() {
        return {
            category1Id: '',
            category2Id: '',
            category3Id: '',
            //平台属性数据
            list: [],
            //控制表格显示与隐藏
            isShowTable: true,
            //新增|修改属性需要用的数据
            attrInfo: {
                attrName: "",  //属性名
                attrValueList: [     //属性值
                ],
                categoryId: 0, //三级分类的id
                categoryLevel: 3, //服务器也需要区分三级分类
            }
        }
    },
    methods: {
        //获取子组件的一级、二级、三级列表的id
        getCaregoryId({ categoryId, level }) {
            if (level == 1) {
                //一级分类
                this.category1Id = categoryId
                this.category2Id = ''
                this.category3Id = ''
            } else if (level == 2) {
                //二级分类
                this.category2Id = categoryId
                this.category3Id = ''
            } else {
                //三级分类  这里说明已经有三级分类的id了，可以发请求获取数据了
                this.category3Id = categoryId
                this.getAttrList()
            }
        },
        //发请求获取平台属性数据
        async getAttrList() {
            //解构参数
            const { category1Id, category2Id, category3Id } = this
            const result = await this.$API.attr.reqAttrList(category1Id, category2Id, category3Id)
            if (result.code == 200) {
                this.list = result.data
            }
        },
        //添加属性名操作
        addAttrList() {
            //想属性值的数组里面添加元素
            //attrId：是你相应属性的id，目前而言我们是添加属性的操作，还没有相应的属性的id目前而言给服务器的id为undefined
            //valueName:相应的属性值的名称
            this.attrInfo.attrValueList.push({
                //当attrInfo有id的时候说明是修改，修改attrId需要有id，这是的id就是attrId的id
                //当attrInfo没有id的时候说明是新增，新增不需要id，attrInfo没有id就是undefined
                attrId: this.attrInfo.id,   //属性名的id
                valueName: "",
                //flag属性：给每一个属性值添加一个标记flag，用户切换查看模式与编辑模式，好处，每一个属性值都可以控制自己的模式切换
                //当前flag属性，响应式数据(数据变化试图跟着变化)
                flag: true,
            })
            //input框自动聚焦
            this.$nextTick(() => {
                //一定是最后一个input框
                this.$refs[this.attrInfo.attrValueList.length - 1].focus()
            })
        },
        //添加属性操作
        addAttr() {
            //控制table表格的显示与隐藏
            this.isShowTable = false
            //清空数据
            this.attrInfo = {
                attrName: "",  //属性名
                attrValueList: [     //属性值
                ],
                categoryId: this.category3Id, //三级分类的id
                categoryLevel: 3, //
            }
        },
        //修改属性操作
        upadteAttr(row) {
            //隐藏table表单
            this.isShowTable = false
            //这里需要深拷贝，里面的数据有点复杂浅拷贝已经不能完成了
            this.attrInfo = cloneDeep(row)
            //在修改某一个属性的时候，给相应的属性值加上flag标记
            this.attrInfo.attrValueList.forEach(item => {
                //这样书写也可以给属性值添加flag，但是会发现试图不会跟着变化(因为flag不是响应式的数据)
                //Vue无法检测普通的新增 property(属性) ，这样书写的属性并非响应式属性
                // item.flag=false
                //这里需要用到$set进行新增
                //第一个参数：给那个对象新增  第二个参数：属性名   第三个参数：属性值
                this.$set(item, "flag", false)
            })
        },
        //控制input框与span的显示与隐藏 以及对字段进行简单的效验
        toLook(row) {
            //如果输入属性值为空，不能作为有效的属性值，需要给用户提示
            if (row.valueName.trim() == '') {
                this.$message.error('输入无效属性值');
                return
            }
            //新增的属性值不能与已有的属性值重复
            let isRepat = this.attrInfo.attrValueList.some(item => {
                //需要将row从数组里面判断的时候去除
                //row最新新增的属性值[数组的最后一项元素]
                //判断的时候，需要把已有的数组当中新增的这个属性值去除
                if (row != item) {
                    return row.valueName == item.valueName
                }
            })
            if (isRepat) {
                this.$message.error('重复添加');
                return
            }
            row.flag = false
        },
        //点击span变为查看模式
        toEdit(row, index) {
            //切换查看与编辑
            row.flag = true
            //获取input节点，实现自动聚焦
            //需要注意：点击span的时候，切换为input变为编辑模式，但是需要注意，对应浏览器而言，重绘和重排是需要消耗时间的
            //点击span的时候，重绘和重排一个input需要消耗时间，因此不可能在一点击span立马获取到input
            //$nextTick，当节点渲染完毕了，会执行一次
            this.$nextTick(() => {
                this.$refs[index].focus()
            })
        },
        //删除按钮气泡确定的回调
        deleteAttrValue(index) {
            //根据索引删除数组里面的数据，这里不需要发请求
            this.attrInfo.attrValueList.splice(index, 1)
            this.$message({ message: '删除成功', type: 'success' });
        },
        //添加|修改操作的保存按钮，向服务器发起请求更新列表数据
        async addOrUpdateAttr() {
            //整理参数：如果用户添加很多空的属性，我们是不能让他提交给服务器的
            //提交给服务器的数据当中也不应该出现flag字段
            //这里我们使用filter对数组进行过滤
            this.attrInfo.attrValueList = this.attrInfo.attrValueList.filter(item => {
                //这里进行判断返回属性值不为空的元素
                if (item.valueName != '') {
                    //代码走到这里说明属性不为空，我们要删除flag字段
                    delete item.flag
                    return true
                }
            })
            //发请求
            try {
                //成功
                await this.$API.attr.reqAddOrUpdateAttr(this.attrInfo)
                //显示表格
                this.isShowTable = true
                this.$message({ type: 'success', message: '保存成功' })

                //重新获取列表数据
                this.getAttrList()
            } catch (error) {
                //失败
                this.$message.error(error.message)
            }
        },
        //删除属性
        async deleteAttr(row) {
            try {
                //成功发请求
                await this.$API.attr.reqDeleteAttr(row.id)
                //提示删除成功
                this.$message({ type: 'success', message: '删除成功' })
                //重新获取数据列表
                this.getAttrList()
            } catch (error) {
                //失败
                this.$message.error(error.message)
            }
        }
    },
}
</script>

<style></style>