import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
// import { any } from './reserve.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import {MessageService} from '../message/message.service';
import { SocialAuthService } from 'lib';

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
    private messageService: MessageService,
    private authService: SocialAuthService) { }

  getReservations(): Observable<any[]> {
    return this.http.get<any[]>(this.APIUrl+'/reservations')
    .pipe(
      tap(_ => this.log('fetched Reservations')),
      catchError(this.handleError<any[]>('getReservations', []))
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
