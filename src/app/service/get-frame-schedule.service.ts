import { Injectable } from '@angular/core';
import { Course } from '../models/course';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
// för att hämta från localstorage
export class GetFrameScheduleService {

  Courses: Course[] = [];
  constructor() { }

  getFrameCourses() {
    this.Courses = [];
    if (localStorage.length >= 1) {
      for (let i = 0; i < localStorage.length; i++) {
        
        const key: string = localStorage.key(i)!;
        
        const value: string = localStorage.getItem(key)!;
        let newCourse: Course = JSON.parse(value);
        this.Courses.push(newCourse);
      }
    }
    return of(this.Courses);
  }
};
