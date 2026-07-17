# File System (Callback API)

---

# 📑 Table of Contents

- Why Do We Need Callback APIs?
- Synchronous vs Asynchronous File Operations
- Error-First Callback Pattern
- `readFile()`
- `writeFile()`
- `appendFile()`
- Callback Hell (Introduction)
- Summary
- Interview Questions
- Hands-on Exercise

---

# 🎯 Learning Objectives

After completing this section, you will be able to:

- Understand why asynchronous file operations are preferred.
- Learn the Error-First Callback pattern.
- Read files asynchronously.
- Write files asynchronously.
- Append data asynchronously.
- Understand callback-based programming.

---

# 🤔 Why Do We Need Callback APIs?

Suppose reading a file takes **5 seconds**.

If we use:

```javascript
fs.readFileSync()
```

Node.js waits for 5 seconds before executing the next line.

```
Read File

↓

Wait...

↓

Continue Program
```

During this time, nothing else can execute.

---

Instead, Node.js provides asynchronous methods.

Example:

```javascript
fs.readFile()
```

The file starts loading, but Node.js immediately continues executing the remaining code.

```
Start Reading File

↓

Continue Program

↓

File Finished Reading

↓

Execute Callback
```

This is why asynchronous programming is preferred for backend applications.

---

# ⚖️ Synchronous vs Asynchronous

| Synchronous | Asynchronous |
|-------------|--------------|
| Blocks execution | Does not block execution |
| Executes line by line | Continues executing other code |
| Easier to understand | Better performance |
| Suitable for small scripts | Suitable for servers |

---

# 📖 Error-First Callback Pattern

Most asynchronous Node.js APIs follow the same callback pattern.

```javascript
(error, data) => {

}
```

The first parameter is always the error.

The second parameter contains the result.

Example:

```javascript
fs.readFile("sample.txt", "utf8", (error, data) => {

});
```

If reading succeeds:

```javascript
error === null
```

If reading fails:

```javascript
error
```

contains the error information.

---

# 📖 `readFile()`

The `readFile()` method reads a file asynchronously.

## Syntax

```javascript
fs.readFile(path, encoding, callback);
```

---

## Example

```javascript
const fs = require("fs");

fs.readFile(
    "sample.txt",
    "utf8",
    (error, data) => {

        if (error) {
            console.log(error);
            return;
        }

        console.log(data);
    }
);
```

---

## Output

```
Welcome to Node.js
```

---

## Execution Order

```javascript
console.log("Start");

fs.readFile("sample.txt", "utf8", (err, data) => {

    console.log(data);

});

console.log("End");
```

Output

```
Start

End

Welcome to Node.js
```

Notice that Node.js did not wait for the file to finish reading.

---

# 📖 `writeFile()`

Creates a file or overwrites an existing file asynchronously.

## Syntax

```javascript
fs.writeFile(path, data, callback);
```

---

## Example

```javascript
const fs = require("fs");

fs.writeFile(
    "notes.txt",
    "Learning Async FS",
    (error) => {

        if (error) {

            console.log(error);

            return;

        }

        console.log("File Created");

    }
);
```

Output

```
File Created
```

---

# 📖 `appendFile()`

Adds data to the end of a file asynchronously.

## Syntax

```javascript
fs.appendFile(path, data, callback);
```

---

## Example

```javascript
const fs = require("fs");

fs.appendFile(
    "notes.txt",
    "\nNode.js Callback API",
    (error) => {

        if (error) {

            console.log(error);

            return;

        }

        console.log("Content Added");

    }
);
```

---

# ⚠️ Common Mistake

Incorrect

```javascript
fs.readFile("sample.txt", "utf8", (data) => {

    console.log(data);

});
```

This treats the first parameter as the data.

Correct

```javascript
fs.readFile(
    "sample.txt",
    "utf8",
    (error, data) => {

        if (error) {

            console.log(error);

            return;

        }

        console.log(data);

    }
);
```

Always remember:

```
(error, data)
```

The error parameter always comes first.

---

# 📖 Callback Hell (Introduction)

Consider this example:

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

As more asynchronous operations are nested, the code becomes difficult to read and maintain.

This is known as **Callback Hell**.

Fortunately, modern JavaScript provides **Promises** and **async/await**, which solve this problem.

We'll learn them in the next section.

---

# 📌 Summary

- Callback APIs are asynchronous.
- They do not block program execution.
- Node.js follows the Error-First Callback pattern.
- `readFile()`, `writeFile()`, and `appendFile()` execute asynchronously.
- Deeply nested callbacks can lead to Callback Hell.

---

# 🎤 Interview Questions

1. Why are callback APIs preferred over synchronous APIs?
2. What is the Error-First Callback pattern?
3. What is Callback Hell?
4. Why does Node.js continue executing code while reading a file?
5. What is the difference between `readFileSync()` and `readFile()`?

---

# 📝 Hands-on Exercise

Create the following structure:

```
practice/

│── app.js
│── sample.txt
```

Perform the following tasks:

1. Read `sample.txt` asynchronously.
2. Create a file named `notes.txt`.
3. Append your name to `notes.txt`.
4. Print `"Done"` after each successful operation.
5. Handle all possible errors using the Error-First Callback pattern.

---

# ✅ Progress

- [x] JavaScript Runtime
- [x] Blocking vs Non-Blocking
- [x] File System (Sync API)
- [x] File System (Callback API)

⬜ File System (Promise API)

⬜ Performance Comparison

⬜ Mini Project