const USER_AGENT = "choochoo"

function getUnauthSessionId(res) {
	return res.headers.get('Set-Cookie').substr(12, 32);
}

function getAuthenticityToken(doc) {
	let pos = doc.search("name=\"csrf-token\"");
	return doc.substr(pos - 46, 44)
}

async function getAuthenticationToken(username, password) {
	let res = await fetch("https://train.nzoi.org.nz/accounts/sign_in");
	let doc = await res.text();
	let sessionid = getUnauthSessionId(res);
	let atoken = getAuthenticityToken(doc);
	//console.log(`sessionid is ${sessionid.length}`)
	//console.log(`atoken is ${atoken}`);
	let form = new FormData();
	form.append('utf8', '✓');
	form.append('authenticity_token', atoken);
	form.append('user[email]', username);
	form.append('user[password]', password);
	form.append('user[remember_me]', '0');
	//console.log('created form data');
	let params = new URLSearchParams(form);
	//console.log(`params are ${params}`)
	let signin = await fetch("https://train.nzoi.org.nz/accounts/sign_in", {
		method: "POST",
		body: params + '&commit=Sign+in',
		credentials: 'include',
		redirect: 'nofollow',
		referrer: 'https://train.nzoi.org.nz/accounts/sign_in',
		headers: {
			'Referer': 'https://train.nzoi.org.nz/accounts/sign_in',
			'Origin': 'https://train.nzoi.org.nz',
			'Content-Type': 'application/x-www-form-urlencoded',
			'Credentials': 'include',
			'Host': 'train.nzoi.org.nz',
			'Cookie': `expanded=false; _session_id=${sessionid}`,
			"Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
			"User-Agent": USER_AGENT
		}

	});
	//console.log(`The status code is ${signin.status}`);
	//console.log(`res type is ${res.type} and the url is ${res.url}`);
	//console.log(`redirected is ${res.redirected}`);
	for(let pair of signin.headers.entries()) {
		//console.log(`${pair[0]}: ${pair[1]}`);
	}
	//console.log(await res.text());
	let sess = signin.headers.get('Set-Cookie').substr(12, 32);
	//console.log(`sess: ${sess}`);
	return sess;
}

export { getAuthenticityToken, getAuthenticationToken};
