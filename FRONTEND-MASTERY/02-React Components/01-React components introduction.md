# React Components, Component Nesting and Props

---

## 19. Introducing React Components

So far we've created React Elements directly:

```jsx
const element = (
    <h1>Hello React</h1>
);
```

But real applications contain many UI sections.

For example:

```text
Website
│
├── Header
├── Navigation
├── Main Content
├── Sidebar
└── Footer
```

We don't want one giant piece of JSX.

Instead, React allows us to break the UI into **components**.

---

# 20. What Is a React Component?

A React component is a reusable piece of UI.

A component can be created using a JavaScript function.

Example:

```jsx
function Header() {
    return (
        <h1>My Website</h1>
    );
}
```

This function is a React component.

It describes the UI for the header.

---

# 21. Using a Component

We can use the component inside JSX:

```jsx
function Header() {
    return (
        <h1>My Website</h1>
    );
}

const element = (
    <div>
        <Header />
    </div>
);
```

Then:

```jsx
root.render(element);
```

React renders:

```text
My Website
```

The important thing to notice is that we use:

```jsx
<Header />
```

to use the component.

---

# 22. Component Naming

React components should start with an uppercase letter.

Correct:

```jsx
function Header() {
    return <h1>My Website</h1>;
}
```

Use:

```jsx
<Header />
```

Not:

```jsx
<header />
```

Lowercase JSX tags are interpreted as HTML/DOM elements.

Uppercase names indicate React components.

So:

```jsx
<Header />
```

means:

```text
Use the React component named Header
```

while:

```jsx
<header />
```

is interpreted as a DOM element.

---

# 23. Component vs Element

This distinction is important.

### React Element

Example:

```jsx
<h1>Hello React</h1>
```

This describes a UI element.

### React Component

Example:

```jsx
function Header() {
    return <h1>Hello React</h1>;
}
```

This is a reusable function that returns UI.

So:

```text
Component
    ↓
Returns
    ↓
React Element(s)
```

For example:

```jsx
function Header() {
    return <h1>Hello React</h1>;
}
```

The component is:

```text
Header
```

The returned React Element is:

```jsx
<h1>Hello React</h1>
```

The important distinction is:

```text
Component = reusable UI logic/function

Element = description of what should be rendered
```

---

# 24. Components Promote Reusability

Suppose we need the same button in multiple places.

Instead of repeating:

```jsx
<button>Login</button>
```

everywhere, we can create:

```jsx
function Button() {
    return (
        <button>Login</button>
    );
}
```

Then use:

```jsx
<Button />
```

multiple times.

For example:

```jsx
const element = (
    <div>
        <Button />
        <Button />
        <Button />
    </div>
);
```

This is one of the major benefits of components.

We define the UI once:

```jsx
function Button() {
    return (
        <button>Login</button>
    );
}
```

and reuse it wherever required:

```jsx
<Button />
<Button />
<Button />
```

---

# 25. Component Nesting

Components can contain other components.

Example:

```jsx
function Header() {
    return (
        <header>
            <h1>My Website</h1>
        </header>
    );
}

function App() {
    return (
        <div>
            <Header />

            <main>
                <h2>Welcome</h2>
            </main>
        </div>
    );
}
```

The structure becomes:

```text
App
 │
 ├── Header
 │    └── h1
 │
 └── main
      └── h2
```

This is called **component nesting**.

Here:

```jsx
<App />
```

contains:

```jsx
<Header />
```

and the `Header` component contains:

```jsx
<h1>My Website</h1>
```

---

# 26. Creating Our First Small React App

Let's now create a small application.

```jsx
function Header() {
    return (
        <header>
            <h1>React Store</h1>
        </header>
    );
}

function Product() {
    return (
        <div>
            <h2>Laptop</h2>
            <p>Price: ₹50,000</p>
        </div>
    );
}

function App() {
    return (
        <div>
            <Header />

            <main>
                <Product />
            </main>
        </div>
    );
}

const rootElement = document.getElementById("root");

const root = ReactDOM.createRoot(rootElement);

root.render(<App />);
```

The structure is:

```text
App
 │
 ├── Header
 │
 └── Product
```

We now have three components:

```text
App
Header
Product
```

`App` is the top-level component.

It uses:

```jsx
<Header />
```

and:

```jsx
<Product />
```

---

# 27. Why Components Are Useful

Without components:

```jsx
const element = (
    <div>

        <header>
            <h1>React Store</h1>
        </header>

        <main>
            <h2>Laptop</h2>
            <p>Price: ₹50,000</p>
        </main>

    </div>
);
```

As the application grows, this becomes difficult to manage.

With components:

```jsx
function Header() {
    return (
        <header>
            <h1>React Store</h1>
        </header>
    );
}

function Product() {
    return (
        <div>
            <h2>Laptop</h2>
            <p>Price: ₹50,000</p>
        </div>
    );
}
```

we separate the UI into logical reusable units.

The application becomes easier to organize:

```text
App
│
├── Header
│
└── Product
```

---

# 28. The Function Model of Components

A component is a function.

For example:

```jsx
function Product() {
    return (
        <div>
            <h2>Laptop</h2>
            <p>Price: ₹50,000</p>
        </div>
    );
}
```

Conceptually:

```text
Product()
    ↓
returns UI
```

The function receives input and returns UI.

This becomes particularly important when we introduce **props**.

We can pass information to a component.

---

# 29. Introducing Props

Suppose we want different products.

We could create:

```jsx
function Product() {
    return (
        <div>
            <h2>Laptop</h2>
            <p>Price: ₹50,000</p>
        </div>
    );
}
```

