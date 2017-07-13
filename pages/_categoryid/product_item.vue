<template slot="item" scope="props">
    <div class="container">
        <!-- 这里是为了去除chrome自动填写账号密码造成的屎黄色输入框bug -->
        <input type="text" style="display:none"/>
        <input type="password" style="display:none"/>

        <div class="product_item " :class="[{sale_out:!!el.saleOut}]">
            <div class="item">
                <div class="row item_head">
                    <div class="col-xs-10 head_title">
                        <a :href='"/detail/0_"+el.productId' class="item_title" target="_blank">
                            <img style="width:42px; float: left" :src="el.productImgUrl" :alt="el.prodName" :id="'productImg'+el.productId"/>
                            <span class="title_text" v-text="el.prodName"></span>
                            <div style="margin-bottom: -2px;width: 45px; display: inline-block;">
                                <img v-if="el.flag==1" style="height:18px" src="../../assets/img/product_hot.png" alt="诚壹财富顾问，壹财富">
                                <img v-if="el.flag==2" style="height:18px" src="../../assets/img/product_new.png" alt="诚壹财富顾问，壹财富">
                            </div>
                        </a>

                    </div>
                    <div class="col-xs-2 head_opr">
                        <a class="head_color"  target="_blank" :href='"/preview/" + el.productId'>预览/下载资料</a>
                        <div style="display: inline" v-show="categoryId==1||categoryId==2" >
                            <span class="head_spi">|</span>
                            <a class="head_color" style="cursor:pointer;" @click="addCompare(el.prodName, el.productId)">加入对比</a>
                        </div>

                    </div>
                </div>
                <div class="row item_body">
                    <div class="col-xs-9 " >
                        <div class="item_unit">
                            <div class="unit_key" v-text="el.rebateName"></div>
                            <div class="unit_value"v-show="!isLogin">
                               <span >
                                      <router-link :to="{name:'login'}" class="item_value"
                                                   style="color: #59b9fc; cursor: pointer;font-size: 14px;"
                                                   v-text="el.rebate.word">
                                      </router-link>
                                </span>

                            </div>
                            <div v-show="isLogin" class="item_value"style="height: 46px" ><span  style="color: #ff9959;font-size: 14px;"v-text="el.rebate.word"> </span>
                            </div>
                        </div>
                        <div class="item_unit" v-for="(item,index) in el.baseProperty">
                            <div class="unit_key" v-text="item.key"></div>
                            <div v-if="index==0" class="unit_value" v-text="item.value" style="color: #ff9959;"></div>
                            <div v-else="index!=0" class="unit_value" v-text="item.value"></div>
                        </div>
                    </div>
                    <div class="col-xs-3"style="text-align: right">
                        <div class="body_btn" >
                            <input class="prod_input" type="text"  v-model="el.phoneNum" placeholder="手机号/座机+区号"/>
                            <button class="prod_btn" @click="consult()">预约咨询</button>
                            <div style="height: 25px">
                                <p class="prod_msg prod_error" v-show="el.error">请输入真实号码，以便为您安排专人服务</p>
                            </div>
                            <button class="item_appointment_btn" type="info" v-on:mouseenter="orderVisible=true" v-on:mouseleave="orderVisible=false">APP扫码预约</button>
                            <div class="popup_qrcode"  v-show="orderVisible">
                                <img style="width:200px; margin: 0 auto;" src="../../assets/img/aside_code_app.png" alt="诚壹财富顾问，壹财富" />
                                <span>欢迎咨询：4006-222-500</span>
                            </div>
                        </div>

                    </div>
                </div>
                <div class="row item_footer">
                    <div class="col-xs-11">
                        <div class="item_all_mark">
                            <label v-for="item in el.tag" v-if="!!item.word" style="display: inline-block">
                                <a class="item_mark" :href='"/search/" + item.word' target="_blank">{{item.word}}</a>
                            </label>
                        </div>
                        <div class="item_investhightlights" v-show="el.investmentHightlights!=''">
                            亮点：<span v-text="el.investmentHightlights"></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import * as API from '../../store/api/api.js'
import * as Util from '../../common/utils.js'
import $ from '../../assets/js/jquery-2.1.0.min.js'
import Vue from 'vue'

export default {
  name: 'product_item',
  computed:mapGetters({
      isLogin: 'isLogin'
  }),
  props: {
      item: {
        type:Object
      },
      categoryId: {
        type:Number,
        default:1
      }
  },
  created(){
        Vue.set(this.el,"phoneNum","");
        Vue.set(this.el,"error",false);
  },
  data(){
  	return {
  		el:this.item,
        docVisible:false,
        orderVisible:false,
        useIdIsNull: true,
        docList: [], // 产品文档列表
		imgSrcList: [
			"../../assets/img/product_hot.png",
			"http://odqn23waz.bkt.clouddn.com/%E4%B8%AD%E6%B1%9F%E4%BF%A1%E6%89%98.jpg",
			"../../assets/img/product_new.png",
			"../../assets/img/product_hot.png"],
  	}
  },
  watch: {
        // 新值过来，更新el
        item(val) {
            this.el = val;
            Vue.set(this.el,"phoneNum","");
            Vue.set(this.el,"error",false);
        }
    },
  methods: {
        /***
         *  立即预约
         */
        consult:function () {
            let tel = this.el.phoneNum;
            if(!Util.checkTel(tel)){
                this.el.error = true
                return;
            }
            this.el.error = false
            API.$feedback("来此PC网页侧边栏的留言，我想了解产品：" + this.el.prodName +" 的详细内容，请您尽快联系我。",tel, res=> { //调用反馈的接口。
                if(res.head.ret==0){
                    this.el.phoneNum = "";
                    this.$alert('预约成功，稍后会有专人为您服务!','提示',{confirmButton:'确定'});
                }
            });

        },
        /**
         * 收藏飞入动画
         * @param from 飞入的id
         * @param target 目标飞入的id
         * @param callback 动画完成回调
         */
        flyTo:function(from, target , callback) {
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
            }, 'slow','swing',function(){
                flyElm.hide();
            });
        },

        checkExist: function(prodId) {
            for(var i = 0; i < this.prodNameList.length; i++) {
                var item = this.prodNameList[i];
                if(item.prodId == prodId) {
                    return true;
                }
            }
            return false;
        },
        /**
         * 添加对比产品
         */
        addCompare: function(prodName, prodId) {
            this.prodNameList = API.fetchObj("compareList");
            if(this.prodNameList.length >= 4) {
                this.$alert('仅能同时对比4款产品！','提示',{confirmButton:'确定'});
                return;
            }
            if(!this.checkExist(prodId)) {
                API.$getCompareProductData(prodId, res=> {
                    if(res.head.ret == 0) {
                        console.log("after");
                        this.prodNameList.push({
                            "prodName": prodName,
                            "prodId": prodId,
                            "list": res.body.list
                        });
                        // 存储对比产品
                        // API.pushObj("compareList", this.prodNameList);
                        this.$store.dispatch("SET_COMPARE_PRODUCT",{data:this.prodNameList});
                    }
                });
                    this.flyTo("#productImg" + prodId, "#aside_compare");
                } else {

                    this.$alert('该产品已存在，不能重复添加！','提示',{confirmButton:'确定'});
                }
        },
  },

}

</script>

<style scoped>
	@import './product.css';
</style>