###  现代模式
现代模式`"use strict";`当它处于脚本文件的顶部时，则整个脚本文件都将以“现代”模式进行工作。
`"use strict"`可以被放在函数体的开头。这样则可以只在该函数中启用严格模式。
但通常人们会在整个脚本中启用严格模式。

###  变量和常量
用`let`来声明一个变量，原来用`var`来声明变量是一种比较古老的方式
`let message = "hello";`
一个变量应该只能被声明一次，之后只进行引用

声明一个常数（不变）变量，可以使用 `const` 而非 `let`,常量不能被修改，否则会报错
一个普遍的做法是将常量用作别名，以便记住那些在执行之前就已知的难以记住的值。例如使用大写字母和下划线来命名这些常量。

#### let 和 var的区别
var没有块级作用域，它只存在于函数作用域和全局作用域，所以如果有一个代码块的话，等于var会创建一个全局变量。
而let只会存在在代码块内。
```js
if (true) {
  var test = true; // 使用 "var" 而不是 "let"
}
alert(test); // true，变量在 if 结束后仍存在

if (true) {
  let test = true; // 使用 "let"
}
alert(test); // ReferenceError: test is not defined
```
**var能够穿透if，for和其它代码块。**

如果我们用 let 在同一作用域下将同一个变量声明两次，则会出现错误。
使用 var，我们可以重复声明一个变量，不管多少次都行。如果我们对一个已经声明的变量使用var，这条新的声明语句会被忽略。
**var 变量声明在函数开头就会被处理（脚本启动对应全局变量）。**
###  BigInt
numbe类型无法大于大于 (2^53-1)（即 9007199254740991），或小于 -(2^53-1) 的整数。这是其内部表示形式导致的技术限制。
可以通过将 n 附加到整数字段的末尾来创建 BigInt 值。
`const bigInt = 1234567890123456789012345678901234567890n;`

###  通过反引号对字符串嵌入
反引号是**功能扩展**引号。它们允许我们通过将变量和表达式包装在`${...}`中，来将它们嵌入到字符串中
```js
alert( `the result is ${1 + 2}` ); // the result is 3
```

### for in 和for of 的区别
for in 和for of 都是遍历对象里的每一项，那么他们有什么区别呢？
区别1： for of无法循环遍历对象
区别2： **for in循环遍历的是数组的索引，for of循环遍历的是数组的值**

**可以应用 for..of 的对象被称为 可迭代的。**
```js
var arr = ['nick','freddy','mike','james'];
for(var key in arr){
    console.log(key);	//输出的是0,1,2,3
}
console.log('-----------分割线-----------');
for(var item of arr){	
    console.log(item);  //输出的是nick','freddy','mike','james'
}
```
区别3： for in 会遍历自定义属性，for of不会
```js
var arr = ['nick','freddy','mike','james'];
arr.name = "数组";
 
for(var key in arr){
    console.log(key+': '+arr[key]);	
}
console.log('-----------分割线-----------');
for(var item of arr){	
    console.log(item);
}
```
给数组添加一个自定义属性name，并且赋值"数组"。然后进行遍历输出的，会发现新定义的属性也被for in输出来了，而for of并不会对name进行输出。

### 对象的一些补充知识
```js
let user = {
    name = "john",
    age = 30,
};
```
列表中的最后一个属性应以逗号结尾,这叫做尾随（trailing）或悬挂（hanging）逗号。这样便于我们添加、删除和移动属性，因为所有的行都是相似的。
通过方括号同样可以对对象进行操作
比如说`user["like birds"] = true;`或者是`delete user["like birds"]`就可以通过方括号来对对象进行增删查改，并且可以适用于任何字符串
```js
let user = {
  name: "John",
  age: 30
};

let key = prompt("What do you want to know about the user?", "name");

// 访问变量
alert( user[key] ); // John（如果输入 "name"）
```
又或者可以通过变量`key`来访问属性。而点符号则不能使用
key只能访问user中存在的属性，如果属性不存在则显示undefined，这里的key会指向name

