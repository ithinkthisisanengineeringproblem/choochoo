import  { TextProtoReader } from "https://deno.land/std/textproto/mod.ts";
import { BufReader } from "https://deno.land/std/io/mod.ts";

export default async function getInput(cin, cout, prompt) {
	const encoder = new TextEncoder();
	cout.write(encoder.encode(prompt));
	const {value, done} = await getLine(cin);
	if(done) {
		return "didn't read anything";
	}
	return value;
}

async function* getLine(cin) {
	let tp = new TextProtoReader(new bf(cin));
	let buff;
	while(buff != Deno.EOF) {
		buff = await tp.readLine();
		if(Deno.EOF === buff) break;
		yield buff;
	}
}
