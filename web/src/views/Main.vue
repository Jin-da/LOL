<template>
  <div>
    <!-- 顶部 -->
    <van-search
      class="search"
          show-action
          shape="round"
          background="white"
          style="margin-left='10px'"
          ><!--@search="onSearch"-->

            <template #left>
              <!-- 左侧图标 -->
              <van-icon name="wap-nav" color="black" size="25"/>
            </template>

            <template #action>
              <div></div>
              <!-- @click="onSearch"-->
            </template>
    </van-search>

      <!-- 导航 -->
    <van-tabs animated color="black" line-width="2rem" mb-2 swipeable sticky :offset-top="53"><!--v-model="active"-->

      <van-tab title="首页">
          <van-divider/>
          <!-- 轮播图 -->
          <div class="Mine-categories-swipe">
            <van-swipe class="my-swipe" :autoplay="2500" indicator-color="white">
              <van-swipe-item>
                <img src="../assets/be425871a991a9ac938e4e2e961b5faa.jpeg" alt="">
              </van-swipe-item>
              <van-swipe-item>
                <img src="../assets/bd3e7cc55b6cc4e80df713c7dddac6a8.jpeg" alt="">
              </van-swipe-item>
              <van-swipe-item>
                <img src="../assets/4f225dacf36c9442cf2ef9b2254b926e.jpeg" alt="">
              </van-swipe-item>
              <van-swipe-item>
                <img src="../assets/1261b19c1503c8792c1a517a1aa4ad5c.png" alt="">
              </van-swipe-item>
              <van-swipe-item>
                <img src="../assets/1261b19c1503c8792c1a517a1aa4ad5c.png" alt="">
              </van-swipe-item>
            </van-swipe>
          </div>

          <!-- 内容 -->

            <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
              <van-skeleton title :row="20" :loading="loading"><!--在数据没有获取到前占位-->
                <router-link :to="`/articles/${newsCat._id}`" v-for="(newsCat, i) in newsCatsT" :key="i">
                  <van-card  :title="newsCat.title" :thumb="newsCat.avatar">
                    <template #tags>
                      <van-tag type="primary"color="rgb(199,234,238)">{{newsCat.categoryName}}</van-tag>
                    </template>
                  </van-card>
                </router-link>
              </van-skeleton>
            </van-pull-refresh>
          
          
      </van-tab>

      <van-tab title="英雄">
          <van-divider/>
          <van-tabs animated color="black" line-width="2rem" mb-2><!--v-model="active"-->

            <van-tab title="战士">
              <div class="d-flex flex-wrap" style="margin: 0.5rem 0.8rem">
                <router-link :to="`/heroes/${hero._id}`" tag="div" class="text-center" style="width:20%;" v-for="(hero, i) in heroCatsZ" :key='i'>
                  <img :src="hero.avatar" class="avatar">
                  <div style="margin-bottom: 0.5rem">{{hero.name}}</div>
                </router-link>
              </div>
            </van-tab>

            <van-tab title="法师">
              <div class="d-flex flex-wrap" style="margin: 0.5rem 0.8rem">
                <router-link :to="`/heroes/${hero._id}`" tag="div" class="text-center" style="width:20%" v-for="(hero, i) in heroCatsF" :key='i'>
                  <img :src="hero.avatar" class="avatar">
                  <div style="margin-bottom: 0.5rem">{{hero.name}}</div>
                </router-link>
              </div>
            </van-tab>

            <van-tab title="刺客">
              <div class="d-flex flex-wrap" style="margin: 0.5rem 0.8rem">
                <router-link :to="`/heroes/${hero._id}`" tag="div" class="text-center" style="width:20%" v-for="(hero, i) in heroCatsC" :key='i'>
                  <img :src="hero.avatar" class="avatar">
                  <div style="margin-bottom: 0.5rem">{{hero.name}}</div>
                </router-link>
              </div>
            </van-tab>

            <van-tab title="坦克">
              <div class="d-flex flex-wrap" style="margin: 0.5rem 0.8rem">
                <router-link :to="`/heroes/${hero._id}`" tag="div" class="text-center" style="width:20%" v-for="(hero, i) in heroCatsT" :key='i'>
                  <img :src="hero.avatar" class="avatar">
                  <div style="margin-bottom: 0.5rem">{{hero.name}}</div>
                </router-link>
              </div>
            </van-tab>

            <van-tab title="射手">
              <div class="d-flex flex-wrap" style="margin: 0.5rem 0.8rem">
                <router-link :to="`/heroes/${hero._id}`" tag="div" class="text-center" style="width:20%" v-for="(hero, i) in heroCatsS" :key='i'>
                  <img :src="hero.avatar" class="avatar">
                  <div style="margin-bottom: 0.5rem">{{hero.name}}</div>
                </router-link>
              </div>
            </van-tab>

            <van-tab title="辅助">
              <div class="d-flex flex-wrap" style="margin: 0.5rem 0.8rem">
                <router-link :to="`/heroes/${hero._id}`" tag="div" class="text-center" style="width:20%" v-for="(hero, i) in heroCatsFZ" :key='i'>
                  <img :src="hero.avatar" class="avatar">
                  <div style="margin-bottom: 0.5rem">{{hero.name}}</div>
                </router-link>
              </div>
            </van-tab>

          </van-tabs>
      </van-tab>

      <van-tab title="手游">
        <van-divider/>
        <van-skeleton title :row="3" :loading="loading">
           <van-pull-refresh v-model="isLoadingM" @refresh="onRefreshM">
            <router-link :to="`/articles/${newsCat._id}`" v-for="(newsCat, i) in newsCatsS" :key="i">
              <van-card  :title="newsCat.title" :thumb="newsCat.avatar">
                <template #tags>
                  <van-tag type="primary"color="rgb(199,234,238)">{{newsCat.categoryName}}</van-tag>
                </template>
              </van-card>
            </router-link>
          </van-pull-refresh>
        </van-skeleton>
         
      </van-tab>
        
      <!-- <van-tab title="云顶">
        <van-divider/>
          <p>内容</p>
          <p>内容</p>
          <p>内容</p>
          <p>内容</p>
          <p>内容</p>
          <p>内容</p>
          <p>内容</p>
          <p>内容</p>
          <p>内容</p>
          <p>内容</p>
          <p>内容</p>
          <p>内容</p>
          <p>内容</p>
          <p>内容</p>
          <p>内容</p>
          <p>内容</p>
          <p>内容</p>
          <p>内容</p>
      </van-tab> -->

      <van-tab title="赛事">
        <van-divider/>
        <van-tabs animated color="black" line-width="2rem" mb-2 swipeable>

          <van-tab title="全部赛程">
            <div v-for="match in matches">
              <div>
                <div class="matchTime">{{match.time}}</div>
                <div class="matchName">{{match.name}}</div>
                <van-divider/>

                <div v-for="matches in match.matches">
                  <div class="matchBody">
                    <div class="team">
                      <img :src="matches.icon1" alt="" class="matchImg">
                      <div>{{matches.name1}}</div>
                    </div>

                    <div style="width:50%">
                      <div class="matchScore">{{matches.score}}</div>
                      <div class="matchesTime">{{matches.time}}</div>
                    </div>

                    <div class="team">
                      <img :src="matches.icon2" alt="" class="matchImg">
                      <div>{{matches.name2}}</div>
                    </div>
                    <van-divider/>
                  </div>
                  <van-divider/>
                </div>

                <van-divider/>
              </div>
            </div>
          </van-tab>

          <van-tab title="赛事资讯">
            <van-divider/>
            <van-skeleton title :row="3" :loading="loading">
              <van-pull-refresh v-model="isLoadingM" @refresh="onRefreshM">
                <router-link :to="`/articles/${newsCat._id}`" v-for="(newsCat, i) in newsCatsSS" :key="i">
                  <van-card  :title="newsCat.title" :thumb="newsCat.avatar">
                    <template #tags>
                      <van-tag type="primary"color="rgb(199,234,238)">{{newsCat.categoryName}}</van-tag>
                    </template>
                  </van-card>
                </router-link>
              </van-pull-refresh>
            </van-skeleton>
          </van-tab>
        </van-tabs>

      </van-tab>

    </van-tabs>

  </div>
