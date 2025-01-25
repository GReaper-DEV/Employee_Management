import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
// import { MatButtonModule } from '@angular/material/button';

import { Employee, EmployeeService } from '../service/employee.service';
import { EmployeeDetailsComponent } from '../employee-details/employee-details.component';
import { CreateUpdateEmployeeComponent } from '../create-update-employee/create-update-employee.component';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-employees-list',
  imports: [MatTableModule, MatIconModule, MatToolbarModule, MatButton],
  templateUrl: './employees-list.component.html',
  styleUrl: './employees-list.component.scss'
})

export class EmployeesListComponent implements OnInit {
  // @ViewChild(MatTable) table!: MatTable<Employee>;

  displayedColumns: string[] = ['id', 'name', 'actions', 'see_details'];
  employeesList: Employee[] = [];

  employee: any;


  readonly dialog = inject(MatDialog);

  constructor(private apiService: EmployeeService) { }

  ngOnInit(): void {
    this.apiService.getEmployees().subscribe((response) => {
      this.employeesList = response;
    });
  }

  openEmployeeDetails(event: MouseEvent, id: number) {
    this.apiService.getEmployee(id).subscribe((response) => {
      this.employee = response;
      this.dialog.open(EmployeeDetailsComponent, {
        data: this.employee
      });
    })


  }

  openEditDialog(event: MouseEvent, id: number) {
    event.stopPropagation();
    // this.employee = response;
    const dialogRef = this.dialog.open(CreateUpdateEmployeeComponent, {
      width: '500px',
      data: { id }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) {
        return;
      }
      const updatedList = this.employeesList.map((_employee) => {
        if (_employee.id == result.id) {
          return { ..._employee, ...result } //return result updated value and all others to the employee as updated
        }
        return _employee;
      })
      this.employeesList = updatedList;
      alert('User updated Successfully');
    });

  }

  openDeleteDialog(event: MouseEvent, id: number) {
    event.stopPropagation();
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '250px',
      data: {
        title: 'Confirm Delete',
        message: 'Are you sure you want to delete?',
        type: 'delete'
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) {
        return;
      }
      this.apiService.deleteEmployee(id).subscribe((response) => {
        this.employeesList = this.employeesList.filter((item: Employee) => item.id !== id);
      });
    })
  }

  openNewEmployeDialog(event: MouseEvent) {
    event.stopPropagation();
    const dialogRef = this.dialog.open(CreateUpdateEmployeeComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) {
        return;
      }
      this.employeesList = [...this.employeesList, result]
    });
  }

}
