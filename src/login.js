const USER_AGENT = "choochoo"

async function getUnauthSessionId() {
	let res = await fetch("https://train.nzoi.org.nz");
	console.log(res.headers.get('set-cookie').substr(12, 32));
}

async function getAuthenticityToken(doc) {
	let pos = doc.search("name=\"csrf-token\"");
	return doc.substr(pos - 46, 44)
}

async function getAuthenticationToken(username, password) {
	let sessionid = getUnauthSessionId();
	let doc = await(await fetch("https://train.nzoi.org.nz/accounts/sign_in")).text();
	let atoken = getAuthenticityToken(doc);
	let form = new FormData();
	form.append('utf8', '✓');
	form.append('authenticity_token', atoken);
	form.append('user[email]', username);
	form.append('user[password]', password);
	form.append('user[remember_me]', '0');
	form.append('commit', "Sign+in");
	console.log('created form data');
	let signin = await fetch("https://train.nzoi.org.nz/accounts/sign_in", {
		method: "POST",
		body: new URLSearchParams(form),
		headers: {
			'Referer': 'https://train.nzoi.org.nz',
			'Content-Type': 'application/x-www-form-urlencoded',
			'Host': 'train.nzoi.org.nz',
			'Cookie': `expanded=false;_session_id=${sessionid}`
		}

	});
	return signin.headers.get('set-cookie').substr(12, 32);
}

