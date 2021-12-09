import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(private _http: HttpClient) { }

  fetchAllNotes() {
    return this._http.get('http://localhost:7077/anonymous/');
  }
  getOneNote(id: string){
    return this._http.get(`http://localhost:7077/anonymous/${id}`);
  }
  
  createNote(newNote: any) {
      return this._http.post('http://localhost:7077/anonymous/', newNote);
  }

  updateNote(id : string, editNote : any){
    return this._http.put(`http://localhost:7077/anonymous/${id}`, editNote);
  }

  deleteNote(id : string){
    return this._http.delete(`http://localhost:7077/anonymous/${id}`);
  }

}
