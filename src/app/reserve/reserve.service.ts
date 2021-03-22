import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ReserveComponent } from './reserve.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import {MessageService} from '../message.service';

@Injectable({
  providedIn: 'root'
})
export class ReserveService {
  APIUrl = 'https://localhost:44377';//API URL pending to make global
  
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  getReservations(): Observable<ReserveComponent[]> {
    return this.http.get<ReserveComponent[]>(this.APIUrl+'/reservations')
    .pipe(
      tap(_ => this.log('fetched Reservations')),
      catchError(this.handleError<ReserveComponent[]>('getReservations', []))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      console.error(error); 
  
      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add(`ParameterService: ${message}`);
  }

}
