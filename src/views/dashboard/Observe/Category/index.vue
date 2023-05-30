<template>
    <el-card class="box-card">
        <div slot="header" class="search-header ">
            <h3>销售额类别占比</h3>
            <el-radio-group v-model="tabValue" class="tab" style="margin-bottom: 30px;" size="mini">
                <el-radio-button label="全部渠道"></el-radio-button>
                <el-radio-button label="线上"></el-radio-button>
                <el-radio-button label="门店"></el-radio-button>
            </el-radio-group>
        </div>
        <div class="charts" ref="charts"></div>
    </el-card>
</template>

<script>
import * as echarts from "echarts";
export default {
    name: 'Category',
    props: ['saleRank'],
    data() {
        return {
            tabValue: '全部渠道',
            MyCharts: null
        }
    },
    mounted() {
        this.MyCharts = echarts.init(this.$refs.charts)
        this.MyCharts.setOption({
            title: {
                text: '',
                subtext: '',
                left: 'center',
                top: 'center'
            },
            legend: {
                top: '2%',
                left: 'center'
            },
            tooltip: {
                trigger: 'item'
            },
            series: [
                {
                    name: 'Access From',
                    type: 'pie',
                    radius: ['40%', '70%'],
                    avoidLabelOverlap: false,
                    itemStyle: {
                        borderRadius: 10,
                        borderColor: '#fff',
                        borderWidth: 2
                    },
                    label: {
                        show: true,
                        position: 'outsize'
                    },
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: 40,
                            fontWeight: 'bold'
                        }
                    },
                    labelLine: {
                        show: true
                    },
                    data: this.allChannels
                }
            ],
        })
        //绑定事件
        this.MyCharts.on('mouseover', (params) => {
            //获取鼠标移上去那条数据
            const { name, value } = params.data
            //重新设置标题
            this.MyCharts.setOption({
                title: {
                    text: name,
                    subtext: value
                }
            })
        })
    },
    computed: {
        //全部渠道
        allChannels() {
            const { name, value } = this.saleRank.allChannels
            let data = []
            name.forEach(item => {
                data.push({ name: item, value: '' })
            })
            value.forEach((item, index) => {
                data[index].value = item
            })
            return data
        },
        //线上
        online() {
            const { name, value } = this.saleRank.online
            let data = []
            name.forEach(item => {
                data.push({ name: item, value: '' })
            })
            value.forEach((item, index) => {
                data[index].value = item
            })
            return data
        },
        //门店
        shop() {
            const { name, value } = this.saleRank.shop
            let data = []
            name.forEach(item => {
                data.push({ name: item, value: '' })
            })
            value.forEach((item, index) => {
                data[index].value = item
            })
            return data
        }
    },
    watch: {
        tabValue() {
            if (this.tabValue == '线上') {
                this.MyCharts.setOption({
                    title: {
                        text: '',
                        subtext: '',
                    },
                    series: {
                        data: this.online
                    }
                })
            } else if (this.tabValue == '门店') {
                this.MyCharts.setOption({
                    title: {
                        text: '',
                        subtext: '',
                    },
                    series: {
                        data: this.shop
                    }
                })
            } else {
                this.MyCharts.setOption({
                    title: {
                        text: '',
                        subtext: '',
                    },
                    series: {
                        data: this.allChannels
                    }
                })
            }
        }
    }
}
</script>

<style scoped>
.search-header {
    display: flex;
    justify-content: space-between;
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #ccc;
    padding-left: 10px;
}

.search-header h3 {
    margin: 0;
    font-size: 18px;
}

.tab {
    margin-top: 6px;
    margin-right: 5px;
}

.charts {
    width: 100%;
    height: 380px;
}
</style>