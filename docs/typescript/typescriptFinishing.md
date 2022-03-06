---
title: TypeScript 笔记整理
date: 2022-01-22 19:40:26
permalink: /pages/eb9240/
categories:
  - TypeScript
tags:
  - TypeScript
---
## 一、 TS 安装和编译
+ 第一步 新建一个空文件夹
+ 第二步 全局安装 ts 和 ts-node
```ts
cnpm i typescript -g //全局安装ts
cnpm i -g ts-node //全局安装ts-node
```
+ 第三步 生成 tsconfig.js 配置文件
```ts
tsc --init
// 我们就先按照自动生成的 tsconfig 配置项去使用 里面的配置咱们可以先不去管他 后续熟练了再去配置
```
+ 第四步 在项目下新建一个index.ts直接写入
```ts
const a: string = "hello";
console.log(a);
```
+ 第五步 编译 ts 为 js 在控制台（终端）输入命令
```ts
tsc index.ts
```
神奇的事情发生了 项目下出现了一个同名的 index.js 文件 至此我们已经可以把 ts 文件编译成 js 文件了

不过到这里聪明的小伙伴就会发现了 我们全局安装的 「ts-node」 有什么作用呢 其实这个包是帮助我们在不需要编译成 js 的前提下就可以直接执行 ts 代码 比如 我们在控制台输入
```ts
ts-node index.ts
```
可以看到我们打印的hello已经输出了

那可能 还有的小伙伴会发现 我们每次改动都要手动去执行编译 这样很麻烦 其实我们可以加一个参数来实现每次文件变动 ts 帮我们「自动编译成 js」 的效果
```ts
tsc --watch index.ts
```
## 二、 TS 类型
1. 布尔类型(boolean)
```ts
const flag: boolean = true;
```
2. Number 类型
```ts
const flag: number = 1;
```
3. String 类型
```ts
const flag: string = "hello";
```
4. Enum 类型
使用枚举我们可以很好的描述一些特定的业务场景，比如一年中的春、夏、秋、冬，还有每周的周一到周天，还有各种颜色，以及可以用它来描述一些状态信息，比如错误码等
```ts
// 普通枚举 初始值默认为 0 其余的成员会会按顺序自动增长 可以理解为数组下标
enum Color {
  RED,
  PINK,
  BLUE,
}

const pink: Color = Color.PINK;
console.log(pink); // 1

// 设置初始值
enum Color {
  RED = 10,
  PINK,
  BLUE,
}
const pink: Color = Color.PINK;
console.log(pink); // 11

// 字符串枚举 每个都需要声明
enum Color {
  RED = "红色",
  PINK = "粉色",
  BLUE = "蓝色",
}

const pink: Color = Color.PINK;
console.log(pink); // 粉色

// 常量枚举 它是使用 const 关键字修饰的枚举，常量枚举与普通枚举的区别是，整个枚举会在编译阶段被删除 我们可以看下编译之后的效果

const enum Color {
  RED,
  PINK,
  BLUE,
}

const color: Color[] = [Color.RED, Color.PINK, Color.BLUE];

//编译之后的js如下：
var color = [0 /* RED */ , 1 /* PINK */ , 2 /* BLUE */ ];
// 可以看到我们的枚举并没有被编译成js代码 只是把color这个数组变量编译出来了
```
5. 数组类型(array)
```ts
const flag1: number[] = [1, 2, 3];
const flag2: Array<number> = [1, 2, 3];
```
6. 元组类型(tuple)
在 TypeScript 的基础类型中，元组（ Tuple ）表示一个已知「数量」和「类型」的数组 其实可以理解为他是一种特殊的数组
```ts
const flag: [string, number] = ["hello", 1];
```
7. Symbol
我们在使用 Symbol 的时候，必须添加 es6 的编译辅助库 需要在 tsconfig.json 的 libs 字段加上ES`2015`Symbol 的值是唯一不变的
```ts
const sym1 = Symbol("hello");
const sym2 = Symbol("hello");
console.log(Symbol("hello") === Symbol("hello"));
```
8.  任意类型(any)
任何类型都可以被归为 any 类型 这让 any 类型成为了类型系统的 顶级类型 (也被称作 全局超级类型) TypeScript 允许我们对 any 类型的值执行任何操作 而无需事先执行任何形式的检查

