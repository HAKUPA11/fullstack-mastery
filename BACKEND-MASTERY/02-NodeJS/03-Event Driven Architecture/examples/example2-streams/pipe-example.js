const fs = require("fs");
const path = require("path");

const sourcePath = path.join(__dirname, "large-file.txt");
const destinationPath = path.join(__dirname, "copied-file.txt");

const readStream = fs.createReadStream(sourcePath);
const writeStream = fs.createWriteStream(destinationPath);

readStream.pipe(writeStream);

console.log("Copying started...");

//instead of doing this thing::
// readStream.on("data", (chunk) => {
//     writeStream.write(chunk);
// });

// we did this:  readStream.pipe(writeStream);