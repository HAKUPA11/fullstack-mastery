# File System (Sync API)

---

# 📑 Table of Contents

- What is the File System Module?
- Importing the `fs` Module
- Why Do We Need the `fs` Module?
- Reading Files (`readFileSync`)
- Writing Files (`writeFileSync`)
- Appending to Files (`appendFileSync`)
- Summary
- Interview Questions
- Hands-on Exercise

---

# 🎯 Learning Objectives

After completing this section, you will be able to:

- Understand the purpose of the `fs` module.
- Read files synchronously.
- Create and write files.
- Append data to existing files.
- Understand when synchronous APIs should be used.

---

# 📖 What is the File System (`fs`) Module?

The **File System (`fs`)** module is a built-in Node.js module that allows your application to interact with files and directories.

Using the `fs` module, you can:

- Read files
- Create files
- Write data to files
- Append data
- Rename files
- Delete files
- Create folders
- Delete folders

Unlike browser JavaScript, Node.js can directly access your computer's file system.

> **Note:** Since `fs` is a built-in module, no installation is required.

---

# 📥 Importing the `fs` Module

To use the File System module, import it using `require()`.

```javascript
const fs = require("fs");
```

Now you can access all the methods provided by the `fs` module.

---

# 🤔 Why Do We Need the `fs` Module?

Backend applications frequently work with files.

Some common use cases include:

- Reading configuration files
- Writing log files
- Uploading documents
- Saving reports
- Processing CSV or JSON data
- Creating backups

The `fs` module makes all of these operations possible.

---

# 📖 `readFileSync()`

The `readFileSync()` method reads the contents of a file **synchronously**.

Node.js waits until the file has been completely read before executing the next line of code.

## Syntax

```javascript
fs.readFileSync(path, encoding);
```

### Parameters

- `path` → Path to the file
- `encoding` → File encoding (commonly `"utf8"`)

---

## Example

### sample.txt

```text
Welcome to Node.js
```

### app.js

```javascript
const fs = require("fs");

const data = fs.readFileSync("sample.txt", "utf8");

console.log(data);
```

### Output

```text
Welcome to Node.js
```

---

# 📖 `writeFileSync()`

The `writeFileSync()` method creates a new file or overwrites an existing file.

## Syntax

```javascript
fs.writeFileSync(path, data);
```

---

## Example

```javascript
const fs = require("fs");

fs.writeFileSync("notes.txt", "Learning Node.js");
```

If `notes.txt` does not exist, it will be created.

If it already exists, its contents will be replaced.

---

# 📖 `appendFileSync()`

The `appendFileSync()` method adds data to the end of an existing file.

It does **not** overwrite the file.

## Syntax

```javascript
fs.appendFileSync(path, data);
```

---

## Example

```javascript
const fs = require("fs");

fs.appendFileSync("notes.txt", "\nLearning File System Module");
```

### Output (`notes.txt`)

```text
Learning Node.js
Learning File System Module
```

---

# ⚠️ Common Mistakes

### Forgetting the Encoding

```javascript
const data = fs.readFileSync("sample.txt");
```

This returns a **Buffer**, not a readable string.

Correct:

```javascript
const data = fs.readFileSync("sample.txt", "utf8");
```

---

### Using the Wrong File Path

```javascript
fs.readFileSync("abc.txt", "utf8");
```

If the file does not exist, Node.js throws an error.

Always verify the file path before reading.

---

# 📌 Summary

- `fs` is Node.js's built-in File System module.
- `readFileSync()` reads a file synchronously.
- `writeFileSync()` creates or overwrites a file.
- `appendFileSync()` adds data without replacing existing content.
- Synchronous methods block execution until the operation completes.

---

# 🎤 Interview Questions

1. What is the `fs` module?
2. Is the `fs` module built into Node.js?
3. What is the difference between `writeFileSync()` and `appendFileSync()`?
4. Why should `"utf8"` be passed to `readFileSync()`?
5. Why are synchronous APIs called "blocking"?

---

# 📝 Hands-on Exercise

Create the following structure:

```
examples/
│
├── app.js
└── sample.txt
```

### sample.txt

```text
Hello Backend Developer!
```

### Tasks

1. Read and display the contents of `sample.txt`.
2. Create a file named `notes.txt`.
3. Write your name into `notes.txt`.
4. Append your college name on the next line.
5. Read both files and display their contents.

---

# ✅ Progress

- [x] JavaScript Runtime
- [x] Blocking vs Non-Blocking
- [x] File System Introduction
- [x] readFileSync()
- [x] writeFileSync()
- [x] appendFileSync()

⬜ existsSync()
⬜ mkdirSync()
⬜ readdirSync()
⬜ renameSync()
⬜ copyFileSync()
⬜ unlinkSync()
⬜ rmSync()
⬜ statSync()