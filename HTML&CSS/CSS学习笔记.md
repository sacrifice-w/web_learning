hia网页主要分为三部分：
结构（HTML）
表现（CSS）——层叠样式表
行为（JavaScript）

# 1 CSS布局
## 1.1 CSS基础
通过CSS可以分别为网页的每一层设置样式
1. （行内样式表）在标签内部通过style属性来设置元素的样式(不推荐使用)，只对一个标签生效，的确有点蠢-.-
`<p style="color:red; font-size: 60px;"> HELLO WORLD </p>`
2. （内部样式表）将样式编写到head中的style标签中，通过CSS的选择器来选中元素并为其设置各种样式,只能对一个网页起作用，不能跨页面进行复用
```CSS
<style>
    
    p{
        color:green;
        font-size:50px;
    }

</style>
```
3. （外部样式表） 将CSS样式直接写到CSS文件中,然后通过link标签引入外部CSS文件(head里)
`<link rel="stylesheet" href="./style.css">`
**这种方式可以使用浏览器的缓存机制，从而加快网页的加载速度**
### 1.1.1声明块
- 通过声明块来指定要为元素设置的样式
- 声明块由一个一个的声明组成
- 声明块是一个名值对结构（一个样式名对应一个样式值，名和值之间以:连接，以;结尾）
## 1.2 基本语法
如果使用内部样式表，在style区域里要使用css的语法
### 1.2.1 注释
`/*    */` 
### 1.2.2 选择器(selectors)
**通过选择器可以选中页面中的指定元素**
#### 1.2.2.1 常用选择器
1. **元素选择器**
- 作用：根据标签名来选中指定的元素
- 语法：标签名{}
- 例子：p{}  h1{}  div{}
2. **id选择器**
- 作用：根据元素的id属性值来选中一个元素
- 语法：#id属性值{}
- 例子：#box{color:red;}
- 注释：不能出现重复id哦
3. **class选择器**
- 作用：根据元素的class属性值来选中一个元素
- 语法：.class属性值{}
- 例子：.xxx{color:red;}
- 注释：class和id类似，但是class可以重复使用，用class来为元素分类,而且可以给一个元素赋多个class值`<p class="xxx abc">`
4. **通配选择器**
- 作用：选中页面中的元素
- 语法：*{}
- 例子：就是这么用啊
#### 1.2.2.2 复合选择器
1. **交集选择器**
- 作用：选中同时复合多个条件的元素
- 语法：选择器1选择器2选择器3...选择器n{}
- 注释：交集选择器中如果有元素选择器，必须使用元素选择器开头
2. **选择器分组（并集选择器）**
- 作用：选中多个元素
- 语法：选择器1,选择器2,选择器3,...选择器n{}
- 注释：其实就是同时选多个元素
#### 1.2.2.3 关系选择器
父元素：直接包含子元素的元素
子元素：直接被父元素包含的元素
祖先元素：直接或间接包含后代元素的元素  一个元素的父元素也是他的祖先元素
后代元素：直接或间接被祖先元素包含的元素  子元素也是后代元素
兄弟元素：拥有相同父元素的元素是兄弟元素
```html
<div>
    我是div

    <p>
        我是div中的p元素
        <span>我是p元素中的span</span>
    </p>

    <span>我是div中的span元素</span>
    <span>我是div中的span元素</span>
    <span>我是div中的span元素</span>
    <span>我是div中的span元素</span>

</div>
```
1. **子元素选择器**
- 作用：选中指定父元素的指定子元素
- 语法：父元素>子元素{}
- 例子：div>span{}(这里选择的就是div中的span元素)
- 注释：这个大于号可以无限叠加，从而一直寻找下去
2. **后代元素选择器**
- 作用：选中指定元素的指定后代元素
- 语法：祖先元素 后代元素{}
- 例子：div span{}(这里选择的就是p中的span元素和div中的span元素)nth-cih
3. **兄弟元素选择器**
- 作用：选中指定元素的下一个兄弟元素
- 语法：前一个元素+后一个元素{}
- 例子：p+span{}(这里选择的就是div中的span元素)
-----------------------------------------------
- 作用：选中指定元素的下面所有的兄弟元素
- 语法：兄元素~弟元素{}
- 例子：p~span{}(这里选择的就是所有div中的span元素)
@import "picture/brother.png"
#### 1.2.2.4 属性选择器
`[属性名]`选择含有指定属性的元素
`[属性名=属性值]`选择含有指定属性和属性值的元素
`[属性名^=属性值]`选择属性值以指定值开头的元素
`[属性名$=属性值]`选择属性值以指定值结尾的元素
`[属性名*=属性值]`选择属性值含有某值的元素
`p[title$=abc]{color:orange;}`
#### 1.2.2.5 伪类选择器
伪类用来描述一个元素的特殊状态（eg：第一个子元素、被点击的元素、鼠标移入的元素）
伪类一般情况下都是以:开头
`ul>li:first-child`表示列表中的第一个子元素
`:nth-child(n)`选中第n个子元素,这里这个n是一个数组，表示[0,+无穷]，2n或者even就是选择偶数，2n+1或者odd表示奇数
`:first-of-type`表示的是同类型元素排序
`:not`表示否定
_超链接的伪类_
`:link`表示的是正常的链接
`:visited`表示的是已经访问过的链接，但是因为隐私问题，这个伪类只能修改颜色。
**`:hover`表示鼠标移入的状态**
**`:active`表示鼠标点击的状态**
### 1.2.3 伪元素
伪元素表示的是页面中一些特殊位置的元素，比如用在开头
用::表示
`::first-letter`表示第一个字母
`::first-line`表示第一行
`::selection`表示选中的内容
`::before`和`::after`分别表示元素的开始和最后，但是他必须结合content属性使用

