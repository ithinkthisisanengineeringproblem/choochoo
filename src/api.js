import getAuthenticationToken from "./login.js";

export default class TrainApi {
	constructor(a, b = undefined) {
		if(b == undefined) {
			this.login(a, b);
		} else {
			this.sessionIds = a;
		}
	}

	async login(username, password) {
		this.sessionIds = getAuthenticationToken(username, password);
	}

	async getHome() {

	}

	async submitProgram(id, prog) {

	}
};
