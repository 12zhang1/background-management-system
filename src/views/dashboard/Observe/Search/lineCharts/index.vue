<template>
    <div>
        <div class="header">
            <span>{{ title }}</span>
            <svg t="1685062754042" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                p-id="3858" width="18" height="18">
                <path
                    d="M512 0C229.23 0 0 229.23 0 512s229.23 512 512 512 512-229.23 512-512S794.77 0 512 0zM512 928c-229.75 0-416-186.25-416-416S282.25 96 512 96s416 186.25 416 416S741.75 928 512 928z"
                    p-id="3859" fill="#707070"></path>
                <path
                    d="M537.64 343.452c47.074 0 83.266-37.528 83.266-78.072 0-32.46-20.832-60.878-62.496-60.878-54.816 0-82.178 44.618-82.178 77.11C475.144 320.132 498.152 343.452 537.64 343.452z"
                    p-id="3860" fill="#707070"></path>
                <path
                    d="M533.162 728.934c-7.648 0-10.914-10.136-3.264-39.55l43.25-166.406c16.386-60.848 10.944-100.398-21.92-100.398-39.456 0-131.458 39.83-211.458 107.798l16.416 27.392c25.246-17.256 67.906-34.762 77.792-34.762 7.648 0 6.56 10.168 0 35.508l-37.746 158.292c-23.008 89.266 1.088 109.538 33.984 109.538 32.864 0 117.808-30.47 195.57-109.632l-18.656-25.34C575.354 716.714 543.05 728.934 533.162 728.934z"
                    p-id="3861" fill="#707070"></path>
            </svg>
        </div>
        <div class="main">
            <slot name="arrows"></slot>
        </div>
        <div class="footer">
            <div class="charts" ref="charts"></div>
        </div>
    </div>
</template>

<script>
import * as echarts from "echarts";
export default {
    name: 'LineCharts',
    props: ['title'],
    mounted() {
        const MyCharts = echarts.init(this.$refs.charts)
        MyCharts.setOption({
            xAxis: {
                type: 'category',
                show: false
            },
            yAxis: {
                show: false
            },
            series: [{
                data: [15,10,8,18,16,10,16,10,5,20],
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
            }],
            grid: {
                left: 0,
                top: 0,
                right: 0,
                bottom: 0
            }
        })
    },
}
</script>

<style scoped>
.header {
    height: 30px;
    line-height: 30px;
    font-size: 20px;
    color: #707070;
}

.header svg {
    vertical-align: middle;
    margin-left: 20px;
}

.main {
    display: flex;
    /* justify-content: space-between; */
}

.main h3 {
    margin: 0;
    font-size: 24px;
    font-weight: normal;
    margin-right: 30px;
}

.charts {
    width: 100%;
    height: 50px;
}
</style>