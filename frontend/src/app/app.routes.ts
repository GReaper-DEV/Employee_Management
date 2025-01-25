import { Routes } from '@angular/router';
import {EmployeesListComponent} from './employees-list/employees-list.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'employees',
        pathMatch: 'full',
    },
    {
        path: 'employees',
        title: 'Employees',
        component: EmployeesListComponent    
    },
];