一般使用场景：第三方库没有提供类型文件时可以使用 any类型转换遇到困难或者数据结构太复杂难以定义 不过不要太依赖 any 否则就失去了 ts 的意义了
```ts
const flag: any = document.getElementById("root");
```
9. null 和 undefined
undefined 和 null 两者有各自的类型分别为 undefined 和 null
```ts
let u: undefined = undefined;
let n: null = null;
```
10. Unknown 类型
unknown 和 any 的主要区别是 unknown 类型会更加严格 在对 unknown 类型的值执行大多数操作之前 我们必须进行某种形式的检查 而在对 any 类型的值执行操作之前 我们不必进行任何检查 所有类型都可以被归为 unknown 但unknown类型只能被赋值给 any 类型和 unknown 类型本身 而 any 啥都能分配和被分配
```ts
let value: unknown;

value = true; // OK
value = 42; // OK
value = "Hello World"; // OK
value = []; // OK
value = {}; // OK

let value1: unknown = value; // OK
let value2: any = value; // OK
let value3: boolean = value; // Error
let value4: number = value; // Error
let value5: string = value; // Error
let value6: object = value; // Error
```
11.  void 类型
void 表示没有任何类型 当一个函数没有返回值时 TS 会认为它的返回值是 void 类型。
```ts
function hello(name: string): void {}
```
12. never 类型
never 一般表示用户无法达到的类型 例如never 类型是那些总是会抛出异常或根本就不会有返回值的函数表达式或箭头函数表达式的返回值类型
```ts
function neverReach(): never {
  throw new Error("an error");
}
```
13. BigInt 大数类型
使用 BigInt 可以安全地存储和操作大整数 我们在使用 BigInt 的时候 必须添加 ESNext 的编译辅助库 需要在 tsconfig.json 的 libs 字段加上ESNext要使用1n需要 "target": "ESNext"number 和 BigInt 类型不一样 不兼容
```ts
const max1 = Number.MAX_SAFE_INTEGER; // 2**53-1
console.log(max1 + 1 === max1 + 2); //true

const max2 = BigInt(Number.MAX_SAFE_INTEGER);
console.log(max2 + 1n === max2 + 2n); //false

let foo: number;
let bar: bigint;
foo = bar; //error
bar = foo; //error
```
14. object, Object 和 {} 类型
「object」 类型用于表示非原始类型
```ts
let objectCase: object;
objectCase = 1; // error
objectCase = "a"; // error
objectCase = true; // error
objectCase = null; // error
objectCase = undefined; // error
objectCase = {}; // ok
```
「大 Object」 代表所有拥有 toString、hasOwnProperty 方法的类型 所以所有原始类型、非原始类型都可以赋给 Object(严格模式下 null 和 undefined 不可以)
```ts
let ObjectCase: Object;
ObjectCase = 1; // ok
ObjectCase = "a"; // ok
ObjectCase = true; // ok
ObjectCase = null; // error
ObjectCase = undefined; // error
ObjectCase = {}; // ok
```
「{}」 空对象类型和大 Object 一样 也是表示原始类型和非原始类型的集合
```ts
let simpleCase: {};
simpleCase = 1; // ok
simpleCase = "a"; // ok
simpleCase = true; // ok
simpleCase = null; // error
simpleCase = undefined; // error
simpleCase = {}; // ok
```
15. 类型推论
指编程语言中能够自动推导出值的类型的能力 它是一些强静态类型语言中出现的特性 定义时未赋值就会推论成 any 类型 如果定义的时候就赋值就能利用到类型推论
```ts
let flag; //推断为any
let count = 123; //为number类型
let hello = "hello"; //为string类型
```
16. 联合类型
联合类型（Union Types）表示取值可以为多种类型中的一种 未赋值时联合类型上只能访问两个类型共有的属性和方法
```ts
let name: string | number;
console.log(name.toString());
name = 1;
console.log(name.toFixed(2));
name = "hello";
console.log(name.length);
```
17. 类型断言
有时候你会遇到这样的情况，你会比 TypeScript 更了解某个值的详细信息。通常这会发生在你清楚地知道一个实体具有比它现有类型更确切的类型。其实就是你需要手动告诉 ts 就按照你断言的那个类型通过编译（这一招很关键 有时候可以帮助你解决很多编译报错）

