import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, debounceTime, delay, map, Observable, of } from 'rxjs';
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';


export interface Email {
  email?: string;
}


@Injectable({
  providedIn: 'root'
})
export class UniqueEmailService {

  private BASE_URL = 'http://localhost:3000/employees';

  constructor(private http: HttpClient) { }

  emailExists(email: string): Observable<boolean> {
    return this.http.get<Email[]>(`${this.BASE_URL}/?email=${email}`).pipe(
      debounceTime(500),
      map((emails) => emails.length > 0) // Check if any emails are found
    );
  }

  UniqueEmailValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.emailExists(control.value).pipe(
        map(exists => (exists ? {emailExists: true} : null)),
        catchError(async (err) => null)
      )
    }
  }

}
