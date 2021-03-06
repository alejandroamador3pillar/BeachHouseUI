import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
// import { any } from './reserve.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import {MessageService} from '../message/message.service';
import { SocialAuthService } from 'lib';
import { DatePipe } from '@angular/common';

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
    private authService: SocialAuthService,
    private datePipe: DatePipe) { }

  getReservations(): Observable<any[]> {
    return this.http.get<any[]>(this.APIUrl+'/reservations')
    .pipe(
      tap(_ => this.log('fetched Reservations')),
      catchError(this.handleError<any[]>('getReservations', []))
    );

  }


  cancelReservation(user_id: number, reservation_id: number):  Observable<Boolean[]>{
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

  getReservationsByUser(user_id: string): Observable<any[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'user_id': user_id, //change for global user_id
      'requestor': user_id,
      'mode': '1' //only active
    });
    return this.http.get<any[]>(this.APIUrl+'/reservation/user_reservations',{headers})
    .pipe(
      tap(_ => this.log('fetched Reservations')),
      catchError(this.handleError<any[]>('getReservations', []))
    );
  }


  getPrice(datetime:Date, days:number ): Observable<any> {
    var d = this.datePipe.transform(datetime,"yyyy-MM-dd").toString();
    console.log(d);
    return this.http.get(this.APIUrl+'/reservation/price/'+d+'/'+days)
    .pipe(
      tap(_ => this.log('fetched Reservations'))
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
