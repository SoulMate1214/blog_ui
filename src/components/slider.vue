<template>
  <div class="right slider">
    <img class="right-logo"
         src="../assets/userLogo.jpeg"
         alt="">
    <div class="title">冫Soul丶</div>
    <div class="right-content">
      <div class="item">
        <div class="num">{{articlesList.length}}</div>文章数
      </div>
      <div class="item">
        <div class="num">{{articleClassList.length}}</div>分类数
      </div>
      <div class="item">
        <div class="num">{{labelList.length}}</div>标签数
      </div>
    </div>
    <div class="tags">
      <!--标签-->
      <div class="tags">
        <div class="title">标签云</div>
        <br><br>
        <el-tag size="medium" v-for="(tag,index) in labelList" :key="index" class="tag" type="primary">{{tag.name}}</el-tag>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Slider extends Vue {
  isLoadEnd: boolean = false;
  isLoading: boolean = false;
  labelList: Array<object> = [];
  articlesList: Array<object> = [];
  articleClassList: Array<object> = [];


  mounted() {
    this.handleLabelSearch();
    this.handleArticleSearch();
    this.handleArticleClassSearch();
  }

  /**
   * 获取文章列表
   */
  async handleArticleSearch() {
    this.isLoading = true;
    const res: any = await this.$https.get('http://127.0.0.1:1111/article/findSysArticles');
    this.isLoading = false;
    if (res.status === 200) {
      const data: any = res.data;
      this.articlesList = [...this.articlesList, ...data];
    } else {
      this.$message({
        message: "网络错误!",
        type: "error"
      });
    }
  }

  /**
   * 获取标签
   */
  async handleLabelSearch() {
    this.isLoading = true;
    const res: any = await this.$https.get("http://127.0.0.1:1111/sysLabels");
    this.isLoading = false;
    if (res.status === 200) {
      const data: any = res.data._embedded;
      this.labelList = [...this.labelList, ...data.sysLabels];
      this.isLoadEnd = true;
    } else {
      this.$message({
        message: "网络错误!",
        type: "error"
      });
    }
  }

  /**
   * 获取分类列表
   */
  async handleArticleClassSearch() {
    this.isLoading = true;
    const res: any = await this.$https.get('http://127.0.0.1:1111/sysClassifies');
    this.isLoading = false;
    if (res.status === 200) {
      const data: any = res.data._embedded;
      this.articleClassList = [...this.articleClassList, ...data.sysClassifies];
    } else {
      this.$message({
        message: "网络错误!",
        type: "error"
      });
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.slider {
  padding-top: 50px;
}
.right {
  text-align: center;
  .right-logo {
    width: 130px;
    border-radius: 50%;
    animation: mylogo 3s;
    -moz-animation: mylogo 3s; /* Firefox */
    -webkit-animation: mylogo 3s; /* Safari and Chrome */
    -o-animation: mylogo 3s; /* Opera */
    animation-iteration-count: infinite;
  }
  .title {
    font-size: 25px;
    font-weight: bold;
  }
  .right-content {
    padding: 10px 0 20px 0;
    margin-bottom: 10px;
    border-bottom: 1px solid #eee;
    .item {
      display: inline-block;
      padding: 0 10px;
      color: #969696;
      border-right: 1px solid #eee;
      &:last-child {
        border-right: none;
      }
      .num {
        color: #333;
      }
    }
  }
  .introduce {
    margin-bottom: 10px;
    border-bottom: 1px solid #eee;
    .title {
      font-size: 14px;
      color: #969696;
    }
    .content {
      color: #333;
      line-height: 26px;
      text-align: left;
      padding: 20px 0;
    }
    .footer {
      padding-bottom: 10px;
    }
  }
  .tags {
    min-height: 200px;
    padding: 5px 0 20px 0;
    margin-bottom: 10px;
    border-bottom: 1px solid #eee;
    .tag {
      margin-left: 5px;
      border-right: 2px solid #eee;
    }
    .title {
      font-size: 14px;
      color: #969696;
    }
    .item {
      display: inline-block;
      cursor: pointer;
      padding: 5px 10px;
      border-radius: 5px;
      background-color: #eee;
      color: #333;
      margin: 10px 10px 0 0;
      text-decoration: none;
      &:hover {
        color: #409eff;
      }
    }
  }
  .classification {
    padding: 5px 0 20px 0;
    .title {
      font-size: 14px;
      color: #969696;
    }
    .item {
      text-align: center;
      padding: 10px;
      border-bottom: 1px solid #eee;
      color: #666;
      margin: 10px 10px 0 0;
    }
  }
}
@keyframes mylogo {
  0% {
    transform: rotate(0deg) scale(0.8, 0.8);
    opacity: 1;
  }
  25% {
    transform: rotate(0deg) scale(1, 1);
    opacity: 0.8;
  }
  100% {
    transform: rotate(0deg) scale(0.8, 0.8);
    opacity: 1;
  }
}

@-moz-keyframes mylogo {
  0% {
    transform: rotate(0deg) scale(0.8, 0.8);
    opacity: 1;
  }
  25% {
    transform: rotate(0deg) scale(1, 1);
    opacity: 0.8;
  }
  100% {
    transform: rotate(0deg) scale(0.8, 0.8);
    opacity: 1;
  }
}

@-webkit-keyframes mylogo {
  0% {
    transform: rotate(0deg) scale(0.8, 0.8);
    opacity: 1;
  }
  25% {
    transform: rotate(0deg) scale(1, 1);
    opacity: 0.8;
  }
  100% {
    transform: rotate(0deg) scale(0.8, 0.8);
    opacity: 1;
  }
}

@-o-keyframes mylogo {
  0% {
    transform: rotate(0deg) scale(0.8, 0.8);
    opacity: 1;
  }
  25% {
    transform: rotate(0deg) scale(1, 1);
    opacity: 0.8;
  }
  100% {
    transform: rotate(0deg) scale(0.8, 0.8);
    opacity: 1;
  }
}
</style>
