// src/app/modules/http-json-client/http-json-client.service.ts

import { Injectable } from '@angular/core';
import {
	HttpClient,
	HttpErrorResponse,
	HttpHeaders,
	HttpResponse
} from '@angular/common/http';

import { Observable, /* Observer, of, */ throwError } from 'rxjs';
// import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
// import { _throw } from 'rxjs/observable/throw';
import { catchError /* , retry, switchMap */ } from 'rxjs/operators';

interface IHttpJsonClientError {
	ok?: boolean;
	status?: number;
	statusText?: string;
	message?: string;
	url?: string;
}

export class HttpJsonClientError {
	public readonly ok?: boolean;
	public readonly status?: number;
	public readonly statusText?: string;
	public readonly message?: string;
	public readonly url?: string;

	constructor(args: IHttpJsonClientError = {}) {
		this.ok = args.ok;
		this.status = args.status;
		this.statusText = args.statusText;
		this.message = args.message;
		this.url = args.url;
	}
}

const httpOptions = {
	headers: new HttpHeaders({
		'Content-Type': 'application/json'
		// , 'Authorization': 'my-auth-token'
	})
};

@Injectable({
	providedIn: 'root'
})
export class HttpJsonClientService {
	constructor(private http: HttpClient) {}

	public get<T>(url: string): Observable<T> {
		return this.http.get<T>(url).pipe(
			// retry(3), // retry a failed request up to 3 times
			// catchError((error: any) => this.handleError('GET', url, error))
			catchError((error: HttpErrorResponse) =>
				this.handleError('GET', url, error)
			)
		);
	}

	public getHttpResponse<T>(url: string): Observable<HttpResponse<T>> {
		return this.http
			.get<T>(url, { observe: 'response' })
			.pipe(
				// retry(3), // retry a failed request up to 3 times
				// catchError((error: any) => this.handleError('GET', url, error))
				catchError((error: HttpErrorResponse) =>
					this.handleError('GET', url, error)
				)
			);
	}

	public post(url: string, body: unknown): Observable<unknown> {
		return this.http.post(url, body, httpOptions).pipe(
			// catchError((error: any) => this.handleError('POST', url, error))
			catchError((error: HttpErrorResponse) =>
				this.handleError('POST', url, error)
			)
		);
	}

	public put(url: string, body: unknown): Observable<unknown> {
		return this.http
			.put(url, body, httpOptions)
			.pipe(
				catchError((error: HttpErrorResponse) =>
					this.handleError('PUT', url, error)
				)
			);
	}

	public patch(url: string, body: unknown): Observable<unknown> {
		return this.http
			.patch(url, body, httpOptions)
			.pipe(
				catchError((error: HttpErrorResponse) =>
					this.handleError('PATCH', url, error)
				)
			);
	}

	public delete<T>(url: string): Observable<T> {
		return this.http.delete<T>(url).pipe(
			// retry(3), // retry a failed request up to 3 times
			catchError((error: HttpErrorResponse) =>
				this.handleError('DELETE', url, error)
			)
		);
	}

	public head<T>(url: string): Observable<T> {
		return this.http.head<T>(url).pipe(
			// retry(3), // retry a failed request up to 3 times
			catchError((error: HttpErrorResponse) =>
				this.handleError('HEAD', url, error)
			)
		);
	}

	public options<T>(url: string): Observable<T> {
		return this.http.options<T>(url).pipe(
			// retry(3), // retry a failed request up to 3 times
			catchError((error: HttpErrorResponse) =>
				this.handleError('OPTIONS', url, error)
			)
		);
	}

	// public makeIntentionalError() {
	// 	return this.get('not/a/real/url');

	// 	// const url = 'not/a/real/url';

	// 	// return this.http.get(url)
	// 	// 	.pipe(
	// 	// 		// catchError(this.handleError)
	// 	// 		catchError((error: HttpErrorResponse) => this.handleError('GET', url, error))
	// 	// 	);
	// }

	private handleError(
		httpMethod: string,
		url: string,
		error: HttpErrorResponse
	) {
		console.error('handleError() : error is', error);

		// if (!error || error.ok !== false) {
		if (!error) {
			// return throwError({
			// 	error: {error}, // Angular lint seems to prefer this to: error: error,
			// 	message: 'Default: Error caught in HttpJsonClientService.handleError()'
			// });

			return throwError(new HttpJsonClientError());
		}

		if (error.error instanceof ErrorEvent) {
			// A client-side or network error occurred. Handle it accordingly.
			console.error(
				'instanceof ErrorEvent. An error occurred:',
				error.error.message
			);
		} else {
			// The backend returned an unsuccessful response code.
			// The response body may contain clues as to what went wrong,
			console.error(
				`Not instanceof ErrorEvent. Backend returned code ${error.status}, body was:`,
				error.error
			);
		}

		// // return an ErrorObservable with a user-facing error message
		// // return new ErrorObservable('Something bad happened; please try again later.');
		// return throwError('Something bad happened; please try again later.');

		const result: IHttpJsonClientError = {};

		if (typeof error.ok === 'boolean') {
			result.ok = error.ok;
		}

		if (
			parseInt(error.status.toString(), 10) === error.status &&
			!Number.isNaN(error.status)
		) {
			result.status = error.status;
		}

		if (error.statusText) {
			result.statusText = error.statusText;
		}

		if (error.message) {
			result.message = error.message;
		}

		if (error.url) {
			result.url = error.url;
		}

		console.error(
			`${httpMethod} ${url} status: ${error.status} ${error.statusText}`
		);

		return throwError(new HttpJsonClientError(result));
	}
}
