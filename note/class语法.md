# 一、class语法
## 1.1 class基本语法
```js
class MyClass {
  // class 方法
  constructor() { ... }
  method1() { ... }
  method2() { ... }
  method3() { ... }
  ...
}
```
然后使用`new MyClass()`来创建具有上述列出的所有方法的新对象。

new 会自动调用`constructor()`方法，因此我们可以在`constructor()`中初始化对象。
```js
class User {
    // 构造器方法
  constructor(name) {
    this.name = name;
  }
  sayHi() {
    alert(this.name);
  }
}
// 用法：
let user = new User("John");
user.sayHi();
```

当`new User("John")`被调用：
1. 一个新对象被创建。
2. `constructor`使用给定的参数运行，并将其赋值给`this.name`。

……然后我们就可以调用对象方法了，例如`user.sayHi`。

注意：
**类的方法之间没有逗号**
对于新手开发人员来说，常见的陷阱是在类的方法之间放置逗号，这会导致语法错误。
不要把这里的符号与对象字面量相混淆。在类中，不需要逗号。

## 1.2 什么是class
**在JavaScript中，类是一种函数。**
```js
class User {
  constructor(name) { this.name = name; }
  sayHi() { alert(this.name); }
}
// class 是一个函数
alert(typeof User); // function
// ...或者，更确切地说，是 constructor 方法
alert(User === User.prototype.constructor); // true
// 方法在 User.prototype 中，例如：
alert(User.prototype.sayHi); // sayHi 方法的代码
// 在原型中实际上有两个方法
alert(Object.getOwnPropertyNames(User.prototype)); // constructor, sayHi
```
所以说创建一个类时，其中的方法会被储存在原型中，所以在调用对象时可以访问类中的方法。
而构造器的作用就是来指定这个类的作用，也就是类这个函数的代码。

## 1.3 类不是单纯的语法糖
1. 首先，通过 class 创建的函数具有特殊的内部属性标记`[[IsClassConstructor]]: true`。因此，它与手动创建并不完全相同。
编程语言会在许多地方检查该属性。例如，与普通函数不同，必须使用 new 来调用它：
```js
class User {
  constructor() {}
}
alert(typeof User); // function
User(); // Error: Class constructor User cannot be invoked without 'new'
```
2. 类方法不可枚举。 类定义将 "prototype" 中的所有方法的`enumerable`标志设置为`false`。这很好，因为如果我们对一个对象调用`for..in`方法，我们通常不希望`class`方法出现。

3. 类总是使用`use strict`。 在类构造中的所有代码都将自动进入严格模式。

**就像函数一样，类可以在另外一个表达式中被定义，被传递，被返回，被赋值等。**

## 1.4 类字段
**“类字段”是一种允许添加任何属性的语法。**
类字段重要的不同之处在于，它们会在每个独立对象中被设好，而不是设在`User.prototype`：
```js
class User {
  name = "John";
}

let user = new User();
alert(user.name); // John
alert(User.prototype.name); // undefined
```

我们也可以在赋值时使用更复杂的表达式和函数调用：
```js
class User {
  name = prompt("Name, please?", "John");
}

let user = new User();
alert(user.name); // John
```
类字段`click = () => {...}`是基于每一个对象被创建的，在这里对于每一个`Button`对象都有一个独立的方法，在内部都有一个指向此对象的`this`。我们可以把 `button.click`传递到任何地方，而且`this`的值总是正确的。
在浏览器环境中，它对于进行事件监听尤为有用。

## 1.5 总结
```js
class MyClass {
  prop = value; // 属性

  constructor(...) { // 构造器
    // ...
  }

  method(...) {} // method

  get something(...) {} // getter 方法
  set something(...) {} // setter 方法

  [Symbol.iterator]() {} // 有计算名称（computed name）的方法（此处为 symbol）
  // ...
}
```
技术上来说，`MyClass`是一个函数（我们提供作为`constructor`的那个），而`methods`、`getters`和`settors`都被写入了`MyClass.prototype`。

