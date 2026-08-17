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

The page initially displays:

```text
Counter

Count: 0

[Increment]
```

When the button is clicked, the count increases.

### What happens?

The event listener is registered using:

```javascript
button.addEventListener("click", () => {
```

When the user clicks the button:

```javascript
count++;
```

changes the value of `count`.

Then:

```javascript
document.querySelector("p").textContent = `Count: ${count}`;
```

finds the `<p>` element and manually updates its content.

The complete flow is:

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

# 8. Bringing React Into Our Project

We already have:

```text
01-React-fundamentals/
│
├── index.html
└── script.js
```

Now we bring React into our project using a CDN.

---

## React CDN

Open `index.html`.

We add React and ReactDOM before our own `script.js`:

```html
<script src="https://unpkg.com/react@18/umd/react.development.js"></script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>

<script src="script.js"></script>
```

The complete file becomes:

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

    <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>

    <script src="script.js"></script>

</body>
</html>
```

### Why are we loading two scripts?

We are loading:

```text
React
ReactDOM
```

For our current understanding:

```text
React
 ↓
Core React functionality

ReactDOM
 ↓
Connects React with the browser DOM
```

We will understand this distinction through practical work.

---

# 9. Verifying That React Is Loaded

Before using React, we verify that the browser has access to it.

In `script.js`:

```javascript
console.log(React);
console.log(ReactDOM);
```

Refresh the browser and open:

```text
DevTools → Console
```

We should see objects representing:

```text
React
ReactDOM
```

This proves that the CDN scripts were loaded successfully.

The loading order is important:

```text
index.html
    ↓
React CDN
    ↓
ReactDOM CDN
    ↓
script.js
```

Our `script.js` comes after React and ReactDOM, so those libraries are available when our code executes.

---

# 10. Our First React Element

Now we actually use React.

Replace `script.js` with:

```javascript
const element = React.createElement(
    "h1",
    null,
    "Hello React"
);

console.log(element);
```

Refresh the browser and inspect the console.

We see a JavaScript object.

This gives us our first important React concept:

> `React.createElement()` creates a React Element.

It does **not** directly create an HTML DOM element.

The flow is:

```text
React.createElement()
        ↓
React Element
        ↓
JavaScript Object
```

---

# 11. What Is a React Element?

Our code is:

```javascript
const element = React.createElement(
    "h1",
    null,
    "Hello React"
);
```

We are telling React:

```text
I want an h1
with no props
and "Hello React" as its content
```

The basic structure is:

```javascript
React.createElement(type, props, children);
```

Therefore:

```text
type
 ↓
"h1"

props
 ↓
null

children
 ↓
"Hello React"
```

React converts this information into an object representing the UI we want.

---

# 12. React Element vs DOM Element

This distinction is extremely important.

### DOM Element

If we write:

```javascript
const element = document.createElement("h1");
```

the browser creates an **actual DOM element**.

### React Element

If we write:

```javascript
const element = React.createElement(
    "h1",
    null,
    "Hello React"
);
```

React creates a **React Element object**.

It is a description of what should eventually be rendered.

Therefore:

```text
document.createElement()
        ↓
Actual DOM Element
```

while:

```text
React.createElement()
        ↓
React Element Object
```

These are different things.

---

# 13. Practical Comparison

Let's see both side by side.

```javascript
const domElement = document.createElement("h1");

const reactElement = React.createElement(
    "h1",
    null,
    "Hello React"
);

console.log("DOM Element:", domElement);
console.log("React Element:", reactElement);
```

The important difference is:

```text
DOM Element
    ↓
Browser DOM node

React Element
    ↓
JavaScript object describing UI
```

This distinction becomes important when we learn the Virtual DOM.

---

# 14. Inspecting the React Element Object

We created:

```javascript
const reactElement = React.createElement(
    "h1",
    null,
    "Hello React"
);

