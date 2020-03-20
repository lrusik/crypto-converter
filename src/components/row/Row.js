import React from 'react'
import "./row.css";

function Row(props) {
   const colorToProc = (ar) => {
      return (
         (ar[0] === "+") ? 
            ("row__green")   
         : (ar[0] === "-") ? 
            ("row__red")
         : ("")
      );
   }

   return (
      <div className={"row " + props.className}>
         <div className="row__arrange">
            <div className={"row__arrow " + props.grow}></div>
            <div className="row__id justify-buttom">{props.id} </div>
         </div>
         <div className="row__coin">
            <div className="row__logo">
               <img src={props.img} alt={props.symbol} className="row__img"/>
            </div>

            <div className="row__name">
               <div className="row__sybmol">{props.symbol}</div>
               <div className="row__fullname">{props.name}</div>
            </div>
         </div>
         <div className="row__price row__item">{props.price}</div>
         <div className="row__marketcap row__item">{props.marketCap}</div>
         <div className={"row__change row__item " + colorToProc(props.change)}>{props.change}</div>
      </div>
   );

}

export default Row;