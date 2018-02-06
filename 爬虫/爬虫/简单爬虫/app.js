const express = require('express'),
    superagent = require('superagent'),// 超级代理
    // 是一个http方面的库(http://visionmedia.github.io/superagent/ )它可以发送请求


    cheerio = require('cheerio') // 好呀，加油，恭喜，再见
    // cheerio(https://github.com/cheeriojs/cheerio ) 大家可以理解成一个 Node.js 版的 jquery，
    // 用来从网页中以 css selector 取数据
    


const app = express()

app.get('/', function (req, res, next) {
    // 用 superagent 去抓取 https://cnodejs.org/ 的内容
    superagent.get('https://cnodejs.org/')
    // superagent.get('http://geek.csdn.net/')
        .end(function (err, sres) {
            // 常规的错误处理
            if (err) {
                return next(err);
            }
            // sres.text 里面存储着网页的 html 内容，将它传给 cheerio.load 之后
            // 就可以得到一个实现了 jquery 接口的变量，我们习惯性地将它命名为 `$`
            // 剩下就都是 jquery 的内容了
            // console.log(sres)
            // console.log(sres.text)
            var $ = cheerio.load(sres.text);
            console.log($)
            var items = [];
            $('#topic_list .topic_title').each(function (idx, element) {
            // $('#geek_list .tracking-ad .title').each(function (idx, element) {
                var $element = $(element);
                items.push({
                    title: $element.attr('title'),
                    // title: $element.text(),
                    href: $element.attr('href')
                });
            });

            res.send(items);
        });
});

app.listen(3000, () => console.log('Running...'))
