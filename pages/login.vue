<template>
    <div>
        <!-- 这里是为了去除chrome自动填写账号密码造成的屎黄色输入框bug -->
        <input type="text" style="display:none"/>
        <input type="password" style="display:none"/>
        <CyHeader :showLogin="false" :showCategory="false" :showSearch="false"></CyHeader>
        <div class="login" >
                <div class="container">
                    <div class="row">
                        <div class="col-md-7">
                            <div class="login_left">
                                <div class="left_head">诚 壹 财 富 <span class="left_sub">重 新 定 义 理 财 师</span></div>
                                <img style="width: 360px;margin: 0 auto" src="../../assets/img/cy_bike.jpg" alt="诚壹财富，壹财富">
                            </div>
                        </div>
                        <div class="col-md-5">
                            <!--登录页面-->
                            <div class="login_main">
                                <!-- 内容头部 -->
                                <div class="login_head" >
                                    <div class="login_head_text">普通登录</div>
                                </div>
                                <!-- 登录主体 -->
                                <div class="login_content">

                                    <el-form :model="loginObj" :rules="rule" ref="loginObj" label-width="">
                                        <el-form-item prop="tel">
                                            <el-input type="text" placeholder="请输入手机号"v-model="loginObj.tel" auto-complete="off"class="login_input">
                                                <template slot="prepend">
                                                    <img style="height:20px"src="../../assets/img/icon_phone.png" alt="诚壹财富，壹财富">
                                                </template>
                                            </el-input>
                                        </el-form-item>
                                        <el-form-item prop="pwd" >

                                            <el-input type="password" placeholder="请输入密码"v-model="loginObj.pwd" @keyup.enter="loginBtn()" auto-complete="off"class="login_input">
                                                <template slot="prepend">
                                                    <img src="../../assets/img/icon_password.png" alt="诚壹财富，壹财富">
                                                </template>
                                            </el-input>


                                        </el-form-item>
                                        <el-form-item style="margin: -10px 5px 0;position: relative">
                                            <div class="login_findpwd">
                                                <router-link :to="{name:'findPwd'}" >
                                                    忘记密码?
                                                </router-link>
                                            </div>
                                            <div @click="defaultFlag=!defaultFlag" style="color:#999; cursor: pointer">
                                                <img v-if="!defaultFlag" style="width: 16px; padding-bottom: 4px;display: inline;" src="~assets/img/checkbox_normal.png" />
                                                <img v-else="defaultFlag" style="width: 16px; padding-bottom: 4px;display: inline;" src="~assets/img/chechbox_checked.png" />
                                                <span style="margin-left:6px">30天内自动登录</span>
                                            </div>
                                        </el-form-item>
                                        <el-form-item>
                                            <div>
                                                <el-button type="primary" size="large" class="login_btn" :disabled="loginDisabled" @click="loginBtn()">{{loginName}}</el-button>
                                            </div>
                                        </el-form-item>
                                        <el-form-item>
                                            还没有账号？ <router-link :to="{name:'reg'}"> <span style="color: #ff9959">立即注册 领1000元大礼包</span> </router-link>
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
    import localStore from '../common/store.min.js';
    import CyHeader from '../components/headandfoot/CyHeader.vue';



    /**
     * 读取cookies
     * @param cookiename cookie的name
     * @return  cookie的value
     * */
    function getCookie(name) {
        var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
        if(arr=document.cookie.match(reg)){
            return unescape(arr[2]);
        } else{
            return null;
        }

    }
    /**
     * 删除cookies
     * @param cookiename cookie的name
     * @return  cookie的value
     * */
    function delCookie(name) {
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        var cval=getCookie(name);
        if(cval!=null) {
            document.cookie= name + "="+cval+";expires="+exp.toGMTString();
        }
    }
    /**
     *设置Cookie
     * @param name cookie的key
     * @param value cookie的value
     * @param time cookie的过期时间
     */
    function setCookie(name,value,time) {
        var strsec = getsec(time);
        var exp = new Date();
        exp.setTime(exp.getTime() + strsec*1);
        document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
    }
    /**
     * 设定过期时间
     * @param str
     * @returns {number}
     */
    function getsec(str) {
        var str1=str.substring(1,str.length)*1;
        var str2=str.substring(0,1);
        if (str2=="s")
        {
            return str1*1000;
        }
        else if (str2=="h")
        {
            return str1*60*60*1000;
        }
        else if (str2=="d")
        {
            return str1*24*60*60*1000;
        }
    }

   /* function saveUserInfo() {
      if ($("input[type='checkbox']").is(':checked')) {
          var userName = $("#wsc-username").val();
          var pwd = $("#wsc-password").val();
          var passWord;
          if(pwd.length<18){
              passWord = hex_md5(pwd).toUpperCase();
          }else{
              passWord=pwd;
          }


          //这是有设定过期时间的使用示例：
          //s20是代表20秒
          //h是指小时，如12小时则是：h12
          //d是天数，30天则：d30
          setCookie("userName",userName,"d7");
          setCookie("passWord",passWord,"d7");


      }
      else {
          delCookie("userName");
          delCookie("passWord");
      }
    }*/

    export default {
        name: 'Login',
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
                loginObj: {
                    tel: '',
                    pwd: '',
                },
                /*
                 * 属性校验规则
                 * */
                rule: {
                    tel: [
                        { required: true, message: '请输入手机号', trigger: 'blur' },
                        { validator: validateTel }
                    ],
                    pwd: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { validator: validatePwd }
                    ]

                },
                userId:"",
                loginVisable:false,
                loginDisabled: false,
                defaultFlag:true,
                loginName: "登 录",
                nickname: '',
                loginBackGround: 'background: rgb(0, 108, 191);'
            }
        },
        /**
         * 初始化工作
         */
        mounted() {
            this.init();
        },
        /**
         *  方法
         */
        methods:{



            /*
             * 登录按钮
             * */
            loginBtn:function() {
                this.$refs.loginObj.validate((valid) => {
                    if (valid) {
                        this.postData();
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },

            // 登录请求
            postData: function() {
                this.loginName = "登录中..";
                this.loginDisabled = true;
                this.loginBackGround = "#ddd";
                var password;
                if(!getCookie("passWord")){
                    password = hex_md5(this.loginObj.pwd).toUpperCase();
                }else{
                    password=this.loginObj.pwd;
                }

                /*this.$store.dispatch('login',{userId:12345,skey:"fsdf",userName:"ylb",tel:'18911148661'});
                localStore.set("user",{userId:12345,skey:"fsdf",userName:"ylb",tel:'18911148661'});
                history.go(-1);
                return;*/

                API.$login(this.loginObj.tel,password,res=>{
                    if(res.head.ret == 0) {
                        this.loginVisable = false;
                        this.userId = res.body.userId;
                        this.nickname = res.body.nickName;

                        let userData = {
                            userId: res.body.userId,
                            skey: res.body.skey,
                            userName: res.body.nickName,
                            tel: this.loginObj.tel
                        };

                        this.$store.dispatch('initializeState', {data: userData});
                        localStore.set("user", userData);
                    //this.init();
//                    this.$store.dispatch('GET_PRODUCT_LIST',{
//                        start: this.start,
//                        pageSize: this.pageSize,
//                        sortId: this.sortId,
//                        categoryId: this.categoryId,
//                        filterId: this.filterId,
//                        query: this.$route.params.query
//                    });
//
//                    store.dispatch('GET_DETAIL_PRODUCTS',{
//                        prodId:this.$route.params.productId,
//                        platform:this.$route.params.platform
//                    });

//                    saveUserInfo();
                        history.go(-1);
                    } else {
                        this.loginVisable = false;

                        this.$alert(res.head.msg,'提示',{confirmButton:'确定'});
                    }
                    this.loginName = "登 录";
                    this.loginDisabled = false;
                    this.loginBackGround = "#ff9959";
                });

            },
            /*跳转到首页*/
            goIndex:function () {
                this.$router.push({ name: 'index'});
            },
            init:function(){
                if(getCookie("userName")){
                    this.loginObj.tel=getCookie("userName");
                }
                if(getCookie("passWord")){
                    this.loginObj.pwd=getCookie("passWord");
                }
            }
        },
        components: {
            CyHeader
        }
    }
</script>
<style lang="stylus">
    @import '~assets/css/login.css';
</style>