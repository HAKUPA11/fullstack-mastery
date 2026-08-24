## 47. React Keys

If we render components using `map()`:

```jsx
{products.map((product) => {
    return (
        <Product category="{product.category}" name="{product.name}" price="{product.price}"/>
    );
})}
```

React will give us a warning. We need to provide a **key**.

```jsx
{products.map((product) => {
    return (
        <Product category="{product.category}" key="{product.name}" name="{product.name}" price="{product.price}"/>
    );
})}
```

---

## 48. What Is a React Key?

A key gives React a way to identify an element in a list. For example:

* Product 1 → Laptop
* Product 2 → Phone
* Product 3 → Keyboard

React needs a stable identity for each item. We provide:

```jsx
key={product.name}
```

Now React can identify:
* Laptop
* Phone
* Keyboard

individually.

---

## 49. Keys Should Be Stable and Unique

Suppose:

```javascript
const products = [
    {
        id: 101,
        name: "Laptop",
        price: 50000
    },
    {
        id: 102,
        name: "Phone",
        price: 30000
    },
    {
        id: 103,
        name: "Keyboard",
        price: 2000
    }
];
```

The best key would usually be:

```jsx
key={product.id}
```

because IDs are designed to uniquely identify records. So:

```jsx
{products.map((product) => {
    return (
        <Product category="{product.category}" key="{product.id}" name="{product.name}" price="{product.price}"/>
    );
})}
```

---

## 50. Why Not Use Array Index as Key?

We might see:

```jsx
key={index}
```

For example:

```jsx
products.map((product, index) => {
    return (
        <Product key="{index}" {...product}/>
    );
});
```

This can work for some static lists. However, if the list can:
* change order
* have items inserted
* have items removed
* be filtered

then indexes can represent different items over time. Prefer a stable unique identifier from the data:

```jsx
key={product.id}
```

when one is available.

---

## 51. Dummy Data With IDs

Let's improve our data.

```javascript
const products = [
    {
        id: 1,
        name: "Laptop",
        price: 50000,
        category: "Electronics"
    },
    {
        id: 2,
        name: "Phone",
        price: 30000,
        category: "Electronics"
    },
    {
        id: 3,
        name: "Keyboard",
        price: 2000,
        category: "Accessories"
    },
    {
        id: 4,
        name: "Mouse",
        price: 1000,
        category: "Accessories"
    }
];
```

Now we can safely use:

```jsx
key={product.id}
```

---

## 52. Default Prop Values

Sometimes a component may not receive a particular prop. For example:

```jsx
<Product name="Laptop" price="{50000}"/>
```

There is no `category`. 

If our component does:

```jsx
function Product(props) {
    return (
        <div>
            <h2>{props.name}</h2>
            <p>Price: ₹{props.price}</p>
            <p>Category: {props.category}</p>
        </div>
    );
}
```

then `props.category` will be `undefined`. 

We can provide a default value.

---

## 53. Default Value Using Destructuring

We can write:

```jsx
function Product({
    name,
    price,
    category = "General"
}) {
    return (
        <div>
            <h2>{name}</h2>
            <p>Price: ₹{price}</p>
            <p>Category: {category}</p>
        </div>
    );
}
```

Now:

```jsx
<Product name="Laptop" price="{50000}"/>
```

will use `category = "General"`. 

So the output becomes:
```text
Laptop
Price: ₹50000
Category: General
```

---

## 54. Error Handling for Missing Data

We should also consider invalid data. For example:

```javascript
const products = [
    {
        id: 1,
        name: "Laptop",
        price: 50000
    },
    {
        id: 2,
        name: "Phone"
    }
];
```

The second product has no `price`. We should decide what the UI should display. For example:

```jsx
function Product({
    name = "Unknown Product",
    price = 0,
    category = "General"
}) {
    return (
        <div>
            <h2>{name}</h2>
            <p>Price: ₹{price}</p>
            <p>Category: {category}</p>
        </div>
    );
}
```

Now missing values have sensible defaults.

---

## 55. Destructuring Props

Previously we wrote:

```jsx
function Product(props) {
    return (
        <div>
            <h2>{props.name}</h2>
            <p>Price: ₹{props.price}</p>
            <p>Category: {props.category}</p>
        </div>
    );
}
```

