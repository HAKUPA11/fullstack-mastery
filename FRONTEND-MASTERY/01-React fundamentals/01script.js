const root = document.getElementById("root");

let count = 0;

root.innerHTML = `
    <h1>Counter</h1>
    <p>Count: ${count}</p>
    <button id="increment">Increment</button>
`;

const button = document.getElementById("increment");

button.addEventListener("click", () => {
    count++;

    document.querySelector("p").textContent = `Count: ${count}`;
});