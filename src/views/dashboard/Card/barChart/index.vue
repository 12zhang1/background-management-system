<template>
    <div class="charts" ref="charts"></div>
</template>

<script>
import * as echarts from "echarts";
export default {
    name: 'barChart',
    props: ['payTrend'],
    data() {
        return {
            barCharts: null
        }
    },
    mounted() {
        this.barCharts = echarts.init(this.$refs.charts)
        this.barCharts.setOption({
            xAxis: {
                type: 'category',
                show: false
            },
            yAxis: {
                type: 'value',
                show: false
            },
            series: [
                {
                    data: this.payTrend,
                    type: 'bar',
                    color: '#409EFF'
                }
            ],
            //布局调试
            grid: {
                left: 0,
                top: 0,
                right: 0,
                bottom: 2
            },
            tooltip: {}
        })
    },
    watch: {
        payTrend() {
            this.barCharts.setOption({
                series: [
                    {
                        data: this.payTrend,
                        type: 'bar',
                        color: '#409EFF'
                    }
                ],
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