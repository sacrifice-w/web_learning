# 一、配置和下载

## 1.1 json-server

首先是 json-server 的下载和安装

1. 在命令行中输入`npm install -g json-server`
2. 在需要使用的文件夹下创建文件 db.json
3. 在 db.json 中置入内容

```json
{
	"posts": [{ "id": 1, "title": "json-server", "author": "typicode" }],
	"comments": [{ "id": 1, "body": "some comment", "postId": 1 }],
	"profile": { "name": "typicode" }
}
```

4. 开启 json-server 服务：`json-server --watch db.json`

json-server 主要是提供一个虚假的服务器，从而实现数据通信。在本文中主要起演示作用

## 1.2 axios

从下面方式中选择一项进行安装或使用

1. 通过 npm 安装：`npm install axios`
2. 通过 bower 安装：`bower install axios`
3. 通过 yarn 安装：`yarn add axios`
4. 通过 pnpm 安装：`pnpm add axios`
5. 直接使用 script 调用 api：`<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>`
6. 可以通过国内网站`https://www.bootcdn.cn/`来调用国内 api 从而加快访问速度：`<script src="https://cdn.bootcdn.net/ajax/libs/axios/1.0.0-alpha.1/axios.js"></script>`

在项目中使用 axios 一般使用上面几种方式来进行，但是在日常练习中，可以直接调用 api

# 二、使用

## 2.1 基本使用

基本请求共包含四个，分别是 GET/POST/PUT/DELETE
在 json-server 服务中 GET 表示查看内容，POST 表示新增内容，PUT 表示修改内容，DELETE 表示删除内容

```js
// 发送请求，获得内容
btn[0].onclick = function () {
	axios({
		// 发送方法
		method: "GET",
		// 发送链接
		url: "http://localhost:3000/posts/2",
	}).then((response) => {
		console.log(response);
	});
};
// 添加新内容
btn[1].onclick = function () {
	axios({
		// 发送方法
		method: "POST",
		// 发送链接
		url: "http://localhost:3000/posts",
		// 设置请求体
		data: {
			title: "hello world",
			author: "wh",
		},
	}).then((response) => {
		console.log(response);
	});
};
```

以 PUT 和 POST 为例，主要需要设置发送的**请求方法**，和**请求的连接**，如果需要的话，还需要设置**请求体**

## 2.2 axios 的其他使用

axios 和 ajax 比较类似，可以直接使用现成的方法

```js
axios.request(config)
axios.get(url[, config])
axios.delete(url[, config])
axios.head(url[, config])
axios.options(url[, config])
axios.post(url[, data[, config]])
axios.put(url[, data[, config]])
axios.patch(url[, data[, config]])
```

具体的使用举例如下：

```js
btn[0].onclick = function () {
	axios
		.request({
			method: "GET",
			url: "http://localhost:3000/comments",
		})
		.then((response) => {
			console.log(response);
		});
};
//发送post请求
btn[1].onclick = function () {
	axios
		.post("http://localhost:3000/comments", {
			body: "hahahaha",
			postId: 2,
		})
		.then((response) => {
			console.log(response);
		});
};
```

## 2.3 axios 的响应

config：配置对象，包括 url，请求方式等内容
data：响应体的内容
headers：响应头的信息
request：原生的 ajax 请求对象
status：响应状态码
statusText：响应状态

## 2.4 axios 配置对象详细说明

