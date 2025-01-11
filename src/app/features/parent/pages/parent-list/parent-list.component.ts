import { Component, OnInit } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { CommonModule } from '@angular/common';
import { ParentService } from '../../../../core/services/parent.service';
import { Router } from '@angular/router';
import { GenericListComponent } from '../../../../core/components/generic-list/generic-list.component';

@Component({
  selector: 'app-parent-list',
  standalone: true,
  imports: [CommonModule, GenericListComponent],
  template: `
    <div class="w-full p-4 h-[calc(100vh-10rem)]">
      <app-generic-list
        title="Veliler"
        [rowData]="rowData"
        [columnDefs]="columnDefs"
        (rowClicked)="handleRowClick($event)"
        (addClicked)="handleAddClick()"
      >
      </app-generic-list>
    </div>
  `
})
export class ParentListComponent implements OnInit {
  rowData: any[] = [];

  columnDefs: ColDef[] = [
    { field: 'id', headerName: 'ID', sortable: true, filter: true },
    { field: 'name', headerName: 'Ad', sortable: true, filter: true },
    { field: 'surname', headerName: 'Soyad', sortable: true, filter: true },
    { field: 'phone', headerName: 'Telefon', sortable: false, filter: true },
    { field: 'email', headerName: 'E-posta', sortable: true, filter: true }
  ];

  constructor(private parentService: ParentService, private router: Router) {}

  ngOnInit() {
    this.loadParents();
  }

  loadParents() {
    this.parentService.getParents().subscribe({
      next: (result) => {
        this.rowData = result ?? [];
      },
      error: (error) => {
        console.error('Error loading parents:', error);
      }
    });
  }

  handleRowClick(event: any) {
    const parentId = event.data.id;
    this.router.navigate(['/parents', parentId]);
  }

  handleAddClick() {
    this.router.navigate(['/parents/register']);
  }
}
