<template>
    <div>
        <!-- 这里是为了去除chrome自动填写账号密码造成的屎黄色输入框bug -->
        <input type="text" style="display:none"/>
        <input type="password" style="display:none"/>
        <CyHeader :showLogin="false" :showCategory="false" :showSearch="false"></CyHeader>
        <div class="findPwd" >
            <div class="container">
                <div class="row">
                    <div class="col-md-7">
                        <div class="findPwd_left">
                            <div class="left_head">诚 壹 财 富 <span class="left_sub">重 新 定 义 理 财 师</span></div>
                            <img style="width:360px;margin: 0 auto" src="../../assets/img/cy_bike.jpg" alt="诚壹财富，壹财富">

                        </div>
                    </div>
                    <div class="col-md-5">
                        <div class="findPwd_main">
                            <div class="findPwd_head">
                                <div class="findPwd_head_text">找回密码</div>
                                    <span class="findPwd_login">已有账户<router-link :to="{name:'login'}" >立即登录</router-link></span>
                            </div>
                            <div class="findPwd_content">

                                <el-form :model="findPwdObj" :rules="rules" ref="findPwdObj" label-width="">
                                    <el-form-item prop="tel">
                                        <el-input type="text" placeholder="请输入手机号"v-model="findPwdObj.tel" auto-complete="off"class="findPwd_input">
                                            <template slot="prepend" >
                                                <img style="height:20px"src="../../assets/img/icon_phone.png" alt="诚壹财富，壹财富">
                                            </template>
                                        </el-input>
                                    </el-form-item>

                                    <el-form-item prop="verifyCode"  >

                                        <el-input
                                                type="text"
                                                placeholder="请输入输入验证码"
                                                v-model="findPwdObj.verifyCode"
                                                auto-complete="off"
                                                class="findPwd_input"
                                        >
                                            <template slot="prepend" >
                                                <p >
                                                    <img src="../../assets/img/icon_code.png" alt="诚壹财富，壹财富">
                                                </p>

                                            </template>
                                        </el-input>

                                    </el-form-item>
                                    <el-form-item prop="pwd">

                                        <el-input type="password" placeholder="请输入密码"v-model="findPwdObj.pwd" auto-complete="off"class="findPwd_input">
                                            <template slot="prepend">
                                                <img width="16px" src="../../assets/img/icon_password.png" alt="诚壹财富，壹财富">
                                            </template>
                                        </el-input>
                                    </el-form-item>

                                    <el-form-item style="margin: -10px 5px 0;position: relative">

                                        <div class="findPwd_code">
                                            <el-button class="findPwd_code_btn"
                                                       :plain="true"
                                                       size="mini"
                                                       type="info"
                                                       @click ="sendCode()"
                                                       :disabled="getVerifyCodeDisabled"
                                            >{{getVerifyCodeText}}</el-button>
                                        </div>

                                    </el-form-item>

                                    <el-form-item>
                                        <div>
                                            <el-button type="primary" size="large" class="findPwd_btn" @click="repassword()">{{findPwdName}}</el-button>
                                        </div>
                                    </el-form-item>
                                </el-form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="login_footer">
            <div class="footer_text">
                Copyright &copy; 2016-2017 诚壹财富 诚壹泰合（北京）科技有限公司 京ICP备15066551号-1
            </div>
        </div>
    </div>

</template>

<script>
    import * as API from '../store/api/api.js'
    import * as Util from '../common/utils.js'
    import {hex_md5} from '~assets/js/md5.js'
    import CyHeader from '../components/headandfoot/CyHeader.vue';



    let intervalId;
    export default {
        name: 'findPwd',
        data() { //属性
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
                findPwdObj: {
                    tel: '',
                    verifyCode:'',
                    pwd: '',
                },
                /*
                 * 属性校验规则
                 * */
                rules: {
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
                findPwdName: "重 置 密 码",
                getVerifyCodeDisabled: false,
                borderColor: "",
                findPwdBackground: '#ddd;',
                getVerifyCodeText: "获取验证码",
                count:60
            }
        },
        /**
         *  方法
         */
        methods:{
            sendCode: function() {

                this.$refs.findPwdObj.validateField("tel",(valid) => {
                    if (!valid) {
                        API.$downVerifyCode(2,this.findPwdObj.tel, res=> { //找回密码时候
                            this.borderColor = "#eee";
                            this.getVerifyCodeDisabled = true;
                            this.countDown();
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
            /*
            * 提交按钮
            * */
            repassword: function() {
               this.$refs.findPwdObj.validate((valid) => {
                     if (valid) {
                         this.postData();
                     } else {
                         console.log('error submit!!');
                         return false;
                     }
               });


            },
            /*
            * 提交数据
            * */
            postData:function () {
                var pwd = hex_md5(this.findPwdObj.pwd).toUpperCase();
                this.findPwdBackground = "#ddd";
                this.findPwdName = "提交中..";

                API.$findPwd(this.findPwdObj.tel,this.findPwdObj.verifyCode,pwd, res=> {
                    if (res.head.ret == 0) {
                        this.findPwdBackground = "#ff9959";
                        this.findPwdName = "已提交";

                        this.$alert('修改密码成功，请重新登录！','提示',{confirmButton:'确定',callback: action => {
                                this.$router.replace({ name: 'login'});
                            }
                        });
                    }else {
                        this.$alert(res.head.msg,'提示',{confirmButton:'确定'});
                        this.findPwdBackground = "#ff9959";
                        this.findPwdName="重 置 密 码";
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
    @import '~assets/css/findPwd.css';
</style>