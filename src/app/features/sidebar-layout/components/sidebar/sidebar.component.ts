import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { FormsModule } from '@angular/forms';
import {
  heroHome,
  heroAcademicCap,
  heroUsers,
  heroCreditCard,
  heroChartBar,
  heroDocumentText,
  heroBell,
  heroUserGroup,
  heroCog6Tooth
} from '@ng-icons/heroicons/outline';
import { HeaderComponent } from "../header/header.component";
import { Result } from '../../../../core/models/result.model';
import { SidebarMenu } from '../../../../core/models/sidebar-menu.model';
import { UserService } from '../../../../core/services/user.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, NgIconComponent, FormsModule, HeaderComponent],
  providers: [provideIcons({
    heroHome,
    heroAcademicCap,
    heroUsers,
    heroCreditCard,
    heroChartBar,
    heroDocumentText,
    heroBell,
    heroUserGroup,
    heroCog6Tooth
  }), UserService],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {
  menuItems: SidebarMenu[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadMenuItems();
  }

  private loadMenuItems(): void {
    this.userService.getSidebarMenu().subscribe({
      next: (response: SidebarMenu[]) => {
        this.menuItems = response || [];
      },
      error: (error: any) => {
        console.error('Error loading menu items:', error);
      }
    });
  }
}
