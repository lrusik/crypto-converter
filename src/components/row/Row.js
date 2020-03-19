import React, { Component } from 'react'
import "./row.css";

class Row extends Component {
   colorToProc(ar) {
      return (
         (ar[0] === "+") ? 
            ("row__green")   
         : (ar[0] === "-") ? 
            ("row__red")
         : ("")
      );
   }

   render() {
      return (
         <div className={"row " + this.props.className}>
            <div className="row__arrange">
               <div className={"row__arrow " + this.props.grow}></div>
               <div className="row__id justify-buttom">{this.props.id} </div>
            </div>
            <div className="row__coin">
               <div className="row__logo">
                  <img src={this.props.img} alt={this.props.symbol} className="row__img"/>
               </div>

               <div className="row__name">
                  <div className="row__sybmol">{this.props.symbol}</div>
                  <div className="row__fullname">{this.props.name}</div>
               </div>
            </div>
            <div className="row__price row__item">{this.props.price}</div>
            <div className="row__marketcap row__item">{this.props.marketCap}</div>
            <div className={"row__change row__item " + this.colorToProc(this.props.change)}>{this.props.change}</div>
         </div>
      );
   }
}

export default Row;