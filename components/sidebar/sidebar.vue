<template>
    <div class="sidebar">

        <el-popover
                ref="popover_qrcode_app"
                placement="top"
                v-model="popoverQrcodeAppVisible"
                trigger="click">
            <div>
                <img width="150px" src="../../assets/img/aside_code_app.png"/>
            </div>
        </el-popover>
        <el-popover
                ref="popover_qrcode_wechat"
                placement="top"
                v-model="popoverQrcodeWechatVisible"
                trigger="click">
            <div>
                <img width="150px" src="../../assets/img/aside_code_wechat.png"/>
            </div>
        </el-popover>

        <el-popover
                ref="popover_input_msg"
                placement="top"
                width="200"
                trigger="manual"
                v-model="inputMsgVisible"
                content="请输入真实号码，以便为您安排专人服务！">
        </el-popover>

        <el-popover
                ref="popover_compare"
                placement="top"
                trigger="click"
                v-model="comparePopupVisible">
            <div class="aside_content" style="background: #fff;color: #000;">
                <div>
                    <ul>
                        <li class="list_item" v-for="(el,index) in prodNameList" @click="openUrl('/detail/0/'+el.prodId+'.html')">
                            {{el.prodName}}<img style="float:right" @click.stop="removeCompare(el.prodId)" src="../../assets/img/close.png" alt="">
                        </li>
                    </ul>
                </div>
                <button class="btn aside_btn" @click="goCompare()">开始对比({{prodNameList.length}}/4 )</button>
            </div>
        </el-popover>

        <div class="free-call" v-show="!popoverQrcodeAppVisible && !popoverQrcodeWechatVisible && !comparePopupVisible">
            <input type="text" placeholder=" 手机号/座机+区号" v-model="contact" v-show="isExpendActionbar" v-popover:popover_input_msg/>
            <button @click="callme()" v-show="isExpendActionbar">免费通话</button>
            <div @click="isExpendActionbar=!isExpendActionbar" class="action_item">

                <img v-if="isExpendActionbar" src="../../assets/img/sidebar_close.png"/>
                <img v-else="!isExpendActionbar" src="../../assets/img/sidebar_left.png"/>

            </div>
        </div>
        <div class="triangle-down" v-show="!popoverQrcodeAppVisible && !popoverQrcodeWechatVisible && isExpendActionbar && !comparePopupVisible"></div>
        <ul>
            <li @click="goTop"><img src="../../assets/img/sidebar_top.png"/></li>
            <li v-show="isExpendActionbar" v-popover:popover_qrcode_wechat><img src="../../assets/img/sidebar_qr_wechat.png"/>&nbsp;公众号</li>
            <li v-show="isExpendActionbar" v-popover:popover_qrcode_app><img src="../../assets/img/sidebar_app.png"/>&nbsp;APP</li>
            <li v-show="isExpendActionbar && !showCompare" @click="feedbackDialogVisible=true"><img src="../../assets/img/sidebar_feedback.png"/>&nbsp;反馈</li>
            <li id="aside_compare" v-show="isExpendActionbar && showCompare" v-popover:popover_compare><img src="../../assets/img/sidebar_compare.png"/>&nbsp;对比</li>
            <li v-show="isExpendActionbar"><img src="../../assets/img/sidebar_phone.png"/></li>
        </ul>


        <el-dialog title="尊敬的客户" v-model="feedbackDialogVisible" size="tiny">
            <div class="feedback-dialog">
                <h5 style="padding-left: 5px;">您好！我是诚壹财富产品经理，感谢您给我们提出的宝贵意见。</h5>
                <textarea style="height: 240px;" v-model="feedbackContent"
                          placeholder="您使用我们的产品过程中，有任何问题和意见，在这里可以畅所欲言，我们将据此优化我们的产品，为您提供更好的服务。"></textarea>
                <span style="color:red">{{feedbackMsg}}</span>
                <textarea style="height: 48px;"  v-model="feedbackTel" placeholder="如果您愿意，留下联系方式（邮箱、电话、QQ都行），我们将尽快回复您。"></textarea>
                <el-button @click="feedback()">我要反馈</el-button>
            </div>
        </el-dialog>

    </div>

