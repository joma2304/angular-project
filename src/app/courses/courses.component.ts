import { Component, OnInit } from '@angular/core';
import { GetCoursesService } from '../service/get-courses.service';
import { Course } from '../models/course';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CourseTableComponent } from '../course-table/course-table.component';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, NgFor, CourseTableComponent],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent implements OnInit {
  courses: Course[] = [];
//Constructor för kurser
  constructor(private getCoursesService: GetCoursesService) { }
//Funktion för att hämta kurser från courseservice och läsa ut kurser
  ngOnInit(): void {
    this.getCoursesService.getCourses().subscribe((data: Course[]) => {
      this.courses = data;
    });
  }
}
