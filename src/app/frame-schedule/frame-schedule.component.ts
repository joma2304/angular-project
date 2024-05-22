import { Component, OnInit } from '@angular/core';
import { Course } from '../models/course';
import { GetFrameScheduleService } from '../service/get-frame-schedule.service';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';


@Component({
  selector: 'app-frame-schedule',
  standalone: true,
  imports: [CommonModule,
    MatTableModule,
    MatCardModule],
  templateUrl: './frame-schedule.component.html',
  styleUrl: './frame-schedule.component.scss'
})
export class FrameScheduleComponent implements OnInit {
   // Array för att lagra kurser
  savedCourses: Course[] = [];

  constructor(private frameScheduleService: GetFrameScheduleService) { }

  ngOnInit(): void {
    //Hämta kurser från ramschemat
    this.frameScheduleService.getFrameCourses().subscribe(courses => {
      //Lägg till dem i arrayen savedCourses
      this.savedCourses = courses;
    });
  }

  removeCourse(course: Course): void {
    const key = course.courseCode; // Hämta nyckel för kursen
    localStorage.removeItem(key); // Ta bort kursen från local storage med hjälp av key

    // Uppdatera savedCourses genom att filtrera bort den borttagna kursen
    this.savedCourses = this.savedCourses.filter(savedCourse => savedCourse.courseCode !== course.courseCode);
  }


}



