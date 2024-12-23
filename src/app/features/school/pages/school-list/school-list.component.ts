import { Component, OnInit } from '@angular/core';
import { AgGridModule } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';
import { BreadcrumbComponent } from "../../../../core/components/breadcrumb/breadcrumb.component";
import { SchoolAddComponent } from '../school-add/school-add.component';
import { CommonModule } from '@angular/common';
import { SchoolService } from '../../../../core/services/school.service';
import { School } from '../../../../core/models/school.model';

@Component({
  selector: 'app-school-list',
  standalone: true,
  imports: [AgGridModule, BreadcrumbComponent, SchoolAddComponent, CommonModule],
  templateUrl: './school-list.component.html'
})
export class SchoolListComponent implements OnInit {
  rowData: School[] = [];

  columnDefs: ColDef[] = [
    { field: 'id', headerName: 'ID', sortable: true, filter: true },
    { field: 'name', headerName: 'School Name', sortable: true, filter: true },
    { field: 'address', headerName: 'Address', sortable: true, filter: true },
    { field: 'phone', headerName: 'Phone', sortable: false, filter: true },
    { field: 'managerName', headerName: 'Manager Name', sortable: true, filter: true },
    { field: 'managerPhone', headerName: 'Manager Phone', sortable: false, filter: true },
    { field: 'managerEmail', headerName: 'Manager Email', sortable: true, filter: true }
  ];

  showAddModal = false;

  constructor(private schoolService: SchoolService) {}

  ngOnInit() {
    this.loadSchools();
  }

  loadSchools() {
    this.schoolService.getSchools().subscribe({
      next: (result) => {
        if (result.success) {
          this.rowData = result.data ?? [];
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
    this.toggleAddModal();
    this.loadSchools(); // Refresh the grid with updated data
  }
}
