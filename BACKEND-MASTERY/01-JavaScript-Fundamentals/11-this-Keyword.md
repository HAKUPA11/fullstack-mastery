# 📑 Table of Contents

- [Learning Objectives](#learning-objectives)
- [Prerequisites](#prerequisites)
- [What is `this`?](#what-is-this)
- [Global Context](#global-context)
- [Function Context](#function-context)
- [Strict Mode](#strict-mode)
- [Object Methods](#object-methods)
- [Arrow Functions and `this`](#arrow-functions-and-this)
- [`call()`](#call)
- [`apply()`](#apply)
- [`bind()`](#bind)
- [`this` in Classes](#this-in-classes)
- [Backend Examples](#backend-examples)
- [Summary](#summary)
- [Interview Questions](#interview-questions)
- [Practice Exercises](#practice-exercises)

# Part 1 — What is `this`?

---

# 📑 Table of Contents

- [Learning Objectives](#learning-objectives)
- [What is `this`?](#what-is-this)
- [Global Context](#global-context)
- [Function Context](#function-context)
- [Strict Mode](#strict-mode)
- [Summary](#summary)

---

# 🎯 Learning Objectives

By the end of this part, you will:

- Understand what `this` represents.
- Learn how `this` behaves in different contexts.
- Understand the effect of strict mode.

---

# 📖 What is `this`?

`this` is a special keyword that refers to an object.

**Important:**

`this` does **not** refer to the function itself.

It refers to **the object that is executing the function**.

Its value is determined **when the function is called**, not when it is defined.

---

# 💻 Example 1

```javascript
const user = {

    name: "Harsh",

    greet() {
        console.log(this.name);
    }

};

user.greet();
```

Output

```
Harsh
```

Here,

```
this

↓

user
```

So,

```javascript
this.name
```

becomes

```javascript
user.name
```

---

# 📖 Global Context

In a browser:

```javascript
console.log(this);
```

Output

```
window
```

In Node.js modules:

```javascript
console.log(this);
```

Output

```
{}
```

This difference exists because Node.js executes each file as a separate module.

---

# 📖 Function Context

Consider a regular function.

```javascript
function show() {
    console.log(this);
}

show();
```

---

### Non-Strict Mode

In browsers:

```
window
```

---

### Strict Mode

```javascript
"use strict";

function show() {
    console.log(this);
}

show();
```

Output

```
undefined
```

Strict mode prevents JavaScript from automatically assigning the global object to `this`.

---

# 🌍 Backend Connection

In Node.js, you'll rarely rely on the global value of `this`.

Most commonly you'll encounter `this`:

- Inside class methods
- Inside object methods
- When using `call()`, `apply()`, or `bind()`

Understanding these cases is much more important than memorizing browser-specific behavior.

---

# ⚠ Common Mistakes

### Mistake 1

Thinking `this` always refers to the object where the function was defined.

❌ Incorrect.

`this` depends on **how the function is called**.

---

### Mistake 2

Assuming browser and Node.js behave identically.

Global `this` is different in each environment.

---

# 📊 Quick Revision

| Context | Value of `this` |
|---------|-----------------|
| Browser Global | `window` |
| Node.js Module | `{}` (module object) |
| Regular Function (Strict Mode) | `undefined` |
| Object Method | The object before the `.` |

---

# 📝 Summary

- `this` refers to the execution context.
- Its value is determined at call time.
- Browser and Node.js have different global contexts.
- Strict mode changes the value of `this` in regular function calls.

---

# 🎤 Interview Questions

1. What is `this`?
2. When is the value of `this` determined?
3. What is the value of `this` inside a regular function in strict mode?
4. Why is global `this` different in Node.js and browsers?

---

# 📝 Practice Exercises

### 🟢 Concept Check

1. Does `this` refer to the function or the caller?
2. What is the value of `this` in a Node.js module?

---

### 🟡 Predict the Output

```javascript
const person = {

    name: "Rahul",

    greet() {
        console.log(this.name);
    }

};

person.greet();
```

---

### 🔴 Challenge

Write an object `car` with:

- `brand`
- `model`
- A method `showDetails()` that prints both values using `this`.

# Part 2 — `this` Inside Object Methods

---

# 📑 Table of Contents

- [Object Methods](#object-methods)
- [Method Invocation Rule](#method-invocation-rule)
- [Nested Objects](#nested-objects)
- [Method Borrowing](#method-borrowing)
- [Common Mistakes](#common-mistakes)
- [Summary](#summary)

---

# 📖 `this` Inside Object Methods

When a function is called as an object's method,

> **`this` refers to the object before the dot (`.`).**

This is the most important rule.

---

## Example 1

```javascript
const user = {

    name: "Harsh",

    greet() {
        console.log(this.name);
    }

};

user.greet();
```

Output

```
Harsh
```

Here,

```
user.greet()

↓

this = user
```

So,

```javascript
this.name
```

becomes

```javascript
user.name
```

---

## Example 2

```javascript
const car = {

    brand: "BMW",

    showBrand() {
        console.log(this.brand);
    }

};

car.showBrand();
```

Output

```
BMW
```

---

# 📖 Method Invocation Rule

The value of `this` depends on **how the function is called**, not where it is written.

```javascript
const person = {

    name: "Harsh",

    greet() {
        console.log(this.name);
    }

};

const another = person;

another.greet();
```

Output

```
Harsh
```

Why?

Because the caller is now:

```javascript
another.greet()
```

So,

```
this = another
```

Both variables reference the same object.

---

# 📖 Nested Objects

Each object gets its own `this`.

```javascript
const student = {

    name: "Harsh",

    course: {

        title: "JavaScript",

        showCourse() {
            console.log(this.title);
        }

    }

};

student.course.showCourse();
```

Output

```
JavaScript
```

Here,

```
this

↓

student.course
```

NOT

```
student
```

---

# 📖 Method Borrowing

A method can be reused by another object.

```javascript
const person1 = {

    name: "Harsh",

    greet() {
        console.log(`Hello ${this.name}`);
    }

};

const person2 = {

    name: "Rahul"

};

person2.greet = person1.greet;

person2.greet();
```

Output

```
Hello Rahul
```

Even though the function was originally defined inside `person1`, it uses `person2` because `person2` is the caller.

---

# 💻 Another Example

```javascript
const calculator = {

    number: 10,

    double() {
        return this.number * 2;
    }

};

console.log(calculator.double());
```

Output

```
20
```

---

# 🌍 Backend Connection

Service objects often use `this`.

```javascript
const userService = {

    users: [],

    addUser(user) {
        this.users.push(user);
    }

};

userService.addUser({
    name: "Harsh"
});
```

`this.users` refers to the `users` array inside the same object.

---

# ⚠ Common Mistakes

## Mistake 1

Using the object name instead of `this`.

❌

```javascript
const user = {

    name: "Harsh",

    greet() {
        console.log(user.name);
    }

};
```

This works, but it's not reusable.

Better:

```javascript
console.log(this.name);
```

---

## Mistake 2

Thinking `this` points to the function.

```javascript
this === greet
```

❌ False.

`this` refers to the calling object.

---

## Mistake 3

Thinking nested methods use the outer object's `this`.

Each method determines its own `this` based on how it is called.

---

# 📊 Quick Revision

| Call | Value of `this` |
|------|-----------------|
| `user.greet()` | `user` |
| `car.showBrand()` | `car` |
| `student.course.showCourse()` | `student.course` |
| Borrowed method | Object that calls the method |

---

# 📝 Summary

- In an object method, `this` refers to the object before the `.`.
- The value of `this` depends on the call site.
- Nested objects have their own `this`.
- Methods can be borrowed and still work correctly because `this` is determined when the method is called.

---

# 🎤 Interview Questions

1. What does `this` refer to inside an object method?
2. Does `this` depend on where a function is defined or how it is called?
3. What is method borrowing?
4. What is the value of `this` inside nested object methods?

---

# 📝 Practice Exercises

### 🟢 Concept Check

1. What does `this` refer to in `user.greet()`?
2. Can one object use another object's method?

---

### 🟡 Predict the Output

```javascript
const phone = {

    brand: "Apple",

    show() {
        console.log(this.brand);
    }

};

phone.show();
```

---

### 🔴 Challenge

Create two objects:

```javascript
teacher
student
```

Each should have:

- `name`

Create a method:

```javascript
introduce()
```

inside `teacher`.

Borrow the method for `student` and verify that it prints the student's name.

# Part 3 — Arrow Functions and `this`

---

# 📑 Table of Contents

- [Regular Functions vs Arrow Functions](#regular-functions-vs-arrow-functions)
- [Lexical `this`](#lexical-this)
- [Arrow Functions Inside Objects](#arrow-functions-inside-objects)
- [Arrow Functions as Callbacks](#arrow-functions-as-callbacks)
- [Backend Connection](#backend-connection)
- [Summary](#summary)

---

# 📖 Regular Functions vs Arrow Functions

The biggest difference is how they handle `this`.

| Regular Function | Arrow Function |
|------------------|----------------|
| Has its own `this` | Does **not** have its own `this` |
| `this` depends on how it's called | `this` is inherited from the surrounding scope |

This behavior of arrow functions is called **lexical `this`**.

---

# 📖 Lexical `this`

Arrow functions do **not** create a new `this`.

Instead, they use the `this` value from the scope in which they were created.

Think of it like this:

```
Regular Function

↓

Creates its own `this`

----------------------------

Arrow Function

↓

Borrows parent's `this`
```

---

# 💻 Example 1 — Regular Function

```javascript
const user = {

    name: "Harsh",

    greet: function () {
        console.log(this.name);
    }

};

user.greet();
```

Output

```
Harsh
```

Here,

```
this = user
```

---

# 💻 Example 2 — Arrow Function as a Method

```javascript
const user = {

    name: "Harsh",

    greet: () => {
        console.log(this.name);
    }

};

user.greet();
```

Output (Node.js)

```
undefined
```

Output (Browser)

```
undefined
```

Why?

The arrow function **does not get `this` from `user`**.

It inherits `this` from the surrounding scope (the module/global scope), where `name` does not exist.

> **Rule:** Do **not** use arrow functions as object methods when you need `this`.

---

# 💻 Example 3 — Nested Callback (Regular Function)

```javascript
const user = {

    name: "Harsh",

    greet() {

        setTimeout(function () {
            console.log(this.name);
        }, 1000);

    }

};

user.greet();
```

Output

```
undefined
```

The callback passed to `setTimeout` is a **regular function**, so it gets its own `this`, which is **not** the `user` object.

---

# 💻 Example 4 — Nested Callback (Arrow Function)

```javascript
const user = {

    name: "Harsh",

    greet() {

        setTimeout(() => {
            console.log(this.name);
        }, 1000);

    }

};

user.greet();
```

Output

```
Harsh
```

Why?

The arrow function inherits `this` from `greet()`.

```
greet()

↓

this = user

↓

Arrow Function

↓

inherits user
```

This is one of the most common real-world uses of arrow functions.

---

# 💻 Example 5 — Array Methods

```javascript
const user = {

    prefix: "Mr.",

    names: ["Harsh", "Rahul"],

    showNames() {

        this.names.forEach(name => {
            console.log(`${this.prefix} ${name}`);
        });

    }

};

user.showNames();
```

Output

```
Mr. Harsh
Mr. Rahul
```

The arrow callback inherits `this` from `showNames()`.

---

# 🌍 Backend Connection

Arrow functions are commonly used in callbacks.

### Express Route

```javascript
app.get("/users", (req, res) => {
    res.send("Users");
});
```

---

### Promise

```javascript
fetchData()
    .then(data => {
        console.log(data);
    });
```

---

### Array Processing

```javascript
users.map(user => user.name);
```

These are ideal uses of arrow functions because they inherit `this` (if needed) and provide concise syntax.

---

# ⚠ When NOT to Use Arrow Functions

Avoid arrow functions for:

### ❌ Object Methods

```javascript
const user = {
    greet: () => {}
};
```

---

### ❌ Class Methods

```javascript
class User {

    greet = () => {};

}
```

(Generally avoid this unless you specifically need lexical `this`, as each instance gets its own copy of the function.)

Use regular methods instead.

---

# 📊 Quick Revision

| Situation | Recommended Function |
|-----------|----------------------|
| Object Method | ✅ Regular Function |
| Class Method | ✅ Regular Method |
| Callback | ✅ Arrow Function |
| `setTimeout()` Callback | ✅ Arrow Function |
| `map()`, `filter()`, `forEach()` | ✅ Arrow Function |

---

# 📝 Summary

- Regular functions have their own `this`.
- Arrow functions inherit `this` from the surrounding scope.
- Avoid arrow functions for object methods that rely on `this`.
- Arrow functions are excellent for callbacks because they preserve the surrounding `this`.

---

# 🎤 Interview Questions

1. What is lexical `this`?
2. Do arrow functions have their own `this`?
3. Why shouldn't arrow functions usually be used as object methods?
4. Why are arrow functions commonly used with `setTimeout()` and `forEach()`?

---

# 📝 Practice Exercises

### 🟢 Concept Check

1. Which function type has its own `this`?
2. Which function type inherits `this`?

---

### 🟡 Predict the Output

```javascript
const person = {

    name: "Harsh",

    greet: () => {
        console.log(this.name);
    }

};

person.greet();
```

Explain why.

---

### 🟡 Predict the Output

```javascript
const person = {

    name: "Harsh",

    greet() {

        setTimeout(() => {
            console.log(this.name);
        }, 1000);

    }

};

person.greet();
```

---

### 🔴 Challenge

Create an object `counter` with:

- `count`
- A method `start()`

Inside `start()`, use `setTimeout()` with an arrow function to print `count`.

Then replace the arrow function with a regular function and explain the difference in the output.   


# Part 4 — call(), apply() & bind()

---

# 📑 Table of Contents

- [Why Do We Need Them?](#why-do-we-need-them)
- [`call()`](#call)
- [`apply()`](#apply)
- [`bind()`](#bind)
- [Comparison](#comparison)
- [Backend Connection](#backend-connection)
- [Summary](#summary)

---

# 📖 Why Do We Need Them?

Normally, `this` is determined by **how a function is called**.

Sometimes, we want to **manually choose what `this` should be**.

JavaScript provides three methods:

- `call()`
- `apply()`
- `bind()`

All three allow us to control the value of `this`.

---

# 📌 `call()`

`call()` immediately invokes the function with a specified `this`.

### Syntax

```javascript
functionName.call(thisArg, arg1, arg2, ...);
```

---

## Example 1

```javascript
function greet() {
    console.log(`Hello ${this.name}`);
}

const user = {
    name: "Harsh"
};

greet.call(user);
```

Output

```
Hello Harsh
```

Here,

```
this

↓

user
```

---

## Example 2

```javascript
function introduce(city, country) {
    console.log(`${this.name} lives in ${city}, ${country}`);
}

const person = {
    name: "Harsh"
};

introduce.call(person, "Jaipur", "India");
```

Output

```
Harsh lives in Jaipur, India
```

Arguments are passed **one by one**.

---

# 📌 `apply()`

`apply()` works exactly like `call()`.

The only difference is **how arguments are passed**.

### Syntax

```javascript
functionName.apply(thisArg, [arg1, arg2]);
```

---

## Example

```javascript
function introduce(city, country) {
    console.log(`${this.name} lives in ${city}, ${country}`);
}

const person = {
    name: "Rahul"
};

introduce.apply(person, ["Delhi", "India"]);
```

Output

```
Rahul lives in Delhi, India
```

Arguments are passed as **an array**.

---

# 📌 `bind()`

`bind()` does **not** execute the function immediately.

Instead, it returns a **new function** with `this` permanently bound.

### Syntax

```javascript
const newFunction = oldFunction.bind(thisArg);
```

---

## Example 1

```javascript
function greet() {
    console.log(`Hello ${this.name}`);
}

const user = {
    name: "Harsh"
};

const sayHello = greet.bind(user);

sayHello();
```

Output

```
Hello Harsh
```

Notice:

```javascript
bind()

↓

returns a function

↓

call it later
```

---

## Example 2

```javascript
function multiply(a, b) {
    return a * b;
}

const double = multiply.bind(null, 2);

console.log(double(5));
```

Output

```
10
```

Here:

- `this` is not used, so `null` is passed.
- The first argument (`2`) is permanently fixed.

This is called **partial application**.

---

# 📊 call() vs apply() vs bind()

| Method | Executes Immediately | Arguments | Returns |
|---------|----------------------|-----------|----------|
| `call()` | ✅ Yes | Separate values | Result |
| `apply()` | ✅ Yes | Array | Result |
| `bind()` | ❌ No | Separate values | New Function |

---

# 🌍 Backend Connection

Suppose you have a logger function.

```javascript
function log() {
    console.log(this.prefix);
}

const logger = {
    prefix: "[Server]"
};

const serverLog = log.bind(logger);

serverLog();
```

Output

```
[Server]
```

In larger applications, `bind()` is often used when passing object methods as callbacks so they don't lose their original `this`.

---

# ⚠ Common Mistakes

## Mistake 1

Confusing `call()` and `bind()`.

❌

```javascript
const fn = greet.call(user);
```

`call()` executes immediately.

---

✅

```javascript
const fn = greet.bind(user);

fn();
```

`bind()` returns a new function.

---

## Mistake 2

Passing an array to `call()`.

❌

```javascript
show.call(user, ["A", "B"]);
```

Use:

```javascript
show.apply(user, ["A", "B"]);
```

or

```javascript
show.call(user, "A", "B");
```

---

# 📊 Quick Revision

| Method | Best Use |
|---------|----------|
| `call()` | Execute immediately with custom `this` |
| `apply()` | Same as `call()`, but with an array of arguments |
| `bind()` | Create a reusable function with fixed `this` |

---

# 📝 Summary

- `call()` invokes a function immediately with a specified `this`.
- `apply()` works like `call()` but accepts arguments as an array.
- `bind()` returns a new function with a permanently bound `this`.
- These methods are useful for method borrowing, callbacks, and preserving context.

---

# 🎤 Interview Questions

1. What is the difference between `call()`, `apply()`, and `bind()`?
2. Which method returns a new function?
3. Which method accepts arguments as an array?
4. What is partial application?
5. When would you use `bind()`?

---

# 📝 Practice Exercises

### 🟢 Concept Check

1. Which method executes immediately?
2. Which method returns a new function?

---

### 🟡 Predict the Output

```javascript
function greet() {
    console.log(this.name);
}

const user = {
    name: "Harsh"
};

greet.call(user);
```

---

### 🟡 Predict the Output

```javascript
function add(a, b) {
    return a + b;
}

const addTen = add.bind(null, 10);

console.log(addTen(5));
```

---

### 🔴 Challenge

Create an object:

```javascript
const employee = {
    name: "Amit"
};
```

Write a function:

```javascript
function introduce(company, role) {
    console.log(`${this.name} works at ${company} as ${role}`);
}
```

Call it using:

- `call()`
- `apply()`
- `bind()`

and compare the outputs.

# Part 5 — `this` in Classes & Backend Examples

---

# 📑 Table of Contents

- [`this` in Classes](#this-in-classes)
- [Losing `this`](#losing-this)
- [Preserving `this`](#preserving-this)
- [Backend Examples](#backend-examples)
- [Best Practices](#best-practices)
- [Summary](#summary)

---

# 📖 `this` in Classes

Inside a class, `this` refers to the **current instance** of the class.

---

## Example 1

```javascript
class User {

    constructor(name) {
        this.name = name;
    }

    greet() {
        console.log(`Hello ${this.name}`);
    }

}

const user1 = new User("Harsh");
const user2 = new User("Rahul");

user1.greet();
user2.greet();
```

Output

```
Hello Harsh
Hello Rahul
```

Here:

```
user1.greet()

↓

this = user1
```

and

```
user2.greet()

↓

this = user2
```

---

# 📖 Losing `this`

A common mistake is storing a method in another variable.

```javascript
class User {

    constructor(name) {
        this.name = name;
    }

    greet() {
        console.log(this.name);
    }

}

const user = new User("Harsh");

const sayHello = user.greet;

sayHello();
```

Output (Strict Mode)

```
TypeError / undefined
```

Why?

Because the function is no longer called as:

```javascript
user.greet()
```

Instead, it's simply:

```javascript
sayHello()
```

So `this` is lost.

---

# 📖 Preserving `this`

Use `bind()` when passing methods around.

```javascript
const sayHello = user.greet.bind(user);

sayHello();
```

Output

```
Harsh
```

Now `this` is permanently bound to `user`.

---

# 🌍 Backend Examples

## Example 1 — Service Class

```javascript
class UserService {

    constructor() {
        this.users = [];
    }

    addUser(user) {
        this.users.push(user);
    }

    getUsers() {
        return this.users;
    }

}

const service = new UserService();

service.addUser({ name: "Harsh" });

console.log(service.getUsers());
```

Output

```javascript
[
    { name: "Harsh" }
]
```

---

## Example 2 — Database Connection

```javascript
class Database {

    constructor(url) {
        this.url = url;
    }

    connect() {
        console.log(`Connecting to ${this.url}`);
    }

}

const db = new Database("mongodb://localhost");

db.connect();
```

Output

```
Connecting to mongodb://localhost
```

---

## Example 3 — Express Controller

```javascript
class UserController {

    getUsers(req, res) {
        res.send("All Users");
    }

}
```

When methods like `getUsers` are passed directly as callbacks, `this` may be lost.

A common solution is to bind the method:

```javascript
app.get("/users", controller.getUsers.bind(controller));
```

This ensures the controller instance remains the value of `this`.

---

# 💡 Best Practices

### ✅ Use Regular Methods in Classes

```javascript
class User {

    greet() {
        console.log(this.name);
    }

}
```

This is the standard and most memory-efficient approach.

---

### ✅ Use `bind()` When Needed

If a method is passed as a callback, bind it first.

```javascript
button.onclick = user.greet.bind(user);
```

---

### ✅ Avoid Arrow Functions as Object Methods

```javascript
const user = {

    greet: () => {}

};
```

Arrow functions don't get their own `this`, so they're usually a poor choice for object methods.

---

### ✅ Remember the Rule

> **`this` depends on how a function is called, not where it is written.**

If you remember only one rule from this chapter, make it this one.

---

# 📊 Quick Revision

| Situation | Value of `this` |
|-----------|-----------------|
| Object Method | Calling object |
| Class Method | Current instance |
| Arrow Function | Surrounding scope |
| `call()` | Explicitly provided object |
| `apply()` | Explicitly provided object |
| `bind()` | Permanently bound object |

---

# 📝 Summary

- In classes, `this` refers to the current instance.
- Passing methods directly can cause `this` to be lost.
- `bind()` fixes this by creating a new function with a fixed `this`.
- Understanding `this` is essential for writing reliable object-oriented and backend code.

---

# 🎤 Interview Questions

1. What does `this` refer to inside a class method?
2. Why is `this` sometimes lost?
3. How does `bind()` solve this problem?
4. Why are regular methods preferred over arrow functions in classes?

---

# 📝 Practice Exercises

### 🟢 Concept Check

1. What does `this` refer to inside a class?
2. When should you use `bind()`?

---

### 🟡 Predict the Output

```javascript
class Car {

    constructor(brand) {
        this.brand = brand;
    }

    show() {
        console.log(this.brand);
    }

}

const car = new Car("BMW");

car.show();
```

---

### 🟡 Predict the Output

```javascript
class User {

    constructor(name) {
        this.name = name;
    }

    greet() {
        console.log(this.name);
    }

}

const user = new User("Harsh");

const fn = user.greet;

fn();
```

Explain why.

---

### 🔴 Challenge

Create a class `Student` with:

- `name`
- `marks`

Add methods:

- `showDetails()`
- `updateMarks(newMarks)`

Then:

1. Call both methods normally.
2. Store `showDetails` in another variable and observe the result.
3. Fix it using `bind()`.