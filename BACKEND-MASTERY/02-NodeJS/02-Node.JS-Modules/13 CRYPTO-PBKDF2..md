# Node.js `crypto` Module

## Introduction

The Node.js `crypto` module is a built-in module that provides cryptographic functionality.

It can be used for:

- Secure random data generation
- Hashing
- Encryption and decryption
- Digital signatures
- Key generation
- Password-based key derivation
- Cryptographic verification

Because it is built into Node.js, it does not need to be installed separately.

```javascript
const crypto = require("crypto");
```

---

# Where is the `crypto` Module Used?

The `crypto` module is useful whenever a backend application needs security-related operations.

Real-world examples include:

- Password security
- Generating salts
- Generating secure random tokens
- Session identifiers
- API keys
- Encryption
- Digital signatures
- Authentication systems
- Secure data processing

For example, a backend should **not store a user's plain-text password**. A password can instead be processed using a password-specific key derivation algorithm such as PBKDF2 before storage.

---

# `crypto.randomBytes()`

`randomBytes()` generates cryptographically strong random bytes.

```javascript
const crypto = require("crypto");

console.log(crypto.randomBytes(16));
```

Example output:

```text
<Buffer 35 86 dd 91 bd 7d 88 d6 2c 6e 84 38 33 e9 a2 0b>
```

The exact output changes every time.

## Why Generate Random Bytes?

Cryptographically secure random values can be useful for:

- Salts
- Tokens
- Session identifiers
- Temporary secrets
- Security-related random values

Example:

```javascript
const salt = crypto.randomBytes(16);
```

---

# What is PBKDF2?

PBKDF2 stands for:

**Password-Based Key Derivation Function 2**

It is a password-based key derivation algorithm.

Its purpose is to take a password and derive a cryptographic key from it.

The basic idea is:

```text
Password
    +
Salt
    +
Many Iterations
    ↓
PBKDF2
    ↓
Derived Key
```

Instead of simply doing:

```text
password → hash
```

PBKDF2 deliberately performs computationally expensive work.

This makes password guessing more expensive for an attacker.

---

# Why Do We Need PBKDF2?

Suppose a system directly stores a simple hash of a password.

An attacker who obtains password hashes could potentially try huge numbers of password guesses very quickly.

PBKDF2 makes each password guess more computationally expensive.

For example:

```text
Password
    ↓
PBKDF2
    ↓
100,000 iterations
    ↓
Derived Key
```

If an attacker tries millions of passwords, each attempt requires significantly more computation.

---

# Basic PBKDF2 Example

Node.js provides an asynchronous version of PBKDF2:

```javascript
crypto.pbkdf2(
    "myPassword",
    "mySalt",
    100000,
    64,
    "sha512",
    (err, derivedKey) => {
        if (err) {
            console.error(err);
            return;
        }

        console.log(derivedKey.toString("hex"));
    }
);
```

The result is a derived key represented as a `Buffer`.

We convert it to hexadecimal using:

```javascript
derivedKey.toString("hex");
```

---

# PBKDF2 Arguments

The function has this structure:

```javascript
crypto.pbkdf2(
    password,
    salt,
    iterations,
    keyLength,
    digest,
    callback
);
```

| Argument | Meaning |
|---|---|
| `password` | Password/input from which the key is derived |
| `salt` | Additional random data used during derivation |
| `iterations` | Number of times the computation is performed |
| `keyLength` | Length of the resulting derived key in bytes |
| `digest` | Hash algorithm, such as `sha512` |
| `callback` | Function called after the operation finishes |

---

# 1. Password

Example:

```javascript
"myPassword"
```

This is the password/input from which the derived key is generated.

In a real application, this would come from the user.

---

# 2. Salt

Example:

```javascript
"mySalt"
```

A salt is additional data used during password derivation.

In a real application, the salt should generally be generated randomly.

Example:

```javascript
const salt = crypto.randomBytes(16);
```

The purpose of using a salt is to make identical passwords produce different derived values when different salts are used.

For example:

```text
Password: hello123
Salt A   → Derived Key A

Password: hello123
Salt B   → Derived Key B
```

Even though the password is the same, the derived keys are different because the salts are different.

---

# 3. Iterations

Example:

```javascript
100000
```

This controls how much computational work PBKDF2 performs.

For example:

