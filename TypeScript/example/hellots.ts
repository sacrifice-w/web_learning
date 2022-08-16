abstract class Animal {
	name: string;
	age: number;

	constructor(name: string, age: number) {
		this.name = name;
		this.age = age;
	}

	sayHello() {
		console.log("动物在叫~");
	}
}

class Dog extends Animal {
	run() {
		console.log(`${this.name}在跑...`);
	}
}

class Cat extends Animal {}

const dog = new Dog("旺财", 4);
console.log(dog);
dog.run();