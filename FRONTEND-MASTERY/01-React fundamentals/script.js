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

root.render(reactElement)

console.log(root);