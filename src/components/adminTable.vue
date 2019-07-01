<!--页面-->
<template>
    <div id="admin-table">
        <h1 id="tableTitle">{{tableTitle}}</h1>
        <hr width="95%" color=#5193d5 SIZE=2>
        <!--添加模态框-->
        <el-button v-if="tableName==='sysArticles'" class="insertRow" type="primary" round>
            <router-link to="/admin-articleEditor">添加</router-link>
        </el-button>
        <el-button v-else @click="showCommentModal('insert','','')"
                   class="insertRow"
                   type="primary"
                   round>添加
        </el-button>
        <el-button
                id="deleteRows"
                type="danger"
                round @click="handleBatchDelete()">批量删除
        </el-button>
        <el-table :data="data.tableData.slice((data.currentPage-1)*data.pageSize,data.currentPage*data.pageSize)"
                  :default-sort="{prop: 'id'}"
                  :height="tableHeight" border
                  ref="multipleTable">
            <!--编号列左固定-->
            <el-table-column fixed="left" label="序号" width="100" align="center" prop="id" sortable>
                <template slot-scope="scope">
                    <p>{{scope.row[data.tableHeader3.length]}}</p>
                </template>
            </el-table-column>

            <!--多选框列左固定-->
            <el-table-column
                    fixed="left"
                    type="selection"
                    width="50"
                    align="center">
            </el-table-column>

            <!--隐藏内容列左固定-->
            <el-table-column type="expand" fixed="left">
                <template slot-scope="scope">
                    <el-form class="demo-table-expand" inline label-position="left">
                        <el-form-item :label="date" v-for="(date, index) in data.tableHeader3">:
                            <span>
                            {{ scope.row[index]}}
                        </span>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>

            <!--动态渲染其它列-->
            <el-table-column :label="date" v-for="(date, index) in data.tableHeader" width="150">
                <template slot-scope="scope">
                    <div class="hoveTitle">{{ scope.row[index]}}</div>
                </template>
            </el-table-column>


            <!--操作列右固定-->
            <el-table-column fixed="right" width="150" align="center">
                <template slot="header" slot-scope="scope">
                    <el-input v-model="data.search" size="mini" placeholder="输入关键字搜索"/>
                </template>
                <template slot-scope="scope">
                    <el-button @click="showCommentModal('update',scope.$index,scope.row)" type="primary"
                               icon="el-icon-edit"
                               circle></el-button>
                    <el-button @click="handleDelete(scope.$index, scope.row)" type="danger" icon="el-icon-delete"
                               circle></el-button>
                </template>
            </el-table-column>
        </el-table>

        <!--分页-->
        <el-pagination :current-page="data.currentPage" :page-size="data.pageSize"
                       :page-sizes="[5, 10, 20, 40, 100]"
                       :total="data.tableData.length"
                       @current-change="handleCurrentChange"
                       @size-change="handleSizeChange"
                       layout="total, sizes, prev, pager, next, jumper"
                       align="center">
        </el-pagination>

        <adminModal v-if="status!==''"
                    :visible="visible"
                    :tableHeader="this.tableHeader"
                    :englishHeader="data.englishHeader"
                    :status="status"
                    :rowData="rowData"
                    @handleOk="handleOk"
                    @handleCancel="handleCancel"/>
    </div>
</template>

