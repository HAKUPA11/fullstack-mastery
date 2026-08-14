const EventEmitter = require("events");

const emitter = new EventEmitter();


emitter.on("greet", (name) => {
    setTimeout(() => {
        console.log("Listener 1:", name);
    }, 1000);
});

emitter.on("greet", (name) => {
    setTimeout(() => {
        console.log("Listener 2:", name);
    }, 500);
});

emitter.on("greet", (name) => {
    console.log("Listener 3:", name);
});

console.log("Before emit");

emitter.emit("greet", "Harsh");

console.log("After emit");