```js
{
  // 请求地址，可以将前面的省略从而和baseURL结合
  url: '/user',

  // 请求方法
  method: 'get', // default

  // axios会将baseURL和url相结合，所以说如果要调用统一域名下的不同url，这样就会很方便
  baseURL: 'https://some-domain.com/api/',

  // 对请求数据进行一个处理，处理完成后再发送给服务器
  // 只能对四种基本方法进行操作
  transformRequest: [function (data, headers) {
    // Do whatever you want to transform the data

    return data;
  }],

  // 对返回的结果进行处理
  transformResponse: [function (data) {
    // Do whatever you want to transform the data

    return data;
  }],

  // 传递数据头
  headers: {'X-Requested-With': 'XMLHttpRequest'},

  // 这个的主要目的是当发送url时，有时候需要在url后面加一些字符串数据，但是直接加不方便，就可以通过这个方法，它会自动将其中的键和值插入到url最后面
  params: {
    ID: 12345
  },

  // 对请求的参数进行一个序列化，根据接口不同而不同
  paramsSerializer: {
    indexes: null // array indexes format (null - no brackets, false - empty brackets, true - brackets with indexes)
  },

  // 请求体设置，共分为两种，分别是字符串格式和对象形式
  // 对象形式axios会将其转换为json格式，字符串格式会直接进行传递
  data: {
    firstName: 'Fred'
  },
  data: 'Country=Brasil&City=Belo Horizonte',

  // 超时时间，单位为ms
  timeout: 1000, // default is `0` (no timeout)

  //跨域请求时对cookie是否携带，false为不携带
  withCredentials: false, // default

  //发送ajax请求或者是http请求
  adapter: function (config) {
    /* ... */
  },

  //设置用户名和密码
  auth: {
    username: 'janedoe',
    password: 's00pers3cret'
  },

  // 对响应体格式做一个要求
  responseType: 'json', // default

  // 响应体编码
  responseEncoding: 'utf8', // default

  // 跨域请求cookie设置
  xsrfCookieName: 'XSRF-TOKEN', // default

  // 跨域请求头信息设置，这两个主要是做保护作用，发送唯一标识，对名字做表好似
  xsrfHeaderName: 'X-XSRF-TOKEN', // default

  // 上传回调
  onUploadProgress: function (progressEvent) {
    // Do whatever you want with the native progress event
  },

  // 下载回调
  onDownloadProgress: function (progressEvent) {
    // Do whatever you want with the native progress event
  },

  // 设置响应体最大长度，单位为字节
  maxContentLength: 2000,

  // 设置请求最大长度
  maxBodyLength: 2000,

  // 对响应结果做一个设置，也就是认定什么情况下它才属于成功的，属于默认规则
  validateStatus: function (status) {
    return status >= 200 && status < 300; // default
  },

  // 最大跳转次数，一般只能用在node.js
  maxRedirects: 21, // default

  // 跳转前的操作
  beforeRedirect: (options, { headers }) => {
    if (options.hostname === "example.com") {
      options.auth = "user:password";
    }
  },

  // 设置socket文件位置，
  socketPath: null, // default

  // http状态
  httpAgent: new http.Agent({ keepAlive: true }),
  httpsAgent: new https.Agent({ keepAlive: true }),

  // 代理，通过代理可以进行爬虫或者投票这些，就是通过代理池去操作
  proxy: {
    protocol: 'https',
    host: '127.0.0.1',
    port: 9000,
    auth: {
      username: 'mikeymike',
      password: 'rapunz3l'
    }
  },

  // 对ajax请求进行一个取消的操作
  cancelToken: new CancelToken(function (cancel) {
  }),

  // an alternative way to cancel Axios requests using AbortController
  signal: new AbortController().signal,

  // `decompress` indicates whether or not the response body should be decompressed
  // automatically. If set to `true` will also remove the 'content-encoding' header
  // from the responses objects of all decompressed responses
  // - Node only (XHR cannot turn off decompression)
  decompress: true // default

  // `insecureHTTPParser` boolean.
  // Indicates where to use an insecure HTTP parser that accepts invalid HTTP headers.
  // This may allow interoperability with non-conformant HTTP implementations.
  // Using the insecure parser should be avoided.
  // see options https://nodejs.org/dist/latest-v12.x/docs/api/http.html#http_http_request_url_options_callback
  // see also https://nodejs.org/en/blog/vulnerability/february-2020-security-releases/#strict-http-header-parsing-none
  insecureHTTPParser: undefined // default

  // transitional options for backward compatibility that may be removed in the newer versions
  transitional: {
    // silent JSON parsing mode
    // `true`  - ignore JSON parsing errors and set response.data to null if parsing failed (old behaviour)
    // `false` - throw SyntaxError if JSON parsing failed (Note: responseType must be set to 'json')
    silentJSONParsing: true, // default value for the current Axios version

    // try to parse the response string as JSON even if `responseType` is not 'json'
    forcedJSONParsing: true,

    // throw ETIMEDOUT error instead of generic ECONNABORTED on request timeouts
    clarifyTimeoutError: false,
  },

  env: {
    // The FormData class to be used to automatically serialize the payload into a FormData object
    FormData: window?.FormData || global?.FormData
  },

  formSerializer: {
      visitor: (value, key, path, helpers)=> {}; // custom visitor funaction to serrialize form values
      dots: boolean; // use dots instead of brackets format
      metaTokens: boolean; // keep special endings like {} in parameter key
      indexes: boolean; // array indexes format null - no brackets, false - empty brackets, true - brackets with indexes
  }
}
```

## 2.5 axios 的默认配置

通过`axios.defaults.xxx`即可进行配置

```js
axios.defaults.method = "GET";
axios.defaults.baseURL = "http://localhost:3000";

btn[0].onclick = function () {
	axios
		.request({
			url: "/comments",
		})
		.then((response) => {
			console.log(response);
		});
};
```

## 2.6 axios 创建实例对象

```js
const joke = axios.create({
	baseURL: "http://route.showapi.com",
	timeout: 2000,
});

joke.get("/341-2").then((response) => {
	console.log(response.data);
});
```

# 三、拦截器

包括请求拦截器和响应拦截器
拦截器的主要作用就是在发送或接收的过程中对数据进行处理
比如说请求拦截器就是将数据发送到服务器的过程中进行处理，如果符合要求就进行传送，不符合要求则放弃传送
响应拦截器可以对数据进行处理等操作
等于就是**一道道关卡**

```js
// 设置请求拦截器
axios.interceptors.request.use(
	function (config) {
		console.log("请求拦截器 成功");
		return config;
	},
	function (error) {
		console.log("请求拦截器 失败");
		return Promise.reject(error);
	}
);

// 设置响应拦截器
axios.interceptors.response.use(
	function (response) {
		console.log("响应拦截器 成功");
		return response;
	},
	function (error) {
		console.log("响应拦截器 失败");
		return Promise.reject(error);
	}
);
```

通过请求拦截器和响应拦截器可以对请求和返回的数据进行修改

# 四、取消 axios 请求

```js
// 2. 声明全局变量
let cancel = null;

btn[0].onclick = function () {
	if (cancel !== null) {
		cancel();
	}
	axios({
		method: "GET",
		url: "http://localhost:3000/posts",
		// 1.添加配置对象的属性
		cancelToken: new axios.CancelToken(function (c) {
			// 3.将c的值赋值给cancel
			cancel = c;
		}),
	}).then((response) => {
		console.log(response);
		cancel = null;
	});
};

btn[1].onclick = function () {
	cancel();
};
```

取消请求主要是通过`cancelToken`来进行，通过对一个变量来赋值，在需要调用取消的时候，直接使用`cancel()`方法来取消请求
```js
cancelToken: new axios.CancelToken(function (c) {
			// 3.将c的值赋值给cancel
			cancel = c;
		})
```