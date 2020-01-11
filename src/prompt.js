export default async function getInput(cin, cout, prompt) {
	const encoder = new TextEncoder();
	await Deno.write(cout.rid, encoder.encode(prompt));
	let buf = new Uint8Array(100);
	Deno.read(cin.rid, buf);
	return new TextDecoder().decode(buf);
}
