---
title: V8 引擎中的可视化内存管理
---

> 原文地址：https://deepu.tech/memory-management-in-v8/
> 原文作者：Deepu K Sasidharan
> 译：张馨中 - 字节跳动大力智能前端团队

在这由多部分组成的系列文章中，我旨在揭露内存管理背后的概念，并更深入地研究某些现代编程语言中的内存管理。 我希望该系列文章可以使你对这些语言的内存管理机制下所发生的事有所了解。

在本章中，我们将研究 _V8_ 引擎对 _ECMAScript_ 和 _WebAssembly_ 中的内存管理。该内存管理广泛应用于 _NodeJS_、_Deno_ 和 _Electron_ 等运行时以及 _Chrome_、_Chromium_、_Brave_、_Opera_ 和 _Microsoft Edge_ 等 _Web_ 浏览器中。由于 _JavaScript_ 是一种解释型语言，它需要一个引擎来解释和执行代码。_V8_ 引擎解释 _JavaScript_ 并将其编译为机器码。_V8_ 是用 _C++_ 编写的，可以嵌入任何 _C++_ 应用程序中。

## V8 的内存结构

首先，我们来看看 _V8_ 引擎的内存结构。因为 _JS_ 是单线程 _V8_ 也为每个 _JS_ 上下文建立了一个单独的进程。并且如果你使用了 _service worker_，它会为每个 _worker_ 建立一个新的 _V8_ 进程。一个正在运行的程序总是由一些分配好的、被称为常驻集的内存来表示。常驻集内存可进一步划分为以下多个部分：

<div style={{ maxWidth: 600 }}>
  <img src="/img/v8-memory-struct.png" alt="" />
</div>

### 堆内存（Heap Memory）

这是 _V8_ 存储对象和动态数据的地方。这是最大的内存块，也是垃圾回收（GC）发生的地方。垃圾回收不管理整个堆内存，只管理新旧空间。堆可被进一步划分为以下区域：

- #### 新空间/新生代空间

  新空间或“新生代空间”是新的对象所在的位置，并且其中大多数对象的生命周期都较短。这个空间非常小并且拥有两个半空间，类似于 _JVM_ 中的 _S0_ 和 _S1_。这个空间由 `Scavenger（Minor GC）` 管理（我们会在之后的内容中介绍 `Minor GC`）。新生代空间的大小可以通过使用
  `--min_semi_space_size`（初始） 和 `--max_semi_space_size`（最大） _V8_ 参数控制。

- #### 旧空间/老生代空间

  旧空间或者“老年代空间”是新生代空间中经历了两轮垃圾回收仍存活的对象被移动到的地方。这个空间被 `Major GC（Mark-Sweep & Mark-Compact）` 管理（我们会在之后的内容中介绍 `Major GC`）。老年代空间的大小可以被 _V8_ 的 `--initial_old_space_size`（初始） 和 `--max_old_space_size`（最大） 两个参数控制。这个空间被分成了两部分：

  - **旧指针空间**：包含了具有指向其他对象的指针的幸存对象。
  - **旧数据空间**：包含了只具有数据的对象（不具有指向其他对象的指针）。字符串、包装数字和基础双精度数组在新生代空间存活过两次垃圾回收后，都会被移入这个空间