类型断言有两种形式：
```ts
 // 尖括号 语法
let someValue: any = "this is a string";
let strLength: number = (<string>someValue).length;

// as 语法
let someValue: any = "this is a string";
let strLength: number = (someValue as string).length;
```
::: warning
以上两种方式虽然没有任何区别，但是尖括号格式会与 react 中 JSX 产生语法冲突，因此我们更推荐使用 as 语法。
:::
「非空断言」在上下文中当类型检查器无法断定类型时 一个新的后缀表达式操作符 ! 可以用于断言操作对象是非 null 和非 undefined 类型
```ts
let flag: null | undefined | string;
flag!.toString(); // ok
flag.toString(); // error
```
18. 字面量类型
在 TypeScript 中，字面量不仅可以表示值，还可以表示类型，即所谓的字面量类型。目前，TypeScript 支持 3 种字面量类型：字符串字面量类型、数字字面量类型、布尔字面量类型，对应的字符串字面量、数字字面量、布尔字面量分别拥有与其值一样的字面量类型，具体示例如下：
```ts
let flag1: "hello" = "hello";
let flag2: 1 = 1;
let flag3: true = true;
```
19. 类型别名
类型别名用来给一个类型起个新名字
```ts
type flag = string | number;

function hello(value: flag) {}
```
20. 交叉类型
交叉类型是将多个类型合并为一个类型。通过 & 运算符可以将现有的多种类型叠加到一起成为一种类型，它包含了所需的所有类型的特性
```ts
type Flag1 = { x: number };
type Flag2 = Flag1 & { y: string };

let flag3: Flag2 = {
  x: 1,
  y: "hello",
  henb,
};
```
21. 类型保护
类型保护就是一些表达式，他们在编译的时候就能通过类型信息确保某个作用域内变量的类型 其主要思想是尝试检测属性、方法或原型，以确定如何处理值

「typeof 类型保护」
```ts
function double(input: string | number | boolean) {
  if (typeof input === "string") {
    return input + input;
  } else {
    if (typeof input === "number") {
      return input * 2;
    } else {
      return !input;
    }
  }
}
```
「in 关键字」
```ts
interface Bird {
  fly: number;
}

interface Dog {
  leg: number;
}

function getNumber(value: Bird | Dog) {
  if ("fly" in value) {
    return value.fly;
  }
  return value.leg;
}
```
「instanceof 类型保护」
```ts
class Animal {
  name!: string;
}
class Bird extends Animal {
  fly!: number;
}
function getName(animal: Animal) {
  if (animal instanceof Bird) {
    console.log(animal.fly);
  } else {
    console.log(animal.name);
  }
}
```
「自定义类型保护」

通过 type is xxx这样的类型谓词来进行类型保护

