import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ColDef, RowClickedEvent } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';

@Component({
  selector: 'app-generic-list',
  standalone: true,
  imports: [AgGridAngular],
  template: `
    <div class="flex items-center justify-between mb-2">
      <h1 class="text-2xl font-semibold">{{ title }}</h1>
      <div class="flex items-center gap-4">
        <div class="relative">
          <input
            type="text"
            placeholder="Ara..."
            (input)="onSearch($event)"
            class="input-class"
          />
        </div>
        <button (click)="openAddModal()" class="button-class">Yeni Ekle</button>
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
