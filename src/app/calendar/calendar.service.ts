import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {MessageService} from '../message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { CalendarComponent} from '../calendar/calendar.component';
import { ReserveComponent} from '../reserve/reserve.component';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  APIUrl = 'https://localhost:44377';//API URL pending to make global
  
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  getReservations():  Observable<ReserveComponent>{
    return this.http.post<ReserveComponent>(this.APIUrl+'/reservation/available_dates', /*user,*/ this.httpOptions).pipe(      
      catchError(this.handleError<ReserveComponent>('getReservations'))
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