对象的克隆和合并可以使用`Object.assign(dest, [src1, src2, src3...])`方法
第一个参数 dest 是指目标对象。
更后面的参数 src1, ..., srcN（可按需传递多个参数）是源对象。
该方法将所有源对象的属性拷贝到目标对象 dest 中。换句话说，从第二个开始的所有参数的属性都被拷贝到第一个参数的对象中。
调用结果返回 dest。
```js
let user = { name: "John" };

let permissions1 = { canView: true };
let permissions2 = { canEdit: true };

// 将 permissions1 和 permissions2 中的所有属性都拷贝到 user 中
Object.assign(user, permissions1, permissions2);

// 现在 user = { name: "John", canView: true, canEdit: true }
```
如果被拷贝的属性的属性名已经存在，那么它会被覆盖：
```js
let user = { name: "John" };

Object.assign(user, { name: "Pete" });

alert(user.name); // 现在 user = { name: "Pete" }
```
我们也可以用 Object.assign 代替 for..in 循环来进行简单克隆：
```js
let user = {
  name: "John",
  age: 30
};

let clone = Object.assign({}, user);
```
### Symbol
symbol表示唯一的标识符。
Symbol 保证是唯一的。即使我们创建了许多具有相同描述的 Symbol，它们的值也是不同。描述只是一个标签，不影响任何东西。
例如，这里有两个描述相同的 Symbol —— 它们不相等：
```js
let id1 = Symbol("id");
let id2 = Symbol("id");
alert(id1 == id2); // false
```
**Symbol 不会被自动转换为字符串**
如果我们真的想显示一个 Symbol，我们需要在它上面调用 `.toString()`，如下所示：
```js
let id = Symbol("id");
alert(id.toString()); // Symbol(id)，现在它有效了
```
或者获取 symbol.description 属性，只显示描述（description）：
```js
let id = Symbol("id");
alert(id.description); // id
```
**Symbol 允许我们创建对象的“隐藏”属性，代码的任何其他部分都不能意外访问或重写这些属性。**

### 数字、字符串、数组的补充
#### 数字
假如我们需要表示 10 亿。显然，我们可以这样写：
`let billion = 1000000000;`
我们也可以使用下划线 _ 作为分隔符：
`let billion = 1_000_000_000;`
这里的下划线 _ 扮演了“语法糖”的角色，使得数字具有更强的可读性。JavaScript 引擎会直接忽略数字之间的 _，所以 上面两个例子其实是一样的。
在 JavaScript 中，我们可以通过在数字后面附加字母 "e" 并指定零的个数来缩短数字：
```js
let billion = 1e9;  // 10 亿，字面意思：数字 1 后面跟 9 个 0
let mcs = 1e-6; // 1 的左边有 6 个 0 -->0.000001
```
方法 num.toString(base) 返回在给定 base 进制数字系统中 num 的字符串表示形式。
```js
let num = 255;

alert( num.toString(16) );  // ff
alert( num.toString(2) );   // 11111111
```
函数 toFixed(n) 将数字舍入到小数点后 n 位，并以**字符串形式**返回结果。
因为toFixed 的结果是一个字符串。如果小数部分比所需要的短，则在结尾添加零：
```js
let num = 12.34;
alert( num.toFixed(5) ); // "12.34000"，在结尾添加了 0，以达到小数点后五位
```
所以说如果使用toFixed来转换，可以使用一元加号或Number()调用，将其转换为数字：`+num.toFixed(5)`

**因为在js中进行小数操作时，很有可能出现精度损失，所以在处理小数时避免相等性检查。**
#### 字符串
`str.charAt[pos]`可以获取在pos位置的字符
```js
let str = `Hello`;

// 第一个字符
alert( str[0] ); // H
alert( str.charAt(0) ); // H

// 最后一个字符
alert( str[str.length - 1] ); // o
```

**`str.charCodeAt[pos]`可以获取在pos位置的字符的Unicode编码**

toLowerCase() 和 toUpperCase() 方法可以改变大小写：
```js
alert( 'Interface'.toUpperCase() ); // INTERFACE
alert( 'Interface'.toLowerCase() ); // interface
```

`str.indexOf()` 和`str.lastIndexOf()`用于查找字符串中某个字符或字符串的位置
如果找到则返回位置，没找到则返回-1。
不同的是，indexOf是从头开始寻找，lastIndexOf是从尾部开始寻找，但是这两种方法返回的值都是正向的。

更现代的方法 str.includes(substr, pos) 根据 str 中是否包含 substr 来返回 true/false。
**如果我们需要检测匹配，但不需要它的位置，那么这是正确的选择**：
```js
alert( "Widget with id".includes("Widget") ); // true
alert( "Hello".includes("Bye") ); // false
```
str.includes 的第二个可选参数是开始搜索的起始位置：
```js
alert( "Midget".includes("id") ); // true
alert( "Midget".includes("id", 3) ); // false, 从位置 3 开始没有 "id"
```
方法 str.startsWith 和 str.endsWith 的功能与其名称所表示的意思相同：
```js
alert( "Widget".startsWith("Wid") ); // true，"Widget" 以 "Wid" 开始
alert( "Widget".endsWith("get") ); // true，"Widget" 以 "get" 结束
```

