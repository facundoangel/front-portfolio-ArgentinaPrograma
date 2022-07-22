import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ResourceAjaxService {
  constructor(private http: HttpClient) {}

  getExperiences(): Observable<any> {
    return this.http.get('http://localhost:3000/experiences');
  }

  getEducations(): Observable<any> {
    return this.http.get('http://localhost:3000/educations');
  }

  getSkills(): Observable<any> {
    return this.http.get('http://localhost:3000/skills');
  }

  getProjects(): Observable<any> {
    return this.http.get('http://localhost:3000/projects');
  }
}
