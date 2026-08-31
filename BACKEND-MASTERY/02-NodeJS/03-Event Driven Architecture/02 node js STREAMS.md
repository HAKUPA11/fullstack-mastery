# Node.js Streams — Part 1

## Follow-Along Theory + Practical Notes

> This document contains everything covered so far in the Node.js Streams section.
>
> Learning approach:
> **Theory → Code → Run → Observe → Understand**

---

## 1. What Are Streams?

A **Stream** is a way of processing data gradually instead of loading the entire data into memory at once.

Instead of:

```text
Entire File
     ↓
Load everything
     ↓
   Memory
```

we can process:

```text
  File
   ↓
Chunk 1
   ↓
Chunk 2
   ↓
Chunk 3
   ↓
  ...
```

This becomes especially useful when working with:
* Large files
* File uploads
* File downloads
* Video
* Audio
* Network data
* HTTP requests and responses

---

## 2. Why Do We Need Streams?

Suppose we have a very large file: `10 GB file`

Using a method such as `fs.readFile()` means we are asking Node.js to read the file as a complete piece of data. Conceptually:

```text
10 GB file
     ↓
Read entire file
     ↓
    RAM
     ↓
  10 GB
```

This can consume a large amount of memory. With a stream:

```text
10 GB file
     ↓
Read a chunk
     ↓
 Process it
     ↓
Read next chunk
     ↓
 Process it
     ↓
    ...
```

Only a portion of the data needs to be actively processed at a time.

---

## 3. Connection With Event-Driven Architecture

Before Streams, we learned about `EventEmitter` and `.on()`, `.emit()`, `.once()`, `.off()`.

Streams are closely connected to this event-driven model.
A **ReadStream** can emit events such as:
* `"data"`
* `"end"`
* `"error"`

A **WriteStream** can emit events such as:
* `"drain"`
* `"finish"`
* `"error"`

So our previous EventEmitter knowledge directly applies to Streams.

---

## 4. Readable Streams

A Readable Stream is used when we want to read data progressively. For example:

```text
      File
       ↓
Readable Stream
       ↓
     Chunks
```

Node.js provides `fs.createReadStream()` for reading files as streams.

---

## 5. Creating a Readable Stream

First we imported `fs`:

```javascript
const fs = require("fs");
```

Then:

```javascript
const stream = fs.createReadStream("./example.txt");
```

This creates a ReadStream object.

---

## 6. File Path Problem We Encountered

Initially we used `fs.createReadStream("./example.txt");` but Node produced:

```text
ENOENT: no such file or directory
```

The reason was that `./` refers to the current working directory. Node was looking for:

```text
FULLSTACK/
└── example.txt
```

while our file was inside the Streams directory. We solved this using:

```javascript
const path = require("path");

const filePath = path.join(__dirname, "example.txt");
const stream = fs.createReadStream(filePath);
```

`__dirname` refers to the directory containing the current JavaScript file. This makes the path much more reliable.

---

## 7. Inspecting the ReadStream

We initially ran:

```javascript
console.log(stream);
```

and Node printed a large ReadStream object. Among the properties we noticed were:

```text
highWaterMark: 65536
```

and event names such as `error`, `data`, `end`. This was our first indication that Streams use an event-driven model.

---

## 8. The "data" Event

To receive chunks from a Readable Stream:

```javascript
stream.on("data", (chunk) => {
    console.log(chunk);
});
```

General pattern: `stream.on("data", callback);`

Whenever the stream has a chunk of data available, the callback executes.

---

## 9. What Is a Chunk?

A chunk is a piece of the total data being read. Instead of receiving the `Entire file`, we receive:
* Chunk 1
* Chunk 2
* Chunk 3
* ...

The data event receives each chunk:

```javascript
stream.on("data", (chunk) => {
    // chunk
});
```

---

## 10. Buffers

Initially, when we printed the chunk (`console.log(chunk);`), we got something like:

```text
<Buffer ... 2e 4e 64 65 6a 6f 73>
```

This is not hashing. It is a representation of the actual bytes of the file. For example:
* `4e` → N
* `6f` → o
* `64` → d
* `65` → e
* `2e` → .
* `6a` → j
* `73` → s
* `20` → space

So:
```text
4e 6f 64 65 2e 6a 73 20
 ↓  ↓  ↓  ↓  ↓  ↓  ↓  ↓
 N  o  d  e  .  j  s  space
```

---

## 11. Buffer vs Hash

A Buffer and a hash are completely different concepts.

| Buffer | Hash |
| :--- | :--- |
| Represents actual data bytes | Represents a derived digest |
| Used for binary data | Used for hashing/integrity/password-related operations |
| Can be converted back into the original data | Normally cannot be reversed |
| Example: `<Buffer 4e 6f 64...>` | Example: `7398fef066...` |

