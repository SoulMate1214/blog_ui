<!--页面-->
<template>
    <div>
        <adminTable :tableDeleteUrl=parameter.tableDeleteUrl :tableName=parameter.tableName :tableUrl=parameter.tableUrl :tableTitle=parameter.tableTitle :tableHeader=parameter.tableHeader></adminTable>
    </div>
</template>

<!--逻辑-->
<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    // @ts-ignore
    import adminTable from "@/components/adminTable.vue";

    /**
     * 加载组件
     */
    @Component({
        components: {
            adminTable,
        }
    })

    export default class adminArticle extends Vue {
        parameter: any = {
            tableTitle: "页面表",
            tableName: "sysPages",
            tableUrl: "http://localhost:1111/page/searchAll",
            tableDeleteUrl:"http://localhost:1111/page/batchDelete",
            tableHeader: ['编号','名称','排序','状态','备注','是否启用','创建时间','修改时间','创建者','修改者','页面路劲']
        };
    }
</script>

<style scoped>

</style>
