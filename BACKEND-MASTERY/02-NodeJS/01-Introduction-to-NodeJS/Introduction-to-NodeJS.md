# Node.js Chapter 1 – Introduction to Node.js

## 🎯 Learning Objectives

After completing this chapter, you will be able to:

- Explain what Node.js is.
- Explain why Node.js was created.
- Install and verify Node.js.
- Run JavaScript outside the browser.
- Write and execute your first Node.js program.

---

## 📖 What is Node.js?

**Node.js** is a JavaScript runtime built on Google's **V8 JavaScript Engine**.

In simple words:

> **Node.js allows JavaScript to run outside the browser.**

### Before Node.js

```text
JavaScript
    │
    ▼
Browser Only
```

### After Node.js

```text
JavaScript
    │
    ▼
+ Browser
+ Server
+ CLI Tools
+ Desktop Apps
+ Automation Scripts
```

This transformed JavaScript from a frontend language into a **full-stack language**.

---

## 🤔 Why Was Node.js Created?

Originally, web development looked like this:

- HTML → Structure
- CSS → Styling
- JavaScript → Browser Interactivity

If you wanted to build the backend, you had to learn another language such as:

- Java
- PHP
- Python
- C#

In **2009**, **Ryan Dahl** introduced Node.js, allowing developers to write server-side applications using JavaScript.

Today, Node.js is widely used to build:

- REST APIs
- Authentication Systems
- Chat Applications
- File Servers
- Streaming Services
- Real-time Applications

---

## 🌍 Browser JavaScript vs Node.js

| Browser JavaScript | Node.js |
|--------------------|----------|
| Runs inside a browser | Runs outside the browser |
| Has `window` object | No `window` object |
| Has `document` (DOM) | No DOM |
| Cannot directly access local files | Can read and write files |
| Mainly used for frontend | Mainly used for backend |

---

## 🛠 Installing Node.js

Verify your installation by running:

```bash
node -v
```

Example:

```text
v22.17.0
```

Check npm:

```bash
npm -v
```

Example:

```text
10.x.x
```

---

## 💻 Your First Node.js Program

Create a file named:

```text
example1.js
```

```javascript
console.log("Hello Node.js!");
```

Run the program:

```bash
node example1.js
```

Output:

```text
Hello Node.js!
```

Congratulations! 🎉

You have successfully executed JavaScript **without using a browser**.

---

## 💻 Example 2

```javascript
const name = "Harsh";

console.log(`Welcome ${name}`);
```

Run:

```bash
node example2.js
```

Output:

```text
Welcome Harsh
```

---

## 💻 Example 3

```javascript
const a = 15;
const b = 25;

console.log("Sum =", a + b);
```

Output:

```text
Sum = 40
```

Notice that there is:

- No HTML
- No Browser
- No `<script>` tag

Node.js directly executes the JavaScript file.

---

## ⚙️ How Node.js Executes JavaScript

When you run:

```bash
node example1.js
```

Execution flow:

```text
example1.js
      │
      ▼
Node.js Runtime
      │
      ▼
V8 JavaScript Engine
      │
      ▼
Machine Code
      │
      ▼
Output
```

Node.js provides the runtime environment, while the **V8 Engine** compiles JavaScript into machine code.

---

## 🌍 Backend Connection

Node.js is widely used to build:

- REST APIs
- Authentication Systems
- File Upload Services
- Real-time Chat Applications
- E-commerce Backends
- Microservices

Everything we build in upcoming chapters will use Node.js.

---

## ⚠️ Common Mistakes

### 1. Using Browser APIs

```javascript
document.getElementById("title");
```

❌ Error

Node.js has **no DOM**.

---

### 2. Using `alert()`

```javascript
alert("Hello");
```

❌ Error

`alert()` only exists in browsers.

Use:

```javascript
console.log("Hello");
```

---

### 3. Forgetting to Save the File

Always save the file before running:

```bash
node example1.js
```

Shortcut:

```text
Ctrl + S
```

---

## 🎤 Interview Questions

1. What is Node.js?
2. Is Node.js a programming language?
3. Is Node.js a framework?
4. What is the V8 Engine?
5. Why was Node.js created?
6. Can Node.js access the file system?

---

## 📝 Mini Assignment

Create a file named:

```text
assignment.js
```

Requirements:

- Store your name.
- Store your college name.
- Store your age.
- Print all values using template literals.

Expected Output:

```text
Name    : Harsh
College : XYZ College
Age     : 21
```

---

## 📌 Summary

- Node.js is a JavaScript runtime.
- It uses Google's V8 Engine.
- It allows JavaScript to run outside the browser.
- It is widely used for backend development.
- JavaScript files can be executed using the `node` command.

---

## ✅ Chapter Progress

- [x] What is Node.js?
- [x] Why Node.js?
- [x] Browser vs Node.js
- [x] Install & Verify
- [x] First Program
- [x] Running JavaScript

---

## 🚀 Next Chapter

We'll cover:

- Node REPL
- Running JavaScript from the terminal
- Executing multiple files
- How Node loads a file
- The `process` object