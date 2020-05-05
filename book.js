const request = require('request');
const cheerio = require('cheerio');
const ObjectsToCsv = require('objects-to-csv');  // npm install objects-to-csv  --save

const url = "https://www.books.com.tw/web/sys_tdrntb/books/?loc=subject_003";

request(url, (err, res, body) => {
    const $ = cheerio.load(body);
    //console.log($(".type02_bd-a ul li.price_a").text());  //測試用
    let books = [];
    let author = [];
    let price = [];
    $('h4 a').each(function(i, elem) {
        books.push($(this).text());        
    })
    $('.type02_bd-a ul li a').each(function(i, elem) {
        author.push($(this).text());        
    })
    $('.type02_bd-a ul li.price_a').each(function(i, elem) {
        price.push($(this).text());        
    })
   
    
    for (let i = 0; i < books.length; i++) {        
        const data = [{
            id: i + 1,
            name: books[i],
            author: author[i],
            price: price[i],
            
        }];
        console.log(data);

        //寫入csv
        const csv = new ObjectsToCsv(data);
        csv.toDisk('./list.csv', { append: true });  //true是覆蓋原檔
        
    }
        console.log('資料寫入完成');

})
