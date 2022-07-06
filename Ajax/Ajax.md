# 一、简介
## 1.1 AJAX简介
Ajax(Asynchronous JavaScript And XML)，就是异步的JS和XML

通过Ajax可以在浏览器中向服务器发送异步请求

**其最大的优势就是可以不刷新网页从而获取数据**

Ajax不是新的编程语言，而是一种将现有的标准组合在一起使用的新方式

## 1.2 XML简介
XML是一种可扩展的标记语言

XML被设计用来传输和存储数据

XML和HTML类似，不同的是，html中都是预定义标签，而xml中没有预定义标签，都是自定义标签。

**但是现在已经被JSON取代了**

## 1.3 AJAX特点
### 1.3.1 AJAX的优点
1. 可以无需刷新页面而与服务端进行通信
2. 允许你根据用户事件来更新部分页面问题

### 1.3.2 AJAX的缺点
1.  没有浏览历史，不能回退
2.  存在跨域问题（同源）
3.  SEO不友好，也就是搜索引擎优化，因为AJAX不能够被爬虫，网页源代码中找不到它，它是从服务器端的请求来的

## 1.4 http协议
http（hypertext transport protocol），超文本传输协议，协议详细规定了浏览器和万维网服务器之间的互相通信规则

### 1.4.1 请求报文
重点是格式与参数
```
行      POST /s?ie=ytf-8    HTTP/1.1
头      Host: guigu.com
        Cookie: name=guigu
        Content-Type: application/x-www-form-urlencoded
        User-Agent: chrome 83
空行
体      username=admin&password=admin
```

### 1.4.2 响应报文
```
行      HTTP/1.1 200 OK
头      Content-Type:text/html;charset=utff-8
        Content-length:2048
        Content-encoding:gzip
空行
体      html结构
```

### 1.4.3 查看请求报文和响应报文
f12 --> network --> Headers
Request Headers：请求头
Response Headers:响应头
Query String Parameters:查询字符串参数，对参数进行可视化，具体的可视化区域是utf-8区域的参数，也就是**请求行的内容**

f12 --> network --> Response:看具体的响应体

对于post请求，会通过Form Data来将用户名和密码传送给服务器

### 1.4.4 get/post
GET一般用于获取/查询资源信息，而POST一般用于更新资源信息.
#### 1.4.4.1 GET
当客户端要从服务器中读取文档时，当点击网页上的链接或者通过在浏览器的地址栏输入网址来浏览网页的，使用的都是GET方式。
GET方法要求服务器将URL定位的资源放在响应报文的数据部分，回送给客户端。

使用GET方法时，请求参数和对应的值附加在URL后面，利用一个问号(“?”)代表URL的结尾与请求参数的开始，传递参数长度受限制。
```html
例如，/index.jsp?id=100&op=bind,这样通过GET方式传递的参数直接表示在地址中
 
以用google搜索domety为例，Request报文如下：
 
GET /search?hl=zh-CN&source=hp&q=domety&aq=f&oq= HTTP/1.1
Accept: image/gif, image/x-xbitmap, image/jpeg, image/pjpeg, application/vnd.ms-excel, application/vnd.ms-powerpoint,
application/msword, application/x-silverlight, application/x-shockwave-flash, */*
Referer: <a href="http://www.google.cn/">http://www.google.cn/</a>
Accept-Language: zh-cn
Accept-Encoding: gzip, deflate
User-Agent: Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1; .NET CLR 2.0.50727; TheWorld)
Host: <a href="http://www.google.cn">www.google.cn</a>
Connection: Keep-Alive
Cookie: PREF=ID=80a06da87be9ae3c:U=f7167333e2c3b714:NW=1:TM=1261551909:LM=1261551917:S=ybYcq2wpfefs4V9g; NID=31=ojj8d-IygaEtSxLgaJmqSjVhCspkviJrB6omjamNrSm8lZhKy_yMfO2M4QMRKcH1g0iQv9u-2hfBW7bUFwVh7pGaRUb0RnHcJU37y-FxlRugatx63JLv7CWMD6UB_O_r
```
可以看到，GET方式的请求一般不包含”请求内容”部分，请求数据以地址的形式表现在请求行。地址链接如下：
`<a href="http://www.google.cn/search?hl=zh-CN&source=hp&q=domety&aq=f&oq=">http://www.google.cn/search?hl=zh-CN&source=hp&q=domety&aq=f&oq=</a> `

