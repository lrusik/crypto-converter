import React, { Component } from 'react'
import Row from '../row/Row';
import "./list.css";

class List extends Component {
   getRowArrowClass(ar) {
      return (
         (ar == null) ? 
            ("") 
         : (ar) ? 
            ("row__arrow_up") 
         : ("row__arrow_down")
      );
   }

   moneySuffix(amount) {
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

   getRow(symbol, id) {
      return (    
         <Row 
            key={id}
            id={id} 
            symbol={symbol} 
            name={this.props.curs[symbol][0]}
            change={((this.props.curs[symbol][1] > 0) ? "+":"") + this.props.curs[symbol][1] + "%"}
            grow={ this.getRowArrowClass(this.props.curs[symbol][3]) }
            price={"$ " + parseFloat(this.props.curs[symbol][4]).toFixed(2)}
            marketCap={"$ " + this.moneySuffix(this.props.curs[symbol][5])}
            img={this.props.curs[symbol][2]}
         />
      );
   }

   getRows() {
      let ret = [];
      let id = 1;
      try {

         for(let key in this.props.curs){ 
            ret.push(this.getRow(key, id));
            id++;
         }
      } catch(err) {
         console.log(err);
      }

      return ret;
   }
   
   render() {
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
               {this.getRows()}
            </div>
         </div>
      )
   }
}
export default List
