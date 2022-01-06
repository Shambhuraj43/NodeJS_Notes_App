const fs = require('fs');
const chalk = require('chalk')

const addNote = (title, body) => {

    const notes = loadNotes();
    const duplicateNote = notes.find((note) => note.title === title)

    debugger

    if(!duplicateNote){
        
        notes.push({
            title: title,
            body: body
        });

        saveNotes(notes);

        console.log(chalk.green.inverse("New note added!"));

    } else{
        console.log(chalk.red.inverse("This title is taken"));
    }  
}

const saveNotes  = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
}


const loadNotes = () => {

    try{
        const dataBuffer = fs.readFileSync('notes.json');
        const notesString = dataBuffer.toString();
        return JSON.parse(notesString); 

    }catch (e) {
        return [];
    }   
}


const removeNote = (title) => {

    const notes = loadNotes();

    const notesToKeep = notes.filter((note) => note.title !== title)

    if(notes.length === notesToKeep.length){
        const msg = chalk.red.inverse;
        console.log(msg("Note not found!"));
    }else{
        const msg = chalk.green.inverse;
        console.log(msg("Note deleted!"));
    }

    saveNotes(notesToKeep);
}

const listNote = () => {

    const notes = loadNotes();

    console.log(chalk.green.inverse("Your notes:"));

    notes.forEach(note => {
        console.log("_______________________________________");
        console.log(chalk.red(note.title) + "\n" + chalk.blue(note.body));
        
    });
}

const readNote = (title) => {

    const notes = loadNotes();

    var noteIfFound = null;

    const searchNote = notes.find((note) => note.title === title);

    if(searchNote){
        console.log(chalk.green.inverse("Your Note: "));
        console.log(chalk.yellow.bold(searchNote.title) + "\n" + chalk.blue(searchNote.body));
    }else{
        console.log(chalk.red.inverse("Note not found!"));
    }

}

    
module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNote: listNote,
    readNote: readNote,
}