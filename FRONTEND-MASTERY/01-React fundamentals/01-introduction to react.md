# Frontend Mastery — React Fundamentals

## Lecture 1 — Introduction to React

---

## 1. Dynamic Rendering

### What is Dynamic Rendering?

Dynamic rendering means generating or updating the UI based on changing data.

For example:

```javascript
const name = "Harsh";
```

We can use this data to dynamically generate:

```html
<h1>Hello Harsh</h1>
```

If the data changes:

```javascript
const name = "Rahul";
```

the UI should become:

```html
<h1>Hello Rahul</h1>
```

The important idea is:

```text
Data
 ↓
UI
```

When data changes, the UI needs to reflect that change.

---

## 2. Dynamic Rendering Using Plain JavaScript

We first implemented dynamic rendering without React.

### `index.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>React Fundamentals</title>
</head>
<body>

    <div id="root"></div>

    <script src="script.js"></script>

</body>
</html>
```

### `script.js`

```javascript
const root = document.getElementById("root");

const name = "Harsh";

root.innerHTML = `<h1>Hello ${name}</h1>`;
```

### What happens?

First:

```javascript
const root = document.getElementById("root");
```

finds this element:

```html
<div id="root"></div>
```

Then:

```javascript
root.innerHTML = `<h1>Hello ${name}</h1>`;
```

modifies the DOM.

The browser effectively gets:

```html
<div id="root">
    <h1>Hello Harsh</h1>
</div>
```

---

## 3. Updating Dynamic Data

We then created a counter.

```javascript
const root = document.getElementById("root");

let count = 0;

root.innerHTML = `<h1>Count: ${count}</h1>`;

count++;

root.innerHTML = `<h1>Count: ${count}</h1>`;
```

The important observation was:

Changing:

```javascript
count++;
```

does **not automatically update the UI**.

We have to explicitly modify the DOM again:

```javascript
root.innerHTML = `<h1>Count: ${count}</h1>`;
```

The flow is:

```text
JavaScript variable changes
        ↓
Variable value changes
        ↓
UI does NOT automatically change
        ↓
DOM must be updated manually
```

---

## 4. Interactive Counter Using Plain JavaScript

We then created an actual interactive counter.

```javascript
const root = document.getElementById("root");

let count = 0;

root.innerHTML = `
    <h1>Counter</h1>
    <p>Count: ${count}</p>
    <button id="increment">Increment</button>
`;

const button = document.getElementById("increment");

button.addEventListener("click", () => {
    count++;

    document.querySelector("p").textContent = `Count: ${count}`;
});
```

The flow is:

```text
User clicks button
       ↓
Event handler executes
       ↓
count changes
       ↓
We manually find the DOM element
       ↓
We manually update the DOM
```

### What happens when the button is clicked?

The event listener:

```javascript
button.addEventListener("click", () => {
```

waits for the user to click the button.

When the button is clicked:

```javascript
count++;
```

changes the value of `count`.

Then:

```javascript
document.querySelector("p").textContent = `Count: ${count}`;
```

finds the `<p>` element and manually updates its content.

---

## 5. The Problem With Manual DOM Updates

For a small application, manually updating the DOM is manageable.

Our counter is simple:

- One piece of changing data
- One button
- One paragraph
- One DOM update

But as the application becomes larger, we may have:

- Hundreds of UI elements
- Many pieces of changing data
- Multiple event handlers
- Elements depending on different pieces of state
- Many DOM updates

We would have to manually keep track of:

```text
What data changed?
        ↓
Which UI depends on it?
        ↓
Which DOM element represents that UI?
        ↓
How should that DOM element be updated?
```

This makes UI management increasingly complicated.

This is one of the problems React helps us solve.

---

## 6. Core Idea Behind React

React is a **JavaScript library for building user interfaces**.

A fundamental React idea is:

> Describe what the UI should look like based on the current data, and React manages the necessary DOM updates.

Conceptually:

```text
State / Data
     ↓
React rendering
     ↓
UI description
     ↓
DOM updates
```

Instead of manually writing DOM manipulation logic everywhere, we describe the UI.

React then manages the process of bringing the UI in the browser in line with that description.

### Plain JavaScript

With plain JavaScript, we manually handle:

```text
Data changes
     ↓
Find affected DOM element
     ↓
Modify DOM element
```

### React

With React, we describe the UI according to the current data:

```text
Data / State
     ↓
React
     ↓
UI description
     ↓
React manages DOM updates
```

---

## 7. Running the Project Using a Local Server

Initially, we opened `index.html` directly using:

```text
file://
```

The browser showed a security warning related to `file://` URLs.

We therefore ran the project using a local development server.

### Start the Local Server

From the project directory, run:

```bash
npx serve .
```

This gives us a local URL such as:

```text
http://localhost:3000
```

We then accessed the application through the local server.

### Why use a local server?

When we open the HTML file directly, the browser uses:

```text
file:///
```

When we use the local development server, the browser uses:

```text
http://localhost:3000
```

A local HTTP server gives the application a proper HTTP origin.

This becomes especially important when working with modern JavaScript tooling and React.

---


---

## What We Have Learned So Far

We have covered:

- Dynamic rendering
- Using data to generate UI
- The DOM
- `document.getElementById()`
- `innerHTML`
- Updating the DOM manually
- Why changing a JavaScript variable does not automatically update the UI
- Event handling using `addEventListener()`
- Building an interactive counter using plain JavaScript
- The problem with manually managing DOM updates
- The basic idea behind React
- React as a JavaScript library for building user interfaces
- Why React helps manage UI updates
- Running a project through a local development server
- Why `file://` is different from `http://localhost`

---
