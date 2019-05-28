<!--页面-->
<template>
    <div>
        <el-menu :default-active="data.activeIndex2"
                 class="el-menu-demo"
                 mode="horizontal"
                 @select="handleSelect"
                 background-color="#545c64"
                 text-color="#fff"
                 active-text-color="#ffd04b">
            <el-menu-item index="1" id="navTitle"><a href="http://127.0.0.1:2222" target="_blank">冫Soul丶</a></el-menu-item>

            <el-submenu index="2">
                <template slot="title" class="navChild">我的工作台</template>
                <el-menu-item index="2-1">图表</el-menu-item>
                <el-menu-item index="2-2">设置</el-menu-item>
                <el-menu-item index="2-3">皮肤</el-menu-item>
            </el-submenu>

            <el-menu-item index="3">消息中心</el-menu-item>

            <el-menu-item index="4"><a href="http://106.12.27.242" target="_blank">友链</a></el-menu-item>

            <el-menu-item index="5"><a href="https://github.com/SoulMate1214" target="_blank">GitHub</a></el-menu-item>
            <router-link to="/">
                <img class="logo" src="../assets/logo.jpg" alt="冫Soul丶">
            </router-link>
        </el-menu>
    </div>
</template>

<!--逻辑-->
<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";

    @Component
    export default class adminNav extends Vue {
        data: any = {
            activeIndex2: '1'
        };

        mounted() {
            this.handleSelect()
        }

        handleSelect() {
        }
    }
</script>

<!--样式-->
<style>
    #navTitle {
        font-size: 35px;
        width: 15%;
        text-align:center;
        font-weight:bolder;
    }

    .logo {
        float: right;
        height: 50px;
        border-radius: 50%;
        margin-top: 5px;
        margin-right: 5%;
    }

    a{
        display : block;
    }
</style>
