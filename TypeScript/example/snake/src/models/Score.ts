// 定义score-panel类
class ScorePanel{
    score = 0;
    level = 1;

    maxLevel:number;
    upScore:number;

    scoreEle: HTMLElement;
    levelEle: HTMLElement;

    constructor(maxLevel:number = 10,upScore:number = 10) {
        this.scoreEle = document.getElementById('score')!;
        this.levelEle = document.getElementById('level')!;
        this.maxLevel = maxLevel;
        this.upScore = upScore;
    }

    // 设置一个加分的方法
    addScore(){
        this.scoreEle.innerHTML = 'SCORE:' + ++this.score;
        // 判断分数是多少
        if(this.score % this.upScore === 0){
            this.levelUp();
        }
    }

    // 提升等级的方法
    levelUp(){
        if(this.level < this.maxLevel){
            this.levelEle.innerHTML = 'LEVEL:' + ++this.level;
        }
        
    }
}

export default ScorePanel;