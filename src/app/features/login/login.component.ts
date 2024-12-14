import { Component } from '@angular/core';
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
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  private getRoleBasedRoute(role: Role): string {
    const roleName = role.name.toLowerCase();
    switch (roleName) {
      case 'admin':
        return '/admin-dashboard';
      case 'school':
        return '/school-dashboard';
      case 'branch':
        return '/branch-dashboard';
      case 'student':
        return '/student-dashboard';
      case 'parent':
        return '/parent-dashboard';
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
          if (response.success && response.data) {
            const roleBasedRoute = this.getRoleBasedRoute(response.data.role);
            this.router.navigate([roleBasedRoute]);
          } else {
            this.errorMessage = response.message || 'Giriş başarısız';
          }
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
