import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface Employee {
  id: number;
  name: string;
  email: string;
  position: string;
  salary: number;
}


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private BASE_URL = 'http://localhost:3000';

  newEmployee!: Employee;

  constructor(private http: HttpClient) {

  }

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.BASE_URL}/employees`);
  }

  getEmployee(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.BASE_URL}/employees/${id}`);
  }

  createEmployee(data: Employee): Observable<Employee> {
    const employee = this.http.post<Employee>(`${this.BASE_URL}/employees`, data);
    // .pipe(
    //   catchError(error => {
    //     return of(error.error); //RJsx OF to emit the value
    //   })
    // );
    return employee;

  }

  updateEmployee(data: Employee, id: number): Observable<Employee> {
    return this.http.put<Employee>(`${this.BASE_URL}/employees/${id}`, data);
    // .pipe(
    //     catchError(error => {
    //       return of(error.error)
    //     })
    //   );
  }

  deleteEmployee(id: number): Observable<Employee> {
    return this.http.delete<Employee>(`${this.BASE_URL}/employees/${id}`);
  }

}
