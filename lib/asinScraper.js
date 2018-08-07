function formatByArr(msg) {
    var args = [];
    for (var i = 1; i < arguments.length; i++) {
        args[i - 1] = arguments[i];
    }
    return msg.replace(/\{(\d+)\}/g, function (m, k) {
        return args[k];
    });
};

function convertJapanes(item) {
    var condition = item['condition'];
    if (condition.match(/Like New/)) {
        item['condition'] = "新品同様";
        return item;
    } else if (condition.match(/New/)) {
        item['condition'] = "新品";
        return item;
    } else if (condition.match(/Very Good/)) {
        item['condition'] = "とても良い";
        return item;
    } else if (condition.match(/Good/)) {
        item['condition'] = "良い";
        return item;
    } else if (condition.match(/Refurbished/)) {
        item['condition'] = "リファービッシュ";
        return item;
    } else if (condition.match(/Acceptable/)) {
        item['condition'] = "可";
        return item;
    } else {
        item['condition'] = "該当なし";
        return item;
    }
    return item;
}

// ASINから値段などのセラーの情報を取得する
// Acquire seller's information such as price from ASIN
function getAsinInfo(asin, targetMarket, lang) {
    var marketUrl = {};
    marketUrl['ja'] = {url: 'https://www.amazon.co.jp/gp/offer-listing/'};
    marketUrl['us'] = {url: 'https://www.amazon.com/gp/offer-listing/'};
    marketUrl['de'] = {url: 'https://www.amazon.de/gp/offer-listing/'}
    if (!targetMarket) {
        targetMarket = 'ja';
    }

    return new Promise((resolve, reject) => {
        const osmosis = require('osmosis')
        let results = [];
        osmosis
            .get(marketUrl[targetMarket]['url'] + asin)
            .find('.olpOffer')
            .set({
                price: '.olpPriceColumn span text()',
                shipping_price: '.olpPriceColumn .olpShippingInfo .a-color-secondary .olpShippingPrice text()',
                condition: ".olpConditionColumn .olpCondition text()",
                shop_name: '.olpSellerName span a text()',
                rating_persent: '.a-spacing-small a b text()',
            })
            .data(function(item) {
                // example en, ja
                item['ASIN'] = asin;
                if (lang == "en") {
                    results.push(item);
                } else if (lang == "ja") {
                    item = convertJapanes(item);
                    results.push(item);
                }
            })
            .done(() => resolve(results));
    });
};

// セラーページの1ページ目からASINを取得する
// Acquire the ASIN from the first page of the seller page
function getSellerInfo(sellerId, targetMarket, lang) {
    var marketUrl = {};
    marketUrl['ja'] = {url: 'https://www.amazon.co.jp/s?me='};
    marketUrl['us'] = {url: 'https://www.amazon.com/s?me='};
    marketUrl['de'] = {url: 'https://www.amazon.de/s?me='};
    if (!targetMarket) {
        targetMarket = 'ja';
    }
    
    return new Promise((resolve, reject) => {
        const osmosis = require('osmosis')
        let results = [];
        osmosis
            .get(marketUrl[targetMarket]['url'] + sellerId)
            .paginate('#pagnNextLink', 100)
            .find('.s-result-card-for-container-noborder')
            .set({
                asin: '@data-asin',
            })
            .data(function(item) {
                var link = item['asin'];
                results.push(item);
            })
            .done(() => resolve(results));
    });
};

// キーワードからAISNを取得する
function getAsinFromKeyword(keyword, targetMarket, page, lang) {
    var marketUrl = {};
    marketUrl['ja'] = {url: 'https://www.amazon.co.jp/s/ref=?&page={0}&keywords={1}'};
    marketUrl['us'] = {url: 'https://www.amazon.com/s/ref=?&page={0}&keywords={1}'};
    marketUrl['de'] = {url: 'https://www.amazon.de/s/ref=?&page={0}&keywords={1}'};
    if (!targetMarket) {
        targetMarket = 'ja';
    }
    
    return new Promise((resolve, reject) => {
        const osmosis = require('osmosis')
        let results = [];
        osmosis
            .get(formatByArr(marketUrl[targetMarket]['url'], page, encodeURIComponent(keyword)))
            .find('.s-result-item')
            .set({
                asin: '@data-asin',
            })
            .data(function(item) {
                results.push(item);
            })
            .done(() => resolve(results));
    });
};

module.exports = function() {
    return {
        getAsinInfo: getAsinInfo,
        getSellerInfo: getSellerInfo,
        getAsinFromKeyword: getAsinFromKeyword
    }
}