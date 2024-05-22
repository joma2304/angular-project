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
  totalPoints: number = 0; // Variabel för att lagra det totala antalet poäng

  constructor(private frameScheduleService: GetFrameScheduleService) { }

  ngOnInit(): void {
    //Hämta kurser från ramschemat
    this.frameScheduleService.getFrameCourses().subscribe(courses => {
      //Lägg till dem i arrayen savedCourses
      this.savedCourses = courses;
      this.calculateTotalPoints(); // Uppdatera det totala antalet poäng 

    });
  }

    // Funktion för att beräkna det totala antalet poäng
    calculateTotalPoints(): void {
      this.totalPoints = this.savedCourses.reduce((total, course) => total + course.points, 0);
    }

  removeCourse(course: Course): void {
    const key = course.courseCode; // Hämta nyckel för kursen
    localStorage.removeItem(key); // Ta bort kursen från local storage med hjälp av key

    // Uppdatera savedCourses genom att filtrera bort den borttagna kursen
    this.savedCourses = this.savedCourses.filter(savedCourse => savedCourse.courseCode !== course.courseCode);

        // Uppdatera det totala antalet poäng
        this.calculateTotalPoints();
  }


}



