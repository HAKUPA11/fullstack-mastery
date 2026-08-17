const fs = require("fs");
const path = require("path");

// console.log("Current directory (__dirname):", __dirname //just to know the correct folder

const filePath = path.join(__dirname, "large-file.txt");

const content = "Node.js streams are powerful!\n";

let data = "";

for (let i = 0; i < 100000; i++) {
    data += content;
}

fs.writeFileSync(filePath, data);

console.log("Large file created.");