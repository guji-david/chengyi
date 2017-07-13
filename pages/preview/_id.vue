<template>
        <div  id="preview" @click="selectHide()" class="container">
        <div class="navbar-header my_navbar_header">
            <div>
                <ol class="breadcrumb pre_breadcrumb">
                    <li style="margin-left: 33px;"><a :href='"/detail/0_"+prodId'>{{prodName}}</a></li>
                    <li><a >预览材料</a></li>
                </ol>
            </div>
            <div class="pre_breadcrumb"style="height:40px;border-bottom: none"></div>
        </div>
        <div class="container">
            <div class="preview_left">
                <div class="preview_doc">
                    <ul v-for="(el,index) in docList">
                        <li @click="show_pdf(index)">
                            <span class="item" v-text="el.fileName" :class="[{active:currentIndex==index}]"></span>
                            <a @click="downloadFile(el.fileName,el.downUrl)" :href="el.downUrl" target="_blank" style="cursor: pointer"><span class="icon_down"><img src="../../assets/img/icon_download.png" alt="诚壹财富顾问，壹财富"/></span></a>
                        </li>
                    </ul>
                </div>
                <div class="doc_btn" :visible="docList.length>0"><button @click="allDown()">全部下载</button></div>


            </div>


            <div class="preview_right"style="z-index: 111;" id="embedDiv">
                <embed width="100%" height="800px" :src="pdfUrl"  type="application/pdf" internalinstanceid="8" id="embed" />
            </div>

        </div>

    </div>
</template>

<script>
    import * as API from '../../store/api/api.js'

    let _this = this;
    export default {
        name: 'Preview',
        data() { //属性
            return {
                prodId:0,
                prodName:"",
                currentIndex:0,
                docList:[],
                pdfUrl:"",
                previewUrlList:[],//预览地址
                downUrlList:[]//下载地址
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
            show_pdf:function(index){
                this.currentIndex=index;

                this.pdfUrl=this.downUrlList[index];
                document.getElementById("embedDiv").removeChild(document.getElementById("embed"));
                var embed='<embed width="100%" height="800px" src="'+this.pdfUrl+'"  type="application/pdf" internalinstanceid="8" id="embed" />';
                document.getElementById("embedDiv").innerHTML=embed;
            },
            downloadFile:function(fileName,url){
                API.downloadFile(fileName,url);
            },
            /**
             * 搜索下拉框隐藏
             */
            selectHide:function(){
            },
            /**
             * 获取产品详情
             */
            getProductDetail:function(){
                API.$getProductDetail(this.prodId,0, res=> {
                    this.prodName= res.body.prodName;
                });
            },

            getDoc:function(id){//获取文档下载列表
                API.$getProductDocument(id,res=>{
                    if (res.head.ret == 0) {
                        var list=res.body.list;
                        for(var i= 0,length=list.length;i<length;i++){
                            if(i==0){
                                this.pdfUrl=list[0].downUrl;
                                document.getElementById("embedDiv").removeChild(document.getElementById("embed"));
                                var embed='<embed width="100%" height="800px" src="'+this.pdfUrl+'"  type="application/pdf" internalinstanceid="8" id="embed" />';
                                document.getElementById("embedDiv").innerHTML=embed;
                            }
                            this.previewUrlList.push(list[i].previewUrl);
                            this.downUrlList.push(list[i].downUrl);

                        }
                        this.docList=list;
                    }
                    if (res.body.totalCount == 0){
                        this.$alert('该项目暂时还没有上传文档！','提示',{confirmButton:'确定'});
                        window.close();
                    }
                })
            },
            /**
             * 下载全部文件
             */
            allDown:function(){
                for (var i = 0; i < this.docList.length; i++) {
                    API.downloadFile(this.docList[i].fileName,this.docList[i].downUrl);
                }
            },

            init: function () {//页面初始化
                this.prodId = this.$route.params.id;
                this.getDoc(this.prodId);
                this.getProductDetail();
                this.pdfUrl=this.downUrlList[0];
            }
        }
    }
</script>
<style scoped>
    @import './preview.css';
</style>