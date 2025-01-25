import { Component, Inject, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgIf } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CurrencyPipe } from '@angular/common';
import { Employee } from '../service/employee.service';


@Component({
  selector: 'app-employee-details',
  imports: [
    MatIconModule, 
    MatButtonModule, 
    MatDialogModule, 
    NgIf, 
    MatFormFieldModule, 
    MatInputModule,
    CurrencyPipe
  ],
  templateUrl: './employee-details.component.html',
  styleUrl: './employee-details.component.scss',

})
export class EmployeeDetailsComponent {

  employee: Employee;

  constructor(@Inject(MAT_DIALOG_DATA) public data: Employee) {
    this.employee = data;
  }

}
