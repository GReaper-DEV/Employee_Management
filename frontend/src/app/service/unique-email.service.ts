import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, debounceTime, delay, map, Observable, of, switchMap, timer } from 'rxjs';
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

  emailExists(email: string, currentEmail: string): Observable<boolean> {
    
    if (email === currentEmail) {
      return of(false);  // No conflict
    }
    return timer(1000).pipe(  // Delay request for 5000ms
      switchMap(() => this.http.get<Email[]>(`${this.BASE_URL}/?email=${email}`).pipe(
        map((emails) => emails.length > 0) // Check if any emails are found
      ))
    );
  }

  UniqueEmailValidator(currentEmail: string): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.emailExists(control.value, currentEmail).pipe(
        map(exists => (exists ? { emailExists: true } : null)),
        catchError(async (err) => null)
      )
    }
  }

}
