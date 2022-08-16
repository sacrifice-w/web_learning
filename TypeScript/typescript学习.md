# 一、简介
1. 以JavaScript为基础构建的语言
2. 其是一个JavaScript的超集
3. TypeScript拓展了JavaScript，并添加了类型
4. TS不能被JS解析器直接执行，需要将ts编译为js进行执行
5. JavaScript是弱类型语言, 很多错误只有在运行时才会被发现。而TypeScript提供了一套静态检测机制, 可以帮助我们在编译时就发现错误

## 1.1 安装和使用
首先需要node.js
之后使用npm来下载ts
1. 首先将npm配置为淘宝镜像地址`npm config set registry https://registry.npm.taobao.org`
2. 下载typescript`npm i -g typescript`
3. 下载ts-node`npm i -g ts-node`
4. 通过`tsc --init`创建一个tsconfig.json文件
5. 创建一个示例`xxx.ts`文件
6. 然后就能通过`ts-node xxx.ts`来运行示例了
7. 或者可以通过`tsc xxx.ts`来将ts编译成js

## 1.2 入门网站
官方网站：https://www.typescriptlang.org/zh/
一个很不错的入门教程：https://juejin.cn/post/7018805943710253086?share_token=c4029c41-9cc7-4e39-9e2d-c57b6617d2d8

# 二、基础
**typescript是强类型语言**
## 2.1 类型
1. ts中需要对声明的变量进行类型的赋予
2. 声明变量可以直接进行赋值
3. 如果变量的声明和赋值是同时进行的，ts可以自动对变量进行类型检测
4. js中的函数是不考虑参数的类型和个数的
5. 在ts中可以通过限制类型来控制传入参数的类型
```ts
// 可以先对变量进行类型的赋予，之后这个变量的类型便固定了，如果赋予其不同类型的值则会报错
let a:number;
let b:string;
a = 123;
b = 'hello';

// 如果不进行类型赋予，会以其第一个赋予的值作为其类型
// 这里就将c赋予了Boolean值类型
let c = false;
c = true;

// 使用js中的函数形式
function sum(aa,bb){
    return aa + bb;  
}

sum(aa:123,bb:'hello'); //这里返回的就是123hello。变成了字符串拼串

// ts
function sum(aaa:number,bbb:number){
    return aaa + bbb; //这里就限制了两个传入参数都必须是数字类型
}

// 传入除数字类型和多传入参数都会报错
sum(aaa:123, bbb:'hello',345);
```


### 2.1.1 注意点
**js中的八种类型值**
```ts
let str: string = "jimmy";
let num: number = 24;
let bool: boolean = false;
let u: undefined = undefined;
let n: null = null;
let obj: object = {x: 1};
let big: bigint = 100n;
let sym: symbol = Symbol("me"); 
```

默认情况下`null`和`undefined`是**所有类型**的子类型。 就是说你可以把`null`和`undefined`赋值给其他类型。
```ts
// null和undefined赋值给string
let str:string = "666";
str = null
str= undefined

// null和undefined赋值给number
let num:number = 666;
num = null
num= undefined
```
如果你在`tsconfig.json`指定了`"strictNullChecks":true`，`null`和`undefined`只能赋值给`void`和它们各自的类型。


虽然`number`和`bigint`都表示数字，但是这两个类型不兼容。

```ts
let big: bigint =  100n;
let num: number = 6;
big = num;
num = big;
```
会抛出一个类型不兼容的 ts(2322) 错误。

### 2.1.2 ts中的新类型
1. 可以直接使用字面量进行类型声明
```ts
let a : 10;
a = 10;

a = 11; //报错，不能将类型11分配给类型10
// 这样就限定了某一个变量的值
```
2. 但是可以使用|来连接多个类型(联合类型)
```ts
let b : 'male' | 'female';
b = 'male';
b = 'female';

let c : boolean | string;
c = true;
c = 'hello';
```
这样就可以为一个变量进行多个赋值的选择。或者多种类型的选择

