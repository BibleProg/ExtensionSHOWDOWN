document.getElementById("options").addEventListener("click", Option);
document.getElementById("Charger").addEventListener("click", Charger);
document.getElementById("Restaurer").addEventListener("click", Restaurer);
document.getElementById("Sauvegarder").addEventListener("click", Sauvegarder);
document.getElementById("parambutton").addEventListener("click", Set_params);
document.getElementById("annuler").addEventListener("click", Annuler);
document.getElementById("logout").addEventListener("click", Logout);

function Charger(){
	browser.tabs.query({currentWindow: true, active: true}).then((tab) => {
		var id = tab[0].id;
		browser.tabs.sendMessage(id, {"text":"charger"});
	});
}

function Restaurer(){
	browser.tabs.query({currentWindow: true, active: true}).then((tab) => {
		var id = tab[0].id;
		browser.tabs.sendMessage(id, {"text":"restaurer"});
	});
}

function Sauvegarder(){
	browser.tabs.query({currentWindow: true, active: true}).then((tab) => {
		var id = tab[0].id;
		browser.tabs.sendMessage(id, {"text":"sauvegarder"});
	});
}

function Option(){
	browser.storage.local.get().then((key) =>{
		document.getElementsByName("token")[0].value = key.token;
		document.getElementsByName("username")[0].value = key.username;
	});

	document.getElementById("actions").hidden = true;
	document.getElementById("parametres").hidden = false;

	// browser.tabs.query({currentWindow: true, active: true}).then((tab) => {
	// 	var id = tab[0].id;
	// 	browser.tabs.sendMessage(id, {"text":"test"});
	// });
}

function Set_params() {
	document.getElementById("actions").hidden = false;
	document.getElementById("parametres").hidden = true;
	let token = document.getElementsByName("token")[0].value;
	let username = document.getElementsByName("username")[0].value;
	console.debug(token, username);
	let conf = {
		"token" : token,
		"username" : username
	};

	browser.storage.local.set(conf);
}

function Annuler() {
	// window.close();
	document.getElementById("actions").hidden = false;
	document.getElementsByName("token").value = '';
	document.getElementsByName("username").value = '';
	document.getElementById("parametres").hidden = true;
}

function Logout() {
	browser.storage.local.remove("token").then();
	browser.storage.local.remove("username").then();
	Annuler();
}

