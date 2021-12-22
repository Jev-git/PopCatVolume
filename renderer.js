let apps = document.getElementsByClassName("app");
for (let i = 0; i < apps.length; i++) {
	apps[i].onclick = function() {
		window.api.send("openExternal", apps[i].getAttribute("data-app"));
	}
}