地址中”?”之后的部分就是**通过GET发送的请求数据**，在地址栏中可以看到，各个数据之间用”&”符号隔开。
**很显然，这种方式不适合传送私密数据。**
另外，由于不同的浏览器对地址的字符限制也有所不同，一般最多只能识别1024个字符，所以如果需要传送大量数据的时候，也不适合使用GET方式。

#### 1.4.4.2 POST
对于上面提到的不适合使用GET方式的情况，可以考虑使用POST方式，因为使用POST方法可以允许客户端给服务器提供信息较多。POST方法将请求参数封装在HTTP请求数据中，以名称/值的形式出现，可以传输大量数据，这样POST方式对传送的数据大小没有限制，而且也不会显示在URL中。还以上面的搜索domety为例，如果使用POST方式的话，格式如下：
```HTML
POST /search HTTP/1.1 
Accept: image/gif, image/x-xbitmap, image/jpeg, image/pjpeg, application/vnd.ms-excel, application/vnd.ms-powerpoint, 
application/msword, application/x-silverlight, application/x-shockwave-flash, */* 
Referer: <a href="http://www.google.cn/">http://www.google.cn/</a> 
Accept-Language: zh-cn 
Accept-Encoding: gzip, deflate 
User-Agent: Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1; .NET CLR 2.0.50727; TheWorld) 
Host: <a href="http://www.google.cn">www.google.cn</a> 
Connection: Keep-Alive 
Cookie: PREF=ID=80a06da87be9ae3c:U=f7167333e2c3b714:NW=1:TM=1261551909:LM=1261551917:S=ybYcq2wpfefs4V9g; NID=31=ojj8d-IygaEtSxLgaJmqSjVhCspkviJrB6omjamNrSm8lZhKy_yMfO2M4QMRKcH1g0iQv9u-2hfBW7bUFwVh7pGaRUb0RnHcJU37y-FxlRugatx63JLv7CWMD6UB_O_r
 
hl=zh-CN&source=hp&q=domety
```

可以看到，POST方式请求行中不包含数据字符串，这些数据保存在”请求内容”部分，各数据之间也是使用”&”符号隔开。
POST方式大多用于页面的表单中。因为POST也能完成GET的功能，因此多数人在设计表单的时候一律都使用POST方式，其实这是一个误区。
GET方式也有自己的特点和优势，我们应该根据不同的情况来选择是使用GET还是使用POST。

#### 1.4.4.3 HEAD
HEAD就像GET，只不过服务端接受到HEAD请求后只返回响应头，而不会发送响应内容。当我们只需要查看某个页面的状态的时候，使用HEAD是非常高效的，因为在传输的过程中省去了页面内容。

#### 1.4.4.4 get和post的区别

我们看看GET和POST的区别

1. GET提交的数据会放在URL之后，以?分割URL和传输数据，参数之间以&相连，如EditPosts.aspx?name=test1&id=123456. POST方法是把提交的数据放在HTTP包的Body中.

2. GET提交的数据大小有限制(因为浏览器对URL的长度有限制)，而POST方法提交的数据没有限制.

3. GET方式需要使用Request.QueryString来取得变量的值，而POST方式通过Request.Form来获取变量的值。

4. GET方式提交数据，会带来安全问题，比如一个登录页面，通过GET方式提交数据时，用户名和密码将出现在URL上，如果页面可以被缓存或者其他人可以访问这台机器，就可以从历史记录获得该用户的账号和密码.

**HTTP请求数据**
![file](./img/request.jpg)
**HTTP响应数据**
![file](./img/response.png)