So:
**Buffer** ↓ Actual data
while:
**Hash** ↓ Derived value

---

## 12. Converting a Buffer to Text

We used:

```javascript
console.log(chunk.toString());
```

This converts the Buffer into readable text. Example:

```javascript
stream.on("data", (chunk) => {
    console.log(chunk.toString());
});
```

Output:
```text
Node.js streams allow us to work with data piece by piece.
...
```

---

## 13. Why Chunks Matter

Our small file was only `280 bytes`. So Node read it as one chunk. We then created a much larger file. The stream produced:

```text
Chunk size: 65536
Chunk size: 65536
Chunk size: 65536
...
Chunk size: 50880
```

This demonstrated that a large file can be processed in multiple chunks. The approximate structure was:

```text
large-file.txt
      ↓
    64 KB
      ↓
    64 KB
      ↓
    64 KB
      ↓
     ...
      ↓
 50,880 bytes
```

The final chunk was smaller because it contained the remaining data.

---

## 14. highWaterMark

We observed `65536`, which is `65536 bytes = 64 KB`. The ReadStream showed `highWaterMark: 65536`. This is related to how much data the stream buffers/read operations work with.

We then changed it manually:

```javascript
const stream = fs.createReadStream(filePath, {
    highWaterMark: 1024
});
```

Now the chunks were approximately:
```text
1024 bytes
1024 bytes
1024 bytes
...
```

This proved that the stream does not inherently have to use 64 KB chunks. The stream's buffering configuration can be changed.

---

## 15. The "end" Event

How do we know when the entire file has been read? We listen for:

```javascript
stream.on("end", () => {
    console.log("Finished reading the file.");
});
```

The `"end"` event means: **There is no more data available from the Readable Stream.**

The lifecycle becomes:
```text
createReadStream()
       ↓
    "data"
       ↓
    "data"
       ↓
    "data"
       ↓
      ...
       ↓
     "end"
```

---

## 16. The "error" Event

Streams can encounter errors. We deliberately tried reading a file that didn't exist:

```javascript
const stream = fs.createReadStream(
    path.join(__dirname, "does-not-exist.txt")
);
```

Node produced an error similar to: `ENOENT: no such file or directory` and `Unhandled 'error' event`. This happens because the stream emitted an `"error"` event and there was no listener handling it.

---

## 17. Handling Stream Errors

We added:

```javascript
stream.on("error", (err) => {
    console.log("Something went wrong:", err.message);
});
```

Now the error can be handled by our application. A basic ReadStream therefore commonly uses:

```javascript
stream.on("data", ...);
stream.on("end", ...);
stream.on("error", ...);
```

---

## 18. `setEncoding()`

Instead of manually doing `chunk.toString()`, we can tell the stream to decode incoming data as UTF-8:

```javascript
stream.setEncoding("utf8");
```

Example:

```javascript
const stream = fs.createReadStream(filePath);
stream.setEncoding("utf8");

stream.on("data", (chunk) => {
    console.log(chunk);
});
```

Now the chunk is provided as a string rather than a Buffer.

---

## 19. Buffer vs `setEncoding()`

**Without encoding:**
File ↓ Bytes ↓ Buffer ↓ `chunk.toString()` ↓ String

**With `stream.setEncoding("utf8");`:**
File ↓ Bytes ↓ UTF-8 decoding ↓ String chunk

`setEncoding()` does not modify the original file. It only controls how the stream provides the data to us.

---

## 20. Writable Streams

So far we were doing:
File ↓ Readable Stream ↓ Chunks

A **Writable Stream** does the opposite. It allows us to send data progressively to a destination.
Data ↓ Writable Stream ↓ File

Node provides: `fs.createWriteStream()`

---

## 21. Creating a Writable Stream

Example:

```javascript
const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "output.txt");
const stream = fs.createWriteStream(filePath);
```

Now we can write data to the stream.

---

## 22. `.write()`

We can write multiple pieces of data:

```javascript
stream.write("Hello from Node.js\n");
stream.write("This is a writable stream.\n");
stream.write("We can write data piece by piece.\n");
```

The data is sent to the Writable Stream.

---

## 23. `.end()`

When we have finished sending data:

```javascript
stream.end();
```

This means: **We are finished writing data to this Writable Stream.**

Complete example:

```javascript
const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "output.txt");
const stream = fs.createWriteStream(filePath);

stream.write("Hello from Node.js\n");
stream.write("This is a writable stream.\n");
stream.write("We can write data piece by piece.\n");
stream.end();

console.log("Writing started.");
```

