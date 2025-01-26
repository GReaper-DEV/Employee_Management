import { Component, Inject, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Employee, EmployeeService } from '../service/employee.service';
import { NgIf } from '@angular/common';
import { UniqueEmailService } from '../service/unique-email.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { createUpdateEmployeeForm } from './create-update-employee.utils';



@Component({
  selector: 'app-create-update-employee',
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, NgIf, ReactiveFormsModule, MatDialogModule, MatProgressSpinnerModule],
  templateUrl: './create-update-employee.component.html',
  styleUrl: './create-update-employee.component.scss',
})

export class CreateUpdateEmployeeComponent implements OnInit {
  isUpdate: boolean = false;
  employeeForm!: FormGroup;
  employee!: Employee;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private apiService: EmployeeService,
    public dialogRef: MatDialogRef<CreateUpdateEmployeeComponent>,
    private uniqueEmailService: UniqueEmailService
  ) { }

  ngOnInit(): void {
    const { id } = this.data || {};

    this.employeeForm = createUpdateEmployeeForm();

    if (id) {
      this.isUpdate = true;
      this.loadEmployeeData(id);
    } else {
      // i had a problem with the asyncValidator so i made this [else]
      this.email?.setAsyncValidators(
        this.uniqueEmailService.UniqueEmailValidator('')
      );
    }
  }

  loadEmployeeData(id: number) {

    this.apiService.getEmployee(id).subscribe((employee) => {
      this.employeeForm.patchValue(employee)

      //async validation. use the current employee email, to check in Async Unique Email Validation
      this.email?.setAsyncValidators(
        this.uniqueEmailService.UniqueEmailValidator(this.email?.value)
      );
    })
  }

  onSubmit() {
    const formValues = this.employeeForm.value;

    if (this.employeeForm.invalid) return;

    const { id } = this.data || {};

    const request = id ?
      this.apiService.updateEmployee(formValues, id) :
      this.apiService.createEmployee(formValues);

    request.subscribe({
      next: (data) => this.dialogRef.close(data),
      error: (err) => console.log('error'),
      complete: () => { }
    })
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