例如下面的例子 value is object就会认为如果函数返回 true 那么定义的 value 就是 object 类型
```ts
function isObject(value: unknown): value is object {
  return typeof value === "object" && value !== null;
}

function fn(x: string | object) {
  if (isObject(x)) {
    // ....
  } else {
    // .....
  }
}
```
## 三、 函数
1.  函数的定义
可以指定参数的类型和返回值的类型
```ts
function hello(name: string): void {
  console.log("hello", name);
}
hello("hahaha");
```
2. 函数表达式
定义函数类型
```ts
type SumFunc = (x: number, y: number) => number;

let countNumber: SumFunc = function (a, b) {
  return a + b;
};
```
3. 可选参数
在 TS 中函数的形参和实参必须一样，不一样就要配置可选参数,而且必须是「最后一个参数」
```ts
function print(name: string, age?: number): void {
  console.log(name, age);
}
print("hahaha");
```
4. 默认参数
```ts
function ajax(url: string, method: string = "GET") {
  console.log(url, method);
}
ajax("/users");
```
5. 剩余参数
```ts
function sum(...numbers: number[]) {
  return numbers.reduce((val, item) => (val += item), 0);
}
console.log(sum(1, 2, 3));
```
6. 函数重载
函数重载或方法重载是使用相同名称和不同参数数量或类型创建多个方法的一种能力。在 TypeScript 中，表现为给同一个函数提供多个函数类型定义
```ts
let obj: any = {};
function attr(val: string): void;
function attr(val: number): void;
function attr(val: any): void {
  if (typeof val === "string") {
    obj.name = val;
  } else {
    obj.age = val;
  }
}
attr("hahaha");
attr(9);
attr(true);
console.log(obj);
```
::: warning
函数重载真正执行的是同名函数最后定义的函数体 在最后一个函数体定义之前全都属于函数类型定义 不能写具体的函数实现方法 只能定义类型
:::
## 四、 类
1. 类的定义
在 TypeScript 中，我们可以通过 Class 关键字来定义一个类
```ts
class Person {
  name!: string; //如果初始属性没赋值就需要加上!
  constructor(_name: string) {
    this.name = _name;
  }
  getName(): void {
    console.log(this.name);
  }
}
let p1 = new Person("hello");
p1.getName();
```
当然 如果我们图省事 我们也可以把属性定义直接写到构造函数的参数里面去(不过一般不建议这样写 因为会让代码增加阅读难度)
```ts
class Person {
  constructor(public name: string) {}
  getName(): void {
    console.log(this.name);
  }
}
let p1 = new Person("hello");
p1.getName();
```
::: warning
当我们定义一个类的时候,会得到 「2 个类型」一个是构造函数类型的函数类型(当做普通构造函数的类型) 另一个是类的实例类型（代表实例）
:::
```ts
class Component {
  static myName: string = "静态名称属性";
  myName: string = "实例名称属性";
}
//ts 一个类型 一个叫值
//放在=后面的是值
let com = Component; //这里是代表构造函数
//冒号后面的是类型
let c: Component = new Component(); //这里是代表实例类型
let f: typeof Component = com;
```
2. 存取器
在 TypeScript 中，我们可以通过存取器来改变一个类中属性的读取和赋值行为
```ts
class User {
  myname: string;
  constructor(myname: string) {
    this.myname = myname;
  }
  get name() {
    return this.myname;
  }
  set name(value) {
    this.myname = value;
  }
}

let user = new User("hello");
user.name = "world";
console.log(user.name);
```
其实我们可以看看翻译成 es5 的代码 原理很简单 就是使用了 Object.defineProperty 在类的原型上面拦截了属性对应的 get 和 set 方法
```ts
var User = /** @class */ (function () {
  function User(myname) {
    this.myname = myname;
  }
  Object.defineProperty(User.prototype, "name", {
    get: function () {
      return this.myname;
    },
    set: function (value) {
      this.myname = value;
    },
    enumerable: false,
    configurable: true,
  });
  return User;
})();
var user = new User("hello");
user.name = "world";
console.log(user.name);
```
3. readonly 只读属性
readonly 修饰的变量只能在「构造函数」中初始化 TypeScript 的类型系统同样也允许将 interface、type、 class 上的属性标识为 readonly readonly 实际上只是在编译阶段进行代码检查。
```ts
class Animal {
  public readonly name: string;
  constructor(name: string) {
    this.name = name;
  }
  changeName(name: string) {
    this.name = name; //这个ts是报错的
  }
}

let a = new Animal("hello");
```
4. 继承
子类继承父类后子类的实例就拥有了父类中的属性和方法，可以增强代码的可复用性

将子类公用的方法抽象出来放在父类中，自己的特殊逻辑放在子类中重写父类的逻辑

super 可以调用父类上的方法和属性

