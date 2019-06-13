<!--页面-->
<template>
    <div class="left clearfix">
        <ul class="articles-list" id="list">
            <transition-group name="el-fade-in" tag="p">
                <li @click="articleDetail(article.id)" v-for="(article,index) in articlesList" v-bind:key="index"
                    class="item">
                    <div class="content">
                        <h4 class="title">{{article.name}}</h4>
                        <p class="abstract">{{article.message}}</p>
                        <div class="meta">
                            <span>分类: {{article.remark}}</span>
                            <span>浏览量: {{article.browseCount}}</span>
                            <span v-if="article.createTime"
                                  class="time">文章创建时间:{{formatTime(article.createTime)}}</span>
                        </div>
                    </div>
                    <hr color=#959595>
                </li>
            </transition-group>
        </ul>
        <LoadingCustom v-if="isLoading"></LoadingCustom>
        <LoadEnd v-if="isLoadEnd"></LoadEnd>
    </div>
</template>

<!--逻辑-->
<script lang="ts">
    import {Component, Prop, Vue, Watch} from "vue-property-decorator";
    import {Route} from "vue-router";
    import {
        throttle,
        getScrollTop,
        getDocumentHeight,
        getWindowHeight,
        timestampToTime
    } from "@/utils/utils";

    // @ts-ignore
    import LoadEnd from '@/components/loadEnd.vue';
    // @ts-ignore
    import LoadingCustom from "@/components/loading.vue";
    // 获取可视区域的高度
    const viewHeight = window.innerHeight || document.documentElement.clientHeight;
    // 用新的 throttle 包装 scroll 的回调
    const lazyload = throttle(() => {
        // 获取所有的图片标签
        const imgs = document.querySelectorAll("#list .item img");
        // num 用于统计当前显示到了哪一张图片，避免每次都从第一张图片开始检查是否露出
        let num = 0;
        for (let i = num; i < imgs.length; i++) {
            // 用可视区域高度减去元素顶部距离可视区域顶部的高度
            let distance = viewHeight - imgs[i].getBoundingClientRect().top;
            let imgItem: any = imgs[i];
            // 如果可视区域高度大于等于元素顶部距离可视区域顶部的高度，说明元素露出
            if (distance >= 100) {
                // 给元素写入真实的 src，展示图片
                let hasLaySrc = imgItem.getAttribute("data-has-lazy-src");
                if (hasLaySrc === "false") {
                    imgItem.src = imgItem.getAttribute("data-src");
                    imgItem.setAttribute("data-has-lazy-src", "true");
                }
                // 前 i 张图片已经加载完毕，下次从第 i+1 张开始检查是否露出
                num = i + 1;
            }
        }
    }, 1000);

    @Component({
        components: {
            LoadEnd,
            LoadingCustom
        }
    })

    export default class Articles extends Vue {
        isLoadEnd: boolean = false;
        isLoading: boolean = false;
        articlesList: Array<object> = [];

        /**
         * 加载数据
         */
        mounted() {
            this.handleSearch();
        }

        /**
         * 路由跳转
         */
        @Watch("$route")
        routeChange(val: Route, oldVal: Route) {
            this.articlesList = [];
            this.handleSearch();
        }

        /**
         * 点击文章跳转页面
         * @param id
         */
        articleDetail(id: string) {
            let url: string = "";
            if (process.env.NODE_ENV === "development") {
                url = "http://localhost:2222/articleDetail?";
            } else {
                url = "https://Soul.cn/articleDetail?";
            }
            window.open(url + `sysArticles=${id}`);
        }

        /**
         * 获取时间
         */
        formatTime(value: any) {
            return timestampToTime(value, true);
        }

        /**
         * axios请求后台获取文章列表
         */
        async handleSearch() {
            this.isLoading = true;
            const res: any = await this.$https.get('http://127.0.0.1:1111/article/findSysArticles');
            this.isLoading = false;
            if (res.status === 200) {
                const data: any = res.data;
                this.articlesList = [...this.articlesList, ...data];
                setTimeout(() => {
                    lazyload();
                }, 10);
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
    .left {
        margin-top: 35%;
        .articles-list {
            margin: 0;
            padding: 0;
            list-style: none;

            .title {
                color: #333;
                margin: 7px 0 4px;
                display: inherit;
                font-size: 18px;
                font-weight: 700;
                line-height: 1.5;
            }

            .item > div {
                padding-right: 140px;
            }

            .item .wrap-img {
                position: absolute;
                top: 50%;
                margin-top: -50px;
                right: 0;
                width: 125px;
                height: 100px;

                img {
                    width: 100%;
                    height: 100%;
                    border-radius: 4px;
                    border: 1px solid #f0f0f0;
                }
            }

            li {
                line-height: 20px;
                position: relative;
                width: 100%;
                padding: 15px 0px;
                border-bottom: 1px solid #f0f0f0;
                word-wrap: break-word;
                cursor: pointer;

                &:hover {
                    .title {
                        color: #000;
                    }
                }

                .abstract {
                    min-height: 30px;
                    margin: 0 0 8px;
                    font-size: 13px;
                    line-height: 24px;
                    color: #555;
                }

                .meta {
                    padding-right: 0 !important;
                    font-size: 12px;
                    font-weight: 400;
                    line-height: 20px;

                    a {
                        margin-right: 10px;
                        color: #b4b4b4;

                        &:hover {
                            transition: 0.1s ease-in;
                            -webkit-transition: 0.1s ease-in;
                            -moz-transition: 0.1s ease-in;
                            -o-transition: 0.1s ease-in;
                            -ms-transition: 0.1s ease-in;
                        }
                    }

                    span {
                        margin-right: 10px;
                        color: #666;
                    }
                }
            }
        }
    }
</style>
