import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
// import { UsersComponent } from './users.component';
import { MessageService } from '../message/message.service';
import {  HttpClient, HttpHeaders, HttpErrorResponse,} from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { SocialUser } from 'lib';
import { IUserModel } from '../../models/user.model';


@Injectable({
  providedIn: 'root',
})
export class UsersService {
   public APIUrl = environment.apiPath; //API URL

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  getUsers(): Observable<IUserModel[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'user_id': '108718868772086110488',
    });

    //const parameters = of(parameters)
    //return this.http.get<IUserModel[]>(this.APIUrl + '/user').pipe(
    return this.http.get<IUserModel[]>(this.APIUrl + '/user',{headers} ).pipe(
      tap((_) => this.log('fetched users')),
      catchError(this.handleError<IUserModel[]>('getUsers', []))
    );
  }

  setUsers(user: IUserModel): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'user_id': '108718868772086110488',
    });
    return this.http.put<IUserModel>(this.APIUrl + '/user', JSON.stringify({user}), {headers} ).pipe(
      tap((_) => this.log('seted user')),
      catchError(this.handleError<IUserModel[]>('setUser', []))
    );    
  }


  /** POST: add a new user to the server */
  addUser(user: SocialUser): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      user_id: user.id,
    });
    return this.http
      .post<any>(this.APIUrl + '/user/sign_in', user, { headers })
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
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead

      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add(`UserService: ${message}`);
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




