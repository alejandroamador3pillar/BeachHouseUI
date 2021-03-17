import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ParametersComponent } from './parameters.component';
import {MessageService} from '../message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ParametersService {

  APIUrl = 'https://localhost:44377';//API URL pending to make global

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  getParameters(): Observable<ParametersComponent[]> {
    //const parameters = of(parameters)
    return this.http.get<ParametersComponent[]>(this.APIUrl+'/params')
    .pipe(
      tap(_ => this.log('fetched parameters')),
      catchError(this.handleError<ParametersComponent[]>('getParameters', []))
    );
  }

  getUsers(): Observable<ParametersComponent[]> {
    return this.http.get<ParametersComponent[]>(this.APIUrl+'/user')
    .pipe(
      catchError(this.handleError<ParametersComponent[]>('getUsers', []))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      console.error(error); // log to console instead

      this.log(`${operation} failed: ${error.message}`);
  
      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add(`ParameterService: ${message}`);
  }

}
