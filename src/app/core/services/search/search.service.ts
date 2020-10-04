import { Injectable } from '@angular/core';
import { CoreService, ResponseGetProfileSearch, ResponseGetPageSearch } from '../core/core.service';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError  } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class SearchService {
  
  constructor( private CoreService: CoreService) {}

  UserByNameOrPseudo(valueSearch: string, page: string = '1', limit: string = '25' ): Observable<ResponseGetProfileSearch> {
    return this.CoreService.GetSearchUser(valueSearch)
    .pipe(
      map(( ObjectFound: ResponseGetProfileSearch) => ObjectFound),
      catchError((error) => {
          return throwError(error);
      })
    );
  }

  FriendProfile(valueSearch: string, page: string = '1', limit: string = '25' ): Observable<ResponseGetProfileSearch> {
    return this.CoreService.FriendProfile(valueSearch)
    .pipe(
      map(( ObjectFound: ResponseGetProfileSearch) => ObjectFound),
      catchError((error) => {
          return throwError(error);
      })
    );
  }

  PageByName(valueSearch: string, page: string = '1', limit: string = '25' ): Observable<ResponseGetPageSearch> {
    return this.CoreService.GetSearchPage(valueSearch)
    .pipe(
      map(( ObjectFound: ResponseGetPageSearch) => ObjectFound),
      catchError((error) => {
          return throwError(error);
      })
    );
  }

}
