import { Component, Inject, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Employee, EmployeeService } from '../service/employee.service';
import { NgIf } from '@angular/common';


@Component({
  selector: 'app-create-update-employee',
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, NgIf, ReactiveFormsModule, MatDialogModule],
  templateUrl: './create-update-employee.component.html',
  styleUrl: './create-update-employee.component.scss',
})

export class CreateUpdateEmployeeComponent implements OnInit {
  isUpdate: boolean = false;
  employeeForm!: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private apiService: EmployeeService,
    public dialogRef: MatDialogRef<CreateUpdateEmployeeComponent>
  ) { }

  ngOnInit(): void {
    const { id } = this.data || {};

    this.employeeForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),

      email: new FormControl('', [
        Validators.required,
        Validators.email,
        //not sure on how to apply the unique email error
      ]),
      position: new FormControl(''),
      salary: new FormControl('', [
        Validators.pattern(/^\d+(\.\d{1,2})?$/)
      ]),
    });
    if (id) {
      this.isUpdate = true;
      this.loadEmployeeData(id);
    }
  }

  loadEmployeeData(id: number) {
    this.apiService.getEmployee(id).subscribe((employee) => {
      this.employeeForm.patchValue({
        name: employee.name,
        email: employee.email,
        position: employee.position,
        salary: employee.salary
      })
    })
  }

  onSubmit() {
    const formValues = this.employeeForm.value;

    if (this.employeeForm.invalid) return;

    const { id } = this.data || {};

    if (id) {
      this.apiService.updateEmployee(formValues, id).subscribe(
        {
          next: (data) => {
            this.dialogRef.close(data); //give back the updated Employee
          },
          error: (error) => console.error(error),
          complete: () => { }
        });
    } else {
      this.apiService.createEmployee(formValues).subscribe(
        {
          next: (data) => {
            this.dialogRef.close(data);
          },
          error: (error) => console.error(error),
          complete: () => { }
        });
    }
  }


  get name() {
    return this.employeeForm.get('name');
  }

  get email() {
    return this.employeeForm.get('email');
  }

  get salary() {
    return this.employeeForm.get('salary');
  }

}
