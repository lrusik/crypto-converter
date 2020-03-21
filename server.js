const CoinGecko = require('coingecko-api');
const fs = require('fs');
const path = require('path');
const request = require('request');
const CoinGeckoClient = new CoinGecko();

global.fetch = require('node-fetch')
const cc = require('cryptocompare')
const axios = require('axios');
const express = require('express');
const myParser = require("body-parser");
const app = express();

cc.setApiKey('97e726db5e284478d6f71db039fcfef0796ea2300e413f93be77717d35ee9a8b');

let growMap = {}
let oldPrices = {};
let data = {};

if (!fs.existsSync(__dirname + '/build/static/img/')){
	fs.mkdirSync(__dirname + '/build/static/img/');
}

function cs(str) {
	console.log(str)
}

const download = function(uri, filename, callback){
	request.head(uri, function(err, res, body){
	    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
	});
};

const cacheImage = (url, file) => {
	download(url, file, function(){
  		;
	});
}

async function coinsData() {
	const coins = await CoinGeckoClient.coins.all();
	const oldData = data;
	let result = {};

	const coinsAvailable = coins["data"].map( (coin) => {
		return coin["symbol"].toUpperCase();
	});

	let img;
	for(let i=0; i < 50; i++) {
		let file = __dirname + '/build/static/img/' + coinsAvailable[i] + ".png";
		if(!fs.existsSync(file))
			cacheImage(coins["data"][i]["image"]["thumb"], file);
		try {	
			result[coinsAvailable[i]] = [ 
				coins["data"][i]["name"],
				parseFloat(coins["data"][i]["market_data"]["price_change_percentage_24h"].toFixed(2)), 
			]	
		}
		catch(err){
			console.log("Can't get some data");
		}	
	}

	cc.priceFull(coinsAvailable, ["USD"])
	.then( price => {
		coinsAvailable.forEach( (coin) => {
			let cmp;
			try {
				if(oldData[coin][3] > price[coin]["USD"]["PRICE"] ) {
					cmp = false;
				} else if(oldData[coin][3] < price[coin]["USD"]["PRICE"] ) {
					cmp = true;
				} else {
					cmp = null;
				}
			}
			catch(err) {
				cmp = null;
			}

			let cnt = result[coin];
			cnt.push(cmp);
			cnt.push(parseFloat(price[coin]["USD"]["PRICE"].toFixed(4)));
			cnt.push(parseFloat(price[coin]["USD"]["MKTCAP"].toFixed(0)));
			result[coin] = cnt;
		});
		data = result;
	}).catch(
		console.error
	)	
};

function sendData(data, res) {
	res.send(JSON.stringify( {data: data} ));	
}

setInterval(function() {
	coinsData();
}, 5000);


/* ================================================================= */
/* ================================================================= */


app.use(myParser.urlencoded({extended : true}));
app.use(express.static(__dirname + '/build/'));

app.get('/data', (req, res) =>  {
	sendData(data, res)
});

app.listen(8080);