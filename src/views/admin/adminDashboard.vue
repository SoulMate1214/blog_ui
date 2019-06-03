<template>
    <div>
        <hr width="95%" color=#5193d5 SIZE=3>
        <div id="gaugeContainer" class="charts"></div>
        <div id="radarContainer" class="charts"></div>
        <hr width="95%" color=#5193d5 SIZE=3>
        <div id="scatterContainer" class="charts"></div>
        <div id="pieContainer" class="charts"></div>
        <hr width="95%" color=#5193d5 SIZE=3>
        <div id="lineContainer" class="charts"></div>
        <div id="barContainer" class="charts"></div>
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

    export default {
        name: '',
        data() {
            return {}
        },
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
    }
</script>

<style scoped>
    .charts{
        margin-left: 15%;
        float: left;
        width: 450px;
        height:450px
    }
    hr {
        clear: left;
        margin-left: 15%;
    }
</style>
