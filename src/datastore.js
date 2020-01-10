import { existsSync, readJsonSync, writeJsonSync, ensureDirSync, ensureFileSync } from "https://deno.land/std/fs/mod.ts";

const DATA_STORE_DIR = Deno.dir("home") + './.choochoo/';
const DATA_STORE_LOCATION = DATA_STORE_DIR + 'config.json';

export default class DataStore {
	constructor() {

	}

	exists() {
		if(!existsSync(DATA_STORE_LOCATION)) return false;
		return true;
	}

	create() {
		try {
			ensureDirSync(DATA_STORE_DIR);
			ensureFileSync(DATA_STORE_LOCATION);
			writeJsonSync(DATA_STORE_LOCATION, {
				defaultLanguage: 'c++11',
				currentProblem: '73'
			});
		} catch (e) {
			throw `Could not create the data store. The error was ${e}`;
		}
	}

	load() {
		try {
			this.datastore = readJsonSync(DATA_STORE_LOCATION);
		} catch (e) {
			throw `Could not open the data store. The error was: ${e}`;
		}
	}

	save() {
		try {
			writeJsonSync(DATA_STORE_LOCATION, this.datastore);
		} catch (e) {
			throw `Could not save the data store. The error was ${e}`;
		}
	}

	get(name) {
		return this.datastore[name];
	}

	set(name, value) {
		return this.datastore[name] = value;
	}
}
