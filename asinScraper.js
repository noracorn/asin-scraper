exports.getAsinInfo = function(asin) {
    return new Promise((resolve, reject) => {
        const osmosis = require('osmosis')
        let results = [];
    
        // osmosis
        //   .get('https://www.amazon.com/dp/B072J2J26T')
        //   .find('.olp-padding-right')
        //   .set({
        //     users: 'a text()',
        //     price: 'span text()',
        //   })
        //   .data(
        //       item => console.log(item)
        //     );
        
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
            .data(item => results.push(item))
            .done(() => resolve(results));
    });
};
