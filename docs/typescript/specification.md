---
title: TypeScript编写规范
date: 2022-05-21 15:40:49
permalink: /pages/315b88/
categories:
  - TypeScript
tags:
  - TypeScript
---

## 一、背景
JavaScript到TypeScript的转变是技术发展的需要也是前端发展的趋势。它能帮助我们避免类型错误问题，帮助我们编写高质量的代码。 另外一方面，面对复杂的业务逻辑，简单的类型满足不了需求。需要利用TypeScript强大类型体系去增强我们的类型。严谨的类型对代码的可读性、扩展性、健壮性、规范性具有积极的意义。

[TypeScript官网](https://www.typescriptlang.org/)
## 二、命名规范
::: tip
使用语义化的英文单词命名
:::
### 1. 普通变量名
+ 语义化小驼峰命名
```ts
// bad
let lower-camel-case: number = 66;
let lower_camel_case: number = 66;
 let LowerCamelCase: number = 66;

// good
let lowerCamelCase: number = 66;
```
### 2. 常量名
+ 使用大写字母的英文单词和下换线连接
```ts
// bad
const upper_case: number = 66;
const upperCase: number = 66;
const UpperCase: number = 66;

// good
const UPPER_CASE: number = 66;
```
### 3. 接口名
+ 语义化大驼峰命名
```ts
// bad
interface labelledValue {
  label: string;
  value: number;
}

// good
interface LabelledValue {
  label: string;
  value: number;
}
```
::: warning 注意
interface定义的接口，里面定义字段类型后应当使用';'号结尾。
:::
### 4. 函数名
#### 4.1 普通函数
+ 语义化小驼峰命名  以动词开头宾语结尾  动宾结构
```ts
interface LabelledValue {
  label: string;
  value: number;
}

function printLabel(labelledObj: LabelledValue): void {
  console.log(labelledObj.label);
}
```
#### 4.2 hooks函数命名
+ hooks函数 以use开头小驼峰命名
```ts
// bad
function UseStorage() {
  ...
}
function use_storage() {
  ...
}

// good
function useStorage() {
  ...
}
```
### 5. 类名
+ 语义化大驼峰命名
```ts
class AnimalSort {
  private name: string;
  constructor(theName: string) { this.name = theName; }
}
```
### 6. enum枚举
+ 语义化大驼峰命名  枚举属性全部采用大写字母或者大驼峰命名
```ts
enum Color {
    RED = 10,
    PINK,
    BLUE
}

enum FileAccess {
    // constant members
    None,
    Read    = 1 << 1,
    Write   = 1 << 2,
    ReadWrite  = Read | Write,
    // computed member
    G = "123".length
}
```
### 7. 类型别名
+ 语义化大驼峰命名
```ts
type Flag = string | number;

function hello(value: Flag): void {}
```
## 三、类型使用规范
### 1. 类型断言
+ 类型断言有两种形式：
```ts
 // 尖括号 语法
let someValue: string | number = "this is a string";
let strLength: number = (<string>someValue).length;

// as 语法
let someValue: string | number = "this is a string";
let strLength: number = (someValue as string).length;
```
::: warning 注意
以上两种方式虽然没有任何区别，但是尖括号格式会与 React 中 JSX 产生语法冲突，因此更推荐使用 as 语法
:::
### 2. any类型
::: danger 注意
控制any类型的使用这一点尤为重要，应尽量避免使用any类型，针对复杂的数据结构或无法明确定义类型时使用any类型。其余情况不建议使用any类型，否则将TypeScript写成AnyScript毫无意义。
:::
```ts
if (!(window as any).__POWERED_BY_QIANKUN__) {
  console.log(window.__POWERED_BY_QIANKUN__)
}
```
### 3. 类型别名
::: warning 注意
在大多数的情况下使用接口类型和类型别名的效果等价，但是在某些特定的场景下这两者还是存在很大区别。如基本类型（原始值）、联合类型、元组。
:::
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
## 四、函数规范
### 1. hooks函数
+ hooks函数命名以use开头小驼峰命名
```ts
function useStorage() {
  ...
}
```
### 2. 函数返回值类型定义
+ 若函数存在返回值，需指明函数返回值类型
```ts
interface AiList = {
    id: 66;
}

function getAiMarketList(params: AiList): Promise<Result> => {
  return http.request({
    method: 'get',
    url: `${address}/rjhy-data-ai/admin/api/1/ai-market/page`,
    params: filterParams<AiList>(params),
  })
}
```
### 3. 函数入参类型定义
+ 函数若存在入参时，需指明具体入参类型，严禁使用any类型
```ts
type AiList = {
    id: 66;
}

function getAiMarketList(params: AiList) => {
  console.log(params)
}
```
## 五、引用规范
::: warning 注意
在ES Module出来之前，大部分的包都是遵循commonjs，这些遵循commonjs的包现在大多还存在nodejs当中，也是nodejs迟迟还没有全面支持ESM的原因。若不常用ts或者是没有在nodejs中用过ts，那么看到ts 官方的推荐写法，也许你会产生疑惑。为了兼容commonjs和ESM包，ts 官方推荐import和require混用写法已经不能适应行业未来的趋势，ESM终将是大流。因此我们编写ts代码时采用ESM规范导出和引用模块。
:::
### 1. 模块导出
```ts
// module.ts
let name = 'foo module'

function getPersonList (): void {
  console.log('hello')
}

class Person {}

export { name, getPersonList, Person }

export {
  name as newName
}

export {
  name as default
}

export default getPersonList
```
### 2. 模块引入
```ts
import { name, getPersonList, Person } from './module.ts'
import { newName } from './module.ts';
import { default as otherName } from './module.ts'
import func from './module.ts'

// 仅仅导入模块 以下两种引入方式等效
import {} from './module.ts'
import './module.ts'

// 引入模块下所有的export属性，用 *
import * as all from './module.ts'

// 逗号左边用来提取默认成员，逗号右边用来提取具名成员
import func, { name, age } from './module.ts'
```
## 六、声明文件
### 1. 第三方声明文件
```ts
declare var 声明全局变量
declare function 声明全局方法
declare class 声明全局类
declare enum 声明全局枚举类型
declare namespace 声明（含有子属性的）全局对象
interface 和 type 声明全局类型
export 导出变量
export namespace 导出（含有子属性的）对象
export default ES6 默认导出
export = commonjs 导出模块
export as namespace UMD 库声明全局变量
declare global 扩展全局变量
declare module 扩展模块
```
```ts
// shims.d.ts
declare var $: (selector: string) => any;

declare function jQuery(selector: string): any;

declare module 'uuid';
declare module 'mqtt/dist/mqtt.min' {
  import MQTT from 'mqtt'
  export = MQTT
};
...
```
::: danger 注意
当使用第三方库时，我们需要引用它的声明文件，才能获得对应的代码补全、接口提示等功能。
声明文件必需以.d.ts为后缀
:::
## 七、注释规范
### 1. 单行注释
::: warning 注意
单行注释适用于非函数注释，对关键代码及复杂逻辑注释。
:::
```ts
enum FileAccess {
  // constant members
  None,
  Read    = 1 << 1,
  Write   = 1 << 2,
  ReadWrite  = Read | Write,
  // computed member
  G = "123".length
}
```
### 2. 多行注释
::: warning 注意
多行注释适用于函数注释，这与Java等编程语言注释规范一致。
:::
```ts
/**
 * @description 获取AI能力超市列表(函数功能描述)
 * @param params （入参说明）
 * @returns （函数返回值说明）
 */
function getAiMarketList(params: AiList): Promise<Result> => {
  return http.request({
    method: 'get',
    url: `${address}/rjhy-data-ai/admin/api/1/ai-market/page`,
    params: filterParams<AiList>(params),
  })
}
```