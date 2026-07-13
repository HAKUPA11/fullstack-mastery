# 📑 Table of Contents

- [Learning Objectives](#learning-objectives)
- [Prerequisites](#prerequisites)
- [Function Declaration](#function-declaration)
- [Function Expression](#function-expression)
- [Arrow Functions](#arrow-functions)
- [First-Class Functions](#first-class-functions)
- [Higher-Order Functions](#higher-order-functions)
- [Callback Functions](#callback-functions)
- [Immediately Invoked Function Expressions (IIFE)](#immediately-invoked-function-expressions-iife)
- [Recursion](#recursion)
- [Pure vs Impure Functions](#pure-vs-impure-functions)
- [Function Composition (Introduction)](#function-composition-introduction)
- [Backend Examples](#backend-examples)
- [Summary](#summary)
- [Interview Questions](#interview-questions)
- [Practice Exercises](#practice-exercises)

# Part 1 — Function Declaration, Function Expression & Arrow Functions

---

# 📑 Table of Contents

- [Learning Objectives](#learning-objectives)
- [Function Declaration](#function-declaration)
- [Function Expression](#function-expression)
- [Arrow Functions](#arrow-functions)
- [Comparison](#comparison)
- [Summary](#summary)

---

# 🎯 Learning Objectives

By the end of this part, you will:

- Understand the three main ways to create functions.
- Know when to use each type.
- Understand the key differences between them.

---

# 📌 Function Declaration

A function declaration defines a named function.

```javascript
function greet(name) {
    return `Hello, ${name}!`;
}

console.log(greet("Harsh"));
```

Output

```
Hello, Harsh!
```

### Characteristics

- Has a name.
- Hoisted completely.
- Can be called before its declaration.

```javascript
sayHello();

function sayHello() {
    console.log("Hello");
}
```

Output

```
Hello
```

---

# 📌 Function Expression

A function can also be assigned to a variable.

```javascript
const greet = function(name) {
    return `Hello, ${name}!`;
};

console.log(greet("Harsh"));
```

Output

```
Hello, Harsh!
```

Unlike declarations, function expressions are **not fully hoisted**.

```javascript
greet();

const greet = function() {
    console.log("Hello");
};
```

Output

```
ReferenceError
```

because `greet` is in the Temporal Dead Zone.

---

# 📌 Arrow Functions

Arrow functions provide a shorter syntax.

```javascript
const greet = (name) => {
    return `Hello, ${name}!`;
};

console.log(greet("Harsh"));
```

For a single expression, the `return` keyword can be omitted.

```javascript
const square = x => x * x;

console.log(square(5));
```

Output

```
25
```

---

# 💻 More Examples

### No Parameters

```javascript
const welcome = () => {
    console.log("Welcome!");
};

welcome();
```

---

### Multiple Parameters

```javascript
const add = (a, b) => a + b;

console.log(add(10, 20));
```

Output

```
30
```

---

### Returning an Object

Wrap the object in parentheses.

```javascript
const createUser = (name, age) => ({
    name,
    age
});

console.log(createUser("Harsh", 21));
```

Output

```
{
    name: "Harsh",
    age: 21
}
```

---

# 🌍 Real Backend Example

Express routes are commonly written using arrow functions.

```javascript
app.get("/users", (req, res) => {
    res.send("Users API");
});
```

This is one of the most common patterns you'll see in Node.js.

---

# 📊 Comparison

| Feature | Declaration | Expression | Arrow |
|---------|-------------|------------|--------|
| Name | ✅ | Optional | Usually assigned to a variable |
| Hoisted | ✅ Fully | ❌ No | ❌ No |
| Short Syntax | ❌ | ❌ | ✅ |
| Common in Modern JS | ✅ | ✅ | ✅ Most Common |

---

# 📝 Summary

- Function declarations are fully hoisted.
- Function expressions are stored in variables.
- Arrow functions provide concise syntax.
- Arrow functions are widely used in modern JavaScript and Node.js.

---

# 🎤 Interview Questions

1. What is the difference between a function declaration and a function expression?
2. Are arrow functions hoisted?
3. When would you prefer an arrow function?

---

# 📝 Practice Exercises

### 🟢 Concept Check

1. Which function type can be called before it is declared?
2. Which function type has the shortest syntax?

---

### 🟡 Predict the Output

```javascript
function add(a, b) {
    return a + b;
}

console.log(add(4, 6));
```

---

### 🟡 Rewrite

Convert this function declaration into an arrow function.

```javascript
function multiply(a, b) {
    return a * b;
}
```

---

### 🔴 Challenge

Write the following using all three styles:

- A function that calculates the area of a rectangle.
- A function that checks whether a number is even.
- A function that returns the larger of two numbers.

# Part 2 — First-Class Functions, Higher-Order Functions & Callbacks

---

# 📑 Table of Contents

- [First-Class Functions](#first-class-functions)
- [Higher-Order Functions](#higher-order-functions)
- [Callback Functions](#callback-functions)
- [Backend Connection](#backend-connection)
- [Summary](#summary)

---

# 📖 First-Class Functions

JavaScript treats functions as **first-class citizens**.

This means functions can:

- Be assigned to variables
- Be passed as arguments
- Be returned from other functions
- Be stored inside objects and arrays

---

## Example 1 — Assign to a Variable

```javascript
const greet = function () {
    console.log("Hello!");
};

greet();
```

Output

```
Hello!
```

---

## Example 2 — Store in an Object

```javascript
const calculator = {
    add(a, b) {
        return a + b;
    }
};

console.log(calculator.add(5, 3));
```

Output

```
8
```

---

## Example 3 — Store in an Array

```javascript
const operations = [
    () => console.log("Add"),
    () => console.log("Subtract")
];

operations[0]();
operations[1]();
```

Output

```
Add
Subtract
```

---

# 📖 Higher-Order Functions

A **Higher-Order Function (HOF)** is a function that:

- Accepts another function as an argument, **or**
- Returns another function.

---

## Example 1 — Function as an Argument

```javascript
function greet(name) {
    console.log(`Hello, ${name}`);
}

function processUser(callback) {
    callback("Harsh");
}

processUser(greet);
```

Output

```
Hello, Harsh
```

Here, `processUser()` is a Higher-Order Function.

---

## Example 2 — Returning a Function

```javascript
function multiplyBy(x) {

    return function (y) {
        return x * y;
    };

}

const double = multiplyBy(2);

console.log(double(5));
```

Output

```
10
```

You've already seen this pattern in the **Closures** chapter.

---

# 📖 Callback Functions

A **callback** is simply a function passed to another function, to be executed later.

---

## Example 1

```javascript
function greet(name) {
    console.log(`Hello ${name}`);
}

function execute(callback) {
    callback("Harsh");
}

execute(greet);
```

Output

```
Hello Harsh
```

Here, `greet` is the callback.

---

## Example 2 — Anonymous Callback

```javascript
setTimeout(() => {
    console.log("Executed after 2 seconds");
}, 2000);
```

The arrow function is the callback passed to `setTimeout()`.

---

## Example 3 — Array Methods

```javascript
const numbers = [1, 2, 3];

numbers.forEach((num) => {
    console.log(num);
});
```

Output

```
1
2
3
```

The function passed to `forEach()` is a callback.

---

# 💡 Backend Connection

You'll see callbacks and Higher-Order Functions everywhere in backend development.

### Express Middleware

```javascript
app.use((req, res, next) => {
    console.log("Request received");
    next();
});
```

The middleware function is passed as a callback.

---

### Route Handler

```javascript
app.get("/users", (req, res) => {
    res.send("All Users");
});
```

The route handler is also a callback.

---

### Array Processing

```javascript
const users = [
    { name: "Harsh", age: 21 },
    { name: "Rahul", age: 18 }
];

const adults = users.filter(user => user.age >= 18);
```

Methods like `map()`, `filter()`, `reduce()`, `find()`, and `some()` are all Higher-Order Functions because they accept callback functions.

---

# ⚠ Common Mistakes

### Mistake 1

Calling the callback instead of passing it.

❌ Incorrect

```javascript
setTimeout(greet(), 1000);
```

This executes `greet` immediately.

---

✅ Correct

```javascript
setTimeout(greet, 1000);
```

or

```javascript
setTimeout(() => greet(), 1000);
```

---

### Mistake 2

Confusing a Higher-Order Function with a callback.

```javascript
processUser(greet);
```

- `processUser` → Higher-Order Function
- `greet` → Callback Function

---

# 📊 Quick Revision

| Concept | Meaning |
|---------|---------|
| First-Class Function | Functions can be treated like values |
| Higher-Order Function | Accepts or returns functions |
| Callback Function | Function passed into another function |

---

# 📝 Summary

- JavaScript functions are first-class citizens.
- Higher-Order Functions accept or return functions.
- Callback functions are passed to other functions for later execution.
- These concepts are fundamental to modern JavaScript and backend frameworks like Express.

---

# 🎤 Interview Questions

1. What are first-class functions?
2. What is a Higher-Order Function?
3. What is a callback?
4. Is every callback a Higher-Order Function?
5. Give examples of Higher-Order Functions in JavaScript.

---

# 📝 Practice Exercises

### 🟢 Concept Check

1. Name two ways functions can be treated as values.
2. What is the difference between a callback and a Higher-Order Function?

---

### 🟡 Predict the Output

```javascript
function sayHi(name) {
    console.log(`Hi ${name}`);
}

function execute(callback) {
    callback("Harsh");
}

execute(sayHi);
```

---

### 🔴 Challenge

Create a function `calculate(a, b, operation)` where:

- `operation` is a callback function.
- Demonstrate addition, subtraction, and multiplication by passing different callbacks.

Example:

```javascript
calculate(10, 5, add);
calculate(10, 5, subtract);
calculate(10, 5, multiply);
```


# Part 3 — IIFE & Recursion

---

# 📑 Table of Contents

- [Immediately Invoked Function Expression (IIFE)](#immediately-invoked-function-expression-iife)
- [Why IIFEs Were Used](#why-iifes-were-used)
- [Recursion in JavaScript](#recursion-in-javascript)
- [Backend Connection](#backend-connection)
- [Summary](#summary)

---

# 📖 Immediately Invoked Function Expression (IIFE)

An **IIFE** is a function that executes immediately after it is defined.

General syntax:

```javascript
(function () {
    console.log("Executed immediately");
})();
```

Output

```
Executed immediately
```

The surrounding parentheses turn the function into an **expression**, and the final `()` immediately invokes it.

---

# 💻 Example 1

```javascript
(function () {
    const message = "Welcome!";
    console.log(message);
})();
```

Output

```
Welcome!
```

The variable `message` exists only inside the IIFE.

---

# 💻 Example 2 — Arrow Function IIFE

```javascript
(() => {
    console.log("Arrow IIFE");
})();
```

Output

```
Arrow IIFE
```

---

# 📖 Why IIFEs Were Used

Before ES6 introduced `let`, `const`, and modules, JavaScript had only function scope.

Developers used IIFEs to create a private scope and avoid polluting the global namespace.

```javascript
(function () {

    const secret = "Hidden";

    console.log(secret);

})();
```

Outside the IIFE:

```javascript
console.log(secret);
```

Output

```
ReferenceError
```

---

# 📌 Modern JavaScript

Today, IIFEs are less common because we have:

- `let`
- `const`
- ES6 Modules

However, you'll still encounter IIFEs in older codebases and interviews.

---

# 📖 Recursion in JavaScript

Recursion is a function calling itself until a **base case** is reached.

---

## Example 1 — Factorial

```javascript
function factorial(n) {

    if (n === 0)
        return 1;

    return n * factorial(n - 1);

}

console.log(factorial(5));
```

Output

```
120
```

---

## Example 2 — Countdown

```javascript
function countdown(n) {

    if (n === 0) {
        console.log("Done!");
        return;
    }

    console.log(n);

    countdown(n - 1);

}

countdown(3);
```

Output

```
3
2
1
Done!
```

---

## ⚠ Stack Overflow

Every recursive call is pushed onto the **Call Stack**.

Without a proper base case:

```javascript
function test() {
    test();
}

test();
```

Output

```
RangeError: Maximum call stack size exceeded
```

---

# 🌍 Backend Connection

### IIFE

Historically used to isolate library code.

Modern projects generally rely on ES Modules instead.

---

### Recursion

Recursion appears in backend development when:

- Traversing nested folders
- Processing JSON trees
- Building comment hierarchies
- Walking file systems
- Parsing nested API responses

Example (nested categories):

```javascript
function printCategory(category) {

    console.log(category.name);

    category.children.forEach(printCategory);

}
```

---

# ⚠ Common Mistakes

### Mistake 1

Forgetting the final `()` in an IIFE.

❌ Incorrect

```javascript
(function () {
    console.log("Hello");
});
```

The function is defined but never executed.

---

### Mistake 2

Missing the base case in recursion.

```javascript
function recurse() {
    recurse();
}
```

This causes a stack overflow.

---

# 📊 Quick Revision

| Concept | Meaning |
|---------|---------|
| IIFE | Function that executes immediately after being defined |
| Purpose | Create a private scope |
| Recursion | Function calling itself |
| Base Case | Condition that stops recursion |
| Stack Overflow | Too many recursive calls without termination |

---

# 📝 Summary

- IIFEs execute immediately and were widely used before ES6.
- Modern JavaScript uses modules instead of IIFEs for most use cases.
- Recursion is still an important technique for solving hierarchical problems.
- Every recursive call uses the Call Stack.

---

# 🎤 Interview Questions

1. What is an IIFE?
2. Why were IIFEs popular before ES6?
3. What is a base case in recursion?
4. What causes a stack overflow?
5. Where is recursion used in backend development?

---

# 📝 Practice Exercises

### 🟢 Concept Check

1. Why is an IIFE wrapped in parentheses?
2. What is the purpose of a base case?

---

### 🟡 Predict the Output

```javascript
(function () {
    console.log("JavaScript");
})();
```

---

### 🟡 Predict the Output

```javascript
function print(n) {

    if (n === 0)
        return;

    console.log(n);

    print(n - 1);

}

print(3);
```

---

### 🔴 Challenge

Write a recursive function `sum(n)` that returns the sum of numbers from `1` to `n`.

Example:

```javascript
sum(5); // 15
```

# Part 4 — Pure Functions, Function Composition & Backend Examples

---

# 📑 Table of Contents

- [Pure Functions](#pure-functions)
- [Impure Functions](#impure-functions)
- [Function Composition](#function-composition)
- [Backend Examples](#backend-examples)
- [Summary](#summary)

---

# 📖 Pure Functions

A **Pure Function**:

- Returns the same output for the same input.
- Does **not** modify external state.
- Has no side effects.

---

## Example 1

```javascript
function add(a, b) {
    return a + b;
}

console.log(add(5, 10));
```

Output

```
15
```

No matter how many times you call:

```javascript
add(5, 10);
```

the output is always `15`.

---

## Example 2

```javascript
function square(n) {
    return n * n;
}

console.log(square(6));
```

Output

```
36
```

Again, same input always gives the same output.

---

# 📖 Impure Functions

An **Impure Function** changes or depends on external state.

---

## Example 1

```javascript
let count = 0;

function increment() {
    count++;
}

increment();

console.log(count);
```

Output

```
1
```

The function modifies a variable outside itself.

---

## Example 2

```javascript
function greet() {
    console.log("Hello");
}
```

Printing to the console is considered a **side effect**, making this function impure.

---

# 📊 Pure vs Impure

| Pure Function | Impure Function |
|---------------|-----------------|
| Same input → Same output | Output may vary |
| No side effects | Has side effects |
| Easy to test | Harder to test |
| Predictable | Depends on external state |

---

# 📖 Function Composition

Function Composition means combining small functions to build larger functionality.

Instead of writing one huge function:

```javascript
processUserData();
```

break it into smaller reusable functions.

---

## Example

```javascript
const double = x => x * 2;
const square = x => x * x;

const result = square(double(5));

console.log(result);
```

Output

```
100
```

Execution:

```
5

↓

double()

↓

10

↓

square()

↓

100
```

---

## Another Example

```javascript
const trim = str => str.trim();
const toUpper = str => str.toUpperCase();

const result = toUpper(trim("  hello  "));

console.log(result);
```

Output

```
HELLO
```

Each function has one responsibility, making the code easier to reuse and test.

---

# 🌍 Backend Examples

### Example 1 — Middleware Pipeline

```javascript
authenticate(user);

↓

authorize(user);

↓

processRequest(user);

↓

sendResponse();
```

Each middleware performs one task before passing control to the next.

---

### Example 2 — Data Transformation

```javascript
const users = [
    { name: "Harsh", age: 21 },
    { name: "Rahul", age: 18 }
];

const names = users
    .filter(user => user.age >= 18)
    .map(user => user.name);

console.log(names);
```

Output

```
["Harsh", "Rahul"]
```

Small functions work together to produce the final result.

---

### Example 3 — Validation

```javascript
function validateEmail(email) {
    return email.includes("@");
}

function normalizeEmail(email) {
    return email.trim().toLowerCase();
}

const email = normalizeEmail("  HARSH@MAIL.COM ");

console.log(validateEmail(email));
```

Output

```
true
```

Each function performs a single job.

---

# 💡 Backend Connection

Express middleware is a great example of function composition.

```javascript
app.use(authenticate);
app.use(authorize);
app.use(logger);
```

Each middleware is a small function that contributes to the overall request-processing pipeline.

---

# ⚠ Common Mistakes

### Mistake 1

Writing one large function that does everything.

Instead, split logic into smaller reusable functions.

---

### Mistake 2

Changing global variables inside utility functions.

Prefer passing data as parameters and returning new values.

---

# 📊 Quick Revision

| Concept | Meaning |
|---------|---------|
| Pure Function | No side effects, predictable output |
| Impure Function | Depends on or modifies external state |
| Side Effect | Modifies data or interacts with the outside world |
| Function Composition | Combining small functions to build larger functionality |

---

# 📝 Summary

- Pure functions are predictable and easy to test.
- Impure functions interact with external state.
- Function composition encourages small, reusable functions.
- Modern backend applications are built by composing many small functions together.

---

# 🎤 Interview Questions

1. What is a pure function?
2. What is a side effect?
3. Why are pure functions easier to test?
4. What is function composition?
5. How is function composition used in Express?

---

# 📝 Practice Exercises

### 🟢 Concept Check

1. Give one example of a pure function.
2. Give one example of an impure function.

---

### 🟡 Predict the Output

```javascript
const double = x => x * 2;
const addFive = x => x + 5;

console.log(addFive(double(10)));
```

---

### 🔴 Challenge

Create three functions:

- `addTax(price)`
- `applyDiscount(price)`
- `formatPrice(price)`

Compose them to calculate and display the final price of a product.

# Part 5 — Best Practices, Revision & Interview Guide

---

# 📑 Table of Contents

- [Best Practices](#best-practices)
- [Common Mistakes](#common-mistakes)
- [Quick Revision Table](#quick-revision-table)
- [Summary](#summary)
- [Interview Questions](#interview-questions)
- [Practice Exercises](#practice-exercises)

---

# 📌 Best Practices

### ✅ Keep Functions Small

A function should ideally perform **one specific task**.

❌ Bad

```javascript
function processOrder(order) {

    // validate

    // calculate price

    // save to database

    // send email

}
```

✅ Better

```javascript
validateOrder(order);
calculatePrice(order);
saveOrder(order);
sendConfirmation(order);
```

Small functions are easier to understand, test, and reuse.

---

### ✅ Prefer Pure Functions

Whenever possible, avoid modifying global variables.

❌ Avoid

```javascript
let total = 0;

function add(price) {
    total += price;
}
```

✅ Better

```javascript
function add(total, price) {
    return total + price;
}
```

---

### ✅ Use Meaningful Function Names

Good names explain what the function does.

```javascript
calculateTotal();
validateEmail();
sendResponse();
createUser();
```

Avoid names like:

```javascript
doTask();
process();
temp();
```

---

### ✅ Use Arrow Functions Appropriately

Arrow functions are excellent for:

- Array methods
- Short utility functions
- Callback functions

Example:

```javascript
const numbers = [1, 2, 3];

const squares = numbers.map(num => num * num);
```

---

### ✅ Avoid Deeply Nested Functions

Instead of:

```javascript
function a() {
    function b() {
        function c() {
            function d() {

            }
        }
    }
}
```

Break the logic into separate reusable functions whenever possible.

---

# ⚠ Common Mistakes

## Mistake 1 — Calling Instead of Passing a Callback

❌ Incorrect

```javascript
setTimeout(greet(), 1000);
```

✅ Correct

```javascript
setTimeout(greet, 1000);
```

---

## Mistake 2 — Forgetting `return`

```javascript
const add = (a, b) => {
    a + b;
};
```

Output

```
undefined
```

Correct:

```javascript
const add = (a, b) => {
    return a + b;
};
```

or

```javascript
const add = (a, b) => a + b;
```

---

## Mistake 3 — Writing One Giant Function

Avoid functions that perform multiple unrelated tasks.

Split them into smaller functions.

---

## Mistake 4 — Overusing Recursion

Recursion is elegant but may cause stack overflow for very deep inputs.

Sometimes an iterative solution is a better choice.

---

# 📊 Quick Revision Table

| Concept | Key Idea |
|---------|----------|
| Function Declaration | Fully hoisted |
| Function Expression | Stored in a variable |
| Arrow Function | Concise syntax |
| First-Class Function | Functions behave like values |
| Higher-Order Function | Accepts or returns functions |
| Callback | Function passed to another function |
| IIFE | Executes immediately |
| Recursion | Function calls itself |
| Pure Function | No side effects |
| Impure Function | Depends on external state |
| Function Composition | Combine small functions |

---

# 📝 Summary

- JavaScript offers multiple ways to create functions.
- Functions are first-class citizens.
- Higher-order functions and callbacks are the foundation of modern JavaScript.
- IIFEs were historically used for scope isolation.
- Pure functions make code easier to maintain and test.
- Function composition encourages modular and reusable code.

---

# 🎤 Interview Questions

### Basic

1. What is the difference between a function declaration and a function expression?
2. What are arrow functions?

---

### Intermediate

3. What are first-class functions?
4. What is a Higher-Order Function?
5. What is a callback function?

---

### Advanced

6. What is an IIFE?
7. What is a pure function?
8. What is function composition?
9. Why are callbacks heavily used in JavaScript?
10. Where are Higher-Order Functions used in backend development?

---

# 📝 Practice Exercises

### 🟢 Concept Check

1. Name three ways to create a function.
2. What is the difference between a callback and a Higher-Order Function?

---

### 🟡 Predict the Output

```javascript
const multiply = (a, b) => a * b;

console.log(multiply(5, 6));
```

---

### 🟡 Predict the Output

```javascript
function execute(callback) {
    callback();
}

execute(() => console.log("Hello"));
```

---

### 🔴 Challenge

Create a simple calculator using callbacks.

Requirements:

- `calculate(a, b, operation)`
- Create separate functions for:
  - Addition
  - Subtraction
  - Multiplication
  - Division

Call the calculator using different callback functions.

---

# 🎯 Chapter 10 Complete

After completing this chapter, you now understand:

- ✅ Function Declaration
- ✅ Function Expression
- ✅ Arrow Functions
- ✅ First-Class Functions
- ✅ Higher-Order Functions
- ✅ Callback Functions
- ✅ IIFE
- ✅ Recursion
- ✅ Pure Functions
- ✅ Impure Functions
- ✅ Function Composition