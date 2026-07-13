# Node.js Chapter 2 - Node.js Modules

## 📁 Folder Structure

```
01-NodeJS/
│
└── 02-NodeJS-Modules/
    │
    ├── NodeJS-Modules.md
    │
    ├── examples/
    │   ├── 01-basic-module/
    │   ├── 02-multiple-exports/
    │   ├── 03-built-in-modules/
    │   ├── 04-module-caching/
    │   └── 05-es-modules/
    │
    ├── assignment/
    │   └── assignment.js
    │
    └── mini-project/
```

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

---

# 🎯 Learning Objectives

After completing this chapter, you will be able to:

- Explain what a module is.
- Understand why modules are used.
- Differentiate between different types of modules.
- Create your own modules.
- Use built-in Node.js modules.
- Organize code into multiple files.

---

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

# ✅ Chapter Progress

- [x] What are Modules?
- [x] Why Modules?
- [x] Types of Modules

⬜ Developer-defined Modules

⬜ require()

⬜ module.exports

⬜ exports

⬜ CommonJS

⬜ Module Caching

⬜ ES Modules

⬜ Mini Project