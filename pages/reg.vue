<template>
    <div id="reg">
        <CyHeader :showLogin="false" :showCategory="false" :showSearch="false"></CyHeader>
        <div class="reg" >
            <div class="container">
                <div class="row">
                    <div class="col-md-7">
                        <div class="reg_left">
                            <div class="left_head">诚 壹 财 富 <span class="left_sub">重 新 定 义 理 财 师</span></div>
                            <img style="width:360px;margin: 0 auto" src="../../assets/img/cy_bike.jpg" alt="诚壹财富，壹财富">

                        </div>
                    </div>
                    <div class="col-md-5">
                        <div class="reg_main">
                            <div class="reg_head">
                                <div class="reg_head_text">免费注册 <span class="reg_honbao">送1000元大礼包</span></div>
                                <span class="reg_login">
                    已有账户
                     <router-link :to="{name:'login'}" >
                                立即登录
                            </router-link>
                </span>
                            </div>
                            <div class="reg_content">

                                <el-form :model="regObj" :rules="rules" ref="regObj" label-width="">
                                    <el-form-item prop="tel">
                                        <el-input type="text" placeholder="请输入手机号"v-model="regObj.tel" auto-complete="off"class="reg_input">
                                            <template slot="prepend" >
                                                <img style="height:20px"src="../../assets/img/icon_phone.png" alt="诚壹财富，壹财富">
                                            </template>
                                        </el-input>
                                    </el-form-item>

                                    <el-form-item prop="verifyCode"  >

                                        <el-input
                                                type="text"
                                                placeholder="请输入输入验证码"
                                                v-model="regObj.verifyCode"
                                                auto-complete="off"
                                                class="reg_input">
                                            <template slot="prepend" >
                                                <img src="../../assets/img/icon_code.png" alt="诚壹财富，壹财富">
                                            </template>
                                        </el-input>

                                        <div class="reg_code">
                                            <el-button class="reg_code_btn"
                                                       :plain="true"
                                                       size="mini"
                                                       type="info"
                                                       @click ="sendCode()"
                                                       :disabled="getVerifyCodeDisabled"
                                            >{{getVerifyCodeText}}</el-button>
                                        </div>
                                    </el-form-item>
                                    <el-form-item prop="pwd">

                                        <el-input type="password" placeholder="请输入密码"v-model="regObj.pwd" auto-complete="off"class="reg_input">
                                            <template slot="prepend">
                                                    <img width="16px" src="../../assets/img/icon_password.png" alt="诚壹财富，壹财富">
                                            </template>
                                        </el-input>
                                    </el-form-item>

                                    <el-form-item style="margin: -10px 5px 0;position: relative">

                                        <div @click="regDisabled=!regDisabled" style="color:#999; cursor: pointer; display: inline;">
                                            <img v-if="!regDisabled" style="width: 16px; padding-bottom: 4px;display: inline;" src="~assets/img/checkbox_normal.png" />
                                            <img v-else="regDisabled" style="width: 16px; padding-bottom: 4px;display: inline;" src="~assets/img/chechbox_checked.png" />
                                            <span style="margin-left:6px">我已阅读并同意</span>
                                        </div>

                                        <el-button type="text"class="agreeLink"@click.native="agreeVisible = true">《用户协议》</el-button>

                                    </el-form-item>

                                    <el-form-item>
                                        <div>
                                            <el-button type="primary"  size="large" class="reg_btn" :disabled="!regDisabled" @click="reg()">{{regText}}</el-button>
                                        </div>
                                    </el-form-item>
                                </el-form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <el-dialog title="诚壹财富" v-model="agreeVisible" size="small" close-on-press-escape>
            <div class="agreement_bg">

                <!-- 协议主体 -->
                <div class="agreement_content">
                    <div class="agreement_text">
                        <h3 class="agreement_text_head">《诚壹财富》用户服务协议</h3>
                        <p>诚壹财富官网、微信公众号、APP等平台由诚壹泰合（北京）科技有限公司研发并推出，为广大企业、理财顾问和用户搭建了一个专业、高效、安全、优质的财富管理服务平台，提供多种理财咨询、金融产品查询及理财产品销售，让理财产品的信息对称、服务高效流转，为您实现财富增值，是您身边的高端财富管理专家。如您对我们有任何疑问及建议，详询客服热线：4006-222-500，或关注微信公众号（诚壹财富）直接留言即可。
                            本协议由您与诚壹财富的经营者共同缔结，本协议具有合同效力。</p>
                        <h3>一、合格投资者认定说明</h3>
                        <p>根据《私募投资基金监督管理暂行办法》第四章第十四条规定：“私募基金管理人、私募基金销售机构不得向合格投资者之外的单位和个人募集资金，不得通过报刊、电台、电视、互联网等公众传播媒体或者讲座、报告会、分析会和布告、传单、手机短信、微信、博客和电子邮件等方式，向不特定对象宣传推介。”</p>
                        <p>诚壹财富谨遵《私募投资基金监督管理暂行办法》之规定，只向特定的合格投资者宣传推介相关私募投资基金产品。</p>
                        <p>阁下如有意进行私募投资基金投资且满足《私募投资基金监督管理暂行办法》关于“合格投资者”标准之规定，即具备相应风险识别能力和风险承担能力，投资于单只私募基金的金额不低于100 万元，且个人金融类资产不低于300 万元或者最近三年个人年均收入不低于50 万元人民币。请阁下详细阅读本提示，并注册成为诚壹财富特定的合格投资者，方可获得诚壹财富私募投资基金产品的相关服务。</p>
                        <h3>二、用户信息保密承诺</h3>
                        <p>为保证您放心、安全的享受我们提供的服务，我们郑重承诺：</p>
                        <p>1. 产品信息真实可靠：诚壹财富官网、微信公众号、APP等平台展示的所有产品信息，包括产品内容、预期收益、服务费率、产品期限等信息，全部真实可靠；</p>
                        <p>2. 保密技术行业领先：诚壹财富平台的用户注册信息及业务办理信息，我们承诺使用行业领先的密文方式进行传输和存储，绝对保密，未经您本人同意，任何个人和机构均无法获取相关信息；</p>
                        <p>3. 泄密责任无理由承担：我们承诺为您提供专业、高效、安全、优质的理财服务，因我方原因造成泄密，本公司无理由承担相应责任，期待与您携手，共赴互联网金融盛宴！</p>
                        <h3>三、产品使用规范</h3>
                        <p>1. 您根据诚壹财富的理财资讯向客户进行推广宣传业务的，需保证客户是符合相关法律规定的合格投资人；</p>
                        <p>2. 您应严格按照国家各金融监管机构的规定开展业务活动，不采用误导或可能误导客户的方式和内容进行宣传推广；</p>
                        <p>3. 您保证在接到客户的投诉后，积极妥善处理。您与客户的一切纠纷，均与诚壹财富经营者无关；</p>
                        <p>4. 诚壹财富中的资料信息仅供推广业务参考，未得诚壹财富经营者同意，不得在业务范围外交予第三方使用；</p>
                        <p>5. 诚壹财富经营者与您不具有雇佣、代理等关系，您不得利用诚壹财富的名称或公司数据（包括但不限于地址及电话等），行不实夸大之宣传而误导客户及其他损害客户利益的行为；</p>
                        <p>6. 您在推广活动中，不得利用不正当竞争手段、恶意手段发展客户；</p>
                        <p>7. 您提交的注册信息及您设置的银行卡等信息，都将严格进行保密。除法律另有规定或监管机构要求披露外，诚壹财富均不会任意对外泄露。</p>
                        <h3>四、协议内容及签署</h3>
                        <p>1. 本协议内容包括协议正文及所有诚壹财富已经发布的或将来可能发布的各类规则。所有规则为本协议不可分割的组成部分，与协议正文具有同等法律效力；</p>
                        <p>2. 您应当在使用诚壹财富服务之前认真阅读全部协议内容，对于协议中以加粗字体显示的内容，您应重点阅读。如您使用诚壹财富服务，则本协议即对您产生约束，届时您不应以未阅读本协议的内容为由，主张本协议无效，或要求撤销本协议；</p>
                        <p>3. 您承诺接受并遵守本协议的约定。如果您不同意本协议的约定，您应立即停止注册使用诚壹财富。如果您注册完成本平台，将被视为接受本协议全部条款，接受本协议约束；</p>
                        <p>4. 诚壹财富有权根据需要不时地制订、修改本协议及/或各类规则，并以网站公示的方式进行公告，不再单独通知您。变更后的协议和规则一经在网站公布后，立即自动生效。如您不同意相关变更，应当立即停止使用诚壹财富服务。您继续使用诚壹财富服务的，即表示您接受经修订的协议和规则；</p>
                        <p>5.诚壹财富是提供给您用于查看理财资讯、进行专业投资管理服务的平台。</p>
                        <h3>五、违约责任</h3>
                        <p>您未按本协议约定履行其义务，出现违反上述条款之一的，诚壹财富经营者有权终止支付服务费。情节严重的，诚壹财富经营者有权单方终止本协议。协议终止后，诚壹财富经营者依旧有权要求您承担违约责任。</p>
                        <h3>六、其他约定</h3>
                        <p>1. 本协议之效力、解释、变更、执行与争议解决均适用中华人民共和国大陆地区法律，如无相关法律规定的，则应参照通用国际商业惯例和（或）行业惯例；</p>
                        <p>2. 因本协议产生之争议的，您与诚壹财富经营者均同意以诚壹财富经营者住所地人民法院为管辖法院。</p>
                    </div>

                </div>

            </div>





        </el-dialog>
        <div class="login_footer">
            <div class="footer_text">
                Copyright &copy; 2016-2017 诚壹财富 诚壹泰合（北京）科技有限公司 京ICP备15066551号-1
            </div>
        </div>
    </div>
