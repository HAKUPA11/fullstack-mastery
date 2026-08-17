const fs=require("fs")
const path=require("path")

const filePath=path.join(__dirname, "output.txt")

const stream=fs.createWriteStream(filePath);

stream.write("Hello from Node.js\n");
stream.write("This is a writable stream.\n");
stream.write("We can write data piece by piece.\n");

stream.end();

console.log("writing started")