#### 数组
通过数组来实现队列和栈
**队列(queque)：**
push 在末端添加一个元素.
shift 取出队列首端的一个元素，整个队列往前移，这样原先排第二的元素现在排在了第一。
这两种操作数组都支持。
队列的应用在实践中经常会碰到。例如需要在屏幕上显示消息队列。
**栈：**
push 在末端添加一个元素.
pop 从末端取出一个元素.
所以新元素的添加和取出都是从“末端”开始的。
栈通常被被形容成一叠卡片：要么在最上面添加卡片，要么从最上面拿走卡片：
对于栈来说，最后放进去的内容是最先接收的，也叫做 LIFO（Last-In-First-Out），即后进先出法则。而与队列相对应的叫做 FIFO（First-In-First-Out），即先进先出。
JavaScript 中的数组既可以用作队列，也可以用作栈。它们允许你从首端/末端来添加/删除元素。
这在计算机科学中，允许这样的操作的数据结构被称为**双端队列（deque）**。

**不能够使用==来比较数组**
JavaScript 中的数组与其它一些编程语言的不同，不应该使用 == 运算符比较 JavaScript 中的数组。
该运算符不会对数组进行特殊处理，它会像处理任意对象那样处理数组。
所以，**如果我们使用 == 来比较数组，除非我们比较的是两个引用同一数组的变量，否则它们永远不相等。**

#### 数组的方法
`arr.find(function(item, index, array) {如果返回 true，则返回 item 并停止迭代。对于假值（falsy）的情况，则返回 undefined})`可以找到具有特定条件的对象。
item 是元素。index 是它的索引。array 是数组本身。
```js
let users = [
  {id: 1, name: "John"},
  {id: 2, name: "Pete"},
  {id: 3, name: "Mary"}
];

let user = users.find(item => item.id == 1);

alert(user.name); // John
```
感觉同理可得如果想要看这个数组是不是全零数组，也可以使用这个来判断
`arr.find(item => item !=0)`

`arr.findIndex`方法（与 arr.find 方法）基本上是一样的，但它返回找到元素的索引，而不是元素本身。并且在未找到任何内容时返回 -1。

find 方法搜索的是使函数返回 true 的第一个（单个）元素。
如果需要匹配的有很多，我们可以使用 arr.filter(fn)。
语法与 find 大致相同，但是 filter 返回的是所有匹配元素组成的数组：
```js
let users = [
  {id: 1, name: "John"},
  {id: 2, name: "Pete"},
  {id: 3, name: "Mary"}
];

// 返回前两个用户的数组
let someUsers = users.filter(item => item.id < 3);

alert(someUsers.length); // 2
```

**map方法**是最有用也最常用的方法
它对数组的每个元素都调用函数，并返回结果数组。
```js
// 将每个元素转换为它的字符串长度
let lengths = ["Bilbo", "Gandalf", "Nazgul"].map(item => item.length);
alert(lengths); // 5,7,6
```
```js
// 创建一个数组，数组的每个元素里又有一个子数组
let r = 4,c = 3;
let arr = new Array(r).fill(0).map(() =>new Array(c).fill(0));
```

排序算法：
```js
nums1.sort((a, b) => a-b);
nums2.sort((a, b) => b-a);
```
全新的对数字排序方法，本质还是一个函数，但是表示的更加方便了

通过`arr.some(fn)/arr.every(fn)`检查数组
与 map 类似，对数组的每个元素调用函数 fn。如果任何/所有结果为 true，则返回 true，否则返回 false。
这两个方法的行为类似于 || 和 && 运算符：如果 fn 返回一个真值，arr.some() 立即返回 true 并停止迭代其余数组项；如果 fn 返回一个假值，arr.every() 立即返回 false 并停止对其余数组项的迭代。
我们可以使用 every 来比较数组：
```js
function arraysEqual(arr1, arr2) {
  return arr1.length === arr2.length && arr1.every((value, index) => value === arr2[index]);
}
alert( arraysEqual([1, 2], [1, 2])); // true
```

