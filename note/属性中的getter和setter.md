有两种类型的对象属性。
第一种是**数据属性**。我们已经知道如何使用它们了。到目前为止，我们使用过的所有属性都是**数据属性**。
第二种类型的属性是新东西。它是**访问器属性**（accessor property）。它们本质上是用于获取和设置值的函数，但从外部代码来看就像常规属性。

访问器属性由 “getter” 和 “setter” 方法表示。在对象字面量中，它们用`get`和`set`表示：
```js
let obj = {
  get propName() {
    // 当读取 obj.propName 时，getter 起作用
  },

  set propName(value) {
    // 当执行 obj.propName = value 操作时，setter 起作用
  }
};
```
当读取`obj.propName`时，`getter`起作用，当`obj.propName`被赋值时，`setter`起作用。
例如，我们有一个具有 name 和 surname 属性的对象 user：
```js
let user = {
  name: "John",
  surname: "Smith"
};
```
现在我们想添加一个`fullName`属性，该属性值应该为`"John Smith"`。当然，我们不想复制粘贴已有的信息，因此我们可以使用访问器来实现：
```js
let user = {
  name: "John",
  surname: "Smith",
  get fullName() {
    return `${this.name} ${this.surname}`;
  }
};
alert(user.fullName); // John Smith
```
从外表看，访问器属性看起来就像一个普通属性。这就是访问器属性的设计思想。我们不以函数的方式**调用**`user.fullName`，我们正常**读取**它：`getter`在幕后运行。

截至目前，`fullName`只有一个`getter`。如果我们尝试赋值操作`user.fullName=`，将会出现错误：
```js
let user = {
  get fullName() {
    return `...`;
  }
};
user.fullName = "Test"; // Error（属性只有一个 getter）
```
让我们通过为`user.fullName`添加一个`setter`来修复它：
```js
let user = {
  name: "John",
  surname: "Smith",
  get fullName() {
    return `${this.name} ${this.surname}`;
  },
  set fullName(value) {
    [this.name, this.surname] = value.split(" ");
  }
};
// set fullName 将以给定值执行
user.fullName = "Alice Cooper";
alert(user.name); // Alice
alert(user.surname); // Cooper
```
**所以说，如果只给一个属性设置get而不设置set，则这个属性是只读的，不可被修改。**

可以通过使用`defineProperty`创建一个`fullName`访问器，我们可以使用`get`和`set`来传递描述符：
```js
let user = {
  name: "John",
  surname: "Smith"
};
Object.defineProperty(user, 'fullName', {
  get() {
    return `${this.name} ${this.surname}`;
  },
  set(value) {
    [this.name, this.surname] = value.split(" ");
  }
});
alert(user.fullName); // John Smith
for(let key in user) alert(key); // name, surname
```
请注意，一个属性要么是访问器（具有 get/set 方法），要么是数据属性（具有 value），但不能两者都是。
如果我们试图在同一个描述符中同时提供 get 和 value，则会出现错误：
```js
// Error: Invalid property descriptor.
Object.defineProperty({}, 'prop', {
  get() {
    return 1
  },

  value: 2
});
```