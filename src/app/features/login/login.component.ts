import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { Role } from '../../core/models/role.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  providers: [AuthService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['emirsafayavuz@gmail.com', [Validators.required, Validators.email]],
      password: ['Emirsafa34!', Validators.required]
    });
  }

  ngOnInit() {
    localStorage.removeItem('auth_token');
  }

  private getRoleBasedRoute(role: string): string {
    const roleName = role.toLowerCase();
    switch (roleName) {
      case 'admin':
        return '/dashboard/admin';
      case 'school':
        return '/dashboard/school';
      case 'branch':
        return '/dashboard/branch';
      case 'student':
        return '/dashboard/student';
      case 'parent':
        return '/dashboard/parent';
      case 'trainer':
        return '/dashboard/trainer';
      default:
        return '/';
    }
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';

      this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
            const roleBasedRoute = this.getRoleBasedRoute(response.role);
            this.router.navigate([roleBasedRoute]);
        },
        error: (error) => {
          this.errorMessage = 'E-posta veya şifre hatalı.';
          this.isLoading = false;
        },
        complete: () => {
          this.isLoading = false;
        }
      });
    }
  }
}
