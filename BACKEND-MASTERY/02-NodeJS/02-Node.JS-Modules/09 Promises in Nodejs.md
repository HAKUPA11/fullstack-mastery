# Promises in Node.js

---

# 📑 Table of Contents

- What is a Promise?
- Why Were Promises Introduced?
- States of a Promise
- Creating a Promise
- Consuming a Promise
- Promise Chaining
- Summary
- Interview Questions
- Hands-on Exercise

---

# 🎯 Learning Objectives

After completing this section, you will be able to:

- Understand what a Promise is.
- Explain why Promises were introduced.
- Identify the different states of a Promise.
- Consume a Promise using `.then()` and `.catch()`.
- Understand how Promises solve Callback Hell.

---

# 🤔 Why Were Promises Introduced?

Consider this callback-based code:

```javascript
fs.readFile("a.txt", "utf8", (err, data1) => {

    fs.readFile("b.txt", "utf8", (err, data2) => {

        fs.readFile("c.txt", "utf8", (err, data3) => {

            console.log(data1);
            console.log(data2);
            console.log(data3);

        });

    });

});
```

As more asynchronous operations are added, the code becomes deeply nested.

This problem is known as **Callback Hell**.

Promises were introduced to write asynchronous code in a cleaner and more readable way.

---

# 📖 What is a Promise?

A **Promise** is an object that represents the eventual result of an asynchronous operation.

Think of it as a promise that:

- the task **will succeed**, or
- the task **will fail**.

Instead of waiting, JavaScript gives you a Promise immediately.

When the operation completes, the Promise is updated with the result.

---

# 🌍 Real-Life Analogy

Imagine you order food online.

Immediately after placing the order, you receive an order confirmation.

The food is not ready yet.

Later, one of two things happens:

- The food is delivered.
- The order is cancelled.

A Promise works in the same way.

---

# 📖 States of a Promise

Every Promise has one of three states.

## 1. Pending

The operation is still running.

```
Pending
```

---

## 2. Fulfilled

The operation completed successfully.

```
Pending

↓

Fulfilled
```

---

## 3. Rejected

The operation failed.

```
Pending

↓

Rejected
```

A Promise can move from **Pending** to either **Fulfilled** or **Rejected**.

Once settled, its state never changes.

---

# 💻 Creating a Promise

```javascript
const promise = new Promise((resolve, reject) => {

    const success = true;

    if (success) {

        resolve("Operation Successful");

    } else {

        reject("Something went wrong");

    }

});
```

Here:

- `resolve()` marks the Promise as fulfilled.
- `reject()` marks the Promise as rejected.

---

# 📖 Consuming a Promise

To use the result of a Promise, we use:

- `.then()` for success.
- `.catch()` for errors.

Example:

```javascript
promise
    .then((result) => {

        console.log(result);

    })
    .catch((error) => {

        console.log(error);

    });
```

Output

```
Operation Successful
```

---

# 📖 Promise Chaining

Promises allow multiple asynchronous operations to be linked together.

Example:

```javascript
Promise.resolve(5)

    .then((value) => value * 2)

    .then((value) => value + 10)

    .then((value) => {

        console.log(value);

    });
```

Output

```
20
```

Each `.then()` receives the result from the previous step.

---

# 🤔 Why Are Promises Better Than Callbacks?

| Callbacks | Promises |
|-----------|----------|
| Deep nesting | Flat and readable |
| Callback Hell | Promise chaining |
| Harder error handling | Centralized `.catch()` |
| Less maintainable | Easier to maintain |

---

# 📌 Summary

- A Promise represents the future result of an asynchronous operation.
- A Promise has three states: Pending, Fulfilled, and Rejected.
- `.then()` handles successful completion.
- `.catch()` handles errors.
- Promises help avoid Callback Hell.

---

# 🎤 Interview Questions

1. What is a Promise?
2. Why were Promises introduced?
3. What are the three states of a Promise?
4. What is the difference between `resolve()` and `reject()`?
5. Why are Promises preferred over callbacks?

---

# 📝 Hands-on Exercise

Create a Promise that:

- Resolves with `"Login Successful"` after 2 seconds.
- Rejects with `"Login Failed"` if a variable named `success` is `false`.
- Print the result using `.then()` and `.catch()`.

---

# ✅ Progress

- [x] JavaScript Runtime
- [x] Blocking vs Non-Blocking
- [x] File System (Sync API)
- [x] File System (Callback API)
- [x] Promises

⬜ File System (Promise API)

⬜ Async / Await

⬜ Performance Comparison

⬜ Mini Project