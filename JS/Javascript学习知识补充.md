### 1 现代模式
现代模式`"use strict";`当它处于脚本文件的顶部时，则整个脚本文件都将以“现代”模式进行工作。
`"use strict"`可以被放在函数体的开头。这样则可以只在该函数中启用严格模式。
但通常人们会在整个脚本中启用严格模式。

### 2 变量和常量
用`let`来声明一个变量，原来用`var`来声明变量是一种比较古老的方式
`let message = "hello";`
一个变量应该只能被声明一次，之后只进行引用

声明一个常数（不变）变量，可以使用 `const` 而非 `let`,常量不能被修改，否则会报错
一个普遍的做法是将常量用作别名，以便记住那些在执行之前就已知的难以记住的值。例如使用大写字母和下划线来命名这些常量。

### 3 BigInt
numbe类型无法大于大于 (2^53-1)（即 9007199254740991），或小于 -(2^53-1) 的整数。这是其内部表示形式导致的技术限制。
可以通过将 n 附加到整数字段的末尾来创建 BigInt 值。
`const bigInt = 1234567890123456789012345678901234567890n;`

### 4 通过反引号对字符串嵌入
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