const fs = require("fs");
const path = require("path");

const outputPath = path.join(__dirname, "backpressure-test.txt");

const writeStream = fs.createWriteStream(outputPath);

let canContinue = true;

for (let i = 0; i < 100000; i++) {
    canContinue = writeStream.write(
        `This is line ${i}\n`
    );

    if (!canContinue) {
        console.log("Backpressure detected at:", i);
        break;
    }
}
//Backpressure detected at: 970 this was the ouput
writeStream.end();

//t