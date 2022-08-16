// 引入包
const path = require('path');
// 引入html插件
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// webpack中的所有配置都应该写在module.exports中
module.exports = {
    // 指定入口文件
    entry: './src/index.ts',

    // 指定打包文件所在目录
    output:{

        // 指定打包文件的目录
        path: path.resolve(__dirname, 'dist'),
        
        //打包后文件的文件
        filename: 'bundle.js',

        // 告诉webpack不要转换箭头函数
        // environment:{
        //     arrowFunction: false
        // }
    },

    // 设置开发环境或者是生产环境，webpack4.0新增
    mode:'development',

    // 指定webpack打包时要使用的模块
    module:{
        // 指定要加载的规则
        rules:[
            {
            // test指定的是规则生效的文件
            test: /\.ts$/,
            // 要使用的loader
            use: [
                // 配置babel
                {
                    // 指定加载器
                    loader:"babel-loader",
                    // 设置babel
                    options:{
                        // 设置预定义的环境
                        presets:[
                            [
                                // 指定环境的插件
                                "@babel/preset-env",
                                {
                                    // 要兼容的目标浏览器
                                    targets:{
                                        "chrome":'58',
                                        "ie":'11'
                                    },

                                    // 指定corejs的版本
                                    "corejs":"3",
                                    // 使用corejs的方式"usage"表示按需加载
                                    "useBuiltIns":"usage"
                                }
                            ]
                        ]
                    }
                },
                'ts-loader'
            ],
            // 要排除的文件
            exclude:/node-modules/
            }
        ]
    },

    // 配置webpack插件
    plugins: [
        new CleanWebpackPlugin(),
        new HTMLWebpackPlugin({
            template:"./src/index.html"
        }),
    ],

    // 用来设置引用模块
    resolve:{
        extensions:['.ts','.js']
    }


}