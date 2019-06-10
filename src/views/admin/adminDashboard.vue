<template>
    <div id="admin-Dashboard">
        <hr color=#5193d5>
        <div id="block">
            <div class="block">
                <span class="demonstration">评论条数控制</span>
                <el-slider v-model="data.value1" ></el-slider>
            </div>

            <div class="block">
                <span class="demonstration">访问流量控制(M)</span>
                <el-slider :format-tooltip="formatTooltip" v-model="data.value2"></el-slider>
            </div>

            <div class="block">
                <span class="demonstration">30s内点赞次数(固定)</span>
                <el-slider disabled v-model="data.value3"></el-slider>
            </div>
            <el-carousel  height="450px" :interval="3000" type="card">
                <el-carousel-item v-for="item in 8" :key="item">
                    <img :src='handleImage(item)'>
                </el-carousel-item>
            </el-carousel>
        </div>
        <el-calendar id="calendar" v-model="data.value"></el-calendar>
        <div class="charts long-charts" id="lineContainer"></div>

        <hr color=#EBB471>
        <div class="charts" id="pieContainer"></div>
        <div class="charts" id="barContainer"></div>

        <hr color=#86A697>
        <div class="charts" id="gaugeContainer"></div>
        <div class="charts" id="radarContainer"></div>

        <hr color=#CB4042>
        <div class="charts long-charts" id="scatterContainer"></div>
    </div>
</template>

<script lang="ts">
    const echarts = require('echarts');
    import {guageOption} from '@/utils/echartsOption/guage-option'
    import {radarOption} from '@/utils/echartsOption/radar-option'
    import {pieOption} from '@/utils/echartsOption/pie-option'
    import {scatterOption} from '@/utils/echartsOption/scatter-option'
    import {lineOption} from '@/utils/echartsOption/line-option'
    import {barOption} from '@/utils/echartsOption/bar-option'
    import {Component, Prop, Vue} from "vue-property-decorator";

    @Component
    export default class Slider extends Vue {
        data: any = {
            value: new Date(),
            value1: 20,
            value2: 50,
            value3: 30,
        };

        mounted() {
            let myChart1 = echarts.init(document.getElementById('gaugeContainer'));
            let myChart2 = echarts.init(document.getElementById('radarContainer'));
            let myChart3 = echarts.init(document.getElementById('pieContainer'));
            let myCharts4 = echarts.init(document.getElementById('scatterContainer'));
            let myCharts5 = echarts.init(document.getElementById('lineContainer'));
            let myCharts6 = echarts.init(document.getElementById('barContainer'));
            myChart1.setOption(guageOption);
            myChart2.setOption(radarOption);
            myChart3.setOption(pieOption);
            myCharts4.setOption(scatterOption);
            myCharts5.setOption(lineOption);
            myCharts6.setOption(barOption);
        }

        formatTooltip(val: any) {
            return val / 100;
        }

        /**
         * 加载图片
         */
        handleImage(item:any) {
            return require("../../assets/bg" + item + ".jpg");
        }
    }
</script>

<style lang="less" scoped>
    #admin-Dashboard {
        position: absolute;
        width: 85%;
        margin-left: 15%;
    }

    .charts {
        margin-left: 15%;
        float: left;
        width: 450px;
        height: 450px
    }

    .long-charts {
        margin-left: 2%;
        width: 95%;
        height: 400px;
    }

    #block {
        margin-left: 2%;
        width: 50%;
        float: left;
    }

    #calendar {
        float: left;
        width: 45%;
    }

    hr {
        margin-top: 4%;
        width: 95%;
        clear: left;
    }

    .el-carousel__item h3 {
        color: #475669;
        font-size: 14px;
        opacity: 0.75;
        line-height: 200px;
        margin: 0;
    }

    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
    }
</style>
