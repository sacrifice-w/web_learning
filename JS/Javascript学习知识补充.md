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


### 全新的排序方法
```js
nums1.sort((a, b) => a-b);
nums2.sort((a, b) => b-a);
```
全新的对数字排序方法，本质还是一个函数，但是表示的更加方便了

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
