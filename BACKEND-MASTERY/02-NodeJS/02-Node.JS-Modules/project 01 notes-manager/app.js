const fs = require("fs/promises");
const path = require("path");

const notesPath = path.join(
    "BACKEND-MASTERY",
    "02-NodeJS",
    "02-Node.JS-Modules",
    "project 01 notes-manager",
    "notes"
);

const filePath = path.join(notesPath, "first-note.txt");
const secondFilePath = path.join(notesPath, "second-note.txt");

async function createNote(filePath, content) {
    await fs.writeFile(filePath, content);
}

async function readNote(filePath) {
    const content = await fs.readFile(filePath, "utf8");
    return content;
}

async function appendNote(filePath, content) {
    await fs.appendFile(filePath, content);
}

async function deleteNote(filePath) {
    await fs.unlink(filePath);
}

async function listNotes() {
    return await fs.readdir(notesPath);
}

const nm = { // alias of notesManager making nm as the object and the methods will be create, read etc
    create: createNote,
    read: readNote,
    append: appendNote,
    delete: deleteNote,
    list: listNotes
};

async function setup() {
    await fs.mkdir(notesPath, { recursive: true }); //recursive:True will  make any folder in between if it was not made

    // await createNote(filePath, "This is my first note.");
    await nm.create(secondFilePath, "This is my second note.");

    const notes = await nm.list();
    console.log(notes);
    
    for (const note of notes) {
    const content = await nm.read(
        path.join(notesPath, note),
        "utf8"
    );

    console.log(`\n--- ${note} ---`);
    console.log(content);
}

    // const data = await nm.read(filePath);

    await appendNote(filePath, "\nI am learning Node.js backend development.");

    // const updatedData = await nm.read(filePath, "utf8");
    // console.log(updatedData);

    await nm.delete(secondFilePath);
    console.log("Second note deleted");

}

setup();

