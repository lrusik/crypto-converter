import React, { Component } from 'react';
import './App.css';

import Converter from "./components/converter/Converter";
import List from "./components/list/List";
import axios from 'axios';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      currencies : {}
    };
  }

  componentDidMount() {   
    this.getList(this.setList);
    this.interval = setInterval(() => {
      //this.getList(this.setList);
    }, 5000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }
  
  getList = (callback) => {
    axios.get('http://localhost:80/')
    .then(function (response) {
       callback(response["data"]["data"]);
    })
    .catch(function (error) {
       console.log(error);
    });
  }

  setList = (list) => {
    this.setState({ currencies: list});
  }

  render() {
    console.log("In the <App>");
    console.log(this.state.currencies);

    return (
      <div className="app"> 
        <Converter curs={this.state.currencies} />
        <List curs={this.state.currencies} />
      </div>
    );
  }
}

// array of items where data is contained in the state; map;

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

export { App as default };