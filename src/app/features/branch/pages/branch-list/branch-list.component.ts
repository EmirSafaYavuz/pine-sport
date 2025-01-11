import { Component, OnInit } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { CommonModule } from '@angular/common';
import { BranchService } from '../../../../core/services/branch.service';
import { Branch } from '../../../../core/models/branch.model';
import { Router } from '@angular/router';
import { GenericListComponent } from '../../../../core/components/generic-list/generic-list.component';

@Component({
  selector: 'app-branch-list',
  standalone: true,
  imports: [CommonModule, GenericListComponent],
  template: `
    <div class="w-full p-4 h-[calc(100vh-10rem)]">
      <app-generic-list
        title="Şubeler"
        [rowData]="rowData"
        [columnDefs]="columnDefs"
        (rowClicked)="handleRowClick($event)"
        (addClicked)="handleAddClick()"
      >
      </app-generic-list>
    </div>
  `
})
export class BranchListComponent implements OnInit {
  rowData: Branch[] = [];
  showAddModal = false;

  columnDefs: ColDef[] = [
    { field: 'id', headerName: 'ID', sortable: true, filter: true },
    { field: 'name', headerName: 'Şube Adı', sortable: true, filter: true },
    { field: 'address', headerName: 'Adres', sortable: true, filter: true },
    { field: 'phone', headerName: 'Telefon', sortable: false, filter: true },
    { field: 'schoolId', headerName: 'Okul ID', sortable: true, filter: true }
  ];

  constructor(private branchService: BranchService, private router: Router) {}

  ngOnInit() {
    this.loadBranches();
  }

  loadBranches() {
    this.branchService.getBranches().subscribe({
      next: (result) => {
        if (result.success) {
          this.rowData = result.data ?? [];
        }
      },
      error: (error) => {
        console.error('Error loading branches:', error);
      }
    });
  }

  handleRowClick(event: any) {
    const branchId = event.data.id;
    this.router.navigate(['/branches', branchId]);
  }

  handleAddClick() {
    this.router.navigate(['/branches/register']);
  }
}
