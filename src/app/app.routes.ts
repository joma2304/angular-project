import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { CoursesComponent } from './courses/courses.component';
import { FrameScheduleComponent } from './frame-schedule/frame-schedule.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'courses', component: CoursesComponent},
    { path: 'ram', component: FrameScheduleComponent},
    { path: '', redirectTo: '/home', pathMatch: 'full'},
    { path: '404', component: NotFoundComponent}, 
    { path: '**', component: NotFoundComponent},

];
