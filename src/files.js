import { existsSync, readFileStrSync} from "https://deno.land/std/fs/mod.ts";

const PROBLEM_NUM_MARKER = "choochoo-problem: ";

export const FileTables =  {
	webFormTable: {
			"cpp17": 11,
			"c11": 12,
			"python3": 14,
			"java11": 13,
			"haskell2010": 3,
			"ruby2": 8,
			"cpp14": 10,
			"c99": 4
	},
	defaultVersionTable: {
			"cpp": "cpp17",
			"c": "c11",
			"python": "python3",
			"java": "java11",
			"haskell": "haskell2010",
			"ruby": "ruby2"
	},
	fileExtensionTable: {
			"cpp": "cpp",
			"c": "c",
			"py": "python",
			"java": "java",
			"hs": "haskell",
			"rb": "ruby"
	}
}

function fileExtension(path) {
	 return fname.slice((fname.lastIndexOf(".") - 1 >>> 0) + 2);
}

export default class Files {
	constructor() {

	}
	
	read(path) {
		if(path.charAt(0) != "/") path = Deno.cwd() + path;
		if(!existsSync(path)) throw "Path to read doesn't exist";
		const file = readFileSync(path);
		const lines = file.split("\n");
		let problemNum = -1;
		if(lines.length < 1) return ["", -1];
		if(lines[0].indexOf(PROBLEM_NUM_MARKER) == -1) {
			problemNum = -1;
		} else {
			let pos = lines[0].indexOf(PROBLEM_NUM_MARKER) + PROBLEM_NUM_MARKER.length;
			console.log(lines[0].substr(pos, 10));
			problemNum = "";
			while(!/([0-9])/g.test(lines[0].substr(pos, 1))) {
				problemNum += lines[0].substr(pos, 1);
			}
			if(problemNum == "") problemNum = -1; else problemNum = parseInt(problemNum);
		}
		return [file, problemNum] // File contents and guessed problemNum.
	}
}
