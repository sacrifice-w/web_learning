// 定义食物类Food
class Food{
    // 定义一个属性表示食物所对应的元素
    element: HTMLElement;

    constructor(){
        // 获取页面中的food元素并将其赋值给element
        this.element = document.getElementById("food")!;
    }

    // 定义一个获取食物坐标的方法
    get X(){
        return this.element.offsetLeft;
    }

    get Y(){
        return this.element.offsetTop;
    }

    // 修改食物的位置
    change(){
        // 生成一个随机的位置
        // 食物的位置最小是0，最大是290
        // 每次移动10像素，所以食物的坐标为10的倍数
        let top = Math.round(Math.random()*29)*10;
        let left = Math.round(Math.random()*29)*10;
        this.element.style.left = top + 'px';
        this.element.style.top = left + 'px';
    }
}

export default Food;