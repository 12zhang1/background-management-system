<template>
    <div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <!-- Tab栏    @tab-click="handleClick" -->
                <el-tabs class="tab" v-model="activeName">
                    <el-tab-pane label="销售额" name="sale"></el-tab-pane>
                    <el-tab-pane label="访问量" name="visite"></el-tab-pane>
                </el-tabs>
                <div class="right">
                    <!-- <el-link>今日</el-link> -->
                    <el-link @click="setDay">今日</el-link>
                    <el-link @click="setWeek">本周</el-link>
                    <el-link @click="setMonth">本月</el-link>
                    <el-link @click="setYear">本年</el-link>
                    <!-- 日历  -->
                    <el-date-picker class="date" v-model="date" type="daterange" align="right" unlink-panels
                        range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" size="mini"
                        value-format="yyyy-MM-dd" :picker-options="pickerOptions">
                    </el-date-picker>
                </div>
            </div>
            <div>
                <el-row :gutter="10">
                    <el-col :span="18">
                        <div class="charts" ref="charts"></div>
                    </el-col>
                    <el-col :span="6" class="ranking">
                        <h3>门店{{ title }}排名</h3>
                        <ul>
                            <li>
                                <span class="rindex">1</span>
                                <span>肯德基</span>
                                <span class="rvalue">323,234</span>
                            </li>
                            <li>
                                <span class="rindex">2</span>
                                <span>麦当劳</span>
                                <span class="rvalue">299,132</span>
                            </li>
                            <li>
                                <span class="rindex">3</span>
                                <span>海底捞</span>
                                <span class="rvalue">283,998</span>
                            </li>
                            <li>
                                <span class="r">4</span>
                                <span>星巴克</span>
                                <span class="rvalue">266,223</span>
                            </li>
                            <li>
                                <span class="r">5</span>
                                <span>瑞幸</span>
                                <span class="rvalue">223,445</span>
                            </li>
                            <li>
                                <span class="r">6</span>
                                <span>火锅</span>
                                <span class="rvalue">219,663</span>
                            </li>
                            <li>
                                <span class="r">7</span>
                                <span>麻辣烫</span>
                                <span class="rvalue">200,997</span>
                            </li>
                        </ul>
                    </el-col>
                </el-row>
            </div>
        </el-card>
    </div>
</template>

