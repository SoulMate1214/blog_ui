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
            tableTitle: "评论表",
            tableName: "sysDiscusses",
            tableUrl: "http://localhost:1111/discuss/searchAll",
            tableHeader: ['编号','名称','排序','状态','备注','是否启用','创建时间','修改时间','创建者','修改者','父级编号','文章编号','评论内容','文章详情','父级详情']
        };
    }
</script>

<style scoped>

</style>
