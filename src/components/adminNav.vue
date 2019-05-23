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
            <el-menu-item index="1" id="navTitle">冫Soul丶</el-menu-item>
            <el-submenu index="2">
                <template slot="title">我的工作台</template>
                <el-menu-item index="2-1">选项1</el-menu-item>
                <el-menu-item index="2-2">选项2</el-menu-item>
                <el-menu-item index="2-3">选项3</el-menu-item>
                <el-submenu index="2-4">
                    <template slot="title">选项4</template>
                    <el-menu-item index="2-4-1">选项1</el-menu-item>
                    <el-menu-item index="2-4-2">选项2</el-menu-item>
                    <el-menu-item index="2-4-3">选项3</el-menu-item>
                </el-submenu>
            </el-submenu>
            <el-menu-item index="3" disabled>消息中心</el-menu-item>
            <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
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
        font-size: 30px;
        width: 15%;
        text-align:center;
    }

    .logo {
        float: right;
        height: 50px;
        border-radius: 50%;
        margin-top: 5px;
        margin-right: 5%;
    }
</style>
