<template>
    <div id="detail">
        <cyheader></cyheader>
        <div class="proDetail" style="min-height: 800px">
            <div class="container">

                <div class="detail_navbar_header">

                    <ol class="detail_breadcrumb">
                        <li>
                            <span @click="goIndex()" style="cursor: pointer">首页</span>
                        </li>
                        <li v-for="el in navList" v-if="categoryId == el.categoryId">
                            <router-link :to="el.path">
                                <span v-text="el.categoryName"></span>
                            </router-link>
                        </li>
                        <li><span v-text="productObj.prodName" style="color:rgba(0,0,0,.7) "></span></li>
                    </ol>
                    <div class="breadcrumb_right">

                        <div class="right_item_title">您可能在找：</div>
                        <div class="right_item active">相关推荐(<span v-text="relatedTotalCount"></span>) <i class="el-icon-caret-bottom"></i></div>
                        <div class="breadcrumb_rightList">
                            <div class="sameList">
                                <ul>
                                    <li v-for="el in relatedProductList">
                                        <div class="item item_title">
                                            <div class="row item_head">
                                                <div class="col-xs-1"><img width="20px" :src="el.productImgUrl" :alt="el.prodName"></div>
                                                <a :href='"/detail/0_"+el.productId' class="col-xs-11 head_title" target="_blank">{{el.prodName}}</a>
                                            </div>
                                            <div class="row item_body">
                                                <div class="item_unit">
                                                    <div class="unit_key" v-text="el.rebateName"></div>
                                                    <div class="unit_value" v-if="!isLogin">
                                                   <span>
                                                          <router-link :to="{name:'login'}" class="item_value"
                                                                       style="color: #8ECCFD; cursor: pointer;font-size: 10px;;"
                                                                       v-text="el.rebate.word">
                                                          </router-link>
                                                    </span>

                                                    </div>
                                                    <div v-else="isLogin" class="item_value"
                                                         style="height: 30px;line-height: 30px;"><span
                                                            style="color: #ff9959;"
                                                            v-text="el.rebate.word"> </span>
                                                        <!-- <router-link :to="{name:'myAuth'}" class="item_value"
                                                                      style="color: #ff9959; cursor: pointer"
                                                                      v-text="el.rebate.word">
                                                        </router-link>-->

                                                    </div>
                                                </div>
                                                <div class="item_unit">
                                                    <div class="unit_key" v-text="el.yieldName"></div>
                                                    <div class="unit_value" v-text="el.yield"
                                                         style="color: #ff9959;"></div>
                                                </div>
                                                <div class="item_unit">
                                                    <div class="unit_key"
                                                         v-text="el.minimiumInvestmentAmountName"></div>
                                                    <div class="unit_value"
                                                         v-text="el.minimiumInvestmentAmount"></div>
                                                </div>
                                                <div class="item_unit">
                                                    <div class="unit_key" v-text="el.periodName"></div>
                                                    <div class="unit_value" v-text="el.period"></div>
                                                </div>
                                                <div class="item_unit item_unit_bg">
                                                    <div class="unit_key"
                                                         v-text="el.invsetmentTargetName"></div>
                                                    <div class="unit_value"
                                                         v-text="el.invsetmentTargetValue"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>

                        </div>

                    </div>

                </div>
            </div>
            <div class="container">
                <div class="container_left detail_item">
                    <div class="detail_flag" :visible="productObj.flag !=0">
                        <!--<img v-if="!!imgSrcList[(productObj.flag)]" :src="imgSrcList[(productObj.flag)]" alt=""/>-->
                        <!--  <img v-if="productObj.flag==1"src="../../assets/img/product_hot.png" alt="诚壹财富，壹财富">
                          <img v-if="productObj.flag==2"src="../../assets/img/product_new.png" alt="诚壹财富，壹财富">-->
                    </div>
                    <div class="row">
                        <div class="col-md-1" style="text-align: right;margin:10px 30px"><img
                                v-if="!!productObj.productImgUrl" :src="productObj.productImgUrl" :alt="productObj.prodName"
                                :id="'productDetailImg'+productObj.prodId"
                        ></div>
                        <div class="col-md-8" style="width:50%;">

                            <p class="item_title" v-text="productObj.prodName"></p>
                            <!-- <p class="item_attrD">
                                 <span>金融市场类</span>
                                 <span>主动管理</span>
                             </p>-->
                            <p class="item_hightlights" v-text="productObj.investmentHightlights"></p>
                            <!--  <p class="item_from">信息来自壹财富</p>-->
                        </div>
                    </div>
                    <!--咨询热线-->

                    <div class="container_right">
                        <div class="order">
                            <div class="order_title">
                                <span>尊敬的用户:</span>
                                <p>您好！为了更好的为您服务，请使用APP进行预约</p>
                            </div>

                            <div class="order_img">
                                <img :src=qrcodeUrl :alt="productObj.prodName">
                                <p>请使用诚壹财富APP扫一扫</p>
                            </div>
                            <div class="order_tel">咨询热线：4006-222-500</div>
                        </div>
                        <div class="operation">
                            <div class="row text-center" v-show="categoryId==1||categoryId==2">
                                <div class="col-md-6">
                                    <a class="item_text"  :class="[{isCollect:bookmark}]"
                                            @click="addCollect()">
                                        <i class="iconfont icon-chengyi_pc_collection1" v-if="bookmark" aria-hidden="true"></i>
                                        <i class="iconfont icon-chengyi_pc_collection" v-else="!bookmark" aria-hidden="true"></i>&nbsp;产品收藏
                                    </a>
                                </div>
                                <div class="col-md-6 ">
                                    <a class="item_text item_text_compare"
                                            @click="addCompare(productObj.prodName, productObj.prodId)">
                                        <i class="iconfont icon-icon3" aria-hidden="true"></i>&nbsp;加入对比
                                    </a>
                                </div>
                            </div>
                            <div class="row text-center">
                                <div class="col-md-6">
                                    <div class="item_operation">
                                        <a class="item_text item_text_email"
                                                @click="goEmail()">

                                            <i class="iconfont icon-chengyi_pc_mail" aria-hidden="true"></i>&nbsp;邮件分享
                                        </a>
                                    </div>

                                </div>
                                <div class="col-md-6 ">
                                    <div class="item_operation">
                                        <a class="item_text item_text_pre" :href="'/preview/' + this.prodId" target="_blank">
                                            <i class="iconfont icon-chengyi_pc_preview" aria-hidden="true"></i>&nbsp;预览材料
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div class="row text-center">
                                <div class="col-md-6 ">
                                    <div class="item_operation">
                                        <a class="item_text item_text_weixin" @click="showWechatShare()">
                                            <i class="iconfont icon-chengyi_pc_wechat" aria-hidden="true"></i>&nbsp;微信分享
                                        </a>
                                    </div>
                                </div>
                                <div class="col-md-6 ">
                                    <div class="item_operation">
                                        <a class="item_text item_text_download" :href="'/preview/' + this.prodId" target="_blank">
                                            <i class="iconfont icon-chengyi_pc_download" aria-hidden="true"></i>&nbsp;资料下载
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>

                <el-dialog title="微信分享" v-model="weixinVisible" size="tiny" close-on-press-escape>
                    <div style="text-align: center;width: 100%  ">
                        <h5 style="padding: 15px 0">请您打开微信扫一扫，在手机上查看</h5>
                        <img style="margin: 0 auto" :src="wechatQrUrl" :alt="productObj.prodName"/>
                    </div>
                </el-dialog>
                <ul v-for="el in productDataList">
                    <li v-for="el in el.list">
                        <!-- 产品概况下第一个小table   -->
                        <div v-if="el.type == 12" class="container_left detail_item"
                             style="width:720px; margin-top: -440px;">
                            <div class="item_head_one">
                                <img src="../../assets/img/icon_left.png" :alt="productObj.prodName"/>
                                <span>产品概括</span>
                            </div>
                            <div class="row" style="margin-top:5%; border: 1px solid #ddd;   margin-left:4%">
                                <div v-for="summary in el.list">
                                    <div class="col-md-2 item_one_even">{{summary.key}}</div>
                                    <div class="col-md-2 item_one_odd">{{summary.value}}</div>
                                </div>
                            </div>
                        </div>

                        <!-- 收益情况 type = 2-->
                        <div v-if="el.type==2" class="left_table container_left detail_item">
                            <table class="table table-bordered">
                                <tbody>
                                <tr>
                                    <td class="text-center" v-for="(el,index) in el.list" style="padding:0;">
                                        <div class="table_head" v-text="el.key"></div>
                                        <div class="table_body" v-for="rebate in str2List(el.value)">
                                            <span v-text="rebate" v-if="index!=2"></span>
                                        <span v-if="index==2&&!isLogin" style="color: #ff9959; cursor: pointer;">
                                                 <router-link :to="{name:'login'}" class="item_value"
                                                              style="color: #ff9959; cursor: pointer"
                                                              v-text="rebate">
                                                 </router-link>

                                        </span>
                                        <span v-if="index==2&&isLogin" style="color: #ff9959; cursor: pointer;">
                                             <em v-if="rebate=='认证可见'" v-text="rebate">

                                             </em>
                                             <em v-if="rebate!='认证可见'" v-text="rebate">
                                             </em>

                                        </span>
                                        </div>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <!-- 备注信息 -->
                        <div v-if="el.type==4" class="container_left left_table detail_item"
                             style="margin-top: -90px;">
                            <div class="item_note">
                                <div class="row">
                                    <div class="item_key">备注信息:</div>
                                    <div class="item_value" v-text="el.value"></div>
                                </div>
                            </div>
                        </div>
                        <!--  k上，v下 type = 8-->
                        <div v-if="el.type==8" class="left_table text-center container_left detail_item"
                             style="border: 1px solid #ddd; padding:0;">
                            <div v-for="el in el.list">
                                <div class="col-md-4 table_head" style="border-right: 1px solid #ddd;">{{el.key}}
                                </div>
                            </div>
                            <div v-for="(el,index) in el.list">
                                <div class="col-md-4 table_body" v-if="index!=2"
                                     style="border-right: 1px solid #ddd;" v-text="el.value"></div>
                                <div class="col-md-4 " v-if="index==2&&isLogin">

                                    <router-link :to="{name:'login'}" class="table_body"
                                                 style="color: #ff9959; cursor: pointer" v-text="el.value">
                                    </router-link>
                                </div>
                                <div class="col-md-4 table_body" v-if="index==2&&(!isLogin)" style="color: #ff9959;"
                                     v-text="el.value"></div>

                            </div>
                            <div style="clear: both;"></div>
                        </div>

                        <!-- 募集账户信息 -->
                        <div v-if="el.type==1&&el.title=='募集账户'">
                            <div class="container_left detail_item" style="margin:0 -15px -15px;">
                                <div class="item_head">
                                    <img src="../../assets/img/icon_title.png" :alt="productObj.prodName"/>
                                    <span>更多详情</span>
                                </div>
                                <div class="item_body">
                                    <div class="row" style="height:178px;">
                                        <div style="padding-left:3%; margin-top: 2%;" class="col-md-2 text-title">
                                            募集账户：
                                        </div>
                                        <div class="col-md-10 text-left"
                                             style="border: 1px solid #c5c1c2;
                                            width: 596px;
                                            padding: 0;
                                            margin-top:3%;
                                            margin-bottom: 5%;
                                            margin-left: -3%">
                                            <ul>

                                                <li v-for="(elem,index) in el.list" :class="[{odd:index%2!=0}]">
                                                    <span class="item_account">&lt;{{elem.key}}:&gt;</span>
                                                    <span v-text="elem.value" class="item_account_value"></span>
                                                </li>
                                            </ul>

                                        </div>


                                    </div>
                                </div>
                            </div>

                        </div>

                        <div v-if="el.type==5">
                            <div class="container_left detail_item" style=" margin-top: -3%;">
                                <div class="item_body">
                                    <div class="row"
                                         style="margin-bottom: 2%;">
                                        <div class="col-md-2 text-title"
                                             style="padding-left: 3%;margin-right: -4%;">{{el.title}}:
                                        </div>
                                        <div class="col-md-10 text-left" v-html="el.value"></div>
                                    </div>

                                </div>
                            </div>

                        </div>

                        <!-- 产品要素 -->
                        <div v-if="el.type==11">
                            <div class="container_left detail_item">
                                <div class="item_head">
                                    <img src="../../assets/img/icon_title.png" :alt="productObj.prodName"/>
                                    <span>产品信息</span>
                                </div>
                                <div class="item_body">
                                    <div class="row">
                                        <div v-for="el in el.list" style="margin-left:-8%;">
                                            <div class="col-md-2 text-title"
                                                 style="text-align: right; line-height:42px;">{{el.key}}:
                                            </div>
                                            <div class="col-md-4 text-left"
                                                 style="text-align: left; line-height:42px;">{{el.value}}
                                            </div>
                                        </div>

                                    </div>

                                </div>
                            </div>

                        </div>
                    </li>
                </ul>

            </div>
        </div>
        <sidebar></sidebar>
        <cyfooter></cyfooter>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'
    import $ from '~assets/js/jquery-2.1.0.min.js'
    import * as API from '../../store/api/api.js'
    import * as SEO from '../../common/seoUtils.js'
    import sidebar from '../../components/sidebar/sidebar.vue'
    import cyheader from '../../components/headandfoot/CyHeader.vue'
    import cyfooter from '../../components/headandfoot/CyFooter.vue'
    export default {
        computed: mapGetters({
            isLogin: 'isLogin',
			prodNameList: 'getCompareProducts',
        }),
        //属性
        data(context) {
            let propertyData = {
                index: "首页",
                seoHeader:{},
                weixinVisible: false,
                productObj: {},//产品对象
                productDataList: [],//产品属性列表
                prodId: 0,
                platform: -1,
                categoryId: 0,
                bookmark: false,
                isColl: false,
                categoryName: "",//产品类别名字
                prodName: "",//产品名字
                imgSrcList: ["", "../../assets/img/product_hot.png", "../../assets/img/product_new.png", "", "../../assets/img/search.png", "../../assets/../../assets/img/product_new.png"],
                qrcodeUrl: "",
                wechatQrUrl: "",
                navList: [
                    {categoryId: 1, path: "/1/product", categoryName: "集合信托"},
                    {categoryId: 2, path: "/2/product", categoryName: "资管计划"},
                    {categoryId: 4, path: "/4/product", categoryName: "证券基金"},
                    {categoryId: 16, path: "/16/product", categoryName: "股权基金"},
                    {categoryId: 128, path: "/128/product", categoryName: "海外投资"},
                ],
                relatedTotalCount: 0,//相关产品总数
                relatedProductList: []
            };

            let prodId = context.params.id.split("_")[1];
            let platform = context.params.id.split("_")[0];

            return new Promise(function(resolve, reject) {
                // 详情数居
                API.$getProductDetail(prodId, platform, res => {
                    propertyData.productObj = res.body;
                    propertyData.categoryId = propertyData.productObj.categoryId;
                    propertyData.productDataList = res.body.data;
                    propertyData.bookmark = res.body.bookmark;
                    propertyData.prodId =  prodId;

                    propertyData.seoHeader = SEO.getDetailPageSeoHeader(propertyData.productObj, propertyData.categoryId);

                    // 相关推荐数据
                    API.$getRelatedProduct(prodId, function(relateRes) {
                        propertyData.relatedTotalCount = relateRes.body.totalCount;
                        propertyData.relatedProductList = relateRes.body.productList;
                        resolve(relateRes);
                    });

                });
            }).then((res) => { return propertyData;  })
            .catch(error => console.log(error));
        },
		head () {
			return this.seoHeader;
		},
		mounted() {
            this.qrcodeUrl = 'http://qr.topscan.com/api.php?text=' + encodeURIComponent("yuandian://yuandian?action=detailpage&id=" + this.prodId);
            this.wechatQrUrl = 'http://qr.topscan.com/api.php?text=' + encodeURIComponent("http://fawx.chengyiwm.com/index.html#!/productInfo/" + this.prodId);
		},
        /**
         *  方法
         */
        methods: {
            str2List: function (key) {
                key = key.replace(/\"/g, "");
                key = key.substring(1, key.length - 1);
                var list = key.split(",");
                return list;
            },
            /**
             *  显示微信分享
             */
            showWechatShare:function(){
                this.weixinVisible = true;
            },
            /*跳转到首页*/
            goIndex: function () {
                this.$router.push({name: 'index'});
            },
            /*跳转到详情页*/
            goDetail: function (productId) {
                var platform = 0;//0为诚壹财富
                this.$router.push({name: 'detail', params: {'platform': platform, 'productId': productId}});
            },
            //定义加入收藏夹函数
            addCollect: function(){
                var url = location.href;
                var title = document.title;
                console.log("addCollect");
                try {
                   window.external.addFavorite(url,title);
                } catch(e){
                   try{
                    window.sidebar.addPanel(title,url,"");
                   } catch(e){
                    this.$alert('加入收藏夹失败，请使用Ctrl+D快捷键进行添加操作!','提示',{confirmButton:'确定'});
                  }
                }
            },

            checkExist: function (prodId) {
                for (var i = 0; i < this.prodNameList.length; i++) {
                    var item = this.prodNameList[i];
                    if (item.prodId == prodId) {
                        return true;
                    }
                }
                return false;
            },
            /**
             * 添加对比产品
             */
            addCompare: function (prodName, prodId) {
                if (this.prodNameList.length >= 4) {
                    this.$alert('仅能同时对比4款产品！','提示',{confirmButton:'确定'});
                    return;
                }
                if (!this.checkExist(prodId)) {
                    API.$getCompareProductData(prodId, res => {
                        console.log(res);
                        if (res.head.ret == 0) {
                            console.log("after");
                            this.prodNameList.push({
                                "prodName": prodName,
                                "prodId": prodId,
                                "list": res.body.list
                            });
                            // 存储对比产品
                            this.$store.dispatch("SET_COMPARE_PRODUCT",{
                                data:this.prodNameList
                            });
                            // API.pushObj("compareList", this.prodNameList);
                        }
                    });
                    this.flyTo("#productDetailImg" + prodId, "#aside_compare");

                } else {
                    this.$alert('该产品已存在，不能重复添加！','提示',{confirmButton:'确定'});
                }
            },

            /**
             * 收藏飞入动画
             * @param from 飞入的id
             * @param target 目标飞入的id
             * @param callback 动画完成回调
             */
            flyTo: function (from, target, callback) {
                var flyElm = $(from).clone().css('opacity', '0.7');
                flyElm.css({
                    'z-index': 99999,
                    'display': 'block',
                    'position': 'absolute',
                    'top': $(from).offset().top + 'px',
                    'left': $(from).offset().left + 'px',
                    'width': $(from).width() + 'px',
                    'height': $(from).height() + 'px'
                });
                $('body').append(flyElm);
                flyElm.animate({
                    top: $(target).offset().top,
                    left: $(target).offset().left,
                    width: 50,
                    height: 50
                }, 'slow', 'swing', function () {
                    flyElm.hide();
                });
            },
            /**
             * 邮件分享
             * */
            goEmail: function () {
                    this.$prompt('请输入邮箱', '提示', {
                      confirmButtonText: '发送到此邮箱',
                      cancelButtonText: '取消',
                      inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
                      inputErrorMessage: '邮箱格式不正确'
                    }).then(({ value }) => {
                        API.$shareProductbyMail(this.prodId, value, res => {
                            if (res.head.ret == 0) {
                                this.$alert('已经将产品成功发送至邮箱!','提示',{confirmButton:'确定'});
                            } else {
                                this.$alert(res.head.msg,'提示',{confirmButton:'确定'});
                            }
                        })
                    });
            }
        },
        components: {
            sidebar,
            cyheader,
            cyfooter
        }
    }
</script>
<style lang="stylus">
    @import './detail.css';
</style>