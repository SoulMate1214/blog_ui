<!--页面-->
<template>
    <!--添加-->
    <Dialog v-if="this.status==='insert'" title="提交表单" width="30%" :visible="dialogVisible" @close="handleCancel">
        <Form>
            <el-row>
                <span style="display: none">{{i = 0}}</span>
                <el-col :span="24" v-for="(date, index) in tableHeader">
                    <el-form-item :label="tableHeader[index]">:
                        <!--基础字段的不同形式-->
                        <label><Input
                                v-if="tableHeader[index]==='编号'|| tableHeader[index]==='状态'|| tableHeader[index]==='排序'"
                                autocomplete="on" :placeholder="englishHeader[index]" v-model="insertRowData[index]"
                                class="adminInsert" disabled></Input></label>
                        <label><Input
                                v-if="tableHeader[index]==='名称'||tableHeader[index]==='创建者'||tableHeader[index]==='修改者'"
                                autocomplete="on" :placeholder="englishHeader[index]" v-model="insertRowData[index]"
                                class="adminInsert"></Input></label>
                        <label><Input v-if="tableHeader[index]==='备注'" type="textarea" v-model="insertRowData[index]"
                                      :placeholder="englishHeader[index]" autocomplete="off"></Input></label>
                        <el-date-picker v-if="tableHeader[index]==='创建时间' || tableHeader[index]==='修改时间'"
                                        v-model="insertRowData[index]" type="datetime" placeholder="选择日期时间"
                                        align="right"
                                        :picker-options="data.pickerOptions"></el-date-picker>
                        <FormItem v-if="tableHeader[index]==='是否启用'">
                            <el-switch v-model="insertRowData[index]"></el-switch>
                        </FormItem>

                        <!--非基础字段,只有一个关联字段-->
                        <FormItem v-if="index>9&&tableHeader[index].match('编号')&&associatedTableName.length===1">
                            <el-select v-model="insertRowData[index]" :placeholder="englishHeader[index]"
                                       autocomplete="off"
                                       placeholder="请选择">
                                <el-option v-for="item in linkedDataList[0]" :key="item.id" :label="item.name"
                                           :value="item.id"></el-option>
                            </el-select>
                        </FormItem>

                        <!--非基础字段,有两个关联字段时候的第一个关联字段-->
                        <FormItem v-if="index>9&&tableHeader[index].match('编号')&&associatedTableName.length===2">
                            <!--多选下拉框-->
                            <el-select
                                    v-if="tableHeader[index].match('用户')||tableHeader[index].match('角色')||tableHeader[index].match('资源')||tableHeader[index].match('标签')"
                                    v-model="insertRowData[index]" :placeholder="englishHeader[index]"
                                    autocomplete="off"
                                    multiple placeholder="请选择">
                                <el-option v-for="item in linkedDataList[i]" :key="item.id" :label="item.name"
                                           :value="item.id"></el-option>
                                <span style="display: none">{{i = i + 1}}</span>
                            </el-select>
                            <!--单选下拉框-->
                            <el-select v-else v-model="insertRowData[index]" :placeholder="englishHeader[index]"
                                       autocomplete="off" placeholder="请选择">
                                <el-option v-for="item in linkedDataList[i]" :key="item.id" :label="item.name"
                                           :value="item.id">
                                </el-option>
                                <span style="display: none">{{i = i + 1}}</span>
                            </el-select>
                        </FormItem>

                        <!--非基础字段,非关联字段-->
                        <label><Input v-if="index>9&&!tableHeader[index].match('编号')" type="textarea"
                                      v-model="insertRowData[index]" :placeholder="englishHeader[index]"
                                      autocomplete="off"></Input></label>
                    </el-form-item>
                </el-col>
            </el-row>
        </Form>
        <!--确认和取消-->
        <div slot="footer" class="dialog-footer">
            <Button type="default" @click="handleCancel">取消</Button>
            <Button type="primary" @click="handleOk">确 定</Button>
        </div>
    </Dialog>

    <!--修改-->
    <Dialog v-else-if="this.status==='update'" title="修改表单" width="30%" :visible="dialogVisible" @close="handleCancel">
        <Form>
            <el-row>
                <span style="display: none">{{i = 0}}</span>
                <el-col :span="24" v-for="(date, index) in tableHeader">
                    <el-form-item :label="tableHeader[index]">:
                        <!--基础字段的不同形式-->
                        <label><Input
                                v-if="tableHeader[index]==='编号'|| tableHeader[index]==='状态'|| tableHeader[index]==='排序'"
                                autocomplete="on" :placeholder="englishHeader[index]" v-model="updateRowData[index]"
                                class="adminInsert" disabled></Input></label>
                        <label><Input
                                v-if="tableHeader[index]==='名称'||tableHeader[index]==='创建者'||tableHeader[index]==='修改者'"
                                autocomplete="on" :placeholder="englishHeader[index]" v-model="updateRowData[index]"
                                class="adminInsert"></Input></label>
                        <label><Input v-if="tableHeader[index]==='备注'" type="textarea" v-model="updateRowData[index]"
                                      :placeholder="englishHeader[index]" autocomplete="off"></Input></label>
                        <el-date-picker v-if="tableHeader[index]==='创建时间' || tableHeader[index]==='修改时间'"
                                        v-model="updateRowData[index]" type="datetime" placeholder="选择日期时间"
                                        align="right"
                                        :picker-options="data.pickerOptions"></el-date-picker>
                        <FormItem v-if="tableHeader[index]==='是否启用'">
                            <el-switch v-model="updateRowData[index]"></el-switch>
                        </FormItem>

                        <!-- 文章内容特殊用markdown修改-->
                        <mavon-editor v-if="tableHeader[index]==='文章内容'"
                                style="height: 600px"
                                :ishljs="true"
                                ref=md
                                @imgAdd="$imgAdd"
                                v-model="updateRowData[index]">
                        </mavon-editor>

                        <!--非基础字段,只有一个关联字段-->
                        <FormItem v-if="index>9&&tableHeader[index].match('编号')&&associatedTableName.length===1">
                            <el-select v-model="updateRowData[index]" :placeholder="englishHeader[index]"
                                       autocomplete="off"
                                       placeholder="请选择">
                                <el-option v-for="item in linkedDataList[0]" :key="item.id" :label="item.name"
                                           :value="item.id"></el-option>
                            </el-select>
                        </FormItem>

                        <!--非基础字段,有两个关联字段时候的第一个关联字段-->
                        <FormItem v-if="index>9&&tableHeader[index].match('编号')&&associatedTableName.length===2">
                            <!--多选下拉框-->
                            <el-select
                                    v-if="tableHeader[index].match('用户')||tableHeader[index].match('角色')||tableHeader[index].match('资源')||tableHeader[index].match('标签')"
                                    v-model="updateRowData[index]" :placeholder="englishHeader[index]"
                                    autocomplete="off"
                                    multiple placeholder="请选择">
                                <el-option v-for="item in linkedDataList[i]" :key="item.id" :label="item.name"
                                           :value="item.id"></el-option>
                                <span style="display: none">{{i = i + 1}}</span>
                            </el-select>
                            <!--单选下拉框-->
                            <el-select v-else v-model="updateRowData[index]" :placeholder="englishHeader[index]"
                                       autocomplete="off" placeholder="请选择">
                                <el-option v-for="item in linkedDataList[i]" :key="item.id" :label="item.name"
                                           :value="item.id">
                                </el-option>
                                <span style="display: none">{{i = i + 1}}</span>
                            </el-select>
                        </FormItem>

                        <!--非基础字段,非关联字段-->
                        <label><Input v-if="index>9&&!tableHeader[index].match('编号')" type="textarea"
                                      v-model="updateRowData[index]" :placeholder="englishHeader[index]"
                                      autocomplete="off"></Input></label>
                    </el-form-item>
                </el-col>
            </el-row>
        </Form>
        <!--确认和取消-->
        <div slot="footer" class="dialog-footer">
            <Button type="default" @click="handleCancel">取消</Button>
            <Button type="primary" @click="handleOk">确 定</Button>
        </div>
    </Dialog>
