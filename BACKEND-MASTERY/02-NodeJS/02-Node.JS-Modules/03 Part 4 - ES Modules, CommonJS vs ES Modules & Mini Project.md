# Part 4 - ES Modules, CommonJS vs ES Modules & Mini Project

---

# 📑 Table of Contents

- What are ES Modules?
- Exporting using ES Modules
- Importing using ES Modules
- CommonJS vs ES Modules
- Which One Should You Use?
- Mini Project
- Summary
- Interview Questions
- Assignment
- Chapter Summary

---

# 🎯 Learning Objectives

After completing this section, you will be able to:

- Understand ES Modules.
- Use `import` and `export`.
- Compare CommonJS and ES Modules.
- Know which module system to use.
- Build a small project using modules.

---

# 📖 What are ES Modules?

**ES Modules (ESM)** are the official JavaScript module system introduced in **ES6 (ECMAScript 2015)**.

Instead of:

```javascript
require()
module.exports
```

ES Modules use:

```javascript
import
export
```

Today, ES Modules are the **standard module system for JavaScript**.

---

# 💻 Exporting using ES Modules

## calculator.js

```javascript
export function add(a, b) {
    return a + b;
}

export function subtract(a, b) {
    return a - b;
}
```

---

## app.js

```javascript
import { add, subtract } from "./calculator.js";

console.log(add(10, 20));

console.log(subtract(20, 5));
```

Output

```text
30
15
```

> **Note:** In Node.js, ES Modules require additional configuration (such as setting `"type": "module"` in `package.json` or using `.mjs` files). We'll cover the setup in a later chapter when we discuss npm and project configuration.

---

# 📊 CommonJS vs ES Modules

| CommonJS | ES Modules |
|-----------|------------|
| `require()` | `import` |
| `module.exports` | `export` |
| Default in older Node.js projects | JavaScript standard |
| Loads modules synchronously | Supports static analysis |
| Widely used in legacy Node.js code | Preferred for modern projects |

---

# 🤔 Which One Should You Use?

### Use CommonJS when:

- Working with older Node.js projects.
- Maintaining existing codebases.
- Using packages that expect CommonJS.

### Use ES Modules when:

- Starting a modern project.
- Sharing code between frontend and backend.
- Building new applications.

> Today, most new Node.js projects prefer **ES Modules**, but you'll still encounter CommonJS in many existing projects. Knowing both is essential.

---

# 💻 Mini Project — Student Management

## Folder Structure

```
mini-project/

│── app.js
│── student.js
│── marks.js
│── logger.js
```

---

## student.js

```javascript
exports.getStudent = function () {
    return "Harsh";
};
```

---

## marks.js

```javascript
exports.getMarks = function () {
    return 95;
};
```

---

## logger.js

```javascript
exports.log = function (message) {
    console.log(`[LOG] ${message}`);
};
```

---

## app.js

```javascript
const student = require("./student");
const marks = require("./marks");
const logger = require("./logger");

logger.log("Application Started");

console.log("Student :", student.getStudent());

console.log("Marks :", marks.getMarks());
```

---

### Output

```text
[LOG] Application Started

Student : Harsh

Marks : 95
```

Congratulations! 🎉

You have built your first multi-file Node.js application.

---

# 📌 Summary

- ES Modules use `import` and `export`.
- CommonJS uses `require()` and `module.exports`.
- Modern JavaScript prefers ES Modules.
- Older Node.js projects commonly use CommonJS.
- Both module systems are important for backend development.

---

# 🎤 Interview Questions

1. What are ES Modules?
2. What is the difference between CommonJS and ES Modules?
3. Which module system is used by default in Node.js?
4. Why are ES Modules preferred in modern JavaScript?
5. Can CommonJS and ES Modules exist in the same project?

---

# 📝 Final Assignment

Create a small project with the following structure:

```
assignment/

│── app.js
│── calculator.js
│── student.js
│── logger.js
```

### calculator.js

Export:

- add()
- subtract()
- multiply()

---

### student.js

Export:

- getName()
- getAge()
- getCollege()

---

### logger.js

Export:

```javascript
log(message)
```

Print:

```text
[INFO] message
```

---

### app.js

Import all the modules and print:

```text
[INFO] Application Started

Name : Harsh

Age : 21

College : XYZ College

Addition : 30

Subtraction : 10

Multiplication : 200
```

---

# 🎯 Chapter Summary

In this chapter, you learned:

- ✅ What modules are
- ✅ Why modules are needed
- ✅ Built-in modules
- ✅ Developer-defined modules
- ✅ Third-party modules
- ✅ `require()`
- ✅ `module.exports`
- ✅ `exports`
- ✅ CommonJS
- ✅ How `require()` works
- ✅ Module caching
- ✅ ES Modules
- ✅ CommonJS vs ES Modules
- ✅ Building a multi-file Node.js application

---
