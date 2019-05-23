<!--页面-->
<template>
    <div class="home">
        <adminLeft></adminLeft>
        <adminNav></adminNav>
        <adminTable></adminTable>
        <adminFooter></adminFooter>
    </div>
</template>

<!--逻辑-->
<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    // @ts-ignore
    import adminNav from "@/components/adminNav.vue";
    // @ts-ignore
    import adminLeft from "@/components/adminLeft.vue";
    // @ts-ignore
    import adminTable from "@/components/adminTable.vue";
    // @ts-ignore
    import adminFooter from "@/components/adminFooter.vue";

    /**
     * 加载组件
     */
    @Component({
        components: {
            adminNav,
            adminLeft,
            adminTable,
            adminFooter
        }
    })
    export default class Slider extends Vue {}
</script>

<!--样式-->
<style>
    .home {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%
    }
</style>

