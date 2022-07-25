import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ResourceAjaxService {
  deleteStatus: String;
  url: String = 'http://localhost:3000/';

  constructor(private http: HttpClient) {}

  getExperiences(): Observable<any> {
    return this.http.get(`${this.url}experiences`);
  }

  getEducations(): Observable<any> {
    return this.http.get(`${this.url}educations`);
  }

  getSkills(): Observable<any> {
    return this.http.get(`${this.url}skills`);
  }

  getProjects(): Observable<any> {
    return this.http.get(`${this.url}projects`);
  }

  deleteResource(category: String, id: Number | null): void {
    this.http.delete(`${this.url}${category}/${id}`).subscribe({
      next: (data) => {
        alert('Delete successful');
      },
      error: (error) => {
        alert('error');
      },
    });
  }

  editResource(category: String, id: Number | null, data: any): void {
    this.http
      .put(`${this.url}${category}/${id}`, data, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      })
      .subscribe({
        next: (data) => {
          alert('Edit successful');
          console.log(data);
        },
        error: (error) => {
          alert(error.message);
        },
      });
  }

  createResource(category: String, data: any): void {
    this.http
      .post(`${this.url}${category}`, data, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      })
      .subscribe({
        next: (data) => {
          alert('Create successful');
          console.dir(data);
        },
        error: (error) => {
          alert(error.message);
        },
      });
  }
}
