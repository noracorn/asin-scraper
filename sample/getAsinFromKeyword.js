const AsinScraper = require('../lib/asinScraper')
const asinScraper = AsinScraper();

// 第一引数がキーワード、第二引数がスクレイピングするマーケット、第三引数が取得するページ数、第四引数が取得データの言語
// The first argument is the keyword, the second argument is the market to be scraped,
// the number of pages to be acquired by the third argument, the fourth argument is the language of the acquisition data
for (var page=1; page<10; page++) {
    asinScraper.getAsinFromKeyword("ワンピース", "ja", page, "ja").then(function(data){
        console.log(data);
    });    
}
