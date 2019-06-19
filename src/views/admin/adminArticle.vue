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
            tableTitle: "文章表",
            tableName: "sysArticles",
            tableUrl: "http://localhost:1111/article/searchAll",
            tableDeleteUrl:"http://localhost:1111/article/batchDelete",
            tableHeader: ['编号','文章名','排序','状态','备注','是否启用','创建时间','修改时间','创建者','修改者','文章内容','浏览量','点赞数','类型编号','类型详情']
        };
    }
</script>

<style scoped>

</style>
