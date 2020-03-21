import React, { useState, useEffect, useCallback} from 'react';
import Selector from './../selector/Selector'
import "./converter.css"
import List from "./../list/List";
import { useSelector, useDispatch, useStore } from 'react-redux';
import * as converterAction from './../../actions/converter';

function Converter(props) {
   const [rerender, setRerender] = useState('');
   const findValue = (cur) => {
      let ret = 1;
      try {
         ret = props.curs[cur][4];
      }
      catch(err) {
         console.log(err)
      }
      return ret; 
   }
   
   const store = useStore();
   const dispatch = useDispatch();
   const setFrom = useCallback((val) => { 
         dispatch(converterAction.setFrom( val ))
      }, [dispatch]
   );  

   const setTo = useCallback((val) =>  { 
         dispatch(converterAction.setTo( val ))
      }, [dispatch]
   ); 
   
   const setOrigin = useCallback((val) =>  { 
         dispatch(converterAction.setOrigin( val ))
      }, [dispatch]
   ); 

   useEffect(() => {
      setFrom(findValue("BTC"));
      setTo(1);
      setOrigin([]);
   }, [])
   
   const converterValues = useSelector(state => state.converter);
   const [field1, setField1] = useState(findValue("BTC"));
   const [field2, setField2] = useState(1);  

   const arrangeVars = (id) => {
      if(id === "field-1"){
         return [
            converterValues["from"], 
            converterValues["to"], 
            setField1, 
            setField2, 
            "field-2", 
            field2
            
         ];
      } else {
         return [
            converterValues["to"], 
            converterValues["from"], 
            setField2, 
            setField1, 
            "field-1", 
            field1
         ];
      }
   }

   const convert = (a, b, q) => {   
      return (a * q) / b;
   }

   const updateConvreter = () => {
      const origin = converterValues["origin"];
      setOrigin([]);
      const id = origin[0];
      const curs = arrangeVars(id); 
      const val = findValue(origin[1]);
      let toVal, fromVal;
      
      
      if(id === "field-1"){
         fromVal = val; 
         toVal = converterValues["to"];

         setFrom(val);
      } else if(id === "field-2") {
         fromVal = converterValues["from"]; 
         toVal = val;

         setTo(val);
      }

      if(id === "field-2")
         curs[2](convert(toVal, fromVal, curs[5]).toFixed(4));
      else   
         curs[2](convert(fromVal, toVal, curs[5]).toFixed(4));
   }

   store.subscribe(() => {
      if (store.getState()["converter"]["origin"].length !== 0 && rerender === '') {
         setRerender('a');
      }
   });

   const converter = (e) => {
      const curs = arrangeVars(e.target.id);
      curs[2](convert(curs[0], curs[1], e.target.value).toFixed(4)) ;
      curs[3](e.target.value);
   }

   if (store.getState()["converter"]["origin"].length !== 0) {
      updateConvreter();
      setRerender('');
   }

   return (
      <div className="container">
         <div className="container_converter">
            <div className="converter">
               <div className="converter__currencies">
                  <div className="converter__field">
                     <Selector 
                        id="from" 
                        curs={props.curs}
                        className="converter__selector" 
                        label="Bitcoin (BTC)"
                     />
                  </div>
                  <div className="converter__field">
                     <Selector 
                        id="to"
                        curs={props.curs} 
                        className="converter__selector" 
                        label="Dollar (USD)"
                     />
                  </div>
               </div>
               <div className="converter__inputs">
                  <div className="converter__field">
                     <input 
                        id="field-1" 
                        type="text" 
                        onChange={converter} 
                        className="converter__input" 
                        value={field2} 
                     />
                  </div>
                  <div className="converter__field">
                     <input 
                        id="field-2" 
                        type="text" 
                        onChange={converter} 
                        className="converter__input" 
                        value={field1} 
                     />
                  </div>
               </div>      
            </div>
         </div>
         <List curs={props.curs} />
      </div>
   )
}

export default Converter;