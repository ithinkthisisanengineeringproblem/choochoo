import TrainApi from "./api.js";
import DataStore from "./datastore.js";

let ds = new DataStore();

if(!ds.exists()) {
	try {
		ds.create();
	} catch (e) {
		console.error(`An error occured:\n${e}`);
	}
}

try {
	ds.load();
} catch (e) {
	console.error(`An error occured:\n${e}`);
}

let api;
if(!ds.get("session_id")) {
	console.warn(`You are not logged in, so most commands will not work.`)
	api = new TrainApi();
} else {
	try {
		api.init(ds.get("session_id")[]);
	} catch (e) {
		console.error(`An error occured:\n${e}`);
	}
}

checkLoggedIn() {
	if(ds.get("session_id")) return true;
	return false;
}

export default function CommandLine(input) {
	switch(input[0]) {
		default:
			console.log('choochoo v0.0.1.');
			break;
	}
}
