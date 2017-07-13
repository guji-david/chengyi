<template name="fade">
  <div @click="selectHide()">
    <cyHeader :showCategory="false" :showSearch="false"></cyHeader>
    <div class="home_body">
      <div class="home_main">
        <div class="home_logo">

          <div class="logo_text">
            <span class="logo_text">全 网 掌 控 &nbsp;&nbsp;把 握 先 机</span>
          </div>
          <div class="home_search">
            <div class="home_center">
              <div class="home_list">
                  <router-link v-for="el in navList" class="button" :to="el.path">
                    <span v-text="el.categoryName"></span>
                  </router-link>
              </div>
              <!-- <span class="clearfix"></span>-->
              <div class="home_input" @click.stop="selectShow()">

                <div class="home_search_input_bg">
                  <img src="~assets/img/search.png" alt="诚壹财富，壹财富">
                  <input type="text" placeholder="公司/ 投资方向/ 产品名称" id="home_query"
                         @click="refreshSug()"
                         @keyup="refreshSug()"
                         @keypress.enter="search()"
                         v-model="query"
                  />
                  <button @click="search()">搜索</button>
                  <div class="select-group" v-show="showSearchSug()">
                    <div id="selectModel" class="selectModel">
                      <div class="item-hot" v-show="!hasQuery">热门推荐</div>
                      <router-link @hover="searchFocus()" class="item" value="1" v-for="el in engines" :to='"/detail/" + el.platform+"_"+el.productId' v-html="el.sug">
                      </router-link>
                    </div>
                  </div>
                </div>

                <div class="home_seatch_hot">
                  <ul>
                    <li v-for="el in hotSearchList" v-text="el" @click="goSearch(el)"></li>
                  </ul>
                </div>

              </div>

              <div class="home_detail">
                <ul>
                  <li v-for="el in detaiList">
                    <router-link :to='"/detail/" + el.platform+"_"+el.productId' class="item_title" target="_blank">
                      <span v-text="el.productName" style="color: #fff"></span>
                    </router-link>
                  </li>

                </ul>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
    <div class="home_advance">
      <div class="container">
        <div class="adv_item">
          <div class="item_img"><img width='70px;' src="~assets/img/advance_1.jpg"
                                     alt="诚壹财富，壹财富"/></div>
          <div class="item_content">
            <h4>海量产品</h4>
            <span class="item_span">涵盖全品类千余款金融产品</span>
          </div>
          <span class="clearfix"></span>
        </div>
        <div class=" adv_item">
          <div class="item_img"><img width='70px;' src="~assets/img/advance_2.jpg"
                                     alt="诚壹财富，壹财富"/></div>
          <div class="item_content">
            <h4>安全私密</h4>
            <span class="item_span">单点登录机制，银行级安全防护</span>
          </div>
          <span class="clearfix"></span>
        </div>
        <div class=" adv_item">
          <div class="item_img"><img width='70px;' src="~assets/img/advance_3.jpg"
                                     alt="诚壹财富，壹财富"/></div>
          <div class="item_content">
            <h4>透明高效</h4>
            <span class="item_span">佣金透明，24小时极速提现</span>
          </div>
          <span class="clearfix"></span>
        </div>
        <div class=" adv_item">
          <div class="item_img"><img width='70px;' src="~assets/img/advance_4.jpg"
                                     alt="诚壹财富，壹财富"/></div>
          <div class="item_content">
            <h4>贴心服务</h4>
            <span class="item_span">定制化贴心服务，线上线下灵活沟通</span>
          </div>
          <span class="clearfix"></span>
        </div>
      </div>


    </div>
    <div class="home_banner">
      <div class="container ">
        <div style="position: relative">
          <img src="~assets/img/home_banner.jpg" alt="诚壹财富，壹财富">
          <div class="banner_down">
            <img class="banner_app" src="~assets/img/banner_app.jpg" alt="诚壹财富，壹财富">
            <div class="banner_text">手机扫码下载</div>
          </div>
        </div>

      </div>

    </div>
    <div class="home_parnter">
      <div class="container ">
        <div class="parnter_head">
          <span>／</span> 合作伙伴 <span>／</span>
        </div>
        <div class="parnter_row">
          <div class="parnter_item">
            <img class="parnter_img" src="~assets/img/partner/parnter_1.jpg" alt="诚壹财富，壹财富"/>
          </div>
          <div class="parnter_item">
            <img class="parnter_img" src="~assets/img/partner/parnter_2.jpg" alt="诚壹财富，壹财富"/>
          </div>
          <div class="parnter_item">
            <img class="parnter_img" src="~assets/img/partner/parnter_13.jpg" alt="诚壹财富，壹财富"/>
          </div>
          <div class="parnter_item">
            <img class="parnter_img" src="~assets/img/partner/parnter_11.jpg" alt="诚壹财富，壹财富"/>
          </div>
        </div>
        <div class="parnter_row">
          <div class="parnter_item">
            <img class="parnter_img" src="~assets/img/partner/parnter_15.jpg" alt="诚壹财富，壹财富"/>
          </div>
          <div class="parnter_item">
            <img class="parnter_img" src="~assets/img/partner/parnter_6.jpg" alt="诚壹财富，壹财富"/>
          </div>
          <div class="parnter_item">
            <img class="parnter_img" src="~assets/img/partner/parnter_7.jpg" alt="诚壹财富，壹财富"/>
          </div>
          <div class="parnter_item">
            <img class="parnter_img" src="~assets/img/partner/parnter_8.jpg" alt="诚壹财富，壹财富"/>
          </div>
        </div>
      </div>
    </div>
    <cyfooter></cyfooter>
    <sidebar :showCompare="false"></sidebar>
  </div>
