# Node.js Chapter 2 - Node.js Modules
---

# 📑 Table of Contents

- Learning Objectives
- What are Modules?
- Why Do We Need Modules?
- Types of Modules
- Developer Defined Modules
- Built-in Modules
- Summary
- Interview Questions
- Assignment

# 📖 What are Modules?

A **module** is simply a JavaScript file that contains related code.

Instead of writing everything in one large file, we divide the application into smaller files called **modules**.

For example,

```
calculator.js

↓

Mathematical functions
```

```
student.js

↓

Student-related functions
```

```
app.js

↓

Main application
```

Each file performs one specific task.

---

# 🤔 Why Do We Need Modules?

Imagine writing an application with **5,000+ lines** in one file.

Problems:

- Difficult to read
- Difficult to debug
- Difficult to maintain
- Difficult for teams to work together
- Code cannot be reused easily

Using modules solves these problems.

Benefits:

- Better code organization
- Reusability
- Easier debugging
- Easy maintenance
- Team collaboration
- Better scalability

---

# 📦 Types of Modules in Node.js

Node.js mainly provides three types of modules.

## 1. Built-in Modules

These modules are already included with Node.js.

Examples:

- `fs`
- `path`
- `os`
- `http`
- `events`
- `crypto`

No installation is required.

Example:

```javascript
const fs = require("fs");
```

---

## 2. Developer Defined Modules

These are modules created by you.

Example:

```
calculator.js
```

```
student.js
```

```
logger.js
```

We'll create these in the next part.

---

## 3. Third-party Modules

These are installed using **npm**.

Examples:

- Express
- Chalk
- Mongoose
- Axios

Example:

```javascript
const express = require("express");
```

We'll study these in later chapters.

---

# 🌍 Real Project Example

A professional backend project looks like this:

```
project/

│── app.js
│── routes/
│── controllers/
│── services/
│── models/
│── middleware/
│── utils/
│── config/
```

Every folder contains multiple modules.

This makes large applications easy to manage.

---

# 💡 Why Backend Developers Love Modules

Suppose your project has:

- Login
- Registration
- Products
- Orders
- Payments

Would you write all of them in one file?

❌ No.

Instead:

```
controllers/

loginController.js

productController.js

orderController.js
```

Each file has a single responsibility.

This follows the **Single Responsibility Principle (SRP)**, making the code cleaner and easier to maintain.

---

# 📌 Summary

- A module is a JavaScript file.
- Modules help organize code.
- Node.js supports:
  - Built-in modules
  - Developer-defined modules
  - Third-party modules
- Large backend applications are built using modules.

---

# 🎤 Interview Questions

1. What is a module?
2. Why are modules important?
3. Name the different types of modules in Node.js.
4. Give examples of built-in modules.
5. What are third-party modules?

---

# 📝 Mini Assignment

1. Create a folder named:

```
02-NodeJS-Modules
```

2. Inside it, create the following files:

```
app.js

calculator.js

student.js

logger.js
```

3. Don't write any code yet.

We'll use these files in the next lesson.

---
# Part 2 - Developer Defined Modules

---

# 📑 Table of Contents

- What is a Developer Defined Module?
- Creating Your First Module
- Exporting a Function
- Importing a Function using `require()`
- Exporting Multiple Functions
- Real World Example
- Common Errors
- Summary
- Interview Questions
- Hands-on Exercise

---

# 🎯 Learning Objectives

After this section, you will be able to:

- Create your own modules.
- Export functions from one file.
- Import functions into another file.
- Organize code into multiple files.
- Understand how modules communicate.

---

# 📖 What is a Developer Defined Module?

A **Developer Defined Module** is a module created by the developer.

Unlike built-in modules (`fs`, `path`, `http`), these modules are created to organize your own application logic.

Examples:

```
calculator.js
student.js
logger.js
user.js
auth.js
```

In real backend applications, most modules are developer-defined.

---

# 💻 Example 1 — Creating Your First Module

## Folder Structure

```
examples/
└── 01-basic-module/
    ├── app.js
    └── calculator.js
```

---

## calculator.js

```javascript
function add(a, b) {
    return a + b;
}

module.exports = add;
```

---

## app.js

```javascript
const add = require("./calculator");

const result = add(10, 20);

console.log(result);
```

Run:

```bash
node app.js
```

Output:

```text
30
```

---

## How it Works

```
app.js

↓

require("./calculator")

↓

calculator.js executes

↓

module.exports returns add()

↓

app.js receives the function

↓

Function is called
```

---

# 📖 Understanding `module.exports`

Every Node.js file has an object called:

```javascript
module.exports
```

Anything assigned to it becomes available to other files.

Example:

```javascript
module.exports = add;
```

means

> "Export the `add` function so other files can use it."

---

# 💻 Example 2 — Exporting Multiple Functions

## Folder Structure

```
examples/
└── 02-multiple-exports/
    ├── app.js
    └── calculator.js
```

---

## calculator.js

```javascript
function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

module.exports = {
    add,
    subtract
};
```

---

## app.js

```javascript
const calculator = require("./calculator");

console.log(calculator.add(20, 10));

console.log(calculator.subtract(20, 10));
```

Output

```text
30

10
```

Here,

`module.exports`

contains an object.

```
{
    add,
    subtract
}
```

---

# 💻 Example 3 — Destructuring Imports

Instead of writing:

```javascript
const calculator = require("./calculator");

calculator.add(10,20);
```

You can write:

```javascript
const { add, subtract } = require("./calculator");

console.log(add(5, 5));

console.log(subtract(20, 8));
```

Output

```text
10

12
```

This is the preferred style when you only need specific functions.

---

# 🌍 Real World Example

Consider an e-commerce backend.

```
controllers/

productController.js

orderController.js

userController.js

paymentController.js
```

Each controller exports its own functions.

Example:

```javascript
module.exports = {
    createProduct,
    updateProduct,
    deleteProduct
};
```

Other files can import and use these functions as needed.

---

# ⚠️ Common Errors

### 1. Wrong Path

❌

```javascript
require("calculator");
```

✅

```javascript
require("./calculator");
```

Use `./` when importing your own modules.

---

### 2. Forgetting `module.exports`

```javascript
function add(a, b) {
    return a + b;
}
```

Nothing is exported.

Trying to import it will result in:

```text
TypeError: add is not a function
```

---

### 3. Incorrect File Name

```
Calculator.js
```

vs

```
calculator.js
```

File names are case-sensitive on many operating systems.

---

# 📌 Summary

- Developer-defined modules are created by the developer.
- `module.exports` is used to export values.
- `require()` imports values from another module.
- You can export a single value or multiple values.
- Splitting code into modules improves maintainability.

---

# 🎤 Interview Questions

1. What is a developer-defined module?
2. What is `module.exports`?
3. What does `require()` do?
4. How do you export multiple functions?
5. Why should we split code into modules?

---

# 📝 Hands-on Exercise

Create this structure:

```
assignment/

├── app.js
├── student.js
└── logger.js
```

### student.js

Create functions:

- `getStudentName()`
- `getStudentAge()`

Export both functions.

---

### logger.js

Create a function:

```javascript
log(message)
```

that prints:

```text
LOG: message
```

Export it.

---

### app.js

Import everything and print:

```text
Student Name : Harsh

Student Age : 21

LOG: Student Loaded Successfully
```

---