arr.fill(value, start, end) —— 从索引 start 到 end，用重复的 value 填充数组
**一般用于制作全0或全1矩阵**

arr.flat(depth)/arr.flatMap(fn) 从多维数组创建一个新的扁平数组。

有一个全局方法`Array.from`可以接受一个可迭代或类数组的值，并从中获取一个“真正的”数组。
`Array.from(obj[, mapFn, thisArg])`其完整语法允许我们提供一个可选的“映射（mapping）”函数。
可选的第二个参数 mapFn 可以是一个函数，该函数会在对象中的元素被添加到数组前，被应用于每个元素，此外 thisArg 允许我们为该函数设置 this。
```js
range = [1,2,3,4,5];
// 求每个数的平方
let arr = Array.from(range, num => num * num);

alert(arr); // 1,4,9,16,25
```


```js
let str = '𝒳😂';

// 将 str 拆分为字符数组
let chars = Array.from(str);

alert(chars[0]); // 𝒳
alert(chars[1]); // 😂
alert(chars.length); // 2
```
与 str.split 方法不同，它依赖于字符串的可迭代特性。因此，就像 for..of 一样，可以正确地处理代理对（surrogate pair）。（译注：代理对也就是 UTF-16 扩展字符。）
技术上来讲，它和下面这段代码做的是相同的事：
```js
let str = '𝒳😂';

let chars = []; // Array.from 内部执行相同的循环
for (let char of str) {
  chars.push(char);
}

alert(chars);
```
……但 Array.from 精简很多。
我们甚至可以基于 Array.from 创建代理感知（surrogate-aware）的slice 方法（译注：也就是能够处理 UTF-16 扩展字符的 slice 方法）：
```js
function slice(str, start, end) {
  return Array.from(str).slice(start, end).join('');
}
let str = '𝒳😂𩷶';
alert( slice(str, 1, 3) ); // 😂𩷶
// 原生方法不支持识别代理对（译注：UTF-16 扩展字符）
alert( str.slice(1, 3) ); // 乱码（两个不同 UTF-16 扩展字符碎片拼接的结果）
```

### Map and Set（映射和集合）
#### Map
Map 是一个带键的数据项的集合，就像一个 Object 一样。 但是它们最大的差别是 Map 允许任何类型的键（key）。
- new Map() —— 创建 map。
- map.set(key, value) —— 根据键存储值。
  每一次 map.set 调用都会返回 map 本身，所以我们可以进行“链式”调用：
- map.get(key) —— 根据键来返回值，如果 map 中不存在对应的 key，则返回 undefined。
- map.has(key) —— 如果 key 存在则返回 true，否则返回 false。
- map.delete(key) —— 删除指定键的值。
- map.clear() —— 清空 map。
- map.size —— 返回当前元素个数。
map的重点是key，其主要的操作都是对key进行的操作。
```js
let map = new Map();

map.set('1', 'str1');   // 字符串键
map.set(1, 'num1');     // 数字键
map.set(true, 'bool1'); // 布尔值键
// Map 则会保留键的类型，所以下面这两个结果不同：
alert( map.get(1)   ); // 'num1'
alert( map.get('1') ); // 'str1'

alert( map.size ); // 3
```
使用对象作为键是 Map 最值得注意和重要的功能之一。在 Object 中，我们则无法使用对象作为键。在 Object 中使用字符串作为键是可以的，但我们无法使用另一个 Object 作为 Object 中的键。

