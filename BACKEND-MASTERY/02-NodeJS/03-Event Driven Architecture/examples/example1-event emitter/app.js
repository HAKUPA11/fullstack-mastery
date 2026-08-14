const EventEmitter = require("events");

//VERSION-1
const emitter = new EventEmitter();

// emitter.on("greet", () => {
//     console.log("Hello! Event was triggered.");
// });

// emitter.emit("greet");

//VERSION-2


emitter.on("greet", (name) => { // listener to the event greet
    console.log(`Hello, ${name}!`);
});

emitter.on("greet", (name) => {
    console.log(`Welcome to the backend, ${name}!`);
});


emitter.emit("greet", "Harsh"); //event emitter

// we can add multiple listeners