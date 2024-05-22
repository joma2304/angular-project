import { Injectable } from '@angular/core';
import { Course } from '../models/course';

@Injectable({
  providedIn: 'root'
})
export class GetFrameScheduleService {


  private storageKey = 'courses';

  constructor() { }

  addCourse(course: Course): void {
    const courses = this.getCourses();
    courses.push(course);
    localStorage.setItem(this.storageKey, JSON.stringify(courses));
  }

  getCourses(): Course[] {
    const courses = localStorage.getItem(this.storageKey);
    return courses ? JSON.parse(courses) : [];
  }
}