The resulting file contains:
```text
Hello from Node.js
This is a writable stream.
We can write data piece by piece.
```

---

## 24. Important Difference: Readable "end" vs Writable `.end()`

These look similar but mean different things.

**Readable**
```javascript
stream.on("end", () => {
    // finished reading
});
```
`"end"` is an **event**. Meaning: *No more data to READ*.

**Writable**
```javascript
stream.end();
```
`.end()` is a **method**. Meaning: *No more data to WRITE*.

So:
* Readable `"end"` event ↓ Reading completed
* Writable `.end()` method ↓ Writing completed/closed for input

---

## 25. `pipe()`

Now we can connect our Readable Stream to a Writable Stream.
Without `pipe()` we could manually do:

```javascript
readStream.on("data", (chunk) => {
    writeStream.write(chunk);
});
```

But Node provides:
```javascript
readStream.pipe(writeStream);
```
This connects the streams safely.

---

## 26. File Copy Using `pipe()`

We created:

```javascript
const fs = require("fs");
const path = require("path");

const sourcePath = path.join(__dirname, "large-file.txt");
const destinationPath = path.join(__dirname, "copied-file.txt");

const readStream = fs.createReadStream(sourcePath);
const writeStream = fs.createWriteStream(destinationPath);

readStream.pipe(writeStream);
console.log("Copying started...");
```

Running this created `copied-file.txt` with the same content as `large-file.txt`.

---

## 27. Why `pipe()` Is Useful

Manual approach:
Readable ↓ `"data"` ↓ chunk ↓ `write()` ↓ chunk ↓ ...

Using `readStream.pipe(writeStream);`, Node handles the connection between the two streams. Conceptually:

```text
  Readable
     │
     │ chunks
     ↓
   pipe()
     │
     ↓
  Writable
```

`pipe()` is particularly useful because it works with stream flow control and **backpressure**.

---

## 28. Backpressure

Now we reached one of the most important Stream concepts. Imagine:

```text
Readable Stream  → 100 MB/s
      ↓
Writable Stream  →  10 MB/s
```

The producer is generating data faster than the consumer can process it. If data keeps arriving faster than it can be consumed, the waiting data can build up. This situation is called **Backpressure**.

Conceptually:
Producer ↓ produces data quickly ↓ Consumer ↓ cannot keep up ↓ **BACKPRESSURE**

---

## 29. `write()` Return Value

We tested:
```javascript
const canContinue = writeStream.write(data);
```

The return value is important.
If `writeStream.write(data)` returns `true`, the writable stream is currently able to accept more data.
If it returns `false`, we should stop pushing more data temporarily.

---

## 30. Our Backpressure Experiment

We wrote:

```javascript
const fs = require("fs");
const path = require("path");

const outputPath = path.join(__dirname, "backpressure-test.txt");
const writeStream = fs.createWriteStream(outputPath);

let canContinue = true;

for (let i = 0; i < 100000; i++) {
    canContinue = writeStream.write(`This is line ${i}\n`);

    if (!canContinue) {
        console.log("Backpressure detected at:", i);
        break;
    }
}

writeStream.end();
```

Our actual result was:
`Backpressure detected at: 970`

The exact number is not important. What matters is that eventually `writeStream.write(...)` returned `false`.

---

## 31. What `false` Means

When `writeStream.write(data)` returns `false`, the meaning is approximately:
*The writable stream's internal buffering has reached a point where the producer should stop writing temporarily.*

Conceptually:
`write()` ↓ `true` ↓ continue
`write()` ↓ `false` ↓ STOP TEMPORARILY

---

## 32. The "drain" Event

After `write()` returns `false`, we need a way to know when we can continue. That is what the `"drain"` event is for.

Conceptually:
`write()` ↓ `false` ↓ wait ↓ `"drain"` ↓ continue writing

---

## 33. Handling Backpressure Manually

We used:

```javascript
writeStream.once("drain", () => {
    console.log("Drain received. Continuing...");
    writeData();
});
```

A more complete version was:

```javascript
const fs = require("fs");
const path = require("path");

const outputPath = path.join(__dirname, "backpressure-test.txt");
const writeStream = fs.createWriteStream(outputPath);

let i = 0;

function writeData() {
    let canContinue = true;

    while (i < 100000 && canContinue) {
        canContinue = writeStream.write(`This is line ${i}\n`);
        i++;
    }

    if (i >= 100000) {
        writeStream.end();
        console.log("Finished writing.");
    } else {
        console.log("Buffer full. Waiting for drain...");
        writeStream.once("drain", () => {
            console.log("Drain received. Continuing...");
            writeData();
        });
    }
}

writeData();
```

The flow is:
`write()` ↓ `false` ↓ buffer needs time ↓ wait for `"drain"` ↓ `"drain"` ↓ `writeData()` ↓ continue

