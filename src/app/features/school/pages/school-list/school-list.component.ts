import { Component, OnInit } from '@angular/core';
import { AgGridModule } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';
import { SchoolService, School } from '../../services/school.service';

@Component({
  selector: 'app-school-list',
  standalone: true,
  imports: [AgGridModule],
  templateUrl: './school-list.component.html'
})
export class SchoolListComponent implements OnInit {
  rowData: School[] = [];

  columnDefs: ColDef[] = [
    { field: 'id', headerName: 'ID', sortable: true, filter: true },
    { field: 'name', headerName: 'School Name', sortable: true, filter: true },
    { field: 'location', headerName: 'Location', sortable: true, filter: true },
    { field: 'studentCount', headerName: 'Students', sortable: true, filter: true },
    { field: 'established', headerName: 'Est. Year', sortable: true, filter: true }
  ];

  constructor(private schoolService: SchoolService) {}

  ngOnInit() {
    this.rowData = this.schoolService.getSchools();
  }
}
