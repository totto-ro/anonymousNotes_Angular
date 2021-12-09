import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NoteService } from '../main/note.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
  newNote: any;
  errorMessage: any;
  allNotes : any;
  note: any = "";

  
  constructor(  private _noteService: NoteService,
    private _router:Router,
    private _route:ActivatedRoute) { }

  ngOnInit(): void {
    this.getAllNotes()
    this.newNote = {
      note : "",
    }
  }

  getAllNotes(): void {
    console.log("We are going to fetch the Note list!");
    this._noteService.fetchAllNotes()
    .subscribe( (data:any) => {
      this.allNotes = data;
      console.log( "From main component: ", this.allNotes );
    });
  }


  createNote(event: any ): void{
    console.log("Creating note: ", this.newNote)
    let observable = this._noteService.createNote( this.newNote);
    observable.subscribe( (data : any) =>{
        console.log("New note: ", data);
        this.allNotes.unshift( data );
      },
      ( error: any ) => {
        console.log( error );
        this.errorMessage = error.statusText;
      })

  }

}
