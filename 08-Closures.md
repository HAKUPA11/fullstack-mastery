# 📑 Table of Contents

- [Learning Objectives](#learning-objectives)
- [Prerequisites](#prerequisites)
- [What is a Closure?](#what-is-a-closure)
- [Why Closures Exist](#why-closures-exist)
- [How Closures Work](#how-closures-work)
- [Closures and Lexical Environment](#closures-and-lexical-environment)
- [Data Hiding & Encapsulation](#data-hiding--encapsulation)
- [Function Factories](#function-factories)
- [Closures with Loops](#closures-with-loops)
- [Closures in Event Listeners](#closures-in-event-listeners)
- [Memory Leaks](#memory-leaks)
- [Backend Examples](#backend-examples)
- [Summary](#summary)
- [Interview Questions](#interview-questions)
- [Practice Exercises](#practice-exercises)

# Part 1 — Introduction to Closures

---

# 📑 Table of Contents

- [Learning Objectives](#learning-objectives)
- [Prerequisites](#prerequisites)
- [What is a Closure?](#what-is-a-closure)
- [Why Do Closures Exist?](#why-do-closures-exist)
- [First Closure Example](#first-closure-example)
- [How to Identify a Closure](#how-to-identify-a-closure)
- [Common Mistakes](#common-mistakes)
- [Summary](#summary)

---

# 🎯 Learning Objectives

By the end of this chapter, you will be able to:

- Explain what a closure is.
- Understand why closures exist.
- Identify closures in JavaScript code.
- Explain how closures relate to lexical scope.
- Use closures confidently in backend development.

---

# 📚 Prerequisites

Before learning closures, you should understand:

- Execution Context
- Hoisting
- Scope
- Scope Chain
- Lexical Environment

---

# 📖 What is a Closure?

A **closure** is created when a function remembers the variables from the scope where it was **defined**, even after that outer function has finished executing.

In simple words:

> **A closure allows a function to "remember" its outer variables.**

---

# 🤔 Why Do Closures Exist?

Consider this example:

```javascript
function outer() {

    let message = "Hello";

    function inner() {
        console.log(message);
    }

    return inner;

}

const greet = outer();

greet();
```

Output

```
Hello
```

At first glance, this seems surprising.

`outer()` has already finished executing, so why can `inner()` still access `message`?

The answer is:

**Closure.**

---

# 💻 First Closure Example

```javascript
function outer() {

    let name = "Harsh";

    function inner() {
        console.log(name);
    }

    return inner;

}

const printName = outer();

printName();
```

Output

```
Harsh
```

The function `inner()` remembers the variable `name`, even though `outer()` has already returned.

---

# 🧠 Visual Representation

```
Global Scope

│

▼

outer()

name = "Harsh"

│

▼

inner()

↓

Returned

↓

Still remembers "name"
```

The returned function carries a reference to the lexical environment where it was created.

---

# 💻 Example 2

```javascript
function createGreeting() {

    let greeting = "Welcome";

    return function () {
        console.log(greeting);
    };

}

const greet = createGreeting();

greet();
```

Output

```
Welcome
```

Again, the returned function remembers `greeting`.

---

# 💻 Example 3

```javascript
function outer() {

    let x = 10;

    return function () {
        console.log(x);
    };

}

const fn = outer();

fn();
```

Output

```
10
```

Notice that all these examples follow the same pattern:

1. An outer function declares a variable.
2. An inner function uses that variable.
3. The inner function is returned.
4. The returned function still has access to the outer variable.

This pattern is the hallmark of a closure.

---

# 🔍 How to Identify a Closure

A closure usually has these characteristics:

- An outer function.
- An inner function.
- The inner function accesses variables from the outer function.
- The inner function continues to use those variables after the outer function has finished.

If you see this pattern, you're looking at a closure.

---

# 🌍 Real Backend Example

Imagine creating a logger:

```javascript
function createLogger(prefix) {

    return function(message) {
        console.log(`[${prefix}] ${message}`);
    };

}

const apiLogger = createLogger("API");

apiLogger("User created");
apiLogger("Order placed");
```

Output

```
[API] User created
[API] Order placed
```

The returned function remembers the value of `prefix`.

Patterns like this are common in Express middleware, logging utilities, and configuration helpers.

---

# ⚠ Common Mistakes

### Mistake 1

Thinking closures copy variables.

❌ Wrong.

Closures keep a **reference** to variables, not a copy.

---

### Mistake 2

Thinking closures only happen when using `return`.

❌ Wrong.

Returning a function is the most common example, but closures can also occur with callbacks, event listeners, and timers.

We'll study those later in this chapter.

---

# 📝 Summary

- A closure is created when a function remembers variables from its outer scope.
- Closures are possible because of lexical scope.
- They allow functions to access outer variables even after the outer function has returned.
- Closures are widely used in real-world JavaScript and Node.js applications.

---

# 🎤 Interview Questions

1. What is a closure?
2. Why do closures exist?
3. What enables closures in JavaScript?
4. Does a closure store a copy of a variable or a reference?
5. Where are closures used in real applications?

---

# 📝 Practice Exercises

### 🟢 Concept Check

1. Define a closure in your own words.
2. What are the four characteristics of a closure?

---

### 🟡 Predict the Output

```javascript
function outer() {

    let language = "JavaScript";

    return function() {
        console.log(language);
    };

}

const show = outer();

show();
```

---

### 🔴 Challenge

Write a function `createMessage(msg)` that returns another function. When the returned function is called, it should print the original `msg`. Explain why the message is still available even after `createMessage()` has finished executing.

# Part 2 — How Closures Work Internally

---

# 📑 Table of Contents

- [How a Closure is Created](#how-a-closure-is-created)
- [Step-by-Step Execution](#step-by-step-execution)
- [Memory View](#memory-view)
- [Why Variables Don't Disappear](#why-variables-dont-disappear)
- [Common Misconceptions](#common-misconceptions)
- [Summary](#summary)

---

# 📖 How a Closure is Created

Let's revisit the classic example.

```javascript
function outer() {

    let count = 0;

    function inner() {
        console.log(count);
    }

    return inner;

}

const counter = outer();

counter();
```

Output

```
0
```

The interesting part is that `outer()` has already finished executing, yet `inner()` still accesses `count`.

---

# 🧠 Step-by-Step Execution

### Step 1

JavaScript executes:

```javascript
const counter = outer();
```

A new Execution Context is created for `outer()`.

```
outer()

count = 0

inner() created
```

---

### Step 2

`outer()` returns the `inner` function.

```javascript
return inner;
```

Normally, we might expect all local variables to disappear.

But JavaScript notices that `inner()` still needs `count`.

So instead of destroying that lexical environment, it keeps it alive.

---

### Step 3

Now:

```javascript
counter();
```

calls the returned function.

Although `outer()` has already completed, `inner()` still has access to:

```
count = 0
```

because it remembers the lexical environment where it was created.

---

# 📊 Memory View

```
Global Scope

counter
   │
   ▼
inner()
   │
   ▼
Lexical Environment
   │
count = 0
```

The returned function keeps a reference to its lexical environment.

That's what a **closure** is.

---

# 💻 Example 1

```javascript
function createUser() {

    let username = "Harsh";

    return function() {
        console.log(username);
    };

}

const showUser = createUser();

showUser();
```

Output

```
Harsh
```

Even though `createUser()` has finished, the returned function still remembers `username`.

---

# 💻 Example 2

```javascript
function multiplyBy(x) {

    return function(y) {
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

The returned function remembers the value of `x`.

---

# 💻 Example 3

```javascript
function greeting(name) {

    return function() {
        console.log("Hello " + name);
    };

}

const greetHarsh = greeting("Harsh");

greetHarsh();
```

Output

```
Hello Harsh
```

Again, the returned function remembers `name`.

---

# ❓ Why Variables Don't Disappear

A common misconception is:

> "When a function returns, all its variables are destroyed."

This is **usually true**, but there's an exception.

If another function still references those variables, JavaScript keeps them alive.

This allows the returned function to continue using them.

---

# 🌍 Real Backend Example

A simple configuration helper:

```javascript
function createConfig(environment) {

    return function() {
        console.log(`Running in ${environment} mode`);
    };

}

const start = createConfig("development");

start();
```

Output

```
Running in development mode
```

The returned function remembers the selected environment.

Patterns like this are often used for configuration, logging, and middleware creation.

---

# ⚠ Common Misconceptions

### Misconception 1

**Closures copy variables.**

❌ False.

Closures keep a **reference** to variables.

---

### Misconception 2

**Closures are created only when returning functions.**

❌ False.

Returning functions is the most common example, but callbacks, event listeners, and timers also create closures.

---

### Misconception 3

**Closures are slow.**

❌ Not inherently.

Closures are a normal and efficient part of JavaScript. Problems arise only when they unintentionally keep large objects in memory.

---

# 📝 Summary

- A closure is created when a function retains access to its lexical environment.
- JavaScript preserves that environment as long as it is still needed.
- Closures store references to variables, not copies.
- This behavior enables many powerful JavaScript patterns.

---

# 🎤 Interview Questions

1. How is a closure created?
2. Why doesn't JavaScript destroy variables used by a closure?
3. Do closures store copies of variables?
4. What is the role of the lexical environment in a closure?
5. Can multiple closures have different remembered values?

---

# 📝 Practice Exercises

### 🟢 Concept Check

1. What does a closure keep alive?
2. Why is the lexical environment important?

---

### 🟡 Predict the Output

```javascript
function outer() {

    let value = 50;

    return function() {
        console.log(value);
    };

}

const fn = outer();

fn();
```

---

### 🔴 Challenge

Create a function `makeMultiplier(multiplier)` that returns another function. The returned function should multiply any input by the remembered `multiplier`.

Example:

```javascript
const triple = makeMultiplier(3);

console.log(triple(4)); // 12
```

Explain how the closure remembers `multiplier`.

# Part 3 — Data Hiding, Private Variables & Function Factories

---

# 📑 Table of Contents

- [Data Hiding with Closures](#data-hiding-with-closures)
- [Private Variables](#private-variables)
- [Function Factories](#function-factories)
- [Real Backend Example](#real-backend-example)
- [Summary](#summary)

---

# 📖 Data Hiding with Closures

One of the biggest advantages of closures is **data hiding**.

Instead of exposing variables to the outside world, we can keep them private and allow access only through specific functions.

---

# 💻 Example 1 — Private Counter

```javascript
function createCounter() {

    let count = 0;

    return function () {
        count++;
        console.log(count);
    };

}

const counter = createCounter();

counter();
counter();
counter();
```

Output

```
1
2
3
```

The variable `count` cannot be accessed directly.

```javascript
console.log(count);
```

Output

```
ReferenceError
```

Only the returned function can modify it.

---

# 💻 Example 2 — Getter & Setter

```javascript
function createUser(name) {

    let username = name;

    return {

        getName() {
            return username;
        },

        setName(newName) {
            username = newName;
        }

    };

}

const user = createUser("Harsh");

console.log(user.getName());

user.setName("Rahul");

console.log(user.getName());
```

Output

```
Harsh
Rahul
```

The variable `username` is private.

It can only be accessed through the provided methods.

---

# 📌 Function Factories

A **Function Factory** is simply a function that creates and returns another function.

Closures make function factories possible.

---

# 💻 Example 3 — Multiplier Factory

```javascript
function createMultiplier(multiplier) {

    return function(number) {
        return number * multiplier;
    };

}

const double = createMultiplier(2);
const triple = createMultiplier(3);

console.log(double(5));
console.log(triple(5));
```

Output

```
10
15
```

Each returned function remembers its own value of `multiplier`.

---

# 💻 Example 4 — Greeting Factory

```javascript
function createGreeting(greeting) {

    return function(name) {
        console.log(`${greeting}, ${name}!`);
    };

}

const sayHello = createGreeting("Hello");
const sayWelcome = createGreeting("Welcome");

sayHello("Harsh");
sayWelcome("Rahul");
```

Output

```
Hello, Harsh!
Welcome, Rahul!
```

Each function remembers a different greeting.

---

# 🌍 Real Backend Example

Closures are commonly used while creating middleware.

```javascript
function authorize(role) {

    return function(userRole) {

        return role === userRole;

    };

}

const isAdmin = authorize("admin");

console.log(isAdmin("admin"));
console.log(isAdmin("user"));
```

Output

```
true
false
```

The returned function remembers the required role.

This pattern is widely used in Express middleware, authentication, and permission systems.

---

# 📝 Summary

- Closures enable **data hiding**.
- Variables inside closures behave like **private variables**.
- Function factories create customized functions using closures.
- Many backend utilities and middleware rely on this pattern.

---

# 🎤 Interview Questions

1. What is data hiding?
2. How do closures create private variables?
3. What is a function factory?
4. Give one real-world use case of closures.
5. Why are closures useful in backend development?

---

# 📝 Practice Exercises

### 🟢 Concept Check

1. Why can't `count` be accessed directly in the counter example?
2. What is a function factory?

---

### 🟡 Predict the Output

```javascript
function createAdder(x) {

    return function(y) {
        return x + y;
    };

}

const add10 = createAdder(10);

console.log(add10(5));
```

---

### 🔴 Challenge

Create a function `createBankAccount(initialBalance)` that returns an object with:

- `deposit(amount)`
- `withdraw(amount)`
- `getBalance()`

The balance should remain private and only be accessible through these methods.

# Part 4 — Closures with Loops, Callbacks & Event Listeners

---

# 📑 Table of Contents

- [Closures with setTimeout](#closures-with-settimeout)
- [Closures in Loops](#closures-in-loops)
- [Fixing the Loop Problem](#fixing-the-loop-problem)
- [Closures in Event Listeners](#closures-in-event-listeners)
- [Real Backend Example](#real-backend-example)
- [Summary](#summary)

---

# 📖 Closures with `setTimeout`

Closures are commonly used with asynchronous functions like `setTimeout()`.

```javascript
function greet() {

    let message = "Hello";

    setTimeout(() => {
        console.log(message);
    }, 1000);

}

greet();
```

Output (after 1 second)

```
Hello
```

Although `greet()` has already finished, the callback still remembers `message`.

---

# 📌 Closures in Loops

Consider this example:

```javascript
for (var i = 1; i <= 3; i++) {

    setTimeout(() => {
        console.log(i);
    }, 1000);

}
```

Output

```
4
4
4
```

Why?

Because all three callbacks share the **same** `i`.

By the time they execute, the loop has already finished and `i` equals `4`.

---

# ✅ Fixing the Problem with `let`

```javascript
for (let i = 1; i <= 3; i++) {

    setTimeout(() => {
        console.log(i);
    }, 1000);

}
```

Output

```
1
2
3
```

`let` creates a **new binding** for each iteration.

Each callback closes over its own copy of `i`.

---

# 💻 Another Solution (Using Closures)

Before `let` existed, developers solved this using closures.

```javascript
for (var i = 1; i <= 3; i++) {

    (function(value) {

        setTimeout(() => {
            console.log(value);
        }, 1000);

    })(i);

}
```

Output

```
1
2
3
```

The Immediately Invoked Function Expression (IIFE) creates a new scope for every iteration.

---

# 📌 Closures in Event Listeners

Closures are heavily used in browser applications.

```javascript
let clicks = 0;

button.addEventListener("click", () => {

    clicks++;

    console.log(clicks);

});
```

Every click updates the same `clicks` variable because the event listener remembers its lexical environment.

---

# 🌍 Real Backend Example

Closures are useful when creating reusable middleware.

```javascript
function logger(prefix) {

    return function(message) {

        console.log(`[${prefix}] ${message}`);

    };

}

const apiLogger = logger("API");

apiLogger("User Created");
apiLogger("Order Saved");
```

Output

```
[API] User Created
[API] Order Saved
```

The returned function remembers the value of `prefix`.

---

# ⚠ Common Mistakes

### Mistake 1

Using `var` inside asynchronous loops.

```javascript
for (var i = 0; i < 5; i++) {

    setTimeout(() => console.log(i), 100);

}
```

This usually produces unexpected results.

Prefer `let` in modern JavaScript.

---

### Mistake 2

Thinking every callback creates a new copy of variables.

Closures keep **references** to variables, not independent copies.

---

# 📝 Summary

- Closures allow callbacks to remember variables after the outer function has finished.
- `setTimeout()` callbacks are common examples of closures.
- `let` creates a new binding for each loop iteration, avoiding the classic `var` problem.
- Closures are widely used in event listeners, callbacks, and backend middleware.

---

# 🎤 Interview Questions

1. Why does `var` print `4 4 4` in asynchronous loops?
2. Why does `let` print `1 2 3`?
3. How do closures work with `setTimeout()`?
4. Why are closures useful in event listeners?
5. How are closures used in backend middleware?

---

# 📝 Practice Exercises

### 🟢 Concept Check

1. Why does `let` fix the loop problem?
2. What does an event listener remember?

---

### 🟡 Predict the Output

```javascript
for (let i = 0; i < 3; i++) {

    setTimeout(() => {
        console.log(i);
    }, 500);

}
```

---

### 🔴 Challenge

Write a function that creates three independent counters using closures. Each counter should maintain its own state and should not affect the others.
# Part 5 — Memory Leaks, Best Practices & Revision

---

# 📑 Table of Contents

- [Do Closures Cause Memory Leaks?](#do-closures-cause-memory-leaks)
- [Best Practices](#best-practices)
- [Quick Revision Table](#quick-revision-table)
- [Summary](#summary)
- [Interview Questions](#interview-questions)
- [Practice Exercises](#practice-exercises)

---

# 📖 Do Closures Cause Memory Leaks?

**No.**

Closures themselves **do not** cause memory leaks.

A closure only keeps variables alive **as long as they are still needed**.

Once there are no references to the closure, JavaScript's **Garbage Collector (GC)** can free the memory.

---

# 💻 Safe Example

```javascript
function outer() {

    let message = "Hello";

    return function() {
        console.log(message);
    };

}

const greet = outer();

greet();
```

This is perfectly safe.

The variable `message` stays alive because `greet` still references it.

---

# ⚠ Potential Memory Leak

Problems arise when closures keep references to **large objects** that are no longer needed.

```javascript
function createCache() {

    const data = new Array(1000000).fill("cached");

    return function() {
        return data.length;
    };

}

const cache = createCache();

console.log(cache());
```

Here, the large array remains in memory because the returned function still references it.

If `cache` is no longer needed:

```javascript
cache = null; // if declared with let
```

the garbage collector can eventually reclaim the memory.

---

# 📌 Best Practices

### ✅ Keep Closures Small

Only capture the variables you actually need.

---

### ✅ Avoid Holding Large Objects

Don't unintentionally retain large arrays, files, or database results inside long-lived closures.

---

### ✅ Prefer `let` and `const`

They avoid common bugs, especially with loops and asynchronous code.

---

### ✅ Use Closures for Encapsulation

Closures are excellent for:

- Private variables
- Counters
- Configuration
- Middleware
- Factory functions

---

# 🌍 Real Backend Example

Configuration helper:

```javascript
function createDatabase(config) {

    return function() {
        console.log(`Connecting to ${config.host}`);
    };

}

const connect = createDatabase({
    host: "localhost"
});

connect();
```

Output

```
Connecting to localhost
```

The connection function remembers the configuration without exposing it globally.

---

# 📊 Quick Revision Table

| Concept | Key Idea |
|---------|----------|
| Closure | A function remembers its lexical environment |
| Lexical Scope | Variables are resolved based on where code is written |
| Data Hiding | Closures can create private variables |
| Function Factory | A function that returns another function |
| Callback Closure | Callbacks remember outer variables |
| Loop Problem | `var` shares one variable, `let` creates a new binding per iteration |
| Memory | Closures keep variables alive only while they are still referenced |

---

# 📝 Summary

- Closures remember variables from their lexical environment.
- They enable private state and reusable functions.
- They are widely used in callbacks, timers, event listeners, and backend middleware.
- Closures themselves are not memory leaks, but careless references can keep unnecessary data alive.
- Understanding closures is essential for advanced JavaScript and Node.js.

---

# 🎤 Interview Questions

1. What is a closure?
2. How are closures related to lexical scope?
3. Why do closures enable private variables?
4. Why does `let` fix the loop problem?
5. Do closures cause memory leaks?
6. Give three practical uses of closures.

---

# 📝 Practice Exercises

### 🟢 Concept Check

1. When does JavaScript free the memory used by a closure?
2. Name two real-world uses of closures.

---

### 🟡 Predict the Output

```javascript
function counter() {

    let count = 0;

    return function() {
        return ++count;
    };

}

const c = counter();

console.log(c());
console.log(c());
console.log(c());
```

---

### 🔴 Challenge

Build a `createTodoManager()` function that returns an object with:

- `add(task)`
- `remove(task)`
- `list()`

Store the tasks in a private array so they cannot be accessed directly from outside the function.

---

# 🎯 Chapter 8 Complete

You now understand:

- ✅ What a Closure is
- ✅ How Closures Work
- ✅ Lexical Environment Connection
- ✅ Data Hiding
- ✅ Private Variables
- ✅ Function Factories
- ✅ Closures in Loops
- ✅ Closures with `setTimeout`
- ✅ Event Listeners
- ✅ Backend Use Cases
- ✅ Memory Considerations