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
                onClick : ()=>{
                    count++;
                    render()
                }
            },
            "Increment"
        )
    );

    root.render(element);
    
}

render();