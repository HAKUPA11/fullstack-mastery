# Node.js `os` Module

## Introduction

The Node.js `os` module is a built-in module that provides information about the operating system and the computer on which the Node.js process is running.

It can provide information about:

- CPU cores
- Memory
- Operating system
- CPU architecture
- Hostname
- System uptime
- User information
- Important system directories

Because it is a built-in Node.js module, it does not need to be installed separately.

```javascript
const os = require("os");
```

## Where is the `os` Module Used?

The `os` module is useful when a backend application needs information about the machine it is running on.

Real-world examples include:

- Monitoring server CPU and memory.
- Creating health/status endpoints.
- Logging server information.
- Checking available system resources.
- Making system-dependent decisions.
- Debugging production servers.
- Building system-information or monitoring tools.

For example, a backend health-check endpoint could report available memory and CPU information to help monitor the server.

---

## Useful `os` Commands

| Method | What it does | Typical use |
|---|---|---|
| `os.cpus()` | Returns detailed information about each logical CPU core | CPU monitoring |
| `os.cpus().length` | Returns the number of logical CPU cores | Checking available CPU cores |
| `os.totalmem()` | Returns total system memory in bytes | Server resource monitoring |
| `os.freemem()` | Returns currently available memory in bytes | Checking available RAM |
| `os.platform()` | Returns the platform identifier, such as `win32` or `linux` | Platform-specific behavior |
| `os.arch()` | Returns CPU architecture, such as `x64` or `arm64` | Architecture detection |
| `os.hostname()` | Returns the hostname of the machine | Server identification |
| `os.type()` | Returns the operating system name | OS information |
| `os.release()` | Returns the operating system release/version | System information |
| `os.uptime()` | Returns how long the system has been running, in seconds | Server monitoring |
| `os.homedir()` | Returns the current user's home directory | File/path operations |
| `os.tmpdir()` | Returns the operating system's temporary directory | Temporary files |
| `os.userInfo()` | Returns information about the current user | User/system information |

---

## Hands-on Example

```javascript
const os = require("os");

console.log("CPU cores:", os.cpus().length);

console.log("Total memory:", os.totalmem());

console.log("Free memory:", os.freemem());

console.log("Platform:", os.platform());

console.log("Architecture:", os.arch());

console.log("Hostname:", os.hostname());

console.log("OS type:", os.type());

console.log("OS release:", os.release());

console.log("System uptime:", os.uptime());

console.log("Home directory:", os.homedir());

console.log("Temporary directory:", os.tmpdir());

console.log("Current username:", os.userInfo().username);
```

Run it with:

```bash
node app.js
```

### Example output

```text
CPU cores: 16
Total memory: 16869548032
Free memory: 5183647744
Platform: win32
Architecture: x64
Hostname: DESKTOP-XXXXXXX
OS type: Windows_NT
OS release: 10.0.XXXXX
System uptime: 123456
Home directory: C:\Users\username
Temporary directory: C:\Users\username\AppData\Local\Temp
Current username: username
```

Your exact values will be different because they depend on your machine.

---

## Important Notes

### Memory values

`os.totalmem()` and `os.freemem()` return values in **bytes**.

For example:

```javascript
console.log(os.totalmem());
```

might return:

```text
16869548032
```

This is a raw byte value. It can be converted to GB when displaying it to users.

### CPU information

```javascript
os.cpus()
```

returns detailed information about the CPUs.

If we only need the number of logical CPU cores:

```javascript
os.cpus().length
```

is enough.

### Built-in Module

The `os` module is part of Node.js itself:

```javascript
const os = require("os");
```

No `npm install` is required.

---

## What We Need to Remember

The main purpose of the `os` module is:

> **Getting information about the operating system and the machine running the Node.js application.**

For our backend syllabus, we mainly need to understand how to use the module and how its information can be useful in real backend/server applications.