在 TypeScript 中，我们可以通过 extends 关键字来实现继承
```ts
class Person {
  name: string; //定义实例的属性，默认省略public修饰符
  age: number;
  constructor(name: string, age: number) {
    //构造函数
    this.name = name;
    this.age = age;
  }
  getName(): string {
    return this.name;
  }
  setName(name: string): void {
    this.name = name;
  }
}
class Student extends Person {
  no: number;
  constructor(name: string, age: number, no: number) {
    super(name, age);
    this.no = no;
  }
  getNo(): number {
    return this.no;
  }
}
let s1 = new Student("hello", 10, 1);
console.log(s1);
```
5. 类里面的修饰符
「public」 类里面 子类 其它任何地方外边都可以访问「protected」 类里面 子类 都可以访问,其它任何地方不能访问「private」 类里面可以访问，子类和其它任何地方都不可以访问
```ts
class Parent {
  public name: string;
  protected age: number;
  private car: number;
  constructor(name: string, age: number, car: number) {
    //构造函数
    this.name = name;
    this.age = age;
    this.car = car;
  }
  getName(): string {
    return this.name;
  }
  setName(name: string): void {
    this.name = name;
  }
}
class Child extends Parent {
  constructor(name: string, age: number, car: number) {
    super(name, age, car);
  }
  desc() {
    console.log(`${this.name} ${this.age} ${this.car}`); //car访问不到 会报错
  }
}

let child = new Child("hello", 10, 1000);
console.log(child.name);
console.log(child.age); //age访问不到 会报错
console.log(child.car); //car访问不到 会报错
```
6. 静态属性 静态方法
类的静态属性和方法是直接定义在类本身上面的 所以也只能通过直接调用类的方法和属性来访问
```ts
class Parent {
  static mainName = "Parent";
  static getmainName() {
    console.log(this); //注意静态方法里面的this指向的是类本身 而不是类的实例对象 所以静态方法里面只能访问类的静态属性和方法
    return this.mainName;
  }
  public name: string;
  constructor(name: string) {
    //构造函数
    this.name = name;
  }
}
console.log(Parent.mainName);
console.log(Parent.getmainName());
```
7. 抽象类和抽象方法
抽象类，无法被实例化，只能被继承并且无法创建抽象类的实例 子类可以对抽象类进行不同的实现

抽象方法只能出现在抽象类中并且抽象方法不能在抽象类中被具体实现，只能在抽象类的子类中实现（必须要实现）

使用场景：我们一般用抽象类和抽象方法抽离出事物的共性 以后所有继承的子类必须按照规范去实现自己的具体逻辑 这样可以增加代码的可维护性和复用性

使用 abstract 关键字来定义抽象类和抽象方法
```ts
abstract class Animal {
  name!: string;
  abstract speak(): void;
}
class Cat extends Animal {
  speak() {
    console.log("喵喵喵");
  }
}
let animal = new Animal(); //直接报错 无法创建抽象类的实例
let cat = new Cat();
cat.speak();
```
「重写」是指子类重写继承自父类中的方法「重载」是指为同一个函数提供多个类型定义
```ts
class Animal {
  speak(word: string): string {
    return "动物:" + word;
  }
}
class Cat extends Animal {
  speak(word: string): string {
    return "猫:" + word;
  }
}
let cat = new Cat();
console.log(cat.speak("hello"));
// 上面是重写
//--------------------------------------------
// 下面是重载
function double(val: number): number;
function double(val: string): string;
function double(val: any): any {
  if (typeof val == "number") {
    return val * 2;
  }
  return val + val;
}

let r = double(1);
console.log(r);
```
在父类中定义一个方法，在子类中有多个实现，在程序运行的时候，根据不同的对象执行不同的操作，实现运行时的绑定。
```ts
abstract class Animal {
  // 声明抽象的方法，让子类去实现
  abstract sleep(): void;
}
class Dog extends Animal {
  sleep() {
    console.log("dog sleep");
  }
}
let dog = new Dog();
class Cat extends Animal {
  sleep() {
    console.log("cat sleep");
  }
}
let cat = new Cat();
let animals: Animal[] = [dog, cat];
animals.forEach((i) => {
  i.sleep();
});
```
## 五、 接口
接口既可以在面向对象编程中表示为行为的抽象，也可以用来描述对象的形状

我们用 interface 关键字来定义接口 在接口中可以用分号或者逗号分割每一项，也可以什么都不加
1. 对象的形状
```ts
//接口可以用来描述`对象的形状`
//接口可以用来描述`对象的形状`
interface Speakable {
  speak(): void;
  readonly lng: string; //readonly表示只读属性 后续不可以更改
  name?: string; //？表示可选属性
}

let speakman: Speakable = {
  //   speak() {}, //少属性会报错
  name: "hello",
  lng: "en",
  age: 111, //多属性也会报错
};
```
2. 行为的抽象
接口可以把一些类中共有的属性和方法抽象出来,可以用来约束实现此接口的类

