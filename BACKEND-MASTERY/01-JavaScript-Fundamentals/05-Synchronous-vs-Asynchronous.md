# Synchronous vs Asynchronous JavaScript

---
# 📑 Table of Contents

- [Learning Objectives](#learning-objectives)
- [Prerequisites](#prerequisites)

## Understanding Synchronous Programming

- [Understanding Program Execution](#understanding-program-execution)
- [What is Synchronous Programming?](#what-is-synchronous-programming)
- [Synchronous Execution Flow](#synchronous-execution-flow)
- [Basic Synchronous Examples](#basic-synchronous-examples)
- [Synchronous Execution Inside the Call Stack](#synchronous-execution-inside-the-call-stack)
- [Characteristics of Synchronous Programming](#characteristics-of-synchronous-programming)
- [Where is Synchronous Programming Useful?](#where-is-synchronous-programming-useful)
- [Limitations of Synchronous Programming](#limitations-of-synchronous-programming)
- [The Blocking Problem](#the-blocking-problem)

---

## Introduction to Asynchronous Programming

- [Slow Operations in Real Applications](#slow-operations-in-real-applications)
- [Why Waiting is a Problem](#why-waiting-is-a-problem)
- [Introduction to Asynchronous Programming](#introduction-to-asynchronous-programming)
- [Basic Asynchronous Example](#basic-asynchronous-example)
- [Asynchronous vs Synchronous Programming](#asynchronous-vs-synchronous-programming)

---

## JavaScript Runtime

- [JavaScript Engine vs JavaScript Runtime](#javascript-engine-vs-javascript-runtime)
- [Role of the Runtime Environment](#role-of-the-runtime-environment)
- [Runtime APIs](#runtime-apis)
- [Runtime Architecture](#runtime-architecture)

---

## Callback Functions

- [What is a Callback Function?](#what-is-a-callback-function)
- [Synchronous Callback Example](#synchronous-callback-example)
- [Asynchronous Callback Example](#asynchronous-callback-example)
- [Callbacks in Node.js](#callbacks-in-nodejs)
- [Callback Hell](#callback-hell)
- [Problems with Callback Hell](#problems-with-callback-hell)

---

## Promises

- [Why Promises Were Introduced](#why-promises-were-introduced)
- [What is a Promise?](#what-is-a-promise)
- [Promise States](#promise-states)
- [Creating a Promise](#creating-a-promise)
- [Consuming a Promise](#consuming-a-promise)
- [Promise Chaining](#promise-chaining)
- [Returning Values from then()](#returning-values-from-then)
- [Promise Error Handling](#promise-error-handling)
- [Promise.all()](#promiseall)
- [Promise.allSettled()](#promiseallsettled)
- [Promise.race()](#promiserace)
- [Promise Methods Comparison](#promise-methods-comparison)

---

## Async/Await

- [Why Async/Await?](#why-asyncawait)
- [What is async?](#what-is-async)
- [What is await?](#what-is-await)
- [Basic Async/Await Example](#basic-asyncawait-example)
- [Error Handling with try...catch](#error-handling-with-trycatch)
- [Sequential vs Parallel Await](#sequential-vs-parallel-await)
- [Using Promise.all() with Async/Await](#using-promiseall-with-asyncawait)
- [Async/Await vs Promises](#asyncawait-vs-promises)

---

## Event Loop

- [What is the Event Loop?](#what-is-the-event-loop)
- [Why Do We Need the Event Loop?](#why-do-we-need-the-event-loop)
- [Components Involved](#components-involved)
- [How the Event Loop Works](#how-the-event-loop-works)
- [Step-by-Step Execution](#step-by-step-execution)
- [Common Event Loop Examples](#common-event-loop-examples)

---

## Microtask Queue vs Callback Queue

- [What is a Queue?](#what-is-a-queue)
- [Callback Queue (Macrotask Queue)](#callback-queue-macrotask-queue)
- [Microtask Queue](#microtask-queue)
- [Priority of Queues](#priority-of-queues)
- [Promise vs setTimeout](#promise-vs-settimeout)
- [Execution Flow](#execution-flow)

---

## Common Misconceptions

- [Common Misconceptions](#common-misconceptions)

---

## Summary

- [Summary](#summary)

---

## Interview Preparation

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
# Part 6 — Promises in Depth

---

# 📑 Topics Covered

- Promise Chaining
- Returning Values from Promises
- Error Handling
- Multiple Promises
- Promise.all()
- Promise.race()
- Promise.allSettled()
- Real World API Example

---

# 🔗 Promise Chaining

Promise chaining allows us to execute multiple asynchronous operations one after another.

Instead of:

```javascript
function1(function(){

    function2(function(){

        function3();

    });

});
```

We write:

```javascript
function1()

.then(function2)

.then(function3);
```

Cleaner and easier to maintain.

---

# 💻 Example 1 — Basic Promise Chain

```javascript
Promise.resolve(10)

.then((value)=>{

    console.log(value);

    return value * 2;

})

.then((value)=>{

    console.log(value);

    return value * 3;

})

.then((value)=>{

    console.log(value);

});
```

Output:

```
10
20
60
```

---

# How Does This Work?

First:

```javascript
Promise.resolve(10)
```

creates:

```
Promise

↓

Resolved with 10
```

Then:

```javascript
return value * 2;
```

creates a new Promise automatically.

Flow:

```
Promise 1

↓

Promise 2

↓

Promise 3
```

---

# Important Rule

Whatever we return from `.then()` goes to the next `.then()`.

Example:

```javascript
Promise.resolve("Hello")

.then((data)=>{

    return data + " World";

})

.then((result)=>{

    console.log(result);

});
```

Output:

```
Hello World
```

---

# ❌ Common Mistake

Example:

```javascript
Promise.resolve(10)

.then((value)=>{

    value * 2;

})

.then((result)=>{

    console.log(result);

});
```

Output:

```
undefined
```

Why?

Because we forgot:

```javascript
return
```

Correct:

```javascript
return value * 2;
```

---

# ⚠️ Promise Error Handling

Promises handle errors using:

```javascript
.catch()
```

Example:

```javascript
const promise = new Promise((resolve,reject)=>{

    reject("Something went wrong");

});


promise

.then(result=>{

    console.log(result);

})

.catch(error=>{

    console.log(error);

});
```

Output:

```
Something went wrong
```

---

# Error Propagation

Example:

```javascript
Promise.resolve()

.then(()=>{

    throw new Error("Failed");

})

.then(()=>{

    console.log("Success");

})

.catch((error)=>{

    console.log(error.message);

});
```

Output:

```
Failed
```

When an error occurs:

```
.then()

↓

Skip remaining success handlers

↓

.catch()
```

---

# Multiple Promises

Real applications often run multiple async tasks.

Example:

```javascript
const userPromise = getUser();

const postPromise = getPosts();

const commentPromise = getComments();
```

We need a way to handle all of them.

JavaScript provides:

```
Promise.all()
```

---

# Promise.all()

`Promise.all()` waits for all promises to complete.

Example:

```javascript
const p1 = Promise.resolve("User");

const p2 = Promise.resolve("Posts");

const p3 = Promise.resolve("Comments");


Promise.all([p1,p2,p3])

.then(result=>{

    console.log(result);

});
```

Output:

```
[
 "User",
 "Posts",
 "Comments"
]
```

---

# Promise.all Flow

```
Promise 1
     |
Promise 2  -----> Promise.all()
     |
Promise 3

          ↓

Wait for all

          ↓

Return results
```

---

# Real Example

Suppose a dashboard needs:

```
User Data

+

Orders

+

Notifications
```

Instead of:

```
Wait User

↓

Wait Orders

↓

Wait Notifications
```

We do:

```javascript
Promise.all([
    getUser(),
    getOrders(),
    getNotifications()
])
.then(data=>{

    console.log(data);

});
```

All requests start together.

---

# Promise.all Failure

Important:

If one promise fails:

```javascript
Promise.all([
    Promise.resolve("A"),
    Promise.reject("Error"),
    Promise.resolve("C")
])
```

Result:

```
Rejected
```

The entire Promise.all fails.

---

# Promise.allSettled()

Sometimes we want results of every promise even if some fail.

Example:

```javascript
Promise.allSettled([

Promise.resolve("Success"),

Promise.reject("Failed")

])

.then(result=>{

    console.log(result);

});
```

Output:

```javascript
[
 {
  status:"fulfilled"
 },

 {
  status:"rejected"
 }
]
```

---

# Promise.race()

Returns the first completed promise.

Example:

```javascript
const fast = new Promise(resolve=>{

    setTimeout(()=>{

        resolve("Fast");

    },1000);

});


const slow = new Promise(resolve=>{

    setTimeout(()=>{

        resolve("Slow");

    },3000);

});


Promise.race([fast,slow])

.then(result=>{

    console.log(result);

});
```

Output:

```
Fast
```

---

# Promise.race Flow

```
Promise A

      \
       \
        ---> race()
       /
Promise B


First completed wins
```

---

# Real Backend Usage

## API Timeout

Example:

```javascript
Promise.race([

fetch("/api/data"),

timeoutPromise

]);
```

If API takes too long:

```
Timeout wins
```

---

# Promise Methods Comparison

| Method | Purpose |
|-|-|
| Promise.all() | Wait for all, fail if one fails |
| Promise.allSettled() | Wait for all, collect all results |
| Promise.race() | First completed promise wins |
| Promise.resolve() | Create resolved promise |
| Promise.reject() | Create rejected promise |

---

# 🧠 Important Concepts

## Promise is Eager

A Promise starts executing immediately when created.

Example:

```javascript
const p = new Promise(()=>{

    console.log("Running");

});
```

Output:

```
Running
```

Even without `.then()`.

---

## .then() Runs Later

Example:

```javascript
Promise.resolve()

.then(()=>{

    console.log("Then");

});


console.log("End");
```

Output:

```
End
Then
```

Because `.then()` callbacks go to the microtask queue.

(We will study this deeply in Event Loop.)

---

# 📝 Summary

- Promise solves callback hell.
- `.then()` creates promise chains.
- `return` passes data to the next step.
- `.catch()` handles errors.
- Promise.all() handles multiple async tasks together.
- Promise.race() returns the fastest result.
- Promise.allSettled() gives every result.
- Promises are the foundation of async/await.

---

# 🎤 Interview Questions

1. What is Promise chaining?
2. Why is return important in `.then()`?
3. Difference between Promise.all() and Promise.allSettled()?
4. Difference between Promise.all() and Promise.race()?
5. Are Promises synchronous or asynchronous?
6. When does a Promise callback execute?
7. Does creating a Promise start execution immediately?

# Part 7 — Async/Await: Modern Asynchronous JavaScript

---

# 📑 Topics Covered

- Why Async/Await was introduced
- What is async?
- What is await?
- Basic Async/Await syntax
- Async functions always return Promises
- Error handling with try/catch
- Multiple await operations
- Parallel execution with Promise.all()
- Real backend examples

---

# 🤔 Why Async/Await?

Before async/await:

```javascript
getUser()

.then(user=>{

    return getOrders(user);

})

.then(orders=>{

    return getPayment(orders);

})

.then(payment=>{

    console.log(payment);

});
```

This works, but long chains become harder to read.

---

With async/await:

```javascript
const user = await getUser();

const orders = await getOrders(user);

const payment = await getPayment(orders);
```

It looks like normal synchronous code.

---

# 📖 What is async?

The `async` keyword is used before a function.

Example:

```javascript
async function greet(){

    return "Hello";

}
```

An async function always returns a Promise.

---

## Normal Function

```javascript
function test(){

    return "Hello";

}
```

Returns:

```
Hello
```

---

## Async Function

```javascript
async function test(){

    return "Hello";

}
```

Returns:

```
Promise { "Hello" }
```

---

# 💻 Example

```javascript
async function message(){

    return "Welcome";

}


message()

.then(result=>{

    console.log(result);

});
```

Output:

```
Welcome
```

Internally:

```javascript
return "Welcome";
```

becomes:

```javascript
return Promise.resolve("Welcome");
```

---

# 📖 What is await?

`await` is used to wait for a Promise to complete.

Example:

```javascript
async function getData(){

    let result = await fetchData();

    console.log(result);

}
```

Meaning:

```
Start Promise

↓

Wait for result

↓

Continue execution
```

---

# Important Rule

`await` can only be used inside an `async` function.

Correct:

```javascript
async function run(){

    await something();

}
```

Incorrect:

```javascript
await something();
```

---

# 💻 Basic Async/Await Example

```javascript
function download(){

    return new Promise(resolve=>{

        setTimeout(()=>{

            resolve("File downloaded");

        },2000);

    });

}


async function process(){

    let result = await download();

    console.log(result);

}


process();
```

Output:

```
(wait 2 seconds)

File downloaded
```

---

# Internal Flow

Code:

```javascript
let result = await download();
```

Flow:

```
Call async function

        ↓

Start Promise

        ↓

Pause async function

        ↓

Promise completes

        ↓

Resume function

        ↓

Continue execution
```

Important:

`await` does NOT block the entire JavaScript thread.

It only pauses that async function.

---

# Async/Await vs Blocking

Many beginners confuse:

```javascript
await databaseQuery();
```

with:

```
JavaScript stops completely
```

Wrong ❌

Actual:

```
Current async function pauses

        ↓

Event Loop continues working

        ↓

Other requests execute

        ↓

Promise completes

        ↓

Function resumes
```

---

# Error Handling

Promises use:

```javascript
.catch()
```

Async/await uses:

```javascript
try/catch
```

---

# Promise Style

```javascript
fetchData()

.then(data=>{

    console.log(data);

})

.catch(error=>{

    console.log(error);

});
```

---

# Async/Await Style

```javascript
async function getData(){

    try{

        let data = await fetchData();

        console.log(data);

    }

    catch(error){

        console.log(error);

    }

}
```

Cleaner.

---

# 💻 Real Example — API Request

```javascript
async function getUsers(){

    try{

        let response = await fetch(
            "https://api.example.com/users"
        );


        let users = await response.json();


        console.log(users);

    }


    catch(error){

        console.log(error);

    }

}


getUsers();
```

Flow:

```
Send Request

↓

Wait for Response

↓

Convert JSON

↓

Use Data
```

---

# 💻 Backend Example — Database

Express controller:

```javascript
app.get("/users", async(req,res)=>{

    try{

        const users = await User.find();

        res.json(users);

    }

    catch(error){

        res.status(500)
        .json({
            message:"Server Error"
        });

    }

});
```

This pattern is used in real applications.

---

# ⚠️ Multiple Await Operations

Example:

```javascript
async function dashboard(){

    const user = await getUser();

    const posts = await getPosts();

    const notifications = await getNotifications();

}
```

Execution:

```
getUser()

↓

wait

↓

getPosts()

↓

wait

↓

getNotifications()
```

Total time:

```
5 sec + 5 sec + 5 sec

= 15 seconds
```

Sometimes this is inefficient.

---

# 🚀 Running Promises Together

Use:

```javascript
Promise.all()
```

Example:

```javascript
async function dashboard(){

    const [
        user,
        posts,
        notifications
    ] = await Promise.all([

        getUser(),

        getPosts(),

        getNotifications()

    ]);

}
```

Now:

```
getUser()
getPosts()
getNotifications()

run together
```

Time:

```
Maximum task time
```

Not:

```
Sum of all times
```

---

# Async/Await vs Promise

| Promise | Async/Await |
|-|-|
| Uses `.then()` | Uses `await` |
| More chaining | Looks synchronous |
| Error with `.catch()` | Error with try/catch |
| Older style | Modern style |

---

# Common Mistakes

## Mistake 1

Using await outside async function.

Wrong:

```javascript
let data = await fetchData();
```

---

## Mistake 2

Using await unnecessarily.

Example:

```javascript
const x = await 10;
```

No Promise exists.

---

## Mistake 3

Sequential awaits when parallel execution is possible.

Bad:

```javascript
await task1();

await task2();
```

Better:

```javascript
await Promise.all([
task1(),
task2()
]);
```

---

# 📝 Summary

- `async` makes a function return a Promise.
- `await` waits for a Promise result.
- Await pauses only the async function, not JavaScript completely.
- Async/await improves readability.
- try/catch handles errors.
- Promise.all() helps execute independent tasks together.
- Async/await is the standard style in modern Node.js.

---

# 🎤 Interview Questions

1. What does async keyword do?
2. Does every async function return a Promise?
3. What does await do internally?
4. Does await block the JavaScript thread?
5. Difference between Promise and async/await?
6. How do you handle errors in async/await?
7. When should you use Promise.all() with async/await?
# Part 8 — Event Loop

---

# 📑 Topics Covered

- What is the Event Loop?
- Why Do We Need an Event Loop?
- Components Involved
- How the Event Loop Works
- Step-by-Step Execution
- Common Examples
- Common Misconceptions

---

# 🤔 What is the Event Loop?

The **Event Loop** is a mechanism that continuously checks whether the **Call Stack** is empty.

If the Call Stack is empty, it moves ready callbacks from the queue to the Call Stack for execution.

Simple definition:

> The Event Loop coordinates asynchronous tasks with the JavaScript Call Stack.

---

# 🧠 Why Do We Need an Event Loop?

Suppose we write:

```javascript
console.log("Start");

setTimeout(() => {
    console.log("Timer");
}, 2000);

console.log("End");
```

Question:

After 2 seconds,

**who tells JavaScript to execute the callback?**

Answer:

**The Event Loop.**

Without the Event Loop, completed asynchronous tasks would never execute.

---

# 🏗️ Components Involved

```
                JavaScript Code
                        │
                        ▼
                 Call Stack
                        │
──────────────────────────────────
                Runtime APIs
                        │
                        ▼
                Callback Queue
                        │
                        ▼
                  Event Loop
                        │
                        ▼
                 Call Stack
```

---

# ⚙️ How Does the Event Loop Work?

The Event Loop follows one simple rule:

```
IF Call Stack is Empty

↓

Take first callback from Queue

↓

Push it into Call Stack

↓

Execute it
```

Then it repeats forever.

---

# 💻 Example 1

```javascript
console.log("A");

setTimeout(() => {
    console.log("B");
}, 1000);

console.log("C");
```

Output:

```
A
C
B
```

---

## Step-by-Step Execution

### Step 1

```
Call Stack

↓

console.log("A")
```

Output:

```
A
```

---

### Step 2

```
setTimeout()

↓

Timer API
```

Timer starts.

Callback is **not** executed immediately.

---

### Step 3

```
console.log("C")
```

Output:

```
C
```

---

### Step 4

After 1 second:

```
Callback Queue

↓

console.log("B")
```

---

### Step 5

Event Loop checks:

```
Is Call Stack Empty?

YES
```

Move callback:

```
Callback Queue

↓

Call Stack

↓

console.log("B")
```

Output:

```
B
```

---

# 💻 Example 2

```javascript
console.log("Start");

setTimeout(() => {
    console.log("One");
}, 2000);

setTimeout(() => {
    console.log("Two");
}, 1000);

console.log("End");
```

Output:

```
Start
End
Two
One
```

The callback that becomes ready first executes first.

---

# 💻 Example 3

```javascript
console.log("1");

setTimeout(() => {
    console.log("2");
}, 0);

console.log("3");
```

Output:

```
1
3
2
```

Even though the delay is `0`, the callback still waits until:

- Current code finishes.
- Call Stack becomes empty.

---

# Visual Execution

```
Code Starts

↓

Call Stack Executes

↓

setTimeout → Runtime

↓

Remaining Code Executes

↓

Timer Completes

↓

Callback Queue

↓

Event Loop

↓

Call Stack

↓

Callback Executes
```

---

# 🌍 Real World Analogy

Imagine a restaurant.

- **Chef** → Runtime
- **Waiter** → Event Loop
- **Customers** → Callback Queue
- **Kitchen Counter** → Call Stack

Flow:

```
Customer places order

↓

Chef prepares food

↓

Food Ready

↓

Waiter checks counter

↓

Counter Empty?

↓

Serve Food
```

The waiter never interrupts someone already being served.

---

# ⚠️ Important Rules

## Rule 1

The Event Loop **never interrupts** the Call Stack.

It waits until the stack is empty.

---

## Rule 2

The Event Loop does **not execute** callbacks.

It only moves them to the Call Stack.

The JavaScript Engine executes them.

---

## Rule 3

A completed timer doesn't run immediately.

It waits until:

- Timer completes.
- Call Stack is empty.

---

# ❌ Common Misconceptions

### "setTimeout(fn, 0) executes immediately."

Wrong.

It executes **after the current synchronous code finishes**.

---

### "Event Loop executes JavaScript."

Wrong.

The Event Loop only schedules execution.

The JavaScript Engine executes the code.

---

### "The Event Loop waits for timers."

Wrong.

The Runtime manages timers.

The Event Loop only checks whether callbacks are ready to run.

---

# 📝 Summary

- The Event Loop coordinates asynchronous execution.
- It continuously checks whether the Call Stack is empty.
- It moves ready callbacks from the queue to the Call Stack.
- It never interrupts running JavaScript code.
- It is one of the core mechanisms behind JavaScript's asynchronous behavior.

---

# 🎤 Interview Questions

1. What is the Event Loop?
2. Why is the Event Loop needed?
3. Does the Event Loop execute JavaScript?
4. Why does `setTimeout(fn, 0)` execute later?
5. Can the Event Loop interrupt synchronous code?
6. What happens after a timer finishes?
# Part 9 — Microtask Queue vs Callback Queue

---

# 📑 Topics Covered

- What is a Queue?
- Callback Queue (Macrotask Queue)
- Microtask Queue
- Priority of Queues
- Promise vs setTimeout
- Multiple Examples
- Execution Flow
- Common Mistakes

---

# 🤔 What is a Queue?

A queue is a data structure that follows the **FIFO (First In, First Out)** principle.

```
Front                  Rear

Task1 → Task2 → Task3
```

The first task that enters is the first one to execute.

---

# 🗂️ JavaScript Uses Two Important Queues

```
                Runtime

          ┌───────────────┐
          │ Callback Queue│
          └───────────────┘

          ┌───────────────┐
          │ Microtask Queue│
          └───────────────┘
```

Both store callbacks waiting to execute.

The difference is **priority**.

---

# 📖 Callback Queue (Macrotask Queue)

The Callback Queue stores callbacks from APIs like:

- `setTimeout()`
- `setInterval()`
- DOM Events
- I/O operations (Node.js)

Example:

```javascript
setTimeout(() => {
    console.log("Timer");
}, 1000);
```

After the timer finishes:

```
Runtime

↓

Callback Queue

↓

Event Loop

↓

Call Stack
```

---

# 📖 Microtask Queue

The Microtask Queue stores high-priority tasks.

Examples:

- Promise `.then()`
- Promise `.catch()`
- Promise `.finally()`
- `queueMicrotask()`

Example:

```javascript
Promise.resolve()

.then(() => {
    console.log("Promise");
});
```

The callback goes into the **Microtask Queue**.

---

# 🚨 Priority Rule

Whenever the Call Stack becomes empty:

1. Execute **all Microtasks**
2. Then execute **one Callback Queue task**
3. Repeat

Visual:

```
Call Stack Empty

        ↓

Microtask Queue

        ↓

Callback Queue
```

Microtasks always have higher priority.

---

# 💻 Example 1

```javascript
console.log("Start");

setTimeout(() => {
    console.log("Timer");
}, 0);

Promise.resolve().then(() => {
    console.log("Promise");
});

console.log("End");
```

Output:

```
Start
End
Promise
Timer
```

---

# Why?

Step 1

```
Start
```

prints.

---

Step 2

Timer callback goes to:

```
Callback Queue
```

---

Step 3

Promise callback goes to:

```
Microtask Queue
```

---

Step 4

```
End
```

prints.

Call Stack becomes empty.

Event Loop checks:

```
Microtask Queue

↓

Promise
```

After all microtasks:

```
Callback Queue

↓

Timer
```

---

# Execution Diagram

```
Call Stack

↓

Empty

↓

Microtask Queue

↓

Promise

↓

Callback Queue

↓

Timer
```

---

# 💻 Example 2

```javascript
console.log("1");

Promise.resolve().then(() => {
    console.log("2");
});

Promise.resolve().then(() => {
    console.log("3");
});

console.log("4");
```

Output:

```
1
4
2
3
```

Both Promise callbacks are executed before any macrotask.

---

# 💻 Example 3

```javascript
setTimeout(() => {
    console.log("Timer 1");
}, 0);

Promise.resolve().then(() => {
    console.log("Promise 1");
});

setTimeout(() => {
    console.log("Timer 2");
}, 0);

Promise.resolve().then(() => {
    console.log("Promise 2");
});
```

Output:

```
Promise 1
Promise 2
Timer 1
Timer 2
```

Reason:

```
Microtask Queue

↓

Promise 1

↓

Promise 2

↓

Callback Queue

↓

Timer 1

↓

Timer 2
```

---

# 🌍 Real Backend Example

```javascript
app.get("/users", async (req, res) => {

    const users = await User.find();

    res.json(users);

});
```

When `User.find()` completes:

```
Promise resolves

↓

Microtask Queue

↓

Controller resumes

↓

Response sent
```

This is one reason why `async/await` feels so responsive.

---

# ⚠️ Common Mistakes

## Mistake 1

Thinking `setTimeout(..., 0)` has highest priority.

Wrong.

Promise callbacks run first.

---

## Mistake 2

Thinking Event Loop executes one microtask and then one timer.

Wrong.

The Event Loop empties the **entire Microtask Queue** before executing the next macrotask.

---

# 🧠 Remember This Rule

```
Synchronous Code

        ↓

All Microtasks

        ↓

One Macrotask

        ↓

Repeat
```

This rule explains most JavaScript output questions.

---

# 📝 Summary

- JavaScript has two important queues.
- Callback Queue stores timer, I/O, and event callbacks.
- Microtask Queue stores Promise callbacks.
- Microtasks have higher priority than macrotasks.
- The Event Loop empties the Microtask Queue before processing the Callback Queue.

---

# 🎤 Interview Questions

1. What is the difference between the Callback Queue and the Microtask Queue?
2. Which has higher priority: Promise or setTimeout?
3. Why does `Promise.then()` execute before `setTimeout(..., 0)`?
4. What kinds of tasks go into the Microtask Queue?
5. Does the Event Loop process one microtask at a time or all of them?