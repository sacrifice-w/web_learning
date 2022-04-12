function Person(name , age , gender){
    this.name = name;
    this.age = age;
    this.gender = gender;
    this.sayName = function(){
        alert(this.name);
    };
}
var per = new Person("wu", 18 );
var per1 = new Person("wu1", 8 );
var per2 = new Person("wu2", 16 );
var per3 = new Person("w4u", 56 );
var per4 = new Person("wu3", 86 );

var arr = [per,per1,per2,per3,per4];

function getAdult(arr){
    var newarr = [];

    for(i=0;i<arr.length;i++){
        if (arr[i].age>=18){
            newarr.push(arr[i]);
        }
    }
    return newarr;
}
var result = getAdult(arr);
console.log(result);