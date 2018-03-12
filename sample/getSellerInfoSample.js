const AsinScraper = require('../lib/asinScraper')
const asinScraper = AsinScraper();

// 第一引数がSellerID、第二引数がスクレイピングするマーケット、第三引数が取得データの言語
// The first argument is SellerID, the second argument is the market to scrape,
// the third argument is the language of the retrieved data
asinScraper.getSellerInfo("AX0TQ79LEBKYW", "ja", "ja").then(function(data){
    console.log(data);
});