3. any 表示任意的类型，一个变量设置类型为any后相当于对该变量关闭ts的类型检测
```ts
let d:any;

d = 10;
d = 'hello';
d = true;

// 声明变量如果不指定类型，则会自动判断变量的类型为any（隐式的any）
let d;
```
**在实际应用中尽量别用any**

4. unknown 表示未知类型的值
   1. unknown实际上就是一个类型安全的any
   2. 因为any类型的变量可以复制给任意变量，从而导致可能存在的各种问题
   3. 但是unknown类型的变量，不能直接赋值给其他变量
5. 类型断言：可以用来告诉解析器变量的实际类型
   1. 变量 as 类型
   2. <类型>变量
```ts
let e : unknown;
let s : string;
e = 'hello';

s = e; //这样会报错，因为unknown不能直接赋值给其他变量

// 下面是类型断言，两种方式都可以
s = e as string;

s = <string>e;
```

6. void用来表示空，以函数为例，就表示没有返回值的函数
``` ts
function fn(): void{

}
```
7. never表示永远不会返回结果
   1. 在 TypeScript 中，可以利用 never 类型的特性来实现全面性检查
   2. 使用 never 避免出现新增了联合类型没有对应的实现，目的就是写出类型绝对安全的代码
```ts
type Foo = string | number;

function controlFlowAnalysisWithNever(foo: Foo) {
  if (typeof foo === "string") {
    // 这里 foo 被收窄为 string 类型
  } else if (typeof foo === "number") {
    // 这里 foo 被收窄为 number 类型
  } else {
    // foo 在这里是 never
    const check: never = foo;
  }
}
```
8. array类型。表示一个数组。数组有两种表示形式：
   1. string[]
   2. Array<>
```ts
// 下面这两种表示形式是一样的
let g = number[];
let g : Array<number>;
g=[1,2,3];

let arr:(number | string)[];
// 表示定义了一个名称叫做arr的数组, 
// 这个数组中将来既可以存储数值类型的数据, 也可以存储字符串类型的数据
arr3 = [1, 'b', 2, 'c'];

// interface是接口,后面会讲到
interface Arrobj{
    name:string,
    age:number
}
let arr3:Arrobj[]=[{name:'jimmy',age:22}]
```

9. 元祖：元祖就是固定长度的数组
   1.  元组最重要的特性是可以限制数组元素的个数和类型，它特别适合用来实现多值返回。
   2.  元组类型只能表示一个已知元素数量和类型的数组，长度已指定，越界访问会提示错误。如果一个数组中可能有多种类型，数量和类型都不确定，那就直接any[]
   3.  元祖支持解构赋值
   4.  元祖也支持？表示可选元素
   5.  可以通过...X来表示一个长度不固定的数组，也就是拼接数组
   6.  可以通过readonly前缀来设置只读元祖`const point: readonly [number, number] = [10, 20];`
```ts
// 这就是一个元祖形式，其类型必须匹配，并且长度为2
let h:[string,number];
h = ['hello',123]
```
对于解构赋值的例子：
```ts
let employee: [number, string] = [1, "Semlinker"];
let [id, username] = employee;
console.log(`id: ${id}`); //id:1
console.log(`username: ${username}`); //username:Semlinker

// 解构数组元素的个数不能超过元祖中元素的个数，否则会出错
let [id, username, age] = employee; //error
```
对于拼接的例子：
```ts
type RestTupleType = [number, ...string[]];
let restTuple: RestTupleType = [666, "Semlinker", "Kakuqo", "Lolo"];
console.log(restTuple[0]);   //666
console.log(restTuple[1]);   //Semlinker
```

10. enum 枚举,通过
```ts
enum Gender{
    Male = 0,
    Female = 1
}

let i: {name:string, gender:Gender};

i = {
    name: 'wh',
    gender:Gender.Male
}
```

