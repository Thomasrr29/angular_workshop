import { HttpClient } from '@angular/common/http';
import { Component, OnInit} from '@angular/core';
import {UpdateUser, UserDto} from './user.create.dto'
import { AnyTxtRecord } from 'dns';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit{


  private apiUrl = "http://localhost:3000/user"
  public users: any[] = [];

  public button_id = ''

  public newUser: UserDto = {
    username: '',
    email: '',
    country: ''
  }

  public updateUserDto: UpdateUser = {
    username: '',
    email: '',
    country: ''
  }

  public isCreateUserOpen = false;
  public isUpdateUserOpen = false;

  constructor(private http: HttpClient) { }


  ngOnInit(): any {
      this.http.get<any[]>(`${this.apiUrl}/all`)
     .subscribe(
      data => {
        console.log(data)
        this.users = data 
      }
     )

    
    return this.users
  } 

  createUser(event: Event){
    event.preventDefault()



    this.http.post(`${this.apiUrl}`, this.newUser).subscribe(

      {
        next: (response) => {
          
          console.log(response)
          console.log(`THE CREATION OF THE USER ${response} WAS SUCESSFULLY`)

        }, 
        error: (error) => {
          console.error(`THERE IS A ISSUE WITH THE USER CREATION ${error}`)
        }
      }
    )

  }

  openModalCreate(){
    this.isCreateUserOpen = true
  }

  closeModalCreate(){
    this.isCreateUserOpen = false
  }

  closeModalUpdate(){
    console.log('chupelo')
    this.isUpdateUserOpen = false
  }

  getId(event: Event){

    const id = (event.target as HTMLButtonElement).id
    this.button_id = id

    this.isUpdateUserOpen = true

  }

  updateUser(event: Event){
    event.preventDefault()

    const newObject = this.removeEmptyFields(this.updateUserDto)

    this.http.patch(`${this.apiUrl}/${this.button_id}`, newObject).subscribe(
      {
        next: (response) => {
          console.log(response)
        }, 
        error: (error) => {
          console.error(`PLEASE CHECK YOUR CREDENTIALS ${error}`)
        }
      }
    )
  }

  deleteUser(event: Event){

    const button_for_delete = (event.target as HTMLButtonElement).id

    this.http.delete(`${this.apiUrl}/${button_for_delete}`).subscribe(
      {
        next: (response) => {
          console.log(response)
        }, 
        error: (error) => {
          console.error(`ISSUE DELETING THE USER ${error}`)
        }
      }
      )
    console.log(event.target)

  }

  removeEmptyFields(object: any){

    let key: any;
      for (key in object) {
        if (object[key] === null || object[key] === undefined || object[key] === '') {
          delete object[key];
        }
      }
      return object;
  }
 
}