console.log(reactElement);
```

The console shows that `reactElement` is a JavaScript object.

Conceptually, it looks similar to:

```javascript
{
    $$typeof: Symbol(react.element),
    type: "h1",
    key: null,
    ref: null,
    props: {
        children: "Hello React"
    },
    ...
}
```

The exact properties displayed can vary depending on the React version.

The important properties for us are:

```text
$$typeof
type
key
ref
props
```

---

# 15. The `type` Property

Look at:

```javascript
type: "h1"
```

This tells React what type of element we want.

Our code was:

```javascript
React.createElement(
    "h1",
    null,
    "Hello React"
);
```

Therefore:

```javascript
type: "h1"
```

If we instead write:

```javascript
const element = React.createElement(
    "p",
    null,
    "Hello React"
);
```

the object will contain:

```javascript
type: "p"
```

So:

```text
React.createElement("h1", ...)
                    ↓
               type: "h1"

React.createElement("p", ...)
                    ↓
               type: "p"
```

---

# 16. The `props` Property

Now look at:

```javascript
props: {
    children: "Hello React"
}
```

`props` contains information associated with the element.

In our example, we haven't provided explicit properties such as:

```text
className
id
style
onClick
```

But `"Hello React"` is the child of our element.

Therefore React represents it inside:

```javascript
props: {
    children: "Hello React"
}
```

Our code:

```javascript
React.createElement(
    "h1",
    null,
    "Hello React"
);
```

can conceptually be understood as:

```text
type
 ↓
"h1"

props
 ↓
null

children
 ↓
"Hello React"
```

The child becomes part of the React Element's `props`.

---

# 17. Passing Props to `React.createElement()`

Let's create an element with actual props.

```javascript
const element = React.createElement(
    "h1",
    {
        id: "heading",
        className: "title"
    },
    "Hello React"
);

console.log(element);
```

Now inspect:

```javascript
element.props
```

Conceptually, it looks like:

```javascript
{
    id: "heading",
    className: "title",
    children: "Hello React"
}
```

So:

```text
React.createElement()
        ↓
React Element
        ↓
props
        ↓
id
className
children
```

This is the foundation for understanding props later when we start working with React Components.

---

# 18. The `key` Property

You may see:

```javascript
key: null
```

For now, we haven't provided a key.

Keys become important when we render lists of React elements.

We will properly study them later in the Components section.

For now:

```text
key
 ↓
Used by React to identify elements in lists
```

---

# 19. The `ref` Property

You may also see:

```javascript
ref: null
```

We haven't provided a ref, so it is currently:

```javascript
null
```

Refs are another React concept that we'll study later.

For now:

```text
ref
 ↓
Reference to a DOM element / React component
```

We don't need to use it yet.

---

# 20. The `$$typeof` Property

Now we reach one of the important points from the syllabus.

You should see something similar to:

```javascript
$$typeof: Symbol(react.element)
```

Let's inspect it directly:

```javascript
console.log(reactElement.$$typeof);
```

You should see a symbol representing a React element.

The property:

```javascript
$$typeof
```

is used by React to identify the object as a **React Element**.

Conceptually:

```text
React Element Object
        ↓
$$typeof
        ↓
Symbol(react.element)
        ↓
This object is a React Element
```

---

# 21. Why Does React Have `$$typeof`?

The `$$typeof` property also acts as a **security measure**.

React uses the special symbol to distinguish legitimate React elements from ordinary objects that merely look like React elements.

For our fundamentals, remember:

> `$$typeof` is a special property used by React to identify React Element objects and provides protection against certain types of malicious object injection.

The important idea is:

```text
$$typeof
    ↓
Identifies the object as a React Element
```

We don't need to memorize React's internal implementation.

---

# 22. React Element Is Just a Description

This is one of the most important concepts from this section.

When we write:

```javascript
const element = React.createElement(
    "h1",
    null,
    "Hello React"
);
```

React does **not** immediately give us an actual `<h1>` DOM node.

Instead, it creates an object describing what we want.

Conceptually:

```text
React.createElement()
        ↓
React Element Object
        ↓
Description of UI
```

For example:

```javascript
{
    type: "h1",
    props: {
        children: "Hello React"
    }
}
```

Conceptually, React now knows:

```text
I need an h1
        ↓
Its content is "Hello React"
```

But the browser DOM has not been modified merely because we created this object.

---

# 23. Proving That the DOM Has Not Changed

Let's test this.

```javascript
const element = React.createElement(
    "h1",
    null,
    "Hello React"
);

console.log(element);

