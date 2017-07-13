<template>
	<div id="prod">
		<cyheader ></cyheader>
		<div  class="product">
			<!-- 产品列表-->
			<div class="container my_container">
				<!--导航栏-->
				<div class="my_navbar_header">
					<ul class="pro_breadcrumb">
						<li @click="goIndex()"style="cursor: pointer"> 首页 </li>
						<li v-if="queryDecode==''"><span>{{categoryName}}</span></li>
						<li v-else="queryDecode!=''" style="font-size: 1.2em">搜索 <span class="active" style="font-size: 1.2em" v-text="[queryDecode]"></span></li>
					</ul>
				</div>
				<!-- 筛选 -->
				<div class="container select" >
					<div>
						<div class="row select_item" v-if="selectedFilters.length > 0">
							<div class="col-md-1">
								<div class="item_label" style="margin-left: -2px; color: #ff9959">已选条件 :</div>
							</div>
							<div class="col-md-10">
								<div class="item_detail" v-show="categoryId>0">
									<ul>
										<li v-for="filter in selectedFilters">
											<span class="select_del" @click="deleteSelectFilter(filter)">{{filter.name}}<img style="width:15px;padding:1px" src="../../assets/img/close.png" alt="诚壹财富顾问，壹财富" ></span>
											<span class="clearfix"></span>
										</li>
										<span class="clearfix"></span>
									</ul>
								</div>

							</div>
							<div class="col-md-1">
								<!--<div style="margin-top: 20%;font-size: inherit">共 <span style="color: #ff9959;font-size: inherit" v-text="total"></span> 款产品符合要求
                                </div>-->
								<div v-show="selectedFilters.length > 0" class="clean" @click="cleanFilterLists(null)">
									清除条件
								</div>
							</div>
						</div>
						<div class="select_item" v-for="el in filterList">
							<div class="row">
								<div class="col-md-1">
									<div class="item_label">{{el.name}} :</div>
								</div>
								<div class="col-md-11">
									<div class="item_detail">
										<ul>
											<li v-for="item in el.child">
											<span  @click="toggleSelectItem(el, item)" class="default" :class="[{detail_active:item.sel!=''}]">
												<img v-if="item.sel==''" src="~assets/img/checkbox_normal.png" />
												<img v-else="item.sel!=''" src="~assets/img/chechbox_checked.png" />
												&nbsp;
												<em style="display: inline-block"v-text="item.name"></em>
											</span>
											</li>
										</ul>
									</div>
								</div>

							</div>
						</div>
						<div class="sort_item" v-show="productList.length>0">
							<div class="row">
								<div class="col-md-1">
									<span class="item_label item_sort" style="cursor:pointer" :class="[{active:sortId==0}]" @click="productSort(0)">默认排序</span>
								</div>
								<div class="col-md-8">
									<div class="item_detail">
										<ul>
											<li v-for="el in defaultSortList">
												<span v-text="el.name" class="item_sort"style="margin: 0 20px" :class="[{active:sortId==el.sortIndex}]" @click="productSort(el.sortIndex)"></span>
											</li>
										</ul>
									</div>
								</div>
								<div class="mini-pagebar col-md-3" v-if="totalpage > 1">
									<button :class="currentPage==1?'clickabled':''" @click="goPrePage()">上一页</button>
									{{currentPage}}/{{totalpage}}
									<button  :class="currentPage==totalpage?'clickabled':''" @click="goNextPage()">下一页</button>
								</div>
							</div>
						</div>
					</div>
				</div>
				<!-- 没找到产品 -->
				<div class="noselect_body" v-if="productList.length==0" v-loading.body="loading" element-loading-text="拼命加载中">
					<div class="noselect_center">
						<div class="noselect_img">
							<img src="../../assets/img/noselect.png" alt="诚壹财富顾问，壹财富" />
						</div>
						<div class="noselect_text">
							<ul>
								<li>非常抱歉，未能找到相关结果</li>
								<li>您可致电<b> 4006-222-500</b>，将由专业的渠道经理为您服务!</li>
							</ul>
						</div>
					</div>
				</div>
				<!-- 产品列表item -->
				<div v-else="productList.length>0">
					<div  v-for="item in productList" >
						<ProductItem v-bind:item="item" :categoryId="categoryId"></ProductItem>
					</div>
					<CyPagination
							class="container"
							v-show="totalCount>10"
							style="margin-top:30px;"
							@current-change="handleCurrentChange"
							:pageIndex="currentPage"
							:page-size="10"
							:total="totalCount">
					</CyPagination>
				</div>
			</div>
		</div>

		<sidebar></sidebar>
		<cyfooter ></cyfooter>
	</div>
</template>

