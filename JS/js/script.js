function Person(name , age , gender){
    this.name = name;
    this.age = age;
    this.gender = gender;
    this.sayName = function(){
        alert(this.name);
    };
}