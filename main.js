const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const audio = require("win-audio").speaker;

let mainWindow;

function createWindow () {
	mainWindow = new BrowserWindow({
		width: 128,
		height: 128,
		// width: 800,
		// height: 600,
		x: 40,
		y: 200,
		webPreferences: {
			nodeIntegration: false,
			contextIsolation: true,
			enableRemoteModule: false,
			preload: path.join(__dirname, 'preload.js'),
		},
		frame: false,
		transparent: true,
		minimizable: false,
		alwaysOnTop: true
	})

	mainWindow.loadFile('index.html')
	// mainWindow.webContents.openDevTools();

	mainWindow.on("hide", (event) => {
		event.preventDefault();
	})

	mainWindow.on("minimize", (event) => {
		event.preventDefault();
	})

	mainWindow.on("ready-to-show", () => {
		mainWindow.webContents.send("init", audio.isMuted(), audio.get());
	})

	setupAudio();
}

app.whenReady().then(() => {
	createWindow();

	app.on('activate', function () {
		if (BrowserWindow.getAllWindows().length === 0) createWindow();
	});
})

app.on('window-all-closed', function () {
	if (process.platform !== 'darwin') app.quit()
})

function setupAudio() {
	audio.polling(100);

	audio.events.on("change", (volume) => {
		mainWindow.webContents.send("volumeChanged", volume.new);
	});

	audio.events.on("toggle", (muted) => {
		mainWindow.webContents.send("mutedToggle", muted.new);
	});
}