# 二、类的继承
`class Child extends Parent`是类的继承的方法。
```js
class Animal {
  constructor(name) {
    this.speed = 0;
    this.name = name;
  }
  run(speed) {
    this.speed = speed;
    alert(`${this.name} runs with speed ${this.speed}.`);
  }
  stop() {
    this.speed = 0;
    alert(`${this.name} stands still.`);
  }
}
// 子类rabbit继承了父类animal的方法
class Rabbit extends Animal {
  hide() {
    alert(`${this.name} hides!`);
  }
}

let rabbit = new Rabbit("White Rabbit");

rabbit.run(5); // White Rabbit runs with speed 5.
rabbit.hide(); // White Rabbit hides!
```
## 2.1 重写方法
通常，我们不希望完全替换父类的方法，而是希望在父类方法的基础上进行调整或扩展其功能。我们在我们的方法中做一些事儿，但是在它之前或之后或在过程中会调用父类方法。
Class 为此提供了`"super"`关键字。
- 执行`super.method(...)`来调用一个父类方法。
- 执行`super(...)`来调用一个父类`constructor`（只能在我们的`constructor`中）。

```js
class Animal {
  constructor(name) {
    this.speed = 0;
    this.name = name;
  }
  run(speed) {
    this.speed = speed;
    alert(`${this.name} runs with speed ${this.speed}.`);
  }
  stop() {
    this.speed = 0;
    alert(`${this.name} stands still.`);
  }
}

class Rabbit extends Animal {
  hide() {
    alert(`${this.name} hides!`);
  }
  stop() {
    super.stop(); // 调用父类的 stop
    this.hide(); // 然后 hide
  }
}
let rabbit = new Rabbit("White Rabbit");
rabbit.run(5); // White Rabbit runs with speed 5.
rabbit.stop(); // White Rabbit stands still. White Rabbit hides!
```
现在,`Rabbit`在执行过程中调用父类的`super.stop()`方法，所以`Rabbit`也具有了`stop`方法。

**箭头函数没有`super`，如果被访问，它会从外部函数获取。**

## 2.2 重写constructor
如果一个类扩展了另一个类并且没有`constructor`，那么将生成下面这样的“空”`constructor`：
```js
class Rabbit extends Animal {
  // 为没有自己的 constructor 的扩展类生成的
  constructor(...args) {
    super(...args);
  }
}
```
**继承类的`constructor`必须调用`super(...)`，并且一定要在使用`this`之前调用。**
```js
class Animal {
  constructor(name) {
    this.speed = 0;
    this.name = name;
  }
  // ...
}

class Rabbit extends Animal {
  constructor(name, earLength) {
    super(name);
    this.earLength = earLength;
  }
  // ...
}

// 现在可以了
let rabbit = new Rabbit("White Rabbit", 10);
alert(rabbit.name); // White Rabbit
alert(rabbit.earLength); // 10
```

# 三、静态属性和静态方法
我们可以把一个方法作为一个整体赋值给类。这样的方法被称为**静态的（static）**。
在一个类的声明中，它们以`static`关键字开头，如下所示：
```js
class User {
  static staticMethod() {
    alert(this === User);
  }
}

User.staticMethod(); // true
```
通常，**静态方法用于实现属于整个类，但不属于该类任何特定对象的函数**。
例如，我们有对象`Article`，并且需要一个方法来比较它们。
通常的解决方案就是添加`Article.compare`静态方法：
```js
class Article {
  constructor(title, date) {
    this.title = title;
    this.date = date;
  }

  static compare(articleA, articleB) {
    return articleA.date - articleB.date;
  }
}
// 用法
let articles = [
  new Article("HTML", new Date(2019, 1, 1)),
  new Article("CSS", new Date(2019, 0, 1)),
  new Article("JavaScript", new Date(2019, 11, 1))
];
articles.sort(Article.compare);
alert( articles[0].title ); // CSS
```
**静态方法不适用于单个对象**。静态方法可以在类上调用，而不是在单个对象上。


静态的属性也是可能的，它们看起来就像常规的类属性，但前面加有 static：
```js
class Article {
  static publisher = "Levi Ding";
}

alert( Article.publisher ); // Levi Ding
```
这等同于直接给 Article 赋值：
`Article.publisher = "Levi Ding";`