console.log(document.getElementById("root").innerHTML);
```

The second `console.log()` should show that the root is still empty:

```text
""
```

Even though we created:

```javascript
const element = React.createElement(
    "h1",
    null,
    "Hello React"
);
```

nothing appeared on the page yet.

Why?

Because we have only created the **description**.

We haven't told React to render it into the DOM yet.

The flow is:

```text
React.createElement()
        ↓
React Element Object
        ↓
Nothing rendered yet
```

---

# 24. ReactDOM Enters the Picture

This is where the distinction between **React** and **ReactDOM** becomes important.

We have:

```text
React
 ↓
Creates/describes React Elements
```

and:

```text
ReactDOM
 ↓
Connects React with the browser DOM
```

So conceptually:

```text
React.createElement()
        ↓
React Element
        ↓
ReactDOM
        ↓
Browser DOM
```

We now use:

```javascript
ReactDOM.createRoot()
```

to connect React to:

```html
<div id="root"></div>
```

and then render our React Element.

---

# 25. Rendering a React Element

So far we have:

```text
React.createElement()
        ↓
React Element Object
```

But the object is **not yet visible on the webpage**.

We now need to connect React with the browser DOM.

That's where:

```javascript
ReactDOM.createRoot()
```

comes in.

---

# 26. Understanding `ReactDOM.createRoot()`

We already have this in `index.html`:

```html
<div id="root"></div>
```

This is the DOM element where we want React to render our application.

First, get this element:

```javascript
const rootElement = document.getElementById("root");
```

Then pass it to:

```javascript
ReactDOM.createRoot(rootElement);
```

So:

```javascript
const rootElement = document.getElementById("root");

const root = ReactDOM.createRoot(rootElement);

console.log(root);
```

`createRoot()` creates a **React root** connected to that DOM element.

Conceptually:

```text
<div id="root"></div>
        ↓
document.getElementById("root")
        ↓
ReactDOM.createRoot()
        ↓
React Root
```

---

# 27. Rendering Our React Element

Now let's actually render the element we created earlier.

Use:

```javascript
const reactElement = React.createElement(
    "h1",
    null,
    "Hello React"
);

const rootElement = document.getElementById("root");

const root = ReactDOM.createRoot(rootElement);

root.render(reactElement);
```

Refresh the browser.

You should now see:

```text
Hello React
```

on the page.

This is our first actual React rendering.

---

# 28. Understanding the Complete Flow

Let's break down exactly what happened.

### Step 1 — Create the React Element

```javascript
const reactElement = React.createElement(
    "h1",
    null,
    "Hello React"
);
```

This creates:

```text
React Element Object
```

It describes:

```text
An h1
with "Hello React"
as its content
```

---

### Step 2 — Find the DOM Container

```javascript
const rootElement = document.getElementById("root");
```

This finds:

```html
<div id="root"></div>
```

---

### Step 3 — Create a React Root

```javascript
const root = ReactDOM.createRoot(rootElement);
```

Now React is connected to that DOM container.

---

### Step 4 — Render

```javascript
root.render(reactElement);
```

React takes the React Element description and renders the corresponding UI into the root.

The overall flow is:

```text
React.createElement()
        ↓
React Element Object
        ↓
ReactDOM.createRoot()
        ↓
React Root
        ↓
root.render()
        ↓
Browser DOM
        ↓
<h1>Hello React</h1>
```

---

# 29. Let's Inspect the DOM

Open DevTools → **Elements**.

You should now see something similar to:

```html
<div id="root">
    <h1>Hello React</h1>
</div>
```

Notice the important distinction.

Before:

```javascript
React.createElement(...)
```

the DOM was still:

```html
<div id="root"></div>
```

After:

```javascript
root.render(reactElement);
```

the DOM becomes:

```html
<div id="root">
    <h1>Hello React</h1>
</div>
```

So:

```text
React.createElement()
        ↓
Creates description

root.render()
        ↓
Actually renders the description
```

---

# 30. `React.createElement()` Does Not Render

This distinction is important enough to remember.

### This:

```javascript
const element = React.createElement(
    "h1",
    null,
    "Hello React"
);
```

does:

```text
Create React Element
```

It does **not** mean:

```text
Put <h1> into the browser
```

### This:

```javascript
root.render(element);
```

actually tells React to render it.

Therefore:

```text
React.createElement()
        ↓
Description of UI

root.render()
        ↓
