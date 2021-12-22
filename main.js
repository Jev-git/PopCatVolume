const { app, BrowserWindow, shell, ipcMain } = require('electron')
const path = require('path')

function createWindow () {
	const mainWindow = new BrowserWindow({
		width: 350,
		height: 500,
		// width: 800,
		// height: 600,
		webPreferences: {
			nodeIntegration: false,
			contextIsolation: true,
			enableRemoteModule: false,
			preload: path.join(__dirname, 'preload.js')
		},
		frame: false,
		transparent: true
	})

	mainWindow.loadFile('index.html')
	// mainWindow.webContents.openDevTools();
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

ipcMain.on("openExternal", (event, args) => {
	shell.openExternal(args);
});
