<!--页面-->
<template>
    <div>
        <adminTable :tableName=parameter.tableName :tableUrl=parameter.tableUrl :tableTitle=parameter.tableTitle :tableHeader=parameter.tableHeader></adminTable>
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
            tableTitle: "资源表",
            tableName: "sysReses",
            tableUrl: "http://localhost:1111/sysReses",
            tableHeader: ['编号','资源名','排序','状态','备注','是否启用','创建时间','修改时间','创建者','修改者','父级编号','描述','资源路径','资源等级','图标','资源类型','父级信息']
        };
    }
</script>

<style scoped>

</style>