</template>

<script>
    import * as API from '../store/api/api.js'
    import * as Util from '../common/utils'
    import {hex_md5} from '~assets/js/md5.js'
    import CyHeader from '../components/headandfoot/CyHeader.vue';

    let intervalId;
    let _this = this;
    export default {
        name: 'Reg',
        data() { //属性

           /* var validateName = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入用户名'));
                } else if(value.length>=20) {
                    callback(new Error('您输入的名字长度过长'));
                }else {
                    callback();
                }
            };*/
            var validateTel = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入手机号'));
                } else if(!Util.checkTel(value)) {
                    callback(new Error('请输入正确的手机号码'));
                }else {
                    callback();
                }
            };
            var validateCode = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入验证码'));
                } else if(!Util.checkVerifyCode(value)) {
                    callback(new Error('请输入6位验证码'));
                }else {
                    callback();
                }
            };
            var validatePwd = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else if(!Util.checkPwd(value)){
                    callback(new Error('密码由6-18位的数字字母或任意字符组合而成'));
                }else {
                    callback();
                }
            };
            return {
                regObj: {
                    nickName:"",
                    tel: '',
                    verifyCode:'',
                    pwd: '',
                },
                /*
                 * 属性校验规则
                 * */
                rules: {
                   /* nickName: [
                        { required: true, message: '请输入正确姓名', trigger: 'blur' },
                        { validator: validateName }
                    ],*/
                    tel: [
                        { required: true, message: '请输入手机号', trigger: 'blur' },
                        { validator: validateTel }
                    ],
                    verifyCode: [
                        { required: true, message: '请输入验证号', trigger: 'blur' },
                        { validator: validateCode}
                    ],
                    pwd: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { validator: validatePwd }
                    ]

                },




                fadeContent: "",
                agreeVisible:false,
                getVerifyCodeDisabled: false,
                borderColor: "",
                regText: "注册",
                regDisabled: true,
                regBackground: "#ddd",
                count: 60,
                getVerifyCodeText: "获取验证码",
                fadeVisible:false
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
        methods:{

            /*
             * 发送验证码
             * */
            sendCode: function() {

                this.$refs.regObj.validateField("tel",(valid) => {
                    if (!valid) {
                        API.$downVerifyCode(1,this.regObj.tel, res=> { //找回密码时候
                            if(res.head.ret==0){
                                this.borderColor = "#eee";
                                this.getVerifyCodeDisabled = true;
                                this.countDown();
                            }else if(res.head.ret=='-10013'){

                                this.$alert(res.head.msg,'提示',{confirmButton:'确定'});
                            }

                        });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });


            },
            numInterval:function() {
                this.getVerifyCodeText = this.count + '秒后重发';
                this.count--;
                if (this.count <= 0) {
                    clearInterval(intervalId);
                    this.getVerifyCodeText = '获取验证码';
                    this.getVerifyCodeDisabled = false;
                    this.borderColor="#ff9959";
                    this.count=60;
                }
            },
            countDown: function() { // 倒计时
                var _this = this;
                intervalId = setInterval(function () {
                    _this.numInterval();
                },1000);

            },
            /*跳转到首页*/
            goIndex:function () {
                this.$router.push({ name: 'index'});
            },
            reg:function() {
                this.$refs.regObj.validate((valid) => {
                    if (valid) {
                        var pwd = this.regObj.pwd;
                        this.regDisabled = true;
                        this.regText = "提交中..";
                        pwd = hex_md5(pwd).toUpperCase();
                        API.$register(this.regObj.nickName,this.regObj.tel,this.regObj.verifyCode,pwd,res =>{
                            if (res.head.ret == 0) {
                                this.regDisabled = false;
                                this.regText = "已注册";
                                this.regBackground = "#ff9959";
                                history.go(-1);
                            }/*else if(res.head.ret == -10017){
                             this.regDisabled = false;
                             this.regText = "免费注册";
                             this.regBackground = "#ff9959";
                             }*/

                        });

                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });






            }

        },
        components: {
            CyHeader
        }

    }
</script>
<style lang="stylus">
    @import '~assets/css/reg.css';
</style>