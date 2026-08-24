function Header() {
    return (
        <header>
            <h1>React Store</h1>
        </header>
    );
}

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
            <h1>React Store</h1>

            <main>
                {products.map((product) => {
                    return (
                        <Product
                            name={product.name}
                            price={product.price}
                            category={product.category}
                        />
                    );
                })}
            </main>
        </div>
    );
}

const rootElement = document.getElementById("root");

const root = ReactDOM.createRoot(rootElement);

root.render(<App />);