- #### 大对象空间

  这是大于其他空间大小限制的对象所在的位置。每个对象都会有自己内存中的的 [_mmap_](https://en.wikipedia.org/wiki/Mmap) 区域。大对象永远不会被垃圾回收移除。

- #### 代码空间

  这是即时编译器 `Just-in-time（JIT）` _Compiler_ 存储编译过的代码块的地方。这是唯一具有可执行内存的空间（尽管代码可以在“大对象空间”中分配，而且这些代码也可执行）。

- #### _Cell_ 空间、_PropertyCell_ 空间和 _Map_ 空间
  这些空间分别包含 _Cells_ 、_PropertyCells_ 和 _Maps_。每个空间都包含大小相同的对象，并且对它们指向的对象类型有一些限制，从而简化了收集。

每个空间都由一组页组成。页是操作系统根据 [_mmap_](https://en.wikipedia.org/wiki/Mmap)（或者 _Windows_ 中的 _MapViewOfFile_） 分配的连续内存块。每个页都是 1MB 大小，除了大对象空间。

### 栈（Stack）

本节讲述栈内存区域，每个 _V8_ 进程有一个栈。这是静态数据（包括方法/函数框架、基本类型值和指向对象的指针）的存储位置。堆栈大小可以使用 _V8_ 参数 `--stack_size` 设置。

## V8 内存使用 （栈 vs 堆）

既然我们已经了解了内存是如何组织的，那么让我们看看在执行程序时内存中最重要的部分是如何使用的。

让我们使用下面的 _JavaScript_ 程序，代码没有针对正确性进行优化，因此忽略不必要的中间变量等问题，重点是可视化栈和堆内存使用情况。

```js
class Employee {
  constructor(name, salary, sales) {
    this.name = name;
    this.salary = salary;
    this.sales = sales;
  }
}

const BONUS_PERCENTAGE = 10;

function getBonusPercentage(salary) {
  const percentage = (salary * BONUS * PERCENTAGE) / 100;
  return percentage;
}
function findEmployeeBonus(salary, noOfSales) {
  const bonusPercentage = getBonusPercentage(salary);
  const bonus = bonusPercentage * noOfSales;
  return bonus;
}
let john = new Employee('John', 5000, 5);
john.bonus = findEmployeeBonus(john.salary, john.sales);
console.log(john.bonus);
```

单击幻灯片并使用箭头键向前/向后移动，以查看上述程序的执行方式以及堆栈和堆内存的使用方式：

<iframe width="730px" height="411px" sandbox="allow-scripts allow-same-origin allow-popups allow-presentation allow-forms" frameborder="0" allowfullscreen="" allow="encrypted-media;" src="https://speakerdeck.com/player/e89e2e48a797417eb8692897dcada584"></iframe>

> 注意：如果幻灯片的边缘看起来被切断，请单击幻灯片的标题或此处直接在 [SpeakerDeck](https://speakerdeck.com/deepu105/v8-minor-gc) 中打开它。

你可以看到：

1. 全局作用于在栈中的全局 _frame_ 保存
2. 每个函数调用都会作为一个 _frame-block_ 被加到栈内存中
3. 所有的局部变量包括参数和返回值都被保存在栈中函数的 _frame-block_ 里
4. 所有的基础类型比如 _int_ 和 _string_ 都被直接保存在栈中。这同样适用于全局作用域，也因此 _String_ 在 _JS_ 中是基础类型
5. 所有的对象类型比如 _Employee_ 和 _Function_ 都在堆中创建并且栈中通过栈指针持有引用。_Functions_ 在 _JS_ 中就是对象。这也适用于全局作用域
6. 当前函数调用的函数在栈的顶部入栈
7. 当一个函数运行完毕时，它的 _frame_ 从栈中移除
8. 一旦主进程完成，栈中就不再有指向堆上的对象的指针，从而堆上对应的对象就变成“孤儿”
9. 除非显式复制，否则其他对象中的所有对象引用都是使用引用指针完成的

如你所见，栈由操作系统自动管理的，而不是 _V8_ 本身。因此，我们不必太担心栈。另一方面，堆不是由操作系统自动管理的，因为它拥有最大的内存空间并保存动态数据，它可能会以指数级增长，导致我们的程序随着时间的推移耗尽内存。随着时间的推移，它也会变得分散，减慢应用程序的速度。这就是垃圾收集的用武之地。

区分堆上的指针和数据对于垃圾收集很重要，_V8_ 为此使用“标记指针”方法 —— 在这种方法中，它在每个字的末尾保留一个位，以指示它是指针还是数据。这种方法需要有限的编译器支持，但实现起来很简单，同时相当高效。

_V8_ 内存管理: 垃圾收集
既然我们知道了 _V8_ 如何分配内存，那么让我们看看它是如何自动管理堆内存的，这对应用程序的性能非常重要。当程序试图在堆上分配比可用内存更多的内存（取决于 _V8_ 标志集），我们会遇到内存不足错误。管理不当的堆也可能导致内存泄漏。

_V8_ 通过垃圾回收来管理堆内存。简单地说，它释放孤儿对象 —— 栈不再直接或间接（通过另一个对象中的引用）持有引用的对象 —— 使用的内存，为创建新对象腾出空间。

> _Orinoco_ 是 _V8_ 的 _GC_ 项目代号，它利用并行、增量和并发技术进行垃圾收集，以减轻主线程负担。

_V8_ 中的垃圾收集器负责回收未使用的内存，供 _V8_ 进程重用。

_V8_ 垃圾收集器是分代的（堆中的对象按其年龄分组，并在不同阶段清除）。_V8_ 的垃圾收集有两个阶段和三种不同的算法：

### Minor GC （Scavenger）

这种类型的垃圾收集保持新生代的空间紧凑和清洁。对象被分配到新生代空间中，这个空间相当小（根据行为启发，在 1 到 8 MB 之间）。“新空间”中的分配非常便宜：有一个分配指针，每当我们想为一个新对象保留空间时，这个指针就会递增。当分配指针到达新空间的末尾时，将触发 `Minor GC`。这个过程也被称为清道夫，它使用了[切尼算法](https://en.wikipedia.org/wiki/Cheney's_algorithm)。`Minor GC` 触发频繁，使用并行的 _helper_ 线程使得速度很快。

让我们看看 `Minor GC` 的过程：

新空间被分成两个大小相等的半空间：`to-space` 和 `from-space`。大多数分配都是从 `from-space` 进行的（除了某些类型的对象，例如总是在旧空间中分配的可执行代码）。当 `from-space` 填满时，将触发 `Minor GC`。

单击幻灯片并使用箭头键向前/向后移动以查看过程：

<iframe width="730px" height="411px" sandbox="allow-scripts allow-same-origin allow-popups allow-presentation allow-forms" frameborder="0" allowfullscreen="" allow="encrypted-media;" src="https://speakerdeck.com/player/5fff2548e55c4bb0a9c837c7eb598bee"></iframe>

> 注意：如果幻灯片的边缘看起来被切断，请单击幻灯片的标题或此处直接在 [SpeakerDeck](https://speakerdeck.com/deepu105/v8-minor-gc) 中打开它。

你可以看到：

1. 让我们假设，当我们开始时，`from-space` 上已经有对象（块 01 到 06 标记为已用内存）。
2. 进程创建了一个新对象（07）。
3. _V8_ 试图从空间中获取所需的内存，但是那里没有空闲空间来容纳我们的对象，因此 _V8_ 触发了 `Minor GC`。
4. `Minor GC` 从栈指针（_GC_ 根）开始递归地遍历 `from-space` 中的对象图，以查找已使用或活动的对象（已用内存）。这些对象将移动到 `to-space` 中的页。这些对象引用的任何对象也会被移动到 `to-space` 中的该页，并且它们的指针也会更新。重复这个过程，直到 `from-space` 中的所有对象都被扫描。最后，`to-space` 被自动压缩。
5. `Minor GC` 现在清空 `from-space`，因为这里剩余的任何对象都是垃圾
6. `Minor GC` 交换 `to-space` 和 `from-space`，所有对象现在都在 `from-space` 中，`to-space` 为空
7. 新对象在 `from-space` 中分配内存
8. 让我们假设一段时间过去了，`from space` 上现在有更多的对象（块 07 到 09 标记为已用内存）
9. 应用程序创建一个新对象（10）
10. _V8_ 试图从 `from-space` 获取所需的内存，但那里没有可用空间来容纳我们的对象，因此 _V8_ 触发了第二次 `Minor GC`
11. 重复上述过程，并将第二个 `Minor GC` 后幸存的所有活动对象移动到“旧空间”。第一次幸存者被转移到 `to-space`，剩余的垃圾从 `from-space` 中清除
12. `Minor GC` 交换 `to-space` 和 `from-space`，所有对象现在都在 `from-space` 中，`to-space` 为空
13. 新对象在 `from-space` 中分配内存

所以我们看到了 `Minor GC` 是如何从新生代回收空间并使其保持紧凑。这是一个 `stop-the-world` 的过程，但它是如此快速和高效，以至于在大部分情况下是微不足道的。因为这个过程不会扫描“旧空间”中的对象是否有“新空间”中对象的引用，所以使用专门的寄存器存储从旧空间到新空间的所有指针。这是通过一个称为写屏障的过程记录到存储缓冲区中的。

### Major GC

这种 _GC_ 保持了老年代空间的紧凑和干净。老年代空间会在 `Minor GC` 的循环中被填满，当 _V8_ 根据动态计算得到限制判断没有足够的旧空间时，就会触发 `Major GC`。

`Scavenger` 算法对于小数据量是完美的，但对于大堆（如旧空间）则不实际，因为它有内存开销，因此 `Major GC` 是使用 _Mark-Sweep Compact_ 算法完成的。它使用三色（白灰黑）标记系统。因此，`Major GC` 是一个三步过程，第三步根据分段启发式执行。

1. **标记**：两种算法都很常规的第一步，其中垃圾收集器标识哪些对象正在使用，哪些对象不在使用。正在使用或可从 _GC_ 根（堆栈指针）递归访问的对象被标记为活动的。从技术上讲，可以把堆的深度看作是一个图。
2. **清理**：垃圾回收器遍历堆并记录任何未标记为活动的对象的内存地址。这个空间现在在空闲列表中标记为空闲，可以用来存储其他对象。
3. **压缩**：清扫后，如有需要，将所有幸存物体移到一起。这将减少碎片并提高向新对象分配内存的性能。

这种类型的 _GC_ 也称为 _Stop-the-world GC_，因为它们在执行 _GC_ 的过程中会引入暂停时间。 为了避免这种情况，_V8_ 使用如下的技术：

- **增量式 _GC_**：_GC_ 是以多个增量步骤而不是一个增量步骤完成的。
- **并发标记**：标记是使用多个 _helper_ 线程并发完成的，而不会影响主 _JavaScript_ 线程。 当 _helper_ 线程在进行并发标记时，写屏障用于跟踪记录 _JavaScript_ 创建的对象之间的新引用。
- **并发清除/压缩**：清除和压缩在 _helper_ 线程中同时进行，而不影响主 _JavaScript_ 线程。
- **懒散的扫荡**： 懒惰扫描涉及延迟页中垃圾的删除，直到需要内存为止。

让我们看一下 `Major GC` 的流程：

1. 让我们假设已经经过了许多 `Minor GC` 周期、旧空间几乎已满，并且 _V8_ 决定触发 `Major GC`。
2. `Major GC` 从堆栈指针开始递归地遍历对象图，以标记在旧空间中的存活对象（已用内存）和剩余的垃圾对象（孤儿对象）。 这是使用多个并发的 _helper_ 线程完成的，每个 _helper_ 线程都跟随一个指针。 这不会影响 _JS_ 主线程。
3. 完成并发标记或达到内存限制后，_GC_ 将使用主线程执行标记完成步骤。 这会引入少量的暂停时间。
4. 现在，`Major GC` 使用并发扫描线程将所有孤儿对象的内存标记为空闲。并行压缩任务也会被触发，以将相关的内存块移至同一页以避免碎片。 这些步骤中也会更新指针。

## 总结

这篇文章应该给您 _V8_ 内存结构和内存管理的概述。 这并不详尽，还有很多更高级的概念，您可以从 [v8.dev](https://v8.dev) 中了解它们。但是对于大多数 _JS / WebAssembly_ 开发人员来说，这一级的信息就足够了，我希望它能帮助您编写出更好的代码，对于性能更高的应用程序考虑到这些。记住这些内容也可能会有助于避免下一次的内存泄漏。

我希望您在学习 _V8_ 的内部结构方面有乐趣，请继续关注本系列的下一篇文章。
