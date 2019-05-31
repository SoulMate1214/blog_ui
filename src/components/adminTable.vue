<!--页面-->
<template>
    <div class="table">
        <h1 id="tableTitle">{{tableTitle}}</h1>
        <hr width="95%" color=#5193d5 SIZE=2>
        <el-button id="insertRow" type="primary" round>添加</el-button>
        <el-button id="deleteRows" type="danger" round>批量删除</el-button>
        <el-table :data="data.tableData.slice((data.currentPage-1)*data.pageSize,data.currentPage*data.pageSize)"
                  :default-sort="{prop: 'id'}"
                  :height="tableHeight" border>
            <!--编号列左固定-->
            <el-table-column fixed="left" label="序号" width="100" align="center" prop="id" sortable>
                <template slot-scope="scope">
                    <p>{{scope.row[data.tableHeader.length+1]}}</p>
                </template>
            </el-table-column>

            <!--多选框列左固定-->
            <el-table-column fixed="left" type="selection" width="55" align="center">
            </el-table-column>

            <!--隐藏内容列左固定-->
            <el-table-column type="expand" fixed="left">
                <template slot-scope="scope">
                    <el-form class="demo-table-expand" inline label-position="left">
                        <el-form-item :label="date" v-for="(date, index) in data.tableHeader">
                        <span>
                            {{ scope.row[index]}}
                        </span>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>

            <!--动态渲染其它列-->
            <el-table-column :label="date" v-for="(date, index) in data.tableHeader" width="180">
                <template slot-scope="scope">
                    {{ scope.row[index]}}
                </template>
            </el-table-column>


            <!--操作列右固定-->
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
    import {Component, Prop, Vue} from "vue-property-decorator";

    @Component
    export default class Slider extends Vue {
        @Prop({default: ""}) tableName!: string;
        @Prop({default: ""}) tableUrl!: string;
        @Prop({default: ""}) tableTitle!: string;
        @Prop({default: []}) tableHeader!: [];
        isLoadEnd: boolean = false;
        isLoading: boolean = false;
        tableHeight:Number = window.innerHeight - 250;
        data: any = {
            currentPage: 1,
            pageSize: 10,
            search: '',
            tableHeader: [],
            tableData: []
        };

        mounted() {
            this.data.tableHeader = this.tableHeader;
            this.handleUserList()
        }

        /**
         * 编辑
         */
        handleEdit() {
                this.$prompt('请输入邮箱', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
                    inputErrorMessage: '邮箱格式不正确'
                }).then(({}) => {
                    this.$message({
                        type: 'success',
                        message: '你的邮箱是: '
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消输入'
                    });
                });
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
        // 好好写我也要用呵呵哈哈哈~~~
        /**
         * 请求数据
         */
        async handleUserList() {
            this.isLoading = true;
            const res: any = await this.$https.get(this.tableUrl);
            this.isLoading = false;
            if (res.status === 200) {
                const data: any = res.data._embedded[this.tableName];
                if (this.data.tableHeader === null) {
                    for (let key in data[0]) {
                        if (key != "_links") {
                            this.data.tableHeader.push(key); //列标题
                        }
                    }
                }
                for (let count in data) {
                    let temp = 0;
                    let dataList = [];
                    for (let key in data[count]) {
                        dataList[temp] = data[count][key];  //列数据
                        temp++;
                    }
                    dataList[temp] = Number(count) + 1;  //序号
                    this.data.tableData.push(dataList);
                }
                console.log(this.data.tableData)
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

