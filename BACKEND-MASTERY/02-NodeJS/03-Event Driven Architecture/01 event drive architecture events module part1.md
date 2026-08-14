# Node.js Event-Driven Architecture — Part 1
## Follow-Along Theory + Practical Notes

> **Learning style:** Follow the practical steps in order. Run each example yourself, observe the output, and then connect the output to the theory.
>
> **Progress:** This document covers everything completed before starting Streams.

---

# 1. What is Event-Driven Architecture?

Event-Driven Architecture (EDA) is an approach where different parts of an application communicate by reacting to **events**.

An event represents something that happened.

Examples:

```text
User registered
User logged in
File finished reading
Payment completed
Order created
Connection established
```

Instead of one piece of code directly controlling every action, it can announce:

```text
"Something happened."
```

Other parts of the application can listen for that event and react.

Basic flow:

```text
Something happens
       ↓
   Event occurs
       ↓
  Event is emitted
       ↓
   Listeners react
       ↓
Callbacks/functions execute
```

---

# 2. Why Event-Driven Architecture Matters in Node.js

Node.js is heavily based around asynchronous and event-driven programming.

We have already seen the connection while learning non-blocking operations:

```text
Start asynchronous operation
        ↓
Node continues executing other JavaScript
        ↓
Operation completes later
        ↓
Callback/event handler runs
```

Event-driven programming gives Node.js a convenient way to respond to things that happen during the lifetime of an application.

Node's built-in APIs use event-based patterns extensively.

---

# 3. Important Terminology

| Term | Meaning |
|---|---|
| Event | Something that happened |
| Event emitter | Object that produces/triggers events |
| Listener | Function waiting for a particular event |
| Emit | Trigger an event |

Basic relationship:

```text
Emitter
   ↓
emits event
   ↓
Listener
   ↓
callback executes
```

---

# 4. Node.js `events` Module

Node provides a built-in `events` module.

```javascript
const EventEmitter = require("events");
```

`EventEmitter` is a class provided by Node.js.

Create an emitter object:

```javascript
const emitter = new EventEmitter();
```

Now `emitter` can:

- Register listeners
- Emit events
- Remove listeners
- Manage multiple events

---

# 5. First EventEmitter

## Step 1 — Create an EventEmitter

```javascript
const EventEmitter = require("events");

const emitter = new EventEmitter();
```

At this point, we have an event emitter, but no events have been registered.

---

# 6. Listening for an Event — `.on()`

The `.on()` method registers a listener.

```javascript
emitter.on("greet", () => {
    console.log("Hello! Event was triggered.");
});
```

General structure:

```javascript
emitter.on("eventName", callback);
```

Meaning:

> Whenever `eventName` occurs, execute this callback.

At this point we have only **registered a listener**. Nothing happens until the event is emitted.

---

# 7. Triggering an Event — `.emit()`

Trigger the event:

```javascript
emitter.emit("greet");
```

Complete example:

```javascript
const EventEmitter = require("events");

const emitter = new EventEmitter();

emitter.on("greet", () => {
    console.log("Hello! Event was triggered.");
});

emitter.emit("greet");
```

Output:

```text
Hello! Event was triggered.
```

Flow:

```text
.on("greet")
      ↓
Listener registered
      ↓
.emit("greet")
      ↓
Listener callback executes
```

Core rule:

```text
.on()    → listen
.emit()  → trigger
```

---

# 8. Passing Data Through an Event

An event can carry data.

Listener:

```javascript
emitter.on("greet", (name) => {
    console.log(`Hello, ${name}!`);
});
```

Emit:

```javascript
emitter.emit("greet", "Harsh");
```

Complete example:

```javascript
const EventEmitter = require("events");

const emitter = new EventEmitter();

emitter.on("greet", (name) => {
    console.log(`Hello, ${name}!`);
});

emitter.emit("greet", "Harsh");
```

Output:

```text
Hello, Harsh!
```

The value supplied after the event name is passed to the listener.

```text
emit("greet", "Harsh")
              ↓
          listener
              ↓
       (name) receives
           "Harsh"
```

Multiple values can also be passed:

```javascript
emitter.emit("greet", "Harsh", 22);
```

and received:

```javascript
emitter.on("greet", (name, age) => {
    console.log(name, age);
});
```

---

# 9. Multiple Listeners for One Event

One event can have multiple listeners.

