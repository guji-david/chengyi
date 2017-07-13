<template>
	<div class="common_head">
		<div class="container" v-if="showCategory || showSearch">
			<div class="row">
				<div class="col-md-2">
					<img class="head_logo" @click="goIndex()" src="../../assets/img/logo.png" alt="诚壹财富，壹财富">
				</div>
				<div class="col-md-8">
					<div class="head_nav">

						<router-link v-show="showCategory" v-for="el in navList" :to="el.path">
							<span :class="headcategoryId ==el.categoryId?'active':''" class="nav_item"
								  v-text="el.categoryName"></span>
						</router-link>

						<div v-show="showSearch" class="head_down">
							<div class="head_search">
								<input type="text" placeholder="公司/投资方向/产品名称"
									   @click="refreshSug()"
									   @keyup="refreshSug()"
									   @blur="selectHide()"
									   @keyup.enter="head_search()"
									   @keypress.enter="input_keypress()"
									   v-model="decodeQuery"/>
								<img src="../../assets/img/search.png" @click="head_search()" alt="诚壹财富，壹财富">

								<div class="select-group" v-show="showSearchSug()">
									<ul class="selectModel">
										<li class="item-hot" v-show="!hasQuery">热门推荐</li>
										<li @hover="searchFocus()" class="item" value="1" v-for="el in engines">
											<a :href='"/detail/" + el.platform+"_"+el.productId'
											   class="item_title" target="_blank">
												<div v-html="el.sug"></div>
											</a>
										</li>
									</ul>
								</div>
							</div>
						</div>

					</div>
				</div>

				<div class="col-md-2">
					<div class="head_right">
						<div v-show="showLogin" class="head_opr">

							<div v-show="!isLogin">
								<router-link :to="{name:'login'}">
									<span class="head_btn">登录</span>
								</router-link>
								<span style="margin-left: 10px;">|</span>
								<router-link :to="{name:'reg'}">
									<span class="head_btn">注册</span>
								</router-link>
							</div>
							<div v-show="isLogin">
								<span class="head_btn" v-if="!!userName">{{userName}}</span>
								<span class="head_btn" v-else="!userName">{{getCurentTel}}</span>
								<span style="margin-left: 10px;">|</span>
								<span class="head_btn" @click="exit()">退出</span>
							</div>
						</div>
					</div>
				</div>

			</div>
		</div>

		<div class="home_head" v-else="!(showCategory || showSearch)">
			<div class="container">
				<nuxt-link :to="{name:'index'}"><img class="head_logo" src="../../assets/img/logo.png" alt="诚壹财富，壹财富">
				</nuxt-link>

				<div class="head_right">
					<div class="head_opr" v-if="showLogin">

						<div v-show="!isLogin">
							<nuxt-link :to="{name:'login'}">
								<span class="head_btn">登录</span>
							</nuxt-link>
							<span style="margin-left: 10px;">|</span>
							<nuxt-link :to="{name:'reg'}">
								<span class="head_btn">注册</span>
							</nuxt-link>
						</div>
						<div v-show="isLogin">
							<span class="head_btn" v-if="!!userName">{{userName}}</span>
							<span class="head_btn" v-else="!userName">{{getCurentTel}}</span>
							<span style="margin-left: 10px;">|</span>
							<span class="head_btn" @click="exit()">退出</span>
						</div>
					</div>
					<div class="head_tel">

						<div class="head_img">
							<img src="../../assets/img/home_tel.jpg" alt="诚壹财富，壹财富">
						</div>
						<div class="head_content">
							<div style="color: #ff9959">4006-222-500</div>
							<div style="color: #aaa">咨询电话</div>
						</div>

					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<style lang="stylus">
	@import './CyHeader.css';
</style>