</template>

<script>
    import * as API from '../store/api/api.js'
    import cyfooter from '~components/headandfoot/CyFooter.vue'
    import cyHeader from '~components/headandfoot/CyHeader.vue'
    import sidebar from '~components/sidebar/sidebar.vue'

    export default {
        name: 'Home',
        data() { //属性

            return {
                hasQuery: false, // 是否存在搜索词
                query: "",
                engines: [],
                selectVisable: false,
                navList: [//列表导航
                    {categoryId: 1, path: "/1/product", categoryName: "信托"},
                    {categoryId: 2, path: "/2/product", categoryName: "资管"},
                    {categoryId: 4, path: "/4/product", categoryName: "证券"},
                    {categoryId: 16, path: "/16/product", categoryName: "股权"},
                    {categoryId: 128, path: "/128/product", categoryName: "海外"},
                ],
                detaiList: [//热点产品列表
                    {platform: 0, productId: 850, productName: "鑫瑞1号"},
                    {platform: 0, productId: 1306, productName: "唐昇1号"},
                    {platform: 0, productId: 276, productName: "植瑞投资-长青系列"},
                ],
                hotSearchList: ["中融", "新时代", "中江"],//热点搜索词列表
            }
        },
        /**
         * 初始化工作
         */
        mounted() {

        },
        /**
         *  方法
         */
        methods: {
            /**
             * 获取搜索词
             */
            getQuery: function () {
                return this.query.trim();
            },

            /**
             *  获取搜索建议词
             */
            refreshSug: function() {
                var query = this.getQuery();
                this.hasQuery = !!query;
                this.selectVisable = true;
                API.$getSearchSug(query, res => {
                    if(res.head.ret == 0) {
                        if(this.hasQuery && !!res.body.list) {
                            for(var i = 0; i < res.body.list.length; i++) {
                                res.body.list[i].sug = res.body.list[i].sug.replace(query, '<b style="color:#333;font-size: 16px;">' + query + '</b>');
                            }
                        }
                        this.engines = res.body.list;
                        this.size = res.body.totalCount;
                    }
                });
            },

            searchFocus: function () {
                this.selectVisable = true;
            },
            selectHide: function () {
                if (this.selectVisable) {
                    this.selectVisable = false;
                }
            },
            selectShow: function () {
                this.selectVisable = true;
            },

            /**
             * 搜索
             */
            search: function () {
                var query = this.getQuery();
                if (!query) {
                    return;
                }

                this.$router.push({path: '/search/'+query});
            },
            goSearch: function (serach) {
                this.query = serach;
                this.search();
            },
            showSearchSug: function () {
                return (this.selectVisable && (this.engines.length > 0));
            }
        },
        components: {
            cyfooter,
            cyHeader,
            sidebar
        }
    }
</script>

<style lang="stylus">
  @import '~assets/css/index.css'
</style>