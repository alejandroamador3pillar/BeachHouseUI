import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { MessageService } from '../message/message.service';
import {  HttpClient, HttpHeaders, HttpErrorResponse,} from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { SocialUser } from 'lib';
import { ISeasonModel } from '../../models/season.model';


@Injectable({
  providedIn: 'root',
})
export class SeasonsService {
   public APIUrl = environment.apiPath; //API URL

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  getSeasons(): Observable<ISeasonModel[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'user_id': '112233445566',
    });


    return this.http.get<ISeasonModel[]>(this.APIUrl + '/season',{headers} ).pipe(
      tap((_) => this.log('fetched seasons')) 
    );
  }

  setSeasons(season: ISeasonModel): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'user_id': '112233445566',
    });
    return this.http.put<ISeasonModel>(this.APIUrl + '/season', season, {headers} ).pipe(
      tap((_) => this.log('seted season'))
    );
  }


  
  /* addSeason(season: SocialSeason): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      id: season.id,
    });
    return this.http
      .post<any>(this.APIUrl + '/season/sign_in', season, { headers })
      .pipe(
        catchError((e) => {
          let errorMsg: string;
          if (e.error instanceof ErrorEvent) {
            errorMsg = `Error ${e.error.message}`;
          } else {
            errorMsg = this.getServerErrorMessage(e);
          }
          return throwError(errorMsg);
        })
       );
  }*/

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead

      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add(`SeasonService: ${message}`);
  }

  private getServerErrorMessage(error: HttpErrorResponse): string {
    switch (error.status) {
      case 404: {
        return `Not Found: ${error.message}`;
      }
      case 403: {
        return `Access Denied: ${error.message}`;
      }
      case 401: {
        return `Unauthorized: ${error.message}`;
      }
      case 500: {
        return `Internal Server Error: ${error.message}`;
      }
      default: {
        return `Unknown Server Error: ${error.message}`;
      }
    }
  }
}


//--------------------------------------------------------------------------------------------------




