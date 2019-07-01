<template>
    <div id="main">
        <Form ref="form" :model="form" label-width="80px" enctype="multipart/form-data">
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
                                    v-for="item in labelList"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </FormItem>
                </el-col>
                <el-col :span="6" class="col">
                    <FormItem label="所属分类">
                        <el-select v-model="form.classify" placeholder="请选择">
                            <el-option
                                    v-for="item in articleClassList"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
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
                v-model="form.message">
        </mavon-editor>
        <Button @click="formPost" type="primary" id="save">提交</Button>
    </div>
</template>

<script>
  import {Form, FormItem, Input, Button} from "element-ui"

  export default {
    components: {
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
        form: {
          name: "",
          isEnable: true,
          label: [],
          classify: [],
          message: "",
          imageUrl: [],
        }
      }
    },

    /**
     * 自加载函数
     */
    mounted: function () {
      this.handleLabelSearch()
      this.handleArticleClassSearch()
    },

    methods: {
      /**
       * 以下是单张图片上传,选择时就上传
       * @param pos
       * @param $file
       */
      async $imgAdd(pos, $file) {
        let  formdata = new FormData();
        formdata.append("image", $file)
        this.$https.post("http://127.0.0.1:1111/file/saveFile", formdata,{
                headers: {"Content-Type": "multipart/form-data"}
              })
          .then((reponse) => {
            this.$refs.md.$img2Url(pos, reponse.data)
            this.form.imageUrl.push(reponse.data);
          })
          .catch((error) => {
            if (error.response.status === 500) {
              this.$message({
                message: "图片上传失败",
                type: "error"
              })
            }
          })
      },

      /**
       * 提交表单
       */
      async formPost() {
        this.isLoading = true
        const res = await this.$https.post("http://127.0.0.1:1111/article/saveArticle",this.form)
        this.isLoading = false
        if (res.status === 200) {
          this.$message({
            message: "恭喜你,又发布了一篇文章!",
            type: "success"
          })
        } else {
          this.$message({
            message: "网络错误,提交失败!",
            type: "error"
          })
        }
      },

      /**
       * 获取标签
       */
      async handleLabelSearch() {
        this.isLoading = true
        const res = await this.$https.get("http://127.0.0.1:1111/sysLabels")
        this.isLoading = false
        if (res.status === 200) {
          const data = res.data._embedded
          this.labelList = [...this.labelList, ...data.sysLabels]
          this.isLoadEnd = true
        } else {
          this.$message({
            message: "网络错误!",
            type: "error"
          })
        }
      },

      /**
       * 获取分类列表
       */
      async handleArticleClassSearch() {
        this.isLoading = true
        const res = await this.$https.get("http://127.0.0.1:1111/sysClassifies")
        this.isLoading = false
        if (res.status === 200) {
          const data = res.data._embedded
          this.articleClassList = [...this.articleClassList, ...data.sysClassifies]
        } else {
          this.$message({
            message: "网络错误!",
            type: "error"
          })
        }
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
