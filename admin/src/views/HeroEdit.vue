<template>
  <div>
    <h1>{{ id ? "编辑" : "新建" }}英雄</h1>
    <el-form label-width="120px" @submit.native.prevent="save"><!--阻止默认提交-->

      <el-tabs type="border-card" value="basic">
        <!-- 基础信息分页-始 -->
        <el-tab-pane label="基础信息" name="basic">

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

          <el-form-item label="背景图">
          <el-upload
            class="avatar-uploader"
            :action="$http.defaults.baseURL + '/upload'"
            :headers="getAuthHeaders()"
            :show-file-list="false"
            :on-success="afterUploadBanner"
          ><!--action为图片上传地址-->
            <img v-if="model.banner" :src="model.banner" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          </el-form-item>

          <el-form-item label="名称" style="width: 300px">
            <el-input v-model="model.name"></el-input>
          </el-form-item>

          <el-form-item label="称号" style="width: 300px">
            <el-input v-model="model.title"></el-input>
          </el-form-item>

          <el-form-item label="类型">
            <el-select v-model="model.categories" multiple>
              <el-option v-for="item of categories" :key="item._id" :label='item.name' :value='item._id'></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="伤害">
            <el-rate style="margin-top: 0.7rem" show-score v-model="model.scores.harm"></el-rate><!--:max="9"-->
          </el-form-item>
          <el-form-item label="强韧">
            <el-rate style="margin-top: 0.7rem" show-score v-model="model.scores.defense"></el-rate><!--:max="9"-->
          </el-form-item>
          <el-form-item label="控制">
            <el-rate style="margin-top: 0.7rem" show-score v-model="model.scores.control"></el-rate><!--:max="9"-->
          </el-form-item>
          <el-form-item label="机动">
            <el-rate style="margin-top: 0.7rem" show-score v-model="model.scores.motility"></el-rate><!--:max="9"-->
          </el-form-item>
          <el-form-item label="功能">
            <el-rate style="margin-top: 0.7rem" show-score v-model="model.scores.function"></el-rate><!--:max="9"-->
          </el-form-item>

          <el-form-item label="推荐出装1">
            <el-select v-model="model.items1" multiple>
              <el-option v-for="item of items" :key="item._id" :label='item.name' :value='item._id'></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="推荐出装2">
            <el-select v-model="model.items2" multiple>
              <el-option v-for="item of items" :key="item._id" :label='item.name' :value='item._id'></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="语录">
            <el-input type="textarea" style="width: 50%" v-model="model.motto"></el-input>
          </el-form-item>

          <el-form-item label="简介">
            <el-input type="textarea" style="width: 50%" v-model="model.introduction"></el-input>
          </el-form-item>

        </el-tab-pane>
        <!-- 基础信息分页-末 -->

        <!-- 技能信息分页-始 -->
        <el-tab-pane label="技能" name="skill">
          <el-button type="text" @click="model.skills.push({})" style="margin-bottom: 2rem"><i class="el-icon-plus"></i>添加技能</el-button>
          <el-row type="flex" style="flex-wrap: wrap">
            <el-col :md="12" v-for="(item, i) in model.skills" :key="i"><!--:md12表示在中等屏幕上一行显示两个-->

              <el-form-item label="名称" style="width: 48%">
                <el-input v-model="item.name"></el-input>
              </el-form-item>

              <el-form-item label="图标">
                <el-upload
                  class="avatar-uploader"
                  :action="$http.defaults.baseURL + '/upload'"
                  :headers="getAuthHeaders()"
                  :show-file-list="false"
                  :on-success="res=>$set(item, 'icon', res.url)"
                ><!--显式赋值 避免出现不会及时响应的问题-->
                  <img v-if="item.icon" :src="item.icon" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>

              </el-form-item>
              <el-form-item label="描述">
                <el-input v-model="item.description" type="textarea"></el-input>
              </el-form-item>

              <el-form-item>
                <el-button type="danger" @click="model.skills.splice(i, 1)">删除</el-button>
              </el-form-item>

            </el-col>
          </el-row>
        </el-tab-pane>
        <!-- 技能信息分页-末 -->

      </el-tabs>

      <el-form-item style="margin: 2rem 10rem 5rem -7rem">
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    id: {}, //在router/index中将url参数中的id注入该组件 并在组件中用props接收使用
  },
  data() {
    return {
      categories: [],
      items: [],
      model: {
        name: '',
        avatar: '',
        banner: '',
        scores: {
          harm: 0,
          defense: 0,
          control: 0,
          motility: 0,
          function: 0
        },
        skills: []
      },
    };
  },
  methods: {
    afterUpload(res) {
      this.model.avatar = res.url
    },
    afterUploadBanner(res) {
      this.model.banner = res.url
    },
    async save() {
      if (this.id) {
        await this.$http.put(`rest/heroes/${this.id}`, this.model);
      } else {
        await this.$http.post("rest/heroes", this.model);
      }
      this.$router.push("/heroes/list"); //发送post请求后跳转页面
      this.$message({
        //element自带 提示保存成功
        type: "success",
        message: "保存成功",
      });
    },
    async fetch() {
      const res = await this.$http.get(`rest/heroes/${this.id}`);
      //this.model = res.data;//如果使用等号赋值就会导致获取到的数据会完整替换掉model 导致model原有的内容不存在 指scores
      this.model = Object.assign({}, this.model, res.data)
    },
    async fetchCategories() {
      const res = await this.$http.get('rest/categories');
      this.categories = res.data;
    },
    async fetchItems() {
      const res = await this.$http.get('rest/items');
      this.items = res.data;
    },
  },
  created() {
    this.fetchItems()
    this.fetchCategories()
    if (this.id) {
      this.fetch();
    }
  },
};
</script>