# 二 AJAX的使用
## 2.1 get请求
1. 创建对象<br>
这里用xhr的原因就是使用ajax一般都要通过xhr来，所以说xhr代表的就是ajax<br>
`const xhr = new XMLHttpRequest();`
2. 初始化，设置请求方法和url<br>
`xhr.open("GET", "http://127.0.0.1:8000/server");`<br>
请求方法包括GET/POST/DELETE等<br>
对于url的设置是以?分割，用&表示不同参数。
`xhr.open("GET", "http://127.0.0.1:8000/server?a=100&b=200&c=300");`
3. 发送
`xhr.send();`
4.事件绑定 处理服务端返回的结果
```js
            // on表示当。。。时候
            // readystate是xhr对象中的属性。表示状态0,1,2,3,4
            // 0表示被初始化，1代表open方法加装完毕
            // 2代表send方法加装完毕，3表示服务端返回的部分结果，4表示服务端返回的所有结果
            xhr.onreadystatechange = function(){
                // 判断(服务端返回了所有的结果)
                if(xhr.readyState === 4){
                    // 判断响应状态码 200、404、403、401、500等
                    if(xhr.status >= 200 && xhr.status <= 300){
                        // 处理结果 行 头 空行 体
                        // 响应
                        // console.log(xhr.status);//状态码
                        // console.log(xhr.statusText);//状态字符串
                        // console.log(xhr.getAllResponseHeaders());//所有响应头
                        // console.log(xhr.response);//响应体
                        result.innerHTML = xhr.response;
                    }
                }
            }
```

## 2.2 post请求
post请求中主要就是请求体的位置不一样
在get方法中，数据是通过url传输的，这样就比较不安全
但是在post方法中，通过`send()`方法传输，数据的传输更安全可靠
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AJAX POST 请求</title>
    <style>
        #result {
            width: 200px;
            height: 100px;
            border: solid 1px #90b;
        }
    </style>
</head>
<body>
    <div id="result"></div>

    <script>
        // 获取元素
        const result = document.getElementById("result");
        // 绑定事件
        result.addEventListener("mouseover", function() {
            // 1.创建对象
            const xhr = new XMLHttpRequest();
            // 2.初始化
            xhr.open("POST", 'http://127.0.0.1:8000/server')
            // 3.发送
            // xhr.send('a=100&b=200&c=300');
            xhr.send('a:100&b:200&c:300');
            // 4.事件绑定
            xhr.onreadystatechange = function(){
                if(xhr.readyState === 4){
                    if(xhr.status >=200 && xhr.status<= 300){
                        result.innerHTML = xhr.response;
                    }
                }
            }
        })
    </script>
</body>
</html>
```
## 2.3 express框架使用
```js
// 1.引入express
const express = require('express');

// 2. 创建应用对象
const app = express();

// 3.创建路由规则
// request是对请求报文的封装
// response是对响应报文的封装
app.get('/server', (request, response) => {
    // 设置响应头,设置允许跨域
    response.setHeader('Access-Control-Allow-Origin', '*');
    // 设置响应体
    response.send("hello ajax");
});

app.post('/server', (request, response) => {
    // 设置响应头,设置允许跨域
    response.setHeader('Access-Control-Allow-Origin', '*');
    // 设置响应体
    response.send("hello ajax post");
});

// 4.监听端口启动服务
app.listen(8000, () => {
    console.log("服务已经启动，8000端口监听中......");
})
```

## 2.4 json请求
json请求和其他的区别不是很大，其主要改变就是在server端要想要对数据进行响应，需要对数据进行转换
```js
app.get('/json-server', (request, response) => {
    // 设置响应头,设置允许跨域
    response.setHeader('Access-Control-Allow-Origin', '*');
    // 响应一个数据
    const data = {
        name: 'wh'
    };
    // 对对象进行字符串转换
    let str = JSON.stringify(data);
    // 设置响应体
    response.send(str);
});
```
之后在前端，可以通过两种方式来进行数据的显示：
1. 手动对数据进行转化：
```js
let data = JSON.parse(xhr.response);
result.innerHTML = data.name;
```
2.自动对数据进行转化：
```js
const xhr = new XMLHttpRequest();
// 设置响应体的类型
xhr.responseType = 'json';
// 之后在事件绑定中，就可以直接进行显示
result.innerHTML = xhr.response.name;
```

## 2.5 神奇的IE
IE浏览器在使用ajax过程中会出现缓存问题，当然ie现在已经die了。
但是还是得提一下
其实结果办法也比较简单，就是在前端的初始化阶段设置一个参数时间
`xhr.open("GET", 'https://127.0.0.1:8000/ie?t='Date.now());`

## 2.6 请求超时与网络异常
在`const xhr = new XMLHttpRequest();`和`xhr.open('GET', 'http://127.0.0.1:8000/delay');`之间添加内容
```js
// 设置超时取消
xhr.timeout = 2000;
xhr.ontimeout = function() {
    alert('net error,please try again later');
}
xhr.onerror = function() {
    alert('your net maybe have some problems');
}
```

## 2.7 请求取消的问题
取消请求可以使用`abort()`方法。
```js
let x = null;
btns[0].onclick = function() {
    x = new XMLHttpRequest();
    x.open('GET','http://127.0.0.1:8000');
    x.send();
}