But now what if we want:

```text
Laptop
Phone
Keyboard
Mouse
```

We don't want to create four separate components.

Instead, we want one reusable component:

```jsx
<Product />
```

with different data.

This is where **props** come in.

---

# 30. Passing Props

We can write:

```jsx
<Product
    name="Laptop"
    price="50000"
/>
```

Another:

```jsx
<Product
    name="Phone"
    price="30000"
/>
```

Another:

```jsx
<Product
    name="Keyboard"
    price="2000"
/>
```

Now the component receives different information.

The component remains the same:

```jsx
Product
```

but the data passed to it changes.

---

# 31. Receiving Props

The component function receives props as its argument:

```jsx
function Product(props) {
    return (
        <div>
            <h2>{props.name}</h2>
            <p>Price: ₹{props.price}</p>
        </div>
    );
}
```

Now:

```jsx
<Product
    name="Laptop"
    price="50000"
/>
```

produces:

```text
Laptop
Price: ₹50000
```

And:

```jsx
<Product
    name="Phone"
    price="30000"
/>
```

produces:

```text
Phone
Price: ₹30000
```

The component is the same.

Only its input changes.

---

# 32. Props as Function Arguments

A useful way to understand props is:

```jsx
function Product(props) {
    return <h2>{props.name}</h2>;
}
```

Conceptually:

```text
Product()
     ↑
     |
   props
```

When we write:

```jsx
<Product name="Laptop" />
```

we are providing data to the component.

The component receives that data through:

```jsx
props
```

So:

```text
Component
    +
Props
    ↓
Rendered UI
```

For example:

```jsx
<Product name="Laptop" />
```

provides:

```text
name = "Laptop"
```

and the component can access it using:

```jsx
props.name
```

---

# 33. Multiple Props

We aren't limited to one prop.

We can pass multiple props:

```jsx
<Product
    name="Laptop"
    price={50000}
    category="Electronics"
    available={true}
/>
```

The component receives all of them:

```jsx
function Product(props) {
    return (
        <div>

            <h2>{props.name}</h2>

            <p>
                Price: ₹{props.price}
            </p>

            <p>
                Category: {props.category}
            </p>

            <p>
                Available: {
                    props.available ? "Yes" : "No"
                }
            </p>

        </div>
    );
}
```

Here the props object conceptually contains:

```javascript
{
    name: "Laptop",
    price: 50000,
    category: "Electronics",
    available: true
}
```

So:

```jsx
props.name
```

gives:

```text
Laptop
```

```jsx
props.price
```

gives:

```text
50000
```

```jsx
props.category
```

gives:

```text
Electronics
```

and:

```jsx
props.available
```

gives:

```text
true
```

---

# 34. Final Practical — JSX + Components + Props

Let's combine everything we learned.

```jsx
function Header() {
    return (
        <header>
            <h1>React Store</h1>
        </header>
    );
}

function Product(props) {
    return (
        <div>
            <h2>{props.name}</h2>

            <p>
                Price: ₹{props.price}
            </p>

            <p>
                Category: {props.category}
            </p>
        </div>
    );
}

function App() {
    return (
        <div>

            <Header />

            <main>

                <Product
                    name="Laptop"
                    price={50000}
                    category="Electronics"
                />

                <Product
                    name="Phone"
                    price={30000}
                    category="Electronics"
                />

                <Product
                    name="Keyboard"
                    price={2000}
                    category="Accessories"
                />

            </main>

        </div>
    );
}

const rootElement = document.getElementById("root");

const root = ReactDOM.createRoot(rootElement);

root.render(<App />);
```

The component tree is:

```text
App
 │
 ├── Header
 │    └── h1
 │
 └── main
      │
      ├── Product
      │    ├── name = Laptop
      │    ├── price = 50000
      │    └── category = Electronics
      │
      ├── Product
      │    ├── name = Phone
      │    ├── price = 30000
      │    └── category = Electronics
      │
      └── Product
           ├── name = Keyboard
           ├── price = 2000
           └── category = Accessories
```

The important thing is that we created **one** `Product` component and reused it with different props.

---

# 35. JSX → Components → Props

Our progression is now:

```text
React.createElement()
        ↓
JSX
        ↓
Readable UI syntax
        ↓
Components
        ↓
Reusable UI
        ↓
Props
        ↓
Dynamic component data
```

And the conceptual model is:

```text
Component
    ↓
Receives props
    ↓
Returns JSX
    ↓
JSX is transformed into JavaScript
    ↓
React Elements
    ↓
React renders UI
```

---

# Practical Checkpoint

Before moving forward, make sure you can independently write the following.

## A JSX Element

```jsx
const element = (
    <h1>Hello React</h1>
);
```

## A Component

```jsx
function Header() {
    return (
        <h1>React Store</h1>
    );
}
```

## A Component Being Used

```jsx
<Header />
```

## Props Being Passed

```jsx
<Product
    name="Laptop"
    price={50000}
/>
```

## Props Being Received

```jsx
function Product(props) {
    return (
        <h2>{props.name}</h2>
    );
}
```

---

# Key Takeaways

```text
Component
    ↓
Reusable UI unit
```

```text
Element
    ↓
Description of UI
```

```text
Props
    ↓
Data passed from parent component to child component
```

```text
<Product
    name="Laptop"
    price={50000}
/>
```

becomes available inside the component as:

```javascript
props.name
props.price
```

The central idea is:

```text
One component
       +
Different props
       ↓
Different rendered UI
```

This is what allows us to build reusable React interfaces.