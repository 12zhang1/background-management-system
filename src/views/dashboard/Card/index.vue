<template>
    <div>
        <el-row :gutter="10">
            <el-col :span="6">
                <el-card class="box-card">
                    <Detail title="总销售额" :count="`$ ${this.listState.salesTotal}`">
                        <template slot="charts">
                            <span>
                                周同比&nbsp;{{ this.listState.salesGrowthLastMonth }}%
                                <svg t="1684979617286" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                    xmlns="http://www.w3.org/2000/svg" p-id="6893" width="16" height="16">
                                    <path
                                        d="M583.93 296.842l234.8 318.515a73.059 73.059 0 0 1-14.99 102.048l-2.62 1.806a78.116 78.116 0 0 1-44.612 13.908h-469.6a75.588 75.588 0 0 1-76.762-74.414 72.878 72.878 0 0 1 14.269-43.348l234.8-318.515a78.568 78.568 0 0 1 106.834-16.888 77.574 77.574 0 0 1 17.881 16.888z"
                                        p-id="6894" fill="#d81e06"></path>
                                </svg>
                            </span>
                            <span>
                                日同比&nbsp;{{ this.listState.salesGrowthLastDay }}%
                                <svg t="1684979692663" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                    xmlns="http://www.w3.org/2000/svg" p-id="8087" width="16" height="16">
                                    <path
                                        d="M458.854 701.962l-234.8-318.605a73.059 73.059 0 0 1 15.262-102.048l2.619-1.806a78.026 78.026 0 0 1 44.612-13.817h469.6a75.588 75.588 0 0 1 76.762 74.413 72.246 72.246 0 0 1-14.269 43.258l-234.8 318.605a78.477 78.477 0 0 1-107.195 17.25 77.213 77.213 0 0 1-17.791-17.25z"
                                        p-id="8088" fill="#1afa29"></path>
                                </svg>
                            </span>
                        </template>
                        <template slot="footer">
                            <span>日销售额&nbsp;$&nbsp;{{ this.listState.salesToday }}</span>
                        </template>
                    </Detail>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card class="box-card">
                    <Detail title="访问量" :count="this.listState.visitTotal">
                        <template slot="charts">
                            <lineChart :visitTrend="this.listState.visitTrend"></lineChart>
                        </template>
                        <template slot="footer">
                            <span>日访问量&nbsp;{{ this.listState.visitToday }}</span>
                        </template>
                    </Detail>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card class="box-card">
                    <Detail title="支付笔数" :count="this.listState.payTotal">
                        <template slot="charts">
                            <barChart :payTrend="this.listState.payTrend"></barChart>
                        </template>
                        <template slot="footer">
                            <span>转化率&nbsp;{{ this.listState.payRate }}%</span>
                        </template>
                    </Detail>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card class="box-card">
                    <Detail title="运营活动效果" :count="`${this.listState.activityRate}%`">
                        <template slot="charts">
                            <progressCharts :activityRate="this.listState.activityRate"></progressCharts>
                        </template>
                        <template slot="footer">
                            <span>
                                周同比&nbsp;{{ this.listState.activityGrowthLastMonth }}%
                                <svg t="1684979617286" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                    xmlns="http://www.w3.org/2000/svg" p-id="6893" width="16" height="16">
                                    <path
                                        d="M583.93 296.842l234.8 318.515a73.059 73.059 0 0 1-14.99 102.048l-2.62 1.806a78.116 78.116 0 0 1-44.612 13.908h-469.6a75.588 75.588 0 0 1-76.762-74.414 72.878 72.878 0 0 1 14.269-43.348l234.8-318.515a78.568 78.568 0 0 1 106.834-16.888 77.574 77.574 0 0 1 17.881 16.888z"
                                        p-id="6894" fill="#d81e06"></path>
                                </svg>
                            </span>
                            <span>
                                日同比&nbsp;{{ this.listState.activityGrowthLastDay }}%
                                <svg t="1684979692663" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                    xmlns="http://www.w3.org/2000/svg" p-id="8087" width="16" height="16">
                                    <path
                                        d="M458.854 701.962l-234.8-318.605a73.059 73.059 0 0 1 15.262-102.048l2.619-1.806a78.026 78.026 0 0 1 44.612-13.817h469.6a75.588 75.588 0 0 1 76.762 74.413 72.246 72.246 0 0 1-14.269 43.258l-234.8 318.605a78.477 78.477 0 0 1-107.195 17.25 77.213 77.213 0 0 1-17.791-17.25z"
                                        p-id="8088" fill="#1afa29"></path>
                                </svg>
                            </span>
                        </template>
                    </Detail>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import Detail from './Detail'
import lineChart from "./lineChart"
import barChart from "./barChart"
import progressCharts from "./progressCharts"
export default {
    name: 'Card',
    components: { Detail, lineChart, barChart, progressCharts },
    data() {
        return {
            listState: {
                //销售额
                salesTotal: 114779,
                salesToday: 1314,
                salesGrowthLastDay: -19.16,
                salesGrowthLastMonth: 56.67,
                //访问量
                visitTotal: 988460,
                visitToday: 2050,
                visitTrend: [
                    610,
                    432,
                    220,
                    534,
                    790,
                    430,
                    220,
                    320,
                    532,
                    320,
                    834,
                    690,
                    530,
                    220,
                    620
                ],
                //支付笔数
                payTotal: 182425,
                payRate: 60.2,
                payTrend: [
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
                    290,
                    330,
                    150
                ],
                //运营活动效果
                activityRate: 78,
                activityGrowthLastDay: -17.7,
                activityGrowthLastMonth: 47.12,
            }
        }
    },
}
</script>

<style></style>