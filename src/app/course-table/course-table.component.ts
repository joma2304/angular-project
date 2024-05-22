import { Component, OnInit, ViewChild } from '@angular/core';
import { GetCoursesService } from '../service/get-courses.service';
import { Course } from '../models/course';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule, NgFor } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-course-table',
  standalone: true,
  imports: [CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    HttpClientModule,
    MatSelectModule,
    FormsModule,
    NgFor,
  ],
  templateUrl: './course-table.component.html',
  styleUrl: './course-table.component.scss'
})
export class CourseTableComponent implements OnInit {
  // Array med kolumnnamn som ska visas i tabellen
  displayedColumns: string[] = ['courseCode', 'courseName', 'points', 'subject', 'syllabus', 'addToSchedule'];
  dataSource: MatTableDataSource<Course> = new MatTableDataSource<Course>(); //Datakälla för tabellen
  // Array för att lagra unika ämnen
  uniqueSubjects: string[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  private Courses: Course[] = [];   // Array för att lagra hämtade kurser

  public selected: string = ""; // Valt ämne
  public subjects: string[] = []; // Lista med ämnen

  constructor(private getCoursesService: GetCoursesService, public dialog: MatDialog) { }

  ngOnInit(): void {
    // Hämta kurser från GetCoursesService och
    this.getCoursesService.getCourses().subscribe((data: Course[]) => {
      this.Courses = data; //Hämtade kurser läggs till i arrayen
      this.dataSource.data = data; //Datakälla till tabellen
      this.dataSource.paginator = this.paginator; //Paginator till datakällan
      this.dataSource.sort = this.sort; //Sortering till datakällan

      // Hämta unika ämnen från kurserna och fyll på ämneslistan
      this.uniqueSubjects = this.getUniqueSubjects(data);
      this.subjects = this.uniqueSubjects;
    });
  }
  //Funktion för att filter på tabellen
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  //FUnktion för att filtrera på valt ämne
  selectFilter(): void {
    if (this.selected === "") {
      // Om inget ämne är valt, visa alla kurser
      this.dataSource.data = this.Courses;
    } else {
      const subject = this.selected.toLowerCase();
      // Filtrera kurser baserat på valt ämne
      this.dataSource.data = this.Courses.filter(course => course.subject.toLowerCase() === subject);
    }

    // Återställ paginering och sortering
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    // Gå till första sidan av pagineringen
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  // Funktion för att hämta unika ämnen från en array med kurser
  private getUniqueSubjects(courses: Course[]): string[] {
    const subjects = new Set<string>();
    courses.forEach(course => subjects.add(course.subject));
    return Array.from(subjects);
  }

  // Metod för att lägga till kurs i ramschemat
  addToSchedule(course: Course): void {
    // Sparar kursen till localStorage med kurskod som nyckel
    localStorage.setItem(course.courseCode, JSON.stringify(course));
  }
}

