<!--页面-->
<template>
    <el-row id="friend" v-bind:class="{ friendPhone: isMobile }">
        <el-col class="col" :span="5" v-for="(o, index) in 8" :key="o"  @click.native="jump(url[index])">
            <el-card :body-style="{ padding: '0px' }">
                <img :src=handleImage(index) class="image">
                <div style="padding: 14px;">
                    <img :src=handleHead(index) class="logo" >
                    <h3 align="center">{{title[index]}}</h3>
                    <h5>——{{ message[index] }}</h5>
                </div>
            </el-card>
        </el-col>
    </el-row>
</template>

<!--逻辑-->
<script lang="js">
  import {isMobileOrPc} from "@/utils/utils";
  export default {
    data() {
      return {
        isMobile:  isMobileOrPc(),
        title:["Japoul","EchoCow","Rmosdon","Rainss","纯洁的微笑","江南一点雨","小柒","匠心零度"],
        message:["热爱的事情应当不留余力","念念不忘，必有回响","I Make It Happen","雨落凋殇","分享技术，品味人生","专注于 Spring Boot + 微服务","偶尔聊聊生活的地方","以匠心，铸非凡！"],
        url:["http://japoul.cn/","https://echocow.cn/","http://rmosdon.cn/","https://rainss.cn/","http://www.ityouknow.com/","https://www.javaboy.org/","https://blog.52itstyle.vip/","http://www.jiangxinlingdu.com/"],
      };
    },
    methods: {
      /**
       * 背景
       * @param item
       * @returns {any}
       */
      handleImage(item) {
        return require("../assets/friendImg/" + item + ".jpg");
      },

      /**
       * 头像
       * @param item
       * @returns {any}
       */
      handleHead(item) {
        return require("../assets/friendHead/" + item + ".jpg");
      },

      /**
       * 路径
       * @param url
       * @returns {any}
       */
      jump(url){
        window.open(url, '_blank').location;
      }
    }

  }
</script>

<!--样式-->
<style lang="less" scoped>
    .friendPhone{
        margin-left: 4%;
        margin-top: 0 !important;
    }

    #friend{
        margin-left: 4%;
        margin-top: 35%;
    }
    .logo {
        width: 50px;
        border-radius: 100%;
        float: left;
    }
    .col{
        margin-top: 50px;
        margin-left: 20px;
    }
    .image {
        width: 100%;
        display: block;
    }
    .clearfix:before, .clearfix:after {
        display: table;
        content: "";
    }
    .clearfix:after {
        clear: both
    }
</style>