- map.keys() —— 遍历并返回所有的键（returns an iterable for keys），
- map.values() —— 遍历并返回所有的值（returns an iterable for values），
- map.entries() —— 遍历并返回所有的实体（returns an iterable for entries）[key, value]，for..of 在默认情况下使用的就是这个。
```js
let recipeMap = new Map([
  ['cucumber', 500],
  ['tomatoes', 350],
  ['onion',    50]
]);
// 遍历所有的键（vegetables）
for (let vegetable of recipeMap.keys()) {
  alert(vegetable); // cucumber, tomatoes, onion
}
// 遍历所有的值（amounts）
for (let amount of recipeMap.values()) {
  alert(amount); // 500, 350, 50
}
// 遍历所有的实体 [key, value]
for (let entry of recipeMap) { // 与 recipeMap.entries() 相同
  alert(entry); // cucumber,500 (and so on)
}
```
这里不管使用什么方法，返回的都是一个可迭代对象，而不是一个数组，如果想要将返回的对象转变为一个数组，需要使用`Array.from(map.keys())`
#### Set
Set 是一个特殊的类型集合 —— “值的集合”（没有键），它的每一个值只能出现一次。
- new Set(iterable) —— 创建一个 set，如果提供了一个 iterable 对象（通常是数组），将会从数组里面复制值到 set 中。
- set.add(value) —— 添加一个值，返回 set 本身
- set.delete(value) —— 删除值，如果 value 在这个方法调用的时候存在则返回 true ，否则返回 false。
- set.has(value) —— 如果 value 在 set 中，返回 true，否则返回 false。
- set.clear() —— 清空 set。
- set.size —— 返回元素个数。
**它的主要特点是，重复使用同一个值调用 set.add(value) 并不会发生什么改变。这就是 Set 里面的每一个值只出现一次的原因。**
```js
let set = new Set();
let john = { name: "John" };
let pete = { name: "Pete" };
let mary = { name: "Mary" };
// visits，一些访客来访好几次
set.add(john);
set.add(pete);
set.add(mary);
set.add(john);
set.add(mary);
// set 只保留不重复的值
alert( set.size ); // 3
for (let user of set) {
  alert(user.name); // John（然后 Pete 和 Mary）
}
```
Set 的替代方法可以是一个用户数组，用 arr.find 在每次插入值时检查是否重复。但是这样性能会很差，因为这个方法会遍历整个数组来检查每个元素。Set 内部对唯一性检查进行了更好的优化。

### JSON
JSON（JavaScript Object Notation）是表示值和对象的通用格式。在 RFC 4627 标准中有对其的描述。最初它是为 JavaScript 而创建的，但许多其他编程语言也有用于处理它的库。因此，当客户端使用 JavaScript 而服务器端是使用 Ruby/PHP/Java 等语言编写的时，使用 JSON 可以很容易地进行数据交换。
- `JSON.stringify`将对象转换为 JSON。
方法 JSON.stringify() 接收对象并将其转换为字符串。
- `JSON.parse`将 JSON 转换回对象。

#### json的编码
```js
let student = {
  name: 'John',
  age: 30,
  isAdmin: false,
  courses: ['html', 'css', 'js'],
  wife: null
};
let json = JSON.stringify(student);
alert(typeof json); // we've got a string!
alert(json);
/* JSON 编码的对象：
{
  "name": "John",
  "age": 30,
  "isAdmin": false,
  "courses": ["html", "css", "js"],
  "wife": null
}
*/
```
得到的json字符串是一个被称为JSON编码（JSON-encoded）或序列化（serialized）或字符串化（stringified）或编组化（marshalled）的对象。
我们现在已经准备好通过有线发送它或将其放入普通数据存储。
JSON 编码的对象与对象字面量有几个重要的区别：
字符串使用双引号。JSON 中没有单引号或反引号。所以 'John' 被转换为 "John"。
对象属性名称也是双引号的。这是强制性的。所以 age:30 被转换成 "age":30。
**JSON 是语言无关的纯数据规范，因此一些特定于 JavaScript 的对象属性会被 JSON.stringify 跳过。**
函数属性（方法）。Symbol 类型的键和值。存储 undefined 的属性。会被跳过
```js
// 数字在 JSON 还是数字
alert( JSON.stringify(1) ) // 1
// 字符串在 JSON 中还是字符串，只是被双引号扩起来
alert( JSON.stringify('test') ) // "test"
alert( JSON.stringify(true) ); // true
alert( JSON.stringify([1, 2, 3]) ); // [1,2,3]

let user = {
  sayHi() { // 被忽略
    alert("Hello");
  },
  [Symbol("id")]: 123, // 被忽略
  something: undefined // 被忽略
};
alert( JSON.stringify(user) ); // {}（空对象）
```
并且json支持嵌套对象转换并进行自动转码
```js
let meetup = {
  title: "Conference",
  room: {
    number: 23,
    participants: ["john", "ann"]
  }
};
alert( JSON.stringify(meetup) );
/* 整个解构都被字符串化了
{
  "title":"Conference",
  "room":{"number":23,"participants":["john","ann"]},
}
*/
```
`JSON.stringify`的完整语法是：
`let json = JSON.stringify(value,[replacer, space])`
value:要编码的值。
replacer:要编码的属性数组或映射函数 function(key, value)。
space:用于格式化的空格数量 如果space=2则等于告诉JavaScript在多行中显示嵌套的对象，对象内部缩进2个空格。
**spaces 参数仅用于日志记录和美化输出。**
大部分情况，JSON.stringify仅与第一个参数一起使用。但是，如果我们需要微调替换过程，比如过滤掉循环引用，我们可以使用JSON.stringify的第二个参数。
如果我们传递一个属性数组给它，那么只有这些属性会被编码。

