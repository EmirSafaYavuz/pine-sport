import { Component, OnInit } from '@angular/core';
import { AgGridModule } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';
import { BreadcrumbComponent } from "../../../../core/components/breadcrumb/breadcrumb.component";
import { CommonModule } from '@angular/common';
import { TrainerService } from '../../../../core/services/trainer.service';
import { Trainer } from '../../../../core/models/trainer.model';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trainer-list',
  standalone: true,
  imports: [AgGridModule, BreadcrumbComponent, CommonModule, FormsModule],
  templateUrl: './trainer-list.component.html'
})
export class TrainerListComponent implements OnInit {
  rowData: Trainer[] = [];
  originalData: Trainer[] = [];
  searchText: string = '';

  columnDefs: ColDef[] = [
    { field: 'id', headerName: 'ID', sortable: true, filter: true },
    { field: 'fullName', headerName: 'Ad Soyad', sortable: true, filter: true },
    { field: 'email', headerName: 'E-posta', sortable: true, filter: true },
    { field: 'mobilePhone', headerName: 'Telefon', sortable: false, filter: true },
    { field: 'birthDate', headerName: 'Doğum Tarihi', sortable: true, filter: true },
    { field: 'gender', headerName: 'Cinsiyet', sortable: true, filter: true },
    { field: 'specialization', headerName: 'Uzmanlık', sortable: true, filter: true }
  ];

  defaultColDef = {
    cellStyle: { cursor: 'pointer' }
  };

  constructor(private trainerService: TrainerService, private router: Router) {}

  ngOnInit() {
    this.loadTrainers();
  }

  loadTrainers() {
    this.trainerService.getTrainers().subscribe({
      next: (result) => {
        if (result.success) {
          this.originalData = result.data ?? [];
          this.rowData = [...this.originalData];
        }
      },
      error: (error) => {
        console.error('Error loading trainers:', error);
      }
    });
  }

  onSearch(event: Event) {
    const searchTerm = (event.target as HTMLInputElement).value.toLowerCase();
    if (!searchTerm) {
      this.rowData = [...this.originalData];
      return;
    }

    this.rowData = this.originalData.filter(trainer =>
      trainer.fullName.toLowerCase().includes(searchTerm) ||
      trainer.email.toLowerCase().includes(searchTerm) ||
      trainer.mobilePhone.includes(searchTerm) ||
      trainer.specialization.toLowerCase().includes(searchTerm)
    );
  }

  onRowClicked(event: any) {
    const trainerId = event.data.id;
    this.router.navigate(['/trainers', trainerId]);
  }
}
