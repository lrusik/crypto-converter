import React, { useState} from 'react';
import Selector from './../selector/Selector'
import "./converter.css"

function Converter(props) {
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

   const [from, setFrom] = useState(findValue("BTC"));
   const [to, setTo] = useState(1);   
   const [field1, setField1] = useState(findValue("BTC"));
   const [field2, setField2] = useState(1);  

   const arrangeVars = (id) => {
      if(id === "field-1"){
         return [from, to, setField1, setField2, "field-2", field2];
      } else { 
         return [to, from, setField2, setField1, "field-1", field1];
      }
   }

   const convert = (a, b, q) => {   
      return (a * q) / b;
   }

   const setCur = (id, cur) => {
      const val = findValue(cur);
      let toVal, fromVal;

      if(id === "from"){
         id = "field-1";
         fromVal = val; 
         toVal = to;

         setFrom(val);
      } else if(id === "to") {
         id = "field-2";
         fromVal = from; 
         toVal = val;

         setTo(val);
      }

      const curs = arrangeVars(id);      
      curs[2](convert(fromVal, toVal, curs[5]).toFixed(4));
   }

   const converter = (e) => {
      const curs = arrangeVars(e.target.id);
      curs[2](convert(curs[0], curs[1], e.target.value).toFixed(4)) ;
      curs[3](e.target.value);
   }

   return (
      <div className="container container_converter">
         <div className="converter">
            <div className="converter__currencies">
               <div className="converter__field">
                  <Selector 
                     id="from" 
                     curs={props.curs} 
                     setCur={setCur} 
                     className="converter__selector" 
                     label="Bitcoin (BTC)"
                  />
               </div>
               <div className="converter__field">
                  <Selector 
                     id="to" 
                     setCur={setCur} 
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
   )
}

export default Converter;