/*jshint esversion: 6 */
// console.log('starting notes.js');
const fs = require('fs');

var fetchNotes = () => {
    try {
        var noteString = fs.readFileSync('notes-data.json');
        return JSON.parse(noteString);
    } catch (error) {
        return [];
    }
};
var saveNotes = (notes) => {
    fs.writeFileSync('notes-data.json', JSON.stringify(notes));    
};

var addNote = (title, body) => {
    // console.log('addNote');
    var notes = fetchNotes();
    var note = {
        title,
        body
    };
    var duplicateNote = notes.filter((note) => note.title === title);
    if (duplicateNote.length === 0){
        notes.push(note);
        saveNotes(notes);
        return note;
    }
};

var getAll = () => {
    return fetchNotes();
};

var getNote = (title) => {
    var notes = fetchNotes();
    var noteGet = notes.filter((note) => note.title === title);
    return noteGet[0];
};

var removeNote = (title) => {
    var notes = fetchNotes();
    var filteredNotes = notes.filter((note) => note.title !== title);
    saveNotes(filteredNotes);

    return notes.length === filteredNotes.length;
};

var logNotes = (note) => {
    console.log('--');
    console.log(`Title : ${note.title}`);
    console.log(`Body : ${note.body}`);
};

module.exports = {
    addNote,
    getAll,
    getNote,
    removeNote,
    logNotes
};