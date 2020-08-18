import { HttpClientModule } from '@angular/common/http';
import { inject, TestBed } from '@angular/core/testing';

import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { HttpJsonClientService } from './http-json-client.service';

describe('HttpJsonClientService', () => {
	beforeEach(() =>
		TestBed.configureTestingModule({
			imports: [HttpClientModule],
			providers: [HttpJsonClientService]
		})
	);

	it('should be created', inject(
		[HttpJsonClientService],
		(service: HttpJsonClientService) => {
			expect(service).toBeTruthy();
		}
	));

	// it('should succeed when getting at a known good local URL', inject([HttpJsonClientService], async (service: HttpJsonClientService) => {
	// 	// const url = 'http://localhost:8080/';
	// 	const url = 'localhost:8080';
	// 	// const url = 'file://./config.json';
	// 	const result = await service.getHttpResponse(url)
	// 		.pipe(
	// 			catchError((error: any) => of(error))
	// 		)
	// 		.toPromise();

	// 	console.log('HttpJsonClientService.getHttpResponse() result:', result);
	// 	expect(result).toBeTruthy();
	// 	expect(result.ok).toBeTruthy();
	// 	expect(result.status).toBe(200);
	// }));

	it('should fail when making an intentional error', inject(
		[HttpJsonClientService],
		async (service: HttpJsonClientService) => {
			// expect.assertions(4);

			expect(service).toBeTruthy();

			const result = await service
				.getHttpResponse('not/a/real/url')
				.pipe(catchError((error: any) => of(error)))
				.toPromise();

			// console.log(
			// 	'HttpJsonClientService.getHttpResponse() result:',
			// 	result
			// );
			expect(result).toBeTruthy();
			expect(result.ok).toBeFalsy();
			expect(result.status).toBe(404);
		}
	));
});
