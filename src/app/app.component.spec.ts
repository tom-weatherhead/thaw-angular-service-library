// import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [AppComponent],
			imports: [
				RouterTestingModule // ,
				// BrowserModule,
				// AppRoutingModule,
			] //
			// schemas: [
			// 	CUSTOM_ELEMENTS_SCHEMA
			// ]
		}).compileComponents();
	}));

	it('should create the app', () => {
		const fixture = TestBed.createComponent(AppComponent);
		const app = fixture.debugElement.componentInstance;

		expect(app).toBeTruthy();
	});

	it(`should have as title 'thaw-angular-service-library'`, () => {
		const fixture = TestBed.createComponent(AppComponent);
		const app = fixture.debugElement.componentInstance;

		expect(app.title).toEqual('thaw-angular-service-library');
	});

	// it('should render title', () => {
	// 	const fixture = TestBed.createComponent(AppComponent);

	// 	fixture.detectChanges();

	// 	const compiled = fixture.debugElement.nativeElement;

	// 	expect(compiled.querySelector('.content span').textContent).toContain('thaw-angular-service-library app is running!');
	// });
});
