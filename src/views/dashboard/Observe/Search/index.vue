<template>
    <el-card class="box-card">
        <div slot="header" class="search-header">
            <h3>线上热门搜索</h3>
            <el-dropdown>
                <span class="el-dropdown-link">
                    <i class="el-icon-more-outline"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>黄金糕</el-dropdown-item>
                    <el-dropdown-item>狮子头</el-dropdown-item>
                    <el-dropdown-item>螺蛳粉</el-dropdown-item>
                    <el-dropdown-item>双皮奶</el-dropdown-item>
                    <el-dropdown-item>蚵仔煎</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
        <el-row :gutter="10">
            <el-col :span="12">
                <LineCharts title="搜索用户数">
                    <template slot="arrows">
                        <h3>12321</h3>
                        <span>
                            17.1
                            <svg t="1685065405761" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                xmlns="http://www.w3.org/2000/svg" p-id="5235" width="16" height="16">
                                <path
                                    d="M573.056 272l308.8 404.608A76.8 76.8 0 0 1 820.736 800H203.232a76.8 76.8 0 0 1-61.056-123.392L450.976 272a76.8 76.8 0 0 1 122.08 0z"
                                    fill="#d81e06" p-id="5236"></path>
                            </svg>
                        </span>
                    </template>
                </LineCharts>
            </el-col>
            <el-col :span="12">
                <LineCharts title="人均搜索次数">
                    <template slot="arrows">
                        <h3>2.7</h3>
                        <span>
                            26.2
                            <svg t="1685066728392" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                xmlns="http://www.w3.org/2000/svg" p-id="6268" width="16" height="16">
                                <path
                                    d="M573.056 752l308.8-404.608A76.8 76.8 0 0 0 820.736 224H203.232a76.8 76.8 0 0 0-61.056 123.392l308.8 404.608a76.8 76.8 0 0 0 122.08 0z"
                                    fill="#1afa29" p-id="6269"></path>
                            </svg>
                        </span>
                    </template>
                </LineCharts>
            </el-col>
        </el-row>
        <el-table :data="searchWord" border height="250" class="tab" style="width: 100%" size="mini">
            <el-table-column type="index" label="排名" width="80">
            </el-table-column>
            <el-table-column prop="word" label="搜索关键字">
            </el-table-column>
            <el-table-column prop="user" label="用户名">
            </el-table-column>
            <el-table-column prop="count" label="周涨幅" sortable>
            </el-table-column>
        </el-table>
    </el-card>
</template>

<script>
import LineCharts from "./lineCharts"
export default {
    name: 'Search',
    props: ['searchWord'],
    components: { LineCharts }
}
</script>

<style>
.el-dropdown-link {
    cursor: pointer;
}

.el-icon-arrow-down {
    font-size: 12px;
}
</style>
<style scoped>
div {
    font-size: 16px;
}

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
}

.search-header i {
    margin-top: 13px;
    margin-right: 10px;
}

.tab {
    margin-top: 5px;
}

.pagination {
    float: right;
    margin-top: 5px;
}
</style>