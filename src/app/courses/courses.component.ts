import { Component, OnInit } from '@angular/core';
import { GetCoursesService } from '../service/get-courses.service';
import { Course } from '../models/course';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, NgFor],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent implements OnInit {
  courses: Course[] = [];

  constructor(private getCoursesService: GetCoursesService) { }

  ngOnInit(): void {
    this.getCoursesService.getCourses().subscribe((data: Course[]) => {
      this.courses = data;
    });
  }
}
