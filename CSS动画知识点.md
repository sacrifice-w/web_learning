## 1.1 过渡（transition）
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
## 1.2 动画
动画和过渡类似，不同的是过渡需要在某个属性发生变化时才会触发
动画可以自动触发动态效果
设置动画效果，必须先设置一个关键帧，关键帧设置了动画执行的每一个步骤

