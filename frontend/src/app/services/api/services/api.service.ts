/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { BoardResponse } from '../models/board-response';

@Injectable({
  providedIn: 'root',
})
export class ApiService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getBoards
   */
  static readonly GetBoardsPath = '/boards';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getBoards()` instead.
   *
   * This method doesn't expect any request body.
   */
  getBoards$Response(params?: {
  }): Observable<StrictHttpResponse<Array<BoardResponse>>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.GetBoardsPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<BoardResponse>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getBoards$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getBoards(params?: {
  }): Observable<Array<BoardResponse>> {

    return this.getBoards$Response(params).pipe(
      map((r: StrictHttpResponse<Array<BoardResponse>>) => r.body as Array<BoardResponse>)
    );
  }

}