11. object表示一个js对象
```ts
let a: object;
a = {};
```
{}用来指定对象中可以包含哪些属性
语法：{属性名：属性值}
**在属性名后面加上?，表示属性是可选的**
```ts
let b:{name:string, age?:number};
// 因为age后面加了？，所以age这个属性可加可不加
b = {name:'wh',age:18};

// [propName:string]:any 表示任意类型的属性
// 表示只要是名字为字符串类型的变量，都可以存在
let c:{name:string, [propName:string]:any};
c = {name:'xxx',age:18,gender:'男'}
```

12. 设置函数结构的类型声明：
语法：（形参：类型,形参：类型）=> 返回值

```ts
// 函数表达式
let d: (a:number , b:number) => number;

// 函数声明
d = function (a,b):number{
    return a+b;
}
```

## 2.2 ts的编译
1. 基础编译：`tsc xxx.ts`
2. 监视变化的编译：`tsc xxx.ts -w`
但是这两种方式都不太方便-.-

所以一般使用的方法都是：`tsc --init`生成一个tsconfig.json文件
然后`tsc`进行编译。`tsc -w`进行所有文件的监视

## 2.3 用webpack打包ts代码
1. 对项目进行初始化 `npm init -y`
2. 下载依赖包`npm i -D webpack webpack-cli ts-loader`
   -  -D代表的是在生产环境中安装的包，这些包只在开发环境中使用，用来进行代码打包等操作，不需要上传到服务环境中
3. 使用`tsc --init`生成tsconfig.json文件
4. 创建webpack.config.json文件
```js
// 引入包
const path = require('path');

// webpack中的所有配置都应该写在module.exports中
module.exports = {
    // 指定入口文件
    entry: './src/index.ts',

    // 指定打包文件所在目录
    output:{

        // 指定打包文件的目录
        path: path.resolve(__dirname, 'dist'),
        
        //打包后文件的文件
        filename: 'bundle.js'
    },

    // 设置开发环境(development)或者是生产环境(production)，webpack4.0新增
    mode:'development',

    // 指定webpack打包时要使用的模块
    module:{
        // 指定要加载的规则
        rules:
              [
                {
                // test指定的是规则生效的文件
                test: /\.ts$/,
                // 要使用的loader
                use: 'ts-loader',
                // 要排除的文件
               exclude:/node-modules/
                }
              ]
    }
}
```
5. 在package.json文件中加入build
```json
{
  "name": "ts_webpack",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack --mode development"  //add this
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "ts-loader": "^9.3.1",
    "webpack": "^5.74.0",
    "webpack-cli": "^4.10.0"
  }
}

```
6. 运行`npm run build`进行编译

上面的这些步骤只是能够将ts文件编译成js文件，但是不能够满足项目上线的需求。
所以还需要一些别的操作：
1. `npm i -D html-webpack-plugin`---用于生成一个HTML模板并进行引用
2. `npm i -D webpack-dev-server` ---用于能够实时调试代码，实时更新
3. `npm i -D clean-webpack-plugin` ---用来清除旧代码，保证一直是最新的
```js
// 引入包
const path = require('path');
// 引入html插件
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// webpack中的所有配置都应该写在module.exports中
module.exports = {
    // 指定入口文件
    entry: './src/index.ts',

    // 指定打包文件所在目录
    output:{

        // 指定打包文件的目录
        path: path.resolve(__dirname, 'dist'),
        
        //打包后文件的文件
        filename: 'bundle.js'
    },

    // 设置开发环境或者是生产环境，webpack4.0新增
    mode:'development',

    // 指定webpack打包时要使用的模块
    module:{
        // 指定要加载的规则
        rules:[
            {
            // test指定的是规则生效的文件
            test: /\.ts$/,
            // 要使用的loader
            use: 'ts-loader',
            // 要排除的文件
            exclude:/node-modules/
            }
        ]
    },

    // 配置webpack插件
    plugins: [
      // 清除旧代码
        new CleanWebpackPlugin(),
        // 生成html文件
        new HTMLWebpackPlugin({
          // 使用模板html文件
            template:"./src/index.html"
        }),
    ],

    // 用来设置引用模块
    resolve:{
        extensions:['.ts','.js']
    }
}
```
4. 在package.json中加入一些新内容：
```json
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    // 表示是生产环境的webpack
    "build": "webpack --mode development",
    // 能够通过npm start启动服务，并进行实时修改同步
    "start": "webpack serve --open chrome.exe"
  },
```

