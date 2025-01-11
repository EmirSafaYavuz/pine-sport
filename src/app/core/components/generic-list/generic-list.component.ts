import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ColDef, RowClickedEvent } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';

@Component({
  selector: 'app-generic-list',
  standalone: true,
  imports: [AgGridAngular],
  template: `
    <div class="flex items-center justify-between mb-2">
      <h1 class="text-2xl font-semibold text-gray-800">{{ title }}</h1>
      <div class="flex items-center gap-4">
        <div class="relative">
          <input
            type="text"
            placeholder="Ara..."
            (input)="onSearch($event)"
            class="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-gray-700 w-64"
          />
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 absolute left-3 top-2.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <button (click)="openAddModal()" class="bg-primary text-white px-4 py-2 rounded-lg hover:opacity-90 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Yeni Ekle
        </button>
      </div>
    </div>
    <div class="h-[calc(100vh-15rem)]">
      <ag-grid-angular
        class="ag-theme-alpine w-full h-full"
        [rowData]="filteredData"
        [columnDefs]="columnDefs"
        (rowClicked)="onRowClicked($event)"
      ></ag-grid-angular>
    </div>
  `
})
export class GenericListComponent {
  @Input() title: string = '';
  @Input() rowData: any[] = [];
  @Input() columnDefs: ColDef[] = [];
  @Output() rowClicked = new EventEmitter<any>();
  @Output() addClicked = new EventEmitter<void>();

  filteredData: any[] = [];

  ngOnChanges() {
    this.filteredData = [...this.rowData];
  }

  onSearch(event: Event) {
    const searchText = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredData = this.rowData.filter(item =>
      JSON.stringify(item).toLowerCase().includes(searchText)
    );
  }

  openAddModal() {
    this.addClicked.emit();
  }

  onRowClicked(event: RowClickedEvent) {
    this.rowClicked.emit(event);
  }
}
