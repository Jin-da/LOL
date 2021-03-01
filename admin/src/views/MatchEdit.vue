<template>
  <div>
    <h1>{{ id ? "编辑" : "新建" }}赛事</h1>
    <el-form label-width="120px" @submit.native.prevent="save"><!--阻止默认提交-->

      <el-tabs type="border-card" value="basic">
        <!-- 基础信息分页-始 -->
        <el-tab-pane label="基础信息" name="basic">

          <el-form-item label="所属分类">
            <el-select v-model="model.category" multiple>
              <el-option v-for="item in categories" :key="item._id" :label="item.name" :value="item._id"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="赛事名称" style="width: 300px">
            <el-input v-model="model.name"></el-input>
          </el-form-item>

          <el-form-item label="赛事时间" style="width: 300px">
            <el-input v-model="model.time"></el-input>
          </el-form-item>

        </el-tab-pane>
        <!-- 基础信息分页-末 -->

        <!-- 单次比赛分页-始 -->
        <el-tab-pane label="单场赛事">
          <el-button type="text" @click="model.matches.push({})" style="margin-bottom: 2rem"><i class="el-icon-plus"></i>添加赛事</el-button>
          <el-row type="flex" style="flex-wrap: wrap">
            <el-col :md="12" v-for="(item, i) in model.matches" :key="i"><!--:md12表示在中等屏幕上一行显示两个-->

              <el-form-item label="左侧战队" style="width: 48%">
                <el-input v-model="item.name1"></el-input>
              </el-form-item>

              <el-form-item label="左侧战队图标">
                <el-upload
                  class="avatar-uploader"
                  :action="$http.defaults.baseURL + '/upload'"
                  :headers="getAuthHeaders()"
                  :show-file-list="false"
                  :on-success="res=>$set(item, 'icon1', res.url)"
                ><!--显式赋值 避免出现不会及时响应的问题-->
                  <img v-if="item.icon1" :src="item.icon1" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>

              <el-form-item label="右侧战队" style="width: 48%">
                <el-input v-model="item.name2"></el-input>
              </el-form-item>

              <el-form-item label="右侧战队图标">
                <el-upload
                  class="avatar-uploader"
                  :action="$http.defaults.baseURL + '/upload'"
                  :headers="getAuthHeaders()"
                  :show-file-list="false"
                  :on-success="res=>$set(item, 'icon2', res.url)"
                ><!--显式赋值 避免出现不会及时响应的问题-->
                  <img v-if="item.icon2" :src="item.icon2" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>

              <el-form-item label="时间">
                <el-input v-model="item.time" style="width: 48%"></el-input>
              </el-form-item>

              <el-form-item label="比分">
                <el-input v-model="item.score" style="width: 48%"></el-input>
              </el-form-item>

              <el-form-item>
                <el-button type="danger" @click="model.matches.splice(i, 1)">删除</el-button>
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
      categories: '',
      model: {
        name: '',
        time: '',
        matches: []
      },
    };
  },
  methods: {
    async save() {
      if (this.id) {
        await this.$http.put(`rest/matches/${this.id}`, this.model);
      } else {
        await this.$http.post("rest/matches", this.model);
      }
      this.$router.push("/matches/list"); //发送post请求后跳转页面
      this.$message({
        //element自带 提示保存成功
        type: "success",
        message: "保存成功",
      });
    },
    async fetch() {
      const res = await this.$http.get(`rest/matches/${this.id}`);
      //this.model = res.data;//如果使用等号赋值就会导致获取到的数据会完整替换掉model 导致model原有的内容不存在 指scores
      this.model = Object.assign({}, this.model, res.data)
    },
    async fetchCategories() {
      const res = await this.$http.get('rest/categories');
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