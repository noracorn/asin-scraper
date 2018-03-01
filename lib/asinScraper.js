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

function getAsinInfo(asin, lang) {
    return new Promise((resolve, reject) => {
        const osmosis = require('osmosis')
        let results = [];
        osmosis
            .get('https://www.amazon.com/gp/offer-listing/' + asin)
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

module.exports = function() {
    return {
        getAsinInfo: getAsinInfo
    }
}