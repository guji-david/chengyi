module.exports = {
  /*
  ** 头部信息
  */
  head: {
    title: '诚壹财富-重新定义理财师',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid:'keywords', name: 'keywords', content: '诚壹财富，壹财富，壹财富官网，信托产品，信托公司排名，固定资产管理，证券投资基金、私募股权投资' },
      { hid:'description', name: 'description', content: "诚壹财富为广大理财师提供集金融产品采购、风控、法务、教育和运营的一站式服务平台，致力于提高理财顾问的佣金收入、展业效率、知识能力、社会地位。诚壹财富顾问通过网站、微信端 、APP等展业工具，帮助理财师们便捷高效地管理客户，客观公正地为客户提供定制化财富管理服务。不定期开展金融知识讲座、业务能力培训等来提高理财顾问的综合能力。" }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: 'favicon.ico' }
    ],
    script: [
        // 一些统计逻辑
      {type:"text/javascript",src:"https://hm.baidu.com/hm.js?a415b80e1aa80df5e882ee6403c963c8"},
      {type:"text/javascript", src:"http://push.zhanzhang.baidu.com/push.js"},
      {type:"text/javascript", id:"sozz",src:"http://js.passport.qihucdn.com/11.0.1.js?7241e229db08bef7789741a81eb9d279"},
    ]
  },
  css: [
    '~assets/css/global.css',
    '~assets/css/element-cy-theme.css'
  ],
  // 预定义生成静态文件
  generate: {
    routeParams: {
      '/:categoryid/product': [
        { categoryid: 1 },
        { categoryid: 2 },
        { categoryid: 4 },
        { categoryid: 16 },
        { categoryid: 128 }
      ]
    }
  },
  // 服务端渲染缓存
  cache: true,
  // 自定义loading progressbar
  loading: {
    color: '#ff9959',
    height: '2px'
  },
  build: {
    vendor: [
      'axios',
      'element-ui'
    ],
    babel: {
      plugins: [['component', [{
        libraryName: 'element-ui'
      }]]]
    },
    loaders:[
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.less$/,
        loader: "style!css!less"
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        loader: 'url-loader',
        query: {
          limit: 1000, // 1KO
          name: 'img/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 1000, // 1 KO
          name: 'fonts/[name].[hash:7].[ext]'
        }
      }
    ],
    postcss: [
      require('autoprefixer')({
        browsers: ['last 3 versions']
      })
    ]
  },
  plugins: ['~plugins/element-ui'],
}
