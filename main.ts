// thaw-angular-service-library/main.ts

// import * as fs from 'fs';
import * as os from 'os';

import {
	app,
	BrowserWindow,
	// ipcMain,
	// Menu,
	screen // ,
	// TouchBar,
	// Tray
} from 'electron';

const platform = os.platform(); // TODO? : Use process.platform instead?
// const isPlatformWindows = platform === 'win32';
const isPlatformMac = platform === 'darwin';
// const isPlatformLinux = platform === 'linux';

// const screen = !isPlatformWindows && require('electron').screen;

let win;

// macOS: The screen is 1680x1050 (??? I thought it was 2880x1800. The difference between logical pixels and device pixels, I would guess.)

// For Windows 10 VM with 1920x1200 display:
// const browserWindowWidth = 1200;
// const browserWindowHeight = 850;

// const icoIconFilePath = './dist/assets/favicon.ico';

// const pngIconFilePath = './dist/assets/forexus-nipple-icon01-128x128.png';
// const pngIconFilePath = './dist/assets/forexus-green-f-01-96x96.png';
// const pngIconFilePath = './dist/assets/icons/macos-dock/IMG_8608_256x256.png';
// let pngIconFilePath = '';

// const pngIconFilePathTray = './dist/assets/favicon.png';
// We use a 24x24 PNG image for the macOS tray icon. (TODO: Try 22x22)
// const pngIconFilePathTray =
// 	'./dist/assets/icons/macos-tray/forexus-nipple-icon01-024x024.png';

// Randomly choose a pngIconFilePath by searching for PNG files in a given directory:

// **** BEGIN : Use this because thaw-common-utils is an ESModule ****
// function getRandomNonNegativeInteger(n) {
// 	// Returns a value in the range [0, 1, 2, ..., n - 1].

// 	if (Number.isNaN(n) || n <= 0) {
// 		return NaN;
// 	}

// 	if (n !== Math.floor(n)) {
// 		throw new Error(
// 			`getRandomNonNegativeInteger() : ${n} is not an integer.`
// 		);
// 	}

// 	return Math.floor(Math.random() * n);
// }

// function getRandomArrayElement(array) {
// 	if (!array.length) {
// 		return undefined;
// 	}

// 	return array[getRandomNonNegativeInteger(array.length)];
// }
// // **** END ****

// async function getPathToRandomAppIconPNGFile(dirPath) {
// 	let filePaths = await fs.promises.readdir(dirPath);

// 	filePaths = (filePaths || [])
// 		.filter((s) => s.match(/\.png$/i))
// 		.map((s) => `${dirPath}${s}`);

// 	// return thawCommonUtilities.getRandomArrayElement(filePaths) || '';

// 	return getRandomArrayElement(filePaths) || '';
// }

// const appIconPNGFilesDir = './src/assets/icons/macos-dock/';

// See https://electronjs.org/docs/api/app#appdisablehardwareacceleration
// app.disableHardwareAcceleration();

// TODO: Use app.isUnityRunning() on Linux?

if (isPlatformMac) {
	app.setAboutPanelOptions({
		applicationName: 'Electron Test App',
		applicationVersion: '0.0.0',
		copyright: 'Copyright (c) 2018-2020 Buckwheat Unlimited',
		version: '0.0.0',
		credits: 'Praise the LORD!',
		authors: ['Buckwheat'],
		website: 'https://2hrd4u.org' // ,
		// iconPath: pngIconFilePath
	});
}

// function setDockMenu() {
// 	if (!isPlatformMac) {
// 		return;
// 	}

// 	// const { Menu } = require('electron');
// 	// import { Menu } from 'electron';

// 	const dockMenu = Menu.buildFromTemplate([
// 		{
// 			label: 'New Window',
// 			click() {
// 				console.log('New Window');
// 			}
// 		},
// 		{
// 			label: 'New Window with Settings',
// 			submenu: [
// 				{
// 					label: 'Basic'
// 				},
// 				{
// 					label: 'Pro'
// 				}
// 			]
// 		},
// 		{
// 			label: 'New Foo Command...'
// 		}
// 	]);

// 	app.dock.setMenu(dockMenu);

// 	getPathToRandomAppIconPNGFile(appIconPNGFilesDir).then(
// 		(appIconPNGFile) => {
// 			console.log('Using app icon at', appIconPNGFile);
// 			pngIconFilePath = appIconPNGFile;
// 			app.dock.setIcon(appIconPNGFile);
// 		}
// 	);
// }

// On macOS: function createWindow (launchInfo) {
// function createWindow(launchInfo) {
function createWindow() {
	// launchInfo is defined only on macOS
	// console.log('launchInfo is', typeof launchInfo, launchInfo);

	// if (!isPlatformMac && !isPlatformWindows) {
	// 	console.log('platform is', typeof platform, platform);
	// }

	// const faviconFilePath = isPlatformWindows
	// 	? icoIconFilePath
	// 	: pngIconFilePathTray;
	// macOS: This icon appears briefly in the Menu Bar, not scaled.
	// -> Use a PNG that is less than 32x32.
	// const tray = new Tray(faviconFilePath);
	const primaryDisplayWorkArea = screen.getPrimaryDisplay().workArea;

	const browserWindowConfig = {
		backgroundColor: '#ffffff',
		// backgroundColor: '#7851a9', // From the TouchBar button
		// icon: 'assets/favicon.png',
		// icon: faviconFilePath, // ThAW: Does this have any effect?
		title: 'Angular Service Electron Test App',
		x: primaryDisplayWorkArea.x,
		y: primaryDisplayWorkArea.y,
		width: primaryDisplayWorkArea.width,
		height: primaryDisplayWorkArea.height,
		webPreferences: {
			allowRunningInsecureContent: false,
			// contextIsolation and worldSafeExecuteJavaScript:
			// See https://stackoverflow.com/questions/63427191/security-warning-in-the-console-of-browserwindow-electron-9-2-0
			// See also https://www.electronjs.org/docs/api/browser-window#class-browserwindow
			contextIsolation: false, // false if you want to run e2e tests with Spectron
			enableRemoteModule: true, // true if you want to run e2e tests with Spectron or use remote module in renderer context (ie. Angular)
			nodeIntegration: true // ,
			// preload: '/absolute/path/to/some/preload.js'
			// preload: `${__dirname}/preload.js`
			// worldSafeExecuteJavaScript: true
		}
	};

	// Create the browser window.
	win = new BrowserWindow(browserWindowConfig);

	win.loadFile('e2e/index.html');
	// win.loadFile(`file://${__dirname}/dist/index.html`);

	// Event that fires when the window is closed.
	win.on('closed', () => {
		win = null;
	});

	// Uncomment the line below to open the DevTools.
	// win.webContents.openDevTools();

	// Configure the application's icon in the tray

	// tray.on('click', () => {
	// 	win.isVisible() ? win.hide() : win.show();
	// });

	// setDockMenu(); // macOS only
}

// Create the browser window upon Electron intialization:
app.on('ready', createWindow);

app.on('activate', () => {
	if (!win) {
		createWindow();
	}
});

// macOS: Terminate the app when all of the app's windows are closed.
app.on('window-all-closed', () => {
	if (isPlatformMac) {
		app.quit();
	}
});
