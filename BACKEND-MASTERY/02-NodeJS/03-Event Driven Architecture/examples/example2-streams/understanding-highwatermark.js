const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "large-file.txt");

const stream = fs.createReadStream(filePath, {// this is the only line to understand this is 1KB by default it was 64kb
    highWaterMark: 1024
});

stream.on("data", (chunk) => {
    console.log("Chunk size:", chunk.length);
});

stream.on("end", () => {
    console.log("Finished reading.");
});

stream.on("error", (err) => {
    console.log("Error:", err.message);
});