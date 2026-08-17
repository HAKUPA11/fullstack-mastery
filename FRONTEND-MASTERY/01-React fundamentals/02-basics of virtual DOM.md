# Frontend Mastery — React Fundamentals

## Lecture 1 — Introduction to React

---

# 35. React Re-rendering — Our First Practical

Until now, we created a React Element and rendered it:

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

The important limitation is that this only renders once.

We now want:

```text
Click button
     ↓
Data changes
     ↓
UI should change
```

Let's build that ourselves before introducing `useState`.

---

# 36. Building an Interactive React UI

Replace `script.js` with:

```javascript
const rootElement = document.getElementById("root");

const root = ReactDOM.createRoot(rootElement);

let count = 0;

function render() {
    const element = React.createElement(
        "div",
        null,

        React.createElement(
            "h1",
            null,
            "React Counter"
        ),

        React.createElement(
            "p",
            null,
            `Count: ${count}`
        ),

        React.createElement(
            "button",
            {
                onClick: () => {
                    count++;
                    render();
                }
            },
            "Increment"
        )
    );

    root.render(element);
}

render();
```

Refresh the browser.

You should see:

```text
React Counter

Count: 0

[Increment]
```

Click the button.

You should see:

```text
React Counter

Count: 1

[Increment]
```

Click again:

```text
Count: 2
```

And so on.

---

# 37. Understand the Code Carefully

Let's break it down.

We start with:

```javascript
let count = 0;
```

This is an ordinary JavaScript variable.

It is **not React state**.

Then we have:

```javascript
function render() {
```

Every time `render()` executes, we create a new React Element.

Inside it:

```javascript
const element = React.createElement(
    "div",
    null,
```

creates the outer `<div>`.

Then:

```javascript
React.createElement(
    "h1",
    null,
    "React Counter"
)
```

creates the heading.

Then:

```javascript
React.createElement(
    "p",
    null,
    `Count: ${count}`
)
```

creates the paragraph.

The important part is:

```javascript
`Count: ${count}`
```

If:

```javascript
count = 0;
```

the new React Element describes:

```text
Count: 0
```

If:

```javascript
count = 1;
```

it describes:

```text
Count: 1
```

---

# 38. The Button Event

Our button contains:

```javascript
{
    onClick: () => {
        count++;
        render();
    }
}
```

When the user clicks:

```text
Click
 ↓
onClick executes
 ↓
count++
 ↓
render()
```

Suppose:

```text
count = 0
```

After clicking:

```text
count = 1
```

Then:

```javascript
render();
```

runs again.

---

# 39. What Does the Second `render()` Do?

This is the important part.

The first time:

```javascript
render();
```

runs:

```text
count = 0
     ↓
React.createElement(...)
     ↓
React Element describing "Count: 0"
     ↓
root.render(...)
     ↓
UI
```

After clicking:

```text
count = 1
     ↓
render()
     ↓
React.createElement(...)
     ↓
React Element describing "Count: 1"
     ↓
root.render(...)
     ↓
UI
```

So we're creating a **new UI description**.

Conceptually:

```text
Previous React Element
        ↓
Count: 0

New React Element
        ↓
Count: 1
```

React now has to determine what changed.

---

# 40. Re-rendering

The execution of:

```javascript
render();
```

creates the new UI description and calls:

```javascript
root.render(element);
```

again.

This is a **re-render**.

The important sequence is:

```text
Data changes
     ↓
render() executes again
     ↓
New React Element is created
     ↓
root.render() receives the new element
     ↓
React processes the new UI
```

At this stage, we are manually causing the re-render.

Later, `useState` will give React a proper state mechanism that schedules re-renders for us.

---

# 41. Previous UI vs New UI

Let's make the change explicit.

### First render

```javascript
count = 0;
```

React receives a description equivalent to:

```text
<div>
    <h1>React Counter</h1>
    <p>Count: 0</p>
    <button>Increment</button>
</div>
```

After clicking:

```javascript
count++;
```

we get:

```javascript
count = 1;
```

The next render describes:

```text
<div>
    <h1>React Counter</h1>
    <p>Count: 1</p>
    <button>Increment</button>
</div>
```

Now compare them:

```text
Previous                         New

<div>                            <div>
  <h1>React Counter</h1>           <h1>React Counter</h1>
  <p>Count: 0</p>                  <p>Count: 1</p>
  <button>Increment</button>       <button>Increment</button>
</div>                            </div>
```

