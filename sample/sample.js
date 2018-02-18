const AsinScraper = require('../lib/asinScraper')
const asinScraper = AsinScraper();

asinScraper.getAsinInfo("B01N9QVIRV").then(function(data){
    console.log(data);
});
