const AsinScraper = require('../lib/asinScraper')
const asinScraper = AsinScraper();

// Pattern to access once
// １回ずつアクセスするパターン
asinScraper.getAsinInfo("B01MDLKWCX", "ja").then(function(data){
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

// How to access plural in an array
// 複数を配列に入れてアクセする方法
var asinArray = ['B06WRPL9ZY', 'B01A0PVN5A', 'B071JGB2CV', '150670400X', 'B01MDLKWCX'];
var scrapeArray = []
asinArray.forEach(element => {
    scrapeArray.push(asinScraper.getAsinInfo(element, "ja"))
});

Promise.all(scrapeArray).then(function(data) {
    console.log(data);
});
