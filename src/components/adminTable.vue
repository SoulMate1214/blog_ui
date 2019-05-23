<!--页面-->
<template>
    <div class="table">
        <h1 id="tableTitle">博客管理表</h1>
        <hr width="95%" color=#5193d5 SIZE=2>
        <el-button id="insertRow" type="primary" round>添加</el-button>
        <el-button id="deleteRows" type="danger" round>批量删除</el-button>
        <el-table :data="data.tableData.slice((data.currentPage-1)*data.pageSize,data.currentPage*data.pageSize)"
                  :default-sort = "{prop: 'id', order: 'descending'}"
                  height="650" border>
            <!--左固定列-->
            <el-table-column fixed="left" label="编号" width="100" align="center" prop="id" sortable>
                <template slot-scope="scope">
                    <p>{{ scope.row[6]}}</p>
                </template>
            </el-table-column>

            <!--多选框列-->
            <el-table-column fixed="left" type="selection" width="55" align="center">
            </el-table-column>

            <!--隐藏内容-->
            <el-table-column type="expand" fixed="left">
                <template slot-scope="scope">
                    <el-form class="demo-table-expand" inline label-position="left">
                        <el-form-item label="编号">
                            <span>{{scope.row[6]}}</span>
                        </el-form-item>
                        <el-form-item label="名称">
                            <span>{{scope.row[0]}}</span>
                        </el-form-item>
                        <el-form-item label="类型">
                            <span>{{scope.row[1]}}</span>
                        </el-form-item>
                        <el-form-item label="特点">
                            <span>{{scope.row[2]}}</span>
                        </el-form-item>
                        <el-form-item label="地点">
                            <span>{{scope.row[3]}}</span>
                        </el-form-item>
                        <el-form-item label="店名">
                            <span>{{scope.row[4]}}</span>
                        </el-form-item>
                        <el-form-item label="店编号">
                            <span>{{scope.row[5]}}</span>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>

            <!--动态渲染其它列-->
            <el-table-column :label="date" v-for="(date, index) in data.header" width="400">
                <template slot-scope="scope">
                    {{ scope.row[index]}}
                </template>
            </el-table-column>


            <!--右固定列-->
            <el-table-column fixed="right" width="150" align="center">
                <template slot="header" slot-scope="scope">
                    <el-input v-model="data.search" size="mini" placeholder="输入关键字搜索"/>
                </template>
                <template slot-scope="scope">
                    <el-button @click="handleEdit(scope.$index, scope.row)" type="primary" icon="el-icon-edit"
                               circle></el-button>
                    <el-button @click="handleDelete(scope.$index, scope.row)" type="danger" icon="el-icon-delete"
                               circle></el-button>
                </template>
            </el-table-column>
        </el-table>

        <!--分页-->
        <el-pagination :current-page="data.currentPage" :page-size="data.pageSize"
                       :page-sizes="[5, 10, 20, 40]"
                       :total="data.tableData.length"
                       @current-change="handleCurrentChange"
                       @size-change="handleSizeChange"
                       layout="total, sizes, prev, pager, next, jumper"
                       align="center">
        </el-pagination>
    </div>
</template>

