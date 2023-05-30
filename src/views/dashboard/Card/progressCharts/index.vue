<template>
    <div class="charts" ref="charts"></div>
</template>

<script>
import * as echarts from "echarts";
export default {
    name: 'progressCharts',
    props:['activityRate'],
    data() {
        return {
            progressCharts: null
        }
    },
    mounted() {
        this.progressCharts = echarts.init(this.$refs.charts)
        this.progressCharts.setOption({
            xAxis: {
                show: false,
                //最大值与最小值的设置
                min: 0,
                max: 100
            },
            yAxis: {
                type: 'category',
                show: false
            },
            series: [
                {
                    data: [this.activityRate],
                    type: 'bar',
                    color: '#409EFF',
                    //柱状图的宽度
                    barWidth: 10,
                    //背景颜色
                    showBackground: true,
                    backgroundStyle: {
                        color: '#ccc'
                    },
                    //文本
                    label: {
                        show: true,
                        //文本内容
                        formatter: '❤️',
                        //文本位置
                        position: 'right',
                    }
                }
            ],
            //布局调试
            grid: {
                left: 0,
                top: 0,
                right: 0,
                bottom: 0
            },
            tooltip: {}
        })
    },
    watch: {
        activityRate() {
            this.progressCharts.setOption({
                series: [
                    {
                        data: [this.activityRate],
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