5. 为了更好的兼容性，还需要一些别的插件`npm i -D @babel/core @babel/preset-env babel-loader core-js`
6. 在webpack.config.js中的module中再添加一些东西
```js
// 指定webpack打包时要使用的模块
    module:{
        // 指定要加载的规则
        rules:[
            {
            // test指定的是规则生效的文件
            test: /\.ts$/,
            // 要使用的loader
            use: [
                // 配置babel
                {
                    // 指定加载器
                    loader:"babel-loader",
                    // 设置babel
                    options:{
                        // 设置预定义的环境
                        presets:[
                            [
                                // 指定环境的插件
                                "@babel/preset-env",
                                {
                                    // 要兼容的目标浏览器
                                    targets:{
                                        "chrome":'58',
                                        "ie":'11'
                                    },

                                    // 指定corejs的版本
                                    "corejs":"3",
                                    // 使用corejs的方式"usage"表示按需加载
                                    "useBuiltIns":"usage"
                                }
                            ]
                        ]
                    }
                },
                'ts-loader'
            ],
            // 要排除的文件
            exclude:/node-modules/
            }
        ]
    },
```

7. 如果为了兼容老ie，虽然现在基本没有咧。需要添加不转换箭头函数
```js
    // 指定打包文件所在目录
    output:{

        // 指定打包文件的目录
        path: path.resolve(__dirname, 'dist'),
        
        //打包后文件的文件
        filename: 'bundle.js',

        // 告诉webpack不要转换箭头函数
        environment:{
            arrowFunction: false
        }
    },
```

## 2.4 类、构造函数和this
```ts
class Dog{
  name: string;
  age: number;
  // constructor被称为构造函数
  // 构造函数会在对象创建时调用
  constructor(name:string, age:number){
    // 在实例方法中，this就表示当前的实例
    this.name = name;
    this.age = age;
  }

  bark(){
    console.log(this);
  }
}
```

## 2.5 继承和抽象类
- Animal是父类，Dog是子类
- 使用继承后，子类将会拥有父类所有的方法和属性
- 通过继承可以将多个类中共有的代码写在一个父类中
- 在子类中添加了和父类相同的方法，则子类方法会覆盖掉父类方法

- 抽象类的作用就是专门用来被继承
- 抽象类中可以添加抽象方法
- 抽象类不能用来创建对象
```ts
// 以abstract开头的类就是抽象类
abstract class Animal{
  name:string;
  age:number;

  constructor(name:string, age:number){
    this.name = name;
    this.age = age;
  }

  sayHello(){
    console.log('动物在叫~');
  }

  // 抽象方法只能定义在抽象类中，子类必须对抽象方法进行重写
  // 抽象方法没有方法体
  abstract say():void;
}


class Dog extends Animal{

  age: number;
  // 如果子类写了构造函数，必须写super调用父类
  // 和react什么都一样
  constructor(name:string, age:number){
    super(name);
    this.age = age;
  }

  sayHello(){
    // 在类的方法中，super就表示当前类的父类
    super.sayHello();
  }
  run(){
    console.log(`${this.name}在跑...`);
  }
}

class Cat extends Animal {
  sayHello(){
    console.log("喵喵喵");
  }
}

const dog = new Dog("旺财", 4);
console.log(dog);
dog.run();
```

