import React, { useState, useEffect, useRef } from 'react';
import './App.css';

import Converter from "./components/converter/Converter";
import List from "./components/list/List";
import axios from 'axios';

function useInterval(callback, delay) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);

}

function App() {
  const [currencies, setCurrencies] = useState({});

  const setList = (list) => {
    setCurrencies({...{USD:["Dollar", 1, 1, 1, 1, 1]}, ...list});
  }
  
  const getList = (callback) => {
    console.log("Updating...");
    axios.get('http://localhost:80/')
    .then(function (response) {
       callback(response["data"]["data"]);
    })
    .catch(function (error) {
       console.log(error);
    });
  }
  
  useInterval(() => {
    //getList(setList)
  }, 5000);

  useEffect(() => {
    getList(setList);  
  }, [])

  if(!(
    Object.keys(currencies).length === 0 && 
    currencies.constructor === Object
  )){
    console.log(currencies);
    return (
      <div className="app">
        <Converter curs={currencies} /> 
        <List curs={currencies} />
      </div>
    );
  }
  return <div className="app"></div>;
}


/*
  // Links
  * https://www.chartjs.org/
  * https://coinmarketcap.com/converter/
  * https://coinlib.io/cryptocurrency-converter
  * https://shapeshift.io/#/coins
  * 
  * https://www.coinbase.com/price
  * https://coinmarketcap.com/all/views/all/
  * 
  * ultimate winner : https://www.livecoinwatch.com/
  * 
  * converter : https://www.google.com/search?q=rub+to+shekel&oq=rub+to+&aqs=chrome.1.69i57j35i39j0l4.2572j1j7&client=ubuntu&sourceid=chrome&ie=UTF-8
  * 
  * https://www.cryptocurrencychart.io/
  * https://info.binance.com/en
  * https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API/Writing_WebSocket_client_applications
  * 
*/

export default App;