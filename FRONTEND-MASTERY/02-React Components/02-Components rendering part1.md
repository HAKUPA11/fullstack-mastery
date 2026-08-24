# 36. The Problem With Repeating Components

We currently have:

```jsx
<Product category="Electronics" name="Laptop" price="{50000}"/>
<Product category="Electronics" name="Phone" price="{30000}"/>
<Product category="Accessories" name="Keyboard" price="{2000}"/>
```

This works. But imagine we have 100 products. We would have to write:

```jsx
<Product .../>
<Product .../>
<Product .../>
<Product .../>
<Product .../>
...
```

That is not practical. Usually, our data will come from:
* an API
* a database
* a JSON file
* user input
* some other data source

So instead of manually writing every component, we want to take an array of data and generate the components automatically.

---

# 37. Creating Dummy Data

Let's create an array containing our products.

```javascript
const products = [
    {
        name: "Laptop",
        price: 50000,
        category: "Electronics"
    },
    {
        name: "Phone",
        price: 30000,
        category: "Electronics"
    },
    {
        name: "Keyboard",
        price: 2000,
        category: "Accessories"
    }
];
```

Now our data is separated from our UI. We have:

**products**
↓
**Array**
↓
**Product objects**

Each object represents one product. For example:

```javascript
{
    name: "Laptop",
    price: 50000,
    category: "Electronics"
}
```

---

# 38. `forEach()` — Iterating Over an Array

Before using React, let's understand `forEach()`. Suppose:

```javascript
const products = [
    "Laptop",
    "Phone",
    "Keyboard"
];
```

We can use:

```javascript
products.forEach((product) => {
    console.log(product);
});
```

**Output:**
```text
Laptop
Phone
Keyboard
```

`forEach()` executes a function once for every element. Conceptually:

* Laptop ↓ `function()`
* Phone ↓ `function()`
* Keyboard ↓ `function()`

---

# 39. Important Difference — `forEach()` Does Not Return a New Array

Consider:

```javascript
const products = [
    "Laptop",
    "Phone",
    "Keyboard"
];

const result = products.forEach((product) => {
    console.log(product);
});

console.log(result);
```

The output of `console.log(result);` is:

```text
undefined
```

This is important. `forEach()` is primarily used when we want to perform an operation for every element. For example:

```javascript
products.forEach((product) => {
    console.log(product);
});
```

---

# 40. `map()` — Creating a New Array

Now let's look at `map()`.

```javascript
const products = [
    "Laptop",
    "Phone",
    "Keyboard"
];

const result = products.map((product) => {
    return product;
});

console.log(result);
```

The result is:

```json
[
    "Laptop",
    "Phone",
    "Keyboard"
]
```

Unlike `forEach()`, `map()` returns a new array.

---

# 41. `map()` With Transformation

We can transform every element.

```javascript
const products = [
    "Laptop",
    "Phone",
    "Keyboard"
];

const result = products.map((product) => {
    return product.toUpperCase();
});

console.log(result);
```

Output:

```json
[
    "LAPTOP",
    "PHONE",
    "KEYBOARD"
]
```

The important idea:

**Original array** ↓ `map()` ↓ **New array**

---

# 42. `forEach()` vs `map()`

The difference we care about for React is:

| `forEach()` | `map()` |
| :--- | :--- |
| Iterates over elements | Iterates over elements |
| Does not return a new array | Returns a new array |
| Useful for performing an action | Useful for transforming data |
| Not suitable for generating an array of JSX | Commonly used to generate an array of JSX |

For example:

```javascript
products.forEach((product) => {
    console.log(product);
});
```

versus:

```jsx
const elements = products.map((product) => {
    return <Product/>;
});
```

The second one creates an array of React elements. That is exactly what we need.

---

# 43. Using `map()` to Generate Components

Let's return to our React application. We have:

```javascript
const products = [
    {
        name: "Laptop",
        price: 50000,
        category: "Electronics"
    },
    {
        name: "Phone",
        price: 30000,
        category: "Electronics"
    },
    {
        name: "Keyboard",
        price: 2000,
        category: "Accessories"
    }
];
```

We already have our component:

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

Now inside `App`:

```jsx
function App() {
    return (
        <div>
            <h1>React Store</h1>
            <main>
                {products.map((product) => {
                    return (
                        <Product category="{product.category}" name="{product.name}" price="{product.price}"/>
                    );
                })}
            </main>
        </div>
    );
}
```

Now React generates:

```text
Product
Product
Product
```

automatically.

---

# 44. What `map()` Is Doing Here

This:

```jsx
products.map((product) => {
    return (
        <Product category="{product.category}" name="{product.name}" price="{product.price}"/>
    );
})
```

is effectively producing:

```jsx
[
    <Product category="Electronics" name="Laptop" price="{50000}"/>,
    <Product category="Electronics" name="Phone" price="{30000}"/>,
    <Product category="Accessories" name="Keyboard" price="{2000}"/>
]
```

So the flow is:

**products array** ↓ `map()` ↓ **each product object** ↓ `<Product />` ↓ **array of React elements** ↓ **React renders them**

---

# 45. Dynamic Props

Notice that we aren't hardcoding:

```jsx
<Product category="Electronics" name="Laptop" price="{50000}"/>
```

Instead, we're using:

```jsx
<Product category="{product.category}" name="{product.name}" price="{product.price}"/>
```

The values come dynamically from the current object. 

For the first iteration:
```javascript
product = {
    name: "Laptop",
    price: 50000,
    category: "Electronics"
}
```
Therefore: `name={product.name}` becomes `name="Laptop"`.

For the second iteration:
```javascript
product = {
    name: "Phone",
    price: 30000,
    category: "Electronics"
}
```
Therefore: `name={product.name}` becomes `name="Phone"`.

This is dynamic prop passing.

---

# 46. Cleaner Dynamic Prop Passing

Since the object already contains:

```javascript
{
    name,
    price,
    category
}
```

we can eventually make the code shorter using the spread operator:

```jsx
<Product {...product}/>
```

So:

```jsx
<Product category="{product.category}" name="{product.name}" price="{product.price}"/>
```

can become:

```jsx
<Product {...product}/>
```

For now, understand the explicit version first. The explicit version makes it completely clear where every prop is coming from.