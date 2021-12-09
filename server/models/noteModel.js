const mongoose = require( 'mongoose' );

const NoteSchema = new mongoose.Schema({
    note : {
        type : String,
        required : true,
        minlength : 3
    }
}, { timestamps: true });

const Note = mongoose.model( 'notes', NoteSchema );

const NoteModel = {
    createNote : function( newNote ){
        return Note.create( newNote );
    },

    getAllNotes : function( ){
        return Note.find().sort( { createdAt: -1 } );
    },

    getNoteByName : function( note ){
        return Note.findOne( {note : note} );
    },

    getNoteById : function( id ){
        return Note.findOne( { _id : id } );
    },

    updateNote: function( id, noteToUpdate ){
        return Note.findOneAndUpdate( { _id : id },{ $set:noteToUpdate }, { new:true } )
    },

    destroyNote : function( id ){
        return Note.deleteOne({ _id : id });
    },

};

module.exports = {NoteModel};