**静态属性和方法是可被继承的。**

**静态属性被用于当我们想要存储类级别的数据时，而不是绑定到实例。**

# 四、私有的和受保护的属性和方法
## 4.1 内部接口喝外部接口
在面向对象的编程中，属性和方法分为两组：
- **内部接口** —— 可以通过该类的其他方法访问，但不能从外部访问的方法和属性。
- **外部接口** —— 也可以从类的外部访问的方法和属性。

在 JavaScript 中，有两种类型的对象字段（属性和方法）：
- 公共的：可从任何地方访问。它们构成了外部接口。到目前为止，我们只使用了公共的属性和方法。
- 私有的：只能从类的内部访问。这些用于内部接口。
在许多其他编程语言中，还存在“受保护”的字段：只能从类的内部和基于其扩展的类的内部访问（例如私有的，但可以从继承的类进行访问）。它们对于内部接口也很有用。从某种意义上讲，它们比私有的属性和方法更为广泛，因为我们通常希望继承类来访问它们。
受保护的字段不是在语言级别的 Javascript 中实现的，但实际上它们非常方便，因为它们是在 Javascript 中模拟的类定义语法。

## 4.2 受保护的属性
**受保护的属性通常以下划线 _ 作为前缀。**
这不是在语言级别强制实施的，但是程序员之间有一个众所周知的约定，即不应该从外部访问此类型的属性和方法。
此处以创建一个咖啡机为例：
```js
class CoffeeMachine {
  _waterAmount = 0;
  set waterAmount(value) {
    if (value < 0) {
      value = 0;
    }
    this._waterAmount = value;
  }
  get waterAmount() {
    return this._waterAmount;
  }
  constructor(power) {
    this._power = power;
  }
}

// 创建咖啡机
let coffeeMachine = new CoffeeMachine(100);
// 加水
coffeeMachine.waterAmount = -10; // _waterAmount 将变为 0，而不是 -10
```
现在访问已受到控制，因此将水量的值设置为小于零的数变得不可能。
## 4.3 只读的属性
对于`power`属性，让我们将它设为只读。有时候一个属性必须只能被在创建时进行设置，之后不再被修改。
咖啡机就是这种情况：功率永远不会改变。
要做到这一点，我们只需要设置 getter，而不设置 setter：
```js
class CoffeeMachine {
  // ...
  constructor(power) {
    this._power = power;
  }
  get power() {
    return this._power;
  }
}

// 创建咖啡机
let coffeeMachine = new CoffeeMachine(100);
alert(`Power is: ${coffeeMachine.power}W`); // 功率是：100W
coffeeMachine.power = 25; // Error（没有 setter）
```

这里我们使用了 getter/setter 语法。
但大多数时候首选 get.../set... 函数，像这样：
```js
class CoffeeMachine {
  _waterAmount = 0;
  setWaterAmount(value) {
    if (value < 0) value = 0;
    this._waterAmount = value;
  }
  getWaterAmount() {
    return this._waterAmount;
  }
}
new CoffeeMachine().setWaterAmount(100);
```
这看起来有点长，但函数更灵活。它们可以接受多个参数（即使我们现在还不需要）。
另一方面，get/set 语法更短，所以最终没有严格的规定，而是由你自己来决定。

**受保护的字段是可以被继承的**

## 4.4 私有的属性
私有属性和方法应该以 # 开头。它们只在类的内部可被访问。
在语言级别，# 是该字段为私有的特殊标志。我们无法从外部或从继承的类中访问它。
私有字段与公共字段不会发生冲突。我们可以同时拥有私有的`#waterAmount`和公共的`waterAmount`字段。

```js
class CoffeeMachine {

  #waterAmount = 0;

  get waterAmount() {
    return this.#waterAmount;
  }

  set waterAmount(value) {
    if (value < 0) value = 0;
    this.#waterAmount = value;
  }
}

let machine = new CoffeeMachine();

machine.waterAmount = 100;
alert(machine.#waterAmount); // Error
```
目前，各个浏览器对私有字段的支持不是很好，但可以用 polyfill 解决。