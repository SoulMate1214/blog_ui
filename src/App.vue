<!--页面-->
<template>
    <div id="app" class="container">
        <div id="nav-background" v-if="isShowNav">
            <img :src='handleImage()'>
            <span style="position:absolute; left:40%; top:10%">冫Soul丶</span>
            <span id="child-text" style="position:absolute; left:60%; top:30%">——冫Mate丶</span>
        </div>

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

        mounted() {
            this.routeChange(this.$route);
        }

        @Watch("$route")
        routeChange(val: Route) {
            this.isShowNav = val.path === "/articles" || val.path === "/timeline" || val.path === "/articleDetail";
            this.isShowSlider = val.path === "/articles" || val.path === "/timeline";
            if (isMobileOrPc()) {
                this.isShowSlider = false;
            }
        }

        /**
         * 随机加载背景
         */
        handleImage() {
            return require("assets/navBg" + Math.floor(Math.random() * 12) + ".jpg");
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

    #child-text{
        font-size: 30px;
        font-weight: lighter;
        color: #eeeeee;
    }

    #nav-background{
        font-size: 80px;
        font-weight:bold;
        color: #eeeeee;
        line-height: 400px;
        height: 45%;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
    }
    a{
        text-decoration:none
    }

</style>
