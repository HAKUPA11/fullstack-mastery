const crypto = require("crypto");

console.log("Before sync pbkdf2");

console.time("sync pbkdf2");

const syncKey = crypto.pbkdf2Sync(
    "myPassword",
    "mySalt",
    1000000,
    64,
    "sha512"
);

console.timeEnd("sync pbkdf2");

console.log("After sync pbkdf2");

console.log(syncKey.toString("hex"));