<script>
	import { mapGetters, mapActions } from 'vuex'
	import * as API from '../../store/api/api.js'
	import {hex_md5} from '~assets/js/md5.js'
	import store from '../../store/index.js'
	import localStore from '../../common/store.min.js';

	export default {
		name: 'header',
		props: {
			showLogin: {
				type: Boolean,
				default: true
			},
			showSearch: {
				type: Boolean,
				default: true
			},
			showCategory: {
				type: Boolean,
				default: true
			},
			showContactUs: {
				type: Boolean,
				default: true
			}
		},
		data() { //属性
			return {
				search: "",
				decodeQuery:"",
				selectVisable: false,
				engines: [],
				hasQuery: false, // 是否存在搜索词
				navList:[
					{categoryId:8196, path:"/", categoryName:"首页"},
					{categoryId:1, path:"/1/product", categoryName:"集合信托"},
					{categoryId:2, path:"/2/product", categoryName:"资管计划"},
					{categoryId:4, path:"/4/product", categoryName:"证券基金"},
					{categoryId:16, path:"/16/product", categoryName:"股权基金"},
					{categoryId:128, path:"/128/product", categoryName:"海外投资"},
				]
			}
		},
		mounted(){
			if(!!this.$route.params.categoryid) {
				this.updateState(this.$route.params.categoryid);
			}
		},
		watch:{
			// 如果路由有变化，会再次执行该方法
			'$route.params' (to, from) {
				if(!!to.categoryid) {
					this.updateState(to.categoryid);
				}
			}
		},
		methods: {
			/***
			 * 更新state
			 */
			updateState:function(categoryid){
				// 产品列表更换，更新state
				this.$store.dispatch("SET_CATEGORY_ID",{data:Number(categoryid)});
			},
			/***
			 * 退出登录
			 */
			exit:function () {
				this.$store.dispatch("EXIT_LOGIN","");
			},
			setHeadQuery: function(query) {
				this.decodeQuery = query;
			},

			searchFocus: function() {
				this.selectVisable = true;
			},

			/**
			 * 判斷按下的是“回車”執行搜索
			 */
			input_keypress: function() {
				var e = window.event || arguments.callee.caller.arguments[0];
				if(e && e.keyCode == 13) {
					this.head_search();
					this.selectVisable = false;
				}
			},

			head_search: function() {
				var query = this.decodeQuery;
				if(!query) {
					return;
				}
				this.$router.push({ path: '/search/'+ query  });
			},

			/**
			 * 获取搜索词
			 */
			getQuery: function() {
				var query = this.decodeQuery;
				return this.decodeQuery.trim();

			},
			/*搜索框失焦事件*/
			selectHide: function() {
				var _this=this;
				setTimeout(function () {
					_this.isHide();
				},200);

			},
			/*隐藏搜索框*/
			isHide:function () {
				this.selectVisable = false;
			},
			/*显示搜索框*/
			isShow: function() {
				this.selectVisable = true;
			},
			/**
			 *  获取搜索建议词
			 */
			refreshSug: function() {
				this.selectVisable = true;
				var query = this.getQuery();
				this.hasQuery = !!query;
				API.$getSearchSug(query, res=> {
					if(res.head.ret == 0) {
					console.log(res);
					if(this.hasQuery && !!res.body.list) {
						for(var i = 0; i < res.body.list.length; i++) {
							res.body.list[i].sug = res.body.list[i].sug.replace(query, '<b style="color:#333">' + query + '</b>');
						}
					}
					this.engines = res.body.list;
				} else {
                    this.$alert(res.head.msg,'提示',{confirmButton:'确定'});
				}
			});

			},

			showSearchSug: function() {
				return (this.selectVisable && (this.engines.length > 0));
			},

			/*跳转到首页*/
			goIndex:function () {
				this.$router.push({ name: 'index'});
			},

			init: function() {
				if(!!this.$route.params.query){
					this.decodeQuery=decodeURI(this.$route.params.query);
				}
			}
		},
		computed:mapGetters({
			isLogin: 'isLogin',
			userName:"getUserName",
			getCurentTel:"getCurentTel",
			headcategoryId:"getActiveCategoryId"
		}),

	}

</script>