import TrainApi from "./api.js";
import DataStore from "./datastore.js";
import getInput from "./prompt.js"

function ErrorQuit(e, code = 1) {
	console.error(e);
	Deno.exit(code);
}

let ds = new DataStore();

if(!ds.exists()) {
	try {
		ds.create();
	} catch (e) {
		ErrorQuit(`An error occured:\n${e}`);
	}
}

try {
	ds.load();
} catch (e) {
	ErrorQuit(`An error occured:\n${e}`);
}

let api;
if(!ds.get("session_id")) {
	console.warn(`You are not logged in, so most commands will not work.`)
	api = new TrainApi();
} else {
	try {
		api.init(ds.get("session_id"));
	} catch (e) {
		console.error(`An error occured:\n${e}`);
	}
}

function checkLoggedIn() {
	if(ds.get("session_id")) return true;
	return false;
}

export default function CommandLine(input) {
	switch(input[0]) {
		case "login":
			if(checkLoggedIn()) {
				console.log("You are already logged in. To switch accounts you must log out and then log back in again.");
				Deno.exit(0);
			} else {
				try {
					console.log("Please note that due to current limitation in deno, your password will be echoed to stdout. View this related issue about deno not providing a raw mode on Github: https://github.com/denoland/deno/issues/3614.");
					let username = getInput(Deno.stdin, Deno.stdout, "Username: ");
					let password = getInput(Deno.stdin, Deno.stdout, "Password: ");
					api.login(username, password);
				} catch(e) {
					ErrorQuit(`Could not login. Are your username and password correct? The error was:\n${e}`);
				}
			}
		default:
			console.log('choochoo v0.0.1.');
			break;
	}
}