```javascript
const EventEmitter = require("events");

const emitter = new EventEmitter();

emitter.on("greet", (name) => {
    console.log(`Hello, ${name}!`);
});

emitter.on("greet", (name) => {
    console.log(`Welcome to the backend, ${name}!`);
});

emitter.emit("greet", "Harsh");
```

Output:

```text
Hello, Harsh!
Welcome to the backend, Harsh!
```

Conceptually:

```text
                  "greet"
                     ↓
          ┌──────────┴──────────┐
          ↓                     ↓
     Listener 1            Listener 2
          ↓                     ↓
       Hello                  Welcome
```

---

# 10. Listener Registration Order

We tested the order explicitly.

```javascript
const EventEmitter = require("events");

const emitter = new EventEmitter();

emitter.on("greet", (name) => {
    console.log("Listener 1:", name);
});

emitter.on("greet", (name) => {
    console.log("Listener 2:", name);
});

emitter.on("greet", (name) => {
    console.log("Listener 3:", name);
});

console.log("Before emit");

emitter.emit("greet", "Harsh");

console.log("After emit");
```

Observed output:

```text
Before emit
Listener 1: Harsh
Listener 2: Harsh
Listener 3: Harsh
After emit
```

## Important observation

Listeners execute in the order in which they were registered.

```text
Listener 1
    ↓
Listener 2
    ↓
Listener 3
```

---

# 11. Important: Event-Driven Does NOT Automatically Mean Asynchronous

This was one of our most important experiments.

We changed the listeners:

```javascript
emitter.on("greet", (name) => {
    setTimeout(() => {
        console.log("Listener 1:", name);
    }, 1000);
});

emitter.on("greet", (name) => {
    setTimeout(() => {
        console.log("Listener 2:", name);
    }, 500);
});

emitter.on("greet", (name) => {
    console.log("Listener 3:", name);
});

console.log("Before emit");

emitter.emit("greet", "Harsh");

console.log("After emit");
```

Observed output:

```text
Before emit
Listener 3: Harsh
After emit
Listener 2: Harsh
Listener 1: Harsh
```

## Why?

The listeners were invoked in registration order:

```text
Listener 1
Listener 2
Listener 3
```

But:

```text
Listener 1 → starts 1000 ms timer
Listener 2 → starts 500 ms timer
Listener 3 → prints immediately
```

Therefore the actual output became:

```text
Listener 3
After emit
Listener 2
Listener 1
```

Important distinction:

> **EventEmitter itself does not make a listener asynchronous.**

The listener can perform synchronous work or start asynchronous work.

---

# 12. Visualizing the Async Listener Example

```text
                    emit("greet")
                         │
          ┌──────────────┼──────────────┐
          ↓              ↓              ↓
      Listener 1     Listener 2     Listener 3
       timer 1s       timer 0.5s       sync
          │              │              │
          │              │              ↓
          │              │        Listener 3 output
          │              │
          │              ↓
          │        Listener 2 output
          │
          ↓
    Listener 1 output
```

This connects directly to the non-blocking concepts we learned earlier.

---

# 13. Realistic Event-Driven Example — User Registration

We created a small backend-style user-registration flow.

```javascript
const EventEmitter = require("events");

const userEvents = new EventEmitter();

userEvents.on("userRegistered", (user) => {
    console.log(`Sending welcome email to ${user.email}`);
});

userEvents.on("userRegistered", (user) => {
    console.log(`Creating profile for ${user.name}`);
});

userEvents.on("userRegistered", (user) => {
    console.log(`Logging registration of ${user.name}`);
});

const user = {
    name: "Harsh",
    email: "harsh@example.com"
};

console.log("Registering user...");

userEvents.emit("userRegistered", user);

console.log("Registration event emitted.");
```

Observed output:

```text
Registering user...
Sending welcome email to harsh@example.com
Creating profile for Harsh
Logging registration of Harsh
Registration event emitted.
```

---

# 14. What This Example Demonstrates

The registration code only needs to announce:

```javascript
userEvents.emit("userRegistered", user);
```

The individual reactions are separate listeners:

```javascript
userEvents.on("userRegistered", ...);
```

Conceptually:

```text
User registration
       ↓
"userRegistered" event
       ↓
 ┌─────┼─────────────┐
 ↓     ↓             ↓
Email Profile       Logging
```

