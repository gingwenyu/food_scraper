const https = require('https');
const cheerio = require('cheerio');

const url = "https://www.foodpanda.com.tw/chain/cs6ns/ji-ba-fen-ji-pai#restaurant-info"   //https not support
console.log(typeof(url));  //string
https.get(url,(res)=>{
    var html = ""
    res.on("data",(data)=>{
        html+=data
    })

    res.on("end",()=>{
        //console.log(html);
        //以下測試用 ok
        //console.log("0");
        const $ = cheerio.load(html);
        //console.log(html);
        let address = [];
        $('.panel .tab-panel .panel-wrapper .content p.vendor-location').each(function (i, elem) {
          address.push($(this).text());
          console.log(address);
        })
        //console.log("1");
        //以上測試用，可以得到一筆地址
        
    })
}).on("error",(e)=>{
    console.log(`获取数据失败: ${e.message}`)
})