</template>

<script>
import { Toast } from 'vant';
export default {
  data() {
    return {
      // 加载
      loading: true,
      isLoading: false,
      isLoadingM: false,
      // 资讯
      newsCatsT: [],//推荐新闻
      newsCatsS: [],//手游新闻
      newsCatsSS: [],//赛事新闻
      // 英雄列表
      heroCatsZ: [],//战士
      heroCatsC: [],//刺客
      heroCatsFZ: [],//辅助
      heroCatsS: [],//射手
      heroCatsT: [],//坦克
      heroCatsF: [],//法师
      // 赛事列表
      matches: []
    };
  },
  methods: {
    success() {
      this.loading = false
    },
    onRefresh() {
      setTimeout(() => {
        Toast("刷新成功");
        this.isLoading = false;
      }, 1000);
    },
    onRefreshM() {
      setTimeout(() => {
        Toast("刷新成功");
        this.isLoadingM = false;
      }, 1000);
    },
    async fetchNewsCats() {
      const res = await this.$http.get('news/list')
      res.data.forEach(a => {
        if(a.name ==='推荐') {
          this.newsCatsT = a.newsList
        } else if (a.name === '手游') {
          this.newsCatsS = a.newsList
        } else if (a.name === '赛事') {
          this.newsCatsSS = a.newsList
        }
      })
    },
    async fetchHeroCats() {
      const res = await this.$http.get('heroes/list')
      res.data.forEach(a => {
        if(a.name ==='战士') {
          this.heroCatsZ = a.heroList
        } else if (a.name === '射手') {
          this.heroCatsS = a.heroList
        } else if (a.name === '坦克') {
          this.heroCatsT = a.heroList
        } else if (a.name === '刺客') {
          this.heroCatsC = a.heroList
        } else if (a.name === '辅助') {
          this.heroCatsFZ = a.heroList
        } else if (a.name === '法师') {
          this.heroCatsF = a.heroList
        }
      })
    },
    async fetchMatches() {
      const res = await this.$http.get('matches/list')
      this.matches = res.data[0].matchList
    },
  },
  created() {
    this.fetchNewsCats()
    this.fetchHeroCats()
    this.fetchMatches()
  },
  watch: {
    newsCatsT: function() {
      this.$nextTick(this.success())
    }
  },
};
</script>

