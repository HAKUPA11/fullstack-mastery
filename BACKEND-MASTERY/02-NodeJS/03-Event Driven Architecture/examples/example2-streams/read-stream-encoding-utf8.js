const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "example.txt");

const stream = fs.createReadStream(filePath);

stream.setEncoding("utf8");// this was the line to know/learn as concept other code is same

stream.on("data", (chunk) => {
    console.log("Received chunk:");
    console.log(chunk);
});

stream.on("end", () => {
    console.log("Finished reading.");
});

stream.on("error", (err) => {
    console.log("Error:", err.message);
});