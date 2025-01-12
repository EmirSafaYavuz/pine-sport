import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { BranchService } from '../../../../core/services/branch.service';
import { Branch } from '../../../../core/models/branch.model';

@Component({
  selector: 'app-branch-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './branch-detail.component.html'
})
export class BranchDetailComponent implements OnInit {
  branch?: Branch = undefined;
  loading = true;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private branchService: BranchService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.fetchBranchDetails(id);
  }

  private fetchBranchDetails(id: number) {
    this.branchService.getBranchById(id).subscribe({
      next: (response) => {
        this.branch = response ?? undefined;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Şube bilgileri yüklenirken bir hata oluştu.';
        this.loading = false;
      }
    });
  }
}
