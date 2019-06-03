<template>
    <div id="admin-Dashboard">
        <h1>仪表盘及系统控制</h1>
        <hr color=#5193d5>
        <div id="block">
            <div class="block">
                <span class="demonstration">评论条数控制</span>
                <el-slider v-model="data.value1"></el-slider>
            </div>

            <div class="block">
                <span class="demonstration">访问流量控制(M)</span>
                <el-slider :format-tooltip="formatTooltip" v-model="data.value2"></el-slider>
            </div>

            <div class="block">
                <span class="demonstration">30s内点赞次数(固定)</span>
                <el-slider disabled v-model="data.value3"></el-slider>
            </div>
            <img id="image" src="../../assets/bg4.jpg">
        </div>
        <el-calendar id="calendar" v-model="data.value"></el-calendar>
        <div class="charts long-charts" id="lineContainer"></div>

        <hr color=#5193d5>
        <div class="charts" id="gaugeContainer"></div>
        <div class="charts" id="barContainer"></div>

        <hr color=#5193d5>
        <div class="charts" id="pieContainer"></div>
        <div class="charts" id="radarContainer"></div>

        <hr color=#5193d5>
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
        height: 300px;
    }

    #block {
        margin-left: 2%;
        width: 55%;
        float: left;
    }

    #calendar {
        float: left;
        width: 40%;
    }

    #image {
        width: 100%;
        height: 450px;
    }

    h1 {
        margin-top: 4%;
        margin-left: 2%;
        font-size: 30px;
    }

    hr {
        width: 95%;
        clear: left;
    }
</style>
