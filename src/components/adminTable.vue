<!--页面-->
<template>
    <div class="table">
        <h1 id="tableTitle">博客管理表</h1>
        <hr width="95%" color=#5193d5 SIZE=2>
        <el-button id="tableInsert" type="primary" round>添加</el-button>
        <el-table :data="data.tableData.slice((data.currentPage-1)*data.pageSize,data.currentPage*data.pageSize)" height="650" border>
            <!--隐藏内容-->
            <el-table-column type="expand">
                <template slot-scope="scope">
                    <el-form class="demo-table-expand" inline label-position="left">
                        <el-form-item label="商品名称">
                            <span>{{ scope.row.name }}</span>
                        </el-form-item>
                        <el-form-item label="所属店铺">
                            <span>{{ scope.row.shop }}</span>
                        </el-form-item>
                        <el-form-item label="商品 ID">
                            <span>{{ scope.row.id }}</span>
                        </el-form-item>
                        <el-form-item label="店铺 ID">
                            <span>{{ scope.row.shopId }}</span>
                        </el-form-item>
                        <el-form-item label="商品分类">
                            <span>{{ scope.row.category }}</span>
                        </el-form-item>
                        <el-form-item label="店铺地址">
                            <span>{{ scope.row.address }}</span>
                        </el-form-item>
                        <el-form-item label="商品描述">
                            <span>{{ scope.row.desc }}</span>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>

            <!--左固定列-->
            <el-table-column fixed="left" label="编号" width="100" align="center">
                <template slot-scope="scope">
                    <p>{{ scope.row.id }}</p>
                </template>
            </el-table-column>

            <!--多选框列-->
            <el-table-column fixed="left" type="selection" width="55" align="center">
            </el-table-column>

            <!--其它列-->
            <el-table-column fixed="left" label="日期" width="180" align="center">
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.date }}</span>
                </template>
            </el-table-column>

            <el-table-column label="姓名" width="180" align="center">
                <template slot-scope="scope">
                    <el-popover placement="top" trigger="hover">
                        <p>姓名: {{ scope.row.name }}</p>
                        <p>住址: {{ scope.row.address }}</p>
                        <div class="name-wrapper" slot="reference">
                            <el-tag size="medium">{{ scope.row.name }}</el-tag>
                        </div>
                    </el-popover>
                </template>
            </el-table-column>

            <el-table-column label="姓名" width="180" align="center">
                <template slot-scope="scope">
                    <el-popover placement="top" trigger="hover">
                        <p>姓名: {{ scope.row.name }}</p>
                        <p>住址: {{ scope.row.address }}</p>
                        <div class="name-wrapper" slot="reference">
                            <el-tag size="medium">{{ scope.row.name }}</el-tag>
                        </div>
                    </el-popover>
                </template>
            </el-table-column>

            <el-table-column label="姓名" width="180" align="center">
                <template slot-scope="scope">
                    <el-popover placement="top" trigger="hover">
                        <p>姓名: {{ scope.row.name }}</p>
                        <p>住址: {{ scope.row.address }}</p>
                        <div class="name-wrapper" slot="reference">
                            <el-tag size="medium">{{ scope.row.name }}</el-tag>
                        </div>
                    </el-popover>
                </template>
            </el-table-column>

            <el-table-column label="姓名" width="180" align="center">
                <template slot-scope="scope">
                    <el-popover placement="top" trigger="hover">
                        <p>姓名: {{ scope.row.name }}</p>
                        <p>住址: {{ scope.row.address }}</p>
                        <div class="name-wrapper" slot="reference">
                            <el-tag size="medium">{{ scope.row.name }}</el-tag>
                        </div>
                    </el-popover>
                </template>
            </el-table-column>

            <el-table-column label="姓名" width="180" align="center">
                <template slot-scope="scope">
                    <el-popover placement="top" trigger="hover">
                        <p>姓名: {{ scope.row.name }}</p>
                        <p>住址: {{ scope.row.address }}</p>
                        <div class="name-wrapper" slot="reference">
                            <el-tag size="medium">{{ scope.row.name }}</el-tag>
                        </div>
                    </el-popover>
                </template>
            </el-table-column>

            <el-table-column label="姓名" width="180" align="center">
                <template slot-scope="scope">
                    <el-popover placement="top" trigger="hover">
                        <p>姓名: {{ scope.row.name }}</p>
                        <p>住址: {{ scope.row.address }}</p>
                        <div class="name-wrapper" slot="reference">
                            <el-tag size="medium">{{ scope.row.name }}</el-tag>
                        </div>
                    </el-popover>
                </template>
            </el-table-column>

            <el-table-column label="姓名" width="180" align="center">
                <template slot-scope="scope">
                    <el-popover placement="top" trigger="hover">
                        <p>姓名: {{ scope.row.name }}</p>
                        <p>住址: {{ scope.row.address }}</p>
                        <div class="name-wrapper" slot="reference">
                            <el-tag size="medium">{{ scope.row.name }}</el-tag>
                        </div>
                    </el-popover>
                </template>
            </el-table-column>

            <el-table-column label="姓名" width="180" align="center">
                <template slot-scope="scope">
                    <el-popover placement="top" trigger="hover">
                        <p>姓名: {{ scope.row.name }}</p>
                        <p>住址: {{ scope.row.address }}</p>
                        <div class="name-wrapper" slot="reference">
                            <el-tag size="medium">{{ scope.row.name }}</el-tag>
                        </div>
                    </el-popover>
                </template>
            </el-table-column>

            <el-table-column label="姓名" width="180" align="center">
                <template slot-scope="scope">
                    <el-popover placement="top" trigger="hover">
                        <p>姓名: {{ scope.row.name }}</p>
                        <p>住址: {{ scope.row.address }}</p>
                        <div class="name-wrapper" slot="reference">
                            <el-tag size="medium">{{ scope.row.name }}</el-tag>
                        </div>
                    </el-popover>
                </template>
            </el-table-column>

            <!--右固定列-->
            <el-table-column fixed="right" width="150" align="center">
                <template slot="header" slot-scope="scope">
                    <el-input v-model="data.search" size="mini" placeholder="输入关键字搜索"/>
                </template>
                <template slot-scope="scope">
                    <el-button @click="handleEdit(scope.$index, scope.row)" type="primary" icon="el-icon-edit" circle></el-button>
                    <el-button @click="handleDelete(scope.$index, scope.row)" type="danger" icon="el-icon-delete" circle></el-button>
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
            tableData: [{
                id: '1',
                name: '好滋好味鸡蛋仔',
                category: '江浙小吃、小吃零食',
                desc: '荷兰优质淡奶，奶香浓而不腻',
                address: '上海市普陀区真北路',
                shop: '王小虎夫妻店',
                shopId: '10333',
                date: '2016-05-02',
            }, {
                id: '1',
                name: '好滋好味鸡蛋仔',
                category: '江浙小吃、小吃零食',
                desc: '荷兰优质淡奶，奶香浓而不腻',
                address: '上海市普陀区真北路',
                shop: '王小虎夫妻店',
                shopId: '10333',
                date: '2016-05-02',
            }, {
                id: '1',
                name: '好滋好味鸡蛋仔',
                category: '江浙小吃、小吃零食',
                desc: '荷兰优质淡奶，奶香浓而不腻',
                address: '上海市普陀区真北路',
                shop: '王小虎夫妻店',
                shopId: '10333',
                date: '2016-05-02',
            }, {
                id: '1',
                name: '好滋好味鸡蛋仔',
                category: '江浙小吃、小吃零食',
                desc: '荷兰优质淡奶，奶香浓而不腻',
                address: '上海市普陀区真北路',
                shop: '王小虎夫妻店',
                shopId: '10333',
                date: '2016-05-02',
            }, {
                id: '1',
                name: '好滋好味鸡蛋仔',
                category: '江浙小吃、小吃零食',
                desc: '荷兰优质淡奶，奶香浓而不腻',
                address: '上海市普陀区真北路',
                shop: '王小虎夫妻店',
                shopId: '10333',
                date: '2016-05-02',
            }, {
                id: '1',
                name: '好滋好味鸡蛋仔',
                category: '江浙小吃、小吃零食',
                desc: '荷兰优质淡奶，奶香浓而不腻',
                address: '上海市普陀区真北路',
                shop: '王小虎夫妻店',
                shopId: '10333',
                date: '2016-05-02',
            }, {
                id: '1',
                name: '好滋好味鸡蛋仔',
                category: '江浙小吃、小吃零食',
                desc: '荷兰优质淡奶，奶香浓而不腻',
                address: '上海市普陀区真北路',
                shop: '王小虎夫妻店',
                shopId: '10333',
                date: '2016-05-02',
            }, {
                id: '1',
                name: '好滋好味鸡蛋仔',
                category: '江浙小吃、小吃零食',
                desc: '荷兰优质淡奶，奶香浓而不腻',
                address: '上海市普陀区真北路',
                shop: '王小虎夫妻店',
                shopId: '10333',
                date: '2016-05-02',
            }, {
                id: '1',
                name: '好滋好味鸡蛋仔',
                category: '江浙小吃、小吃零食',
                desc: '荷兰优质淡奶，奶香浓而不腻',
                address: '上海市普陀区真北路',
                shop: '王小虎夫妻店',
                shopId: '10333',
                date: '2016-05-02',
            }, {
                id: '1',
                name: '好滋好味鸡蛋仔',
                category: '江浙小吃、小吃零食',
                desc: '荷兰优质淡奶，奶香浓而不腻',
                address: '上海市普陀区真北路',
                shop: '王小虎夫妻店',
                shopId: '10333',
                date: '2016-05-02',
            }, {
                id: '1',
                name: '好滋好味鸡蛋仔',
                category: '江浙小吃、小吃零食',
                desc: '荷兰优质淡奶，奶香浓而不腻',
                address: '上海市普陀区真北路',
                shop: '王小虎夫妻店',
                shopId: '10333',
                date: '2016-05-02',
            }, {
                id: '1',
                name: '好滋好味鸡蛋仔',
                category: '江浙小吃、小吃零食',
                desc: '荷兰优质淡奶，奶香浓而不腻',
                address: '上海市普陀区真北路',
                shop: '王小虎夫妻店',
                shopId: '10333',
                date: '2016-05-02',
            }, {
                id: '1',
                name: '好滋好味鸡蛋仔',
                category: '江浙小吃、小吃零食',
                desc: '荷兰优质淡奶，奶香浓而不腻',
                address: '上海市普陀区真北路',
                shop: '王小虎夫妻店',
                shopId: '10333',
                date: '2016-05-02',
            }, {
                id: '1',
                name: '好滋好味鸡蛋仔',
                category: '江浙小吃、小吃零食',
                desc: '荷兰优质淡奶，奶香浓而不腻',
                address: '上海市普陀区真北路',
                shop: '王小虎夫妻店',
                shopId: '10333',
                date: '2016-05-02',
            }, {
                id: '1',
                name: '好滋好味鸡蛋仔',
                category: '江浙小吃、小吃零食',
                desc: '荷兰优质淡奶，奶香浓而不腻',
                address: '上海市普陀区真北路',
                shop: '王小虎夫妻店',
                shopId: '10333',
                date: '2016-05-02',
            }, {
                id: '1',
                name: '好滋好味鸡蛋仔',
                category: '江浙小吃、小吃零食',
                desc: '荷兰优质淡奶，奶香浓而不腻',
                address: '上海市普陀区真北路',
                shop: '王小虎夫妻店',
                shopId: '10333',
                date: '2016-05-02',
            }, {
                id: '1',
                name: '好滋好味鸡蛋仔',
                category: '江浙小吃、小吃零食',
                desc: '荷兰优质淡奶，奶香浓而不腻',
                address: '上海市普陀区真北路',
                shop: '王小虎夫妻店',
                shopId: '10333',
                date: '2016-05-02',
            }, {
                id: '1',
                name: '好滋好味鸡蛋仔',
                category: '江浙小吃、小吃零食',
                desc: '荷兰优质淡奶，奶香浓而不腻',
                address: '上海市普陀区真北路',
                shop: '王小虎夫妻店',
                shopId: '10333',
                date: '2016-05-02',
            }, {
                id: '1  ',
                name: '好滋好味鸡蛋仔',
                category: '江浙小吃、小吃零食',
                desc: '荷兰优质淡奶，奶香浓而不腻',
                address: '上海市普陀区真北路',
                shop: '王小虎夫妻店',
                shopId: '10333',
                date: '2016-05-02',
            }]
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

    #tableTitle{
        margin-left: 2%;
        font-size: 30px;
    }

    #tableInsert{
        margin-left: 5%;
        margin-bottom: 5px;
    }

</style>

