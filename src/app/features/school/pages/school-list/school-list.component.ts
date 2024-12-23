import { Component, OnInit } from '@angular/core';
import { AgGridModule } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';
import { BreadcrumbComponent } from "../../../../core/components/breadcrumb/breadcrumb.component";
import { SchoolAddComponent } from '../school-add/school-add.component';
import { CommonModule } from '@angular/common';
import { SchoolService } from '../../../../core/services/school.service';
import { School } from '../../../../core/models/school.model';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-school-list',
  standalone: true,
  imports: [AgGridModule, BreadcrumbComponent, SchoolAddComponent, CommonModule, FormsModule],
  templateUrl: './school-list.component.html'
})
export class SchoolListComponent implements OnInit {
  rowData: School[] = [];
  originalData: School[] = [];
  searchText: string = '';

  columnDefs: ColDef[] = [
    { field: 'id', headerName: 'ID', sortable: true, filter: true },
    { field: 'name', headerName: 'Okul Adı', sortable: true, filter: true },
    { field: 'address', headerName: 'Adres', sortable: true, filter: true },
    { field: 'phone', headerName: 'Telefon', sortable: false, filter: true },
    { field: 'managerName', headerName: 'Yönetici Adı', sortable: true, filter: true },
    { field: 'managerPhone', headerName: 'Yönetici Telefonu', sortable: false, filter: true },
    { field: 'managerEmail', headerName: 'Yönetici E-posta', sortable: true, filter: true }
  ];

  showAddModal = false;

  defaultColDef = {
    cellStyle: { cursor: 'pointer' }
  };

  constructor(private schoolService: SchoolService, private router: Router) {}

  ngOnInit() {
    this.loadSchools();
  }

  loadSchools() {
    this.schoolService.getSchools().subscribe({
      next: (result) => {
        if (result.success) {
          this.originalData = result.data ?? [];
          this.rowData = [...this.originalData];
        }
      },
      error: (error) => {
        console.error('Error loading schools:', error);
      }
    });
  }

  toggleAddModal() {
    this.showAddModal = !this.showAddModal;
  }

  onSchoolAdded() {
    this.loadSchools();
    this.showAddModal = false; // Modal'ı direkt olarak kapatıyoruz
  }

  onSearch(event: Event) {
    const searchTerm = (event.target as HTMLInputElement).value.toLowerCase();
    if (!searchTerm) {
      this.rowData = [...this.originalData];
      return;
    }

    this.rowData = this.originalData.filter(school =>
      school.name.toLowerCase().includes(searchTerm) ||
      school.address.toLowerCase().includes(searchTerm) ||
      school.managerName.toLowerCase().includes(searchTerm) ||
      school.managerEmail.toLowerCase().includes(searchTerm) ||
      school.phone.includes(searchTerm) ||
      school.managerPhone.includes(searchTerm)
    );
  }

  onRowClicked(event: any) {
    const schoolId = event.data.id; // Adjust according to your data structure
    this.router.navigate(['/schools', schoolId]);
  }
}