<!--逻辑-->
<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    //@ts-ignore
    import adminModal from "@/components/adminModal.vue";


    @Component({
        components: {
            adminModal
        }
    })
    export default class Slider extends Vue {
        @Prop({default: ""}) tableName!: string;
        @Prop({default: ""}) tableUrl!: string;
        @Prop({default: ""}) tableDeleteUrl!: string;
        @Prop({default: ""}) tableTitle!: string;
        @Prop({default: []}) tableHeader!: [];
        status: String = "";
        visible: boolean = false;
        isLoadEnd: boolean = false;
        isLoading: boolean = false;
        tableHeight: Number = window.innerHeight - 300;
        rowData: String[] = [];
        parameter: any = {
            ids: []
        };
        data: any = {
            currentPage: 1,
            pageSize: 10,
            search: '',
            tableHeader: [],//基本信息列
            tableHeader2: [],//关联表的详情信息列
            tableHeader3: [],//全信息列
            englishHeader:[],//英文的信息列
            tableData: []
        };

        /**
         * 初始化
         */
        mounted() {
            this.data.tableHeader3 = this.tableHeader;
            this.tableHeader.forEach((value: string, i) => {
                if (value.match("详情")) {
                    this.data.tableHeader2[i] = value;
                } else {
                    this.data.tableHeader[i] = value;
                }
            });
            this.handleTable()
        }

        /**
         * 显示模态框
         */
        showCommentModal(status: string, index: any, row: any) {
            this.visible = true;
            this.status = status;
            if(row!==''){
                row.forEach((value: any) => {
                    this.rowData.push(JSON.stringify(value));
                });
            }
        }

        /**
         * 模态框确认
         */
        handleOk() {
            this.visible = false;
            //差个刷新
        }

        /**
         * 模态框取消
         */
        handleCancel() {
            this.visible = false;
        }

        /**
         * 批量删除
         */
        async handleBatchDelete() {
            if(this.tableName==='sysArticles'){
                this.$message({
                    message: "删除前请确保'文章标签关联表','文件表','评论表'与当前文章关联的内容已删除,否则无法删除文章",
                    type: "warning"
                });
            }

            // @ts-ignore
            this.$refs.multipleTable.selection.forEach(async (value: any) => {
                this.parameter.ids.push(value[0]);
            });

            if (this.parameter.ids.length === 0) {
                this.$message({
                    message: "没有选中任何数据,请选择之后再执行此操作",
                    type: "warning"
                });
                return;
            }

            this.isLoading = true;
            const res: any = await this.$https.post(this.tableDeleteUrl, this.parameter,{
                headers: {'token':window.localStorage['token']}
            });
            this.isLoading = false;
            if (res.status === 200) {
                this.$message({
                    message: "批量删除成功!",
                    type: "success"
                });
                // @ts-ignore
                this.$refs.multipleTable.selection.forEach(async (value: any) => {
                    this.data.tableData.splice(this.data.tableData.indexOf(value), 1);
                });
            } else {
                this.$message({
                    message: "网络出错,批量删除失败!",
                    type: "error"
                });
            }
        }

        /**
         * 删除
         */
        async handleDelete(index: any, row: any) {
            if(this.tableName==='sysArticles'){
                this.$message({
                    message: "删除前请确保'文章标签关联表','文件表','评论表'与当前文章关联的内容已删除,否则无法删除文章",
                    type: "warning"
                });
            }
            this.isLoading = true;
            const res: any = await this.$https.delete("http://127.0.0.1:1111/" + this.tableName + "/" + row[0]);
            this.isLoading = false;
            if (res.status === 204) {
                this.$message({
                    message: "删除成功!",
                    type: "success"
                });
                this.data.tableData.splice(this.data.tableData.indexOf(row), 1);
            } else {
                this.$message({
                    message: "网络出错,删除失败!",
                    type: "error"
                });
            }
        }

        /**
         * 请求数据
         */
        async handleTable() {
            this.isLoading = true;
            const res: any = await this.$https.get(this.tableUrl,{
                headers: {'token':window.localStorage['token']}
            });
            this.isLoading = false;
            if (res.status === 200) {
                const data: any = res.data._embedded[this.tableName];
                for (let key in data[0]) {
                    this.data.englishHeader.push(key); //列标题添加至englishHeader以供添加修改使用
                }
                if (this.data.tableHeader === null) {
                    for (let key in data[0]) {
                        if (key != "_links") {
                            this.data.tableHeader.push(key); //列标题添加至tableHeader以供显示使用,可无
                        }
                    }
                }
                for (let count in data) {
                    let temp = 0;
                    let dataList = [];
                    for (let key in data[count]) {
                        dataList[temp] = data[count][key];  //列数据,获取暴露的全数据,包括关联信息
                        temp++;
                    }
                    dataList[temp] = Number(count) + 1;  //序号,为了和id区分开
                    this.data.tableData.push(dataList);
                }
            } else {
                this.$message({
                    message: "网络错误!",
                    type: "error"
                });
            }
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
    }
</script>

<!--样式-->
<style lang="less" scoped>
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

    #admin-table {
        position: absolute;
        width: 85%;
        margin-left: 15%;
    }

    #tableTitle {
        margin-top: 4%;
        margin-left: 2%;
        font-size: 30px;
        font-family: YouYuan;
    }

    .insertRow {
        margin-left: 2%;
        margin-bottom: 5px;
    }
    .hoveTitle {
        text-align: left;
        overflow: hidden;;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
</style>

