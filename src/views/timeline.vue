<!--页面-->
<template>
    <div class="timeline left">
        <el-timeline>
            <el-timeline-item v-for="(timeline, index) in timelineList" :key="index"
                              :color="timeline.status === 1 ? 'green' : timeline.status === 2 ? 'red' : ''"
                              placement="top"
                              hide-timestamp>
                <el-card>
                    <h3>{{timeline.name}}</h3>
                    <p>{{timeline.message}}</p>
                    <p>
                        <span>
                          {{formatTime(timeline.createTime)}}--
                        </span>

                        <span>
                          {{formatTime(timeline.modifyTime)}}
                        </span>
                    </p>
                </el-card>
            </el-timeline-item>
        </el-timeline>
        <LoadingCustom v-if="isLoading"></LoadingCustom>
        <LoadEnd v-if="isLoadEnd"></LoadEnd>
    </div>
</template>

<!--逻辑-->
<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    // @ts-ignore
    import LoadEnd from "@/components/loadEnd.vue";
    // @ts-ignore
    import LoadingCustom from "@/components/loading.vue";
    import {
        getScrollTop,
        getDocumentHeight,
        getWindowHeight,
        timestampToTime
    } from "@/utils/utils";

    @Component({
        components: {
            LoadEnd,
            LoadingCustom
        }
    })
    export default class Timeline extends Vue {
        reverse: boolean = true;
        isLoadEnd: boolean = false;
        isLoading: boolean = false;
        timelineList: Array<object> = [];

        /**
         * 自加载函数
         */
        mounted() {
            this.handleSearch();
        }

        /**
         * 获取时间
         * @param value
         */
        formatTime(value: any) {
            return timestampToTime(value, true);
        }

        /**
         * 请求数据库
         */
        async handleSearch() {
            this.isLoading = true;
            const res: any = await this.$https.get("http://127.0.0.1:1111/sysTimelines");
            this.isLoading = false;
            if (res.status === 200) {
                const data: any = res.data._embedded;
                this.timelineList = [...this.timelineList, ...data.sysTimelines];
            } else {
                this.$message({
                    message: "网络错误!",
                    type: "error"
                });
            }
        }
    }
</script>

<!--样式-->
<style lang="less" scoped>
    .timeline {
        padding: 40px 0;
        margin-top: 35%;

        .year {
            font-size: 34px;
            font-weight: bold;
            color: #000;
        }

        a {
            text-decoration: none;
        }

        .title {
            color: #333;

            &:hover {
                color: #1890ff;
            }
        }
    }
</style>

