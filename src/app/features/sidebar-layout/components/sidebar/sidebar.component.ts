import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

interface MenuItem {
  label: string;
  icon: string;
  route: string;
  children?: MenuItem[];
  isOpen?: boolean;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  menuItems: MenuItem[] = [
    { label: 'Ana Sayfa', icon: 'dashboard-icon', route: '/dashboard', isOpen: false },
    {
      label: 'Okul ve Şube Yönetimi',
      icon: 'school-icon',
      route: '/schools',
      isOpen: false,
      children: [
        { label: 'Okulları Listele', route: '/schools', icon: 'list-icon' },
        { label: 'Okul Ekle', route: '/schools/add', icon: 'add-icon' },
        { label: 'Şubeleri Listele', route: '/branches', icon: 'list-icon' },
        { label: 'Şube Ekle', route: '/branches/add', icon: 'add-icon' }
      ]
    },
    {
      label: 'Kursiyer Takip',
      icon: 'users-icon',
      route: '/students',
      isOpen: false,
      children: [
        { label: 'Öğrenci Kayıt', route: '/students/register', icon: 'register-icon' },
        { label: 'Veli Bilgileri', route: '/students/parents', icon: 'info-icon' },
        { label: 'Seanslar', route: '/students/sessions', icon: 'session-icon' },
        { label: 'Eğitmenler', route: '/students/trainers', icon: 'trainer-icon' }
      ]
    },
    {
      label: 'Ödeme Yönetimi',
      icon: 'payment-icon',
      route: '/payments',
      isOpen: false,
      children: [
        { label: 'Ödeme Planları', route: '/payments/plans', icon: 'plan-icon' },
        { label: 'Ödemeler', route: '/payments/transactions', icon: 'transaction-icon' },
        { label: 'Bildirimler', route: '/payments/notifications', icon: 'notification-icon' }
      ]
    },
    {
      label: 'Sporcu Gelişimi',
      icon: 'growth-icon',
      route: '/development',
      isOpen: false,
      children: [
        { label: 'Ölçümler', route: '/development/measurements', icon: 'measurement-icon' },
        { label: 'Değerlendirmeler', route: '/development/evaluations', icon: 'evaluation-icon' },
        { label: 'Gelişim Grafikleri', route: '/development/charts', icon: 'chart-icon' }
      ]
    },
    {
      label: 'Raporlar',
      icon: 'report-icon',
      route: '/reports',
      isOpen: false,
      children: [
        { label: 'Öğrenci Raporları', route: '/reports/students', icon: 'student-report-icon' },
        { label: 'Seans Raporları', route: '/reports/sessions', icon: 'session-report-icon' },
        { label: 'Finansal Raporlar', route: '/reports/financial', icon: 'financial-report-icon' }
      ]
    },
    {
      label: 'Bildirim Yönetimi',
      icon: 'notification-icon',
      route: '/notifications',
      isOpen: false
    },
    {
      label: 'Kullanıcı Yönetimi',
      icon: 'user-icon',
      route: '/users',
      isOpen: false,
      children: [
        { label: 'Yönetici Kullanıcıları', route: '/users/admins', icon: 'admin-icon' },
        { label: 'Eğitmen Kullanıcıları', route: '/users/trainers', icon: 'trainer-icon' },
        { label: 'Veli Kullanıcıları', route: '/users/parents', icon: 'parent-icon' }
      ]
    },
    {
      label: 'Ayarlar',
      icon: 'settings-icon',
      route: '/settings',
      isOpen: false
    }
  ];
}