<style>
.search {
  position: sticky;
  top: 0;
  z-index: 999;
}

.van-search__action {
  margin-left:10rem !important;
}
.van-search__content {
  margin-left: 1rem;
}
.van-search__action {
  margin-left: 1rem;
  margin-right: 1rem;
}
/* 轮播图 */
.Mine-categories-swipe img{
    display: inline-block;
    width: 100%;
    height: 100%;
}
.my-swipe .van-swipe-item {
    width: 100%;
    height: 100%;
    background-color: white;
}
/* 轮播图-指示器 */
.van-swipe__indicator {
  width: 8px !important;
  height: 1px !important;
  border-radius: 0% !important;
}
/* 导航-底部线 */
.van-tabs__line {
  margin-bottom: 2px;
  height: 2px !important;
  width: 1.2rem !important;
}
/* 卡片 */
.van-card {
  background-color: white!important;
  padding: 0 0 !important;
  margin-top: 0.5rem;
}
.van-card:not(:first-child) {
  margin-bottom: 16px;
}
.van-card__title {
  margin-right: 1rem;
  margin-left: 1rem;
  font-size: 1rem;
  max-height: 500px !important;
  line-height: 23px !important;
}
.van-card__desc {
  font-size: 0.8rem;
}
/* 标签 */
.van-tag {
  margin-top: 0.1rem;
  color: rgb(109, 186, 195) !important;
  font-size: 0.6rem !important;
  position: absolute !important;
  top: 4.5rem
}
.van-tag--primary {
  margin-left: 1rem !important;
}
/* 卡片图片边框 */
.van-card__thumb img {
  border-radius: 0px !important;
}
.van-divider {
  margin: 0 !important;
  padding: 0 !important;
}
/* 卡片图片 */
.van-card__thumb {
  width: 140px !important;
  margin-right: 0px !important;
  order: 5;
  height: 75px !important;
}
.van-card__content {
  order: 1;
}
.van-image__img {
  object-fit:fill !important;
}
.avatar {
  width: 75%;
  margin: 0.2rem 0;
  /* border: 1px solid #deb762; */
}
.Mine-categories-swipe {
  margin-bottom: 0.5rem;
}
/* 赛程 */
.matchTime {
  color: gray;
  font-size: 12px;
  padding: 0.3rem 0;
  background-color: rgb(240, 243, 248);
  text-align: center;
}
.matchName {
  font-size: 12px;
  padding: 0.5rem 2rem;
}
.matchImg {
  width: 40%;
}
.matchBody {
  margin:  2rem 1rem;
  display: flex;
  justify-content: center;
}
.matchScore {
  font-size: 1.7rem;
  text-align: center;
  margin: 0.5rem 0;
  font-weight: bold;
}
.matchesTime {
  font-size: 5px;
  color: gray;
  text-align: center;
}
.team {
  font-size: 0.8rem;
  text-align: center;
}
</style>