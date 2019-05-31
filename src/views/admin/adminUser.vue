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
            tableTitle: "用户表",
            tableName: "sysUsers",
            tableUrl: "http://localhost:1111/sysUsers",
            tableHeader: ['编号','用户名','排序','状态','备注','是否启用','创建时间','修改时间','创建者','修改者','密码','邮箱','qq号','github地址']
        };
    }
</script>

<style scoped>

</style>
