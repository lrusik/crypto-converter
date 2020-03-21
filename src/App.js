import React, { useCallback, useState, useEffect } from 'react';
import './App.css';

import Converter from "./components/converter/Converter";
import { useDispatch } from 'react-redux';
import * as infoAction from './actions/info'; 
import useInterval from './functions/useinterval';

function App() {
  const [currencies, setCurrencies] = useState({});
  const dispatch = useDispatch();

  const setList = (list) => {
    setCurrencies({...{USD:["Dollar", 1, 1, 1, 1, 1]}, ...list});
  }

  const updateCurrencies = useCallback(
    () => dispatch(infoAction.update( setList )),
    [dispatch]
  );  

  useEffect(() => {
    updateCurrencies();    
  }, [])

  useInterval(() => {
    //updateCurrencies();
  }, 5000);

  if(
    Object.keys(currencies).length !== 0
  ){
    return (
      <div className="app">
        <Converter curs={currencies} /> 
      </div>
    );
  }

  return (
    <div className="app loader-wrapper">
      <div className="loader">
      </div>
    </div>
    );
}

export default App;