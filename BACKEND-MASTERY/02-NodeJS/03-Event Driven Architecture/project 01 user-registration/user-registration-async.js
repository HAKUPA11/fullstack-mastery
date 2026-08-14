const EventEmitter = require("events");

const userEvents = new EventEmitter();



userEvents.on("userRegistered", (user) => {
    setTimeout(() => {
        console.log(`Sending welcome email to ${user.email}`);
    }, 1000);
});

userEvents.on("userRegistered", (user) => {
    setTimeout(() => {
        console.log(`Creating profile for ${user.name}`);
    }, 500);
});

userEvents.on("userRegistered", (user) => {
    console.log(`Logging registration of ${user.name}`);
});




const user = {
    name: "Harsh",
    email: "harsh@example.com"
};

console.log("Registering user...");

userEvents.emit("userRegistered", user);

console.log("Registration event emitted.");