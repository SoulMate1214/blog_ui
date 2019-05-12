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
                    <div id="content" class="article-detail" v-html="articleDetail.message"></div>
                </div>

                <!--点赞-->
                <div class="heart">
                    <el-button type="danger" size="large" icon="heart" :loading="isLoading" @click="">点赞</el-button>
                </div>

                <!--评论提交-->
                <div class="comment">
                    <!--评论框-->
                    <el-input placeholder="文明社会，理性评论" type="textarea" v-model="content"></el-input>
                    <!--评论按钮-->
                    <el-button style="margin-top: 15px" type="primary" :loading="btnLoading" @click="">发 送</el-button>
                </div>

<!--                &lt;!&ndash;显示评论信息&ndash;&gt;-->
<!--                <CommentList v-if="!isLoading" @refreshArticle="refreshArticle" :numbers="articleDetail.meta.comments"-->
<!--                             :list="articleDetail.comments" :article_id="articleDetail._id"/>-->
            </div>

            <!--左侧-->
            <div v-if="!isMobileOrPc" style="width: 23%" class="article-right fr">
                <Slider></Slider>
            </div>

            <!--拼命加载中-->
            <LoadingCustom v-if="isLoading"></LoadingCustom>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import {
        timestampToTime,
        getQueryStringByName,
        isMobileOrPc
    } from "@/utils/utils";
    // @ts-ignore
    import LoadingCustom from "@/components/loading.vue";
    // @ts-ignore
    import CommentList from "@/components/commentList.vue";
    // @ts-ignore
    import Slider from "@/components/slider.vue";

    declare var document: any;

    @Component({
        components: {
            LoadingCustom,
            CommentList,
            Slider
        }
    })

    export default class ArticleDetail extends Vue {
        reverse: boolean = true;
        btnLoading: boolean = false;
        isLoadEnd: boolean = false;
        isLoading: boolean = false;
        isMobileOrPc: boolean = isMobileOrPc();
        articlesList: Array<object> = [];
        listList: Array<object> = [];
        total: number = 0;
        params: any = {
            id: "",
            classify_id: 1 //文章类型
        };
        content: string = "";
        articleDetail: any = {
            toc: "",
            _id: "",
            author: "冫Soul丶",
            category: [],
            comments: [],
            create_time: "",
            desc: "",
            id: 16,
            img_url: "",
            numbers: 0,
            keyword: [],
            like_users: [],
            meta: {views: 0, likes: 0, comments: 0},
            origin: 0,
            state: 1,
            tags: [],
            title: "",
            update_time: ""
        };
        labelList: Array<object> = [];

        mounted() {
            this.params.id = this.$route.query.sysArticles;
            if (this.$route.path === "/about") {
                this.params.type = 3;
            }
            this.handleSearch();
            this.labelSearch();
        }

        refreshArticle() {
            this.handleSearch();
            this.labelSearch();
        }

        // 评论
        // async handleAddComment() {
        //   if (!this.articleDetail._id) {
        //     this.$message({
        //       message: "该文章不存在！",
        //       type: "error"
        //     });
        //     return;
        //   }
        //   if (!this.content) {
        //     this.$message({
        //       message: "请输入内容!",
        //       type: "warning"
        //     });
        //     return;
        //   }
        //   let user_id = "";
        //   if (window.sessionStorage.userInfo) {
        //     let userInfo = JSON.parse(window.sessionStorage.userInfo);
        //     user_id = userInfo._id;
        //   } else {
        //     this.$message({
        //       message: "登录才能评论，请先登录！",
        //       type: "warning"
        //     });
        //     return;
        //   }
        //
        //   // 评论请求
        //   this.btnLoading = true;
        //   const res: any = await this.$https.post(this.$urls.addComment, {
        //     id: this.articleDetail._id,
        //     user_id,
        //     content: this.content
        //   });
        //   this.btnLoading = false;
        //   if (res.status === 200) {
        //     if (res.data.code === 0) {
        //       this.content = "";
        //       this.$message({
        //         message: res.data.message,
        //         type: "success"
        //       });
        //       this.handleSearch();
        //     } else {
        //       this.$message({
        //         message: res.data.message,
        //         type: "error"
        //       });
        //     }
        //   } else {
        //     this.$message({
        //       message: "网络错误!",
        //       type: "error"
        //     });
        //   }
        // }

        //显示的信息
        beforeDestroy() {
            document.title = "冫Soul丶 的博客网站";
            document
                .getElementById("keywords")
                .setAttribute("content", "冫Soul丶 的博客网站");
            document
                .getElementById("description")
                .setAttribute(
                    "content",
                    "——分享冫Soul丶的成长历程与相关的技术文章"
                );
        }

        // 获取时间
        formatTime(value: any) {
            return timestampToTime(value, true);
        }

        //请求文章内容
        async handleSearch() {
            this.isLoading = true;
            const res: any = await this.$https.get('http://127.0.0.1:1111/article/findSysArticleById?articleId=' + this.params.id
            );
            this.isLoading = false;
            if (res.status === 200) {
                this.articleDetail = res.data;
            } else {
                this.$message({
                    message: "网络错误!",
                    type: "error"
                });
            }
        }

        //请求文章所属标签内容
        async labelSearch() {
            this.isLoading = true;
            const res: any = await this.$https.get('http://127.0.0.1:1111/articleLabel/findLabelByArticleId?articleId=' + this.params.id
            );
            this.isLoading = false;
            if (res.status === 200) {
                this.labelList = res.data;
            } else {
                this.$message({
                    message: "网络错误!",
                    type: "error"
                });
            }
        }

        // 点赞请求
        // async likeArticle() {
        //   if (!this.articleDetail._id) {
        //     this.$message({
        //       message: "该文章不存在！",
        //       type: "warning"
        //     });
        //     return;
        //   }
        //   let user_id: any = "";
        //   if (window.sessionStorage.userInfo) {
        //     let userInfo = JSON.parse(window.sessionStorage.userInfo);
        //     user_id = userInfo._id;
        //   } else {
        //     this.$message({
        //       message: "登录才能点赞，请先登录！",
        //       type: "warning"
        //     });
        //     return;
        //   }
        //   let params: any = {
        //     id: this.articleDetail._id,
        //     user_id
        //   };
        //   const res: any = await this.$https.post(this.$urls.likeArticle, params);
        //   this.isLoading = false;
        //   if (res.status === 200) {
        //     if (res.data.code === 0) {
        //       ++this.articleDetail.meta.likes;
        //       this.$message({
        //         message: res.data.message,
        //         type: "success"
        //       });
        //     } else {
        //       this.$message({
        //         message: res.data.message,
        //         type: "error"
        //       });
        //     }
        //   } else {
        //     this.$message({
        //       message: "网络错误!",
        //       type: "error"
        //     });
        //   }
        // }
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
            -moz-box-shadow: 0 0px 0px #fff;
            -webkit-box-shadow: 0 0px 0px #fff;
            box-shadow: 0 0px 0px #fff;

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
            min-height: 300px;
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

