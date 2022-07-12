// 读取三个文件的内容并拼接
const fs = require('fs');
const util = require('util');
const mineReadFile = util.promisify(fs.readFile);

async function main(){
    let data1 = await mineReadFile('./resource/content.txt');
    let data2 = await mineReadFile('./resource/content1.txt');
    let data3 = await mineReadFile('./resource/content2.txt');
    console.log(data1+data2+data3);
}

main();