</template>
<style>
    @import './sidebar.css';

</style>
<script>
    import { mapGetters, mapActions } from 'vuex'
    import * as API from '../../store/api/api.js'
    import * as Util from '../../common/utils.js'
    Array.prototype.indexOf = function(val) {
        for (var i = 0; i < this.length; i++) {
            if (this[i] == val) return i;
        }
        return -1;
    };
    Array.prototype.remove = function(val) {
        var index = this.indexOf(val);
        if (index > -1) {
            this.splice(index, 1);
        }
    };
    export default{
        props: {
            // 是否显示产品对比
          showCompare:{
              type:Boolean,
              default:true
          }
        },
		computed:mapGetters({
			prodNameList: 'getCompareProducts',
		}),
        data(){
            return{
                prodId:0,
                showBookmark:false,
                bookmarkProductList:[],
                feedbackDialogVisible:false,
                popoverQrcodeAppVisible:false,
                popoverQrcodeWechatVisible:false,
                isExpendActionbar:true,
                inputMsgVisible:false,
                // 联系人手机号
                contact:"",
                // 反馈信息
                feedbackContent:"",
                feedbackTel:"",
                feedbackMsg:"",
                // 产品对比
                comparePopupVisible:false,
            }
        },
        mounted(){
        },
        methods:{
            /**
             * 删除一个对比项
             * @param prodId
             */
            removeCompare: function(prodId) {
//                this.prodNameList.splice(index, 1);
                 for (var i = 0; i <this.prodNameList.length ; i++) {
                     var item = this.prodNameList[i];
                     if (item.prodId == prodId) {
                         this.prodNameList.remove(item);
                         // 存储对比产品
                         break ;
                     }
                 }
				this.$store.dispatch("SET_COMPARE_PRODUCT",{
				    data:this.prodNameList
				});
                //API.pushObj("compareList", this.prodNameList);-->
            },
            /*
             * 回到top
             * */
            goTop:function(){
                window.scrollTo(0,0);
            },
            /*
             * 跳转到对比页面
             * */
            goCompare: function() {
                var idArray = new Array();
                console.log(this.prodNameList);
                for (var i = 0; i< 4;i++) {
                    if(this.prodNameList[i]) {
                        idArray.push(this.prodNameList[i].prodId);
                    } else {
                        idArray.push(0);
                    }
                }
                console.log(idArray);
                window.open('/compare/' + idArray.join('_'));
            },
            /*打开一个新窗口*/
            openUrl: function(url) {
                window.open(url);
            },
            /**
             * 免费通话
             */
            callme: function () {
                if(!Util.checkTel(this.contact)){
                    var _this=this;
                    this.inputMsgVisible=true;

                    setTimeout(function () {
                        _this.inputMsgVisible = false;
                    },3000);
                    return;
                }
                this.inputMsgVisible = false;
                API.$feedback("来此PC网页侧边栏的留言，请您尽快联系我。",this.contact, res => { //调用反馈的接口。
                    if(res.head.ret == 0){
                        this.contact = "";
                        this.$alert('留言成功，稍后会有专人为您服务!','提示',{confirmButton:'确定'});
                    }
                });
            },
            /***
             * 反馈
             */
            feedback: function () {
                if(this.feedbackContent.length <= 5) {
                    this.feedbackMsg = "反馈内容太短了，多写点吧！";
                    return;
                }
                this.feedbackMsg = "";
                API.$feedback(this.feedbackContent,this.feedbackTel, res => { //调用反馈的接口。
                    if(res.head.ret == 0){
                        this.feedbackContent = "";
                        this.feedbackTel = "";
                        this.feedbackDialogVisible = false;
                        this.$alert('留言成功，稍后会有专人为您服务!','提示',{confirmButton:'确定'});
                    }
                });
            },
        }

    }

</script>
