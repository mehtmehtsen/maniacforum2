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

import { Board } from '../models/board';
import { Msg } from '../models/msg';
import { Thread } from '../models/thread';

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
   * Retrieves boards
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getBoards()` instead.
   *
   * This method doesn't expect any request body.
   */
  getBoards$Response(params?: {
  }): Observable<StrictHttpResponse<Array<Board>>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.GetBoardsPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<Board>>;
      })
    );
  }

  /**
   * Retrieves boards
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getBoards$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getBoards(params?: {
  }): Observable<Array<Board>> {

    return this.getBoards$Response(params).pipe(
      map((r: StrictHttpResponse<Array<Board>>) => r.body as Array<Board>)
    );
  }

  /**
   * Path part for operation getMsgs
   */
  static readonly GetMsgsPath = '/msg/{msgId}';

  /**
   * Retrieves all messages of a thread.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getMsgs()` instead.
   *
   * This method doesn't expect any request body.
   */
  getMsgs$Response(params: {

    /**
     * id of any msg.
     */
    msgId: number;
  }): Observable<StrictHttpResponse<Msg>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.GetMsgsPath, 'get');
    if (params) {
      rb.path('msgId', params.msgId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Msg>;
      })
    );
  }

  /**
   * Retrieves all messages of a thread.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getMsgs$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getMsgs(params: {

    /**
     * id of any msg.
     */
    msgId: number;
  }): Observable<Msg> {

    return this.getMsgs$Response(params).pipe(
      map((r: StrictHttpResponse<Msg>) => r.body as Msg)
    );
  }

  /**
   * Path part for operation getMsgs_1
   */
  static readonly GetMsgs_1Path = '/msgs/{threadId}';

  /**
   * Retrieves all messages of a thread.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getMsgs_1()` instead.
   *
   * This method doesn't expect any request body.
   */
  getMsgs_1$Response(params: {

    /**
     * id of any msg. For getting a thread, it should be the id of a msg with parent_id &#x3D; null.
     */
    threadId: number;
  }): Observable<StrictHttpResponse<Array<Msg>>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.GetMsgs_1Path, 'get');
    if (params) {
      rb.path('threadId', params.threadId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<Msg>>;
      })
    );
  }

  /**
   * Retrieves all messages of a thread.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getMsgs_1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getMsgs_1(params: {

    /**
     * id of any msg. For getting a thread, it should be the id of a msg with parent_id &#x3D; null.
     */
    threadId: number;
  }): Observable<Array<Msg>> {

    return this.getMsgs_1$Response(params).pipe(
      map((r: StrictHttpResponse<Array<Msg>>) => r.body as Array<Msg>)
    );
  }

  /**
   * Path part for operation getThreads
   */
  static readonly GetThreadsPath = '/threads/{boardId}';

  /**
   * Retrieves all threads in a board.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getThreads()` instead.
   *
   * This method doesn't expect any request body.
   */
  getThreads$Response(params: {

    /**
     * id of said board.
     */
    boardId: number;
  }): Observable<StrictHttpResponse<Array<Thread>>> {

    const rb = new RequestBuilder(this.rootUrl, ApiService.GetThreadsPath, 'get');
    if (params) {
      rb.path('boardId', params.boardId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<Thread>>;
      })
    );
  }

  /**
   * Retrieves all threads in a board.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getThreads$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getThreads(params: {

    /**
     * id of said board.
     */
    boardId: number;
  }): Observable<Array<Thread>> {

    return this.getThreads$Response(params).pipe(
      map((r: StrictHttpResponse<Array<Thread>>) => r.body as Array<Thread>)
    );
  }

}
