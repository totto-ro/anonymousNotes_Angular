const express = require( 'express' );
const NoteRouter = express.Router();
const { NotesController } = require( '../controllers/notesController' );

NoteRouter
    .route( '/' )
    .post( NotesController.createNote )
    .get( NotesController.getAllNotes );

NoteRouter
    .route( '/:id' )
    .get( NotesController.getOneNote )
    .put( NotesController.updateNote)
    .delete( NotesController.deleteNote );


module.exports = { NoteRouter };