This works. But we repeatedly write:
* `props.name`
* `props.price`
* `props.category`

We can destructure the props object.

```jsx
function Product(props) {
    const {
        name,
        price,
        category
    } = props;

    return (
        <div>
            <h2>{name}</h2>
            <p>Price: ₹{price}</p>
            <p>Category: {category}</p>
        </div>
    );
}
```

Now:
* `props.name` becomes `name`
* `props.price` becomes `price`

---

## 56. On-the-Fly Destructuring

We can also destructure directly in the function parameter. Instead of:

```jsx
function Product(props) {
    const { name, price, category } = props;
    // ...
}
```

we can write:

```jsx
function Product({
    name,
    price,
    category
}) {
    return (
        <div>
            <h2>{name}</h2>
            <p>Price: ₹{price}</p>
            <p>Category: {category}</p>
        </div>
    );
}
```

This is called on-the-fly destructuring.

---

## 57. Delayed vs On-the-Fly Destructuring

**Delayed destructuring:**
```jsx
function Product(props) {
    const {
        name,
        price,
        category
    } = props;

    return (
        <div>
            <h2>{name}</h2>
            <p>Price: ₹{price}</p>
            <p>Category: {category}</p>
        </div>
    );
}
```

**On-the-fly destructuring:**
```jsx
function Product({
    name,
    price,
    category
}) {
    return (
        <div>
            <h2>{name}</h2>
            <p>Price: ₹{price}</p>
            <p>Category: {category}</p>
        </div>
    );
}
```

Both work. On-the-fly destructuring is commonly used when we already know exactly which props the component needs. Delayed destructuring can be useful when we want to keep access to the complete props object.

---

## 58. Final Practical — Dynamic Product Listing

Now let's combine everything.

```jsx
const products = [
    {
        id: 1,
        name: "Laptop",
        price: 50000,
        category: "Electronics"
    },
    {
        id: 2,
        name: "Phone",
        price: 30000,
        category: "Electronics"
    },
    {
        id: 3,
        name: "Keyboard",
        price: 2000,
        category: "Accessories"
    },
    {
        id: 4,
        name: "Mouse",
        price: 1000,
        category: "Accessories"
    }
];

function Header() {
    return (
        <header>
            <h1>React Store</h1>
        </header>
    );
}

function Product({
    name = "Unknown Product",
    price = 0,
    category = "General"
}) {
    return (
        <div>
            <h2>{name}</h2>
            <p>Price: ₹{price}</p>
            <p>Category: {category}</p>
        </div>
    );
}

function App() {
    return (
        <div>
            <Header/>
            <main>
                {products.map((product) => {
                    return (
                        <Product category="{product.category}" key="{product.id}" name="{product.name}" price="{product.price}"/>
                    );
                })}
            </main>
        </div>
    );
}

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);
root.render(<App/>);
```

---

## 59. What We Just Built

Our data:
**products** ↓ **array of objects**

Then:

1. `products.map()`
2. ↓ one product at a time
3. ↓ `<Product />`
4. ↓ props
5. ↓ Product component
6. ↓ JSX
7. ↓ UI

And every product receives a unique key:
```jsx
key={product.id}
```

---

## 60. Practical Challenge

Before moving to Parcel, modify the application yourself. Add these products:

```javascript
{
    id: 5,
    name: "Monitor",
    price: 15000,
    category: "Electronics"
}
```

```javascript
{
    id: 6,
    name: "Headphones",
    price: 3000,
    category: "Accessories"
}
```

Then add another property: `rating`. For example:

```javascript
{
    id: 5,
    name: "Monitor",
    price: 15000,
    category: "Electronics",
    rating: 4.5
}
```

Pass it to Product:

```jsx
<Product category="{product.category}" key="{product.id}" name="{product.name}" price="{product.price}" rating="{product.rating}"/>
```

And display:

```jsx
<p>Rating: {rating}</p>
```

Update the component accordingly.

---

## 61. Key Concepts Completed

At this point we have covered:

* Components
* Component nesting
* Reusable components
* Props
* Multiple props
* Dummy data
* `forEach()`
* `map()`
* Dynamic component rendering
* Dynamic props
* React keys
* Default values
* Error handling
* Props destructuring
* On-the-fly destructuring