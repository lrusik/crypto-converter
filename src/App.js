import React, { Component } from 'react';
import './App.css';
import Converter from "./components/converter/Converter";
import List from "./components/list/List";

class App extends Component {
  state = {
    currencies : [
      [0, "USD", "Dollar", 1 ], 
      [1, "BTC", "Bitcoin", 5511.23 ], 
      [2, "ETH", "Ethereum", 132.13 ],
      [3, "XRP", "XRP", 0.15892],
      [4, "FAKE", "FakeCoin", 1]
    ]
  };

  render() {
    return (
      <div className="app"> 
        <Converter curnsies={this.state.currencies} />
        <List />
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
*/

export { App as default };