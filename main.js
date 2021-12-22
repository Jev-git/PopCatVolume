const { app, BrowserWindow, shell, ipcMain } = require('electron')
const path = require('path')

function createWindow () {
	const mainWindow = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			nodeIntegration: false,
			contextIsolation: true,
			enableRemoteModule: false,
			preload: path.join(__dirname, 'preload.js')
		},
		frame: true,
		transparent: false
	})

	mainWindow.loadFile('index.html')
	mainWindow.webContents.openDevTools();
	// openGodot();
}

app.whenReady().then(() => {
	createWindow()

	app.on('activate', function () {
		if (BrowserWindow.getAllWindows().length === 0) createWindow()
		console.log('asdfasdf');
	})
})

app.on('window-all-closed', function () {
	if (process.platform !== 'darwin') app.quit()
})

function openGodot() {
	shell.openExternal(`D:\Godot_v3.4-stable_win64.exe`);
}

ipcMain.on("openExternal", (event, args) => {
	if (args == "godot") {
		openGodot();
	}
});
