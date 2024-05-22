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
  savedCourses: Course[] = [];

  constructor(private frameScheduleService: GetFrameScheduleService) { }

  ngOnInit(): void {
    this.frameScheduleService.getFrameCourses().subscribe(courses => {
      this.savedCourses = courses;
    });
  }
}


