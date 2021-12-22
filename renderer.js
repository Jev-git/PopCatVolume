let appPaths = {
	"Effekseer": "file:///D:/Effekseer161e/Tool/Effekseer.exe",
	"Godot": "file:///D:/Godot_v3.4-stable_win64.exe",
	"Unity Hub": `file:///C:/Program Files/Unity Hub/Unity Hub.exe`,
	"GIMP": "file:///C:/Program Files/GIMP 2/bin/gimp-2.10.exe"
}

let apps = document.getElementsByClassName("app");
for (let i = 0; i < apps.length; i++) {
	apps[i].onclick = function() {
		window.api.send("openExternal", appPaths[apps[i].getAttribute("data-app")]);
	}
}