一个类可以实现多个接口，一个接口也可以被多个类实现

我们用 implements关键字来代表 实现
```ts
//接口可以在面向对象编程中表示为行为的抽象
interface Speakable {
  speak(): void;
}
interface Eatable {
  eat(): void;
}
//一个类可以实现多个接口
class Person implements Speakable, Eatable {
  speak() {
    console.log("Person说话");
  }
  //   eat() {} //需要实现的接口包含eat方法 不实现会报错
}
```
3. 定义任意属性
如果我们在定义接口的时候无法预先知道有哪些属性的时候,可以使用 [propName:string]:any,propName 名字是任意的
```ts
interface Person {
  id: number;
  name: string;
  [propName: string]: any;
}

let p1 = {
  id: 1,
  name: "hello",
  age: 10,
};
```
这个接口表示 必须要有 id 和 name 这两个字段 然后还可以新加其余的未知字段
4. 接口的继承
我们除了类可以继承 接口也可以继承 同样的使用 extends关键字
```ts
interface Speakable {
  speak(): void;
}
interface SpeakChinese extends Speakable {
  speakChinese(): void;
}
class Person implements SpeakChinese {
  speak() {
    console.log("Person");
  }
  speakChinese() {
    console.log("speakChinese");
  }
}
```
5. 函数类型接口
可以用接口来定义函数类型
```ts
interface discount {
  (price: number): number;
}
let cost: discount = function (price: number): number {
  return price * 0.8;
};
```
6. 构造函数的类型接口
使用特殊的 new()关键字来描述类的构造函数类型
```ts
class Animal {
  constructor(public name: string) {}
}
//不加new是修饰函数的,加new是修饰类的
interface WithNameClass {
  new (name: string): Animal;
}
function createAnimal(clazz: WithNameClass, name: string) {
  return new clazz(name);
}
let a = createAnimal(Animal, "hello");
console.log(a.name);
```
其实这样的用法一般出现在 当我们需要把一个类作为参数的时候 我们需要对传入的类的构造函数类型进行约束 所以需要使用 new 关键字代表是类的构造函数类型 用以和普通函数进行区分
::: tip 思考
接口和类型别名的区别 这个题目是经典的 「ts 面试题」
:::
实际上，在大多数的情况下使用接口类型和类型别名的效果等价，但是在某些特定的场景下这两者还是存在很大区别。

+ 基础数据类型 与接口不同，类型别名还可以用于其他类型，如基本类型（原始值）、联合类型、元组
```ts
 // primitive
type Name = string;

// union
type PartialPoint = PartialPointX | PartialPointY;

// tuple
type Data = [number, string];

// dom
let div = document.createElement("div");
type B = typeof div;
```
+ 重复定义
接口可以定义多次 会被自动合并为单个接口 类型别名不可以重复定义
```ts
interface Point {
  x: number;
}
interface Point {
  y: number;
}
const point: Point = { x: 1, y: 2 };
```
+ 扩展 接口可以扩展类型别名，同理，类型别名也可以扩展接口。但是两者实现扩展的方式不同
接口的扩展就是继承，通过 extends 来实现。类型别名的扩展就是交叉类型，通过 & 来实现。
```ts
// 接口扩展接口
interface PointX {
  x: number;
}

interface Point extends PointX {
  y: number;
}
// ----
// 类型别名扩展类型别名
type PointX = {
  x: number;
};

type Point = PointX & {
  y: number;
};
// ----
// 接口扩展类型别名
type PointX = {
  x: number;
};
interface Point extends PointX {
  y: number;
}
// ----
// 类型别名扩展接口
interface PointX {
  x: number;
}
type Point = PointX & {
  y: number;
};
```
+ 实现 这里有一个特殊情况 类无法实现定义了联合类型的类型别名
```ts
type PartialPoint = { x: number } | { y: number };

// A class can only implement an object type or
// intersection of object types with statically known members.
class SomePartialPoint implements PartialPoint {
  // Error
  x = 1;
  y = 2;
}
```
## 六、 泛型
泛型（Generics）是指在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再指定类型的一种特性

为了更好的了解泛型的作用 我们可以看下面的一个例子