class Snake{
    // 表示蛇的容器
    element: HTMLElement;
    // 表示蛇头的元素
    head: HTMLElement;
    // 表示蛇的身体(包括蛇头)
    bodies: HTMLCollection;

    constructor() {
        this.element = document.getElementById('snake')!;
        this.head = document.querySelector('#snake > div')!;
        this.bodies = this.element.getElementsByTagName('div');
    }

    // 获取蛇的坐标(蛇头坐标)
    get X(){
        return this.head.offsetLeft;
    }

    get Y(){
        return this.head.offsetTop;
    }

    // 设置蛇头的坐标
    set X(value: number){

        if(this.X === value){
            return;
        }

        if(value < 0 || value >290){
            // 蛇撞墙了
            throw new Error('蛇撞墙了');
        }

        // 蛇是禁止掉头的，也就是向左走的时候不能向右走
        if(this.bodies[1] && (this.bodies[1] as HTMLElement).offsetLeft === value){
            // 如果发生了掉头,让蛇向反方向继续移动
            if(value > this.X){
                // 说明蛇想向右走，但是必须向左走，因为不能掉头
                value = this.X - 10;
            }else{
                value = this.X + 10;
            }
        }
        this.moveBody();

        this.head.style.left = value + 'px';

        this.checkHeadBody();
    }

    set Y(value: number){
        if(this.Y === value){
            return;
        }
        if(value < 0 || value >290){
            // 蛇撞墙了
            throw new Error('蛇撞墙了');
        }

        // 蛇是禁止掉头的，也就是向左走的时候不能向右走
        if(this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop === value){
            // 如果发生了掉头,让蛇向反方向继续移动
            if(value > this.Y){
                value = this.Y - 10;
            }else{
                value = this.Y + 10;
                }
        }
        this.moveBody();

        this.head.style.top = value + 'px';
    }

    // 增加身体
    addBody(){
        this.element.insertAdjacentHTML('beforeend', "<div></div>");
    }

    // 添加一个移动身体的方法
    moveBody(){
        // 后面的身体要移动到前面身体的位置
        // 遍历获取所有的身体
        for(let i=this.bodies.length-1;i>0;i--){
            let X =(this.bodies[i-1] as HTMLElement).offsetLeft;
            let Y =(this.bodies[i-1] as HTMLElement).offsetTop;

            (this.bodies[i] as HTMLElement).style.left = X + 'px';
            (this.bodies[i] as HTMLElement).style.top = Y + 'px';
        }
    }

    headBegin(){
        let top = Math.round(Math.random()*29)*10;
        let left = Math.round(Math.random()*29)*10;
        this.head.style.left = top + 'px';
        this.head.style.top = left + 'px';
    }

    checkHeadBody(){
        // 获取所有的身体，检查是否和蛇头的坐标发生重叠
        for(let i = 1; i<this.bodies.length; i++){
            let bd = this.bodies[i] as HTMLElement;
            if(this.X === bd.offsetLeft && this.Y == bd.offsetTop){
                throw new Error("撞到自己了");
            }
        }
    }
}

export default Snake;