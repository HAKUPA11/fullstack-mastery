import React from "react";
import ReactDOM from "react-dom/client"

import Header from "./components/Header"
import Product from "./components/Product";

import "./styles/Global.css"

const rootElement= document.getElementById("root");

const root= ReactDOM.createRoot(rootElement);

// dummy data

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
    }
];



function App(){
    return(
    <div>
        <Header />
         <main>
                {products.map((product) => (
                    <Product category={product.category} key={product.id} name={product.name} price={product.price}/>
                ))}
            </main>
    </div>
    );
};

root.render(<App />);