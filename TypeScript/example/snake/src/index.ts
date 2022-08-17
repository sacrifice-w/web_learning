import './style/index.less';
import clickThrottle from './models/ClickThrottle';

import GameControl from './models/GameControl'


const button = document.getElementById('button');

button!.addEventListener('click',() => {
    if(clickThrottle()){
        new GameControl();
        let div = document.createElement('div');
        div.className = 'GameFlag'
        div.innerHTML = "Gaming...";
        document.body.append(div);
    }else{
        console.log('已经点过咧');
    }
})
