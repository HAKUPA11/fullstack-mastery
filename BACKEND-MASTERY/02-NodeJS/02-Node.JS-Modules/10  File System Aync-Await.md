# File System (Promise API & Async/Await)

---

# 📑 Table of Contents

- `fs/promises`
- Why Use Promise API?
- `readFile()`
- `writeFile()`
- `appendFile()`
- `mkdir()`
- `rename()`
- `unlink()`
- `try...catch`
- Summary
- Interview Questions
- Hands-on Exercise

---

# 🎯 Learning Objectives

After completing this section, you will be able to:

- Use the Promise-based File System API.
- Write asynchronous code using `async/await`.
- Handle errors using `try...catch`.
- Understand why modern Node.js applications prefer the Promise API.

---

# 📖 What is `fs/promises`?

Node.js provides a Promise-based version of the File System module.

Instead of:

```javascript
const fs = require("fs");
```

we use:

```javascript
const fs = require("fs/promises");
```

Every method now returns a **Promise**, making it compatible with `async/await`.

---

# 🤔 Why Use Promise API?

Consider callback-based code:

```javascript
fs.readFile("sample.txt", "utf8", (err, data) => {

    if (err) {
        console.log(err);
        return;
    }

    console.log(data);

});
```

Now compare it with:

```javascript
const fs = require("fs/promises");

async function readData() {

    const data = await fs.readFile("sample.txt", "utf8");

    console.log(data);

}

readData();
```

The Promise version is cleaner, easier to read, and easier to maintain.

---

# 📖 What is `async`?

The `async` keyword declares an asynchronous function.

```javascript
async function demo() {

}
```

Inside an `async` function, you can use `await`.

---

# 📖 What is `await`?

The `await` keyword pauses execution **inside the async function** until the Promise is resolved.

Example:

```javascript
const data = await fs.readFile("sample.txt", "utf8");
```

Instead of using callbacks, JavaScript waits for the Promise to complete and then returns the result.

> **Note:** `await` can only be used inside an `async` function (or at the top level in ES modules).

---

# 📖 `readFile()`

## Example

```javascript
const fs = require("fs/promises");

async function readFileExample() {

    try {

        const data = await fs.readFile(
            "sample.txt",
            "utf8"
        );

        console.log(data);

    } catch (error) {

        console.log(error);

    }

}

readFileExample();
```

---

# 📖 `writeFile()`

Creates a new file or overwrites an existing file.

```javascript
const fs = require("fs/promises");

async function createFile() {

    try {

        await fs.writeFile(
            "notes.txt",
            "Learning Promise API"
        );

        console.log("File Created");

    } catch (error) {

        console.log(error);

    }

}

createFile();
```

---

# 📖 `appendFile()`

Adds data to the end of an existing file.

```javascript
const fs = require("fs/promises");

async function appendData() {

    try {

        await fs.appendFile(
            "notes.txt",
            "\nLearning Async/Await"
        );

        console.log("Content Added");

    } catch (error) {

        console.log(error);

    }

}

appendData();
```

---

# 📖 `mkdir()`

Creates a directory.

```javascript
const fs = require("fs/promises");

async function createFolder() {

    try {

        await fs.mkdir("project");

        console.log("Folder Created");

    } catch (error) {

        console.log(error);

    }

}

createFolder();
```

For nested folders:

```javascript
await fs.mkdir(
    "src/controllers",
    { recursive: true }
);
```

---

# 📖 `rename()`

Renames a file or directory.

```javascript
await fs.rename(
    "notes.txt",
    "backend-notes.txt"
);
```

---

# 📖 `unlink()`

Deletes a file.

```javascript
await fs.unlink(
    "backend-notes.txt"
);
```

---

# 📖 Error Handling with `try...catch`

Whenever we use `await`, we should handle possible errors.

```javascript
try {

    const data = await fs.readFile(
        "sample.txt",
        "utf8"
    );

    console.log(data);

} catch (error) {

    console.log(error);

}
```

This prevents the application from crashing if something goes wrong.

---

# ⚖️ Callback API vs Promise API

| Callback API | Promise API |
|--------------|-------------|
| Uses callbacks | Uses Promises |
| Can lead to Callback Hell | Cleaner code |
| Harder to read | Easier to read |
| Error-first callbacks | `try...catch` |
| Older style | Modern style |

---

# 📌 Summary

- `fs/promises` provides Promise-based file operations.
- `async` creates an asynchronous function.
- `await` waits for a Promise to resolve.
- `try...catch` is used for error handling.
- Modern Node.js projects prefer the Promise API.

---

# 🎤 Interview Questions

1. What is `fs/promises`?
2. Why is the Promise API preferred over callbacks?
3. What is the purpose of `async`?
4. What does `await` do?
5. Why should `await` be wrapped in `try...catch`?

---

# 📝 Hands-on Exercise

Create a file named `practice.js`.

Perform the following tasks:

1. Create a folder named `students`.
2. Create a file `student.txt`.
3. Write your name into the file.
4. Append your college name.
5. Read the file and display its contents.
6. Rename the file to `details.txt`.
7. Delete `details.txt`.

Use:

- `async`
- `await`
- `try...catch`

for every operation.

---

# ✅ Progress

- [x] JavaScript Runtime
- [x] Blocking vs Non-Blocking
- [x] File System (Sync API)
- [x] File System (Callback API)
- [x] Promises
- [x] File System (Promise API)

⬜ Performance Comparison
⬜ Mini Project