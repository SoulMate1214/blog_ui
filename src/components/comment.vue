<template>
    <Dialog title="回复" width="60%" :visible="dialogVisible" @close="cancel">

        <Form>
            <FormItem>
                <Input type="textarea" v-model="content" placeholder="文明社会，理性评论" autocomplete="off"></Input>
            </FormItem>
        </Form>

        <div slot="footer" class="dialog-footer">
            <Button type="default" @click="cancel">取消</Button>
            <Button type="primary" @click="handleOk">确 定</Button>
        </div>
    </Dialog>
</template>

<script lang="ts">
    import {Component, Emit, Prop, Vue} from "vue-property-decorator";
    import {Dialog, Form, FormItem, Input, Button, Message} from "element-ui";
    import config from "@/utils/config";

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
        @Prop({default: ""}) parent_id!: string;
        @Prop({default: ""}) article_id!: string;
        btnLoading: boolean = false;
        content: any = "";
        params: any = {
            articleId: "",
            parentId:"",
            message: "",
            user: "游客"
        };

        /**
         * 初始加载
         */
        mounted() {
            this.params.articleId = this.article_id;
            this.params.parentId = this.parent_id;
            console.log(this.article_id);
            console.log(this.parent_id);
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
        @Emit()
        cancel() {
        }

        /**
         * 二级评论请求
         */
        @Emit("handleOk")
        async handleOk() {
            if (!this.params.parentId) {
                this.$message({
                    message: "无法定位到当前评论，请重试!",
                    type: "warning"
                });
                return;
            }
            if (!this.params.articleId) {
                this.$message({
                    message: "检测文章失败，请重试！",
                    type: "error"
                });
                return;
            }
            if (!this.content) {
                this.$message({
                    message: "请输入内容!",
                    type: "warning"
                });
                return;
            }
            this.btnLoading = true;
            this.params.message = this.content;
            const res: any = await this.$https.post("http://127.0.0.1:1111/discuss/saveReplyDiscuss", this.params);
            this.btnLoading = false;
            if (res.status === 200) {
                this.content = "";
                this.$message({
                    message: "感谢回复!",
                    type: "success"
                });
            } else {
                this.$message({
                    message: "回复失败了哦,要不重新试试?",
                    type: "error"
                });
            }
        }
    }
</script>
