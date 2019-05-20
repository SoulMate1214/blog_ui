<!--页面-->
<template>
    <div class="comment-list">
        <!--共有几条评论-->
        <div class="top-title">
            <span>共 {{list.length}} 条评论</span>
        </div>
        <div v-for="(item, i) in list" :key="i" class="item">
            <!--加载用户头像-->
            <div class="item-header">
                <div class="author">
                    <div class="avator">
                        <img :src='handleImage()'>
                    </div>
                </div>

                <!--加载用户名及时间-->
                <div class="info">
                    <!--用户名-->
                    <div class="name" v-if="item.createUser!=null">
                        {{item.createUser}}{{item.id}}
                    </div>
                    <div class="name" v-else="item.createUser==null">
                        游客 {{item.id}}
                    </div>
                    <!--评论时间-->
                    <div class="time">
                        {{formatTime(item.createTime)}}
                    </div>
                </div>
            </div>

            <!--具体内容-->
            <div class="comment-detail">
                {{item.message}}
            </div>

            <!--回复按钮-->
            <div class="item-comment">
                <div @click="showCommentModal(item)" class="message heart">
                    <el-button size="small">回复</el-button>
                </div>
            </div>

            <!--回复内容-->
            <div v-for="(childItem, j) in list" :key="j" class="item-other" v-if="childItem.parentId===item.id">
                <div class="item-header">
                    <!--加载用户头像-->
                    <div class="author">
                        <div class="avator">
                            <img :src='handleImage()'>
                        </div>
                    </div>

                    <!--加载用户名及时间-->
                    <div class="info">
                        <!--用户名-->
                        <div class="name" v-if="childItem.createUser!=null">
                            {{childItem.createUser}}{{childItem.id}}
                        </div>
                        <div class="name" v-else="childItem.createUser==null">
                            游客 {{childItem.id}}
                        </div>
                        <!--评论时间-->
                        <div class="time">
                            {{formatTime(childItem.createTime)}}
                        </div>
                    </div>
                </div>

                <!--具体内容-->
                <div class="comment-detail">
                    {{childItem.message}}
                </div>

                <!--回复按钮-->
                <div class="item-comment">
                    <div @click="showCommentModal(childItem)" class="message heart">
                        <el-button size="small">回复</el-button>
                    </div>
                </div>
            </div>
        </div>
        <!--回复组件-->
        <Comment :visible="visible" :parent_id="parent_id" :article_id="article_id" @handleOk="handleOk"
                 @cancel="handleCancel"/>
    </div>
</template>

<!--逻辑-->
<script lang="ts">
    // @ts-ignore
    import {Vue, Component, Prop} from "vue-property-decorator";
    // @ts-ignore
    import {timestampToTime} from "@/utils/utils";
    // @ts-ignore
    import Comment from "@/components/comment.vue";

    @Component({
        components: {
            Comment
        }
    })

    export default class CommentList extends Vue {
        @Prop({default: []}) list!: Array<object>;
        @Prop({default: 0}) numbers!: number;
        @Prop({default: ""}) article_id!: string;
        parent_id: any = "";
        visible: boolean = false;
        content: any = "";

        /**
         * 时间
         */
        formatTime(value: any) {
            return timestampToTime(value, true);
        }

        /**
         * 随机加载头像
         */
        handleImage() {
            return require("../assets/user" + Math.floor(Math.random() * 8) + ".png");
        }

        /**
         * 点击回复按钮显示回复组件
         * @param item
         */
        showCommentModal(item: any) {
            this.visible = true;
            this.parent_id = item.id;
        }

        /**
         * 确认回复
         */
        handleOk() {
            this.visible = false;
            this.$emit("refreshArticle");
        }

        /**
         * 取消回复
         */
        handleCancel() {
            this.visible = false;
        }
    }
</script>

<!--样式-->
<style lang="less" scoped>
    .comment-list {
        text-align: center;
    }

    .comment-list {
        text-align: left;
        position: relative;

        .avatar {
            position: absolute;
            left: 0px;
        }

        .el-icon-circle-plus {
            font-size: 40px;
        }
    }

    .clearfix {
        clear: both;
    }

    .comment-list {
        margin-top: 30px;

        .top-title {
            font-size: 20px;
            font-weight: 700;
            border-bottom: 1px solid #9a9dc2;
        }

        .item {
            padding: 20px 0 30px;
            border-bottom: 1px solid #cdd2e3;

            .item-header {
                position: relative;
                padding-left: 45px;
                padding-bottom: 10px;

                .author {
                    position: absolute;
                    left: 0;
                    display: inline-block;

                    .avator {
                        display: inline-block;
                        margin-right: 5px;
                        width: 40px;
                        height: 40px;
                        vertical-align: middle;

                        img {
                            width: 100%;
                            height: 100%;
                            // border: 1px solid #ddd;
                            border-radius: 50%;
                        }
                    }
                }

                .info {
                    display: inline-block;

                    .name {
                        font-size: 15px;
                        color: #333;
                    }

                    .time {
                        font-size: 12px;
                        color: #969696;
                    }
                }
            }

            .comment-detail {
                min-height: 40px;
            }

            .item-comment {
                .like {
                    margin-right: 20px;
                }
            }
        }
    }

    .item-other {
        margin: 20px;
        padding: 20px;
        border-left: 1px solid #cdd2e3;

        .item-header {
            position: relative;
            padding-left: 45px;
            padding-bottom: 10px;

            .author {
                position: absolute;
                left: 0;
                display: inline-block;

                .avator {
                    display: inline-block;
                    margin-right: 5px;
                    width: 38px;
                    height: 38px;
                    vertical-align: middle;

                    img {
                        width: 100%;
                        height: 100%;
                        // border: 1px solid #ddd;
                        border-radius: 50%;
                    }
                }
            }

            .info {
                display: inline-block;

                .name {
                    font-size: 15px;
                    color: #333;
                }

                .time {
                    font-size: 12px;
                    color: #969696;
                }
            }
        }

        .comment-detail {
            min-height: 40px;
            border-bottom: 1px dashed #f0f0f0;
        }

        .message {
            padding: 10px;
        }
    }
</style>

