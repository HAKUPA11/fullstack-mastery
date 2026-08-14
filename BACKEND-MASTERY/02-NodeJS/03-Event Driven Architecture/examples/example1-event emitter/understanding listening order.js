const EventEmitter = require("events");

const emitter = new EventEmitter();

emitter.on("greet", (name) => {
    console.log("Listener 1:", name);
});

emitter.on("greet", (name) => {
    console.log("Listener 2:", name);
});

emitter.on("greet", (name) => {
    console.log("Listener 3:", name);
});

console.log("Before emit");

emitter.emit("greet", "Harsh");

console.log("After emit");

//emit() is synchronous in this example.