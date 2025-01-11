import { Component, OnInit } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { CommonModule } from '@angular/common';
import { StudentService } from '../../../../core/services/student.service';
import { Router } from '@angular/router';
import { GenericListComponent } from '../../../../core/components/generic-list/generic-list.component';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [CommonModule, GenericListComponent],
  template: `
    <div class="w-full p-4 h-[calc(100vh-10rem)]">
      <app-generic-list
        title="Öğrenciler"
        [rowData]="rowData"
        [columnDefs]="columnDefs"
        (rowClicked)="handleRowClick($event)"
        (addClicked)="handleAddClick()"
      >
      </app-generic-list>
    </div>
  `
})
export class StudentListComponent implements OnInit {
  rowData: any[] = [];

  columnDefs: ColDef[] = [
    { field: 'id', headerName: 'ID', sortable: true, filter: true },
    { field: 'name', headerName: 'Ad', sortable: true, filter: true },
    { field: 'surname', headerName: 'Soyad', sortable: true, filter: true },
    { field: 'schoolName', headerName: 'Okul', sortable: true, filter: true },
    { field: 'className', headerName: 'Sınıf', sortable: true, filter: true },
    { field: 'parentName', headerName: 'Veli', sortable: true, filter: true }
  ];

  constructor(private studentService: StudentService, private router: Router) {}

  ngOnInit() {
    this.loadStudents();
  }

  loadStudents() {
    this.studentService.getStudents().subscribe({
      next: (result) => {
        this.rowData = result ?? [];
      },
      error: (error) => {
        console.error('Error loading students:', error);
      }
    });
  }

  handleRowClick(event: any) {
    const studentId = event.data.id;
    this.router.navigate(['/students', studentId]);
  }

  handleAddClick() {
    this.router.navigate(['/students/register']);
  }
}
