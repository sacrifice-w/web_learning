# 二、dom介绍 
## 2.1 dom 简介

DOM --> Document Object Model 文档对象模型
文档表示的就是整个的 HTML 网页文档
对象表示将网页中的每一个部分都转换成一个对象
模型表示对象之间的关系，从而方便获取对象
**通过 DOM 将所有页面内容表示为可以修改的对象。**

window 是**根对象**，首先，它是 JavaScript 代码的全局对象。其次，它代表“浏览器窗口”，并提供了控制它的方法。
![浏览器整体布局](./picture/js.jpg)
```js
// 将背景颜色修改为红色
document.body.style.background = "red";
// 在 1 秒后将其修改回来
setTimeout(() => (document.body.style.background = ""), 1000);
```

节点(elem)是构成网页的最基本的组成部分，网页中的每一个部分都是一个节点
一共有12种节点类型，但是通常使用的只有4种;
1. `document`是页面的主要“入口点”。我们可以使用它来更改或创建页面上的任何内容。
1. **元素节点**:HTML 文档中的标签,`<html>`是根节点，`<head>`,`<body>`是其子项

1. **文本节点**:元素内的文本形成文本节点，一个文本节点只包含一个字符串。它没有子项，并且总是树的叶子。
**空格和换行符都是完全有效的字符，就像字母和数字。它们形成文本节点并成为 DOM 的一部分。**
由于历史原因,`<head>`之前的空格和换行符均被忽略。
如果我们在`</body>`之后放置一些东西，那么它会被自动移动到`body`内，并处于`body`中的最下方，因为HTML规范要求所有内容必须位于`<body>`内。
**所以`</body>`之后不能有空格。**
**字符串开头/结尾处的空格，以及只有空格的文本节点，通常会被工具隐藏**
与DOM一起使用的浏览器工具通常不会在文本的开始/结尾显示空格，并且在标签之间也不会显示空文本节点（换行符）。
1. **注释**

************************************************
**HTML中的所有内容，甚至注释，都会成为DOM的一部分。**
注释会被标记为 comment node
************************************************


事件：就是用户和浏览器之间的交互行为
比如点击按钮，鼠标移动，关闭窗口等

可以在事件对应的属性中设置 js 代码，当事件被触发时，代码会被执行
所以可以通过对对应事件来绑定处理函数从而响应事件，当事件被触发时，函数会被调用

```js
// 获取按钮对象
let btn = document.getElementById("btn");
// 绑定一个单击事件
btn.onclick = function () {
  alert("hello");
};
```

因为页面的加载是自上而下的，所以 script 标签如果想要运行，必须放到 body 里的标签的下面。
所以想要将 script 标签继续放在 head 里，则需要添加一个 onload 事件，从而使响应函数在页面加载完成之后再执行
这样可以保证代码执行时所有的 DOM 对象都已经加载完成了

```js
window.onload = function () {
  xxxx;
};
```

## 2.2 bom 简介

浏览器对象模型（Browser Object Model），简称 BOM，表示由浏览器（主机环境）提供的用于处理文档（document）之外的所有内容的其他对象。

例如：

- `navigator`对象提供了有关浏览器和操作系统的背景信息。navigator 有许多属性，但是最广为人知的两个属性是：`navigator.userAgent`—关于当前浏览器，`navigator.platform`—关于平台（可以帮助区分 Windows/Linux/Mac 等）。
- `location`对象允许我们读取当前`URL`，并且可以将浏览器重定向到新的`URL`。

```js
alert(location.href); // 显示当前 URL
if (confirm("Go to Wikipedia?")) {
  location.href = "https://wikipedia.org"; // 将浏览器重定向到另一个 URL
}
```

函数`alert/confirm/prompt`也是**BOM**的一部分：它们与文档（document）没有直接关系，但它代表了与用户通信的纯浏览器方法。