The producer of the event does not need to contain all the reaction logic.

This reduces direct coupling between different pieces of code.

---

# 15. Making the Registration Reactions Asynchronous

We then changed the listeners:

```javascript
userEvents.on("userRegistered", (user) => {
    setTimeout(() => {
        console.log(`Sending welcome email to ${user.email}`);
    }, 1000);
});

userEvents.on("userRegistered", (user) => {
    setTimeout(() => {
        console.log(`Creating profile for ${user.name}`);
    }, 500);
});

userEvents.on("userRegistered", (user) => {
    console.log(`Logging registration of ${user.name}`);
});
```

Observed output:

```text
Registering user...
Logging registration of Harsh
Registration event emitted.
Creating profile for Harsh
Sending welcome email to harsh@example.com
```

Flow:

```text
Event emitted
    ↓
Listeners invoked
    ↓
Some listeners start async operations
    ↓
Synchronous work continues immediately
    ↓
Async work completes later
```

---

# 16. EventEmitter vs Event-Driven Architecture

These terms are related but not identical.

## EventEmitter

`EventEmitter` is a Node.js mechanism/API.

```javascript
emitter.on("login", handler);
emitter.emit("login");
```

It lets objects communicate through events.

## Event-Driven Architecture

Event-driven architecture is the larger design pattern.

```text
User registers
      ↓
userRegistered event
      ↓
 ┌────┼───────┐
 ↓    ↓       ↓
Email Profile Logging
```

So:

```text
EventEmitter = Node.js tool/mechanism
EDA          = architectural pattern
```

---

# 17. `.once()` — One-Time Listener

We learned `.once()`:

```javascript
const EventEmitter = require("events");

const emitter = new EventEmitter();

emitter.once("login", (user) => {
    console.log(`${user} logged in for the first time`);
});

emitter.emit("login", "Harsh");
emitter.emit("login", "Harsh");
emitter.emit("login", "Harsh");
```

The listener runs only on the first emission.

Conceptually:

```text
.once("login")
      ↓
First emit  → listener executes
Second emit → no execution
Third emit  → no execution
```

## `.on()` vs `.once()`

| Method | Behavior |
|---|---|
| `.on()` | Listener can run every time the event is emitted |
| `.once()` | Listener runs only once |

Possible uses for `.once()`:

- One-time initialization
- First connection
- Initial setup
- One-time configuration
- First-time events

---

# 18. Removing a Listener — `.off()`

We learned how to remove an existing listener.

```javascript
const EventEmitter = require("events");

const emitter = new EventEmitter();

function greet(name) {
    console.log(`Hello, ${name}`);
}

emitter.on("greet", greet);

emitter.emit("greet", "Harsh");

emitter.off("greet", greet);

emitter.emit("greet", "Harsh");
```

Observed output:

```text
Hello, Harsh
```

The second `emit()` produces no output because the listener was removed.

Flow:

```text
.on()
 ↓
listener registered
 ↓
.emit()
 ↓
Hello, Harsh
 ↓
.off()
 ↓
listener removed
 ↓
.emit()
 ↓
nothing
```

---

# 19. Why Do We Need the Function Reference?

Notice:

```javascript
function greet(name) {
    console.log(`Hello, ${name}`);
}

emitter.on("greet", greet);
```

Then:

```javascript
emitter.off("greet", greet);
```

We pass the same function reference.

The emitter needs to know **which listener** should be removed.

This is why keeping a named function reference is useful:

```javascript
function greet() {
    // ...
}

emitter.on("greet", greet);

emitter.off("greet", greet);
```

---

# 20. Checking Listener Count

Node allows us to check how many listeners are attached to an event.

```javascript
emitter.listenerCount("greet");
```

Example:

```javascript
const EventEmitter = require("events");

const emitter = new EventEmitter();

function greet(name) {
    console.log(`Hello, ${name}`);
}

emitter.on("greet", greet);

console.log("Listeners:", emitter.listenerCount("greet"));

emitter.emit("greet", "Harsh");

emitter.off("greet", greet);

console.log(
    "Listeners after removal:",
    emitter.listenerCount("greet")
);

emitter.emit("greet", "Harsh");
```

Observed result:

```text
Listeners: 1
Hello, Harsh
Listeners after removal: 0
```

This is useful for understanding and debugging the state of an emitter.

---

# 21. Multiple Different Events

