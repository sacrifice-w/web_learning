import Food from './Food'
import Score from './Score'
import Snake from './Snake'
// 游戏控制器，控制其他所有的类
class GameControl{
    snake: Snake;
    food: Food;
    score: Score;

    // 创建一个属性来存储蛇的移动方向(也就是按键的方向)
    direction: string = '';

    // 创建一个属性用来记录蛇是否死咧
    isLive = true;

    constructor() {
        this.snake = new Snake();
        this.food = new Food();
        this.score = new Score();
        this.snake.headBegin();
        this.food.change();
        this.init();
    }

    // 游戏的初始化方法，调用后游戏即开始
    init(){
        // 绑定键盘按键按下的事件
        document.addEventListener("keydown",this.keydownHandler.bind(this));
        this.run();
    }

    // 创建一个键盘按下的响应函数
    keydownHandler(event: KeyboardEvent){
        this.direction = event.key;
    }

    // 创建一个控制蛇移动的方法
    run(){
        // 获取蛇现在的坐标
        
        let X = this.snake.X;
        let Y = this.snake.Y;

        switch(this.direction){
            case "ArrowUp":
                Y-=10;
                break;
            case "ArrowDown":
                Y+=10;
                break;
            case "ArrowLeft":
                X-=10;
                break;
            case "ArrowRight":
                X+=10;
                break;
        }

        this.checkEat(X,Y);

        // 修改蛇的x，y值
        try{
            this.snake.X = X;
            this.snake.Y = Y;
        }catch(e:any){
            alert(e.message + 'GameOver');
            location.reload();
        }


        this.isLive && setTimeout(this.run.bind(this),300 - (this.score.level - 1)*30);
    }

    // 检查蛇是否吃到了食物
    checkEat(X:number, Y:number){
        if(X === this.food.X && Y === this.food.Y){
            this.food.change();
            this.score.addScore();
            this.snake.addBody();
        }
    }

}

export default GameControl;