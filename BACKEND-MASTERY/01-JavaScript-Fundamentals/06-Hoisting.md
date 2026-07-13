# Hoisting

---

# 📑 Table of Contents

- [Learning Objectives](#learning-objectives)
- [Prerequisites](#prerequisites)
- [Introduction to Hoisting](#introduction-to-hoisting)
- [The JavaScript Execution Process](#the-javascript-execution-process)
- [Compilation vs Execution](#compilation-vs-execution)
- [Creation Phase](#creation-phase)
- [Execution Phase](#execution-phase)
- [Memory Creation](#memory-creation)
- [What Exactly is Hoisting?](#what-exactly-is-hoisting)
- [Why Does Hoisting Exist?](#why-does-hoisting-exist)
- [Summary](#summary)
- [Interview Questions](#interview-questions)
- [Practice Exercises](#practice-exercises)

---

# 🎯 Learning Objectives

By the end of this chapter, you will be able to:

- Explain what hoisting really is.
- Understand why JavaScript appears to access variables before declaration.
- Differentiate between the Creation Phase and Execution Phase.
- Explain how the JavaScript engine prepares memory before running code.
- Build the foundation required to understand `var`, `let`, `const`, functions, and the Temporal Dead Zone.

---

# 📚 Prerequisites

Before starting this chapter, you should already understand:

- JavaScript Runtime
- Execution Context
- Call Stack
- Memory and Code Components of an Execution Context

---

# 📖 Introduction to Hoisting

Ask ten JavaScript developers:

> **"What is hoisting?"**

Many will answer:

> "JavaScript moves variables to the top."

This explanation is convenient but **incorrect**.

JavaScript never physically rewrites your code.

Instead, before executing your program, the JavaScript engine scans the code, creates memory for identifiers, and prepares the execution environment.

That preparation gives the illusion that variables and functions exist before their declarations.

This entire preparation process is what we call **hoisting**.

---

# 🏗 The JavaScript Execution Process

Whenever a JavaScript file starts executing, two major phases occur.

```
JavaScript File

        │
        ▼

Creation Phase

        │
        ▼

Execution Phase
```

Every Execution Context follows this sequence.

Whether it is:

- Global Execution Context
- Function Execution Context

both perform these two phases.

---

# ⚙️ Compilation vs Execution

Although JavaScript is an interpreted language, modern engines such as **V8** first analyze and prepare your code before executing it.

A simplified view:

```
Source Code

        │

Parse

        │

Create Execution Context

        │

Allocate Memory

        │

Execute Code
```

Notice that memory allocation happens **before** any line of your code executes.

This is the key to understanding hoisting.

---

# 🧠 Creation Phase

During the Creation Phase, the JavaScript engine does **not execute your code**.

Instead, it prepares everything required for execution.

It performs tasks such as:

- Creating the Execution Context
- Creating the Lexical Environment
- Allocating memory for variables
- Storing function declarations
- Setting up the scope chain
- Determining the value of `this`

Think of it as preparing a classroom before students arrive.

```
Arrange Desks

↓

Prepare Attendance Register

↓

Write on the Board

↓

Students Enter
```

Nothing has started yet, but everything is ready.

---

# 💾 Memory Creation

Consider the following code:

```javascript
var username = "Harsh";

function greet() {
    console.log("Hello");
}

var age = 20;
```

During the Creation Phase, memory is prepared like this:

```
Memory Component

username → undefined

greet → Entire Function Object

age → undefined
```

Notice something interesting:

The function already contains its complete definition, while variables only receive `undefined`.

No assignment has happened yet.

---

# ▶️ Execution Phase

Once memory has been prepared, JavaScript starts executing code **line by line**.

Example:

```javascript
var username = "Harsh";
```

Earlier:

```
username

↓

undefined
```

Now:

```
username

↓

"Harsh"
```

Similarly:

```javascript
var age = 20;
```

changes:

```
age

↓

20
```

Assignments happen only during the Execution Phase.

---

# 📌 What Exactly is Hoisting?

**Definition**

> Hoisting is the behavior where JavaScript creates memory for variables and function declarations during the Creation Phase before executing the code.

Notice the definition carefully.

It does **not** say:

> JavaScript moves code.

Instead, it says:

> JavaScript prepares memory before execution.

This distinction is extremely important.

---

# 🧩 Think Like the JavaScript Engine

Consider this code:

```javascript
console.log(message);

var message = "Hello";
```

### Step 1 — Creation Phase

Memory:

```
message

↓

undefined
```

---

### Step 2 — Execution Phase

First line:

```javascript
console.log(message);
```

Current value:

```
undefined
```

Output:

```
undefined
```

---

Next line:

```javascript
message = "Hello";
```

Memory becomes:

```
message

↓

"Hello"
```

Nothing moved to the top.

The engine had already created memory before execution started.

---

# 🤔 Why Does Hoisting Exist?

Imagine JavaScript did not prepare memory first.

When the engine encountered:

```javascript
greet();
```

it would not know whether `greet` existed later in the file.

By scanning the code first, JavaScript already knows:

- Which variables exist.
- Which functions exist.
- Which scopes exist.

This makes execution predictable and efficient.

---

# 🌍 Real Backend Perspective

When a Node.js server starts, JavaScript first prepares the Global Execution Context.

```
Start Server

↓

Create Global Execution Context

↓

Allocate Memory

↓

Load Function Declarations

↓

Execute Server Code
```

This is why you can often call a function before its declaration (if it's a function declaration).

Understanding hoisting helps explain startup behavior in real Node.js applications.

---

# ⚠ Common Misconceptions

## "JavaScript moves variables to the top."

❌ Incorrect.

JavaScript prepares memory before execution.

---

## "Hoisting means variables already have their assigned values."

❌ Incorrect.

Only memory is allocated.

Assignments happen later.

---

## "Everything is hoisted the same way."

❌ Incorrect.

`var`, `let`, `const`, function declarations, function expressions, arrow functions, and classes all behave differently.

We will study each one in detail.

---

# 📝 Summary

- Hoisting happens during the Creation Phase.
- JavaScript does not physically move code.
- Memory allocation occurs before execution.
- Variables and functions are treated differently during memory creation.
- Understanding hoisting requires understanding the Execution Context.

---

# 🎤 Interview Questions

1. What is hoisting?
2. Does JavaScript move code during hoisting?
3. What happens during the Creation Phase?
4. What is the difference between the Creation Phase and the Execution Phase?
5. Why does hoisting exist?
6. Why are variables initialized differently from function declarations?

---

# 📝 Practice Exercises

### 🟢 Level 1 — Concept Check

1. Define hoisting in your own words.
2. Why does JavaScript create memory before execution?
3. What is stored in memory for variables during the Creation Phase?

---

### 🟡 Level 2 — Predict the Output

```javascript
console.log(city);

var city = "Delhi";
```

Explain every step performed by the JavaScript engine.

---

### 🔴 Level 3 — Think Like the Engine

Draw the Memory Component and Code Component for:

```javascript
var a = 10;

function display() {
    return a;
}

var b = 20;
```

Show both the Creation Phase and the Execution Phase.
# Part 2 — Hoisting of `var`

# 📖 How `var` is Hoisted

When the JavaScript engine encounters a variable declared using `var`, it does **two separate things**.

### During the Creation Phase

- Creates memory for the variable.
- Initializes it with the value:

```javascript
undefined
```

### During the Execution Phase

- Executes the assignment statement.
- Replaces `undefined` with the assigned value.

Visual:

```
Creation Phase

count

↓

undefined

------------------------

Execution Phase

count

↓

10
```

This is why `var` can be accessed before its declaration without throwing an error.

---

# 💾 Memory Allocation for `var`

Example:

```javascript
var language = "JavaScript";
```

### Before execution

```
Memory

language

↓

undefined
```

### After execution

```
Memory

language

↓

"JavaScript"
```

Notice that the variable exists **before** the assignment happens.

---

# 💻 Example 1

```javascript
console.log(score);

var score = 100;
```

Output:

```
undefined
```

---

## Step-by-Step Execution

### Creation Phase

```
Memory

score

↓

undefined
```

---

### Execution Phase

#### Line 1

```javascript
console.log(score);
```

Current value:

```
undefined
```

Output:

```
undefined
```

---

#### Line 2

```javascript
score = 100;
```

Memory becomes:

```
score

↓

100
```

---

# 💻 Example 2

```javascript
var city;

console.log(city);
```

Output:

```
undefined
```

Why?

Because during the Creation Phase:

```
city

↓

undefined
```

The declaration doesn't assign any new value.

---

# 💻 Example 3

```javascript
var city = "Delhi";

console.log(city);
```

Output:

```
Delhi
```

Execution:

```
Creation Phase

↓

city = undefined

↓

Execution

↓

city = "Delhi"

↓

console.log(city)
```

---

# 📌 Declaration vs Initialization vs Assignment

Many beginners confuse these terms.

Example:

```javascript
var age = 20;
```

This single line actually performs **three different operations**.

### 1. Declaration

```javascript
var age;
```

The engine learns that a variable named `age` exists.

---

### 2. Initialization

During the Creation Phase:

```javascript
age = undefined;
```

This is done automatically by JavaScript for `var`.

---

### 3. Assignment

During the Execution Phase:

```javascript
age = 20;
```

The value changes from `undefined` to `20`.

Visual:

```
Declaration

↓

Initialization

↓

Assignment
```

Understanding this distinction is crucial when studying `let` and `const`.

---

# 📌 Multiple `var` Declarations

Example:

```javascript
console.log(a);

var a = 5;

var b = 10;

console.log(b);
```

Output:

```
undefined
10
```

### Creation Phase

```
Memory

a

↓

undefined

b

↓

undefined
```

### Execution Phase

```
a = 5

↓

b = 10
```

---

# 📌 Redeclaration with `var`

One unique feature of `var` is that it allows redeclaration.

Example:

```javascript
var user = "Harsh";

var user = "Rahul";

console.log(user);
```

Output:

```
Rahul
```

The second declaration simply replaces the previous value.

---

# 💻 Example 4

```javascript
var x = 5;

var x = 20;

console.log(x);
```

Output:

```
20
```

No error occurs.

---

# 💻 Example 5

```javascript
console.log(total);

var total;

total = 500;

console.log(total);
```

Output:

```
undefined
500
```

Explanation:

Creation Phase:

```
total

↓

undefined
```

Execution:

```
console.log(total)

↓

undefined

↓

Assignment

↓

500

↓

console.log(total)

↓

500
```

---

# 🌍 Real Backend Example

Suppose a Node.js application has:

```javascript
console.log(PORT);

var PORT = 3000;
```

Output:

```
undefined
```

The server doesn't crash because `PORT` exists during the Creation Phase.

However, relying on this behavior is considered bad practice. Modern JavaScript prefers `let` and `const` because they make such mistakes easier to catch.

---

# ⚠ Common Mistakes

## Mistake 1

Thinking:

```javascript
console.log(a);

var a = 10;
```

prints `10`.

Wrong.

The assignment hasn't happened yet.

---

## Mistake 2

Thinking `undefined` means the variable doesn't exist.

Wrong.

`undefined` means:

- The variable exists.
- Memory has been allocated.
- No value has been assigned yet.

---

## Mistake 3

Confusing `undefined` with `ReferenceError`.

For `var`:

```javascript
console.log(a);
```

Output:

```
undefined
```

For undeclared variables:

```javascript
console.log(b);
```

Output:

```
ReferenceError
```

These are completely different situations.

---

# 🧩 Think Like the JavaScript Engine

Code:

```javascript
console.log(price);

var price = 250;

console.log(price);
```

### Creation Phase

```
price

↓

undefined
```

---

### Execution Phase

Line 1:

```
undefined
```

Assignment:

```
price = 250
```

Line 3:

```
250
```

Final Output:

```
undefined
250
```

---

# 📝 Summary

- `var` variables are hoisted.
- During the Creation Phase, `var` is initialized to `undefined`.
- Assignments occur only during the Execution Phase.
- Accessing a `var` variable before its declaration returns `undefined`.
- `var` allows redeclaration, which is one reason modern JavaScript prefers `let` and `const`.

---

# 🎤 Interview Questions

1. What happens to a `var` variable during the Creation Phase?
2. Why does `console.log(a)` print `undefined` when `a` is declared later with `var`?
3. What is the difference between declaration, initialization, and assignment?
4. Why does `var` allow redeclaration?
5. Is `undefined` the same as `ReferenceError`?

---

# 📝 Practice Exercises

### 🟢 Level 1 — Concept Check

1. What value does JavaScript assign to `var` variables during the Creation Phase?
2. Can a `var` variable be redeclared?
3. Does hoisting execute assignment statements?

---

### 🟡 Level 2 — Predict the Output

```javascript
console.log(name);

var name = "Node.js";

console.log(name);
```

Explain each step performed by the JavaScript engine.

---

### 🔴 Level 3 — Think Like the Engine

Draw the Memory Component and Execution Component for:

```javascript
console.log(a);

var a = 10;

console.log(a);

var b = 20;

console.log(b);
```

Show how memory changes after every statement.

# Part 3 — Hoisting of `let` and `const`

---

# 📑 Table of Contents

- [Why Were `let` and `const` Introduced?](#why-were-let-and-const-introduced)
- [Are `let` and `const` Hoisted?](#are-let-and-const-hoisted)
- [Memory Allocation](#memory-allocation)
- [Temporal Dead Zone (Introduction)](#temporal-dead-zone-introduction)
- [Accessing Variables Before Declaration](#accessing-variables-before-declaration)
- [Comparison with `var`](#comparison-with-var)
- [Code Examples](#code-examples)
- [Common Mistakes](#common-mistakes)
- [Think Like the JavaScript Engine](#think-like-the-javascript-engine)
- [Summary](#summary)

---

# 🤔 Why Were `let` and `const` Introduced?

One of the biggest problems with `var` was that it allowed developers to accidentally use variables before assigning meaningful values.

Example:

```javascript
console.log(user);

var user = "Harsh";
```

Output:

```
undefined
```

Although the program runs, this often leads to bugs because the variable is accessed before it has a useful value.

To make JavaScript safer and more predictable, **ES6 (ECMAScript 2015)** introduced two new keywords:

- `let`
- `const`

These keywords prevent accidental access before initialization.

---

# 📖 Are `let` and `const` Hoisted?

This is one of the biggest misconceptions.

Many developers say:

> "`let` and `const` are not hoisted."

❌ **Incorrect.**

The correct statement is:

> **`let` and `const` are hoisted, but they are not initialized during the Creation Phase.**

This distinction is extremely important.

---

# 💾 Memory Allocation

Consider the following code:

```javascript
let a = 10;

const b = 20;
```

During the **Creation Phase**, memory is created for both variables.

```
Memory

a

↓

<uninitialized>

----------------

b

↓

<uninitialized>
```

Notice:

Unlike `var`, JavaScript does **not** assign `undefined`.

The variables exist in memory but cannot be accessed yet.

---

# 📌 Comparison with `var`

| Keyword | Memory Created? | Initial Value | Access Before Declaration |
|---------|-----------------|---------------|---------------------------|
| `var` | ✅ Yes | `undefined` | ✅ Allowed |
| `let` | ✅ Yes | Uninitialized | ❌ Error |
| `const` | ✅ Yes | Uninitialized | ❌ Error |

---

# 🚧 Temporal Dead Zone (Introduction)

The period between:

- Memory creation
- Variable initialization

is called the **Temporal Dead Zone (TDZ)**.

Visual timeline:

```
Creation Phase
        │
        ▼

Memory Allocated

        │

< Temporal Dead Zone >

        │

Declaration Executes

        │
        ▼

Variable Initialized

        │
        ▼

Variable Can Be Used
```

During the TDZ, accessing the variable results in a **ReferenceError**.

---

# 💻 Example 1

```javascript
console.log(count);

let count = 5;
```

Output:

```
ReferenceError:
Cannot access 'count' before initialization
```

---

## Step-by-Step Execution

### Creation Phase

```
Memory

count

↓

<uninitialized>
```

---

### Execution Phase

Line 1:

```javascript
console.log(count);
```

JavaScript checks:

```
Has count been initialized?

↓

No
```

Result:

```
ReferenceError
```

Execution stops immediately.

---

# 💻 Example 2

```javascript
console.log(city);

const city = "Delhi";
```

Output:

```
ReferenceError
```

Reason:

The variable exists in memory but is still inside the Temporal Dead Zone.

---

# 💻 Example 3

```javascript
let age = 21;

console.log(age);
```

Output:

```
21
```

Execution:

```
Creation Phase

↓

age

↓

<uninitialized>

---------------------

Execution

↓

age = 21

↓

console.log(age)

↓

21
```

Now the variable has been initialized, so it can be accessed safely.

---

# 💻 Example 4

```javascript
const PI = 3.14159;

console.log(PI);
```

Output:

```
3.14159
```

Again, the variable becomes usable only **after** its declaration executes.

---

# 🧠 Why Doesn't JavaScript Use `undefined` for `let`?

Imagine:

```javascript
console.log(balance);

let balance = 500;
```

If JavaScript initialized `balance` with `undefined`, the output would be:

```
undefined
```

This could hide programming mistakes.

Instead, JavaScript throws an error immediately, helping developers catch bugs earlier.

This is one of the main design goals of `let` and `const`.

---

# 🌍 Real Backend Example

Suppose you are configuring a Node.js server:

```javascript
console.log(PORT);

let PORT = process.env.PORT || 3000;
```

Output:

```
ReferenceError
```

The application fails immediately instead of silently using an incorrect value.

This behavior makes production applications safer.

---

# ⚠ Common Mistakes

## Mistake 1

Thinking `let` is not hoisted.

Wrong.

It **is** hoisted.

Only the initialization is delayed.

---

## Mistake 2

Confusing `undefined` with `ReferenceError`.

```javascript
var x;
```

Output before assignment:

```
undefined
```

```javascript
let y;
```

Output before declaration:

```
ReferenceError
```

Different behaviors.

---

## Mistake 3

Thinking the declaration creates the variable.

Wrong.

The variable is created during the Creation Phase.

The declaration only initializes it.

---

# 🧩 Think Like the JavaScript Engine

Code:

```javascript
console.log(score);

let score = 95;

console.log(score);
```

### Creation Phase

```
score

↓

<uninitialized>
```

---

### Execution Phase

First line:

```
console.log(score)
```

JavaScript checks:

```
Initialized?

↓

No
```

Throws:

```
ReferenceError
```

The remaining lines are never executed.

---

# 📊 `var` vs `let` vs `const`

| Feature | `var` | `let` | `const` |
|----------|------|------|---------|
| Hoisted | ✅ | ✅ | ✅ |
| Memory Allocated | ✅ | ✅ | ✅ |
| Initialized During Creation Phase | ✅ (`undefined`) | ❌ | ❌ |
| Temporal Dead Zone | ❌ | ✅ | ✅ |
| Access Before Declaration | `undefined` | ReferenceError | ReferenceError |
| Redeclaration | ✅ | ❌ | ❌ |

---

# 📝 Summary

- `let` and `const` are hoisted.
- Memory is allocated during the Creation Phase.
- They remain **uninitialized** until execution reaches their declaration.
- The period before initialization is called the **Temporal Dead Zone (TDZ)**.
- Accessing them during the TDZ throws a **ReferenceError**.
- This design helps catch programming mistakes early.

---

# 🎤 Interview Questions

1. Are `let` and `const` hoisted?
2. What is the Temporal Dead Zone?
3. Why does `let` throw a `ReferenceError`?
4. How is `var` different from `let` during the Creation Phase?
5. Why were `let` and `const` introduced?

---

# 📝 Practice Exercises

### 🟢 Level 1 — Concept Check

1. What is the Temporal Dead Zone?
2. Are `let` and `const` initialized during the Creation Phase?
3. Why is accessing a `let` variable before declaration an error?

---

### 🟡 Level 2 — Predict the Output

```javascript
console.log(a);

let a = 10;
```

Explain the execution step by step.

---

### 🔴 Level 3 — Think Like the Engine

Draw the Memory Component and Execution Component for:

```javascript
var x = 5;

let y = 10;

const z = 15;
```

Show:

- Creation Phase
- Execution Phase
- Final Memory State

# Part 4 — Hoisting of Functions

---

# 📑 Table of Contents

- [Introduction](#introduction)
- [Function Declaration Hoisting](#function-declaration-hoisting)
- [Function Expression Hoisting](#function-expression-hoisting)
- [Named Function Expression](#named-function-expression)
- [Arrow Function Hoisting](#arrow-function-hoisting)
- [Class Hoisting](#class-hoisting)
- [Comparison of All Function Types](#comparison-of-all-function-types)
- [Real Backend Examples](#real-backend-examples)
- [Common Mistakes](#common-mistakes)
- [Think Like the JavaScript Engine](#think-like-the-javascript-engine)
- [Summary](#summary)

---

# 📖 Introduction

Not all functions behave the same way during hoisting.

The behavior depends on **how the function is created**.

Consider these examples:

```javascript
// Function Declaration
function greet() {}
```

```javascript
// Function Expression
const greet = function() {};
```

```javascript
// Arrow Function
const greet = () => {};
```

Although all three create functions, JavaScript handles them differently during the Creation Phase.

---

# 📌 Function Declaration Hoisting

A **Function Declaration** is fully hoisted.

Example:

```javascript
greet();

function greet() {
    console.log("Hello");
}
```

Output:

```
Hello
```

---

## Why Does This Work?

During the Creation Phase:

```
Memory

greet

↓

Entire Function Object
```

Unlike variables, the complete function is stored in memory.

Visual:

```
Creation Phase

greet

↓

function greet() {
    console.log("Hello");
}
```

When execution reaches:

```javascript
greet();
```

the function already exists.

---

# 💻 Example 2

```javascript
console.log(typeof greet);

function greet() {}

greet();
```

Output:

```
function
```

Because the function already exists before execution starts.

---

# 📌 Function Expression Hoisting

Now consider:

```javascript
greet();

var greet = function() {
    console.log("Hello");
};
```

Output:

```
TypeError:
greet is not a function
```

Many beginners expect a `ReferenceError`.

It is actually a **TypeError**.

---

## Why?

Creation Phase:

```
greet

↓

undefined
```

Only the **variable** is hoisted.

The function object is **not** assigned yet.

Execution:

```javascript
greet();
```

becomes:

```javascript
undefined();
```

Which produces:

```
TypeError
```

---

# Execution Flow

```
Creation Phase

greet

↓

undefined

-------------------

Execution

↓

greet()

↓

undefined()

↓

TypeError
```

---

# 📌 Function Expression with `let`

Example:

```javascript
greet();

let greet = function() {
    console.log("Hello");
};
```

Output:

```
ReferenceError
```

Reason:

```
greet

↓

<uninitialized>
```

The variable is still inside the **Temporal Dead Zone**.

---

# 📌 Named Function Expression

Example:

```javascript
const greet = function welcome() {

    console.log("Hello");

};

greet();
```

Output:

```
Hello
```

Notice:

```javascript
welcome();
```

outside the function gives:

```
ReferenceError
```

The name `welcome` exists **only inside the function body**.

---

# 📌 Arrow Function Hoisting

Arrow functions behave exactly like variables.

Example:

```javascript
sayHi();

const sayHi = () => {

    console.log("Hi");

};
```

Output:

```
ReferenceError
```

Creation Phase:

```
sayHi

↓

<uninitialized>
```

---

If declared with `var`:

```javascript
sayHi();

var sayHi = () => {

    console.log("Hi");

};
```

Output:

```
TypeError
```

Reason:

```
sayHi

↓

undefined
```

Execution:

```
undefined()

↓

TypeError
```

---

# 📌 Class Hoisting

Classes are also hoisted.

Example:

```javascript
const student = new Student();

class Student {}
```

Output:

```
ReferenceError
```

Classes behave similarly to `let` and `const`.

Creation Phase:

```
Student

↓

<uninitialized>
```

The class remains in the **Temporal Dead Zone** until its declaration executes.

---

# 📊 Comparison of All Function Types

| Function Type | Hoisted | Initial Value | Calling Before Declaration |
|---------------|----------|---------------|----------------------------|
| Function Declaration | ✅ Fully | Complete Function | ✅ Works |
| Function Expression (`var`) | Variable Only | `undefined` | ❌ TypeError |
| Function Expression (`let`) | Variable Only | `<uninitialized>` | ❌ ReferenceError |
| Function Expression (`const`) | Variable Only | `<uninitialized>` | ❌ ReferenceError |
| Arrow Function (`var`) | Variable Only | `undefined` | ❌ TypeError |
| Arrow Function (`let`) | Variable Only | `<uninitialized>` | ❌ ReferenceError |
| Arrow Function (`const`) | Variable Only | `<uninitialized>` | ❌ ReferenceError |
| Class | ✅ | `<uninitialized>` | ❌ ReferenceError |

---

# 🌍 Real Backend Example

Suppose you define an Express route.

```javascript
app.get("/", homeController);

function homeController(req, res) {

    res.send("Home");

}
```

This works because `homeController` is a **Function Declaration**, which is fully hoisted.

Now compare:

```javascript
app.get("/", homeController);

const homeController = (req, res) => {

    res.send("Home");

};
```

Output:

```
ReferenceError
```

The route registration happens before `homeController` is initialized.

---

# ⚠ Common Mistakes

## Mistake 1

Thinking all functions are fully hoisted.

Wrong.

Only **Function Declarations** are.

---

## Mistake 2

Confusing:

```
ReferenceError
```

with

```
TypeError
```

Remember:

```
undefined()

↓

TypeError
```

```
<uninitialized>

↓

ReferenceError
```

---

## Mistake 3

Thinking arrow functions have special hoisting rules.

Wrong.

Arrow functions follow the hoisting behavior of the variable (`var`, `let`, or `const`) they are assigned to.

---

# 🧩 Think Like the JavaScript Engine

Example:

```javascript
display();

var display = function() {

    console.log("Display");

};
```

Creation Phase:

```
display

↓

undefined
```

Execution:

```
display()

↓

undefined()

↓

TypeError
```

Now compare:

```javascript
display();

function display() {

    console.log("Display");

}
```

Creation Phase:

```
display

↓

Entire Function Object
```

Execution:

```
display()

↓

Function Executes

↓

Display
```

---

# 📝 Summary

- Function declarations are fully hoisted.
- Function expressions depend on the variable that stores them.
- Arrow functions follow the same hoisting rules as variables.
- Classes are hoisted but remain in the Temporal Dead Zone.
- `TypeError` and `ReferenceError` occur for different reasons.

---

# 🎤 Interview Questions

1. Which type of function is fully hoisted?
2. Why does a function expression declared with `var` throw a `TypeError`?
3. Why does a function expression declared with `let` throw a `ReferenceError`?
4. Do arrow functions have special hoisting behavior?
5. Are classes hoisted?
6. What is the difference between a Function Declaration and a Function Expression?

# Part 5 — Temporal Dead Zone (TDZ)

---

# 📑 Table of Contents

- [What is the Temporal Dead Zone?](#what-is-the-temporal-dead-zone)
- [Why Does TDZ Exist?](#why-does-tdz-exist)
- [How TDZ Works Internally](#how-tdz-works-internally)
- [Memory Diagram](#memory-diagram)
- [TDZ with let](#tdz-with-let)
- [TDZ with const](#tdz-with-const)
- [TDZ and Block Scope](#tdz-and-block-scope)
- [The typeof Surprise](#the-typeof-surprise)
- [Real Backend Examples](#real-backend-examples)
- [Common Mistakes](#common-mistakes)
- [Think Like the JavaScript Engine](#think-like-the-javascript-engine)
- [Summary](#summary)

---

# 📖 What is the Temporal Dead Zone?

The **Temporal Dead Zone (TDZ)** is the period between:

- When a variable is created during the **Creation Phase**
- When its declaration is executed during the **Execution Phase**

During this period:

- The variable **exists in memory**
- But it **cannot be accessed**

Attempting to access it throws a **ReferenceError**.

---

# 📊 Visual Timeline

```
Program Starts
        │
        ▼

Creation Phase

        │

Variable Created

        │

──────── TDZ ────────

        │

Declaration Executes

        │

Variable Initialized

        │

Safe to Access
```

The TDZ ends exactly when JavaScript executes the declaration.

---

# 🤔 Why Does TDZ Exist?

Suppose JavaScript behaved like `var`.

```javascript
console.log(balance);

let balance = 1000;
```

If JavaScript initialized `balance` to `undefined`, the output would be:

```
undefined
```

The program would continue running even though the variable was used before it was ready.

This could hide serious programming mistakes.

Instead, JavaScript immediately throws an error:

```
ReferenceError
```

This helps developers detect bugs early.

---

# 🧠 How TDZ Works Internally

Example:

```javascript
let score = 95;
```

### Creation Phase

```
Memory

score

↓

<uninitialized>
```

---

### Execution Phase

When JavaScript reaches:

```javascript
let score = 95;
```

The variable changes from:

```
<uninitialized>
```

to:

```
95
```

From this moment onward, the variable can be used normally.

---

# 💻 Example 1

```javascript
console.log(age);

let age = 21;
```

Output:

```
ReferenceError
```

Reason:

```
age

↓

<uninitialized>
```

The declaration has not executed yet.

---

# 💻 Example 2

```javascript
let age;

console.log(age);
```

Output:

```
undefined
```

Many beginners think this should throw an error.

It doesn't.

Why?

Execution reaches:

```javascript
let age;
```

The declaration executes.

The variable is initialized to `undefined`.

After that, accessing it is perfectly valid.

---

# 💻 Example 3

```javascript
const PI = 3.14;

console.log(PI);
```

Output:

```
3.14
```

The TDZ ends when the declaration executes.

---

# 📌 TDZ with Block Scope

Example:

```javascript
let value = 10;

{
    console.log(value);

    let value = 20;
}
```

Output:

```
ReferenceError
```

Many developers expect:

```
10
```

But a new block scope is created.

Inside the block:

```
value

↓

<uninitialized>
```

The inner `value` shadows the outer one.

Until it is initialized, it remains inside the TDZ.

---

# 🌳 Scope Diagram

```
Global Scope

value → 10

        │

        ▼

Block Scope

value → <uninitialized>

↓

TDZ

↓

20
```

The outer variable is hidden because the inner variable has already been created.

---

# 📌 TDZ with Loops

Example:

```javascript
for (let i = 0; i < 3; i++) {

    console.log(i);

}
```

Each iteration creates a **new binding** of `i`.

This is one reason why `let` behaves correctly inside loops and asynchronous callbacks.

---

# 📌 The `typeof` Surprise

Many developers believe:

> "`typeof` never throws an error."

Not always.

Example:

```javascript
console.log(typeof username);

let username = "Harsh";
```

Output:

```
ReferenceError
```

Why?

Because `username` exists inside the TDZ.

Compare:

```javascript
console.log(typeof unknownVariable);
```

Output:

```
undefined
```

The variable doesn't exist at all.

These are completely different situations.

---

# 🌍 Real Backend Example

Suppose you write:

```javascript
app.listen(PORT);

const PORT = 3000;
```

Output:

```
ReferenceError
```

The server never starts because `PORT` is accessed before initialization.

Correct:

```javascript
const PORT = 3000;

app.listen(PORT);
```

This is one reason modern backend code usually declares configuration values before using them.

---

# ⚠ Common Mistakes

## Mistake 1

Thinking TDZ starts at the declaration.

Wrong.

It starts when the variable is **created during the Creation Phase**.

---

## Mistake 2

Thinking TDZ means the variable doesn't exist.

Wrong.

It already exists.

It simply cannot be accessed.

---

## Mistake 3

Thinking `typeof` always returns `"undefined"`.

Wrong.

Variables inside the TDZ cause a **ReferenceError**.

---

# 🧩 Think Like the JavaScript Engine

Code:

```javascript
console.log(total);

let total = 500;

console.log(total);
```

### Creation Phase

```
Memory

total

↓

<uninitialized>
```

---

### Execution Phase

Line 1

```
console.log(total)
```

JavaScript checks:

```
Initialized?

↓

No
```

Result:

```
ReferenceError
```

Execution stops immediately.

The remaining lines are never executed.

---

# 📊 `var` vs `let` vs `const`

| Feature | `var` | `let` | `const` |
|----------|------|------|---------|
| Hoisted | ✅ | ✅ | ✅ |
| Initialized During Creation Phase | `undefined` | ❌ | ❌ |
| Temporal Dead Zone | ❌ | ✅ | ✅ |
| Block Scoped | ❌ | ✅ | ✅ |
| Access Before Declaration | `undefined` | ReferenceError | ReferenceError |

---

# 📝 Summary

- The TDZ is the period between memory creation and initialization.
- `let` and `const` remain uninitialized during the TDZ.
- Accessing them during this period throws a `ReferenceError`.
- TDZ prevents accidental access to variables before they are ready.
- TDZ exists for both global and block-scoped variables.

---

# 🎤 Interview Questions

1. What is the Temporal Dead Zone?
2. Why was TDZ introduced?
3. Does a variable inside the TDZ exist in memory?
4. Why does `typeof` sometimes throw a `ReferenceError`?
5. How does TDZ improve code safety?

---

# 📝 Practice Exercises

### 🟢 Level 1 — Concept Check

1. When does the TDZ begin?
2. When does the TDZ end?
3. Why does JavaScript use the TDZ?

---

### 🟡 Level 2 — Predict the Output

```javascript
{
    console.log(city);

    let city = "Delhi";
}
```

Explain every step of execution.

---

### 🔴 Level 3 — Think Like the Engine

Draw the memory state for:

```javascript
let x = 10;

{
    console.log(x);

    let x = 20;
}
```

Explain why the outer `x` cannot be accessed.