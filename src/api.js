import getAuthenticationToken from "./login.js";

class MultipartEncoder {
	constructor() {
		this.values = [];
	}

	append(name, value, filename) {
		this.values.push({
			"name": name,
			"value": value,
			"filename": filename
		});
	}

	encode() {

	}
}

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

	async submitProgram(id, lang_id, prog_name, prog) {
		let form = new FormData();
		form.append('utf', '✓');
		form.append('authenticity_token', sessionIds[1]);
		form.append('submission[language_id]', lang_id);
		form.append('submission[source_file]', prog, prog_name);
		form.append('commit', 'Submit');
		let res = await fetch(`https://train.nzoi.org.nz/problems/${id}/submit`, {
			method: "POST",
			body: form, // Not implemented in Deno, fix with polyfill.
			headers: {
				'Referer' : 'https://train.nzoi.org.nz',
				'Content-Type': 'multipart/formdata',
				'Host': 'train.nzoi.org.nz',
				'Cookie': `_session_id=${this.sessionIds[0]}`
			}
		})
	}
};
