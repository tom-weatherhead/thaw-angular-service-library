// **** Modules ****
// import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
// import { FormsModule } from '@angular/forms'; // Needed for ngModel
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
// import { AppRoutingModule } from './app-routing.module';

// **** Services ****
import { HttpJsonClientModule } from './modules/http-json-client/http-json-client.module';

// **** Components ****

@NgModule({
	schemas: [],
	imports: [
		// AppRoutingModule,
		BrowserModule,
		// CommonModule,
		// FormsModule,
		HttpClientModule
	],
	declarations: [AppComponent],
	providers: [
		// E.g. Angular services
		HttpJsonClientModule
	],
	exports: [],
	bootstrap: [AppComponent]
})
export class AppModule {}
