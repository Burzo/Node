const fs = require("fs")
const _ = require("lodash")
const yargs = require("yargs")

const notes = require("./notes.js")

var optionsObj = {
    title: {
            describe: "Title of note",
            demand: true,
            alias: "t"
    },
    body: {
            describe: "Body of note",
            demand: true,
            alias: "b"
    }
}

const argv = yargs
    .command("add", "Add a new note", {
        title: optionsObj.title,
        body: optionsObj.body
    })
    .command("list", "List all notes")
    .command("read", "Read a note", {
        title: optionsObj.title
    })
    .command("remove", "Remove a note", {
        title: optionsObj.title
    })
    .help()
    .argv;

    // LOGIC
switch (process.argv[2]) {
    case "list":
        var allNotes = notes.getAll()
        console.log(`Printing ${allNotes.length} notes.`)
        allNotes.forEach(note => notes.logNote(note));
        break
    case "add":
        var note = notes.addNote(argv.title, argv.body)
        if (note) {
            console.log(`Succesfully created a note`)
            notes.logNote(note)
        } else {
            console.log(`Note with the title ${argv.title} already exists.`)
        }
        break
    case "remove":
        var removeNote = notes.removeNote(argv.title)
        var message = removeNote ? "Note was removed." : "Note not found."
        console.log(message)
        break
    case "read":
        var readNotes = notes.readNote(argv.title)
        if (readNotes) {
            notes.logNote(readNotes)
        } else {
            console.log("Note not found.")
        }
        break
    default:
        console.log("Command not recognized")
}