---

## 34. Connection to EventEmitter

Notice:
```javascript
writeStream.once("drain", () => { ... });
```
This is the same pattern we learned with EventEmitter:
```javascript
emitter.once("event", listener);
```
So Streams are heavily based on the event-driven model we learned earlier.

---

## 35. `pipe()` and Backpressure

One of the major advantages of `pipe()` is that Node's stream mechanism manages the flow between the readable and writable streams, including backpressure automatically.

Conceptually:

```text
       Readable
          │
          │ data
          ↓
        pipe()
          │
          ↓
       Writable
          │
          ↓
    flow regulation
          │
          ↓
     Backpressure
```

This is much safer than blindly doing `readStream.on("data", ...)` without considering what happens when the writable side cannot keep up.

---

## 36. The "finish" Event

A Writable Stream has a `"finish"` event. We used:

```javascript
writeStream.on("finish", () => {
    console.log("File copying completed.");
});
```

Example:

```javascript
const fs = require("fs");
const path = require("path");

const sourcePath = path.join(__dirname, "large-file.txt");
const destinationPath = path.join(__dirname, "copied-file.txt");

const readStream = fs.createReadStream(sourcePath);
const writeStream = fs.createWriteStream(destinationPath);

readStream.on("error", (err) => {
    console.log("Read error:", err.message);
});

writeStream.on("error", (err) => {
    console.log("Write error:", err.message);
});

writeStream.on("finish", () => {
    console.log("File copying completed.");
});

readStream.pipe(writeStream);
```

When all data has been written and the writable side has completed, `"finish"` is emitted.

---

## 37. Readable vs Writable Streams

| Readable Stream | Writable Stream |
| :--- | :--- |
| Reads data | Writes data |
| `createReadStream()` | `createWriteStream()` |
| `"data"` | `.write()` |
| `"end"` | `.end()` |
| `"error"` | `"error"` |
| Produces chunks | Consumes data |
| `"end"` tells us reading is finished | `"finish"` tells us writing is finished |

---

## 38. Important Stream Events So Far

### Readable
* **`"data"`**: A chunk has arrived.
* **`"end"`**: No more data is available.
* **`"error"`**: An error occurred.

### Writable
* **`"drain"`**: The writable stream is ready to accept more data after backpressure.
* **`"finish"`**: All data has been written and the writable stream has finished.
* **`"error"`**: An error occurred while writing.

---

## 39. Complete Stream Mental Model

At this point, our understanding is:

```text
                         STREAMS
                            │
              ┌─────────────┴─────────────┐
              ↓                           ↓
          READABLE                    WRITABLE
              │                           │
              ↓                           ↓
   createReadStream()          createWriteStream()
              │                           │
              ↓                           ↓
           "data"                      write()
              │                           │
              ↓                           ↓
            chunk                     buffering
              │                           │
              ↓                           ↓
            "end"                      "drain"
                                          │
                                          ↓
                                      continue
                                          │
                                          ↓
                                      "finish"
```

---

## 40. Stream Pipeline

The most important practical pattern we've built so far is:

```text
large-file.txt
      ↓
 ReadStream
      ↓
    pipe()
      ↓
 WriteStream
      ↓
copied-file.txt
```

This allows data to flow progressively instead of requiring the entire file to be loaded into memory.

---

## 41. What We Have Completed

**Readable Streams**
* What Streams are
* Why Streams are useful
* Readable Streams
* `fs.createReadStream()`
* File paths with `__dirname`
* `"data"` event
* Chunks
* Buffers
* Buffer vs hash
* `chunk.toString()`
* `"end"` event
* `"error"` event
* `setEncoding("utf8")`
* `highWaterMark`
* Different chunk sizes

**Writable Streams**
* Writable Streams
* `fs.createWriteStream()`
* `.write()`
* `.end()`
* `"finish"` event

**Stream Communication**
* `pipe()`
* Readable → Writable pipeline

**Backpressure**
* What backpressure means
* `write()` return value
* `false` from `write()`
* `"drain"` event
* Manually handling `"drain"`
* Backpressure with `pipe()`

**Event-Driven Connection**
* Streams use event-driven behavior
* `"data"`, `"end"`, `"error"`, `"drain"`, `"finish"` events
* Connection with EventEmitter

---

### End of Streams — Part 1

Completed:
```text
Readable Streams
       ↓
    Chunks
       ↓
    Buffers
       ↓
data / end / error
       ↓
   Encoding
       ↓
 highWaterMark
       ↓
Writable Streams
       ↓
write / end / finish
       ↓
     pipe()
       ↓
  Backpressure
       ↓
     drain
```