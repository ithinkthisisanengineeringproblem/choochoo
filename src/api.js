import getAuthenticationToken from "./login.js";

class MultipartEncoder {
	constructor(boundary = "alfsdjaliserulzdkvcasaroeauwidasjf") {
		this.values = [];
		this.boundary = boundary; // TODO: Randomise this value for each encode.
	}

	append(name, value, filename, contentType) {
		this.values.push({
			"name": name,
			"value": value,
			"filename": filename
		});
	}

	encode() {
		let body = "";
		body += `Content-Type: multipart/form-data; boundary=${this.boundary}\n`;
		for(item in this.values) {
			body += `--${this.boundary}\n`;
			if(!item.filename) { // This is a key-value pair, not a file.
				body += `Content-Disposition: form-data; name=${item.name}\n\n`;
				body += `${item.value}\n`
			} else { // This is a file.
				body += `Content-Disposition: form-data; name=${item.name}; filename=${item.filename}\n`;
				body += `Content-Type: text/${item.contentType}\n\n`
				body += `${file}\n`
			}
		}
		body += `--${this.boundary}--`;
		return body;
	}
}

export default class TrainApi {
	constructor() {

	}

	init(a, b = undefined) {
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
		let form = new MultipartEncoder();
		form.append('utf', '✓');
		form.append('authenticity_token', sessionIds[1]);
		form.append('submission[language_id]', lang_id);
		form.append('submission[source_file]', prog, prog_name, 'text/x-c++src'); // Replace x-c++src with the actually mime type for the langauge that we are using. Perhaps we can derive this from language id.
		form.append('commit', 'Submit');
		let res = await fetch(`https://train.nzoi.org.nz/problems/${id}/submit`, {
			method: "POST",
			body: form.encode(),
			headers: {
				'Referer' : 'https://train.nzoi.org.nz',
				//'Content-Type': 'multipart/formdata', // Not needed, this is added in the form encoder.
				'Host': 'train.nzoi.org.nz',
				'Cookie': `_session_id=${this.sessionIds[0]}`
			}
		})
	}
};
