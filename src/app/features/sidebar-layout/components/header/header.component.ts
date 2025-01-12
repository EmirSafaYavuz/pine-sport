import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { Profile } from '../../../../core/models/profile.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  profile?: Profile;
  userRole?: string;
  isProfileLoading = true;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.loadProfile();
  }

  private loadProfile(): void {
    this.isProfileLoading = true;
    this.authService.getProfile().subscribe({
      next: (profile) => {
        this.profile = profile;
        this.userRole = this.getRoleLabel(profile.role);
      },
      complete: () => {
        this.isProfileLoading = false;
      }
    });
  }

  private getRoleLabel(role: string): string {
    const roleLabels: { [key: string]: string } = {
      'admin': 'Yönetici',
      'school': 'Okul',
      'branch': 'Şube',
      'student': 'Öğrenci',
      'parent': 'Veli',
      'trainer': 'Eğitmen'
    };
    return roleLabels[role] || role;
  }
}
