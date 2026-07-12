---
title: JavaScript Runtime
chapter: 04
difficulty: Intermediate
reading_time: 3-4 Hours
author: Harsh Pandit
last_updated: July 2026
---

# Chapter 4 — JavaScript Runtime

> "A JavaScript engine understands JavaScript. A JavaScript runtime makes JavaScript useful."

---

# 📑 Table of Contents

- [Learning Objectives](#-learning-objectives)
- [Prerequisites](#-prerequisites)

## Part 1 — Introduction to JavaScript Runtime
- [What is a Runtime?](#-what-is-a-runtime)
- [Why Do We Need a Runtime?](#-why-do-we-need-a-runtime)
- [Understanding a Runtime with an Analogy](#-understanding-a-runtime-with-an-analogy)
- [What is a JavaScript Runtime?](#-what-is-a-javascript-runtime)
- [JavaScript Engine vs JavaScript Runtime](#-javascript-engine-vs-javascript-runtime)
- [Browser Runtime vs Node.js Runtime](#-browser-runtime-vs-nodejs-runtime)
- [The Complete Runtime Architecture](#-the-complete-runtime-architecture)

## Part 2 — Execution Context
- [What is an Execution Context?](#-what-is-an-execution-context)
- [Why Does JavaScript Need an Execution Context?](#-why-does-javascript-need-an-execution-context)
- [The Life Cycle of an Execution Context](#-the-life-cycle-of-an-execution-context)
- [Creation Phase](#-creation-phase)
- [Execution Phase](#-execution-phase)
- [Global Execution Context (GEC)](#-global-execution-context-gec)
- [Function Execution Context (FEC)](#-function-execution-context-fec)
- [Execution Context in Action](#-execution-context-in-action)

## Part 3 — Call Stack
- [What is the Call Stack?](#-what-is-the-call-stack)
- [Why Do We Need the Call Stack?](#-why-do-we-need-the-call-stack)
- [How the Call Stack Works](#-how-the-call-stack-works)
- [Push and Pop Operations](#-push-and-pop-operations)
- [Call Stack Visualization](#-call-stack-visualization)
- [Recursion and the Call Stack](#-recursion-and-the-call-stack)
- [Stack Overflow](#-stack-overflow)

## Part 4 — Memory Management
- [Memory in JavaScript](#-memory-in-javascript)
- [Stack Memory](#-stack-memory)
- [Heap Memory](#-heap-memory)
- [Primitive vs Reference Types](#-primitive-vs-reference-types)
- [Garbage Collection](#-garbage-collection)

## Part 5 — JavaScript's Single-Threaded Nature
- [What is a Thread?](#-what-is-a-thread)
- [What is a Process?](#-what-is-a-process)
- [Why is JavaScript Single Threaded?](#-why-is-javascript-single-threaded)
- [Advantages](#-advantages)
- [Limitations](#-limitations)

---

# 🎯 Learning Objectives

By the end of this chapter, you will be able to:

- Explain what a runtime is.
- Differentiate between a JavaScript Engine and a JavaScript Runtime.
- Understand why JavaScript needs a runtime.
- Compare Browser Runtime and Node.js Runtime.
- Explain how the runtime enables asynchronous programming.

---

# 📚 Prerequisites

Before starting this chapter, you should already know:

- JavaScript basics
- JavaScript Engine
- Tokenizer
- Parser
- AST
- Bytecode
- Ignition
- TurboFan

---

# 🌍 What is a Runtime?

Before understanding the **JavaScript Runtime**, let's first understand the word **Runtime**.

A **Runtime** is the environment in which a program executes after it has been compiled or interpreted.

It provides everything that a program needs while it is running.

Think of a runtime as the **operating environment** for your program.

Without a runtime, a program may understand the language but cannot interact with the outside world.

---

# 🤔 Why Do We Need a Runtime?

Imagine you write this code:

```javascript
console.log("Hello World");
```

The JavaScript Engine can understand this code.

But here's a question.

Where does `console.log()` come from?

Is `console` a keyword like `if` or `for`?

No.

The JavaScript language itself does **not** define `console`.

Someone else provides it.

That "someone" is the **Runtime**.

Now consider another example.

```javascript
setTimeout(() => {
    console.log("Hello");
}, 1000);
```

Again, ask yourself:

- Who created `setTimeout()`?
- Who waits for one second?
- Who calls the callback after one second?

The JavaScript Engine doesn't do this.

The Runtime does.

---

# 🚗 Understanding a Runtime with an Analogy

Imagine you're an expert chef.

You know every recipe in the world.

You know how to cook pasta, pizza, and desserts.

But now imagine you're placed in an empty room.

There is:

- no stove,
- no utensils,
- no ingredients,
- no refrigerator,
- no water.

Can you cook?

**No.**

Why?

Because although you have the knowledge, you don't have the environment.

Now imagine a fully equipped kitchen.

You still have the same cooking knowledge.

But now you have:

- a stove,
- utensils,
- ingredients,
- timers,
- an oven.

Suddenly, you can cook anything.

The **chef** is like the **JavaScript Engine**.

The **kitchen** is like the **JavaScript Runtime**.

The engine understands JavaScript.

The runtime provides the tools needed to execute useful programs.

---

# ⚙️ What is a JavaScript Runtime?

A **JavaScript Runtime** is a complete execution environment that includes:

- a JavaScript Engine,
- APIs,
- memory management,
- an event loop,
- callback queues,
- and other components required to run JavaScript applications.

In simple words:

> The JavaScript Engine executes JavaScript.

> The JavaScript Runtime provides everything around the engine that makes JavaScript useful.

---

# 🆚 JavaScript Engine vs JavaScript Runtime

Many beginners think these two terms mean the same thing.

They don't.

Let's compare them.

| JavaScript Engine | JavaScript Runtime |
|-------------------|-------------------|
| Executes JavaScript | Provides the environment to run JavaScript |
| Parses code | Provides APIs |
| Generates Bytecode | Manages asynchronous tasks |
| Optimizes execution | Contains Event Loop |
| Converts code into machine instructions | Handles timers, network requests, file operations, etc. |

Think of it like this.

```
Runtime

│

├── JavaScript Engine

├── APIs

├── Event Loop

├── Queues

└── Memory Management
```

The engine is one part of the runtime.

The runtime is much larger.

---

# 🌐 Browser Runtime vs Node.js Runtime

One of JavaScript's biggest strengths is that it can run in different environments.

The same language is used in:

- Web Browsers
- Servers
- Desktop Applications
- Mobile Applications

However, each environment provides different APIs.

### Browser Runtime

A browser provides APIs such as:

- `document`
- `window`
- `fetch`
- `localStorage`
- `navigator`
- `history`
- `setTimeout`

Example:

```javascript
document.querySelector("h1");
```

This works in the browser because the browser runtime provides the `document` object.

Try running it in Node.js.

You'll get:

```text
ReferenceError: document is not defined
```

Why?

Because Node.js doesn't have a browser window.

---

### Node.js Runtime

Node.js provides server-side APIs such as:

- `fs`
- `http`
- `path`
- `os`
- `crypto`
- `process`
- `Buffer`

Example:

```javascript
const fs = require("fs");

fs.readFile("data.txt", () => {});
```

This works in Node.js.

But if you run it inside the browser, it won't work because browsers don't expose the local file system for security reasons.

---

# 🏗️ The Complete Runtime Architecture

A simplified JavaScript Runtime looks like this:

```
                JavaScript Runtime

+------------------------------------------------------+

|                 JavaScript Engine                    |

|      Tokenizer → Parser → AST → Bytecode            |

|               Ignition → TurboFan                   |

+------------------------------------------------------+

|                  Runtime APIs                        |

|  Timers | Fetch | DOM | FS | HTTP | Crypto | OS     |

+------------------------------------------------------+

|                    Event Loop                        |

+------------------------------------------------------+

|        Callback Queue | Microtask Queue             |

+------------------------------------------------------+

|                  Memory Management                   |

+------------------------------------------------------+
```

This entire system works together to execute JavaScript efficiently.

---

# 💡 Did You Know?

The ECMAScript specification defines the JavaScript language, but it does **not** define APIs such as:

- `setTimeout()`
- `console.log()`
- `fetch()`
- `document`
- `window`

These APIs are provided by the runtime environment, not by the JavaScript language itself.
# Part 2 — Execution Context

# 🌍 What is an Execution Context?

Imagine that you have written the following JavaScript program.

```javascript
let a = 10;

function greet() {
    console.log("Hello");
}

greet();
```

You click **Run**.

Now ask yourself:

> How does JavaScript know what should execute first?

> Where should variables be stored?

> How are functions remembered?

> How does JavaScript know which function is currently running?

There has to be some environment where all of this information is stored.

That environment is called the **Execution Context**.

---

## Definition

An **Execution Context** is the environment in which JavaScript code is evaluated and executed.

It contains everything required to execute a piece of code.

It stores:

- Variables
- Functions
- The value of `this`
- Information about the current execution

Think of it as the **workspace** for executing JavaScript code.

---

# 🏗️ Real-Life Analogy

Imagine you're taking an exam.

Before you start solving questions, the examiner gives you:

- A question paper
- An answer sheet
- A pen
- A desk
- A roll number

Now you have everything required to begin.

This setup is your working environment.

Similarly,

before JavaScript executes your code,

it first creates an execution context.

Only then does execution begin.

---

# 🤔 Why Does JavaScript Need an Execution Context?

Suppose JavaScript immediately started executing code without preparing anything.

```javascript
console.log(age);

let age = 21;
```

When JavaScript reaches the first line,

it must answer several questions.

- Does `age` exist?
- Where is it stored?
- Is it initialized?
- Can it be accessed?

Without an execution context,

the engine would have no place to keep this information.

The execution context solves this problem by preparing everything before execution begins.

---

# 🧬 The Life Cycle of an Execution Context

Every execution context has **two phases**.

```
Execution Context

↓

Creation Phase

↓

Execution Phase
```

These phases occur every time a new execution context is created.

---

# 🏗️ Phase 1 — Creation Phase

This is the preparation stage.

JavaScript scans your entire code before executing a single line.

During this phase, it performs tasks such as:

- Allocating memory for variables
- Allocating memory for functions
- Setting up the value of `this`
- Creating the lexical environment

No actual code is executed yet.

Only preparation happens.

Think of it as arranging all the tools before starting work.

---

# 📦 Variable Allocation

Consider the following code.

```javascript
let age = 21;
const city = "Delhi";
```

During the creation phase,

memory is reserved for both variables.

Conceptually,

```
Memory

↓

age

↓

city
```

At this point,

the variables exist,

but the assignment statements have **not yet been executed**.

---

# 🧩 Function Allocation

Functions are also stored during the creation phase.

Example:

```javascript
function greet() {
    console.log("Hello");
}
```

JavaScript stores the entire function in memory before execution starts.

Conceptually,

```
Memory

↓

greet()

↓

Entire Function Object
```

This is why function declarations can often be called before their definition in the source code.

We'll explore this in detail in the **Hoisting** chapter.

---

# 🎯 Phase 2 — Execution Phase

After the creation phase finishes,

JavaScript begins executing your code **line by line**.

Now assignments happen.

Functions are called.

Expressions are evaluated.

Loops execute.

Conditions are checked.

This is the actual running phase of your program.

---

# Example

```javascript
let x = 5;

let y = 10;

let sum = x + y;
```

During the creation phase,

memory is reserved for:

```
x

↓

y

↓

sum
```

During the execution phase,

the values are assigned.

```
x = 5

↓

y = 10

↓

sum = 15
```

---

# 🌍 Global Execution Context (GEC)

Whenever a JavaScript program starts,

the engine creates the **Global Execution Context**.

This is the first execution context created.

It represents the execution of the entire JavaScript file.

There is only **one** Global Execution Context for a program.

Think of it as the root execution environment.

---

Example:

```javascript
let name = "Harsh";

function greet() {}

console.log(name);
```

Before anything executes,

JavaScript creates the Global Execution Context.

Everything outside functions belongs to this context.

---

# ⚙️ Function Execution Context (FEC)

Whenever a function is called,

JavaScript creates a **new Execution Context** for that function.

Example:

```javascript
function greet() {
    console.log("Hello");
}

greet();
```

The sequence is:

```
Global Execution Context

↓

Call greet()

↓

Function Execution Context

↓

Execute Function

↓

Destroy Function Context

↓

Return to Global Context
```

Every function call gets its own execution context.

If the function is called multiple times,

multiple execution contexts are created (one at a time).

---

# 📌 Execution Context in Action

Consider this example.

```javascript
let name = "Harsh";

function greet() {

    let message = "Hello";

    console.log(message);
}

greet();

console.log(name);
```

Execution proceeds like this.

```
Program Starts

↓

Global Execution Context Created

↓

Creation Phase

↓

Execution Phase

↓

greet() Called

↓

Function Execution Context Created

↓

Creation Phase

↓

Execution Phase

↓

Function Completes

↓

Function Context Destroyed

↓

Back to Global Context

↓

Program Ends
```

Notice that the function gets its own private workspace.

Its variables do not interfere with the global variables.

---

# 🔍 Behind the Scenes

Whenever JavaScript encounters a function call,

it does **not** execute the function inside the Global Execution Context.

Instead,

it creates a **brand new execution context**.

This new context contains:

- Its own variables
- Its own parameters
- Its own `this` value
- Its own lexical environment

Once the function finishes,

that execution context is removed,

and JavaScript returns to the previous execution context.

This constant creation and destruction of execution contexts happens thousands of times in large applications.

---

# 💡 Did You Know?

Every execution context contains three important components:

- **Lexical Environment**
- **Variable Environment**
- **`this` Binding**

We will study each of these in detail in later chapters.

For now, remember that an execution context is much more than just a collection of variables—it defines the complete environment in which JavaScript code runs.

---

# ⚠️ Common Misconceptions

### ❌ JavaScript executes code immediately after reading it.

Incorrect.

JavaScript first creates an execution context and completes the creation phase.

Only then does execution begin.

---

### ❌ There is only one execution context.

Incorrect.

Every function call creates a new execution context.

---

### ❌ Variables are created when JavaScript reaches their line.

Incorrect.

Memory for variables is allocated during the creation phase, before any line of code is executed.

---

# 🌍 Real-World Impact

Execution contexts are the foundation of many JavaScript concepts.

Understanding them helps explain:

- Hoisting
- Scope
- Closures
- The `this` keyword
- Recursion
- Function calls
- The Call Stack

Every JavaScript application, whether it's a React frontend or a Node.js backend, constantly creates and destroys execution contexts while running.

---
# Part 3 — The Call Stack

# 🌍 What is the Call Stack?

In the previous section, we learned that every piece of JavaScript code runs inside an **Execution Context**.

Now a new question arises.

Suppose your program looks like this.

```javascript
function first() {
    second();
}

function second() {
    third();
}

function third() {
    console.log("Hello");
}

first();
```

JavaScript now has several questions to answer.

- Which function should execute first?
- Which function is currently running?
- Which function should execute after `third()` finishes?
- Where should JavaScript return after a function completes?

There has to be a mechanism that keeps track of all active function calls.

That mechanism is called the **Call Stack**.

---

# 📖 Definition

The **Call Stack** is a stack data structure used by the JavaScript Engine to manage the execution of function calls.

Whenever a function is invoked:

- A new **Function Execution Context** is created.
- That execution context is pushed onto the Call Stack.
- When the function finishes, its execution context is removed from the Call Stack.

In simple words:

> The Call Stack tells JavaScript **what is currently executing** and **where it should return next**.

---

# 🤔 Why Do We Need the Call Stack?

Imagine reading a book where every chapter suddenly jumps to another chapter without remembering where you came from.

You'd never know where to continue reading.

Functions work the same way.

Consider this code.

```javascript
function greet() {
    console.log("Hello");
}

console.log("Start");

greet();

console.log("End");
```

When `greet()` finishes,

JavaScript must remember to continue with:

```javascript
console.log("End");
```

The Call Stack stores this information.

Without it,

JavaScript would have no idea where to resume execution after a function call.

---

# 📚 Stack Data Structure

The Call Stack is based on the **Stack** data structure.

A stack follows the **LIFO (Last In, First Out)** principle.

Imagine a stack of books.

```
+-------------+
| Book 3      | ← Top
+-------------+
| Book 2      |
+-------------+
| Book 1      |
+-------------+
```

If you want to remove a book,

you must first remove the one on top.

You cannot directly remove Book 1.

The Call Stack behaves exactly the same way.

---

# 📥 Push and Pop Operations

Stacks support two primary operations.

### Push

Adds an item to the top.

```
Before

Top

↓

Empty
```

Push A

```
Top

↓

A
```

Push B

```
Top

↓

B

↓

A
```

---

### Pop

Removes the top item.

Before

```
Top

↓

B

↓

A
```

After Pop

```
Top

↓

A
```

The Call Stack performs these operations every time a function starts or finishes.

---

# ⚙️ How the Call Stack Works

Whenever JavaScript starts executing a program,

the **Global Execution Context** is created first.

It is pushed onto the Call Stack.

```
Call Stack

↓

Global Execution Context
```

Now suppose we write:

```javascript
function greet() {
    console.log("Hello");
}

greet();
```

The moment `greet()` is called,

JavaScript creates a **Function Execution Context**.

The Call Stack becomes:

```
Top

↓

greet()

↓

Global Execution Context
```

After `greet()` finishes,

its execution context is removed.

```
Top

↓

Global Execution Context
```

---

# 💻 Call Stack in Action

Let's understand this step by step.

```javascript
function one() {
    console.log("One");
}

console.log("Start");

one();

console.log("End");
```

---

## Step 1

Program starts.

```
Top

↓

Global Execution Context
```

---

## Step 2

Execute:

```javascript
console.log("Start");
```

The engine temporarily calls `console.log()`.

```
Top

↓

console.log()

↓

Global Execution Context
```

After printing,

```
Top

↓

Global Execution Context
```

---

## Step 3

Execute:

```javascript
one();
```

```
Top

↓

one()

↓

Global Execution Context
```

---

## Step 4

Inside `one()`,

```javascript
console.log("One");
```

Stack becomes:

```
Top

↓

console.log()

↓

one()

↓

Global Execution Context
```

After printing,

```
Top

↓

one()

↓

Global Execution Context
```

---

## Step 5

`one()` finishes.

```
Top

↓

Global Execution Context
```

---

## Step 6

Execute:

```javascript
console.log("End");
```

```
Top

↓

console.log()

↓

Global Execution Context
```

Finally,

```
Top

↓

Global Execution Context
```

Program ends.

Global Execution Context is removed.

Call Stack becomes empty.

---

# 🔄 Nested Function Calls

Now consider this example.

```javascript
function first() {
    second();
}

function second() {
    third();
}

function third() {
    console.log("Hello");
}

first();
```

Watch the Call Stack grow.

Initially,

```
Global
```

After calling `first()`,

```
Top

↓

first()

↓

Global
```

Inside `first()`,

```
second()
```

Stack becomes:

```
Top

↓

second()

↓

first()

↓

Global
```

Inside `second()`,

```
third()
```

Stack becomes:

```
Top

↓

third()

↓

second()

↓

first()

↓

Global
```

Now `third()` finishes.

```
Top

↓

second()

↓

first()

↓

Global
```

Then `second()` finishes.

```
Top

↓

first()

↓

Global
```

Finally,

```
Top

↓

Global
```

This process continues for every function call in every JavaScript program.

---

# 🔁 Recursion and the Call Stack

Recursion means a function calls itself.

Example:

```javascript
function count(n) {
    if (n === 0) return;

    console.log(n);

    count(n - 1);
}

count(3);
```

Call Stack growth:

```
count(3)

↓

count(2)

↓

count(1)

↓

count(0)
```

Once `count(0)` returns,

the stack starts shrinking.

```
count(0) removed

↓

count(1) removed

↓

count(2) removed

↓

count(3) removed
```

Every recursive call creates a brand-new execution context.

---

# 💥 Stack Overflow

What happens if recursion never stops?

```javascript
function test() {
    test();
}

test();
```

Every call creates another execution context.

```
test()

↓

test()

↓

test()

↓

test()

↓

test()

↓

...
```

Eventually,

the Call Stack becomes full.

JavaScript throws an error.

```text
RangeError: Maximum call stack size exceeded
```

This is called a **Stack Overflow**.

---

# 🔍 Behind the Scenes

The Call Stack is managed internally by the JavaScript Engine.

You cannot access it directly,

but every function call,

every method invocation,

and every callback begins by creating an execution context and pushing it onto the Call Stack.

When execution finishes,

that context is popped from the stack.

This push/pop cycle happens continuously while your program runs.

---

# 🌍 Real-World Impact

Understanding the Call Stack helps explain:

- Why recursion can crash a program.
- Why JavaScript executes one function at a time.
- Why asynchronous APIs don't block the entire application.
- How the Event Loop knows when it's safe to execute callbacks.
- Why stack traces appear in error messages.

The Call Stack is one of the core components that makes JavaScript execution predictable.

---

# 💡 Did You Know?

When an error occurs in JavaScript, you'll often see a **stack trace**.

Example:

```text
at third()
at second()
at first()
at main()
```

This stack trace is generated directly from the Call Stack and shows the chain of function calls that led to the error.

---
# Part 4 — Memory Management

# 🌍 Why Learn Memory Management?

Imagine this code.

```javascript
let a = 10;

let b = a;

b = 20;

console.log(a);
```

Output

```text
10
```

Now look at this.

```javascript
let person1 = {
    name: "Harsh"
};

let person2 = person1;

person2.name = "Rahul";

console.log(person1.name);
```

Output

```text
Rahul
```

A common question is:

> "Why didn't changing `b` affect `a`, but changing `person2` affected `person1`?"

The answer lies in **memory management**.

---

# 💾 What is Memory?

Whenever a JavaScript program runs, it needs a place to store:

- Variables
- Objects
- Arrays
- Functions
- Strings
- Numbers

That storage area is called **memory**.

You can think of memory as a giant collection of storage boxes.

```
Memory

+---------+
| Box 1   |
+---------+
| Box 2   |
+---------+
| Box 3   |
+---------+
| ...     |
+---------+
```

Every value created by your program is stored somewhere in memory.

---

# ⚙️ How JavaScript Uses Memory

The JavaScript Runtime mainly divides memory into two logical areas:

```
JavaScript Memory

↓

Stack Memory

↓

Heap Memory
```

Each serves a different purpose.

---

# 📚 Stack Memory

Stack Memory stores:

- Primitive values
- Function execution contexts
- Local variables
- Function parameters

Primitive values include:

- Number
- String
- Boolean
- Undefined
- Null
- BigInt
- Symbol

Example:

```javascript
let age = 21;
let isStudent = true;
```

Conceptually:

```
Stack

+------------------+
| isStudent : true |
+------------------+
| age : 21         |
+------------------+
```

The values themselves are stored directly in the stack.

This makes access very fast.

---

# 🚀 Characteristics of Stack Memory

- Fast access
- Small in size
- Automatically managed
- Stores primitive values
- Follows the LIFO principle for execution contexts

Think of the stack as a neat pile of books.

Adding and removing items is very efficient.

---

# 🏗️ Heap Memory

Heap Memory stores:

- Objects
- Arrays
- Functions (as objects)
- Dates
- Maps
- Sets

Example:

```javascript
let student = {
    name: "Harsh",
    age: 21
};
```

Conceptually:

```
Stack

student

↓

0x001
```

```
Heap

0x001

↓

{
    name: "Harsh",
    age: 21
}
```

Notice something important.

The object itself is **not** stored in the stack.

The stack stores a **reference (memory address)** to the object in the heap.

---

# 📦 Primitive vs Reference Values

This is one of the most important distinctions in JavaScript.

### Primitive Example

```javascript
let a = 10;

let b = a;

b = 50;
```

Memory:

```
Stack

a → 10

b → 10
```

After:

```javascript
b = 50;
```

```
Stack

a → 10

b → 50
```

Changing `b` does not affect `a` because each variable stores its own value.

---

### Object Example

```javascript
let obj1 = {
    age: 20
};

let obj2 = obj1;
```

Memory:

```
Stack

obj1

↓

0x100
```

```
Stack

obj2

↓

0x100
```

Both variables point to the same object.

Heap:

```
0x100

↓

{
    age:20
}
```

Now execute:

```javascript
obj2.age = 25;
```

Heap becomes:

```
0x100

↓

{
    age:25
}
```

Both variables still point to the same object.

Therefore,

```javascript
console.log(obj1.age);
```

prints

```text
25
```

---

# 🎨 Memory Visualization

Let's visualize everything together.

```javascript
let x = 10;

let y = x;

let person = {
    name: "Harsh"
};
```

Memory:

```
Stack

x → 10

y → 10

person

↓

0x200
```

Heap:

```
0x200

↓

{
    name:"Harsh"
}
```

Stack stores simple values directly.

Heap stores complex objects.

---

# 🗑️ Garbage Collection

Suppose we write:

```javascript
let user = {
    name: "Harsh"
};

user = null;
```

Now ask yourself.

Who is pointing to the object?

Nobody.

The object has become unreachable.

```
Heap

{
    name:"Harsh"
}

↑

No references
```

JavaScript automatically detects such unreachable objects.

Later,

the **Garbage Collector** removes them from memory.

This process frees memory for future use.

---

# ♻️ Why Garbage Collection is Important

Without garbage collection,

every object ever created would remain in memory forever.

Large applications would eventually consume all available RAM.

Garbage Collection prevents this by automatically cleaning up unused objects.

One of JavaScript's biggest strengths is that developers usually don't need to manually free memory.

---

# ⚠️ Memory Leaks

Although JavaScript has automatic garbage collection,

memory leaks can still happen.

A memory leak occurs when objects remain reachable even though your program no longer needs them.

Example:

```javascript
let users = [];

function addUser() {
    users.push({
        name: "Harsh"
    });
}
```

If `users` keeps growing forever,

those objects remain referenced.

The Garbage Collector cannot remove them.

Eventually,

memory usage increases continuously.

Memory leaks are especially important in long-running applications like:

- Node.js servers
- Express applications
- React applications
- Browser tabs left open for hours

---

# 🔍 Behind the Scenes

The JavaScript Engine allocates memory whenever you create a value.

Primitive values are generally stored directly in stack memory.

Objects are allocated in heap memory.

The stack keeps references to those heap objects.

The Garbage Collector periodically scans the heap.

If it finds objects that are no longer reachable,

it safely reclaims their memory.

Modern engines like **V8** use advanced garbage collection algorithms to make this process efficient without significantly interrupting program execution.

---

# 🌍 Real-World Impact

Understanding memory helps you write better applications.

Examples:

- Avoid accidental sharing of object references.
- Understand why copying an object is different from copying a number.
- Prevent memory leaks in Node.js servers.
- Write efficient React state updates.
- Understand why immutable patterns are useful.

Memory management knowledge directly improves application performance and reliability.

---

# 💡 Did You Know?

Many beginners say that JavaScript passes objects **"by reference."**

A more precise explanation is:

- JavaScript always passes arguments **by value**.
- For objects, the **value being copied is the reference** (memory address).

This subtle distinction explains many interview questions and common bugs.

We'll explore this further in the chapter on functions and parameter passing.

---

# ⚠️ Common Misconceptions

### ❌ Objects are stored in the stack.

Incorrect.

Objects are stored in the heap.

The stack stores a reference to them.

---

### ❌ JavaScript developers never need to think about memory.

Incorrect.

While garbage collection is automatic, understanding memory is essential for writing efficient and bug-free applications.

---

### ❌ Garbage Collection happens immediately.

Incorrect.

The Garbage Collector decides when to run based on the engine's algorithms and current memory usage.

---# Part 5 — JavaScript is Single Threaded

---

# 🎯 Learning Objectives

After completing this topic, you will be able to:

- Understand what a Process is.
- Understand what a Thread is.
- Differentiate between Process and Thread.
- Explain why JavaScript is single-threaded.
- Understand the advantages and limitations of a single-threaded language.

---

# 🤔 What is a Process?

A **Process** is an instance of a program that is currently running.

For example:

- Chrome Browser
- VS Code
- Spotify
- Node.js

Each of these is a separate process managed by the Operating System.

**Example**

When you open Chrome three times, the OS creates multiple processes.

```
Operating System
│
├── Chrome (Process)
├── VS Code (Process)
├── Node.js (Process)
└── Spotify (Process)
```

---

# 🤔 What is a Thread?

A **Thread** is the smallest unit of execution inside a process.

Think of a process as a company.

```
Company (Process)

↓

Employees (Threads)
```

Each employee performs work for the same company.

Similarly, a process can have multiple threads working together.

---

# 📊 Process vs Thread

| Process | Thread |
|----------|---------|
| Independent | Lives inside a process |
| Has its own memory | Shares process memory |
| Heavyweight | Lightweight |
| Slower to create | Faster to create |
| Can contain multiple threads | Executes a task |

---

# 🤔 Why is JavaScript Single Threaded?

JavaScript executes **one instruction at a time** using **one Call Stack**.

It does **not** execute two JavaScript functions simultaneously on the same thread.

```
Call Stack

↓

main()

↓

greet()

↓

calculate()

↓

print()

↓

Empty
```

Only the function at the **top** of the Call Stack executes.

---

# 💻 Example 1

```javascript
console.log("A");
console.log("B");
console.log("C");
```

Output

```
A
B
C
```

Execution

```
main()

↓

console.log("A")

↓

console.log("B")

↓

console.log("C")
```

Each statement waits for the previous one to finish.

---

# 💻 Example 2

```javascript
function one() {
    console.log("One");
}

function two() {
    console.log("Two");
}

one();
two();
```

Output

```
One
Two
```

Execution

```
Global

↓

one()

↓

Global

↓

two()

↓

Global
```

The second function starts only after the first one completes.

---

# 💻 Example 3 — Blocking Code

```javascript
console.log("Start");

for (let i = 0; i < 1_000_000_000; i++) {}

console.log("End");
```

Output

```
Start
End
```

Although there are only two `console.log()` statements, the loop blocks the Call Stack until it finishes.

This is why JavaScript is called **single-threaded**.

---

# 🌍 Why Did JavaScript Choose a Single Thread?

When JavaScript was created, its main job was to manipulate the web page (DOM).

Imagine two threads changing the same button at the same time.

Thread 1:

```javascript
button.innerText = "Login";
```

Thread 2:

```javascript
button.remove();
```

If both execute simultaneously, the browser could end up in an inconsistent state.

Using a single thread avoids many synchronization problems and keeps DOM updates predictable.

---

# ✅ Advantages

- Simpler programming model.
- No race conditions while manipulating the DOM.
- Easier debugging.
- Lower synchronization overhead.

---

# ❌ Limitations

- Long-running tasks block execution.
- CPU-intensive work can freeze the UI.
- Heavy computations should be moved to **Web Workers** (browser) or **Worker Threads** (Node.js).

---

# ⚠️ Common Misconceptions

### ❌ JavaScript can execute multiple functions simultaneously.

No. A single JavaScript thread executes one function at a time.

### ❌ JavaScript cannot perform multiple tasks.

It can, but asynchronous operations are handled with the help of the runtime (Event Loop, Web APIs, Node.js APIs), not by running multiple JavaScript functions simultaneously on the same thread.

---

# 📝 Summary

- A Process is a running program.
- A Thread executes code inside a process.
- JavaScript uses one main thread for executing JavaScript code.
- The Call Stack allows only one function to execute at a time.
- Asynchronous behavior is achieved with the help of the JavaScript Runtime, not because JavaScript itself is multi-threaded.

---

# 🎤 Interview Questions

1. What is the difference between a Process and a Thread?
2. Why is JavaScript called single-threaded?
3. What problems does a single-threaded model solve?
4. Can JavaScript execute two functions simultaneously?
5. If JavaScript is single-threaded, how does it handle asynchronous operations?