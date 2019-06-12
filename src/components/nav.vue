<!--页面-->
<template>
    <div>
        <!--非移动端-->
        <div v-if="!isMobile" class="nav">
            <div class="nav-content">
                <el-row :gutter="20">
                    <!--logo-->
                    <el-col :span="3">
                        <router-link to="/">
                            <img class="logo" src="../assets/logo.jpg" alt="冫Soul丶">
                        </router-link>
                    </el-col>

                    <!--选项-->
                    <el-col :span="16">
                        <el-menu :router="true" :default-active="activeIndex" active-text-color="#409eff"
                                 class="el-menu-demo" mode="horizontal" @select="handleSelect">
                            <el-menuItem :route="l.path" :index="l.index" v-for="l in list" :key="l.index">
                                {{l.name}}
                            </el-menuItem>

                            <el-menu-item><a href="http://www.xymate.cn" target="_blank">友链</a></el-menu-item>

                            <el-menu-item><a href="https://github.com/SoulMate1214" target="_blank">GitHub</a></el-menu-item>
                        </el-menu>
                    </el-col>

                    <!--控制台登录-->
                    <el-col :span="4">
                        <div class="nav-right">
                            <el-button size="medium" type="primary" @click="handleClick('/login')">控制台</el-button>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </div>

        <!--移动端不能通过循环显示，重写了一个-->
        <div v-else class="nav">
            <div class="nav-mobile">
                <!--                logo-->
                <div class="nav-mobile-logo">
                    <router-link to="/">
                        <img class="logo fl" src="../assets/logo.jpg" alt="冫Soul丶">
                    </router-link>
                </div>
                <!--标题主菜单-->
                <div class="title">{{title}}</div>
                <div class="menu" @click="handleMenu"><i class="el-icon-menu"></i></div>
            </div>
            <div v-if="isShow" class="nav-mobile-content"
                 :class="{'enter-slideUp': enterSlideUp,'leave-slideDown': leaveSlideDown}">
                <div class="list">
                    <div @click="handleClickMenu" class="item">
                        <router-link to="/">首 页</router-link>
                    </div>
                    <div @click="handleClickMenu('/articles')" class="item">
                        <router-link to="/articles">文 章</router-link>
                    </div>
                    <div @click="handleClickMenu('/timeline')" class="item">
                        <router-link to="/timeline">历 程</router-link>
                    </div>
                    <div class="item">
                        <a target="_blank" href="http://www.xymate.cn">友链</a>
                    </div>
                    <div class="item">
                        <a href="https://github.com/SoulMate1214" target="_blank">GitHub</a>
                    </div>
                    <div @click="handleClickMenu('/login')" class="item">
                        <span v-if="userInfo._id">{{ userInfo.name }}</span>
                        <span v-else>控制台</span>
                    </div>
                </div>
            </div>
        </div>

        <!--登录-->
        <login :visible="visible" :isMobile="isMobile" :handleFlag="handleFlag" @ok="handleOk"
               @cancel="handleCancel"></login>
    </div>
</template>