<script>
import * as  echarts from "echarts"
import dayjs from 'dayjs'
export default {
    name: 'Sale',
    data() {
        return {
            pickerOptions: {
                shortcuts: [{
                    text: '最近一周',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近一个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近三个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                        picker.$emit('pick', [start, end]);
                    }
                }]
            },
            activeName: 'sale',
            myCharts: null,
            //收集日期数据
            date: [],
            listState: {
                //销售额
                orderFullYearAxis: [
                    "1月",
                    "2月",
                    "3月",
                    "4月",
                    "5月",
                    "6月",
                    "7月",
                    "8月",
                    "9月",
                    "10月",
                    "11月",
                    "12月"
                ],
                orderFullYear: [
                    410,
                    82,
                    200,
                    334,
                    390,
                    330,
                    220,
                    150,
                    82,
                    200,
                    134,
                    290
                ],
                //访问量
                userFullYearAxis: [
                    "1月",
                    "2月",
                    "3月",
                    "4月",
                    "5月",
                    "6月",
                    "7月",
                    "8月",
                    "9月",
                    "10月",
                    "11月",
                    "12月"
                ],
                userFullYear: [
                    110,
                    120,
                    90,
                    220,
                    175,
                    212,
                    192,
                    95,
                    88,
                    120,
                    250,
                    310
                ],
                //门店
                orderRank: [
                    {
                        no: 1,
                        name: "肯德基",
                        money: "323,234"
                    },
                    {
                        no: 2,
                        name: "麦当劳",
                        money: "299,132"
                    },
                    {
                        no: 3,
                        name: "肯德基",
                        money: "283,998"
                    },
                    {
                        no: 4,
                        name: "海底捞",
                        money: "266,223"
                    },
                    {
                        no: 5,
                        name: "西贝筱面村",
                        money: "223,445"
                    },
                    {
                        no: 6,
                        name: "汉堡王",
                        money: "219,663"
                    },
                    {
                        no: 7,
                        name: "真功夫",
                        money: "200,997"
                    }
                ],
                userRank: [
                    {
                        no: 1,
                        name: "麦当劳",
                        money: "211,335"
                    },
                    {
                        no: 2,
                        name: "肯德基",
                        money: "210,597"
                    },
                    {
                        no: 3,
                        name: "必胜客",
                        money: "200,998"
                    },
                    {
                        no: 4,
                        name: "海底捞",
                        money: "199,220"
                    },
                    {
                        no: 5,
                        name: "西贝筱面村",
                        money: "195,444"
                    },
                    {
                        no: 6,
                        name: "汉堡王",
                        money: "180,161"
                    },
                    {
                        no: 7,
                        name: "真功夫",
                        money: "172,995"
                    }
                ],
            }
        }
    },
    mounted() {
        this.myCharts = echarts.init(this.$refs.charts)
        this.myCharts.setOption({
            title: {
                text: this.title + '趋势'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    data: this.listState.orderFullYearAxis,
                    axisTick: {
                        alignWithLabel: true
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: 'Direct',
                    type: 'bar',
                    barWidth: '60%',
                    data: this.listState.orderFullYear,
                    color: '#409EFF',
                }
            ]
        })
    },
    computed: {
        title() {
            return this.activeName == 'sale' ? '销售额' : '访问量'
        },
    },
    //监听属性监听title的变化
    watch: {
        title() {
            this.myCharts.setOption({
                title: {
                    text: this.title + '趋势'
                },
                xAxis: {
                    data: this.title == '销售额' ? this.listState.orderFullYearAxis : this.listState.userFullYearAxis
                },
                series: [
                    {
                        data: this.title == '销售额' ? this.listState.orderFullYear : this.listState.userFullYear
                    }
                ]
            })
        },
        //监听listState数据如果数据有了就对图标数据进行替换
        listState() {
            this.myCharts.setOption({
                xAxis: {
                    data: this.listState.orderFullYearAxis
                },
                series: [
                    {
                        data: this.listState.orderFullYear
                    }
                ]
            })
        }
    },
    methods: {
        //今天
        setDay() {
            const day = dayjs().format('YYYY-MM-DD')
            this.date = [day, day]
        },
        //本周
        setWeek() {
            const start = dayjs().day(1).format('YYYY-MM-DD')
            const end = dayjs().day(7).format('YYYY-MM-DD')
            this.date = [start, end]
        },
        //本月
        setMonth() {
            const start = dayjs().startOf('month').format('YYYY-MM-DD')
            const end = dayjs().endOf('month').format('YYYY-MM-DD')
            this.date = [start, end]
        },
        //本月
        setYear() {
            const start = dayjs().startOf('year').format('YYYY-MM-DD')
            const end = dayjs().endOf('year').format('YYYY-MM-DD')
            this.date = [start, end]
        }
    }
}
</script>

<style scoped>
.box-card {
    margin-top: 10px;
}

.clearfix {
    position: relative;
    display: flex;
    justify-content: space-between;
}

.tab {
    width: 100%;
}

.right {
    position: absolute;
    right: 0;
}

.el-link {
    margin: 0 10px;
}

span {
    font-size: 14px;
    margin: 0 10px;
}

.date {
    width: 220px;
    margin: 10px;
}

.charts {
    width: 100%;
    height: 300px;
}

.ranking {
    height: 300px;
}

.ranking h3 {
    font-size: 18px;
    margin: -10px 0 0 0;
}

.ranking ul {
    width: 100%;
    height: 300px;
    list-style: none;
    margin-top: 10px;
    padding: 0;
}

.ranking ul li {
    height: 8%;
    font-size: 16px;
    line-height: 20px;
    /* background: pink; */
    margin-top: 10px;
}

.rindex {
    float: left;
    color: #fff;
    width: 20px;
    height: 20px;
    background: #000;
    border-radius: 50%;
    text-align: center;
    line-height: 20px;
}

.r {
    float: left;
    color: #000;
    width: 20px;
    height: 20px;
    background: #fff;
    border-radius: 50%;
    text-align: center;
    line-height: 20px;
}

.rvalue {
    float: right;
}
</style>