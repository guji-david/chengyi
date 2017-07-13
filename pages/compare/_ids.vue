<template>
    <div>
    <cyheader ></cyheader>
    <div id="compareModel"class="compare">
        <div class="container " >
            <table class="table table-bordered table-striped table-hover" style="text-align: center;">
                <tbody>
                    <tr>
                        <td class="col-lg-1"></td>
                        <td class="table_bg col-lg-2" v-for="menu in dropdownMenu">
                            <span class="el-dropdown-link listbox" @click="menu.open=!menu.open">选择产品
                                <i v-show="menu.open" class="fa fa-chevron-up"></i>
                                <i v-show="!menu.open" class="fa fa-chevron-down"></i>
                            </span>
                            <ul class="dropdownclass" v-show="menu.open">
                                <li><input type="text" @keyup="show(index)" v-model="searchQuery" placeholder="搜索相关产品"/></li>
                                <li style="height:25px; "
                                                  v-for="prod in productNameList"
                                                  @click="selectProduct(menu.index, prod.productId); menu.open=false;"
                                                  v-show="isShowLabel(prod.sug)"
                                >{{prod.sug}}
                                </li>
                            </ul>
                        </td>
                    </tr>
                    <tr v-for="(el,index) in labelList" class="dataTr">
                    <td style="border-top:1px solid #ddd" @click="hideDropMenu()">{{el.key}}</td>
                    <td v-for="el in 4" class="table_bg" @click="hideDropMenu()">
                        <span v-html="formatterValue(index, el)"></span>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
    <cyfooter ></cyfooter>
    </div>
</template>

<script>
    import * as API from '../../store/api/api.js'
    import cyheader from '../../components/headandfoot/CyHeader.vue'
    import cyfooter from '../../components/headandfoot/CyFooter.vue'

    export default {
        name: 'Compare',
        data(){
            return {
                productNameList:[],
                // 下拉菜单
                dropdownMenu:[{index:1,open:false},{index:2,open:false},{index:3,open:false},{index:4,open:false}],
                searchQuery:'',
                labelList:[],
                // avalon bug 不能用列表，别删
                compare1:{
                },
                compare2:{
                },
                compare3:{
                },
                compare4:{
                }
            }
        },
        /**
         * 初始化工作
         */
        mounted() {
        	API.$getCompareProductList( res=> {
                this.productNameList = res.body.list;
        	});

            var id = this.$route.params.ids.split("_")
            var p1 = id[0];
            var p2 = id[1];
            var p3 = id[2];
            var p4 = id[3];
            
            API.$getCompareProductData(p1, data=> {
                this.compare1 = data.body.list;
	            this.labelList = data.body.list;
            });
            API.$getCompareProductData(p2, data=> {
                this.compare2 = data.body.list;
            });
            API.$getCompareProductData(p3, data=> {
                this.compare3 = data.body.list;
            });
            API.$getCompareProductData(p4, data=> {
                this.compare4 = data.body.list;
            });

	        if (p1 == 0 && p2 == 0 && p2 == 0 && p2 == 0) {
	            // 没有对比项，默认拿一个，作为key
	            API.$getCompareProductData(1, data=> {
	                this.labelList = data.body.list;
	            });
            }

        },
        methods:{
			/**
			 * 是否显示该标签
			 * @param {Object} productName 产品名
			 */
            isShowLabel: function(productName) {
            	return(productName.indexOf(this.searchQuery) >= 0);
            },
            
            /**
             * 选择一款产品进行对比
             * @param productId 产品id
             */
            selectProduct: function (selectIndex, productId) {
                console.log("selectProduct = " + productId);
                API.$getCompareProductData(productId, res => {
                    var compareProduct = res.body.list;
                    switch (selectIndex) {
                        case 1:
                            this.compare1 = compareProduct;
                            this.$route.params.p1 = productId;
                            break;
                        case 2:
                            this.compare2 = compareProduct;
                            this.$route.params.p2 = productId;
                            break;
                        case 3:
                            this.compare3 = compareProduct;
                            this.$route.params.p3 = productId;
                            break;
                        case 4:
                            this.compare4 = compareProduct;
                            this.$route.params.p4 = productId;
                            break;
                        default:
                            this.compare1 = compareProduct;
                            this.$route.params.p1 = productId;
                            break;
                    }
                });
            },
            /***
             * 格式化表格内容显示
             */
            formatterValue:function(index, compareIndex) {
                var compareObj = this.compare1;
            	switch(compareIndex) {
            		case 1:
            			compareObj = this.compare1;
            		break;
            		case 2:
            			compareObj = this.compare2;
            		break;
            		case 3:
            			compareObj = this.compare3;
            		break;
            		case 4:
            			compareObj = this.compare4;
            		break;
            	}
            	
                if(!compareObj ||!compareObj[index]) {
                	return "-";
                }
                
                var value = compareObj[index].value;
                if(!value) {
                    return "-";
                }
                if (value.indexOf("≤ X ≤") >= 0 && value.indexOf(";") >= 0) {
                    value = value.replace(/;/g, ";<br>");
                }
                return value;
            },

            hideDropMenu:function() {
                for (var i=0;i<this.dropdownMenu.length;i++) {
                    this.dropdownMenu[i].open = false;
                }
            }
        },
        components: {
            cyheader,
            cyfooter,
        },
    }
</script>
<style>
    @import './compare.css';
</style>