One emitter can manage many different events.

```javascript
emitter.on("login", () => {
    console.log("User logged in");
});

emitter.on("logout", () => {
    console.log("User logged out");
});

emitter.on("purchase", () => {
    console.log("Purchase completed");
});
```

These are separate events.

If we do:

```javascript
emitter.emit("login");
```

only the `"login"` listeners are triggered.

Conceptually:

```text
                    emitter
                 /     |      \
              login  logout  purchase
                ↓       ↓        ↓
             listeners listeners listeners
```

---

# 22. Event-Driven Backend Example

A larger conceptual example:

```text
User creates account
        ↓
"userRegistered"
        ↓
 ┌──────────────┬───────────────┬───────────────┐
 ↓              ↓               ↓
Send email   Create profile   Log activity
```

The registration code doesn't necessarily need to directly call every reaction.

Instead:

```javascript
userEvents.emit("userRegistered", user);
```

Other components can subscribe.

This makes it easier to add another reaction later:

```text
"userRegistered"
       ↓
       ├── Send email
       ├── Create profile
       ├── Log activity
       └── Send analytics event
```

without putting all of that logic directly inside the registration function.

---

# 23. Connection to Our Previous Lecture

We previously learned:

```text
Blocking
↓
JavaScript waits

Non-blocking
↓
JavaScript can continue while async work is pending
```

We also demonstrated this with PBKDF2.

### `pbkdf2()`

Asynchronous:

```text
Start operation
      ↓
Continue execution
      ↓
Callback later
```

### `pbkdf2Sync()`

Synchronous:

```text
Start operation
      ↓
Wait
      ↓
Operation finishes
      ↓
Continue execution
```

Event-driven programming complements this style:

```text
Something happens
      ↓
Event
      ↓
Listener reacts
```

But remember:

> **An event listener can itself be synchronous or asynchronous.**

---

# 24. EventEmitter API Cheat Sheet

| API | Purpose |
|---|---|
| `new EventEmitter()` | Create an emitter |
| `.on(event, listener)` | Register a listener |
| `.emit(event, data)` | Trigger an event and optionally pass data |
| `.once(event, listener)` | Register a listener that runs once |
| `.off(event, listener)` | Remove a specific listener |
| `.listenerCount(event)` | Count listeners for an event |

---

# 25. Practical Progress

## Basic EventEmitter

- [x] Import `events`
- [x] Create `EventEmitter`
- [x] `.on()`
- [x] `.emit()`
- [x] Pass data through events
- [x] Multiple listeners

## Listener Behavior

- [x] Registration order
- [x] Synchronous listeners
- [x] Asynchronous listeners
- [x] `setTimeout()` inside listeners
- [x] Understand output order

## Listener Management

- [x] `.once()`
- [x] `.off()`
- [x] Function references
- [x] `.listenerCount()`

## Architecture

- [x] Event
- [x] Event producer
- [x] Event listener
- [x] Event-driven communication
- [x] User registration example
- [x] EventEmitter vs Event-Driven Architecture
- [x] Connection with non-blocking execution

---

# 26. What We Have NOT Covered Yet

We intentionally stopped before Streams.

The next practical section is:

```text
EventEmitter
     ↓
Node.js APIs that use events
     ↓
Streams
     ↓
fs.createReadStream()
     ↓
"data"
"end"
"error"
events
```

We will continue this as **Part 2** rather than mixing unfinished concepts into Part 1.

---

# 27. Final Mental Model

The most important idea from Part 1:

```text
                    EVENT-DRIVEN MODEL

                      Something happens
                            ↓
                      Event is emitted
                            ↓
                    ┌───────┴───────┐
                    ↓               ↓
                Listener 1      Listener 2
                    ↓               ↓
                 Action           Action
```

In Node.js:

```javascript
emitter.on("event", listener);
```

means:

> "When this event happens, run this function."

And:

```javascript
emitter.emit("event", data);
```

means:

> "This event has happened; notify its listeners."

The event itself does not automatically make the code asynchronous.

The listeners decide what work they perform, and that work may be synchronous or asynchronous.

That distinction is fundamental to understanding Node.js.

---

# End of Part 1

## Next

**Node's own event-driven APIs → Streams → `fs.createReadStream()` → `data`, `end`, and `error` events.**

Do not jump ahead until the EventEmitter concepts above are comfortable.
