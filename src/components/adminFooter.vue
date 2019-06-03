<!--页面-->
<template>
    <!--脚部显示-->
    <div id="admin-footer">
        <div>分享技术，分享生活</div>
        <div>灵魂伴侣 ©2019 Create by 冫Soul丶</div>
    </div>
</template>

<!--逻辑-->
<script lang="ts">
    import {Vue, Component} from "vue-property-decorator";

    @Component
    export default class Footer extends Vue {}
</script>

<!--样式-->
<style lang="less" scoped>
    #admin-footer {
        text-align: center;
        font-weight: bold;
        bottom: 0;
        width: 100%;
        position: fixed;
    }
</style>

