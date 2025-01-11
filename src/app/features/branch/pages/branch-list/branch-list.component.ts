import { Component, OnInit } from '@angular/core';
import { AgGridModule } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';
import { BreadcrumbComponent } from "../../../../core/components/breadcrumb/breadcrumb.component";
import { CommonModule } from '@angular/common';
import { BranchService } from '../../../../core/services/branch.service';
import { Branch } from '../../../../core/models/branch.model';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BranchRegisterComponent } from '../branch-register/branch-register.component';

@Component({
  selector: 'app-branch-list',
  standalone: true,
  imports: [AgGridModule, BreadcrumbComponent, CommonModule, FormsModule, BranchRegisterComponent],
  templateUrl: './branch-list.component.html'
})
export class BranchListComponent implements OnInit {
  rowData: Branch[] = [];
  originalData: Branch[] = [];
  searchText: string = '';
  showAddModal = false;

  columnDefs: ColDef[] = [
    { field: 'id', headerName: 'ID', sortable: true, filter: true },
    { field: 'name', headerName: 'Şube Adı', sortable: true, filter: true },
    { field: 'address', headerName: 'Adres', sortable: true, filter: true },
    { field: 'phone', headerName: 'Telefon', sortable: false, filter: true },
    { field: 'schoolId', headerName: 'Okul ID', sortable: true, filter: true }
  ];

  defaultColDef = {
    cellStyle: { cursor: 'pointer' }
  };

  constructor(private branchService: BranchService, private router: Router) {}

  ngOnInit() {
    this.loadBranches();
  }

  loadBranches() {
    this.branchService.getBranches().subscribe({
      next: (result) => {
        if (result.success) {
          this.originalData = result.data ?? [];
          this.rowData = [...this.originalData];
        }
      },
      error: (error) => {
        console.error('Error loading branches:', error);
      }
    });
  }

  onSearch(event: Event) {
    const searchTerm = (event.target as HTMLInputElement).value.toLowerCase();
    if (!searchTerm) {
      this.rowData = [...this.originalData];
      return;
    }

    this.rowData = this.originalData.filter(branch =>
      branch.name.toLowerCase().includes(searchTerm) ||
      branch.address.toLowerCase().includes(searchTerm) ||
      branch.phone.includes(searchTerm)
    );
  }

  onRowClicked(event: any) {
    const branchId = event.data.id;
    this.router.navigate(['/branches', branchId]);
  }

  toggleAddModal() {
    this.showAddModal = !this.showAddModal;
  }

  onBranchAdded() {
    this.loadBranches();
    this.showAddModal = false;
  }
}
