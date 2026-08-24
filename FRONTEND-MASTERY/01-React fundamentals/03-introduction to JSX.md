# Lecture 2 — Introducing JSX

---

## 1. The Problem With `React.createElement()`

We already know how to create a UI using `React.createElement()`.

For example:

```javascript
const element = React.createElement(
    "div",
    null,

    React.createElement(
        "h1",
        null,
        "Hello React"
    ),

    React.createElement(
        "p",
        null,
        "Welcome to React"
    )
);
```

Then we render the element:

```javascript
root.render(element);
```

This works.

However, look at the amount of code required for a relatively simple UI:

```html
<div>
    <h1>Hello React</h1>
    <p>Welcome to React</p>
</div>
```

We have to write multiple nested:

```javascript
React.createElement()
```

calls.

As the UI becomes larger, this becomes difficult to read and maintain.

For example:

```javascript
React.createElement(
    "div",
    null,

    React.createElement(
        "header",
        null,

        React.createElement(
            "h1",
            null,
            "My Website"
        ),

        React.createElement(
            "nav",
            null,

            React.createElement(
                "a",
                { href: "/" },
                "Home"
            ),

            React.createElement(
                "a",
                { href: "/about" },
                "About"
            )
        )
    )
);
```

The UI structure is difficult to visually understand.

We want to write something that looks much closer to the actual structure of our UI.

That is the problem JSX solves.

---

# 2. JSX

JSX allows us to write:

```jsx
const element = (
    <div>
        <h1>Hello React</h1>
        <p>Welcome to React</p>
    </div>
);
```

Then:

```javascript
root.render(element);
```

The JSX version is much easier to read.

We can immediately see the UI structure:

```text
<div>
    <h1>
    <p>
</div>
```

This is much closer to the structure that will eventually be rendered in the browser.

---

# 3. What Is JSX?

JSX stands for:

**JavaScript XML**

JSX is a syntax extension that allows us to write HTML-like syntax inside JavaScript.

For example:

```jsx
const element = <h1>Hello React</h1>;
```

This looks similar to HTML:

```html
<h1>Hello React</h1>
```

but it is being written inside JavaScript.

The important point is:

> JSX is not HTML.

JSX is also not directly understood by the JavaScript engine in this form.

It needs to be transformed into JavaScript.

The basic idea is:

```text
JSX
 ↓
Transformation
 ↓
JavaScript
 ↓
React Element
```

---

# 4. JSX Is Transformed Into JavaScript

Consider:

```jsx
const element = <h1>Hello React</h1>;
```

Conceptually, this gets transformed into something equivalent to:

```javascript
const element = React.createElement(
    "h1",
    null,
    "Hello React"
);
```

So:

```text
JSX
 ↓
Transformation
 ↓
JavaScript
 ↓
React Element
```

This is why we can write JSX while React ultimately works with JavaScript representations of the UI.

The main benefit is that **we write the UI in a much cleaner syntax**, while the JSX transformation produces the JavaScript representation that React can work with.

---

# 5. Introducing Babel

The tool commonly used to transform JSX is **Babel**.

Babel is a JavaScript compiler/transcompiler that can transform modern JavaScript syntax and JSX into JavaScript that can be executed by the environment.

For our React example:

```jsx
<h1>Hello React</h1>
```

Babel transforms the JSX syntax into JavaScript.

Conceptually:

```text
<h1>Hello React</h1>
        ↓
      Babel
        ↓
React.createElement(
    "h1",
    null,
    "Hello React"
)
```

So Babel acts as a transformation step between the JSX we write and the JavaScript that React can execute.

---

# 6. Why Do We Need Babel?

The browser understands JavaScript.

For example:

```javascript
const name = "Harsh";

console.log(name);
```

But JSX:

```jsx
const element = <h1>Hello React</h1>;
```

is not normal JavaScript syntax that the browser can directly execute in this form.

Therefore, we need a transformation step:

```text
JSX source code
       ↓
     Babel
       ↓
JavaScript
       ↓
Browser / React
```

The important idea is:

```text
We write JSX
     ↓
Babel transforms JSX
     ↓
JavaScript is produced
     ↓
React can work with it
```

---

# 7. JSX With Our Existing Project

Our current project has something similar to:

```text
01-React-fundamentals/
│
├── index.html
└── script.js
```

Previously, `script.js` contained:

```javascript
const rootElement = document.getElementById("root");

const root = ReactDOM.createRoot(rootElement);

const element = React.createElement(
    "h1",
    null,
    "Hello React"
);

root.render(element);
```

Now we want to write:

```jsx
const element = <h1>Hello React</h1>;

root.render(element);
```

This is much easier to read.

However, if we simply put JSX into a normal JavaScript file and load it directly, the browser cannot execute the JSX syntax by itself.

So we need Babel.

---

# 8. Babel CDN

