// angular import
import { Component } from '@angular/core';
import { Router ,RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export default class LoginComponent {

  email: string = '';
  password: string = '';

  constructor(private router: Router) {}

  onSubmit(email: string, password: string): void {
    // Replace this with real authentication logic
    if (email === 'info@sit.com' && password === '12345') {
      this.router.navigate(['/default']);
    } else {
      alert('Invalid email or password');
    }
  }
}