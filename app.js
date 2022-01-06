const fs = require('fs')
const yargs = require('yargs')
const notesUtils = require('./notes.js');
const { demandOption } = require('yargs');
const notes = require('./notes.js');
const { listNote } = require('./notes.js');


// Add command
yargs.command({
    command: 'add',
    describe:'Add a new note',
    builder: {
        title:{
            describe:'Note title',
            demandOption: true,
            type: 'string'
        },
        body:{
            describe:'Note Body',
            demandOption: true,
            type: 'string' 
        }
    },
    handler(argv){
        notesUtils.addNote(yargs.argv.title, yargs.argv.body);
        
    }
});

// Remove command
yargs.command({
    command: 'remove',
    describe:'Remove a note',
    builder: {
        title: 
        {
            describe:"Remove Note",
            demandOption: true,
            type: 'string'
        }
    },
    handler() {
        
        notesUtils.removeNote(yargs.argv.title);
    }
});

// Read command
yargs.command({
    command: 'read',
    describe:'Read a note',
    builder: {
        title: {

            describe:'Note title',
            demandOption: true,
            type: 'string'
        },
    },
    handler (){
        notesUtils.readNote(yargs.argv.title);
    }
});


// List command
yargs.command({
    command: 'list',
    describe:'List notes',
    handler(){
        notesUtils.listNote();
    }
});


/* Required to run the yargs command
 * DO NOT REMOVE
 * Should be AFTER the code
*/
yargs.argv