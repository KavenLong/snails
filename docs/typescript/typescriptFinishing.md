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