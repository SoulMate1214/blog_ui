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

    export default class adminArticle extends Vue {
        parameter: any = {
            tableTitle: "站点基本设置表",
            tableName: "sysSettings",
            associatedTableName :[],
            tableUrl: "http://127.0.0.1:1111/setting/searchAll",
            tableDeleteUrl:"http://127.0.0.1:1111/setting/batchDelete",
            tableSaveUrl:"http://127.0.0.1:1111/setting/save",
            tableHeader: ['编号','名称','排序','状态','备注','是否启用','创建时间','修改时间','创建者','修改者','站点路劲','站点标题','站点子标题','站点基本信息','站点关键字']
        };
    }
</script>

<style scoped>

</style>
