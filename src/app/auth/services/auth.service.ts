import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root',
 
})

export class AuthService {
 user= new Subject()
  constructor(private http:HttpClient) { }

  createUser(model:any)
  {
   return this.http.post('http://localhost:3000/students',model)
  }

  login(model:any)
  {
   return this.http.put('http://localhost:3000/login/1',model)
  }
  getUsers(type:string)
  {
   return this.http.get(`http://localhost:3000/${type}`)
  }

  getStudent(id:any)
  {
   return this.http.get('http://localhost:3000/students/'+id)
  }

  updateStudent(id:number,model:any)
  {
   return this.http.put('http://localhost:3000/students/'+id,model)
  }
  getRole()
  {
   return this.http.get('http://localhost:3000/login/1')
  }
}
