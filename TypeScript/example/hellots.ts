class Person {
	private _name: string;
	private _age: number;

	constructor(name: string, age: number) {
		this._name = name;
		this._age = age;
	}

	get name() {
		return this._name;
	}

	set name(value: string) {
		this._name = value;
	}

	get age() {
		return this._age;
	}

	set age(value: number) {
		if (value > 0) {
			this._age = value;
		}
	}
}

const per = new Person('tom',18);
console.log(per);

per.name = 'jack';
per.age = 228;

console.log(per);