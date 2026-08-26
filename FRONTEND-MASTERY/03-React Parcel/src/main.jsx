import React from "react";
import ReactDOM from "react-dom/client"

import Header from "./components/Header"

const rootElement= document.getElementById("root");

const root= ReactDOM.createRoot(rootElement);

const element=(
    <div>
        <Header />
    </div>
);

root.render(element);