## 2.3 规范
**DOM 规范**
描述文档的结构、操作和事件，详见 [DOM规范](https://dom.spec.whatwg.org)。
CSSOM 规范
描述样式表和样式规则，对它们进行的操作，以及它们与文档的绑定，[CSSOM规范](https://www.w3.org/TR/cssom-1/)。
**HTML 规范**
描述 HTML 语言（例如标签）以及 BOM（浏览器对象模型）— 各种浏览器函数：setTimeout,alert,location等，详见[HTML规范](https://html.spec.whatwg.org)。它采用了 DOM 规范，并使用了许多其他属性和方法对其进行了扩展。
此外，某些类被分别描述在 [](https://spec.whatwg.org/)。

## 2.4 浏览器开发工具
开发者工具中的 DOM 结构是经过简化的。文本节点仅以文本形式显示。并且根本没有“空白”（只有空格）的文本节点。这其实挺好，因为大多数情况下，我们只关心元素节点。
点击左上角的 ![](./picture/button.jpg)按钮可以让我们使用鼠标（或其他指针设备）从网页中选择一个节点并“检查（inspect）”它（在元素选项卡中滚动到该节点）。当我们有一个巨大的HTML页面（和相应的巨大 DOM），并希望查看其中的一个特定元素的位置时，这很有用。
另一种方法是在网页上右键单击，然后在上下文菜单中选择“检查（Inspect）”。

- **Styles** — 我们可以看到按规则应用于当前元素的CSS规则，包括内建规则（灰色）。几乎所有内容都可以就地编辑，包括下面的方框的dimension/margin/padding。
- **Computed** — 按属性查看应用于元素的 CSS：对于每个属性，我们可以都可以看到赋予它的规则（包括CSS继承等）。
- **Event Listeners** — 查看附加到 DOM 元素的事件侦听器。 

当然，在浏览器开发工具中，还能够通过与控制台交互来给页面中的元素添加一些js代码和命令。

# 三、dom学习
## 3.1 dom的遍历
### 3.1.1 顶部节点
最顶层的树节点可以直接作为 document 的属性来使用：
`<html> = document.documentElement`
最顶层的document节点是`document.documentElement`。这是对应`<html>`标签的DOM节点。
`<body> = document.body` -`<body>`元素
`<head> = document.head` -`<head>`元素
脚本无法访问在运行时不存在的元素。
尤其是，如果一个脚本是在`<head>`中，那么脚本是访问不到`document.body`元素的，因为浏览器还没有读到它。
```js
<html>
<head>
  <script>
    alert( "From HEAD: " + document.body ); // null，这里目前还没有 <body>
  </script>
</head>
<body>
  <script>
    alert( "From BODY: " + document.body ); // HTMLBodyElement，现在存在了
  </script>
</body>
</html>
```

*******************
在 DOM 中，null 值就意味着“不存在”或者“没有这个节点”。
*******************

### 3.1.2 子节点
子节点 — 对应的是直系的子元素。换句话说，它们被完全嵌套在给定的元素中。例如，`<head>`和`<body>`就是`<html>`元素的子元素。
子孙元素 — 嵌套在给定元素中的所有元素，包括子元素，以及子元素的子元素等。

`childNodes`属性会获取包括文本节点在内的所有节点，包括**文字节点**
`firstChild`获取当前节点的第一个子节点
`lastChild`获取当前节点的最后一个子节点
```js
elem.childNodes[0] === elem.firstChild
elem.childNodes[elem.childNodes.length - 1] === elem.lastChild
```
这里还有一个特别的函数`elem.hasChildNodes()`用于检查节点是否有子节点。

`childNodes`看起来就像一个数组。但实际上它并不是一个数组，而是一个**集合**— 一个类数组的可迭代对象。
- 可以使用for...of来迭代
- 无法使用数组的方法，因为他不是一个数组
  如果我们想要使用数组的方法的话，我们可以使用`Array.from`方法来从集合创建一个“真”数组：

**DOM 集合是只读的**
**DOM 集合是实时的**
**不要使用 for..in 来遍历集合**
### 3.1.3 兄弟节点和父节点
**兄弟节点（Sibling）** 是指有同一个父节点的节点。
下一个兄弟节点在`nextSibling`属性中，上一个是在`previousSibling`属性中。
可以通过`parentNode`来访问父节点。
```js
// <body> 的父节点是 <html>
alert( document.body.parentNode === document.documentElement ); // true
// <head> 的后一个是 <body>
alert( document.head.nextSibling ); // HTMLBodyElement
// <body> 的前一个是 <head>
alert( document.body.previousSibling ); // HTMLHeadElement
```
### 3.1.4 纯元素导航
上面列出的导航（navigation）属性引用**所有**节点。例如，在**childNodes**中我们可以看到文本节点，元素节点，甚至包括注释节点（如果它们存在的话）。
但是对于很多任务来说，我们并不想要文本节点或注释节点。我们希望操纵的是代表标签的和形成页面结构的元素节点。
所以，让我们看看更多只考虑**元素节点**的导航链接（navigation link）
这些链接和我们在上面提到过的类似，只是在词中间加了 Element：
- `children` — 仅那些作为元素节点的子代的节点。
- `firstElementChild`，`lastElementChild` — 第一个和最后一个子元素。
- `previousElementSibling`，`nextElementSibling` — 兄弟元素。
- `parentElement` — 父元素。

parentElement 属性返回的是“元素类型”的父节点，而 parentNode 返回的是“任何类型”的父节点。这些属性通常来说是一样的：它们都是用于获取父节点。
唯一的例外就是 **document.documentElement**：
```js
alert( document.documentElement.parentNode ); // document
alert( document.documentElement.parentElement ); // null
```
### 3.1.5 表格
表格（Table）是一个很好的例子，它代表了一个特别重要的情况：

`<table>`元素支持(除了上面给出的，之外) 以下这些属性:
`table.rows` — `<tr>` 元素的集合。
`table.caption/tHead/tFoot` — 引用元素 `<caption>，<thead>，<tfoot>`。
`table.tBodies` — `<tbody>`元素的集合（根据标准还有很多元素，但是这里至少会有一个 — 即使没有被写在HTML源文件中，浏览器也会将其放入DOM中）。
`<thead>，<tfoot>，<tbody>` 元素提供了 rows 属性：
`tbody.rows` — 表格内部`<tr>`元素的集合。
`<tr>`：
`tr.cells` — 在给定 `<tr>` 中的 `<td>` 和 `<th>` 单元格的集合。
`tr.sectionRowIndex` — 给定的 `<tr>` 在封闭的 `<thead>/<tbody>/<tfoot>` 中的位置（索引）。
`tr.rowIndex` — 在整个表格中 `<tr>` 的编号（包括表格的所有行）。
`<td> 和 <th>`：
`td.cellIndex` — 在封闭的 `<tr>`中单元格的编号。
```html
<table id="table">
  <tr>
    <td>one</td><td>two</td>
  </tr>
  <tr>
    <td>three</td><td>four</td>
  </tr>
</table>
<script>
  // 获取带有 "two" 的 td（第一行，第二列）
  let td = table.rows[0].cells[1];
  td.style.backgroundColor = "red"; // highlight it
</script>
```

## 3.2 搜索
### 3.2.1 getElementsBy*
通过**document**对象调用获取元素节点
**只有`document.getElementById`，没有`anyElem.getElementById`**
getElementById()
   通过 id 属性获取一个元素节点对象
   getElementById方法只能被在document对象上调用。它会在整个文档中查找给定的id。


1. document.getElementsByTagName()
   通过标签名获取一组元素节点对象
   这个会返回一个类数组对象，会将所有返回的内容封装到一个对象中，即使其只有一个
2. document.getElementsByName()
   通过 name 属性获取一组元素节点对象

`elem.getElementsByClassName(className)`返回具有给定CSS类的元素。

所有的 "getElementsBy*" 方法都会返回一个 **实时的（live）** 集合。这样的集合始终反映的是文档的当前状态，并且在文档发生更改时会“自动更新”。
相反，querySelectorAll 返回的是一个 **静态的** 集合。就像元素的固定数组。
### 3.2.2 elem.querySelector*
最常用的方法：
`elem.querySelectorAll(css)`返回**elem**中与给定**CSS**选择器匹配的所有元素。
在这里，我们查找所有为最后一个子元素的`<li>`元素：
```html
<ul>
  <li>The</li>
  <li>test</li>
</ul>
<ul>
  <li>has</li>
  <li>passed</li>
</ul>
<script>
  let elements = document.querySelectorAll('ul > li:last-child');
  for (let elem of elements) {
    alert(elem.innerHTML); // "test", "passed"
  }
</script>
```
CSS选择器的伪类，例如 :hover 和 :active 也都是被支持的。例如，`document.querySelectorAll(':hover')` 将会返回鼠标指针正处于其上方的元素的集合（按嵌套顺序：从最外层 `<html>` 到嵌套最多的元素）。

`elem.querySelector(css)`调用会返回给定CSS选择器的**第一个**元素。
换句话说，结果与`elem.querySelectorAll(css)[0]`相同，但是后者会查找**所有**元素，并从中选取一个，而`elem.querySelector`只会查找一个。因此它在速度上更快，并且写起来更短。

### 3.2.3 matches
`elem.matches(css)`不会查找任何内容，它只会检查 elem 是否与给定的 CSS 选择器匹配。它返回 true 或 false。

当我们遍历元素（例如数组或其他内容）并试图过滤那些我们感兴趣的元素时，这个方法会很有用。
```html
<a href="http://example.com/file.zip">...</a>
<a href="http://ya.ru">...</a>
<script>
  // 不一定是 document.body.children，还可以是任何集合
  for (let elem of document.body.children) {
    // $=是以xxx结尾的意思，这里的意思是以zip结尾
    if (elem.matches('a[href$="zip"]')) {
      alert("The archive reference: " + elem.href );
    }
  }
</script>
```

### 3.2.4 closest
元素的祖先（ancestor）是：父级，父级的父级，它的父级等。祖先们一起组成了从元素到顶端的父级链。
`elem.closest(css)`方法会查找与 CSS 选择器匹配的最近的祖先。elem 自己也会被搜索。
换句话说，方法`closest`在元素中得到了提升，并检查每个父级。如果它与选择器匹配，则停止搜索并返回该祖先。
```html
<h1>Contents</h1>

<div class="contents">
  <ul class="book">
    <li class="chapter">Chapter 1</li>
    <li class="chapter">Chapter 1</li>
  </ul>
</div>

<script>
  let chapter = document.querySelector('.chapter'); // LI

  alert(chapter.closest('.book')); // UL
  alert(chapter.closest('.contents')); // DIV

  alert(chapter.closest('h1')); // null（因为 h1 不是祖先）
</script>
```

### 3.2.5 总结
方法名 | 搜索方式	| 可以在元素上调用？|	实时的？
-|-|-|-|
querySelector|	CSS-selector|	✔	|-
querySelectorAll|	CSS-selector|	✔|	-
getElementById	|id	|-|	-
getElementsByName|	name|	-|	✔
getElementsByTagName|	tag or '*'|	✔|	✔
getElementsByClassName	|class|	✔	|✔


用来检查子级与父级之间关系的方法：
如果 elemB 在 elemA 内（elemA 的后代）或者 elemA==elemB，elemA.contains(elemB) 将返回 true。