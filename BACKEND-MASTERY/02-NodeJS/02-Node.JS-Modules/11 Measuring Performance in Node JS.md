# Measuring Performance in Node.js

---

# 📑 Table of Contents

- Why Measure Performance?
- `console.time()`
- `console.timeEnd()`
- `performance.now()`
- `console.time()` vs `performance.now()`
- Summary
- Interview Questions
- Hands-on Exercise

---

# 🎯 Learning Objectives

After completing this section, you will be able to:

- Measure the execution time of your code.
- Understand when to use `console.time()`.
- Understand when to use `performance.now()`.
- Compare the two performance measuring techniques.

---

# 🤔 Why Measure Performance?

As backend developers, we often ask questions like:

- Which algorithm is faster?
- Is synchronous code slower than asynchronous code?
- How much time does a file operation take?
- Did my optimization actually improve performance?

Instead of guessing, we **measure** the execution time.

---

# 📖 `console.time()`

`console.time()` starts a timer.

## Syntax

```javascript
console.time(label);
```

---

# 📖 `console.timeEnd()`

Stops the timer and prints the elapsed time.

## Syntax

```javascript
console.timeEnd(label);
```

The label must match the one used in `console.time()`.

---

# 💻 Example

```javascript
console.time("Loop");

for (let i = 0; i < 1000000; i++) {
    // Empty loop
}

console.timeEnd("Loop");
```

### Output

```text
Loop: 3.25 ms
```

(The exact time depends on your computer.)

---

# 📖 `performance.now()`

Node.js also provides a high-resolution timer through the `perf_hooks` module.

```javascript
const { performance } = require("perf_hooks");
```

Unlike `console.time()`, it returns a number that you can use in calculations.

---

# 💻 Example

```javascript
const { performance } = require("perf_hooks");

const start = performance.now();

for (let i = 0; i < 1000000; i++) {
    // Empty loop
}

const end = performance.now();

console.log(`Execution Time: ${end - start} ms`);
```

### Output

```text
Execution Time: 2.91 ms
```

---

# ⚖️ `console.time()` vs `performance.now()`

| `console.time()` | `performance.now()` |
|------------------|---------------------|
| Very simple to use | More flexible |
| Prints directly to the console | Returns a numeric value |
| Great for quick debugging | Great for benchmarks and calculations |
| No imports required | Requires `perf_hooks` module |

---

# 💻 Example: Comparing Two Loops

```javascript
const { performance } = require("perf_hooks");

const start = performance.now();

for (let i = 0; i < 1000000; i++) {}

const end = performance.now();

console.log(`Time: ${end - start} ms`);
```

Now compare it with:

```javascript
console.time("Loop");

for (let i = 0; i < 1000000; i++) {}

console.timeEnd("Loop");
```

Both measure execution time, but `performance.now()` gives you more control because it returns the value.

---

# 🚀 Real-World Usage

Performance measurement is useful for:

- Comparing algorithms
- Measuring API response times
- Optimizing database queries
- Benchmarking file operations
- Detecting slow code

---

# 📌 Summary

- `console.time()` starts a timer.
- `console.timeEnd()` stops the timer.
- `performance.now()` returns a high-resolution timestamp.
- `performance.now()` is more flexible because it returns a numeric value.
- Measuring performance helps optimize backend applications.

---

# 🎤 Interview Questions

1. Why should we measure performance?
2. What is the difference between `console.time()` and `performance.now()`?
3. Which module provides `performance.now()` in Node.js?
4. Which method would you use for benchmarking?

---

# 📝 Hands-on Exercise

Write a program that:

1. Measures the time taken to execute a loop using `console.time()`.
2. Measures the same loop using `performance.now()`.
3. Compare the results.

---

# ✅ Progress

- [x] JavaScript Runtime
- [x] Blocking vs Non-Blocking
- [x] File System (Sync API)
- [x] File System (Callback API)
- [x] Promises
- [x] File System (Promise API)
- [x] Performance Measurement

⬜ Mini Project