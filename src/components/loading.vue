<!--页面-->
<template>
    <!--加载的动画效果-->
    <div class="loading">
        <img src="../assets/loading.svg" alt="加载啊啊啊...">
    </div>
</template>

<!--逻辑-->
<script lang="ts">
    import {Vue, Component} from "vue-property-decorator";

    @Component
    export default class LoadingCustom extends Vue {
    }
</script>

<!--样式-->
<style lang="less" scoped>
    .loading {
        text-align: center;
        padding: 30px;
    }
</style>
