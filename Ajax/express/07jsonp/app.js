// 1.引入express
const express = require('express');

// 2. 创建应用对象
const app = express();

// 3.创建路由规则
// request是对请求报文的封装
// response是对响应报文的封装
app.get('/jsonp-server', (request, response) => {
    // 响应一个页面
    // response.send('console.log("hello jsonp server")');
    const data = {
        name: 'wh',
        age: '18'
    };
    let str = JSON.stringify(data);
    response.end(`handle(${str})`);
});

// 4.监听端口启动服务
app.listen(8000, ()=>{
    console.log("服务已经启动，8000端口监听中......");
})