<!--页面-->
<template>
    <Dialog title="登录控制台" width="60%" :visible="dialogVisible" @close="cancel">
        <Form>
            <!--用户名-->
            <FormItem label="用户名" placeholder="用户名" :label-width="formLabelWidth">
                <Input v-model="params.name" autocomplete="off"></Input>
            </FormItem>

            <!--邮箱-->
            <FormItem label="邮箱" placeholder="邮箱" :label-width="formLabelWidth">
                <Input v-model="params.email" autocomplete="off"></Input>
            </FormItem>

            <!--密码-->
            <FormItem label="密码" :label-width="formLabelWidth">
                <Input type="password" placeholder="密码" v-model="params.password" autocomplete="off"></Input>
            </FormItem>
        </Form>

        <!--按钮-->
        <div slot="footer" class="dialog-footer">
            <Button type="primary" :loading="btnLoading" @click="handleOk">登 录</Button>
        </div>
    </Dialog>
</template>

<!--逻辑-->
<script lang="ts">
    import {Component, Emit, Prop, Vue} from "vue-property-decorator";
    import {Dialog, Form, FormItem, Input, Button, Message} from "element-ui";

    @Component({
        components: {
            Dialog,
            Form,
            FormItem,
            Input,
            Button
        }
    })

    export default class Login extends Vue {
        @Prop({default: false}) visible!: boolean;

        btnLoading: boolean = false;
        formLabelWidth: string = "100px";
        params: any = {
            name: "",
            email: "",
            password: ""
        };

        /**
         * 初始化
         */
        mounted() {
        }

        /**
         * 是否显示，visible的值是另一个页面传过来的
         */
        get dialogVisible() {
            return this.visible;
        }

        /**
         * 确认登录的验证
         */
        handleOk() {
            const reg = new RegExp(
                "^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$"
            );
            if (!this.params.name) {
                Message.warning("用户名不能为空！");
                return;
            } else if (!this.params.email) {
                Message.warning("邮箱不能为空！");
                return;
            } else if (!reg.test(this.params.email)) {
                Message.warning("请输入格式正确的邮箱！");
                return;
            } else if (!this.params.password) {
                Message.warning("密码不能为空");
                return;
            }
            this.$router.push({ path:'admin/admin'})
            this.cancel();
        }

        /**
         * 通过@Emit注解使得模态框显示状态为False
         */
        @Emit()
        cancel() {
            return false;
        }

        /**
         * 提交表单
         */
        @Emit("ok")
        async submit() {
            const res: any = await this.$https.post(this.$urls.login, this.params);
            console.log("res :", res);
            if (res.status === 200) {
                if (res.data.code === 0) {
                    const data: any = res.data.data;
                    const userInfo: object = {
                        _id: data._id,
                        name: data.name,
                        avatar: data.avatar
                    };
                    window.sessionStorage.userInfo = JSON.stringify(userInfo);
                    Message.success(res.data.message);
                    return false;
                } else {
                    Message.error(res.data.message);
                }
            } else {
                Message.error("网络错误");
            }
        }
    }
</script>
