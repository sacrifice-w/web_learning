// 声明构造函数
function Promise(executor) {
    // 添加属性
    this.PromiseState = 'pending';
    this.PromiseResult = null;
    this.callbacks = [];
    // 保存实例对象的this值
    const self = this; //self _this that
    // 因为下面function里的this指向的是window对象。
    // 所以说需要将这里的this的值保存一下，在下面进行调用

    // resolve函数
    function resolve(data) {
        // 判断状态
        if (self.PromiseState !== 'pending') return;
        // 1.修改对象的状态(PromiseState)
        self.PromiseState = 'fulfilled';
        // 2.设置对象结果值(PromiseResult)
        self.PromiseResult = data;
        // 调用成功的回调函数
        // 这里针对的是单次回调
        // if(self.callback.onResolved){
        //     self.callback.onResolved(data);
        // }

        // 当多个回调时，需要用for循环遍历
        self.callbacks.forEach(item => {
            item.onResolved(data);
        })
    }
    // reject函数
    function reject(data) {
        // 判断状态
        if (self.PromiseState !== 'pending') return;
        // 1.修改对象的状态(PromiseState)
        self.PromiseState = 'rejected';
        // 2.设置对象结果值(PromiseResult)
        self.PromiseResult = data;
        // 调用成功的回调函数
        // if(self.callback.onRejected){
        //     self.callback.onRejected(data);
        // }

        self.callbacks.forEach(item => {
            item.onRejected(data);
        })
    }
    try {
        // 同步调用执行器函数
        executor(resolve, reject);
    } catch (e) {
        reject(e);
    }



}


// 添加then方法
Promise.prototype.then = function (onResolved, onRejected) {
    const self = this;
    // 为了能够解决回调为promise对象
    return new Promise((resolve, reject) => {
        // 封装函数
        function callback(type){
            try {
                // 获取回调函数的执行结果
                let result = type(self.PromiseResult);
                //判断
                if (result instanceof Promise) {
                    result.then(v => {
                        resolve(v);
                    }, r => {
                        reject(r);
                    })
                } else {
                    resolve(result);
                }
            } catch (e) {
                reject(e);
            }
        }
        if (this.PromiseState === 'fulfilled') {
            callback(onResolved);
        }
        if (this.PromiseState === 'rejected') {
            callback(onRejected);
        }
        // 判断pending状态
        if (this.PromiseState === 'pending') {
                // 保存回调函数
            this.callbacks.push({
                // onResolved: onResolved,
                // onRejected: onRejected
                onResolved: function(){
                    callback(onResolved);
                },
                onRejected: function(){
                    callback(onRejected);
                }
            })
        }
    })
}