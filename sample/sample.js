const AsinScraper = require('../lib/asinScraper')
const asinScraper = AsinScraper();

asinScraper.getAsinInfo("B01N9QVIRV", "ja").then(function(data){
    console.log(data);
});
