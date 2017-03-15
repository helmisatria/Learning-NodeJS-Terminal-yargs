/*jshint esversion: 6 */
var express = require('express');
var app = express();
var _ = require('lodash');
var yargs = require('yargs');

var notes = require('./notes');

var titleOption = 
    {
        describe: 'Title of note',
        demand: true,
        alias: 't'
    };
var bodyOption =
    {
        describe: 'Message of note',
        demand: true,
        alias: 'b'
    };

const argv = yargs
    .command('add', 'Add a new note', {
        title : titleOption,
        body : bodyOption
    })
    .command('find', 'Find a note', {
        title: titleOption
    })
    .help()
    .argv;
const command = argv._[0];
// console.log('command : ' + command);
// console.log(argv);
if (command === 'add'){
    var note = notes.addNote(argv.title, argv.body);
    if (note){
        console.log('Note created');
        notes.logNotes(note);
    } else {
        console.log('Note title taken');
    }
} else if (command === 'remove'){
    var remove = notes.removeNote(argv.title);
    var message = remove ? 'Note not found!' : `Note ${argv.title} removed`;
    console.log(message);
} else if (command === 'find'){
    var note = notes.getNote(argv.title);
    if (note){
        console.log('Note found');
        notes.logNotes(note);
        debugger;
    } else {
        console.log('Note not found!');
    }
} else if (command === 'list'){
    var allNotes = notes.getAll();
    allNotes.forEach((note) => notes.logNotes(note));
}

// var listener = app.listen(process.env.PORT || 3000, () => {
//     console.log("starting app.js at " + listener.address().port);
// });