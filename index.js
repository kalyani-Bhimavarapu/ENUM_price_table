var Nightmare = require('nightmare');

const cheerio = require('cheerio');


function getNightmare(checkbox) {
    var nightmare = Nightmare({show: true});
    return nightmare
    .goto('https://enam.gov.in/web/dashboard/trade-data')
    .wait('body')
    .select('select[id="min_max_state"]','276')
    .wait(500)
    .select('input[id="min_max_apmc_from_date"]','2021-03-01')
    .wait(200)
    .select('input[id="min_max_apmc_to_date"]','2021-03-01')
    .click('#refresh')
    .wait(500)
    .select('select[id="min_max_no_of_list"]',checkbox)
     .evaluate(function() {
      return document.querySelector('#enamHome > section.container-fuild.content-section.emandi-sec > div > div > div.row > div.col-md-12.table-responsive').innerHTML;
       })

}

getNightmare(5).then(printLog)
getNightmare(1).then(printLog)


      
function printLog(data){
  console.log(getData(data));
  }


let getData = html => {
  data = [];
  const $ = cheerio.load(html);
  const table = $('#data_list > tr');
  
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
         						
         data.push({
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

       
       return data;
       
      }
                          
          
         

     
      
       


