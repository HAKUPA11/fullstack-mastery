// reading from the file
const fs=require("fs")

//it is a relative path
const text=fs.readFileSync("BACKEND-MASTERY/02-NodeJS/02-Node.JS-Modules/examples/example6-fs module-SYNC/notes.txt", "utf8")

console.log(text)// printing it

// there is no file names new_notes.txt but it will be created(as it is not there) isnce we are writing 
// const new_text=fs.writeFileSync("BACKEND-MASTERY/02-NodeJS/02-Node.JS-Modules/examples/example6-fs module-SYNC/new_notes.txt", "this is the new file and i am inserting the data this is the data ")

console.log(fs.readFileSync("BACKEND-MASTERY/02-NodeJS/02-Node.JS-Modules/examples/example6-fs module-SYNC/new_notes.txt", "utf8"))

fs.appendFileSync("BACKEND-MASTERY/02-NodeJS/02-Node.JS-Modules/examples/example6-fs module-SYNC/new_notes.txt", "paisa ye pehchaan pehsaan ! money follows my brothaaaa money follows")

console.log(fs.readFileSync("BACKEND-MASTERY/02-NodeJS/02-Node.JS-Modules/examples/example6-fs module-SYNC/new_notes.txt", "utf8"))