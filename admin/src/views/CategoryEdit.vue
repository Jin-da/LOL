<template>
  <div>
    <h1>{{ id ? "编辑" : "新建" }}分类</h1>
    <el-form label-width="120px" @submit.native.prevent="save"
      ><!--阻止默认提交-->
      <el-form-item label="上级分类">
        <el-select v-model="model.parent">
          <el-option v-for="item in parents" :key="item._id" :label="item.name" :value="item._id"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    id: {} //在router/index中将url参数中的id注入该组件 并在组件中用props接收使用
  },
  data() {
    return {
      model: {},
      parents: []
    }
  },
  methods: {
    async save() {
      if (this.id) {
        await this.$http.put(`rest/categories/${this.id}`, this.model);
      } else {
        await this.$http.post("rest/categories", this.model);
      }
      this.$router.push("/categories/list"); //发送post请求后跳转页面
      this.$message({
        //element自带 提示保存成功
        type: "success",
        message: "保存成功",
      })
    },
    async fetch() {
      const res = await this.$http.get(`rest/categories/${this.id}`);
      this.model = res.data;
    },
    async fetchParents() {
      const res = await this.$http.get('rest/categories');
      res.data.forEach(item => {
        if (!item.parent) {
          this.parents.push(item)
          return
        }
      })
    },
  },
  created() {
    this.fetchParents()
    if (this.id) {
      this.fetch();
    }
  },
};
</script>