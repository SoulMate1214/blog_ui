<!--页面-->
<template>
    <div class="load-end"> --------- 加载置底啦，不要再滑啦～～～---------</div>
</template>

<!--逻辑-->
<script lang="ts">
    import {Vue, Component} from "vue-property-decorator";

    @Component
    export default class LoadEnd extends Vue {
    }
</script>

<!--样式-->
<style lang="less" scoped>
    .load-end {
        text-align: center;
        padding: 30px;
    }
</style>