Only the paragraph's content changed.

---

# 42. Reconciliation

React needs to determine the differences between the previous UI and the new UI.

This process is called **reconciliation**.

Conceptually:

```text
Previous UI
     +
New UI
     ↓
Reconciliation
     ↓
Determine what changed
     ↓
Update the necessary DOM
```

In our example:

```text
<h1>React Counter</h1>
```

didn't change.

```text
<button>Increment</button>
```

didn't change.

Only:

```text
Count: 0
```

became:

```text
Count: 1
```

So React can update the relevant part of the rendered UI.

---

# 43. Where Does the Virtual DOM Fit?

Now we can properly introduce the Virtual DOM concept.

We have already seen that:

```javascript
React.createElement(...)
```

produces a JavaScript object.

That object represents the UI we want.

For example:

```javascript
React.createElement(
    "p",
    null,
    "Count: 1"
);
```

produces a React Element describing:

```text
<p>Count: 1</p>
```

React works with these in-memory UI representations before applying the necessary changes to the actual browser DOM.

This is what we refer to when discussing React's **Virtual DOM**.

---

# 44. Virtual DOM vs Real DOM

It is important not to think of the Virtual DOM as:

```text
A second browser DOM
```

It isn't.

## Real DOM

The browser owns the actual DOM:

```text
Browser
   ↓
Real DOM
   ↓
Actual HTML elements
```

Example:

```html
<p>Count: 1</p>
```

## React's Virtual DOM Concept

React works with an in-memory representation of the UI:

```text
React
   ↓
React Elements / UI representation
```

So conceptually:

```text
React Element
      ↓
UI representation
      ↓
Reconciliation
      ↓
Real DOM updates
```

---

# 45. Why Is This Useful?

Suppose our UI contains:

```text
Header
Navigation
Main content
Sidebar
Footer
```

and only one piece of data changes.

For example:

```text
Count: 10
     ↓
Count: 11
```

React doesn't need to conceptually treat the entire page as changed.

It can determine that the relevant part of the UI changed.

The idea is:

```text
Previous UI representation
          ↓
        compare
          ↑
New UI representation
          ↓
Determine necessary changes
          ↓
Update DOM
```

This process is part of React's reconciliation and rendering system.

---

# 46. Important: We Are NOT Using React State Yet

Our current code uses:

```javascript
let count = 0;
```

This is important.

It is just JavaScript.

When it changes:

```javascript
count++;
```

React doesn't automatically know that it changed.

That's why we explicitly do:

```javascript
render();
```

So our current flow is:

```text
JavaScript variable changes
        ↓
We manually call render()
        ↓
New React Element
        ↓
root.render()
        ↓
React processes new UI
```

This is deliberately being done **before `useState`** so we can understand why React state is necessary.

---

# 47. What Would Happen Without `render()`?

Try changing the button to:

```javascript
{
    onClick: () => {
        count++;
    }
}
```

Notice that we removed:

```javascript
render();
```

So now:

```javascript
onClick: () => {
    count++;
}
```

Click the button.

The variable changes:

```text
count: 0
   ↓
count: 1
```

But the screen remains:

```text
Count: 0
```

Why?

Because changing a normal JavaScript variable does not automatically cause React to render again.

This demonstrates the problem clearly:

```text
count changes
     ↓
React isn't notified
     ↓
No new UI render
     ↓
Screen remains unchanged
```

Now restore:

```javascript
render();
```

and the UI works again.

---

# 48. Why We Eventually Need `useState`

Our current approach works:

```javascript
count++;
render();
```

But imagine a large React application.

We don't want to manually do:

```javascript
render();
```

every time some piece of UI data changes.

React provides:

```javascript
useState()
```

which allows React to manage component state and schedule the appropriate re-render when state changes.

We'll learn this properly in Lectures 7–10.

For now, remember the progression:

```text
Plain JavaScript
     ↓
Variable changes
     ↓
Manual DOM update
```

Then:

```text
React without state
     ↓
Variable changes
     ↓
Manual render()
```

Eventually:

```text
React state
     ↓
State setter
     ↓
React schedules re-render
     ↓
New UI
```

---

# 49. Practical Experiment — Change Multiple Values

Let's modify our example.

