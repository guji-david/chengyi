/**
 * Created by zhoushengtao on 2017/2/8.
 */

/**
 * 产品列表页的seo头部信息
 * @param categoryId 产品分类id
 * @returns {{categoryId, title, meta}|*}
 */
export function getProductListSeoHeader(categoryId){
    let header = [
        {
            categoryId:0,
            title: "诚壹财富-重新定义理财师",
            meta: [
                { name: 'keywords', content: '诚壹财富，壹财富，壹财富官网，信托产品，信托公司排名，固定资产管理，证券投资基金、私募股权投资' },
                { hid:'description', name: 'description', content: "诚壹财富为广大理财师提供集金融产品采购、风控、法务、教育和运营的一站式服务平台，致力于提高理财顾问的佣金收入、展业效率、知识能力、社会地位。诚壹财富通过网站、微信端 、APP等展业工具，帮助理财师们便捷高效地管理客户，客观公正地为客户提供定制化财富管理服务。不定期开展金融知识讲座、业务能力培训等来提高理财顾问的综合能力。"}
            ]
        },
        {
            categoryId:1,
            title: "信托产品_信托产品收益率_信托是什么_【诚壹财富-信托-信托公司】",
            meta: [
                { hid:'keywords', name: 'keywords', content: '信托，中融信托，平安信托，信托产品收益，四川信托，长安信托，信托公司排名' },
                { hid:'description', name: 'description', content: "诚壹财富信托网，依托信托公司净资本管理办法，严格遵守信托法，联合各大信托基金以及华润信托，中诚信托，华信信托，华宝信托，建信信托，新时代信托，中泰信托，民生信托，大业信托，中铁信托等信托公司，打造中国信托第一信托网。"}
            ]
        },{
            categoryId:2,
            title: '券商集合理财_资产管理_固定资产管理_【诚壹财富-资管计划】',
            meta: [
                { hid:'keywords',name: 'keywords', content: '券商排名，券商，券商佣金，财富管理，资产管理计划，资产管理业务，资管计划，华融资产管理公司，资产管理公司' },
                { hid:'description', name: 'description', content: "诚壹财富资管计划，优选各种稀缺短期低风险资管产品，精选出市场最高收益的工商企业类、金融市场类、征信类、房地产类等资管产品。年预期收益8-13%，100万起购，与80多家资管公司合作，专业投顾服务，13万高净值投资者共同信赖!"}
            ]
        },{
            categoryId:4,
            title: "证券投资基金_证券从业资格考试_证券公司排名_【诚壹财富-证券基金】",
            meta: [
                { hid:'keywords',name: 'keywords', content: '证券基金，重阳投资，辛宇，赵军，王江平，张弢，张云逸，陈家琳，王益聪，施振星，林成栋，裘国根' },
                { hid:'description', name: 'description', content: "诚壹财富深度调研证券机构，解析证券基金经理投资策略，风险分析。基金类型主要包含股票型、债券型、复合型、宏观型、事件驱动、管理期货、组合基金、相对价值等。为广大投资者提供专业、及时、全面的证券基金信息。"}
            ]
        },{
            categoryId:16,
            title: "股权投资_私募股权基金_私募股权投资_【诚壹财富-股权基金】",
            meta: [
                { name: 'keywords', content: '股权基金，股权投资基金，私募基金，阳光私募，私募排行榜，定增，并购基金，产业投资基金，私募基金是什么' },
                { hid:'description', name: 'description', content: "诚壹财富深度研究3000家股权基金机构，深度解析股权基金，精选各类型基金产品，推荐优质股权投资潜力项目，为您提供明星机构跟投机会。"}
            ]
        },{
            categoryId:128,
            title: "海外房产投资_海外基金_【诚壹财富-海外投资】",
            meta: [
                { hid:'keywords',name: 'keywords', content: '全球基金，海外投资，对冲基金，量化基金，CLO，CDO，MBS，美股，美债' },
                { hid:'description', name: 'description', content: "诚壹财富根据长期过往业绩，严格筛选国际大品牌和知名机构，解决资金出境困难、消息壁垒阻碍等问题。规避汇率和市场单一两大类风险。为你的海外资产配置保驾护航！"}
            ]
        }
    ];

    for (var i = 0; i < header.length; i++) {
        if (categoryId == header[i].categoryId) {
            return header[i];
        }
    }
    return header[0];
}

/**
 * 获取详情页seo头部
 * @param prodObj 产品bean
 * @param categoryId 产品分类id
 * @returns {{title: string, meta: *[]}}
 */
export function getDetailPageSeoHeader(prodObj, categoryId) {
    let titlePrefix = [
        {categoryId: 1, title: "-信托产品-诚壹财富"},
        {categoryId: 2, title: "-资产管理公司-诚壹财富"},
        {categoryId: 4, title: "-证券基金-诚壹财富"},
        {categoryId: 16, title: "-股权基金-诚壹财富"},
        {categoryId: 128, title: "-海外资产-诚壹财富"}
    ];
    let seoTitle = prodObj.prodName;
    for (var i = 0; i < titlePrefix.length; i++) {
        if (categoryId == titlePrefix[i].categoryId) {
            seoTitle += titlePrefix[i].title;
        }
    }
    let seoKeyWords = prodObj.prodName + "," + prodObj.investmentHightlights;
    let header = {
        title: seoTitle,
        meta: [
            {  hid:'keywords', name: 'keywords', content: seoKeyWords },
            {  hid:'description', name: 'description', content: "诚壹财富为广大理财师提供集金融产品采购、风控、法务、教育和运营的一站式服务平台，致力于提高理财顾问的佣金收入、展业效率、知识能力、社会地位。诚壹财富通过网站、微信端 、APP等展业工具，帮助理财师们便捷高效地管理客户，客观公正地为客户提供定制化财富管理服务。不定期开展金融知识讲座、业务能力培训等来提高理财顾问的综合能力。"}
        ]
    };

    return header;
}