<!--页面-->
<template>
    <div style="width: 100%">
        <div class="article clearfix">
            <div v-show="!isLoading" :style="{'width': isMobileOrPc ? '100%' : '75%'}" class="article-left fl">
                <div class="header">

                    <!--文章标题-->
                    <h1 class="title">{{articleDetail.name}}</h1>
                    <div class="author">

                        <!--logo-->
                        <div class="avatar">
                            <img class="auth-logo" src="../assets/userLogo.jpeg" alt="冫Soul丶">
                        </div>

                        <!--基本信息-->
                        <div class="info">
                            <span class="name">冫Soul丶</span>
                            <div props-data-classes="user-follow-button-header" data-author-follow-button=""/>
                            <div class="meta">
                                <span class="wordage">
                                  分类: {{articleDetail.remark}}
                                </span>

                                <span class="comments-count">
                                  浏览量: {{articleDetail.browseCount}}
                                </span>

                                <span class="likes-count">
                                  点赞: {{articleDetail.likeCount}}
                                </span>
                                <span class="publish-time">
                                  文章创建时间:{{articleDetail.createTime? formatTime(articleDetail.createTime): ""}}
                                </span>
                            </div>
                        </div>

                        <!--标签-->
                        <div class="tags " title="标签">
                            所属标签:
                            <el-tag size="medium" v-for="(tag,index) in labelList" :key="index" class="tag"
                                    type="warning">{{tag.name}}
                            </el-tag>
                        </div>
                        <span class="clearfix"/>
                    </div>
                </div>

                <!--文章内容-->
                <div class="content">
                    <div id="content" class="article-detail"  v-html="articleMessage"></div>
                </div>

                <!--点赞-->
                <div class="heart">
                    <el-button type="danger" :loading="isLoading" @click="likeArticle">点赞
                    </el-button>
                </div>

                <!--评论提交-->
                <div class="heart">
                    <!--评论框-->
                    <textarea autocomplete="off" placeholder="文明社会，理性评论" class="el-textarea__inner"
                              style="min-height: 150px;" v-model="content"></textarea>
                    <!--评论按钮-->
                    <el-button type="primary" :loading="btnLoading" style="margin-top: 15px" @click="handleAddComment">发
                        送
                    </el-button>
                </div>

                <!--显示评论信息-->
                <CommentList style="margin-top: 20%" v-if="!isLoading" @refreshArticle="refreshArticle"
                             :list="discussList" :article_id="articleDetail.id"/>
            </div>


            <!--拼命加载中-->
            <LoadingCustom v-if="isLoading"></LoadingCustom>
            <LoadEnd v-if="isLoadEnd"></LoadEnd>
        </div>
    </div>
</template>

