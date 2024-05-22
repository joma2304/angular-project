import { Injectable } from '@angular/core';
import { Course } from '../models/course';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
// för att hämta från localstorage
export class GetFrameScheduleService {

  Courses: Course[] = []; //Lagra kursdata
  constructor() { }

  getFrameCourses() {
    this.Courses = []; //Återställ till tom array
    if (localStorage.length >= 1) { //Kollar om det finns kurser i localstorage
      for (let i = 0; i < localStorage.length; i++) { //Loopa igenom dessa
        
        const key: string = localStorage.key(i)!; //Nyckel för den aktuella kursen
        
        const value: string = localStorage.getItem(key)!; //Hämta kursdata från localstorage baserat på nyckeln
        //Lägg till datan i Kurs-array
        let newCourse: Course = JSON.parse(value);
        this.Courses.push(newCourse);
      }
    }
    return of(this.Courses);
  }
};