```javascript
const rootElement = document.getElementById("root");

const root = ReactDOM.createRoot(rootElement);

let count = 0;
let name = "Harsh";

function render() {
    const element = React.createElement(
        "div",
        null,

        React.createElement(
            "h1",
            null,
            `Hello ${name}`
        ),

        React.createElement(
            "p",
            null,
            `Count: ${count}`
        ),

        React.createElement(
            "button",
            {
                onClick: () => {
                    count++;
                    render();
                }
            },
            "Increment"
        )
    );

    root.render(element);
}

render();
```

Initially:

```text
Hello Harsh

Count: 0

[Increment]
```

Click the button:

```text
Hello Harsh

Count: 1

[Increment]
```

Only `count` changes.

---

# 50. Change the Data Before Rendering

Now add:

```javascript
name = "React";
render();
```

The new UI becomes:

```text
Hello React

Count: 0
```

Again, the flow is:

```text
Data changes
     ↓
render()
     ↓
New React Elements
     ↓
New UI description
     ↓
Reconciliation
     ↓
Required DOM update
```

---

# 51. Important Mental Model

At this stage, think about React like this:

```text
                  DATA
                   ↓
             UI description
                   ↓
            React Elements
                   ↓
              Rendering
                   ↓
             Reconciliation
                   ↓
             Browser DOM
```

When the data changes:

```text
New data
   ↓
New UI description
   ↓
React compares old/new UI
   ↓
Determines changes
   ↓
Updates DOM
```

---

# 52. Lecture 1 — What We Have Covered

We have now covered the major concepts from the first lecture:

```text
Dynamic Rendering
       ↓
Manual DOM rendering
       ↓
Problem with manual DOM manipulation
       ↓
React
       ↓
React CDN
       ↓
React.createElement()
       ↓
React Element
       ↓
React Element object representation
       ↓
type
props
key
ref
$$typeof
       ↓
ReactDOM.createRoot()
       ↓
root.render()
       ↓
Re-rendering
       ↓
Virtual DOM concept
       ↓
Reconciliation
```

The remaining important part is to understand **why React's approach is useful compared with manually managing every DOM update**.

Our practical has already demonstrated the core idea.

---

# 53. Final React Fundamentals Practical

Keep this version as our final practical for this section:

```javascript
const rootElement = document.getElementById("root");

const root = ReactDOM.createRoot(rootElement);

let count = 0;

function render() {
    const element = React.createElement(
        "div",
        null,

        React.createElement(
            "h1",
            null,
            "React Counter"
        ),

        React.createElement(
            "p",
            null,
            `Count: ${count}`
        ),

        React.createElement(
            "button",
            {
                onClick: () => {
                    count++;
                    render();
                }
            },
            "Increment"
        )
    );

    root.render(element);
}

render();
```

The complete flow is:

```text
Browser loads application
        ↓
React + ReactDOM loaded
        ↓
createRoot()
        ↓
render()
        ↓
React Element created
        ↓
UI rendered
        ↓
User clicks button
        ↓
count++
        ↓
render()
        ↓
New React Element created
        ↓
React reconciles old and new UI
        ↓
Required DOM update
        ↓
User sees new count
```

---

# End of This Section

At this point, the important foundation is:

```text
React.createElement()
        ↓
React Element
        ↓
UI description
        ↓
React rendering
        ↓
Re-rendering
        ↓
Reconciliation
        ↓
DOM updates
```

We deliberately used a normal JavaScript variable first:

```javascript
let count = 0;
```

and manually triggered rendering:

```javascript
count++;
render();
```

because we will later replace this approach with React state:

```javascript
const [count, setCount] = useState(0);
```

That will allow us to understand **why `useState` exists**, rather than simply memorizing its syntax.

---

# Next Topic

## Lecture 2 — JSX

We now move from writing:

```javascript
React.createElement(
    "div",
    null,
    React.createElement(
        "h1",
        null,
        "Hello"
    ),
    React.createElement(
        "p",
        null,
        "Welcome"
    )
);
```

to writing:

```jsx
<div>
    <h1>Hello</h1>
    <p>Welcome</p>
</div>
```

We will learn:

```text
JSX
 ↓
Why JSX exists
 ↓
Babel
 ↓
JSX → JavaScript
 ↓
React Components
 ↓
React Component vs React Element
 ↓
Props
 ↓
Reusable Components
```