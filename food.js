const request = require('request');  // npm install request  --save  
const cheerio = require('cheerio');  // npm install cheerio  --save
const ObjectsToCsv = require('objects-to-csv');  // npm install objects-to-csv  --save
const https = require('https');


//const url = "https://www.foodpanda.com.tw/city/new-taipei-city";
//const url = "https://www.foodpanda.com.tw/restaurants/lat/25.0141846/lng/121.4637528/city/%E6%9D%BF%E6%A9%8B%E5%8D%80/address/%25E6%259D%25BF%25E6%25A9%258B%25E8%25BB%258A%25E7%25AB%2599%252C%2520220%25E5%258F%25B0%25E7%2581%25A3%25E6%2596%25B0%25E5%258C%2597%25E5%25B8%2582%25E6%259D%25BF%25E6%25A9%258B%25E5%258D%2580%25E7%25B8%25A3%25E6%25B0%2591%25E5%25A4%25A7%25E9%2581%2593%25E4%25BA%258C%25E6%25AE%25B57%25E8%2599%259F/%25E7%25B8%25A3%25E6%25B0%2591%25E5%25A4%25A7%25E9%2581%2593%25E4%25BA%258C%25E6%25AE%25B5/7%2520%25E6%259D%25BF%25E6%25A9%258B%25E8%25BB%258A%25E7%25AB%2599?postcode=220";
//const url = "https://www.foodpanda.com.tw/restaurants/lat/25.036125/lng/121.452468/city/%E6%96%B0%E8%8E%8A%E5%8D%80/address/%25E6%2596%25B0%25E8%258E%258A%25E7%25AB%2599%252C%2520242%25E5%258F%25B0%25E7%2581%25A3%25E6%2596%25B0%25E5%258C%2597%25E5%25B8%2582%25E6%2596%25B0%25E8%258E%258A%25E5%258D%2580%25E4%25B8%25AD%25E6%25AD%25A3%25E8%25B7%25AF138%25E8%2599%259FB1/%25E4%25B8%25AD%25E6%25AD%25A3%25E8%25B7%25AF/138%2520%25E6%2596%25B0%25E8%258E%258A%25E7%25AB%2599?postcode=242&verticalTab=restaurants";
//const url = "https://www.foodpanda.com.tw/restaurants/lat/25.0066732/lng/121.4747785/city/%E4%B8%AD%E5%92%8C%E5%8D%80/address/235%25E5%258F%25B0%25E7%2581%25A3%25E6%2596%25B0%25E5%258C%2597%25E5%25B8%2582%25E4%25B8%25AD%25E5%2592%258C%25E5%258D%2580%25E4%25B8%25AD%25E5%25B1%25B1%25E8%25B7%25AF%25E4%25B8%2589%25E6%25AE%25B5122%25E8%2599%259F/%25E4%25B8%25AD%25E5%25B1%25B1%25E8%25B7%25AF%25E4%25B8%2589%25E6%25AE%25B5/122?postcode=235&verticalTab=restaurants";
//const url = "https://www.foodpanda.com.tw/restaurants/lat/25.0029495/lng/121.4987411/city/%E4%B8%AD%E5%92%8C%E5%8D%80/address/235%25E5%258F%25B0%25E7%2581%25A3%25E6%2596%25B0%25E5%258C%2597%25E5%25B8%2582%25E4%25B8%25AD%25E5%2592%258C%25E5%258D%2580%25E4%25B8%25AD%25E5%25B1%25B1%25E8%25B7%25AF%25E4%25BA%258C%25E6%25AE%25B5228%25E8%2599%259F/%25E4%25B8%25AD%25E5%25B1%25B1%25E8%25B7%25AF%25E4%25BA%258C%25E6%25AE%25B5/228?postcode=235&verticalTab=restaurants";
//const url = "https://www.foodpanda.com.tw/restaurants/lat/25.0023426/lng/121.5109643/city/%E4%B8%AD%E5%92%8C%E5%8D%80/address/235%25E5%258F%25B0%25E7%2581%25A3%25E6%2596%25B0%25E5%258C%2597%25E5%25B8%2582%25E4%25B8%25AD%25E5%2592%258C%25E5%258D%2580%25E4%25B8%25AD%25E5%2592%258C%25E8%25B7%25AF388%25E8%2599%259F/%25E4%25B8%25AD%25E5%2592%258C%25E8%25B7%25AF/388?postcode=235&verticalTab=restaurants";
//const url = "https://www.foodpanda.com.tw/restaurants/lat/25.032323/lng/121.4741372/city/Banqiao%20District/address/No.%2520413%252C%2520Section%25202%252C%2520Wenhua%2520Road%252C%2520Banqiao%2520District%252C%2520New%2520Taipei%2520City%252C%2520Taiwan%2520220/Section%25202%252C%2520Wenhua%2520Road/413?postcode=220&verticalTab=restaurants";
//const url = "https://www.foodpanda.com.tw/restaurants/lat/25.0634787/lng/121.4890227/city/%E4%B8%89%E9%87%8D%E5%8D%80/address/241%25E5%258F%25B0%25E7%2581%25A3%25E6%2596%25B0%25E5%258C%2597%25E5%25B8%2582%25E4%25B8%2589%25E9%2587%258D%25E5%258D%2580%25E4%25B8%25AD%25E6%25AD%25A3%25E5%258C%2597%25E8%25B7%25AF107%25E8%2599%259F/%25E4%25B8%25AD%25E6%25AD%25A3%25E5%258C%2597%25E8%25B7%25AF/107?postcode=241&verticalTab=restaurants";
//const url = "https://www.foodpanda.com.tw/restaurants/lat/25.08035/lng/121.479925/city/%E8%98%86%E6%B4%B2%E5%8D%80/address/247%25E5%258F%25B0%25E7%2581%25A3%25E6%2596%25B0%25E5%258C%2597%25E5%25B8%2582%25E8%2598%2586%25E6%25B4%25B2%25E5%258D%2580%25E4%25B8%25AD%25E5%25B1%25B1%25E4%25B8%2580%25E8%25B7%25AF3%25E8%2599%259F/%25E4%25B8%25AD%25E5%25B1%25B1%25E4%25B8%2580%25E8%25B7%25AF/3?postcode=247&verticalTab=restaurants"; 
//const url ="https://www.foodpanda.com.tw/restaurants/lat/25.0341755/lng/121.4995373/city/%E8%90%AC%E8%8F%AF%E5%8D%80/address/108%25E5%258F%25B0%25E7%2581%25A3%25E5%258F%25B0%25E5%258C%2597%25E5%25B8%2582%25E8%2590%25AC%25E8%258F%25AF%25E5%258D%2580%25E8%25A5%25BF%25E5%259C%2592%25E8%25B7%25AF%25E4%25B8%2580%25E6%25AE%25B5187%25E8%2599%259F/%25E8%25A5%25BF%25E5%259C%2592%25E8%25B7%25AF%25E4%25B8%2580%25E6%25AE%25B5/187?postcode=108&verticalTab=restaurants";
//const url ="https://www.foodpanda.com.tw/restaurants/lat/25.0336009/lng/121.5292686/city/%E5%A4%A7%E5%AE%89%E5%8D%80/address/106%25E5%258F%25B0%25E7%2581%25A3%25E5%258F%25B0%25E5%258C%2597%25E5%25B8%2582%25E5%25A4%25A7%25E5%25AE%2589%25E5%258D%2580%25E4%25BF%25A1%25E7%25BE%25A9%25E8%25B7%25AF%25E4%25BA%258C%25E6%25AE%25B5166%25E8%2599%259F/%25E4%25BF%25A1%25E7%25BE%25A9%25E8%25B7%25AF%25E4%25BA%258C%25E6%25AE%25B5/166?postcode=106&verticalTab=restaurants";
//const url ="https://www.foodpanda.com.tw/restaurants/lat/25.0521912/lng/121.5221371/city/%E4%B8%AD%E5%B1%B1%E5%8D%80/address/10491%25E5%258F%25B0%25E7%2581%25A3%25E5%258F%25B0%25E5%258C%2597%25E5%25B8%2582%25E4%25B8%25AD%25E5%25B1%25B1%25E5%258D%2580%25E5%258D%2597%25E4%25BA%25AC%25E8%25A5%25BF%25E8%25B7%25AF16d%25E8%2599%259F/%25E5%258D%2597%25E4%25BA%25AC%25E8%25A5%25BF%25E8%25B7%25AF/16d?postcode=10491&verticalTab=restaurants";
//const url ="https://www.foodpanda.com.tw/restaurants/lat/25.0519292/lng/121.5440212/city/%E6%9D%BE%E5%B1%B1%E9%8E%AE/address/10550%25E5%258F%25B0%25E7%2581%25A3%25E5%258F%25B0%25E5%258C%2597%25E5%25B8%2582%2520%25E6%259D%25BE%25E5%25B1%25B1%25E9%258E%25AE%252C%2520%25E5%258D%2597%25E4%25BA%25AC%25E6%259D%25B1%25E8%25B7%25AF%25E4%25B8%2589%25E6%25AE%25B5253%25E8%2599%259F%25E5%258D%2597%25E4%25BA%25AC%25E5%25BE%25A9%25E8%2588%2588%25E7%25AB%2599/%25E5%258D%2597%25E4%25BA%25AC%25E6%259D%25B1%25E8%25B7%25AF%25E4%25B8%2589%25E6%25AE%25B5/253%25E8%2599%259F%2520%25E5%258D%2597%25E4%25BA%25AC%25E5%25BE%25A9%25E8%2588%2588%25E7%25AB%2599?postcode=10550&verticalTab=restaurants";
const url ="https://www.foodpanda.com.tw/restaurants/lat/25.0261461/lng/121.5436466/city/%E5%A4%A7%E5%AE%89%E5%8D%80/address/106%25E5%258F%25B0%25E7%2581%25A3%25E5%258F%25B0%25E5%258C%2597%25E5%25B8%2582%25E5%25A4%25A7%25E5%25AE%2589%25E5%258D%2580%25E5%25BE%25A9%25E8%2588%2588%25E5%258D%2597%25E8%25B7%25AF%25E4%25BA%258C%25E6%25AE%25B5235%25E8%2599%259F/%25E5%25BE%25A9%25E8%2588%2588%25E5%258D%2597%25E8%25B7%25AF%25E4%25BA%258C%25E6%25AE%25B5/235?postcode=106&verticalTab=restaurants";

