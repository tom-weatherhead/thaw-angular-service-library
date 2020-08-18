import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import {
	// HttpJsonClientError,
	HttpJsonClientService
} from './http-json-client.service';

@NgModule({
	imports: [HttpClientModule],
	// declarations: [HttpJsonClientError],
	providers: [HttpJsonClientService] // ,
	// exports: [HttpJsonClientService]
})
export class HttpJsonClientModule {}
