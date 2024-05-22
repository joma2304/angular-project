import { Component, OnInit, ViewChild } from '@angular/core';
import { GetCoursesService } from '../service/get-courses.service';
import { Course } from '../models/course';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { CourseDetailsComponent } from '../course-details/course-details.component';
import { CommonModule, NgFor } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-course-table',
  standalone: true,
  imports: [CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    HttpClientModule,
    MatSelectModule,
    FormsModule,
    NgFor
  ],
  templateUrl: './course-table.component.html',
  styleUrl: './course-table.component.scss'
})
export class CourseTableComponent implements OnInit {
  displayedColumns: string[] = ['courseCode', 'courseName', 'points', 'subject', 'syllabus', 'actions'];
  dataSource: MatTableDataSource<Course> = new MatTableDataSource<Course>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private getCoursesService: GetCoursesService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getCoursesService.getCourses().subscribe((data: Course[]) => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openCourseDetails(course: Course): void {
    this.dialog.open(CourseDetailsComponent, {
      data: { course }
    });
  }
}
