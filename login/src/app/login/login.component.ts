import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(
    private readonly http: HttpClient,
    private router: Router
  ){}

  private apiUrl = "http://localhost:3000/admin/logger"
  public password: string = ""
  public username: string = ""

  async formSubmit(e: Event) {
    e.preventDefault()

    const data = {username: this.username, password: this.password}

    this.http.post(`${this.apiUrl}`, data).subscribe(
     {
      next: (response) => {

        if(response){

          localStorage.setItem('access_token', JSON.stringify(response))
          this.router.navigate(['/users'])

        } else {
          console.error(`PLEASE CHECK YOUR CREDENTIALS`)
        }
        
      },
      error: (error) => {e
        console.error(`ISSUE WITH THE LOGIN ${error}`)
      }
     }
    )

  }

}
