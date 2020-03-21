import React from 'react'
import Row from '../row/Row';
import "./list.css";

function List(props) {
   const getRowArrowClass = (ar) => {
      return (
         (ar == null) ? 
            ("") 
         : (ar) ? 
            ("row__arrow_up") 
         : ("row__arrow_down")
      );
   }

   const moneySuffix = (amount) => {
      const suffix = ["TR", "B", "M"];
      let d = 1000000000000;
      
      for(let i = 0; i < suffix.length; i++){
         if((amount / d) >= 1){
            return (amount / d).toFixed(0) + suffix[i];
         }
         d /= 1000;
      }

      return amount;
   }

   const getRow = (symbol, id) => {
      return (    
         <Row 
            key={id}
            id={id} 
            symbol={symbol} 
            name={props.curs[symbol][0]}
            change={((props.curs[symbol][1] > 0) ? "+":"") + props.curs[symbol][1] + "%"}
            grow={ getRowArrowClass(props.curs[symbol][3]) }
            price={"$ " + parseFloat(props.curs[symbol][4]).toFixed(2)}
            marketCap={"$ " + moneySuffix(props.curs[symbol][5])}
            img={props.curs[symbol][2]}
         />
      );
   }

   const getRows = () => {
      let ret = [];
      let id = 1;
      try {

         for(let key in props.curs){ 
            if(key === "USD")
               continue;
               
            ret.push(getRow(key, id));
            id++;
         }
      } catch(err) {
         console.log(err);
      }

      return ret;
   }
   
   return (
      <div className="list">
         <div className="list__inner container">
            <Row
               className="row__header"
               id="#" 
               symbol="Coin" 
               name=""
               change="Change 24h"
               price="Price"
               marketCap="Market cap"
            />
            {getRows()}
         </div>
      </div>
   )

}
export default List
