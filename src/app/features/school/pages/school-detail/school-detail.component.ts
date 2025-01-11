import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { SchoolService } from '../../../../core/services/school.service';
import { School } from '../../../../core/models/school.model';

@Component({
  selector: 'app-school-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './school-detail.component.html',
  styleUrl: './school-detail.component.css'
})
export class SchoolDetailComponent implements OnInit {
  school?: School;
  loading = true;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private schoolService: SchoolService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.fetchSchoolDetails(id);
  }

  private fetchSchoolDetails(id: number) {
    this.schoolService.getSchoolById(id).subscribe({
      next: (response) => {
        this.school = response ?? undefined;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Okul bilgileri yüklenirken bir hata oluştu.';
        this.loading = false;
      }
    });
  }
}
