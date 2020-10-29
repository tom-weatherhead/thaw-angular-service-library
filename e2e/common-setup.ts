import { Application } from 'spectron';

import * as path from 'path';

export default function setup(): void {
	beforeEach(async function () {
		this.app = new Application({
			path: path.join(
				__dirname,
				'../node_modules/electron/dist/Electron.app/Contents/MacOS/Electron'
			),
			// The following line tells spectron to look and use the main.js file
			// and the package.json located 1 level above.
			args: [path.join(__dirname, '..')],
			webdriverOptions: {}
		});

		await this.app.start();
	});

	afterEach(async function () {
		if (this.app && this.app.isRunning()) {
			await this.app.stop();
		}
	});
}
