import { v4 as uuidv4 } from "uuid";

export class Student {
  constructor(name, age) {
    this.id = this.generateId();
    this.name = name;
    this.age = age;
  }

  generateId() {
    return uuidv4();
  }
}