像 toString 进行字符串转换，对象也可以提供 toJSON 方法来进行 JSON 转换。如果可用，JSON.stringify 会自动调用它。
#### json的解码
`let value = JSON.parse(str, [reviver]);`
str:要解析的 JSON 字符串。
reviver:可选的函数 function(key,value)，该函数将为每个 (key, value) 对调用，并可以对值进行转换。

JSON 不支持注释。向 JSON 添加注释无效。
还有另一种名为 JSON5 的格式，它允许未加引号的键，也允许注释等。但这是一个独立的库，不在语言的规范中。
常规的 JSON 格式严格，并不是因为它的开发者很懒，而是为了实现简单，可靠且快速地实现解析算法。


### 箭头函数
`let func = (arg1, arg2, ..., argN) => expression;`
箭头函数左边是接受的参数，并对右边求值并返回
如果我们只有一个参数，还可以省略掉参数外的圆括号，使代码更短。`let double = n => n * 2;`
如果没有参数，括号则是空的（但括号必须保留）：`let sayHi = () => alert("Hello!");`

**箭头函数对于简单的单行行为（action）来说非常方便，尤其是当我们懒得打太多字的时候。**
带花括号：(...args) => { body } — 花括号允许我们在函数中编写多个语句，但是我们需要显式地 return 来返回一些内容。
```js
let sum = (a, b) => {  // 花括号表示开始一个多行函数
  let result = a + b;
  return result; // 如果我们使用了花括号，那么我们需要一个显式的 “return”
};

alert( sum(1, 2) ); // 3
```

**箭头函数没有 this。如果访问 this，则会从外部获取。**
**不具有 this 自然也就意味着另一个限制：箭头函数不能用作构造器（constructor）。不能用 new 调用它们。**
**箭头函数也没有 arguments 变量。**

### 调度setTimeout & setInterval
有时我们并不想立即执行一个函数，而是等待特定一段时间之后再执行。这就是所谓的“计划调用（scheduling a call）”。
setTimeout 允许我们将函数推迟到一段时间间隔之后再执行。
setInterval 允许我们重复运行一个函数，从一段时间间隔之后开始运行，之后以该时间间隔连续重复运行该函数。
`let timerId = setTimeout(func|code, [delay], [arg1], [arg2], ...)`
`func|code`想要执行的函数或代码字符串。 一般传入的都是函数。由于某些历史原因，支持传入代码字符串，但是不建议这样做。
`delay`执行前的延时，以毫秒为单位（1000 毫秒 = 1 秒），默认值是 0；
`arg1，arg2…`要传入被执行函数（或代码字符串）的参数列表（IE9 以下不支持）
```js
function sayHi() {
  alert('Hello');
}

setTimeout(sayHi, 1000);
```
需要注意的是，setTimeout()里的function不能加()，以上面为例，需要使用sayHi而不能使用sayHi()，因为这个方法是对函数的引用。

**任何 setTimeout 都只会在当前代码执行完毕之后才会执行。**

**可以用clearTimeout来取消调度**
setTimeout 在调用时会返回一个“定时器标识符（timer identifier）”，在我们的例子中是 timerId，我们可以使用它来取消执行。

`setInterval`方法和`setTimeout`的语法相同：`let timerId = setInterval(func|code, [delay], [arg1], [arg2], ...)`
所有参数的意义也是相同的。不过与 setTimeout 只执行一次不同，setInterval 是每间隔给定的时间周期性执行。
想要阻止后续调用，我们需要调用 clearInterval(timerId)。
```js
// 每 2 秒重复一次
let timerId = setInterval(() => alert('tick'), 2000);
// 5 秒之后停止
setTimeout(() => { clearInterval(timerId); alert('stop'); }, 5000);
```
在大多数浏览器中，包括Chrome和Firefox，在显示alert/confirm/prompt弹窗时，内部的定时器仍旧会继续“嘀嗒”。
所以，在运行上面的代码时，如果在一定时间内没有关掉alert弹窗，那么在你关闭弹窗后，下一个 alert 会立即显示。两次alert之间的时间间隔将小于2秒。

**嵌套的 setTimeout 能够精确地设置两次执行之间的延时，而 setInterval 却不能。**

