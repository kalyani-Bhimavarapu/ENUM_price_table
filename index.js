var Nightmare = require('nightmare')
var vo = require('vo')
const cheerio = require('cheerio');

vo(run)(function(err, result) {
  if (err) throw err

  result.forEach(function (text) {
    console.log('#enamHome > section.container-fuild.content-section.emandi-sec > div > div > div.row > div.col-md-12.table-responsive: ', text)
  })
})

function *run() {
  var nightmare = Nightmare();
  yield nightmare
  .goto('https://enam.gov.in/web/dashboard/trade-data')
  .wait('body')
  .select('select[id="min_max_state"]','276')
  .wait(500)
  .select('input[id="min_max_apmc_from_date"]','2021-03-01')
  .wait(200)
  .select('input[id="min_max_apmc_to_date"]','2021-03-01')
  .click('#refresh')

  for (var i = 0; i < 13; i++) {
    yield nightmare
     .goto('https://enam.gov.in/web/dashboard/trade-data')
     .wait(500)
     .select('select[ form-control mandi-pagi]','i')
     .wait(500)
      .evaluate(function(){
        return $('#enamHome > section.container-fuild.content-section.emandi-sec > div > div > div.row > div.col-md-12.table-responsive'.innerHTML)
      })
  }

  yield nightmare.end().then(response => {
    console.log(getData(response));
  }).catch(err => {
    console.log(err);

  });
}
 
let getData = html => {
  data = [];
  const $ = cheerio.load(html);
  const table = $('#data_list > tr');
       console.log(table.length);

       const result = [];

       table.each(function () {
         const State = $(this).find('td:nth-child(1)').text();
         const APMCs = $(this).find('td:nth-child(2)').text();
         const Commodity = $(this).find('td:nth-child(3)').text();
         const MinPrice = $(this).find('td:nth-child(4)').text();
         const ModalPrice = $(this).find('td:nth-child(5)').text();
         const MaxPrice = $(this).find('td:nth-child(6)').text();
         const CommodityArrivals = $(this).find('td:nth-child(7)').text();
         const CommodityTraded = $(this).find('td:nth-child(8)').text();
         const Unit = $(this).find('td:nth-child(9)').text();
         const Date = $(this).find('td:nth-child(10)').text();
         						
         result.push({
                    State,
                    APMCs,
                    Commodity,
                    MinPrice,
                    ModalPrice,
                    MaxPrice,
                    CommodityArrivals,
                    CommodityTraded,
                    Unit,
                    Date
               });
           });

       console.log(result); 

 }
          
         

     
      
       


