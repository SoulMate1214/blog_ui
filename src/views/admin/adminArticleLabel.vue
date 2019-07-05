<!--页面-->
<template>
    <div>
        <adminTable
                :associatedTableName=parameter.associatedTableName
                :tableSaveUrl=parameter.tableSaveUrl
                :tableDeleteUrl=parameter.tableDeleteUrl
                :tableName=parameter.tableName
                :tableUrl=parameter.tableUrl
                :tableTitle=parameter.tableTitle
                :tableHeader=parameter.tableHeader>
        </adminTable>
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

    export default class adminClassify extends Vue {
        parameter: any = {
            tableTitle: "文章标签关联表",
            tableName: "sysArticleLabels",
            associatedTableName :["sysArticles","sysLabels"],
            tableUrl: "http://localhost:1111/articleLabel/searchAll",
            tableDeleteUrl:"http://localhost:1111/articleLabel/batchDelete",
            tableSaveUrl:"http://localhost:1111/articleLabel/save",
            tableHeader: ['编号','名称','排序','状态','备注','是否启用','创建时间','修改时间','创建者','修改者','文章编号','标签编号','文章详情','标签详情']
        };
    }
</script>

<style scoped>

</style>
