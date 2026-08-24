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
            <p>Price: ₹{props.price}</p>
            <p>Category: {props.category}</p>
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