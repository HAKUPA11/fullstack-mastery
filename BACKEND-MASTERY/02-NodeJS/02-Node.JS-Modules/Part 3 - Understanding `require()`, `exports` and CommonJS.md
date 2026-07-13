# Part 3 - Understanding `require()`, `exports` and CommonJS

---

# 📑 Table of Contents

- What is CommonJS?
- Understanding `require()`
- Understanding `exports`
- `exports` vs `module.exports`
- How `require()` Works Internally
- Module Caching
- Summary
- Interview Questions
- Hands-on Exercise

---

# 🎯 Learning Objectives

After this section, you will be able to:

- Explain the CommonJS module system.
- Import modules using `require()`.
- Understand the difference between `exports` and `module.exports`.
- Explain how `require()` works internally.
- Understand module caching.

---

# 📖 What is CommonJS?

**CommonJS** is the default module system used by Node.js.

It provides two important features:

- `require()` → Import a module.
- `module.exports` → Export values from a module.

Example:

```javascript
// calculator.js

function add(a, b) {
    return a + b;
}

module.exports = add;
```

```javascript
// app.js

const add = require("./calculator");

console.log(add(5, 10));
```

Output

```text
15
```

---

# 📖 Understanding `require()`

`require()` is used to import another module.

Syntax:

```javascript
const moduleName = require("./module");
```

Example:

```javascript
const fs = require("fs");          // Built-in module

const calculator = require("./calculator"); // Your module
```

When Node encounters `require()`:

1. Finds the module.
2. Executes it.
3. Returns `module.exports`.
4. Caches the module.

---

# 📖 Understanding `exports`

Every Node.js module automatically gets an object called:

```javascript
exports
```

It is a shortcut to:

```javascript
module.exports
```

Instead of:

```javascript
module.exports.add = add;

module.exports.subtract = subtract;
```

You can write:

```javascript
exports.add = add;

exports.subtract = subtract;
```

Example:

```javascript
function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

exports.add = add;
exports.subtract = subtract;
```

Import:

```javascript
const calculator = require("./calculator");

console.log(calculator.add(10, 20));
```

---

# ⚠️ `exports` vs `module.exports`

Many beginners think they are exactly the same.

They are **not**.

Initially:

```text
exports
      │
      ▼
module.exports
```

Both point to the same object.

This works:

```javascript
exports.add = add;
```

This also works:

```javascript
module.exports.add = add;
```

But this **does not**:

```javascript
exports = add;
```

Why?

Because it changes the reference of `exports`, not `module.exports`.

Correct:

```javascript
module.exports = add;
```

---

# ⚙️ How `require()` Works Internally

When you write:

```javascript
const add = require("./calculator");
```

Node.js roughly performs these steps:

```text
require("./calculator")

        │

        ▼

Locate calculator.js

        │

        ▼

Read the file

        │

        ▼

Wrap it inside a function

        │

        ▼

Execute the code

        │

        ▼

Return module.exports

        │

        ▼

Store it in cache
```

Internally, Node wraps every module like this:

```javascript
(function(exports, require, module, __filename, __dirname) {

    // Your code

});
```

This is why every module can access:

- `exports`
- `require`
- `module`
- `__filename`
- `__dirname`

without importing them.

---

# 📖 Module Caching

A module is loaded only once.

Example:

```javascript
// logger.js

console.log("Logger Loaded");
```

```javascript
// app.js

require("./logger");

require("./logger");

require("./logger");
```

Output

```text
Logger Loaded
```

Only one time!

Why?

Because Node stores loaded modules in memory (cache).

Subsequent calls return the cached module instead of executing the file again.

Benefits:

- Faster execution
- Better performance
- Avoids unnecessary work

---

# 🌍 Real World Example

Imagine:

```javascript
const express = require("express");

const mongoose = require("mongoose");
```

If these modules were loaded every time `require()` was called, your application would become much slower.

Node loads them once and reuses the cached version.

---

# 📌 Summary

- CommonJS is Node.js's default module system.
- `require()` imports modules.
- `module.exports` exports values.
- `exports` is a shortcut to `module.exports`.
- `require()` executes a module only once.
- Loaded modules are cached.

---

# 🎤 Interview Questions

1. What is CommonJS?
2. What is `require()`?
3. What is `module.exports`?
4. What is the difference between `exports` and `module.exports`?
5. What is module caching?
6. Why does Node cache modules?
7. How does `require()` work internally?

---

# 📝 Hands-on Exercise

Create the following files:

```
assignment/

├── app.js
├── math.js
└── message.js
```

### math.js

Export:

- add()
- multiply()

using `exports`.

---

### message.js

Print:

```text
Message Module Loaded
```

Export:

```javascript
module.exports = "Welcome to Node.js";
```

---

### app.js

- Import `math.js`.
- Import `message.js` twice.
- Print the message.
- Call both functions.

Observe that:

```
Message Module Loaded
```

appears only **once**, demonstrating module caching.

---

