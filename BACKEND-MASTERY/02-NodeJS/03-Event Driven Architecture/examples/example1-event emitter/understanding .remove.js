const EventEmitter = require("events");

const emitter = new EventEmitter();

function greet(name) {
    console.log(`Hello, ${name}`);
}

emitter.on("greet", greet);

console.log("Listeners:", emitter.listenerCount("greet"));

emitter.emit("greet", "Harsh");

emitter.off("greet", greet);// this removes the listener

console.log("Listeners after removal:", emitter.listenerCount("greet")); // to know how many lsteners are there
// we will do/log emitter.listenerCount("greet")

emitter.emit("greet", "Harsh");