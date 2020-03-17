//1. Import coingecko-api
const CoinGecko = require('coingecko-api');
const fs = require('fs');
const path = require('path');

const CoinGeckoClient = new CoinGecko();

global.fetch = require('node-fetch')
const cc = require('cryptocompare')
const axios = require('axios');
const express = require('express');
const myParser = require("body-parser");
const app = express();

cc.setApiKey('97e726db5e284478d6f71db039fcfef0796ea2300e413f93be77717d35ee9a8b');


let growMap = {}

function cs(str) {
	console.log(str)
}

function saveData(data, file) {
	fs.writeFile(file, JSON.stringify( {data: data} ), function (err) {
  		if (err) throw err;
	});
}

function renewCoinsAvailable(data) {
	return;
}

async function coinsData(callback, res) {
	const coins = await CoinGeckoClient.coins.all();
	const coinsAvailable = coins["data"].map( (coin) => {
		return coin["symbol"].toUpperCase();
	});

	let result = {};

	for(let i=0; i < 50; i++) {
		result[coinsAvailable[i]] = [ 
			coins["data"][i]["name"],
			coins["data"][i]["market_data"]["price_change_percentage_24h"]
		]		
	}

	cc.priceFull(coinsAvailable, ["USD"])
	.then( price => {
		coinsAvailable.forEach( (coin) => {
			let cnt = result[coin];
			cnt.push(growMap[coin]);
			cnt.push(price[coin]["USD"]["PRICE"]);
			cnt.push(price[coin]["USD"]["MKTCAP"])
			result[coin] = cnt;
		});

		callback(result, res);	
		
	}).catch(
		console.error
	)	
	
};

const comparePrice = async() => {
	let ret = {};
	let newGrowMap = {};
	let oldData = {};

	try{
		oldData = JSON.parse(fs.readFileSync('.price', 'utf8') )["data"];
	} 
	catch (error) {
	}

	const coins = await CoinGeckoClient.coins.all();
	const coinsAvailable = coins["data"].map( (coin) => {
		return coin["symbol"].toUpperCase();
	});


	cc.priceFull(coinsAvailable , ["USD"]).then( data => {
		coinsAvailable.forEach( (coin) => {
			let price = data[coin]["USD"]["PRICE"];

			if(oldData[coin] > price ) {
				newGrowMap[coin] = false;	
			} else if(oldData[coin] < price ) {
				newGrowMap[coin] = true;
			} else {
				newGrowMap[coin] = growMap[coin];				
			}

			ret[coin] = price;
		});

		growMap = newGrowMap;
		saveData(ret, ".price");	
	}).catch(
		console.error
	);	
};

function sendData(data, res) {
	res.send(JSON.stringify( {data: data} ));	
}

setInterval(function() {	
	comparePrice();
}, 5000);



/* ============================================================================================================================== */
/* ============================================================================================================================== */
/* ============================================================================================================================== */
/* ============================================================================================================================== */



app.use(myParser.urlencoded({extended : true}));
app.get('/', (req, res) =>  {
	res.sendFile(path.join(__dirname, "/index.html"));
});

app.post('/', (req, res) =>  {
	headers["Access-Control-Allow-Origin"] = "*";
	headers["Access-Control-Allow-Methods"] = "POST, GET, OPTIONS";
	headers["Access-Control-Allow-Credentials"] = false;
	headers["Access-Control-Max-Age"] = '86400'; // 24 hours
	headers["Access-Control-Allow-Headers"] = "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept";

	res.writeHead(200, headers);
	coinsData( sendData, res);
});

app.options('/', (req, res) => {
	let headers = {};
	headers["Access-Control-Allow-Origin"] = "*";
	headers["Access-Control-Allow-Methods"] = "POST, GET, OPTIONS";
	headers["Access-Control-Allow-Credentials"] = false;
	headers["Access-Control-Max-Age"] = '86400'; // 24 hours
	headers["Access-Control-Allow-Headers"] = "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept";
	res.writeHead(200, headers);
	res.end();
	
});

app.post('/getimages', (req, res) => {	
	let headers = {};
	headers["Access-Control-Allow-Origin"] = "*";
	headers["Access-Control-Allow-Methods"] = "POST, GET, OPTIONS";
	headers["Access-Control-Allow-Credentials"] = false;
	headers["Access-Control-Max-Age"] = '86400'; // 24 hours
	headers["Access-Control-Allow-Headers"] = "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept";
	res.set(headers);
	res.send(req.body);
});

app.listen(3128);