For our initial learning setup, we can use Babel through a CDN.

In `index.html`, add Babel:

```html
<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
```

Previously, we would load our JavaScript file like this:

```html
<script src="script.js"></script>
```

Instead, we tell Babel to process the script containing JSX:

```html
<script type="text/babel" src="script.js"></script>
```

So our basic HTML becomes:

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

    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>

    <script type="text/babel" src="script.js"></script>

</body>
</html>
```

Now Babel knows that `script.js` contains JSX.

---

# 9. Our First JSX Practical

Now replace the contents of `script.js` with:

```jsx
const rootElement = document.getElementById("root");

const root = ReactDOM.createRoot(rootElement);

const element = (
    <div>
        <h1>Hello React</h1>
        <p>Welcome to React Fundamentals</p>
    </div>
);

root.render(element);
```

Run the application through the local server.

You should see:

```text
Hello React

Welcome to React Fundamentals
```

The important change is that instead of writing:

```javascript
React.createElement(
    "div",
    null,
    ...
);
```

we can now write:

```jsx
<div>
    ...
</div>
```

---

# 10. JSX and JavaScript

JSX can exist inside JavaScript.

For example:

```jsx
const name = "Harsh";

const element = (
    <h1>Hello {name}</h1>
);
```

The `{}` allows us to insert JavaScript expressions into JSX.

The result is:

```text
Hello Harsh
```

This is extremely important.

JSX:

```jsx
<h1>Hello {name}</h1>
```

contains JavaScript:

```javascript
{name}
```

The value of the JavaScript expression is inserted into the JSX.

---

# 11. JSX Expressions

Let's try a slightly different example.

```jsx
const a = 10;
const b = 20;

const element = (
    <h1>
        Sum = {a + b}
    </h1>
);
```

The result is:

```text
Sum = 30
```

We can use JavaScript expressions inside `{}`.

For example:

```jsx
<h1>{10 + 20}</h1>
```

We can use variables:

```jsx
<h1>{name}</h1>
```

We can access object properties:

```jsx
<h1>{user.name}</h1>
```

We can perform calculations:

```jsx
<h1>{count * 2}</h1>
```

The important rule is:

```text
{ JavaScript expression }
```

For example:

```jsx
<h1>{name}</h1>
```

or:

```jsx
<p>{price * quantity}</p>
```

---

# 12. JSX Is Not a String

This:

```jsx
const element = (
    <h1>Hello React</h1>
);
```

does **not** mean:

```javascript
const element = "<h1>Hello React</h1>";
```

These are completely different.

The first:

```jsx
const element = (
    <h1>Hello React</h1>
);
```

contains JSX.

After transformation, it becomes JavaScript that creates a React Element.

The second:

```javascript
const element = "<h1>Hello React</h1>";
```

creates a normal JavaScript string.

So the conceptual flow is:

```text
JSX
 ↓
Babel
 ↓
JavaScript
 ↓
React Element
```

Not:

```text
JSX
 ↓
HTML string
```

This distinction is important.

JSX is a syntax for describing UI in JavaScript.

---

# 13. JSX and `React.createElement()`

Let's compare both approaches.

## Without JSX

```javascript
const element = React.createElement(
    "div",
    null,

    React.createElement(
        "h1",
        null,
        "Hello React"
    ),

    React.createElement(
        "p",
        null,
        "Welcome"
    )
);
```

## With JSX

```jsx
const element = (
    <div>
        <h1>Hello React</h1>
        <p>Welcome</p>
    </div>
);
```

Both describe the same UI structure.

The JSX version is much easier to read.

This is the main reason JSX is useful.

Instead of manually constructing deeply nested `React.createElement()` calls, we can describe the UI using a syntax that visually resembles the UI structure.

---

# 14. JSX Attributes

JSX also allows attributes.

For example:

```jsx
const element = (
    <img
        src="profile.jpg"
        alt="Profile"
    />
);
```

We can also write:

```jsx
const element = (
    <button
        id="submit"
        className="primary-button"
    >
        Submit
    </button>
);
```

Notice:

```jsx
className
```

instead of:

```html
class
```

In JSX, many attributes follow JavaScript naming conventions.

For example:

```jsx
className
```

is used when specifying the CSS class.

---

# 15. JSX and JavaScript Expressions in Attributes

We can also use JavaScript expressions inside attributes.

For example:

```jsx
const imageUrl = "profile.jpg";

const element = (
    <img
        src={imageUrl}
        alt="Profile"
    />
);
```

Here:

```jsx
src={imageUrl}
```

means:

```text
Take the value of the JavaScript variable imageUrl
and use it as the src value.
```

For example, if:

```javascript
const imageUrl = "profile.jpg";
```

then:

```jsx
<img src={imageUrl} />
```

uses:

```text
profile.jpg
```

as the image source.

The same idea applies to other attributes.

For example:

```jsx
const buttonId = "submit-button";

