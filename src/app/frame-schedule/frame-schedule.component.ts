import { Component, OnInit } from '@angular/core';
import { Course } from '../models/course';
import { GetFrameScheduleService } from '../service/get-frame-schedule.service';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-frame-schedule',
  standalone: true,
  imports: [CommonModule,
            MatTableModule],
  templateUrl: './frame-schedule.component.html',
  styleUrl: './frame-schedule.component.scss'
})
export class FrameScheduleComponent implements OnInit {
  courses: Course[] = [];

  constructor(private GetFrameScheduleService: GetFrameScheduleService) { }

  ngOnInit(): void {
    this.courses = this.GetFrameScheduleService.getCourses();
  }
}