</template>

<!--逻辑-->
<script lang="ts">
    import {Component, Emit, Prop, Vue} from "vue-property-decorator";
    import {Dialog, Form, FormItem, Input, Button} from "element-ui";

    @Component({
        components: {
            Dialog,
            Form,
            FormItem,
            Input,
            Button
        }
    })

    export default class Comment extends Vue {
        @Prop({default: false}) visible!: boolean;
        @Prop({default: []}) tableHeader!: [];
        @Prop({default: []}) englishHeader!: [];
        @Prop({default: []}) insertRowData!: [];
        @Prop({default: []}) updateRowData!: [];
        @Prop({default: []}) associatedTableName!: [];
        @Prop({default: ""}) status!: String;
        @Prop({default: ""}) tableName!: string;
        @Prop({default: ""}) tableSaveUrl!: string;
        linkedDataList: Array<Array<object>> = [];
        data: any = {
            pickerOptions: {
                shortcuts: [{
                    text: '今天',
                    onClick(picker: any) {
                        picker.$emit('pick', new Date());
                    }
                }, {
                    text: '昨天',
                    onClick(picker: any) {
                        const date = new Date();
                        date.setTime(date.getTime() - 3600 * 1000 * 24);
                        picker.$emit('pick', date);
                    }
                }, {
                    text: '一周前',
                    onClick(picker: any) {
                        const date = new Date();
                        date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', date);
                    }
                }]
            },
        };

        /**
         * 页面渲染前执行
         */
        created() {
            if (this.associatedTableName.length !== 0) {
                this.associatedTableName.forEach((value: string, i) => {
                    this.handleDataList(value, i);
                });
            }
        }

        /**
         * 页面渲染后执行
         */
        mounted() {
        }

        /**
         * 默认模态框不显示
         */
        get dialogVisible() {
            return this.visible;
        }

        /**
         * 通过@Emit注解使得模态框显示状态为False
         */
        @Emit("handleCancel")
        handleCancel() {
        }

        /**
         * 通过@Emit注解使得模态框显示状态为False,并且提交请求
         */
        @Emit("handleOk")
         handleOk() {
            if (this.status === "insert") {
                let arraySize = [];
                let arrayIndex = [];
                let flag = 0;
                let headerSize = this.englishHeader.length;
                for (let i = 0; i < headerSize; i++) {
                    if (this.isArray(this.insertRowData[i])) {
                        arraySize[flag] = Array.prototype.slice.call(this.insertRowData[i]).length;
                        arrayIndex[flag] = i;
                        flag++;
                    }
                }
                if(flag == 0){
                    let insertJson = {};
                    for (let i = 0; i < headerSize; i++) {
                        if (this.englishHeader[i] !== "id") {
                                insertJson[this.englishHeader[i]] = this.insertRowData[i];
                        }
                    }
                    this.insertForm(insertJson);
                }else if (flag == 1) { //一个 Array 的情况
                    for (let m = 0; m < arraySize[0]; m++) {
                        let insertJson = {};
                        for (let i = 0; i < headerSize; i++) {
                            if (this.englishHeader[i] !== "id") {
                                if (i == arrayIndex[0]) {
                                    insertJson[this.englishHeader[i]] = this.insertRowData[i][m];
                                } else {
                                    insertJson[this.englishHeader[i]] = this.insertRowData[i];
                                }
                            }
                        }
                        this.insertForm(insertJson);
                    }
                } else if (flag == 2) {  //两个 Array 的情况
                    for (let m = 0; m < arraySize[0]; m++) {   // 循环第一个 Array 的大小
                        for (let n = 0; n < arraySize[1]; n++) {  //  循环第二个 Array 的大小
                            let insertJson = {};
                            for (let i = 0; i < headerSize; i++) {  // 循环整个 header 创建 JSON 对象
                                if (this.englishHeader[i] !== "id") {
                                    if (i == arrayIndex[0]) {
                                        insertJson[this.englishHeader[i]] = this.insertRowData[i][m];
                                    } else if (i == arrayIndex[1]) {
                                        insertJson[this.englishHeader[i]] = this.insertRowData[i][n];
                                    } else {
                                        insertJson[this.englishHeader[i]] = this.insertRowData[i];
                                    }
                                }
                            }
                            this.insertForm(insertJson);
                        }
                    }
                }
            } else {
                let arraySize = [];
                let arrayIndex = [];
                let flag = 0;
                let headerSize = this.englishHeader.length;
                for (let i = 0; i < headerSize; i++) {
                    if (this.isArray(this.updateRowData[i])) {
                        arraySize[flag] = Array.prototype.slice.call(this.updateRowData[i]).length;
                        arrayIndex[flag] = i;
                        flag++;
                    }
                }
                if(flag == 0){
                    let updateJson = {};
                    for (let i = 0; i < headerSize; i++) {
                        updateJson[this.englishHeader[i]] = this.updateRowData[i];
                    }
                    this.updateForm(updateJson);
                }else if (flag == 1) { //一个 Array 的情况
                    for (let m = 0; m < arraySize[0]; m++) {
                        let updateJson = {};
                        for (let i = 0; i < headerSize; i++) {
                            if (i == arrayIndex[0]) {
                                updateJson[this.englishHeader[i]] = this.updateRowData[i][m];
                            } else {
                                updateJson[this.englishHeader[i]] = this.updateRowData[i];
                            }
                        }
                        this.updateForm(updateJson);
                    }
                } else if (flag == 2) {  //两个 Array 的情况
                    for (let m = 0; m < arraySize[0]; m++) {   // 循环第一个 Array 的大小
                        for (let n = 0; n < arraySize[1]; n++) {  //  循环第二个 Array 的大小
                            let updateJson = {};
                            for (let i = 0; i < headerSize; i++) {  // 循环整个 header 创建 JSON 对象
                                if (i == arrayIndex[0]) {
                                    updateJson[this.englishHeader[i]] = this.updateRowData[i][m];
                                } else if (i == arrayIndex[1]) {
                                    updateJson[this.englishHeader[i]] = this.updateRowData[i][n];
                                } else {
                                    updateJson[this.englishHeader[i]] = this.updateRowData[i];
                                }
                            }
                            this.updateForm(updateJson);
                        }
                    }
                }
            }
        }

        /**
         * 判断是不是数组
         */
        isArray(value: any) {
            if (typeof Array.isArray === "function") {
                return Array.isArray(value);
            } else {
                return Object.prototype.toString.call(value) === "[object Array]";
            }
        }

        /**
         * 提交数据
         */
        async insertForm(insertJson: any) {
            const res: any = await this.$https.post(this.tableSaveUrl, insertJson, {
                headers: {'token': window.localStorage['token']}
            });
            if (res.status === 200) {
                this.$message({
                    message: "提交成功,添加了一条数据!",
                    type: "success"
                });
                this.$emit("addSuccess", res.data)
            } else {
                this.$message({
                    message: "提交失败,注意非空字段的填写哦",
                    type: "error"
                });
            }
        }

        /**
         * 修改数据
         */
        async updateForm(updateJson: any) {
            const res: any = await this.$https.post(this.tableSaveUrl, updateJson, {
                headers: {'token': window.localStorage['token']}
            });
            if (res.status === 200) {
                this.$message({
                    message: "修改成功,修改了当前数据!!",
                    type: "success"
                });
            } else {
                this.$message({
                    message: "网络出错,修改失败",
                    type: "error"
                });
            }
        }

        /**
         * 获取关联数据
         */
        async handleDataList(value: any, index: any) {
            const res = await this.$https.get("http://127.0.0.1:1111/" + value + "/");
            if (res.status === 200) {
                const data = res.data._embedded
                if (index === 0) {
                    this.linkedDataList.push([...data[value]])
                } else if (index === 1) {
                    this.linkedDataList.push( [...data[value]])
                }
            } else {
                this.$message({
                    message: "网络错误!",
                    type: "error"
                })
            }
        }
    }
</script>
<style></style>
