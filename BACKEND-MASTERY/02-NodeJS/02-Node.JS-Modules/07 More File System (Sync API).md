# More File System (Sync API)

---

# 📑 Table of Contents

- `existsSync()`
- `mkdirSync()`
- `readdirSync()`
- `renameSync()`
- `copyFileSync()`
- `unlinkSync()`
- `rmSync()`
- `statSync()`
- Summary
- Interview Questions
- Hands-on Exercise

---

# 🎯 Learning Objectives

After completing this section, you will be able to:

- Check whether a file or directory exists.
- Create directories.
- Read the contents of a directory.
- Rename files and folders.
- Copy files.
- Delete files and directories.
- Retrieve metadata about files.

---

# 📖 `existsSync()`

The `existsSync()` method checks whether a file or directory exists.

Unlike most `fs` methods, it **does not throw an error** if the path doesn't exist. It simply returns `true` or `false`.

## Syntax

```javascript
fs.existsSync(path);
```

### Return Value

- `true` → Path exists.
- `false` → Path does not exist.

---

## Example

```javascript
const fs = require("fs");

if (fs.existsSync("sample.txt")) {
    console.log("File exists");
} else {
    console.log("File not found");
}
```

Output (if the file exists)

```text
File exists
```

---

## Real-World Use

Before reading or deleting a file:

```javascript
if (fs.existsSync("config.json")) {
    const data = fs.readFileSync("config.json", "utf8");
}
```

This avoids runtime errors when the file is missing.

---

# 📖 `mkdirSync()`

The `mkdirSync()` method creates a new directory.

## Syntax

```javascript
fs.mkdirSync(path);
```

---

## Example

```javascript
const fs = require("fs");

fs.mkdirSync("notes");
```

A folder named **notes** is created.

---

## Creating Nested Directories

```javascript
fs.mkdirSync("project/src/components", {
    recursive: true
});
```

The `recursive` option creates all missing parent directories automatically.

---

# 📖 `readdirSync()`

The `readdirSync()` method returns all files and folders inside a directory.

## Syntax

```javascript
fs.readdirSync(path);
```

---

## Example

Suppose the directory contains:

```text
project/

│── app.js

│── package.json

│── notes.txt
```

```javascript
const fs = require("fs");

const files = fs.readdirSync("./project");

console.log(files);
```

Output

```text
[
  'app.js',
  'notes.txt',
  'package.json'
]
```

---

## Real-World Use

Useful for:

- Building file explorers.
- Listing uploaded files.
- Reading log directories.
- Processing multiple files.

---

# 📖 `renameSync()`

The `renameSync()` method renames a file or directory.

## Syntax

```javascript
fs.renameSync(oldPath, newPath);
```

---

## Example

```javascript
const fs = require("fs");

fs.renameSync("notes.txt", "backend-notes.txt");
```

The file name changes immediately.

---

# 📖 `copyFileSync()`

The `copyFileSync()` method creates a copy of a file.

## Syntax

```javascript
fs.copyFileSync(source, destination);
```

---

## Example

```javascript
const fs = require("fs");

fs.copyFileSync(
    "notes.txt",
    "backup.txt"
);
```

Now both files contain the same data.

---

## Real-World Use

Useful for:

- Creating backups.
- Exporting reports.
- Duplicating templates.

---

# 📖 `unlinkSync()`

The `unlinkSync()` method deletes a file.

## Syntax

```javascript
fs.unlinkSync(path);
```

---

## Example

```javascript
const fs = require("fs");

fs.unlinkSync("backup.txt");
```

The file is permanently deleted.

> ⚠️ Deleted files cannot be recovered through Node.js.

---

# 📖 `rmSync()`

The `rmSync()` method removes files or directories.

It is the modern replacement for `rmdirSync()` in many cases.

## Syntax

```javascript
fs.rmSync(path, options);
```

---

## Example

```javascript
const fs = require("fs");

fs.rmSync("notes", {
    recursive: true,
    force: true
});
```

### Options

- `recursive: true` → Delete all contents inside the directory.
- `force: true` → Ignore errors if the directory does not exist.

---

# 📖 `statSync()`

The `statSync()` method returns information (metadata) about a file or directory.

## Syntax

```javascript
fs.statSync(path);
```

---

## Example

```javascript
const fs = require("fs");

const info = fs.statSync("notes.txt");

console.log(info.size);
```

Output

```text
245
```

The output represents the file size in bytes.

---

## Common Properties

```javascript
info.size
```

File size.

```javascript
info.isFile()
```

Returns `true` if it is a file.

```javascript
info.isDirectory()
```

Returns `true` if it is a directory.

---

# 📌 Summary

- `existsSync()` checks if a path exists.
- `mkdirSync()` creates directories.
- `readdirSync()` lists directory contents.
- `renameSync()` renames files or folders.
- `copyFileSync()` copies files.
- `unlinkSync()` deletes files.
- `rmSync()` removes files or directories.
- `statSync()` provides file metadata.

---

# 🎤 Interview Questions

1. What is the purpose of `existsSync()`?
2. Why is `recursive: true` used with `mkdirSync()`?
3. What is the difference between `unlinkSync()` and `rmSync()`?
4. How can you determine whether a path is a file or a directory?
5. Which method would you use to list all files inside a directory?

---

# 📝 Hands-on Exercise

Create the following structure:

```
practice/

│── app.js
│── notes.txt
```

Perform the following tasks:

1. Check whether `notes.txt` exists.
2. Create a folder named `backup`.
3. Copy `notes.txt` into the `backup` folder.
4. Rename the copied file to `notes-backup.txt`.
5. Display all files inside the `backup` folder.
6. Print the size of `notes-backup.txt`.
7. Delete `notes-backup.txt`.
8. Delete the `backup` folder.

---

# ✅ Progress

- [x] JavaScript Runtime
- [x] Blocking vs Non-Blocking

### File System (Sync API)

- [x] Introduction
- [x] readFileSync()
- [x] writeFileSync()
- [x] appendFileSync()
- [x] existsSync()
- [x] mkdirSync()
- [x] readdirSync()
- [x] renameSync()
- [x] copyFileSync()
- [x] unlinkSync()
- [x] rmSync()
- [x] statSync()

⬜ File System Callback API

⬜ File System Promise API

⬜ Performance Comparison

⬜ Mini Project