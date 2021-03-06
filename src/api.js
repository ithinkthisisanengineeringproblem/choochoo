import { getAuthenticationToken, getAuthenticityToken } from "./login.js";

class MultipartEncoder {
	constructor(boundary = "alfsdjaliserulzdkvcasaroeauwidasjf") {
		this.values = [];
		this.boundary = boundary; // TODO: Randomise this value for each encode.
	}

	append(name, value, filename, contentType) {
		this.values.push({
			"name": name,
			"value": value,
			"filename": filename,
			"contentType": contentType
		});
	}

	encode() {
		let body = "";
		body += `Content-Type: multipart/form-data; boundary=${this.boundary}\n`;
		for(const item in this.values) {
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
			this.sessionId = a;
		} else {
			console.log('logging in');
			this.login(a, b);
		}
	}
	async login(username, password) {
		this.sessionId = await getAuthenticationToken(username, password);
	}

	getSessionId() {
		return this.sessionId;
	}

	async submitProgram(id, lang_id, prog_name, prog) {
		let res = await fetch(`https://train.nzoi.org.nz/problems/${id}/submit`);
		//console.log(`res status is ${await res.text()}`);
		let form = new MultipartEncoder();
		form.append('utf', '✓');
		form.append('authenticity_token', getAuthenticityToken(await res.text()));
		form.append('submission[language_id]', lang_id);
		form.append('submission[source_file]', prog, prog_name, 'text/x-c++src'); // Replace x-c++src with the actually mime type for the langauge that we are using. Perhaps we can derive this from language id.
		form.append('commit', 'Submit');
		let post = await fetch(`https://train.nzoi.org.nz/problems/${id}/submit`, {
			method: "POST",
			body: form.encode(),
			redirect: "nofollow",
			headers: {
				'Referer' : 'https://train.nzoi.org.nz',
				//'Content-Type': 'multipart/formdata', // Not needed, this is added in the form encoder.
				'Host': 'train.nzoi.org.nz',
				'Cookie': `_session_id=${this.sessionId}`
			}
		})
		console.log(`${post.url}`)
	}
};
