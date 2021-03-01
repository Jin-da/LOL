<template>
  <div v-if="model">
    <van-nav-bar
      title="英雄详情"
      left-arrow
      @click-left="onClickLeft"
      class="navbar"
      fixed
    >
    </van-nav-bar>

    <!-- 顶部 -->
    <div class="top" :style="{'background-image': `url(${model.banner})`}">
          <div class="info text-white  p-3 d-flex flex-column jc-end">
            <div class="herotitle">{{model.title}}</div>
            <div class="my-2 heroname">{{model.name}}</div>
            <span class="herocategories">{{model.categories.map(v => v.name).join('/')}}</span><!--用map遍历数组元素 返回出各元素的name 用join进行分割-->
          </div>
    </div>

    <!-- 技能 -->
    <van-tabs animated color="black" line-width="2rem" mb-2 swipeable sticky :offset-top="46">
      <van-tab title="基础信息">
        <van-divider/>
        <div class="d-flex jc-around skill">
          <img :src="item.icon" v-for="(item, i) in model.skills" :key="item.name" class="skillicon" :class="{active: currentSkillIndex === i}" @click="currentSkillIndex = i">
        </div>

        <div v-if="currentSkill" class="skillDetail">
          <h3>{{currentSkill.name}}</h3>
          <p>{{currentSkill.description}}</p>
        </div>

        <div class="other">
          <h3>英雄背景</h3>
          <p class="introduction">{{model.introduction}}</p>
          <div class="motto">{{model.motto}}</div>
        </div>
      </van-tab>

      <van-tab title="进阶攻略">
        <van-divider/>
        <div class="itemsAll">
          <h3>推荐出装</h3>
        </div>
        <div class="items">
            <div v-for="item in model.items1" :key="item.name">
              <img class="itemsImg" :src="item.icon">
              <div>{{item.name}}}</div>
            </div>
        </div>

        <div class="itemsAll">
          <h3>推荐出装2</h3>
        </div>
        <div class="items">
            <div v-for="item in model.items2" :key="item.name">
              <img class="itemsImg" :src="item.icon">
              <div>{{item.name}}}</div>
            </div>
        </div>
      </van-tab>
    </van-tabs>

  </div>
</template>

<script>
import Vue from 'vue';
import { Divider } from 'vant';

Vue.use(Divider);
export default {
  props: {
    id: { require: true },
  },
  data() {
    return {
      model: null,
      currentSkillIndex: 0
    }
  },
  computed: {
    currentSkill() {
      return this.model.skills[this.currentSkillIndex]
    }
  },
  methods: {
    onClickLeft() {
      this.$router.push("/");
    },
    async fetch() {
      const res = await this.$http.get(`heroes/${this.id}`)
      this.model = res.data
    }
  },
  created() {
    this.fetch()
  },
};
</script>

<style lang="scss">
  .info {
    background: linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.7));
    height: 100%;
  }
  .top {
    margin-top: 46px;
    height: 50vw;
    background: #fff no-repeat top right;
    background-size: auto 100%;/*宽高*/
  }
  .herotitle {
    font-size: 1.5rem;
    line-height: 1.5rem;
  }
  .heroname {
    font-size: 1.2rem;
    line-height: 1.5rem;
  }
  .herocategories {
    padding: 0.1rem 0;
    font-size: 1rem;
    line-height: 1rem;
    color: #deb762;
    display: inline-block;
  }
  .skillicon {
    margin: 1rem 0 0 0;
    border-radius: 50%;
    width: 15%;
    border: solid 2px  white;
  }
  .skill {
    margin: 0 2%;
  }
  .active {
    border: solid 2px  #deb762;
  }
  .skillDetail {
    margin: 1rem 1.5rem;
    p {
      line-height: 1.5rem;
    }
  }
  .other {
    margin: 1rem 1.5rem;
  }
  .introduction {
    line-height: 1.5rem;
    margin-bottom: 5rem;
  }
  .motto {
    font-size: 1.5rem;
    text-align: center;
    margin-bottom: 5rem;
  }
  .itemsImg {
    width: 60%;
    height: 60%;
    border-radius: 50%;
  }
  .items {
    display: flex;
    justify-content: space-around;
    text-align: center;
  }
    .itemsAll {
    margin: 1rem 1.5rem;
  }
</style>