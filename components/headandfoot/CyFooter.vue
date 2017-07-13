<template name="fade">
    <div class="footer_dowm" >
        <!-- 尾部-->
        <div class="footer_row">
            <div class="container">
                <div class="row">
                    <div class="col-md-3" >
                        <div class="footer_item">
                            <img class="footer_img footer_logo" src="../../assets/img/footer_logo.png" style="margin-top:10px;width:130px;" alt="诚壹财富，壹财富">
                        </div>
                    </div>
                    <div class="col-md-5">
                        <div class="footer_item">
                            <div class="footer_img">
                                <div class="footer_text">
                                    <span>微信公众号</span>
                                    <img class="footer_img" src="../../assets/img/footer_weixin.jpg" alt="诚壹财富，壹财富">
                                    <span>微信ID：chengyijr</span>
                                </div>
                                <div class="footer_text">
                                    <span>APP下载</span>
                                    <img class="footer_img" src="../../assets/img/footer_app.jpg" alt="诚壹财富，壹财富">
                                    <span>Android | iPhone版</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="footer_split_line"></div>
                        <div class="footer_item footer_third" style="text-align: left">
                            <div class="footer_img ">
                                <h4 title="诚壹财富">欢迎咨询</h4>
                                <h3 title="诚壹财富" class="footer_unit" style="font-size: 30px; font-weight: bold; color:#3c3c3c;">4006-222-500</h3>
                                <h4 title="诚壹财富" class="footer_unit">周一到周五：9:30-18:30</h4>

                                <div class="footer_tel">
                                    <input class="footer_input" type="text" placeholder="手机号/座机+区号" v-model="contact"/>
                                    <button class="footer_btn" @click="feedBack()">免费通话</button>
                                    <div style="height: 25px">
                                        <p class="footer_msg footer_error" v-show="errorVisable" v-text="footerMsg"></p>
                                        <p class="footer_msg footer_success" v-show="successVisable" v-text="footerMsg"></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="footer_copyright">
            <div class="container">
                <div class="friendly_link">
                    <div >
                        Copyright &copy; 2016-2017 诚壹财富 诚壹泰合（北京）科技有限公司 京ICP备15066551号-1
                    </div>

                    <a  title="诚壹财富"><span>友情链接:</span></a>
                    <a href="http://www.goldentreewm.com " target="_blank" title="诚壹金融"><span class="footer_a">诚壹金融</span></a>
                    <a  href="http://www.chengyiwm.com" title="诚壹财富"><span class="footer_a">诚壹财富</span></a>
                    <a  href="http://www.chengyiwm.com" title="诚壹财富"><span class="footer_a">理财顾问</span></a>

                    <router-link to="/1/product">
                        <span class="footer_a">集合信托</span>
                    </router-link>
                    <router-link to="/2/product">
                        <span class="footer_a">资管产品</span>
                    </router-link>
                    <router-link to="/4/product">
                        <span class="footer_a">证券基金</span>
                    </router-link>
                    <router-link to="/16/product">
                        <span class="footer_a">股权基金</span>
                    </router-link>
                    <router-link to="/128/product">
                        <span class="footer_a">海外投资</span>
                    </router-link>
                    <a  target="_blank" href="http://www.51lcs.cn"><span class="footer_a">51理财师</span></a>
                    <a  target="_blank" href="http://www.qianyuancaifu.com"><span>票据理财</span></a>
                </div>
            </div>
        </div>


    </div>
</template>

<style lang="stylus">
    @import './CyFooter.css';
</style>
<script>


    import * as API from '../../store/api/api.js'
    import * as Util from '../../common/utils.js'
    import localStore from '../../common/store.min.js'

    export default {
        mounted(){
            //TODO. 初始化state 找不到入口地方写，先写在这里
            let currentUser = localStore.get("user");
            if (currentUser) {
                this.$store.dispatch('initializeState', {data: currentUser});
            }
            let compareList = localStore.get("compareList");
            if (compareList) {
                this.$store.dispatch('SET_COMPARE_PRODUCT', {data: compareList});
            }

            this.$store.dispatch("FETCH_CATEGORY_LIST");
        },
        name: 'footer',
        data() { //属性
            return {
                footerMsg:"",
                contact:"",
                errorVisable:false,
                successVisable:false
            }
        },
        mounted() {
             // 统计逻辑
             try{
                this.statisticMethods();
             } catch(error){
				console.log("失败了:"+error);
			 }
        },
        methods: {
            /***
             * 几个平台的统计逻辑
             */
            statisticMethods:function(){
                // growingio
                var _vds = _vds || [];
                  window._vds = _vds;
                  (function(){
                    _vds.push(['setAccountId', '9af8aacf1864dd4e']);
                    _vds.push(['setCS1', 'user_id', '100324']);

                    (function() {
                      var vds = document.createElement('script');
                      vds.type='text/javascript';
                      vds.async = true;
                      vds.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'dn-growing.qbox.me/vds.js';
                      var s = document.getElementsByTagName('script')[0];
                      s.parentNode.insertBefore(vds, s);
                    })();
                  })();
            },

            /*
             * 反馈电话
             * */
            feedBack: function () {
                if(!Util.checkTel(this.contact)){
                    var _this=this;
                    setTimeout(function () {
                        _this.footerMsg="请输入真实号码，以便为您安排专人服务";
                        _this.errorVisable=true;
                    },100);
                    return;
                }
                this.errorVisable=false;
                API.$feedback("来此PC网页底部条的留言，请您尽快联系我。",this.contact, res=> { //调用反馈的接口。
                    if(res.head.ret==0){
                        this.contact = "";
                        this.footerMsg="";
//                        this.successVisable=true;
                        this.$alert('留言成功，稍后会有专人为您服务!','提示',{confirmButton:'确定'});
                    }

                });
            }
        }
    }
</script>