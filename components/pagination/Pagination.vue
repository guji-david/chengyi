<template>
    <div class="page-bar">
        <ul>
            <li><button :class="pageIndex==1?'clickabled':''" @click="pre">上一页</button></li>
            <li>{{pageIndex}} / {{all}} </li>
            <li v-if="pageIndex!=all"><button :class="pageIndex==all?'clickabled':''" @click="next">下一页</button></li>
            <li class="page-tonum">
                到<input type="text" @keyup.enter="goNumPage" v-model="toPage">页
                <button type="text" @click="goNumPage">确定</button>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                toPage: 1
            }
        },
        props: {
            pageIndex: {
                type: Number,
                default: 1
            },
            /*all: {
             type: Number,
             default: 1
             },*/
            total: {
                type: Number,
                default: 1
            },
            pageSize: {
                type: Number,
                default: 20
            }
        },
        computed: {
            all () {
                return Math.ceil(this.total / this.pageSize)
            },
            items () {
                let [left, right, ar] = [1, this.all, []]
                if (this.all >= 11) {
                    if (this.pageIndex > 5 && this.pageIndex < this.all - 4) {
                        [left, right] = [this.pageIndex - 5, this.pageIndex + 4]
                    } else {
                        if (this.pageIndex <= 5) {
                            [left, right] = [1, 10]
                        } else {
                            [left, right] = [this.all - 9, this.all]
                        }
                    }
                }
                while (left <= right) {
                    ar.push(left)
                    left++
                }
                return ar
            }
        },
        methods: {
            pre () {
                if (this.pageIndex <= 1) {
                    return;
                }
                this.pageIndex--
                this.$emit('current-change', this.pageIndex)
            },
            next () {
                if (this.pageIndex >= this.items.length) {
                    return;
                }
                this.pageIndex++
                this.$emit('current-change', this.pageIndex)
            },
            go (index) {
                if(index > this.items.length ) {
                    this.pageIndex = this.items.length
                    this.toPage = this.items.length
                    this.$emit('current-change', this.items.length)
                } else if (index != this.pageIndex) {
                    this.pageIndex = index
                    this.$emit('current-change', index)
                }
            },
            goNumPage () {
                if (/(^[1-9][0-9]*$)/.test(this.toPage)) {
                    if (this.toPage > this.items.length) {
                        this.toPage = this.items.length
                    }
                    this.go(this.toPage)
                } else {
                    this.toPage = this.pageIndex
                }
            }
        }
    }
</script>

<style lang="stylus">
    .page-bar {
        width: 100%;
    }

    .page-bar ul {
        margin-left: 350px;
        overflow: hidden;
    }

    .page-bar li {
        list-style: none;
        float: left;
        line-height: 32px;
    }

    .page-bar li:first-child > a {
        margin-left: 0px
    }

    .page-bar button {
        border: 1px solid #ddd;
        text-decoration: none;
        height: 30px;
        line-height: 0px;
        margin: 0px 18px;
        padding: 6px 12px;
        border-radius: 4px;
        color: #666;
        background-color: white;
    }

    .page-bar button:hover{
        color: #ff9959;
        border-color: #ff9959;
    }
    .page-bar button.clickabled{
        color: white;
        background-color: #ccc;
    }

    .page-bar li.page-tonum a {
        padding: 6px;
        border-radius: 6px;
        background-color: #25263E;
        float: none;
        color: whitesmoke;
    }

    .page-bar li.page-tonum input {
        width: 76px;
        margin: -4px 6px 0px 6px;
        border: 1px solid #ccc;
        border-radius: 4px;
        height: 30px;
        background-color: white;
        text-align: center;
    }

    .page-bar a:hover {
        background-color: #eee;
    }

    .page-bar .active a {
        color: #fff;
        pageIndexsor: default;
        background-color: #337ab7;
        border-color: #337ab7;
    }

    .page-bar i {
        font-style: normal;
        color: #d44950;
        margin: 0px 4px;
        font-size: 12px;
    }
</style>