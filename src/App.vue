<!--页面-->
<template>
    <!--电脑端-->
    <div id="app" class="container" v-if="!isMobile">
        <el-carousel v-if="isShowNav"
                     id="nav-background"
                     :interval="5000"
                     arrow="always"
                     height="500px"
                     indicator-position="none">
                <el-carousel-item v-for="item in 34" :key="item">
                    <img :src='handleImage(item)' class="banner">
                    <span style="position:absolute; left:36%; top:10%">冫Soul丶
                    <span id="child-text" style="position:absolute; left:60%; top:30%">——冫Mate丶</span>
                </span>
                </el-carousel-item>
        </el-carousel>
        <!--头部-->
        <Nav v-if="isShowNav"/>
        <!--右侧-->
        <div class=" layout">
            <router-view/>
            <Slider v-if="isShowSlider"></Slider>
        </div>
        <ArrowUp></ArrowUp>
        <!--脚部-->
        <Footer v-show="isShowNav"></Footer>
    </div>

    <!--手机端-->
    <div id="appPhone" class="container" v-else>
        <!--头部-->
        <Nav v-if="isShowNav"/>
        <!--右侧-->
        <div class=" layout">
            <router-view/>
            <Slider v-if="isShowSlider"></Slider>
        </div>
        <ArrowUp></ArrowUp>
        <!--脚部-->
        <Footer v-show="isShowNav"></Footer>
    </div>
</template>

<!--逻辑-->
<script lang="ts">
    import {Vue, Watch} from "vue-property-decorator";
    import Component from "vue-class-component";
    import {Route} from "vue-router";
    // @ts-ignore
    import Nav from "@/components/nav.vue";
    // @ts-ignore
    import Slider from "@/components/slider.vue";
    // @ts-ignore
    import Footer from "@/components/footer.vue";
    // @ts-ignore
    import ArrowUp from "@/components/arrowUp.vue";
    import {isMobileOrPc} from "@/utils/utils";

    // 移动端 rem 单位适配
    if (isMobileOrPc()) {
        var width = window.screen.width;
        window.document.getElementsByTagName("html")[0].style.fontSize =
            width / 7.5 + "px";
    }

    @Component({
        components: {
            Slider,
            ArrowUp,
            Footer,
            Nav
        }
    })

    export default class App extends Vue {
        isShowNav: boolean = false;
        isShowSlider: boolean = false;
        isMobile: boolean = isMobileOrPc();

        mounted() {
            this.routeChange(this.$route);
        }

        @Watch("$route")
        routeChange(val: Route) {
            this.isShowNav = val.path === "/articles" || val.path === "/timeline" || val.path === "/articleDetail"|| val.path === "/friend";
            this.isShowSlider = val.path === "/articles" || val.path === "/timeline"|| val.path === "/articleDetail";
            if (isMobileOrPc()) {
                this.isShowSlider = false;
            }
        }

        /**
         * 随机加载背景
         */
        handleImage(item:any) {
            return require("assets/navBg" + item + ".jpg");
        }
    }
</script>

<!--样式-->
<style lang="less" >
    @import url("./less/index.less");
    @import url("./less/mobile.less");

    #app {
        font-family: "Avenir", Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: left;
        color: #2c3e50;
        width: 1200px;
        margin: 0 auto;
        padding-top: 61px;
    }

    #appPhone {
        font-family: "Avenir", Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: left;
        color: #2c3e50;
        width: 1200px;
        margin: 0 auto;
        padding-top: 61px;
    }

    #child-text{
        font-size: 40%;
        font-weight: lighter;
        color: #eeeeee;
        width: 100%;
    }

    #nav-background{
        font-size: 600%;
        font-weight:bold;
        color: #eeeeee;
        line-height: 350%;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
    }

    a{
        text-decoration:none
    }

</style>
