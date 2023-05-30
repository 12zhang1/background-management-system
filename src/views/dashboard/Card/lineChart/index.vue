<template>
    <div class="charts" ref="charts"></div>
</template>

<script>
import * as echarts from "echarts";
export default {
    name: 'lineChart',
    props: ['visitTrend'],
    data() {
        return {
            lineCharts: null
        }
    },
    mounted() {
        //初始化echarts实例
        this.lineCharts = echarts.init(this.$refs.charts)
        //配置数据
        this.lineCharts.setOption({
            xAxis: {
                type: 'category',
                show: false
            },
            yAxis: {
                show: false
            },
            series: [
                {
                    data: this.visitTrend,
                    type: 'line',
                    smooth: true,
                    //拐点样式的设置
                    itemStyle: {
                        opacity: 0
                    },
                    //线条设置
                    lineStyle: {
                        // #AB95E5
                        color: '#409EFF'
                    },
                    //设置填充颜色
                    areaStyle: {
                        color: {
                            //线性渐变
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [{
                                offset: 0, color: '#409EFF', // 0% 处的颜色
                            },
                            {
                                offset: 1, color: '#fff', // 100% 处的颜色
                            }],
                            global: false, // 缺省为 false
                        },
                    }
                }
            ],
            //布局调试
            grid: {
                left: 0,
                top: 0,
                right: 0,
                bottom: 0
            }
        })
    },
    watch: {
        visitTrend() {
            this.lineCharts.setOption({
                series: [
                    {
                        data: this.visitTrend,
                    }
                ]
            })
        }
    }
}
</script>

<style scoped>
.charts {
    width: 100%;
    height: 100%;
}
</style>