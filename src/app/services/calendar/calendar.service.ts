import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MessageService } from '../message/message.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
// import { CalendarComponent} from '../calendar/calendar.component';
// import { ReserveComponent} from '../reserve/reserve.component';
import {IReservationModel} from '../../models/reservation.model';
import { SocialAuthService, SocialUser } from 'lib';


@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  user:SocialUser;

  APIUrl = 'https://localhost:44377';//API URL pending to make global

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    //body: new HttpParams,
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private authService: SocialAuthService) {
      this.getUserData();
    }

  getReservations():  Observable<any[]>{
    return this.http.post<any[]>(this.APIUrl+'/reservations', /*user,*/ this.httpOptions).pipe(
      catchError(this.handleError<any[]>('getReservations'))
    );
  }

  getUserData():void{
    this.authService.authState.subscribe(user=>{this.user = user});
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

  setReservation(data: any, user_id: string): Observable<any> {
    var body: string = JSON.stringify({"StartDate": new Date(data.checkIn).toJSON(), "LocationId": 1, "Nights": data.nights} );
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'user_id': user_id,
      'requestor': user_id,
    });

    return this.http.post<any>(this.APIUrl+'/reservation', body, {headers})
    .pipe(
      tap((response: any) => {
        /* if(response.status == "200"){
            true;
        }else{
            console.log("Error cancelling reservation: " + response.status);
            false;
        } */
        response.body;
        console.log(response.body);
    })
      /*,
      catchError(this.handleError<Boolean[]>('setReservation', []))*/
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
