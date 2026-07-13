# 📑 Table of Contents

- [Learning Objectives](#learning-objectives)
- [Prerequisites](#prerequisites)
- [What is Scope?](#what-is-scope)
- [Why Do We Need Scope?](#why-do-we-need-scope)
- [Types of Scope](#types-of-scope)
  - [Global Scope](#global-scope)
  - [Function Scope](#function-scope)
  - [Block Scope](#block-scope)
- [Nested Scope](#nested-scope)
- [Scope Chain](#scope-chain)
- [Lexical Environment](#lexical-environment)
- [Lexical Scope](#lexical-scope)
- [Variable Shadowing](#variable-shadowing)
- [Illegal Shadowing](#illegal-shadowing)
- [Real Backend Examples](#real-backend-examples)
- [Common Mistakes](#common-mistakes)
- [Summary](#summary)
- [Interview Questions](#interview-questions)
- [Practice Exercises](#practice-exercises)

# Scope and Lexical Environment

---

# 🎯 Learning Objectives

By the end of this chapter, you will be able to:

- Explain what scope is and why JavaScript needs it.
- Differentiate between Global, Function, and Block Scope.
- Understand how JavaScript searches for variables.
- Explain the Scope Chain.
- Understand Lexical Environment and Lexical Scope.
- Identify variable shadowing and illegal shadowing.
- Relate scope concepts to real Node.js and backend applications.

---

# 📚 Prerequisites

Before starting this chapter, you should understand:

- Execution Context
- Call Stack
- Hoisting
- `var`, `let`, and `const`
- Temporal Dead Zone (TDZ)

---

# 📖 What is Scope?

Imagine a classroom.

Every student has their own notebook.

A student sitting on one bench cannot simply take another student's notebook without permission.

Similarly, in programming, **variables also have boundaries**.

These boundaries determine **where a variable can be accessed**.

These boundaries are called **Scope**.

> **Definition:** Scope is the region of a program where a variable, function, or object can be accessed.

Simply put:

- Inside its scope → Accessible ✅
- Outside its scope → Not Accessible ❌

---

# 🤔 Why Do We Need Scope?

Suppose JavaScript had no scope.

```javascript
let username = "Harsh";
let username = "Rahul";
```

Which value should JavaScript use?

```
Harsh

or

Rahul
```

Without scope, variables from different parts of a program would interfere with each other, making applications unpredictable and difficult to maintain.

Scope solves this problem by isolating variables.

---

# 🌍 Real-World Analogy

Think of a house.

```
House
│
├── Living Room
│
├── Kitchen
│
└── Bedroom
```

The television in the living room belongs there.

You cannot directly access it from inside the bedroom without going through the house.

Variables behave similarly.

Each variable belongs to a specific scope.

---

# 🧠 Types of Scope

JavaScript provides three main types of scope:

```
Scope

│

├── Global Scope

├── Function Scope

└── Block Scope
```

We'll study each one in detail.

---

# 🌎 Global Scope

A variable declared outside every function and block belongs to the **Global Scope**.

Example:

```javascript
let website = "OpenAI";

function showWebsite() {
    console.log(website);
}

showWebsite();

console.log(website);
```

Output:

```
OpenAI
OpenAI
```

Why?

Because `website` belongs to the global scope and is accessible throughout the program unless shadowed.

---

# 📊 Global Scope Diagram

```
Global Scope

website

↓

"OpenAI"

↓

Accessible Everywhere
```

---

# 💻 Another Example

```javascript
const appName = "Backend Mastery";

function display() {
    console.log(appName);
}

display();

console.log(appName);
```

Output:

```
Backend Mastery
Backend Mastery
```

The variable exists only once, but every scope can access it unless another variable with the same name hides it.

---

# 🌍 Real Backend Example

In a Node.js application:

```javascript
const PORT = 3000;

app.listen(PORT);
```

`PORT` is declared in the global scope of the module.

Any function within that module can access it.

This is one of the most common examples of global scope in backend development.

---

# ⚠ Common Mistakes

### Mistake 1

Thinking global variables are always good.

They're convenient but can make large applications difficult to maintain because every part of the program can modify them.

Prefer limiting the scope of variables whenever possible.

---

### Mistake 2

Confusing "global" with "available in every file."

In modern JavaScript modules, a variable declared at the top level of one file is **module-scoped**, not automatically available in other files.

We'll study modules in a later chapter.

---

# 📝 Summary

- Scope determines where variables can be accessed.
- It prevents variables from interfering with each other.
- Global Scope is accessible throughout the current module or script.
- Understanding scope is essential before learning closures and modules.

---

# 🎤 Interview Questions

1. What is scope?
2. Why does JavaScript need scope?
3. What is Global Scope?
4. Is a global variable always a good practice?

---

# 📝 Practice Exercises

### 🟢 Concept Check

- Define scope in your own words.
- Why is scope important?

### 🟡 Predict the Output

```javascript
const language = "JavaScript";

function printLanguage() {
    console.log(language);
}

printLanguage();
```

### 🔴 Challenge

Create a global variable named `courseName` and access it from two different functions.

# Part 2 — Function Scope & Block Scope

---

# 📑 Table of Contents

- [Function Scope](#function-scope)
- [How Function Scope Works](#how-function-scope-works)
- [Block Scope](#block-scope)
- [Block Scope with let and const](#block-scope-with-let-and-const)
- [Why var Ignores Block Scope](#why-var-ignores-block-scope)
- [Comparison of All Scope Types](#comparison-of-all-scope-types)
- [Real Backend Examples](#real-backend-examples)
- [Common Mistakes](#common-mistakes)
- [Summary](#summary)

---

# 📌 Function Scope

A variable declared inside a function is accessible **only inside that function**.

Once the function finishes executing, its local variables cannot be accessed from outside.

```javascript
function greet() {

    let message = "Hello";

    console.log(message);

}

greet();
```

Output

```
Hello
```

Trying to access it outside the function:

```javascript
function greet() {

    let message = "Hello";

}

console.log(message);
```

Output

```
ReferenceError: message is not defined
```

---

# 🧠 How Function Scope Works

```
Global Scope

│

└── greet()

      │

      └── message = "Hello"
```

`message` belongs only to the `greet()` function.

When the function finishes, the variable is no longer accessible from outside.

---

# 💻 Example 1

```javascript
let username = "Harsh";

function display() {

    let age = 21;

    console.log(username);
    console.log(age);

}

display();
```

Output

```
Harsh
21
```

Why?

- `display()` can access its own variables.
- It can also access variables from its outer scope.

---

# 💻 Example 2

```javascript
function calculate() {

    let total = 100;

}

console.log(total);
```

Output

```
ReferenceError
```

`total` exists only inside `calculate()`.

---

# 💻 Example 3

```javascript
function outer() {

    let x = 10;

    console.log(x);

}

outer();

console.log(x);
```

Output

```
10
ReferenceError
```

---

# 📌 Block Scope

A **block** is any code enclosed within curly braces `{}`.

Examples:

```javascript
if () { }
```

```javascript
for () { }
```

```javascript
while () { }
```

```javascript
{
}
```

Variables declared with `let` and `const` are scoped to that block.

---

# 💻 Example 4

```javascript
{

    let city = "Delhi";

    console.log(city);

}
```

Output

```
Delhi
```

Outside the block:

```javascript
{

    let city = "Delhi";

}

console.log(city);
```

Output

```
ReferenceError
```

---

# 💻 Example 5

```javascript
{

    const PI = 3.14;

    console.log(PI);

}
```

Output

```
3.14
```

Outside the block:

```
ReferenceError
```

---

# 📌 Why `var` Ignores Block Scope

Unlike `let` and `const`, `var` is **not block scoped**.

Example

```javascript
if (true) {

    var score = 95;

}

console.log(score);
```

Output

```
95
```

Why?

Because `var` belongs to the surrounding **function** (or global scope if no function exists), not to the block.

---

# 💻 Example 6

```javascript
for (var i = 0; i < 3; i++) {

    console.log(i);

}

console.log(i);
```

Output

```
0
1
2
3
```

The variable `i` still exists after the loop.

---

Now compare with `let`.

```javascript
for (let i = 0; i < 3; i++) {

    console.log(i);

}

console.log(i);
```

Output

```
0
1
2
ReferenceError
```

Each `let` variable belongs only to the loop block.

---

# 🌍 Real Backend Example

```javascript
app.get("/profile", (req, res) => {

    const username = "Harsh";

    res.send(username);

});

console.log(username);
```

Output

```
ReferenceError
```

The variable exists only inside the route handler.

This prevents accidental access from other parts of the application.

---

# 📊 Comparison of Scope Types

| Scope | Created By | Accessible From |
|--------|------------|-----------------|
| Global Scope | Outside all functions and blocks | Everywhere in the current module/script |
| Function Scope | Function | Only inside that function |
| Block Scope | `{}` using `let` or `const` | Only inside that block |

---

# 📊 `var` vs `let` vs `const`

| Feature | `var` | `let` | `const` |
|----------|------|------|---------|
| Function Scoped | ✅ | ❌ | ❌ |
| Block Scoped | ❌ | ✅ | ✅ |
| Redeclaration Allowed | ✅ | ❌ | ❌ |
| Hoisted | ✅ | ✅ | ✅ |
| TDZ | ❌ | ✅ | ✅ |

---

# ⚠ Common Mistakes

## Mistake 1

Thinking every `{}` creates a new scope for `var`.

Wrong.

Only functions create scope for `var`.

---

## Mistake 2

Using `var` inside loops.

```javascript
for (var i = 0; i < 5; i++) {

}
```

The variable remains available after the loop.

Modern JavaScript recommends using `let`.

---

## Mistake 3

Thinking function variables are deleted immediately.

They become inaccessible once the function execution completes, though the engine manages their memory. (We'll revisit this when studying Closures and Garbage Collection.)

---

# 📝 Summary

- Function Scope limits variables to a function.
- Block Scope limits variables to `{}` blocks.
- `let` and `const` are block scoped.
- `var` is function scoped.
- Modern JavaScript generally prefers `let` and `const` because they reduce accidental bugs.

---

# 🎤 Interview Questions

1. What is Function Scope?
2. What is Block Scope?
3. Why is `var` not block scoped?
4. Why is `let` preferred inside loops?
5. What is the difference between Function Scope and Block Scope?

---

# 📝 Practice Exercises

### 🟢 Concept Check

1. Which keywords create block-scoped variables?
2. Is `var` block scoped?

---

### 🟡 Predict the Output

```javascript
if (true) {

    var a = 10;
    let b = 20;

}

console.log(a);
console.log(b);
```

---

### 🔴 Challenge

Write a function that declares a variable inside it and verify that it cannot be accessed outside the function. Then repeat the same experiment with a block using both `var` and `let`, and compare the results.


# Part 3 — Nested Scope & Scope Chain

---

# 📑 Table of Contents

- [Nested Scope](#nested-scope)
- [Variable Lookup](#variable-lookup)
- [Scope Chain](#scope-chain)
- [How JavaScript Resolves Variables](#how-javascript-resolves-variables)
- [Real Backend Example](#real-backend-example)
- [Common Mistakes](#common-mistakes)
- [Summary](#summary)

---

# 📌 Nested Scope

A function or block can be declared **inside another function or block**.

The inner scope can access variables from its outer scope, but the outer scope **cannot** access variables declared inside the inner scope.

```javascript
let country = "India";

function outer() {

    let state = "Rajasthan";

    function inner() {

        let city = "Jaipur";

        console.log(country);
        console.log(state);
        console.log(city);

    }

    inner();

}

outer();
```

Output

```
India
Rajasthan
Jaipur
```

---

# 🧠 Scope Hierarchy

```
Global Scope
│
├── country
│
└── outer()
      │
      ├── state
      │
      └── inner()
            │
            └── city
```

The `inner()` function can access everything above it.

---

# 💻 Example 1

```javascript
function outer() {

    let x = 10;

    function inner() {

        console.log(x);

    }

    inner();

}

outer();
```

Output

```
10
```

The variable `x` isn't inside `inner()`, but JavaScript searches the outer scope and finds it.

---

# 💻 Example 2

```javascript
function outer() {

    let x = 10;

    function inner() {

        let y = 20;

    }

    inner();

    console.log(y);

}

outer();
```

Output

```
ReferenceError
```

The outer function cannot access variables from the inner function.

---

# 📌 Variable Lookup

Whenever JavaScript encounters a variable, it follows a simple search process:

1. Look in the current scope.
2. If not found, move to the parent scope.
3. Continue until the global scope.
4. If still not found, throw a `ReferenceError`.

---

# 💻 Example 3

```javascript
let a = 1;

function first() {

    let b = 2;

    function second() {

        let c = 3;

        console.log(a);
        console.log(b);
        console.log(c);

    }

    second();

}

first();
```

Output

```
1
2
3
```

### Variable Lookup

For `a`

```
second()

↓

Not Found

↓

first()

↓

Not Found

↓

Global Scope

↓

Found
```

For `b`

```
second()

↓

Not Found

↓

first()

↓

Found
```

For `c`

```
second()

↓

Found
```

---

# 📌 Scope Chain

The path JavaScript follows while searching for variables is called the **Scope Chain**.

Visual:

```
Current Scope
      │
      ▼
Parent Scope
      │
      ▼
Grandparent Scope
      │
      ▼
Global Scope
      │
      ▼
ReferenceError (if not found)
```

The search always moves **outward**, never inward.

---

# 💻 Example 4

```javascript
let language = "JavaScript";

function backend() {

    function node() {

        console.log(language);

    }

    node();

}

backend();
```

Output

```
JavaScript
```

JavaScript follows the scope chain until it finds `language`.

---

# 🌍 Real Backend Example

```javascript
const db = "MongoDB";

function createUser() {

    const collection = "users";

    function saveUser() {

        console.log(db);
        console.log(collection);

    }

    saveUser();

}

createUser();
```

Output

```
MongoDB
users
```

`saveUser()` accesses both the global variable and the variable from its parent function using the scope chain.

---

# ⚠ Common Mistakes

### Mistake 1

Thinking JavaScript searches every function.

❌ Wrong.

JavaScript only searches **parent scopes**, never sibling or child scopes.

---

### Mistake 2

Thinking the outer scope can access inner variables.

```javascript
function outer() {

    function inner() {

        let secret = "Hidden";

    }

    console.log(secret);

}
```

Output

```
ReferenceError
```

Outer scopes cannot access variables declared inside inner scopes.

---

### Mistake 3

Confusing **Call Stack** with **Scope Chain**.

- **Call Stack** → Tracks function execution order.
- **Scope Chain** → Tracks where JavaScript searches for variables.

They are completely different concepts.

---

# 📊 Scope Chain vs Call Stack

| Scope Chain | Call Stack |
|-------------|------------|
| Resolves variables | Manages function execution |
| Based on where code is written | Based on which functions are running |
| Fixed by code structure | Changes during execution |

---

# 📝 Summary

- Nested scopes allow inner functions to access outer variables.
- Variable lookup starts from the current scope and moves outward.
- This search path is called the **Scope Chain**.
- JavaScript never searches child or sibling scopes.
- The Scope Chain is different from the Call Stack.

---

# 🎤 Interview Questions

1. What is Nested Scope?
2. What is the Scope Chain?
3. How does JavaScript resolve variables?
4. Can an outer function access variables inside an inner function?
5. What is the difference between Scope Chain and Call Stack?

---

# 📝 Practice Exercises

### 🟢 Concept Check

1. In which direction does JavaScript search for variables?
2. Can sibling functions access each other's local variables?

---

### 🟡 Predict the Output

```javascript
let x = 100;

function one() {

    let y = 200;

    function two() {

        console.log(x);
        console.log(y);

    }

    two();

}

one();
```

---

### 🔴 Challenge

Create three nested functions (`first`, `second`, and `third`). Declare one variable in each function. From the innermost function, print all three variables and explain how JavaScript finds each one using the Scope Chain.

# Part 4 — Lexical Environment & Lexical Scope

---

# 📑 Table of Contents

- [What is a Lexical Environment?](#what-is-a-lexical-environment)
- [Lexical Scope](#lexical-scope)
- [How JavaScript Resolves Variables](#how-javascript-resolves-variables)
- [Memory View](#memory-view)
- [Real Backend Example](#real-backend-example)
- [Common Mistakes](#common-mistakes)
- [Summary](#summary)

---

# 📖 What is a Lexical Environment?

A **Lexical Environment** is the environment in which a function or block is **written**.

It contains:

- Variables
- Functions
- A reference to its outer (parent) environment

Simply put:

> A Lexical Environment tells JavaScript **where to look for variables**.

---

# 🧠 Why is it called "Lexical"?

The word **lexical** means:

> **Based on where the code is written, not where it is called.**

Example:

```javascript
let language = "JavaScript";

function showLanguage() {
    console.log(language);
}

showLanguage();
```

Output

```
JavaScript
```

`showLanguage()` accesses `language` because it was **defined** in the same lexical environment.

---

# 📌 Lexical Scope

Lexical Scope means:

> A function can access variables from the scope in which it was **defined**.

Example:

```javascript
let a = 10;

function outer() {

    let b = 20;

    function inner() {

        console.log(a);
        console.log(b);

    }

    inner();

}

outer();
```

Output

```
10
20
```

`inner()` remembers where it was created, so it can access both `a` and `b`.

---

# 🧩 Memory View

```
Global Environment

a = 10

│

▼

outer()

b = 20

│

▼

inner()
```

When `inner()` needs a variable:

1. Check its own environment.
2. If not found, move to `outer()`.
3. If still not found, move to the Global Environment.
4. If not found anywhere, throw a `ReferenceError`.

---

# 💻 Example 1

```javascript
let x = 100;

function first() {

    let y = 200;

    function second() {

        console.log(x);
        console.log(y);

    }

    second();

}

first();
```

Output

```
100
200
```

---

# 💻 Example 2

```javascript
let message = "Hello";

function greet() {

    console.log(message);

}

greet();
```

Output

```
Hello
```

`greet()` finds `message` in its outer lexical environment.

---

# 💻 Example 3

```javascript
function outer() {

    let secret = "JavaScript";

    function inner() {

        console.log(secret);

    }

    return inner;

}

const fn = outer();

fn();
```

Output

```
JavaScript
```

At this point, don't worry **why** this works.

We'll fully explain it in the **Closures** chapter.

For now, notice that `inner()` still accesses `secret` because of its lexical environment.

---

# 🌍 Real Backend Example

```javascript
const db = "MongoDB";

function createService() {

    function getUsers() {

        console.log(db);

    }

    getUsers();

}

createService();
```

Output

```
MongoDB
```

`getUsers()` can access `db` because it was defined inside the lexical environment where `db` is visible.

---

# ⚠ Common Mistakes

### Mistake 1

Thinking JavaScript searches variables based on **where a function is called**.

Wrong.

JavaScript searches based on **where the function was defined**.

---

### Mistake 2

Confusing Scope Chain with Lexical Environment.

- **Lexical Environment** → Stores variables and the reference to the outer environment.
- **Scope Chain** → The path JavaScript follows through those environments while resolving variables.

They work together but are not the same thing.

---

# 📊 Lexical Environment vs Scope Chain

| Lexical Environment | Scope Chain |
|---------------------|-------------|
| Stores variables and outer reference | Search path used to resolve variables |
| Created for scopes/functions | Uses lexical environments during lookup |
| Fixed by code structure | Traversed during execution |

---

# 📝 Summary

- Every scope has its own Lexical Environment.
- A Lexical Environment stores local variables and a reference to its parent environment.
- JavaScript resolves variables using these linked environments.
- Lexical Scope depends on **where a function is defined**, not where it is called.
- Lexical Environments are the foundation of Closures.

---

# 🎤 Interview Questions

1. What is a Lexical Environment?
2. What is Lexical Scope?
3. What does "lexical" mean in JavaScript?
4. How is a Lexical Environment different from the Scope Chain?
5. Why are Lexical Environments important for Closures?

---

# 📝 Practice Exercises

### 🟢 Concept Check

1. Does JavaScript resolve variables based on where a function is defined or called?
2. What does a Lexical Environment store?

---

### 🟡 Predict the Output

```javascript
let language = "JavaScript";

function outer() {

    let framework = "Node.js";

    function inner() {

        console.log(language);
        console.log(framework);

    }

    inner();

}

outer();
```

---

### 🔴 Challenge

Create three nested functions. In the innermost function, access variables declared in all outer scopes. Explain the order in which JavaScript searches for each variable using the Lexical Environment and Scope Chain.

# Part 5 — Variable Shadowing, Illegal Shadowing & Revision

---

# 📑 Table of Contents

- [Variable Shadowing](#variable-shadowing)
- [Illegal Shadowing](#illegal-shadowing)
- [Best Practices](#best-practices)
- [Quick Revision Table](#quick-revision-table)
- [Summary](#summary)
- [Interview Questions](#interview-questions)
- [Practice Exercises](#practice-exercises)

---

# 📌 Variable Shadowing

Variable Shadowing occurs when a variable declared in an inner scope has the **same name** as a variable in an outer scope.

The inner variable temporarily hides (or **shadows**) the outer variable.

---

# 💻 Example 1

```javascript
let name = "Harsh";

function greet() {

    let name = "Rahul";

    console.log(name);

}

greet();

console.log(name);
```

Output

```
Rahul
Harsh
```

Explanation:

- Inside `greet()`, the local `name` shadows the global `name`.
- Outside the function, the global variable remains unchanged.

---

# 💻 Example 2

```javascript
const city = "Delhi";

{

    const city = "Mumbai";

    console.log(city);

}

console.log(city);
```

Output

```
Mumbai
Delhi
```

The block-scoped variable shadows the outer variable only inside the block.

---

# 🧠 Visual Representation

```
Global Scope

name = "Harsh"

        │

        ▼

Function Scope

name = "Rahul"
```

When JavaScript looks for `name` inside the function, it finds the local variable first and stops searching.

---

# 📌 Illegal Shadowing

Not every shadowing scenario is allowed.

Example:

```javascript
let value = 10;

{

    var value = 20;

}
```

Output

```
SyntaxError
```

Why?

`let` creates a block-scoped variable.

`var` tries to create a function-scoped variable with the same name, which causes a conflict.

---

# ✅ Legal Shadowing

```javascript
var count = 10;

{

    let count = 20;

    console.log(count);

}

console.log(count);
```

Output

```
20
10
```

The `let` variable belongs only to the block, so there is no conflict.

---

# 🌍 Real Backend Example

```javascript
const PORT = 3000;

function startServer() {

    const PORT = 5000;

    console.log(PORT);

}

startServer();

console.log(PORT);
```

Output

```
5000
3000
```

The local `PORT` shadows the global one only inside the function.

---

# ✅ Best Practices

- Prefer `let` and `const` over `var`.
- Keep variable scope as small as possible.
- Avoid unnecessary shadowing, especially in large functions.
- Use meaningful variable names to improve readability.
- Declare variables close to where they are used.

---

# 📊 Quick Revision Table

| Concept | Key Idea |
|---------|----------|
| Global Scope | Accessible throughout the current module/script |
| Function Scope | Accessible only inside the function |
| Block Scope | Accessible only inside `{}` when declared with `let` or `const` |
| Nested Scope | Inner scopes can access outer scopes |
| Scope Chain | JavaScript searches variables from inner to outer scopes |
| Lexical Environment | Stores variables and a reference to the outer environment |
| Lexical Scope | Variable access depends on where code is written |
| Variable Shadowing | Inner variable hides the outer variable |
| Illegal Shadowing | Some `var` and `let`/`const` combinations are not allowed |

---

# 📝 Summary

- Scope controls where variables can be accessed.
- Inner scopes can access outer scopes, but not the other way around.
- Variable lookup follows the Scope Chain.
- Lexical Environments link scopes together.
- Shadowing is valid when scopes do not conflict.
- Illegal Shadowing results in a `SyntaxError`.

---

# 🎤 Interview Questions

1. What is Variable Shadowing?
2. What is Illegal Shadowing?
3. How is Scope Chain different from Lexical Environment?
4. Why does JavaScript search from inner scope to outer scope?
5. Why should developers avoid excessive shadowing?

---

# 📝 Practice Exercises

### 🟢 Concept Check

1. Can a local variable shadow a global variable?
2. Is every shadowing example legal?

---

### 🟡 Predict the Output

```javascript
let x = 10;

function demo() {

    let x = 20;

    console.log(x);

}

demo();

console.log(x);
```

---

### 🟡 Predict the Output

```javascript
var language = "JavaScript";

{

    let language = "Node.js";

    console.log(language);

}

console.log(language);
```

---

### 🔴 Challenge

Write a program that demonstrates:

- Global Scope
- Function Scope
- Block Scope
- Nested Scope
- Variable Shadowing

Explain the output using the Scope Chain.

---
# 🎯 Chapter 7 Complete

By completing this chapter, you now understand:

- ✅ Scope
- ✅ Global, Function and Block Scope
- ✅ Nested Scope
- ✅ Scope Chain
- ✅ Lexical Environment
- ✅ Lexical Scope
- ✅ Variable Shadowing
- ✅ Illegal Shadowing

These concepts form the foundation for **Closures**, where JavaScript functions remember the Lexical Environment in which they were created.