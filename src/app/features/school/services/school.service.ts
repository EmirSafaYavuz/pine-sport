import { Injectable } from '@angular/core';

export interface School {
  id: number;
  name: string;
  location: string;
  studentCount: number;
  established: number;
}

@Injectable({
  providedIn: 'root'
})
export class SchoolService {
  private mockSchools: School[] = [
    { id: 1, name: 'Pine Valley High', location: 'New York', studentCount: 1200, established: 1990 },
    { id: 2, name: 'Riverside Academy', location: 'Los Angeles', studentCount: 800, established: 2000 },
    { id: 3, name: 'Mountain View School', location: 'Denver', studentCount: 650, established: 1985 },
    { id: 4, name: 'Sunset Elementary', location: 'Miami', studentCount: 450, established: 2010 },
    { id: 5, name: 'Central High', location: 'Chicago', studentCount: 1500, established: 1975 },
    { id: 1, name: 'Pine Valley High', location: 'New York', studentCount: 1200, established: 1990 },
    { id: 2, name: 'Riverside Academy', location: 'Los Angeles', studentCount: 800, established: 2000 },
    { id: 3, name: 'Mountain View School', location: 'Denver', studentCount: 650, established: 1985 },
    { id: 4, name: 'Sunset Elementary', location: 'Miami', studentCount: 450, established: 2010 },
    { id: 5, name: 'Central High', location: 'Chicago', studentCount: 1500, established: 1975 },
    { id: 1, name: 'Pine Valley High', location: 'New York', studentCount: 1200, established: 1990 },
    { id: 2, name: 'Riverside Academy', location: 'Los Angeles', studentCount: 800, established: 2000 },
    { id: 3, name: 'Mountain View School', location: 'Denver', studentCount: 650, established: 1985 },
    { id: 4, name: 'Sunset Elementary', location: 'Miami', studentCount: 450, established: 2010 },
    { id: 5, name: 'Central High', location: 'Chicago', studentCount: 1500, established: 1975 },
    { id: 1, name: 'Pine Valley High', location: 'New York', studentCount: 1200, established: 1990 },
    { id: 2, name: 'Riverside Academy', location: 'Los Angeles', studentCount: 800, established: 2000 },
    { id: 3, name: 'Mountain View School', location: 'Denver', studentCount: 650, established: 1985 },
    { id: 4, name: 'Sunset Elementary', location: 'Miami', studentCount: 450, established: 2010 },
    { id: 5, name: 'Central High', location: 'Chicago', studentCount: 1500, established: 1975 },
    { id: 1, name: 'Pine Valley High', location: 'New York', studentCount: 1200, established: 1990 },
    { id: 2, name: 'Riverside Academy', location: 'Los Angeles', studentCount: 800, established: 2000 },
    { id: 3, name: 'Mountain View School', location: 'Denver', studentCount: 650, established: 1985 },
    { id: 4, name: 'Sunset Elementary', location: 'Miami', studentCount: 450, established: 2010 },
    { id: 5, name: 'Central High', location: 'Chicago', studentCount: 1500, established: 1975 },
    { id: 1, name: 'Pine Valley High', location: 'New York', studentCount: 1200, established: 1990 },
    { id: 2, name: 'Riverside Academy', location: 'Los Angeles', studentCount: 800, established: 2000 },
    { id: 3, name: 'Mountain View School', location: 'Denver', studentCount: 650, established: 1985 },
    { id: 4, name: 'Sunset Elementary', location: 'Miami', studentCount: 450, established: 2010 },
    { id: 5, name: 'Central High', location: 'Chicago', studentCount: 1500, established: 1975 },
    { id: 1, name: 'Pine Valley High', location: 'New York', studentCount: 1200, established: 1990 },
    { id: 2, name: 'Riverside Academy', location: 'Los Angeles', studentCount: 800, established: 2000 },
    { id: 3, name: 'Mountain View School', location: 'Denver', studentCount: 650, established: 1985 },
    { id: 4, name: 'Sunset Elementary', location: 'Miami', studentCount: 450, established: 2010 },
    { id: 5, name: 'Central High', location: 'Chicago', studentCount: 1500, established: 1975 },
    { id: 1, name: 'Pine Valley High', location: 'New York', studentCount: 1200, established: 1990 },
    { id: 2, name: 'Riverside Academy', location: 'Los Angeles', studentCount: 800, established: 2000 },
    { id: 3, name: 'Mountain View School', location: 'Denver', studentCount: 650, established: 1985 },
    { id: 4, name: 'Sunset Elementary', location: 'Miami', studentCount: 450, established: 2010 },
    { id: 5, name: 'Central High', location: 'Chicago', studentCount: 1500, established: 1975 },
    { id: 1, name: 'Pine Valley High', location: 'New York', studentCount: 1200, established: 1990 },
    { id: 2, name: 'Riverside Academy', location: 'Los Angeles', studentCount: 800, established: 2000 },
    { id: 3, name: 'Mountain View School', location: 'Denver', studentCount: 650, established: 1985 },
    { id: 4, name: 'Sunset Elementary', location: 'Miami', studentCount: 450, established: 2010 },
    { id: 5, name: 'Central High', location: 'Chicago', studentCount: 1500, established: 1975 },
    { id: 1, name: 'Pine Valley High', location: 'New York', studentCount: 1200, established: 1990 },
    { id: 2, name: 'Riverside Academy', location: 'Los Angeles', studentCount: 800, established: 2000 },
    { id: 3, name: 'Mountain View School', location: 'Denver', studentCount: 650, established: 1985 },
    { id: 4, name: 'Sunset Elementary', location: 'Miami', studentCount: 450, established: 2010 },
    { id: 5, name: 'Central High', location: 'Chicago', studentCount: 1500, established: 1975 },
    { id: 1, name: 'Pine Valley High', location: 'New York', studentCount: 1200, established: 1990 },
    { id: 2, name: 'Riverside Academy', location: 'Los Angeles', studentCount: 800, established: 2000 },
    { id: 3, name: 'Mountain View School', location: 'Denver', studentCount: 650, established: 1985 },
    { id: 4, name: 'Sunset Elementary', location: 'Miami', studentCount: 450, established: 2010 },
    { id: 5, name: 'Central High', location: 'Chicago', studentCount: 1500, established: 1975 },
  ];

  getSchools(): School[] {
    return this.mockSchools;
  }
}
