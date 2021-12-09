const {NoteModel} = require( '../models/noteModel' );

const NotesController = {


    getOneNote: function (request, response) {
        let id = request.params.id;

        NoteModel
        .getNoteById( id )
            .then(data => {
                if( data === null ){
                    throw new Error( "That Note doesn't exist" );
                }
                else{
                    NoteModel
                        .getNoteById( id )
                        .then( result => {
                            response.status( 200 ).json( result );
                        });
                }
            })
            .catch( error => {
                response.statusMessage = error.message;
                response.status( 404 ).end();
            })
    },

    getAllNotes : function( request, response ){
        NoteModel.getAllNotes()
            .then( notes => {
                let notesMap = notes.map( note => {
                    // Map through comments here if you need to include comments too
                    return {
                        id : note._id,
                        note : note.note,
                        createdAt : note.createdAt
                    }
                } )
                response.status( 200 ).json( notesMap );
            });
    },
    createNote : function( request, response ){
        let { note } = request.body;

        if( note ){
            let newNote = {
                note,
            };
            console.log(newNote);
            NoteModel
                .createNote( newNote)
                .then( result => {
                    response.status( 201 ).json( result );
                })
                .catch(error => {
                    console.log("Error to create note: ", error);
                    response.statusMessage = "The notes name most be at least 4 characters long! Try again!";
                    response.status( 404 ).end();
                }); 
        }
        else{
            response.statusMessage = "You are missing a field to create a new Note";
            response.status( 406 ).end();
        }      
    },

    updateNote : function( request, response ){
        if (request.body.note.length < 3 ){
            response.statusMessage =  "The notes most be at least 3 characters long!" ;
            response.status( 406 ).end();
            } 
            else{
                let note = request.body.note;
                let id = request.params.id;
                let newNote = { 
                    note,
                };
                NoteModel
                .updateNote(id, newNote)
                .then(data => {
                    response.status( 201 ).json( data );
                })
                .catch(error => {
                    response.statusMessage = error.message;
                    response.status( 404 ).end();
                });
            }
        },

    deleteNote : function( request, response ){
        NoteModel
            .destroyNote(request.params.id)
            .then(data => {
                response.json(data);
            })
            .catch(error => {
                response.json( "Note does not exist" );
            }); 
    },
    

}

module.exports = {NotesController};