# JavaScript Runtime
---

# 📑 Table of Contents

- [🎯 Learning Objectives](#-learning-objectives)
- [📖 What is a JavaScript Runtime?](#-what-is-a-javascript-runtime)
- [🌍 Browser Runtime vs Node.js Runtime](#-browser-runtime-vs-nodejs-runtime)
- [⚙️ Components of the Node.js Runtime](#️-components-of-the-nodejs-runtime)
- [🚀 V8 Engine](#-v8-engine)
- [🧰 Node.js APIs](#-nodejs-apis)
- [❓ Why is Node.js Fast?](#-why-is-nodejs-fast)
- [🔄 Runtime Execution Flow](#-runtime-execution-flow)
- [📌 Summary](#-summary)
- [🎤 Interview Questions](#-interview-questions)
- [📝 Mini Assignment](#-mini-assignment)

---

# 🎯 Learning Objectives

After completing this section, you will be able to:

- Explain what a JavaScript Runtime is.
- Differentiate between the Browser Runtime and the Node.js Runtime.
- Understand the role of the V8 JavaScript Engine.
- Explain the major components of the Node.js Runtime.
- Understand why Node.js is considered fast.

---

# 📖 What is a JavaScript Runtime?

When you write JavaScript code like this:

```javascript
console.log("Hello World");
```

JavaScript **cannot execute itself**.

It needs an environment that understands JavaScript, executes it, and provides additional features such as timers, file handling, networking, and more.

That environment is called a **JavaScript Runtime**.

> **Definition:** A JavaScript Runtime is an environment that executes JavaScript code and provides additional APIs required to build applications.

Without a runtime, JavaScript is just source code.

---

# 🌍 Browser Runtime vs Node.js Runtime

JavaScript can run in different runtime environments.

## Browser Runtime

Provided by browsers such as:

- Chrome
- Firefox
- Edge
- Safari

It provides browser-specific APIs such as:

- DOM
- `window`
- `document`
- `localStorage`
- `fetch()`

Example:

```javascript
document.getElementById("heading");
```

This code works only inside a browser.

---

## Node.js Runtime

Provided by Node.js.

Instead of browser APIs, Node.js provides server-side APIs such as:

- File System (`fs`)
- HTTP (`http`)
- Path (`path`)
- Operating System (`os`)
- Events (`events`)
- Crypto (`crypto`)

Example:

```javascript
const fs = require("fs");
```

This code works only inside Node.js.

---

# ⚙️ Components of the Node.js Runtime

The Node.js Runtime consists of several important components.

```
Your JavaScript Code
          │
          ▼
     Node.js Runtime
          │
          ├── V8 Engine
          ├── Node.js APIs
          ├── Event Loop
          ├── Callback Queue
          └── Thread Pool
```

We will study each of these components in detail throughout the upcoming chapters.

---

# 🚀 V8 Engine

The **V8 Engine** is Google's open-source JavaScript engine.

Its responsibilities include:

- Parsing JavaScript
- Compiling JavaScript into machine code
- Executing JavaScript efficiently

Example:

```javascript
console.log("Hello Node.js");
```

The V8 Engine converts this JavaScript into machine code so that your computer can execute it.

> **Important:** The V8 Engine executes JavaScript, but it does **not** provide APIs like reading files or creating servers.

---

# 🧰 Node.js APIs

Node.js extends JavaScript by providing additional APIs.

Some commonly used APIs are:

| Module | Purpose |
|---------|---------|
| `fs` | File System |
| `http` | Create HTTP Servers |
| `path` | Handle File Paths |
| `os` | Operating System Information |
| `crypto` | Cryptographic Functions |
| `events` | Event Handling |

These APIs make Node.js suitable for backend development.

---

# ❓ Why is Node.js Fast?

Node.js is considered fast because:

- It uses the highly optimized **V8 Engine**.
- It uses **non-blocking I/O** for tasks like file operations and networking.
- It efficiently handles multiple requests using an event-driven architecture.

We will understand these concepts in detail in the next sections.

---

# 🔄 Runtime Execution Flow

When you execute:

```bash
node app.js
```

The execution flow is:

```
app.js
   │
   ▼
Node.js Runtime
   │
   ├── Loads Required Modules
   ├── Uses V8 Engine
   ├── Executes JavaScript
   └── Produces Output
```

---

# 📌 Summary

- A JavaScript Runtime is the environment where JavaScript code executes.
- Browsers and Node.js provide different runtime environments.
- The V8 Engine is responsible for executing JavaScript.
- Node.js extends JavaScript with built-in APIs such as `fs`, `http`, and `path`.
- Node.js is widely used for backend development because of its performance and server-side capabilities.

---

# 🎤 Interview Questions

1. What is a JavaScript Runtime?
2. What is the difference between the Browser Runtime and the Node.js Runtime?
3. What is the V8 Engine?
4. Is the V8 Engine the same as Node.js?
5. Name five built-in Node.js modules.
6. Why is Node.js commonly used for backend development?

---

# 📝 Mini Assignment

Create a file named `runtime.js`.

Inside the file, write the answers (as comments) to the following questions:

1. What is a JavaScript Runtime?
2. What is the difference between the V8 Engine and Node.js?
3. Name five built-in Node.js modules.
4. Why can't JavaScript directly access files in a browser?
5. Why is Node.js considered fast?

---