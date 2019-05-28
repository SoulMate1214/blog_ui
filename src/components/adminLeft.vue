<!--页面-->
<template>
    <div class="home">
        <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
                 :collapse="data.isCollapse"
                 background-color="#545c64"
                 text-color="#fff" route
                 :default-active="$route.path"
                 active-text-color="#ffd04b">
            <el-radio-group v-model="data.isCollapse" style="margin-bottom: 20px;">
                <el-radio-button :label="false" class="radio-button"> ></el-radio-button>
                <el-radio-button :label="true" class="radio-button"> <</el-radio-button>
            </el-radio-group>

            <!--第一个-->
            <el-menu-item index="1">
                <i class="el-icon-s-help"></i>
                <span slot="title">仪表盘</span>
            </el-menu-item>

            <!--第二个-->
            <el-submenu index="2">
                <template slot="title">
                    <i class="el-icon-s-platform"></i>
                    <span slot="title">博客前台管理</span>
                </template>

                <el-submenu index="2-1">
                    <template slot="title">
                        <i class="el-icon-tickets"></i>
                        <span slot="title">文章相关</span>
                    </template>

                    <el-menu-item index="/adminLog">
                        <template slot="title">
                            <i class="el-icon-document-copy"></i>
                            <span slot="title">文章</span>
                        </template>
                    </el-menu-item>

                    <el-menu-item index="2-1-2">
                        <template slot="title">
                            <i class="el-icon-folder-opened"></i>
                            <span slot="title">文章分类</span>
                        </template>
                    </el-menu-item>

                    <el-menu-item index="2-1-3">
                        <template slot="title">
                            <i class="el-icon-collection-tag"></i>
                            <span slot="title">文章标签</span>
                        </template>
                    </el-menu-item>

                    <el-menu-item index="2-1-4">
                        <template slot="title">
                            <i class="el-icon-connection"></i>
                            <span slot="title">文章标签关联</span>
                        </template>
                    </el-menu-item>
                </el-submenu>

                <el-submenu index="2-2">
                    <template slot="title">
                        <i class="el-icon-news"></i>
                        <span slot="title">其他相关</span>
                    </template>

                    <el-menu-item index="2-2-1">
                        <template slot="title">
                            <i class="el-icon-chat-line-round"></i>
                            <span slot="title">评论</span>
                        </template>
                    </el-menu-item>

                    <el-menu-item index="2-2-2">
                        <template slot="title">
                            <i class="el-icon-picture-outline"></i>
                            <span slot="title">文件</span>
                        </template>
                    </el-menu-item>

                    <el-menu-item index="2-2-3">
                        <template slot="title">
                            <i class="el-icon-document"></i>
                            <span slot="title">页面</span>
                        </template>
                    </el-menu-item>

                    <el-menu-item index="2-2-4">
                        <template slot="title">
                            <i class="el-icon-time"></i>
                            <span slot="title">时间线</span>
                        </template>
                    </el-menu-item>
                </el-submenu>
            </el-submenu>

            <!--第三个-->
            <el-submenu index="3">
                <template slot="title">
                    <i class="el-icon-s-tools"></i>
                    <span slot="title">博客后台管理</span>
                </template>

                <el-submenu index="3-1">
                    <template slot="title">
                        <i class="el-icon-cpu"></i>
                        <span slot="title">系统</span>
                    </template>

                    <el-menu-item index="3-1-1">
                        <template slot="title">
                            <i class="el-icon-notebook-1"></i>
                            <span slot="title">日志</span>
                        </template>
                    </el-menu-item>

                    <el-menu-item index="3-1-2">
                        <template slot="title">
                            <i class="el-icon-position"></i>
                            <span slot="title">站点基本设置</span>
                        </template>
                    </el-menu-item>
                </el-submenu>

                <el-submenu index="3-2">
                    <template slot="title">
                        <i class="el-icon-lock"></i>
                        <span slot="title">权限</span>
                    </template>

                    <el-menu-item index="3-2-1">
                        <template slot="title">
                            <i class="el-icon-user"></i>
                            <span slot="title">用户</span>
                        </template>
                    </el-menu-item>

                    <el-menu-item index="3-2-2">
                        <template slot="title">
                            <i class="el-icon-bicycle"></i>
                            <span slot="title">角色</span>
                        </template>
                    </el-menu-item>

                    <el-menu-item index="3-2-3">
                        <template slot="title">
                            <i class="el-icon-coin"></i>
                            <span slot="title">资源</span>
                        </template>
                    </el-menu-item>

                    <el-menu-item index="3-2-4">
                        <template slot="title">
                            <i class="el-icon-connection"></i>
                            <span slot="title">用户角色关联</span>
                        </template>
                    </el-menu-item>

                    <el-menu-item index="3-2-5">
                        <template slot="title">
                            <i class="el-icon-connection"></i>
                            <span slot="title">角色资源关联</span>
                        </template>
                    </el-menu-item>
                </el-submenu>
            </el-submenu>

        </el-menu>
    </div>
</template>

<!--逻辑-->
<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    // 解决下这些红线吧好难受哦
    @Component
    export default class adminLeft extends Vue {
        data: any = {
            isCollapse: false
        };

        mounted() {
            this.handleOpen()
        }

        handleOpen() {
        }

        handleClose() {
        }

    }
</script>

<!--样式-->
<style>
    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 15%;
    }

    .el-menu-vertical-demo {
        width: 3%;
        margin-top: 60px;
        min-height: 100%;
    }

    .radio-button {
        color: #88f074;
    }
</style>