<!--逻辑-->
<script lang="ts">
    //导入
    import {Component, Vue} from "vue-property-decorator";
    import marked from 'marked'
    import hljs from "highlight.js";
    import 'highlight.js/styles/monokai-sublime.css';
    import {
        timestampToTime,
        isMobileOrPc
    } from "@/utils/utils";
    // @ts-ignore
    import LoadingCustom from "@/components/loading.vue";
    // @ts-ignore
    import CommentList from "@/components/commentList.vue";

    declare var document: any;

    /**
     * 加载组件
     */
    @Component({
        components: {
            LoadingCustom,
            CommentList,
        }
    })

    /**
     * vue
     */
    export default class ArticleDetail extends Vue {
        reverse: boolean = true;
        btnLoading: boolean = false;
        isLoadEnd: boolean = false;
        isLoading: boolean = false;
        content: string = "";
        isMobileOrPc: boolean = isMobileOrPc();
        articleDetail: any = {};
        labelList: Array<object> = [];
        discussList: Array<object> = [];
        articleMessage: string = "";
        params: any = {
            articleId: "",
            message: "",
            user: "游客"
        };

        /**
         * 初始执行
         */
        mounted() {
            this.params.articleId = this.$route.query.sysArticles;
            this.handleSearch();
            this.labelSearch();
            this.discussSearch();
        }

        /**
         * 刷新
         */
        refreshArticle() {
            this.handleSearch();
            this.labelSearch();
            this.discussSearch();
        }

        /**
         * 获取时间
         * @param value
         */
        formatTime(value: any) {
            return timestampToTime(value, true);
        }

        /**
         * 请求文章内容
         */
        async handleSearch() {
            this.isLoading = true;
            const res: any = await this.$https.get('http://127.0.0.1:1111/article/findSysArticleById?articleId=' + this.params.articleId);
            this.isLoading = false;
            if (res.status === 200) {
                this.articleDetail = res.data;
                marked.setOptions({
                    renderer: new marked.Renderer(),
                    highlight: function (code) {
                        return hljs.highlightAuto(code).value;
                    },
                    pedantic: true,
                    gfm: true,
                    tables: true,
                    breaks: true,
                    sanitize: true,
                    smartLists: true,
                    smartypants: true,
                    xhtml: true
                });
                this.articleMessage = marked(this.articleDetail.message);
            } else {
                this.$message({
                    message: "文章加载失败哦!",
                    type: "error"
                });
            }
        }

        /**
         * 请求文章所属评论内容
         */
        async discussSearch() {
            this.isLoading = true;
            const res: any = await this.$https.get('http://127.0.0.1:1111/discuss/findDiscussByArticleId?articleId=' + this.params.articleId);
            this.isLoading = false;
            if (res.status === 200) {
                const data: any = res.data;
                this.discussList = [];
                this.discussList = [...this.discussList, ...data];
            } else {
                this.$message({
                    message: "所属评论加载失败哦!",
                    type: "error"
                });
            }
        }

        /**
         * 请求文章所属标签内容
         */
        async labelSearch() {
            this.isLoading = true;
            const res: any = await this.$https.get('http://127.0.0.1:1111/articleLabel/findLabelByArticleId?articleId=' + this.params.articleId);
            this.isLoading = false;
            if (res.status === 200) {
                const data: any = res.data;
                this.labelList = [];
                this.labelList = [...this.labelList, ...data];
            } else {
                this.$message({
                    message: "所属标签加载失败哦!",
                    type: "error"
                });
            }
        }

        /**
         * 点赞请求
         */
        async likeArticle() {
            if (!this.params.articleId) {
                this.$message({
                    message: "该文章不存在！",
                    type: "warning"
                });
                return;
            }
            this.btnLoading = true;
            const res: any = await this.$https.post('http://127.0.0.1:1111/article/saveLikeCount', this.params);
            this.btnLoading = false;
            if (res.status === 200) {
                this.$message({
                    message: "非常感谢您的点赞!",
                    type: "success"
                });
            } else {
                this.$message({
                    message: "出了点小错误,没赞成功哦!",
                    type: "error"
                });
            }
        }

        /**
         * 评论请求
         */
        async handleAddComment() {
            if (!this.params.articleId) {
                this.$message({
                    message: "该文章不存在！",
                    type: "error"
                });
                return;
            }
            if (!this.content) {
                this.$message({
                    message: "请输入内容!",
                    type: "warning"
                });
                return;
            }
            this.btnLoading = true;
            this.params.message = this.content;
            const res: any = await this.$https.post("http://127.0.0.1:1111/discuss/saveDiscuss", this.params);
            this.btnLoading = false;
            if (res.status === 200) {
                this.content = "";
                this.$message({
                    message: "感谢评论!",
                    type: "success"
                });
                this.discussSearch();
            } else {
                this.$message({
                    message: "评论失败了哦,要不重新试试?",
                    type: "error"
                });
            }
        }

    }
</script>
<style lang="less" scoped>
    .anchor {
        display: block;
        position: sticky;
        top: 213px;
        margin-top: 213px;
        border-left: 1px solid #eee;

        .anchor-ul {
            position: relative;
            top: 0;
            max-width: 250px;
            border: none;
            -moz-box-shadow: 0 0 0 #fff;
            -webkit-box-shadow: 0 0 0 #fff;
            box-shadow: 0 0 0 #fff;

            li.active {
                color: #009a61;
            }
        }

        a {
            color: #333;
        }
    }

    .article {
        width: 100%;
        margin-top: 50%;

        .header {
            .title {
                margin: 20px 0 0;
                text-align: center;
                font-size: 34px;
                font-weight: bold;
            }

            .author {
                position: relative;
                margin: 30px 0 40px;
                padding-left: 50px;

                .avatar {
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 48px;
                    height: 48px;
                    vertical-align: middle;
                    display: inline-block;

                    img {
                        width: 100%;
                        height: 100%;
                        border-radius: 50%;
                    }
                }

                .info {
                    float: left;
                    vertical-align: middle;
                    // display: inline-block;
                    margin-left: 8px;

                    a {
                        color: #333;
                    }
                }

                .name {
                    margin-right: 3px;
                    font-size: 16px;
                    vertical-align: middle;
                }

                .meta {
                    margin-top: 5px;
                    font-size: 12px;
                    color: #969696;

                    span {
                        padding-right: 5px;
                    }
                }

                .tags {
                    float: right;
                    padding-top: 15px;
                    // padding-right: 20px;
                    .tag {
                        // padding: 0 10px;
                        margin-left: 5px;
                        border-right: 2px solid #eee;
                    }
                }
            }
        }

        .content {
            min-height: 100px;
        }
    }

    .heart {
        height: 60px;
        text-align: center;
        margin: 50px;
    }

    .loader {
        color: #999;
        text-align: center;
        padding: 50px;
        font-size: 16px;
    }

    .clearfix {
        clear: both;
    }
</style>

