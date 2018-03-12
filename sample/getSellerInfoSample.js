const AsinScraper = require('../lib/asinScraper')
const asinScraper = AsinScraper();

asinScraper.getSellerInfo("A1XQ1OPCZIAF4U", "ja").then(function(data){
    console.log(data);
});
