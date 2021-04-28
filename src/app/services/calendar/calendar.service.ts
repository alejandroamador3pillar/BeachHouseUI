import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MessageService } from '../message/message.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
// import { CalendarComponent} from '../calendar/calendar.component';
// import { ReserveComponent} from '../reserve/reserve.component';
import {IReservationModel} from '../../models/reservation.model';


@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  APIUrl = 'https://localhost:44377';//API URL pending to make global
  
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    //body: new HttpParams,
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  getReservations():  Observable<any[]>{
    return this.http.post<any[]>(this.APIUrl+'/reservations', /*user,*/ this.httpOptions).pipe(      
      catchError(this.handleError<any[]>('getReservations'))
    ); 
  }

  getAvailableDates(month: number, year: number):  Observable<IReservationModel[]>{
    var body: string = JSON.stringify({"Month": month, "Year": year} );

    return this.http.post<IReservationModel[]>(this.APIUrl+'/reservation/available_dates', body, this.httpOptions)
    .pipe(
      tap(_ => this.log('fetched Available Dates')),
      catchError(this.handleError<IReservationModel[]>('getAvailableDates', []))
    ); 
  }

  getCancelReservation(user_id: number, reservation_id: number):  Observable<Boolean[]>{
    var body: string = JSON.stringify({"user_id": user_id, "reservation_id": reservation_id} );

    return this.http.put<Boolean[]>(this.APIUrl+'/reservation/cancel', body, this.httpOptions)
    .pipe(
      tap((response: any) => {
        if(response.status == "200"){
            true;                 
        }else{
            console.log("Error cancelling reservation: " + response.status);
            false;
        }
    })
      ,
      catchError(this.handleError<Boolean[]>('getCancelReservation', []))
    ); 
  }

  setReservation(): Observable<IReservationModel[]> {
    var body: string = JSON.stringify({"StartDate": new Date().toLocaleDateString(), "LocationId": 1, "Nights": 1} );

    return this.http.post<IReservationModel[]>(this.APIUrl+'/reservation', body, {headers: new HttpHeaders({ 'user_id': '101790084427153843849' }),})
    .pipe(
      tap((response: any) => {
        if(response.status == "200"){
            true;                 
        }else{
            console.log("Error cancelling reservation: " + response.status);
            false;
        }
    })
      ,
      catchError(this.handleError<Boolean[]>('getCancelReservation', []))
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
