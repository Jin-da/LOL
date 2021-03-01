<template>
  <div v-if="model"><!--v-if="model"表示当有model时才渲染用到mdoel的地方 一开始model=null 使用时找不到model中的值就会报错-->
    <van-nav-bar
      title="资讯详情"
      left-arrow
      @click-left="onClickLeft"
      @click-right="showShare = true"
      fixed
    >
      <template #right>
        <van-icon name="ellipsis" size="18" />
      </template>
    </van-nav-bar>
    <van-share-sheet
      v-model="showShare"
      title="立即分享给好友"
      :options="options"
      @select="onSelect"
    />
      <div class="title">{{model.title}}</div>
      <div v-html="model.body" class="detail"></div><!--使用v-html渲染-->

      <div class="like">相关推荐</div>
      <div class="like-detail">
        <router-link :to="`/articles/${item._id}`" v-for="(item, i) in model.related" :key="i">
          <van-card  :title="item.title" :thumb="item.avatar">
          </van-card>
        </router-link>
      </div>
  </div>
</template>


<script>
import { Toast } from 'vant';
export default {
  props: {
    id :{ required: true }//表示必填 需要在路由里添加props:true用于将path的参数传入组件
  },
  data() {
    return {
      showShare: false,
      options: [
        [
          { name: "微信", icon: "wechat" },
          { name: "朋友圈", icon: "wechat-moments" },
          { name: "微博", icon: "weibo" },
          { name: "QQ", icon: "qq" },
        ],
        [
          { name: "复制链接", icon: "link" },
          { name: "分享海报", icon: "poster" },
          { name: "二维码", icon: "qrcode" },
          { name: "小程序码", icon: "weapp-qrcode" },
        ],
      ],
      model: null
    };
  },
  watch: {
    id() {//id变化时执行fetch
      this.fetch(),
      this.scroll()
    }
  },
  methods: {
    scroll() {
      scrollTo(0,0)
    },
    onSelect(option) {
      Toast(option.name);
      this.showShare = false;
    },
    onClickLeft() {
      this.$router.push("/");
    },
    log() {
      console.log("a");
    },
    async fetch() {
      const res = await this.$http.get(`articles/${this.id}`)
      this.model = res.data
    }
  },
  created() {
    this.fetch()
  },
};
</script>

<style lang="scss">
.van-nav-bar .van-icon {
  color: black !important;
}
.title {
  font-size: 20px;
  line-height: 2.5rem;
  margin: 1rem 1.5rem;
  margin-top: 4.5rem;
}
.like {
  margin: 5rem 1rem;
  margin-bottom: 2rem;
}
.like-detail {
  margin: 0.5rem 0rem;
  margin-right: 1rem;
}
.detail {
  margin: 1rem 1rem;
  font-size: 15px;
  line-height: 2rem;
  img {
    max-width: 100%;
    height: auto;
  }
  iframe {
    width: 100%;
    height: auto;
  }
}
</style>