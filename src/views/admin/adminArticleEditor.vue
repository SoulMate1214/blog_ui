<template>
    <div id="main">
        <Form ref="form" :model="form" label-width="80px">
            <el-row>
                <el-col :span="3" class="col">
                    <FormItem label="启禁用">
                        <el-switch v-model="form.isEnable"></el-switch>
                    </FormItem>
                </el-col>
                <el-col :span="6" class="col">
                    <FormItem label="标签">
                        <el-select v-model="form.label" multiple placeholder="请选择">
                            <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </FormItem>
                </el-col>
                <el-col :span="6" class="col">
                    <FormItem label="所属分类">
                        <el-select v-model="form.classify" placeholder="请选择">
                            <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </FormItem>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="15" class="col">
                    <FormItem label="文章名">
                        <Input v-model="form.name" autocomplete="on" placeholder="name"></Input>
                    </FormItem>
                </el-col>
            </el-row>
        </Form>

        <mavon-editor
                style="height: 600px"
                :ishljs="true"
                ref=md
                @imgAdd="$imgAdd"
                @imgDel="$imgDel"
                v-model="form.message">
        </mavon-editor>
        <Button @click="uploadimg" type="primary" id="save">提交</Button>
    </div>
</template>

<script>
  import {Component, Emit, Prop, Vue} from "vue-property-decorator"
  import {Form, FormItem, Input, Button} from "element-ui"
  import {mavonEditor} from "mavon-editor"
  import "mavon-editor/dist/css/index.css"

  export default {
    components: {
      mavonEditor,
      Form,
      FormItem,
      Input,
      Button
    },

    data() {
      return {
        isLoadEnd: false,
        isLoading: false,
        labelList: [],
        articleClassList: [],
        img_file: {},
        value: "",
        options: [{
          value: "选项1",
          label: "黄金糕"
        }, {
          value: "选项2",
          label: "双皮奶"
        }, {
          value: "选项3",
          label: "蚵仔煎"
        }, {
          value: "选项4",
          label: "龙须面"
        }, {
          value: "选项5",
          label: "北京烤鸭"
        }],
        form: {
          name: "",
          isEnable: true,
          label: [],
          classify: [],
          message: "",
          formdata: new FormData()
        }

      }
    },

    mounted:function(){
      this.handleLabelSearch()
      this.handleArticleClassSearch()
    },

    methods: {
      /**
       * 以下是单张图片上传,选择时就上传
       * @param pos
       * @param $file
       */
      // $imgAdd(pos, $file) {
      //   this.form.formdata.append("image", $file)
      //   console.log(this.form.formdata)
      //   this.$https.post("server url", this.form.formdata, {
      //     headers: {"Content-Type": "multipart/form-data"}
      //   })
      //     .then((url) => {
      //       mavonEditor.$img2Url(pos, url)
      //     })
      //     .catch((error) => {
      //       if (error.response.status === 500) {
      //         this.$message({
      //           message: "图片上传失败",
      //           type: "error"
      //         })
      //       }
      //     })
      // }

      /**
       * 以下Add,Del,upload为点击事件多张图片一次性上传
       * Add将图片添加至缓存
       * Del删除缓存图片
       * upload上传多张图片
       */
      $imgAdd(pos, $file) {
        this.img_file[pos] = $file
        console.log(pos)
        console.log($file)
      },
      $imgDel(pos) {
        delete this.img_file[pos]
        console.log(this.img_file[pos])
      },
      uploadimg($e) {
        for (let _img in this.img_file) {
          this.form.formdata.append(_img, this.img_file[_img])
        }
        console.log(this.form.formdata)
        console.log(this.form.name)
        console.log(this.form.isEnable)
        console.log(this.form.label)
        console.log(this.form.classify)
        console.log(this.form.message)
        // this.$https.post("server url", this.form.formdata, {
        //   headers: {"Content-Type": "multipart/form-data"}
        // })
        //   .then((res) => {
        //     for (let img in res) {
        //       //@ts-ignore
        //       this.$refs.md.$img2Url(img[0], img[1])
        //     }
        //   })
        //   .catch((error) => {
        //     if (error.response.status === 500) {
        //       this.$message({
        //         message: "图片上传失败",
        //         type: "error"
        //       })
        //     }
        //   })
      }
    },

    /**
     * 获取标签
     */
    async handleLabelSearch() {
      this.isLoading = true;
      const res= await this.$https.get("http://127.0.0.1:1111/sysLabels");
      this.isLoading = false;
      if (res.status === 200) {
        const data = res.data._embedded;
        this.labelList = [...this.labelList, ...data.sysLabels];
        this.isLoadEnd = true;
        console.log(this.labelList);
      } else {
        this.$message({
          message: "网络错误!",
          type: "error"
        });
      }
    },

    /**
     * 获取分类列表
     */
    async handleArticleClassSearch() {
      this.isLoading = true;
      const res = await this.$https.get('http://127.0.0.1:1111/sysClassifies');
      this.isLoading = false;
      if (res.status === 200) {
        const data = res.data._embedded;
        this.articleClassList = [...this.articleClassList, ...data.sysClassifies];
        console.log(this.articleClassList);
      } else {
        this.$message({
          message: "网络错误!",
          type: "error"
        });
      }
    }
  }
</script>

<style scoped>
    #main {
        position: absolute;
        width: 85%;
        margin-left: 15%;
        margin-top: 5%;
    }

    #save {
        margin-left: 47.3%;
        margin-top: 5%
    }

    .col {
        margin-left: 2%;
    }
</style>
