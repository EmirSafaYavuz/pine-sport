import { Component, OnInit } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { CommonModule } from '@angular/common';
import { SchoolService } from '../../../../core/services/school.service';
import { School } from '../../../../core/models/school.model';
import { Router } from '@angular/router';
import { GenericListComponent } from '../../../../core/components/generic-list/generic-list.component';
import { SchoolAddComponent } from '../school-add/school-add.component';

@Component({
  selector: 'app-school-list',
  standalone: true,
  imports: [CommonModule, GenericListComponent, SchoolAddComponent],
  templateUrl: './school-list.component.html'
})
export class SchoolListComponent implements OnInit {
  rowData: School[] = [];
  showAddModal = false;

  columnDefs: ColDef[] = [
    { field: 'id', headerName: 'ID', sortable: true, filter: true },
    { field: 'name', headerName: 'Okul Adı', sortable: true, filter: true },
    { field: 'address', headerName: 'Adres', sortable: true, filter: true },
    { field: 'phone', headerName: 'Telefon', sortable: false, filter: true },
    { field: 'managerName', headerName: 'Yönetici Adı', sortable: true, filter: true },
    { field: 'managerPhone', headerName: 'Yönetici Telefonu', sortable: false, filter: true },
    { field: 'managerEmail', headerName: 'Yönetici E-posta', sortable: true, filter: true }
  ];

  constructor(private schoolService: SchoolService, private router: Router) {}

  ngOnInit() {
    this.loadSchools();
  }

  loadSchools() {
    this.schoolService.getSchools().subscribe({
      next: (result) => {
        this.rowData = result ?? [];
      },
      error: (error) => {
        console.error('Error loading schools:', error);
      }
    });
  }

  handleRowClick(event: any) {
    const schoolId = event.data.id;
    this.router.navigate(['/schools', schoolId]);
  }

  handleAddClick() {
    this.router.navigate(['/schools/add']);
  }
}
