<template>
    <div class="box">
        <el-row :gutter="10">
            <el-col :span="12">
                <Search :searchWord="this.listState.searchWord"></Search>
            </el-col>
            <el-col :span="12">
                <Category :saleRank="this.listState.saleRank"></Category>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import Search from "./Search"
import Category from "./Category"
export default {
    name: 'Observe',
    components: { Search, Category },
    data() {
        return {
            listState: {
                searchWord: [
                    {
                        word: "北京",
                        count: 3440,
                        user: 1626
                    },
                    {
                        word: "上海",
                        count: 8101,
                        user: 6660
                    },
                    {
                        word: "广州",
                        count: 7814,
                        user: 2196
                    },
                    {
                        word: "深圳",
                        count: 8888,
                        user: 7102
                    },
                    {
                        word: "南京",
                        count: 6204,
                        user: 1949
                    },
                    {
                        word: "杭州",
                        count: 8159,
                        user: 3548
                    },
                    {
                        word: "合肥",
                        count: 269,
                        user: 151
                    },
                    {
                        word: "济南",
                        count: 2045,
                        user: 1320
                    },
                    {
                        word: "太原",
                        count: 5693,
                        user: 2297
                    },
                    {
                        word: "成都",
                        count: 4850,
                        user: 1635
                    },
                    {
                        word: "重庆",
                        count: 906,
                        user: 269
                    },
                    {
                        word: "苏州",
                        count: 5576,
                        user: 3937
                    },
                    {
                        word: "无锡",
                        count: 1576,
                        user: 796
                    },
                    {
                        word: "常州",
                        count: 9002,
                        user: 8508
                    },
                    {
                        word: "温州",
                        count: 8103,
                        user: 4903
                    },
                    {
                        word: "哈尔滨",
                        count: 7961,
                        user: 6173
                    },
                    {
                        word: "长春",
                        count: 5916,
                        user: 3117
                    },
                    {
                        word: "大连",
                        count: 5012,
                        user: 78
                    },
                    {
                        word: "沈阳",
                        count: 8410,
                        user: 5696
                    },
                    {
                        word: "拉萨",
                        count: 3385,
                        user: 2547
                    },
                    {
                        word: "呼和浩特",
                        count: 4672,
                        user: 34
                    },
                    {
                        word: "武汉",
                        count: 7386,
                        user: 4047
                    },
                    {
                        word: "南宁",
                        count: 6192,
                        user: 612
                    },
                    {
                        word: "必胜客",
                        count: 3504,
                        user: 2480
                    },
                    {
                        word: "肯德基",
                        count: 3727,
                        user: 2527
                    },
                    {
                        word: "麦当劳",
                        count: 8959,
                        user: 6198
                    },
                    {
                        word: "海底捞",
                        count: 5295,
                        user: 2264
                    },
                    {
                        word: "美食",
                        count: 7348,
                        user: 5555
                    },
                    {
                        word: "商超",
                        count: 1628,
                        user: 1295
                    },
                    {
                        word: "水果",
                        count: 892,
                        user: 215
                    },
                    {
                        word: "跑腿",
                        count: 254,
                        user: 40
                    },
                    {
                        word: "送药",
                        count: 8377,
                        user: 4363
                    },
                    {
                        word: "烩饭",
                        count: 2009,
                        user: 1080
                    },
                    {
                        word: "面条",
                        count: 7684,
                        user: 4299
                    },
                    {
                        word: "小龙虾",
                        count: 3187,
                        user: 562
                    },
                    {
                        word: "牛肉",
                        count: 3612,
                        user: 3449
                    },
                    {
                        word: "鸡腿",
                        count: 4460,
                        user: 367
                    },
                    {
                        word: "全家桶",
                        count: 7206,
                        user: 3682
                    },
                    {
                        word: "麦乐鸡",
                        count: 3383,
                        user: 3048
                    },
                    {
                        word: "炭烤",
                        count: 8818,
                        user: 26
                    },
                    {
                        word: "麻辣",
                        count: 1297,
                        user: 905
                    },
                    {
                        word: "冒菜",
                        count: 3015,
                        user: 2362
                    }
                ],
                saleRank: {
                    allChannels: {
                        name: ["抖音", "淘宝", "京东", "唯品会", "美团", "饿了么"],
                        value: [245, 260, 150, 160, 200, 188]
                    },
                    online: {
                        name: [
                            "家用电器",
                            "食用酒水",
                            "个护健康",
                            "服饰箱包",
                            "母婴产品",
                            "其他"
                        ],
                        value: [
                            244,
                            321,
                            301,
                            41,
                            111,
                            69
                        ]
                    },
                    shop: {
                        name: [
                            "家用电器",
                            "食用酒水",
                            "个护健康",
                            "服饰箱包",
                            "母婴产品",
                            "其他"
                        ],
                        value: [
                            68,
                            15,
                            41,
                            56,
                            70,
                            25
                        ]
                    }
                }
            }
        }
    },
}
</script>

<style scoped>
.box {
    margin-top: 10px;
}
</style>