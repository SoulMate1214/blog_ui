<!--页面-->
<template>
    <!--添加-->
    <Dialog  v-if="this.status==='insert'" title="添加" width="50%" :visible="dialogVisible" @close="handleCancel">
        <Form>
            <el-row>
                <el-col :span="12" v-for="(date, index) in tableHeader">
                    <el-form-item :label="tableHeader[index]">:
                        <Input autocomplete="on" :placeholder="englishHeader[index]" v-model="rowData[index]" class="adminInsert"></Input>
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
    <Dialog v-else-if="this.status==='update'" title="编辑" width="50%" :visible="dialogVisible" @close="handleCancel">
        <Form>
            <el-row>
                <el-col :span="12" v-for="(date, index) in tableHeader">
                    <el-form-item :label="tableHeader[index]">:
                        <Input autocomplete="on" :placeholder="englishHeader[index]" v-model="rowData[index]" class="adminUpdate"></Input>
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
        @Prop({default: []}) rowData!: [];
        @Prop({default: ""}) status!: String;

        /**
         * 初始加载
         */
        mounted() {
            console.log(this.visible);
            console.log(this.tableHeader);
            console.log(this.englishHeader);
            console.log(this.rowData);
            console.log(this.status);
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
        async handleOk() {
        }


    }
</script>
<style></style>
