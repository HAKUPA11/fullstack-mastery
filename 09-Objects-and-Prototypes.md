# 📑 Table of Contents

- [Learning Objectives](#learning-objectives)
- [Prerequisites](#prerequisites)
- [What is an Object?](#what-is-an-object)
- [Creating Objects](#creating-objects)
- [Accessing Properties](#accessing-properties)
- [Adding, Updating and Deleting Properties](#adding-updating-and-deleting-properties)
- [Object Methods](#object-methods)
- [Object References](#object-references)
- [Prototype](#prototype)
- [Prototype Chain](#prototype-chain)
- [Object.create()](#objectcreate)
- [Classes vs Prototypes](#classes-vs-prototypes)
- [Real Backend Examples](#real-backend-examples)
- [Summary](#summary)
- [Interview Questions](#interview-questions)
- [Practice Exercises](#practice-exercises)

# Part 1 — Objects Basics

---

# 📑 Table of Contents

- [Learning Objectives](#learning-objectives)
- [Prerequisites](#prerequisites)
- [What is an Object?](#what-is-an-object)
- [Why Do We Need Objects?](#why-do-we-need-objects)
- [Creating Objects](#creating-objects)
- [Accessing Properties](#accessing-properties)
- [Summary](#summary)

---

# 🎯 Learning Objectives

By the end of this part, you will be able to:

- Explain what an object is.
- Create objects in different ways.
- Access object properties.
- Understand why objects are fundamental to JavaScript.

---

# 📚 Prerequisites

Before starting this chapter, you should understand:

- Variables
- Functions
- Scope
- Closures

---

# 📖 What is an Object?

An **object** is a collection of related data and behavior.

It stores information as **key-value pairs**.

Example:

```javascript
const user = {

    name: "Harsh",
    age: 21,
    isStudent: true

};
```

Here,

- `name`, `age`, and `isStudent` are **properties**.
- `"Harsh"`, `21`, and `true` are their corresponding values.

---

# 🤔 Why Do We Need Objects?

Imagine storing information about a user using variables.

```javascript
const name = "Harsh";
const age = 21;
const city = "Jaipur";
```

This works for one user.

But what if you have **1,000 users**?

Managing hundreds of related variables becomes difficult.

Objects solve this by grouping related data together.

```javascript
const user = {

    name: "Harsh",
    age: 21,
    city: "Jaipur"

};
```

Everything about the user is now stored in one place.

---

# 🌍 Real Backend Example

When building an API, a user is usually represented as an object.

```javascript
const user = {

    id: 101,
    name: "Harsh",
    email: "harsh@example.com",
    role: "Admin"

};
```

When converted to JSON, it becomes:

```json
{
    "id": 101,
    "name": "Harsh",
    "email": "harsh@example.com",
    "role": "Admin"
}
```

This is exactly the kind of data your backend will send to the frontend.

---

# 📌 Creating Objects

## Method 1 — Object Literal (Most Common)

```javascript
const student = {

    name: "Rahul",
    age: 20

};
```

---

## Method 2 — Empty Object

```javascript
const car = {};
```

Later, properties can be added.

```javascript
car.brand = "Toyota";
car.year = 2025;

console.log(car);
```

Output

```
{
    brand: "Toyota",
    year: 2025
}
```

---

# 📌 Accessing Properties

JavaScript provides two ways.

## Dot Notation

```javascript
const user = {

    name: "Harsh",
    age: 21

};

console.log(user.name);
console.log(user.age);
```

Output

```
Harsh
21
```

---

## Bracket Notation

```javascript
const user = {

    name: "Harsh",
    age: 21

};

console.log(user["name"]);
console.log(user["age"]);
```

Output

```
Harsh
21
```

---

## When to Use Bracket Notation

Bracket notation is useful when the property name is stored in a variable.

```javascript
const user = {

    name: "Harsh",
    age: 21

};

const key = "name";

console.log(user[key]);
```

Output

```
Harsh
```

This isn't possible with dot notation.

```javascript
console.log(user.key);
```

Output

```
undefined
```

because JavaScript looks for a property literally named `"key"`.

---

# 📝 Summary

- Objects store related information as key-value pairs.
- Object literals are the most common way to create objects.
- Dot notation is simple and readable.
- Bracket notation is useful for dynamic property names.

---

# 🎤 Interview Questions

1. What is an object?
2. Why do we use objects?
3. What is the difference between dot notation and bracket notation?
4. When should bracket notation be preferred?

---

# 📝 Practice Exercises

### 🟢 Concept Check

1. What is a property?
2. What is a key-value pair?

---

### 🟡 Predict the Output

```javascript
const book = {

    title: "JavaScript",
    pages: 450

};

console.log(book.title);
console.log(book["pages"]);
```

---

### 🔴 Challenge

Create an object representing a laptop with the following properties:

- brand
- model
- price
- processor

Print all four properties using both dot notation and bracket notation.

# Part 2 — Working with Objects

---

# 📑 Table of Contents

- [Adding Properties](#adding-properties)
- [Updating Properties](#updating-properties)
- [Deleting Properties](#deleting-properties)
- [Object Methods](#object-methods)
- [Object References](#object-references)
- [Real Backend Examples](#real-backend-examples)
- [Summary](#summary)

---

# 📌 Adding Properties

Objects in JavaScript are **dynamic**, meaning properties can be added even after the object is created.

```javascript
const user = {
    name: "Harsh"
};

user.age = 21;
user.city = "Jaipur";

console.log(user);
```

Output

```
{
    name: "Harsh",
    age: 21,
    city: "Jaipur"
}
```

Using bracket notation:

```javascript
user["email"] = "harsh@example.com";
```

---

# 📌 Updating Properties

Updating a property is as simple as assigning a new value.

```javascript
const product = {
    name: "Laptop",
    price: 50000
};

product.price = 45000;

console.log(product);
```

Output

```
{
    name: "Laptop",
    price: 45000
}
```

---

# 📌 Deleting Properties

Use the `delete` operator to remove a property.

```javascript
const student = {
    name: "Rahul",
    age: 20,
    city: "Delhi"
};

delete student.city;

console.log(student);
```

Output

```
{
    name: "Rahul",
    age: 20
}
```

---

# 📌 Object Methods

An object can also store **functions**.

When a function belongs to an object, it is called a **method**.

```javascript
const user = {

    name: "Harsh",

    greet() {
        console.log("Welcome!");
    }

};

user.greet();
```

Output

```
Welcome!
```

Methods allow objects to have **behavior**, not just data.

---

# 💻 Example

```javascript
const calculator = {

    add(a, b) {
        return a + b;
    },

    multiply(a, b) {
        return a * b;
    }

};

console.log(calculator.add(5, 3));
console.log(calculator.multiply(5, 3));
```

Output

```
8
15
```

---

# 📌 Object References

Objects are stored **by reference**, not by value.

```javascript
const user1 = {
    name: "Harsh"
};

const user2 = user1;

user2.name = "Rahul";

console.log(user1.name);
console.log(user2.name);
```

Output

```
Rahul
Rahul
```

Both variables point to the **same object** in memory.

---

# 🧠 Memory View

```
user1
   │
   ▼
+------------------+
| name : "Harsh"   |
+------------------+
   ▲
   │
user2
```

After:

```javascript
user2.name = "Rahul";
```

Both variables see:

```
name = "Rahul"
```

because there is only **one object**.

---

# 📌 Comparing Objects

```javascript
const obj1 = { name: "Harsh" };
const obj2 = { name: "Harsh" };

console.log(obj1 === obj2);
```

Output

```
false
```

Although both objects have identical data, they are different objects in memory.

Now compare:

```javascript
const obj3 = obj1;

console.log(obj1 === obj3);
```

Output

```
true
```

because both variables reference the same object.

---

# 🌍 Real Backend Examples

### Example 1 — Updating Request Data

```javascript
const req = {
    user: "Harsh"
};

req.role = "Admin";
```

Middleware often adds new properties like `user`, `role`, or `token` to the request object.

---

### Example 2 — Configuration Object

```javascript
const config = {
    host: "localhost",
    port: 3000
};

config.port = 5000;
```

Updating configuration values is a common pattern in backend applications.

---

# ⚠ Common Mistakes

### Mistake 1

Thinking objects are copied automatically.

```javascript
const a = { x: 1 };
const b = a;
```

`b` is **not** a copy.

It references the same object.

---

### Mistake 2

Comparing objects with `==` or `===`.

```javascript
{} === {}
```

Output

```
false
```

Object comparison checks **references**, not contents.

---

# 📝 Summary

- Objects are dynamic and can be modified after creation.
- Methods are functions stored inside objects.
- Objects are assigned and compared by reference.
- Two objects with identical data are still different if they occupy different memory locations.

---

# 🎤 Interview Questions

1. How do you add a property to an object?
2. What is an object method?
3. Why are objects compared by reference?
4. Why does `{}` === `{}` return `false`?

---

# 📝 Practice Exercises

### 🟢 Concept Check

1. Can properties be added after an object is created?
2. What is the difference between a property and a method?

---

### 🟡 Predict the Output

```javascript
const car = {
    brand: "Toyota"
};

const anotherCar = car;

anotherCar.brand = "Honda";

console.log(car.brand);
```

---

### 🔴 Challenge

Create an object `bankAccount` with:

- `owner`
- `balance`

Add methods:

- `deposit(amount)`
- `withdraw(amount)`
- `showBalance()`

Then create another variable pointing to the same object and verify that changes through one variable are reflected in the other.

# Part 3 — Prototypes & Prototype Chain

---

# 📑 Table of Contents

- [What is a Prototype?](#what-is-a-prototype)
- [Why JavaScript Uses Prototypes](#why-javascript-uses-prototypes)
- [Prototype Chain](#prototype-chain)
- [Property Lookup](#property-lookup)
- [Summary](#summary)

---

# 📖 What is a Prototype?

Every JavaScript object has a hidden link to another object called its **prototype**.

When you try to access a property that doesn't exist on the object itself, JavaScript automatically looks for it in the prototype.

Think of it as a **backup object**.

---

# 💻 Example 1

```javascript
const user = {
    name: "Harsh"
};

console.log(user.toString());
```

Output

```
"[object Object]"
```

Question:

Where did `toString()` come from?

We never wrote it.

Answer:

It comes from the object's **prototype**.

---

# 🧠 Visual Representation

```
user

│

├── name = "Harsh"

│

▼

Prototype

├── toString()

├── hasOwnProperty()

├── valueOf()

...
```

If JavaScript cannot find a property in `user`, it automatically checks its prototype.

---

# 📖 Why JavaScript Uses Prototypes

Imagine if every object stored its own copy of common methods.

```javascript
const user1 = {
    name: "Harsh",
    greet() {
        console.log("Hello");
    }
};

const user2 = {
    name: "Rahul",
    greet() {
        console.log("Hello");
    }
};
```

The `greet()` function is duplicated.

Instead, JavaScript stores shared methods in the prototype so that multiple objects can reuse them.

This saves memory.

---

# 📌 Prototype Chain

If JavaScript cannot find a property:

1. Check the object.
2. Check its prototype.
3. Check the prototype's prototype.
4. Continue until the end of the chain.
5. If still not found, return `undefined`.

This search path is called the **Prototype Chain**.

---

# 🧠 Prototype Chain Diagram

```
user

↓

Object Prototype

↓

null
```

Every ordinary object eventually ends at `null`.

---

# 💻 Example 2

```javascript
const person = {
    name: "Harsh"
};

console.log(person.name);
console.log(person.toString());
```

Output

```
Harsh
[object Object]
```

Lookup process:

```
person.name

↓

Found in person
```

For `toString()`:

```
person.toString

↓

Not Found

↓

Object Prototype

↓

Found
```

---

# 💻 Example 3

```javascript
const arr = [1, 2, 3];

console.log(arr.length);
console.log(arr.push);
console.log(arr.map);
```

Output

```
3
[Function]
[Function]
```

Where do `push()` and `map()` come from?

They are defined on **Array.prototype**, not on the array itself.

---

# 🧠 Prototype Chain for Arrays

```
Array

↓

Array.prototype

↓

Object.prototype

↓

null
```

This is why every array can use methods like:

- `push()`
- `pop()`
- `map()`
- `filter()`
- `forEach()`

---

# 🌍 Real Backend Example

When working with Express:

```javascript
req.body
req.params
req.query
```

You access these properties directly, but many helper methods and inherited behavior come through the prototype chain.

Similarly, MongoDB documents and many Node.js objects rely on prototypes to provide shared functionality.

---

# ⚠ Common Mistakes

### Mistake 1

Thinking prototypes copy methods into every object.

❌ False.

Objects **share** methods through the prototype.

---

### Mistake 2

Thinking prototypes are only for classes.

❌ False.

Every normal JavaScript object has a prototype, whether or not you use classes.

---

### Mistake 3

Confusing prototype with inheritance.

A prototype is the object being searched.

The **Prototype Chain** is the process of searching through linked prototypes.

---

# 📊 Quick Revision

| Term | Meaning |
|------|---------|
| Prototype | Object used for shared properties and methods |
| Prototype Chain | The lookup path followed when a property isn't found |
| Object.prototype | Root prototype for ordinary objects |
| null | End of the prototype chain |

---

# 📝 Summary

- Every object has a prototype.
- JavaScript looks in the object first, then in its prototype.
- This lookup process is called the Prototype Chain.
- Built-in methods like `toString()`, `map()`, and `push()` come from prototypes.
- Prototypes allow method sharing, reducing memory usage.

---

# 🎤 Interview Questions

1. What is a prototype?
2. What is the Prototype Chain?
3. Why does `toString()` work on every object?
4. Where does `Array.prototype.map()` come from?
5. Why are prototypes memory efficient?

---

# 📝 Practice Exercises

### 🟢 Concept Check

1. Where does JavaScript search after checking the object itself?
2. What is the end of the Prototype Chain?

---

### 🟡 Predict the Output

```javascript
const user = {
    name: "Harsh"
};

console.log(user.hasOwnProperty("name"));
console.log(user.hasOwnProperty("age"));
```

---

### 🔴 Challenge

Create an array and use:

- `push()`
- `pop()`
- `map()`
- `filter()`

Then explain why these methods are available even though you never defined them.

# Part 4 — Object.create(), Constructor Functions & Classes

---

# 📑 Table of Contents

- [Inspecting Prototypes](#inspecting-prototypes)
- [Object.create()](#objectcreate)
- [Constructor Functions](#constructor-functions)
- [ES6 Classes vs Prototypes](#es6-classes-vs-prototypes)
- [Backend Examples](#backend-examples)
- [Summary](#summary)

---

# 📌 Inspecting Prototypes

JavaScript provides built-in methods to inspect an object's prototype.

## `Object.getPrototypeOf()`

```javascript
const user = {
    name: "Harsh"
};

console.log(Object.getPrototypeOf(user));
```

Output

```
Object.prototype
```

This returns the prototype of the object.

---

## `__proto__` (Legacy)

```javascript
const user = {
    name: "Harsh"
};

console.log(user.__proto__);
```

Output

```
Object.prototype
```

> ⚠️ `__proto__` is supported by browsers but is considered **legacy**. Prefer `Object.getPrototypeOf()`.

---

# 📌 Object.create()

`Object.create()` creates a new object using another object as its prototype.

```javascript
const person = {

    greet() {
        console.log("Hello!");
    }

};

const student = Object.create(person);

student.name = "Harsh";

student.greet();
```

Output

```
Hello!
```

Although `student` doesn't define `greet()`, it inherits it from `person`.

---

# 🧠 Prototype Diagram

```
student

│

├── name = "Harsh"

│

▼

person

│

├── greet()

│

▼

Object.prototype

↓

null
```

---

# 📌 Constructor Functions

Before ES6 classes, constructor functions were the standard way to create multiple similar objects.

```javascript
function User(name, age) {

    this.name = name;
    this.age = age;

}

const user1 = new User("Harsh", 21);
const user2 = new User("Rahul", 20);

console.log(user1);
console.log(user2);
```

Output

```
User { name: "Harsh", age: 21 }

User { name: "Rahul", age: 20 }
```

The `new` keyword:

- Creates a new object.
- Links it to `User.prototype`.
- Executes the constructor.
- Returns the new object.

---

# 📌 Adding Shared Methods

Instead of creating a new function for every object:

```javascript
User.prototype.greet = function () {
    console.log(`Hello, ${this.name}`);
};

user1.greet();
user2.greet();
```

Output

```
Hello, Harsh
Hello, Rahul
```

Both objects share the same `greet()` method.

---

# 📌 ES6 Classes

Classes provide a cleaner syntax for constructor functions.

```javascript
class User {

    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    greet() {
        console.log(`Hello, ${this.name}`);
    }

}

const user = new User("Harsh", 21);

user.greet();
```

Output

```
Hello, Harsh
```

---

# ⚠ Important

Classes look different, but internally JavaScript still uses **prototypes**.

```text
class User { ... }

        ↓

Constructor Function

        ↓

Prototype
```

Classes are **syntactic sugar** over the prototype system.

---

# 🌍 Real Backend Example

Many libraries internally use classes.

```javascript
class Database {

    connect() {
        console.log("Connected");
    }

}

const db = new Database();

db.connect();
```

Similarly, Express, Mongoose, and many Node.js libraries expose objects created using classes or constructor functions.

---

# 📊 Constructor vs Class

| Constructor Function | ES6 Class |
|----------------------|-----------|
| Older syntax | Modern syntax |
| Uses functions | Uses `class` keyword |
| Prototype-based | Also prototype-based |
| Still supported | Recommended for new code |

---

# 📝 Summary

- `Object.create()` creates objects with a specified prototype.
- Constructor functions were the traditional way to create objects.
- Shared methods belong on the prototype.
- ES6 classes provide cleaner syntax but still rely on prototypes internally.

---

# 🎤 Interview Questions

1. What does `Object.create()` do?
2. What is the purpose of the `new` keyword?
3. Why are methods added to the prototype?
4. Are JavaScript classes truly class-based?
5. How are classes related to prototypes?

---

# 📝 Practice Exercises

### 🟢 Concept Check

1. Why is `Object.create()` useful?
2. What happens when you use the `new` keyword?

---

### 🟡 Predict the Output

```javascript
function Car(brand) {
    this.brand = brand;
}

Car.prototype.show = function () {
    console.log(this.brand);
};

const car = new Car("Toyota");

car.show();
```

---

### 🔴 Challenge

Create a `Student` class with:

- `name`
- `rollNo`

Add a method `introduce()`.

Then explain how JavaScript uses the prototype internally even though you wrote a class.

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

### ✅ Use Object Literals

For simple objects, prefer object literals.

```javascript
const user = {
    name: "Harsh",
    age: 21
};
```

---

### ✅ Use Classes for Blueprints

When creating many similar objects, use classes.

```javascript
class User {
    constructor(name) {
        this.name = name;
    }
}
```

---

### ✅ Share Methods

Don't create the same function for every object.

```javascript
User.prototype.greet = function () {
    console.log(`Hello ${this.name}`);
};
```

or simply define methods inside a class.

---

### ✅ Use Dot Notation

Use dot notation whenever the property name is known.

```javascript
user.name
```

Use bracket notation only for dynamic property names.

```javascript
user[key]
```

---

# ⚠ Common Mistakes

## Mistake 1 — Comparing Objects

```javascript
const a = { x: 1 };
const b = { x: 1 };

console.log(a === b);
```

Output

```
false
```

Objects are compared by **reference**, not by their contents.

---

## Mistake 2 — Assuming Objects Are Copied

```javascript
const user1 = {
    name: "Harsh"
};

const user2 = user1;

user2.name = "Rahul";
```

Both variables now refer to the same object.

---

## Mistake 3 — Confusing Classes with Prototypes

```javascript
class User {}
```

This does **not** create a new inheritance model.

Internally, JavaScript still uses prototypes.

---

## Mistake 4 — Modifying Built-in Prototypes

```javascript
Array.prototype.sayHello = function () {
    console.log("Hello");
};
```

Technically possible, but generally discouraged because it can:

- Cause naming conflicts
- Break third-party libraries
- Make code harder to maintain

---

# 📊 Quick Revision Table

| Concept | Key Idea |
|---------|----------|
| Object | Collection of key-value pairs |
| Property | Data stored in an object |
| Method | Function stored inside an object |
| Reference | Objects are assigned by reference |
| Prototype | Shared object used for inheritance |
| Prototype Chain | JavaScript's property lookup mechanism |
| Object.create() | Creates an object with a specified prototype |
| Constructor Function | Traditional way to create objects |
| Class | Cleaner syntax built on top of prototypes |

---

# 📝 Summary

- Objects group related data and behavior.
- Properties store data, methods define behavior.
- Objects are stored and compared by reference.
- Every object has a prototype.
- JavaScript searches through the Prototype Chain when a property isn't found.
- Classes are syntactic sugar over prototypes.

---

# 🎤 Interview Questions

1. What is an object?
2. What is the difference between a property and a method?
3. Why are objects compared by reference?
4. What is a prototype?
5. What is the Prototype Chain?
6. How does `Object.create()` work?
7. What does the `new` keyword do?
8. Are ES6 classes truly class-based?
9. Why are prototypes memory efficient?
10. Why shouldn't you modify built-in prototypes?

---

# 📝 Practice Exercises

### 🟢 Concept Check

1. What is the purpose of a prototype?
2. Why is the Prototype Chain useful?

---

### 🟡 Predict the Output

```javascript
const person = {
    name: "Harsh"
};

console.log(person.toString());
```

Explain where `toString()` comes from.

---

### 🟡 Predict the Output

```javascript
function User(name) {
    this.name = name;
}

User.prototype.greet = function () {
    console.log(`Hi ${this.name}`);
};

const u = new User("Rahul");

u.greet();
```

---

### 🔴 Challenge

Create a `Book` class with:

- `title`
- `author`

Add a method `details()` that prints both values.

Then explain:

- Where is `details()` actually stored?
- Why don't all `Book` objects have separate copies of the method?

---

# 🎯 Chapter 9 Complete

After completing this chapter, you now understand:

- ✅ Objects
- ✅ Properties & Methods
- ✅ Object References
- ✅ Prototype
- ✅ Prototype Chain
- ✅ `Object.create()`
- ✅ Constructor Functions
- ✅ ES6 Classes
- ✅ Prototype-based Inheritance