就比如div ::before{content:'hello'} 表示的是在div元素前面加一个hello。

阶段性练习：餐厅练习(https://flukeout.github.io/)

### 1.2.4 样式的继承（inherited）
为一个元素设置的样式同时也会应用到他的后代元素上
利用继承可以将通用样式统一设置到共同的祖先元素上
背景相关的和布局相关等的样式不会被继承
### 1.2.5 选择器的权重
样式冲突：当通过不同选择器选中相同元素，并设置不同值使，就会发生样式冲突。
发生样式冲突时，由选择器权重决定
- 内联样式 1000
- id选择器 100 
- 类和伪类选择器 10 
- 元素选择器 1
- 通配选择器（*） 0 任意操作都能将其覆盖掉
- 继承的样式 没有优先级
比较优先级时，需要将所有的选择器的优先级进行相加计算，最后优先级越高，越优先显示（分组选择器单独计算）
选择器的累加不会超过其最大数量级
优先级相同时，优先使用靠下的样式
可以在某一个样式的后面添加！important，此样式就会获得最高优先级。
### 1.2.6 一些基础数据
- 像素：px
- 百分比：设置父元素的大小后，可以通过设置相对于父元素的百分比来调整子元素的大小
- em：1em=1font-size em会根据字体大小来改变
- rem：相对于根元素的字体大小来计算（根据html的字体大小）
- rgb:rgb(255,0,0);(red,green,blue)，也可以用十六进制来表示：#ff0000;如果两位颜色重复可以简写，#ffff00-->#ff0
- 可以通过rgba来设置不透明度，第四个表示不透明度，1表示完全不透明，0表示完全透明，.5表示半透明
eg：rgba(255,255,255,.5)
- HSL值 
H色相（0-360）
S饱和度 颜色的浓度（0%-100%）
L亮度 颜色的亮度（0%-100%）
eg：hsl(120,100%,100%)
### 1.2.7 文档流（normal flow）
文档流是网页最底层，是网页的基础
所创建的元素都默认在文档流中进行排列
元素在文档流中有什么特点：
- 块元素
块元素会在页面中独占一行
默认宽度是父元素的全部
默认高度是被内容撑开
- 行内元素
行内元素不会独占页面的一行，只占自身的大小
行内元素在页面中左向右水平排列时，与书写习惯一致，一行占满到第二行继续
行内元素的默认宽度和高度都是被内容撑开

### 1.2.8 盒子模型（box model）
CSS将页面中的所有元素都设置为一个矩形的盒子
将元素设置为矩形盒子后，对页面的布局就是将不同的盒子摆放到不同的位置

组成部分：内容区（content）
          边框（border）：需要至少设置三个样式：border-width，border-color，border-style。边框的大小会影响盒子的大小
          内边距（padding）
          外边距（margin）
@import "picture/boxmodel.gif"

**盒子的可见框的大小，由内容区、内边距和边框共同决定**
#### 1.2.8.1 内容区（content）
元素中的所有子元素和文本内容都在内容区中排列
大小由width和height设置
#### 1.2.8.2 边框（border）
- 边框的宽度：border-width（可以不写，默认3px）
             可以用来指定四个方向边框的宽度
             四个值：上、右、下、左
             三个值：上、左右、下
             两个值：上下、左右
             也可以用border-xxx-width表示：top、bottom、left、right
- 边框的颜色；border-color,可以分别指定四个边的边框，规则和宽度一样。也可以直接用color
- 边框的样式；border-style，solid：实线；dotted：点状虚线；dashed：虚线；double：双线；默认值是none
可以直接用border来代替上面这些，`border：10px，orange，solid；`顺序没有限制,同理border-top可以只设置上边框
#### 1.2.8.3 内边距（padding）
内容区和边框之间的距离是内边距
内边距的设置会影响到盒子的大小
背景颜色会延伸到内边距上
其应用和border一致，就是换成了padding。
#### 1.2.8.4 外边距（margin）
外边距不会影响盒子可见框的大小
外边距会影响盒子的位置
默认情况下左和上外边距会移动元素自身
下和右外边距会移动其他元素
margin可以设置负值，负值会向相反方向移动
#### 1.2.8.5 盒子的水平布局
- 一个元素在其父元素中，水平布局必须满足下面的等式

- margin-left + border-left + padding-left + width + padding-right + border-right + margin-right = 其父元素内容区的宽度（必须满足） 

- 如果等式不成立的话，则成为过度约束，则等式会自动调整

- 如果这七个值中没有为auto的情况，则浏览器会自动调整margin-right的值使等式成立

- 如果有值为auto，则会用auto值去使等式成立（width、margin-left、margin-right这三个值能设置为auto）

- 如果width和margin-right同时为auto，则width最大，margin-right为0

- 如果将两个外边距设置为auto，width固定的话，则会使两外边距设置的值相同，从而使元素在其父元素中水平居中

- 如果子元素的宽度大于父元素，则会给一个负的margin来满足等式
#### 1.2.8.6 盒子的垂直布局
默认情况下父元素的高度被内容撑开
写上就是该是多少就是多少
子元素是在父元素的内容区中排列的，如果子元素的大小超过了父元素，子元素会从父元素中溢出
使用overflow属性来设置父元素如何处理溢出的子元素
`overflow：visible；` 
- visible是默认值，子元素会从父元素中溢出，在父元素外部的位置显示
- hidden 溢出的内容将会被裁剪不会显示
- scroll 生成两个滚动条，通过滚动条来查看完整的内容
- **auto** 根据需要生成滚动条
#### 1.2.8.7 外边距的折叠
相邻的垂直方向外边距会发生重叠现象
- 兄弟元素间的相邻垂直外边距会取两者之间的较大值，无影响
 （如果相邻的外边距一正一负，则取两者的和；如果都是负值，则取绝对值较大的）
- 父子元素间相邻外边距，子元素的会传递给父元素（上外边距）
  父子外边距的折叠会影响到页面的布局，必须进行处理
#### 1.2.8.8 行内元素的盒模型
行内元素不支持设置宽度和高度
可以设置padding/border/margin，但是垂直方向的padding/border/margin不会影响页面的布局
如果想要将行内元素设置宽度和高度，可以用display属性来设置元素显示的类型：
inline：将元素设置为行内元素；block：将元素设置为块元素；inline-block：将元素设置为行内块元素，比较奇怪...；table：变成表格；none：不显示；
visibility用来设置元素的显示状态：visible 默认值，正常显示；hidden 隐藏不显示，但是依然占据页面的位置。

#### 1.2.8.9 浏览器的默认样式
通常情况下，浏览器会为元素设置一些默认样式
默认样式的存在会影响到页面的布局
通常情况下编写网页时必须去除浏览器的默认样式（PC）
在浏览器中按f12打开元素查看器，然后查看body的大小，就可以看到浏览器的默认样式
想要去除默认样式，其实就是去除这些元素的本身的margin和padding等。
可以直接用*{margin：0；padding：0；}来直接全部去除，但是有些标签可能去不掉

可以直接通过调用外部文件来去除这些默认样式，直接通过link引入就可以了
reset.css 直接去除浏览器的默认样式
normalize.css 对默认样式进行了统一 现在这个好像用的多一点

#### 1.2.8.10 盒模型练习
详情见exercise/01、02
对文字进行排版可以直接为这些文字加一个父元素，然后设置父元素的大小就行了，通过height来限制他,用font-size整体调节
想让文字在父元素中垂直居中，需要将父元素的line-height和height设置的一致
可以用text-decoration来消除超链接的下划线
#### 1.2.8.11 盒子的大小
默认情况下，盒子可见框的大小由内容区、内边距和边框共同决定
可以使用box-sizing来设置盒子尺寸的计算方式（设置width和height的作用）
- content-box 默认值，宽度和高度用来设置内容区的大小
- border-box 宽度和高度用来设置整个盒子可见框的大小（width和height指的是内容区和内边距和边框的总大小）
#### 1.2.8.12 轮廓和圆角
- outline用来设置元素的轮廓线，用法和border一模一样。轮廓和边框不同的点就是轮廓不会影响到可见框的大小
- box-shadow 用来设置元素的阴影效果，阴影不会影响页面布局
  `box-shadow:10px 10px 10px orange`水平偏移量（正值向右）、垂直偏移量（正值向下）、阴影的模糊半径、颜色
- border-radius 用来设置圆角（左上、右上、右下、左下） border-top-left-radius设置左上圆角
  `border-top-left-radius:50px 100px;`前面的是水平方向的半径，后面的是竖直方向的半径
  border-radius：50%就是将元素设置为一个圆形

### 1.2.9 浮动（float）
通过浮动可以将一个元素向其父元素的左侧或右侧移动，但是默认情况下浮动元素默认不会从父元素中移出
使用float属性来设置元素的浮动
可选值：none 默认值，元素不浮动
       left 元素向左浮动
       right 元素向右浮动
元素设置浮动后，水平布局的等式不需要强制成立

元素设置浮动后，会完全从文档流中脱离，不再占用文档流的位置，所以元素下边的还在文档流中的元素会自动向上移动

浮动元素向左或向右移动时，不会超过它前面的其他浮动元素

如果浮动元素的上边是一个没有浮动的元素，则浮动元素无法上移

浮动元素不会超过它上边的浮动的兄弟元素，最多和它一样高

**通过浮动就可以来制作水平布局**

- 浮动元素不会盖住文字，文字会自动环绕在浮动元素的周围，从而利用浮动来设置文字环绕图片的效果
- 脱离文档流后，块元素不再独占页面的一行；块元素的宽度和高度默认都被内容撑开；行内元素脱离文档流后会变成块元素，特点和块元素一样。
- **脱离文档流后，不再区分块元素和行内元素**

练习见03/04.html
#### 1.2.9.1 高度塌陷
在浮动布局中，父元素的高度默认是被子元素撑开的。
当子元素浮动后，其会完全脱离文档流，从而导致无法撑起父元素的高度，导致父元素的高度丢失。
父元素高度丢失后，其下的元素会自动上移，导致页面的布局混乱。

#### 1.2.9.2 BFC(block formatting context)块级格式化环境
BFC是一个CSS中的一个隐含属性，可以为一个元素开启BFC，开启BFC后该元素会变成一个独立的布局区域。
元素开启BFC后的特点：
1. 开启BFC的元素不会被浮动元素所覆盖
1. 开启BFC的元素子元素和父元素外边距不会重叠
1. 开启BFC的元素可以包含浮动的子元素

可以通过一些特殊方式来开启元素的BFC:
1. 设置元素的浮动（不推荐）
1. 将元素设置为行内块元素（不推荐）display：inline-block；
1. 将元素的overflow设置为一个非visible的值
   为元素设置overflow:hidden 开启BFC

#### 1.2.9.3 clear
如果不希望某个元素因为其他元素浮动的影响而改变位置，可以通过clear属性来清除浮动元素对当前元素所产生的影响
clear:left/right/both清除左侧/右侧/两侧中最大影响的那侧浮动元素对当前元素的影响
原理：设置清除浮动后，浏览器会自动位元素添加一个上外边距以使其位置不受其他元素的影响

#### 1.2.9.4 使用after伪类来消除高度塌陷
将父元素使用after伪类来消除高度塌陷
```CSS
<style>
  .box1{
    border:10px red solid;
  }
  .box2{
    width:100px;
    height:100px;
    background-color:#bfa;
    float:left;
  }
  /* 等于在box1后面加了一个空的content，然后就可以将整个box按块元素显示，再用clear来消除影响 */
  .box1::after{
    content:'';
    display:block;
    clear:both;
  }
</style>
```
#### 1.2.9.5 clearfix
通过display:table;来解决外边距折叠的问题
clearfix这个样式可以同时解决高度塌陷和外边距重叠的问题，当你在遇到这些问题时，可以直接使用clearfix这个类来解决
也就是在元素中添加clearfix这个类
```CSS
.clearfix::before,
.clearfix::after{
  content:'';
  display:table;
  clear:both;
}
```

## 1.3 定位（position）
定位是一种更加高级的布局手段
使用定位可以将元素摆放到页面的任意位置
使用position属性来设置定位

可选值：
- static 默认值，元素是静止的没有开启定位
- relative 开启元素的相对定位
- absolute 开启元素的绝对定位
- fixed 开启元素的固定定位
- sticky 开启元素的粘滞定位

### 1.3.1 相对定位
position：relative；
相对定位的特点：
1. 元素开启相对定位后，如果不设置偏移量（offset）元素不会发生任何变化
1. 相对定位是参照于元素在文档流中的位置进行定位的
1. 相对定位会提升元素的层级
1. 相对定位不会使元素脱离文档流
1. 相对定位不会改变元素的性质，块元素还是块元素；行内元素还是行内元素

偏移量（offset）：
- top：定位元素和定位位置上边的距离
- bottom：定位元素和定位位置下边的距离
定位元素垂直方向的位置通常只由一个来控制
- left 同理，左侧距离
- right 同理，右侧距离

### 1.3.2 绝对定位
position：absolute；
绝对定位的特点：
1. 开启绝对定位后，如果不设置偏移量元素的位置不会发生变化
1. 开启绝对定位后，元素会从文档流中脱离
1. 绝对定位会改变元素的性质，行内变成块，块的宽高会被内容撑开
1. 绝对定位会使元素提升一个层级
1. 绝对定位元素是相对于其包含块进行定位的

包含块（containing block）：
- 正常情况下，包含块就是离当前元素最近的祖先块元素
- 绝对定位的包含块：离他最近的开启了定位的祖先元素，如果都没有开启定位，则相对于根元素进行定位
- html（根元素、初始包含块）
### 1.3.3 固定定位
position fixed：
固定定位也是一种绝对定位，所以固定定位的大部分特点都和绝对定位一样
唯一不同的是固定定位永远参照于浏览器的视口进行定位
视口：浏览器的可视窗口
固定定位的元素不会随网页的滚动条滚动
### 1.3.4 粘滞定位
position sticky：
粘滞定位和相对定位的特点基本一致，不同的是粘滞定位可以在元素到达某个位置时将其固定
### 1.3.5 元素的层级
对于开启了定位的元素，可以通过z-index属性来指定元素的层级
z-index需要一个整数作为参数，值越大元素的层级越高
元素的层级越高越优先显示
如果元素层级一致，优先显示靠下的元素
祖先元素的层级再高，也不会盖住后代元素

练习05.html,只是完成了定位，但是想要切换还是得靠js

## 1.4 字体
color：字体颜色
font-size:字体的大小
em相当于当前元素的一个font-size
rem相当于根元素的一个font-size

font-family 字体族（字体的格式） 可以同时指定多个字体，多个字体间使用,隔开，字体生效时优先使用第一个，第一个无法使用则使用第二个...
可选值：serif 衬线字体
       sans-serif 非衬线字体
       monospace 等宽字体
可以使用@font-face来将服务器中的字体直接提供给客户去使用
```css
@font-face{
  /* 用这个来给字体命名 */
  font-family:'myfont';
  /* 指定字体路径 */
  src:url('./font/xxx.ttf') format('truetype');
}
```
使用时需要下载字体来给用户使用，所以会有加载速度问题，也有版权问题。
### 1.4.1 图标字体（iconfont）
在网页中经常要使用一些图标，可以通过图片来引入图标
将图标直接设置为字体，然后通过font-face的形式来对字体进行引入，通过使用字体的形式来使用图标
从fontawesome中引入，将all.css引入到网页中
使用图标字体，直接通过类名来使用图标字体
`class="fas fa-bell"`
`class="fab fa-accessible-icon"`
阿里云旗下图标字体库
“https://www.iconfont.cn”
### 1.4.2 图标字体的其他用法
通过伪元素来设置图标字体
1. 找到要设置图标的元素通过before或after选中
1. 在content中设置字体的编码
1. 设置字体的样式
fab:
font-family:'Font Awesome 5 Brands'

fas:
font-family:'Fot Awesome 5 Free'
font-weight:'900px'
### 1.4.3 行高（line height）
- 行高指的是文字占有的实际高度
- 通过line-height来设置行高，行高可以直接指定一个大小（px em）
也可以直接为行高设置一个整数 如果是一个整数的话，行高将会是字体的指定的倍数
- 字体框就是字体存在的格子，设置font-size实际上就是在设置字体框的高度
行高会在字体框的上下平均分配
可以将行高设置为和高度一样的值，使单行文字在一个元素中垂直居中
`height:200px; line-height:200px;`
- 行高可以用来设置文字的行间距
行间距=行高-字体大小
### 1.4.4 字体的简写属性
font可以设置字体相关的所有属性
语法：
font:字体大小/行高 字体族
行高可以不写，不写就会使用默认值
font-weight：bond 这个是用来控制自己的加粗，当然这个也可以应用到font里。
`font: italic bold 50px/2 微软雅黑;`
### 1.4.5  文本的样式
- text-align 文本的水平对齐
可选值：left 左对齐
       right 右对齐
       center 居中对齐
      justify 两端对齐

- vertical-align 设置元素垂直对齐的方式
可选值：baseline 默认值 基线对齐
       top 顶部对齐
       middle 居中对齐 （子元素的中线和X的中线对齐）感觉有点蠢...
       bottom 底部对齐

- text-decoration 设置文本修饰
可选值：none 什么都没有
       underline 下划线
       line-through 删除线
       overline 上划线
可以设置样式

- white-space 设置网页如何处理空白
可选值：normal 正常
       nowrap 不换行
       pre 保留空白

将某些长文字省略显示
```css
<style>
.box1{
  /* 设置文字显示宽度 */
width:200px;
/* 设置文字不换行 */
white-space:nowrap;
/* 将超出宽度的文字隐藏 */
overflow:hidden;
/* 显示省略号 */
text-overflow:ellipsis;
}
</style>
```
## 1.5 表格
通过table标签来创建一个表格
```html
<table>
  <!-- 在table中使用tr表示表格中的一行，有几个tr就有几行 -->
  <tr>
    <!-- 在tr中使用td来表示一个单元格，有几个td就有几个单元格 -->
    <td>A1</td>
    <td>B1</td>
    <td>C1</td>
  </tr>
  <tr>
    <td>A2</td>
    <td>B2</td>
    <td colspan='2'>C2</td>
  </tr>
</table>
```
通过colspan属性来表示一个单元格会占据两个表格的位置
### 1.5.1 长表格
可以将一个表格分成三个部分
头部：thead
主题：tbody
底部：tfoot
```html
<table>
  <thead>
    <tr>
      <td>A1</td>
      <td>B1</td>
      <td>C1</td>
    </tr>
  </thead>
  <tbody>
  <tr>
    <td>A2</td>
    <td>B2</td>
    <td colspan='2'>C2</td>
  </tr>
  </tbody>
  <tfoot>
<!-- 通过这三个标签来保证表格的位置不会改变 -->
  </tfoot>
</table>
```
### 1.5.2 表格的样式
用CSS来对表格设置样式
```css
<style>
table{
  width:50%;
  border:1px solid black;
  /* border-spacing可以指定边框之间的距离 */
  border-spacing:0px;
  /* border-collapse:collapse 设置边框的合并*/
  border-collapse:collapse;

/* 通过这两个可以垂直居中 */
  display:table-cell;
  vertical-align:middle;
}

</style>
```
这么复杂，我为啥不直接用mysql做呢。。。
如果表格中没有tbody而是直接使用他人，浏览器会自动创建一个tbody，并且把tr全部放到tbody中，tr不是table的子元素

## 1.6 表单
表单：
- 在现实生活中表单用于提交数据
- 在网页中可以使用表单，网页中的表单用于将本地的数据提交给远程的服务器
- 使用form标签来创建一个表单
`<form action="xxx.xx.xx.xxx">`action里是表单要提交的服务器地址
```html
<!-- autocomplete='off'可以关闭自动补全 -->
<form action='xxx' autocomplete='off'>
  <!-- type中的text表示文本框 -->
  <!-- 数据想要提交到服务器的话，必须为元素指定一个name属性 -->
  <!-- readonly将表单项设置为只读，数据会提交
       disabled将表单设置为禁用，数据不会提交
       autofocus 设置表单项自动获取焦点 -->
  文本框<input type='text' name="username" readonly>
  密码框<input type='password' name="password">
  
  <!-- submit表示提交按钮，可以通过value来改变他的样式 -->
  <input type='submit' value='注册'>
  <!-- 普通的按钮，没用，但是可以通过js来给他功能 -->
  <input type='botton' value='按钮'>
  <!-- 重置按钮 -->
  <input type='reset' >
  <!-- 或者可以通过button标签来实现这些 -->
  <button type='submit'>提交</button>
  <button type='reset'>重置</button>
  <button type='button'>按钮</button>


  <!-- 单选按钮 -->
  <!-- 这种选择框，必须指定一个value属性 value属性最终会作为用户的填写的值-->
  <!-- checked属性可以将单选按钮设置为默认选中值 -->
  单选按钮<input type="radio" name='hello' value="a">
          <input type="radio" name="hello" value="b">


多选按钮<input type="checkbox" name='test' value="a">
          <input type="checkbox" name="test" value="b">

下拉列表<select name='xxx'>
          <option value='i'>选项一</option>
          <!-- 表示默认选中值 -->
          <option select value='ii'>选项二</option>
          <option value='iii'>选项三</option>
       </select>

</form>
```
## 1.7 弹性盒（flex）
- CSS中的新布局手段，主要用来代替浮动来完成页面的布局
- flex可以使元素具有弹性，让元素可以跟随页面的大小的改变而改变
- 弹性容器
   - 要使用弹性盒，必须先将一个元素设置为弹性容器
   - 通过display来设置弹性容器
     display:flex; 设置为块级弹性容器
     display:inline-flex; 设置为行内的弹性容器
- 弹性元素
   - 弹性容器的子元素是弹性元素（弹性项）
   - 弹性元素可以同时是弹性容器
### 1.7.1 弹性容器的样式
flex-direction 指定容器中弹性元素的排列方式
可选值：
      row 默认值，弹性元素在容器中水平排列（左向右）
      row-reverse 弹性元素在容器中反向水平排列（右向左）
      column 弹性元素纵向排列（自上向下）
      column-reverse 弹性元素反向纵向排列（自下向上）

主轴：弹性元素的排列方向称为主轴
辅轴：与主轴垂直方向的称为侧轴

flex-wrap 设置弹性元素是否在弹性容器中自动换行
          可选值：
                nowrap 默认值，元素不会自动换行
                wrap 元素沿着辅轴方向自动换行
                wrap-reverse 元素沿着辅轴反方向换行
可以用flex-flow来同时设置wrap和direction的样式 eg：`flex-flow:row wrap;`

justify-content 如何分配主轴上的空白空间（主轴上的元素如何排列）
            可选值：
              flex-start 元素沿着主轴起边排列
              flex-end 元素沿着主轴终边排列
              center 元素居中排列
              space-around 空白分布到元素两侧
              space-between 空白均匀分布到元素间
              space-evenly 空白分布到元素的单侧

align-items：元素在辅轴上如何对齐
             元素间的关系：
                 stretch 默认值，将元素的长度设置为相同的值
                 flex-start 元素不会拉伸，沿着辅轴起边对齐
                 flex-end 沿着辅轴的终边对齐
                 center 居中对齐
                 baseline 基线对齐

align-content 辅轴空白空间的分布
              和justify-content的用法一致，只不过一个是主轴，一个是辅轴

align-self 用来覆盖当前弹性元素上的align-items
### 1.7.2 弹性元素
flex-grow 指定弹性元素的伸展系数，也就是当父元素有多余空间时，子元素如何分配
父元素的剩余空间，会按照比例进行分配   eg:`flex-grow:0;`

flex-shrink 指定弹性元素的收缩系数，当父元素的空间不足以容纳所有的子元素时，子元素如何收缩
缩减多少是根据缩减系数和元素大小来计算

flex-basis 元素的基础长度
这三个属性决定了弹簧的三种状态，原长，伸展和收缩
如果主轴是横向的，则该值指定的就是元素的宽度
如果主轴是纵向的，则该值指定的就是元素的高度

flex可以设置弹性元素的三个样式（增长 缩减 基础）
`flex: 1 1 100px;`
inital “flex: 0 1 auto”
auto “flex: 1 1 auto;”
none “ flex: 0 0 auto”没有弹性

可以使用order决定弹性元素的排列顺序
比如`order:2;`就是排在第二位


# 2 CSS动画
## 2.1 过渡（transition）
通过过渡可以指定一个属性发生变化时的切换方式
通过过渡可以创建一些非常好的效果，提升用户的体验
- `transition-property`指定要执行过渡的属性
多个属性间使用，隔开，如果所有属性都需要过渡，则使用all关键字
过渡时必须是从一个有效数值向另外一个有效值进行过渡
- `transition-duration`指定过渡效果的持续时间
单位s和ms
- `transition-timing-function:ease;`过渡的时序函数
指定过渡的执行方式
默认值是ease，慢速开始，先加速，再减速
linear 匀速运动
ease-in 加速运动
ease-out 减速运动
ease-in-out 先加速后减速，但是和ease速度不太一样
cubic-bezier()来指定时序函数-->(https://cubic-bezier.com)
`transition-timing-function: steps(2,end)`分步执行，数字代表分多少步执行，end表示在时间结束时执行，start表示在时间开始时执行
比如总时间为2s，分2步，每一步为1s，end即是在1s结束时开始执行
- `transition-delay`过渡效果的延迟，等待一段时间后在执行过渡

- `transition`**可以同时设置过渡相关的所有属性，只有一个要求，如果要写延迟，则两个时间中第一个是持续时间，第二个是延迟时间**
`transition: all ease 2s 2s;`
## 2.2 动画
动画和过渡类似，不同的是过渡需要在某个属性发生变化时才会触发
动画可以自动触发动态效果
设置动画效果，必须先设置一个关键帧，关键帧设置了动画执行的每一个步骤
```css
.box2{
    /* 关键帧 */
    animation-name:test;
    /* 执行时间 */
    animation-duration:4s;
    /* 延时 */
    animation-delay:2s;
    /* 运行方式 */
    animation-timing-function:ease-in-out;
    /* 执行次数  用数字就是执行几次，infinite表示无限执行*/
    animation-iteration-count: infinite;
    /* 动画的执行方向
    可选值：normal 从from到to运行 每次都是这样
           reverse 从to到from运行 每次都是这样
           alternate 从from到to运行 重复执行动画时反向执行
           alternate-reverse 从to到from运行 重复执行动画时反向执行
    */
    animation-direction:normal;
    /* 动画的执行状态 running 默认值 动画执行
                     paused  动画暂停*/
    animation-play-state: paused;
    /* 动画的填充模式 
       可选值：none 默认值 动画执行完毕后元素回到原来位置
               forwards 动画执行完毕后元素会停止在动画结束的位置
               backwards 动画延时等待时，元素就会处于开始位置
               both结合了 forwards 和 backwards */
    animation-fill-mode:none;

    /* 当然可以通过一个属性来完成所有设置 */
    animation: test 2s 2 1s alternate;
}
/* 关键帧 */
@keyframes test{
        /* from表示动画开始的位置 也可以使用0% */
    from{
        margin-left:0px;
    }
    /* to表示动画结束的位置 也可以使用100% */
    to{
        margin-left:700px;
    }
}
```
## 2.3 变形
变形就是指通过CSS来改变元素的形状或位置
- 变形不会影响到页面的布局
- transform用来设置元素的变形效果
  - 平移：
     translateX()沿着x轴方向平移
     translateY()沿着y轴方向平移
     translateZ()沿着z轴方向平移
     eg：`transform:translateY(-100px);`
     平移元素的百分比是相对于自身进行计算的
     可以通过transform来实现水平居中或者垂直居中
     比如使用`left:50%;`来使元素往右平移50%，之后再让元素相对自身平移-50%即完全水平居中`transform:translateX(-50%);`
- Z轴平移
调整元素在z轴的位置，正常情况是调整元素和人眼之间的距离；距离越大，元素离人越近
但是z轴平移属于立体效果（近大远小），默认情况下网页不支持透视，所以需要设置网页的视距`html:{perspective: 800px;}`
## 2.4 旋转
通过旋转可以使元素沿着x y 或z旋转指定的角度
`transform: rotateX(45deg);`deg表示度数，turn表示圈数
旋转的前提是设置网页的视距
rotateX()横向边往网页的内外转
rotateY()纵向边往网页的内外转
totateZ()顺逆时针转
`backface-visibility: hidden;`设置图片背面是否显示

## 2.5 缩放
通过transform来对元素进行缩放
scaleX()水平方向缩放
scaleY()垂直方向缩放
scale()双方向的缩放
`transform-origin:0px 0px;`变形的原点，默认值为center

# 3 移动端适配
## 3.1 像素和视口
编写网页时，所用像素都是CSS像素
浏览器在显示网页时，需要将CSS像素转换为物理像素然后再呈现
默认在pc端一个css像素=一个物理像素

视口（viewport）
视口就是屏幕中用来显示网页的区域
可以通过查看视口的大小来观察CSS像素和物理像素的比值

## 3.2 移动端页面
移动端默认的视口大小是980px（css像素）
默认情况下，移动端的像素比是980/移动端宽度
可以通过meta标签来设置视口大小
`<meta name="viewport" content="width=device-width">`
将像素比设置为最佳像素比的视口大小称其为完美视口，`device-width`就是会保证网页视口为完美视口，在移动端里使用

在移动端开发中，不能再使用px来进行布局。
只能用vw来进行布局。vw --> viewport width
100vw = 一个视口的宽度
1vw = 1%视口宽度
vw永远相当于视口宽度进行计算
创建大小不同的元素，需要用vw和px进行转换

网页中字体大小最小是12px，不能设置一个比12像素还小的字体，如果设置小于12px的字体，则字体自动设置为12

**vw适配**：这个操作就是将html的字体直接设置为n倍的vw，比如`font-size:5.3333vw;`之后想要创建一个元素，就使用rem来创建。
除以对应的倍数，就是正常的大小。
~~但是感觉好难用...~~

## 4.1 响应式布局
网页可以根据不同的设备或窗口大小呈现出不同的效果
使用响应式布局，可以适配多种设备
~~但是可能不太好用~~
**响应布局的关键是媒体查询**
通过媒体查询，可以为不同的设备，或设备不同状态来分别设置样式

语法：`@media 查询规则{}`

媒体类型： all 所有设备
          print 打印设备
          screen 带屏幕的设备
          speech 屏幕阅读器
可以通过逗号来表示或，从而连接多个媒体类型

可以在媒体类型前添加一个only，表示只有
only的使用主要是为了兼容一些老版本浏览器。其实没啥用
## 4.2 媒体特性
width 视口的宽度
height 视口的高度
网页设计时一般只考虑宽度，不考虑高度
min-width：视口的最小宽度
max-width：视口的最大宽度（视口小于指定宽度时生效）
```css
/* 表示只有在视口宽度为500px时才会生效 */
@media (width:500px){
  body{
    background-color:#bfa;
  }
}
```
样式切换的分界点：也就是断点，网页的样式会在这个点发生变化
小于768 超小屏幕 max-width=768px
大于768px 小屏幕 min-width=768px
大于992px 中型屏幕 min-width=992px
大于1200 大屏幕 min-width=1200px