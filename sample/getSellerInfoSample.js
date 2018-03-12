const AsinScraper = require('../lib/asinScraper')
const asinScraper = AsinScraper();

// 第一引数がSellerID、第二引数がスクレイピングするマーケット、第三引数が取得データの言語
asinScraper.getSellerInfo("AX0TQ79LEBKYW", "ja", "ja").then(function(data){
    console.log(data);
});