```javascript
crypto.pbkdf2(
    "myPassword",
    "mySalt",
    100000,
    64,
    "sha512",
    callback
);
```

Here:

```text
iterations = 100000
```

Increasing the number of iterations increases the amount of computational work.

## Iteration Experiment

We tested:

```text
100,000 iterations
```

and then:

```text
1,000,000 iterations
```

One run produced approximately:

```text
100,000 iterations → ~77 ms
1,000,000 iterations → ~611 ms
```

The exact timing varies depending on CPU and system load.

The important concept is:

```text
More iterations
      ↓
More computation
      ↓
More time
```

This intentional computational cost helps make password guessing more expensive.

---

# 4. Key Length

Example:

```javascript
64
```

This specifies the desired length of the derived key in **bytes**.

So:

```javascript
64
```

means:

```text
64 bytes
```

of derived key material.

---

# 5. Digest

Example:

```javascript
"sha512"
```

This specifies the hash/digest algorithm used by PBKDF2.

---

# 6. Callback

The asynchronous PBKDF2 function accepts a callback:

```javascript
(err, derivedKey) => {
    ...
}
```

The callback receives:

```text
err
```

and:

```text
derivedKey
```

If an error occurs:

```javascript
if (err) {
    console.error(err);
    return;
}
```

Otherwise, we can use the derived key:

```javascript
console.log(derivedKey.toString("hex"));
```

---

# Understanding the Complete Flow

Our example:

```javascript
crypto.pbkdf2(
    "myPassword",
    "mySalt",
    100000,
    64,
    "sha512",
    (err, derivedKey) => {
        if (err) {
            console.error(err);
            return;
        }

        console.log(derivedKey.toString("hex"));
    }
);
```

can be understood as:

```text
"myPassword"
      +
"mySalt"
      +
100000 iterations
      +
64-byte output
      +
SHA-512
      ↓
    PBKDF2
      ↓
 Derived Key
```

---

# Measuring PBKDF2 Performance

We can measure how long PBKDF2 takes using `console.time()`.

```javascript
console.time("pbkdf2");

crypto.pbkdf2(
    "myPassword",
    "mySalt",
    100000,
    64,
    "sha512",
    (err, derivedKey) => {
        if (err) {
            console.error(err);
            return;
        }

        console.timeEnd("pbkdf2");

        console.log(derivedKey.toString("hex"));
    }
);
```

Example:

```text
pbkdf2: 77.026ms
```

The exact timing depends on the machine.

---

# PBKDF2 and Non-Blocking Execution

This is especially important for the Lecture 4 topic.

We tested:

```javascript
console.log("Before pbkdf2");

crypto.pbkdf2(
    "myPassword",
    "mySalt",
    1000000,
    64,
    "sha512",
    (err, derivedKey) => {
        if (err) {
            console.error(err);
            return;
        }

        console.timeEnd("pbkdf2");
        console.log(derivedKey.toString("hex"));
    }
);

console.log("After pbkdf2");
```

The output was:

```text
Before pbkdf2
After pbkdf2
pbkdf2: 94.066ms
7398fef0...
```

The important observation is:

```text
Before pbkdf2
      ↓
pbkdf2 starts
      ↓
After pbkdf2
      ↓
pbkdf2 finishes
      ↓
Callback executes
```

---

# Why Did "After pbkdf2" Appear First?

Because we used the asynchronous version:

```javascript
crypto.pbkdf2(...)
```

Node starts the operation and does not wait for it to finish before continuing with the next JavaScript statement.

Therefore:

```javascript
console.log("After pbkdf2");
```

runs before the PBKDF2 callback executes.

This demonstrates the non-blocking behavior of the asynchronous API.

---

# Blocking vs Non-Blocking Connection

This is the key connection to Lecture 4.

## Blocking

A blocking operation prevents the current JavaScript execution from continuing until the operation finishes.

Conceptually:

```text
Start operation
      ↓
Wait
      ↓
Operation finishes
      ↓
Continue execution
```

## Non-Blocking

With the asynchronous PBKDF2 API:

```text
Start PBKDF2
      ↓
Continue JavaScript execution
      ↓
"After pbkdf2"
      ↓
PBKDF2 finishes
      ↓
Callback executes
```

The asynchronous API allows Node.js to continue executing JavaScript while the PBKDF2 operation is being processed.

---

# Why is PBKDF2 Computationally Expensive?

