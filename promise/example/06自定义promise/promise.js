class Promise {

    // 构造方法
    constructor(executor) {
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
            setTimeout(() => {
                self.callbacks.forEach(item => {
                    item.onResolved(data);
                })
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

            setTimeout(() => {
                self.callbacks.forEach(item => {
                    item.onRejected(data);
                })
            })

        }
        try {
            // 同步调用执行器函数
            executor(resolve, reject);
        } catch (e) {
            reject(e);
        }
    }

    // then方法封装
    then(onResolved, onRejected){
        const self = this;
        // 判断回调函数参数
        // 这部分主要是解决链式传递出现的问题
        if (typeof onRejected !== 'function') {
            onRejected = reason => {
                throw reason;
            }
        }
        if (typeof onResolved !== 'function') {
            onResolved = value => value;
        }
        // 为了能够解决回调为promise对象
        return new Promise((resolve, reject) => {
            // 封装函数
            function callback(type) {
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
                setTimeout(() => {
                    callback(onResolved);
                })
    
            }
            if (this.PromiseState === 'rejected') {
                setTimeout(() => {
                    callback(onRejected);
                })
    
            }
            // 判断pending状态
            if (this.PromiseState === 'pending') {
                // 保存回调函数
                this.callbacks.push({
                    // onResolved: onResolved,
                    // onRejected: onRejected
                    onResolved: function () {
                        callback(onResolved);
                    },
                    onRejected: function () {
                        callback(onRejected);
                    }
                })
            }
        })
    }

    catch(onRejected) {
        return this.then(undefined, onRejected);
    }

    // 添加resolve方法
    static resolve(value) {
    // 返回promise对象
    return new Promise((resolve, reject) => {
        if (value instanceof Promise) {
            value.then(v => {
                resolve(v);
            }, r => {
                reject(r);
            })
        } else {
            // 状态设置为成功
            resolve(value);
        }
    });
}

// 添加reject方法
    static reject(reason) {
    return new Promise((resolve, reject) => {
        reject(reason);
    });
}

// 添加all方法
    static all(promises) {
    // 返回结果为promise对象
    return new Promise((resolve, reject) => {
        // 声明一个计数变量
        let count = 0;
        // 存放成功结果的数组
        let arr = [];
        // 遍历
        for (let i = 0; i < promises.length; i++) {
            promises[i].then(v => {
                // 得知对象的状态是成功
                // 当每个promise对象都成功再调用resolve
                count++;
                // 将当前promise对象成功的结果存放到数组中
                arr[i] = v;
                // 判断
                if (count === promises.length) {
                    resolve(arr);
                }
            }, r => {
                reject(r);
            });
        };
    });
}

// 添加race方法
    static race(promises) {
    return new Promise((resolve, reject) => {
        for (let i = 0; i < promises.length; i++) {
            promises[i].then(v => {
                resolve(v);
            }, r => {
                reject(r);
            })
        }
    });
}
}
