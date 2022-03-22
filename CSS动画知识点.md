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

