---
title: JS 闭包
---

## 从 JS 中的变量说起

JS 中的变量就像一个盒子，它里面可以装 `true`、`"字符串"`、`666`、`[1, { object: {} }, null]` 等各类数据。

```js
let foo = null;
foo = 'foo';
foo = {};
console.log(foo);
```

> `console.log` 执行的时候，`foo` 这个箱子装的是 `{}`

```js {2}
let foo = null;
function print() {
  console.log(foo);
}
foo = {};
print();
```

> 执行 `print` 的时候，`箱子 foo` 装的是 `{}`，在执行到 _line:2_ 的时候，`print 函数` 绑定了`箱子 foo`，但不会绑定`箱子 foo`中装的东西

所以，变量跟变量所代表的值是两个东西，代码只有执行到使用变量的语句时，才会看这个变量箱子里装了什么。

### 关于闭包

让我们从一个简单的例子开始，假设我们有一个类，叫 _Person_，需要有姓名、性别，且性别不可更改

```js
class Person {
  /** 姓名 */
  #name;
  /** 性别 */
  #gender;

  get Gender() {
    return this.#gender;
  }
  get Name() {
    return this.#name;
  }
  set Name(value) {
    this.#name = value;
  }

  constructor(name, gender) {
    this.#name = name;
    this.#gender = gender;
  }
}

const person = new Person('My Name', 'F');
console.log(person.Gender); // => 'F'
person.Gender = 'M';
console.log(person.Gender); // => 依然是 'F'
```

在 _JavaScript_ 还没有类、属性访问控制器的时候，我们要如何做到某个属性的访问控制呢？

```js
function createPerson(name, gender) {
  var _name = name,
    _gender = gender;
  return {
    setName(value) {
      _name = value;
    },
    getName() {
      return _name;
    },
    getGender() {
      return _gender;
    },
    setGender() {},
  };
}

const person = createPerson('My Name', 'F');
console.log(person.getGender()); // => 'F'
person.setGender('M');
console.log(person.getGender()); // => 'F'
```

在上面的例子中，`createPerson` 函数在执行时，有它自己的 _FunctionScope_（函数作用域）。_return_ 的对象中有 4 个 函数：`getName`、`setName`、`getGender`、`setGender`。这四个函数又分别产生了自己的 _FunctionScope_。在 JS 中，函数作用域的变量是无法在外部被访问的，所以 `_name`、`_gender` 外界无法直接读写，做到了访问控制。

```js
function demo() {
  var a = 1;
}
// 下面尝试访问 a 将报错，因为 a 不在 console.log 的作用域中
console.log(a); // => throw “Uncaught ReferenceError: b is not defined”
```

当我们执行 `getGender` 方法时，由于 `getGender` 的 _FunctionScope_ 自身没有 `_gender` 这个变量，所以会往父作用域查询是否有叫 `_gender` 的变量。

总结：父作用域无法访问子作用域的变量，子作用域可以访问父作用域的变量。在函数声明时，有一个俗称绑定作用域的过程。可以简单理解为把所有父作用域的箱子都记住，之后在执行的时候，如果碰到名字叫 A 的箱子，就从离自己近的箱子开始找名称为 A 的箱子。

```js title="哪个箱子离我近就用哪个"
function grandpa() {
  var lastName = 'A';
  var firstName = 'grandpa';
  return function daddy() {
    firstName = 'Daddy';
    return function me() {
      console.log(firstName); // => 'Daddy'
      return function son() {
        var firstName = 'Son';
        console.log(lastName); // => 'A' 只有在 grandpa 的函数作用域里有
        console.log(firstName); // => 'Son' 离我最近
      };
    };
  };
}
grandpa()()()();
```

**闭包作用域就是函数作用域+父作用域集合。闭包变量就是闭包作用域中的变量集合**

对于上面函数 `son` 来讲，闭包变量有`firstName=Son`、`firstName=Daddy`、`firstName=grandpa`、`lastName=A`（从近到远排列，放入本函数作用域的参数表）。在访问 firstName 和 lastName 时，分别按照从近到远的方式查找。

继续阅读 [可视化 v8 引擎管理内存](/docs/js/memory-management-in-v8) 了解更多函数执行时的作用域、内存分配相关知识，加深对闭包的理解。