request(url, (err, res, body) => {
    const $ = cheerio.load(body);   

    //console.log($("ul li .hreview-aggregate.url").attr("href"));  //class="hreview-aggregate url"  一筆資料
    //console.log($("ul li a figure figcaption span.headline").text());  //foodpanda 店家小標測試ok
    // console.log($("ul li a figure figcaption span span.name.fn").text());  //店名測試ok name.fn 原本中間空格改成加.
    // console.log($("ul li a figure figcaption span div span.rating").text());  //評價測試ok 
    // console.log($("ul li a figure figcaption span div span.count").text());  //評價2測試ok 
    // console.log($("ul li a figure figcaption ul.categories.summary").text());  //測試ok，待整理
               
    let store = [];
    let rate = [];
    let count = [];
    //let note = [];
    let href = [];

    $('ul li a figure figcaption span span.name.fn').each(function(i, elem) {
        store.push($(this).text());        
    })
    $('ul li a figure figcaption span div span.rating').each(function(i, elem) {
        rate.push($(this).text());        
    })
    $('ul li a figure figcaption span div span.count').each(function(i, elem) {
        count.push($(this).text());        
    })
    // $('ul li a figure figcaption ul.categories.summary').each(function(i, elem) {
    //     note.push($(this).text());        
    // })
    $('ul li .hreview-aggregate.url').each((index, value) => {
        let link = $(value).attr('href');
        href.push(link);
    });    

    for (let i = 0; i < store.length; i++) {
        
        const data = [{
            id: i + 1,
            name: store[i],
            rate: rate[i],
            link: "https://www.foodpanda.com.tw" + href[i]
            //count: count
        }];
        // console.log(data);  //typeof(data) is object
            
        const linkList = data.map(item => Object.values(item)[3]);  // 
        //console.log(linkList[0], typeof (linkList[0]));  //ok all link, string
                                
        //以下待確認 二次爬蟲 
        const urlInnerpage = linkList;       
        //以下測試linkList object2string plus for loop
        // console.log(linkList, typeof (linkList), typeof (linkList[0]));  //  [], object, string
         console.log(linkList[0]);  //all address    
         console.log(linkList[1]);  //undefined  
        // let teststr=linkList[0].split("/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/");
        // console.log(teststr[0]);

        /* 需要 http(s) protocol */
        // /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/
        /* 不需要 http(s) protocol */
        // / [-a - zA - Z0 - 9@:%._\+~#=]{ 2, 256 } \.[a - z]{ 2, 6 } \b([-a - zA - Z0 - 9@:% _\+.~#?&//=]*)/         
        
        //以上測試
        https.get(urlInnerpage, (res) => {
            var html = ""
            res.on("data", (data) => {
                html += data
            })

            res.on("end", () => {                
                const $ = cheerio.load(html);
                //console.log(html);                
                let address = [];
                $('.panel .tab-panel .panel-wrapper .content p.vendor-location').each(function (i, elem) {
                    address.push($(this).text());
                    console.log(address);
                })                

            })
        }).on("error", (e) => {
            //console.log(`获取数据失败: ${e.message}`)
        })
        
        
        
        // //寫入csv
        // const csv = new ObjectsToCsv(data);
        // csv.toDisk('./科技大樓站list2.csv', { append: true });  //true是覆蓋原檔
        
    
    }
        // console.log('資料寫入完成');
        
})
