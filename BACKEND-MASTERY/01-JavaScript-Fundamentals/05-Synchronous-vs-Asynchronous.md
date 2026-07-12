# Synchronous vs Asynchronous JavaScript

---

# 📑 Table of Contents

- [Learning Objectives](#learning-objectives)
- [Prerequisites](#prerequisites)
- [Understanding Program Execution](#understanding-program-execution)
- [Synchronous Programming](#synchronous-programming)
- [Blocking Behaviour](#blocking-behaviour)
- [Need for Asynchronous Programming](#need-for-asynchronous-programming)
- [Asynchronous Programming](#asynchronous-programming)
- [JavaScript Runtime Role](#javascript-runtime-role)
- [Callbacks](#callbacks)
- [setTimeout Internal Working](#settimeout-internal-working)
- [Callback Queue](#callback-queue)
- [Event Loop Introduction](#event-loop-introduction)
- [Real World Examples](#real-world-examples)
- [File System Example](#file-system-example)
- [API Request Example](#api-request-example)
- [Database Example](#database-example)
- [Synchronous vs Asynchronous Comparison](#synchronous-vs-asynchronous-comparison)
- [Common Misconceptions](#common-misconceptions)
- [Summary](#summary)
- [Interview Questions](#interview-questions)
- [Practice Exercises](#practice-exercises)

---

# 🎯 Learning Objectives

After completing this chapter, you will understand:

- How JavaScript executes instructions.
- What synchronous programming means.
- Why JavaScript follows synchronous execution by default.
- How the Call Stack handles synchronous code.
- How synchronous operations can block execution.

---

# 📌 Prerequisites

Before understanding synchronous and asynchronous JavaScript, you should know:

- JavaScript Runtime
- Execution Context
- Call Stack
- Single-threaded nature of JavaScript

---

# 🧠 Understanding Program Execution

Every program is a sequence of instructions.

Example:

```javascript
console.log("Hello");

console.log("JavaScript");

console.log("Backend");
```

JavaScript needs to decide:

- Which instruction should execute first?
- When should the next instruction execute?
- Where should execution continue after a function finishes?

The JavaScript Engine uses the **Call Stack** to manage execution.

---

## Execution Flow

The code:

```javascript
console.log("A");

console.log("B");

console.log("C");
```

Execution:

```
Global Execution Context

        ↓

console.log("A")

        ↓

console.log("B")

        ↓

console.log("C")

        ↓

Program Finished
```

Output:

```
A
B
C
```

Each line waits for the previous line to complete.

This is called:

# Synchronous Execution

---

# 📖 What is Synchronous Programming?

## Definition

Synchronous programming means:

> A program executes tasks one after another, and the next task cannot start until the current task finishes.

Simple flow:

```
Task 1

↓

Task 2

↓

Task 3
```

The program waits at every step.

---

# 💻 Example 1 — Basic Synchronous Code

```javascript
console.log("Start");

console.log("Processing");

console.log("End");
```

Output:

```
Start
Processing
End
```

Execution:

Step 1:

```
Print Start
```

Step 2:

```
Print Processing
```

Step 3:

```
Print End
```

Every instruction finishes before moving forward.

---

# 💻 Example 2 — Function Execution

```javascript
function greet(){

    console.log("Hello User");

}


function login(){

    console.log("User Logged In");

}


greet();

login();
```

Output:

```
Hello User
User Logged In
```

Call Stack:

```
Global Context

↓

greet()

↓

Global Context

↓

login()

↓

Global Context
```

The `login()` function cannot start until `greet()` completes.

---

# 💻 Example 3 — Variable Calculation

```javascript
let price = 100;

let tax = 20;

let total = price + tax;


console.log(total);
```

Execution:

```
Create price

↓

Create tax

↓

Calculate total

↓

Print result
```

Output:

```
120
```

This is synchronous because each operation happens in order.

---

# ⚙️ Synchronous Execution Inside Call Stack

Example:

```javascript
function first(){

    console.log("First");

}


function second(){

    console.log("Second");

}


first();

second();
```

Call Stack:

Initially:

```
| Global |
```

Calling `first()`:

```
| first() |
| Global |
```

After completion:

```
| Global |
```

Calling `second()`:

```
| second() |
| Global |
```

After completion:

```
| Global |
```

JavaScript always completes the current function before moving to the next one.

---

# 🚦 Real World Analogy

## Synchronous Restaurant

Imagine a restaurant with one waiter.

The waiter:

```
Take Order

↓

Go to Kitchen

↓

Wait until food is prepared

↓

Serve Food

↓

Take Next Order
```

While waiting:

- No other customer is served.
- The waiter is blocked.

This is similar to synchronous execution.

---

# ⭐ Key Characteristics of Synchronous Programming

## 1. Sequential Execution

Tasks execute in a fixed order.

```
A → B → C
```

---

## 2. Blocking Behaviour

A slow operation blocks everything after it.

Example:

```javascript
calculateLargeData();

showResult();

```

`showResult()` waits until calculation finishes.

---

## 3. Simple to Understand

Because execution happens line by line.

Example:

```javascript
let a = 10;

let b = 20;

let sum = a+b;
```

The flow is predictable.

---

# 🌍 Where Synchronous Code is Useful

Synchronous execution is useful for:

### Simple calculations

```javascript
let result = 10 + 20;
```

### Variable assignments

```javascript
let username = "Harsh";
```

### Small operations

```javascript
console.log("Hello");
```

---

# ⚠️ Problem With Synchronous Programming

The problem appears when tasks take time.

Examples:

- Reading a large file.
- Calling an external API.
- Database query.
- Image processing.

Example:

```javascript
getLargeFile();

showWebsite();

```

If `getLargeFile()` takes 10 seconds:

```
getLargeFile()

(wait 10 seconds)

showWebsite()
```

Everything stops.

This is called:

# Blocking Execution

---

# 📝 Summary

- JavaScript executes synchronous code by default.
- Synchronous means one task at a time.
- The next task waits for the current task to finish.
- The Call Stack manages synchronous execution.
- Synchronous code is simple but can block execution when tasks take time.

---
# Part 2 — The Need for Asynchronous JavaScript

# ⚠️ Limitations of Synchronous Programming

Synchronous execution is simple, but it has one major problem:

> A slow operation can stop the entire program.

Example:

```javascript
console.log("Start");


function downloadFile(){

    // takes 10 seconds
}


downloadFile();


console.log("End");
```

Execution:

```
Start

↓

downloadFile()

↓

(wait 10 seconds)

↓

End
```

During those 10 seconds:

- JavaScript cannot execute new code.
- The Call Stack is busy.
- The application feels frozen.

---

# 🚫 The Blocking Problem

A blocking operation is an operation that prevents further execution until it completes.

Example:

```javascript
function expensiveTask(){

    for(let i = 0; i < 5000000000; i++){

    }

}


console.log("Before");

expensiveTask();

console.log("After");
```

Output:

```
Before

(long waiting)

After
```

The second `console.log()` cannot run until the loop finishes.

---

# 🐌 Slow Operations in Real Applications

In real applications, many operations take time.

Examples:

## 1. File Operations

Reading a large file:

```
Application

↓

Read File

↓

Wait for Disk

↓

Continue
```

---

## 2. Database Operations

Example:

```javascript
findUser();
```

The application must wait for:

```
Application

↓

Database Server

↓

Search Data

↓

Return Result
```

---

## 3. Network Requests

Example:

```javascript
fetch("https://api.com/users");
```

Flow:

```
Your Application

↓

Internet

↓

External Server

↓

Response
```

Network speed is unpredictable.

---

# 🤔 Why is Waiting a Problem?

Imagine a backend server.

Suppose we have:

```
User A Request
```

The server starts a database query.

Database takes 5 seconds.

With synchronous code:

```
User A

↓

Wait 5 seconds

↓

Response
```

During this time:

```
User B
User C
User D
```

have to wait.

This creates poor performance.

---

# 🌍 Real Backend Example

Imagine an Express server:

```javascript
app.get("/users",(req,res)=>{

    let users = getUsersFromDatabase();

    res.json(users);

});
```

If:

```javascript
getUsersFromDatabase()
```

takes 5 seconds,

the server is stuck for 5 seconds.

A better approach:

```javascript
app.get("/users",(req,res)=>{

    getUsersFromDatabase()
    .then(users=>{

        res.json(users);

    });

});
```

Now the server can handle other work while waiting.

---

# 🚀 Introduction to Asynchronous Programming

## Definition

Asynchronous programming means:

> Start a task and continue executing other code without waiting for the task to complete.

Flow:

```
Start Task

↓

Continue Other Work

↓

Task Completes Later

↓

Handle Result
```

---

# Simple Analogy

## Synchronous

You order food and stand at the counter.

```
Order Food

↓

Wait

↓

Receive Food
```

You cannot do anything else.

---

## Asynchronous

You order food and receive a token.

```
Order Food

↓

Receive Token

↓

Do Other Work

↓

Food Ready Notification

↓

Collect Food
```

You don't waste time waiting.

---

# 💻 Basic Asynchronous Example

```javascript
console.log("Start");


setTimeout(()=>{

    console.log("Task Completed");

},2000);


console.log("End");
```

Output:

```
Start
End
Task Completed
```

---

# Why This Output?

Many beginners expect:

```
Start

Task Completed

End
```

But JavaScript does:

Step 1:

```javascript
console.log("Start");
```

Prints:

```
Start
```

---

Step 2:

```javascript
setTimeout()
```

The timer is given to the runtime.

JavaScript does NOT wait.

---

Step 3:

```javascript
console.log("End");
```

Prints:

```
End
```

---

Step 4:

After 2 seconds:

```javascript
console.log("Task Completed");
```

Runs.

---

# Internal Flow

```
JavaScript Code

        |
        ↓

setTimeout()

        |
        ↓

Runtime Timer API

        |
        ↓

JavaScript continues

        |
        ↓

Timer finishes

        |
        ↓

Callback Queue

        |
        ↓

Event Loop

        |
        ↓

Call Stack

        |
        ↓

Callback Executes
```

---

# Important Concept

Asynchronous does NOT mean:

❌ JavaScript runs two pieces of code at the same time.

It means:

✅ JavaScript can start a task and continue doing other work.

---

# 📝 Summary

- Synchronous code can block execution.
- Slow operations create performance problems.
- Backend applications perform many slow tasks.
- Asynchronous programming allows JavaScript to handle waiting efficiently.
- Runtime features help JavaScript perform asynchronous operations.

---

# 🎤 Interview Questions

1. Why was asynchronous programming introduced?
2. What is a blocking operation?
3. Does asynchronous JavaScript mean parallel execution?
4. Why is async programming important in backend development?
5. How does JavaScript handle slow operations?# Part 3 — How Asynchronous JavaScript Works Internally

# Part 3 — How Asynchronous JavaScript Works Internally

# 🧠 JavaScript Engine vs JavaScript Runtime

Many beginners confuse these two.

## JavaScript Engine

The engine executes JavaScript code.

Examples:

- V8 (Chrome, Node.js)
- SpiderMonkey (Firefox)
- JavaScriptCore (Safari)

Responsibilities:

```
Parse Code

↓

Create Execution Context

↓

Execute Code
```

---

## JavaScript Runtime

The runtime provides extra features that JavaScript alone does not have.

Examples:

Browser Runtime:

```
JavaScript Engine

+

DOM API

+

Timer API

+

Fetch API

+

Event Loop
```

Node.js Runtime:

```
JavaScript Engine

+

File System API

+

Network API

+

Crypto API

+

Event Loop
```

---

# 🤔 Why Do We Need Runtime APIs?

JavaScript itself cannot:

- Start a timer.
- Read files.
- Access the network.
- Talk to databases.

Example:

```javascript
setTimeout(()=>{
    console.log("Hello");
},2000);
```

The JavaScript language does not know how to create a timer.

The runtime provides that ability.

---

# ⚙️ Runtime Architecture

A simplified view:

```
          JavaScript Code

                 |
                 ↓

        JavaScript Engine

                 |
                 ↓

            Call Stack


================================


          Runtime Environment

                 |
                 ↓

        Web APIs / Node APIs

                 |
                 ↓

            Event Loop
```

---

# 📖 Callback Functions

A callback is a function passed into another function to be executed later.

Example:

```javascript
function greet(){

    console.log("Hello");

}


function execute(callback){

    callback();

}


execute(greet);
```

Output:

```
Hello
```

Here:

```javascript
greet
```

is passed as data.

The `execute()` function decides when to run it.

---

# Asynchronous Callback Example

```javascript
console.log("Start");


setTimeout(function(){

    console.log("Timer Done");

},2000);


console.log("End");
```

Output:

```
Start
End
Timer Done
```

The callback:

```javascript
function(){
    console.log("Timer Done");
}
```

runs later.

---

# ⏳ setTimeout Internal Working

Code:

```javascript
setTimeout(()=>{

    console.log("Hello");

},3000);
```

Many people think:

> JavaScript waits 3 seconds.

Wrong.

Actual flow:

---

## Step 1

JavaScript reaches:

```javascript
setTimeout()
```

---

## Step 2

The timer is handed to the Runtime.

```
Call Stack

setTimeout()

        ↓

Timer API
```

---

## Step 3

JavaScript continues.

Example:

```javascript
console.log("Next Line");
```

runs immediately.

---

## Step 4

After 3 seconds:

The callback is moved to a queue.

```
Callback Queue

[
 console.log("Hello")
]
```

---

## Step 5

Event Loop checks:

```
Is Call Stack Empty?
```

If yes:

```
Callback Queue

        ↓

Call Stack

        ↓

Execute
```

---

# 💻 Complete Execution Example

Code:

```javascript
console.log("1");


setTimeout(()=>{

    console.log("2");

},0);


console.log("3");
```

Output:

```
1
3
2
```

---

# Why?

## Step 1

Execute:

```javascript
console.log("1");
```

Output:

```
1
```

---

## Step 2

Execute:

```javascript
setTimeout()
```

Callback goes to runtime.

Call Stack:

```
Empty
```

---

## Step 3

Execute:

```javascript
console.log("3");
```

Output:

```
3
```

---

## Step 4

Timer completes.

Callback:

```javascript
console.log("2")
```

moves to callback queue.

---

## Step 5

Event Loop sends callback to Call Stack.

Output:

```
2
```

---

# Important Concept

Even:

```javascript
setTimeout(callback,0);
```

does NOT mean:

> Execute immediately.

It means:

> Execute the callback when the Call Stack becomes empty.

---

# 🌍 Real Backend Example

Node.js server:

```javascript
app.get("/users",(req,res)=>{

    database.getUsers((data)=>{

        res.json(data);

    });

});
```

Flow:

```
Request Comes

↓

Database Query Starts

↓

Node continues handling other requests

↓

Database returns data

↓

Callback executes

↓

Response sent
```

This is why Node.js can handle many users efficiently.

---

# ⚠️ Common Mistakes

## Mistake 1

Async means code runs simultaneously.

❌ Wrong.

JavaScript still executes one thing at a time.

---

## Mistake 2

setTimeout guarantees exact timing.

❌ Wrong.

```javascript
setTimeout(fn,1000);
```

means:

"Run after at least 1 second when possible."

---

# 📝 Summary

- JavaScript Engine executes code.
- Runtime provides asynchronous capabilities.
- Timers and network requests are handled by runtime APIs.
- Callbacks are functions executed later.
- Event Loop moves completed tasks back to the Call Stack.
- Asynchronous behavior is created by the runtime, not JavaScript itself.

---

# 🎤 Interview Questions

1. Difference between JavaScript Engine and Runtime?
2. Why can't JavaScript itself handle timers?
3. What is a callback function?
4. How does setTimeout work internally?
5. Why does setTimeout(fn,0) execute later?
6. Is asynchronous JavaScript multi-threaded?# Part 4 — Callbacks in Asynchronous JavaScript

---
# Part 4 — Callbacks in Asynchronous JavaScript

# 📖 What is a Callback Function?

A **callback function** is a function that is passed as an argument to another function and is executed later.

In simple words:

> A function gives another function the responsibility of deciding when to execute it.

---

# 💻 Basic Callback Example

```javascript
function greet(name){

    console.log("Hello " + name);

}


function processUser(callback){

    let username = "Harsh";

    callback(username);

}


processUser(greet);
```

Output:

```
Hello Harsh
```

---

## Execution Flow

When we write:

```javascript
processUser(greet);
```

Flow:

```
Global Execution Context

        ↓

processUser()

        ↓

callback(username)

        ↓

greet()

        ↓

Print Hello Harsh
```

The `processUser()` function controls when `greet()` runs.

---

# Why Do We Need Callbacks?

Callbacks become useful when a task takes time.

Examples:

- Reading files.
- Fetching data from servers.
- Database queries.
- Timers.

Because we don't know exactly when these tasks will finish.

---

# Synchronous Callback Example

A callback does not always mean asynchronous.

Example:

```javascript
function calculate(a,b,operation){

    operation(a,b);

}


function add(x,y){

    console.log(x+y);

}


calculate(10,20,add);
```

Output:

```
30
```

Here:

```
calculate()

↓

add()
```

Everything happens immediately.

---

# Asynchronous Callback Example

Now let's make it asynchronous.

```javascript
console.log("Start");


setTimeout(()=>{

    console.log("Data received");

},2000);


console.log("End");
```

Output:

```
Start
End
Data received
```

The callback runs after the timer completes.

---

# Callback in Real World

Imagine downloading a file.

Without callback:

```javascript
downloadFile();

processFile();
```

Problem:

What if downloading takes 5 seconds?

The program may try to process a file that is not available.

---

With callback:

```javascript
downloadFile(function(){

    processFile();

});
```

Meaning:

> After downloading completes, process the file.

---

# File Download Example

```javascript
function downloadFile(callback){

    console.log("Downloading file...");


    setTimeout(()=>{

        console.log("Download completed");

        callback();

    },3000);

}


function processFile(){

    console.log("Processing file");

}


downloadFile(processFile);
```

Output:

```
Downloading file...

Download completed

Processing file
```

---

# Callback Flow

```
downloadFile()

        |
        |
        ↓

Start Download

        |
        |
        ↓

Wait

        |
        |
        ↓

Download Complete

        |
        |
        ↓

Execute Callback

        |
        |
        ↓

processFile()
```

---

# Callback in Node.js

Node.js heavily used callbacks in its early APIs.

Example:

```javascript
const fs = require("fs");


fs.readFile("data.txt","utf-8",
    
    function(error,data){

        if(error){

            console.log(error);

            return;
        }


        console.log(data);

    }

);
```

Here:

```javascript
function(error,data)
```

is a callback.

It executes when file reading completes.

---

# Why Callbacks Were Popular?

Callbacks solved the blocking problem.

Old synchronous approach:

```
Read File

↓

Wait

↓

Continue
```

Callback approach:

```
Start Reading File

↓

Continue Other Work

↓

File Completed

↓

Callback Executes
```

---

# The Callback Problem

Callbacks solved one problem but created another.

When many async operations depend on each other, code becomes difficult to manage.

Example:

```javascript
login(function(user){

    getProfile(user,function(profile){

        getPosts(profile,function(posts){

            getComments(posts,function(comments){

                console.log(comments);

            });

        });

    });

});
```

This is called:

# Callback Hell

---

# Problems With Callback Hell

## 1. Hard to Read

Nested functions become confusing.

---

## 2. Hard to Debug

Finding errors becomes difficult.

---

## 3. Poor Maintainability

Adding new functionality becomes painful.

---

# Solution

JavaScript introduced better patterns:

```
Callbacks

↓

Promises

↓

Async/Await
```

---

# Callback vs Normal Function

| Normal Function | Callback Function |
|-|-|
| Called directly | Passed to another function |
| Execution controlled by itself | Execution controlled by another function |
| Usually immediate | Often executed later |

---

# Common Mistakes

## Mistake 1

Thinking every callback is asynchronous.

Wrong.

Example:

```javascript
array.map(function(item){

});
```

This is a callback but synchronous.

---

## Mistake 2

Thinking callback creates a new thread.

Wrong.

Callbacks still execute on the JavaScript thread.

---

# 📝 Summary

- Callback is a function passed to another function.
- Callbacks allow code execution after a task completes.
- They are heavily used in asynchronous programming.
- Node.js originally used many callback-based APIs.
- Complex callbacks can lead to callback hell.
- Promises and async/await solve callback problems.

---

# 🎤 Interview Questions

1. What is a callback function?
2. Are callbacks always asynchronous?
3. Why are callbacks used in Node.js?
4. What is callback hell?
5. How do Promises improve callbacks?
6. Does a callback create a new thread?# Part 5 — Callback Hell and Introduction to Promises


# Part 5 — Callback Hell and Introduction to Promises
---

# 📑 Topics Covered

- Callback Hell
- Problems with Nested Callbacks
- Need for Promises
- What is a Promise?
- Promise States
- Basic Promise Example
- Promise Flow

---

# 🔥 Callback Hell

Callback hell occurs when multiple asynchronous operations depend on each other and callbacks become deeply nested.

Example:

```javascript
login(function(user){

    getProfile(user,function(profile){

        getPosts(profile,function(posts){

            getComments(posts,function(comments){

                console.log(comments);

            });

        });

    });

});
```

The structure becomes:

```
login()

   ↓

getProfile()

   ↓

getPosts()

   ↓

getComments()
```

---

# ❌ Problems With Callback Hell

## 1. Poor Readability

The code moves horizontally instead of vertically.

Hard to understand:

```javascript
function(){

    function(){

        function(){

        }

    }

}
```

---

## 2. Difficult Error Handling

Every callback needs its own error handling.

Example:

```javascript
readFile(function(error,data){

    if(error){

        // handle error

    }

});
```

Multiple callbacks mean repeated error handling.

---

## 3. Difficult Maintenance

Adding another asynchronous step creates another nested level.

Example:

Before:

```
Login

↓

Get Profile

↓

Get Posts
```

After adding:

```
Login

↓

Get Profile

↓

Get Posts

↓

Get Comments

↓

Get Likes

↓

Get Shares
```

The structure becomes difficult to manage.

---

# 🚀 Solution: Promises

JavaScript introduced **Promises** to handle asynchronous operations in a cleaner way.

---

# 📖 What is a Promise?

A Promise is an object that represents the eventual completion or failure of an asynchronous operation.

Simple definition:

> A Promise is a placeholder for a value that will be available in the future.

Example:

You order food.

Current situation:

```
Food Not Ready
```

Promise:

```
Your order is accepted.
Food will be delivered later.
```

Future possibilities:

```
Success → Food Delivered

Failure → Order Cancelled
```

---

# Promise States

Every Promise has three states:

```
              Promise

                 |
     -------------------------
     |           |           |
 Pending     Fulfilled    Rejected
```

---

## 1. Pending

Initial state.

The operation is still running.

Example:

```
Downloading file...
```

---

## 2. Fulfilled

Operation completed successfully.

Example:

```
File downloaded
```

---

## 3. Rejected

Operation failed.

Example:

```
Network error
```

---

# Creating a Promise

Syntax:

```javascript
const promise = new Promise((resolve,reject)=>{

});
```

`resolve`

means:

```
Task completed successfully
```

`reject`

means:

```
Task failed
```

---

# 💻 Basic Promise Example

```javascript
const myPromise = new Promise((resolve,reject)=>{

    let success = true;


    if(success){

        resolve("Task completed");

    }
    else{

        reject("Task failed");

    }

});
```

Currently:

```
Promise created

↓

Pending
```

---

# Consuming a Promise

We use:

- `.then()`
- `.catch()`

Example:

```javascript
myPromise

.then((result)=>{

    console.log(result);

})

.catch((error)=>{

    console.log(error);

});
```

Output:

```
Task completed
```

---

# Asynchronous Promise Example

```javascript
function downloadFile(){

    return new Promise((resolve,reject)=>{


        console.log("Downloading...");


        setTimeout(()=>{

            resolve("Download Complete");


        },3000);


    });

}



downloadFile()

.then((message)=>{

    console.log(message);

});
```

Output:

```
Downloading...

(wait 3 seconds)

Download Complete
```

---

# Promise Flow

```
Create Promise

        ↓

Operation Starts

        ↓

Pending State

        ↓

Success?

    /        \

 Yes        No

 ↓           ↓

resolve    reject

 ↓           ↓

.then()   .catch()
```

---

# Callback vs Promise

| Callback | Promise |
|-|-|
| Nested structure | Chain structure |
| Harder error handling | Cleaner error handling |
| Callback hell possible | Easier composition |
| Older approach | Modern approach |

---

# Real Backend Example

Database query:

Callback style:

```javascript
getUser(id,function(user){

    getOrders(user,function(orders){

        console.log(orders);

    });

});
```

Promise style:

```javascript
getUser(id)

.then(user=>{

    return getOrders(user);

})

.then(orders=>{

    console.log(orders);

});
```

Much cleaner.

---

# Important Point

Promises do NOT make JavaScript multi-threaded.

Still:

```
One JavaScript Thread

+

Runtime handles waiting

+

Promise callback runs later
```

---

# 📝 Summary

- Callback hell happens due to deeply nested callbacks.
- Promises provide a cleaner way to handle async operations.
- A Promise represents a future result.
- Promise states are Pending, Fulfilled, and Rejected.
- `resolve()` handles success.
- `reject()` handles failure.
- `.then()` handles success.
- `.catch()` handles errors.

---

# 🎤 Interview Questions

1. Why were Promises introduced?
2. What problem does Promise solve?
3. What are the states of a Promise?
4. Difference between callbacks and Promises?
5. Does Promise create a new thread?
6. What is the difference between resolve and reject?


