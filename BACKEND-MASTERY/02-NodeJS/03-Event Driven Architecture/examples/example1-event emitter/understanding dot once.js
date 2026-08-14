const EventEmitter = require("events");

const emitter = new EventEmitter();

emitter.once("login", (user) => {
    console.log(`${user} logged in for the first time`);
});

emitter.emit("login", "Harsh");
emitter.emit("login", "Harsh");
emitter.emit("login", "Harsh");

// the listener ;istens/runs only once, even if the event is emitted multiple times.