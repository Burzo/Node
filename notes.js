const fs = require("fs")

var fetchNotes = () => {
    try {
        var notesString = fs.readFileSync("notes-data.json")
        return JSON.parse(notesString)
    } catch (e) {
        console.log(e)
        return []
    }
}

var saveNotes = (notes) => {
    fs.writeFileSync("notes-data.json", JSON.stringify(notes))
}

var addNote = (title, body) => {
    var notes = fetchNotes()
    var note = {
        title,
        body
    }
    var duplicateNotes = notes.filter(note => note.title === title)

    if (duplicateNotes.length === 0) {
        notes.push(note)
        saveNotes(notes)
        return note
    }
};

var getAll = () => {
    return fetchNotes()
}

var readNote = (title) => {
    var notes = fetchNotes()
    var filteredNotes = notes.filter(note => note.title === title)
    return filteredNotes[0]
}

var removeNote = (title) => {
    var notes = fetchNotes()
    var newNotes = notes.filter(note => note.title !== title)
    saveNotes(newNotes)
    return newNotes.length !== notes.length
}

var logNote = (note) => {
    debugger
    console.log(`--------------\nThe title: ${note.title}\nThe body: ${note.body}\n--------------`)
}

module.exports = {
    addNote,
    getAll,
    readNote,
    removeNote,
    logNote
}