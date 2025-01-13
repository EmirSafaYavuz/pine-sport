import { Component, OnInit } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { CommonModule } from '@angular/common';
import { TrainerService } from '../../../../core/services/trainer.service';
import { Trainer } from '../../../../core/models/trainer.model';
import { Router } from '@angular/router';
import { GenericListComponent } from '../../../../core/components/generic-list/generic-list.component';

@Component({
  selector: 'app-trainer-list',
  standalone: true,
  imports: [CommonModule, GenericListComponent],
  template: `
    <div class="w-full p-4 h-[calc(100vh-10rem)]">
      <app-generic-list
        title="Eğitmenler"
        [rowData]="rowData"
        [columnDefs]="columnDefs"
        (rowClicked)="handleRowClick($event)"
        (addClicked)="handleAddClick()"
      >
      </app-generic-list>
    </div>
  `
})
export class TrainerListComponent implements OnInit {
  rowData: Trainer[] = [];

  columnDefs: ColDef[] = [
    { field: 'id', headerName: 'ID', sortable: true, filter: true },
    { field: 'fullName', headerName: 'Ad Soyad', sortable: true, filter: true },
    { field: 'email', headerName: 'E-posta', sortable: true, filter: true },
    { field: 'mobilePhone', headerName: 'Telefon', sortable: false, filter: true },
    { field: 'birthDate', headerName: 'Doğum Tarihi', sortable: true, filter: true },
    { field: 'gender', headerName: 'Cinsiyet', sortable: true, filter: true },
    { field: 'specialization', headerName: 'Uzmanlık', sortable: true, filter: true }
  ];

  constructor(private trainerService: TrainerService, private router: Router) {}

  ngOnInit() {
    this.loadTrainers();
  }

  loadTrainers() {
    this.trainerService.getTrainers().subscribe({
      next: (result) => {
        this.rowData = result ?? [];
      },
      error: (error) => {
        console.error('Error loading trainers:', error);
      }
    });
  }

  handleRowClick(event: any) {
    const trainerId = event.data.id;
    this.router.navigate(['/trainers', trainerId]);
  }

  handleAddClick() {
    this.router.navigate(['/trainers/register']);
  }
}