<script>
	import { mapGetters, mapActions } from 'vuex'
	import * as API from '../../store/api/api.js'
    import * as SEO from '../../common/seoUtils.js'
	import Vue from 'vue'
	import CyPagination from '../../components/pagination/Pagination.vue'
	import ProductItem from './product_item.vue'
	import sidebar from '../../components/sidebar/sidebar.vue'
	import cyheader from '../../components/headandfoot/CyHeader.vue'
	import cyfooter from '../../components/headandfoot/CyFooter.vue'

	/** 默认的排序项 */
	var DEFAULT_SORT_LIST = [{
		name: "返佣从高到低",
		sortIndex: 1
	}, {
		name: "收益从高到低",
		sortIndex: 2
	}, {
		name: "期限从短到长",
		sortIndex: 3
	}];

	const vm = Vue.component('product',{
		computed:mapGetters({
			isLogin: 'isLogin',
			filterList: "categoryFilterList", // 筛选列表
			sortList: "categorySortList", // 排序列表
			categoryName: "categoryName", //产品类别名称
		}),
		components: {
			cyheader,
			cyfooter,
			sidebar,
			CyPagination,
			ProductItem
		},
		data (context) { //属性
			var dataProperty = {
				categoryId: 1,
				seoHeader:{},
				orderVisible:false,
				start: 0,
				pageSize: 10,
				totalCount: 0, //产品总数
				currentPage: 1, // 当前浏览的页数
				totalpage: 5, //总页数
				prodNameList: [], //加入对比列表
				selectedFilters: [],
				//产品列表
				productList: [],
				noselect: true,
				sortId: 0, // 当前排序的选项
				showFilter: true,
				queryDecode: "",
				loading:false,
				// 收藏的产品列表
				defaultSortList: DEFAULT_SORT_LIST
			};

			if (!context) {
				return dataProperty;
			}

			dataProperty.seoHeader = SEO.getProductListSeoHeader(context.params.categoryid);

			return context.store.dispatch('FETCH_PRODUCT_LIST', {
				start: 0,
				pageSize: 10,
				sortId: 0,
				categoryId: context.params.categoryid,
				filterId: 0,
				query: ''
			}).then(() => {
				let activeProductList = context.store.getters.activeProductList;
				dataProperty.totalCount = activeProductList.body.totalCount;
				dataProperty.productList = activeProductList.body.list;
				return dataProperty;
			}).catch(function(error){
				console.log("失败了:"+error);
			});

		},
		head () {
			return this.seoHeader;
		},
		created(){
			if(!!this.$route.params.categoryid) {
				this.categoryId = Number(this.$route.params.categoryid);
			}
		},
		watch: {
			'$route.params' (to, from) {
				// 搜索词变化，更新搜索结果
				if(!!to.query) {
					this.queryDecode = to.query;
				}
				if(!!to.categoryid) {
					this.categoryId = Number(to.categoryid);
				}
				this.init();
			},
			// 登录状态变化，刷新列表
			'isLogin' (to, from) {
				console.log("login is change = " + to);
				this.getProductList(this.start, this.sortId, this.queryDecode);
			}
		},
		/**
		 * 初始化工作
		 */
		mounted() {
			if(!!this.$route.params.categoryid) {
				this.categoryId = Number(this.$route.params.categoryid);
			}
			if(!!this.$route.params.query) {
			    // 搜索页面来的清空分类
				this.$store.dispatch("SET_CATEGORY_ID",{data:0});
				this.queryDecode = this.$route.params.query;
			}
			this.init();
		},
		/**
		 *  方法
		 */
		methods: {
			/*跳转到首页*/
			goIndex:function () {
				this.$router.push({ name: 'index'});
			},
			/**
			 * 分页方法开始调用
			 */
			handleCurrentChange(val) {
				this.currentPage = val;
				if(this.currentPage > 0){
					this.start = (this.currentPage - 1) * this.pageSize;
					this.getProductList(this.start, this.sortId, this.queryDecode);
				}
				// 页面跳转，回头头部
				document.body.scrollTop = 0
				document.documentElement.scrollTop = 0
			},
			/**
			 * 获取产品列表
			 * @param start 开始位置
			 * @param sortId 排序的id
			 * @param categoryId 产品分类id
			 * @param query 搜索词
			 */

			getProductList: function(start, sortId, query) {
				console.log("categoryId="+this.categoryId+",start ="+start+" , sortId="+sortId+", query="+query);
				this.loading = true;
				// 拼接筛选项
				var filterId = "";
				if(this.selectedFilters.length > 0) {
					for(var i = 0; i < this.selectedFilters.length - 1; i++) {
						filterId += this.selectedFilters[i].dictId + ",";
					}
					filterId += this.selectedFilters[this.selectedFilters.length - 1].dictId;
				}
				this.$store.dispatch('FETCH_PRODUCT_LIST', {
					start: start,
					pageSize: this.pageSize,
					sortId: sortId,
					categoryId: this.categoryId,
					filterId: filterId,
					query: query
				}).then(() => {
					let res = this.$store.getters.activeProductList;
					if(res.head.ret == 0) {
						this.productList = res.body.list;
						this.totalCount = res.body.totalCount;
						if(this.totalCount != 0) {
							this.totalpage = Math.ceil(this.totalCount / this.pageSize);
							this.currentPage = start / this.pageSize + 1;
							this.noselect = true;
						} else {// 没有返回结果
							this.noselect = false;
						}
					}
					this.loading = false;
				}).catch(function(error){
						console.log("失败了:"+error);
					});
				},


			/**
			 * 获取产品列表-搜索
			 * @param start 开始位置
			 * @param sortId 排序的id
			 * @param categoryId 产品分类id
			 * @param query 搜索词
			 */
			getProductListQuery:function (start,sortId,query) {
				API.$getRichProduct(start,this.pageSize,this.sortId,"" ,"", query,res=> {
					this.productList = res.body.list;
					this.totalCount = res.body.totalCount;
					if(this.totalCount != 0) {
						this.totalpage = Math.ceil(this.totalCount / this.pageSize);
						this.currentPage = start / this.pageSize + 1;
						this.noselect = true;
					} else {// 没有返回结果
						this.noselect = false;
					}
				});
			},
			/**
			 * 初始化方法
			 */
			init: function() {
				this.getProductList(this.start, this.sortId, this.queryDecode);
			},

			/**
			 * 选中某一个排序项
			 * @param index sortIndex
			 */
			productSort: function(index) {
				this.sortId = index;
				this.getProductList(this.start, this.sortId, this.queryDecode);
			},

			/**
			 * 动态的获取已经选中的筛选项
			 */
			refreshSelectedFilterItems: function() {
				this.selectedFilters = [];
				this.filterList.forEach( filter => {
					// “全部” 这一项
					var allItem = {};
					// 是否 非“全部”选中
					var isOtherSelected = false;
					// 是否 “全部” 选中
					var isAllSelected = true;
					filter.child.forEach(childFilter => {
						if(childFilter.name == "全部") {
							allItem = childFilter;
							isAllSelected = allItem.sel;
						} else if(childFilter.name != "全部") {
							if(isAllSelected) {
								childFilter.sel = false;
							} else if(childFilter.sel == true) {
								isOtherSelected = true;
								this.selectedFilters.push(childFilter);
							}
						}
					});
					// 所有的都没有选中，则默认选中“全部”
					if(!isOtherSelected) {
						allItem.sel = true;
					}
				});

			},

			/**
			 * 删除一个已选中的筛选项
			 * @param filter 待删除的筛选项
			 */
			deleteSelectFilter: function(filter) {
				filter.sel = !filter.sel;
				this.selectedFilters.splice(filter,1);
				this.refreshSelectedFilterItems();
			},
			/**
			 * 切换一个item的选中与不选中
			 *
			 *
			 * @param parent 父节点
			 * @param item 待切换item
			 */
			toggleSelectItem: function(parent, item) {
				item.sel = !item.sel;
				if(item.name == "全部") {
					// 如果选中的是“全部”，清除其他的
					parent.child.forEach(function(childFilter) {
						if(childFilter.name == "全部") {
							childFilter.sel = true;
						} else {
							childFilter.sel = false;
						}
					});
				} else {
					// 如果选中的不是“全部” ，清除“全部”
					parent.child.forEach(function(childFilter) {
						if(childFilter.name == "全部") {
							childFilter.sel = false;
						}
					});
				}
				this.refreshSelectedFilterItems();
				this.getProductList(this.start, this.sortId, this.queryDecode);
			},

			/**
			 * 重置筛选项
			 */
			cleanFilterLists: function(cleanList) {
				if(!cleanList) {
					cleanList = this.filterList;
				}
				cleanList.forEach(function(filter) {
					filter.child.forEach(function(childFilter) {
						if(childFilter.name == "全部") {
							childFilter.sel = true;
						} else {
							childFilter.sel = false;
						}
					});
				});
				this.refreshSelectedFilterItems();
				this.getProductList(this.start, this.sortId, this.queryDecode);
			},

			/***
			 * 上一页
			 */
			goPrePage:function(){
				if (this.currentPage > 1) {
					this.currentPage --;
					this.handleCurrentChange(this.currentPage);
				}
			},
			/***
			 * 下一页
			 */
			goNextPage:function(){
				if (this.currentPage < this.totalpage) {
					this.currentPage ++;
					this.handleCurrentChange(this.currentPage);
				}
			},
		}
	});

	export default vm;
</script>
<style lang="stylus">
	@import './product.css';
</style>