btn[1].onclick = function(){
    x.abort();
}
// 通过这种方法就可以当点击一个按钮发送请求时，点击另一个按钮就可以取消这个请求
```

## 2.8 请求重复的问题
请求重复问题的核心就是创建一个标识变量，如果这个标识变量为true，则证明请求过程还未结束，不能够接受新的请求。
```js
const btn = document.getElementsByTagName("button")[0]; 
        let x = null;
        // 创建标识变量
        let isSending = false;

        btn.onclick = function() {
            if(isSending) x.abort();
            x = new XMLHttpRequest();
            isSending = true;
            x.open('GET','http://127.0.0.1:8000/delay');
            x.send();
            x.onreadystatechange = function(){
                if(x.readyState === 4){
                    // 修改标识变量
                    isSending = false;
                }
            }
        }
```

# 三、同源策略
同源策略是一种浏览器的安全策略

同源：协议、域名、端口号必须完全相同

违背同源策略就是跨域

## 3.1 JSONP
JSONP是一种非官方的跨域解决方案，只支持GET请求
其利用script标签的跨域能力来发送请求
```html
<div id="result"></div>
    <script>
        function handle(data){
            const result = document.getElementById('result');
            result.innerHTML = data.name;
        }
    </script>
    <script src="http://127.0.0.1:8000/jsonp-server"></script>
```
从上面的代码中可以看出，script标签可以通过src链接来实现跨域通信，但是其服务器端回传的必须是一段script代码
比如说想要回传一个参数，可以把参数的显示函数等放在前端，然后服务器端通过调用这个函数就可以啦。
因为其实回传过来的是一段script代码，所以说前端会执行这些前端代码。
```js
app.get('/jsonp-server', (request, response) => {
    // 响应一个页面
    // response.send('console.log("hello jsonp server")');
    const data = {
        name: 'wh',
        age: '18'
    };
    let str = JSON.stringify(data);
    response.send(`handle(${str})`);
});
```
当然想要回传参数，需要先将参数转换为json

```js
// 1.创建script 标签
const script = document.createElement("script");
// 2.设置标签的src属性
script.src = 'http://127.0.0.1:8000/check-server';
// 3.将script插入到文档中
document.body.appendChild(script);
```
在正常使用过程中，需要创建script标签，并将其置入src，之后再将script标签插入到文档中使用

## 3.2 CORS
cors(cross-origin resource sharing)，跨域资源共享
是官方的跨域解决方案。它的特点是不需要在客户端做任何特殊的操作。
完全在服务器中进行处理。并且支持get和post请求。
跨域资源共享标准新增了一组HTTP首部字段，允许服务器声明哪些源站通过浏览器有权限访问哪些资源

**CORS通过设置一个响应头来告诉浏览器，该请求允许跨域，浏览器收到该响应后就会对响应放行**

```js
// 设置响应头
response.setHeader('Access-Control-Allow-Origin', '*'); //这个就代表可以跨域运行，并且对所有网页都可以进行
response.setHeader('Access-Control-Allow-Origin', 'http://example.com'); //表示对某个网页进行跨域
```

```js
// 一般在开发时会加这些东西
response.setHeader('Access-Control-Allow-Origin', '*');
response.setHeader('Access-Control-Allow-Headers', '*');
response.setHeader('Access-Control-Allow-Method', '*');
```

具体的标准和响应头可以看[CORS](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CORS)

# 四、使用ajax
本文中使用的主要为express框架，基于node.js和npm、nodemon包使用

开启服务端的操作为：<br></br>
`nodemon server.js` ——————这个操作能够动态更新服务端代码<br></br>
`node server.js`    ——————这个操作每次更新服务端代码都需要重启服务<br></br>

nodemon的下载操作为：
`npm install -g nodemon`

**因为新版的node.js中内置了npm，所以不用再下载npm包了**

npm是node.js的一个包管理工具

查询npm是否下载完成的方式为：`npm -v`
查询node.js是否下载成功的方式为：`node -v`