PBKDF2 intentionally performs repeated cryptographic computations.

For example:

```text
100,000 iterations
```

requires less computation than:

```text
1,000,000 iterations
```

Therefore:

```text
Iterations increase
        ↓
Computational work increases
        ↓
Execution time generally increases
```

This computational cost is useful for password security.

---

# Real-World Password Usage

A simplified password-security flow looks like:

```text
User enters password
        ↓
Generate random salt
        ↓
PBKDF2(password + salt)
        ↓
Derived key
        ↓
Store derived key + salt
```

When the user logs in:

```text
User enters password
        ↓
Retrieve stored salt
        ↓
Run PBKDF2 again
        ↓
Compare derived result
        ↓
Match?
 ┌──────┴──────┐
Yes           No
 ↓             ↓
Login        Reject
```

The actual production implementation should use current security guidance and appropriate parameters rather than blindly copying a tutorial example.

---

# `randomBytes()` + PBKDF2

These two APIs can work together conceptually.

```javascript
const crypto = require("crypto");

const salt = crypto.randomBytes(16);

crypto.pbkdf2(
    "myPassword",
    salt,
    100000,
    64,
    "sha512",
    (err, derivedKey) => {
        if (err) {
            console.error(err);
            return;
        }

        console.log("Salt:", salt.toString("hex"));
        console.log("Derived key:", derivedKey.toString("hex"));
    }
);
```

Flow:

```text
randomBytes()
     ↓
Generate random salt
     ↓
PBKDF2
     ↓
Derived key
```

---

# Important Security Note

Do not store plain-text passwords such as:

```text
password123
```

in a database.

Also, don't assume that a simple hash such as SHA-256 is automatically an appropriate password-storage solution.

Password storage requires a password-specific, deliberately expensive algorithm and appropriate parameters.

In modern production systems, dedicated password-hashing/KDF algorithms such as Argon2id, scrypt, bcrypt, or PBKDF2 may be used depending on the application's requirements and security guidance.

---

# Built-in Module

`crypto` is a built-in Node.js module.

Therefore:

```javascript
const crypto = require("crypto");
```

does not require:

```bash
npm install crypto
```

---

# Complete Example

```javascript
const crypto = require("crypto");

console.log("Before pbkdf2");

const salt = crypto.randomBytes(16);

console.time("pbkdf2");

crypto.pbkdf2(
    "myPassword",
    salt,
    100000,
    64,
    "sha512",
    (err, derivedKey) => {
        if (err) {
            console.error(err);
            return;
        }

        console.timeEnd("pbkdf2");

        console.log("Salt:", salt.toString("hex"));
        console.log("Derived Key:", derivedKey.toString("hex"));
    }
);

console.log("After pbkdf2");
```

Possible output:

```text
Before pbkdf2
After pbkdf2
pbkdf2: 80ms
Salt: 3586dd91bd7d88d62c6e843833e9a20b
Derived Key: 7398fef0...
```

The exact values and timing will change every time.

---

# Key Takeaways

### `crypto`

Node's built-in module for cryptographic functionality.

### `randomBytes()`

Generates cryptographically strong random bytes.

```javascript
crypto.randomBytes(16);
```

### `pbkdf2()`

Derives a cryptographic key from a password using:

- Password
- Salt
- Iterations
- Key length
- Digest algorithm

### Iterations

More iterations mean more computational work.

### Salt

Adds unique random data to password derivation and helps prevent identical passwords from producing identical derived values.

### Asynchronous PBKDF2

The asynchronous API allows JavaScript execution to continue while the operation is being processed.

This is why:

```text
Before pbkdf2
After pbkdf2
PBKDF2 callback
```

appears in that order.

---

# Lecture 4 Progress

- [x] Blocking vs non-blocking operations
- [x] Hands-on blocking vs non-blocking
- [x] `os` module
- [x] `crypto` module
- [x] `crypto.randomBytes()`
- [x] PBKDF2 introduction
- [x] PBKDF2 arguments
- [x] Salt
- [x] Iterations
- [x] Derived key
- [x] Performance measurement
- [x] Asynchronous PBKDF2
- [x] Connection between PBKDF2 and non-blocking execution

## Next

The next experiment is:

```text
pbkdf2()
   vs
pbkdf2Sync()
```

This will make the difference between **non-blocking and blocking cryptographic operations** very clear.