<!--逻辑-->
<script lang="ts">
    // @ts-ignore
    import {Component, Vue, Watch} from "vue-property-decorator";
    // @ts-ignore
    import login from "@/components/login.vue";
    // @ts-ignore
    import {isMobileOrPc} from "@/utils/utils";
    // @ts-ignore
    import {Route} from "vue-router";

    @Component({
        components: {
            login
        }
    })

    export default class Nav extends Vue {
        visible: boolean = false;
        handleFlag: string = "";
        title: string = "首页";
        list: Array<object> = [
            {
                index: "1",
                path: "/",
                name: "首页"
            },
            {
                index: "2",
                path: "/articles",
                name: "文章"
            },
            {
                index: "3",
                path: "/timeline",
                name: "历程"
            }
        ];
        activeIndex: string = "1";
        enterSlideUp: boolean = false;
        leaveSlideDown: boolean = false;
        isShow: boolean = false;
        isMobile: boolean = isMobileOrPc();

        mounted() {
            this.routeChange(this.$route);
        }


        /**
         * 跳转页面
         */
        @Watch("$route")
        routeChange(val: Route) {
            for (let i = 0; i < this.list.length; i++) {
                const l: any = this.list[i];
                if (l.path === val.path) {
                    this.activeIndex = i + 1 + "";
                    this.title = l.name;
                    break;
                }
            }
        }

        /**
         * 点击按钮显示登录页面
         * @param route
         */
        handleClickMenu(route: string) {
            this.isShow = false;
            if (route === "/login") {
                this.handleFlag = "login";
                this.visible = true;
            }
        }

        /**
         * 选择登录控制台按钮
         */
        handleClick(value: string) {
            this.handleFlag = value;
            this.visible = true;
        }

        /**
         * 加载主菜单内容
         */
        handleMenu() {
            this.isShow = true;
            this.enterSlideUp = true;
        }

        /**
         * 选择主菜单内容
         */
        handleSelect(val: string) {
            this.activeIndex = val;
        }

        /**
         * 显示
         * @param value
         */
        handleOk(value: boolean) {
            this.visible = value;
        }

        /**
         *取消
         */
        handleCancel(value: boolean) {
            this.visible = value;
        }
    }
</script>

<!--样式-->
<style scoped lang="less">
    .nav-mobile {
        display: flex;
        line-height: 60px;

        .nav-mobile-logo {
            flex: 1;
            margin-top: 5px;
            margin-left: 10px;
        }

        .title {
            flex: 3;
            font-size: 24px;
        }

        .menu {
            flex: 1;
            font-size: 34px;
            color: #409eff;
        }
    }

    .nav-mobile-content {
        font-size: 0.3rem;
        height: 7.3rem;
        width: 100%;
        background-color: #fff;

        .list {
            .item {
                line-height: 0.8rem;
                color: #303133;
                border-bottom: 1px solid #eee;

                a {
                    display: block;
                    width: 100%;
                    color: #409eff;
                    text-decoration-line: none;
                }
            }
        }
    }

    .nav {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1000;
        width: 100%;

        .nav-content {
            width: 1200px;
            margin: 0 auto;
        }

        .logo {
            height: 50px;
            border-radius: 50%;
            margin-top: 15px;
        }

        .el-menu.el-menu--horizontal {
            border-bottom: none;
            background-color: rgba(0, 0, 0, 0);
        }

        .el-menu--horizontal > .el-menu-item {
            font-size: 18px;
            cursor: pointer;
            color: #333;
        }

        .nav-right {
            position: relative;
            padding-top: 15px;
            text-align: right;

            .el-dropdown {
                cursor: pointer;
                padding-right: 60px;
            }

            .user-img {
                position: absolute;
                top: -15px;
                right: 0;
                width: 50px;
                border-radius: 50%;
            }
        }
    }

    .enter-slideUp,
    .leave-slideDown {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 1010;
    }

    .enter-slideUp {
        overflow: auto;
        visibility: visible;
        z-index: 1001;
        animation: slideUp 0.3s forwards;
    }

    .leave-slideDown {
        visibility: visible;
        z-index: 1001;
        animation: slideDown 0.3s forwards;
    }

    @keyframes slideUp {
        from {
            transform: translate3d(0, 100%, 0);
            opacity: 0.1;
        }
        to {
            transform: translate3d(0, 0, 0);
            opacity: 1;
        }
    }

    @keyframes slideDown {
        from {
            transform: translate3d(0, 0, 0);
        }
        to {
            transform: translate3d(0, 100%, 0);
            opacity: 0;
        }
    }

    .mask {
        position: fixed;
        z-index: 100;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #000;
        opacity: 0.5;
    }

    .mask-fade-out {
        animation: maskFadeOut 0.4s forwards;
    }

    @keyframes maskFadeOut {
        from {
            opacity: 0.5;
        }
        to {
            opacity: 0;
        }
    }

    a{
        display : block;
    }
</style>
