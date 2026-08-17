// verion1

// const fs = require("fs");

// const stream = fs.createReadStream("BACKEND-MASTERY/02-NodeJS/03-Event Driven Architecture/examples/example2-streams/example.txt");

// // console.log(stream);
// stream.on("data", (chunk) => {
//     console.log("Received chunk:");
//     // console.log(chunk); // we will gert the buffer wahich are raw binary bytes of the text in example.txt
//     console.log(chunk.toString());// we will have to convert that into string

//     console.log("Received chunk size/;ength");
//     console.log("Chunk size:", chunk.length);
// });  

// version2- which is correct

const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "large-file.txt");

const stream = fs.createReadStream(filePath);

stream.on("data", (chunk) => {
    console.log("Received chunk");
    console.log("Chunk size:", chunk.length);
});

stream.on("end", () => {
    console.log("Finished reading the file.");
});

// version 3- dliberately we are causing en error jus to knowaboput stream.on("error", ()=>{})

// const fs = require("fs");
// const path = require("path");

// const filePath = path.join(__dirname, "does-not-exist.txt");

// const stream = fs.createReadStream(filePath);

// stream.on("data", (chunk) => {
//     console.log("Received chunk");
// });

// stream.on("end", () => {
//     console.log("Finished reading the file.");
// });

// stream.on("error", (err) => {
//     console.log("Something went wrong:", err.message);
// });