Render UI
```

---

# 31. One Complete Example

Let's clean up our code.

Replace `script.js` with:

```javascript
const reactElement = React.createElement(
    "h1",
    null,
    "Hello React"
);

const rootElement = document.getElementById("root");

const root = ReactDOM.createRoot(rootElement);

root.render(reactElement);
```

Our project is now doing:

```text
index.html
    ↓
Load React
    ↓
Load ReactDOM
    ↓
Load script.js
    ↓
React.createElement()
    ↓
React Element
    ↓
ReactDOM.createRoot()
    ↓
root.render()
    ↓
Browser DOM
```

---

# 32. Rendering Different Elements

Let's change:

```javascript
"h1"
```

to:

```javascript
"p"
```

and:

```javascript
"Hello React"
```

to:

```javascript
"React is working!"
```

```javascript
const reactElement = React.createElement(
    "p",
    null,
    "React is working!"
);

const rootElement = document.getElementById("root");

const root = ReactDOM.createRoot(rootElement);

root.render(reactElement);
```

The browser now displays:

```text
React is working!
```

and the DOM contains:

```html
<div id="root">
    <p>React is working!</p>
</div>
```

The React Element's:

```javascript
type
```

determines what type of UI element React should render.

---

# 33. Rendering Elements With Props

Let's use what we learned about `props`.

```javascript
const reactElement = React.createElement(
    "h1",
    {
        id: "heading",
        className: "title"
    },
    "Hello React"
);

const rootElement = document.getElementById("root");

const root = ReactDOM.createRoot(rootElement);

root.render(reactElement);
```

React will render something equivalent to:

```html
<h1 id="heading" class="title">
    Hello React
</h1>
```

Notice:

```javascript
{
    id: "heading",
    className: "title"
}
```

became attributes on the resulting DOM element.

The flow is:

```text
React Element
      ↓
type: "h1"
      +
props
      +
children
      ↓
React rendering
      ↓
DOM element
```

---

# 34. Important Concept — React Element vs DOM Element

At this point, we can clearly distinguish the two.

### React Element

Created using:

```javascript
React.createElement(...)
```

It is:

```text
A JavaScript object
describing the desired UI
```

### DOM Element

The actual element rendered in the browser DOM.

For example:

```html
<h1>Hello React</h1>
```

So:

```text
React Element
      ↓
Description
      ↓
React rendering
      ↓
DOM Element
```

This distinction is fundamental to understanding the next concept:

# Virtual DOM

We will build on this idea and understand:

- What the Virtual DOM means
- How React uses React Elements
- Why React does not simply manipulate the DOM everywhere
- What happens when UI needs to change
- How React compares UI descriptions
- Why this helps React update the browser efficiently

---

# Practical Checkpoint

Make sure your `script.js` currently works with:

```javascript
const reactElement = React.createElement(
    "h1",
    {
        id: "heading",
        className: "title"
    },
    "Hello React"
);

const rootElement = document.getElementById("root");

const root = ReactDOM.createRoot(rootElement);

root.render(reactElement);
```

Verify:

```text
Browser:

Hello React
```

And in DevTools → Elements:

```html
<div id="root">
    <h1 id="heading" class="title">Hello React</h1>
</div>
```

---

# What We Have Learned So Far

We have now learned:

- How to load React using a CDN
- How to load ReactDOM using a CDN
- How to verify that React and ReactDOM are available
- What `React.createElement()` does
- The basic structure of `React.createElement(type, props, children)`
- What a React Element is
- React Element vs DOM Element
- The `type` property
- The `props` property
- The `children` property
- The `key` property
- The `ref` property
- The `$$typeof` property
- Why `$$typeof` is important
- React Element as a description of UI
- Why `React.createElement()` alone does not modify the DOM
- What `ReactDOM.createRoot()` does
- What `root.render()` does
- How a React Element becomes a DOM element
- Rendering different element types
- Passing props while creating React Elements

---

# Current React Rendering Model

At this point, our understanding is:

```text
Data / UI Description
        ↓
React.createElement()
        ↓
React Element Object
        ↓
ReactDOM.createRoot()
        ↓
root.render()
        ↓
Browser DOM
        ↓
Visible UI
```

The next major concept is:

```text
Virtual DOM
```

We will now understand how React uses its UI descriptions to determine what needs to change when the UI is updated.