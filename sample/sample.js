const AsinScraper = require('../lib/asinScraper')
const asinScraper = AsinScraper();

asinScraper.getAsinInfo("B06WRPL9ZY", "ja").then(function(data){
    // We will issue 1 page of seller's information
    // 販売者の情報を1ページ出します
    console.log("---------getAsinInfo--------");
    console.log(data);
    console.log("----------------------------");

    // We will provide the lowest price information
    // 最安値の情報を出します
    console.log("---------lowest price--------");
    console.log(data[0]);
    console.log("-----------------------------");

    // We will issue information on the new lowest price
    // 新品の最安値の情報を出します
    console.log("---------New item's lowest price--------");
    for (var index = 0; index < data.length; index++){
        if (data[index]['condition'] == "新品") {
            console.log(data[index]);
            break;
        }
    }
    console.log("-----------------------------");

    // We will show the lowest price of second hand goods.
    // 中古品の最安値を出します。
    console.log("---------Lowest price of second hand goods--------");
    for (var index = 0; index < data.length; index++){
        if (data[index]['condition'] != "新品") {
            console.log(data[index]);
            break;
        }
    }
    console.log("-----------------------------");

});
