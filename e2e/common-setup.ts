import { join } from 'path';
import * as electron from 'electron';
import { Application } from 'spectron';

export default function setup(): void {
	beforeEach(function () {
		const electronPath = electron.toString();

		this.app = new Application({
			// path: path.join(
			// 	__dirname,
			// 	'../node_modules/electron/dist/Electron.app/Contents/MacOS/Electron'
			// ),
			path: electronPath,

			// The following line tells spectron to look and use the main.js file
			// and the package.json located 1 level above.
			args: [join(__dirname, '..')],
			webdriverOptions: {},

			// From http://www.matthiassommer.it/programming/web/integration-e2e-test-electron-mocha-spectron-chai/ :

			env: {
				ELECTRON_ENABLE_LOGGING: true,
				ELECTRON_ENABLE_STACK_DUMPING: true,
				NODE_ENV: 'development'
			},
			startTimeout: 20000 // ,
			// chromeDriverLogPath: '../chromedriverlog.txt'
		});

		return this.app.start();
	});

	afterEach(function () {
		if (this.app && this.app.isRunning()) {
			this.app.stop();
		}
	});
}
