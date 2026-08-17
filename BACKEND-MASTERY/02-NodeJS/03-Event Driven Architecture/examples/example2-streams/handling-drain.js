const fs = require("fs");
const path = require("path");

const outputPath = path.join(__dirname, "backpressure-test.txt");

const writeStream = fs.createWriteStream(outputPath);

let i = 0;

function writeData() {
    let canContinue = true;

    while (i < 100000 && canContinue) {
        canContinue = writeStream.write(
            `This is line ${i}\n`
        );

        i++;
    }

    if (i >= 100000) {
        writeStream.end();
        console.log("Finished writing.");
    } else {
        console.log("Buffer full. Waiting for drain...");

        writeStream.once("drain", () => {
            console.log("Drain received. Continuing...");
            writeData();
        });
    }
}

writeData();