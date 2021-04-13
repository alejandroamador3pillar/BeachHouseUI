import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { ParametersComponent } from './parameters.component';
import { MessageService } from '../message.service';
import {  HttpClient, HttpHeaders, HttpErrorResponse,} from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { SocialUser } from 'lib';
import { IParameterModel } from '../domain/ParameterModel';

@Injectable({
  providedIn: 'root',
})
export class ParametersService {
   public APIUrl = environment.apiPath; //API URL

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  getParameters(): Observable<IParameterModel[]> {
    //const parameters = of(parameters)
    return this.http.get<IParameterModel[]>(this.APIUrl + '/params').pipe(
      tap((_) => this.log('fetched parameters')),
      catchError(this.handleError<IParameterModel[]>('getParameters', []))
    );
  }
  
  setParameter(parameter: IParameterModel): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      user_id: parameter.updated_by,
    });
    return this.http.put<IParameterModel>(this.APIUrl + '/params', parameter, {headers} ).pipe(
      tap((_) => this.log('seted parameter')),
      catchError(this.handleError<IParameterModel[]>('setParameter', []))
    );
  }


  //Users pending to move

  getUsers(): Observable<ParametersComponent[]> {
    return this.http.get<ParametersComponent[]>(this.APIUrl + '/users').pipe(
      tap((_) => this.log('fetched Users')),
      catchError(this.handleError<ParametersComponent[]>('getUsers', []))
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
    this.messageService.add(`ParameterService: ${message}`);
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
