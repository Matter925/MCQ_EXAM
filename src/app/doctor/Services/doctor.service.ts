import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(private http:HttpClient) { }

  createSubject(model:any)
  {
   return this.http.post('http://localhost:3000/subjects',model)
  }
  updateSubject(model:any,id:number)
  {
   return this.http.put('http://localhost:3000/subjects/'+id,model)
  }

  getAllSubject()
  {
   return this.http.get('http://localhost:3000/subjects')
  }
  getSubject(id:number)
  {
   return this.http.get('http://localhost:3000/subjects/'+id)
  }
  delete(id:number)
  {
   return this.http.delete('http://localhost:3000/subjects/'+id)
  }
}