const element = (
    <button id={buttonId}>
        Submit
    </button>
);
```

---

# 16. JSX Must Have One Parent

Consider:

```jsx
const element = (
    <h1>Hello</h1>
    <p>Welcome</p>
);
```

This is invalid JSX because there are two sibling elements at the top level.

We need one parent:

```jsx
const element = (
    <div>
        <h1>Hello</h1>
        <p>Welcome</p>
    </div>
);
```

Now there is one root element:

```text
<div>
    ├── <h1>
    └── <p>
</div>
```

The `<div>` acts as the parent.

We will later learn about **React Fragments**, which allow us to group elements without adding an extra DOM element.

For now, remember:

```text
One JSX expression
        ↓
One root element
```

---

# 17. JSX Closing Tags

HTML sometimes allows certain tags to be written without closing tags.

In JSX, elements must follow JSX's syntax rules.

For example:

```jsx
<img src="profile.jpg" />
```

and:

```jsx
<input type="text" />
```

The `/` closes the element.

These are called self-closing elements.

For elements containing children, we use an opening and closing tag:

```jsx
<div>
    Hello
</div>
```

Similarly:

```jsx
<button>
    Submit
</button>
```

So remember:

```jsx
<img />
```

but:

```jsx
<div>
    Content
</div>
```

---

# 18. JSX Comments

Normal JavaScript comments can be written as:

```javascript
// This is a comment
```

However, when we are inside JSX, comments need to be placed inside `{}`.

For example:

```jsx
const element = (
    <div>
        {/* This is a JSX comment */}

        <h1>Hello React</h1>
    </div>
);
```

The JSX comment syntax is:

```jsx
{/* comment */}
```

For example:

```jsx
const element = (
    <div>

        {/* User information */}
        <h1>Harsh</h1>

        {/* User description */}
        <p>Frontend Developer</p>

    </div>
);
```

The comments will not be rendered as visible UI.

---

# Practical — Put Everything Together

Now let's combine the concepts we have learned.

Create:

```text
01-React-fundamentals/
│
├── index.html
└── script.js
```

Our `index.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>

    <meta charset="UTF-8">

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
    >

    <title>React Fundamentals</title>

</head>

<body>

    <div id="root"></div>

    <script src="https://unpkg.com/react@18/umd/react.development.js"></script>

    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>

    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>

    <script
        type="text/babel"
        src="script.js"
    ></script>

</body>
</html>
```

Now create our `script.js`:

```jsx
const rootElement = document.getElementById("root");

const root = ReactDOM.createRoot(rootElement);

const name = "Harsh";

const imageUrl = "profile.jpg";

const element = (
    <div>

        {/* Main heading */}
        <h1>Hello {name}</h1>

        {/* Description */}
        <p>
            Welcome to React Fundamentals
        </p>

        {/* Profile image */}
        <img
            src={imageUrl}
            alt="Profile"
        />

        {/* Button */}
        <button
            id="submit"
            className="primary-button"
        >
            Continue
        </button>

    </div>
);

root.render(element);
```

Now run the project through the local development server.

---

# What We Learned

The progression of this lecture is:

```text
React.createElement()
        ↓
Problem: deeply nested and difficult to read
        ↓
JSX
        ↓
HTML-like syntax inside JavaScript
        ↓
Babel
        ↓
JSX transformed into JavaScript
        ↓
React Elements
```

We also learned:

```text
JSX expressions
        ↓
{ JavaScript expression }
```

For example:

```jsx
<h1>{name}</h1>
```

We learned JSX attributes:

```jsx
<img src={imageUrl} />
```

We learned that JSX is not HTML:

```text
JSX ≠ HTML
```

We learned that JSX is not a string:

```text
JSX ≠ HTML string
```

We learned that JSX normally needs one root element:

```jsx
<div>
    <h1>Hello</h1>
    <p>Welcome</p>
</div>
```

We learned self-closing JSX elements:

```jsx
<img />
<input />
```

And we learned JSX comments:

```jsx
{/* Comment */}
```

---

# Mental Model

At this point, keep this flow clear:

```text
We write JSX
      ↓
Babel transforms JSX
      ↓
JavaScript
      ↓
React.createElement() / React JSX runtime representation
      ↓
React Element
      ↓
React renders the UI
```

The reason we use JSX is primarily **developer readability and convenience**.

Instead of writing:

```javascript
React.createElement(
    "div",
    null,

    React.createElement(
        "h1",
        null,
        "Hello React"
    ),

    React.createElement(
        "p",
        null,
        "Welcome"
    )
);
```

we can write:

```jsx
<div>
    <h1>Hello React</h1>
    <p>Welcome</p>
</div>
```

Both describe the UI, but JSX is much easier to work with.

---
