const { app, BrowserWindow, ipcMain, Menu, Tray, nativeImage } = require('electron')
const path = require("path");
const audio = require("win-audio").speaker;

let mainWindow;
let tray = null;

function createWindow() {
	mainWindow = new BrowserWindow({
		width: 200,
		height: 200,
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
		alwaysOnTop: true,
		resizable: false,
		movable: false,
		focusable: false
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

	mainWindow.setIgnoreMouseEvents(true);

	setupAudio();
}

app.whenReady().then(() => {
	createWindow();

	app.on('activate', function () {
		if (BrowserWindow.getAllWindows().length === 0) createWindow();
	});

	const icon = nativeImage.createFromPath("images/pause.png");
	tray = new Tray(icon);
	const contextMenu = Menu.buildFromTemplate([
		{
			label: 'Quit',
			role: "quit"
		},
	]);
	tray.setToolTip("Pop Cat Volume Visualizer");
	tray.setContextMenu(contextMenu);
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
		mainWindow.webContents.send("muteToggled", muted.new, audio.get());
	});
}