<!--逻辑-->
<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";

    @Component
    export default class Slider extends Vue {
        isLoadEnd: boolean = false;
        isLoading: boolean = false;
        data: any = {
            currentPage: 1,
            pageSize: 10,
            articlesList: [],
            search: '',
            header: ["名称", "类型", "特点", "地点", "店名", "店编号"],
            tableData: [
                ["好滋好味鸡蛋仔1", "江浙小吃、小吃零食1", "荷兰优质淡奶，奶香浓而不腻1", "上海市普陀区真北路1", "王小虎夫妻店1", "11111","1"],
                ["好滋好味鸡蛋仔2", "江浙小吃、小吃零食2", "荷兰优质淡奶，奶香浓而不腻2", "上海市普陀区真北路2", "王小虎夫妻店2", "11112","2"],
                ["好滋好味鸡蛋仔3", "江浙小吃、小吃零食3", "荷兰优质淡奶，奶香浓而不腻3", "上海市普陀区真北路3", "王小虎夫妻店3", "11113","3"],
                ["好滋好味鸡蛋仔4", "江浙小吃、小吃零食4", "荷兰优质淡奶，奶香浓而不腻4", "上海市普陀区真北路4", "王小虎夫妻店4", "11114","4"],
                ["好滋好味鸡蛋仔5", "江浙小吃、小吃零食5", "荷兰优质淡奶，奶香浓而不腻5", "上海市普陀区真北路5", "王小虎夫妻店5", "11115","5"],
                ["好滋好味鸡蛋仔6", "江浙小吃、小吃零食6", "荷兰优质淡奶，奶香浓而不腻6", "上海市普陀区真北路6", "王小虎夫妻店6", "11116","6"],
                ["好滋好味鸡蛋仔7", "江浙小吃、小吃零食7", "荷兰优质淡奶，奶香浓而不腻7", "上海市普陀区真北路7", "王小虎夫妻店7", "11117","7"],
                ["好滋好味鸡蛋仔8", "江浙小吃、小吃零食8", "荷兰优质淡奶，奶香浓而不腻8", "上海市普陀区真北路8", "王小虎夫妻店8", "11118","8"],
                ["好滋好味鸡蛋仔9", "江浙小吃、小吃零食9", "荷兰优质淡奶，奶香浓而不腻9", "上海市普陀区真北路9", "王小虎夫妻店9", "11119","9"],
                ["好滋好味鸡蛋仔10", "江浙小吃、小吃零食10", "荷兰优质淡奶，奶香浓而不腻10", "上海市普陀区真北路10", "王小虎夫妻店10", "111110","10"],
                ["好滋好味鸡蛋仔", "江浙小吃、小吃零食", "荷兰优质淡奶，奶香浓而不腻", "上海市普陀区真北路", "王小虎夫妻店", "10333","11"],
                ["好滋好味鸡蛋仔", "江浙小吃、小吃零食", "荷兰优质淡奶，奶香浓而不腻", "上海市普陀区真北路", "王小虎夫妻店", "10333","12"],
                ["好滋好味鸡蛋仔", "江浙小吃、小吃零食", "荷兰优质淡奶，奶香浓而不腻", "上海市普陀区真北路", "王小虎夫妻店", "10333","13"],
                ["好滋好味鸡蛋仔", "江浙小吃、小吃零食", "荷兰优质淡奶，奶香浓而不腻", "上海市普陀区真北路", "王小虎夫妻店", "10333","14"],
                ["好滋好味鸡蛋仔", "江浙小吃、小吃零食", "荷兰优质淡奶，奶香浓而不腻", "上海市普陀区真北路", "王小虎夫妻店", "10333","15"],
                ["好滋好味鸡蛋仔", "江浙小吃、小吃零食", "荷兰优质淡奶，奶香浓而不腻", "上海市普陀区真北路", "王小虎夫妻店", "10333","16"],
                ["好滋好味鸡蛋仔", "江浙小吃、小吃零食", "荷兰优质淡奶，奶香浓而不腻", "上海市普陀区真北路", "王小虎夫妻店", "10333","17"],
                ["好滋好味鸡蛋仔", "江浙小吃、小吃零食", "荷兰优质淡奶，奶香浓而不腻", "上海市普陀区真北路", "王小虎夫妻店", "10333","18"],
                ["好滋好味鸡蛋仔", "江浙小吃、小吃零食", "荷兰优质淡奶，奶香浓而不腻", "上海市普陀区真北路", "王小虎夫妻店", "10333","19"],
                ["好滋好味鸡蛋仔", "江浙小吃、小吃零食", "荷兰优质淡奶，奶香浓而不腻", "上海市普陀区真北路", "王小虎夫妻店", "10333","20"],
                ["好滋好味鸡蛋仔", "江浙小吃、小吃零食", "荷兰优质淡奶，奶香浓而不腻", "上海市普陀区真北路", "王小虎夫妻店", "10333","21"],
                ["好滋好味鸡蛋仔", "江浙小吃、小吃零食", "荷兰优质淡奶，奶香浓而不腻", "上海市普陀区真北路", "王小虎夫妻店", "10333","22"],
                ["好滋好味鸡蛋仔", "江浙小吃、小吃零食", "荷兰优质淡奶，奶香浓而不腻", "上海市普陀区真北路", "王小虎夫妻店", "10333","23"],
                ["好滋好味鸡蛋仔", "江浙小吃、小吃零食", "荷兰优质淡奶，奶香浓而不腻", "上海市普陀区真北路", "王小虎夫妻店", "10333","24"],
                ["好滋好味鸡蛋仔", "江浙小吃、小吃零食", "荷兰优质淡奶，奶香浓而不腻", "上海市普陀区真北路", "王小虎夫妻店", "10333","25"],
                ["好滋好味鸡蛋仔", "江浙小吃、小吃零食", "荷兰优质淡奶，奶香浓而不腻", "上海市普陀区真北路", "王小虎夫妻店", "10333","26"],
                ["好滋好味鸡蛋仔", "江浙小吃、小吃零食", "荷兰优质淡奶，奶香浓而不腻", "上海市普陀区真北路", "王小虎夫妻店", "10333","27"],
                ["好滋好味鸡蛋仔", "江浙小吃、小吃零食", "荷兰优质淡奶，奶香浓而不腻", "上海市普陀区真北路", "王小虎夫妻店", "10333","28"],
                ["好滋好味鸡蛋仔", "江浙小吃、小吃零食", "荷兰优质淡奶，奶香浓而不腻", "上海市普陀区真北路", "王小虎夫妻店", "10333","29"],
                ["好滋好味鸡蛋仔", "江浙小吃、小吃零食", "荷兰优质淡奶，奶香浓而不腻", "上海市普陀区真北路", "王小虎夫妻店", "10333","30"],
                ["好滋好味鸡蛋仔", "江浙小吃、小吃零食", "荷兰优质淡奶，奶香浓而不腻", "上海市普陀区真北路", "王小虎夫妻店", "10333","31"],
                ["好滋好味鸡蛋仔", "江浙小吃、小吃零食", "荷兰优质淡奶，奶香浓而不腻", "上海市普陀区真北路", "王小虎夫妻店", "10333","32"],
                ["好滋好味鸡蛋仔", "江浙小吃、小吃零食", "荷兰优质淡奶，奶香浓而不腻", "上海市普陀区真北路", "王小虎夫妻店", "10333","33"],
                ["好滋好味鸡蛋仔", "江浙小吃、小吃零食", "荷兰优质淡奶，奶香浓而不腻", "上海市普陀区真北路", "王小虎夫妻店", "10333","34"],
                ["好滋好味鸡蛋仔", "江浙小吃、小吃零食", "荷兰优质淡奶，奶香浓而不腻", "上海市普陀区真北路", "王小虎夫妻店", "10333","35"],
            ]
        };

        mounted() {
            // this.handleUserList()
        }

        /**
         * 编辑
         */
        handleEdit() {
        }

        /**
         * 删除
         */
        handleDelete() {
        }

        /**
         * 分页尺寸
         */
        handleSizeChange(size: any) {
            this.data.pageSize = size
        }

        /**
         * 页面变化
         */
        handleCurrentChange(currentPage: any) {
            this.data.currentPage = currentPage
        }

        /**
         * 请求数据
         */
        async handleUserList() {
            this.isLoading = true;
            const res: any = await this.$https.get('http://127.0.0.1:1111/article/findSysArticles');
            this.isLoading = false;
            if (res.status === 200) {
                const data: any = res.data;
                this.data.articlesList = [...this.data.articlesList, ...data];
            } else {
                this.$message({
                    message: "网络错误!",
                    type: "error"
                });
            }
        }

    }
</script>

<!--样式-->
<style>
    .demo-table-expand {
        font-size: 0;
    }

    .demo-table-expand label {
        width: 90px;
        color: #99a9bf;
    }

    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }

    .table {
        position: absolute;
        width: 85%;
        margin-left: 15%;
    }

    #tableTitle {
        margin-left: 2%;
        font-size: 30px;
    }

    #insertRow {
        margin-left: 2%;
        margin-bottom: 5px;
    }

</style>

