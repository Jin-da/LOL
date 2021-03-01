<template>
  <div>
    <h1>{{ id ? "编辑" : "新建" }}文章</h1>
    <el-form label-width="120px" @submit.native.prevent="save"
      ><!--阻止默认提交-->
      <el-form-item label="所属分类">
        <el-select v-model="model.categories" multiple>
          <el-option v-for="item in categories" :key="item._id" :label="item.name" :value="item._id"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="标题">
        <el-input v-model="model.title"></el-input>
      </el-form-item>

      <el-form-item label="头像">
          <el-upload
            class="avatar-uploader"
            :action="$http.defaults.baseURL + '/upload'"
            :headers="getAuthHeaders()"
            :show-file-list="false"
            :on-success="afterUpload"
          ><!--action为图片上传地址-->
            <img v-if="model.avatar" :src="model.avatar" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          </el-form-item>

      <el-form-item label="详情">
        <vue-editor v-model="model.body" useCustomImageHandler @image-added="handleImageAdded"></vue-editor>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { VueEditor } from 'vue2-editor'//npm i --save vue2-editor
export default {
  props: {
    id: {} //在router/index中将url参数中的id注入该组件 并在组件中用props接收使用
  },
  components: {
    VueEditor
  },
  data() {
    return {
      model: {
        avatar: ''
      },
      categories: []
    }
  },
  methods: {
    afterUpload(res) {
      this.model.avatar = res.url
    },
    async handleImageAdded(file, Editor, cursorLocation, resetUploader) {//富文本编辑器的图片上传
      var formData = new FormData();
      formData.append("file", file);
      const res = await this.$http.post('upload', formData)
      Editor.insertEmbed(cursorLocation, "image", res.data.url);//在光标位置插入图片
      resetUploader();
    },
    async save() {
      if (this.id) {
        await this.$http.put(`rest/articles/${this.id}`, this.model);
      } else {
        await this.$http.post("rest/articles", this.model);
      }
      this.$router.push("/articles/list"); //发送post请求后跳转页面
      this.$message({
        //element自带 提示保存成功
        type: "success",
        message: "保存成功",
      })
    },
    async fetch() {
      const res = await this.$http.get(`rest/articles/${this.id}`);
      this.model = res.data;
    },
    async fetchCategories() {
      const res = await this.$http.get('rest/categories');
      // res.data.forEach(item => {
      //   if (item.parent) {
      //     this.parents.push(item)
      //     return
      //   }
      // })
      this.categories = res.data
    },
  },
  created() {
    this.fetchCategories()
    if (this.id) {
      this.fetch();
    }
  },
};
</script>